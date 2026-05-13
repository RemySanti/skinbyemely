import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getJournalPost, journalPosts } from "@/lib/journal-posts";

type Props = { params: Promise<{ slug: string }> };

const ctaHref =
  "https://book.squareup.com/appointments/f7dcst2ljp85dq/location/LMVSQK9C6PR4T/services";

export async function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);

  if (!post) return { title: "Journal Article Not Found | Skin by Emely" };

  return {
    title: `${post.title} | Skin by Emely Journal`,
    description: post.description
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();
  const relatedPosts = journalPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article aria-labelledby="journal-article-heading">
      <section className="on-dark relative overflow-hidden bg-mocha py-16 md:py-32">
        <div
          className="pointer-events-none absolute inset-0 bg-espresso-radial opacity-45"
          aria-hidden
        />
        <div className="relative max-w-[1100px] mx-auto px-5 sm:px-6 md:px-12">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-[10px] tracking-xl uppercase text-light/65">
              <li><Link href="/" className="hover:text-light transition-colors">Home</Link></li>
              <li aria-hidden>·</li>
              <li><Link href="/education" className="hover:text-light transition-colors">Journal</Link></li>
              <li aria-hidden>·</li>
              <li className="text-light/90 line-clamp-1">{post.category}</li>
            </ol>
          </nav>
          <p className="mb-4">
            <span className="inline-flex items-center rounded-pill border border-light/30 bg-black/28 px-3 py-1.5 text-[10px] tracking-xxl uppercase text-gold backdrop-blur-sm shadow-[0_8px_20px_rgba(0,0,0,0.28)]">
              {post.category} · {post.readTime}
            </span>
          </p>
          <h1
            id="journal-article-heading"
            className="font-serif text-light text-4xl md:text-6xl leading-[1.08] max-w-4xl"
          >
            {post.title}
          </h1>
          <p className="text-light/75 mt-6 text-base md:text-lg max-w-2xl leading-relaxed">
            {post.description}
          </p>
          <p className="mt-4">
            <span className="inline-flex items-center rounded-pill border border-light/20 bg-black/20 px-3 py-1 text-light/70 text-[10px] tracking-xl uppercase backdrop-blur-sm">
              Published {post.publishDate}
            </span>
          </p>
        </div>
      </section>

      <section className="bg-ivory py-12 md:py-20">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] gap-6 md:gap-8">
          <div className="space-y-5 md:space-y-6">
            {post.sections.map((section) => (
              <section
                key={section.heading}
                className="rounded-[22px] border border-ink/10 bg-linen p-5 md:p-7 shadow-soft"
              >
                <h2 className="font-serif text-3xl text-ink leading-tight">
                  {section.heading}
                </h2>
                {section.image ? (
                  <div className="mt-4 relative h-56 md:h-72 w-full overflow-hidden rounded-[18px] border border-ink/10">
                    <Image
                      src={section.image}
                      alt={section.imageAlt ?? section.heading}
                      fill
                      sizes="(max-width: 1024px) 100vw, 700px"
                      className="object-cover"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                      aria-hidden
                    />
                  </div>
                ) : null}
                <p className="mt-4 text-ink/75 leading-relaxed text-base">
                  {section.content}
                </p>
              </section>
            ))}

            <section className="rounded-[22px] border border-ink/10 bg-linen p-5 md:p-7 shadow-soft">
              <h2 className="font-serif text-3xl text-ink leading-tight">
                Key takeaways
              </h2>
              <ul className="mt-5 space-y-3 list-none p-0">
                {post.takeaways.map((tip) => (
                  <li key={tip} className="flex gap-3 text-ink/75 leading-relaxed">
                    <span className="text-gold-deep mt-0.5 shrink-0">·</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[22px] border border-ink/10 bg-linen p-5 md:p-7 shadow-soft">
              <h2 className="font-serif text-3xl text-ink leading-tight">FAQ</h2>
              <div className="mt-4 space-y-4">
                {post.faq.map((item) => (
                  <article
                    key={item.q}
                    className="rounded-xl border border-ink/10 bg-ivory p-4 md:p-5"
                  >
                    <h3 className="font-serif text-2xl text-ink">{item.q}</h3>
                    <p className="mt-2 text-ink/70 leading-relaxed">{item.a}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[22px] border border-ink/10 bg-linen p-5 md:p-7 shadow-soft">
              <h2 className="font-serif text-3xl text-ink leading-tight">
                Continue reading
              </h2>
              <ul className="mt-4 space-y-3 list-none p-0 m-0">
                {relatedPosts.map((related) => (
                  <li key={related.slug}>
                    <Link
                      href={`/education/${related.slug}`}
                      className="block rounded-xl border border-ink/10 bg-ivory p-4 md:p-5 hover:border-ink/25 hover:shadow-soft transition-all"
                    >
                      <p className="text-[10px] tracking-xl uppercase text-gold-deep">
                        {related.category} · {related.readTime}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl text-ink leading-tight">
                        {related.title}
                      </h3>
                      <p className="mt-2 text-ink/70 text-sm leading-relaxed">
                        {related.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="h-fit rounded-[22px] border border-ink/10 bg-cream p-5 md:p-7 shadow-soft">
            <div className="mb-6 rounded-xl border border-ink/10 bg-ivory p-4">
              <p className="text-[10px] tracking-xl uppercase text-ink/45">In this article</p>
              <ul className="mt-3 space-y-2 list-none p-0 m-0">
                {post.sections.map((s) => (
                  <li key={s.heading} className="text-sm text-ink/70 leading-relaxed">
                    {s.heading}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mb-3">
              <span className="inline-flex items-center rounded-pill border border-ink/15 bg-ivory px-3 py-1.5 text-[10px] tracking-xxl uppercase text-gold-deep">
                Next step
              </span>
            </p>
            <h2 className="font-serif text-3xl text-ink leading-tight">
              Turn education into a personalized plan.
            </h2>
            <p className="mt-4 text-ink/70 leading-relaxed">
              Book a consultation and get a treatment roadmap based on your
              skin goals, barrier condition, and lifestyle.
            </p>
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 inline-flex"
            >
              Book consultation
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <div className="mt-6 pt-5 border-t border-ink/10">
              <Link
                href="/education"
                className="text-[10px] tracking-xl uppercase text-gold-deep border-b border-gold-deep/35 hover:border-gold-deep"
              >
                Back to journal
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}
