export interface LogoFont {
  id: string;
  label: string;
  /** CSS font-family value */
  family: string;
  /** Google Fonts family query segment (after family=) */
  googleFamily: string;
}

/** @deprecated Use LogoFont */
export type ScriptLogoFont = LogoFont;

/** 30 serif / display fonts for the "SKIN" logo word */
export const SKIN_LOGO_FONTS: LogoFont[] = [
  { id: 'bodoni-moda', label: 'Bodoni Moda', family: "'Bodoni Moda', serif", googleFamily: 'Bodoni+Moda:ital,opsz,wght@0,6..96,400..900' },
  { id: 'cormorant-garamond', label: 'Cormorant Garamond', family: "'Cormorant Garamond', serif", googleFamily: 'Cormorant+Garamond:wght@300;400;500;600;700' },
  { id: 'cormorant', label: 'Cormorant', family: "'Cormorant', serif", googleFamily: 'Cormorant:wght@300;400;500;600;700' },
  { id: 'cinzel', label: 'Cinzel', family: "'Cinzel', serif", googleFamily: 'Cinzel:wght@400;500;600;700' },
  { id: 'playfair-display', label: 'Playfair Display', family: "'Playfair Display', serif", googleFamily: 'Playfair+Display:wght@400;500;600;700' },
  { id: 'libre-baskerville', label: 'Libre Baskerville', family: "'Libre Baskerville', serif", googleFamily: 'Libre+Baskerville:wght@400;700' },
  { id: 'lora', label: 'Lora', family: "'Lora', serif", googleFamily: 'Lora:wght@400;500;600;700' },
  { id: 'eb-garamond', label: 'EB Garamond', family: "'EB Garamond', serif", googleFamily: 'EB+Garamond:wght@400;500;600;700' },
  { id: 'prata', label: 'Prata', family: "'Prata', serif", googleFamily: 'Prata' },
  { id: 'marcellus', label: 'Marcellus', family: "'Marcellus', serif", googleFamily: 'Marcellus' },
  { id: 'italiana', label: 'Italiana', family: "'Italiana', serif", googleFamily: 'Italiana' },
  { id: 'fraunces', label: 'Fraunces', family: "'Fraunces', serif", googleFamily: 'Fraunces:opsz,wght@9..144,400..700' },
  { id: 'dm-serif-display', label: 'DM Serif Display', family: "'DM Serif Display', serif", googleFamily: 'DM+Serif+Display' },
  { id: 'libre-caslon-display', label: 'Libre Caslon Display', family: "'Libre Caslon Display', serif", googleFamily: 'Libre+Caslon+Display' },
  { id: 'gloock', label: 'Gloock', family: "'Gloock', serif", googleFamily: 'Gloock' },
  { id: 'spectral', label: 'Spectral', family: "'Spectral', serif", googleFamily: 'Spectral:wght@300;400;500;600;700' },
  { id: 'rufina', label: 'Rufina', family: "'Rufina', serif", googleFamily: 'Rufina:wght@400;700' },
  { id: 'cardo', label: 'Cardo', family: "'Cardo', serif", googleFamily: 'Cardo:wght@400;700' },
  { id: 'caudex', label: 'Caudex', family: "'Caudex', serif", googleFamily: 'Caudex:wght@400;700' },
  { id: 'sorts-mill-goudy', label: 'Sorts Mill Goudy', family: "'Sorts Mill Goudy', serif", googleFamily: 'Sorts+Mill+Goudy' },
  { id: 'yeseva-one', label: 'Yeseva One', family: "'Yeseva One', serif", googleFamily: 'Yeseva+One' },
  { id: 'bellefair', label: 'Bellefair', family: "'Bellefair', serif", googleFamily: 'Bellefair' },
  { id: 'castoro', label: 'Castoro', family: "'Castoro', serif", googleFamily: 'Castoro' },
  { id: 'adamina', label: 'Adamina', family: "'Adamina', serif", googleFamily: 'Adamina' },
  { id: 'cormorant-sc', label: 'Cormorant SC', family: "'Cormorant SC', serif", googleFamily: 'Cormorant+SC:wght@300;400;500;600;700' },
  { id: 'abhaya-libre', label: 'Abhaya Libre', family: "'Abhaya Libre', serif", googleFamily: 'Abhaya+Libre:wght@400;500;600;700' },
  { id: 'old-standard-tt', label: 'Old Standard TT', family: "'Old Standard TT', serif", googleFamily: 'Old+Standard+TT:wght@400;700' },
  { id: 'jomolhari', label: 'Jomolhari', family: "'Jomolhari', serif", googleFamily: 'Jomolhari' },
  { id: 'tenor-sans', label: 'Tenor Sans', family: "'Tenor Sans', sans-serif", googleFamily: 'Tenor+Sans' },
  { id: 'poiret-one', label: 'Poiret One', family: "'Poiret One', sans-serif", googleFamily: 'Poiret+One' },
];

