// import SkillIcon from "./SkillIcon";
// import Card from "./Card";

// const Skills = () => {
//   return (
//     <section className="max-w-4xl mx-auto px-4 pt-8">
//       <h2 className="text-3xl font-bold tracking-tight text-zinc-900 text-center mb-2">
//         Skills
//       </h2>

//       <Card>
//         <div className="p-6 space-y-8">

//           {/* Languages */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
//             <h4 className="text-sm font-semibold text-zinc-500 md:mt-2">
//               Languages
//             </h4>
//             <div className="md:col-span-3 flex gap-4 flex-wrap">
//               <SkillIcon src="/src/assets/javascript.svg" label="JavaScript" />
//               <SkillIcon src="/src/assets/typescript.svg" label="TypeScript" />
//               <SkillIcon src="/src/assets/rxjs-1.svg" label="RxJS" />
//             </div>
//           </div>

//           {/* Frameworks */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
//             <h4 className="text-sm font-semibold text-zinc-500 md:mt-2">
//               Frameworks
//             </h4>
//             <div className="md:col-span-3 flex gap-4 flex-wrap">
//               <SkillIcon src="/src/assets/react.svg" label="React" />
//               <SkillIcon src="/src/assets/redux.svg" label="Redux" />
//               <SkillIcon src="/src/assets/angular.svg" label="Angular" />
//             </div>
//           </div>

//           {/* Styling */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
//             <h4 className="text-sm font-semibold text-zinc-500 md:mt-2">
//               Styling
//             </h4>
//             <div className="md:col-span-3 flex gap-4 flex-wrap">
//               <SkillIcon src="/src/assets/tailwindcss.svg" label="Tailwind CSS" />
//               <SkillIcon src="/src/assets/bootstrap.svg" label="Bootstrap" />
//             </div>
//           </div>

//           {/* Tools */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
//             <h4 className="text-sm font-semibold text-zinc-500 md:mt-2">
//               Tools
//             </h4>
//             <div className="md:col-span-3 flex gap-4 flex-wrap">
//               <SkillIcon src="/src/assets/git.svg" label="Git" />
//               <SkillIcon src="/src/assets/vscode.svg" label="VS Code" />
//               <SkillIcon src="/src/assets/postman.svg" label="Postman" />
//             </div>
//           </div>

//         </div>
//       </Card>
//     </section>
//   );
// };

// export default Skills;

import SkillIcon from "./SkillIcon";
import Card from "./Card";

const Skills = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 pt-8">
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
              <SkillIcon src="/src/assets/javascript.svg" label="JavaScript" />
              <SkillIcon src="/src/assets/typescript.svg" label="TypeScript" />
              <SkillIcon src="/src/assets/rxjs-1.svg" label="RxJS" />
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
              <SkillIcon src="/src/assets/react.svg" label="React" />
              <SkillIcon src="/src/assets/redux.svg" label="Redux" />
              <SkillIcon src="/src/assets/angular.svg" label="Angular" />
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
              <SkillIcon src="/src/assets/tailwindcss.svg" label="Tailwind CSS" />
              <SkillIcon src="/src/assets/bootstrap.svg" label="Bootstrap" />
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
              <SkillIcon src="/src/assets/git.svg" label="Git" />
              <SkillIcon src="/src/assets/vscode.svg" label="VS Code" />
              <SkillIcon src="/src/assets/postman.svg" label="Postman" />
            </div>
          </div>
        </Card>

      </div>
    </section>
  );
};

export default Skills;
