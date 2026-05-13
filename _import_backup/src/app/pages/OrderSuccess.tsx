import { useEffect } from 'react';
import { Button } from '../components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cartService } from '../services/cartService';

export default function OrderSuccess() {
  useEffect(() => {
    // Clear the cart when landing on success page
    cartService.clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4">
      <div className="bg-white p-12 rounded-lg shadow-lg max-w-lg w-full text-center border border-[#b8956a]/10">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-serif text-[#2c2c2c] mb-4">
          Order Confirmed
        </h1>
        
        <p className="text-[#6b6b6b] mb-8 leading-relaxed">
          Thank you for your purchase. You will receive an email confirmation shortly with your order details.
        </p>

        <div className="space-y-4">
          <Link to="/products">
            <Button className="w-full btn-bronze py-6 text-lg rounded">
              Continue Shopping
            </Button>
          </Link>
          
          <Link to="/">
            <Button variant="ghost" className="w-full text-[#6b6b6b] hover:text-[#2c2c2c]">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
