/**
 * Medusa Service
 * Handles all ecommerce operations via Medusa.js
 */

import Medusa from "@medusajs/medusa-js";

// Get Medusa backend URL from environment or use default
const MEDUSA_BACKEND_URL = typeof window !== 'undefined' 
  ? (window as any).MEDUSA_BACKEND_URL || 'http://localhost:9000'
  : 'http://localhost:9000';

// Initialize Medusa client
const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });

export interface MedusaProduct {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  images: string[];
  variants: {
    id: string;
    title: string;
    prices: {
      amount: number;
      currency_code: string;
    }[];
  }[];
  metadata: Record<string, any>;
}

export interface MedusaCart {
  id: string;
  items: {
    id: string;
    title: string;
    thumbnail: string | null;
    quantity: number;
    unit_price: number;
    total: number;
    variant: {
      id: string;
      title: string;
      product: {
        id: string;
        title: string;
      };
    };
  }[];
  subtotal: number;
  total: number;
  region: {
    currency_code: string;
  };
}

class MedusaService {
  private cartId: string | null = null;

  constructor() {
    // Load cart ID from localStorage if available
    if (typeof window !== 'undefined') {
      this.cartId = localStorage.getItem('medusa_cart_id');
    }
  }

  /**
   * Get all products from Medusa
   */
  async getProducts(): Promise<MedusaProduct[]> {
    try {
      const response = await medusa.products.list();
      return response.products as MedusaProduct[];
    } catch (error) {
      console.error('Error fetching Medusa products:', error);
      throw new Error('Failed to fetch products from Medusa');
    }
  }

  /**
   * Get a single product by ID
   */
  async getProduct(id: string): Promise<MedusaProduct> {
    try {
      const response = await medusa.products.retrieve(id);
      return response.product as MedusaProduct;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  }

  /**
   * Get or create a cart
   */
  async getCart(): Promise<MedusaCart> {
    try {
      // If we have a cart ID, try to retrieve it
      if (this.cartId) {
        try {
          const response = await medusa.carts.retrieve(this.cartId);
          return response.cart as MedusaCart;
        } catch (error) {
          // Cart not found, create a new one
          console.log('Cart not found, creating new cart');
          this.cartId = null;
        }
      }

      // Create a new cart
      const response = await medusa.carts.create();
      this.cartId = response.cart.id;
      
      // Save cart ID to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('medusa_cart_id', this.cartId);
      }

      return response.cart as MedusaCart;
    } catch (error) {
      console.error('Error getting cart:', error);
      throw new Error('Failed to get cart');
    }
  }

  /**
   * Add item to cart
   */
  async addToCart(variantId: string, quantity: number = 1): Promise<MedusaCart> {
    try {
      const cart = await this.getCart();
      const response = await medusa.carts.lineItems.create(cart.id, {
        variant_id: variantId,
        quantity,
      });
      return response.cart as MedusaCart;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw new Error('Failed to add item to cart');
    }
  }

  /**
   * Update cart item quantity
   */
  async updateCartItem(lineItemId: string, quantity: number): Promise<MedusaCart> {
    try {
      const cart = await this.getCart();
      const response = await medusa.carts.lineItems.update(cart.id, lineItemId, {
        quantity,
      });
      return response.cart as MedusaCart;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw new Error('Failed to update cart item');
    }
  }

  /**
   * Remove item from cart
   */
  async removeFromCart(lineItemId: string): Promise<MedusaCart> {
    try {
      const cart = await this.getCart();
      const response = await medusa.carts.lineItems.delete(cart.id, lineItemId);
      return response.cart as MedusaCart;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw new Error('Failed to remove item from cart');
    }
  }

  /**
   * Create payment sessions for checkout
   */
  async createPaymentSessions(): Promise<MedusaCart> {
    try {
      const cart = await this.getCart();
      const response = await medusa.carts.createPaymentSessions(cart.id);
      return response.cart as MedusaCart;
    } catch (error) {
      console.error('Error creating payment sessions:', error);
      throw new Error('Failed to create payment sessions');
    }
  }

  /**
   * Set payment session (e.g., select Stripe)
   */
  async setPaymentSession(providerId: string = 'stripe'): Promise<MedusaCart> {
    try {
      const cart = await this.getCart();
      const response = await medusa.carts.setPaymentSession(cart.id, {
        provider_id: providerId,
      });
      return response.cart as MedusaCart;
    } catch (error) {
      console.error('Error setting payment session:', error);
      throw new Error('Failed to set payment session');
    }
  }

  /**
   * Complete cart (after payment)
   */
  async completeCart(): Promise<any> {
    try {
      const cart = await this.getCart();
      const response = await medusa.carts.complete(cart.id);
      
      // Clear cart ID after completion
      this.cartId = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('medusa_cart_id');
      }

      return response;
    } catch (error) {
      console.error('Error completing cart:', error);
      throw new Error('Failed to complete order');
    }
  }

  /**
   * Get cart item count
   */
  async getCartItemCount(): Promise<number> {
    try {
      if (!this.cartId) return 0;
      const cart = await this.getCart();
      return cart.items.reduce((count, item) => count + item.quantity, 0);
    } catch (error) {
      return 0;
    }
  }

  /**
   * Clear cart
   */
  clearCart(): void {
    this.cartId = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('medusa_cart_id');
    }
  }
}

export const medusaService = new MedusaService();
