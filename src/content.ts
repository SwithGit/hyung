// 실제 콘텐츠의 근거: 포트폴리오 12쪽과 사용자가 제공한 플러그인 구동·배포 이미지.
// 기간·역할·성과는 원본을 기준으로 정리했습니다. 미기재 지역·면적은 추가하지 않습니다.
const asset = (name: string) => `/images/portfolio/${name}.webp`;
export const studio = {
  name: "SEUNGJUN",
  nameKo: "이승준 포트폴리오",
  designerName: "이승준",
  role: "철도 · 토목 BIM",
  tagline: "Data-Driven Railway Design",
  introduction: [
    "도로와 철도의 토공·구조물을 3차원 모델로 연결하고, 설계 데이터를 수량·도면·시각화 산출물로 이어갑니다.",
    "국도, 방음터널, 고속철도, 지하철도 프로젝트에서 BIM 모델링과 통합모델 구축, 반복 작업의 자동화를 수행했습니다.",
    "드론 LiDAR·스캔 기반 역설계부터 매개변수 모델링, 4D 공정 시뮬레이션까지. 프로젝트의 맥락에 맞는 도구로 설계 정보를 구체화합니다.",
    "AI·MCP를 활용한 표준횡단(PKT) 소프트웨어와 영상지도 플러그인을 직접 기획·제작합니다. 사용 화면과 안내서를 설계하고 부서원들에게 배포하며, 함께 활용하는 도구로 발전시키고 있습니다.",
  ],
  email: "bokjun0522@naver.com",
  phone: "010-9551-8279",
  instagram: "",
  profileImage: asset("profile-railway"),
  profileImageAlt:
    "이승준 포트폴리오 표지의 철도·교량·터널 와이어프레임 일러스트",
  resumeUrl: "/downloads/lee-seungjun-portfolio.pdf",
  pdfSize: "30 MB · 12쪽",
};

export const categories = ["전체", "도로", "철도", "지하철도"] as const;
export type Category = (typeof categories)[number];
export type Project = {
  id: string;
  kind: "project" | "capability";
  number: string;
  title: string;
  subtitle: string;
  category: string;
  period?: string;
  cover: string;
  images: {
    src: string;
    caption: string;
    title?: string;
    description?: string;
  }[];
  description: string;
  concept: string;
  tools?: string[];
  tasks?: string[];
  technologies?: string[];
  outcomes?: string[];
  sourcePages: number[];
  relatedIds?: string[];
  note?: string;
  video?: string; // 원본 영상이 있을 때 /videos/example.mp4 경로를 추가하세요.
  featured?: boolean;
  workflow?: { title: string; description: string }[];
};

