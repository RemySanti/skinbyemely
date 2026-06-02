import { useEffect, useState } from 'react';
import { useBranding } from '../context/BrandingContext';
import {
  buildLogoFontsStylesheetUrl,
  getScriptFontById,
  getSkinFontById,
  waitForLogoFonts,
} from '../config/script-logo-fonts';

interface SiteLogoProps {
  scrolled?: boolean;
  variant?: 'header' | 'footer';
}

const LOGO_FONT_LINK_ID = 'sbe-logo-fonts';

export function SiteLogo({ scrolled = false, variant = 'header' }: SiteLogoProps) {
  const { branding } = useBranding();
  const [fontsReady, setFontsReady] = useState(false);

  const skinFont = getSkinFontById(branding.skinFontId);
  const scriptFont = getScriptFontById(branding.scriptFontId);
  const ownerName = branding.ownerName?.trim() || 'Emely';
  const isFooter = variant === 'footer';

  useEffect(() => {
    let link = document.getElementById(LOGO_FONT_LINK_ID) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = LOGO_FONT_LINK_ID;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = buildLogoFontsStylesheetUrl(branding.scriptFontId, branding.skinFontId);

    let cancelled = false;
    setFontsReady(false);
    waitForLogoFonts(branding.scriptFontId, branding.skinFontId).then((ready) => {
      if (!cancelled) setFontsReady(ready);
    });

    return () => {
      cancelled = true;
    };
  }, [branding.scriptFontId, branding.skinFontId]);

  const skinColor = isFooter ? '#d4bb8f' : '#171717';
  const scriptColor = isFooter ? 'rgba(250, 248, 245, 0.8)' : '#737373';

  const skinSizeClass = isFooter
    ? 'text-[2.75rem] leading-none'
    : scrolled
      ? 'text-[2rem] md:text-[2.25rem] leading-none'
      : 'text-[2.25rem] md:text-[2.75rem] leading-none';

  const scriptSizeClass = isFooter
    ? 'text-xl leading-none'
    : scrolled
      ? 'text-sm md:text-base leading-none'
      : 'text-base md:text-lg leading-none';

  const scriptOffsetClass = isFooter ? 'ml-10' : scrolled ? 'ml-7 md:ml-8' : 'ml-8 md:ml-10';

  const logo = (
    <div
      className={`inline-flex flex-col items-start select-none transition-opacity duration-200 ${
        fontsReady ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label={`Skin by ${ownerName}`}
      role="img"
    >
      <span
        className={`font-bold ${skinSizeClass}`}
        style={{ fontFamily: skinFont.family, color: skinColor }}
      >
        SKIN
      </span>
      <span
        className={`${scriptSizeClass} ${scriptOffsetClass} -mt-0.5`}
        style={{ fontFamily: scriptFont.family, color: scriptColor }}
      >
        by {ownerName}
      </span>
    </div>
  );

  if (isFooter) {
    return <div className="mb-6 min-h-16">{logo}</div>;
  }

  return (
    <div
      className={`w-auto transition-all duration-500 flex items-center justify-center ${
        scrolled ? 'h-12 md:h-14' : 'h-14 md:h-[4.5rem]'
      }`}
    >
      {logo}
    </div>
  );
}
