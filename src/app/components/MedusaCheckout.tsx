import { useEffect, useState, useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from './ui/button';
import { Loader2, Lock, ShoppingCart } from 'lucide-react';
import { medusaService, MedusaCart } from '../services/medusaService';

// Using live publishable key
const stripePromise = loadStripe('pk_live_51Se5i1Bsgl91aCgif55G7Rajo4jtlgoILzOe9tpUPUcwxdPf8qjJFhlgnUVOCMACmMPcfNxWZ8eSK4w3QIUAzw6RTbp77rz8PCouITNuIVPNVx61xuAQ1aB6iHk6gAMnQh803TGQccoCx');

interface CheckoutFormProps {
  cart: MedusaCart;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

function CheckoutForm({ cart, onSuccess, onError }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe or Elements not initialized');
      return;
    }

    if (!isReady) {
      console.error('Payment element not ready');
      return;
    }

    // Verify that the PaymentElement is actually mounted and known to Elements
    const paymentElement = elements.getElement(PaymentElement);
    if (!paymentElement) {
      console.error('Payment Element instance not found in Elements group');
      setErrorMessage('Payment form is not ready. Please try again.');
      return;
    }

    setProcessing(true);
    setErrorMessage(null);

    try {
      // Confirm payment with Stripe
      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/order-success',
        },
        redirect: 'if_required'
      });

      if (stripeError) {
        console.error('Stripe confirm error:', stripeError);
        setErrorMessage(stripeError.message || 'Payment failed');
        onError(stripeError.message || 'Payment failed');
        setProcessing(false);
        return;
      }

      // Complete the order in Medusa
      await medusaService.completeCart();
      
      // Payment and order succeeded!
      onSuccess();
    } catch (error: any) {
      console.error('Checkout error:', error);
      setErrorMessage(error.message || 'Checkout failed');
      onError(error.message || 'Checkout failed');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement 
        onReady={() => setIsReady(true)}
        options={{
          layout: 'tabs'
        }}
      />
      
      {errorMessage && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded border border-red-100">
          {errorMessage}
        </div>
      )}

      <Button 
        type="submit" 
        disabled={!stripe || !elements || !isReady || processing}
        className="w-full btn-bronze py-6 text-lg"
      >
        {processing ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing Order...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4 mr-2" />
            Complete Order - ${(cart.total / 100).toFixed(2)}
          </>
        )}
      </Button>
    </form>
  );
}

interface MedusaCheckoutProps {
  onClose: () => void;
}

export function MedusaCheckout({ onClose }: MedusaCheckoutProps) {
  const [cart, setCart] = useState<MedusaCart | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initCheckout = async () => {
      try {
        setLoading(true);
        
        // Get the cart
        const currentCart = await medusaService.getCart();
        
        if (!currentCart.items || currentCart.items.length === 0) {
          setError('Your cart is empty');
          setLoading(false);
          return;
        }

        setCart(currentCart);

        // Create payment sessions (this initializes payment providers)
        const cartWithSessions = await medusaService.createPaymentSessions();
        
        // Select Stripe as the payment provider
        const cartWithStripe = await medusaService.setPaymentSession('stripe');
        
        // Get the payment session data which includes client_secret
        const paymentSession = (cartWithStripe as any).payment_session;
        if (paymentSession && paymentSession.data && paymentSession.data.client_secret) {
          setClientSecret(paymentSession.data.client_secret);
        } else {
          throw new Error('Failed to initialize Stripe payment session');
        }

        setLoading(false);
      } catch (err: any) {
        console.error('Error initializing checkout:', err);
        setError(err.message || 'Failed to initialize checkout');
        setLoading(false);
      }
    };

    initCheckout();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <Loader2 className="w-10 h-10 text-[#b8956a] animate-spin" />
        <p className="text-[#6b6b6b]">Preparing your checkout...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 mb-4">{error}</div>
        <Button onClick={onClose} variant="outline">Close</Button>
      </div>
    );
  }

  if (!cart || !clientSecret) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 mb-4">Unable to load checkout</div>
        <Button onClick={onClose} variant="outline">Close</Button>
      </div>
    );
  }

  const options = useMemo(() => ({
    clientSecret, 
    appearance: { 
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#b8956a',
      }
    } 
  }), [clientSecret]);

  return (
    <div className="p-1">
      {/* Order Summary */}
      <div className="mb-6 space-y-4">
        <h3 className="text-lg font-serif text-[#2c2c2c]">Order Summary</h3>
        
        {/* Cart Items */}
        <div className="space-y-3">
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between items-start text-sm">
              <div className="flex-1">
                <p className="text-[#2c2c2c]">{item.title}</p>
                {item.variant.title !== 'Default' && (
                  <p className="text-[#6b6b6b] text-xs">{item.variant.title}</p>
                )}
                <p className="text-[#6b6b6b] text-xs">Qty: {item.quantity}</p>
              </div>
              <p className="text-[#2c2c2c]">${(item.total / 100).toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="pt-4 border-t border-[#b8956a]/10 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#6b6b6b]">Subtotal</span>
            <span className="text-[#2c2c2c]">${(cart.subtotal / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-serif text-[#2c2c2c]">Total</span>
            <span className="text-2xl font-serif text-[#2c2c2c]">${(cart.total / 100).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <Elements 
        stripe={stripePromise} 
        options={options}
      >
        <CheckoutForm 
          cart={cart}
          onSuccess={() => {
            alert('Order Complete! Thank you for your purchase.');
            onClose();
          }}
          onError={(msg) => console.error(msg)}
        />
      </Elements>
    </div>
  );
}
