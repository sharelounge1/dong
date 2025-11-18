# 정보구조도 (Information Architecture)

**프로젝트명**: 또리(TORI) - 현지 친구와 함께하는 여행 동행 플랫폼
**버전**: 1.0
**최종 수정일**: 2025-01-18

---

## 1. 개요

이 문서는 또리 서비스의 전체 화면 구조와 네비게이션 경로를 정의합니다.
웹 우선 개발 후 Capacitor를 통해 iOS/Android 앱으로 패키징됩니다.

---

## 2. 사용자 유형별 접근 권한

| 화면 영역 | 비회원 | 일반 사용자 | 관리자 |
|-----------|--------|-------------|--------|
| 온보딩/인증 | O | - | - |
| 메인 홈 | X | O | O |
| 동행 요청 | X | O | O |
| 동행 신청 | X | O | O |
| 매칭 관리 | X | O | O |
| 포인트/결제 | X | O | O |
| 마이페이지 | X | O | O |
| 관리자 | X | X | O |

---

## 3. 전체 사이트맵

```
또리(TORI)
│
├── 🔐 인증 (Authentication) - /auth
│   ├── 스플래시 (/) - SplashScreen
│   ├── 온보딩 (/onboarding) - OnboardingScreen
│   ├── 로그인 (/login) - LoginScreen
│   ├── 회원가입 (/signup) - SignupScreen
│   │   ├── 기본 정보 입력 (/signup/basic) - SignupBasicScreen
│   │   ├── 프로필 설정 (/signup/profile) - SignupProfileScreen
│   │   └── SNS 연동 (/signup/sns) - SignupSnsScreen
│   └── 약관 동의 (/terms) - TermsAgreementScreen
│
├── 🏠 메인 (Main) - /
│   ├── 홈 (/) - HomeScreen
│   └── 언어 선택 팝업 - LanguageSelectModal
│
├── 📝 동행 요청 (Companion Request) - /request
│   ├── 요청글 작성 (/new) - RequestCreateScreen
│   │   ├── 1단계: 여행지/일정 - RequestStep1Screen
│   │   ├── 2단계: 희망 조건 - RequestStep2Screen
│   │   ├── 3단계: 활동/팁 - RequestStep3Screen
│   │   └── 4단계: 추가 정보 - RequestStep4Screen
│   ├── 내 요청글 목록 (/my) - MyRequestsScreen
│   ├── 요청글 상세 (/:requestId) - RequestDetailScreen
│   ├── 요청글 수정 (/:requestId/edit) - RequestEditScreen
│   └── 신청자 관리 (/:requestId/applicants) - ApplicantsScreen
│       ├── 신청자 리스트 (/) - ApplicantListScreen
│       └── 신청자 상세 (/:applicantId) - ApplicantDetailScreen
│
├── 🙋 동행 신청 (Application) - /apply
│   ├── 동행 요청 리스트 (/) - RequestListScreen
│   ├── 요청글 상세 보기 (/:requestId) - RequestViewScreen
│   ├── 동행 신청 폼 (/:requestId/apply) - ApplicationFormScreen
│   └── 내 신청 목록 (/my) - MyApplicationsScreen
│
├── 🤝 매칭 (Matching) - /match
│   ├── 매칭 목록 (/) - MatchListScreen
│   ├── 매칭 상세 (/:matchId) - MatchDetailScreen
│   │   ├── SNS 연락처 - SnsContactSection
│   │   ├── 만남 진행 확인 - MeetingConfirmSection
│   │   └── 환불/신고 - RefundReportSection
│   ├── 후기 작성 (/:matchId/review) - ReviewCreateScreen
│   └── 후기 목록 (/reviews) - ReviewListScreen
│
├── 💰 포인트 & 결제 (Point & Payment) - /point
│   ├── 포인트 현황 (/) - PointDashboardScreen
│   ├── 포인트 충전 (/charge) - PointChargeScreen
│   │   ├── 충전 금액 선택 - ChargeAmountScreen
│   │   └── 결제 진행 - PaymentProcessScreen
│   ├── 포인트 내역 (/history) - PointHistoryScreen
│   └── 출금 요청 (/withdraw) - WithdrawScreen
│       ├── 출금 신청 (/new) - WithdrawRequestScreen
│       └── 출금 내역 (/history) - WithdrawHistoryScreen
│
├── 🔔 알림 (Notification) - /notification
│   └── 알림 센터 (/) - NotificationCenterScreen
│
├── 👤 마이페이지 (My Page) - /mypage
│   ├── 마이페이지 메인 (/) - MyPageScreen
│   ├── 프로필 수정 (/profile) - ProfileEditScreen
│   │   ├── 기본 정보 수정 - BasicInfoEditSection
│   │   ├── 사진 관리 - PhotoManageSection
│   │   ├── SNS 정보 수정 - SnsInfoEditSection
│   │   └── 취미/관심사 수정 - HobbyEditSection
│   ├── 받은 후기 (/reviews) - ReceivedReviewsScreen
│   ├── 패널티 현황 (/penalty) - PenaltyStatusScreen
│   └── 설정 (/settings) - SettingsScreen
│       ├── 알림 설정 (/notification) - NotificationSettingsScreen
│       ├── 언어 설정 (/language) - LanguageSettingsScreen
│       ├── 계정 관리 (/account) - AccountSettingsScreen
│       └── 로그아웃/탈퇴 - LogoutWithdrawSection
│
├── 📄 약관/정책 (Legal) - /legal
│   ├── 이용약관 (/terms) - TermsOfServiceScreen
│   ├── 개인정보처리방침 (/privacy) - PrivacyPolicyScreen
│   └── 환불정책 (/refund) - RefundPolicyScreen
│
└── ⚙️ 관리자 (Admin) - /admin
    ├── 대시보드 (/) - AdminDashboardScreen
    ├── 회원 관리 (/users) - AdminUsersScreen
    │   ├── 회원 목록 (/) - UserListScreen
    │   └── 회원 상세 (/:userId) - UserDetailScreen
    ├── 매칭 관리 (/matches) - AdminMatchesScreen
    ├── 결제/정산 (/payments) - AdminPaymentsScreen
    │   ├── 결제 내역 (/transactions) - PaymentTransactionsScreen
    │   └── 출금 관리 (/withdrawals) - WithdrawalManageScreen
    ├── 신고 관리 (/reports) - AdminReportsScreen
    ├── 후기 관리 (/reviews) - AdminReviewsScreen
    ├── 과금 정책 (/pricing) - AdminPricingScreen
    └── 약관 관리 (/legal) - AdminLegalScreen
```

