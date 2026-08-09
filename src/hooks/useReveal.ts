import { useEffect, useRef } from "react";

/**
 * Scroll reveal — mirrors the `data-reveal` observer in the nocturne design.
 * Attach the returned ref to an element carrying the `reveal` class; it gets
 * `is-visible` once it enters the viewport, and unconditionally after 3.5s so
 * content can never be stranded invisible.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.06 },
    );
    io.observe(el);

    const safety = window.setTimeout(() => el.classList.add("is-visible"), 3500);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return ref;
}
