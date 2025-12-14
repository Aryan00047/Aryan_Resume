import { type ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
      {children}
    </div>
  );
};

export default Card;
