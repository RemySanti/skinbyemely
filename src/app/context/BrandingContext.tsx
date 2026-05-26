import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  brandingService,
  getInitialBranding,
  type SiteBranding,
} from '../services/brandingService';

interface BrandingContextValue {
  branding: SiteBranding;
  loading: boolean;
  refreshBranding: () => Promise<void>;
}

const BrandingContext = createContext<BrandingContextValue | null>(null);

export function BrandingProvider({ children }: { children: ReactNode }) {
  const [branding, setBranding] = useState(getInitialBranding);
  const [loading, setLoading] = useState(true);

  const refreshBranding = useCallback(async () => {
    const next = await brandingService.getBranding();
    setBranding(next);
  }, []);

  useEffect(() => {
    refreshBranding().finally(() => setLoading(false));
  }, [refreshBranding]);

  const value = useMemo(
    () => ({
      branding,
      loading,
      refreshBranding,
    }),
    [branding, loading, refreshBranding],
  );

  return (
    <BrandingContext.Provider value={value}>{children}</BrandingContext.Provider>
  );
}

export function useBranding() {
  const ctx = useContext(BrandingContext);
  if (!ctx) {
    throw new Error('useBranding must be used within BrandingProvider');
  }
  return ctx;
}
