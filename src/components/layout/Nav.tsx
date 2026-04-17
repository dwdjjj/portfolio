"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/cn";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled
          ? "border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg)_85%,transparent)] backdrop-blur"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-[var(--color-fg)]"
        >
          {site.shortName}
          <span className="ml-2 text-[var(--color-muted)]">·</span>
          <span className="ml-2 text-xs font-normal text-[var(--color-muted)]">
            Frontend Developer
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm text-[var(--color-muted)] transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-fg)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {site.availableForWork && (
            <span className="hidden items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-1 text-xs text-[var(--color-muted)] sm:inline-flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              </span>
              Available for work
            </span>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
