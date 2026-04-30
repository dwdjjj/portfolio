export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "사용자 경험을 최우선으로, 직관적이고 안정적인 UI를 설계합니다.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux",
      "Zustand",
      "TailwindCSS",
      "Vue.js",
      "Chart.js",
      "D3.js",
    ],
  },
  {
    title: "Realtime & Visualization",
    description: "실시간 스트리밍과 시각화 인터페이스 구축에 강점이 있습니다.",
    items: [
      "WebRTC (OpenVidu)",
      "WebSocket",
      "Stomp",
      "Canvas API",
      "Signal",
    ],
  },
  {
    title: "Backend",
    description: "FE 옆에서 직접 API를 설계하고 데이터 흐름을 제어합니다.",
    items: [
      "Node.js",
      "Spring Boot",
      "Django",
      "Celery",
      "Next.js API Routes",
      "Prisma",
    ],
  },
  {
    title: "Mobile",
    description: "네이티브와 웹뷰 양쪽 흐름을 모두 다룹니다.",
    items: [
      "Kotlin",
      "Jetpack Compose",
      "React Native (WebView)",
      "FCM",
    ],
  },
  {
    title: "Database",
    description: "관계형/캐시 레이어를 용도에 맞게 선택하고 운용합니다.",
    items: ["MySQL", "Redis", "SQLite"],
  },
  {
    title: "Security & Infra",
    description: "안전한 통신과 재현 가능한 빌드 환경을 구성합니다.",
    items: ["JWT", "RSA", "Docker", "Webpack"],
  },
  {
    title: "AI & Problem Solving",
    description: "Claude · Codex · Gemini를 개발 워크플로에 통합해 문제 해결 속도를 높입니다.",
    items: ["Claude", "Codex", "ChatGPT", "Gemini", "Prompt Engineering"],
  },
  {
    title: "Tools & Collaboration",
    description: "기획·디자인과의 협업과 코드 품질 관리에 익숙합니다.",
    items: ["Git", "GitHub", "Jira", "Figma", "Notion"],
  },
];
