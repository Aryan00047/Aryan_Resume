import { useEffect, useRef, useState } from "react";
import { content, externalUrl, featuredProject, hostOf, otherProjects } from "../content";
import type { Beat, Project } from "../data/schema";
import { useReveal } from "../hooks/useReveal";

const MOCK_BARS = [5, 8, 4, 9, 6, 7, 3, 8, 5, 9, 4, 7];

const BeatBlock = ({ num, title, body }: Beat) => {
  const reveal = useReveal();
  return (
    <div className="reveal beat" ref={reveal}>
      <div className="beat-num">{num}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const reveal = useReveal();
  return (
    <article className="reveal project-card" ref={reveal}>
      {project.eyebrow && <div className="work-eyebrow">{project.eyebrow}</div>}
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      {project.tags.length > 0 && (
        <div className="work-tags">
          {project.tags.map((tag) => (
            <span className="tag tag-neutral" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="project-card-links">
        {project.caseStudyUrl && (
          <a href={externalUrl(project.caseStudyUrl)} target="_blank" rel="noopener noreferrer">
            Case study ↗
          </a>
        )}
        {project.liveUrl && (
          <a href={externalUrl(project.liveUrl)} target="_blank" rel="noopener noreferrer">
            Open live ↗
          </a>
        )}
      </div>
    </article>
  );
};

const LivePreview = ({ project }: { project: Project }) => {
  const [frameOk, setFrameOk] = useState(true);
  const loaded = useRef(false);

  useEffect(() => {
    // The demo is a third-party host — if it refuses to embed, fall back to the
    // static preview rather than leaving an empty panel.
    const check = window.setTimeout(() => {
      if (!loaded.current) setFrameOk(false);
    }, 4000);
    return () => window.clearTimeout(check);
  }, []);

  return (
    <div className="work-sticky">
      <div className="browser">
        <div className="browser-bar">
          <span className="light" />
          <span className="light" />
          <span className="light" />
          <span className="path">{hostOf(project.liveUrl)} · live</span>
          <span className="status">
            <span className="dot-live" />
            running
          </span>
        </div>
        <div className="browser-body">
          <div className="browser-fallback">
            <div className="fallback-note">preview unavailable — embedding blocked</div>
            <div className="fallback-tiles">
              <div className="fallback-tile">
                <div className="k">Spent</div>
                <div className="v">₹48,210</div>
              </div>
              <div className="fallback-tile">
                <div className="k">Categories</div>
                <div className="v">12</div>
              </div>
              <div className="fallback-tile">
                <div className="k">Rows parsed</div>
                <div className="v">1,043</div>
              </div>
            </div>
            <div className="fallback-chart">
              {MOCK_BARS.map((value, i) => (
                <span
                  key={i}
                  style={{
                    height: `${value * 10}%`,
                    background:
                      i > 8
                        ? "var(--color-accent)"
                        : "color-mix(in srgb, var(--color-accent) 35%, transparent)",
                  }}
                />
              ))}
            </div>
          </div>
          {frameOk && (
            <>
              <iframe
                className="browser-frame"
                src={externalUrl(project.liveUrl)}
                onLoad={() => {
                  loaded.current = true;
                }}
                loading="lazy"
                tabIndex={-1}
                title={`${project.title} live demo`}
              />
              <a
                className="browser-open"
                href={externalUrl(project.liveUrl)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Open live ↗</span>
              </a>
            </>
          )}
        </div>
      </div>
      <div className="browser-caption">
        <span>Scroll to walk through the build ↓</span>
        <a href={externalUrl(project.liveUrl)} target="_blank" rel="noopener noreferrer">
          {hostOf(project.liveUrl)} ↗
        </a>
      </div>
    </div>
  );
};

const Work = () => {
  const heading = useReveal();
  const lead = useReveal();
  const callout = useReveal();

  if (!featuredProject) return null;

  return (
    <section id="work" className="section shell">
      <div className="reveal rule" ref={heading}>
        <h6>Selected work</h6>
        <div className="rule-line" />
      </div>

      <div className={`work-grid${featuredProject.liveUrl ? "" : " is-single"}`}>
        <div>
          <div className="reveal work-lead" ref={lead}>
            {featuredProject.eyebrow && (
              <div className="work-eyebrow">{featuredProject.eyebrow}</div>
            )}
            <h2>{featuredProject.title}</h2>
            <p>{featuredProject.description}</p>
            {featuredProject.tags.length > 0 && (
              <div className="work-tags">
                {featuredProject.tags.map((tag) => (
                  <span className="tag tag-neutral" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="work-actions">
              {featuredProject.caseStudyUrl && (
                <a
                  className="btn btn-primary"
                  href={externalUrl(featuredProject.caseStudyUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ padding: "9px 17px" }}
                >
                  Read the case study
                </a>
              )}
              {featuredProject.liveUrl && (
                <a
                  className={`btn ${featuredProject.caseStudyUrl ? "btn-ghost" : "btn-primary"}`}
                  href={externalUrl(featuredProject.liveUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={featuredProject.caseStudyUrl ? undefined : { padding: "9px 17px" }}
                >
                  Open live ↗
                </a>
              )}
            </div>
          </div>

          {featuredProject.beats.map((beat, i) => (
            <BeatBlock key={`${beat.num}-${i}`} {...beat} />
          ))}
        </div>

        {featuredProject.liveUrl && (
          <div style={{ alignSelf: "stretch" }}>
            <LivePreview project={featuredProject} />
          </div>
        )}
      </div>

      {otherProjects.length > 0 && (
        <div className="project-grid">
          {otherProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      )}

      {content.links.github && (
        <div className="reveal callout" ref={callout}>
          <div className="body">
            <div className="title">More is in the repos</div>
            <div className="sub">Side builds, experiments and the source behind this site.</div>
          </div>
          <a
            className="btn btn-secondary"
            href={externalUrl(content.links.github)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: "9px 17px" }}
          >
            Browse GitHub ↗
          </a>
        </div>
      )}
    </section>
  );
};

export default Work;
