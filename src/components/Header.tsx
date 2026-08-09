import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { content, visibleCodingProfiles } from "../content";
import Wordmark from "./Wordmark";

const Header = () => {
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "#work", label: "Work" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    ...(visibleCodingProfiles.length ? [{ href: "#profiles", label: "Profiles" }] : []),
    ...(content.certifications.length ? [{ href: "#certifications", label: "Certificates" }] : []),
    { href: "#about", label: "About" },
  ];

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 720) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="site-header" data-open={open}>
      <div className="shell">
        <a href="#top" className="wordmark">
          <Wordmark />
        </a>

        <nav className="site-nav">
          {nav.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="btn btn-primary" href="#contact" style={{ padding: "8px 15px" }}>
          Get in touch
        </a>

        <button
          className="nav-toggle"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <nav className="mobile-nav">
        {[...nav, { href: "#contact", label: "Get in touch" }].map((item) => (
          <a href={item.href} key={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
