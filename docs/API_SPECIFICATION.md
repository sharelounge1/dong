# API 명세서 (API Specification)

**프로젝트명**: 또리(TORI) - 현지 친구와 함께하는 여행 동행 플랫폼
**Base URL**: `https://api.tori-app.com/api/v1`
**버전**: 1.0
**최종 수정일**: 2025-01-18

---

## 공통 사항

### 인증 헤더

```
Authorization: Bearer {access_token}
```

### 공통 응답 형식

**성공 응답**
```json
{
  "success": true,
  "data": { /* 실제 데이터 */ },
  "message": "요청이 성공적으로 처리되었습니다",
  "timestamp": "2025-01-18T10:30:00Z"
}
```

**실패 응답**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "사용자 친화적 오류 메시지"
  },
  "timestamp": "2025-01-18T10:30:00Z"
}
```

### HTTP 상태 코드

| 코드 | 설명 |
|------|------|
| 200 | OK - 성공 |
| 201 | Created - 생성 성공 |
| 400 | Bad Request - 잘못된 요청 |
| 401 | Unauthorized - 인증 실패 |
| 403 | Forbidden - 권한 없음 |
| 404 | Not Found - 리소스 없음 |
| 409 | Conflict - 충돌 |
| 422 | Unprocessable Entity - 검증 실패 |
| 500 | Internal Server Error - 서버 오류 |

### 에러 코드

| 코드 | 설명 |
|------|------|
| AUTH_INVALID_TOKEN | 유효하지 않은 토큰 |
| AUTH_EXPIRED_TOKEN | 만료된 토큰 |
| AUTH_INSUFFICIENT_PERMISSION | 권한 부족 |
| USER_NOT_FOUND | 사용자를 찾을 수 없음 |
| POINT_INSUFFICIENT | 포인트 부족 |
| PAYMENT_FAILED | 결제 실패 |
| VALIDATION_ERROR | 입력값 검증 실패 |

---

## 1. 인증 API

### 1.1. SNS 로그인

- **Endpoint**: `POST /auth/login`
- **설명**: SNS OAuth 토큰으로 로그인

**Request**
```json
{
  "provider": "kakao",  // "kakao" | "line" | "google"
  "accessToken": "oauth_access_token_from_provider"
}
```

**Response (성공 - 기존 회원)**
```json
{
  "success": true,
  "data": {
    "isNewUser": false,
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token",
    "expiresIn": 3600,
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "nickname": "닉네임",
      "profileImageUrl": "https://...",
      "role": "user"
    }
  }
}
```

**Response (성공 - 신규 회원)**
```json
{
  "success": true,
  "data": {
    "isNewUser": true,
    "tempToken": "temporary_token_for_signup",
    "provider": "kakao",
    "email": "user@example.com"
  }
}
```

---

### 1.2. 회원가입

- **Endpoint**: `POST /auth/signup`
- **설명**: 신규 회원 등록

**Request**
```json
{
  "tempToken": "temporary_token_from_login",
  "profile": {
    "nickname": "닉네임",
    "age": 25,
    "gender": "male",
    "nationality": "Korea",
    "residenceCity": "Seoul",
    "bio": "자기소개",
    "profileImageUrl": "https://...",
    "additionalImages": ["https://...", "https://..."],
    "kakaoId": "kakao_id",
    "lineId": null,
    "whatsappId": null,
    "languages": [
      { "code": "ko", "proficiency": "native" },
      { "code": "en", "proficiency": "fluent" }
    ],
    "hobbies": ["food", "cafe", "shopping"]
  },
  "agreements": {
    "termsOfService": true,
    "privacyPolicy": true,
    "marketing": false
  }
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token",
    "expiresIn": 3600,
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "nickname": "닉네임",
      "profileImageUrl": "https://...",
      "role": "user"
    }
  }
}
```

---

### 1.3. 토큰 갱신

- **Endpoint**: `POST /auth/refresh`
- **설명**: 액세스 토큰 갱신

**Request**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_access_token",
    "expiresIn": 3600
  }
}
```

---

### 1.4. 로그아웃

- **Endpoint**: `POST /auth/logout`
- **설명**: 로그아웃 및 토큰 무효화
- **인증**: 필요

**Response**
```json
{
  "success": true,
  "message": "로그아웃되었습니다"
}
```

---

## 2. 사용자 API

### 2.1. 내 프로필 조회

