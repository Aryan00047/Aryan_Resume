import { content, externalUrl } from "../content";
import Prose from "./Prose";
import { useReveal } from "../hooks/useReveal";

const AboutMe = () => {
  const heading = useReveal();
  const grid = useReveal();
  const { about, links, profile } = content;

  return (
    <section id="about" className="section shell">
      <div className="reveal rule" ref={heading}>
        <h6>About</h6>
        <div className="rule-line" />
      </div>

      <div className="reveal about-grid" ref={grid}>
        <div>
          <Prose className="about-lede" text={about.lede} />
          <Prose className="about-body" text={about.body} />
          <div className="about-actions">
            {links.linkedin && (
              <a
                className="btn btn-secondary"
                href={externalUrl(links.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            )}
            {links.github && (
              <a
                className="btn btn-secondary"
                href={externalUrl(links.github)}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            )}
            {links.resume && (
              <a className="btn btn-secondary" href={links.resume} download>
                Résumé PDF ↗
              </a>
            )}
          </div>
        </div>

        {profile.portrait && (
          <figure className="portrait">
            <div className="frame">
              <img src={profile.portrait} alt={profile.fullName} />
            </div>
            {profile.portraitCaption && <figcaption>{profile.portraitCaption}</figcaption>}
          </figure>
        )}
      </div>
    </section>
  );
};

export default AboutMe;
