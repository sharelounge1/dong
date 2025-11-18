# 기술 아키텍처 문서

**프로젝트명**: 또리(TORI) - 현지 친구와 함께하는 여행 동행 플랫폼
**버전**: 1.0
**최종 수정일**: 2025-01-18

---

## 1. 시스템 아키텍처 개요

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Client Layer                                  │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │   Web App    │  │  iOS App     │  │ Android App  │               │
│  │   (React)    │  │  (Capacitor) │  │ (Capacitor)  │               │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘               │
│         │                 │                 │                        │
│         └─────────────────┼─────────────────┘                        │
│                           ▼                                          │
└───────────────────────────┼──────────────────────────────────────────┘
                            │ HTTPS
┌───────────────────────────┼──────────────────────────────────────────┐
│                    Application Layer                                  │
├───────────────────────────┼──────────────────────────────────────────┤
│                           ▼                                          │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │              Render.com Web Service                          │    │
│  │  ┌────────────────┐  ┌─────────────────┐  ┌──────────────┐  │    │
│  │  │  Express.js    │  │  API Gateway    │  │  Middleware  │  │    │
│  │  │  Server        │  │  (REST API)     │  │  (Auth/CORS) │  │    │
│  │  └────────────────┘  └─────────────────┘  └──────────────┘  │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                           │                                          │
└───────────────────────────┼──────────────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────────────┐
│                      Data Layer                                       │
├───────────────────────────┼──────────────────────────────────────────┤
│                           ▼                                          │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                     Supabase                                  │    │
│  │  ┌────────────┐  ┌─────────────┐  ┌───────────┐  ┌────────┐  │    │
│  │  │ PostgreSQL │  │  Auth       │  │  Storage  │  │ Edge   │  │    │
│  │  │ Database   │  │  (JWT)      │  │  (Files)  │  │ Func   │  │    │
│  │  └────────────┘  └─────────────┘  └───────────┘  └────────┘  │    │
│  │  ┌────────────┐  ┌─────────────┐                              │    │
│  │  │ Realtime   │  │  Row Level  │                              │    │
│  │  │ (WebSocket)│  │  Security   │                              │    │
│  │  └────────────┘  └─────────────┘                              │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────────────┐
│                   External Services                                   │
├───────────────────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐      │
│  │ NaverPay   │  │   FCM      │  │  LINE      │  │ Google     │      │
│  │ (Payment)  │  │  (Push)    │  │ Messaging  │  │ OAuth      │      │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘      │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                      │
│  │ Kakao      │  │  SendGrid  │  │ Cloudflare │                      │
│  │ OAuth      │  │  (Email)   │  │  (CDN)     │                      │
│  └────────────┘  └────────────┘  └────────────┘                      │
└───────────────────────────────────────────────────────────────────────┘
```

---

## 2. 기술 스택 상세

### 2.1. Frontend (클라이언트)

| 분류 | 기술 | 버전 | 용도 |
|------|------|------|------|
| Framework | React | 18.x | UI 프레임워크 |
| Language | TypeScript | 5.x | 타입 안정성 |
| Build Tool | Vite | 5.x | 빌드 및 개발 서버 |
| State | Zustand | 4.x | 전역 상태 관리 |
| Router | React Router | 6.x | SPA 라우팅 |
| Style | Tailwind CSS | 3.x | 유틸리티 기반 스타일링 |
| UI Components | Radix UI | Latest | 접근성 기반 UI 컴포넌트 |
| HTTP Client | Axios | 1.x | API 통신 |
| Form | React Hook Form | 7.x | 폼 상태 관리 |
| Validation | Zod | 3.x | 스키마 검증 |
| i18n | i18next | 23.x | 다국어 지원 |
| Mobile | Capacitor | 5.x | 네이티브 앱 패키징 |

### 2.2. Backend (서버)

| 분류 | 기술 | 버전 | 용도 |
|------|------|------|------|
| Runtime | Node.js | 20.x LTS | 서버 런타임 |
| Framework | Express.js | 4.x | REST API 서버 |
| Language | TypeScript | 5.x | 타입 안정성 |
| ORM | Prisma | 5.x | 데이터베이스 ORM |
| Auth | JWT | - | 인증 토큰 |
| Validation | Zod | 3.x | 요청 데이터 검증 |
| Logging | Winston | 3.x | 로깅 |
| Testing | Jest | 29.x | 단위/통합 테스트 |

### 2.3. Database & Infrastructure

| 분류 | 서비스 | 용도 |
|------|--------|------|
| Database | Supabase PostgreSQL | 메인 데이터베이스 |
| Auth | Supabase Auth | 사용자 인증 (OAuth) |
| Storage | Supabase Storage | 이미지/파일 저장 |
| Realtime | Supabase Realtime | 실시간 알림 |
| Hosting | Render.com | 웹 서버 호스팅 |
| CDN | Cloudflare | 정적 자산 캐싱 |

### 2.4. External Services

| 서비스 | 용도 |
|--------|------|
| 네이버페이 | 결제 처리 |
| Firebase Cloud Messaging | 푸시 알림 |
| LINE Messaging API | LINE 알림 |
| Kakao Login | 소셜 로그인 |
| Google OAuth | 소셜 로그인 |
| SendGrid | 이메일 발송 |

---

## 3. 배포 환경 구성

### 3.1. Render.com 구성

```yaml
# render.yaml
services:
  - type: web
    name: tori-api
    env: node
    region: singapore  # 아시아 지역 최적화
    plan: starter
    buildCommand: npm install && npm run build
    startCommand: npm run start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: tori-db
          property: connectionString
      - key: SUPABASE_URL
        sync: false
      - key: SUPABASE_SERVICE_KEY
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: NAVER_PAY_CLIENT_ID
        sync: false
      - key: NAVER_PAY_CLIENT_SECRET
        sync: false
    healthCheckPath: /health
    autoDeploy: true
