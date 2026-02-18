# Netflix Clone

Netflix의 콘텐츠 탐색 UX(캐러셀, hover 프리뷰, 상세 모달)를 재현하고, 병목을 측정 기반으로 개선한 개인 프로젝트입니다.

- 배포: [https://netflix-clone-coding-six.vercel.app/](https://netflix-clone-coding-six.vercel.app/)
- 레포: [https://github.com/JinMyeong99/Netflix_CloneCoding](https://github.com/JinMyeong99/Netflix_CloneCoding)
- Case Study(요약): [Netflix 클론 코딩 성능 최적화](https://velog.io/@cjm1999/Netflix-%ED%81%B4%EB%A1%A0-%EC%BD%94%EB%94%A9-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94)

## 핵심 기능

- 홈/영화/시리즈/트렌딩/검색 페이지 구성
- 캐러셀 기반 콘텐츠 탐색 + hover 프리뷰 + 상세 모달
- 트레일러 재생(YouTube 연동), 찜(Favorite) 관리
- Supabase Auth 기반 로그인/회원가입/세션 유지
- React Query `useInfiniteQuery` 기반 무한 스크롤 및 캐싱

## 성능 개선 하이라이트

측정 도구: Lighthouse, Chrome DevTools Network, React Profiler

| 항목 | Before | After | 개선 |
| --- | --- | --- | --- |
| Home LCP | 6.2s | 3.5s | -43.5% |
| Home 초기 Fetch/XHR 요청 | 128 | 6 | -95.3% |
| Home 이미지 요청 | 222 | 38 | -82.9% |
| Movie CLS | 0.793 | 0 | -100% |

적용한 주요 최적화:

1. `/videos` fan-out 제거: 트레일러 on-demand + in-flight Promise 캐시
2. 이미지 전송 최적화: `srcSet/sizes` + Hero `preload/fetchPriority`
3. hover 리렌더 전파 차단: 부모 hover state 제거 + CSS-only(`group-hover`)
4. DOM 누적 제어: Swiper Virtual + IntersectionObserver
5. 캐러셀 UX 버그 개선: `hoverAlign`으로 양 끝 카드 버튼 클릭 안정화

## 기술 스택

- Frontend: React 19, React Router, Vite, Tailwind CSS
- Data Fetching: TanStack Query
- State: Zustand
- Backend/Auth: Supabase Auth
- API: TMDB API
- UI/Interaction: Swiper, React Hot Toast

현재 코드베이스는 React + JavaScript(JSX) 기반입니다.

## 실행 방법

### 1) 설치

```bash
npm install
```

### 2) 환경 변수 설정

프로젝트 루트에 `.env` 파일을 만들고 아래 값을 입력합니다.

```bash
VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### 3) 개발 서버 실행

```bash
npm run dev
```

기본 접속 주소: `http://localhost:5173`

## 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 빌드 결과 로컬 미리보기
- `npm run lint`: ESLint 실행

## 프로젝트 구조

```text
src/
  api/          # TMDB/Supabase 연동, fetch 유틸
  components/   # UI 컴포넌트(카드, 캐러셀, 모달 등)
  hooks/        # 쿼리/인터랙션/스크롤 관련 커스텀 훅
  pages/        # 라우트 페이지(Home/Movie/Series/Search...)
  store/        # Zustand 전역 상태(Auth/Favorite/Detail)
docs/           # 성능 최적화 및 UX 개선 문서
```

## 케이스 스터디

### Velog

1. [fan-out 제거 (on-demand + Promise 캐시)](https://velog.io/@cjm1999/1-fan-out-%EC%9A%94%EC%B2%AD-%ED%8F%AD%EC%A6%9D-%EC%A0%9C%EA%B1%B0-%ED%8A%B8%EB%A0%88%EC%9D%BC%EB%9F%AC-on-demand-%EC%BA%90%EC%8B%9C)
2. [이미지/LCP 개선 (srcset/sizes + preload)](https://velog.io/@cjm1999/Netflix-Clone-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-3-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%A0%84%EC%86%A1%EB%9F%89-%EC%A4%84%EC%9D%B4%EA%B3%A0-LCP-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0-srcsetsizespreload)
3. [hover 리렌더 전파 차단 (CSS-only)](https://velog.io/@cjm1999/Netflix-Clone-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-2-hover-%EB%A6%AC%EB%A0%8C%EB%8D%94-%EC%A0%84%ED%8C%8C-%EB%81%8A%EA%B8%B0-%EB%B6%80%EB%AA%A8-state-%EC%A0%9C%EA%B1%B0-CSS-only)
4. [DOM 누적 제어 (Swiper Virtual + IntersectionObserver)](https://velog.io/@cjm1999/Netflix-Clone-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94-4-%EB%8C%80%EB%9F%89-DOM-%EB%88%84%EC%A0%81-%EC%A0%9C%EC%96%B4-Swiper-Virtual-IntersectionObserver)
5. [캐러셀 양 끝 hover 버튼 클릭 이슈 개선 (hoverAlign)](https://velog.io/@cjm1999/Netflix-Clone-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-5-Swiper-%EB%84%A4%EB%B9%84-%EB%B2%84%ED%8A%BC%EC%9D%B4-%EC%95%88-%EB%88%8C%EB%A6%AC%EB%8D%98-%EC%9D%B4%EC%9C%A0-hover-scale%EC%9D%B4-%EB%B2%84%ED%8A%BC%EC%9D%84-%EA%B0%80%EB%A6%BC-hoverAlign%EB%A1%9C-%ED%99%95%EC%9E%A5-%EB%B0%A9%ED%96%A5-%EC%A0%9C%EC%96%B4)

### Local Docs

- [성능 최적화 종합 리포트](docs/netflix-clone-performance-optimization-report.md)
- [fan-out 제거](docs/netflix-clone-performance-optimization-fanout.md)
- [이미지/LCP 개선](docs/netflix-clone-performance-optimization-image-lcp.md)
- [hover 리렌더 전파 차단](docs/netflix-clone-performance-optimization-hover-rerender.md)
- [DOM 누적 제어](docs/netflix-clone-performance-optimization-dom-control.md)
- [캐러셀 hoverAlign 개선](docs/netflix-clone-ui-improvement-carousel-hoveralign.md)
