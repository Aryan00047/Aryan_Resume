import { content } from "../content";

/** "aryan.gupta" with the separator picked out in the accent colour. */
const Wordmark = () => {
  const [head, ...rest] = content.profile.wordmark.split(".");
  if (!rest.length) return <>{head}</>;
  return (
    <>
      {head}
      <span className="dot">.</span>
      {rest.join(".")}
    </>
  );
};

export default Wordmark;
