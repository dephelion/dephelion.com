import Link from 'next/link';

/**
 * Shell for the long-form pages. The site body is `overflow: hidden` — one fixed
 * viewport behind the WebGL scene — so a document has to bring its own scroll
 * container rather than scrolling the page. Padding clears the fixed GitHub
 * button above and the fixed footer below.
 */
export default function DocPage({
  title,
  intro,
  updated,
  breadcrumbs,
  children,
}: {
  title: string;
  intro?: string;
  updated?: string;
  /** BreadcrumbList JSON-LD; nested pages should always pass one. */
  breadcrumbs?: object;
  children: React.ReactNode;
}) {
  return (
    <main className="doc">
      {breadcrumbs ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />
      ) : null}
      <article className="doc-card">
        <Link className="doc-back" href="/lensing-browser-extension/">
          &larr; Lensing
        </Link>
        <h1>{title}</h1>
        {updated ? <p className="doc-updated">Effective {updated}</p> : null}
        {intro ? <p className="doc-intro">{intro}</p> : null}
        {children}
      </article>
    </main>
  );
}
