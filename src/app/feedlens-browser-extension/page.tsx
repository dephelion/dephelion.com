import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FEEDLENS_BROWSERS,
  FEEDLENS_DESCRIPTION,
  FEEDLENS_KEYWORDS,
  FEEDLENS_NAME,
  FEEDLENS_PATH,
  FEEDLENS_STORE_URL,
  FEEDLENS_TAGLINE,
  FEEDLENS_URL,
} from '@/lib/feedlens';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: `${FEEDLENS_NAME} — ${FEEDLENS_TAGLINE}`,
  description: FEEDLENS_DESCRIPTION,
  path: FEEDLENS_PATH,
  keywords: FEEDLENS_KEYWORDS,
});

const appLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: FEEDLENS_NAME,
  url: FEEDLENS_URL,
  applicationCategory: 'BrowserApplication',
  operatingSystem: 'Chrome',
  description: FEEDLENS_DESCRIPTION,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
};

export default function FeedLensPage() {
  return (
    <main className="doc">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            appLd,
            breadcrumbLd([
              { name: SITE_NAME, path: '/' },
              { name: FEEDLENS_NAME, path: FEEDLENS_PATH },
            ]),
          ]),
        }}
      />
      <article className="doc-card">
        <Link className="doc-back" href="/">
          &larr; {SITE_NAME}
        </Link>
        <h1>{FEEDLENS_NAME}</h1>
        <p className="doc-lead">{FEEDLENS_TAGLINE}</p>

        <p className="doc-intro">
          <strong>FeedLens is a free browser extension powered by local AI.</strong> You tell it
          what you came to read about, and it fades out everything else in your feed — so the posts
          you actually wanted are the ones you notice.
        </p>

        <h2>What it does</h2>
        <p>
          You write a few topics in plain words: <em>football</em>, <em>cooking</em>,{' '}
          <em>my industry</em>. As you scroll, FeedLens quietly blurs the posts that are not about
          them.
        </p>
        <p>
          Nothing is deleted and nothing is taken away. A blurred post is still there, and one click
          brings it back — you have not lost the choice, you have just stopped making it by
          accident. You can change your topics, loosen it, tighten it, or switch it off whenever you
          like.
        </p>

        <h2>Where it works</h2>
        <p>
          On <strong>X (Twitter), LinkedIn and Reddit</strong>, in{' '}
          <strong>{FEEDLENS_BROWSERS}</strong>. It costs nothing, and it does not touch any other
          website you visit.
        </p>

        <h2>It stays on your computer</h2>
        <p>
          Everything happens inside your own browser. There is no sign-up, no account, and no
          company server to send anything to. What you read is never uploaded, never saved and never
          recorded anywhere — we could not see it even if we wanted to.
        </p>
        <p className="doc-note">
          FeedLens downloads one file the first time you use it, about the size of a short podcast,
          so it can understand what posts are about without asking anyone. After that it works
          offline.
        </p>

        <h2>What it cannot do</h2>
        <p>
          It reads words, not pictures — so a photo posted with no caption is a guess. It
          understands English. And it sorts by subject, not by quality: a brilliant post and a dull
          one about the same thing will both stay.
        </p>
        <p>
          It will get some posts wrong. You can give any post a thumbs up or down to teach it what
          you meant, and that stays on your computer too.
        </p>

        <h2>Install</h2>
        {FEEDLENS_STORE_URL ? (
          <p className="doc-action">
            <a className="cta doc-cta" href={FEEDLENS_STORE_URL} rel="noopener noreferrer">
              Add to Chrome
            </a>
          </p>
        ) : (
          <p className="doc-note">
            FeedLens is being reviewed by the Chrome Web Store. The install button will appear here
            as soon as it is approved.
          </p>
        )}

        <h2>Policies</h2>
        <ul className="doc-links">
          <li>
            <Link href="/feedlens-browser-extension/privacy/">Privacy policy</Link>
          </li>
          <li>
            <Link href="/feedlens-browser-extension/terms/">Terms of use</Link>
          </li>
          <li>
            <Link href="/feedlens-browser-extension/contact/">Contact and support</Link>
          </li>
        </ul>
      </article>
    </main>
  );
}
