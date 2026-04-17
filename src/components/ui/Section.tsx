import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-20 sm:px-8 sm:py-28",
        className,
      )}
    >
      {(eyebrow || title || description) && (
        <header className="mb-12 flex flex-col items-center text-center">
          {eyebrow && (
            <span className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-3 max-w-xl text-sm text-[var(--color-muted)] sm:text-base">
              {description}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
