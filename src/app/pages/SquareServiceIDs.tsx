import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Copy, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SQUARE_CONFIG } from '../config/square';

interface CatalogItem {
  id: string;
  type: string;
  item_data?: {
    name?: string;
    description?: string;
    variations?: Array<{
      id: string;
      type: string;
      item_variation_data?: {
        name?: string;
        item_id?: string;
        service_duration?: number;
      };
    }>;
  };
}

export default function SquareServiceIDs() {
  const [services, setServices] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch catalog items from Square
      const response = await fetch(`${SQUARE_CONFIG.baseUrl}/v2/catalog/list`, {
        method: 'POST',
        headers: {
          'Square-Version': '2024-12-18',
          'Authorization': `Bearer ${SQUARE_CONFIG.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          types: ['ITEM'],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.detail || `API Error: ${response.status}`);
      }

      const data = await response.json();
      const items = data.objects || [];

      // Filter for appointment services (items that have service duration)
      const appointmentServices = items.filter((item: CatalogItem) => {
        return item.item_data?.variations?.some(
          v => v.item_variation_data?.service_duration
        );
      });

      setServices(appointmentServices);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services');
      console.error('Error fetching Square services:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getServiceVariationId = (item: CatalogItem): string => {
    // Return the first variation ID (service variation ID for bookings)
    return item.item_data?.variations?.[0]?.id || item.id;
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <section className="py-20 px-4 bg-[#2c2c2c] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="w-16 h-px bg-gradient-bronze mx-auto mb-8" />
          <h1 className="text-center mb-6">Square Service IDs</h1>
          <p className="text-xl text-white/90 text-center max-w-3xl mx-auto leading-relaxed">
            Your appointment services from Square with their Service Variation IDs for deep-linking
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Instructions */}
          <div className="bg-white p-8 rounded border border-[#b8956a]/15 mb-8">
            <h2 className="text-2xl font-serif text-[#2c2c2c] mb-4">How to Use These IDs</h2>
            <ol className="space-y-3 text-[#4a4a4a] leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#b8956a] font-bold">1.</span>
                <span>Find your service in the list below</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#b8956a] font-bold">2.</span>
                <span>Click the "Copy ID" button next to the service</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#b8956a] font-bold">3.</span>
                <span>Open the corresponding page file (Services.tsx, ServicesBrandon.tsx, or ServicesTampa.tsx)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#b8956a] font-bold">4.</span>
                <span>Replace "YOUR_..._SERVICE_ID" with the copied ID</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#b8956a] font-bold">5.</span>
                <span>Save the file and test the booking button</span>
              </li>
            </ol>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white p-16 rounded border border-[#b8956a]/15 text-center">
              <Loader2 className="w-12 h-12 text-[#b8956a] mx-auto mb-4 animate-spin" />
              <p className="text-[#6b6b6b]">Fetching your Square services...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 p-8 rounded">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Services</h3>
                  <p className="text-red-700 mb-4">{error}</p>
                  <Button 
                    onClick={fetchServices}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Services List */}
          {!loading && !error && services.length === 0 && (
            <div className="bg-white p-16 rounded border border-[#b8956a]/15 text-center">
              <AlertCircle className="w-12 h-12 text-[#b8956a] mx-auto mb-4" />
              <h3 className="text-xl font-serif text-[#2c2c2c] mb-2">No Services Found</h3>
              <p className="text-[#6b6b6b] mb-6">
                No appointment services were found in your Square account.
              </p>
              <p className="text-[#6b6b6b] mb-4">
                Make sure you've created services in:<br />
                <strong>Square Dashboard → Appointments → Services</strong>
              </p>
              <a
                href="https://squareup.com/dashboard/appointments/services"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="btn-bronze">
                  Go to Square Dashboard
                </Button>
              </a>
            </div>
          )}

          {!loading && !error && services.length > 0 && (
            <div className="space-y-4">
              <div className="bg-white p-6 rounded border border-[#b8956a]/15 mb-6">
                <p className="text-[#4a4a4a] mb-2">
                  <strong className="text-[#2c2c2c]">Found {services.length} service{services.length !== 1 ? 's' : ''}</strong>
                </p>
                <p className="text-sm text-[#6b6b6b]">
                  Use the Service Variation ID (the longer ID shown) for your booking links
                </p>
              </div>

              {services.map((service) => {
                const serviceName = service.item_data?.name || 'Unnamed Service';
                const description = service.item_data?.description || '';
                const variationId = getServiceVariationId(service);
                const duration = service.item_data?.variations?.[0]?.item_variation_data?.service_duration;

                return (
                  <div
                    key={service.id}
                    className="bg-white p-8 rounded border border-[#b8956a]/15 hover:border-[#b8956a]/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-serif text-[#2c2c2c] mb-2">
                          {serviceName}
                        </h3>
                        {description && (
                          <p className="text-[#6b6b6b] text-sm mb-3">{description}</p>
                        )}
                        {duration && (
                          <p className="text-xs text-[#b8956a]">
                            Duration: {duration} minutes
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Main Item ID */}
                      <div className="bg-[#faf8f5] p-4 rounded">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-[#b8956a] mb-1">Item ID (reference only):</p>
                            <code className="text-sm text-[#2c2c2c] font-mono break-all">
                              {service.id}
                            </code>
                          </div>
                        </div>
                      </div>

                      {/* Service Variation ID - THIS IS WHAT YOU NEED */}
                      <div className="bg-gradient-to-br from-[#b8956a]/10 to-[#b8956a]/5 p-4 rounded border-2 border-[#b8956a]/30">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-[#b8956a] mb-1">
                              ✅ Service Variation ID (use this for booking links):
                            </p>
                            <code className="text-sm text-[#2c2c2c] font-mono break-all font-semibold">
                              {variationId}
                            </code>
                          </div>
                          <Button
                            onClick={() => copyToClipboard(variationId, variationId)}
                            className="btn-bronze flex items-center gap-2 flex-shrink-0"
                          >
                            {copiedId === variationId ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                Copy ID
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Help Section */}
          {!loading && !error && services.length > 0 && (
            <div className="bg-white p-8 rounded border border-[#b8956a]/15 mt-8">
              <h3 className="text-lg font-serif text-[#2c2c2c] mb-4">Next Steps</h3>
              <div className="space-y-3 text-[#4a4a4a]">
                <p>
                  <strong className="text-[#2c2c2c]">Match Services to Your Website:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Custom Luxury Facial → Find matching service above and copy its ID</li>
                  <li>Age-Defying Facial → Find matching service above and copy its ID</li>
                  <li>Clarity Restoration Facial → Find matching service above and copy its ID</li>
                  <li>Hydration Infusion Facial → Find matching service above and copy its ID</li>
                  <li>Brightening Clarity Facial → Find matching service above and copy its ID</li>
                  <li>Express Renewal Facial → Find matching service above and copy its ID</li>
                </ul>
                <p className="pt-4 text-sm text-[#6b6b6b]">
                  <strong>Note:</strong> Your Square service names might be different from your website. 
                  Match them by description or duration, then copy the Service Variation ID.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
