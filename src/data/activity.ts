import type { ActivityProvider, ActivitySnapshot } from "./schema";

export type ContribDay = { date: string; level: number };
export type Contributions = { total: number; days: ContribDay[] };

export const WINDOW_DAYS = 365;

type ProviderInfo = {
  label: string;
  /** What the big number means, e.g. "contributions". */
  unit: string;
  /** Safe to fetch on every visitor's page load? */
  live: boolean;
  note: string;
  profileUrl: (username: string) => string;
};

/**
 * What each platform actually exposes, established by probing them:
 *
 *  - GitHub has no token-free official endpoint for the calendar, so this uses a
 *    public community mirror. Verified to match GitHub's own public profile
 *    exactly (both reported 73 across 27 days for Aryan00047). It shows private
 *    contributions too, but only once the account opts in via Contribution
 *    settings → Private contributions; otherwise GitHub publishes only the
 *    public ones and there is nothing more to read.
 *  - Codeforces has a real official API, but `user.status` returns every
 *    submission — megabytes for an active account. Too heavy to put on the
 *    critical path of a visitor's page load, so it is refreshed from the admin
 *    and served from the snapshot.
 *  - LeetCode's own GraphQL sends no CORS headers (verified), so a browser
 *    cannot call it. This community mirror can.
 *
 * TakeUForward and GeeksforGeeks are deliberately absent: TUF renders
 * `Active Days - 0` for anonymous visitors because the numbers load behind
 * auth, and GfG publishes no API. Neither can be read without a logged-in
 * session, which a static site cannot hold. Type those figures in by hand on
 * the Coding profiles tab instead.
 */
export const PROVIDERS: Record<ActivityProvider, ProviderInfo> = {
  github: {
    label: "GitHub",
    unit: "contributions",
    live: true,
    // Deliberately not "public only": this reads whatever your profile
    // publishes. Turn on Contribution settings → Private contributions and the
    // private ones start counting here too, with no change needed at this end.
    note: "As published on your GitHub profile",
    profileUrl: (u) => `https://github.com/${u}`,
  },
  leetcode: {
    label: "LeetCode",
    unit: "submissions",
    live: true,
    note: "Via public API mirror",
    profileUrl: (u) => `https://leetcode.com/u/${u}/`,
  },
  codeforces: {
    label: "Codeforces",
    unit: "submissions",
    live: false,
    note: "Cached — refreshed from the admin page",
    profileUrl: (u) => `https://codeforces.com/profile/${u}`,
  },
};

export const PROVIDER_IDS = Object.keys(PROVIDERS) as ActivityProvider[];

const isoOf = (ms: number) => new Date(ms).toISOString().slice(0, 10);

const addDays = (iso: string, days: number) => {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};

/**
 * Turns a date→count map into a fixed 365-day series ending today.
 * Levels are scaled against the busiest day so the shading is relative to how
 * active you actually are, rather than to an arbitrary absolute threshold.
 */
const buildSeries = (counts: Record<string, number>): Contributions => {
  const end = isoOf(Date.now());
  const raw: number[] = [];
  const days: ContribDay[] = [];
  let total = 0;

  for (let i = WINDOW_DAYS - 1; i >= 0; i--) {
    const date = addDays(end, -i);
    const count = counts[date] ?? 0;
    raw.push(count);
    total += count;
    days.push({ date, level: 0 });
  }

  const max = Math.max(...raw);
  if (max > 0) {
    for (let i = 0; i < days.length; i++) {
      const count = raw[i];
      days[i].level = count === 0 ? 0 : Math.min(4, Math.max(1, Math.ceil((count / max) * 4)));
    }
  }

  return { total, days };
};

/** Expands the packed digit string back into dated days. */
export const decodeSnapshot = (snapshot: ActivitySnapshot | null): Contributions | null => {
  if (!snapshot?.levels || !snapshot.start) return null;
  return {
    total: snapshot.total,
    days: [...snapshot.levels].map((char, i) => ({
      date: addDays(snapshot.start, i),
      level: Number(char) || 0,
    })),
  };
};

export const encodeSnapshot = (contributions: Contributions): ActivitySnapshot => ({
  total: contributions.total,
  start: contributions.days[0]?.date ?? "",
  levels: contributions.days.map((day) => String(day.level)).join(""),
  updatedAt: isoOf(Date.now()),
});

const getJson = async (url: string, signal?: AbortSignal) => {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`${new URL(url).host} returned ${res.status}`);
  return (await res.json()) as unknown;
};

const fetchGithub = async (username: string, signal?: AbortSignal): Promise<Contributions> => {
  const json = (await getJson(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
    signal,
  )) as { total?: Record<string, number>; contributions?: { date: string; level: number }[] };

  const days = json.contributions;
  if (!Array.isArray(days) || !days.length) throw new Error("Unexpected GitHub response.");

  return {
    total: Object.values(json.total ?? {}).reduce((sum, n) => sum + n, 0),
    days: days.map((day) => ({ date: day.date, level: Number(day.level) || 0 })),
  };
};

const fetchLeetcode = async (username: string, signal?: AbortSignal): Promise<Contributions> => {
  const json = (await getJson(
    `https://alfa-leetcode-api.onrender.com/${encodeURIComponent(username)}/calendar`,
    signal,
  )) as { submissionCalendar?: string };

  // The mirror hands back the calendar as a JSON *string* of unix-second keys.
  let calendar: Record<string, number> = {};
  try {
    calendar = JSON.parse(json.submissionCalendar ?? "{}") as Record<string, number>;
  } catch {
    throw new Error("Could not read the LeetCode calendar.");
  }

  const counts: Record<string, number> = {};
  for (const [seconds, count] of Object.entries(calendar)) {
    counts[isoOf(Number(seconds) * 1000)] = Number(count) || 0;
  }
  return buildSeries(counts);
};

const fetchCodeforces = async (username: string, signal?: AbortSignal): Promise<Contributions> => {
  // Capped: enough to cover a year for all but the most prolific accounts,
  // without pulling a user's entire submission history.
  const json = (await getJson(
    `https://codeforces.com/api/user.status?handle=${encodeURIComponent(username)}&from=1&count=2000`,
    signal,
  )) as { status?: string; comment?: string; result?: { creationTimeSeconds: number }[] };

  if (json.status !== "OK") throw new Error(json.comment ?? "Codeforces rejected the request.");

  const counts: Record<string, number> = {};
  for (const submission of json.result ?? []) {
    const date = isoOf(submission.creationTimeSeconds * 1000);
    counts[date] = (counts[date] ?? 0) + 1;
  }
  return buildSeries(counts);
};

export const fetchActivity = (
  provider: ActivityProvider,
  username: string,
  signal?: AbortSignal,
): Promise<Contributions> => {
  if (provider === "leetcode") return fetchLeetcode(username, signal);
  if (provider === "codeforces") return fetchCodeforces(username, signal);
  return fetchGithub(username, signal);
};
