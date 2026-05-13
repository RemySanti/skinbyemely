/**
 * Stripe Service
 * Handles interaction with the backend for Stripe operations
 */

import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-fd83a735`;

export interface StripeProductResult {
  squareId: string;
  stripeProductId: string;
  stripePriceId: string;
  name: string;
}

export interface StripeProduct {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  price: number | null;
  priceId: string | null;
  currency: string;
  metadata: Record<string, string>;
}

export const stripeService = {
  /**
   * Check if backend is healthy and configured
   */
  async checkHealth() {
    try {
        const response = await fetch(`${API_BASE}/health`, {
            headers: {
                'Authorization': `Bearer ${publicAnonKey}`
            }
        });
        if (!response.ok) return { status: 'error', configured: false };
        return await response.json();
    } catch (e) {
        return { status: 'unreachable', configured: false };
    }
  },

  /**
   * Migrate products from Square data to Stripe
   */
  async migrateProducts(products: any[], secretKey: string) {
    const response = await fetch(`${API_BASE}/stripe-migrate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({
        items: products,
        secretKey,
      }),
    });

    if (!response.ok) {
      let errorMsg = 'Migration failed';
      let errorText = '';
      
      try {
        errorText = await response.text();
        try {
            const errorData = JSON.parse(errorText);
            errorMsg = errorData.error || errorData.message || errorText;
        } catch {
            // Not JSON
            errorMsg = `Server error (${response.status}): ${errorText.substring(0, 200)}`;
        }
      } catch (readError) {
        errorMsg = `Server error (${response.status}) - Could not read response body`;
      }
      
      throw new Error(errorMsg);
    }

    return await response.json();
  },

  /**
   * Create a Payment Intent for Embedded Checkout (Legacy/Complex)
   */
  async createPaymentIntent(items: { price: number; quantity?: number }[], secretKey?: string) {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
    };

    if (secretKey) {
        headers['X-Stripe-Secret-Key'] = secretKey;
    }

    const response = await fetch(`${API_BASE}/stripe-create-payment-intent`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        items,
        secretKey // Optional, passed in body as fallback
      }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Payment creation failed');
    }

    return await response.json();
  },

  /**
   * Create a Hosted Checkout Session (Simple/Robust)
   */
  async createCheckoutSession(items: any[]) {
     const response = await fetch(`${API_BASE}/stripe-create-checkout-session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
            items,
            successUrl: window.location.origin + '/order-success',
            cancelUrl: window.location.origin + '/cart',
        }),
     });

     if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
     }

     return await response.json();
  },

  /**
   * Fetch all active Stripe products
   */
  async getProducts(): Promise<StripeProduct[]> {
    try {
      const response = await fetch(`${API_BASE}/stripe-products`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch products');
      }

      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error('Error fetching Stripe products:', error);
      throw error;
    }
  },

  /**
   * Refresh the product cache from Stripe
   * Should be called from Owner Dashboard after adding/updating products
   */
  async refreshProductCache(): Promise<{ success: boolean; count: number; message: string }> {
    try {
      const response = await fetch(`${API_BASE}/stripe-products-refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to refresh product cache');
      }

      const data = await response.json();
      return {
        success: data.success,
        count: data.count || 0,
        message: data.message
      };
    } catch (error) {
      console.error('Error refreshing product cache:', error);
      throw error;
    }
  }
};
