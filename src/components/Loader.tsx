import { useEffect, useRef, useState } from "react";
import { content } from "../content";

/** Boot-sequence overlay that lifts after ~1.6s. */
const Loader = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let progress = 0;
    const tick = window.setInterval(() => {
      progress = Math.min(100, progress + 14 + Math.random() * 16);
      if (barRef.current) barRef.current.style.width = `${progress}%`;
      if (progress >= 100) window.clearInterval(tick);
    }, 210);

    const lift = window.setTimeout(() => setDone(true), 1600);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(lift);
    };
  }, []);

  return (
    <div className="loader" data-done={done} aria-hidden="true">
      <div className="loader-inner">
        <div className="loader-title">{content.profile.wordmark} — build</div>
        {content.bootLines.map((line, i) => (
          <div className="loader-line" key={i}>
            <span className="chev">›</span>
            <span>{line.text}</span>
            <span className="tail">{line.tail}</span>
          </div>
        ))}
        <div className="loader-track">
          <div className="loader-bar" ref={barRef} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
