import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Loader2, CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { SQUARE_PRODUCTS_DATA } from '../config/square-products-data';
import { stripeService, StripeProductResult } from '../services/stripeService';

export default function StripeMigration() {
  const [secretKey, setSecretKey] = useState('');
  const [migrating, setMigrating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [results, setResults] = useState<StripeProductResult[]>([]);
  const [errors, setErrors] = useState<any[]>([]);
  const [step, setStep] = useState(1);
  const [serverStatus, setServerStatus] = useState<{ status: string; configured: boolean } | null>(null);
  const [cacheRefreshed, setCacheRefreshed] = useState(false);

  const totalProducts = SQUARE_PRODUCTS_DATA.length;

  useEffect(() => {
    stripeService.checkHealth().then(setServerStatus);
  }, []);

  const handleMigrate = async () => {
    if (secretKey && !secretKey.startsWith('sk_')) {
      alert('Please enter a valid Stripe Secret Key (starts with sk_)');
      return;
    }

    setMigrating(true);
    setResults([]);
    setErrors([]);

    try {
      // Process in batches of 5 to avoid timeouts
      const batchSize = 5;
      const batches = [];
      for (let i = 0; i < SQUARE_PRODUCTS_DATA.length; i += batchSize) {
        batches.push(SQUARE_PRODUCTS_DATA.slice(i, i + batchSize));
      }

      let allResults: StripeProductResult[] = [];
      let allErrors: any[] = [];

      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        // Optional: Update UI to show progress
        // setStatus(`Migrating batch ${i + 1} of ${batches.length}...`);
        
        try {
          const res = await stripeService.migrateProducts(batch, secretKey);
          if (res.success) {
            allResults = [...allResults, ...res.results];
            allErrors = [...allErrors, ...(res.errors || [])];
          }
        } catch (batchErr: any) {
          console.error(`Batch ${i + 1} failed:`, batchErr);
          allErrors.push({ batch: i + 1, error: batchErr.message });
          // Continue with next batch? Or stop? 
          // Let's continue to try to migrate as much as possible.
        }
      }
      
      setResults(allResults);
      setErrors(allErrors);
      setStep(3);

    } catch (err: any) {
      console.error(err);
      setErrors([{ error: err.message }]);
    } finally {
      setMigrating(false);
    }
  };

  const refreshCache = async () => {
    setRefreshing(true);
    try {
      await stripeService.refreshProductCache();
      setCacheRefreshed(true);
    } catch (err: any) {
      console.error(err);
      alert('Error refreshing cache: ' + err.message);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-[#2c2c2c] mb-4">Square to Stripe Migration</h1>
          <p className="text-[#6b6b6b] mb-4">Transfer your product catalog seamlessly.</p>
          
          {serverStatus && (
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                serverStatus.status === 'ok' 
                    ? (serverStatus.configured ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800')
                    : 'bg-red-100 text-red-800'
            }`}>
                {serverStatus.status === 'ok' 
                    ? (serverStatus.configured ? '● Server Ready & Configured' : '● Server Ready (Key Missing)') 
                    : '● Server Unreachable'}
            </div>
          )}
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>1. Review Source Data</CardTitle>
              <CardDescription>
                We found {totalProducts} products in your local configuration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-md max-h-64 overflow-y-auto mb-6 text-sm">
                <pre>{JSON.stringify(SQUARE_PRODUCTS_DATA.slice(0, 3), null, 2)}</pre>
                <p className="text-center text-gray-500 mt-2">... and {totalProducts - 3} more items</p>
              </div>
              <Button onClick={() => setStep(2)} className="w-full btn-bronze">
                Proceed to Configuration <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>2. Stripe Configuration</CardTitle>
              <CardDescription>
                Enter your Stripe Secret Key to create these products in your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="bg-amber-50 border-amber-200">
                <AlertTitle className="text-amber-800">Security Note</AlertTitle>
                <AlertDescription className="text-amber-700">
                  Your key is sent directly to our secure backend function and is never logged or stored permanently.
                  Use a restricted key if possible.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Stripe Secret Key (Optional if set on server)</label>
                <Input 
                  type="password" 
                  placeholder="Leave empty to use SBE_secret_key from server" 
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="font-mono"
                />
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button 
                  onClick={handleMigrate} 
                  disabled={migrating}
                  className="flex-1 btn-bronze"
                >
                  {migrating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Migrating... (Check Console)
                    </>
                  ) : (
                    'Start Migration'
                  )}
                </Button>
              </div>
              
              {errors.length > 0 && !results.length && (
                 <div className="p-4 bg-red-50 text-red-600 rounded text-sm">
                    Error: {errors[0].error}
                 </div>
              )}
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>3. Migration Complete</CardTitle>
              <CardDescription>
                Successfully migrated {results.length} products. {errors.length > 0 && `Failed: ${errors.length}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1 bg-green-50 p-4 rounded border border-green-100 flex items-center gap-3">
                  <CheckCircle2 className="text-green-600 w-8 h-8" />
                  <div>
                    <div className="font-bold text-green-800">{results.length}</div>
                    <div className="text-green-600 text-sm">Success</div>
                  </div>
                </div>
                {errors.length > 0 && (
                  <div className="flex-1 bg-red-50 p-4 rounded border border-red-100 flex items-center gap-3">
                    <XCircle className="text-red-600 w-8 h-8" />
                    <div>
                      <div className="font-bold text-red-800">{errors.length}</div>
                      <div className="text-red-600 text-sm">Errors</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto mb-6">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-2">JSON Map (Save this for your config)</h4>
                <pre className="text-xs">
                  {JSON.stringify(results.reduce((acc: any, item) => {
                    acc[item.squareId] = item.stripePriceId;
                    return acc;
                  }, {}), null, 2)}
                </pre>
              </div>

              {cacheRefreshed && (
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Cache Updated!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your shop page will now display all Stripe products.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Button 
                  onClick={refreshCache} 
                  disabled={refreshing || cacheRefreshed}
                  className="w-full btn-bronze"
                >
                  {refreshing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Refreshing Product Cache...
                    </>
                  ) : cacheRefreshed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Cache Refreshed!
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Shop Products Cache
                    </>
                  )}
                </Button>

                <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}