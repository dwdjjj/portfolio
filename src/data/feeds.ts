// /articles 페이지에 모으는 기술 블로그 피드와 카테고리 규칙.
// 피드를 더하거나 빼려면 FEEDS만, 분류를 바꾸려면 CATEGORY_RULES만 고친다.

export const CATEGORIES = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "ai", label: "AI" },
  { id: "infra", label: "Infra·DevOps" },
  { id: "career", label: "Career·Culture" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export type Feed = {
  name: string;
  url: string;
  /** 제목 키워드가 하나도 맞지 않을 때 쓸 분류. 주제가 섞인 소스는 비워 둔다(전체 탭에만 보임). */
  category?: CategoryId;
  /** 피드에 블로그 외 글이 섞여 있으면 링크로 거른다. */
  linkFilter?: RegExp;
};

export const FEEDS: Feed[] = [
  { name: "토스", url: "https://toss.tech/rss.xml" },
  { name: "우아한형제들", url: "https://techblog.woowahan.com/feed/" },
  { name: "카카오", url: "https://tech.kakao.com/feed/" },
  { name: "네이버 D2", url: "https://d2.naver.com/d2.atom" },
  { name: "LY Corp", url: "https://techblog.lycorp.co.jp/ko/feed/index.xml" },
  { name: "당근", url: "https://medium.com/feed/daangn" },
  { name: "컬리", url: "https://helloworld.kurly.com/rss.xml" },
  { name: "올리브영", url: "https://oliveyoung.tech/rss.xml" },
  { name: "GeekNews", url: "https://news.hada.io/rss/news" },
  { name: "React", url: "https://react.dev/rss.xml", category: "frontend" },
  { name: "web.dev", url: "https://web.dev/feed.xml", category: "frontend" },
  {
    name: "Vercel",
    url: "https://vercel.com/atom",
    category: "frontend",
    linkFilter: /^https:\/\/vercel\.com\/blog\//,
  },
  { name: "OpenAI", url: "https://openai.com/news/rss.xml", category: "ai" },
  { name: "Cloudflare", url: "https://blog.cloudflare.com/rss/", category: "infra" },
];

// 위에서부터 차례로 제목에 맞춰 보고, 처음 맞는 분류를 쓴다.
export const CATEGORY_RULES: { category: CategoryId; pattern: RegExp }[] = [
  {
    category: "ai",
    pattern:
      /\b(ai|s?llms?|gpt|chatgpt|rag|mcp|agents?|agentic|codex|claude|gemini|openai|anthropic|ml|a2a)\b|에이전트|인공지능|머신러닝|딥러닝|생성형|프롬프트|임베딩|파운데이션 모델|클로드/i,
  },
  {
    category: "infra",
    pattern:
      /\b(aws|gcp|azure|kubernetes|k8s|docker|terraform|devops|sre|ci\/cd|cdn|dns|airflow|observability|cloud|kernel|cpu)\b|쿠버네티스|인프라|클라우드|배포|모니터링|관측|장애|네트워크|컨테이너|서버리스/i,
  },
  {
    category: "frontend",
    pattern:
      /\b(frontend|front-end|react|next\.?js|vue|svelte|javascript|typescript|css|html|webview|browser|ui|ux|web platform|baseline|interop|vite|webassembly|ios|android|swift|flutter)\b|프론트엔드|프런트엔드|웹뷰|브라우저|디자인 시스템|컴포넌트|접근성|렌더링/i,
  },
  {
    category: "backend",
    pattern:
      /\b(backend|back-end|server|api|spring|java|kotlin|jvm|jpa|sql|mysql|postgres(ql)?|redis|kafka|msa|grpc|database|db|oidc)\b|백엔드|서버|데이터베이스|트랜잭션|결제|정산|아키텍처|마이크로서비스|대용량|동시성|메시지|인증/i,
  },
  {
    category: "career",
    pattern:
      /\b(career|hiring|culture|retrospective|onboarding|conference|conf|meetup|interview|leadership)\b|커리어|채용|회고|문화|온보딩|컨퍼런스|콘퍼런스|밋업|인터뷰|리더|신입|성장|참관기|일하는 방식|팀|조직/i,
  },
];

/** 피드 하나에서 가져올 최근 글 수 */
export const PER_FEED_LIMIT = 6;
/** 페이지 전체 상한 */
export const TOTAL_LIMIT = 80;
/** 피드 하나를 기다리는 최대 시간(ms). 넘기면 그 피드만 빠진다. */
export const FEED_TIMEOUT_MS = 8000;
