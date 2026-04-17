export type Education = {
  school: string;
  program: string;
  period: string;
  bullets: string[];
};

export const education: Education[] = [
  {
    school: "삼성 청년 SW 아카데미 (SSAFY) 9기",
    program: "1000시간 SW 역량 강화 과정",
    period: "2023.01 — 2023.12",
    bullets: [
      "상반기: 알고리즘 문제 해결 및 자료구조 학습 (Java)",
      "하반기: 협업 프로젝트 중심 웹 개발 (Spring Boot, Vue.js, React)",
      "주요 프로젝트: WebRTC 기반 실시간 화상 퀴즈 게임, 핀테크 PWA",
      "Jira·Git 활용 6인 팀 프로젝트 3회 진행",
    ],
  },
  {
    school: "서울과학기술대학교",
    program: "컴퓨터공학과 (졸업)",
    period: "2017.03 — 2023.02",
    bullets: [
      "전공: C·C++, 자료구조, 컴퓨터과학 개론, 알고리즘",
      "수학 기반: 이산수학·공학수학 이수",
      "웹 개발 수업 수강 후 프론트엔드 개발자로 진로 설정",
      "디자인 동아리와 웹 프로젝트 협업, 컴퓨터 그래픽스·비전 학습",
    ],
  },
];

export const awards = [
  {
    title: "제4회 오픈 인프라 개발 경진대회 (OIDC 2022) 동상",
    org: "(주) 맨텍 주최",
    date: "2022.08",
    detail:
      "Terraform 기반 Kubernetes 시각적 워크플로 웹 서비스(Kube:Form). 드래그 앤 드롭 + Xarrow 의존성 시각화 담당.",
  },
] as const;

export const languages = [
  { test: "TOEIC Speaking", level: "IM3", date: "2025.03.09" },
  { test: "OPIC", level: "IM1", date: "2022.12.30" },
] as const;
