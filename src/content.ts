import raw from "./data/content.json";
import type { SiteContent } from "./data/schema";

/**
 * Everything the portfolio renders, loaded from `data/content.json`.
 * Edit it through the admin page (`npm run dev`, then /admin) — the JSON is
 * bundled at build time, so a change is live as soon as you rebuild.
 */
export const content = raw as unknown as SiteContent;

export const featuredProject = content.projects.find((p) => p.featured) ?? content.projects[0];

export const otherProjects = content.projects.filter((p) => p !== featuredProject);

/** Profiles are only worth a section once at least one has somewhere to point. */
export const visibleCodingProfiles = content.codingProfiles.filter(
  (p) => p.name && (p.url || p.stat || p.handle),
);

/** Splits a sentence into words so the hero can stagger them in. */
export const words = (sentence: string) => sentence.split(/\s+/).filter(Boolean);

/**
 * Makes a hand-typed link safe to render.
 *
 * A bare host like `takeuforward.org/profile/x` is a RELATIVE url to the
 * browser — it would resolve against this site and 404. Anything without a
 * scheme (and not deliberately internal) gets https://.
 */
export const externalUrl = (url: string) => {
  const trimmed = url.trim();
  if (!trimmed) return "";
  // Already absolute, protocol-relative, or a non-http scheme we should leave be.
  if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(trimmed)) return trimmed;
  // Deliberately internal — same-origin paths and in-page anchors.
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return trimmed;
  return `https://${trimmed}`;
};

/**
 * Formats an ISO date from the admin's picker as e.g. `12 Apr 2026`.
 *
 * Parsed and formatted in UTC — a local-timezone parse of a bare `yyyy-mm-dd`
 * shifts the day backwards for anyone west of UTC. Anything that is not an ISO
 * date (older hand-typed values like "April,2026") is passed through untouched.
 */
export const formatDate = (value: string) => {
  const iso = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
};

/** Bare host for display, e.g. `takeuforward.org`. */
export const hostOf = (url: string) => {
  try {
    return new URL(externalUrl(url)).host.replace(/^www\./, "");
  } catch {
    return url;
  }
};
