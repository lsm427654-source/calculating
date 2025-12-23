# GitHub Pages 배포 가이드

## 🚀 자동 배포 설정

이 프로젝트는 **GitHub Actions**를 사용하여 자동으로 빌드하고 **GitHub Pages**에 배포됩니다.

## 📋 설정 단계

### 1. GitHub Pages 활성화

1. GitHub 저장소로 이동: https://github.com/lsm427654-source/calculating
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Source** 섹션에서:
   - Source: **GitHub Actions** 선택
5. 저장

### 2. 배포 확인

- `main` 브랜치에 푸시하면 자동으로 배포됩니다
- **Actions** 탭에서 배포 진행 상황 확인 가능
- 배포 완료 후 URL: https://lsm427654-source.github.io/calculating/

## 🔄 배포 워크플로우

```
코드 푸시 (main 브랜치)
         ↓
GitHub Actions 트리거
         ↓
    빌드 작업
         ↓
  아티팩트 업로드
         ↓
 GitHub Pages 배포
         ↓
   사이트 라이브!
```

## 📝 워크플로우 파일

`.github/workflows/deploy.yml` 파일이 배포를 자동화합니다.

### 주요 기능
- ✅ `main` 브랜치 푸시 시 자동 배포
- ✅ Pull Request 시 빌드 검증
- ✅ 수동 배포 가능 (workflow_dispatch)
- ✅ 동시 배포 방지 (concurrency 설정)

## 🛠️ 로컬 테스트

배포 전 로컬에서 테스트:

```bash
# Python 간단한 서버
python -m http.server 8000

# Node.js http-server
npx http-server

# 브라우저에서 열기
# http://localhost:8000
```

## 🔧 문제 해결

### 배포가 실패하는 경우

1. **Actions** 탭에서 에러 로그 확인
2. **Settings > Pages**에서 Source가 "GitHub Actions"로 설정되었는지 확인
3. 저장소가 Public인지 확인 (Private 저장소는 Pro 계정 필요)

### 페이지가 표시되지 않는 경우

1. 배포 완료까지 1-2분 대기
2. 브라우저 캐시 삭제 후 새로고침
3. URL 확인: `https://lsm427654-source.github.io/calculating/`

## 📦 향후 빌드 프로세스 추가

현재는 정적 HTML 파일을 직접 배포하지만, 향후 다음과 같은 빌드 단계를 추가할 수 있습니다:

```yaml
- name: Install dependencies
  run: npm install

- name: Build
  run: npm run build

- name: Minify assets
  run: |
    npx html-minifier --input-dir . --output-dir dist
    npx terser js/*.js -o dist/js/app.min.js
    npx csso css/*.css -o dist/css/styles.min.css
```

## 🌐 커스텀 도메인 (선택사항)

1. **Settings > Pages**에서 Custom domain 입력
2. DNS 설정에서 CNAME 레코드 추가:
   ```
   CNAME: your-domain.com → lsm427654-source.github.io
   ```
3. HTTPS 강제 활성화

## 📊 배포 상태 뱃지

README에 배포 상태 뱃지 추가:

```markdown
[![Deploy](https://github.com/lsm427654-source/calculating/actions/workflows/deploy.yml/badge.svg)](https://github.com/lsm427654-source/calculating/actions/workflows/deploy.yml)
```

---

**배포 URL**: https://lsm427654-source.github.io/calculating/
