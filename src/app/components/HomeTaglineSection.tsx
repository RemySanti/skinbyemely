import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Sparkles,
  Heart,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Button } from './ui/button';
import { FadeInSection } from './motion/FadeInSection';
import { getHomeTaglineById, type HomeTaglineBlock } from '../config/home-taglines';
import { SQUARE_BOOKING_URL } from './BookingRedirect';

const ROTATING_WORDS = ['Facials', 'Peels', 'Custom Care', 'Relaxation'];
const MARQUEE_ITEMS = [
  'Clinical Luxury',
  'Personalized Care',
  'Circadia',
  'Licensed Esthetician',
  'Brandon FL',
  'Intentional Touch',
];

interface HomeTaglineSectionProps {
  taglineId: string;
  preview?: boolean;
}

function BronzeDivider({ className = '' }: { className?: string }) {
  return <div className={`h-px bg-gradient-bronze ${className}`} />;
}

function ClassicBlock({ block, compact }: { block: HomeTaglineBlock; compact?: boolean }) {
  return (
    <div className="text-center">
      <BronzeDivider className={`mx-auto ${compact ? 'w-10 mb-3' : 'w-16 mb-6'}`} />
      <h2
        className={`font-serif text-[#2c2c2c] tracking-wide font-normal ${
          compact ? 'text-xl' : 'text-3xl md:text-4xl'
        }`}
      >
        {block.headline}
      </h2>
    </div>
  );
}

function HeadlineSubtitleBlock({ block, compact }: { block: HomeTaglineBlock; compact?: boolean }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <BronzeDivider className={`mx-auto ${compact ? 'w-10 mb-3' : 'w-16 mb-6'}`} />
      <h2
        className={`font-serif text-[#2c2c2c] tracking-wide mb-3 ${
          compact ? 'text-xl' : 'text-3xl md:text-4xl'
        }`}
      >
        {block.headline}
      </h2>
      {block.subtitle && (
        <p className={`text-[#6b6b6b] leading-relaxed ${compact ? 'text-xs' : 'text-lg'}`}>
          {block.subtitle}
        </p>
      )}
    </div>
  );
}

function DualCtaBlock({ block, compact }: { block: HomeTaglineBlock; compact?: boolean }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <BronzeDivider className={`mx-auto ${compact ? 'w-10 mb-3' : 'w-16 mb-6'}`} />
      <h2 className={`font-serif text-[#2c2c2c] mb-2 ${compact ? 'text-xl' : 'text-3xl md:text-4xl'}`}>
        {block.headline}
      </h2>
      {block.subtitle && (
        <p className={`text-[#6b6b6b] mb-4 ${compact ? 'text-xs mb-3' : 'text-base mb-6'}`}>
          {block.subtitle}
        </p>
      )}
      {!compact && (
        <div className="flex flex-wrap justify-center gap-4">
          <a href={SQUARE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <Button className="btn-bronze px-8 py-3 rounded">Book Now</Button>
          </a>
          <Link to="/about">
            <Button className="btn-outline-bronze px-8 py-3 rounded bg-white">Our Philosophy</Button>
          </Link>
        </div>
      )}
      {compact && (
        <div className="flex justify-center gap-2">
          <span className="text-[10px] uppercase tracking-wider px-2 py-1 bg-[#b8956a]/10 text-[#b8956a] rounded">
            Book
          </span>
          <span className="text-[10px] uppercase tracking-wider px-2 py-1 border border-[#b8956a]/30 text-[#6b6b6b] rounded">
            About
          </span>
        </div>
      )}
    </div>
  );
}

