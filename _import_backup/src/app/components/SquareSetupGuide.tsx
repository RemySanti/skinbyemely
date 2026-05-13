/**
 * Square Setup Guide Component
 * Instructions for configuring Square API integration
 */

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Key, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { isSquareConfigured } from '../config/square';

export function SquareSetupGuide() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const isConfigured = isSquareConfigured();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Status Banner */}
      <div className={`
        p-6 rounded mb-8 flex items-center gap-4
        ${isConfigured 
          ? 'bg-green-50 border border-green-200' 
          : 'bg-amber-50 border border-amber-200'
        }
      `}>
        {isConfigured ? (
          <>
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-serif text-lg text-green-900 mb-1">
                Square API Connected
              </h3>
              <p className="text-sm text-green-700">
                Your website is ready to accept bookings and process payments through Square.
              </p>
            </div>
          </>
        ) : (
          <>
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="font-serif text-lg text-amber-900 mb-1">
                Square API Setup Required
              </h3>
              <p className="text-sm text-amber-700">
                Complete the steps below to enable booking and payment functionality.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Setup Instructions */}
      <div className="space-y-8">
        {/* Step 1 */}
        <div className="bg-white p-8 border border-[#b8956a]/15 rounded">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gradient-bronze rounded-full flex items-center justify-center text-white font-serif flex-shrink-0">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-serif text-[#2c2c2c] mb-4">
                Access Your Square Developer Account
              </h3>
              <p className="text-[#6b6b6b] mb-6 leading-relaxed">
                Log in to your Square Developer Dashboard to get your API credentials.
              </p>
              <a
                href="https://developer.squareup.com/apps"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="btn-outline-bronze px-6 py-3 rounded">
                  Open Square Developer Dashboard
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-8 border border-[#b8956a]/15 rounded">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gradient-bronze rounded-full flex items-center justify-center text-white font-serif flex-shrink-0">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-serif text-[#2c2c2c] mb-4">
                Get Your API Credentials
              </h3>
              <div className="space-y-4 mb-6">
                <div className="bg-[#faf8f5] p-4 rounded">
                  <h4 className="text-sm tracking-wider text-[#b8956a] mb-2">
                    ACCESS TOKEN
                  </h4>
                  <p className="text-sm text-[#6b6b6b] mb-3">
                    Found in: <strong>Credentials</strong> tab → <strong>Sandbox/Production Access Token</strong>
                  </p>
                  <p className="text-xs text-[#6b6b6b]">
                    Start with Sandbox for testing, then switch to Production when ready to go live.
                  </p>
                </div>

                <div className="bg-[#faf8f5] p-4 rounded">
                  <h4 className="text-sm tracking-wider text-[#b8956a] mb-2">
                    APPLICATION ID
                  </h4>
                  <p className="text-sm text-[#6b6b6b]">
                    Found in: <strong>Credentials</strong> tab → <strong>Application ID</strong>
                  </p>
                </div>

                <div className="bg-[#faf8f5] p-4 rounded">
                  <h4 className="text-sm tracking-wider text-[#b8956a] mb-2">
                    LOCATION ID
                  </h4>
                  <p className="text-sm text-[#6b6b6b] mb-2">
                    Found in: <strong>Square Dashboard</strong> → <strong>Locations</strong>
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-xs bg-white px-3 py-2 rounded border border-[#b8956a]/15 flex-1">
                      LMVSQK9C6PR4T
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard('LMVSQK9C6PR4T')}
                      className="border-[#b8956a]/30"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-[#6b6b6b] mt-2">
                    ↑ Your Brandon location ID (already configured)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-8 border border-[#b8956a]/15 rounded">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gradient-bronze rounded-full flex items-center justify-center text-white font-serif flex-shrink-0">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-serif text-[#2c2c2c] mb-4">
                Update Configuration File
              </h3>
              <p className="text-[#6b6b6b] mb-6 leading-relaxed">
                Open the file <code className="bg-[#faf8f5] px-2 py-1 rounded text-sm">/config/square.ts</code> and replace the placeholder values with your actual credentials.
              </p>

              <div className="bg-[#2c2c2c] p-6 rounded overflow-x-auto mb-4">
                <pre className="text-sm text-white">
{`export const SQUARE_CONFIG = {
  // Replace with your actual Access Token
  accessToken: 'YOUR_SQUARE_ACCESS_TOKEN_HERE',
  
  // Replace with your Application ID
  applicationId: 'YOUR_SQUARE_APPLICATION_ID_HERE',
  
  // Your location ID (already set)
  locationId: 'LMVSQK9C6PR4T',
  
  // Start with 'sandbox', switch to 'production' when live
  environment: 'sandbox' as 'sandbox' | 'production',
};`}
                </pre>
              </div>

              <div className="bg-red-50 border border-red-200 rounded p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <strong className="block mb-1">Security Warning</strong>
                    For production sites, use environment variables instead of hardcoding API keys.
                    Never commit real API credentials to version control.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white p-8 border border-[#b8956a]/15 rounded">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gradient-bronze rounded-full flex items-center justify-center text-white font-serif flex-shrink-0">
              4
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-serif text-[#2c2c2c] mb-4">
                Test Your Integration
              </h3>
              <p className="text-[#6b6b6b] mb-6 leading-relaxed">
                Once configured, test your integration in Sandbox mode before going live.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#faf8f5] p-6 rounded">
                  <h4 className="text-sm tracking-wider text-[#b8956a] mb-3">
                    ✓ TEST BOOKING
                  </h4>
                  <p className="text-sm text-[#6b6b6b]">
                    Visit your Services page and try booking an appointment
                  </p>
                </div>

                <div className="bg-[#faf8f5] p-6 rounded">
                  <h4 className="text-sm tracking-wider text-[#b8956a] mb-3">
                    ✓ TEST PRODUCTS
                  </h4>
                  <p className="text-sm text-[#6b6b6b]">
                    Check that products load correctly on the Products page
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-white p-8 border border-[#b8956a]/15 rounded">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gradient-bronze rounded-full flex items-center justify-center text-white font-serif flex-shrink-0">
              5
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-serif text-[#2c2c2c] mb-4">
                Go Live with Production Credentials
              </h3>
              <p className="text-[#6b6b6b] mb-6 leading-relaxed">
                When ready to accept real bookings and payments:
              </p>

              <ol className="space-y-3 text-sm text-[#6b6b6b] mb-6">
                <li className="flex gap-3">
                  <span className="text-[#b8956a] font-serif">1.</span>
                  <span>Replace your Sandbox Access Token with your Production Access Token</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#b8956a] font-serif">2.</span>
                  <span>Change <code className="bg-[#faf8f5] px-2 py-1 rounded">environment</code> to <code className="bg-[#faf8f5] px-2 py-1 rounded">'production'</code></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#b8956a] font-serif">3.</span>
                  <span>Test thoroughly before announcing to clients</span>
                </li>
              </ol>

              <div className="bg-green-50 border border-green-200 rounded p-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <strong className="block mb-1">You're All Set!</strong>
                    Your SkinByEmely website is ready to accept online bookings and sell products directly through Square.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="mt-12 bg-[#faf8f5] p-8 rounded">
        <h3 className="text-lg font-serif text-[#2c2c2c] mb-6">
          Additional Resources
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <a
            href="https://developer.squareup.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#6b6b6b] hover:text-[#b8956a] transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Square API Documentation</span>
          </a>
          <a
            href="https://squareup.com/help/us/en/article/5614-square-for-retail-locations"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#6b6b6b] hover:text-[#b8956a] transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Managing Locations in Square</span>
          </a>
          <a
            href="https://developer.squareup.com/docs/appointments-api/what-it-does"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#6b6b6b] hover:text-[#b8956a] transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Appointments API Guide</span>
          </a>
          <a
            href="https://developer.squareup.com/docs/catalog-api/what-it-does"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#6b6b6b] hover:text-[#b8956a] transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Catalog API Guide</span>
          </a>
        </div>
      </div>
    </div>
  );
}
