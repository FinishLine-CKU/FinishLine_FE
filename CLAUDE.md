# FinishLine_FE

FinishLine(졸업요건 확인 서비스) 프론트엔드. React 19 + Create React App(`react-scripts`) 기반이며 Yarn을 사용한다.

## 구조

- `src/pages/` — 라우트 단위 페이지 (`introPage`, `loginPage`, `signupPage1/2`, `uploadPdfPage`, `graduTestPage`, `oneClickTestPage`, `doneLecturePage`, `manageGraduPage`, `myPage`)
- `src/components/` — 공용 컴포넌트 (`header`, `footer`, `sideBar`, `template`, 각종 `*Modal`, `graduChartComponents`, `uploadPdfComponents` 등)
- `src/utils/` — API 호출, 공용 유틸
- `src/assets/` — 폰트, 이미지
- 주요 라이브러리: `react-router-dom` 7, `axios`, `aphrodite`(CSS-in-JS), `chart.js` + `react-chartjs-2`, `lottie-react`, Channel Talk SDK
- 배포: `main` 브랜치 push 시 `.github/workflows/deploy.yml`이 빌드 후 EC2(Nginx)로 업로드. 환경 변수는 `REACT_APP_*` 접두사, `.env`는 저장소에 포함하지 않는다.

## 코드 리뷰 지침

- 리뷰 댓글, 요약, 제안 코드의 설명은 모두 **한국어**로 작성한다.
- 중요도 순서로 본다.
  1. 런타임 오류·로직 버그 — undefined 접근, 비동기 처리 누락, 조건부 렌더링 오류, 라우팅 파라미터 처리
  2. 보안·민감정보 — API 키/토큰 하드코딩, `.env`·`build/` 커밋, 사용자 입력을 그대로 HTML에 삽입
  3. React 규칙 — hooks 규칙 위반, `useEffect` 의존성 누락/무한 루프, key 누락, 상태를 직접 변경
  4. API 호출 — `axios` 에러 처리 및 로딩 상태 누락, 중복 요청, 언마운트 후 setState
  5. 성능 — 불필요한 리렌더, 큰 컴포넌트에서 매 렌더마다 생성되는 스타일/함수
- `aphrodite` 스타일 중복이나 네이밍 같은 사소한 지적은 실제 문제로 이어질 때만, 짧게 한다.
- 확신이 없으면 단정하지 말고 질문 형태로 남긴다.
- 문제가 없으면 짧은 요약만 남기고 불필요한 칭찬은 하지 않는다.
