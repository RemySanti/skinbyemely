import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import Stripe from "npm:stripe@^14.0.0";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Stripe-Secret-Key"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-fd83a735/health", (c) => {
  const hasKey = !!(Deno.env.get("STRIPE_SECRET_KEY"));
  return c.json({ status: "ok", configured: hasKey });
});

// --- STRIPE MIGRATION ---

app.post("/make-server-fd83a735/stripe-migrate", async (c) => {
  try {
    const { items, secretKey: bodyKey } = await c.req.json();
    
    let secretKey = bodyKey || Deno.env.get("STRIPE_SECRET_KEY");

    if (!secretKey) {
      console.error("Missing Stripe Secret Key");
      return c.json({ error: "Stripe Secret Key is required. Please set STRIPE_SECRET_KEY in Supabase Edge Function secrets." }, 400);
    }
    
    secretKey = secretKey.trim();

    if (!items || !Array.isArray(items)) {
        return c.json({ error: "Invalid items data. Expected an array." }, 400);
    }

    console.log(`Starting migration for ${items.length} items`);

    const stripe = new Stripe(secretKey, {
      apiVersion: '2023-10-16',
    });

    const results = [];
    const errors = [];

    for (const item of items) {
      try {
        // 1. Create Product
        // Square 'item_data' structure vs clean 'SquareProduct' structure.
        // We assume we are receiving the clean 'SquareProduct' structure from our service or the raw one?
        // Let's handle the raw one from square-products-data.ts if possible, or the processed one.
        // We'll assume the frontend sends the processed one: { name, description, price, images, ... }
        
        const name = item.name || item.item_data?.name;
        const description = item.description || item.item_data?.description;
        // Support direct image URLs (from manual entry) or Square image IDs
        const images = item.images || (item.imageUrl ? [item.imageUrl] : []) || item.image_ids || item.item_data?.image_ids || [];
        
        // Handle Price
        let amount = 0;
        let currency = 'usd';

        if (item.price) {
            amount = Math.round(item.price * 100);
            currency = item.currency || 'usd';
        } else if (item.item_data?.variations?.[0]?.item_variation_data?.price_money) {
            amount = item.item_data.variations[0].item_variation_data.price_money.amount;
            currency = item.item_data.variations[0].item_variation_data.price_money.currency;
        }

        const product = await stripe.products.create({
          name: name,
          description: description ? description.replace(/<[^>]*>?/gm, '') : undefined, // Strip HTML
          images: images,
          metadata: {
            source_id: item.id,
            category: item.category || item.item_data?.category_id,
            seo_title: item.item_data?.seo_title,
            seo_description: item.item_data?.seo_description?.substring(0, 500),
            permalink: item.item_data?.permalink,
            gtin: item.item_data?.gtin,
            item_type: item.item_data?.item_type,
            visibility: item.item_data?.visibility,
            weight: item.item_data?.weight,
            shipping_enabled: item.item_data?.shipping_enabled,
          }
        });

        // 2. Create Price
        if (amount > 0) {
            const price = await stripe.prices.create({
              product: product.id,
              unit_amount: amount,
              currency: currency.toLowerCase(),
            });

            results.push({
              squareId: item.id,
              stripeProductId: product.id,
              stripePriceId: price.id,
              name: product.name
            });
        } else {
            // Product without price (e.g. variable priced?)
             results.push({
              squareId: item.id,
              stripeProductId: product.id,
              stripePriceId: 'no-price',
              name: product.name
            });
        }

      } catch (err) {
        console.error(`Error migrating item ${item.id}:`, err);
        errors.push({ id: item.id, error: err.message });
      }
    }

    return c.json({ 
      success: true, 
      migrated: results.length, 
      results,
      errors 
    });

  } catch (error) {
    console.error("Migration fatal error:", error);
    return c.json({ error: error.message }, 500);
  }
});

// --- STRIPE PAYMENT INTENT ---

