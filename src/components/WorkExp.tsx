import Card from "./Card";

const WorkExp = () => {
  return (
    <section id="work-exp" className="max-w-4xl mx-auto px-4 pt-8 scroll-mt-24">
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 text-center mb-2">
        Work Experience
      </h2>

      <Card>
        <div className="p-6 space-y-8">
          {/* Company */}
          <div>
            <h3 className="text-xl font-semibold text-zinc-900">
              Happiest Minds Technologies Ltd.
            </h3>
            <p className="text-sm text-zinc-500">
              Software Engineer • Aug 2023 – Present
            </p>
          </div>

          {/* Project 1 */}
          <div>
            <p className="font-semibold text-zinc-900">
              Mercury Ignite (WebMD) — Healthcare Platform
            </p>
            <ul className="mt-2 space-y-2 text-zinc-700 text-sm leading-relaxed list-disc list-inside">
              <li>
                Delivered a full UI module with complete functionality, QA
                validation, and UX approval one month ahead of schedule.
              </li>
              <li>
                Migrated the application from Angular 16 to Angular 19,
                improving performance, maintainability, and framework
                consistency.
              </li>
              <li>
                Designed a dynamic config-driven component system, consolidating
                5 separate components into one reusable architecture.
              </li>
              <li>
                Collaborated with product managers, QA, and cross-functional
                teams to ship stable, healthcare-compliant releases.
              </li>
            </ul>
          </div>

          {/* Project 2 */}
          <div>
            <p className="font-semibold text-zinc-900">
              Job Management Portal — Full Stack POC
            </p>
            <ul className="mt-2 space-y-2 text-zinc-700 text-sm leading-relaxed list-disc list-inside">
              <li>
                Independently designed and developed a full-stack job management
                system handling job listings and candidate applications.
              </li>
              <li>
                Built backend services using Node.js, Express.js, and MongoDB,
                supporting real-time CRUD operations with strong data integrity.
              </li>
              <li>
                Delivered a production-ready POC with clean architecture and
                scalability in mind.
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default WorkExp;
