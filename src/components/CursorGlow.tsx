import { useEffect, useRef } from "react";

/** Accent glow that trails the pointer. Skipped on touch / coarse pointers. */
const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (el) el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div className="glow" ref={ref} aria-hidden="true" />;
};

export default CursorGlow;