export const projects: Project[] = [
  {
    id: "national-road-2024",
    kind: "project",
    number: "01",
    title: "국도 건설사업",
    subtitle: "National Road · Earthwork & Quantities",
    category: "도로",
    period: "2024.04 — 2024.08",
    cover: asset("road-route"),
    images: [
      { src: asset("road-route"), caption: "도로 전체 노선 · 통합모델" },
      { src: asset("road-corridor"), caption: "도로 코리더 · 본선 3D 모델" },
      {
        src: asset("road-quantities"),
        caption: "모델 기반 수량 검토 절차 · 보고서 4-92",
      },
    ],
    description: "선형과 코리더를 기반으로 도로 전체 노선을 모델링하다.",
    concept:
      "도로·토공 BIM 모델링을 수행하고, 도로 선형과 코리더를 기반으로 전체 노선의 통합모델을 구축했습니다. 3차원 모델 기반 수량 산출과 검토를 진행하며 모델·수량 검토 자료를 작성했습니다.",
    tasks: [
      "도로·토공 BIM 모델링",
      "도로 선형·코리더 기반 모델 구축",
      "3차원 모델 기반 수량 산출",
    ],
    technologies: [
      "도로 선형·코리더 기반 3D 모델링",
      "3차원 모델 기반 수량 검토",
    ],
    outcomes: [
      "전체 노선의 도로 통합모델 구축",
      "모델 기반 3D 수량 산출",
      "모델·수량 검토 자료 작성",
    ],
    sourcePages: [3],
  },
  {
    id: "noise-tunnel-2024",
    kind: "project",
    number: "02",
    title: "도로 및 방음터널 건설사업",
    subtitle: "Road & Noise Barrier Tunnel",
    category: "도로",
    period: "2024.09 — 2024.12",
    cover: asset("noise-tunnel-model"),
    images: [
      {
        src: asset("noise-tunnel-model"),
        caption: "도로 및 방음터널 · 통합모델 시각화",
      },
      {
        src: asset("noise-tunnel-family"),
        caption: "방음터널 · 구성요소 및 패밀리 모델",
      },
      {
        src: asset("noise-tunnel-section"),
        caption: "방음터널 단면 · 매개변수 기반 구성",
      },
      {
        src: asset("automation-dynamo"),
        caption:
          "Dynamo 활용 · 선형 좌표와 패밀리 매개변수를 연결한 모델링 로직",
      },
      {
        src: asset("simulation-timeliner"),
        caption: "Navisworks TimeLiner · BIM 모델과 공정 일정 연계",
      },
    ],
    description: "매개변수와 선형을 연결해 반복 배치를 자동화하다.",
    concept:
      "방음터널의 타입별 패밀리와 매개변수를 구성하고, 도로 선형에 맞춘 반복 배치를 Dynamo로 자동화했습니다. 단면별 라이브러리를 반복 적용하며 구성요소·단면·시각화 자료를 제작했습니다.",
    tools: ["Revit", "Dynamo", "Navisworks TimeLiner"],
    tasks: [
      "방음터널 BIM 모델링",
      "타입별 패밀리와 매개변수 구성",
      "도로 선형에 맞춘 반복 배치 자동화",
    ],
    technologies: [
      "Revit 패밀리·매개변수 구성",
      "Dynamo 기반 선형 배치 자동화",
      "4D 공정 시뮬레이션",
    ],
    outcomes: [
      "매개변수 기반 방음터널 모델 구축",
      "단면별 라이브러리의 반복 적용",
      "구성요소·단면·시각화 자료 작성",
    ],
    sourcePages: [4, 9, 10],
  },
  {
    id: "high-speed-rail-2025",
    kind: "project",
    number: "03",
    title: "고속철도 건설사업 · 2025",
    subtitle: "High-Speed Railway · Earthwork & Automation",
    category: "철도",
    period: "2025.02 — 2025.12",
    cover: asset("rail-2025-earthwork"),
    images: [
      {
        src: asset("rail-2025-earthwork"),
        caption: "토공 4구간 · 노반·사면 및 부대시설 통합",
      },
      {
        src: asset("rail-2025-route"),
        caption: "3차원 통합모델 전경 · BIM 모델 현황 3-13",
      },
      {
        src: asset("rail-2025-facilities"),
        caption: "울타리 및 안전난간 · 부대공 자동화",
      },
      {
        src: asset("automation-fence"),
        caption: "철도 사면을 따라 연속 배치한 낙석방지책 모델링",
      },
    ],
    description: "토공·노반부터 부대시설까지, 하나의 통합모델로.",
    concept:
      "토공·노반 BIM 모델링과 도면화를 수행하고, 모델 기반 수량 산출 및 간섭 검토를 진행했습니다. 울타리 등 부대시설의 모델링 방식을 도입·최적화하며 통합모델 영상과 설계 산출물을 제작했습니다.",
    tools: [
      "Civil 3D",
      "Revit",
      "Rhino · Grasshopper",
      "Navisworks",
      "InfraWorks",
      "Premiere Pro",
    ],
    tasks: [
      "토공·노반 BIM 모델링 및 도면화",
      "모델 기반 수량 산출 및 간섭 검토",
      "부대시설 자동화·통합모델 영상 제작",
    ],
    outcomes: [
      "울타리 등 부대시설을 통합모델에 반영",
      "부대공 모델링 방식 도입 및 최적화",
      "모델·도면·수량·시각화 산출물 제작",
    ],
    sourcePages: [5, 9],
  },
  {
    id: "underground-rail-2025",
    kind: "project",
    number: "04",
    title: "지하철도 건설사업",
    subtitle: "Underground Railway · Structures & Visualization",
    category: "지하철도",
    period: "2025.04 — 2025.08",
    cover: asset("metro-route"),
    images: [
      {
        src: asset("metro-route"),
        caption: "전체 노선 · 도시철도 통합모델 시각화",
      },
      { src: asset("metro-station"), caption: "정거장 · 정거장·터널 통합모델" },
      { src: asset("metro-section"), caption: "터널 단면 · 검토 이미지" },
    ],
    description: "정거장과 터널, 지하 지장물의 관계를 모델로 연결하다.",
    concept:
      "지하철도 구조물 BIM 모델링을 수행하고 터널·지하 지장물의 반복 모델링을 자동화했습니다. 정거장과 터널을 통합한 모델을 기반으로 시각화 및 영상 산출물을 제작했습니다.",
    tasks: [
      "지하철도 구조물 BIM 모델링",
      "터널 및 지하 지장물 자동화 모델링",
      "정거장·터널 통합모델 영상 제작",
    ],
    technologies: [
      "터널·지장물 반복 모델링 자동화",
      "정거장·터널 모델 및 영상 시각화",
    ],
    outcomes: [
      "터널·지장물 반복 모델링 자동화",
      "정거장·터널 BIM 모델 구축",
      "지하철도 시각화·영상 산출물 제작",
    ],
    sourcePages: [6],
  },
  {
    id: "high-speed-rail-2026",
    kind: "project",
    number: "05",
    title: "고속철도 건설사업 · 2026",
    subtitle: "High-Speed Railway · Integrated BIM & CDE",
    category: "철도",
    period: "2026.02 — 진행 중",
    cover: asset("rail-2026-entrance"),
    images: [
      {
        src: asset("rail-2026-entrance"),
        caption: "터널 시점부 · 지형·노반·터널 시각화",
      },
      {
        src: asset("rail-2026-exit"),
        caption: "터널 종점부 · 주변 지형과 구조물 통합 시각화",
      },
      { src: asset("rail-2026-bridge"), caption: "교량 · 구조물 BIM 모델" },
      {
        src: asset("rail-2026-analysis"),
        caption: "터널 종점부 · 갱구부 및 주변 지형 분석",
      },
    ],
    description: "지형·노반·교량·터널을 연결하고 CDE로 협업하다.",
    concept:
      "토공·구조물 BIM 모델을 구축하고 공통데이터환경(CDE)을 기반으로 모델을 공유·협업합니다. 터널 시·종점 주변의 시각화 장면과 드론뷰 영상, 협업 자료를 구성했습니다.",
    tasks: [
      "토공·구조물 BIM 모델링",
      "CDE 기반 모델 공유·협업",
      "통합모델 시각화 및 영상 제작",
    ],
    technologies: [
      "지형·노반·교량·터널 통합모델",
      "공통데이터환경(CDE)·영상 시각화",
    ],
    outcomes: [
      "교량·터널 등 시설물 모델 정리",
      "터널 시·종점 주변 시각화 장면 제작",
      "드론뷰 영상 및 협업 자료 구성",
    ],
    sourcePages: [7],
  },
];

