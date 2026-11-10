import { XMLParser } from "fast-xml-parser";
import {
  CATEGORY_RULES,
  FEED_TIMEOUT_MS,
  FEEDS,
  PER_FEED_LIMIT,
  TOTAL_LIMIT,
  type CategoryId,
  type Feed,
} from "@/data/feeds";

export type Article = {
  title: string;
  link: string;
  summary: string;
  source: string;
  category?: CategoryId;
  /** ISO 문자열 (정렬용) */
  date: string;
  /** 서버에서 KST로 미리 만든 표시용 날짜 */
  dateLabel: string;
};

const MAX_FEED_BYTES = 5_000_000;
const SUMMARY_LENGTH = 160;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

const dateFormat = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  middot: "·",
};

function decodeEntities(s: string) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code =
        e[1] === "x" || e[1] === "X"
          ? parseInt(e.slice(2), 16)
          : parseInt(e.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code <= 0x10ffff
        ? String.fromCodePoint(code)
        : "";
    }
    return NAMED_ENTITIES[e.toLowerCase()] ?? m;
  });
}

/** 피드 본문 HTML을 화면에 쓸 평문으로 바꾼다. HTML로 렌더하지 않는다. */
function toPlainText(html: string) {
  const text = html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]*>/g, " ");
  return decodeEntities(text).replace(/\s+/g, " ").trim();
}

function truncate(s: string, max: number) {
  return s.length > max ? `${s.slice(0, max).trimEnd()}…` : s;
}

/** 파서 결과는 문자열·숫자·{ "#text" }·배열 중 하나라서 문자열로 모은다. */
function textOf(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return textOf(value[0]);
  if (value && typeof value === "object" && "#text" in value) {
    return textOf((value as { "#text": unknown })["#text"]);
  }
  return "";
}

/** RSS는 <link>텍스트</link>, Atom은 <link rel="alternate" href="…"/> */
function linkOf(value: unknown): string {
  if (typeof value === "string") return value;
  const links = Array.isArray(value) ? value : [value];
  for (const l of links) {
    if (typeof l === "string") return l;
    if (l && typeof l === "object") {
      const rel = (l as Record<string, unknown>)["@_rel"];
      const href = (l as Record<string, unknown>)["@_href"];
      if (typeof href === "string" && (!rel || rel === "alternate")) {
        return href;
      }
    }
  }
  return "";
}

/** http(s) 절대 주소만 통과시킨다. */
function safeUrl(raw: string, base: string): string | null {
  try {
    const url = new URL(raw.trim(), base);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function categorize(title: string, fallback?: CategoryId) {
  return CATEGORY_RULES.find((r) => r.pattern.test(title))?.category ?? fallback;
}

function toArticles(feed: Feed, xml: string): Article[] {
  const doc = parser.parse(xml) as {
    rss?: { channel?: { item?: unknown } };
    feed?: { entry?: unknown };
  };
  const raw = doc.rss?.channel?.item ?? doc.feed?.entry ?? [];
  const items = (Array.isArray(raw) ? raw : [raw]) as Record<string, unknown>[];

  const articles: Article[] = [];
  for (const item of items) {
    const title = toPlainText(textOf(item.title));
    const link = safeUrl(linkOf(item.link), feed.url);
    const time = Date.parse(
      textOf(item.pubDate ?? item.published ?? item.updated ?? item["dc:date"]),
    );
    if (!title || !link || Number.isNaN(time)) continue;
    if (feed.linkFilter && !feed.linkFilter.test(link)) continue;

    const summary = toPlainText(
      textOf(
        item.description ??
          item.summary ??
          item["content:encoded"] ??
          item.content,
      ),
    );
    const date = new Date(time);
    articles.push({
      title,
      link,
      // 요약이 제목만 반복하면 숨긴다.
      summary: summary === title ? "" : truncate(summary, SUMMARY_LENGTH),
      source: feed.name,
      category: categorize(title, feed.category),
      date: date.toISOString(),
      dateLabel: dateFormat.format(date).replace(/\.\s?/g, ".").replace(/\.$/, ""),
    });
  }
  return articles
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, PER_FEED_LIMIT);
}

async function fetchFeed(feed: Feed): Promise<Article[]> {
  const res = await fetch(feed.url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; portfolio-articles/1.0)",
      Accept:
        "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9",
    },
    signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();
  if (xml.length > MAX_FEED_BYTES) throw new Error("feed too large");
  return toArticles(feed, xml);
}

/** 모든 피드를 동시에 읽는다. 실패한 피드는 빼고 나머지로 최신순 목록을 만든다. */
export async function getArticles(): Promise<Article[]> {
  const results = await Promise.allSettled(FEEDS.map(fetchFeed));

  const seen = new Set<string>();
  const articles: Article[] = [];
  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.warn(`[articles] ${FEEDS[i].name} 피드 실패:`, String(result.reason));
      return;
    }
    for (const a of result.value) {
      if (seen.has(a.link)) continue;
      seen.add(a.link);
      articles.push(a);
    }
  });

  return articles
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, TOTAL_LIMIT);
}