app.post("/make-server-fd83a735/stripe-create-payment-intent", async (c) => {
  try {
    // We expect the frontend to send the secret key if it's in "Migrate/Test" mode, 
    // OR we use the env var if it's production. 
    // For this specific request, let's look for a header or body param, fallback to Deno.env
    
    const body = await c.req.json();
    const { items, currency = "usd" } = body;
    let secretKey = c.req.header("X-Stripe-Secret-Key") || Deno.env.get("STRIPE_SECRET_KEY");

    // Fallback: If the user provided it in the body (for the migration tool context)
    if (!secretKey && body.secretKey) {
        secretKey = body.secretKey;
    }

    if (!secretKey) {
      return c.json({ error: "Stripe configuration missing" }, 500);
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: '2023-10-16',
    });

    // Calculate total
    const calculateOrderAmount = (items) => {
        // items should be { price: number (dollars), quantity: number }
        // Return cents
        return items.reduce((acc, item) => acc + (item.price * 100 * (item.quantity || 1)), 0);
    };

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(calculateOrderAmount(items)),
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return c.json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error("Payment Intent Error:", error);
    return c.json({ error: error.message }, 500);
  }
});

// --- FETCH ALL STRIPE PRODUCTS ---

app.get("/make-server-fd83a735/stripe-products", async (c) => {
  try {
    // Try to get cached products from KV store first
    const cachedProducts = await kv.get("stripe_products_cache");
    
    if (cachedProducts && Array.isArray(cachedProducts) && cachedProducts.length > 0) {
      console.log("Returning cached Stripe products");
      return c.json({ 
        success: true,
        products: cachedProducts,
        cached: true
      });
    }

    // If no cache, auto-fetch from Stripe API and cache the results
    console.log("No cached products found. Auto-fetching from Stripe API...");
    
    const secretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!secretKey) {
      console.error("Missing STRIPE_SECRET_KEY — cannot auto-fetch products");
      return c.json({ 
        success: true,
        products: [],
        cached: false,
        message: "No products cached and Stripe key not configured."
      });
    }

    const stripe = new Stripe(secretKey, { apiVersion: '2023-10-16' });

    const stripeProducts = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
      limit: 100,
    });

    console.log(`Auto-fetched ${stripeProducts.data.length} products from Stripe`);

    const productsWithPrices = [];
    
    for (const product of stripeProducts.data) {
      let price = null;
      let priceAmount = null;

      if (product.default_price && typeof product.default_price === 'object') {
        price = product.default_price;
      } else if (product.default_price && typeof product.default_price === 'string') {
        try {
          price = await stripe.prices.retrieve(product.default_price);
        } catch (err) {
          console.error(`Error fetching price for product ${product.id}:`, err.message);
        }
      } else {
        try {
          const prices = await stripe.prices.list({
            product: product.id,
            active: true,
            limit: 1,
          });
          if (prices.data.length > 0) {
            price = prices.data[0];
          }
        } catch (err) {
          console.error(`Error fetching prices for product ${product.id}:`, err.message);
        }
      }

      if (price && price.unit_amount) {
        priceAmount = price.unit_amount / 100;
      }

      productsWithPrices.push({
        id: product.id,
        name: product.name,
        description: product.description,
        images: product.images || [],
        price: priceAmount,
        priceId: price?.id,
        currency: price?.currency || 'usd',
        metadata: product.metadata,
      });
    }

    // Store in KV cache for subsequent requests
    await kv.set("stripe_products_cache", productsWithPrices);
    console.log(`Auto-cached ${productsWithPrices.length} products in KV store`);

    return c.json({ 
      success: true,
      products: productsWithPrices,
      cached: false,
      autoRefreshed: true
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    return c.json({ error: error.message }, 500);
  }
});

// --- REFRESH STRIPE PRODUCTS CACHE ---