- **Endpoint**: `GET /users/me`
- **설명**: 현재 로그인한 사용자 정보
- **인증**: 필요

**Response**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "nickname": "닉네임",
    "age": 25,
    "gender": "male",
    "nationality": "Korea",
    "residenceCity": "Seoul",
    "bio": "자기소개",
    "profileImageUrl": "https://...",
    "additionalImages": ["https://..."],
    "kakaoId": "kakao_id",
    "lineId": null,
    "whatsappId": null,
    "languages": [
      { "code": "ko", "proficiency": "native" }
    ],
    "hobbies": ["food", "cafe"],
    "pointBalance": 50000,
    "penaltyScore": 0,
    "averageRating": 4.5,
    "reviewCount": 10,
    "status": "active",
    "createdAt": "2025-01-01T00:00:00Z"
  }
}
```

---

### 2.2. 프로필 수정

- **Endpoint**: `PATCH /users/me`
- **설명**: 프로필 정보 수정
- **인증**: 필요

**Request**
```json
{
  "nickname": "새닉네임",
  "bio": "새 자기소개",
  "residenceCity": "Busan",
  "kakaoId": "new_kakao_id",
  "languages": [
    { "code": "ko", "proficiency": "native" },
    { "code": "ja", "proficiency": "intermediate" }
  ],
  "hobbies": ["food", "nightlife"]
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "nickname": "새닉네임",
    // ... 전체 프로필
  },
  "message": "프로필이 수정되었습니다"
}
```

---

### 2.3. 다른 사용자 프로필 조회

- **Endpoint**: `GET /users/:userId`
- **설명**: 다른 사용자의 공개 프로필 조회
- **인증**: 필요

**Response**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "nickname": "닉네임",
    "age": 25,
    "gender": "male",
    "nationality": "Korea",
    "residenceCity": "Seoul",
    "bio": "자기소개",
    "profileImageUrl": "https://...",
    "additionalImages": ["https://..."],
    "languages": [
      { "code": "ko", "proficiency": "native" }
    ],
    "hobbies": ["food", "cafe"],
    "averageRating": 4.5,
    "reviewCount": 10
  }
}
```

---

## 3. 동행 요청 API

### 3.1. 동행 요청 목록 조회

- **Endpoint**: `GET /requests`
- **설명**: 동행 요청 목록 (필터링 가능)
- **인증**: 필요

**Query Parameters**
| 파라미터 | 타입 | 설명 |
|----------|------|------|
| city | string | 도시 필터 |
| startDate | date | 시작일 (이후) |
| endDate | date | 종료일 (이전) |
| gender | string | 요청자 성별 |
| language | string | 언어 필터 |
| activity | string | 활동 필터 |
| page | number | 페이지 번호 |
| limit | number | 페이지당 개수 |

**Response**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "requester": {
          "id": "uuid",
          "nickname": "닉네임",
          "age": 25,
          "gender": "male",
          "languages": ["ko", "en"],
          "profileImageUrl": "https://..." // 블러 처리용
        },
        "city": "Tokyo",
        "specificArea": "Shibuya",
        "startDate": "2025-02-01",
        "endDate": "2025-02-03",
        "partySize": 1,
        "activities": ["food", "cafe", "shopping"],
        "tipAmount": 50000,
        "tipCurrency": "KRW",
        "applicationCount": 5,
        "createdAt": "2025-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

---

### 3.2. 동행 요청 상세 조회

- **Endpoint**: `GET /requests/:requestId`
- **설명**: 동행 요청 상세 정보
- **인증**: 필요

