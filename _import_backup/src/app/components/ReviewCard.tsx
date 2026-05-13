import { useState } from 'react';
import { Star, Quote } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  date: string;
  content: string;
  tags?: string[];
  meta?: string;
}

export function ReviewCard({ name, date, content, tags, meta }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split sentences roughly by . ! ? 
  // This regex matches sentences ending with . ! ? followed by space or end of string
  const sentences = content.match(/[^.!?]+[.!?]+(\s|$)/g) || [content];
  
  // Fallback if regex fails to split (e.g. no punctuation)
  const safeSentences = sentences.length > 0 ? sentences : [content];
  
  const shortContent = safeSentences.slice(0, 2).join('').trim();
  const hasMore = safeSentences.length > 2;

  return (
    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-sm border border-white/10 h-full flex flex-col relative mx-2 transition-all hover:bg-white/10">
      <div className="absolute top-6 right-6 opacity-20">
         <Quote className="w-10 h-10 text-[#b8956a]" />
      </div>

      <div className="flex items-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#b8956a] text-[#b8956a]" />
        ))}
      </div>

      <div className="flex-grow mb-6 relative z-10">
         <p className="text-lg font-light leading-relaxed text-white/90">
            "{isExpanded ? content : shortContent}"
            {!isExpanded && hasMore && <span>...</span>}
         </p>
         {hasMore && (
           <button 
             onClick={() => setIsExpanded(!isExpanded)}
             className="mt-3 text-[#b8956a] text-xs font-bold uppercase tracking-widest hover:text-[#d4bb8f] transition-colors"
           >
             {isExpanded ? 'Read Less' : 'Read More'}
           </button>
         )}
      </div>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex flex-col gap-1">
          <h4 className="font-serif text-xl text-white">{name}</h4>
          <div className="flex flex-wrap items-center gap-x-2 text-xs text-white/50">
             <span>{date}</span>
             {meta && (
               <>
                 <span>•</span>
                 <span>{meta}</span>
               </>
             )}
          </div>
        </div>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
             {tags.map((tag, i) => (
               <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/10 rounded text-[#d4bb8f] border border-white/5">
                 {tag}
               </span>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
