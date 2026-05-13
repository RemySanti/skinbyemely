import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { seoPages } from "@/lib/seo-pages";

export default function SeoHubPage() {
  return (
    <SiteShell>
      <section className="section card-stack" aria-labelledby="seo-hub-heading">
        <p className="eyebrow">SEO Landing Page Hub</p>
        <h1 id="seo-hub-heading">Skin by Emely - 50-page local and intent SEO system</h1>
        <article className="card">
          <p>Each page is built with conversion structure: hero, problem framing, treatment solution, trust, process, results, FAQ, and repeated CTA.</p>
        </article>
        <nav className="card" aria-label="SEO landing pages">
          <ul className="journey-list">
            {seoPages.map((page) => (
              <li key={page.slug}>
                <Link href={`/seo/${page.slug}`}>{page.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </SiteShell>
  );
}