export const capabilities: Project[] = [
  {
    id: "lidar-reverse-design",
    kind: "capability",
    number: "01",
    title: "드론 LiDAR·스캔 기반 역설계",
    subtitle: "LiDAR & Scan-to-BIM",
    category: "역설계",
    cover: asset("lidar-terrain"),
    images: [
      {
        src: asset("lidar-flight"),
        caption: "드론 비행 경로 및 스캔 대상 영역",
      },
      { src: asset("lidar-cloud"), caption: "구역별 스캔 데이터와 점군 검토" },
      {
        src: asset("lidar-terrain"),
        caption: "지형 고도 분포를 표현한 3차원 데이터",
      },
    ],
    description: "현장의 형상을 데이터로 읽다.",
    concept:
      "드론 LiDAR·스캔 기반 역설계 작업을 소개합니다. 비행 경로와 스캔 영역, 구역별 점군, 지형 고도 분포를 통해 현장 데이터를 3차원으로 확인하는 과정을 보여줍니다.",
    technologies: ["드론 LiDAR", "스캔 기반 역설계", "점군·지형 데이터"],
    sourcePages: [8],
  },
  {
    id: "modeling-automation",
    kind: "capability",
    number: "02",
    title: "모델링 자동화",
    subtitle: "Parametric Modeling & Automation",
    category: "자동화",
    cover: asset("automation-dynamo"),
    images: [
      {
        src: asset("automation-dynamo"),
        caption: "Dynamo 활용 · 도로 및 방음터널 건설사업",
      },
      {
        src: asset("automation-fence"),
        caption: "부대공 모델링 · 고속철도 건설사업",
      },
    ],
    description: "선형과 매개변수로 반복 작업을 연결하다.",
    concept:
      "선형 좌표와 패밀리 매개변수를 Dynamo 로직에 연결해 방음터널의 반복 모델링과 변경 사항을 반영합니다. 철도 사면의 낙석방지책 모델은 선형에 따른 부대시설의 연속 배치를 보여줍니다.",
    tools: ["Dynamo", "Revit"],
    technologies: ["선형·매개변수 기반 모델링", "부대시설 연속 배치"],
    relatedIds: ["noise-tunnel-2024", "high-speed-rail-2025"],
    sourcePages: [9],
  },
  {
    id: "visualization-simulation",
    kind: "capability",
    number: "03",
    title: "데이터 시각화 및 시뮬레이션",
    subtitle: "Visualization & 4D Simulation",
    category: "시각화",
    cover: asset("visualization-tunnel"),
    images: [
      {
        src: asset("visualization-tunnel"),
        caption: "고속철도 통합모델 · 지형·구조물 시각화",
      },
      {
        src: asset("simulation-timeliner"),
        caption: "도로 및 방음터널 · Navisworks TimeLiner 4D 공정 시뮬레이션",
      },
    ],
    description: "모델에 주변 환경과 공정의 시간을 더하다.",
    concept:
      "지형·노반·터널 모델을 함께 구성해 주변 환경과의 관계를 보여주고 설계 설명용 이미지·영상으로 제작합니다. Navisworks TimeLiner에서는 모델과 공정 일정을 연계해 시공 순서와 단계별 진행 상태를 시각적으로 검토합니다.",
    tools: ["Navisworks TimeLiner"],
    technologies: ["지형·구조물 통합 시각화", "4D 공정 일정 연계"],
    relatedIds: ["noise-tunnel-2024"],
    sourcePages: [10],
  },
  {
    id: "ai-mcp-bim",
    kind: "capability",
    number: "04",
    title: "AI·MCP를 활용한 BIM 자동화",
    subtitle: "AI · MCP · PKT Workflow",
    category: "자체 제작 S/W",
    cover: asset("ai-pkt-interface"),
    images: [
      {
        src: asset("ai-pkt-interface"),
        caption: "자체 기획·제작 S/W · 표준횡단(PKT) 제작 인터페이스 시연",
      },
      {
        src: asset("ai-pkt-sections"),
        caption: "표준횡단(PKT) 구성 예시 · 단면 비교",
      },
    ],
    description: "표준횡단 제작을 위한 새로운 작업 방식을 탐구하다.",
    concept:
      "AI·MCP를 활용한 표준횡단(PKT) 제작 소프트웨어를 자체 기획·제작했습니다. 포트폴리오에서는 성토 사면·소단 구성 요청, PKT 구조 확인, 수정안과 결과 단면을 보여주는 인터페이스를 소개합니다.",
    technologies: [
      "AI·MCP 활용",
      "표준횡단(PKT) 제작",
      "자체 기획·제작 소프트웨어",
    ],
    note: "원본에 오프라인 데모 모드·샘플 데이터로 표기된 시연 화면입니다. 실제 서버 호출 및 파일 변경은 없는 데모입니다.",
    sourcePages: [11],
  },
  {
    id: "ai-plugin-development",
    kind: "capability",
    number: "05",
    title: "AI를 활용한 플러그인 제작",
    subtitle: "ORTHOMAP · From idea to team workflow",
    category: "자체 제작 · 부서 배포",
    featured: true,
    cover: "/images/portfolio/orthomap-running.png",
    images: [
      {
        src: "/images/portfolio/orthomap-running.png",
        title: "프로그램 내 구동",
        caption: "CAD 선택 경계와 영상지도를 연결한 실제 구동 화면",
        description:
          "CAD에서 선택한 경계를 지도에서 확인하고, 해상도를 지정해 경계 영역을 저장·배치하도록 구성했습니다.",
      },
      {
        src: "/images/portfolio/orthomap-planning-distribution.png",
        title: "프로그램 기획·디자인 및 배포",
        caption: "사용 흐름, 사내 배포 안내서와 설치 아이콘",
        description:
          "실행·설정·영상 확인·병합의 흐름을 설계하고, 사용 안내서와 설치 아이콘을 제작해 부서원들에게 배포했습니다.",
      },
    ],
    description: "직접 만든 도구를, 함께 쓰는 업무 방식으로.",
    concept:
      "AI를 활용해 CAD 작업을 지원하는 영상지도 플러그인을 기획·제작했습니다. 기능 개발에서 사용 화면 설계, 안내서와 아이콘 제작, 부서원 배포까지 연결해 동료들이 업무에 활용할 수 있도록 구성했습니다.",
    tasks: [
      "업무에 필요한 기능 기획 및 AI 활용 개발",
      "프로그램 실행 흐름과 UI 디자인",
      "사용 안내서·설치 아이콘 제작 및 부서 배포",
    ],
    technologies: [
      "CAD 경계와 영상지도 연계",
      "해상도 지정 및 경계 영역 저장·배치",
      "영상 확인·다운로드·병합 흐름 구성",
    ],
    outcomes: [
      "영상지도 플러그인 제작",
      "실행·설정·영상 확인·병합 화면 구성",
      "사내 사용 안내서·설치 아이콘 제작",
      "부서원 대상 플러그인 및 안내 자료 배포",
    ],
    workflow: [
      {
        title: "기능 기획",
        description: "CAD와 영상지도를 연결하는 작업 흐름 정의",
      },
      { title: "AI 활용 개발", description: "경계 확인·저장·배치 기능 구현" },
      {
        title: "UI·안내서 디자인",
        description: "실행 화면과 사용 자료, 설치 아이콘 제작",
      },
      { title: "부서원 배포", description: "플러그인과 안내 자료를 함께 전달" },
    ],
    sourcePages: [12],
  },
];

export const skills = [
  { symbol: "C3D", name: "Civil 3D", detail: "토공 · 선형 · 코리더" },
  { symbol: "R", name: "Revit", detail: "구조물 · 패밀리" },
  { symbol: "Dy", name: "Dynamo", detail: "매개변수 · 자동화" },
  { symbol: "Rh", name: "Rhino / Grasshopper", detail: "모델링 · 알고리즘" },
  { symbol: "N", name: "Navisworks", detail: "통합 검토 · 4D" },
  { symbol: "Iw", name: "InfraWorks", detail: "통합모델 시각화" },
];

// 재직 시작 연도는 원본에 없어 추가하지 않습니다. 기간은 포트폴리오 기재 기준입니다.
export const career = [
  {
    year: "01",
    period: "WORK EXPERIENCE · 2년 반 / 재직 중",
    title: "KCMC",
    organization: "재직 중",
    lines: [],
  },
  {
    year: "02",
    period: "WORK EXPERIENCE · 8개월",
    title: "집인",
    organization: "경력",
    lines: [],
  },
  {
    year: "03",
    period: "EDUCATION · 학사 / 석사",
    title: "공주대학교",
    organization: "문화재보존과학과",
    lines: ["공주대학교 학사·석사"],
  },
];
