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
      "대학생 멘토와 수험생을 연결하는 1:1 입시·진로 멘토링 서비스",
    period: "2026.04 — 운영중 (2026.07.01 정식 출시)",
    team: "1명 (풀스택)",
    role: "Product Engineer — 기획·정책 설계·백엔드·프론트엔드·인프라",
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
      "코드를 쓰기 전에 기능 명세 28건, 의사결정 기록(ADR) 44건, 약관 15종(T01~T15), HTML 목업 51종을 작성해 예약·환불·멘토 승인·결제 전환 기준을 먼저 정함",
      "처음 다루는 전자상거래법과 개인정보 보관 기준은 AI로 범위를 빠르게 훑은 뒤 조문을 다시 확인했고, 확인한 근거를 약관과 환불 로직에 반영",
      "Spring Boot로 회원·인증·멘토·상품·예약·결제·정산·관리자 API를 구현하고, Next.js로 멘티·멘토·관리자용 약 70개 페이지를 개발",
      "JWT 인증, 카카오·네이버 OAuth, 예약 상태 머신, 상담 입장 기록, 취소·환불 정책, 토스페이먼츠 결제와 정산 흐름 구현",
      "AWS EC2, Docker Compose, RDS, S3, CloudFront, GitHub Actions를 이용해 개발과 배포 환경 구성",
      "파일럿·무료 체험단·유료 출시를 단계로 나누고, feature flag로 무료 주문과 유료 결제를 전환할 수 있게 설계",
      "예약과 스케줄러의 중복 실행은 PostgreSQL advisory lock과 Caffeine으로 막아 Redis를 별도로 운영하지 않음",
    ],
    results: [
      "파일럿과 무료 체험단을 거쳐 2026년 7월 1일 유료 서비스로 정식 출시",
      "결제 심사가 3주 늦어졌지만 6월 11일에 유료 전환 코드를 준비해 두고, 심사 통과 후 롤백 없이 7월 1일 오픈",
      "PostgreSQL advisory lock과 Caffeine으로 예약·스케줄러 중복 실행을 막아 상시 운영할 컴포넌트를 하나 줄임",
      "캐시 계층을 제외하고 프론트엔드와 백엔드를 함께 배치해, 월 약 $145로 예상했던 구성을 약 $30 수준으로 설계 (설계 추정치)",
      "β 체험단 세션 만족도 평균 4.5/5, 참여자 전원이 현재 가격 이상 지불 의향 응답 (n=8)",
      "출시 후 실측 — 첫 방문 578명 → 상품 조회 10명 → 결제 3명·4건 (GA4, 2026.05~08). 만든 양과 성과는 비례하지 않았습니다",
      "가장 많이 이탈한 구간은 사전신청 182명에서 탐색 19명으로 넘어가는 지점이었습니다. 멘토 모집에 집중한 반면 멘티 유입 채널은 만들지 못했고, 기존 플랫폼 회원과 연결하지 않은 판단이 영향을 줬습니다",
    ],
    growth:
      "기획부터 출시까지 직접 해보니 구현 난이도만큼 운영 정책과 법적 기준이 중요했습니다. 출시 뒤에는 예상과 달랐던 지점을 페이지별 퍼널로 좁혀 봤습니다. 다만 무료 체험과 유료 출시를 구분하는 이벤트를 미리 심지 않아, 유료 전환의 영향과 출시 직후의 자연스러운 감소를 끝내 나눠 보지 못했습니다. 지나간 데이터는 다시 만들 수 없었고, 계측도 기능과 같은 시점에 설계해야 한다는 걸 배웠습니다.",
    links: [
      {
        label: "mentoring.ajaschool.com",
        href: "https://mentoring.ajaschool.com",
      },
    ],
  },
  {
    slug: "push-notification",
    name: "앱 알림 시스템 (웹 · Android · iOS)",
    tagline:
      "웹·Android·iOS에서 권한 변경, cold start 딥링크, 오프라인 로그 유실 문제를 다룬 알림 기능",
    period: "2025.12 — 2026.04",
    team: "1명 (웹·Android·iOS 단독)",
    role: "설계·구현 — 웹(Next.js) · Android(Kotlin) · iOS(Swift)",
    status: "완료",
    category: "Mobile",
    tech: [
      "FCM",
      "Next.js",
      "TypeScript",
      "Kotlin",
      "Swift",
      "WebView Bridge",
      "GA4",
    ],
    highlights: [
      "여러 요청에서 401이 동시에 발생하면 refresh도 중복 호출되고 있었습니다. 알림 토큰 등록부터 흔들릴 수 있어 푸시 작업 전에 single-flight와 요청 큐로 인증 레이어를 먼저 수정",
      "OS 설정에서 알림 권한을 바꿔도 웹이 알 수 있도록 권한 상태 전달과 설정 진입 함수를 웹↔앱 공통 브릿지로 연결",
      "푸시 클릭 로그는 먼저 로컬 큐에 저장하고, 네트워크가 돌아오거나 앱이 다시 시작될 때 전송해 오프라인에서도 기록이 남도록 처리",
      "cold start에서는 Android intent, iOS 초기 URL, Web hydration의 실행 순서가 각각 달랐습니다. 플랫폼별 pending 큐를 두고 초기화할 때 먼저 처리",
      "알림 동의 화면은 가입 직후 보는 신규 유저용 모달과 서비스 이용 중 보는 기존 유저용 바텀시트로 나눠 구현",
    ],
    results: [
      "푸시 열람률 33.9% — 3,802건 발송 / 1,290건 열람 (GA4, 2026.04~08)",
      "동의율 21.5%(신규 모달) vs 12.6%(기존 바텀시트) — 같은 요청도 맥락에 따라 1.7배 차이가 난다는 걸 실측으로 확인",
      "세 플랫폼의 권한 변경과 알림 클릭 이후 흐름을 같은 인터페이스로 맞춰 플랫폼마다 다르게 동작하는 구간을 줄임",
      "전체 동의율은 15.8%, 실제 수신자는 185명이었습니다. 열람률보다 먼저 해결해야 할 문제는 알림을 받을 수 있는 사용자가 적다는 점이었습니다",
      "알림 설정 페이지는 4개월간 44번 조회됐습니다. 사용자가 이 페이지에서 알림을 적극적으로 관리할 것이라는 예상과는 달랐습니다",
    ],
    growth:
      "딥링크와 오프라인 큐를 다듬어도 그 앞의 알림 동의가 막혀 있으면 발송량은 늘지 않았습니다. 동의 화면을 두 가지로 만든 덕분에 21.5%와 12.6%라는 차이는 확인했지만, 그 결과를 다음 실험으로 이어가지는 못했습니다. GA 이벤트도 구현 4개월 뒤에 붙여 초기 데이터가 남지 않았는데, 계측을 늦게 설계했다는 점에서는 같은 실수였습니다.",
  },
  {
    slug: "pyeongtaek-career",
    name: "평택 관외 진로체험 홈페이지",
    tagline:
      "운영비 없이 학부모용 조회 화면과 비개발자 운영자용 관리 기능을 만든 프로젝트",
    period: "2026.05 — 2026.08",
    team: "1명",
    role: "기획·개발·인프라·운영 문서",
    status: "완료",
    category: "Web",
    tech: ["Next.js", "TypeScript", "Supabase", "Vercel", "sharp", "zod"],
    highlights: [
      "학부모의 회차별 명단 조회, 비개발자 운영자의 직접 등록, 운영비 0원, 배포 기한을 동시에 맞춰야 했습니다",
      "시스템에는 마스킹된 성명, 연락처 뒷 4자리, 학교만 저장되도록 입력 규격을 정해 개인정보 수집 범위를 줄임",
      "서버 전용 키 한 종류만 사용하고 조회도 모두 서버에서 처리해, 키가 클라이언트 번들에 포함되지 않도록 구성",
      "운영자가 1~2명인 환경에서 별도 관리자 테이블은 과하다고 판단해 서명 쿠키 기반의 간단한 인증을 선택",
      "상세 페이지의 첫 이미지 요청이 느린 문제를 피하려 png, webp, thumbnail 세 종류를 빌드할 때 미리 생성",
      "무료 플랜의 무활동 정지는 별도 시스템을 추가하지 않고 기존 조회 경로를 주기적으로 호출해 대응",
      "명단 등록 가이드와 엑셀 마스킹 수식, 배포 소유권, 인수인계, 컴플라이언스 근거를 운영 문서 6편 1,343줄로 정리",
    ],
    results: [
      "기한 하루 전에 초기 버전을 배포하고 3개월간 운영했으며, 호스팅과 DB는 모두 무료 플랜 안에서 사용",
      "상세 페이지 첫 진입에서 1초 이상 걸리던 이미지가 CDN 캐시 이후 바로 보이도록 개선",
      "의존성 6개, 운영 키 1종, 외부 시스템 0개로 구성해 운영자와 후임이 알아야 할 항목을 줄임",
      "코드 3,664줄과 별도로 운영 문서 1,343줄을 작성해, 개발자가 없어도 등록과 배포를 이어갈 수 있게 준비",
      "별도 요청이 오기 전에 사용량, 키 관리 내역, 개인정보보호법 근거, 기존 도구와 비교한 내용을 문서로 남김",
      "레포를 공개할 수 있게 된 뒤에는 초기 배포를 위해 만들었던 우회 파이프라인 266줄을 걷어내고, 개인 계정에 묶인 자산 없이 인수인계",
    ],
    growth:
      "처음에는 유료 플랜 결제를 기다리지 않으려고 배포 경로를 우회했습니다. 이후 조건이 바뀌었을 때 그 구조를 계속 두지 않고 걷어낸 뒤 표준 경로로 되돌렸습니다. 반대로 방문 계측은 끝내 넣지 못해 3개월치 데이터가 남지 않았고, 다음 회차에 '작년에 몇 명이 방문했나'라는 질문에 답할 수 없게 됐습니다.",
  },
  {
    slug: "content-distribution",
    name: "컨텐츠 배포 시스템",
    tagline:
      "Django와 비동기 작업 큐를 익히며 만든 콘텐츠 변환·다운로드 모니터링 프로젝트",
    period: "2025.08 — 2025.10",
    team: "1명 (풀스택)",
    role: "개인 학습 프로젝트 — 백엔드·비동기 처리·모니터링 UI",
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
      "실사용자가 없는 학습 프로젝트라 별도의 성과 지표는 측정하지 않음",
      "처리 시간이 긴 작업을 요청 흐름에서 Celery와 Redis로 분리하고, 다운로드 실패 시 fallback을 제공하는 흐름을 처음 설계",
    ],
    growth:
      "프론트엔드 작업만 하다가 Django로 데이터 모델링과 비동기 처리까지 처음 다뤄봤습니다. 이때 서버에서 오래 걸리는 작업을 분리하는 방식을 익힌 경험이 이후 Spring Boot 서비스를 만들 때 도움이 됐습니다.",
  },
  {
    slug: "pc-ai-dashboard",
    name: "PC & AI Service 웹 대시보드",
    tagline: "WebSocket으로 받은 실시간 교통 데이터를 Canvas에 표시한 대시보드",
    period: "2025.03 — 2025.06",
    team: "2명",
    role: "프론트엔드 개발 및 실시간 캔버스 구현",
    status: "완료",
    category: "Web",
    cover: "/images/pc-ai/pc&ai_image.png",
    tech: ["React", "MUI", "WebSocket", "Canvas", "D3.js"],
    highlights: [
      "MUI와 커스텀 테마로 대시보드 화면 구현",
      "카메라 영상과 교통 통계 구독 로직을 WebSocket 커스텀 훅(useCameraStream, useTrafficStats)으로 분리",
      "ROI, 검지 라인, 속도 등 실시간 교통 데이터를 Canvas 위에 표시",
    ],
    results: [
      "카메라 스트림·교통 통계 구독 로직을 커스텀 훅 2종으로 분리해 화면 간 재사용",
      "ROI·검지 라인·속도를 DOM 대신 Canvas에 직접 그려 같은 흐름에서 갱신",
    ],
    growth:
      "실시간 데이터가 계속 들어오는 화면을 처음 맡았습니다. WebSocket 구독과 Canvas 그리기를 분리하면서, 데이터 수신 주기와 화면 갱신 주기를 따로 다뤄야 한다는 점을 익혔습니다.",
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
      "Jetpack Compose로 처음 앱 화면을 만들고, 로그인 상태와 실시간 채팅처럼 화면 밖에서도 이어지는 상태를 다뤄봤습니다. 웹과 달리 앱 생명주기를 함께 고려해야 한다는 점을 이 프로젝트에서 처음 배웠습니다.",
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
      "JWT 재발급과 RSA 암복호화를 직접 구현하면서, 보안 기능은 알고리즘을 붙이는 것보다 키와 토큰을 어디에 두고 어떻게 갱신할지가 더 중요하다는 걸 배웠습니다.",
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
    growth:
      "팀장을 맡아 일정과 역할을 나누는 동시에 실시간 게임 로직도 구현했습니다. 화상 연결만으로 게임이 완성되는 게 아니라, 참가자마다 다른 상태를 Signal 이벤트로 맞추는 과정이 생각보다 까다로웠습니다.",
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
      "연결선이 겹쳐도 구분할 수 있도록 RGB 값을 이용해 색상을 나누는 로직 적용",
    ],
    results: ["제4회 오픈 인프라 개발 경진대회(OIDC 2022) 동상 수상"],
    growth:
      "Kubernetes를 잘 모르는 사용자도 컨테이너 관계를 화면에서 구성할 수 있게 만드는 프로젝트였습니다. 복잡한 인프라 개념을 UI로 옮길 때는 기능 구현만큼 관계를 어떻게 보여줄지가 중요하다는 걸 배웠습니다.",
  },
];
