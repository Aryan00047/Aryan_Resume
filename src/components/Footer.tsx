import { FaLinkedin, FaGithub, FaEnvelope, FaFilePdf } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-emerald-300 border-t border-emerald-400/40 mt-5 sm:mt-10">
      <div className="max-w-2xl sm:max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4">
          {/* Left */}
          <div className="text-center md:text-left">
            <p className="text-base sm:text-sm font-semibold text-zinc-900">Aryan Gupta</p>
            <p className="text-xs text-zinc-700">Front-End Developer</p>
          </div>

          {/* Center */}
          <div className="flex gap-3 sm:gap-5 text-zinc-700 text-2xl sm:text-xl">
            <a
              href="https://www.linkedin.com/in/agupta2001/"
              aria-label="LinkedIn"
              className="hover:text-zinc-100 transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/Aryan00047"
              aria-label="GitHub"
              className="hover:text-zinc-100 transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="mailto:aryan2k1.gupta@gmail.com"
              aria-label="Email"
              className="hover:text-zinc-100 transition-colors"
            >
              <FaEnvelope />
            </a>
            <a
              href="/Aryan_Resume.pdf"
              download
              aria-label="Download Resume"
              className="hover:text-zinc-100 transition-colors"
            >
              <FaFilePdf />
            </a>
          </div>

          {/* Right */}
          <div className="text-xs text-zinc-700">
            © {new Date().getFullYear()} Aryan Gupta
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
