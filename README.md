# 이승준 — Railway BIM Portfolio

React + TypeScript + Vite 기반 반응형 프런트엔드입니다. 검정 배경과 블루 포인트, 중앙 내비게이션, 자기소개, 갤러리, 경력 구성을 적용했습니다.

## 실행 및 빌드

Node.js 22.12 이상을 사용합니다.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

Vercel: **Vite** / Build Command **npm run build** / Output Directory **dist**. 서버·환경변수는 필요하지 않습니다.

## 실제 콘텐츠

사용자가 제공한 `이승준_포트폴리오.pdf` 11쪽을 검토해 정리했습니다.

- **프로젝트 5건:** 국도, 도로 및 방음터널, 고속철도 2025, 지하철도, 고속철도 2026.
- **핵심역량 4건:** LiDAR·스캔 역설계, 모델링 자동화, 데이터 시각화·4D 시뮬레이션, AI·MCP BIM 자동화.
- **경력·학력:** KCMC, 집인, 공주대학교 문화재보존과학과 학사·석사. 기간·재직 상태는 원본 기재 기준입니다.
- **연락처:** 사용자가 제공한 이메일과 PDF의 전화번호. 문의는 메일·전화 앱을 엽니다.

원본에 없는 지역·면적·입사 연도·기여율은 추가하지 않았습니다. AI·MCP 화면은 원본의 오프라인 데모·샘플 데이터 표기를 유지합니다.

## 수정 위치

- `src/content.ts`: 이름·소개·연락처·프로젝트·핵심역량·도구·경력.
- `src/App.tsx`: 구성, 필터, 상세 보기, 이미지 확대, 메뉴.
- `src/styles.css`: 색상, 글꼴, 반응형 레이아웃.
- `public/images/portfolio/`: 원본 PDF에서 추출한 WebP 이미지 26개.
- `public/downloads/lee-seungjun-portfolio.pdf`: 변경하지 않은 원본 사본, 약 52 MB. 링크를 누를 때만 요청됩니다.
- `index.html`: 제목, 검색 설명, Open Graph. 배포 도메인이 확정되면 canonical, `og:url`, 절대 URL의 `og:image`를 추가하세요.

상세 주소: `/#project/national-road-2024`, `/#capability/ai-mcp-bim`. 사진 확대 창은 Escape로 닫고 좌우 방향키로 이동합니다. 원본 PDF 버튼에는 해당 페이지 위치가 연결됩니다.

영상은 `public/videos/`에 저장하고 항목의 `video`에 경로를 추가하세요. 현재 PDF에는 영상 파일이 없어 이미지만 표시합니다.

## 자료 관리

원본과 웹 항목의 대응은 `docs/content-map.md`에 정리했습니다. Pillow·Poppler 환경에서 다음 명령으로 이미지 추출을 재현할 수 있습니다. 원본은 수정하지 않습니다.

```sh
python scripts/extract_portfolio.py "포트폴리오.pdf의 경로"
```

웹폰트는 Google Fonts를 사용하며 실패하면 시스템 글꼴로 표시됩니다. 작업 이미지는 모두 로컬 파일입니다.

코드 정리: `npm run format` / 타입 검사: `npm run typecheck`
