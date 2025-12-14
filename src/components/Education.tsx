import { FaGraduationCap } from "react-icons/fa";
import Card from "./Card";

const Education = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 pt-8">
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 text-center mb-2">
        Education
      </h2>

    <Card>
  <div className="p-6 space-y-2">

    <div className="flex items-center gap-4">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100 hover:cursor-pointer hover:shadow-sm hover:shadow-emerald-400">
        <a href="https://www.chitkara.edu.in/">
        <FaGraduationCap className="text-emerald-600 text-lg" />
        </a>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-zinc-900">
          Chitkara University
        </h3>
        <p className="text-sm text-zinc-700">
          Bachelor of Engineering — Computer Science
        </p>
      </div>
    </div>

    <p className="text-sm text-zinc-500 pl-14">
      2019 – 2023 • CGPA 9.89
    </p>

  </div>
</Card>

    </section>
  );
};

export default Education;