**Response**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "requester": {
      "id": "uuid",
      "nickname": "닉네임",
      "age": 25,
      "gender": "male",
      "nationality": "Korea",
      "languages": [
        { "code": "ko", "proficiency": "native" }
      ],
      "profileImageUrl": "https://..."
    },
    "city": "Tokyo",
    "specificArea": "Shibuya",
    "startDate": "2025-02-01",
    "endDate": "2025-02-03",
    "partySize": 1,
    "preferredAgeMin": 20,
    "preferredAgeMax": 35,
    "preferredGender": "any",
    "preferredNationality": null,
    "requiredLanguages": ["ko", "ja"],
    "activities": ["food", "cafe", "shopping"],
    "tipAmount": 50000,
    "tipCurrency": "KRW",
    "description": "도쿄 맛집 투어 함께해요!",
    "images": ["https://..."],
    "visibleToTravelers": true,
    "status": "active",
    "applicationCount": 5,
    "createdAt": "2025-01-15T10:00:00Z"
  }
}
```

---

### 3.3. 동행 요청 생성

- **Endpoint**: `POST /requests`
- **설명**: 새 동행 요청 등록
- **인증**: 필요

**Request**
```json
{
  "city": "Tokyo",
  "specificArea": "Shibuya",
  "startDate": "2025-02-01",
  "endDate": "2025-02-03",
  "partySize": 1,
  "preferredAgeMin": 20,
  "preferredAgeMax": 35,
  "preferredGender": "any",
  "preferredNationality": null,
  "requiredLanguages": ["ko", "ja"],
  "activities": ["food", "cafe", "shopping"],
  "tipAmount": 50000,
  "tipCurrency": "KRW",
  "description": "도쿄 맛집 투어 함께해요!",
  "images": ["https://..."],
  "visibleToTravelers": true
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    // ... 생성된 요청 정보
  },
  "message": "동행 요청이 등록되었습니다"
}
```

---

### 3.4. 동행 요청 수정

- **Endpoint**: `PATCH /requests/:requestId`
- **설명**: 동행 요청 수정
- **인증**: 필요 (본인만)

**Request**
```json
{
  "tipAmount": 60000,
  "description": "수정된 설명"
}
```

---

### 3.5. 동행 요청 취소

- **Endpoint**: `DELETE /requests/:requestId`
- **설명**: 동행 요청 취소
- **인증**: 필요 (본인만)

---

### 3.6. 내 동행 요청 목록

- **Endpoint**: `GET /requests/my`
- **설명**: 내가 등록한 요청 목록
- **인증**: 필요

**Query Parameters**
| 파라미터 | 타입 | 설명 |
|----------|------|------|
| status | string | active/matching/completed/cancelled |

---

## 4. 동행 신청 API

### 4.1. 동행 신청하기

- **Endpoint**: `POST /requests/:requestId/applications`
- **설명**: 동행 요청에 신청
- **인증**: 필요

**Request**
```json
{
  "availableDateStart": "2025-02-01",
  "availableDateEnd": "2025-02-02",
  "availableActivities": ["food", "cafe"],
  "introduction": "안녕하세요! 도쿄 현지인입니다."
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "requestId": "uuid",
    "status": "pending",
    "createdAt": "2025-01-15T10:00:00Z"
  },
  "message": "동행 신청이 완료되었습니다"
}
```

---

### 4.2. 신청자 리스트 조회

- **Endpoint**: `GET /requests/:requestId/applications`
- **설명**: 요청에 대한 신청자 목록
- **인증**: 필요 (요청자만)

**Response**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "applicant": {
          "id": "uuid",
          "nickname": "닉네임",
          "age": 28,
          "gender": "female",
          "languages": ["ko", "ja"],
          "profileImageUrl": "https://..." // 썸네일 (블러)
        },
        "introductionPreview": "안녕하세요! 도쿄 현지인입니...",
        "status": "pending",
        "isProfileViewed": false,
        "createdAt": "2025-01-16T10:00:00Z"
      }
    ]
  }
}
```

---

### 4.3. 신청자 상세 조회 (과금)

- **Endpoint**: `GET /applications/:applicationId/detail`
- **설명**: 신청자 상세 프로필 조회 (포인트 차감)
- **인증**: 필요 (요청자만)

**Response**
```json
{
  "success": true,
  "data": {
    "application": {
      "id": "uuid",
      "availableDateStart": "2025-02-01",
      "availableDateEnd": "2025-02-02",
      "availableActivities": ["food", "cafe"],
      "introduction": "안녕하세요! 도쿄 현지인입니다. 맛집을 많이 알고 있어요!"
    },
    "applicant": {
      "id": "uuid",
      "nickname": "닉네임",
      "age": 28,
      "gender": "female",
      "nationality": "Japan",
      "residenceCity": "Tokyo",
      "bio": "도쿄에서 5년째 살고 있습니다",
      "profileImageUrl": "https://...",
      "additionalImages": ["https://...", "https://..."],
      "languages": [
        { "code": "ja", "proficiency": "native" },
        { "code": "ko", "proficiency": "fluent" }
      ],
      "hobbies": ["food", "cafe", "photo"],
      "averageRating": 4.8,
      "reviewCount": 15
    },
    "pointsCharged": 100,
    "remainingBalance": 49900
  },
  "message": "100P가 차감되었습니다"
}
```