---

## 4. 네비게이션 구조

### 4.1. 하단 탭 네비게이션 (Bottom Tab)

```
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│   홈    │  요청   │  신청   │  매칭   │ 마이    │
│  Home   │ Request │  Apply  │  Match  │  Page   │
└─────────┴─────────┴─────────┴─────────┴─────────┘
```

| 탭 | 아이콘 | 라우트 | 설명 |
|----|--------|--------|------|
| 홈 | 🏠 | / | 메인 홈 화면 |
| 요청 | 📝 | /request/my | 내 동행 요청 관리 |
| 신청 | 🙋 | /apply | 동행 요청 리스트 |
| 매칭 | 🤝 | /match | 매칭 목록 |
| 마이 | 👤 | /mypage | 마이페이지 |

### 4.2. 상단 헤더 구성

```
┌─────────────────────────────────────────┐
│ ◀ [페이지 제목]              🔔  🌐  │
└─────────────────────────────────────────┘
```

- **◀**: 뒤로가기 (스택 네비게이션)
- **🔔**: 알림 센터
- **🌐**: 언어 선택

---

## 5. 화면별 상세 설명

### 5.1. 인증 영역

#### SplashScreen
- **경로**: `/`
- **목적**: 앱 초기 로딩 및 인증 상태 확인
- **다음 화면**: 로그인 여부에 따라 LoginScreen 또는 HomeScreen

