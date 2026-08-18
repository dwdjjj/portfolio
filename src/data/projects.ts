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
  /** "mobile"이면 커버를 그라데이션 위 폰 프레임 안에 세로형으로 노출 (모바일 친화 UI 강조용) */
  coverDevice?: "mobile";
  images?: ProjectImage[];
  tech: string[];
  highlights: string[];
  results?: string[];
  growth?: string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "campus-it",
    name: "Campus-It (캠퍼스잇)",
    tagline:
      "대학생 멘토 1:1 입시·진로 멘토링 커머스 플랫폼 — 기획부터 인프라까지 1인이 만들어 출시한 서비스",
    period: "2026.04 — 운영중 (2026.07.01 정식 출시)",
    team: "1명 (풀스택)",
    role: "Product Engineer — 기획·정책 설계부터 백엔드·프론트·인프라까지 1인 단독",
    status: "진행중",
    category: "Fullstack",
    cover: "/images/campus-it/home-blurred-v2.png",
    coverDevice: "mobile",
    tech: [
      "Java 21",
      "Spring Boot 3",
      "PostgreSQL 16",
      "Next.js 15",
      "TypeScript",
      "Redux Toolkit",
      "React Query",
      "AWS",
    ],
    highlights: [
      "기획 — PRD 20문서·의사결정 기록(ADR) 44건·약관 14종·HTML 목업 51종을 직접 작성해 예약 상태, 취소/환불, 멘토 승인, 약관 동의, 결제 전환 기준을 코드보다 먼저 확정",
      "도메인 학습 — 전자상거래법 §17 청약철회 예외·§20 통신판매중개업자 지위·개인정보 보관기간 같은 처음 다루는 법·정책 영역을 AI로 빠르게 훑고, 조문 근거를 문서에 남긴 뒤 약관과 환불 로직에 반영",
      "백엔드 — Spring Boot 기반 회원·인증·멘토·상품·예약·결제·정산·관리자 등 핵심 도메인 API 구현",
      "프론트엔드 — Next.js 기반 멘티·멘토·관리자 플로우와 약 70개 페이지 개발, Axios 인터셉터 토큰 갱신·React Query 캐시 전략 적용",
      "핵심 기능 — JWT 인증, 카카오/네이버 OAuth, 예약 상태 머신, 상담 입장 기록, 취소/환불 정책, 토스페이먼츠 결제·정산 흐름 구현",
      "인프라 — AWS EC2, Docker Compose, RDS, S3, CloudFront, GitHub Actions 기반 배포 환경 구성",
      "출시 전략 — α 파일럿, β 무료 체험단, γ 유료 정식 출시 단계로 분리하고 feature flag로 무료 주문·유료 결제 전환 구조 설계",
      "동시성 제어 — Redis 없이 PostgreSQL advisory lock과 Caffeine으로 예약 중복 생성·스케줄러 중복 실행 방지",
    ],
    results: [
      "α 파일럿 → β 무료 체험단 → γ 유료 전환까지 3단계를 완주하고 2026년 7월 1일 정식 출시",
      "feature flag 설계로 외부 결제 심사 3주 지연을 흡수 — 코드 롤백 없이 β 무료 → γ 유료 전환 완료",
      "Redis 없이 PostgreSQL advisory lock + Caffeine으로 예약 중복 생성·스케줄러 중복 실행 방지 — 1인 운영 기준 상시 운영 컴포넌트 1개 감소",
      "인프라 월 약 $30으로 운영 — 서버 호스팅을 AWS EC2 기반으로 세팅하였으며, presigned URL을 활용한 S3 업로드로 트래픽 비용 최소화",
      "β 체험단 세션 만족도 평균 4.5/5, 참여자 전원이 현재 가격 이상 지불 의향 응답 (n=8)",
    ],
    growth:
      "기획·정책 설계부터 개발·배포·출시까지 제품 전체를 단독으로 책임지며, 구현 난이도가 아니라 운영 정책과 법적 제약을 기준으로 의사결정하는 법을 배웠습니다. 출시 후에는 실제 지표가 가설과 다르다는 것(유입 병목)을 데이터로 확인하고 다음 실행안을 다시 세우는 과정까지 경험했습니다.",
    links: [
      {
        label: "mentoring.ajaschool.com",
        href: "https://mentoring.ajaschool.com",
      },
    ],
  },
  {
    slug: "content-distribution",
    name: "컨텐츠 배포 시스템",
    tagline:
      "Django·비동기 큐를 직접 다뤄보려고 만든 학습용 사이드 프로젝트 — 디바이스 사양 기반 콘텐츠 최적화와 실시간 다운로드 모니터링",
    period: "2025.08 — 2025.10",
    team: "1명 (풀스택)",
    role: "개인 학습 프로젝트 — 백엔드부터 실시간 모니터링 UI까지 혼자 구현",
    status: "완료",
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
    ],
    results: [
      "실사용자가 없는 학습 목적 프로젝트로, 성과 지표 대신 직접 부딪쳐 본 문제를 남깁니다",
      "Celery·Redis로 오래 걸리는 작업을 요청 흐름에서 떼어내는 구조를 처음 설계",
      "다운로드 실패라는 실패 경로를 먼저 정의하고 fallback을 붙이는 습관을 얻음",
      "React 훅으로 WebSocket 연결·해제 생명주기를 다루는 패턴을 익힘",
    ],
    growth:
      "프론트엔드만 하던 시야에서 벗어나 Django로 모델링부터 비동기 처리까지 직접 다뤄본 경험이, 이후 Spring Boot 기반 풀스택 개발로 넘어가는 발판이 되었습니다.",
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
    cover: "/images/pc-ai/pc&ai_image.png",
    tech: ["React", "MUI", "WebSocket", "Canvas", "D3.js"],
    highlights: [
      "MUI + 커스텀 테마로 일관된 UI/UX 구현",
      "WebSocket 커스텀 훅(useCameraStream, useTrafficStats) 개발",
      "실시간 교통 데이터의 캔버스 시각화 (ROI, 검지 라인, 속도 등)",
    ],
    results: [
      "초기 사용자 테스트에서 ‘직관적인 실시간 제어’ 평가",
      "카메라 스트림·교통 통계 로직을 커스텀 훅으로 분리해 화면 간 재사용",
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
      {
        src: "/images/lets-dog/matching.gif",
        caption: "반려견 기반 사용자 매칭",
      },
      {
        src: "/images/lets-dog/tracking.gif",
        caption: "산책 경로 실시간 트래킹",
      },
      { src: "/images/lets-dog/board-create.gif", caption: "게시판 글 작성" },
      {
        src: "/images/lets-dog/chattingList.gif",
        caption: "채팅 목록 및 실시간 알림",
      },
      {
        src: "/images/lets-dog/profile-move.gif",
        caption: "프로필 이동 플로우",
      },
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
      {
        src: "/images/maejang-minjok/QR.gif",
        caption: "QR 기반 공유 장바구니",
      },
      { src: "/images/maejang-minjok/장바구니.gif", caption: "장바구니 관리" },
      {
        src: "/images/maejang-minjok/회원가입.gif",
        caption: "회원가입 플로우",
      },
      { src: "/images/maejang-minjok/결제.gif", caption: "결제 플로우" },
      {
        src: "/images/maejang-minjok/사장화면.gif",
        caption: "사장님 화면 — DnD 주문 상태 변경",
      },
      {
        src: "/images/maejang-minjok/주문알림.gif",
        caption: "주문 실시간 알림",
      },
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
      {
        src: "/images/mung-nyang/메인화면-방생성.gif",
        caption: "메인 화면 — 방 생성",
      },
      {
        src: "/images/mung-nyang/카테고리선택1.gif",
        caption: "게임 카테고리 선택",
      },
      {
        src: "/images/mung-nyang/대기방화면.gif",
        caption: "대기방 — OpenVidu 화상 연결",
      },
      {
        src: "/images/mung-nyang/정답자선정화면.gif",
        caption: "정답자 선정 UI",
      },
      { src: "/images/mung-nyang/점수집계.gif", caption: "점수 집계 화면" },
    ],
    tech: ["React", "Redux", "WebRTC", "OpenVidu"],
    highlights: [
      "Figma 전반적 UI/UX 설계 담당",
      "메인 홈 UI + BGM, 방 생성/참여 UI 및 API 연동",
      "Redux 기반 로그인·방 정보 전역 상태 관리",
      "채팅방, 도움말/투표/정답 모달 컴포넌트 설계 및 구현",
      "OpenVidu 화상 통화 + Signal 통신 기반 게임 진행 로직 안정화",
    ],
    growth: "팀장으로 팀 전체 일정·역할 분배 + 실시간 게임 로직 설계 경험",
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
    cover: "/images/kube-form/kubeform.png",
    tech: [
      "React",
      "Material UI",
      "react-beautiful-dnd",
      "Xarrow",
      "Terraform",
    ],
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
