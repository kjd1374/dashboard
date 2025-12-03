# 웹 서비스 대시보드

자주 사용하는 웹 서비스들을 한눈에 보고 관리할 수 있는 대시보드입니다.

## 주요 기능

- ✅ **서비스 추가/수정/삭제**: 웹 서비스를 쉽게 관리할 수 있습니다
- ✅ **카테고리 관리**: 서비스를 카테고리별로 분류하여 관리합니다
- ✅ **검색 기능**: 이름, URL, 설명, 카테고리로 검색할 수 있습니다
- ✅ **원클릭 접근**: 카드를 클릭하면 새 탭에서 해당 서비스로 이동합니다
- ✅ **로컬 저장**: 브라우저 로컬 스토리지에 자동 저장됩니다
- ✅ **반응형 디자인**: 모바일과 데스크톱 모두에서 사용 가능합니다

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 사용 방법

1. **서비스 추가**: 상단의 "+ 서비스 추가" 버튼을 클릭하여 새 서비스를 추가합니다
2. **서비스 수정**: 카드의 ✏️ 아이콘을 클릭하여 수정합니다
3. **서비스 삭제**: 카드의 🗑️ 아이콘을 클릭하여 삭제합니다
4. **서비스 접근**: 카드를 클릭하면 새 탭에서 해당 서비스로 이동합니다
5. **카테고리 필터**: 상단의 카테고리 버튼을 클릭하여 필터링합니다
6. **검색**: 검색창에 키워드를 입력하여 서비스를 검색합니다

## GitHub Pages 배포

이 프로젝트는 GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

### 배포 방법

1. **GitHub 리포지토리 생성**
   - GitHub에서 새 리포지토리를 생성합니다
   - 리포지토리 이름을 기억해두세요 (예: `dashboard`)

2. **리포지토리 이름에 맞게 설정 수정**
   - `vite.config.ts` 파일의 `base` 경로를 리포지토리 이름에 맞게 수정합니다:
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/리포지토리이름/' : '/',
   ```
   - 예: 리포지토리 이름이 `dashboard`인 경우 `'/dashboard/'`로 설정

3. **코드 푸시**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/사용자명/리포지토리이름.git
   git push -u origin main
   ```

4. **GitHub Pages 설정**
   - GitHub 리포지토리 페이지로 이동
   - Settings → Pages 메뉴로 이동
   - Source를 "GitHub Actions"로 선택
   - `main` 브랜치에 푸시하면 자동으로 배포가 시작됩니다

5. **배포 확인**
   - Actions 탭에서 배포 진행 상황을 확인할 수 있습니다
   - 배포 완료 후 `https://사용자명.github.io/리포지토리이름/`에서 확인 가능합니다

### 루트 도메인 사용 시

만약 `사용자명.github.io` 같은 루트 도메인을 사용하는 경우:
- `vite.config.ts`의 `base`를 `'/'`로 설정하세요

## 기술 스택

- React 18
- TypeScript
- Vite
- CSS3
- GitHub Actions