**Error Response (포인트 부족)**
```json
{
  "success": false,
  "error": {
    "code": "POINT_INSUFFICIENT",
    "message": "포인트가 부족합니다",
    "data": {
      "required": 100,
      "current": 50
    }
  }
}
```

---

### 4.4. 동행 신청 승인 (과금)

- **Endpoint**: `POST /applications/:applicationId/approve`
- **설명**: 신청 승인 (포인트 차감, SNS 공개)
- **인증**: 필요 (요청자만)

**Response**
```json
{
  "success": true,
  "data": {
    "matchId": "uuid",
    "status": "pending_confirmation",
    "snsInfo": {
      "applicantSnsType": "line",
      "applicantSnsId": "line_id_123"
    },
    "approvalExpiresAt": "2025-01-16T10:30:00Z",
    "pointsCharged": 500,
    "remainingBalance": 49400
  },
  "message": "매칭이 성사되었습니다! 상대방에게 승인 알림이 전송되었습니다"
}
```

---

### 4.5. 동행 신청 거절

- **Endpoint**: `POST /applications/:applicationId/reject`
- **설명**: 신청 거절
- **인증**: 필요 (요청자만)

**Request**
```json
{
  "reason": "일정이 맞지 않아서" // 선택
}
```

---

### 4.6. 내 신청 목록

- **Endpoint**: `GET /applications/my`
- **설명**: 내가 신청한 동행 목록
- **인증**: 필요

**Query Parameters**
| 파라미터 | 타입 | 설명 |
|----------|------|------|
| status | string | pending/approved/rejected/cancelled |

---

### 4.7. 승인 거절 (신청자)

- **Endpoint**: `POST /applications/:applicationId/decline-approval`
- **설명**: 승인된 신청 거절 (30분 이내)
- **인증**: 필요 (신청자만)

**Response**
```json
{
  "success": true,
  "data": {
    "refundAmount": 500,
    "status": "cancelled"
  },
  "message": "승인이 거절되었습니다. 요청자에게 전액 환불됩니다"
}
```

---

## 5. 매칭 API

### 5.1. 매칭 목록 조회

- **Endpoint**: `GET /matches`
- **설명**: 내 매칭 목록
- **인증**: 필요

**Query Parameters**
| 파라미터 | 타입 | 설명 |
|----------|------|------|
| status | string | confirmed/completed/cancelled |
| role | string | requester/applicant |

**Response**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "partner": {
          "id": "uuid",
          "nickname": "닉네임",
          "profileImageUrl": "https://..."
        },
        "request": {
          "city": "Tokyo",
          "startDate": "2025-02-01",
          "endDate": "2025-02-03"
        },
        "myRole": "requester",
        "status": "confirmed",
        "createdAt": "2025-01-16T10:00:00Z"
      }
    ]
  }
}
```

---

### 5.2. 매칭 상세 조회

- **Endpoint**: `GET /matches/:matchId`
- **설명**: 매칭 상세 정보
- **인증**: 필요

**Response**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "partner": {
      "id": "uuid",
      "nickname": "닉네임",
      "age": 28,
      "profileImageUrl": "https://...",
      "averageRating": 4.8
    },
    "request": {
      "id": "uuid",
      "city": "Tokyo",
      "specificArea": "Shibuya",
      "startDate": "2025-02-01",
      "endDate": "2025-02-03",
      "activities": ["food", "cafe"],
      "tipAmount": 50000
    },
    "snsInfo": {
      "partnerSnsType": "line",
      "partnerSnsId": "line_id_123"
    },
    "myRole": "requester",
    "status": "confirmed",
    "meetingConfirmedAt": null,
    "meetingResponseDeadline": null,
    "canClaimNoShow": false,
    "canWriteReview": false,
    "createdAt": "2025-01-16T10:00:00Z"
  }
}
```

---

### 5.3. 만남 진행 확인 (신청자)

- **Endpoint**: `POST /matches/:matchId/confirm-meeting`
- **설명**: 만남 진행됨 확인
- **인증**: 필요 (신청자만)

