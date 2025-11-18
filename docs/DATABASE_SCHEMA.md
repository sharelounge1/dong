# 데이터베이스 스키마 설계서

**프로젝트명**: 또리(TORI) - 현지 친구와 함께하는 여행 동행 플랫폼
**DB**: Supabase PostgreSQL
**버전**: 1.0
**최종 수정일**: 2025-01-18

---

## 1. ERD (Entity Relationship Diagram)

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     users       │       │companion_requests│       │  applications   │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │◀──┐   │ id (PK)         │◀──┐   │ id (PK)         │
│ email           │   │   │ requester_id(FK)│───┘   │ request_id (FK) │───┐
│ nickname        │   │   │ city            │       │ applicant_id(FK)│───┼──┐
│ profile_image   │   │   │ start_date      │       │ status          │   │  │
│ ...             │   │   │ end_date        │       │ ...             │   │  │
└────────┬────────┘   │   │ tip_amount      │       └─────────────────┘   │  │
         │            │   │ ...             │                             │  │
         │            │   └─────────────────┘                             │  │
         │            │                                                    │  │
         │            └────────────────────────────────────────────────────┘  │
         │                                                                    │
         │            ┌─────────────────┐       ┌─────────────────┐          │
         │            │    matches      │       │    reviews      │          │
         │            ├─────────────────┤       ├─────────────────┤          │
         │            │ id (PK)         │       │ id (PK)         │          │
         └────────────│ requester_id(FK)│       │ match_id (FK)   │──────────┼─┐
                      │ applicant_id(FK)│───────│ reviewer_id (FK)│          │ │
                      │ request_id (FK) │       │ reviewee_id (FK)│──────────┘ │
                      │ status          │       │ rating          │            │
                      │ ...             │       │ ...             │            │
                      └─────────────────┘       └─────────────────┘            │
                                                                               │
┌─────────────────┐   ┌─────────────────┐       ┌─────────────────┐           │
│  point_history  │   │   payments      │       │  notifications  │           │
├─────────────────┤   ├─────────────────┤       ├─────────────────┤           │
│ id (PK)         │   │ id (PK)         │       │ id (PK)         │           │
│ user_id (FK)    │───│ user_id (FK)    │───────│ user_id (FK)    │───────────┘
│ type            │   │ amount          │       │ type            │
│ amount          │   │ status          │       │ message         │
│ ...             │   │ ...             │       │ ...             │
└─────────────────┘   └─────────────────┘       └─────────────────┘
```

---

## 2. 테이블 상세 정의

### 2.1. users (사용자)

사용자 기본 정보 및 프로필을 저장하는 핵심 테이블

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- 인증 정보
    email VARCHAR(255) UNIQUE NOT NULL,
    auth_provider VARCHAR(50) NOT NULL,  -- 'kakao', 'line', 'google'
    auth_provider_id VARCHAR(255),

    -- 기본 프로필
    nickname VARCHAR(100) NOT NULL,
    profile_image_url TEXT,
    age INTEGER NOT NULL CHECK (age >= 18 AND age <= 100),
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female', 'other')),
    nationality VARCHAR(100) NOT NULL,
    residence_city VARCHAR(200) NOT NULL,

    -- 추가 프로필
    bio TEXT,
    additional_images TEXT[],  -- 추가 사진 URL 배열

    -- SNS 정보
    kakao_id VARCHAR(100),
    line_id VARCHAR(100),
    whatsapp_id VARCHAR(100),

    -- 포인트
    point_balance INTEGER DEFAULT 0 CHECK (point_balance >= 0),

    -- 패널티
    penalty_score INTEGER DEFAULT 0 CHECK (penalty_score >= 0),

    -- 상태
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'warned', 'suspended', 'deleted')),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),

    -- 설정
    preferred_language VARCHAR(10) DEFAULT 'ko' CHECK (preferred_language IN ('ko', 'ja', 'en')),
    push_enabled BOOLEAN DEFAULT true,
    line_notification_enabled BOOLEAN DEFAULT false,

    -- 메타데이터
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 인덱스
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_residence_city ON users(residence_city);
CREATE INDEX idx_users_nationality ON users(nationality);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_role ON users(role);
```

### 2.2. user_languages (사용자 언어)

사용자가 사용하는 언어 (다대다 관계)

