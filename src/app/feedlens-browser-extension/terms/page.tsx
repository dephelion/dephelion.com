import type { Metadata } from 'next';
import Link from 'next/link';
import DocPage from '@/components/DocPage';
import { FEEDLENS_NAME, FEEDLENS_PATH, FEEDLENS_POLICY_DATE } from '@/lib/feedlens';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { SITE_NAME } from '@/lib/site';

const TITLE = `${FEEDLENS_NAME} terms of use`;
const DESCRIPTION =
  'The terms you accept by installing and using the FeedLens browser extension: licence, no warranty, limits of liability, and your relationship with the sites it runs on.';

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: `${FEEDLENS_PATH}terms/`,
});

const breadcrumbs = breadcrumbLd([
  { name: SITE_NAME, path: '/' },
  { name: FEEDLENS_NAME, path: FEEDLENS_PATH },
  { name: 'Terms of use', path: `${FEEDLENS_PATH}terms/` },
]);

export default function FeedLensTermsPage() {
  return (
    <DocPage
      breadcrumbs={breadcrumbs}
      title="Terms of use"
      updated={FEEDLENS_POLICY_DATE}
      intro={`These terms cover the ${FEEDLENS_NAME} browser extension, published by ${SITE_NAME}. Installing or using it means accepting them. If you do not, uninstall it — that is the whole of the arrangement between us.`}
    >
      <h2>What you may do</h2>
      <p>
        FeedLens is free to use, for personal or commercial purposes, on as many of your own devices
        as you like. You may not resell it, republish it as your own, or redistribute modified
        copies. It is not open source; you get a licence to use it, not to the source code behind
        it.
      </p>

      <h2>No warranty</h2>
      <p>
        FeedLens is provided <strong>as is</strong>, without warranty of any kind, express or
        implied. It decides what to blur with a statistical model, and models are wrong sometimes.
        It will blur things you wanted and let through things you did not. Do not rely on it where
        missing a post would actually matter to you.
      </p>
      <p>
        We do not promise it will be available, that it will keep working after a change to a site
        it runs on, or that any particular version will continue to be published.
      </p>

      <h2>Limits of liability</h2>
      <p>
        To the fullest extent the law allows, {SITE_NAME} is not liable for any indirect or
        consequential loss arising from your use of FeedLens, including anything you missed because
        it was blurred. Nothing here limits liability that cannot lawfully be limited.
      </p>

      <h2>The sites FeedLens runs on</h2>
      <p>
        FeedLens changes how pages on X, LinkedIn and Reddit appear in your own browser. It is not
        affiliated with, endorsed by, or connected to any of them, and their names are their
        owners&rsquo; trademarks.
      </p>
      <p>
        Your use of those services stays governed by their own terms. You are responsible for your
        compliance with them, and a site may change at any time in ways that stop FeedLens working.
      </p>

      <h2>Your data</h2>
      <p>
        FeedLens keeps what it stores on your device and sends us nothing. The{' '}
        <Link href="/feedlens-browser-extension/privacy/">privacy policy</Link> is the detail, and
        it is part of these terms.
      </p>

      <h2>Changes</h2>
      <p>
        These terms may change; the effective date above changes with them. Continuing to use
        FeedLens after a change means accepting the new version.
      </p>

      <h2>Contact</h2>
      <p>
        Anything unclear here is worth asking about:{' '}
        <Link href="/feedlens-browser-extension/contact/">get in touch</Link>.
      </p>
    </DocPage>
  );
}
