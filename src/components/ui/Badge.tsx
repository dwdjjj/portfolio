import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variants = {
    default:
      "bg-[var(--color-bg-elevated)] text-[var(--color-fg)] border border-[var(--color-border)]",
    accent:
      "bg-[var(--color-accent-soft)] text-[var(--color-accent)] border border-transparent",
    outline:
      "bg-transparent text-[var(--color-muted)] border border-[var(--color-border)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
