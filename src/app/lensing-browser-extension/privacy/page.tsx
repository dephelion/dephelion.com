import type { Metadata } from 'next';
import Link from 'next/link';
import DocPage from '@/components/DocPage';
import { LENSING_NAME, LENSING_PATH, LENSING_POLICY_DATE } from '@/lib/lensing';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { SITE_NAME } from '@/lib/site';

const TITLE = `${LENSING_NAME} privacy policy`;
const DESCRIPTION =
  'What Lensing reads, what it stores on your device, and the single network request it makes. No accounts, no analytics, no data collection.';

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: `${LENSING_PATH}privacy/`,
});

const breadcrumbs = breadcrumbLd([
  { name: SITE_NAME, path: '/' },
  { name: LENSING_NAME, path: LENSING_PATH },
  { name: 'Privacy policy', path: `${LENSING_PATH}privacy/` },
]);

export default function LensingPrivacyPage() {
  return (
    <DocPage
      breadcrumbs={breadcrumbs}
      title="Privacy policy"
      updated={LENSING_POLICY_DATE}
      intro="Lensing blurs posts in your social feed that are not about topics you chose. It does this on your own device. This policy describes everything it reads, stores and sends."
    >
      <h2>Short version</h2>
      <p>
        Lensing does not collect your data. Nothing you read, type or rate is sent to us or to
        anyone else. There are no accounts, no analytics, no trackers and no advertising. We cannot
        see what you read, what your topics are, or that you use Lensing at all.
      </p>

      <h2>What Lensing reads</h2>
      <p>
        On x.com, twitter.com, linkedin.com and reddit.com, Lensing reads the text of posts in the
        page so it can compare them against your topics. That comparison happens inside your
        browser.
      </p>
      <p>
        Post text is held in memory for as long as it takes to score it, then discarded. It is never
        written to disk, never sent over the network and never written to a log. Lensing reads no
        other page; on every other website it does nothing.
      </p>

      <h2>What Lensing stores on your device</h2>
      <p>
        Kept in your browser&rsquo;s local extension storage. It stays on your device, is not synced
        to your other devices, and is never transmitted.
      </p>
      <ul>
        <li>
          <strong>Your settings.</strong> Topics, strictness, and the toggles in the popup.
        </li>
        <li>
          <strong>Thumb ratings.</strong> Only if you turn on &ldquo;Learn from my thumbs&rdquo;,
          which is off unless you turn it on.
        </li>
      </ul>
      <p>
        When that option is on and you rate a post, Lensing stores a list of numbers describing that
        post&rsquo;s meaning (an <em>embedding</em>), a one-way hash of its text, and whether you
        rated it up or down. It does not store the post itself. We would rather be precise than
        reassuring: an embedding is derived from the post&rsquo;s content, and research has shown
        embeddings can be partially reversed toward the original text. Treat it as a compact, lossy
        trace of a post you rated, not as an anonymous number. It never leaves your device, at most
        50 up-ratings and 50 down-ratings are kept per topic line, and the oldest fall off first.
      </p>

      <h2>What Lensing sends</h2>
      <p>
        <strong>One kind of network request exists: downloading the language model.</strong> The
        first time Lensing needs to score a feed it downloads the model that does the comparison,
        about 30 MB, from the Hugging Face CDN at huggingface.co. Your browser caches it, and later
        sessions use the cached copy.
      </p>
      <p>
        Be aware of what that implies: like any file download, it tells Hugging Face&rsquo;s servers
        your IP address and that a file was requested. It carries none of your topics, none of your
        feed, and no identifier for you or for Lensing. Their handling of it is governed by their
        own privacy policy. This is the only time Lensing contacts any server, and it never contacts
        one of ours — we operate none.
      </p>

      <h2>Permissions, and why each is needed</h2>
      <ul>
        <li>
          <strong>Access to x.com, twitter.com, linkedin.com and reddit.com.</strong> To read post
          text in the page and apply the blur. These are the only sites Lensing runs on.
        </li>
        <li>
          <strong>Storage.</strong> To keep your settings and, if you turn it on, your thumb ratings
          on your device.
        </li>
      </ul>
      <p>
        Lensing requests no other permission. It cannot see your browsing history, your other tabs,
        your bookmarks, your passwords or your identity.
      </p>

      <h2>Deleting your data</h2>
      <ul>
        <li>
          <strong>Clear tuning</strong>, under Advanced in the popup, deletes every thumb rating.
        </li>
        <li>
          <strong>Reset</strong>, under Advanced, deletes every thumb rating and restores the
          default settings.
        </li>
        <li>
          <strong>Uninstalling Lensing</strong> deletes everything it stored, including your topics.
        </li>
      </ul>
      <p>
        You do not need to contact us to delete anything, and there is nothing held elsewhere for us
        to delete.
      </p>

      <h2>Children</h2>
      <p>Lensing is not directed at children and collects no data from anyone.</p>

      <h2>Changes</h2>
      <p>
        If this policy changes, the effective date above changes with it, and a material change will
        be noted in the extension&rsquo;s store listing. Questions, or anything here that does not
        match what you observe: <Link href="/lensing-browser-extension/contact/">get in touch</Link>
        .
      </p>
    </DocPage>
  );
}
