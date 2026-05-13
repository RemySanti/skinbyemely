import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Loader2, ShoppingCart, Trash2, Plus, Minus, Lock, Truck, ShieldCheck, RefreshCw, Mail } from 'lucide-react';
import { cartService, Cart as CartType } from '../services/cartService';
import { stripeService } from '../services/stripeService';
import { Link } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';

const FREE_SHIPPING_THRESHOLD = 49;

export default function Cart() {
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    try {
      setLoading(true);
      const currentCart = cartService.getCart();
      setCart(currentCart);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    
    try {
      setUpdating(itemId);
      const updatedCart = cartService.updateQuantity(itemId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    } finally {
      setUpdating(null);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    try {
      setUpdating(itemId);
      const updatedCart = cartService.removeItem(itemId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    } finally {
      setUpdating(null);
    }
  };

  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) return;

    try {
      setCheckingOut(true);
      const response = await stripeService.createCheckoutSession(cart.items);
      
      if (response.url) {
        window.location.href = response.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to start checkout");
      setCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#b8956a] animate-spin mx-auto mb-4" />
          <p className="text-[#6b6b6b]">Loading your cart...</p>
        </div>
      </div>
    );
  }

  const isEmpty = !cart || !cart.items || cart.items.length === 0;

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-px bg-gradient-bronze mx-auto mb-6" />
          <h1 className="text-5xl font-serif text-[#2c2c2c] mb-4">Shopping Cart</h1>
          <p className="text-lg text-[#6b6b6b]">
            {isEmpty ? 'Your cart is empty' : `${cart.items.length} item${cart.items.length !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          {isEmpty ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <ShoppingCart className="w-16 h-16 text-[#b8956a]/30 mx-auto mb-6" />
              <p className="text-[#6b6b6b] mb-6">Your shopping cart is empty</p>
              <Link to="/products">
                <Button className="btn-bronze rounded-full px-8 py-3">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      {item.image ? (
                        <div className="w-24 h-24 bg-[#faf8f5] rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 bg-[#faf8f5] rounded overflow-hidden flex-shrink-0 flex items-center justify-center border border-[#b8956a]/10">
                            <span className="text-2xl font-serif text-[#b8956a]">{item.name.charAt(0)}</span>
                        </div>
                      )}

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-lg text-[#2c2c2c] mb-1">
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className="text-sm text-[#6b6b6b] mb-2 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <p className="text-[#b8956a]">
                          ${item.price.toFixed(2)} each
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-4">
                          <div className="flex items-center border border-[#b8956a]/20 rounded-full overflow-hidden">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={updating === item.id || item.quantity <= 1}
                              className="px-3 py-1 hover:bg-[#b8956a]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-1 text-[#2c2c2c] min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={updating === item.id}
                              className="px-3 py-1 hover:bg-[#b8956a]/10 transition-colors disabled:opacity-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={updating === item.id}
                            className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
                          >
                            {updating === item.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-xl font-serif text-[#2c2c2c]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
                  <h2 className="font-serif text-xl text-[#2c2c2c] mb-6">Order Summary</h2>

                  {/* Free Shipping Progress */}
                  {cart.total <= FREE_SHIPPING_THRESHOLD ? (
                    <div className="mb-6 p-3 bg-[#faf8f5] rounded-md border border-[#b8956a]/10">
                      <p className="text-xs text-[#6b6b6b] mb-2 text-center">
                        Add <span className="font-semibold text-[#b8956a]">${(FREE_SHIPPING_THRESHOLD - cart.total + 0.01).toFixed(2)}</span> more for <span className="font-semibold text-[#b8956a]">FREE shipping</span>
                      </p>
                      <div className="w-full h-1.5 bg-[#b8956a]/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#b8956a] rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((cart.total / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6 p-3 bg-[#faf8f5] rounded-md border border-[#b8956a]/10 text-center">
                      <p className="text-xs text-[#b8956a] font-medium tracking-wide uppercase">
                        You qualify for free standard shipping!
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6b6b6b]">Subtotal</span>
                      <span className="text-[#2c2c2c]">${cart.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6b6b6b]">Shipping</span>
                      <span className="text-[#2c2c2c] italic text-xs">
                        {cart.total >= FREE_SHIPPING_THRESHOLD ? 'Free' : 'Calculated at checkout'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6b6b6b]">Tax</span>
                      <span className="text-[#2c2c2c] italic text-xs">Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#b8956a]/10 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-serif text-lg text-[#2c2c2c]">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-serif text-[#2c2c2c] block">
                            ${cart.total.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-[#6b6b6b] uppercase tracking-wider">
                            + Shipping & Tax
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Block */}
                  <div className="mb-6 space-y-2 bg-[#faf8f5] p-4 rounded-md border border-[#b8956a]/10">
                    <div className="flex items-center gap-2 text-xs text-[#6b6b6b]">
                        <ShieldCheck className="w-4 h-4 text-[#b8956a]" />
                        <span>Secure SSL Checkout via Stripe</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#6b6b6b]">
                        <Truck className="w-4 h-4 text-[#b8956a]" />
                        <span>Fast Shipping (3-5 Business Days)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#6b6b6b]">
                        <RefreshCw className="w-4 h-4 text-[#b8956a]" />
                        <span>Easy Returns within 30 days</span>
                    </div>
                     <div className="flex items-center gap-2 text-xs text-[#6b6b6b]">
                        <Mail className="w-4 h-4 text-[#b8956a]" />
                        <span>Support: emely@skinbyemely.com</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={checkingOut}
                    className="w-full btn-bronze py-6 text-lg rounded-full hover:shadow-lg transition-all mb-4"
                  >
                    {checkingOut ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Redirecting...
                        </>
                    ) : (
                        <>
                            <Lock className="w-4 h-4 mr-2" />
                            Secure Checkout
                        </>
                    )}
                  </Button>

                  <div className="flex justify-center gap-4 text-[10px] text-[#b8956a] uppercase tracking-widest">
                    <Link to="/about" className="hover:underline">Shipping</Link>
                    <Link to="/about" className="hover:underline">Returns</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                    <Link to="/about" className="hover:underline">Privacy</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}