```

### 3.2. Supabase 프로젝트 설정

```sql
-- Supabase 프로젝트 초기 설정

-- Extensions 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- 텍스트 검색용

-- Storage Buckets 생성
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('profile-images', 'profile-images', true),
  ('request-images', 'request-images', true),
  ('admin-assets', 'admin-assets', false);

-- Row Level Security 정책 예시
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

### 3.3. 환경별 구성

| 환경 | 용도 | URL 패턴 |
|------|------|----------|
| Development | 로컬 개발 | localhost:3000 |
| Staging | 테스트/QA | staging.tori-app.com |
| Production | 운영 | www.tori-app.com |

---

## 4. 보안 아키텍처

### 4.1. 인증 흐름

```
┌─────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Client  │────▶│ Supabase │────▶│  OAuth   │────▶│ Provider │
│         │◀────│   Auth   │◀────│ Callback │◀────│ (Kakao)  │
└─────────┘     └──────────┘     └──────────┘     └──────────┘
     │                                    │
     │         JWT Token                  │
     ◀────────────────────────────────────┘
     │
     ▼
┌─────────┐     ┌──────────┐
│ Client  │────▶│  API     │  Authorization: Bearer {token}
│         │◀────│ Server   │
└─────────┘     └──────────┘
```

### 4.2. 보안 정책

#### 인증 (Authentication)
- OAuth 2.0 기반 소셜 로그인 (Kakao, LINE, Google)
- JWT 토큰 기반 세션 관리
- Access Token: 1시간 만료
- Refresh Token: 7일 만료
- Secure HTTP-only Cookie 사용

#### 인가 (Authorization)
- Role-based Access Control (RBAC)
  - User: 일반 사용자
  - Admin: 관리자
  - Super Admin: 최고 관리자
- Row Level Security (RLS) 적용

#### 데이터 보호
- HTTPS/TLS 1.3 암호화 통신
- 민감 정보 AES-256 암호화 저장
- 개인정보 마스킹 처리
- SQL Injection 방지 (Prepared Statement)
- XSS 방지 (Content Security Policy)

### 4.3. API 보안

```typescript
// Rate Limiting 설정
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // IP당 최대 요청
  message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.'
});

// CORS 설정
const corsOptions = {
  origin: [
    'https://www.tori-app.com',
    'https://staging.tori-app.com'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
```

---

## 5. 성능 최적화 전략

### 5.1. Frontend 최적화

| 전략 | 구현 방법 |
|------|-----------|
| Code Splitting | React.lazy + Suspense |
| Image Optimization | WebP 변환 + lazy loading |
| Bundle Size | Tree shaking + 동적 import |
| Caching | Service Worker + Cache API |
| State | Zustand selector로 불필요한 리렌더링 방지 |

### 5.2. Backend 최적화

| 전략 | 구현 방법 |
|------|-----------|
| Database Query | 인덱싱 + Query 최적화 |
| Caching | Redis 캐시 (자주 조회되는 데이터) |
| Connection Pool | Prisma connection pooling |
| Response | gzip 압축 |
| CDN | Cloudflare 정적 자산 캐싱 |

### 5.3. Database 인덱싱 전략

```sql
-- 자주 조회되는 컬럼 인덱싱
CREATE INDEX idx_users_location ON users(residence_city);
CREATE INDEX idx_requests_city_date ON companion_requests(city, start_date);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_matches_created ON matches(created_at DESC);

-- 복합 인덱스
CREATE INDEX idx_requests_search ON companion_requests(city, start_date, status);
```

---

## 6. 확장성 고려사항

### 6.1. 수평적 확장

- Render.com Auto-scaling 활용
- Stateless 서버 설계
- 세션 정보 외부 저장 (Supabase)

### 6.2. 데이터베이스 확장

- Supabase Connection Pooling (PgBouncer)
- Read Replica 고려 (트래픽 증가 시)
- 파티셔닝 전략 (날짜 기반 데이터)

