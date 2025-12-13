interface SkillIconProps {
  src: string;
  label: string;
}

const SkillIcon = ({ src, label }: SkillIconProps) => {
  return (
    <div className="relative group w-14 h-14 flex items-center justify-center">
      {/* Badge */}
      <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center shadow-sm">
        <img src={src} className="w-7 h-7" alt={label} />
      </div>

      {/* Tooltip */}
      <div
        className="
          absolute top-full mt-2 left-1/2 -translate-x-1/2
          px-2 py-1 rounded bg-black text-white text-xs
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          whitespace-nowrap
        "
      >
        {label}
      </div>
    </div>
  );
};

export default SkillIcon;