app.post("/make-server-fd83a735/stripe-products-refresh", async (c) => {
  try {
    const secretKey = Deno.env.get("STRIPE_SECRET_KEY");

    if (!secretKey) {
      console.error("Missing Stripe Secret Key");
      return c.json({ error: "Stripe Secret Key is required" }, 400);
    }

    console.log("Fetching products from Stripe API...");

    const stripe = new Stripe(secretKey, {
      apiVersion: '2023-10-16',
    });

    // Fetch all products with their default prices expanded
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
      limit: 100,
    });

    console.log(`Fetched ${products.data.length} products from Stripe`);

    // Transform products to include price information
    // Process sequentially to avoid rate limits
    const productsWithPrices = [];
    
    for (const product of products.data) {
      let price = null;
      let priceAmount = null;

      // Check if default_price was expanded
      if (product.default_price && typeof product.default_price === 'object') {
        // Price was expanded, use it directly
        price = product.default_price;
      } else if (product.default_price && typeof product.default_price === 'string') {
        // Price ID only, need to fetch it
        try {
          price = await stripe.prices.retrieve(product.default_price);
        } catch (err) {
          console.error(`Error fetching price for product ${product.id}:`, err.message);
        }
      } else {
        // No default price, try to fetch the first active price for this product
        try {
          const prices = await stripe.prices.list({
            product: product.id,
            active: true,
            limit: 1,
          });
          if (prices.data.length > 0) {
            price = prices.data[0];
          }
        } catch (err) {
          console.error(`Error fetching prices for product ${product.id}:`, err.message);
        }
      }

      if (price && price.unit_amount) {
        priceAmount = price.unit_amount / 100; // Convert from cents to dollars
      }

      productsWithPrices.push({
        id: product.id,
        name: product.name,
        description: product.description,
        images: product.images || [],
        price: priceAmount,
        priceId: price?.id,
        currency: price?.currency || 'usd',
        metadata: product.metadata,
      });
    }

    // Store in KV cache
    await kv.set("stripe_products_cache", productsWithPrices);
    console.log(`Cached ${productsWithPrices.length} products in KV store`);

    return c.json({ 
      success: true,
      products: productsWithPrices,
      count: productsWithPrices.length,
      message: "Products successfully fetched from Stripe and cached"
    });

  } catch (error) {
    console.error("Error refreshing Stripe products:", error);
    return c.json({ error: error.message }, 500);
  }
});

// --- SQUARE PRODUCTS REFRESH ---

