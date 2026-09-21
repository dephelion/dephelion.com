import { readFileSync } from 'fs';
import { SITE_TITLE, SITE_URL } from './site';
import { decodeEmail, decodeUfeedEmail } from './contact';
import { UFEED_STORE_URL, UFEED_URL } from './ufeed';

describe('site constants', () => {
  it('exposes an https canonical URL with no trailing slash', () => {
    expect(SITE_URL).toMatch(/^https:\/\//);
    expect(SITE_URL.endsWith('/')).toBe(false);
  });

  it('builds a title that leads with the brand name', () => {
    expect(SITE_TITLE.startsWith('Dephelion')).toBe(true);
  });
});

describe('contact address obfuscation', () => {
  // Split so this file carries no contiguous address for a harvester either.
  const expected = 'hello' + '@' + 'dephelion' + '.com';

  it('decodes to the contact address at runtime', () => {
    expect(decodeEmail()).toBe(expected);
  });

  it('never stores the address as a scrapeable literal in the source', () => {
    const source = readFileSync(require.resolve('./contact.ts'), 'utf8');
    expect(source).not.toMatch(new RegExp(expected.replace('.', '\\.')));
    expect(source).not.toMatch(/@dephelion/);
  });
});

describe('ufeed constants', () => {
  it('builds the product URL under the canonical site URL', () => {
    expect(UFEED_URL).toBe(`${SITE_URL}/ufeed-browser-extension/`);
  });

  it('keeps the store link empty until the listing is live, so no dead CTA ships', () => {
    expect(UFEED_STORE_URL === '' || UFEED_STORE_URL.startsWith('https://')).toBe(true);
  });
});

describe('ufeed address obfuscation', () => {
  // Split so this file carries no contiguous address for a harvester either.
  const expected = 'contact' + '@' + 'dephelion' + '.com';

  it('decodes to the product address at runtime', () => {
    expect(decodeUfeedEmail()).toBe(expected);
  });

  it('is a different inbox from the company one', () => {
    expect(decodeUfeedEmail()).not.toBe(decodeEmail());
  });

  it('never stores the address as a scrapeable literal in the source', () => {
    const source = readFileSync(require.resolve('./contact.ts'), 'utf8');
    expect(source).not.toMatch(new RegExp(expected.replace('.', '\\.')));
  });
});
