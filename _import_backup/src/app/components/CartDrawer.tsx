import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, Lock, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { cartService, Cart, CartItem } from '../services/cartService';
import { stripeService } from '../services/stripeService';
import { EASE_LUXURY } from '../utils/motion';
import { toast } from 'sonner@2.0.3';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FREE_SHIPPING_THRESHOLD = 49;

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [checkingOut, setCheckingOut] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial load
    setCart(cartService.getCart());

    // Subscribe to changes
    const unsubscribe = cartService.subscribeToCart((updatedCart) => {
      setCart(updatedCart);
    });

    return unsubscribe;
  }, []);

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setUpdating(itemId);
    cartService.updateQuantity(itemId, quantity);
    setTimeout(() => setUpdating(null), 300); // Small delay for visual feedback
  };

  const handleRemoveItem = (itemId: string) => {
    setUpdating(itemId);
    cartService.removeItem(itemId);
    setUpdating(null);
  };

  const handleCheckout = async () => {
    if (cart.items.length === 0) return;

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: EASE_LUXURY, duration: 0.5 }}
            className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#b8956a]/10">
              <h2 className="text-xl font-serif text-[#2c2c2c] flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Your Cart
                <span className="text-sm font-sans text-[#b8956a] ml-2">
                  ({cart.itemCount} items)
                </span>
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-[#b8956a] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-16 h-16 text-[#b8956a]/20" />
                  <p className="text-[#6b6b6b]">Your cart is empty</p>
                  <Button 
                    onClick={() => {
                        onClose();
                        navigate('/products');
                    }}
                    variant="outline"
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                cart.items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 group"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 bg-[#faf8f5] rounded overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#b8956a]">
                          <ShoppingBag className="w-8 h-8 opacity-30" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-[#2c2c2c] truncate pr-4">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-neutral-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-[#b8956a]">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-[#b8956a]/20 rounded overflow-hidden h-8">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={updating === item.id || item.quantity <= 1}
                            className="px-2 hover:bg-[#b8956a]/10 transition-colors disabled:opacity-50 h-full flex items-center"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-sm text-[#2c2c2c] min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={updating === item.id}
                            className="px-2 hover:bg-[#b8956a]/10 transition-colors disabled:opacity-50 h-full flex items-center"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        {updating === item.id && (
                          <Loader2 className="w-4 h-4 text-[#b8956a] animate-spin" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="p-6 border-t border-[#b8956a]/10 bg-[#faf8f5]/50 backdrop-blur-sm">
                {/* Free Shipping Progress */}
                {cart.total <= FREE_SHIPPING_THRESHOLD ? (
                  <div className="mb-4 text-center">
                    <p className="text-xs text-[#6b6b6b] mb-2">
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
                  <div className="mb-4 text-center">
                    <p className="text-xs text-[#b8956a] font-medium tracking-wide uppercase">
                      You qualify for free standard shipping!
                    </p>
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[#6b6b6b] text-sm">
                    <span>Subtotal</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#2c2c2c]">
                    <span className="font-serif text-lg">Total</span>
                    <span className="font-serif text-2xl">${cart.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleCheckout}
                    disabled={checkingOut}
                    className="w-full btn-bronze py-6 text-lg"
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
                  <Button
                    onClick={() => {
                        onClose();
                        navigate('/cart');
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    View Cart Page
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}