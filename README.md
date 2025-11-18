# TORI (또리) - 현지 친구와 함께하는 여행 동행 플랫폼

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com/)
[![Render](https://img.shields.io/badge/Render-Deploy-46E3B7?logo=render)](https://render.com/)

---

## 프로젝트 개요

- **목적**: 여행객과 현지 친구를 연결하는 프리미엄 동행 매칭 플랫폼
- **사용자**: 해외 여행객, 현지 거주자
- **환경**: 웹 (모바일 최적화) → 앱 패키징 (Capacitor)
- **지원 언어**: 한국어, 일본어, 영어

---

## 핵심 기능

### 여행객 (동행 요청자)
- 동행 요청글 등록 (여행지, 일정, 조건, 팁 금액)
- 신청자 리스트 확인 및 상세 프로필 열람 (과금)
- 동행 승인 (과금) 및 SNS 연락처 교환
- 만남 확인 및 후기 작성

### 현지 친구 (동행 신청자)
- 동행 요청 검색 및 필터링
- 동행 신청서 작성
- 승인 알림 수신 및 SNS 연락처 확인
- 만남 진행 확인 및 후기 작성

### 결제/포인트 시스템
- 포인트 충전 (네이버페이)
- 프로필 열람 / 매칭 승인 시 과금
- 환불 정책 (노쇼, SNS 불가 등)
- 포인트 출금 요청

### 관리자 기능
- 회원 관리 (상태, 패널티)
- 과금 정책 설정 (성별별 차등)
- 결제/정산 관리
- 신고 처리

---

## 기술 스택

### Frontend
- **Framework**: React 18 + TypeScript
- **Build**: Vite 5
- **Style**: Tailwind CSS 3 + Radix UI
- **State**: Zustand
- **Router**: React Router 6
- **Form**: React Hook Form + Zod
- **i18n**: i18next
- **Mobile**: Capacitor 5

### Backend
- **Runtime**: Node.js 20 LTS
- **Framework**: Express.js 4
- **ORM**: Prisma 5
- **Auth**: JWT + Supabase Auth

### Infrastructure
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage
- **Realtime**: Supabase Realtime
- **Hosting**: Render.com
- **CDN**: Cloudflare

### External Services
- 네이버페이 (결제)
- Firebase Cloud Messaging (푸시)
- Kakao/LINE/Google OAuth (로그인)

---

## 프로젝트 구조

```
tori-app/
├── client/                    # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # 공통 UI 컴포넌트
│   │   │   ├── common/       # 공통 비즈니스 컴포넌트
│   │   │   ├── screens/      # 화면 컴포넌트
│   │   │   └── layout/       # 레이아웃 컴포넌트
│   │   ├── stores/           # Zustand 스토어
│   │   ├── hooks/            # 커스텀 훅
│   │   ├── services/         # API 서비스
│   │   ├── types/            # TypeScript 타입
│   │   ├── utils/            # 유틸리티 함수
│   │   ├── i18n/             # 다국어 리소스
│   │   └── assets/           # 정적 자산
│   └── package.json
│
├── server/                    # Backend (Express)
│   ├── src/
│   │   ├── controllers/      # 라우트 컨트롤러
│   │   ├── services/         # 비즈니스 로직
│   │   ├── repositories/     # 데이터 액세스
│   │   ├── middlewares/      # Express 미들웨어
│   │   └── config/           # 설정 파일
│   ├── prisma/
│   │   └── schema.prisma     # DB 스키마
│   └── package.json
│
├── docs/                      # 프로젝트 문서
│   ├── ARCHITECTURE.md       # 기술 아키텍처
│   ├── DATABASE_SCHEMA.md    # DB 스키마 설계
│   ├── INFORMATION_ARCHITECTURE.md  # 정보구조도
│   ├── SCREEN_SPECIFICATIONS.md     # 화면명세서
│   ├── API_SPECIFICATION.md  # API 명세서
│   └── DESIGN_SYSTEM.md      # 디자인 시스템
│
└── scripts/                   # 빌드/배포 스크립트
```

---

## 개발 가이드

### 시작하기

```bash
# 저장소 클론
git clone https://github.com/your-org/tori-app.git
cd tori-app

# 클라이언트 설정
cd client
npm install
cp .env.example .env.local
npm run dev

# 서버 설정 (새 터미널)
cd server
npm install
cp .env.example .env
npm run prisma:generate
npm run dev
```

### 환경 변수

#### Client (.env.local)
```env
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
VITE_KAKAO_APP_KEY=xxx
```

#### Server (.env)
```env
DATABASE_URL=postgresql://...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=xxx
JWT_SECRET=xxx
NAVER_PAY_CLIENT_ID=xxx
```

### 주요 명령어

```bash
# 클라이언트
npm run dev          # 개발 서버 (localhost:5173)
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 미리보기
npm run lint         # 린트 검사

# 서버
npm run dev          # 개발 서버 (localhost:3000)
npm run build        # TypeScript 컴파일
npm run start        # 프로덕션 실행
npm run prisma:migrate  # DB 마이그레이션
npm run prisma:studio   # Prisma Studio

# 테스트
npm run test         # 단위 테스트
npm run test:e2e     # E2E 테스트
```

---

## 문서

| 문서 | 설명 |
|------|------|
| [기술 아키텍처](./docs/ARCHITECTURE.md) | 시스템 구조, 배포 환경, 보안 정책 |
| [DB 스키마](./docs/DATABASE_SCHEMA.md) | 테이블 정의, ERD, RLS 정책 |
| [정보구조도](./docs/INFORMATION_ARCHITECTURE.md) | 사이트맵, 네비게이션, 화면 흐름 |
| [화면명세서](./docs/SCREEN_SPECIFICATIONS.md) | 화면별 UI/UX, 기능, 프로세스 |
| [API 명세서](./docs/API_SPECIFICATION.md) | 엔드포인트, 요청/응답 스펙 |
| [디자인 시스템](./docs/DESIGN_SYSTEM.md) | 컬러, 타이포, 컴포넌트 |

---

## 주요 화면

### 사용자 흐름

1. **회원가입**: SNS 로그인 → 프로필 입력 → 약관 동의
2. **동행 요청**: 여행지/일정 입력 → 조건 설정 → 팁 금액 → 등록
3. **동행 신청**: 요청 검색 → 상세 확인 → 신청서 작성
4. **매칭**: 신청자 리스트 → 프로필 열람 (과금) → 승인 (과금)
5. **만남**: SNS 연락 → 만남 진행 → 30분 확인 → 후기 작성

### 핵심 비즈니스 로직

- **과금 시점**: 상세 프로필 열람, 동행 승인
- **환불 정책**: 노쇼 50%, SNS 불가 100%, 30분 무응답 100%
- **패널티 시스템**: 노쇼/무단취소 시 패널티 점수 부과

---

## 배포

### Render.com 배포

```yaml
# render.yaml
services:
  - type: web
    name: tori-api
    env: node
    region: singapore
    buildCommand: npm install && npm run build
    startCommand: npm run start
```

### CI/CD

- GitHub Actions를 통한 자동 배포
- main 브랜치 push 시 테스트 → 빌드 → 배포

---

## 컨트리뷰션

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 코드
chore: 빌드, 설정 변경
```

---

## 라이선스

This project is proprietary and confidential.

---

## 연락처

- **프로젝트 문의**: contact@tori-app.com
- **기술 지원**: dev@tori-app.com

---

**마지막 업데이트**: 2025-01-18
