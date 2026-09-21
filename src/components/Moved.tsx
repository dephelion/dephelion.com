import type { Metadata } from 'next';
import Link from 'next/link';

/** Kept out of search results; the page it points to is the one to index. */
export const movedMetadata: Metadata = { robots: { index: false } };

/**
 * A static stand-in for a server redirect, which GitHub Pages cannot do: the
 * meta refresh moves the browser on, the link covers the rest.
 */
export default function Moved({ to }: { to: string }) {
  return (
    <main className="hero">
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <p className="about">
        This page has moved to <Link href={to}>{to}</Link>.
      </p>
    </main>
  );
}