function TrustPillarsBlock({ block, compact }: { block: HomeTaglineBlock; compact?: boolean }) {
  const pillars = [
    { icon: Award, label: 'Licensed' },
    { icon: Sparkles, label: 'Circadia' },
    { icon: Heart, label: 'Personalized' },
  ];
  return (
    <div className="text-center">
      <BronzeDivider className={`mx-auto ${compact ? 'w-10 mb-3' : 'w-16 mb-6'}`} />
      <h2 className={`font-serif text-[#2c2c2c] mb-4 ${compact ? 'text-xl mb-3' : 'text-3xl md:text-4xl mb-8'}`}>
        {block.headline}
      </h2>
      <div className={`flex flex-wrap justify-center ${compact ? 'gap-2' : 'gap-6 md:gap-10'}`}>
        {pillars.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className={`flex items-center gap-2 rounded-full border border-[#b8956a]/20 bg-white ${
              compact ? 'px-2 py-1 text-[10px]' : 'px-5 py-2.5 text-sm'
            }`}
          >
            <Icon className={`text-[#b8956a] ${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />
            <span className="uppercase tracking-wider text-[#6b6b6b] font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RotatingFocusBlock({ block, compact }: { block: HomeTaglineBlock; compact?: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <BronzeDivider className={`mx-auto ${compact ? 'w-10 mb-3' : 'w-16 mb-6'}`} />
      <div
        className={`flex flex-col items-center justify-center font-serif text-[#2c2c2c] ${
          compact ? 'text-lg min-h-[2.5rem]' : 'text-3xl md:text-4xl min-h-[5rem]'
        }`}
      >
        <span className="text-[#6b6b6b] font-sans text-sm md:text-base mb-1 tracking-wide uppercase">
          {block.headline}
        </span>
        <div className={`relative overflow-hidden ${compact ? 'h-7' : 'h-12 md:h-14'}`}>
          <AnimatePresence mode="wait">
            <motion.span
              key={ROTATING_WORDS[index]}
              initial={{ opacity: 0, y: compact ? 8 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: compact ? -8 : -16 }}
              transition={{ duration: 0.45 }}
              className={`block text-[#b8956a] italic ${compact ? 'text-xl' : 'text-4xl md:text-5xl'}`}
            >
              {ROTATING_WORDS[index]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StatStripBlock({ block, compact }: { block: HomeTaglineBlock; compact?: boolean }) {
  const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: 'FL', label: 'Licensed Esthetician' },
    { value: 'Brandon', label: 'Studio Location' },
  ];
  return (
    <div className="text-center">
      <h2 className={`font-serif text-[#2c2c2c] mb-4 ${compact ? 'text-xl mb-3' : 'text-3xl md:text-4xl mb-8'}`}>
        {block.headline}
      </h2>
      <div className={`grid grid-cols-3 ${compact ? 'gap-2' : 'gap-4 md:gap-8 max-w-3xl mx-auto'}`}>
        {stats.map((stat) => (
          <div key={stat.label} className={`border border-[#b8956a]/15 bg-white ${compact ? 'py-2 px-1' : 'py-4 px-3'}`}>
            <p className={`font-serif text-[#b8956a] ${compact ? 'text-lg' : 'text-2xl md:text-3xl'}`}>
              {stat.value}
            </p>
            <p className={`uppercase tracking-wider text-[#6b6b6b] ${compact ? 'text-[8px] mt-0.5' : 'text-[10px] md:text-xs mt-1'}`}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CredentialHighlightBlock({ block, compact }: { block: HomeTaglineBlock; compact?: boolean }) {
  return (
    <div className={`flex flex-col items-center ${compact ? 'gap-3' : 'gap-6 md:flex-row md:justify-center md:gap-10'}`}>
      <img
        src="/certifications/circadia-acne-specialist.png"
        alt="Circadia Skin Specialist certification"
        className={`object-contain flex-shrink-0 ${compact ? 'w-16 h-16' : 'w-24 h-24 md:w-28 md:h-28'}`}
        width={112}
        height={112}
        loading="lazy"
      />
      <div className={`text-center ${compact ? '' : 'md:text-left'}`}>
        <p className={`uppercase tracking-[0.2em] text-[#b8956a] font-medium ${compact ? 'text-[9px] mb-1' : 'text-xs mb-2'}`}>
          {block.subtitle}
        </p>
        <h2 className={`font-serif text-[#2c2c2c] ${compact ? 'text-lg' : 'text-3xl md:text-4xl'}`}>
          {block.headline}
        </h2>
        {!compact && (
          <Link to="/about" className="inline-block mt-4 text-sm text-[#b8956a] hover:underline uppercase tracking-wider">
            View Credentials →
          </Link>
        )}
      </div>
    </div>
  );
}

function MarqueeKeywordsBlock({ block, compact }: { block: HomeTaglineBlock; compact?: boolean }) {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div>
      <h2 className={`font-serif text-[#2c2c2c] text-center mb-4 ${compact ? 'text-lg mb-2' : 'text-3xl md:text-4xl mb-6'}`}>
        {block.headline}
      </h2>
      <div className={`overflow-hidden border-y border-[#b8956a]/15 bg-white ${compact ? 'py-2' : 'py-4'}`}>
        <div className={`flex whitespace-nowrap animate-marquee ${compact ? 'gap-6' : 'gap-10'}`}>
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className={`uppercase tracking-[0.25em] text-[#6b6b6b] flex items-center gap-6 ${
                compact ? 'text-[9px]' : 'text-xs md:text-sm'
              }`}
            >
              {item}
              <span className="text-[#b8956a]">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SplitEditorialBlock({ block, compact }: { block: HomeTaglineBlock; compact?: boolean }) {
  return (
    <div className={`grid items-center ${compact ? 'gap-3 text-left' : 'md:grid-cols-2 gap-8 md:gap-12'}`}>
      <div>
        <BronzeDivider className={`${compact ? 'w-10 mb-2' : 'w-16 mb-6'}`} />
        <h2 className={`font-serif text-[#2c2c2c] ${compact ? 'text-lg' : 'text-3xl md:text-4xl'}`}>
          {block.headline}
        </h2>
      </div>
      <blockquote
        className={`border-l-2 border-[#b8956a]/40 text-[#6b6b6b] italic leading-relaxed ${
          compact ? 'text-xs pl-3' : 'text-lg pl-6'
        }`}
      >
        {block.subtitle}
      </blockquote>
    </div>
  );
}

function ActionBarBlock({ block, compact }: { block: HomeTaglineBlock; compact?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center justify-between gap-4 bg-white border border-[#b8956a]/15 ${
        compact ? 'p-3 rounded-lg' : 'md:flex-row p-6 md:p-8 rounded-none'
      }`}
    >
      <div className={`text-center ${compact ? '' : 'md:text-left'}`}>
        <h2 className={`font-serif text-[#2c2c2c] ${compact ? 'text-base' : 'text-2xl md:text-3xl'}`}>
          {block.headline}
        </h2>
        {block.subtitle && (
          <p className={`text-[#6b6b6b] flex items-center justify-center gap-1 mt-1 ${compact ? 'text-[10px]' : 'text-sm md:justify-start'}`}>
            <MapPin className={`text-[#b8956a] ${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />
            {block.subtitle}
          </p>
        )}
      </div>
      {!compact && (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:9142997739"
            className="flex items-center gap-2 text-sm text-[#6b6b6b] hover:text-[#b8956a] transition-colors"
          >
            <Phone className="w-4 h-4" />
            (914) 299-7739
          </a>
          <a href={SQUARE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <Button className="btn-bronze px-6 py-3 rounded flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Book Now
            </Button>
          </a>
        </div>
      )}
      {compact && (
        <div className="flex gap-2">
          <Phone className="w-3 h-3 text-[#b8956a]" />
          <Calendar className="w-3 h-3 text-[#b8956a]" />
        </div>
      )}
    </div>
  );
}

function TaglineContent({
  block,
  compact,
}: {
  block: HomeTaglineBlock;
  compact?: boolean;
}) {
  switch (block.variant) {
    case 'classic':
      return <ClassicBlock block={block} compact={compact} />;
    case 'headline-subtitle':
      return <HeadlineSubtitleBlock block={block} compact={compact} />;
    case 'dual-cta':
      return <DualCtaBlock block={block} compact={compact} />;
    case 'trust-pillars':
      return <TrustPillarsBlock block={block} compact={compact} />;
    case 'rotating-focus':
      return <RotatingFocusBlock block={block} compact={compact} />;
    case 'stat-strip':
      return <StatStripBlock block={block} compact={compact} />;
    case 'credential-highlight':
      return <CredentialHighlightBlock block={block} compact={compact} />;
    case 'marquee-keywords':
      return <MarqueeKeywordsBlock block={block} compact={compact} />;
    case 'split-editorial':
      return <SplitEditorialBlock block={block} compact={compact} />;
    case 'action-bar':
      return <ActionBarBlock block={block} compact={compact} />;
    default:
      return <ClassicBlock block={block} compact={compact} />;
  }
}

export function HomeTaglineSection({ taglineId, preview = false }: HomeTaglineSectionProps) {
  const block = getHomeTaglineById(taglineId);

  if (preview) {
    return (
      <div className="bg-[#faf8f5] border border-[#b8956a]/15 rounded-lg p-4 overflow-hidden">
        <TaglineContent block={block} compact />
      </div>
    );
  }

  return (
    <section className="py-12 md:py-14 px-4 bg-[#faf8f5] border-b border-[#b8956a]/10">
      <FadeInSection className="max-w-6xl mx-auto">
        <TaglineContent block={block} />
      </FadeInSection>
    </section>
  );
}
