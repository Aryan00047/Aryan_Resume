import { content, externalUrl } from "../content";
import type { Education as EducationEntry } from "../data/schema";
import { useReveal } from "../hooks/useReveal";

const Row = ({ entry }: { entry: EducationEntry }) => {
  const row = useReveal();

  return (
    <div className="reveal xp-row" ref={row}>
      <div>
        <div className="xp-dates">
          {entry.start} — {entry.end}
        </div>
        <div className="xp-org">
          {entry.orgUrl ? (
            <a href={externalUrl(entry.orgUrl)} target="_blank" rel="noopener noreferrer">
              {entry.org}
            </a>
          ) : (
            entry.org
          )}
        </div>
        {entry.location && <div className="xp-place">{entry.location}</div>}
      </div>

      <div className="xp-body edu-body">
        <div className="edu-degree">{entry.degree}</div>
        {entry.detail && <div className="edu-cgpa">{entry.detail}</div>}
      </div>
    </div>
  );
};

/** Education renders as further rows of the Experience section, per the design. */
const Education = () => (
  <>
    {content.education.map((entry, i) => (
      <Row key={`${entry.org}-${i}`} entry={entry} />
    ))}
  </>
);

export default Education;