```sql
CREATE TABLE user_languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL,  -- 'ko', 'ja', 'en', 'zh', etc.
    proficiency VARCHAR(20) DEFAULT 'native',  -- 'native', 'fluent', 'intermediate', 'basic'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(user_id, language_code)
);

CREATE INDEX idx_user_languages_user ON user_languages(user_id);
CREATE INDEX idx_user_languages_lang ON user_languages(language_code);
```

### 2.3. user_hobbies (사용자 취미/관심사)

```sql
CREATE TABLE user_hobbies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    hobby_tag VARCHAR(100) NOT NULL,  -- 'food', 'cafe', 'shopping', 'photo', 'nightlife', etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(user_id, hobby_tag)
);

CREATE INDEX idx_user_hobbies_user ON user_hobbies(user_id);
CREATE INDEX idx_user_hobbies_tag ON user_hobbies(hobby_tag);
```

### 2.4. companion_requests (동행 요청)

여행객이 등록하는 동행 요청글

```sql
CREATE TABLE companion_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- 여행 정보
    city VARCHAR(200) NOT NULL,
    specific_area VARCHAR(200),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    party_size INTEGER DEFAULT 1 CHECK (party_size >= 1 AND party_size <= 10),

    -- 원하는 동행자 조건
    preferred_age_min INTEGER CHECK (preferred_age_min >= 18),
    preferred_age_max INTEGER CHECK (preferred_age_max <= 100),
    preferred_gender VARCHAR(10) CHECK (preferred_gender IN ('male', 'female', 'any')),
    preferred_nationality VARCHAR(100),  -- NULL이면 상관없음

    -- 활동
    activities TEXT[] NOT NULL,  -- ['food', 'cafe', 'shopping', 'nightlife', 'photo']

    -- 금액
    tip_amount INTEGER NOT NULL CHECK (tip_amount >= 0),  -- 하루 팁 금액
    tip_currency VARCHAR(10) DEFAULT 'KRW',

    -- 추가 정보
    description TEXT,
    images TEXT[],  -- 여행 계획 이미지

    -- 공개 설정
    visible_to_travelers BOOLEAN DEFAULT false,  -- 여행객에게도 공개

    -- 상태
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'matching', 'matched', 'completed', 'cancelled', 'expired')),

    -- 메타데이터
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT valid_date_range CHECK (end_date >= start_date),
    CONSTRAINT valid_age_range CHECK (preferred_age_max >= preferred_age_min OR preferred_age_min IS NULL OR preferred_age_max IS NULL)
);

-- 인덱스
CREATE INDEX idx_requests_requester ON companion_requests(requester_id);
CREATE INDEX idx_requests_city ON companion_requests(city);
CREATE INDEX idx_requests_dates ON companion_requests(start_date, end_date);
CREATE INDEX idx_requests_status ON companion_requests(status);
CREATE INDEX idx_requests_search ON companion_requests(city, start_date, status);
```

### 2.5. request_languages (요청 언어 조건)

```sql
CREATE TABLE request_languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES companion_requests(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(request_id, language_code)
);

CREATE INDEX idx_request_languages_request ON request_languages(request_id);
```

### 2.6. applications (동행 신청)

현지인/여행객이 요청에 신청하는 정보

```sql
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES companion_requests(id) ON DELETE CASCADE,
    applicant_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- 신청 내용
    available_dates DATERANGE NOT NULL,  -- 가능한 날짜 범위
    available_activities TEXT[],
    introduction TEXT NOT NULL,

    -- 상태
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'profile_viewed', 'approved', 'rejected', 'cancelled', 'expired')),

    -- 프로필 열람 여부
    profile_viewed_at TIMESTAMP WITH TIME ZONE,
    profile_view_fee INTEGER,  -- 열람 시 차감된 포인트

    -- 승인 관련
    approved_at TIMESTAMP WITH TIME ZONE,
    approval_fee INTEGER,  -- 승인 시 차감된 포인트

    -- 거절 관련
    rejected_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,

    -- 승인 후 30분 로직
    approval_expires_at TIMESTAMP WITH TIME ZONE,  -- 승인 후 30분
    applicant_rejected_approval BOOLEAN DEFAULT false,  -- 신청자가 승인 거절

    -- 메타데이터
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(request_id, applicant_id)
);

-- 인덱스
CREATE INDEX idx_applications_request ON applications(request_id);
CREATE INDEX idx_applications_applicant ON applications(applicant_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_created ON applications(created_at DESC);
```

