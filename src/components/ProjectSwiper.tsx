import { useCallback, useEffect, useRef, useState } from "react";
import { externalUrl } from "../content";
import type { Project } from "../data/schema";
import { useReveal } from "../hooks/useReveal";
import ProjectPreview from "./ProjectPreview";
import Prose from "./Prose";

const ProjectSlide = ({
  project,
  index,
  total,
  near,
}: {
  project: Project;
  index: number;
  total: number;
  near: boolean;
}) => {
  const hasPreview = Boolean(project.liveUrl);
  return (
    <article
      className={`project-slide${hasPreview || project.image ? "" : " is-text"}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
    >
      <div className="project-slide-copy">
        {project.eyebrow && <div className="work-eyebrow">{project.eyebrow}</div>}
        <h3>{project.title}</h3>
        <Prose text={project.description} />
        {project.tags.length > 0 && (
          <div className="work-tags">
            {project.tags.map((tag) => (
              <span className="tag tag-neutral" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="work-actions">
          {project.caseStudyUrl && (
            <a
              className="btn btn-primary"
              href={externalUrl(project.caseStudyUrl)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: "9px 17px" }}
            >
              Read the case study
            </a>
          )}
          {project.liveUrl && (
            <a
              className={`btn ${project.caseStudyUrl ? "btn-ghost" : "btn-primary"}`}
              href={externalUrl(project.liveUrl)}
              target="_blank"
              rel="noopener noreferrer"
              style={project.caseStudyUrl ? undefined : { padding: "9px 17px" }}
            >
              Open live ↗
            </a>
          )}
        </div>
      </div>
      {hasPreview ? (
        <ProjectPreview project={project} load={near} />
      ) : (
        project.image && (
          <div className="project-slide-media">
            <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
          </div>
        )
      )}
    </article>
  );
};

/**
 * Scroll-snap carousel — native touch/trackpad swipe, plus arrows, dots and
 * arrow-key control. No library: the browser does the physics.
 */
const ProjectSwiper = ({ projects }: { projects: Project[] }) => {
  const reveal = useReveal();
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const slides = useCallback(
    () => Array.from(track.current?.children ?? []) as HTMLElement[],
    [],
  );

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setActive(slides().indexOf(entry.target as HTMLElement));
          }
        }
      },
      { root: el, threshold: 0.6 },
    );
    slides().forEach((slide) => io.observe(slide));
    return () => io.disconnect();
  }, [projects, slides]);

  const goTo = (i: number) => {
    const target = slides()[Math.max(0, Math.min(i, projects.length - 1))];
    target?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <div
      className="reveal swiper"
      ref={reveal}
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected projects"
    >
      <div className="swiper-head">
        <h4>{projects.length > 1 ? "Swipe through projects" : "Project"}</h4>
        <div className="swiper-controls">
          <span className="swiper-count" aria-live="polite">
            {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="swiper-btn"
            aria-label="Previous project"
            disabled={active === 0}
            onClick={() => goTo(active - 1)}
          >
            ←
          </button>
          <button
            type="button"
            className="swiper-btn"
            aria-label="Next project"
            disabled={active === projects.length - 1}
            onClick={() => goTo(active + 1)}
          >
            →
          </button>
        </div>
      </div>

      <div
        className="swiper-track"
        ref={track}
        tabIndex={0}
        aria-label="Project slides, use arrow keys to move"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(active + 1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(active - 1);
          }
        }}
      >
        {projects.map((project, i) => (
          <ProjectSlide
            key={`${project.title}-${i}`}
            project={project}
            index={i}
            total={projects.length}
            near={Math.abs(i - active) <= 1}
          />
        ))}
      </div>

      {projects.length > 1 && (
        <div className="swiper-dots">
          {projects.map((project, i) => (
            <button
              type="button"
              key={`${project.title}-${i}`}
              className={i === active ? "is-active" : ""}
              aria-label={`Go to ${project.title || `project ${i + 1}`}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSwiper;
