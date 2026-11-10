// 도구 화면 공통 클래스. JwtDecoder.tsx의 card·smallButton과 같은 값이다.
export const card =
  "rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5";

export const smallButton =
  "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] disabled:pointer-events-none disabled:opacity-50";

export const textField =
  "block w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] font-mono text-sm text-[var(--color-fg)] placeholder:text-[var(--color-subtle)] focus:border-[var(--color-accent)]/60 focus:outline-none";
