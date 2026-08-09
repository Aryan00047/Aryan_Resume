import { content } from "../content";
import { useReveal } from "../hooks/useReveal";

const Skills = () => {
  const heading = useReveal();
  const grid = useReveal();

  if (!content.skills.length) return null;

  return (
    <section id="skills" className="section shell">
      <div className="reveal rule" ref={heading}>
        <h6>Skills</h6>
        <div className="rule-line" />
      </div>

      <div className="reveal skills-grid" ref={grid}>
        {content.skills.map((group) => (
          <div className="skills-cell" key={group.label}>
            <div className="skills-label">{group.label}</div>
            <div className="skills-tags">
              {group.items.map((item) => (
                <span className="tag tag-neutral" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
