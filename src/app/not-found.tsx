import Link from 'next/link';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <main className="hero">
      <h1>404</h1>
      <p className="tagline">Beyond the event horizon</p>
      <p className="about">That page has fallen past the edge. Nothing to see here.</p>
      <Link className="cta" href="/">
        Back to Dephelion
      </Link>
    </main>
  );
}
