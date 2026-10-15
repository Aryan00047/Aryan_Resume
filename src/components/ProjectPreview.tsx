import { useEffect, useRef, useState } from "react";
import { externalUrl, hostOf } from "../content";
import type { Project } from "../data/schema";

/**
 * Embedded browser window for a project's live URL. The iframe only mounts once
 * `load` is true (the slide is active or adjacent), so a swiper of five demos
 * does not boot five third-party apps on page load.
 */
const ProjectPreview = ({ project, load }: { project: Project; load: boolean }) => {
  const [frameOk, setFrameOk] = useState(true);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);
  const active = load && visible;

  // Start loading (and the failure clock) only once the window is actually near
  // the viewport. Starting the clock at mount timed out before a user ever
  // scrolled down, so the fallback showed even though the site embeds fine.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active || loaded.current) return;
    // Third-party hosts can refuse to embed — fall back rather than leave an empty panel.
    const check = window.setTimeout(() => {
      if (!loaded.current) setFrameOk(false);
    }, 10000);
    return () => window.clearTimeout(check);
  }, [active]);

  const url = externalUrl(project.liveUrl);

  return (
    <div className="browser" ref={root}>
      <div className="browser-bar">
        <span className="light" />
        <span className="light" />
        <span className="light" />
        <span className="path">{hostOf(project.liveUrl)} · live</span>
        <span className="status">
          <span className="dot-live" />
          running
        </span>
      </div>
      <div className="browser-body">
        <div className="browser-fallback">
          <div className="fallback-note">
            {active && !frameOk ? "preview unavailable — embedding blocked" : "loading preview…"}
          </div>
          <div className="fallback-title">{project.title}</div>
          <a className="btn btn-secondary fallback-open" href={url} target="_blank" rel="noopener noreferrer">
            Open live ↗
          </a>
        </div>
        {active && frameOk && (
          <>
            <iframe
              className="browser-frame"
              src={url}
              onLoad={() => {
                loaded.current = true;
              }}
              tabIndex={-1}
              title={`${project.title} live demo`}
            />
            <a className="browser-open" href={url} target="_blank" rel="noopener noreferrer">
              <span>Open live ↗</span>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectPreview;
