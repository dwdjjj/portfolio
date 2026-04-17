"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type SlideshowItem = {
  src: string;
  caption?: string;
  alt?: string;
};

type SlideshowProps = {
  items: SlideshowItem[];
  aspectClassName?: string;
};

export function Slideshow({
  items,
  aspectClassName = "aspect-[16/10]",
}: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const total = items.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (total === 0) return null;
  const current = items[index];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
      <div className={`relative w-full ${aspectClassName} bg-black/5 dark:bg-black/30`}>
        {items.map((item, i) => (
          <div
            key={item.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-300 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt ?? item.caption ?? `Slide ${i + 1}`}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-contain"
              priority={i === 0}
              unoptimized={item.src.endsWith(".gif")}
            />
          </div>
        ))}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="이전 이미지"
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 focus-visible:opacity-100 group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="다음 이미지"
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 focus-visible:opacity-100 group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        <div className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium tabular-nums text-white backdrop-blur-sm">
          {index + 1} / {total}
        </div>
      </div>

      {(current.caption || total > 1) && (
        <div className="flex flex-col gap-3 border-t border-[var(--color-border)] p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--color-muted)]">
            {current.caption ?? "\u00A0"}
          </p>
          {total > 1 && (
            <div className="flex flex-wrap gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`${i + 1}번째 이미지로 이동`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-[var(--color-accent)]"
                      : "w-1.5 bg-[var(--color-border)] hover:bg-[var(--color-subtle)]"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
