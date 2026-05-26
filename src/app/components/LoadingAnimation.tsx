import { useEffect, useState } from 'react';

export function LoadingAnimation() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 1.7 seconds (animation completes at 2s)
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-[#faf8f5] flex items-center justify-center transition-opacity duration-300 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        {/* Logo Animation */}
        <div className="mb-8 animate-logo-pulse flex flex-col items-center">
          <img
            src="/logo.svg"
            alt="Skin by Emely"
            className="h-24 md:h-32 w-auto"
            width={248}
            height={88}
            decoding="async"
          />
          <div className="h-px w-0 bg-gradient-bronze animate-line-expand mt-6" />
        </div>

        {/* Loading Text */}
        <div className="text-sm tracking-widest text-[#b8956a] animate-fade-in-delayed">
          LOADING LUXURY
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#b8956a] animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-[#b8956a] animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-[#b8956a] animate-pulse" style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>
    </div>
  );
}
