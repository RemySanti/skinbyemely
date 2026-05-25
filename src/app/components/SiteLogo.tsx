import { useBranding } from '../context/BrandingContext';

interface SiteLogoProps {
  scrolled?: boolean;
  variant?: 'header' | 'footer';
}

export function SiteLogo({ scrolled = false, variant = 'header' }: SiteLogoProps) {
  const { scriptFontFamily, skinFontFamily, branding } = useBranding();
  const ownerName = branding.ownerName?.trim() || 'Emely';

  if (variant === 'footer') {
    return (
      <div className="mb-6">
        <h3
          className="text-4xl font-bold tracking-tight text-[#d4bb8f] leading-[0.8]"
          style={{ fontFamily: skinFontFamily }}
        >
          SKIN
        </h3>
        <p
          className="text-xl text-[#faf8f5]/80 -mt-2 ml-10 relative z-10"
          style={{ fontFamily: scriptFontFamily }}
        >
          by {ownerName}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h2
        className={`font-bold tracking-tight text-[#171717] leading-[0.8] transition-all duration-500 ${
          scrolled ? 'text-4xl md:text-5xl' : 'text-5xl md:text-7xl'
        }`}
        style={{ fontFamily: skinFontFamily }}
      >
        SKIN
      </h2>
      <p
        className={`text-neutral-500 relative z-10 transition-all duration-500 ${
          scrolled
            ? 'text-lg md:text-xl -mt-1 md:-mt-1 ml-6 md:ml-8'
            : 'text-xl md:text-3xl -mt-1 md:-mt-2 ml-8 md:ml-12'
        }`}
        style={{ fontFamily: scriptFontFamily }}
      >
        by {ownerName}
      </p>
    </div>
  );
}
