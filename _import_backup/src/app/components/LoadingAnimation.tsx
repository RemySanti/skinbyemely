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
        <div className="mb-8 animate-logo-pulse">
          <div className="flex flex-col items-center">
            <h2 
              className="text-6xl md:text-8xl font-bold tracking-tight text-[#2c2c2c] leading-[0.8]"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              SKIN
            </h2>
            <p 
              className="text-3xl md:text-4xl text-[#6b6b6b] -mt-2 md:-mt-3 ml-12 md:ml-16 relative z-10"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              by Emely
            </p>
            <div className="h-px w-0 bg-gradient-bronze animate-line-expand mt-6" />
          </div>
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
