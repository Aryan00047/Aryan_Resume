import SkillIcon from "./SkillIcon";
import Card from "./Card";

const Skills = () => {
  return (
    <section id="skills" className="max-w-4xl mx-auto px-4 pt-8 scroll-mt-24">
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 text-center mb-2">
        Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Languages */}
        <Card>
          <div className="p-6">
            <h4 className="text-sm font-semibold text-zinc-600 mb-4">
              Languages
            </h4>
            <div className="flex gap-4 flex-wrap">
              <SkillIcon src="assets/javascript.svg" label="JavaScript" link="https://developer.mozilla.org/en-US/docs/Web/JavaScript" />
              <SkillIcon src="assets/typescript.svg" label="TypeScript" link="https://www.typescriptlang.org/"/>
              <SkillIcon src="assets/rxjs-1.svg" label="RxJS" link="https://rxjs.dev/"/>
            </div>
          </div>
        </Card>

        {/* Frameworks */}
        <Card>
          <div className="p-6">
            <h4 className="text-sm font-semibold text-zinc-600 mb-4">
              Frameworks
            </h4>
            <div className="flex gap-4 flex-wrap">
              <SkillIcon src="assets/react.svg" label="React" link="https://react.dev/"/>
              <SkillIcon src="assets/redux.svg" label="Redux" link="https://redux.js.org/"/>
              <SkillIcon src="assets/angular.svg" label="Angular" link="https://angular.dev/"/>
            </div>
          </div>
        </Card>

        {/* Styling */}
        <Card>
          <div className="p-6">
            <h4 className="text-sm font-semibold text-zinc-600 mb-4">
              Styling
            </h4>
            <div className="flex gap-4 flex-wrap">
              <SkillIcon src="assets/tailwindcss.svg" label="Tailwind CSS" link="https://tailwindcss.com/"/>
              <SkillIcon src="assets/bootstrap.svg" label="Bootstrap" link="https://getbootstrap.com/"/>
            </div>
          </div>
        </Card>

        {/* Tools */}
        <Card>
          <div className="p-6">
            <h4 className="text-sm font-semibold text-zinc-600 mb-4">
              Tools
            </h4>
            <div className="flex gap-4 flex-wrap">
              <SkillIcon src="assets/git.svg" label="Git" link="https://git-scm.com/"/>
              <SkillIcon src="assets/vscode.svg" label="VS Code" link="https://code.visualstudio.com/"/>
              <SkillIcon src="assets/postman.svg" label="Postman" link="https://www.postman.com/"/>
            </div>
          </div>
        </Card>

      </div>
    </section>
  );
};

export default Skills;
