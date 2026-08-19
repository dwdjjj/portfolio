export type WorkItem = {
  title: string;
  period: string;
  bullets: string[];
  results?: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  tags?: string[];
  current?: boolean;
  summary?: string;
  workItems: WorkItem[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    company: "아자스쿨주식회사",
    role: "개발팀 사원 (프론트엔드 & iOS/Android)",
    period: "2025.08 — 재직중",
    location: "서울",
    tags: ["정규직", "개발팀"],
    current: true,
    summary:
      "교육 플랫폼의 인증·결제·스케줄·푸시 등 핵심 도메인을 React/Next.js로 구축·개선하고, 웹과 Android·iOS 3플랫폼을 함께 맡았습니다. 이후 신규 온라인 멘토링 플랫폼을 기획부터 배포까지 혼자 맡아 정식 출시까지 끌고 갔습니다.",
    workItems: [
      {
        title: "온라인 멘토링 플랫폼 'Campus-It(캠퍼스잇)' 신규 구축·출시",
        period: "2026.04 — 운영중",
        bullets: [
          "대학생 멘토 1:1 입시·진로 멘토링 신사업을 기획·정책 설계부터 단독 구축 (Product Engineer)",
          "Spring Boot 백엔드 · Next.js 15 프론트엔드 · AWS 인프라까지 1인 풀스택 개발",
          "α→β→γ 3단계 출시 전략과 feature flag 기반 ₩0 체험단 우회 분기 설계",
          "전자상거래법·개인정보 보관 기준 등 처음 다루는 정책 영역을 조문 단위로 조사해 약관 15종(T01~T15)과 환불 로직에 반영",
        ],
        results: [
          "2026.07.01 유료 정식 출시 — α 파일럿 → β 무료 체험단 → γ 유료 전환 3단계 완주",
          "feature flag 설계로 외부 결제 심사 3주 지연을 흡수 — 코드 전환(6/11)과 실제 오픈(7/1) 사이를 롤백 없이 대기",
          "Redis 없이 PostgreSQL advisory lock + Caffeine으로 동시성 제어 — 상시 운영 컴포넌트 1개 감소",
        ],
      },
      {
        title: "앱 알림 시스템 구축 (웹 · Android · iOS)",
        period: "2025.12 — 2026.04",
        bullets: [
          "FCM 토큰 등록·해제 및 중복 방지 로직 구성",
          "pending 토큰 저장·복구로 로그인 전·후 안정성 확보",
          "웹↔앱 공통 네이티브 브릿지로 3플랫폼 인터페이스 통일 (토큰 수신·권한 변경·알림 설정 진입)",
          "푸시 클릭 로그를 로컬 큐에 적재 후 네트워크 복구·앱 재시작 시 flush",
          "cold start 딥링크를 플랫폼별 pending 큐로 처리 (Android intent timing · iOS 초기 URL 순서 · Web hydration 이전)",
          "동의 UI를 신규 유저(모달) / 기존 유저(바텀시트) 두 벌로 분리 구현",
        ],
        results: [
          "푸시 열람률 33.9% — 3,802건 발송 / 1,290건 열람, 수신자 185명 (GA4, 2026.04~08)",
          "동의 요청을 신규(모달)·기존(바텀시트) 두 맥락으로 나눠 노출한 결과 동의율 21.5% vs 12.6% — 같은 요청도 맥락에 따라 1.7배 차이가 난다는 걸 수치로 확인",
          "웹·Android·iOS 3플랫폼을 단독 구현해 동일 기능의 플랫폼 간 동작 차이 제거",
        ],
      },
      {
        title: "인증·토큰 레이어 재설계",
        period: "2026.01 — 2026.02",
        bullets: [
          "Axios 인터셉터에 single-flight + 요청 큐잉 적용",
          "TokenManager를 Redux(메모리) + HttpOnly 쿠키 조합으로 재구성",
          "shop / instructor / manager 3역할 기반 라우팅 가드 도입",
        ],
        results: [
          "동시 401 발생 시 refresh API 중복 호출 제거 — 정확히 1회만 호출하고 원 요청은 큐에서 재시도",
          "accessToken을 브라우저 저장소에 남기지 않는 구조로 전환",
          "역할이 다른 세션의 API 오호출을 라우팅 단계에서 차단",
        ],
      },
      {
        title: "강사 플랫폼 전면 개편 및 배정 관리",
        period: "2026.01 — 2026.03",
        bullets: [
          "캘린더/리스트 탭 기반 스케줄 관리 UI 구현",
          "신청 가능/거절·취소 상태 필터, 날짜별 그룹핑, 무한 스크롤 적용",
          "기간 단위 일괄 스케줄 등록 및 중복 검증 처리",
          "출석부(참가자 명부·전화 연결)와 참가자별 사진 업로드 구성",
          "관리자 배정 v2 — 캘린더 뷰, 메모 CRUD, 거절 이력 배지, 대체 후보 강사 로직",
          "역할별 알림함 API와 안읽음 배지 동기화",
        ],
        results: [
          "회차별 수기 등록을 기간 단위 일괄 등록 + 중복 검증으로 대체",
          "배정 거절 시 대체 후보를 시스템이 제시해 관리자의 수동 재탐색 제거",
          "스케줄 등록 → 배정 → 출석부 → 알림함까지 강사 플로우 전 구간을 하나의 개편으로 재구성",
        ],
      },
      {
        title: "주문·결제·환불 고도화 (다인권 · 부분 취소)",
        period: "2026.02 — 2026.04",
        bullets: [
          "취소를 전체 / 아이템별 부분 / 참가자 단위 3단계로 분리",
          "다인권(participantsPerTicket) 도입에 맞춰 가격 설정·주문서·재고 검증·취소/환불 모달 분기",
          "환불 수수료 금액·수수료율 컬럼 및 폐강 기능 UI 구현",
          "Toss SDK 환경변수 Dev/Prod 분리 및 Docker 배포 시 환경변수 전달 문제 해결",
          "Playwright 기반 결제 플로우 E2E 추가",
        ],
        results: [
          "참가자 단위 부분 환불을 시스템에서 종결 — 운영자 수기 정산 경로 제거",
          "1주문 다참가자 케이스를 가격·재고·취소·환불까지 하나의 흐름으로 일관 처리",
          "결제 플로우 회귀를 E2E로 자동 검증",
        ],
      },
      {
        title: "체험단(리뷰어) 신청·주문 플로우 구축",
        period: "2025.11 — 2025.12",
        bullets: [
          "프로모션 진입 시 전용 스케줄/가격 로직 분기 및 100% 할인 UI 구현",
          "체험단 전용 신청 페이지에서 구매자/참가자 정보 입력·검증·동의 처리",
          "잔여 체험 횟수(주/월) 조회 및 제한 안내",
          "무료 주문 생성 플로우 구성 및 성공/실패 처리",
        ],
        results: [
          "결제 UI를 우회하는 ₩0 주문 경로를 분기해 기존 유료 결제 로직 수정 없이 체험단 운영",
          "주/월 잔여 횟수를 신청 단계에서 검증해 정책 위반 주문이 생성되지 않도록 차단",
        ],
      },
      {
        title: "타임딜(반짝 특가) 기능 개발",
        period: "2025.10 — 2025.11",
        bullets: [
          "타임딜 진입 경로(fromTimeDeal)에 따른 스케줄 필터링 및 복귀 라우팅 유지",
          "캘린더에 타임딜 날짜 마커·마감임박·품절 상태 표시 UI 구현",
          "스케줄 카드에 타임딜 배지 + 카운트다운 노출, 할인율/할인가 표시",
          "운영자 화면에서 타임딜 후보 조회, 스케줄 단위 할인율 입력·검증·저장, 적용가 미리보기 구현",
        ],
        results: [
          "운영자가 스케줄 단위로 할인율을 입력하고 적용가를 즉시 확인 — 개발자 확인 요청 없이 등록 완결",
          "마감임박·품절·카운트다운을 캘린더와 카드에 함께 노출해 타임딜 일정 가시성 확보",
        ],
      },
      {
        title: "플랫폼 유지보수 및 계측 정비",
        period: "2025.08 — 2026.04",
        bullets: [
          "상품 상세/스케줄 페이지 등 주요 페이지 안정화",
          "결제·장바구니 등 쇼핑몰 구매 로직 구현 및 개선",
          "레거시 로직 정리 및 예외 케이스 대응",
          "GA4 체계화 — platform/app_version 수집, user_properties 개선, UTM 서버 전송",
          "이미지 업로드를 Presigned URL 기반 S3 직접 업로드로 일원화",
          "Docker Blue-Green 배포(dev/prod 분리, ECR 전환) 및 배포 보고서 자동화",
        ],
        results: [
          "page-views API 중복 호출 제거 및 GA4 user_id 중복 전송 수정 — 유입 지표 정확도 확보",
          "이미지 업로드의 서버 경유를 없애 업로드 트래픽을 S3로 직접 이관",
          "무중단 Blue-Green 배포 체계로 전환하고 배포 이력을 자동 기록",
        ],
      },
    ],
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux",
      "TailwindCSS",
      "WebView Bridge",
      "FCM",
      "GA / Meta Analytics",
      "Java / Spring Boot",
      "PostgreSQL",
      "AWS",
    ],
  },
];
