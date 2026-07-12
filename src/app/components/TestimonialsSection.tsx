import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { ReviewCard } from "./ReviewCard";

export function TestimonialsSection() {
  const reviews = [
    {
      name: "Pam Simmons",
      date: "3 months ago",
      meta: "Local Guide · 34 reviews",
      content: "This was my first visit and it was amazing. I love how the atmosphere was so warm and inviting. Emely was very sweet. She took very good care of my face with every chosen product she used. I'm really glad I met her. Will be booking her again for other services.",
      tags: ["Great price"]
    },
    {
      name: "Rebecca Sargable",
      date: "3 weeks ago",
      meta: "1 review",
      content: "This was my very first facial, and I couldn’t have asked for a better experience. From the moment I walked in, the room was spotless, comfortable, and incredibly serene…instantly calming. Emely was absolutely amazing. She took her time, explained things thoughtfully, and created such a relaxing, personalized experience. I could literally feel the stress melting away. My skin feels refreshed, glowing, and renewed, and I left feeling deeply peaceful and relaxed. If you’re considering a facial, Emely is the person to see. I can’t recommend her highly enough and will absolutely be back.",
      tags: ["New", "Great price"]
    },
    {
      name: "Shakia Flagler",
      date: "3 weeks ago",
      meta: "1 review",
      content: "I’ve been going to Emely for about a year now once a month and she’s amazing!!! Very sweet and kind. Atmosphere is peaceful calm very relaxing. She knows what she’s doing she loves her customs and very passionate about what she does and that’s what makes it better! My skin and I love her ❤️❤️",
      tags: ["New", "Great price"]
    }
  ];

  return (
    <section className="py-16 md:py-20 px-4 bg-[#2c2c2c] text-white texture-grain overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <div className="w-16 h-px bg-gradient-bronze mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
            Client Experiences
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Real stories from our valued clients
          </p>
        </div>

        <div className="px-4 md:px-12">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {reviews.map((review, idx) => (
                <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <ReviewCard {...review} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:inline-flex border-[#b8956a] text-[#b8956a] hover:bg-[#b8956a] hover:text-white bg-transparent" />
            <CarouselNext className="hidden md:inline-flex border-[#b8956a] text-[#b8956a] hover:bg-[#b8956a] hover:text-white bg-transparent" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
