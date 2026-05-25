import { useState } from 'react';
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import { SQUARE_CONFIG, isSquareConfigured } from '../config/square';
import { paymentsService } from '../services/squareService';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SquarePaymentFormProps {
  amount: number;
  currency?: string;
  onPaymentComplete?: (paymentResult: any) => void;
  onPaymentError?: (error: any) => void;
}

export function SquarePaymentForm({ 
  amount, 
  currency = 'USD', 
  onPaymentComplete,
  onPaymentError 
}: SquarePaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isSquareConfigured()) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Configuration Error</AlertTitle>
        <AlertDescription>
          Square API credentials are not configured. Please check your configuration.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Payment Details</CardTitle>
        <CardDescription>
          Total due: ${amount.toFixed(2)} {currency}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {paymentStatus === 'success' ? (
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Payment Successful</h3>
              <p className="text-gray-500 text-sm mt-1">Thank you for your purchase.</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setPaymentStatus('idle')}
              className="mt-4"
            >
              Process Another Payment
            </Button>
          </div>
        ) : (
          <PaymentForm
            applicationId={SQUARE_CONFIG.applicationId}
            locationId={SQUARE_CONFIG.locationId}
            cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
              setIsProcessing(true);
              setErrorMessage(null);
              
              try {
                console.log('Token received:', token.token);
                
                // Process the payment on your backend (or service)
                const result = await paymentsService.createPayment({
                  sourceId: token.token,
                  amount: amount,
                  currency: currency,
                  note: 'Website Payment'
                });
                
                console.log('Payment result:', result);
                setPaymentStatus('success');
                toast.success('Payment processed successfully!');
                
                if (onPaymentComplete) {
                  onPaymentComplete(result);
                }
              } catch (error: any) {
                console.error('Payment processing failed:', error);
                setPaymentStatus('error');
                setErrorMessage(error.message || 'Payment processing failed');
                toast.error('Payment failed. Please try again.');
                
                if (onPaymentError) {
                  onPaymentError(error);
                }
              } finally {
                setIsProcessing(false);
              }
            }}
          >
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-gray-50">
                <CreditCard
                  buttonProps={{
                    css: {
                      backgroundColor: "#C9A063",
                      fontSize: "14px",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#b08a50",
                      },
                    },
                  }}
                  style={{
                    input: {
                      fontSize: "14px",
                    },
                    "input::placeholder": {
                      color: "#777",
                    },
                  }}
                />
              </div>
              
              {errorMessage && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Payment Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
            </div>
          </PaymentForm>
        )}
      </CardContent>
    </Card>
  );
}
