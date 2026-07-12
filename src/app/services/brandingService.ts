import { projectId, publicAnonKey } from '../utils/supabase/info';
import { DEFAULT_SCRIPT_FONT_ID, DEFAULT_SKIN_FONT_ID } from '../config/script-logo-fonts';
import { DEFAULT_HOME_TAGLINE_ID } from '../config/home-taglines';

export interface SiteBranding {
  scriptFontId: string;
  skinFontId: string;
  ownerName: string;
  homeTaglineId: string;
}

export const DEFAULT_SITE_BRANDING: SiteBranding = {
  scriptFontId: DEFAULT_SCRIPT_FONT_ID,
  skinFontId: DEFAULT_SKIN_FONT_ID,
  ownerName: 'Emely',
  homeTaglineId: DEFAULT_HOME_TAGLINE_ID,
};

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-fd83a735`;
const LOCAL_BRANDING_KEY = 'sbe_site_branding';

export function getInitialBranding(): SiteBranding {
  if (typeof window === 'undefined') return DEFAULT_SITE_BRANDING;
  try {
    const raw = localStorage.getItem(LOCAL_BRANDING_KEY);
    if (!raw) return DEFAULT_SITE_BRANDING;
    return { ...DEFAULT_SITE_BRANDING, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SITE_BRANDING;
  }
}

function readLocalBranding(): SiteBranding | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LOCAL_BRANDING_KEY);
    if (!raw) return null;
    return { ...DEFAULT_SITE_BRANDING, ...JSON.parse(raw) };
  } catch {
    return null;
  }
}

function writeLocalBranding(branding: SiteBranding) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_BRANDING_KEY, JSON.stringify(branding));
}

export const brandingService = {
  async getBranding(): Promise<SiteBranding> {
    try {
      const response = await fetch(`${API_URL}/site-branding`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch site branding');
      }

      const data = await response.json();
      const branding = {
        ...DEFAULT_SITE_BRANDING,
        ...(data.branding || {}),
      };
      writeLocalBranding(branding);
      return branding;
    } catch (error) {
      console.error('Error fetching site branding:', error);
      return readLocalBranding() || DEFAULT_SITE_BRANDING;
    }
  },

  async saveBranding(branding: SiteBranding): Promise<{ synced: boolean }> {
    writeLocalBranding(branding);

    try {
      const response = await fetch(`${API_URL}/site-branding`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(branding),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn('Site branding API save failed:', errorData);
        return { synced: false };
      }

      return { synced: true };
    } catch (error) {
      console.warn('Site branding API unreachable:', error);
      return { synced: false };
    }
  },
};
