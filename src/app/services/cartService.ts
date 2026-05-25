/**
 * Cart Service
 * Manages shopping cart for Stripe products
 */

export interface CartItem {
  id: string;
  productId: string;
  priceId: string;
  name: string;
  description: string | null;
  image: string | null;
  price: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const CART_STORAGE_KEY = 'stripe_cart';

class CartService {
  /**
   * Get current cart from localStorage
   */
  getCart(): Cart {
    if (typeof window === 'undefined') {
      return { items: [], total: 0, itemCount: 0 };
    }

    try {
      const cartData = localStorage.getItem(CART_STORAGE_KEY);
      if (!cartData) {
        return { items: [], total: 0, itemCount: 0 };
      }

      const items: CartItem[] = JSON.parse(cartData);
      return this.calculateCart(items);
    } catch (error) {
      console.error('Error loading cart:', error);
      return { items: [], total: 0, itemCount: 0 };
    }
  }

  /**
   * Calculate cart totals
   */
  private calculateCart(items: CartItem[]): Cart {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { items, total, itemCount };
  }


  /**
   * Add item to cart
   */
  addToCart(product: {
    id: string;
    priceId: string;
    name: string;
    description: string | null;
    image: string | null;
    price: number;
  }, quantity: number = 1): Cart {
    const cart = this.getCart();
    const existingItem = cart.items.find(item => item.productId === product.id);

    if (existingItem) {
      // Update quantity of existing item
      existingItem.quantity += quantity;
      return this.saveCart(cart.items);
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        priceId: product.priceId,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        quantity
      };
      return this.saveCart([...cart.items, newItem]);
    }
  }

  /**
   * Update item quantity
   */
  updateQuantity(itemId: string, quantity: number): Cart {
    const cart = this.getCart();
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      return this.removeItem(itemId);
    }

    const items = cart.items.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );

    return this.saveCart(items);
  }

  /**
   * Remove item from cart
   */
  removeItem(itemId: string): Cart {
    const cart = this.getCart();
    const items = cart.items.filter(item => item.id !== itemId);
    return this.saveCart(items);
  }

  /**
   * Clear entire cart
   */
  clearCart(): Cart {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
    return { items: [], total: 0, itemCount: 0 };
  }

  /**
   * Get cart item count
   */
  getItemCount(): number {
    return this.getCart().itemCount;
  }

  /**
   * Subscribe to cart changes
   */
  subscribeToCart(callback: (cart: Cart) => void): () => void {
    const handler = () => {
        callback(this.getCart());
    };
    
    // Listen for custom event 'cart-updated' for same-window updates
    window.addEventListener('cart-updated', handler);

    // Listen for storage event for cross-tab updates
    const storageHandler = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY) {
        callback(this.getCart());
      }
    };
    window.addEventListener('storage', storageHandler);

    return () => {
        window.removeEventListener('cart-updated', handler);
        window.removeEventListener('storage', storageHandler);
    };
  }

  /**
   * Check if product is in cart
   */
  isInCart(productId: string): boolean {
    const cart = this.getCart();
    return cart.items.some(item => item.productId === productId);
  }

  private notifyListeners() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cart-updated'));
    }
  }

  /**
   * Save cart to localStorage
   */
  private saveCart(items: CartItem[]): Cart {
    if (typeof window === 'undefined') {
      return { items: [], total: 0, itemCount: 0 };
    }

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      this.notifyListeners();
      return this.calculateCart(items);
    } catch (error) {
      console.error('Error saving cart:', error);
      return this.calculateCart(items);
    }
  }
}

export const cartService = new CartService();
