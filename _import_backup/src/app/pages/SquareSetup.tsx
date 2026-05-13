/**
 * Square Setup & Testing Page
 * Configuration guide and integration testing
 */

import { SquareSetupGuide } from '../components/SquareSetupGuide';
import { SquarePaymentForm } from '../components/SquarePaymentForm';
import { Settings, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export default function SquareSetup() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 px-4 bg-[#2c2c2c] text-white texture-grain">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-bronze rounded-full flex items-center justify-center mx-auto mb-6">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-4">Square API Integration</h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Complete setup guide for online booking and product sales
          </p>
        </div>
      </section>

      {/* Setup Guide */}
      <section className="py-16 px-4 bg-white">
        <SquareSetupGuide />
      </section>

      {/* Payment Test Section */}
      <section className="py-16 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm text-[#b8956a]">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-serif text-[#2c2c2c]">Test Payment Integration</h2>
              <p className="text-[#6b6b6b]">Use this form to verify your Square Web Payments SDK installation</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Testing Instructions</CardTitle>
                  <CardDescription>Follow these steps to test payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">1</span>
                    <p className="text-sm text-gray-600">Ensure you are in <strong>Sandbox Mode</strong> (check /config/square.ts)</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">2</span>
                    <p className="text-sm text-gray-600">Enter a test card number (Sandbox only)</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-xs font-mono text-gray-600 space-y-1">
                    <p>Card: 4111 1111 1111 1111</p>
                    <p>Exp: 12/30</p>
                    <p>CVV: 123</p>
                    <p>Zip: 12345</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">3</span>
                    <p className="text-sm text-gray-600">Click "Pay $1.00"</p>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-amber-50 border border-amber-200 rounded p-4 text-sm text-amber-800">
                <strong>Note:</strong> This form requires the <code>react-square-web-payments-sdk</code> package. If you see an error, ensure it is installed.
              </div>
            </div>

            <SquarePaymentForm 
              amount={1.00} 
              onPaymentComplete={(result) => console.log('Payment Success:', result)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