### 2.7. matches (매칭)

성사된 매칭 정보

```sql
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES companion_requests(id),
    application_id UUID NOT NULL REFERENCES applications(id),
    requester_id UUID NOT NULL REFERENCES users(id),
    applicant_id UUID NOT NULL REFERENCES users(id),

    -- 상태
    status VARCHAR(30) DEFAULT 'pending_confirmation' CHECK (status IN (
        'pending_confirmation',  -- 승인 후 30분 대기
        'confirmed',             -- 매칭 확정
        'meeting_in_progress',   -- 만남 진행 중
        'completed',             -- 만남 완료
        'no_show',               -- 노쇼
        'cancelled',             -- 취소됨
        'refunded'               -- 환불됨
    )),

    -- SNS 공개
    sns_revealed_at TIMESTAMP WITH TIME ZONE,
    requester_sns_type VARCHAR(20),  -- 'kakao', 'line', 'whatsapp'
    applicant_sns_type VARCHAR(20),

    -- 만남 진행 확인 로직
    meeting_confirmed_by_applicant_at TIMESTAMP WITH TIME ZONE,  -- 신청자가 '만남 진행됨' 클릭
    meeting_response_deadline TIMESTAMP WITH TIME ZONE,           -- 요청자 응답 기한 (30분)
    meeting_not_happened_claimed_at TIMESTAMP WITH TIME ZONE,     -- 요청자가 '안 만났음' 클릭

    -- 환불/패널티
    refund_amount INTEGER,
    refund_processed_at TIMESTAMP WITH TIME ZONE,
    penalty_applied BOOLEAN DEFAULT false,

    -- 메타데이터
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 인덱스
CREATE INDEX idx_matches_request ON matches(request_id);
CREATE INDEX idx_matches_requester ON matches(requester_id);
CREATE INDEX idx_matches_applicant ON matches(applicant_id);
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_matches_created ON matches(created_at DESC);
```

### 2.8. reviews (후기)

```sql
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID NOT NULL REFERENCES matches(id),
    reviewer_id UUID NOT NULL REFERENCES users(id),
    reviewee_id UUID NOT NULL REFERENCES users(id),

    -- 평점 및 내용
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content TEXT,

    -- 태그
    positive_tags TEXT[],  -- ['친절함', '시간약속준수', '재미있음']
    negative_tags TEXT[],

    -- 상태
    is_visible BOOLEAN DEFAULT true,
    is_reported BOOLEAN DEFAULT false,
    reported_at TIMESTAMP WITH TIME ZONE,
    report_reason TEXT,

    -- 관리자 처리
    admin_reviewed BOOLEAN DEFAULT false,
    admin_action VARCHAR(20),  -- 'approved', 'hidden', 'deleted'

    -- 메타데이터
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(match_id, reviewer_id)
);

-- 인덱스
CREATE INDEX idx_reviews_match ON reviews(match_id);
CREATE INDEX idx_reviews_reviewer ON reviews(reviewer_id);
CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
```

### 2.9. point_history (포인트 내역)

```sql
CREATE TABLE point_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- 유형
    type VARCHAR(30) NOT NULL CHECK (type IN (
        'charge',           -- 충전
        'profile_view',     -- 프로필 열람 비용
        'match_approval',   -- 매칭 승인 비용
        'refund',           -- 환불
        'withdrawal',       -- 출금
        'admin_adjustment', -- 관리자 조정
        'event_bonus'       -- 이벤트 보너스
    )),

    -- 금액
    amount INTEGER NOT NULL,  -- 양수: 충전/환불, 음수: 사용
    balance_after INTEGER NOT NULL,  -- 거래 후 잔액

    -- 관련 정보
    related_match_id UUID REFERENCES matches(id),
    related_application_id UUID REFERENCES applications(id),
    related_payment_id UUID,  -- payments 테이블 참조

    -- 설명
    description TEXT,

    -- 메타데이터
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_point_history_user ON point_history(user_id);
CREATE INDEX idx_point_history_type ON point_history(type);
CREATE INDEX idx_point_history_created ON point_history(created_at DESC);
```

### 2.10. payments (결제)