**Response**
```json
{
  "success": true,
  "data": {
    "status": "meeting_in_progress",
    "meetingConfirmedAt": "2025-02-01T14:00:00Z",
    "meetingResponseDeadline": "2025-02-01T14:30:00Z"
  },
  "message": "만남 진행이 확인되었습니다. 요청자에게 알림이 전송되었습니다"
}
```

---

### 5.4. 안 만났음 신고 (요청자)

- **Endpoint**: `POST /matches/:matchId/claim-no-show`
- **설명**: 노쇼 신고 (50% 환불, 패널티)
- **인증**: 필요 (요청자만)

**Response**
```json
{
  "success": true,
  "data": {
    "status": "no_show",
    "refundAmount": 300,
    "penaltyApplied": true
  },
  "message": "노쇼로 처리되었습니다. 50%가 환불됩니다"
}
```

---

### 5.5. 다시 만남으로 변경

- **Endpoint**: `POST /matches/:matchId/revert-no-show`
- **설명**: 노쇼를 만남으로 변경 (재결제)
- **인증**: 필요 (요청자만)

**Response**
```json
{
  "success": true,
  "data": {
    "status": "completed",
    "rechargedAmount": 300
  },
  "message": "만남으로 변경되었습니다"
}
```

---

## 6. 후기 API

### 6.1. 후기 작성

- **Endpoint**: `POST /matches/:matchId/reviews`
- **설명**: 매칭에 대한 후기 작성
- **인증**: 필요

**Request**
```json
{
  "rating": 5,
  "content": "정말 즐거운 시간이었습니다!",
  "positiveTags": ["친절함", "시간약속준수", "재미있음"],
  "negativeTags": []
}
```

---

### 6.2. 사용자 후기 목록

- **Endpoint**: `GET /users/:userId/reviews`
- **설명**: 특정 사용자가 받은 후기 목록
- **인증**: 필요

---

### 6.3. 내가 받은 후기

- **Endpoint**: `GET /reviews/received`
- **설명**: 내가 받은 후기 목록
- **인증**: 필요

---

## 7. 포인트 API

### 7.1. 포인트 잔액 조회

- **Endpoint**: `GET /points/balance`
- **설명**: 현재 포인트 잔액
- **인증**: 필요

**Response**
```json
{
  "success": true,
  "data": {
    "balance": 50000,
    "pendingWithdrawal": 0
  }
}
```

---

### 7.2. 포인트 내역 조회

- **Endpoint**: `GET /points/history`
- **설명**: 포인트 거래 내역
- **인증**: 필요

**Query Parameters**
| 파라미터 | 타입 | 설명 |
|----------|------|------|
| type | string | charge/use/refund/withdrawal |
| startDate | date | 조회 시작일 |
| endDate | date | 조회 종료일 |
| page | number | 페이지 |
| limit | number | 개수 |

**Response**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "type": "profile_view",
        "amount": -100,
        "balanceAfter": 49900,
        "description": "프로필 열람",
        "createdAt": "2025-01-16T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50
    }
  }
}
```

---

## 8. 결제 API

### 8.1. 결제 요청

- **Endpoint**: `POST /payments`
- **설명**: 포인트 충전 결제 요청
- **인증**: 필요

**Request**
```json
{
  "amount": 10000,
  "paymentMethod": "naver_pay"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "paymentId": "uuid",
    "pgUrl": "https://naverpay.com/...",
    "expiresAt": "2025-01-16T10:30:00Z"
  }
}
```

---

### 8.2. 결제 확인

- **Endpoint**: `POST /payments/:paymentId/confirm`
- **설명**: PG사 결제 완료 후 확인
- **인증**: 필요

**Request**
```json
{
  "pgTransactionId": "pg_transaction_id"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "pointsCharged": 10000,
    "newBalance": 60000
  },
  "message": "10,000P가 충전되었습니다"
}
```

---

### 8.3. 출금 신청

- **Endpoint**: `POST /withdrawals`
- **설명**: 포인트 출금 신청
- **인증**: 필요

**Request**
```json
{
  "pointAmount": 10000,
  "bankName": "신한은행",
  "accountNumber": "110123456789",
  "accountHolder": "홍길동"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "withdrawalId": "uuid",
    "pointAmount": 10000,
    "feeAmount": 500,
    "cashAmount": 9500,
    "status": "pending"
  },
  "message": "출금 신청이 완료되었습니다"
}
```

---

### 8.4. 출금 내역 조회

- **Endpoint**: `GET /withdrawals`
- **설명**: 출금 신청 내역
- **인증**: 필요

---

## 9. 알림 API

### 9.1. 알림 목록 조회

- **Endpoint**: `GET /notifications`
- **설명**: 알림 목록
- **인증**: 필요

**Response**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "type": "application_approved",
        "title": "동행 신청이 승인되었습니다",
        "message": "닉네임님이 동행 신청을 승인했습니다",
        "linkType": "match",
        "linkId": "match_uuid",
        "isRead": false,
        "createdAt": "2025-01-16T10:00:00Z"
      }
    ],
    "unreadCount": 5
  }
}
```

