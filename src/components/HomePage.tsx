import { Fragment } from "react";
import { content, words } from "../content";

/** Hero — the staggered headline animates in behind the loader lift. */
const HomePage = () => {
  const { profile, links } = content;

  const headline = [
    ...words(profile.headline).map((text) => ({ text, accent: false })),
    ...words(profile.headlineAccent).map((text) => ({ text, accent: true })),
  ];

  return (
    <section id="top" className="hero shell">
      {profile.availability && (
        <div className="w badge" style={{ animationDelay: "1.55s" }}>
          <span className="dot-live" />
          {profile.availability}
        </div>
      )}

      <h1>
        {/* The space belongs OUTSIDE the span: inline-block trims trailing
            whitespace, which runs the words together and makes the accessible
            name one unbroken string. */}
        {headline.map((word, i) => (
          <Fragment key={`${word.text}-${i}`}>
            <span
              className={`w${word.accent ? " accent" : ""}`}
              style={{ animationDelay: `${1.62 + i * 0.06}s`, display: "inline-block" }}
            >
              {word.text}
            </span>{" "}
          </Fragment>
        ))}
      </h1>

      <p className="w hero-lede" style={{ animationDelay: "2s" }}>
        {profile.lede}
      </p>

      <div className="w hero-actions" style={{ animationDelay: "2.08s" }}>
        <a className="btn btn-primary" href="#work" style={{ padding: "10px 19px" }}>
          See the work
        </a>
        {links.resume && (
          <a className="btn btn-secondary" href={links.resume} download style={{ padding: "10px 19px" }}>
            Download résumé
          </a>
        )}
      </div>

      <div className="w hero-meta" style={{ animationDelay: "2.16s" }}>
        <div>
          <strong>{profile.years}</strong> years shipping production UI
        </div>
        {profile.locations && <div>{profile.locations}</div>}
        {profile.phone && <div>{profile.phone}</div>}
      </div>
    </section>
  );
};

export default HomePage;
