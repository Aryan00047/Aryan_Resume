import { useState, type FormEvent } from "react";
import { content, externalUrl } from "../content";
import { useReveal } from "../hooks/useReveal";
import Prose from "./Prose";

const ConnectWithMe = () => {
  const card = useReveal();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { contact, links, profile } = content;

  // No backend here, so the form hands off to the visitor's mail client with
  // everything prefilled. Swap this for a POST once a form service is wired up.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry — ${form.name || "Hello"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}${form.email ? `\n${form.email}` : ""}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section contact shell">
      <div className="reveal contact-card" ref={card}>
        <div className="contact-grid">
          <div>
            <h2>{contact.heading}</h2>
            <Prose text={contact.body} />
            <div className="contact-links">
              {profile.email && <a href={`mailto:${profile.email}`}>{profile.email}</a>}
              {links.linkedin && (
                <a href={externalUrl(links.linkedin)} target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
              )}
              {links.github && (
                <a href={externalUrl(links.github)} target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
              )}
              {profile.phone && <span>{profile.phone}</span>}
            </div>
          </div>

          <form className="contact-form" onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                className="input"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                className="input"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="field">
              <label htmlFor="contact-message">What are you building?</label>
              <textarea
                id="contact-message"
                className="input"
                placeholder="A sentence or two is plenty."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button className="btn btn-primary btn-block" type="submit" style={{ padding: 11 }}>
              {sent ? "Thanks — I'll reply soon" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConnectWithMe;
