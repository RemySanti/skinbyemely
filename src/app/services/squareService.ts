/**
 * Square API Service
 * Handles all Square API interactions for SkinByEmely
 */

import { SQUARE_CONFIG, getSquareHeaders, isSquareConfigured } from '../config/square';
import { SQUARE_PRODUCTS_DATA } from '../config/square-products-data';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-fd83a735`;

// Type Definitions
export interface SquareProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  imageUrl?: string;
  category?: string;
  squareItemId?: string; // For purchase links
  benefits?: string[]; // Product benefits
  variations?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

export interface SquareBooking {
  id: string;
  startAt: string;
  locationId: string;
  customerId?: string;
  appointmentSegments: Array<{
    durationMinutes: number;
    serviceVariationId: string;
    teamMemberId: string;
  }>;
  status: 'PENDING' | 'ACCEPTED' | 'CANCELLED';
}

export interface SquareService {
  id: string;
  name: string;
  description?: string;
  duration: number; // minutes
  price: number;
  category?: string;
  squareServiceId?: string;
}

export interface SquareCustomer {
  id: string;
  givenName?: string;
  familyName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  createdAt: string;
}

/**
 * Catalog Service - Products & Services
 */
export class SquareCatalogService {
  private baseUrl = `${SQUARE_CONFIG.baseUrl}/v2`;

  /**
   * Fetch all catalog items (products and services)
   */
  async listCatalogItems(types: string[] = ['ITEM']): Promise<any[]> {
    let items: any[] = [];
    let fromCache = false;

    // 0. Try to fetch from backend cache first (Preferred for up-to-date data)
    try {
      const cacheResponse = await fetch(`${API_BASE}/square-products`, {
        headers: {
            'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      if (cacheResponse.ok) {
        const data = await cacheResponse.json();
        if (data.cached && Array.isArray(data.products) && data.products.length > 0) {
           console.log('Using backend cached Square products');
           items = data.products;
           fromCache = true;
        }
      }
    } catch (e) {
      console.warn('Backend cache fetch failed, falling back to local/direct', e);
    }

    // 1. Try to use local cached data first (bypasses CORS issues) if backend failed
    if (!fromCache && Array.isArray(SQUARE_PRODUCTS_DATA) && SQUARE_PRODUCTS_DATA.length > 0) {
      console.log('Using local cached products from square-products-data.ts');
      items = SQUARE_PRODUCTS_DATA;
    }

    // 2. Fetch from API directly (Client-side, might fail CORS)
    if (items.length === 0 && isSquareConfigured()) {
        try {
            // Use POST /catalog/search instead of /list
            const response = await fetch(`${this.baseUrl}/catalog/search`, {
                method: 'POST',
                headers: getSquareHeaders(),
                body: JSON.stringify({ 
                    object_types: types // Map requested types
                }),
            });
            if (response.ok) {
                const data = await response.json();
                items = data.objects || [];
            } else {
                console.warn(`Direct Square API fetch failed: ${response.status}`);
            }
        } catch (e) {
            console.warn('Direct Square API fetch failed', e);
        }
    }

    // Filter by requested types - if API returned more than requested or if we used cache
    return items.filter(item => types.includes(item.type));
  }
  
  /**
   * Get services formatted for display
   */
  async getServices(): Promise<SquareService[]> {
    const allItems = await this.listCatalogItems(['ITEM', 'CATEGORY']);
    const items = allItems.filter(i => i.type === 'ITEM');
    const categories = allItems.filter(i => i.type === 'CATEGORY');
    
    const categoryMap = new Map(categories.map(c => [c.id, c.category_data?.name]));

    return items
      .filter(item => {
           // Heuristic: If it has a service duration, it's likely a service.
           // Or if description contains "facial" or "peel" or "massage"
           // Or just return everything for now and let the UI filter?
           // Ideally we check item.item_data.product_type === 'APPOINTMENTS_SERVICE'
           return item.item_data?.product_type === 'APPOINTMENTS_SERVICE' || 
                  item.item_data?.name?.toLowerCase().includes('facial') ||
                  item.item_data?.name?.toLowerCase().includes('peel') ||
                  item.item_data?.name?.toLowerCase().includes('massage') ||
                  // If category indicates it's a service
                  (categoryMap.get(item.item_data?.category_id)?.toLowerCase().includes('facial'));
      })
      .map(item => {
        const itemData = item.item_data || {};
        const variation = itemData.variations?.[0];
        const price = (variation?.item_variation_data?.price_money?.amount || 0) / 100;
        // service_duration is in ms
        const duration = variation?.item_variation_data?.service_duration ? variation.item_variation_data.service_duration / 60000 : 60;
        
        return {
          id: item.id,
          name: itemData.name || 'Unnamed Service',
          description: itemData.description,
          duration: duration,
          price: price,
          category: categoryMap.get(itemData.category_id) || 'General',
          squareServiceId: variation?.id
        };
      });
  }

  /**
   * Search for specific catalog items
   */
  async searchCatalogItems(query: string): Promise<any[]> {
    if (!isSquareConfigured()) {
      return this.getMockProducts().filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    try {
      const response = await fetch(`${this.baseUrl}/catalog/search`, {
        method: 'POST',
        headers: getSquareHeaders(),
        body: JSON.stringify({
          query: {
            text_query: {
              keywords: [query],
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Square API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.objects || [];
    } catch (error) {
      console.error('Error searching catalog:', error);
      return [];
    }
  }

  /**
   * Refresh the product cache from Square (via backend)
   */
  async refreshProductCache(accessToken: string = SQUARE_CONFIG.accessToken): Promise<{ success: boolean; count: number; message: string }> {
    try {
      const response = await fetch(`${API_BASE}/square-products-refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ 
            accessToken,
            isSandbox: SQUARE_CONFIG.environment === 'sandbox'
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to refresh Square cache');
      }

      const data = await response.json();
      return {
        success: data.success,
        count: data.count || 0,
        message: data.message
      };
    } catch (error) {
      console.error('Error refreshing Square cache:', error);
      throw error;
    }
  }

  /**
   * Get products formatted for display
   */
  async getProducts(): Promise<SquareProduct[]> {
    const items = await this.listCatalogItems(['ITEM']);
    
    return items.map(item => {
      const itemData = item.item_data || {};
      const variation = itemData.variations?.[0];
      const price = variation?.item_variation_data?.price_money?.amount || 0;

      return {
        id: item.id,
        name: itemData.name || 'Unnamed Product',
        description: itemData.description,
        price: price / 100, // Convert cents to dollars
        currency: 'USD',
        imageUrl: itemData.image_ids?.[0],
        category: itemData.category_id,
        // squareItemId is NOT the same as item.id. 
        // It requires a specific checkout link token which is not present in the catalog data.
        // We will leave it undefined by default to prevent broken links.
        squareItemId: undefined, 
        benefits: itemData.custom_attribute_values?.['benefits']?.string_value?.split(', ') || [],
        variations: itemData.variations?.map((v: any) => ({
          id: v.id,
          name: v.item_variation_data?.name || 'Standard',
          price: (v.item_variation_data?.price_money?.amount || 0) / 100,
        })),
      };
    });
  }

  /**
   * Mock products for development/demo (Simulating Raw Square API Response)
   */
  private getMockProducts(): any[] {
    return [
      {
        type: 'ITEM',
        id: 'mock-1',
        item_data: {
          name: 'Gentle Cleanser (Mock)',
          description: 'pH-balanced formula removing impurities while preserving barrier integrity',
          variations: [
            {
              id: 'var-1',
              item_variation_data: {
                name: 'Regular',
                price_money: { amount: 4500, currency: 'USD' }
              }
            }
          ],
          category_id: 'mock-cat-1',
          custom_attribute_values: {
            benefits: { string_value: 'Gentle, pH-balanced, Hydrating' }
          }
        }
      },
      {
        type: 'ITEM',
        id: 'mock-2',
        item_data: {
          name: 'Vitamin C + E Serum (Mock)',
          description: 'Professional-grade antioxidants for brightening and environmental protection',
          variations: [
            {
              id: 'var-2',
              item_variation_data: {
                name: 'Regular',
                price_money: { amount: 8500, currency: 'USD' }
              }
            }
          ],
          category_id: 'mock-cat-2'
        }
      },
      {
        type: 'ITEM',
        id: 'mock-3',
        item_data: {
          name: 'Hyaluronic Complex (Mock)',
          description: 'Multi-weight hyaluronic acid for deep hydration and plumping',
          variations: [
            {
              id: 'var-3',
              item_variation_data: {
                name: 'Regular',
                price_money: { amount: 6800, currency: 'USD' }
              }
            }
          ]
        }
      }
    ];
  }
}