```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),

    -- 결제 정보
    payment_method VARCHAR(50) NOT NULL,  -- 'naver_pay', 'card', 'bank_transfer'
    amount INTEGER NOT NULL CHECK (amount > 0),
    currency VARCHAR(10) DEFAULT 'KRW',

    -- 포인트 환산
    point_amount INTEGER NOT NULL,

    -- PG 정보
    pg_provider VARCHAR(50),  -- 'naverpay'
    pg_transaction_id VARCHAR(255),

    -- 상태
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled', 'refunded')),

    -- 메타데이터
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    refunded_at TIMESTAMP WITH TIME ZONE,

    -- 에러 정보
    error_code VARCHAR(100),
    error_message TEXT
);

-- 인덱스
CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created ON payments(created_at DESC);
CREATE INDEX idx_payments_pg_tx ON payments(pg_transaction_id);
```

### 2.11. withdrawals (출금 요청)

```sql
CREATE TABLE withdrawals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),

    -- 출금 정보
    point_amount INTEGER NOT NULL CHECK (point_amount > 0),
    cash_amount INTEGER NOT NULL,  -- 수수료 차감 후 실제 지급액
    fee_amount INTEGER DEFAULT 0,

    -- 계좌 정보
    bank_name VARCHAR(100) NOT NULL,
    account_number VARCHAR(100) NOT NULL,
    account_holder VARCHAR(100) NOT NULL,

    -- 상태
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),

    -- 관리자 처리
    processed_by UUID REFERENCES users(id),
    processed_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,

    -- 메타데이터
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_withdrawals_user ON withdrawals(user_id);
CREATE INDEX idx_withdrawals_status ON withdrawals(status);
CREATE INDEX idx_withdrawals_created ON withdrawals(created_at DESC);
```

### 2.12. notifications (알림)

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- 알림 유형
    type VARCHAR(50) NOT NULL CHECK (type IN (
        'new_request',          -- 새 동행 요청
        'new_application',      -- 새 동행 신청
        'profile_viewed',       -- 프로필 열람됨
        'application_approved', -- 신청 승인됨
        'application_rejected', -- 신청 거절됨
        'match_confirmed',      -- 매칭 확정
        'meeting_confirmed',    -- 만남 진행 확인
        'meeting_not_happened', -- 안 만났음 신고
        'refund_processed',     -- 환불 처리됨
        'point_charged',        -- 포인트 충전됨
        'withdrawal_completed', -- 출금 완료
        'penalty_received',     -- 패널티 부과
        'system'                -- 시스템 공지
    )),

    -- 내용
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,

    -- 관련 링크
    link_type VARCHAR(50),  -- 'request', 'application', 'match', 'profile'
    link_id UUID,

    -- 상태
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,

    -- 푸시 전송
    push_sent BOOLEAN DEFAULT false,
    push_sent_at TIMESTAMP WITH TIME ZONE,

    -- 메타데이터
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);
```

### 2.13. reports (신고)

```sql
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES users(id),
    reported_user_id UUID REFERENCES users(id),
    reported_match_id UUID REFERENCES matches(id),

    -- 신고 유형
    type VARCHAR(50) NOT NULL CHECK (type IN (
        'sns_not_found',      -- SNS 추가 불가
        'no_response',        -- 연락 없음
        'no_show',            -- 노쇼
        'inappropriate',      -- 부적절한 행동
        'scam',               -- 사기
        'other'               -- 기타
    )),

    -- 내용
    description TEXT NOT NULL,
    evidence_images TEXT[],

    -- 상태
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved', 'dismissed')),

    -- 처리 결과
    resolution TEXT,
    resolved_by UUID REFERENCES users(id),
    resolved_at TIMESTAMP WITH TIME ZONE,

    -- 자동 환불 처리
    auto_refund_processed BOOLEAN DEFAULT false,
    refund_amount INTEGER,

    -- 메타데이터
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_reports_reporter ON reports(reporter_id);
CREATE INDEX idx_reports_reported_user ON reports(reported_user_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_type ON reports(type);
```

### 2.14. pricing_policies (과금 정책)

관리자가 설정하는 과금 정책

```sql
CREATE TABLE pricing_policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- 정책 유형
    type VARCHAR(50) NOT NULL CHECK (type IN ('profile_view', 'match_approval')),
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female', 'all')),

    -- 가격
    point_cost INTEGER NOT NULL CHECK (point_cost >= 0),

    -- 활성화
    is_active BOOLEAN DEFAULT true,

    -- 이벤트 할인
    discount_rate INTEGER DEFAULT 0 CHECK (discount_rate >= 0 AND discount_rate <= 100),
    discount_start_at TIMESTAMP WITH TIME ZONE,
    discount_end_at TIMESTAMP WITH TIME ZONE,

    -- 메타데이터
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES users(id)
);

