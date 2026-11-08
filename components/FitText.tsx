import React, { useCallback, useLayoutEffect, useRef } from 'react';

// Keeps an English word whole. The old `break-words` class let the browser cut a long word in the
// middle (e.g. "refriger/ator") once the big fluid font no longer fitted a narrow box. English only
// breaks between words, so instead of breaking, this shrinks the font until the longest word fits.
// Text with several words still wraps normally at the spaces.
//
// `size` is a CSS length, usually one of the fluid tokens from index.html (e.g. 'var(--fit-word)').
// The font size is set inline, so do not also put a font-size class on the same element.

type Tag = 'div' | 'p' | 'span';

interface Props {
  as?: Tag;
  size: string;
  className?: string;
  minScale?: number;
  children: React.ReactNode;
}

const STEP = 0.05;

const FitText: React.FC<Props> = ({ as: Tag = 'div', size, className = '', minScale = 0.3, children }) => {
  const ref = useRef<HTMLElement | null>(null);

  const fit = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    let scale = 1;
    el.style.fontSize = `calc(${size} * 1)`;
    // overflow-wrap is "normal", so a word wider than the box overflows (scrollWidth) instead of splitting.
    while (scale > minScale && el.scrollWidth > el.clientWidth + 1) {
      scale = Math.max(minScale, Math.round((scale - STEP) * 100) / 100);
      el.style.fontSize = `calc(${size} * ${scale})`;
    }
  }, [size, minScale]);

  // Re-fit after every render: the word (children) changes between questions. The extra passes
  // catch late layout changes that no resize event reports (the Tailwind CDN stylesheet and web
  // fonts arriving after the first paint change the width of the text).
  useLayoutEffect(() => {
    fit();
    const raf = requestAnimationFrame(fit);
    const timers = [setTimeout(fit, 150), setTimeout(fit, 600)];
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  });

  useLayoutEffect(() => {
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (!fonts) return;
    let alive = true;
    const refit = () => {
      if (alive) fit();
    };
    fonts.ready.then(refit).catch(() => {});
    fonts.addEventListener?.('loadingdone', refit);
    return () => {
      alive = false;
      fonts.removeEventListener?.('loadingdone', refit);
    };
  }, [fit]);

  // Re-fit when the available width changes (rotation, window resize). The parent is observed
  // because this element's own width can depend on its font size.
  useLayoutEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent || typeof ResizeObserver === 'undefined') return;
    let lastWidth = parent.clientWidth;
    const observer = new ResizeObserver(() => {
      if (Math.abs(parent.clientWidth - lastWidth) > 1) {
        lastWidth = parent.clientWidth;
        fit();
      }
    });
    observer.observe(parent);
    return () => observer.disconnect();
  }, [fit]);

  return React.createElement(
    Tag,
    {
      ref,
      className,
      style: { fontSize: `calc(${size} * 1)`, overflowWrap: 'normal', wordBreak: 'normal', hyphens: 'manual' },
    },
    children
  );
};

export default FitText;
