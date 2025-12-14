import { FaArrowDown, FaFileDownload } from "react-icons/fa";

const HomePage = () => {
  return (
    <section className="w-full bg-emerald-100 pt-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <img
            src="assets/profile_pic.jpg"
            alt="Aryan Gupta"
            className="w-36 h-36 md:w-52 md:h-52 object-cover rounded-full
                       ring-4 ring-emerald-300"
          />

          {/* Text */}
          <div className="max-w-xl mt-8">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
              Aryan Gupta
            </h1>

            <p className="mt-1 text-sm md:text-base text-emerald-700 font-medium">
              Front-End Developer
            </p>

            <p className="mt-4 text-zinc-700 leading-relaxed text-base">
              Software Engineer with 2+ years of experience in React and
              Angular, focused on building scalable, high-performance,
              user-centric web applications.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-4">
            {/* Primary */}
            <a
              href="#work-exp"
              className="
      inline-flex items-center gap-2
      px-6 py-2.5
      rounded-full
      text-sm font-medium
      bg-emerald-500 text-white
      shadow-md shadow-emerald-900/20
      hover:bg-white hover:text-emerald-500 hover:-translate-y-0.5
      transition-all
    "
            >
              Work Experience
              <FaArrowDown className="text-sm" />
            </a>

            {/* Secondary */}
            <a
              href="/Aryan_Resume.pdf"
              download
              className="
      inline-flex items-center gap-2
      px-6 py-2.5
      rounded-full
      text-sm font-medium
      bg-white text-emerald-600
      border border-emerald-300
      shadow-md shadow-emerald-900/10
      hover:bg-emerald-500 hover:text-white hover:-translate-y-0.5
      transition-all
    "
            >
              Download Resume
              <FaFileDownload />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
