# 로컬 개발 서버 설정

## 고정 포트
**이 프로젝트는 로컬 개발 시 포트 8080을 사용합니다.**

---

## 디자인 컨셉 확인 방법

### Windows (CMD)
```cmd
cd C:\Users\USER\Desktop\gemini\dong\design-concepts
python -m http.server 8080
```

### Windows (PowerShell)
```powershell
cd C:\Users\USER\Desktop\gemini\dong\design-concepts
python -m http.server 8080
```

### 브라우저 접속
```
http://localhost:8080
```

---

## 전체 프로젝트 실행 (개발 시)

### Frontend
```bash
cd client
npm install
npm run dev -- --port 8080
```

### Backend
```bash
cd server
npm install
npm run dev  # 기본 포트 3000
```

---

## 주의사항
- Python이 설치되어 있어야 합니다
- 포트 8080이 이미 사용 중이면 다른 프로그램을 종료하세요
- `python` 명령이 안 되면 `python3` 또는 `py`를 사용하세요

---

**포트 고정 이유**: 팀 내 일관성 유지 및 문서화 용이
