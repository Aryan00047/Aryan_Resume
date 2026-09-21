import { paragraphs } from "../content";

/**
 * Renders admin-entered prose as real paragraphs. Blank lines in the textarea
 * become separate <p> elements; a blank field renders nothing at all rather
 * than an empty paragraph holding open a gap.
 */
const Prose = ({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <>
    {paragraphs(text).map((block, i) => (
      <p className={className} style={style} key={i}>
        {block}
      </p>
    ))}
  </>
);

export default Prose;
