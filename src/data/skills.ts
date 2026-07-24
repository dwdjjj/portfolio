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
      "React Query",
      "Zustand",
      "TailwindCSS",
      "Vue.js",
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
    description: "화면에서 끝내지 않고 API와 데이터 흐름까지 직접 설계합니다.",
    items: [
      "Spring Boot",
      "Django",
      "Celery",
      "Node.js",
      "Next.js API Routes",
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
    items: ["PostgreSQL", "MySQL", "Redis", "SQLite"],
  },
  {
    title: "Security & Infra",
    description:
      "인증·통신 보안부터 배포까지, 서비스가 실제로 떠 있는 환경을 직접 구성하고 운영합니다.",
    items: [
      "JWT",
      "RSA",
      "Docker",
      "AWS (EC2 · RDS · S3 · CloudFront)",
      "GitHub Actions",
      "Nginx",
      "Webpack",
    ],
  },
  {
    title: "AI 활용",
    description:
      "AI를 답 생성기가 아니라 검토자이자 리서처로 씁니다. 설계 전 놓친 조건을 되묻게 하고, 낯선 기술 스택과 도메인·법령 자료를 파악하는 속도를 높입니다.",
    items: ["Claude", "Codex", "ChatGPT", "Gemini", "Prompt Engineering"],
  },
  {
    title: "Tools & Collaboration",
    description: "기획·디자인과의 협업과 코드 품질 관리에 익숙합니다.",
    items: ["Git", "GitHub", "Jira", "Figma", "Notion"],
  },
];