app.post("/make-server-fd83a735/square-products-refresh", async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const accessToken = body.accessToken || Deno.env.get("SQUARE_ACCESS_TOKEN");
    const isSandbox = body.isSandbox || false;

    if (!accessToken) {
       return c.json({ error: "Square Access Token is required" }, 400);
    }

    const baseUrl = isSandbox ? "https://connect.squareupsandbox.com" : "https://connect.squareup.com";
    console.log(`Fetching catalog from Square API (${baseUrl})...`);

    // Use POST /v2/catalog/search instead of /list (which is GET only)
    const response = await fetch(`${baseUrl}/v2/catalog/search`, {
        method: "POST",
        headers: {
            "Square-Version": "2024-12-18",
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            object_types: ["ITEM", "CATEGORY"],
            limit: 1000 // Ensure we get enough items
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Square API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const items = data.objects || [];
    
    console.log(`Fetched ${items.length} items from Square`);
    
    // Store raw items
    await kv.set("square_products_cache", items);
    
    return c.json({
        success: true,
        count: items.length,
        message: "Square products refreshed and cached"
    });

  } catch (error) {
    console.error("Error refreshing Square products:", error);
    return c.json({ error: error.message }, 500);
  }
});

// --- GET SQUARE PRODUCTS ---

app.get("/make-server-fd83a735/square-products", async (c) => {
    try {
        const cachedProducts = await kv.get("square_products_cache");
        
        if (cachedProducts) {
            return c.json({
                success: true,
                products: cachedProducts,
                cached: true
            });
        }
        
        return c.json({
            success: true,
            products: [],
            cached: false,
            message: "No Square products cached"
        });
    } catch (error) {
        return c.json({ error: error.message }, 500);
    }
});

// --- SQUARE SERVICES (Booking/Appointment Services) ---

app.get("/make-server-fd83a735/square-services", async (c) => {
  try {
    const cacheData = await kv.get("square_services_cache");
    const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

    // Handle both old format (array) and new format (object with services + timestamp)
    let services = [];
    let timestamp = 0;

    if (Array.isArray(cacheData)) {
      // Old format - just an array
      console.log("Cache format: legacy array");
      services = cacheData;
      timestamp = 0; // Unknown age, treat as stale
    } else if (cacheData && cacheData.services) {
      // New format - object with services and timestamp
      console.log("Cache format: new object with timestamp");
      services = cacheData.services;
      timestamp = cacheData.timestamp || 0;
    } else if (cacheData) {
      console.log("Cache format: unexpected", typeof cacheData);
    } else {
      console.log("Cache is empty or null");
    }

    // Check if we have valid cached data
    if (services && Array.isArray(services) && services.length > 0) {
      const cacheAge = Date.now() - timestamp;
      const isStale = cacheAge > CACHE_TTL_MS;

      console.log(`Square services cache: ${services.length} items, age: ${Math.round(cacheAge / 1000)}s, TTL: ${CACHE_TTL_MS / 1000}s, stale: ${isStale}`);

      // If cache is stale and we have Square credentials in env, auto-refresh in background
      if (isStale) {
        const squareAccessToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
        const squareEnvironment = Deno.env.get("SQUARE_ENVIRONMENT") || "production";
        
        if (squareAccessToken) {
          console.log("Cache is stale, triggering background refresh from env token...");
          // Trigger background refresh (non-blocking)
          const refreshUrl = new URL(c.req.url);
          refreshUrl.pathname = refreshUrl.pathname.replace("/square-services", "/square-services-refresh");
          
          fetch(refreshUrl.toString(), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              accessToken: squareAccessToken,
              isSandbox: squareEnvironment === "sandbox",
            }),
          }).catch((err) => console.error("Background refresh failed:", err));
        } else {
          console.log("Cache is stale but no SQUARE_ACCESS_TOKEN in env. Manual refresh required.");
        }
      }

      // Return cached data immediately (stale-while-revalidate pattern)
      // Filter out add-ons in case the cache was populated before filtering was introduced
      const filteredServices = services.filter((s: any) => {
        const sName = (s.title || s.name || "").toLowerCase();
        return !sName.includes("add-on") && !sName.includes("add on") && !sName.includes("addon") && !sName.includes("add - on") && !sName.includes("add_on");
      });
      console.log(`After add-on filter: ${filteredServices.length} of ${services.length} services remain`);
      return c.json({ 
        success: true, 
        services: filteredServices, 
        cached: true,
        stale: isStale,
        cacheAge: Math.round(cacheAge / 1000),
      });
    }

    // No cache available — frontend must call /square-services-refresh with the access token
    console.log("No cached Square services found. Call /square-services-refresh to populate.");
    return c.json({ success: true, services: [], cached: false, message: "No services cached. Call /square-services-refresh with accessToken to populate." });

  } catch (error) {
    console.error("Error fetching Square services:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-fd83a735/square-services-refresh", async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const accessToken = body.accessToken;

    if (!accessToken) {
      return c.json({ error: "Square Access Token is required in request body" }, 400);
    }

    const isSandbox = body.isSandbox || false;
    const baseUrl = isSandbox ? "https://connect.squareupsandbox.com" : "https://connect.squareup.com";
    console.log(`Refreshing Square services from API (${baseUrl})...`);

    const response = await fetch(`${baseUrl}/v2/catalog/search`, {
      method: "POST",
      headers: {
        "Square-Version": "2024-12-18",
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        object_types: ["ITEM"],
        limit: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Square API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const allItems = data.objects || [];

    const serviceKeywords = [
      { keyword: "new client facial", id: "new-client-facial", link: "/services/new-client-facial" },
      { keyword: "microdermabrasion", id: "microdermabrasion", link: "/services/microdermabrasion" },
      { keyword: "dermaplane", id: "dermaplane-deluxe", link: "/services/dermaplane-deluxe" },
      { keyword: "cranberry", id: "cranberry-peel", link: "/services/cranberry-peel" },
      { keyword: "nanoneedling", id: "nanoneedling", link: "/services/nanoneedling" },
    ];

    const services = [];

    for (const item of allItems) {
      const itemData = item.item_data || {};
      const name = (itemData.name || "").toLowerCase();

      // Skip add-ons (services with "add-on" or "add on" in their name)
      if (name.includes("add-on") || name.includes("add on") || name.includes("addon") || name.includes("add - on") || name.includes("add_on")) {
        continue;
      }

      for (const sk of serviceKeywords) {
        if (name.includes(sk.keyword)) {
          const variation = itemData.variations?.[0];
          const priceAmount = variation?.item_variation_data?.price_money?.amount || 0;
          const priceDollars = priceAmount / 100;
          const durationMs = variation?.item_variation_data?.service_duration || 3600000;
          const durationMin = Math.round(durationMs / 60000);

          services.push({
            id: sk.id,
            title: itemData.name,
            price: `$${priceDollars}`,
            priceNum: priceDollars,
            duration: `${durationMin} Min`,
            description: itemData.description || "",
            link: sk.link,
          });
          break;
        }
      }
    }

    await kv.set("square_services_cache", { services, timestamp: Date.now() });
    console.log(`Refreshed and cached ${services.length} Square services`);

    return c.json({
      success: true,
      services,
      count: services.length,
      message: `Refreshed ${services.length} Square services`,
    });
  } catch (error) {
    console.error("Error refreshing Square services:", error);
    return c.json({ error: error.message }, 500);
  }
});

// --- STRIPE CHECKOUT SESSION (HOSTED PAGE) ---

app.post("/make-server-fd83a735/stripe-create-checkout-session", async (c) => {
  try {
    const body = await c.req.json();
    const { items, successUrl, cancelUrl } = body;
    let secretKey = c.req.header("X-Stripe-Secret-Key") || Deno.env.get("STRIPE_SECRET_KEY");

    if (!secretKey) {
      return c.json({ error: "Stripe configuration missing" }, 500);
    }

    // Fetch checkout configuration
    const checkoutConfig = await kv.get("checkout_config") || {};

    const stripe = new Stripe(secretKey, {
      apiVersion: '2023-10-16',
    });

    const lineItems = items.map((item) => {
        // Ideally we use priceId if available to avoid creating ad-hoc prices
        if (item.priceId) {
            return {
                price: item.priceId,
                quantity: item.quantity || 1,
            };
        } else {
             // Ad-hoc price creation (not recommended for subscriptions but ok for one-time)
             return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        description: item.description,
                        images: item.image ? [item.image] : [],
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity || 1,
            };
        }
    });

    // Calculate cart subtotal to determine shipping rate
    const cartSubtotal = items.reduce((sum, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 1;
      return sum + (price * quantity);
    }, 0);

    // $49 and under = $12 shipping, over $49 = free shipping
    const shippingOptions = cartSubtotal > 49
      ? [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 0,
                currency: 'usd',
              },
              display_name: 'Free Standard Shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 3,
                },
                maximum: {
                  unit: 'business_day',
                  value: 5,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 1500,
                currency: 'usd',
              },
              display_name: 'Expedited Shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 1,
                },
                maximum: {
                  unit: 'business_day',
                  value: 2,
                },
              },
            },
          },
        ]
      : [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 1200,
                currency: 'usd',
              },
              display_name: 'Standard Shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 3,
                },
                maximum: {
                  unit: 'business_day',
                  value: 5,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 1500,
                currency: 'usd',
              },
              display_name: 'Expedited Shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 1,
                },
                maximum: {
                  unit: 'business_day',
                  value: 2,
                },
              },
            },
          },
        ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'affirm', 'afterpay_clearpay'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || 'https://skinbyemely.com/order-success',
      cancel_url: cancelUrl || 'https://skinbyemely.com/cart',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      phone_number_collection: {
        enabled: true,
      },
      allow_promotion_codes: true,
      automatic_tax: {
        enabled: true,
      },
      shipping_options: shippingOptions,
      custom_text: {
        submit: checkoutConfig.checkoutMessage ? { message: checkoutConfig.checkoutMessage } : undefined,
        terms_of_service_acceptance: checkoutConfig.termsMessage ? { message: checkoutConfig.termsMessage } : undefined,
      },
    });

    return c.json({
      url: session.url,
    });

  } catch (error) {
    console.error("Checkout Session Error:", error);
    return c.json({ error: error.message }, 500);
  }
});

