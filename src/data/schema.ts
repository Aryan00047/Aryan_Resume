/**
 * Shape of `content.json` — the single source of truth for everything the
 * portfolio renders. Edit it at /admin (dev only), never by hand unless you
 * want to.
 */

export type Beat = {
  num: string;
  title: string;
  body: string;
};

export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  liveUrl: string;
  caseStudyUrl: string;
  /** The first featured project gets the large sticky-preview treatment. */
  featured: boolean;
  /** Only rendered for the featured project. */
  beats: Beat[];
};

export type Bullet = {
  metric: string;
  text: string;
};

export type Experience = {
  org: string;
  orgUrl: string;
  role: string;
  location: string;
  start: string;
  end: string;
  client: string;
  bullets: Bullet[];
};

export type Education = {
  org: string;
  orgUrl: string;
  degree: string;
  detail: string;
  start: string;
  end: string;
  location: string;
};

export type Certification = {
  name: string;
  issuer: string;
  /** ISO yyyy-mm-dd from the date picker. */
  issued: string;
  credentialId: string;
  url: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

/**
 * Competitive-programming / practice profiles — TakeUForward, LeetCode, GfG…
 * `stat` and `note` are whatever you want to show. Leave them blank and the
 * card just links out; leave the whole list empty and the section disappears.
 */
export type CodingProfile = {
  name: string;
  handle: string;
  url: string;
  stat: string;
  note: string;
};

export type BootLine = {
  text: string;
  tail: string;
};

export type ActivityProvider = "github" | "leetcode" | "codeforces";

/**
 * A frozen copy of an activity calendar.
 *
 * `levels` is one digit (0-4) per day starting at `start`, which keeps a full
 * year in ~365 bytes instead of a 365-object array. It is a fallback: providers
 * marked live re-fetch on load and only fall back to this if the feed is
 * unreachable, so a dead third-party mirror degrades to a slightly stale graph
 * rather than a gap. Providers not marked live render from this alone.
 */
export type ActivitySnapshot = {
  total: number;
  start: string;
  levels: string;
  updatedAt: string;
};

export type ActivitySource = {
  provider: ActivityProvider;
  /** Blank hides this graph. */
  username: string;
  snapshot: ActivitySnapshot | null;
};

export const EMPTY_ACTIVITY_SOURCE: ActivitySource = {
  provider: "github",
  username: "",
  snapshot: null,
};

export type SiteContent = {
  profile: {
    fullName: string;
    wordmark: string;
    role: string;
    availability: string;
    years: string;
    /** Rendered in the base text colour, word by word. */
    headline: string;
    /** Rendered in the accent colour, continuing the same sentence. */
    headlineAccent: string;
    lede: string;
    locations: string;
    email: string;
    phone: string;
    portrait: string;
    portraitCaption: string;
  };
  links: {
    linkedin: string;
    github: string;
    resume: string;
  };
  about: {
    lede: string;
    body: string;
  };
  contact: {
    heading: string;
    body: string;
  };
  bootLines: BootLine[];
  /** Contribution calendars — one row per platform. */
  activity: ActivitySource[];
  codingProfiles: CodingProfile[];
  skills: SkillGroup[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
};

export const EMPTY_PROJECT: Project = {
  title: "",
  eyebrow: "",
  description: "",
  tags: [],
  liveUrl: "",
  caseStudyUrl: "",
  featured: false,
  beats: [],
};

export const EMPTY_EXPERIENCE: Experience = {
  org: "",
  orgUrl: "",
  role: "",
  location: "",
  start: "",
  end: "",
  client: "",
  bullets: [],
};

export const EMPTY_EDUCATION: Education = {
  org: "",
  orgUrl: "",
  degree: "",
  detail: "",
  start: "",
  end: "",
  location: "",
};

export const EMPTY_CERTIFICATION: Certification = {
  name: "",
  issuer: "",
  issued: "",
  credentialId: "",
  url: "",
};

export const EMPTY_PROFILE: CodingProfile = {
  name: "",
  handle: "",
  url: "",
  stat: "",
  note: "",
};

export const EMPTY_SKILL_GROUP: SkillGroup = { label: "", items: [] };

export const EMPTY_BEAT: Beat = { num: "", title: "", body: "" };

export const EMPTY_BULLET: Bullet = { metric: "", text: "" };
