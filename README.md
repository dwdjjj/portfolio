# 권영재 · Portfolio

프론트엔드 개발자 권영재의 개인 포트폴리오 사이트입니다.

## Stack

- Next.js 16 (App Router) · TypeScript · React 19
- Tailwind CSS v4
- Framer Motion · next-themes · lucide-react
- Vercel 배포

## Develop

```bash
npm run dev
# http://localhost:3000
```

## Build

```bash
npm run build && npm start
```

## Structure

```
src/
├── app/                 # 라우트 (page, layout, sitemap, robots)
│   └── projects/[slug]  # 프로젝트 상세
├── components/
│   ├── layout/          # Nav, Footer, ThemeToggle
│   ├── providers/       # ThemeProvider
│   ├── sections/        # Hero, Experience, Projects ...
│   └── ui/              # Section, Badge, Reveal
├── data/                # 콘텐츠 데이터 (experience, projects, skills, ...)
└── lib/                 # cn (clsx + tailwind-merge)
```

## Deploy

Push to `main` → Vercel가 자동으로 빌드/배포.
