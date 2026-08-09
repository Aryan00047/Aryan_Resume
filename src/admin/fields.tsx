import { useState, type ReactNode } from "react";

export const Text = ({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
}) => (
  <label className="a-field">
    <span className="a-label">{label}</span>
    <input
      className="a-input"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
    {hint && <span className="a-hint">{hint}</span>}
  </label>
);

export const Area = ({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  hint?: string;
}) => (
  <label className="a-field">
    <span className="a-label">{label}</span>
    <textarea
      className="a-input"
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
    {hint && <span className="a-hint">{hint}</span>}
  </label>
);

/** Native date picker — opens the OS calendar with month, day and year. */
export const DateField = ({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) => (
  <label className="a-field">
    <span className="a-label">{label}</span>
    <input
      className="a-input"
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {hint && <span className="a-hint">{hint}</span>}
  </label>
);

export const Toggle = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) => (
  <label className="a-toggle">
    <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
    <span>{label}</span>
  </label>
);

/** Chip list — type and press Enter, click × to drop one. */
export const Tags = ({
  label,
  value,
  onChange,
  placeholder = "Type and press Enter",
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}) => {
  const [draft, setDraft] = useState("");

  const commit = () => {
    const next = draft.trim();
    if (!next) return;
    if (!value.includes(next)) onChange([...value, next]);
    setDraft("");
  };

  return (
    <div className="a-field">
      <span className="a-label">{label}</span>
      <div className="a-chips">
        {value.map((item, i) => (
          <span className="a-chip" key={`${item}-${i}`}>
            {item}
            <button
              type="button"
              onClick={() => onChange(value.filter((_, index) => index !== i))}
              aria-label={`Remove ${item}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        className="a-input"
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            commit();
          }
          if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
      />
    </div>
  );
};

/** Add / remove / reorder a list of records, each rendered by `children`. */
export function Repeater<T>({
  label,
  items,
  empty,
  onChange,
  title,
  children,
  addLabel = "Add",
}: {
  label: string;
  items: T[];
  empty: T;
  onChange: (items: T[]) => void;
  title: (item: T, index: number) => string;
  children: (item: T, update: (patch: Partial<T>) => void, index: number) => ReactNode;
  addLabel?: string;
}) {
  const [open, setOpen] = useState<number | null>(items.length ? 0 : null);

  const replace = (index: number, next: T) =>
    onChange(items.map((item, i) => (i === index ? next : item)));

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
    setOpen(target);
  };

  return (
    <div className="a-repeater">
      <div className="a-repeater-head">
        <span className="a-label">{label}</span>
        <button
          type="button"
          className="a-btn a-btn-ghost"
          onClick={() => {
            onChange([...items, structuredClone(empty)]);
            setOpen(items.length);
          }}
        >
          + {addLabel}
        </button>
      </div>

      {items.length === 0 && <p className="a-empty">Nothing here yet.</p>}

      {items.map((item, index) => (
        <div className={`a-card${open === index ? " is-open" : ""}`} key={index}>
          <div className="a-card-head">
            <button
              type="button"
              className="a-card-title"
              onClick={() => setOpen(open === index ? null : index)}
            >
              <span className="a-caret">{open === index ? "▾" : "▸"}</span>
              {title(item, index) || "Untitled"}
            </button>
            <div className="a-card-tools">
              <button type="button" onClick={() => move(index, -1)} aria-label="Move up">
                ↑
              </button>
              <button type="button" onClick={() => move(index, 1)} aria-label="Move down">
                ↓
              </button>
              <button
                type="button"
                className="a-danger"
                onClick={() => {
                  if (!confirm(`Delete “${title(item, index) || "this entry"}”?`)) return;
                  onChange(items.filter((_, i) => i !== index));
                  setOpen(null);
                }}
                aria-label="Delete"
              >
                ×
              </button>
            </div>
          </div>

          {open === index && (
            <div className="a-card-body">
              {children(item, (patch) => replace(index, { ...item, ...patch }), index)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
