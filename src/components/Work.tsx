import { content, externalUrl, featuredProject, otherProjects } from "../content";
import ProjectSwiper from "./ProjectSwiper";
import { useReveal } from "../hooks/useReveal";

const Work = () => {
  const heading = useReveal();
  const callout = useReveal();

  // Featured first, then the rest in the order they were added.
  const projects = featuredProject ? [featuredProject, ...otherProjects] : [];
  if (projects.length === 0) return null;

  return (
    <section id="work" className="section shell">
      <div className="reveal rule" ref={heading}>
        <h6>Selected work</h6>
        <div className="rule-line" />
      </div>

      <ProjectSwiper projects={projects} />

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
