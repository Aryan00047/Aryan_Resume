import { content } from "../content";
import Wordmark from "./Wordmark";

/** "Aryan Gupta" → "AG". Falls back to the first two letters of a single name. */
const initialsOf = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return parts
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
};

/** Badge + wordmark. `compact` drops the wordmark and keeps just the badge. */
const Logo = ({ compact = false }: { compact?: boolean }) => {
  const { fullName } = content.profile;

  return (
    <a className="logo" href="#top" aria-label={`${fullName} — home`}>
      <span className="logo-badge" aria-hidden="true">
        {initialsOf(fullName)}
      </span>
      {!compact && (
        <span className="logo-word">
          <Wordmark />
        </span>
      )}
    </a>
  );
};

export default Logo;
