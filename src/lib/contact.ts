const LOCAL_PART = [104, 101, 108, 108, 111];
const DOMAIN = [100, 101, 112, 104, 101, 108, 105, 111, 110, 46, 99, 111, 109];

// Assembled with the "@" only at call time, so the address never exists as a
// scrapeable string in the source or the shipped bundle. Call on user intent.
export function decodeEmail(): string {
  return `${String.fromCharCode(...LOCAL_PART)}@${String.fromCharCode(...DOMAIN)}`;
}
