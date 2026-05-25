import { useEffect, useState, useMemo, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { AddressElement, Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from './ui/button';
import { Loader2, Lock } from 'lucide-react';
import { stripeService } from '../services/stripeService';
import { cartService } from '../services/cartService';
import { checkoutConfigService, CheckoutConfig } from '../services/checkoutConfigService';
import { toast } from 'sonner';

// Initialize Stripe outside of component to avoid recreating object on every render
// Using live publishable key that matches the live secret key
const getPublishableKey = () => {
  return 'pk_live_51Se5i1Bsgl91aCgif55G7Rajo4jtlgoILzOe9tpUPUcwxdPf8qjJFhlgnUVOCMACmMPcfNxWZ8eSK4w3QIUAzw6RTbp77rz8PCouITNuIVPNVx61xuAQ1aB6iHk6gAMnQh803TGQccoCx';
};

const stripePromise = loadStripe(getPublishableKey());

interface CheckoutFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (msg: string) => void;
  config: CheckoutConfig;
}

function CheckoutForm({ amount, onSuccess, onError, config }: CheckoutFormProps) {
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

    // Defensive check: Ensure PaymentElement is actually mounted and registered
    const paymentElement = elements.getElement(PaymentElement);
    if (!paymentElement) {
      console.error('Payment Element not found in DOM');
      setErrorMessage('Payment form not properly loaded. Please try again.');
      return;
    }

    if (!isReady) {
      console.log('Payment element not ready yet');
      return;
    }

    setProcessing(true);
    setErrorMessage(null);

    try {
      // confirmPayment will trigger validation on the Payment Element
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/order-success',
        },
        redirect: 'if_required'
      });

      if (error) {
        console.error('Stripe payment error:', error);
        setErrorMessage(error.message || 'Payment failed');
        onError(error.message || 'Payment failed');
        setProcessing(false);
      } else {
        // Payment succeeded!
        onSuccess();
        setProcessing(false);
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setErrorMessage(err.message || 'Payment failed');
      onError(err.message || 'Payment failed');
      setProcessing(false);
    }
  };

  const buttonText = processing 
    ? 'Processing...' 
    : (isReady ? `Complete Order - $${amount.toFixed(2)}` : 'Loading payment form...');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {config.checkoutTitle && (
        <h3 className="text-lg font-serif text-[#2c2c2c] text-center">{config.checkoutTitle}</h3>
      )}

      <div className="space-y-4">
        {/* Contact Information & Address */}
        <div className="space-y-4">
            <h4 className="text-sm font-medium text-[#2c2c2c]">Shipping Information</h4>
            <AddressElement options={{ mode: 'shipping', allowedCountries: ['US'] }} />
        </div>

        <h4 className="text-sm font-medium text-[#2c2c2c] pt-4">Payment Method</h4>
        <div className="min-h-[250px]">
            <PaymentElement 
                onReady={() => {
                    console.log('Payment Element Ready');
                    setIsReady(true);
                }}
                options={{
                    layout: 'tabs',
                    // Don't ask for address again in the payment element if we use AddressElement,
                    // but PaymentElement usually asks for Billing. 
                    // Let's keep defaults for PaymentElement which is Billing.
                }}
            />
        </div>
      </div>
      
      {errorMessage && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded border border-red-100">
          {errorMessage}
        </div>
      )}

      {config.checkoutMessage && (
        <p className="text-sm text-[#6b6b6b] text-center italic">{config.checkoutMessage}</p>
      )}

      <Button 
        type="submit" 
        disabled={!stripe || !elements || !isReady || processing}
        className="w-full btn-bronze py-6 text-lg"
      >
        {processing ? (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <Lock className="w-4 h-4 mr-2" />
        )}
        {buttonText}
      </Button>
      
      {config.termsMessage && (
        <p className="text-xs text-[#6b6b6b] text-center">{config.termsMessage}</p>
      )}
    </form>
  );
}

interface StripeCheckoutProps {
  onClose: () => void;
}

export function StripeCheckout({ onClose }: StripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(cartService.getCart());
  const [checkoutConfig, setCheckoutConfig] = useState<CheckoutConfig>({});
  const initialized = useRef(false);

  const totalAmount = cart.total;

  const options = useMemo(() => ({
    clientSecret: clientSecret || '',
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#b8956a',
      }
    }
  }), [clientSecret]);

  useEffect(() => {
    // Prevent double initialization in Strict Mode
    if (initialized.current) return;
    initialized.current = true;

    const initPayment = async () => {
      try {
        setLoading(true);

        // Fetch config
        const config = await checkoutConfigService.getConfig();
        setCheckoutConfig(config);

        // Check if cart is empty
        if (cart.items.length === 0) {
          setError('Your cart is empty');
          setLoading(false);
          return;
        }

        // Convert cart items to the format expected by the backend
        const items = cart.items.map(item => ({
          price: item.price,
          quantity: item.quantity
        }));

        const { clientSecret } = await stripeService.createPaymentIntent(items);
        setClientSecret(clientSecret);
        setLoading(false);
      } catch (err: any) {
        console.error('Error initializing payment:', err);
        setError(err.message || 'Failed to initialize payment');
        setLoading(false);
      }
    };

    initPayment();
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

  if (!clientSecret) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 mb-4">Unable to load checkout</div>
        <Button onClick={onClose} variant="outline">Close</Button>
      </div>
    );
  }

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
                <p className="text-[#2c2c2c]">{item.name}</p>
                {item.description && (
                  <p className="text-[#6b6b6b] text-xs line-clamp-1">{item.description}</p>
                )}
                <p className="text-[#6b6b6b] text-xs">Qty: {item.quantity}</p>
              </div>
              <p className="text-[#2c2c2c]">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="pt-4 border-t border-[#b8956a]/10 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#6b6b6b]">Subtotal</span>
            <span className="text-[#2c2c2c]">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-serif text-[#2c2c2c]">Total</span>
            <span className="text-2xl font-serif text-[#2c2c2c]">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      {/* Remove explicit key to rely on options stability */}
      <Elements 
        stripe={stripePromise} 
        options={options}
      >
        <CheckoutForm 
          amount={totalAmount}
          onSuccess={() => {
            // Clear the cart after successful payment
            cartService.clearCart();
            toast.success('Order Complete! Thank you for your purchase.');
            onClose();
          }}
          onError={(msg) => {
            toast.error(msg);
            console.error(msg);
          }}
          config={checkoutConfig}
        />
      </Elements>
    </div>
  );
}
