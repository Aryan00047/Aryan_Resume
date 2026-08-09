import { content, externalUrl } from "../content";
import type { Experience } from "../data/schema";
import { useReveal } from "../hooks/useReveal";
import Education from "./Education";

const Role = ({ role }: { role: Experience }) => {
  const row = useReveal();

  return (
    <div className="reveal xp-row" ref={row}>
      <div className="xp-aside">
        <div className="xp-dates">
          {role.start} — {role.end}
        </div>
        <div className="xp-org">
          {role.orgUrl ? (
            <a href={externalUrl(role.orgUrl)} target="_blank" rel="noopener noreferrer">
              {role.org}
            </a>
          ) : (
            role.org
          )}
        </div>
        {role.location && <div className="xp-place">{role.location}</div>}
        {role.role && <span className="tag tag-accent">{role.role}</span>}
      </div>

      <div className="xp-body">
        {role.client && <div className="xp-client">{role.client}</div>}
        <div className="xp-list">
          {role.bullets.map((bullet, i) => (
            <div className="xp-item" key={i}>
              <div className="xp-metric">{bullet.metric}</div>
              <p>{bullet.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const WorkExp = () => {
  const heading = useReveal();

  if (!content.experience.length && !content.education.length) return null;

  return (
    <section id="experience" className="section shell">
      <div className="reveal rule" ref={heading}>
        <h6>Experience</h6>
        <div className="rule-line" />
      </div>

      <div className="xp-stack">
        {content.experience.map((role, i) => (
          <Role key={`${role.org}-${i}`} role={role} />
        ))}
        <Education />
      </div>
    </section>
  );
};

export default WorkExp;
