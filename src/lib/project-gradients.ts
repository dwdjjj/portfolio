export const PROJECT_GRADIENTS: readonly string[] = [
  "from-sky-500 via-indigo-500 to-violet-600",
  "from-teal-400 via-emerald-500 to-cyan-600",
  "from-amber-400 via-orange-500 to-rose-600",
  "from-fuchsia-500 via-pink-500 to-rose-500",
  "from-blue-500 via-cyan-500 to-teal-500",
  "from-violet-500 via-purple-500 to-fuchsia-600",
] as const;

export function gradientFor(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return PROJECT_GRADIENTS[hash % PROJECT_GRADIENTS.length];
}
