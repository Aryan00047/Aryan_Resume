import { FaLinkedin, FaGithub, FaEnvelope, FaFilePdf } from "react-icons/fa";
import { content, externalUrl } from "../content";
import Wordmark from "./Wordmark";

const Footer = () => {
  const { links, profile } = content;

  return (
    <footer className="site-footer">
      <div className="shell">
        <span className="mark">
          <Wordmark />
        </span>
        <span>
          {profile.role} · India
        </span>

        <div className="footer-social">
          {links.linkedin && (
            <a href={externalUrl(links.linkedin)} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          )}
          {links.github && (
            <a href={externalUrl(links.github)} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
          )}
          {profile.email && (
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <FaEnvelope />
            </a>
          )}
          {links.resume && (
            <a href={links.resume} download aria-label="Download résumé">
              <FaFilePdf />
            </a>
          )}
        </div>

        <span className="push">Built and designed by me, {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;