/** 30 script / signature-style fonts for the "by Emely" logo line */
export const SCRIPT_LOGO_FONTS: LogoFont[] = [
  { id: 'pinyon-script', label: 'Pinyon Script', family: "'Pinyon Script', cursive", googleFamily: 'Pinyon+Script' },
  { id: 'great-vibes', label: 'Great Vibes', family: "'Great Vibes', cursive", googleFamily: 'Great+Vibes' },
  { id: 'allura', label: 'Allura', family: "'Allura', cursive", googleFamily: 'Allura' },
  { id: 'dancing-script', label: 'Dancing Script', family: "'Dancing Script', cursive", googleFamily: 'Dancing+Script' },
  { id: 'sacramento', label: 'Sacramento', family: "'Sacramento', cursive", googleFamily: 'Sacramento' },
  { id: 'parisienne', label: 'Parisienne', family: "'Parisienne', cursive", googleFamily: 'Parisienne' },
  { id: 'tangerine', label: 'Tangerine', family: "'Tangerine', cursive", googleFamily: 'Tangerine' },
  { id: 'alex-brush', label: 'Alex Brush', family: "'Alex Brush', cursive", googleFamily: 'Alex+Brush' },
  { id: 'satisfy', label: 'Satisfy', family: "'Satisfy', cursive", googleFamily: 'Satisfy' },
  { id: 'pacifico', label: 'Pacifico', family: "'Pacifico', cursive", googleFamily: 'Pacifico' },
  { id: 'courgette', label: 'Courgette', family: "'Courgette', cursive", googleFamily: 'Courgette' },
  { id: 'marck-script', label: 'Marck Script', family: "'Marck Script', cursive", googleFamily: 'Marck+Script' },
  { id: 'italianno', label: 'Italianno', family: "'Italianno', cursive", googleFamily: 'Italianno' },
  { id: 'mrs-saint-delafield', label: 'Mrs Saint Delafield', family: "'Mrs Saint Delafield', cursive", googleFamily: 'Mrs+Saint+Delafield' },
  { id: 'norican', label: 'Norican', family: "'Norican', cursive", googleFamily: 'Norican' },
  { id: 'petit-formal-script', label: 'Petit Formal Script', family: "'Petit Formal Script', cursive", googleFamily: 'Petit+Formal+Script' },
  { id: 'qwitcher-grypen', label: 'Qwitcher Grypen', family: "'Qwitcher Grypen', cursive", googleFamily: 'Qwitcher+Grypen' },
  { id: 'style-script', label: 'Style Script', family: "'Style Script', cursive", googleFamily: 'Style+Script' },
  { id: 'whisper', label: 'Whisper', family: "'Whisper', cursive", googleFamily: 'Whisper' },
  { id: 'licorice', label: 'Licorice', family: "'Licorice', cursive", googleFamily: 'Licorice' },
  { id: 'mea-culpa', label: 'Mea Culpa', family: "'Mea Culpa', cursive", googleFamily: 'Mea+Culpa' },
  { id: 'bonheur-royale', label: 'Bonheur Royale', family: "'Bonheur Royale', cursive", googleFamily: 'Bonheur+Royale' },
  { id: 'birthstone', label: 'Birthstone', family: "'Birthstone', cursive", googleFamily: 'Birthstone' },
  { id: 'imperial-script', label: 'Imperial Script', family: "'Imperial Script', cursive", googleFamily: 'Imperial+Script' },
  { id: 'lavishly-yours', label: 'Lavishly Yours', family: "'Lavishly Yours', cursive", googleFamily: 'Lavishly+Yours' },
  { id: 'rouge-script', label: 'Rouge Script', family: "'Rouge Script', cursive", googleFamily: 'Rouge+Script' },
  { id: 'herr-von-muellerhoff', label: 'Herr Von Muellerhoff', family: "'Herr Von Muellerhoff', cursive", googleFamily: 'Herr+Von+Muellerhoff' },
  { id: 'monsieur-la-doulaise', label: 'Monsieur La Doulaise', family: "'Monsieur La Doulaise', cursive", googleFamily: 'Monsieur+La+Doulaise' },
  { id: 'bilbo', label: 'Bilbo', family: "'Bilbo', cursive", googleFamily: 'Bilbo' },
  { id: 'ephesis', label: 'Ephesis', family: "'Ephesis', cursive", googleFamily: 'Ephesis' },
];

