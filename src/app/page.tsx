import ContactButton from '@/components/ContactButton';
import { FOUNDER_NAME, FOUNDER_URL, SITE_ABOUT, SITE_NAME, SITE_TAGLINE } from '@/lib/site';

const [aboutBefore, aboutAfter] = SITE_ABOUT.split(FOUNDER_NAME);

export default function HomePage() {
  return (
    <main className="hero">
      <h1>{SITE_NAME}</h1>
      <p className="tagline">{SITE_TAGLINE}</p>
      <p className="about">
        {aboutBefore}
        <a href={FOUNDER_URL} target="_blank" rel="noopener noreferrer">
          {FOUNDER_NAME}
        </a>
        {aboutAfter}
      </p>
      <ContactButton />
    </main>
  );
}