/**
 * Bookings Service
 */
export class SquareBookingsService {
  private baseUrl = `${SQUARE_CONFIG.baseUrl}/v2`;

  /**
   * Get available time slots for a service
   */
  async searchAvailability(
    serviceVariationId: string,
    startAt: string,
    endAt: string
  ): Promise<any[]> {
    if (!isSquareConfigured()) {
      console.warn('Square API not configured. Using mock availability.');
      return this.getMockAvailability();
    }

    try {
      const response = await fetch(`${this.baseUrl}/bookings/availability/search`, {
        method: 'POST',
        headers: getSquareHeaders(),
        body: JSON.stringify({
          query: {
            filter: {
              location_id: SQUARE_CONFIG.locationId,
              segment_filters: [
                {
                  service_variation_id: serviceVariationId,
                  team_member_id_filter: {
                    any: [], // All team members
                  },
                },
              ],
              start_at_range: {
                start_at: startAt,
                end_at: endAt,
              },
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Square API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.availabilities || [];
    } catch (error) {
      console.error('Error searching availability:', error);
      return this.getMockAvailability();
    }
  }

  /**
   * Create a booking
   */
  async createBooking(bookingData: {
    serviceVariationId: string;
    startAt: string;
    customerId?: string;
    customerNote?: string;
  }): Promise<SquareBooking | null> {
    if (!isSquareConfigured()) {
      console.warn('Square API not configured. Cannot create real booking.');
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/bookings`, {
        method: 'POST',
        headers: getSquareHeaders(),
        body: JSON.stringify({
          booking: {
            location_id: SQUARE_CONFIG.locationId,
            start_at: bookingData.startAt,
            customer_id: bookingData.customerId,
            customer_note: bookingData.customerNote,
            appointment_segments: [
              {
                service_variation_id: bookingData.serviceVariationId,
              },
            ],
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Square API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.booking;
    } catch (error) {
      console.error('Error creating booking:', error);
      return null;
    }
  }

  /**
   * Mock availability for development
   */
  private getMockAvailability(): any[] {
    const slots = [];
    const today = new Date();
    
    for (let day = 1; day <= 7; day++) {
      const date = new Date(today);
      date.setDate(date.getDate() + day);
      
      for (let hour = 9; hour <= 16; hour++) {
        const slotTime = new Date(date);
        slotTime.setHours(hour, 0, 0, 0);
        
        slots.push({
          start_at: slotTime.toISOString(),
          location_id: SQUARE_CONFIG.locationId,
          available: Math.random() > 0.3, // 70% available
        });
      }
    }
    
    return slots;
  }
}

/**
 * Customer Service
 */
export class SquareCustomersService {
  private baseUrl = `${SQUARE_CONFIG.baseUrl}/v2`;

  /**
   * Create a new customer
   */
  async createCustomer(customerData: {
    givenName: string;
    familyName: string;
    emailAddress?: string;
    phoneNumber?: string;
  }): Promise<SquareCustomer | null> {
    if (!isSquareConfigured()) {
      console.warn('Square API not configured. Cannot create real customer.');
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/customers`, {
        method: 'POST',
        headers: getSquareHeaders(),
        body: JSON.stringify({
          given_name: customerData.givenName,
          family_name: customerData.familyName,
          email_address: customerData.emailAddress,
          phone_number: customerData.phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error(`Square API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.customer;
    } catch (error) {
      console.error('Error creating customer:', error);
      return null;
    }
  }

  /**
   * Search for customers
   */
  async searchCustomers(query: string): Promise<SquareCustomer[]> {
    if (!isSquareConfigured()) {
      return [];
    }

    try {
      const response = await fetch(`${this.baseUrl}/customers/search`, {
        method: 'POST',
        headers: getSquareHeaders(),
        body: JSON.stringify({
          query: {
            filter: {
              email_address: {
                fuzzy: query,
              },
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Square API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.customers || [];
    } catch (error) {
      console.error('Error searching customers:', error);
      return [];
    }
  }
}

/**
 * Payment Service
 */
export class SquarePaymentsService {
  private baseUrl = `${SQUARE_CONFIG.baseUrl}/v2`;

  /**
   * Create a payment
   */
  async createPayment(paymentData: {
    sourceId: string; // From Square Web Payments SDK
    amount: number;
    currency: string;
    customerId?: string;
    note?: string;
  }): Promise<any> {
    if (!isSquareConfigured()) {
      console.warn('Square API not configured. Cannot process real payment.');
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/payments`, {
        method: 'POST',
        headers: getSquareHeaders(),
        body: JSON.stringify({
          source_id: paymentData.sourceId,
          amount_money: {
            amount: Math.round(paymentData.amount * 100), // Convert to cents
            currency: paymentData.currency,
          },
          customer_id: paymentData.customerId,
          location_id: SQUARE_CONFIG.locationId,
          note: paymentData.note,
          autocomplete: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Square API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.payment;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }
}

// Export service instances
export const catalogService = new SquareCatalogService();
export const bookingsService = new SquareBookingsService();
export const customersService = new SquareCustomersService();
export const paymentsService = new SquarePaymentsService();