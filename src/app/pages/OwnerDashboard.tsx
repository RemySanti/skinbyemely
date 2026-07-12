import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowRight, CreditCard, RefreshCw, CheckCircle2, Layout, Save, ShoppingBag, Type } from 'lucide-react';
import { Button } from '../components/ui/button';
import { stripeService } from '../services/stripeService';
import { catalogService } from '../services/squareService';
import { checkoutConfigService, CheckoutConfig } from '../services/checkoutConfigService';
import { brandingService, DEFAULT_SITE_BRANDING, type SiteBranding } from '../services/brandingService';
import { refreshServiceCache } from '../config/service-prices';
import {
  SCRIPT_LOGO_FONTS,
  SKIN_LOGO_FONTS,
  injectGoogleFontLinks,
  getScriptFontById,
  getSkinFontById,
} from '../config/script-logo-fonts';
import { GoogleFiveStarVisual } from '../components/GoogleFiveStarVisual';
import { useBranding } from '../context/BrandingContext';
import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

export default function OwnerDashboard() {
  const { refreshBranding } = useBranding();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshSuccess, setRefreshSuccess] = useState(false);
  const [refreshError, setRefreshError] = useState<string | null>(null);

  const [squareRefreshing, setSquareRefreshing] = useState(false);
  const [squareRefreshSuccess, setSquareRefreshSuccess] = useState(false);
  const [squareRefreshError, setSquareRefreshError] = useState<string | null>(null);

  const [servicesRefreshing, setServicesRefreshing] = useState(false);
  const [servicesRefreshSuccess, setServicesRefreshSuccess] = useState(false);
  const [servicesRefreshError, setServicesRefreshError] = useState<string | null>(null);

  const [checkoutConfig, setCheckoutConfig] = useState<CheckoutConfig>({});
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [savingConfig, setSavingConfig] = useState(false);
  const [configSuccess, setConfigSuccess] = useState(false);

  const [siteBranding, setSiteBranding] = useState<SiteBranding>(DEFAULT_SITE_BRANDING);
  const [loadingBranding, setLoadingBranding] = useState(true);
  const [savingBranding, setSavingBranding] = useState(false);
  const [brandingSuccess, setBrandingSuccess] = useState(false);
  const [brandingError, setBrandingError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('sbe_owner', 'true');
    loadCheckoutConfig();
    loadSiteBranding();
  }, []);

  useEffect(() => {
    const cleanupSkin = injectGoogleFontLinks(
      'sbe-preview-skin',
      SKIN_LOGO_FONTS.map((f) => f.googleFamily),
    );
    const cleanupScript = injectGoogleFontLinks(
      'sbe-preview-script',
      SCRIPT_LOGO_FONTS.map((f) => f.googleFamily),
    );
    return () => {
      cleanupSkin();
      cleanupScript();
    };
  }, []);

  const loadSiteBranding = async () => {
    try {
      setLoadingBranding(true);
      const branding = await brandingService.getBranding();
      setSiteBranding(branding);
    } catch (error) {
      console.error('Error loading site branding:', error);
    } finally {
      setLoadingBranding(false);
    }
  };

  const handleSaveBranding = async () => {
    setSavingBranding(true);
    setBrandingSuccess(false);
    setBrandingError(null);

    try {
      const { synced } = await brandingService.saveBranding(siteBranding);
      await refreshBranding();
      setBrandingSuccess(true);
      if (!synced) {
        setBrandingError(
          'Applied on this browser. Redeploy the Supabase edge function (make-server-fd83a735) so all visitors see the same logo.',
        );
      } else {
        setBrandingError(null);
      }
      setTimeout(() => {
        setBrandingSuccess(false);
        if (synced) setBrandingError(null);
      }, 8000);
    } catch (error: any) {
      console.error('Error saving site branding:', error);
      setBrandingError(error.message || 'Failed to save logo style');
    } finally {
      setSavingBranding(false);
    }
  };

  const loadCheckoutConfig = async () => {
    try {
      setLoadingConfig(true);
      const config = await checkoutConfigService.getConfig();
      setCheckoutConfig(config);
    } catch (error) {
      console.error('Error loading checkout config:', error);
    } finally {
      setLoadingConfig(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingConfig(true);
    setConfigSuccess(false);

    try {
      await checkoutConfigService.saveConfig(checkoutConfig);
      setConfigSuccess(true);
      setTimeout(() => setConfigSuccess(false), 5000);
    } catch (error) {
      console.error('Error saving checkout config:', error);
      alert('Failed to save configuration');
    } finally {
      setSavingConfig(false);
    }
  };

  const handleRefreshCache = async () => {
    setRefreshing(true);
    setRefreshSuccess(false);
    setRefreshError(null);
    
    try {
      const result = await stripeService.refreshProductCache();
      console.log('Cache refresh result:', result);
      setRefreshSuccess(true);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setRefreshSuccess(false);
      }, 5000);
    } catch (err: any) {
      console.error('Cache refresh error:', err);
      setRefreshError(err.message || 'Failed to refresh cache');
    } finally {
      setRefreshing(false);
    }
  };

  const handleSquareRefresh = async () => {
    setSquareRefreshing(true);
    setSquareRefreshSuccess(false);
    setSquareRefreshError(null);
    
    try {
      const result = await catalogService.refreshProductCache();
      console.log('Square cache refresh result:', result);
      setSquareRefreshSuccess(true);
      
      setTimeout(() => {
        setSquareRefreshSuccess(false);
      }, 5000);
    } catch (err: any) {
      console.error('Square refresh error:', err);
      setSquareRefreshError(err.message || 'Failed to refresh Square cache');
    } finally {
      setSquareRefreshing(false);
    }
  };

  const handleServiceRefresh = async () => {
    setServicesRefreshing(true);
    setServicesRefreshSuccess(false);
    setServicesRefreshError(null);
    
    try {
      const result = await refreshServiceCache();
      console.log('Service cache refresh result:', result);
      
      if (result.success) {
        setServicesRefreshSuccess(true);
        setTimeout(() => {
          setServicesRefreshSuccess(false);
        }, 5000);
      } else {
        setServicesRefreshError(result.error || 'Failed to refresh service cache');
      }
    } catch (err: any) {
      console.error('Service cache refresh error:', err);
      setServicesRefreshError(err.message || 'Failed to refresh service cache');
    } finally {
      setServicesRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-[#2c2c2c] mb-4">Owner Dashboard</h1>
          <p className="text-[#6b6b6b]">Manage your website and integrations.</p>
        </div>

        <div className="mb-8">
          <GoogleFiveStarVisual />
        </div>

        {/* Logo typography picker */}
        <Card className="mb-6 border-[#b8956a]/20">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2c2c2c] flex items-center gap-2">
              <Type className="w-5 h-5 text-[#b8956a]" />
              Site Branding
            </CardTitle>
            <CardDescription>
              Customize your logo typography. Save to apply site-wide.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {brandingSuccess && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Saved!</AlertTitle>
                <AlertDescription className="text-green-700">
                  Your logo typography is live on the website.
                </AlertDescription>
              </Alert>
            )}

            {brandingError && (
              <Alert className="bg-red-50 border-red-200">
                <AlertTitle className="text-red-800">Error</AlertTitle>
                <AlertDescription className="text-red-700">{brandingError}</AlertDescription>
              </Alert>
            )}

            <div className="max-w-xs">
              <Label htmlFor="owner-name" className="text-xs uppercase tracking-widest text-[#6b6b6b]">
                Name in logo
              </Label>
              <Input
                id="owner-name"
                value={siteBranding.ownerName}
                onChange={(e) =>
                  setSiteBranding((prev) => ({ ...prev, ownerName: e.target.value }))
                }
                placeholder="Emely"
                className="mt-2 border-[#b8956a]/30"
              />
              <p className="text-xs text-[#6b6b6b] mt-1">Shown as: by {siteBranding.ownerName || 'Emely'}</p>
            </div>

            <div className="bg-white border border-[#b8956a]/15 rounded-lg p-8 text-center">
              <p className="text-xs uppercase tracking-widest text-[#b8956a] mb-4">Live preview</p>
              <h3
                className="text-5xl font-bold text-[#2c2c2c] leading-none"
                style={{ fontFamily: getSkinFontById(siteBranding.skinFontId).family }}
              >
                SKIN
              </h3>
              <p
                className="text-3xl text-[#6b6b6b] -mt-1 ml-12"
                style={{ fontFamily: getScriptFontById(siteBranding.scriptFontId).family }}
              >
                by {siteBranding.ownerName?.trim() || 'Emely'}
              </p>
            </div>

            {loadingBranding ? (
              <p className="text-center text-[#6b6b6b] text-sm">Loading logo options…</p>
            ) : (
              <>
                <div>
                  <h4 className="text-sm font-medium text-[#2c2c2c] mb-1">SKIN — 30 wordmark styles</h4>
                  <p className="text-xs text-[#6b6b6b] mb-3">Elegant serif and display fonts for the main logo word.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {SKIN_LOGO_FONTS.map((font) => {
                      const selected = siteBranding.skinFontId === font.id;
                      return (
                        <button
                          key={font.id}
                          type="button"
                          onClick={() =>
                            setSiteBranding((prev) => ({ ...prev, skinFontId: font.id }))
                          }
                          className={`p-4 rounded-lg border text-left transition-all hover:shadow-md ${
                            selected
                              ? 'border-[#b8956a] bg-[#faf8f5] ring-2 ring-[#b8956a]/40'
                              : 'border-neutral-200 bg-white hover:border-[#b8956a]/50'
                          }`}
                        >
                          <span className="text-[10px] uppercase tracking-wider text-[#9d7d54] block mb-2 truncate">
                            {font.label}
                          </span>
                          <span
                            className="text-2xl font-bold text-[#2c2c2c] block leading-tight"
                            style={{ fontFamily: font.family }}
                          >
                            SKIN
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[#2c2c2c] mb-1">Your name — 30 script styles</h4>
                  <p className="text-xs text-[#6b6b6b] mb-3">Signature script fonts for the line under SKIN.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {SCRIPT_LOGO_FONTS.map((font) => {
                      const selected = siteBranding.scriptFontId === font.id;
                      return (
                        <button
                          key={font.id}
                          type="button"
                          onClick={() =>
                            setSiteBranding((prev) => ({ ...prev, scriptFontId: font.id }))
                          }
                          className={`p-4 rounded-lg border text-left transition-all hover:shadow-md ${
                            selected
                              ? 'border-[#b8956a] bg-[#faf8f5] ring-2 ring-[#b8956a]/40'
                              : 'border-neutral-200 bg-white hover:border-[#b8956a]/50'
                          }`}
                        >
                          <span className="text-[10px] uppercase tracking-wider text-[#9d7d54] block mb-2 truncate">
                            {font.label}
                          </span>
                      <span
                        className="text-3xl text-[#2c2c2c] block leading-none py-1 truncate"
                        style={{ fontFamily: font.family }}
                      >
                        {siteBranding.ownerName?.trim() || 'Emely'}
                      </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            <Button
              onClick={handleSaveBranding}
              disabled={savingBranding || loadingBranding}
              className="w-full btn-bronze"
            >
              {savingBranding ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save &amp; Apply to Site
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Checkout Configuration Section */}
        <Card className="mb-6 border-[#b8956a]/20">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2c2c2c] flex items-center gap-2">
              <Save className="w-5 h-5 text-[#b8956a]" />
              Checkout Messages
            </CardTitle>
            <CardDescription>
              Optional text shown during Stripe checkout (embedded checkout dialog).
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingConfig ? (
              <p className="text-sm text-[#6b6b6b]">Loading…</p>
            ) : (
              <form onSubmit={handleSaveConfig} className="space-y-4">
                {configSuccess && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700">Checkout settings saved.</AlertDescription>
                  </Alert>
                )}
                <div>
                  <Label htmlFor="checkout-title">Checkout title</Label>
                  <Input
                    id="checkout-title"
                    value={checkoutConfig.checkoutTitle || ''}
                    onChange={(e) =>
                      setCheckoutConfig((prev) => ({ ...prev, checkoutTitle: e.target.value }))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="checkout-message">Checkout message</Label>
                  <Textarea
                    id="checkout-message"
                    value={checkoutConfig.checkoutMessage || ''}
                    onChange={(e) =>
                      setCheckoutConfig((prev) => ({ ...prev, checkoutMessage: e.target.value }))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="terms-message">Terms message</Label>
                  <Textarea
                    id="terms-message"
                    value={checkoutConfig.termsMessage || ''}
                    onChange={(e) =>
                      setCheckoutConfig((prev) => ({ ...prev, termsMessage: e.target.value }))
                    }
                    className="mt-1"
                  />
                </div>
                <Button type="submit" disabled={savingConfig} className="btn-bronze w-full">
                  {savingConfig ? 'Saving…' : 'Save Checkout Settings'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* E-commerce Flow Documentation */}
        <Card className="mb-6 border-[#b8956a]/20">
          <CardHeader>
             <CardTitle className="text-xl font-serif text-[#2c2c2c] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#b8956a]" />
              E-commerce & Checkout Flow
            </CardTitle>
            <CardDescription>
              Overview of the user journey from product selection to purchase.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-start relative">
                    {/* Step 1 */}
                    <div className="flex-1 bg-white p-4 rounded border border-[#b8956a]/10 relative z-10">
                        <div className="text-xs uppercase tracking-widest text-[#b8956a] mb-2 font-bold">Step 1</div>
                        <h4 className="font-serif text-[#2c2c2c] mb-1">Add to Cart</h4>
                        <p className="text-sm text-[#6b6b6b]">
                            User clicks "Add to Cart". Button instantly changes to "Added" then "Go to Cart".
                            Visual feedback confirms action without page reload.
                        </p>
                    </div>
                    {/* Arrow */}
                    <div className="hidden md:block absolute top-1/2 left-[25%] -translate-y-1/2 text-[#b8956a]/30 z-0">
                        <ArrowRight className="w-6 h-6" />
                    </div>

                    {/* Step 2 */}
                    <div className="flex-1 bg-white p-4 rounded border border-[#b8956a]/10 relative z-10">
                        <div className="text-xs uppercase tracking-widest text-[#b8956a] mb-2 font-bold">Step 2</div>
                        <h4 className="font-serif text-[#2c2c2c] mb-1">Cart Drawer</h4>
                        <p className="text-sm text-[#6b6b6b]">
                            Cart drawer slides open automatically. User can adjust quantities, remove items, or continue shopping.
                            Persistent cart icon in header shows badge count.
                        </p>
                    </div>
                     {/* Arrow */}
                    <div className="hidden md:block absolute top-1/2 left-[58%] -translate-y-1/2 text-[#b8956a]/30 z-0">
                        <ArrowRight className="w-6 h-6" />
                    </div>

                    {/* Step 3 */}
                    <div className="flex-1 bg-white p-4 rounded border border-[#b8956a]/10 relative z-10">
                        <div className="text-xs uppercase tracking-widest text-[#b8956a] mb-2 font-bold">Step 3</div>
                        <h4 className="font-serif text-[#2c2c2c] mb-1">Secure Checkout</h4>
                        <p className="text-sm text-[#6b6b6b]">
                            Stripe Hosted Checkout collects shipping, billing, and payment info. 
                            Includes address validation and Buy Now, Pay Later options.
                        </p>
                    </div>
                </div>

                <div className="bg-[#faf8f5] p-4 rounded text-sm text-[#6b6b6b] border border-[#b8956a]/10">
                    <strong>Key Features:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Global Cart State: Persistent across all pages.</li>
                        <li>Real-time Feedback: Instant visual confirmation on interactions.</li>
                        <li>Mobile Optimized: Thumb-friendly drawer and sticky buttons.</li>
                        <li>Abandonment Prevention: Smooth flow minimizes friction before payment.</li>
                    </ul>
                </div>
            </div>
          </CardContent>
        </Card>

        {/* Refresh Square Cache Section */}
        <Card className="mb-6 border-[#b8956a]/20">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2c2c2c] flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#b8956a]" />
              Refresh Square Services
            </CardTitle>
            <CardDescription>
              Fetch the latest services from Square to update the Services page listing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {squareRefreshSuccess && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Success!</AlertTitle>
                <AlertDescription className="text-green-700">
                  Square services refreshed successfully.
                </AlertDescription>
              </Alert>
            )}
            
            {squareRefreshError && (
              <Alert className="bg-red-50 border-red-200">
                <AlertTitle className="text-red-800">Error</AlertTitle>
                <AlertDescription className="text-red-700">
                  {squareRefreshError}
                </AlertDescription>
              </Alert>
            )}

            <Button 
              onClick={handleSquareRefresh}
              disabled={squareRefreshing}
              className="w-full btn-bronze"
            >
              {squareRefreshing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Refreshing Square...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Square Services
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Refresh Stripe Cache Section */}
        <Card className="mb-6 border-[#b8956a]/20">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2c2c2c] flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#b8956a]" />
              Refresh Product Cache
            </CardTitle>
            <CardDescription>
              Fetch the latest products and images from Stripe. Use this after adding or updating products in your Stripe dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {refreshSuccess && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Success!</AlertTitle>
                <AlertDescription className="text-green-700">
                  Product cache refreshed successfully. Your shop will now display the latest products and images.
                </AlertDescription>
              </Alert>
            )}
            
            {refreshError && (
              <Alert className="bg-red-50 border-red-200">
                <AlertTitle className="text-red-800">Error</AlertTitle>
                <AlertDescription className="text-red-700">
                  {refreshError}
                </AlertDescription>
              </Alert>
            )}

            <Button 
              onClick={handleRefreshCache}
              disabled={refreshing}
              className="w-full btn-bronze"
            >
              {refreshing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Products & Images
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Refresh Service Cache Section */}
        <Card className="mb-6 border-[#b8956a]/20">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2c2c2c] flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#b8956a]" />
              Refresh Service Prices (Homepage)
            </CardTitle>
            <CardDescription>
              Fetch the latest service prices from Square for the homepage Signature Treatments carousel. Add-ons are automatically excluded.
              <br />
              <strong className="text-[#b8956a] text-xs">Auto-refresh enabled:</strong> <span className="text-xs">Prices automatically update every 15 minutes when SQUARE_ACCESS_TOKEN is set in Supabase.</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {servicesRefreshSuccess && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Success!</AlertTitle>
                <AlertDescription className="text-green-700">
                  Service cache refreshed successfully. Your shop will now display the latest service prices and details.
                </AlertDescription>
              </Alert>
            )}
            
            {servicesRefreshError && (
              <Alert className="bg-red-50 border-red-200">
                <AlertTitle className="text-red-800">Error</AlertTitle>
                <AlertDescription className="text-red-700">
                  {servicesRefreshError}
                </AlertDescription>
              </Alert>
            )}

            <Button 
              onClick={handleServiceRefresh}
              disabled={servicesRefreshing}
              className="w-full btn-bronze"
            >
              {servicesRefreshing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Service Prices & Details
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/stripe-migration" className="block group">
            <Card className="h-full hover:shadow-lg transition-all border-[#b8956a]/20 group-hover:border-[#b8956a]">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-bronze rounded flex items-center justify-center mb-4 text-white">
                  <CreditCard className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-serif text-[#2c2c2c] group-hover:text-[#b8956a] transition-colors">
                  Stripe Migration
                </CardTitle>
                <CardDescription>
                  Transfer product catalog from Square/Local data to Stripe and configure payment settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium text-[#b8956a] flex items-center">
                  Go to Migration Tool <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/design-system" className="block group">
            <Card className="h-full hover:shadow-lg transition-all border-[#b8956a]/20 group-hover:border-[#b8956a]">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-bronze rounded flex items-center justify-center mb-4 text-white">
                  <Layout className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-serif text-[#2c2c2c] group-hover:text-[#b8956a] transition-colors">
                  Design System
                </CardTitle>
                <CardDescription>
                  View all design tokens, components, and UI patterns used across the site.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium text-[#b8956a] flex items-center">
                  View Components <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}