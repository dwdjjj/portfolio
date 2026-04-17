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
    role: "개발팀 사원 (프론트엔드)",
    period: "2025.08 — 재직중",
    location: "서울",
    tags: ["정규직", "개발팀"],
    current: true,
    summary:
      "교육 플랫폼의 결제·스케줄·푸시·체험단·타임딜 등 핵심 도메인을 React/Next.js로 구축·개선합니다.",
    workItems: [
      {
        title: "플랫폼 유지보수 및 개선",
        period: "2025.08 — 2026.03",
        bullets: [
          "상품 상세/스케줄 페이지 등 주요 페이지 안정화",
          "결제·장바구니 등 쇼핑몰 구매 로직 구현 및 개선",
          "레거시 로직 정리 및 예외 케이스 대응",
          "유저 활동 추적을 위한 GA / Meta Analytics 세팅",
        ],
        results: [
          "신규 기능 개발 속도 향상",
          "운영 대응 효율 개선",
        ],
      },
      {
        title: "앱푸시 / 웹뷰 고도화",
        period: "2025.12 — 2026.03",
        bullets: [
          "FCM 토큰 등록·해제 및 중복 방지 로직 구성",
          "pending 토큰 저장·복구로 로그인 전·후 안정성 확보",
          "앱 버전·플랫폼·디바이스·UA 포함 등록 데이터 구성",
          "네이티브 브릿지 콜백 연동(토큰 수신·권한 변경)",
          "푸시 유입 Open 추적 및 실패 큐 재시도 구현",
          "앱 컨텍스트(platform/app_version) URL ↔ 세션 스토리지 동기화",
        ],
        results: [
          "푸시 수신·추적 안정성 향상",
          "앱/웹뷰 환경 분기 오류 감소",
        ],
      },
      {
        title: "강사 스케줄·배정 관리",
        period: "2025.12 — 2026.01",
        bullets: [
          "캘린더/리스트 탭 기반 스케줄 관리 UI 구현",
          "신청 가능/거절·취소 상태 필터, 날짜별 그룹핑, 무한 스크롤 적용",
          "일괄 스케줄 등록 및 중복 검증 처리",
          "문서/권한 체크 흐름 및 모달 기반 상세 UX 구성",
          "배정/신청 상태 연동 API 통합",
        ],
        results: [
          "강사 일정 관리 흐름 단순화",
          "대량 스케줄 등록·관리 시간 절감",
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
          "체험단 전용 API 연동을 위한 데이터 변환 로직 구성",
        ],
        results: [
          "체험단 신청 UX 안정화 및 오류 감소",
          "체험단 정책(1인 1회·무료·제한횟수) 준수율 개선",
        ],
      },
      {
        title: "타임딜(반짝 특가) 기능 개발",
        period: "2025.10 — 2025.11",
        bullets: [
          "타임딜 진입 경로(fromTimeDeal)에 따른 스케줄 필터링 및 복귀 라우팅 유지",
          "캘린더에 타임딜 날짜 마커·마감임박·품절 상태 표시 UI 구현",
          "스케줄 카드에 타임딜 배지 + 카운트다운 노출, 할인율/할인가 표시",
          "타임딜 전용 환불 안내 문구 분기",
          "운영자 화면에서 타임딜 후보 조회, 스케줄 단위 할인율 입력·검증·저장, 적용가 미리보기 구현",
        ],
        results: [
          "타임딜 운영 효율 개선(스케줄 단위 관리, 적용가 즉시 확인 가능)",
          "사용자 탐색·구매 흐름 개선(타임딜 일정·마감 상태 가시성 강화)",
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
    ],
  },
];
