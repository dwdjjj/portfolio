export type ProjectCategory = "Web" | "Mobile" | "Infra" | "Fullstack";

export type ProjectImage = {
  src: string;
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  team: string;
  role: string;
  status?: "진행중" | "완료";
  category?: ProjectCategory;
  cover?: string;
  images?: ProjectImage[];
  tech: string[];
  highlights: string[];
  results?: string[];
  growth?: string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "content-distribution",
    name: "컨텐츠 배포 시스템",
    tagline: "디바이스 사양 기반 콘텐츠 자동 최적화 및 실시간 다운로드 모니터링",
    period: "2025.08 — 진행중",
    team: "1명 (풀스택)",
    role: "풀스택 개발 및 실시간 다운로드 모니터링 UI 구현",
    status: "진행중",
    category: "Fullstack",
    tech: [
      "Django",
      "SQLite",
      "Celery",
      "Redis",
      "Next.js",
      "TailwindCSS",
      "WebSocket",
    ],
    highlights: [
      "Django 모델링 및 콘텐츠 변형 버전 관리 구조 설계",
      "디바이스 정보(칩셋·메모리·해상도) 기반 호환성 점수 알고리즘(get_final_score) 구현",
      "Celery + Redis 기반 콘텐츠 변환 자동화 및 동시 다운로드 큐 관리",
      "다운로드 실패 시 대체 콘텐츠 제공(fallback) 전략 구현",
      "WebSocket 기반 실시간 다운로드 진행률 전송 + Next.js 대시보드 구현",
      "React + Tailwind 기반 콘텐츠 업로드 및 실시간 다운로드 UI",
    ],
    results: [
      "디바이스 사양 기반 콘텐츠 자동 최적화로 사용자 맞춤 제공 가능",
      "변환 자동화 + fallback 전략으로 안정성 확보",
      "React 훅 기반 WebSocket 연결로 실시간 대시보드 반응성 향상",
      "전 구간 모듈화·상태 분리로 코드 재사용성 확보",
    ],
  },
  {
    slug: "pc-ai-dashboard",
    name: "PC & AI Service 웹 대시보드",
    tagline: "실시간 교통 데이터 캔버스 시각화 + WebSocket 스트리밍 대시보드",
    period: "2025.03 — 2025.06",
    team: "2명",
    role: "프론트엔드 개발 및 실시간 캔버스 구현",
    status: "완료",
    category: "Web",
    tech: ["React", "MUI", "WebSocket", "Canvas", "D3.js"],
    highlights: [
      "MUI + 커스텀 테마로 일관된 UI/UX 구현",
      "WebSocket 커스텀 훅(useCameraStream, useTrafficStats) 개발",
      "실시간 교통 데이터의 캔버스 시각화 (ROI, 검지 라인, 속도 등)",
    ],
    results: [
      "초기 사용자 테스트에서 ‘직관적인 실시간 제어’ 평가",
      "코드 재사용성 확보로 개발 시간 20% 단축",
      "코드 커버리지 85% 유지",
    ],
    growth:
      "Canvas와 WebSocket의 실시간 스트리밍 성능 최적화를 통해 프론트엔드 성능 최적화 역량 강화",
  },
  {
    slug: "lets-dog",
    name: "Let's Dog (같이가개)",
    tagline: "반려견 산책·반려인 SNS Android 앱",
    period: "2023.10 — 2023.11",
    team: "6명",
    role: "Android 앱 개발 및 실시간 채팅 기능 구현",
    status: "완료",
    category: "Mobile",
    cover: "/images/lets-dog/기획배경2.png",
    images: [
      { src: "/images/lets-dog/matching.gif", caption: "반려견 기반 사용자 매칭" },
      { src: "/images/lets-dog/tracking.gif", caption: "산책 경로 실시간 트래킹" },
      { src: "/images/lets-dog/board-create.gif", caption: "게시판 글 작성" },
      { src: "/images/lets-dog/chattingList.gif", caption: "채팅 목록 및 실시간 알림" },
      { src: "/images/lets-dog/profile-move.gif", caption: "프로필 이동 플로우" },
      { src: "/images/lets-dog/login.gif", caption: "로그인 / 회원가입" },
    ],
    tech: ["Kotlin", "Jetpack Compose", "WebSocket", "Stomp"],
    highlights: [
      "Kotlin + Jetpack Compose로 안드로이드 앱 개발",
      "DataStore 세팅, 회원가입/로그인 UI 및 인증 구현",
      "로그인 여부에 따른 하단바 렌더링 로직 설계",
      "Stomp WebSocket 기반 채팅 + 카카오톡 유사 읽음 처리 독자 구현",
    ],
    growth:
      "Kotlin과 Jetpack Compose를 학습하며 모바일 환경 이해와 앱 개발 역량 강화",
  },
  {
    slug: "store-of-people",
    name: "매장의 민족",
    tagline: "키오스크 없이 핸드폰으로 주문·결제하는 핀테크 PWA",
    period: "2023.09 — 2023.10",
    team: "6명",
    role: "프론트엔드 개발 및 보안 로직 구현",
    status: "완료",
    category: "Web",
    cover: "/images/maejang-minjok/figma.png",
    images: [
      { src: "/images/maejang-minjok/QR.gif", caption: "QR 기반 공유 장바구니" },
      { src: "/images/maejang-minjok/장바구니.gif", caption: "장바구니 관리" },
      { src: "/images/maejang-minjok/회원가입.gif", caption: "회원가입 플로우" },
      { src: "/images/maejang-minjok/결제.gif", caption: "결제 플로우" },
      { src: "/images/maejang-minjok/사장화면.gif", caption: "사장님 화면 — DnD 주문 상태 변경" },
      { src: "/images/maejang-minjok/주문알림.gif", caption: "주문 실시간 알림" },
    ],
    tech: ["React", "Redux", "RSA", "react-beautiful-dnd", "WebSocket", "JWT"],
    highlights: [
      "React 환경 설정 및 Redux 세팅·유지보수",
      "인터셉터 기반 JWT 토큰 저장, reissue 기능 구현",
      "QR 리더 기능을 통한 공유 장바구니 구현",
      "RSA 암복호화로 API 통신 보안 강화",
      "사장님 웹페이지: 드래그 앤 드롭으로 주문 상태 변경",
    ],
    growth:
      "RSA·JWT 기반 보안 구현을 경험하며 데이터 보호 중요성과 보안 설계 역량 향상",
  },
  {
    slug: "mungnyang",
    name: "멍마을의 냥",
    tagline: "‘몸으로 말해요’ 컨셉의 화상통화 웹게임",
    period: "2023.08 — 2023.09",
    team: "6명",
    role: "팀장, 실시간 화상 게임 로직 및 UI 구현",
    status: "완료",
    category: "Web",
    cover: "/images/mung-nyang/메인화면-방생성.gif",
    images: [
      { src: "/images/mung-nyang/메인화면-방생성.gif", caption: "메인 화면 — 방 생성" },
      { src: "/images/mung-nyang/카테고리선택1.gif", caption: "게임 카테고리 선택" },
      { src: "/images/mung-nyang/대기방화면.gif", caption: "대기방 — OpenVidu 화상 연결" },
      { src: "/images/mung-nyang/정답자선정화면.gif", caption: "정답자 선정 UI" },
      { src: "/images/mung-nyang/점수집계.gif", caption: "점수 집계 화면" },
    ],
    tech: ["React", "Redux", "WebRTC", "OpenVidu"],
    highlights: [
      "Figma 전반적 UI/UX 설계 담당",
      "메인 홈 UI + BGM, 방 생성/참여 UI 및 API 연동",
      "Redux 기반 로그인·방 정보 전역 상태 관리",
      "채팅방, 도움말/투표/정답 모달 컴포넌트 설계 및 구현",
      "OpenVidu 화상 통화 + Signal 통신 기반 게임 진행 로직 안정화",
      "벌칙자 선정 후 벌칙 화면 설계 및 패스 로직 구현",
    ],
    growth:
      "팀장으로 팀 전체 일정·역할 분배 + 실시간 게임 로직 설계 경험",
  },
  {
    slug: "kube-form",
    name: "Kube:Form",
    tagline: "Drag & Drop으로 만드는 Kubernetes 워크플로우 GUI",
    period: "2022.03 — 2022.09",
    team: "4명",
    role: "프론트엔드 개발 (Drag & Drop 구현)",
    status: "완료",
    category: "Infra",
    tech: ["React", "Material UI", "react-beautiful-dnd", "Xarrow", "Terraform"],
    highlights: [
      "Kubernetes 환경을 위한 Drag & Drop UI 구현",
      "Xarrow를 활용한 컨테이너 의존성 시각화",
      "RGB 알고리즘 적용으로 가시성 향상",
    ],
    results: ["제4회 오픈 인프라 개발 경진대회(OIDC 2022) 동상 수상"],
    growth:
      "Kubernetes 환경과 시각화 UI 구현을 통해 인프라 기술 및 사용자 친화적 UI 설계 역량 확보",
  },
];