// --- SEND EMAIL (RESEND) ---

app.post("/make-server-fd83a735/send-email", async (c) => {
  try {
    const { name, email, phone, message } = await c.req.json();
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY");
      return c.json({ error: "Email service not configured" }, 500);
    }

    // Validate input
    if (!name || !email || !message) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    console.log(`Sending email inquiry from ${name} (${email})`);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "SkinByEmely Web <onboarding@resend.dev>", // Default sender until custom domain is set
        to: ["emely@skinbyemely.com"], // REPLACE WITH OWNER EMAIL
        subject: `New Inquiry from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-w-600px; margin: 0 auto;">
            <h1 style="color: #b8956a; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Website Inquiry</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <div style="background-color: #faf8f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0; color: #555;">${message.replace(/\n/g, "<br>")}</p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`Resend API Error: ${errorData}`);
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);

    return c.json({ success: true, id: data.id });
  } catch (error) {
    console.error("Email Sending Error:", error);
    return c.json({ error: error.message }, 500);
  }
});

// --- CHECKOUT CONFIGURATION ---

app.get("/make-server-fd83a735/checkout-config", async (c) => {
  try {
    const config = await kv.get("checkout_config");
    return c.json({ config: config || {} });
  } catch (error) {
    console.error("Error fetching checkout config:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-fd83a735/checkout-config", async (c) => {
  try {
    const config = await c.req.json();
    await kv.set("checkout_config", config);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error saving checkout config:", error);
    return c.json({ error: error.message }, 500);
  }
});

// --- SITE BRANDING (script logo font for owner name) ---

const DEFAULT_SITE_BRANDING = {
  scriptFontId: "allura",
  skinFontId: "playfair-display",
  ownerName: "Emely",
  homeTaglineId: "intentional-touch",
};

app.get("/make-server-fd83a735/site-branding", async (c) => {
  try {
    const branding = await kv.get("site_branding");
    return c.json({
      branding: { ...DEFAULT_SITE_BRANDING, ...(branding || {}) },
    });
  } catch (error) {
    console.error("Error fetching site branding:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-fd83a735/site-branding", async (c) => {
  try {
    const body = await c.req.json();
    const branding = {
      scriptFontId: body.scriptFontId || DEFAULT_SITE_BRANDING.scriptFontId,
      skinFontId: body.skinFontId || DEFAULT_SITE_BRANDING.skinFontId,
      ownerName: (body.ownerName || DEFAULT_SITE_BRANDING.ownerName).trim(),
      homeTaglineId: body.homeTaglineId || DEFAULT_SITE_BRANDING.homeTaglineId,
    };
    await kv.set("site_branding", branding);
    return c.json({ success: true, branding });
  } catch (error) {
    console.error("Error saving site branding:", error);
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);