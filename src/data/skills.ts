export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "사용자 경험을 최우선으로, 직관적이고 안정적인 UI를 만듭니다.",
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
    description: "FE 옆에서 직접 API를 만들고 데이터 흐름을 설계합니다.",
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
    description: "관계형/NoSQL/캐시 레이어를 용도에 맞게 사용합니다.",
    items: ["MySQL", "MongoDB", "Redis", "SQLite"],
  },
  {
    title: "Security & Infra",
    description: "안전한 통신과 일관된 빌드 환경을 만듭니다.",
    items: ["JWT", "RSA", "Docker", "Webpack"],
  },
  {
    title: "Tools & Collaboration",
    description: "기획·디자인과의 협업과 코드 품질 관리에 익숙합니다.",
    items: ["Git", "GitHub", "Jira", "Figma", "Notion"],
  },
];
