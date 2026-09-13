import type { Metadata } from 'next';
import Link from 'next/link';
import ContactButton from '@/components/ContactButton';
import DocPage from '@/components/DocPage';
import { LENSING_NAME, LENSING_PATH } from '@/lib/lensing';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { SITE_NAME } from '@/lib/site';

const TITLE = `${LENSING_NAME} contact and support`;
const DESCRIPTION =
  'How to report a bug in Lensing, suggest a feature, or tell us about a feed it does not work on.';

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: `${LENSING_PATH}contact/`,
});

const breadcrumbs = breadcrumbLd([
  { name: SITE_NAME, path: '/' },
  { name: LENSING_NAME, path: LENSING_PATH },
  { name: 'Contact and support', path: `${LENSING_PATH}contact/` },
]);

export default function LensingContactPage() {
  return (
    <DocPage
      breadcrumbs={breadcrumbs}
      title="Contact and support"
      intro="One person reads this inbox, and replies. There is no ticket system and no bot."
    >
      <h2>Worth writing about</h2>
      <ul>
        <li>
          <strong>A feed it does not work on.</strong> The most useful message you can send. These
          sites change their markup without warning, and when they do Lensing stops finding posts —
          silently, and invisibly to us. Tell us the site and what you saw.
        </li>
        <li>
          <strong>Anything broken.</strong> A popup that will not load, an engine stuck on
          &ldquo;Downloading&rdquo;, a page that slows to a crawl.
        </li>
        <li>
          <strong>Ideas.</strong> Including sites you wish it covered.
        </li>
      </ul>

      <h2>Less useful</h2>
      <p>
        A single post blurred that you wanted, or shown that you did not, is usually Lensing working
        as designed rather than a bug — it is a statistical guess, and it will be wrong sometimes.
        Turn on thumbs in the popup and rate the post: that teaches it what you meant, on your
        device, immediately. Write to us if it is consistently wrong about a whole topic, which is a
        different problem.
      </p>

      <h2>What to include</h2>
      <p>
        Your browser and version, the site, and what the engine status in the popup said at the time
        — it is in the header, next to the name. Never send us your topics or anything from your
        feed; we do not want them and cannot use them.
      </p>

      <h2>Write to us</h2>
      <p className="doc-action">
        <ContactButton inbox="lensing" label="Show email" />
      </p>

      <p className="doc-note">
        See also the <Link href="/lensing-browser-extension/privacy/">privacy policy</Link> and the{' '}
        <Link href="/lensing-browser-extension/terms/">terms of use</Link>.
      </p>
    </DocPage>
  );
}
