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
  buildGoogleFontsStylesheetUrl,
  getBrandingGoogleFamilies,
  getScriptFontById,
  getSkinFontById,
} from '../config/script-logo-fonts';
import {
  brandingService,
  DEFAULT_SITE_BRANDING,
  type SiteBranding,
} from '../services/brandingService';

const FONT_LINK_ID = 'sbe-logo-fonts';

interface BrandingContextValue {
  branding: SiteBranding;
  scriptFontFamily: string;
  skinFontFamily: string;
  loading: boolean;
  refreshBranding: () => Promise<void>;
}

const BrandingContext = createContext<BrandingContextValue | null>(null);

function applyBrandingFontLink(scriptFontId: string, skinFontId: string) {
  if (typeof document === 'undefined') return;

  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  link.href = buildGoogleFontsStylesheetUrl(
    getBrandingGoogleFamilies(scriptFontId, skinFontId),
  );
}

export function BrandingProvider({ children }: { children: ReactNode }) {
  const [branding, setBranding] = useState<SiteBranding>(DEFAULT_SITE_BRANDING);
  const [loading, setLoading] = useState(true);

  const scriptFont = useMemo(
    () => getScriptFontById(branding.scriptFontId),
    [branding.scriptFontId],
  );

  const skinFont = useMemo(
    () => getSkinFontById(branding.skinFontId),
    [branding.skinFontId],
  );

  const refreshBranding = useCallback(async () => {
    const next = await brandingService.getBranding();
    setBranding(next);
    applyBrandingFontLink(next.scriptFontId, next.skinFontId);
  }, []);

  useEffect(() => {
    refreshBranding().finally(() => setLoading(false));
  }, [refreshBranding]);

  useEffect(() => {
    applyBrandingFontLink(branding.scriptFontId, branding.skinFontId);
  }, [branding.scriptFontId, branding.skinFontId]);

  const value = useMemo(
    () => ({
      branding,
      scriptFontFamily: scriptFont.family,
      skinFontFamily: skinFont.family,
      loading,
      refreshBranding,
    }),
    [branding, scriptFont.family, skinFont.family, loading, refreshBranding],
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