export const DEFAULT_SCRIPT_FONT_ID = 'allura';
export const DEFAULT_SKIN_FONT_ID = 'playfair-display';

export function getScriptFontById(id: string): LogoFont {
  return SCRIPT_LOGO_FONTS.find((f) => f.id === id) ?? SCRIPT_LOGO_FONTS[0];
}

export function getSkinFontById(id: string): LogoFont {
  return SKIN_LOGO_FONTS.find((f) => f.id === id) ?? SKIN_LOGO_FONTS[0];
}

export function getBrandingGoogleFamilies(scriptFontId: string, skinFontId: string): string[] {
  const script = getScriptFontById(scriptFontId).googleFamily;
  const skin = getSkinFontById(skinFontId).googleFamily;
  if (script === skin) return [script];
  return [script, skin];
}

export function buildGoogleFontsStylesheetUrl(googleFamilies: string[]): string {
  const unique = [...new Set(googleFamilies)];
  const families = unique.map((g) => `family=${g}`).join('&');
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

/** Logo fonts only — block prevents fallback type from showing before the real face loads. */
export function buildLogoFontsStylesheetUrl(scriptFontId: string, skinFontId: string): string {
  const families = getBrandingGoogleFamilies(scriptFontId, skinFontId)
    .map((g) => `family=${g}`)
    .join('&');
  return `https://fonts.googleapis.com/css2?${families}&display=block`;
}

function primaryFontName(family: string): string {
  const quoted = family.match(/['"]([^'"]+)['"]/);
  return quoted ? quoted[1] : family.split(',')[0].trim();
}

function logoFontDescriptors(scriptFontId: string, skinFontId: string): [string, string] {
  const script = getScriptFontById(scriptFontId);
  const skin = getSkinFontById(skinFontId);
  const quote = (name: string) => `"${name}"`;
  return [
    `400 1em ${quote(primaryFontName(script.family))}`,
    `400 1em ${quote(primaryFontName(skin.family))}`,
  ];
}

export function logoFontsAreReady(scriptFontId: string, skinFontId: string): boolean {
  if (typeof document === 'undefined' || !document.fonts) return true;
  const [scriptDesc, skinDesc] = logoFontDescriptors(scriptFontId, skinFontId);
  return document.fonts.check(scriptDesc) && document.fonts.check(skinDesc);
}

/** Resolves true only when the configured logo fonts are actually available. */
export function waitForLogoFonts(
  scriptFontId: string,
  skinFontId: string,
  maxMs = 3000,
): Promise<boolean> {
  if (logoFontsAreReady(scriptFontId, skinFontId)) {
    return Promise.resolve(true);
  }
  if (typeof document === 'undefined' || !document.fonts) {
    return Promise.resolve(true);
  }

  const [scriptDesc, skinDesc] = logoFontDescriptors(scriptFontId, skinFontId);

  return new Promise((resolve) => {
    const started = performance.now();

    const tryResolve = () => {
      if (logoFontsAreReady(scriptFontId, skinFontId)) {
        resolve(true);
        return true;
      }
      if (performance.now() - started >= maxMs) {
        resolve(false);
        return true;
      }
      return false;
    };

    if (tryResolve()) return;

    Promise.allSettled([
      document.fonts.load(scriptDesc),
      document.fonts.load(skinDesc),
    ]).finally(() => {
      if (tryResolve()) return;
      const poll = () => {
        if (tryResolve()) return;
        window.setTimeout(poll, 50);
      };
      poll();
    });
  });
}

const PREVIEW_CHUNK_SIZE = 8;

/** Load Google Fonts in small batches (single large URLs return 400). Returns cleanup. */
export function injectGoogleFontLinks(
  idPrefix: string,
  googleFamilies: string[],
): () => void {
  if (typeof document === 'undefined') {
    return () => {};
  }

  const unique = [...new Set(googleFamilies)];
  const linkIds: string[] = [];

  for (let i = 0; i < unique.length; i += PREVIEW_CHUNK_SIZE) {
    const chunk = unique.slice(i, i + PREVIEW_CHUNK_SIZE);
    const id = `${idPrefix}-${Math.floor(i / PREVIEW_CHUNK_SIZE)}`;
    linkIds.push(id);

    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = buildGoogleFontsStylesheetUrl(chunk);
  }

  return () => {
    linkIds.forEach((id) => document.getElementById(id)?.remove());
  };
}

/** All logo fonts — for owner dashboard previews */
export function getAllLogoGoogleFamilies(): string[] {
  return [
    ...new Set([
      ...SCRIPT_LOGO_FONTS.map((f) => f.googleFamily),
      ...SKIN_LOGO_FONTS.map((f) => f.googleFamily),
    ]),
  ];
}