#### OnboardingScreen
- **경로**: `/auth/onboarding`
- **목적**: 최초 사용자 서비스 소개 (3~4장 슬라이드)
- **다음 화면**: LoginScreen

#### LoginScreen
- **경로**: `/auth/login`
- **목적**: SNS 간편 로그인
- **로그인 방식**: 카카오, 라인, 구글
- **다음 화면**: 기존 회원 → HomeScreen, 신규 회원 → SignupScreen

#### SignupScreen (멀티스텝)
- **경로**: `/auth/signup`
- **구성**:
  - Step 1: 기본 정보 (닉네임, 나이, 성별, 국적)
  - Step 2: 프로필 (사진, 거주 도시, 자기소개)
  - Step 3: SNS 연동 (카카오톡/라인/왓츠앱 ID)
  - Step 4: 언어/취미 선택
- **다음 화면**: TermsAgreementScreen

#### TermsAgreementScreen
- **경로**: `/auth/terms`
- **목적**: 이용약관, 개인정보처리방침 동의
- **다음 화면**: HomeScreen

### 5.2. 메인 홈 영역

#### HomeScreen
- **경로**: `/`
- **목적**: 서비스 랜딩 및 주요 CTA
- **구성 요소**:
  - 상단 배너 (브랜딩 이미지)
  - "동행 요청하기" CTA 버튼
  - "동행 신청 보러가기" CTA 버튼
  - 서비스 이용 방법 3단계 요약
  - 하단 링크 (약관, 고객센터)

### 5.3. 동행 요청 영역

#### RequestCreateScreen (멀티스텝)
- **경로**: `/request/new`
- **구성**:
  - Step 1: 여행지 선택, 일정, 인원
  - Step 2: 희망 동행자 조건 (연령, 성별, 국적, 언어)
  - Step 3: 희망 활동 선택, 팁 금액 설정
  - Step 4: 추가 사진, 설명, 여행객 공개 여부

#### MyRequestsScreen
- **경로**: `/request/my`
- **목적**: 내가 등록한 요청글 목록 관리
- **표시 정보**: 상태, 신청자 수, 등록일

#### ApplicantListScreen
- **경로**: `/request/:requestId/applicants`
- **목적**: 특정 요청글에 신청한 사람들 리스트
- **표시 정보**: 사진, 나이/성별/언어, 간단 요약
- **주요 기능**: 상세보기 (과금 발생)

#### ApplicantDetailScreen
- **경로**: `/request/:requestId/applicants/:applicantId`
- **목적**: 신청자 상세 프로필 및 신청 내용 확인
- **표시 정보**: 전체 프로필, 취미, 추가 사진, 신청 내용
- **주요 기능**: 승인하기 (과금 발생), 거절하기

### 5.4. 동행 신청 영역

#### RequestListScreen
- **경로**: `/apply`
- **목적**: 내 거주지/관심 지역의 동행 요청 리스트
- **필터**: 도시, 날짜, 성별, 언어 등
- **표시 정보**: 요청자 정보, 일정, 희망 활동, 팁 금액

#### RequestViewScreen
- **경로**: `/apply/:requestId`
- **목적**: 동행 요청 상세 내용 확인
- **표시 정보**: 요청자 간략 프로필, 상세 조건, 일정, 사진
- **주요 기능**: "동행 신청하기" 버튼

#### ApplicationFormScreen
- **경로**: `/apply/:requestId/apply`
- **목적**: 동행 신청서 작성
- **입력 필드**: 가능한 날짜/시간, 가능한 활동, 자기소개

#### MyApplicationsScreen
- **경로**: `/apply/my`
- **목적**: 내가 신청한 동행 목록
- **표시 정보**: 상태 (대기/승인/거절/만남완료/취소)
- **주요 기능**: 승인 거절 (30분 이내), 만남 진행 확인

### 5.5. 매칭 영역

#### MatchListScreen
- **경로**: `/match`
- **목적**: 성사된 매칭 목록
- **표시 정보**: 상대방 정보, 일정, 상태

