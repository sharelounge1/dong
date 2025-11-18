# 디자인 시스템 (Design System)

**프로젝트명**: 또리(TORI) - 현지 친구와 함께하는 여행 동행 플랫폼
**버전**: 1.0
**최종 수정일**: 2025-01-18

---

## 1. 브랜드 아이덴티티

### 1.1. 브랜드 컨셉

- **서비스명**: 또리 (TORI)
- **의미**: "또 만나고 싶은 친구" + "새(鳥, Bird)"의 자유로운 여행 이미지
- **슬로건**: "현지 친구와 함께하는 진짜 여행"
- **핵심 가치**: 신뢰, 연결, 즐거움, 안전

### 1.2. 브랜드 톤 & 매너

| 특성 | 설명 |
|------|------|
| 친근함 | 격식 없는 친구 같은 느낌 |
| 신뢰감 | 안전하고 투명한 시스템 강조 |
| 활기참 | 여행의 설렘과 즐거움 표현 |
| 글로벌 | 다국적, 다문화 환경 고려 |

---

## 2. 컬러 시스템

### 2.1. Primary Colors

```css
/* Primary - 활기찬 코랄 */
--primary-50: #FFF5F5;
--primary-100: #FFE4E6;
--primary-200: #FECACA;
--primary-300: #FDA4AF;
--primary-400: #FB7185;
--primary-500: #F43F5E;  /* Main */
--primary-600: #E11D48;
--primary-700: #BE123C;
--primary-800: #9F1239;
--primary-900: #881337;
```

### 2.2. Secondary Colors

```css
/* Secondary - 신뢰의 블루 */
--secondary-50: #F0F9FF;
--secondary-100: #E0F2FE;
--secondary-200: #BAE6FD;
--secondary-300: #7DD3FC;
--secondary-400: #38BDF8;
--secondary-500: #0EA5E9;  /* Main */
--secondary-600: #0284C7;
--secondary-700: #0369A1;
--secondary-800: #075985;
--secondary-900: #0C4A6E;
```

### 2.3. Neutral Colors

```css
/* Gray Scale */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;
```

### 2.4. Semantic Colors

```css
/* Success */
--success-light: #D1FAE5;
--success-main: #10B981;
--success-dark: #065F46;

/* Warning */
--warning-light: #FEF3C7;
--warning-main: #F59E0B;
--warning-dark: #92400E;

/* Error */
--error-light: #FEE2E2;
--error-main: #EF4444;
--error-dark: #991B1B;

/* Info */
--info-light: #DBEAFE;
--info-main: #3B82F6;
--info-dark: #1E40AF;
```

### 2.5. 컬러 사용 가이드

| 용도 | 컬러 | HEX |
|------|------|-----|
| Primary Button | primary-500 | #F43F5E |
| Secondary Button | secondary-500 | #0EA5E9 |
| Background | gray-50 | #F9FAFB |
| Card Background | white | #FFFFFF |
| Text Primary | gray-900 | #111827 |
| Text Secondary | gray-500 | #6B7280 |
| Text Muted | gray-400 | #9CA3AF |
| Border | gray-200 | #E5E7EB |
| Divider | gray-100 | #F3F4F6 |

---

## 3. 타이포그래피

### 3.1. 폰트 패밀리

```css
/* 한국어 */
--font-ko: 'Pretendard', 'Apple SD Gothic Neo', sans-serif;

/* 일본어 */
--font-ja: 'Noto Sans JP', 'Hiragino Sans', sans-serif;

/* 영어 */
--font-en: 'Inter', 'Pretendard', sans-serif;

/* 기본값 */
--font-sans: var(--font-ko);
```

### 3.2. 폰트 사이즈

| 이름 | 크기 | Line Height | 용도 |
|------|------|-------------|------|
| xs | 12px | 16px | 캡션, 라벨 |
| sm | 14px | 20px | 보조 텍스트 |
| base | 16px | 24px | 본문 |
| lg | 18px | 28px | 강조 텍스트 |
| xl | 20px | 28px | 서브 헤딩 |
| 2xl | 24px | 32px | 섹션 제목 |
| 3xl | 30px | 36px | 페이지 제목 |
| 4xl | 36px | 40px | 대형 헤딩 |

