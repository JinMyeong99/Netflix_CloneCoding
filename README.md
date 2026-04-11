# Netflix: 측정 기반 성능 최적화

병목을 측정·개선하고 수치로 검증하는 데 집중한 넷플릭스형 콘텐츠 탐색 개인 프로젝트입니다.

초기 API 요청 수 128→6, LCP 6.2s→3.5s, 이미지 전송량 9.8MB→1.2MB를 달성했습니다.

**배포**: https://netflix-clone-coding-six.vercel.app/

---

## 성능 개선 결과

| 항목 | Before | After | 개선 | 원인 |
|---|---|---|---|---|
| 초기 API 요청 수 | 128 | 6 | ↓95.3% | 목록 단계에서 트레일러 사전 로딩 |
| Home LCP | 6.2s | 3.5s | ↓43.5% | Hero 이미지 preload/우선순위 미설정 |
| 이미지 요청 수 | 222 | 38 | ↓82.9% | 화면 밖 카드 DOM 조기 마운트 |
| 이미지 전송량 | 9.8MB | 1.2MB | ↓87.7% | 화면 크기 무관 고정 이미지 사용 |
| Movie CLS | 0.793 | 0 | ↓100% | 이미지 크기 미지정으로 레이아웃 밀림 |

---

## 최적화 기법

### 1. 트레일러 요청을 모달 오픈 시점으로 분리

목록 단계에서 콘텐츠 카드 수만큼 트레일러 API를 미리 호출하던 구조를 제거했습니다. Promise 캐시로 연속 클릭 시 중복 요청도 방지했습니다.

→ [블로그: 초기 진입 요청 수를 128→6으로 줄인 과정](https://velog.io/@cjm1999/performance-optimization-fanout)

### 2. 이미지 로딩 우선순위 조정

Hero 이미지에 preload/fetchPriority를 적용하고, 포스터 이미지에 srcSet/sizes를 적용해 화면 크기에 맞는 리소스만 받도록 바꿨습니다. 이미지 크기 지정으로 레이아웃 밀림(CLS)도 제거했습니다.

→ [블로그: LCP 6.2s→3.5s, 이미지 전송량과 로딩 우선순위 개선](https://velog.io/@cjm1999/performance-optimization-image-lcp)

### 3. hover 리렌더 전파 차단

React Profiler로 카드 hover마다 부모 캐러셀까지 리렌더가 전파되는 구조를 발견했습니다. hover UI를 CSS group-hover로 전환해 부모 setState를 제거했습니다.

→ [블로그: hover 시 부모 리렌더 전파를 끊은 기록](https://velog.io/@cjm1999/performance-optimization-hover-rerender)

### 4. DOM 누적 제어

Swiper Virtual로 화면 밖 슬라이드 DOM을 제한하고, IntersectionObserver로 무한 스크롤 카드를 화면 근처에 왔을 때만 마운트했습니다.

→ [블로그: 대량 DOM 누적 제어 (Swiper Virtual + IntersectionObserver)](https://velog.io/@cjm1999/performance-optimization-dom-control)

### 5. 캐러셀 양 끝 카드 hover 버그 수정

hover 미리보기 레이어가 center 기준으로 확장되면서 네비게이션 버튼 영역을 가리는 문제를 발견했습니다. 현재 보이는 범위를 기준으로 확장 방향을 계산해 양 끝 카드는 안쪽으로만 확장되도록 수정했습니다.

→ [블로그: 캐러셀 양 끝 콘텐츠 카드 hover 시 버튼 클릭 불가 해결](https://velog.io/@cjm1999/ui-improvement-carousel-hoveralign)

---

## 기술 스택

| 분류 | 기술 |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS |
| 상태관리 | TanStack Query, Zustand |
| 인증/DB | Supabase |
| API | TMDB API |
| UI | Swiper, React Hot Toast |
| 측정 도구 | Lighthouse, Chrome DevTools, React Profiler |

---

## 주요 기능

- 홈/영화/시리즈/트렌딩/검색 페이지
- 캐러셀 기반 콘텐츠 탐색 + hover 미리보기 + 상세 모달
- YouTube 트레일러 재생
- 찜 기능 (LocalStorage 저장, 재방문 시 복원)
- Supabase 기반 로그인/회원가입
- useInfiniteQuery 기반 무한 스크롤
- 검색어 URL 쿼리 동기화 (새로고침·뒤로가기 유지)

---

## 프로젝트 구조

```
src/
├── api/          # TMDB API 요청, 트레일러 캐시
├── components/   # 공통 컴포넌트 (캐러셀, 모달, 카드)
├── hooks/        # 커스텀 훅 (Swiper 범위, IntersectionObserver)
├── pages/        # Home, Movie, Series, Trending, Search
├── store/        # Zustand 전역 상태 (인증, 찜 목록)
└── docs/         # 성능 최적화 측정 기록
```
