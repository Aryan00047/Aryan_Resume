import { FaCode, FaRocket } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import Card from "./Card";

// const AboutMe = () => {
//   return (
//     <section id="about-me" className="max-w-4xl mx-auto px-4 pt-8 scroll-mt-24">
//       <h2 className="text-3xl font-bold tracking-tight text-zinc-900 text-center mb-2">
//         About Me
//       </h2>

//       <Card>
//         {/* Intro */}
//         <p className="p-6 text-zinc-700 leading-relaxed">
//           I'm a Front-End Developer with 2+ years of experience, currently
//           working at{" "}
//           <span className="font-semibold text-zinc-900">
//             <a
//               className="hover:underline"
//               href="https://www.happiestminds.com/"
//             >
//               Happiest Minds Technologies
//             </a>
//           </span>{" "}
//           as a Software Engineer. I specialize in building scalable, reusable UI
//           components with a strong focus on performance, maintainability, and
//           clean architecture.
//         </p>

//         {/* Highlights */}
//         <div className="grid grid-cols-1 md:grid-cols-3 border-t border-slate-200">
//           <div className="p-6 text-center">
//             <FaCode className="mx-auto text-emerald-500 text-xl mb-3" />
//             <h3 className="font-semibold text-zinc-900">Clean Code</h3>
//             <p className="mt-2 text-sm text-zinc-600">
//               Modular, reusable, and maintainable UI components
//             </p>
//           </div>

//           <div className="p-6 text-center border-t md:border-t-0 md:border-l border-slate-200">
//             <FaRocket className="mx-auto text-emerald-500 text-xl mb-3" />
//             <h3 className="font-semibold text-zinc-900">Performance</h3>
//             <p className="mt-2 text-sm text-zinc-600">
//               Optimize applications for speed and scalability
//             </p>
//           </div>

//           <div className="p-6 text-center border-t md:border-t-0 md:border-l border-slate-200">
//             <FaUserGroup className="mx-auto text-emerald-500 text-xl mb-3" />
//             <h3 className="font-semibold text-zinc-900">Collaboration</h3>
//             <p className="mt-2 text-sm text-zinc-600">
//               Worked closely with product, QA, and clients
//             </p>
//           </div>
//         </div>
//       </Card>
//     </section>
//   );
// };

const AboutMe = () => {
  return (
    <section
      id="about-me"
      className="max-w-4xl mx-auto px-4 pt-8 scroll-mt-24"
    >
      {/* Make this the visual anchor */}
      <h2 className="text-4xl font-bold tracking-tight text-zinc-900 text-center mb-2">
        About Me
      </h2>

      <Card>
        {/* Intro text should NOT be LCP */}
        <p className="pt-6 max-w-3xl mx-auto text-zinc-700 leading-relaxed text-base">
          I'm a Front-End Developer with 2+ years of experience, currently
          working at{" "}
          <a
            className="font-semibold text-zinc-900 hover:underline"
            href="https://www.happiestminds.com/"
          >
            Happiest Minds Technologies
          </a>{" "}
          as a Software Engineer. I specialize in building scalable, reusable UI
          components with a strong focus on performance, maintainability, and
          clean architecture.
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-slate-200 mt-6">
          <div className="p-6 text-center">
            <FaCode className="mx-auto text-emerald-500 text-xl mb-3" />
            <h3 className="font-semibold text-zinc-900">Clean Code</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Modular, reusable, and maintainable UI components
            </p>
          </div>

          <div className="p-6 text-center border-t md:border-t-0 md:border-l border-slate-200">
            <FaRocket className="mx-auto text-emerald-500 text-xl mb-3" />
            <h3 className="font-semibold text-zinc-900">Performance</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Optimize applications for speed and scalability
            </p>
          </div>

          <div className="p-6 text-center border-t md:border-t-0 md:border-l border-slate-200">
            <FaUserGroup className="mx-auto text-emerald-500 text-xl mb-3" />
            <h3 className="font-semibold text-zinc-900">Collaboration</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Worked closely with product, QA, and clients
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default AboutMe;