### 3.3. 폰트 웨이트

| 이름 | 웨이트 | 용도 |
|------|--------|------|
| Regular | 400 | 본문 |
| Medium | 500 | 강조 |
| SemiBold | 600 | 버튼, 라벨 |
| Bold | 700 | 헤딩 |

### 3.4. 텍스트 스타일

```typescript
// Tailwind CSS 기준
const textStyles = {
  // 헤딩
  h1: 'text-3xl font-bold text-gray-900',
  h2: 'text-2xl font-bold text-gray-900',
  h3: 'text-xl font-semibold text-gray-900',
  h4: 'text-lg font-semibold text-gray-900',

  // 본문
  body1: 'text-base text-gray-900',
  body2: 'text-sm text-gray-700',

  // 보조
  caption: 'text-xs text-gray-500',
  label: 'text-sm font-medium text-gray-700',

  // 링크
  link: 'text-primary-500 hover:text-primary-600 underline',
};
```

---

## 4. 스페이싱 시스템

### 4.1. Base Unit

기본 단위: **4px**

### 4.2. 스페이싱 스케일

| 토큰 | 크기 | 용도 |
|------|------|------|
| space-0 | 0px | - |
| space-1 | 4px | 아이콘 내부 |
| space-2 | 8px | 요소 간 최소 간격 |
| space-3 | 12px | 작은 컴포넌트 패딩 |
| space-4 | 16px | 기본 패딩 |
| space-5 | 20px | 섹션 간격 |
| space-6 | 24px | 카드 패딩 |
| space-8 | 32px | 큰 섹션 간격 |
| space-10 | 40px | 페이지 여백 |
| space-12 | 48px | 큰 여백 |
| space-16 | 64px | 섹션 구분 |

### 4.3. 레이아웃 스페이싱

```css
/* 페이지 패딩 */
--page-padding-x: 16px;
--page-padding-y: 24px;

/* 카드 패딩 */
--card-padding: 16px;

/* 리스트 아이템 간격 */
--list-gap: 12px;

/* 폼 필드 간격 */
--form-gap: 16px;

/* 섹션 간격 */
--section-gap: 32px;
```

---

## 5. 그리드 시스템

### 5.1. 모바일 (Mobile First)

- **뷰포트**: 375px 기준
- **컬럼**: 4 columns
- **거터**: 16px
- **마진**: 16px

### 5.2. 태블릿

- **뷰포트**: 768px 이상
- **컬럼**: 8 columns
- **거터**: 24px
- **마진**: 24px

### 5.3. 데스크톱

- **뷰포트**: 1024px 이상
- **컬럼**: 12 columns
- **거터**: 24px
- **마진**: auto (max-width: 1200px)

---

## 6. 컴포넌트 라이브러리

### 6.1. 버튼 (Button)

#### Variants

| Variant | 용도 |
|---------|------|
| Primary | 주요 액션 (저장, 제출) |
| Secondary | 보조 액션 (취소, 이전) |
| Outline | 대안적 액션 |
| Ghost | 링크 스타일 버튼 |
| Danger | 삭제, 위험한 액션 |

#### Sizes

| Size | Height | Font Size | Padding |
|------|--------|-----------|---------|
| sm | 32px | 14px | 8px 12px |
| md | 40px | 16px | 8px 16px |
| lg | 48px | 18px | 12px 24px |

#### States

```css
/* Primary Button */
.btn-primary {
  background: var(--primary-500);
  color: white;
}
.btn-primary:hover {
  background: var(--primary-600);
}
.btn-primary:active {
  background: var(--primary-700);
}
.btn-primary:disabled {
  background: var(--gray-300);
  cursor: not-allowed;
}
```

---

### 6.2. 입력 필드 (Input)

#### Types

- Text Input
- Password Input
- Number Input
- Textarea
- Search Input

#### States

| State | 테두리 색상 | 배경 |
|-------|-------------|------|
| Default | gray-300 | white |
| Focus | primary-500 | white |
| Error | error-main | error-light |
| Disabled | gray-200 | gray-50 |

#### Structure

