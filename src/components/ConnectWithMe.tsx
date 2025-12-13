import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Card from "./Card";

const ConnectWithMe = () => {
  return (
<section className="max-w-4xl mx-auto px-4 pt-8">
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 text-center mb-2">
        Let’s Connect
      </h2>

      <p className="text-center text-zinc-600 mb-2 max-w-xl mx-auto">
        Open to frontend roles, freelance work, and meaningful collaborations.
        Feel free to reach out.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Email */}
        <Card>
          <a
            href="mailto:aryan2k1.gupta@gmail.com"
            className="p-5 flex items-center gap-4
                       hover:bg-emerald-50 transition rounded-2xl"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100">
              <FaEnvelope className="text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">Email</p>
              <p className="text-xs text-zinc-600">
                aryan2k1.gupta@gmail.com
              </p>
            </div>
          </a>
        </Card>

        {/* LinkedIn */}
        <Card>
          <a
            href="https://www.linkedin.com/in/agupta2001/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 flex items-center gap-4
                       hover:bg-emerald-50 transition rounded-2xl"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100">
              <FaLinkedin className="text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">LinkedIn</p>
              <p className="text-xs text-zinc-600">
                linkedin.com/in/agupta2001
              </p>
            </div>
          </a>
        </Card>

        {/* GitHub */}
        <Card>
          <a
            href="https://github.com/Aryan00047"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 flex items-center gap-4
                       hover:bg-emerald-50 transition rounded-2xl"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100">
              <FaGithub className="text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">GitHub</p>
              <p className="text-xs text-zinc-600">
                github.com/Aryan00047
              </p>
            </div>
          </a>
        </Card>

      </div>
    </section>
  );
};

export default ConnectWithMe;
