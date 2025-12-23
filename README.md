# 🧮 Scientific Calculator Web App

[![Deploy to GitHub Pages](https://github.com/lsm427654-source/calculating/actions/workflows/deploy.yml/badge.svg)](https://github.com/lsm427654-source/calculating/actions/workflows/deploy.yml)

> 현대적이고 직관적인 UI/UX를 갖춘 웹 기반 공학용 계산기

## 🌐 Live Demo

**배포된 사이트**: [https://lsm427654-source.github.io/calculating/](https://lsm427654-source.github.io/calculating/)

![Calculator Preview](./screen.png)

## 📋 프로젝트 개요

공학, 과학, 수학 분야의 학생, 엔지니어, 연구원들을 위한 전문적인 웹 기반 공학용 계산기입니다. 다크 모드 기반의 세련된 디자인과 강력한 계산 기능을 제공합니다.

## ✨ 주요 기능

### 기본 계산
- ✅ 사칙연산 (+, -, ×, ÷)
- ✅ 소수점 계산
- ✅ 양수/음수 전환

### 공학 함수
- 📐 **삼각함수**: sin, cos, tan
- 🔄 **역삼각함수**: sin⁻¹, cos⁻¹, tan⁻¹
- 📊 **쌍곡선 함수**: sinh, cosh, tanh
- 📈 **지수/로그**: x², xʸ, √x, ln, log, exp, 10ˣ
- 🔢 **기타 함수**: |x|, 1/x, n!, mod
- 🎯 **수학 상수**: π, e

### UI/UX 기능
- 🌙 다크 모드 지원
- 📱 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 📜 계산 히스토리
- ⌨️ 키보드 입력 지원 (예정)
- 📋 결과 복사 기능

## 🛠️ 기술 스택

- **HTML5** - 시맨틱 마크업
- **CSS3** - 스타일링 및 애니메이션
- **TailwindCSS** - 유틸리티 기반 CSS 프레임워크
- **JavaScript (ES6+)** - 계산 로직 및 인터랙션
- **Google Fonts** - Space Grotesk
- **Material Symbols** - 아이콘

## 📁 프로젝트 구조

```
calculating/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 배포 워크플로우
├── PRD.md                  # 제품 요구사항 명세서
├── TECH_SPEC.md            # 기술 명세서
├── DEPLOYMENT.md           # 배포 가이드
├── README.md               # 프로젝트 소개
├── code.html               # 메인 HTML 파일
├── screen.png              # 디자인 프리뷰
└── .git/                   # Git 저장소
```

## 🚀 시작하기

### 로컬 실행

1. 저장소 클론
```bash
git clone https://github.com/lsm427654-source/calculating.git
cd calculating
```

2. 브라우저에서 열기
```bash
# 단순히 code.html 파일을 브라우저에서 열기
start code.html  # Windows
open code.html   # macOS
```

또는 로컬 서버 실행:
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server
```

3. 브라우저에서 접속
```
http://localhost:8000
```

## 📖 문서

- **[PRD.md](./PRD.md)** - 상세한 제품 요구사항 명세서
  - 기능 요구사항
  - 기술 사양
  - UI/UX 가이드라인
  - 개발 로드맵

- **[TECH_SPEC.md](./TECH_SPEC.md)** - 기술 명세서
  - 아키텍처 설계
  - 구현 가이드
  - 알고리즘 설명
  - 코드 예시

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - 배포 가이드
  - GitHub Actions 설정
  - GitHub Pages 배포
  - 문제 해결

## 🗺️ 개발 로드맵

### Phase 1: MVP (진행 중)
- [x] UI/UX 디자인 완성
- [x] 반응형 레이아웃
- [x] 다크 모드 스타일링
- [ ] JavaScript 계산 엔진
- [ ] 기본 사칙연산

### Phase 2: 공학 함수
- [ ] 삼각함수 구현
- [ ] 지수/로그 함수
- [ ] 각도 모드 전환 (DEG/RAD)
- [ ] 수학 상수 지원

### Phase 3: 고급 기능
- [ ] 계산 히스토리
- [ ] 결과 복사 기능
- [ ] 키보드 입력 지원
- [ ] 2nd 기능

### Phase 4: 개선
- [ ] 설정 패널
- [ ] 테마 전환
- [ ] 로컬 스토리지
- [ ] 성능 최적화

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: `#137fec`
- **Background (Dark)**: `#101922`
- **Surface (Dark)**: `#1c2630`
- **Surface (Darker)**: `#283039`

### 타이포그래피
- **폰트**: Space Grotesk
- **크기**: 10px ~ 60px (반응형)

## 🤝 기여하기

기여를 환영합니다! 다음 단계를 따라주세요:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📧 연락처

프로젝트 링크: [https://github.com/lsm427654-source/calculating](https://github.com/lsm427654-source/calculating)

---

**Made with ❤️ by lsm427654-source**
