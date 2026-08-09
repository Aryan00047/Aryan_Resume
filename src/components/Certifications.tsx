import { content, externalUrl, formatDate } from "../content";
import { useReveal } from "../hooks/useReveal";

/** Hidden entirely until you add one in the admin page. */
const Certifications = () => {
  const heading = useReveal();
  const list = useReveal();

  if (!content.certifications.length) return null;

  return (
    <section id="certifications" className="section shell">
      <div className="reveal rule" ref={heading}>
        <h6>Certifications</h6>
        <div className="rule-line" />
      </div>

      <div className="reveal cert-list" ref={list}>
        {content.certifications.map((cert, i) => (
          <div className="cert-row" key={`${cert.name}-${i}`}>
            <div>
              <div className="cert-name">{cert.name}</div>
              {cert.issuer && <div className="cert-issuer">{cert.issuer}</div>}
              {cert.credentialId && (
                <div className="cert-cred">
                  Credential ID <span>{cert.credentialId}</span>
                </div>
              )}
            </div>
            <div className="cert-year">{formatDate(cert.issued)}</div>
            {cert.url ? (
              <a
                className="btn btn-ghost"
                href={externalUrl(cert.url)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Verify ↗
              </a>
            ) : (
              <span />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
