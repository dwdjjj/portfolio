"use client";

import Image from "next/image";
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
          aria-label={`${site.shortName} — Frontend Developer`}
          className="inline-flex items-center gap-2 text-[var(--color-fg)]"
        >
          <Image
            src="/images/logo/kyj_18.png"
            alt={site.shortName}
            width={64}
            height={32}
            priority
            className="h-6 w-auto object-contain dark:invert"
          />
          <span className="text-[var(--color-muted)]">·</span>
          <span className="text-xs font-normal text-[var(--color-muted)]">
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
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
