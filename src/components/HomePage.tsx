import { Fragment } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { content, words } from "../content";
import Prose from "./Prose";

/** Hero: who, what, proof and ways to reach out, all above the first scroll. */
const HomePage = () => {
    const { profile, links } = content;
    const highlights = profile.highlights ?? [];
    const stack = profile.coreStack ?? [];

    const headline = [
        ...words(profile.headline).map((text) => ({ text, accent: false })),
        ...words(profile.headlineAccent).map((text) => ({ text, accent: true })),
    ];

    return (
        <section id="top" className="hero shell" aria-labelledby="hero-title">
            <div className="hero-grid">
                <div className="hero-main">
                    {profile.availability && (
                        <div className="w badge" style={{ animationDelay: "0.95s" }}>
                            <span className="dot-live" />
                            {profile.availability}
                        </div>
                    )}

                    <h1 id="hero-title">
                        {/* The space belongs OUTSIDE the span: inline-block trims trailing
                whitespace, which runs the words together and makes the accessible
                name one unbroken string. */}
                        {headline.map((word, i) => (
                            <Fragment key={`${word.text}-${i}`}>
                                <span
                                    className={`w${word.accent ? " accent" : ""}`}
                                    style={{ animationDelay: `${1 + i * 0.05}s`, display: "inline-block" }}
                                >
                                    {word.text}
                                </span>{" "}
                            </Fragment>
                        ))}
                    </h1>

                    <Prose className="w hero-lede" style={{ animationDelay: "1.3s" }} text={profile.lede} />

                    <div className="w hero-actions" style={{ animationDelay: "1.38s" }}>
                        {links.resume && (
                            <a className="btn btn-primary" href={links.resume} download>
                                Download Resume
                            </a>
                        )}
                        {profile.email && (
                            <a className="btn btn-secondary" href={`mailto:${profile.email}`}>
                                Email Me
                            </a>
                        )}
                        <a className="hero-link" href="#experience">
                            See experience
                        </a>
                    </div>
                </div>

                <aside className="w hero-card" style={{ animationDelay: "1.2s" }} aria-label="Summary">
                    <div className="hero-card-head">
                        {profile.portrait && (
                            <img
                                src={profile.portrait}
                                alt={profile.fullName}
                                width={64}
                                height={64}
                                fetchPriority="high"
                            />
                        )}
                        <div>
                            <div className="hero-card-name">{profile.fullName}</div>
                            <div className="hero-card-role">{profile.role}</div>
                        </div>
                    </div>

                    <dl className="hero-facts">
                        <div>
                            <dt>Experience</dt>
                            <dd>{profile.years} years, production web apps</dd>
                        </div>
                        {stack.length > 0 && (
                            <div>
                                <dt>Core stack</dt>
                                <dd className="chips">
                                    {stack.map((item) => (
                                        <span className="chip" key={item}>
                                            {item}
                                        </span>
                                    ))}
                                </dd>
                            </div>
                        )}
                        {profile.locations && (
                            <div>
                                <dt>Location</dt>
                                <dd>{profile.locations}</dd>
                            </div>
                        )}
                    </dl>

                    <div className="hero-card-links">
                        {profile.email && <a href={`mailto:${profile.email}`}>{profile.email}</a>}
                        {profile.phone && <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>}
                        <div className="hero-social">
                            {links.linkedin && (
                                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                    <FaLinkedinIn aria-hidden="true" />
                                </a>
                            )}
                            {links.github && (
                                <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                    <FaGithub aria-hidden="true" />
                                </a>
                            )}
                        </div>
                    </div>
                </aside>
            </div>

            {highlights.length > 0 && (
                <ul className="w proof" style={{ animationDelay: "1.5s" }}>
                    {highlights.map((h) => (
                        <li key={h.label}>
                            <strong>{h.value}</strong>
                            <span>{h.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default HomePage;