```tsx
<div className="space-y-1">
  <label className="text-sm font-medium text-gray-700">
    라벨 <span className="text-error-main">*</span>
  </label>
  <input
    className="w-full px-4 py-2 border border-gray-300 rounded-lg
               focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
  />
  <p className="text-xs text-gray-500">도움말 텍스트</p>
  <p className="text-xs text-error-main">에러 메시지</p>
</div>
```

---

### 6.3. 카드 (Card)

```css
.card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-elevated {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
```

---

### 6.4. 뱃지 (Badge)

| Type | Background | Text |
|------|------------|------|
| Default | gray-100 | gray-700 |
| Primary | primary-100 | primary-700 |
| Success | success-light | success-dark |
| Warning | warning-light | warning-dark |
| Error | error-light | error-dark |

```css
.badge {
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
}
```

---

### 6.5. 모달 (Modal)

```tsx
<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
  <div className="bg-white rounded-2xl w-full max-w-md p-6">
    <h3 className="text-xl font-semibold mb-4">모달 제목</h3>
    <p className="text-gray-600 mb-6">모달 내용</p>
    <div className="flex gap-3">
      <button className="btn-secondary flex-1">취소</button>
      <button className="btn-primary flex-1">확인</button>
    </div>
  </div>
</div>
```

---

### 6.6. 토스트 (Toast)

```tsx
<div className="fixed bottom-20 left-4 right-4 bg-gray-900 text-white
                rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg">
  <Icon name="check" className="text-success-main" />
  <span>저장되었습니다</span>
</div>
```

---

### 6.7. 바텀 시트 (Bottom Sheet)

```css
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: 16px 16px 0 0;
  padding: 16px;
  max-height: 80vh;
  overflow-y: auto;
}

.bottom-sheet-handle {
  width: 40px;
  height: 4px;
  background: var(--gray-300);
  border-radius: 2px;
  margin: 0 auto 16px;
}
```

---

### 6.8. 탭 (Tab)

```css
.tab-container {
  display: flex;
  border-bottom: 1px solid var(--gray-200);
}

.tab-item {
  padding: 12px 16px;
  font-weight: 500;
  color: var(--gray-500);
  border-bottom: 2px solid transparent;
}

.tab-item.active {
  color: var(--primary-500);
  border-bottom-color: var(--primary-500);
}
```

---

### 6.9. 리스트 아이템

```tsx
<div className="flex items-center gap-4 p-4 bg-white border-b border-gray-100">
  <img src="..." className="w-12 h-12 rounded-full object-cover" />
  <div className="flex-1 min-w-0">
    <p className="font-medium text-gray-900 truncate">제목</p>
    <p className="text-sm text-gray-500 truncate">설명</p>
  </div>
  <button className="text-gray-400">
    <Icon name="chevron-right" />
  </button>
</div>
```

---

## 7. 아이콘 시스템

### 7.1. 아이콘 라이브러리

**Lucide Icons** 사용 (React)

### 7.2. 아이콘 사이즈

| Size | 크기 | 용도 |
|------|------|------|
| xs | 16px | 인라인 아이콘 |
| sm | 20px | 버튼 내 아이콘 |
| md | 24px | 기본 아이콘 |
| lg | 32px | 강조 아이콘 |
| xl | 48px | 일러스트 |

### 7.3. 주요 아이콘

| 아이콘 | 용도 |
|--------|------|
| Home | 홈 탭 |
| FileText | 요청 탭 |
| UserPlus | 신청 탭 |
| Heart | 매칭 탭 |
| User | 마이페이지 탭 |
| Bell | 알림 |
| Globe | 언어 변경 |
| ChevronLeft | 뒤로가기 |
| X | 닫기 |
| Check | 완료/성공 |
| AlertCircle | 경고/에러 |
| Star | 별점 |
| Copy | 복사 |
| Camera | 사진 |

---

## 8. 이미지 & 미디어

### 8.1. 프로필 이미지

| Type | 크기 | 사용처 |
|------|------|--------|
| Thumbnail | 40px | 리스트 |
| Small | 48px | 카드 |
| Medium | 80px | 상세 |
| Large | 120px | 프로필 페이지 |

```css
.avatar {
  border-radius: 50%;
  object-fit: cover;
  background: var(--gray-100);
}

.avatar-blur {
  filter: blur(8px);
}
```