---

### 9.2. 알림 읽음 처리

- **Endpoint**: `POST /notifications/:notificationId/read`
- **설명**: 알림 읽음 처리
- **인증**: 필요

---

### 9.3. 전체 읽음 처리

- **Endpoint**: `POST /notifications/read-all`
- **설명**: 모든 알림 읽음 처리
- **인증**: 필요

---

## 10. 신고 API

### 10.1. 신고 접수

- **Endpoint**: `POST /reports`
- **설명**: 신고 접수
- **인증**: 필요

**Request**
```json
{
  "type": "sns_not_found",
  "matchId": "uuid",
  "description": "SNS ID가 존재하지 않습니다",
  "evidenceImages": ["https://..."]
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "reportId": "uuid",
    "autoRefundProcessed": true,
    "refundAmount": 600
  },
  "message": "신고가 접수되었습니다"
}
```

---

## 11. 관리자 API

### 11.1. 대시보드 통계

- **Endpoint**: `GET /admin/dashboard`
- **설명**: 대시보드 통계
- **인증**: 필요 (관리자)

**Response**
```json
{
  "success": true,
  "data": {
    "today": {
      "newUsers": 10,
      "newMatches": 5,
      "revenue": 500000,
      "pendingReports": 3,
      "pendingWithdrawals": 2
    },
    "recentActivities": [...]
  }
}
```

---

### 11.2. 회원 목록

- **Endpoint**: `GET /admin/users`
- **설명**: 회원 관리 목록
- **인증**: 필요 (관리자)

---

### 11.3. 회원 상태 변경

- **Endpoint**: `PATCH /admin/users/:userId/status`
- **설명**: 회원 상태 변경
- **인증**: 필요 (관리자)

**Request**
```json
{
  "status": "suspended",
  "reason": "반복적인 노쇼"
}
```

---

### 11.4. 과금 정책 조회

- **Endpoint**: `GET /admin/pricing`
- **설명**: 과금 정책 조회
- **인증**: 필요 (관리자)

---

### 11.5. 과금 정책 수정

- **Endpoint**: `PUT /admin/pricing`
- **설명**: 과금 정책 수정
- **인증**: 필요 (관리자)

**Request**
```json
{
  "policies": [
    {
      "type": "profile_view",
      "gender": "male",
      "pointCost": 100
    },
    {
      "type": "profile_view",
      "gender": "female",
      "pointCost": 50
    },
    {
      "type": "match_approval",
      "gender": "male",
      "pointCost": 500
    },
    {
      "type": "match_approval",
      "gender": "female",
      "pointCost": 300
    }
  ]
}
```

---

### 11.6. 출금 승인

- **Endpoint**: `POST /admin/withdrawals/:withdrawalId/approve`
- **설명**: 출금 요청 승인
- **인증**: 필요 (관리자)

---

### 11.7. 신고 처리

- **Endpoint**: `POST /admin/reports/:reportId/resolve`
- **설명**: 신고 처리
- **인증**: 필요 (관리자)

**Request**
```json
{
  "resolution": "환불 처리 및 경고 조치",
  "applyPenalty": true,
  "penaltyAmount": 1
}
```

---

## 12. 파일 업로드 API

### 12.1. 이미지 업로드

- **Endpoint**: `POST /upload/image`
- **설명**: 이미지 파일 업로드
- **인증**: 필요
- **Content-Type**: multipart/form-data

**Request**
```
file: [binary]
type: "profile" | "request" | "evidence"
```

**Response**
```json
{
  "success": true,
  "data": {
    "url": "https://storage.supabase.co/...",
    "filename": "uuid.jpg",
    "size": 102400
  }
}
```

---

**문서 작성일**: 2025-01-18
**작성자**: Claude AI
**검토 필요**: Backend 개발자, Frontend 개발자