#### MatchDetailScreen
- **경로**: `/match/:matchId`
- **목적**: 매칭 상세 정보 및 만남 관리
- **주요 섹션**:
  - SNS 연락처 표시
  - 만남 일정/내용
  - 만남 진행 확인 버튼 (신청자용)
  - "안 만났음" 버튼 (요청자용, 30분 제한)
  - 후기 작성 버튼
  - 신고하기

#### ReviewCreateScreen
- **경로**: `/match/:matchId/review`
- **목적**: 만남 후기 작성
- **입력 필드**: 별점 (1~5), 텍스트 후기, 긍정/부정 태그

### 5.6. 포인트 & 결제 영역

#### PointDashboardScreen
- **경로**: `/point`
- **목적**: 포인트 현황 대시보드
- **표시 정보**: 현재 잔액, 최근 사용/충전 내역 요약

#### PointChargeScreen
- **경로**: `/point/charge`
- **목적**: 포인트 충전
- **충전 옵션**: 10,000원 / 30,000원 / 50,000원 / 직접입력
- **결제 수단**: 네이버페이 + 카드/계좌

#### PointHistoryScreen
- **경로**: `/point/history`
- **목적**: 포인트 사용/충전/환불 상세 내역
- **필터**: 유형별 (충전/사용/환불/출금)

#### WithdrawScreen
- **경로**: `/point/withdraw`
- **목적**: 포인트 출금 요청
- **입력 필드**: 출금 금액, 은행, 계좌번호, 예금주

### 5.7. 알림 영역

#### NotificationCenterScreen
- **경로**: `/notification`
- **목적**: 모든 알림 확인
- **알림 유형**: 새 요청, 새 신청, 승인/거절, 매칭, 환불, 시스템

### 5.8. 마이페이지 영역

#### MyPageScreen
- **경로**: `/mypage`
- **목적**: 사용자 정보 요약 및 설정 진입점
- **표시 정보**: 프로필, 포인트, 패널티, 평점

#### ProfileEditScreen
- **경로**: `/mypage/profile`
- **목적**: 프로필 정보 수정
- **수정 가능 항목**: 모든 프로필 정보

#### SettingsScreen
- **경로**: `/mypage/settings`
- **목적**: 앱 설정
- **설정 항목**: 알림, 언어, 계정 관리

### 5.9. 관리자 영역

#### AdminDashboardScreen
- **경로**: `/admin`
- **목적**: 관리자 대시보드
- **표시 정보**: 오늘 통계, 최근 활동, 주요 지표

#### AdminUsersScreen
- **경로**: `/admin/users`
- **목적**: 회원 관리
- **기능**: 검색, 필터, 상태 변경, 패널티 부과

#### AdminPricingScreen
- **경로**: `/admin/pricing`
- **목적**: 과금 정책 관리
- **설정 항목**: 프로필 열람/매칭 승인 비용 (성별별)

#### AdminPaymentsScreen
- **경로**: `/admin/payments`
- **목적**: 결제 및 정산 관리
- **기능**: 결제 내역 조회, 환불 처리, 출금 승인

#### AdminReportsScreen
- **경로**: `/admin/reports`
- **목적**: 신고 관리
- **기능**: 신고 검토, 처리, 패널티 부과

---

## 6. 팝업/모달 목록

### 6.1. 인증 관련
| ID | 이름 | 트리거 | 내용 |
|----|------|--------|------|
| M-001 | 로그아웃 확인 | 로그아웃 버튼 | "로그아웃 하시겠습니까?" |
| M-002 | 회원탈퇴 확인 | 탈퇴 버튼 | "탈퇴 시 모든 정보가 삭제됩니다" |
| M-003 | 언어 선택 | 언어 아이콘 | 한국어/日本語/English 선택 |

