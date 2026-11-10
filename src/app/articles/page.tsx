import type { Metadata } from "next";
import { Suspense } from "react";
import { ArticleBrowser, ArticleView } from "@/components/articles/ArticleBrowser";
import { Section } from "@/components/ui/Section";
import { FEEDS } from "@/data/feeds";
import { site } from "@/data/site";
import { getArticles } from "@/lib/feeds";

// 3시간마다 피드를 다시 읽어 페이지를 재생성한다(ISR).
// 값은 정적 분석되어야 하므로 리터럴로 둔다.
export const revalidate = 10800;

const description = `제가 챙겨 보는 기술 블로그 ${FEEDS.length}곳의 새 글을 분야별로 모았습니다.`;

export const metadata: Metadata = {
  title: "Articles",
  description,
  alternates: { canonical: "/articles" },
  openGraph: {
    title: `Articles · ${site.shortName}`,
    description,
    url: `${site.url}/articles`,
  },
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <Section className="max-w-3xl pt-10 sm:pt-14">
      <header className="mb-10 flex flex-col items-center text-center">
        <span className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Reading list
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Articles
        </h1>
        <p className="mt-3 max-w-xl text-sm text-[var(--color-muted)] sm:text-base">
          {description}
        </p>
      </header>

      <Suspense fallback={<ArticleView articles={articles} filter="all" />}>
        <ArticleBrowser articles={articles} />
      </Suspense>
    </Section>
  );
}
