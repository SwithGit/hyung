import { useEffect, useRef, useState } from "react";
import type { SyntheticEvent } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  X,
  Menu,
  Mail,
  Phone,
  Download,
  Plus,
  Maximize2,
  FileText,
} from "lucide-react";
import {
  categories,
  capabilities,
  career,
  projects,
  skills,
  studio,
} from "./content";
import type { Category, Project } from "./content";

const links = [
  { id: "about-section", label: "소개" },
  { id: "capabilities-section", label: "핵심역량" },
  { id: "portfolio-section", label: "포트폴리오" },
  { id: "career-section", label: "경력·학력" },
];

function imageFallback(event: SyntheticEvent<HTMLImageElement>) {
  if (!event.currentTarget.src.endsWith("/images/fallback.svg"))
    event.currentTarget.src = "/images/fallback.svg";
}

function Lightbox({
  project,
  imageIndex,
  onMove,
  onClose,
}: {
  project: Project;
  imageIndex: number | null;
  onMove: (direction: number) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const isOpen = imageIndex !== null;
  useEffect(() => {
    const element = dialog.current;
    if (!element || !isOpen) return;
    element.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previous;
    };
  }, [isOpen]);
  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={`${project.title} 이미지 확대`}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          onMove(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          onMove(-1);
        }
      }}
    >
      {imageIndex !== null && (
        <>
          <div className="lightbox-top">
            <span>
              {project.title}
              <small>
                {imageIndex + 1} / {project.images.length}
              </small>
            </span>
            <button
              autoFocus
              className="icon-button"
              aria-label="확대 이미지 닫기"
              onClick={onClose}
            >
              <X />
            </button>
          </div>
          <div className="lightbox-image">
            <img
              src={project.images[imageIndex].src}
              alt={project.images[imageIndex].caption}
              onError={imageFallback}
            />
          </div>
          <p className="lightbox-caption">
            {project.images[imageIndex].caption}
          </p>
          <div className="lightbox-bottom">
            <button
              className="icon-button"
              aria-label="이전 사진"
              onClick={() => onMove(-1)}
            >
              <ArrowLeft />
            </button>
            <span aria-live="polite">
              {String(imageIndex + 1).padStart(2, "0")} /{" "}
              {String(project.images.length).padStart(2, "0")}
            </span>
            <button
              className="icon-button"
              aria-label="다음 사진"
              onClick={() => onMove(1)}
            >
              <ArrowRight />
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}

function DetailList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="detail-info-block">
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [imageIndex, setImageIndex] = useState<number | null>(null);
  const isProject = project.kind === "project";
  const detailLabel = isProject ? "프로젝트" : "핵심역량";
  function moveImage(direction: number) {
    setImageIndex((index) =>
      index === null
        ? null
        : (index + direction + project.images.length) % project.images.length,
    );
  }
  return (
    <article
      className="project-detail"
      aria-labelledby={`detail-${project.id}`}
    >
      <div className="detail-title">
        <div>
          <span className="eyebrow">
            {project.category}
            {project.period && ` / ${project.period}`}
          </span>
          <h3 id={`detail-${project.id}`}>
            {project.title}
            <span>{project.subtitle}</span>
          </h3>
        </div>
        <button
          className="close-detail icon-button"
          onClick={onClose}
          aria-label={`${detailLabel} 목록으로 돌아가기`}
        >
          <X size={24} />
        </button>
      </div>
      <div className="detail-layout">
        <div className="detail-media">
          {project.video && (
            <video
              className="project-video"
              src={project.video}
              controls
              playsInline
              preload="metadata"
              aria-label={`${project.title} 영상`}
            />
          )}
          {project.images.map((media, index) => (
            <figure className="media-figure" key={`${media.src}-${index}`}>
              <button
                className="detail-image"
                onClick={() => setImageIndex(index)}
                aria-label={`${project.title} 사진 ${index + 1} 확대`}
              >
                <img
                  src={media.src}
                  alt={media.caption}
                  loading={index === 0 ? "eager" : "lazy"}
                  onError={imageFallback}
                />
                <span>
                  <Maximize2 size={17} /> 확대 보기
                </span>
              </button>
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {media.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <aside className="detail-info">
          <div className="detail-info-block">
            <h4>{detailLabel} 정보</h4>
            <dl>
              <div>
                <dt>분류</dt>
                <dd>{project.category}</dd>
              </div>
              {project.period && (
                <div>
                  <dt>수행 기간</dt>
                  <dd>{project.period}</dd>
                </div>
              )}
              <div>
                <dt>원본 자료</dt>
                <dd>PDF {project.sourcePages.join(", ")}쪽</dd>
              </div>
            </dl>
          </div>
          <div className="detail-info-block">
            <h4>Overview</h4>
            <h5>{project.description}</h5>
            <p>{project.concept}</p>
          </div>
          <DetailList title="수행 역할" items={project.tasks} />
          {project.tools && (
            <div className="detail-info-block">
              <h4>Software Used</h4>
              <div className="tool-tags">
                {project.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </div>
          )}
          <DetailList title="적용 기술" items={project.technologies} />
          <DetailList title="주요 성과 · 산출물" items={project.outcomes} />
          {project.relatedIds && (
            <div className="detail-info-block">
              <h4>관련 프로젝트</h4>
              <div className="related-projects">
                {project.relatedIds.map((id) => {
                  const related = projects.find((item) => item.id === id);
                  return (
                    related && (
                      <a key={id} href={`#project/${id}`}>
                        {related.title}
                        <ArrowUpRight size={14} />
                      </a>
                    )
                  );
                })}
              </div>
            </div>
          )}
          {project.note && <p className="source-note">{project.note}</p>}
          <a
            className="source-link"
            href={`${studio.resumeUrl}#page=${project.sourcePages[0]}`}
            target="_blank"
            rel="noreferrer"
          >
            <FileText size={15} /> 원본 PDF 보기 <ArrowUpRight size={13} />
          </a>
          <div className="designer-note">
            <span className="designer-monogram">SJ.</span>
            <div>
              <strong>{studio.designerName}</strong>
              <span>{studio.role}</span>
            </div>
          </div>
        </aside>
      </div>
      <button className="back-to-projects" onClick={onClose}>
        <ArrowLeft size={17} /> {detailLabel} 목록으로
      </button>
      <Lightbox
        project={project}
        imageIndex={imageIndex}
        onMove={moveImage}
        onClose={() => setImageIndex(null)}
      />
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      className={`project-card project-${project.number} ${project.kind === "capability" ? "capability-card" : ""}`}
      id={`card-${project.id}`}
      href={`#${project.kind}/${project.id}`}
      aria-label={`${project.title} ${project.kind === "project" ? "프로젝트" : "핵심역량"} 상세 보기`}
    >
      <div className="project-photo">
        <img
          src={project.cover}
          alt={`${project.title} — ${project.subtitle}`}
          loading="lazy"
          width="900"
          height="650"
          onError={imageFallback}
        />
        <div className="project-overlay" aria-hidden="true">
          <span className="project-category">
            {project.category}
            {project.period && ` · ${project.period}`}
          </span>
          <span className="project-plus">
            <Plus size={25} strokeWidth={1.4} />
          </span>
          <div>
            <h3>{project.title}</h3>
            <p>{project.subtitle}</p>
          </div>
        </div>
      </div>
      <div className="project-caption">
        <div>
          <span className="card-number">
            {project.kind === "project" ? "PROJECT" : "CAPABILITY"}{" "}
            {project.number}
            {project.period && ` / ${project.period}`}
          </span>
          <h3>{project.title}</h3>
          <span>{project.subtitle}</span>
        </div>
        <ArrowUpRight size={19} />
      </div>
    </a>
  );
}

function App() {
  const [category, setCategory] = useState<Category>("전체");
  const [activeItem, setActiveItem] = useState<Project | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("about-section");
  const filteredProjects = projects.filter(
    (project) => category === "전체" || project.category === category,
  );

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash;
      const item =
        [...projects, ...capabilities].find(
          (entry) => hash === `#${entry.kind}/${entry.id}`,
        ) ?? null;
      setActiveItem(item);
      if (item) {
        if (item.kind === "project") {
          setCategory((current) =>
            current === "전체" || current === item.category ? current : "전체",
          );
        }
        const sectionId =
          item.kind === "project"
            ? "portfolio-section"
            : "capabilities-section";
        setActiveSection(sectionId);
        requestAnimationFrame(() =>
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: "instant", block: "start" }),
        );
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActiveSection(entry.target.id);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    links.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileMenu) return;
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenu(false);
    };
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, [mobileMenu]);

  function closeDetail() {
    if (!activeItem) return;
    const id = activeItem.id;
    const sectionId =
      activeItem.kind === "project"
        ? "portfolio-section"
        : "capabilities-section";
    setActiveItem(null);
    setActiveSection(sectionId);
    window.history.replaceState(null, "", `#${sectionId}`);
    requestAnimationFrame(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
      document.getElementById(`card-${id}`)?.focus({ preventScroll: true });
    });
  }

  const navLinks = (items: typeof links) =>
    items.map((link) => (
      <a
        key={link.id}
        className={activeSection === link.id ? "active" : ""}
        aria-current={activeSection === link.id ? "location" : undefined}
        href={`#${link.id}`}
      >
        {link.label}
      </a>
    ));

  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 이동
      </a>
      <header className="site-header">
        <nav className="desktop-nav" aria-label="주 메뉴">
          <div className="nav-half">{navLinks(links.slice(0, 2))}</div>
          <a
            className="wordmark"
            href="#about-section"
            aria-label={`${studio.nameKo} 홈`}
          >
            {studio.name}
            <span>.</span>
          </a>
          <div className="nav-half">{navLinks(links.slice(2))}</div>
        </nav>
        <a className="mobile-wordmark wordmark" href="#about-section">
          {studio.name}
          <span>.</span>
        </a>
        <button
          className="menu-toggle icon-button"
          aria-label={mobileMenu ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileMenu}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
        <nav
          className="mobile-navigation"
          id="mobile-navigation"
          aria-label="모바일 메뉴"
          hidden={!mobileMenu}
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileMenu(false)}
            >
              {link.label}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      </header>

      <main id="main">
        <section
          className="about-section container"
          id="about-section"
          aria-labelledby="about-title"
        >
          <div className="profile-visual">
            <div className="dot-pattern" />
            <img
              src={studio.profileImage}
              alt={studio.profileImageAlt}
              fetchPriority="high"
              width="1700"
              height="2122"
              onError={imageFallback}
            />
            <div className="profile-image-title">
              Data-Driven
              <br />
              <span>Railway Design.</span>
            </div>
            <div className="image-caption">
              <span>
                RAILWAY BIM
                <br />
                LEE SEUNGJUN
              </span>
              <span>
                SELECTED WORKS
                <br />
                2024 — 2026
              </span>
            </div>
          </div>
          <div className="about-copy">
            <span className="eyebrow">{studio.tagline}</span>
            <h1 id="about-title">
              안녕하세요,
              <br />
              <span>
                철도 · 토목 BIM
                <br className="mobile-break" /> 이승준
              </span>
              입니다.
            </h1>
            <div className="introduction">
              {studio.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="profile-links">
              <a href={`mailto:${studio.email}`} aria-label="이메일로 연락하기">
                <Mail size={19} />
              </a>
              <a
                href={`tel:${studio.phone.replaceAll("-", "")}`}
                aria-label="전화로 연락하기"
              >
                <Phone size={17} />
              </a>
              <a
                className="resume-link"
                href={studio.resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Download size={16} /> PDF 포트폴리오{" "}
                <small>{studio.pdfSize}</small>
              </a>
            </div>
            <a className="intro-project-link" href="#portfolio-section">
              수행 프로젝트 보기 <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <section
          className="skills-section container"
          id="skills-section"
          aria-labelledby="skills-title"
        >
          <div className="skills-heading">
            <h2 id="skills-title">Tools I work with</h2>
            <span>모델링부터 자동화, 시각화까지</span>
          </div>
          <div className="skills-list">
            {skills.map((skill) => (
              <div className="skill" key={skill.name}>
                <span
                  className={`skill-symbol skill-${skill.symbol.toLowerCase()}`}
                >
                  {skill.symbol}
                </span>
                <div>
                  <h3>{skill.name}</h3>
                  <span>{skill.detail}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="additional-tools">
            Premiere Pro <span>영상 제작</span>
            <i /> AI · MCP <span>자체 소프트웨어 기획·제작</span>
          </p>
        </section>

        <section
          className="portfolio-section container"
          id="portfolio-section"
          aria-labelledby="portfolio-title"
        >
          <div className="section-title">
            <span className="eyebrow">Selected projects / 2024 — 2026</span>
            <h2 id="portfolio-title">
              Portfolio<span>.</span>
            </h2>
            <p>도로와 철도를 연결하는 다섯 가지 프로젝트.</p>
            <span className="heading-line" />
          </div>
          {activeItem?.kind === "project" ? (
            <ProjectDetail
              key={activeItem.id}
              project={activeItem}
              onClose={closeDetail}
            />
          ) : (
            <>
              <div
                className="filter-bar"
                role="group"
                aria-label="프로젝트 유형 필터"
              >
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    aria-pressed={category === item}
                    className={category === item ? "active" : ""}
                  >
                    {item}
                    <sup>
                      {item === "전체"
                        ? projects.length
                        : projects.filter(
                            (project) => project.category === item,
                          ).length}
                    </sup>
                  </button>
                ))}
              </div>
              <span className="sr-only" aria-live="polite">
                {filteredProjects.length}개의 프로젝트
              </span>
              <div className="project-grid">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              <div className="portfolio-footnote">
                <span>Roads, railways, and the data that connects them.</span>
                <span>01 — {String(projects.length).padStart(2, "0")}</span>
              </div>
            </>
          )}
        </section>

        <section
          className="capabilities-section container"
          id="capabilities-section"
          aria-labelledby="capabilities-title"
        >
          <div className="section-title">
            <span className="eyebrow">Beyond the model</span>
            <h2 id="capabilities-title">
              Capabilities<span>.</span>
            </h2>
            <p>현장 데이터에서 자동화와 시뮬레이션까지.</p>
            <span className="heading-line" />
          </div>
          {activeItem?.kind === "capability" ? (
            <ProjectDetail
              key={activeItem.id}
              project={activeItem}
              onClose={closeDetail}
            />
          ) : (
            <div className="capability-grid">
              {capabilities.map((item) => (
                <ProjectCard key={item.id} project={item} />
              ))}
            </div>
          )}
        </section>

        <section
          className="career-section container"
          id="career-section"
          aria-labelledby="career-title"
        >
          <div className="section-title">
            <span className="eyebrow">Experience & education</span>
            <h2 id="career-title">
              Background<span>.</span>
            </h2>
            <p>토목 BIM 전환설계 · 스캔 기반 역설계</p>
            <span className="heading-line" />
          </div>
          <ol className="timeline">
            {career.map((item) => (
              <li key={item.year}>
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <span className="period">{item.period}</span>
                  <h3>
                    {item.title}
                    <span>{item.organization}</span>
                  </h3>
                  {item.lines.length > 0 && (
                    <ul>
                      {item.lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <p className="career-note">
            경력 기간과 재직 상태는 포트폴리오 기재 기준입니다.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <span className="eyebrow">Let’s connect</span>
          <h2>
            데이터로 연결되는 설계,
            <br />
            함께 이야기해 보세요.
          </h2>
          <a className="footer-email" href={`mailto:${studio.email}`}>
            {studio.email}
            <ArrowUpRight size={23} />
          </a>
          <a
            className="footer-phone"
            href={`tel:${studio.phone.replaceAll("-", "")}`}
          >
            <Phone size={14} />
            {studio.phone}
          </a>
          <div className="footer-bottom">
            <a className="wordmark" href="#about-section">
              {studio.name}
              <span>.</span>
            </a>
            <span>
              © {new Date().getFullYear()} {studio.designerName} · Railway BIM
            </span>
            <div className="footer-socials">
              <a href={`mailto:${studio.email}`} aria-label="이메일 문의">
                <Mail size={18} />
              </a>
              <a
                href={studio.resumeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="PDF 포트폴리오 열기"
              >
                <FileText size={18} />
              </a>
              <a href="#about-section" aria-label="맨 위로">
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