-- 인덱스
CREATE INDEX idx_pricing_type_gender ON pricing_policies(type, gender);
CREATE INDEX idx_pricing_active ON pricing_policies(is_active);

-- 초기 데이터
INSERT INTO pricing_policies (type, gender, point_cost) VALUES
('profile_view', 'male', 100),
('profile_view', 'female', 50),
('match_approval', 'male', 500),
('match_approval', 'female', 300);
```

### 2.15. admin_logs (관리자 활동 로그)

```sql
CREATE TABLE admin_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES users(id),

    -- 활동 정보
    action VARCHAR(100) NOT NULL,
    target_type VARCHAR(50),  -- 'user', 'match', 'payment', 'report', etc.
    target_id UUID,

    -- 상세
    description TEXT,
    before_value JSONB,
    after_value JSONB,

    -- 메타데이터
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_admin_logs_admin ON admin_logs(admin_id);
CREATE INDEX idx_admin_logs_action ON admin_logs(action);
CREATE INDEX idx_admin_logs_created ON admin_logs(created_at DESC);
```

### 2.16. legal_documents (법적 문서/약관)

```sql
CREATE TABLE legal_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- 문서 유형
    type VARCHAR(50) NOT NULL CHECK (type IN (
        'terms_of_service',   -- 이용약관
        'privacy_policy',     -- 개인정보처리방침
        'refund_policy',      -- 환불정책
        'matching_agreement'  -- 매칭 동의서
    )),

    -- 언어
    language VARCHAR(10) NOT NULL CHECK (language IN ('ko', 'ja', 'en')),

    -- 내용
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,

    -- 버전
    version VARCHAR(20) NOT NULL,
    is_current BOOLEAN DEFAULT false,

    -- 메타데이터
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id)
);

-- 인덱스
CREATE INDEX idx_legal_docs_type_lang ON legal_documents(type, language);
CREATE INDEX idx_legal_docs_current ON legal_documents(is_current);
```

### 2.17. user_agreements (사용자 동의 기록)

```sql
CREATE TABLE user_agreements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    document_id UUID NOT NULL REFERENCES legal_documents(id),

    -- 동의 정보
    agreed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,

    UNIQUE(user_id, document_id)
);

-- 인덱스
CREATE INDEX idx_user_agreements_user ON user_agreements(user_id);
```

---

## 3. Row Level Security (RLS) 정책

### 3.1. users 테이블

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 자신의 프로필 조회
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (auth.uid() = id);

-- 공개 프로필 정보 조회 (제한된 컬럼)
CREATE POLICY "Users can view public profiles"
ON users FOR SELECT
USING (status = 'active');

-- 자신의 프로필 수정
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.uid() = id);
```

### 3.2. companion_requests 테이블

```sql
ALTER TABLE companion_requests ENABLE ROW LEVEL SECURITY;

-- 활성 요청 조회
CREATE POLICY "Anyone can view active requests"
ON companion_requests FOR SELECT
USING (status = 'active');

-- 자신의 요청 관리
CREATE POLICY "Users can manage own requests"
ON companion_requests FOR ALL
USING (auth.uid() = requester_id);
```

### 3.3. matches 테이블

```sql
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- 자신이 참여한 매칭만 조회
CREATE POLICY "Users can view own matches"
ON matches FOR SELECT
USING (auth.uid() = requester_id OR auth.uid() = applicant_id);
```

---

## 4. 트리거 및 함수

### 4.1. 포인트 잔액 자동 업데이트

```sql
CREATE OR REPLACE FUNCTION update_point_balance()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users
    SET point_balance = NEW.balance_after,
        updated_at = NOW()
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_point_balance
AFTER INSERT ON point_history
FOR EACH ROW EXECUTE FUNCTION update_point_balance();
```

### 4.2. 매칭 상태 변경 시 알림 생성