### 6.2. 결제/과금 관련
| ID | 이름 | 트리거 | 내용 |
|----|------|--------|------|
| M-101 | 프로필 열람 과금 안내 | 신청자 카드 클릭 | "상세 프로필 열람 시 {n}P가 차감됩니다" |
| M-102 | 동행 승인 과금 안내 | 승인하기 버튼 | "승인 시 {n}P가 차감되며 SNS가 공개됩니다" |
| M-103 | 포인트 부족 안내 | 포인트 부족 시 | "포인트가 부족합니다. 충전하시겠습니까?" |
| M-104 | 결제 확인 | 결제 버튼 | "{금액}원을 결제하시겠습니까?" |
| M-105 | 출금 요청 확인 | 출금 신청 | "{금액}P를 출금 요청하시겠습니까?" |
| M-106 | 결제 성공 | 결제 완료 | "결제가 완료되었습니다" |
| M-107 | 결제 실패 | 결제 실패 | "결제에 실패했습니다. 다시 시도해주세요" |

### 6.3. 매칭 관련
| ID | 이름 | 트리거 | 내용 |
|----|------|--------|------|
| M-201 | 매칭 성사 안내 | 승인 완료 | "매칭이 성사되었습니다! SNS로 연락해보세요" |
| M-202 | 승인 거절 확인 | 거절 버튼 (30분 내) | "승인을 거절하시겠습니까? 전액 환불됩니다" |
| M-203 | 만남 진행 확인 | 만남 진행됨 버튼 | "만남이 진행되었나요?" |
| M-204 | 안 만났음 확인 | 안 만났음 버튼 | "정말 만나지 못했나요? 50% 환불 처리됩니다" |
| M-205 | 만남 완료 안내 | 30분 경과 후 자동 | "만남이 완료 처리되었습니다. 후기를 남겨주세요" |
| M-206 | 요청 취소 확인 | 요청 취소 버튼 | "동행 요청을 취소하시겠습니까?" |
| M-207 | 신청 취소 확인 | 신청 취소 버튼 | "동행 신청을 취소하시겠습니까?" |

### 6.4. 환불/신고 관련
| ID | 이름 | 트리거 | 내용 |
|----|------|--------|------|
| M-301 | SNS 추가 불가 신고 | 신고 버튼 | "SNS ID가 잘못되었거나 친구 추가가 불가합니다" |
| M-302 | 연락 없음 신고 | 신고 버튼 | "30분 이상 연락이 없습니다" |
| M-303 | 환불 처리 안내 | 환불 완료 | "{n}P가 환불 처리되었습니다" |
| M-304 | 신고 접수 완료 | 신고 제출 | "신고가 접수되었습니다. 검토 후 조치하겠습니다" |
| M-305 | 다시 만남으로 변경 | 실수로 안만남 클릭 | "만남으로 다시 변경하시겠습니까? 환불금을 재결제합니다" |

### 6.5. 안내/확인 관련
| ID | 이름 | 트리거 | 내용 |
|----|------|--------|------|
| M-401 | SNS 친구 허용 안내 | SNS ID 입력 시 | "친구 검색 허용 설정을 열어두셔야 합니다" |
| M-402 | 요청글 등록 완료 | 등록 완료 | "동행 요청이 등록되었습니다!" |
| M-403 | 신청 완료 안내 | 신청 제출 | "동행 신청이 완료되었습니다!" |
| M-404 | 후기 작성 완료 | 후기 제출 | "후기가 등록되었습니다" |
| M-405 | 패널티 안내 | 패널티 부과 시 | "패널티 {n}점이 부과되었습니다" |
| M-406 | 계정 정지 안내 | 패널티 초과 | "계정이 정지되었습니다. 고객센터에 문의하세요" |
| M-407 | 네트워크 오류 | 통신 실패 | "네트워크 오류가 발생했습니다. 다시 시도해주세요" |
| M-408 | 프로필 미완성 안내 | 필수 정보 누락 | "프로필 정보를 완성해주세요" |

