"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}=+*^?#$%&ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type Props = {
  text: string;
  className?: string;
  duration?: number;
  threshold?: number;
};

export function ScrambleText({
  text,
  className,
  duration = 900,
  threshold = 0.3,
}: Props) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number | null>(null);
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const reduceRef = useRef(false);

  const run = useCallback(() => {
    if (reduceRef.current) {
      setDisplay(text);
      return;
    }
    const start = performance.now();
    const step = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const out: string[] = [];
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const settled = (i + 1) / text.length <= progress;
        if (settled || ch === " ") {
          out.push(ch);
        } else {
          out.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
        }
      }
      setDisplay(out.join(""));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(text);
        frameRef.current = null;
      }
    };
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(step);
  }, [text, duration]);

  useEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            run();
            io.disconnect();
            break;
          }
        }
      },
      { threshold },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [run, threshold]);

  return (
    <span
      ref={rootRef}
      className={className}
      onMouseEnter={run}
      onFocus={run}
      aria-label={text}
    >
      {display}
    </span>
  );
}