### 8.2. 카드 이미지

- **비율**: 16:9 또는 4:3
- **처리**: `object-fit: cover`

### 8.3. 플레이스홀더

```css
.placeholder {
  background: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## 9. 애니메이션 & 트랜지션

### 9.1. Duration

| 속도 | 시간 | 용도 |
|------|------|------|
| Fast | 150ms | 버튼 호버 |
| Normal | 200ms | 기본 전환 |
| Slow | 300ms | 모달/시트 |

### 9.2. Easing

```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### 9.3. 공통 트랜지션

```css
.transition-default {
  transition: all 200ms var(--ease-default);
}

.transition-transform {
  transition: transform 200ms var(--ease-default);
}

.transition-opacity {
  transition: opacity 150ms var(--ease-default);
}
```

### 9.4. 애니메이션 예시

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

/* Scale In */
@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Skeleton Loading */
@keyframes skeleton {
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
}
```

---

## 10. 다크 모드 (Dark Mode)

### 10.1. 컬러 매핑

| Light Mode | Dark Mode |
|------------|-----------|
| white | gray-900 |
| gray-50 | gray-800 |
| gray-100 | gray-700 |
| gray-900 | white |
| primary-500 | primary-400 |

### 10.2. CSS 변수

```css
:root {
  --bg-primary: #FFFFFF;
  --bg-secondary: #F9FAFB;
  --text-primary: #111827;
  --text-secondary: #6B7280;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1F2937;
    --bg-secondary: #111827;
    --text-primary: #FFFFFF;
    --text-secondary: #9CA3AF;
  }
}
```

---

## 11. 접근성 (Accessibility)

### 11.1. 색상 대비

- **일반 텍스트**: 최소 4.5:1 대비율
- **큰 텍스트**: 최소 3:1 대비율
- **UI 컴포넌트**: 최소 3:1 대비율

### 11.2. 포커스 표시

```css
:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

### 11.3. 터치 타겟

- **최소 크기**: 44px x 44px
- **간격**: 최소 8px

### 11.4. ARIA 라벨

```tsx
// 아이콘 버튼
<button aria-label="알림 열기">
  <BellIcon />
</button>

// 뱃지
<span aria-label="읽지 않은 알림 5개">5</span>
```

---

## 12. 반응형 디자인

### 12.1. 브레이크포인트

```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### 12.2. 모바일 최적화

- 하단 네비게이션 바: 56px 높이
- Safe Area 대응 (노치, 홈바)
- 터치 친화적 UI

```css
/* Safe Area */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

.safe-area-top {
  padding-top: env(safe-area-inset-top);
}
```

---

## 13. Tailwind CSS 설정

### 13.1. tailwind.config.js

```javascript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F5',
          100: '#FFE4E6',
          200: '#FECACA',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
        },
        secondary: {
          50: '#F0F9FF',
          // ...
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '40px'],
      },
      spacing: {
        '18': '72px',
        '88': '352px',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
};
```

---

## 14. 디자인 토큰

### 14.1. tokens.json

```json
{
  "color": {
    "primary": {
      "value": "#F43F5E",
      "type": "color"
    },
    "secondary": {
      "value": "#0EA5E9",
      "type": "color"
    }
  },
  "spacing": {
    "xs": {
      "value": "4px",
      "type": "spacing"
    },
    "sm": {
      "value": "8px",
      "type": "spacing"
    },
    "md": {
      "value": "16px",
      "type": "spacing"
    },
    "lg": {
      "value": "24px",
      "type": "spacing"
    },
    "xl": {
      "value": "32px",
      "type": "spacing"
    }
  },
  "borderRadius": {
    "sm": {
      "value": "4px",
      "type": "borderRadius"
    },
    "md": {
      "value": "8px",
      "type": "borderRadius"
    },
    "lg": {
      "value": "12px",
      "type": "borderRadius"
    },
    "full": {
      "value": "9999px",
      "type": "borderRadius"
    }
  }
}
```

---

**문서 작성일**: 2025-01-18
**작성자**: Claude AI
**검토 필요**: UI/UX 디자이너, Frontend 개발자