```sql
CREATE OR REPLACE FUNCTION notify_match_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status != OLD.status THEN
        -- 알림 생성 로직
        INSERT INTO notifications (user_id, type, title, message, link_type, link_id)
        VALUES (
            CASE
                WHEN NEW.status = 'confirmed' THEN NEW.applicant_id
                ELSE NEW.requester_id
            END,
            CASE NEW.status
                WHEN 'confirmed' THEN 'match_confirmed'
                WHEN 'completed' THEN 'meeting_confirmed'
                ELSE 'system'
            END,
            '매칭 상태 변경',
            '매칭 상태가 변경되었습니다.',
            'match',
            NEW.id
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_match_notification
AFTER UPDATE ON matches
FOR EACH ROW EXECUTE FUNCTION notify_match_status_change();
```

### 4.3. updated_at 자동 갱신

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 각 테이블에 트리거 적용
CREATE TRIGGER trigger_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_requests_updated_at
BEFORE UPDATE ON companion_requests
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_applications_updated_at
BEFORE UPDATE ON applications
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_matches_updated_at
BEFORE UPDATE ON matches
FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

## 5. 뷰 (Views)

### 5.1. 사용자 통계 뷰

```sql
CREATE VIEW user_statistics AS
SELECT
    u.id,
    u.nickname,
    u.point_balance,
    u.penalty_score,
    COUNT(DISTINCT cr.id) as total_requests,
    COUNT(DISTINCT a.id) as total_applications,
    COUNT(DISTINCT m.id) as total_matches,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(r.id) as review_count
FROM users u
LEFT JOIN companion_requests cr ON u.id = cr.requester_id
LEFT JOIN applications a ON u.id = a.applicant_id
LEFT JOIN matches m ON u.id = m.requester_id OR u.id = m.applicant_id
LEFT JOIN reviews r ON u.id = r.reviewee_id
GROUP BY u.id, u.nickname, u.point_balance, u.penalty_score;
```

### 5.2. 활성 요청 상세 뷰

```sql
CREATE VIEW active_requests_detail AS
SELECT
    cr.*,
    u.nickname as requester_nickname,
    u.age as requester_age,
    u.gender as requester_gender,
    u.profile_image_url as requester_image,
    COUNT(a.id) as application_count,
    array_agg(DISTINCT rl.language_code) as required_languages
FROM companion_requests cr
JOIN users u ON cr.requester_id = u.id
LEFT JOIN applications a ON cr.id = a.request_id
LEFT JOIN request_languages rl ON cr.id = rl.request_id
WHERE cr.status = 'active'
GROUP BY cr.id, u.nickname, u.age, u.gender, u.profile_image_url;
```

---

## 6. 데이터 마이그레이션 계획

### 6.1. 초기 데이터

```sql
-- 관리자 계정 생성
INSERT INTO users (email, auth_provider, nickname, age, gender, nationality, residence_city, role)
VALUES ('admin@tori-app.com', 'email', '관리자', 30, 'other', 'Korea', 'Seoul', 'super_admin');

-- 기본 과금 정책 설정
INSERT INTO pricing_policies (type, gender, point_cost) VALUES
('profile_view', 'male', 100),
('profile_view', 'female', 50),
('match_approval', 'male', 500),
('match_approval', 'female', 300);

-- 기본 약관 등록
INSERT INTO legal_documents (type, language, title, content, version, is_current)
VALUES
('terms_of_service', 'ko', '이용약관', '...', '1.0', true),
('privacy_policy', 'ko', '개인정보처리방침', '...', '1.0', true),
('refund_policy', 'ko', '환불정책', '...', '1.0', true);
```

### 6.2. 버전 업그레이드 전략

- Prisma migrate를 사용한 스키마 버전 관리
- 무중단 배포를 위한 backward compatible 변경
- 데이터 백업 후 마이그레이션 실행

---

## 7. 백업 및 복구

### 7.1. Supabase 자동 백업

- 일일 자동 백업 (7일 보관)
- Point-in-Time Recovery 지원

### 7.2. 수동 백업

```bash
# pg_dump를 이용한 수동 백업
pg_dump -h db.xxx.supabase.co -U postgres -d postgres > backup_$(date +%Y%m%d).sql
```

---

**문서 작성일**: 2025-01-18
**작성자**: Claude AI
**검토 필요**: DBA, Backend 개발자
