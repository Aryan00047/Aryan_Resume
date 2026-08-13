import { useEffect, useMemo, useState } from "react";
import { content } from "../content";
import {
    decodeSnapshot,
    fetchActivity,
    PROVIDERS,
    type ContribDay,
    type Contributions,
} from "../data/activity";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** How often an open tab re-polls the live feeds. */
const REFRESH_MS = 60 * 10 * 1000;

type Loaded = { data: Contributions | null; live: boolean };

const layoutOf = (data: Contributions | null) => {
    if (!data?.days.length) return null;

    // Columns are weeks running Sunday→Saturday, so the first column is padded
    // out to the start date's weekday.
    const pad = new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay();
    const cells: (ContribDay | null)[] = [...Array<null>(pad).fill(null), ...data.days];
    const weeks = Math.ceil(cells.length / 7);

    const labels: { key: string; column: number; text: string }[] = [];
    let lastMonth = -1;
    for (let week = 0; week < weeks; week++) {
        const day = cells.slice(week * 7, week * 7 + 7).find(Boolean);
        if (!day) continue;
        const month = new Date(`${day.date}T00:00:00Z`).getUTCMonth();
        // Skip the final column so a label cannot overflow the grid.
        if (month !== lastMonth && week < weeks - 1) {
            labels.push({ key: `${day.date}-${month}`, column: week + 1, text: MONTHS[month] });
            lastMonth = month;
        }
    }

    return { cells, weeks, labels };
};

/**
 * Contribution calendars, one tab per platform.
 *
 * Each renders its stored snapshot immediately so there is never an empty box,
 * then swaps in live data for the providers cheap enough to fetch on page load.
 */
const ActivityGraph = () => {
    const sources = useMemo(
        () => (content.activity ?? []).filter((source) => source.username && PROVIDERS[source.provider]),
        [],
    );

    const [state, setState] = useState<Loaded[]>(() =>
        sources.map((source) => ({ data: decodeSnapshot(source.snapshot), live: false })),
    );
    const [active, setActive] = useState(0);

    useEffect(() => {
        const live = sources
            .map((source, index) => ({ source, index }))
            .filter(({ source }) => PROVIDERS[source.provider].live);

        if (!live.length) return;

        const controller = new AbortController();
        let lastRun = 0;

        const refresh = () => {
            if (controller.signal.aborted) return;
            // A background tab has its timers throttled and nobody is looking at the
            // graph anyway — skip, and let the visibility handler catch up.
            if (document.hidden) return;

            lastRun = Date.now();
            for (const { source, index } of live) {
                fetchActivity(source.provider, source.username, controller.signal)
                    .then((fresh) => {
                        setState((prev) =>
                            prev.map((row, j) => (j === index ? { data: fresh, live: true } : row)),
                        );
                    })
                    .catch(() => {
                        // Offline, rate-limited, or the mirror is gone — the snapshot stands.
                    });
            }
        };

        refresh();
        const timer = window.setInterval(refresh, REFRESH_MS);

        // Covers the tab that sat in the background for a day: the interval was
        // throttled or skipped, so refresh on the way back in if it is due.
        const onVisible = () => {
            if (document.visibilityState === "visible" && Date.now() - lastRun >= REFRESH_MS) {
                refresh();
            }
        };
        document.addEventListener("visibilitychange", onVisible);

        return () => {
            controller.abort();
            window.clearInterval(timer);
            document.removeEventListener("visibilitychange", onVisible);
        };
    }, [sources]);

    const current = state[active];
    const source = sources[active];
    const layout = layoutOf(current?.data ?? null);

    // Only tabs with something to show are worth offering.
    const usable = sources.filter((_, i) => state[i]?.data);
    if (!source || !current?.data || !layout || !usable.length) return null;

    const info = PROVIDERS[source.provider];
    const columns = `repeat(${layout.weeks}, var(--gh-cell))`;

    return (
        <div className="gh-panel">
            <div className="gh-head">
                <div className="gh-total">
                    <strong>{current.data.total.toLocaleString()}</strong> {info.unit} in the last year
                </div>

                {sources.length > 1 && (
                    <div className="gh-tabs">
                        {sources.map((item, i) => (
                            <button
                                key={item.provider + item.username}
                                className="gh-tab"
                                aria-pressed={i === active}
                                disabled={!state[i]?.data}
                                onClick={() => setActive(i)}
                            >
                                {PROVIDERS[item.provider].label}
                            </button>
                        ))}
                    </div>
                )}

                <a
                    className="gh-link"
                    href={info.profileUrl(source.username)}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    @{source.username} ↗
                </a>
            </div>

            <div className="gh-scroll">
                <div className="gh-inner">
                    <div className="gh-months" style={{ gridTemplateColumns: columns }}>
                        {layout.labels.map((label) => (
                            <span key={label.key} style={{ gridColumnStart: label.column }}>
                                {label.text}
                            </span>
                        ))}
                    </div>

                    <div
                        className="gh-grid"
                        role="img"
                        aria-label={`${current.data.total} ${info.unit} on ${info.label} in the last year`}
                    >
                        {layout.cells.map((cell, i) =>
                            cell ? (
                                <span key={cell.date} data-level={cell.level} title={cell.date} />
                            ) : (
                                <span key={`pad-${i}`} className="gh-pad" />
                            ),
                        )}
                    </div>
                </div>
            </div>

            <div className="gh-foot">
                <span>
                    {info.note}
                    {info.live && !current.live ? " · cached" : ""}
                </span>
                <span className="gh-legend">
                    Less
                    {[0, 1, 2, 3, 4].map((level) => (
                        <i key={level} data-level={level} />
                    ))}
                    More
                </span>
            </div>
        </div>
    );
};

export default ActivityGraph;