### 6.3. 마이크로서비스 전환 준비

현재는 모놀리식이나, 추후 다음과 같이 분리 가능:
- Auth Service
- User Service
- Matching Service
- Payment Service
- Notification Service

---

## 7. 모니터링 & 로깅

### 7.1. 모니터링 스택

| 도구 | 용도 |
|------|------|
| Render Metrics | 서버 리소스 모니터링 |
| Supabase Dashboard | DB 성능 모니터링 |
| Sentry | 에러 트래킹 |
| Google Analytics | 사용자 행동 분석 |

### 7.2. 로깅 전략

```typescript
// Winston 로거 설정
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'tori-api' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// 로그 레벨 정의
// ERROR: 시스템 오류, 결제 실패
// WARN: 잠재적 문제, 환불 요청
// INFO: 주요 이벤트 (로그인, 매칭 성사)
// DEBUG: 개발용 상세 정보
```

### 7.3. 알림 설정

| 이벤트 | 알림 채널 | 담당자 |
|--------|-----------|--------|
| 서버 다운 | Slack + Email | DevOps |
| 결제 오류 | Slack | Backend |
| 에러율 급증 | Slack | All Dev |
| DB 용량 경고 | Email | DBA |

---

## 8. 개발 환경 설정

### 8.1. 프로젝트 구조

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
│   ├── public/
│   └── package.json
│
├── server/                    # Backend (Express)
│   ├── src/
│   │   ├── controllers/      # 라우트 컨트롤러
│   │   ├── services/         # 비즈니스 로직
│   │   ├── repositories/     # 데이터 액세스
│   │   ├── middlewares/      # Express 미들웨어
│   │   ├── utils/            # 유틸리티
│   │   ├── types/            # TypeScript 타입
│   │   └── config/           # 설정 파일
│   ├── prisma/
│   │   └── schema.prisma     # DB 스키마
│   └── package.json
│
├── docs/                      # 문서
├── scripts/                   # 빌드/배포 스크립트
└── docker-compose.yml         # 로컬 개발 환경
```

### 8.2. 개발 명령어

```bash
# 클라이언트
cd client
npm install
npm run dev          # 개발 서버 (localhost:5173)
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 미리보기

# 서버
cd server
npm install
npm run dev          # 개발 서버 (localhost:3000)
npm run build        # TypeScript 컴파일
npm run start        # 프로덕션 실행
npm run prisma:migrate  # DB 마이그레이션
npm run prisma:generate # Prisma Client 생성

# 전체
npm run dev:all      # 클라이언트 + 서버 동시 실행
npm run test         # 전체 테스트
npm run lint         # 린트 검사
```

### 8.3. 환경 변수

```env
# client/.env
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
VITE_GOOGLE_CLIENT_ID=xxx
VITE_KAKAO_APP_KEY=xxx

# server/.env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=xxx
JWT_SECRET=xxx
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d
NAVER_PAY_CLIENT_ID=xxx
NAVER_PAY_CLIENT_SECRET=xxx
FCM_SERVER_KEY=xxx
SENDGRID_API_KEY=xxx
```

---

## 9. 배포 파이프라인

### 9.1. CI/CD 흐름

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  GitHub  │────▶│  GitHub  │────▶│  Build   │────▶│  Deploy  │
│   Push   │     │  Actions │     │  & Test  │     │ (Render) │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
                       │
                       ▼
                 ┌──────────┐
                 │ Supabase │
                 │Migration │
                 └──────────┘
```

### 9.2. GitHub Actions 워크플로우

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test
      - run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v0.0.8
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

---

## 10. 재해 복구 계획

### 10.1. 백업 전략

| 대상 | 주기 | 보관 기간 | 방법 |
|------|------|-----------|------|
| Database | 매일 | 30일 | Supabase 자동 백업 |
| Storage | 실시간 | 무제한 | Supabase Storage |
| 로그 | 매일 | 90일 | S3 아카이브 |

### 10.2. 복구 절차

1. **서비스 장애 시**
   - Render.com 자동 재시작
   - Health check 실패 시 알림

2. **데이터 손실 시**
   - Supabase Point-in-Time Recovery
   - 최대 7일 전 상태로 복구 가능

3. **전체 재해 시**
   - 백업 데이터로 새 Supabase 프로젝트 생성
   - 환경 변수 재설정
   - DNS 전환

---

## 11. 향후 확장 계획

### Phase 1 (MVP)
- 기본 매칭 기능
- 포인트 결제
- 3개국어 지원

### Phase 2
- 실시간 채팅 (Supabase Realtime)
- 리뷰 시스템 고도화
- 추천 알고리즘

### Phase 3
- AI 기반 매칭 추천
- 다국어 자동 번역
- 글로벌 결제 (Stripe)

---

**문서 작성일**: 2025-01-18
**작성자**: Claude AI
**검토 필요**: 인프라팀, 보안팀
