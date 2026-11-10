"use client";

import { ArrowUpRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { CATEGORIES, type CategoryId } from "@/data/feeds";
import type { Article } from "@/lib/feeds";
import { cn } from "@/lib/cn";

type Filter = CategoryId | "all";

const TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "전체" },
  ...CATEGORIES,
];

const LABELS = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.label]),
) as Record<CategoryId, string>;

function toFilter(value: string | null): Filter {
  return TABS.some((t) => t.id === value) ? (value as Filter) : "all";
}

/** URL의 ?c= 값을 읽어 목록을 거른다. 페이지에서 Suspense로 감싼다. */
export function ArticleBrowser({ articles }: { articles: Article[] }) {
  const filter = toFilter(useSearchParams().get("c"));

  function select(next: Filter) {
    window.history.replaceState(
      null,
      "",
      next === "all" ? window.location.pathname : `?c=${next}`,
    );
  }

  return <ArticleView articles={articles} filter={filter} onSelect={select} />;
}

type ArticleViewProps = {
  articles: Article[];
  filter: Filter;
  onSelect?: (filter: Filter) => void;
};

/** 화면만 그린다. 서버 프리렌더(Suspense fallback)에서도 그대로 쓴다. */
export function ArticleView({ articles, filter, onSelect }: ArticleViewProps) {
  const visible =
    filter === "all" ? articles : articles.filter((a) => a.category === filter);

  return (
    <div>
      <div
        role="group"
        aria-label="카테고리"
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
      >
        {TABS.map((tab) => {
          const count =
            tab.id === "all"
              ? articles.length
              : articles.filter((a) => a.category === tab.id).length;
          const active = tab.id === filter;
          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect?.(tab.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
                active
                  ? "border-transparent bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                  : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-fg)]",
              )}
            >
              {tab.label}
              <span className="text-xs tabular-nums opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-center text-sm text-[var(--color-muted)]">
          이 분야로 분류된 새 글이 아직 없습니다.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {visible.map((a) => (
            <li key={a.link}>
              <a
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--color-muted)]">
                  <span className="font-medium text-[var(--color-fg)]">
                    {a.source}
                  </span>
                  <span aria-hidden>·</span>
                  <time dateTime={a.date} className="tabular-nums">
                    {a.dateLabel}
                  </time>
                  {a.category && (
                    <Badge variant="outline" className="px-2 py-0.5 text-[11px]">
                      {LABELS[a.category]}
                    </Badge>
                  )}
                </div>
                <h2 className="mt-2 flex items-start gap-1.5 text-base font-semibold leading-snug break-keep transition-colors group-hover:text-[var(--color-accent)] sm:text-lg">
                  <span className="min-w-0 break-words">{a.title}</span>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-subtle)] transition-colors group-hover:text-[var(--color-accent)]"
                  />
                  <span className="sr-only">(새 창)</span>
                </h2>
                {a.summary && (
                  <p className="mt-1.5 line-clamp-2 text-sm text-[var(--color-muted)]">
                    {a.summary}
                  </p>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
