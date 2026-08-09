import { content, externalUrl, visibleCodingProfiles } from "../content";
import { useReveal } from "../hooks/useReveal";
import ActivityGraph from "./ActivityGraph";

/**
 * Replaces the design's mocked stat strip. Every figure here is one you typed
 * into the admin page, so nothing is asserted that you did not assert yourself.
 * With no profiles filled in, the section renders nothing at all.
 */
const CodingProfiles = () => {
  const heading = useReveal();
  const grid = useReveal();

  const hasGraph = (content.activity ?? []).some((source) => source.username);
  if (!visibleCodingProfiles.length && !hasGraph) return null;

  return (
    <section id="profiles" className="section shell">
      <div className="reveal rule" ref={heading}>
        <h6>Coding profiles</h6>
        <div className="rule-line" />
      </div>

      {visibleCodingProfiles.length > 0 && (
      <div className="reveal profile-grid" ref={grid}>
        {visibleCodingProfiles.map((profile) => {
          const href = externalUrl(profile.url);
          // A card needs something to lead with. Prefer the stat, fall back to
          // the handle, and if neither exists let the platform name do the job
          // rather than padding it out with filler text.
          const primary = profile.stat || profile.handle;
          const caption = profile.note || (profile.stat ? profile.handle : "");

          const inner = (
            <>
              {primary ? (
                <>
                  <div className="stat-label">{profile.name}</div>
                  <div className={profile.stat ? "stat-value" : "profile-handle"}>{primary}</div>
                  {caption && <div className="profile-note">{caption}</div>}
                </>
              ) : (
                <div className="profile-name-only">{profile.name}</div>
              )}
              {href && <span className="profile-go">Open ↗</span>}
            </>
          );

          return href ? (
            <a
              className="stat-cell profile-cell"
              key={profile.name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {inner}
            </a>
          ) : (
            <div className="stat-cell profile-cell" key={profile.name}>
              {inner}
            </div>
          );
        })}
      </div>
      )}

      <ActivityGraph />
    </section>
  );
};

export default CodingProfiles;
