'use client';

import { useEffect, useState } from 'react';
import { FOUNDER_NAME } from '@/lib/site';

export default function Footer() {
  // Set on the client so the static HTML never ships a stale year.
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer>
      <p>{year === null ? `© ${FOUNDER_NAME}` : `© ${FOUNDER_NAME} - ${year}`}</p>
    </footer>
  );
}