### 6.6. 관리자 전용
| ID | 이름 | 트리거 | 내용 |
|----|------|--------|------|
| M-501 | 회원 상태 변경 확인 | 상태 변경 | "회원 상태를 변경하시겠습니까?" |
| M-502 | 출금 승인 확인 | 출금 승인 | "출금을 승인하시겠습니까?" |
| M-503 | 환불 처리 확인 | 환불 처리 | "환불을 처리하시겠습니까?" |
| M-504 | 후기 삭제 확인 | 후기 삭제 | "후기를 삭제하시겠습니까?" |
| M-505 | 과금 정책 변경 확인 | 정책 저장 | "과금 정책을 변경하시겠습니까?" |

---

## 7. 토스트/스낵바 메시지

| ID | 유형 | 메시지 |
|----|------|--------|
| T-001 | Success | 저장되었습니다 |
| T-002 | Success | 복사되었습니다 |
| T-003 | Success | 알림 설정이 변경되었습니다 |
| T-004 | Error | 필수 항목을 입력해주세요 |
| T-005 | Error | 올바른 형식으로 입력해주세요 |
| T-006 | Info | 처리 중입니다... |
| T-007 | Warning | 30분 이내에 응답해주세요 |

---

## 8. 화면 흐름도

### 8.1. 회원가입 흐름

```
스플래시 → 온보딩 → 로그인 → [SNS 인증] → 회원가입
    │                              ↓
    │         기본정보 → 프로필 → SNS연동 → 언어/취미 → 약관동의 → 홈
    │
    └─────────────── 기존회원 ──────────────────────────────────→ 홈
```

### 8.2. 동행 요청 및 매칭 흐름

```
[동행 요청자]
요청글 작성 → 등록 완료 → 신청자 알림 대기
                              ↓
              신청자 리스트 → 상세보기 (과금) → 승인 (과금)
                              ↓
                        매칭 성사 (SNS 공개)
                              ↓
              만남 진행 ← [신청자: 만남진행됨] → 30분 대기
                              ↓
                        [요청자 응답]
                              ↓
              ┌─────────────────┴─────────────────┐
              ↓                                    ↓
         안만났음 클릭                         응답 없음
              ↓                                    ↓
        50% 환불 + 패널티                    만남 완료 처리
              ↓                                    ↓
              └──────────→ 후기 작성 ←─────────────┘
```

### 8.3. 동행 신청 흐름

```
[동행 신청자]
요청 리스트 → 상세보기 → 신청 작성 → 제출 → 승인 대기
                                              ↓
                                         승인 알림
                                              ↓
                              30분 이내 거절 가능 / 자동 확정
                                              ↓
                                     매칭 성사 (SNS 공개)
                                              ↓
                                     만남 진행됨 버튼 클릭
                                              ↓
                                        후기 작성
```

### 8.4. 포인트 충전 흐름

```
포인트 현황 → 충전하기 → 금액 선택 → 결제 수단 → 네이버페이
                                                      ↓
              ┌──────────────┬───────────────┐
              ↓              ↓               ↓
         결제 성공        결제 실패      결제 취소
              ↓              ↓               ↓
       포인트 충전됨    에러 팝업      취소 안내
```

---

## 9. 딥링크 구조

| 기능 | 딥링크 | 설명 |
|------|--------|------|
| 요청글 상세 | tori://request/{id} | 특정 동행 요청 상세 |
| 매칭 상세 | tori://match/{id} | 특정 매칭 상세 |
| 포인트 충전 | tori://point/charge | 포인트 충전 화면 |
| 알림 | tori://notification | 알림 센터 |
| 프로필 | tori://mypage/profile | 프로필 수정 |

---

## 10. 접근성 및 국제화

### 10.1. 다국어 지원
- 한국어 (ko)
- 일본어 (ja)
- 영어 (en)

### 10.2. 접근성 고려사항
- 모든 버튼/링크에 aria-label 적용
- 색상 대비 WCAG AA 기준 충족
- 키보드 네비게이션 지원
- 스크린 리더 호환

---

**문서 작성일**: 2025-01-18
**작성자**: Claude AI
**검토 필요**: UX 디자이너, Frontend 개발자
