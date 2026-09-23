import type { Metadata } from 'next';
import Link from 'next/link';
import DocPage from '@/components/DocPage';
import { UFEED_NAME, UFEED_PATH, UFEED_PRIVACY_DATE } from '@/lib/ufeed';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { SITE_NAME } from '@/lib/site';

const TITLE = `${UFEED_NAME} privacy policy`;
const DESCRIPTION =
  'What uFeed reads, what it stores on your device, and the single network request it makes. No accounts, no analytics, no data collection.';

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: `${UFEED_PATH}privacy/`,
});

const breadcrumbs = breadcrumbLd([
  { name: SITE_NAME, path: '/' },
  { name: UFEED_NAME, path: UFEED_PATH },
  { name: 'Privacy policy', path: `${UFEED_PATH}privacy/` },
]);

export default function UFeedPrivacyPage() {
  return (
    <DocPage
      breadcrumbs={breadcrumbs}
      title="Privacy policy"
      updated={UFEED_PRIVACY_DATE}
      intro="uFeed blurs posts in your social feed that are not about topics you chose. It does this on your own device. This policy describes everything it reads, stores and sends."
    >
      <h2>Short version</h2>
      <p>
        uFeed does not collect your data. Nothing you read, type or rate is sent to us or to anyone
        else. There are no accounts, no analytics, no trackers and no advertising. We cannot see
        what you read, what your topics are, or that you use uFeed at all.
      </p>

      <h2>What uFeed reads</h2>
      <p>
        On x.com, twitter.com, linkedin.com and reddit.com, uFeed reads the text of posts in the
        page so it can compare them against your topics. That comparison happens inside your
        browser.
      </p>
      <p>
        Post text is held in memory for as long as it takes to score it, then discarded. It is never
        written to disk, never sent over the network and never written to a log. uFeed reads no
        other page; on every other website it does nothing.
      </p>

      <h2>What uFeed stores on your device</h2>
      <p>
        Kept in your browser&rsquo;s local extension storage. uFeed never syncs it to your other
        devices and never transmits it. You can copy it to another device yourself, with Export
        below.
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
        When that option is on and you rate a post, uFeed stores a list of numbers describing that
        post&rsquo;s meaning (an <em>embedding</em>), a one-way hash of its text, and whether you
        rated it up or down. It does not store the post itself. We would rather be precise than
        reassuring: an embedding is derived from the post&rsquo;s content, and research has shown
        embeddings can be partially reversed toward the original text. Treat it as a compact, lossy
        trace of a post you rated, not as an anonymous number. It never leaves your device, at most
        50 up-ratings and 50 down-ratings are kept per topic line, and the oldest fall off first.
      </p>
      <p>
        <strong>Exporting and importing.</strong> The Backup row in the popup writes your settings
        and your thumb ratings to a file you choose, and reads one back on another device. That file
        holds the same embeddings described above, so treat it as personal: anyone who opens it sees
        your topics and holds a lossy trace of the posts you rated. uFeed writes it only when you
        click Export &mdash; there is no automatic backup, no schedule, and nowhere for it to go but
        the disk you save it to. Importing a file replaces the settings and ratings already stored.
      </p>

      <h2>What uFeed sends</h2>
      <p>
        <strong>One kind of network request exists: downloading the language model.</strong> The
        first time uFeed needs to score a feed it downloads the model that does the comparison,
        about 30 MB, from Hugging Face at huggingface.co, which redirects the larger files to its
        storage CDN at hf.co. Your browser caches it, and later sessions use the cached copy.
      </p>
      <p>
        Be aware of what that implies: like any file download, it tells Hugging Face&rsquo;s servers
        your IP address and that a file was requested. It carries none of your topics, none of your
        feed, and no identifier for you or for uFeed. Their handling of it is governed by their own
        privacy policy. This is the only time uFeed contacts any server, and it never contacts one
        of ours — we operate none.
      </p>

      <h2>Permissions, and why each is needed</h2>
      <ul>
        <li>
          <strong>Access to x.com, twitter.com, linkedin.com and reddit.com.</strong> To read post
          text in the page and apply the blur. These are the only sites uFeed runs on.
        </li>
        <li>
          <strong>Storage.</strong> To keep your settings and, if you turn it on, your thumb ratings
          on your device.
        </li>
        <li>
          <strong>Offscreen</strong> (Chrome only). To keep a hidden extension page open for the
          shared multilingual model worker. The page receives post text from uFeed for scoring; it
          cannot read the website itself.
        </li>
      </ul>
      <p>
        The offscreen permission does not give uFeed access to other websites or additional data. It
        does not change what uFeed stores or sends. uFeed cannot see your browsing history, your
        bookmarks, your passwords or your identity.
      </p>

      <h2>Deleting your data</h2>
      <ul>
        <li>
          <strong>Clear tuning</strong>, under &ldquo;Learn from my thumbs&rdquo; in the popup,
          deletes every thumb rating.
        </li>
        <li>
          <strong>Reset</strong>, under &ldquo;Start over&rdquo;, deletes every thumb rating and
          restores the default settings.
        </li>
        <li>
          <strong>Uninstalling uFeed</strong> deletes everything it stored, including your topics.
        </li>
      </ul>
      <p>
        You do not need to contact us to delete anything, and there is nothing held elsewhere for us
        to delete.
      </p>

      <h2>Children</h2>
      <p>uFeed is not directed at children and collects no data from anyone.</p>

      <h2>Changes</h2>
      <p>
        If this policy changes, the effective date above changes with it, and a material change will
        be noted in the extension&rsquo;s store listing. Questions, or anything here that does not
        match what you observe: <Link href="/ufeed-browser-extension/contact/">get in touch</Link>.
      </p>
    </DocPage>
  );
}
