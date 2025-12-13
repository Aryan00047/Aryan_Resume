  import { FaLinkedin, FaGithub, FaEnvelope, FaFilePdf } from "react-icons/fa";

  const Header = () => {
    return (
      <header className="w-full bg-emerald-300 border-b border-emerald-200 sticky top-0 z-50 ">
        <div className="flex items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <div className="text-2xl font-bold tracking-tight text-zinc-900">
            AG  
          </div>

          {/* Nav Icons */}
          <nav className="flex gap-6 text-zinc-700 text-xl">
            <a href="https://www.linkedin.com/in/agupta2001/" className="hover:text-zinc-100 transition-colors duration-200">
              <FaLinkedin />
            </a>
            <a href="https://github.com/Aryan00047" className="hover:text-zinc-100 transition-colors duration-200">
              <FaGithub />
            </a>
            <a href="mailto:aryan2k1.gupta@gmail.com" className="hover:text-zinc-100  transition-colors duration-200">
              <FaEnvelope />
            </a>
            <a
              href="/Aryan_Resume.pdf"
              download
              aria-label="Download Resume"
              className="hover:text-zinc-100 transition-colors duration-200"
            >
              <FaFilePdf />
            </a>
          </nav>

        </div>  
      </header>
    );
  };

  export default Header;
