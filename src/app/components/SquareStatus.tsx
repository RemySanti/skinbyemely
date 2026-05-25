/**
 * Square Configuration Status Widget
 * Quick status check for Square API integration
 */

import { CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { isSquareConfigured, SQUARE_CONFIG } from '../config/square';
import { Button } from './ui/button';

export function SquareStatus() {
  const isConfigured = isSquareConfigured();
  const environment = SQUARE_CONFIG.environment;

  const checks = [
    {
      label: 'Access Token',
      status: SQUARE_CONFIG.accessToken !== 'YOUR_SQUARE_ACCESS_TOKEN_HERE',
    },
    {
      label: 'Application ID',
      status: SQUARE_CONFIG.applicationId !== 'YOUR_SQUARE_APPLICATION_ID_HERE',
    },
    {
      label: 'Location ID',
      status: SQUARE_CONFIG.locationId === 'LMVSQK9C6PR4T',
    },
  ];

  const allConfigured = checks.every(check => check.status);

  return (
    <div className="bg-white border border-[#b8956a]/15 rounded overflow-hidden">
      {/* Header */}
      <div className={`
        p-4 flex items-center justify-between
        ${allConfigured 
          ? 'bg-green-50 border-b border-green-200' 
          : 'bg-amber-50 border-b border-amber-200'
        }
      `}>
        <div className="flex items-center gap-3">
          {allConfigured ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-600" />
          )}
          <div>
            <h3 className="font-serif text-sm text-[#2c2c2c]">
              Square Integration
            </h3>
            <p className="text-xs text-[#6b6b6b]">
              {allConfigured ? 'Connected' : 'Setup Required'}
            </p>
          </div>
        </div>
        
        {allConfigured && (
          <div className={`
            px-3 py-1 rounded text-xs
            ${environment === 'production' 
              ? 'bg-green-600 text-white' 
              : 'bg-amber-500 text-white'
            }
          `}>
            {environment === 'production' ? 'LIVE' : 'SANDBOX'}
          </div>
        )}
      </div>

      {/* Status Checks */}
      <div className="p-4 space-y-3">
        {checks.map((check, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-sm text-[#6b6b6b]">{check.label}</span>
            {check.status ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600" />
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-[#b8956a]/15 bg-[#faf8f5]">
        {!allConfigured ? (
          <a href="/square-setup">
            <Button className="w-full btn-bronze py-2 rounded text-sm">
              Complete Setup
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
        ) : (
          <div className="space-y-2">
            <a
              href="https://squareup.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="outline" className="w-full py-2 rounded text-sm border-[#b8956a]/30">
                Open Square Dashboard
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
            {environment === 'sandbox' && (
              <p className="text-xs text-center text-amber-700">
                Remember to switch to Production when ready
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
