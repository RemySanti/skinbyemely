import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { getSeoPage, seoPages } from "@/lib/seo-pages";

type Props = { params: Promise<{ slug: string }> };

const ctaHref = "https://book.squareup.com/appointments/f7dcst2ljp85dq/location/LMVSQK9C6PR4T/services";

export async function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) {
    return { title: "SEO Page Not Found | Skin by Emely" };
  }

  return {
    title: `${page.title} | Skin by Emely`,
    description: `${page.title} - ${page.intent}. Personalized clinical-luxury skincare in Brandon and Tampa Bay.`
  };
}

export default async function SeoLandingPage({ params }: Props) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();

  const faq = [
    `What treatment is best for ${page.title.toLowerCase()}?`,
    "How many sessions are typically recommended?",
    "Do you offer personalized treatment planning?",
    "Can I combine this with a membership for better consistency?"
  ];

  return (
    <SiteShell>
      <article aria-labelledby="seo-page-heading">
        <section className="section card-stack">
          <p className="eyebrow">SEO Landing Page</p>
          <h1 id="seo-page-heading">{page.title}</h1>
          <p><strong>Search intent:</strong> {page.intent}</p>
          <a className="btn-primary" href={ctaHref} target="_blank" rel="noopener noreferrer">
            Book Consultation
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>

        <section className="section card-stack" aria-labelledby="seo-problem">
          <h2 id="seo-problem">Problem framing</h2>
          <article className="card"><p>{page.problem}</p></article>
        </section>

        <section className="section card-stack" aria-labelledby="seo-solution">
          <h2 id="seo-solution">Treatment solution</h2>
          <article className="card">
            <ul className="journey-list">
              {page.solution.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </section>

        <section className="section card-stack" aria-labelledby="seo-why">
          <h2 id="seo-why">Why Skin by Emely</h2>
          <article className="card">
            <p>Skin by Emely blends clinical clarity with emotional trust, delivering personalized treatment pathways for long-term skin confidence.</p>
          </article>
        </section>

        <section className="section card-stack" aria-labelledby="seo-process">
          <h2 id="seo-process">Process breakdown</h2>
          <article className="card">
            <ol className="journey-list">
              <li>Consult and analyze skin patterns and goals.</li>
              <li>Build personalized treatment pathway.</li>
              <li>Support results through follow-up and homecare guidance.</li>
            </ol>
          </article>
        </section>

        <section className="section card-stack" aria-labelledby="seo-results">
          <h2 id="seo-results">Results and proof</h2>
          <article className="card">
            <p>Clients consistently report improved clarity, texture, calmness, and confidence through structured care plans.</p>
          </article>
          <a className="btn-primary" href={ctaHref} target="_blank" rel="noopener noreferrer">
            Book Consultation
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>

        <section className="section card-stack" aria-labelledby="seo-faq">
          <h2 id="seo-faq">FAQ</h2>
          {faq.map((q) => (
            <article className="card" key={q}>
              <h3>{q}</h3>
              <p>Every protocol is customized during consultation based on skin condition, lifestyle, and treatment history.</p>
            </article>
          ))}
        </section>

        <nav className="section card-stack" aria-labelledby="seo-related">
          <h2 id="seo-related">Related internal links</h2>
          <div className="card">
            <ul className="journey-list">
              <li><Link href="/seo/acne-facial-brandon-fl">Acne page</Link></li>
              <li><Link href="/seo/best-facial-for-glow-skin">Glow facial page</Link></li>
              <li><Link href="/memberships">Membership page</Link></li>
              <li><Link href="/results">Results page</Link></li>
              <li>
                <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                  Book consultation
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
          <a className="btn-primary" href={ctaHref} target="_blank" rel="noopener noreferrer">
            Book Consultation
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
      </article>
    </SiteShell>
  );
}
