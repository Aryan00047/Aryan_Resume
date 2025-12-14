import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="w-full bg-emerald-300 border-b border-emerald-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight text-zinc-900">
          AG
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-6 text-md font-semibold text-zinc-900">
          <a href="#about-me" className="hover:text-zinc-100 transition">
            About
          </a>
          <a href="#work-exp" className="hover:text-zinc-100 transition">
            Experience
          </a>
          <a href="#skills" className="hover:text-zinc-100 transition">
            Skills
          </a>
          <a href="#contact-me" className="hover:text-zinc-100 transition">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-zinc-900 text-xl hover:cursor-pointer"
          onClick={() => setOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden bg-emerald-300 border-t border-emerald-200">
          <nav className="flex flex-col px-6 py-4 gap-4 text-md font-semibold text-zinc-900">
            {[
              { href: "#about-me", label: "About" },
              { href: "#work-exp", label: "Experience" },
              { href: "#skills", label: "Skills" },
              { href: "#contact-me", label: "Contact" },
            ].map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="self-start"
              >
                <span className="inline-block hover:text-zinc-100 transition">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
