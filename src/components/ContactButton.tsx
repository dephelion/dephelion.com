'use client';

import { useCallback, useRef, useState } from 'react';
import { decodeEmail, decodeLensingEmail } from '@/lib/contact';

type CopyState = 'idle' | 'copied' | 'error';

/**
 * Which inbox, as a string rather than a function: this is a client component and
 * a server page cannot hand it a callback.
 */
export type Inbox = 'company' | 'lensing';

export default function ContactButton({
  inbox = 'company',
  label = 'Contact',
}: {
  inbox?: Inbox;
  label?: string;
} = {}) {
  const [open, setOpen] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const emailRef = useRef<HTMLSpanElement>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();

  // Assembled only once the visitor asks for it, never during prerender.
  const email = open ? (inbox === 'lensing' ? decodeLensingEmail() : decodeEmail()) : '';

  const copy = useCallback(async () => {
    const flash = (state: CopyState) => {
      setCopyState(state);
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopyState('idle'), 2000);
    };

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else if (!legacyCopy(email)) {
        throw new Error('copy rejected');
      }
      flash('copied');
    } catch {
      selectText(emailRef.current);
      flash('error');
    }
  }, [email]);

  if (!open) {
    return (
      <button type="button" className="cta" aria-expanded={false} onClick={() => setOpen(true)}>
        {label}
      </button>
    );
  }

  return (
    <div className="contact-reveal" role="group" aria-label="Contact email">
      <a className="contact-email" href={`mailto:${email}`}>
        <span ref={emailRef}>{email}</span>
      </a>
      <button
        type="button"
        className="contact-copy"
        onClick={copy}
        aria-label="Copy email address to clipboard"
      >
        {copyState === 'copied' ? 'Copied' : copyState === 'error' ? 'Select & copy' : 'Copy'}
      </button>
    </div>
  );
}

function legacyCopy(text: string): boolean {
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'fixed';
  el.style.opacity = '0';
  document.body.appendChild(el);
  el.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  document.body.removeChild(el);
  return ok;
}

function selectText(node: HTMLElement | null) {
  const selection = node && window.getSelection();
  if (!selection) return;
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
}
