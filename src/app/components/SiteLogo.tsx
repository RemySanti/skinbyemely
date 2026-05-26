interface SiteLogoProps {
  scrolled?: boolean;
  variant?: 'header' | 'footer';
}

export function SiteLogo({ scrolled = false, variant = 'header' }: SiteLogoProps) {
  const src = variant === 'footer' ? '/logo-footer.svg' : '/logo.svg';

  if (variant === 'footer') {
    return (
      <div className="mb-6">
        <img
          src={src}
          alt="Skin by Emely"
          className="h-16 w-auto"
          width={248}
          height={88}
          decoding="async"
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt="Skin by Emely"
      className={`w-auto transition-all duration-500 ${
        scrolled ? 'h-12 md:h-14' : 'h-14 md:h-[4.5rem]'
      }`}
      width={248}
      height={88}
      decoding="async"
    />
  );
}
