import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  EMPTY_BEAT,
  EMPTY_BULLET,
  EMPTY_CERTIFICATION,
  EMPTY_EDUCATION,
  EMPTY_EXPERIENCE,
  EMPTY_PROFILE,
  EMPTY_PROJECT,
  EMPTY_ACTIVITY_SOURCE,
  EMPTY_SKILL_GROUP,
  type ActivityProvider,
  type SiteContent,
} from "../data/schema";
import { encodeSnapshot, fetchActivity, PROVIDERS, PROVIDER_IDS } from "../data/activity";
import { Area, DateField, Repeater, Tags, Text, Toggle } from "./fields";
import "./admin.css";

const SECTIONS = [
  "Profile",
  "Links & résumé",
  "About & contact",
  "Activity graphs",
  "Coding profiles",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Certifications",
  "Loader",
] as const;

type Section = (typeof SECTIONS)[number];

const AdminApp = () => {
  const [data, setData] = useState<SiteContent | null>(null);
  const [section, setSection] = useState<Section>("Profile");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const saved = useRef("");

  useEffect(() => {
    fetch("/__admin/content")
      .then((r) => r.json())
      .then((json: SiteContent) => {
        setData(json);
        saved.current = JSON.stringify(json);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)));
  }, []);

  const dirty = useMemo(
    () => (data ? JSON.stringify(data) !== saved.current : false),
    [data],
  );

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const save = useCallback(async () => {
    if (!data) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/__admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!json.ok) throw new Error(json.error ?? "Save failed");
      saved.current = JSON.stringify(data);
      setStatus(`Saved to src/data/content.json · ${new Date().toLocaleTimeString()}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  }, [data]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        void save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save]);

  if (error && !data) {
    return (
      <div className="a-shell">
        <p className="a-error">Could not load content.json — {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="a-shell">
        <p className="a-empty">Loading…</p>
      </div>
    );
  }

  const patch = (next: Partial<SiteContent>) => setData({ ...data, ...next });

  const uploadResume = async (file: File) => {
    setError("");
    setStatus("Uploading résumé…");
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("Could not read that file."));
        reader.readAsDataURL(file);
      });

      const res = await fetch("/__admin/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, data: dataUrl }),
      });
      const json = (await res.json()) as { ok: boolean; path?: string; error?: string };
      if (!json.ok || !json.path) throw new Error(json.error ?? "Upload failed");

      patch({ links: { ...data.links, resume: json.path } });
      setStatus(`Résumé written to public${json.path} — remember to save.`);
    } catch (e: unknown) {
      setStatus("");
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <div className="a-shell">
      <aside className="a-side">
        <div className="a-brand">
          aryan<span>.</span>gupta
          <em>admin</em>
        </div>
        <nav>
          {SECTIONS.map((item) => (
            <button
              key={item}
              className={section === item ? "is-active" : ""}
              onClick={() => setSection(item)}
            >
              {item}
            </button>
          ))}
        </nav>
        <a className="a-side-link" href="/">
          ← View portfolio
        </a>
      </aside>

      <main className="a-main">
        <header className="a-bar">
          <div>
            <h1>{section}</h1>
            <p>
              {dirty ? "Unsaved changes" : "All changes saved"} · writes to{" "}
              <code>src/data/content.json</code>
            </p>
          </div>
          <button className="a-btn a-btn-primary" onClick={() => void save()} disabled={saving || !dirty}>
            {saving ? "Saving…" : "Save"}
          </button>
        </header>

        {error && <p className="a-error">{error}</p>}
        {status && !error && <p className="a-status">{status}</p>}

        <div className="a-body">
          {section === "Profile" && (
            <>
              <div className="a-grid">
                <Text
                  label="Full name"
                  value={data.profile.fullName}
                  onChange={(v) => patch({ profile: { ...data.profile, fullName: v } })}
                />
                <Text
                  label="Wordmark"
                  value={data.profile.wordmark}
                  onChange={(v) => patch({ profile: { ...data.profile, wordmark: v } })}
                  hint="Shown in the header and footer. The dot is coloured automatically."
                />
                <Text
                  label="Role"
                  value={data.profile.role}
                  onChange={(v) => patch({ profile: { ...data.profile, role: v } })}
                />
                <Text
                  label="Years of experience"
                  value={data.profile.years}
                  onChange={(v) => patch({ profile: { ...data.profile, years: v } })}
                />
                <Text
                  label="Email"
                  value={data.profile.email}
                  onChange={(v) => patch({ profile: { ...data.profile, email: v } })}
                />
                <Text
                  label="Phone"
                  value={data.profile.phone}
                  onChange={(v) => patch({ profile: { ...data.profile, phone: v } })}
                />
              </div>
              <Text
                label="Availability badge"
                value={data.profile.availability}
                onChange={(v) => patch({ profile: { ...data.profile, availability: v } })}
              />
              <Text
                label="Headline"
                value={data.profile.headline}
                onChange={(v) => patch({ profile: { ...data.profile, headline: v } })}
                hint="First half of the hero sentence, in the base colour."
              />
              <Text
                label="Headline (accent)"
                value={data.profile.headlineAccent}
                onChange={(v) => patch({ profile: { ...data.profile, headlineAccent: v } })}
                hint="Second half, in purple. Both animate in word by word."
              />
              <Area
                label="Hero paragraph"
                value={data.profile.lede}
                rows={4}
                onChange={(v) => patch({ profile: { ...data.profile, lede: v } })}
              />
              <Text
                label="Locations line"
                value={data.profile.locations}
                onChange={(v) => patch({ profile: { ...data.profile, locations: v } })}
              />
              <div className="a-grid">
                <Text
                  label="Portrait path"
                  value={data.profile.portrait}
                  onChange={(v) => patch({ profile: { ...data.profile, portrait: v } })}
                  hint="Drop the image in public/assets/ and point here."
                />
                <Text
                  label="Portrait caption"
                  value={data.profile.portraitCaption}
                  onChange={(v) => patch({ profile: { ...data.profile, portraitCaption: v } })}
                />
              </div>
            </>
          )}

          {section === "Links & résumé" && (
            <>
              <Text
                label="LinkedIn"
                value={data.links.linkedin}
                onChange={(v) => patch({ links: { ...data.links, linkedin: v } })}
              />
              <Text
                label="GitHub"
                value={data.links.github}
                onChange={(v) => patch({ links: { ...data.links, github: v } })}
              />
              <Text
                label="Résumé path"
                value={data.links.resume}
                onChange={(v) => patch({ links: { ...data.links, resume: v } })}
                hint="Set automatically when you upload below."
              />

              <div className="a-upload">
                <div>
                  <strong>Replace the résumé PDF</strong>
                  <p>
                    Writes straight into <code>public/</code>, overwriting any file of the same
                    name. Keep the name <code>Aryan_Resume.pdf</code> and existing links keep
                    working.
                  </p>
                </div>
                <label className="a-btn a-btn-secondary">
                  Choose PDF
                  <input
                    type="file"
                    accept="application/pdf"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void uploadResume(file);
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
            </>
          )}

          {section === "About & contact" && (
            <>
              <Area
                label="About — opening"
                value={data.about.lede}
                rows={4}
                onChange={(v) => patch({ about: { ...data.about, lede: v } })}
              />
              <Area
                label="About — body"
                value={data.about.body}
                rows={6}
                onChange={(v) => patch({ about: { ...data.about, body: v } })}
              />
              <Text
                label="Contact heading"
                value={data.contact.heading}
                onChange={(v) => patch({ contact: { ...data.contact, heading: v } })}
              />
              <Area
                label="Contact paragraph"
                value={data.contact.body}
                rows={4}
                onChange={(v) => patch({ contact: { ...data.contact, body: v } })}
              />
            </>
          )}

          {section === "Activity graphs" && (
            <>
              <p className="a-empty">
                One contribution calendar per platform. TakeUForward and GeeksforGeeks are not
                listed because neither exposes this data publicly — put those figures on the
                Coding profiles tab by hand.
              </p>
              <Repeater
                label="Calendars"
                addLabel="Add platform"
                items={data.activity ?? []}
                empty={EMPTY_ACTIVITY_SOURCE}
                onChange={(activity) => patch({ activity })}
                title={(item) => `${PROVIDERS[item.provider]?.label ?? item.provider} · ${item.username || "no username"}`}
              >
                {(item, update) => (
                  <>
                    <div className="a-grid">
                      <label className="a-field">
                        <span className="a-label">Platform</span>
                        <select
                          className="a-input"
                          value={item.provider}
                          onChange={(e) =>
                            update({ provider: e.target.value as ActivityProvider, snapshot: null })
                          }
                        >
                          {PROVIDER_IDS.map((id) => (
                            <option key={id} value={id}>
                              {PROVIDERS[id].label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <Text
                        label="Username"
                        value={item.username}
                        onChange={(username) => update({ username })}
                      />
                    </div>

                    <div className="a-upload">
                      <div>
                        <strong>
                          {PROVIDERS[item.provider].live
                            ? "Refresh the cached calendar"
                            : "Fetch the calendar"}
                        </strong>
                        <p>
                          {PROVIDERS[item.provider].live
                            ? "The live page re-fetches on every visit; this cache is the fallback shown if that feed is down."
                            : "This platform is too heavy to fetch on every visit, so the site always renders this cache. Refresh it whenever you want the graph updated."}
                          {item.provider === "github" && (
                            <>
                              {" "}
                              Counts match whatever your profile publishes — if the total looks
                              low, enable <em>Contribution settings → Private contributions</em> on
                              GitHub, then fetch again.
                            </>
                          )}
                          {item.snapshot && (
                            <>
                              {" "}
                              Last cached: <code>{item.snapshot.updatedAt}</code> (
                              {item.snapshot.total} {PROVIDERS[item.provider].unit}).
                            </>
                          )}
                        </p>
                      </div>
                      <button
                        className="a-btn a-btn-secondary"
                        disabled={!item.username}
                        onClick={() => {
                          setError("");
                          setStatus(`Fetching from ${PROVIDERS[item.provider].label}…`);
                          fetchActivity(item.provider, item.username)
                            .then((fresh) => {
                              update({ snapshot: encodeSnapshot(fresh) });
                              setStatus(
                                `Cached ${fresh.total} ${PROVIDERS[item.provider].unit} — remember to save.`,
                              );
                            })
                            .catch((e: unknown) => {
                              setStatus("");
                              setError(e instanceof Error ? e.message : String(e));
                            });
                        }}
                      >
                        Fetch now
                      </button>
                    </div>
                  </>
                )}
              </Repeater>
            </>
          )}

          {section === "Coding profiles" && (
            <Repeater
              label="Profiles"
              addLabel="Add profile"
              items={data.codingProfiles}
              empty={EMPTY_PROFILE}
              onChange={(codingProfiles) => patch({ codingProfiles })}
              title={(item) => item.name}
            >
              {(item, update) => (
                <>
                  <div className="a-grid">
                    <Text
                      label="Platform"
                      value={item.name}
                      onChange={(name) => update({ name })}
                      placeholder="TakeUForward"
                    />
                    <Text
                      label="Handle"
                      value={item.handle}
                      onChange={(handle) => update({ handle })}
                      placeholder="aryan00047"
                    />
                  </div>
                  <Text
                    label="Profile URL"
                    value={item.url}
                    onChange={(url) => update({ url })}
                    placeholder="https://…"
                  />
                  <div className="a-grid">
                    <Text
                      label="Headline stat"
                      value={item.stat}
                      onChange={(stat) => update({ stat })}
                      placeholder="412"
                      hint="Big number on the card. Leave blank to show just the link."
                    />
                    <Text
                      label="Stat caption"
                      value={item.note}
                      onChange={(note) => update({ note })}
                      placeholder="problems solved"
                    />
                  </div>
                </>
              )}
            </Repeater>
          )}

          {section === "Skills" && (
            <Repeater
              label="Groups"
              addLabel="Add group"
              items={data.skills}
              empty={EMPTY_SKILL_GROUP}
              onChange={(skills) => patch({ skills })}
              title={(item) => item.label}
            >
              {(item, update) => (
                <>
                  <Text
                    label="Group label"
                    value={item.label}
                    onChange={(label) => update({ label })}
                    placeholder="Frontend"
                  />
                  <Tags
                    label="Skills"
                    value={item.items}
                    onChange={(items) => update({ items })}
                  />
                </>
              )}
            </Repeater>
          )}

          {section === "Projects" && (
            <Repeater
              label="Projects"
              addLabel="Add project"
              items={data.projects}
              empty={EMPTY_PROJECT}
              onChange={(projects) => patch({ projects })}
              title={(item) => item.title}
            >
              {(item, update) => (
                <>
                  <Toggle
                    label="Featured — gets the large layout with the live preview"
                    value={item.featured}
                    onChange={(featured) => update({ featured })}
                  />
                  <div className="a-grid">
                    <Text
                      label="Title"
                      value={item.title}
                      onChange={(title) => update({ title })}
                    />
                    <Text
                      label="Eyebrow"
                      value={item.eyebrow}
                      onChange={(eyebrow) => update({ eyebrow })}
                      placeholder="Flagship · Live"
                    />
                  </div>
                  <Area
                    label="Description"
                    value={item.description}
                    rows={4}
                    onChange={(description) => update({ description })}
                  />
                  <Tags label="Tech tags" value={item.tags} onChange={(tags) => update({ tags })} />
                  <div className="a-grid">
                    <Text
                      label="Live URL"
                      value={item.liveUrl}
                      onChange={(liveUrl) => update({ liveUrl })}
                    />
                    <Text
                      label="Case study URL"
                      value={item.caseStudyUrl}
                      onChange={(caseStudyUrl) => update({ caseStudyUrl })}
                      hint="Optional. Becomes the primary button when set."
                    />
                  </div>
                  <Repeater
                    label="Story beats (featured project only)"
                    addLabel="Add beat"
                    items={item.beats}
                    empty={EMPTY_BEAT}
                    onChange={(beats) => update({ beats })}
                    title={(beat) => `${beat.num} ${beat.title}`.trim()}
                  >
                    {(beat, updateBeat) => (
                      <>
                        <div className="a-grid">
                          <Text
                            label="Number"
                            value={beat.num}
                            onChange={(num) => updateBeat({ num })}
                            placeholder="01"
                          />
                          <Text
                            label="Title"
                            value={beat.title}
                            onChange={(title) => updateBeat({ title })}
                          />
                        </div>
                        <Area
                          label="Body"
                          value={beat.body}
                          rows={4}
                          onChange={(body) => updateBeat({ body })}
                        />
                      </>
                    )}
                  </Repeater>
                </>
              )}
            </Repeater>
          )}

          {section === "Experience" && (
            <Repeater
              label="Roles"
              addLabel="Add role"
              items={data.experience}
              empty={EMPTY_EXPERIENCE}
              onChange={(experience) => patch({ experience })}
              title={(item) => item.org}
            >
              {(item, update) => (
                <>
                  <div className="a-grid">
                    <Text label="Company" value={item.org} onChange={(org) => update({ org })} />
                    <Text
                      label="Company URL"
                      value={item.orgUrl}
                      onChange={(orgUrl) => update({ orgUrl })}
                    />
                    <Text label="Role" value={item.role} onChange={(role) => update({ role })} />
                    <Text
                      label="Location"
                      value={item.location}
                      onChange={(location) => update({ location })}
                    />
                    <Text
                      label="Start"
                      value={item.start}
                      onChange={(start) => update({ start })}
                      placeholder="Aug 2023"
                    />
                    <Text
                      label="End"
                      value={item.end}
                      onChange={(end) => update({ end })}
                      placeholder="Present"
                    />
                  </div>
                  <Text
                    label="Client / project line"
                    value={item.client}
                    onChange={(client) => update({ client })}
                  />
                  <Repeater
                    label="Achievements"
                    addLabel="Add achievement"
                    items={item.bullets}
                    empty={EMPTY_BULLET}
                    onChange={(bullets) => update({ bullets })}
                    title={(bullet) => `${bullet.metric} — ${bullet.text.slice(0, 48)}`}
                  >
                    {(bullet, updateBullet) => (
                      <>
                        <Text
                          label="Metric"
                          value={bullet.metric}
                          onChange={(metric) => updateBullet({ metric })}
                          placeholder="15+"
                          hint="The purple number on the left. Keep it short."
                        />
                        <Area
                          label="Achievement"
                          value={bullet.text}
                          rows={3}
                          onChange={(text) => updateBullet({ text })}
                        />
                      </>
                    )}
                  </Repeater>
                </>
              )}
            </Repeater>
          )}

          {section === "Education" && (
            <Repeater
              label="Education"
              addLabel="Add education"
              items={data.education}
              empty={EMPTY_EDUCATION}
              onChange={(education) => patch({ education })}
              title={(item) => item.org}
            >
              {(item, update) => (
                <>
                  <div className="a-grid">
                    <Text
                      label="Institution"
                      value={item.org}
                      onChange={(org) => update({ org })}
                    />
                    <Text
                      label="Institution URL"
                      value={item.orgUrl}
                      onChange={(orgUrl) => update({ orgUrl })}
                    />
                    <Text
                      label="Start"
                      value={item.start}
                      onChange={(start) => update({ start })}
                    />
                    <Text label="End" value={item.end} onChange={(end) => update({ end })} />
                    <Text
                      label="Location"
                      value={item.location}
                      onChange={(location) => update({ location })}
                    />
                    <Text
                      label="Result"
                      value={item.detail}
                      onChange={(detail) => update({ detail })}
                      placeholder="9.89 CGPA"
                    />
                  </div>
                  <Text
                    label="Degree"
                    value={item.degree}
                    onChange={(degree) => update({ degree })}
                  />
                </>
              )}
            </Repeater>
          )}

          {section === "Certifications" && (
            <Repeater
              label="Certifications"
              addLabel="Add certification"
              items={data.certifications}
              empty={EMPTY_CERTIFICATION}
              onChange={(certifications) => patch({ certifications })}
              title={(item) => item.name}
            >
              {(item, update) => (
                <>
                  <div className="a-grid">
                    <Text label="Name" value={item.name} onChange={(name) => update({ name })} />
                    <Text
                      label="Issuer"
                      value={item.issuer}
                      onChange={(issuer) => update({ issuer })}
                    />
                    <DateField
                      label="Issued"
                      value={item.issued}
                      onChange={(issued) => update({ issued })}
                    />
                    <Text
                      label="Credential ID"
                      value={item.credentialId}
                      onChange={(credentialId) => update({ credentialId })}
                      hint="Leave blank to hide it."
                    />
                  </div>
                  <Text
                    label="Verify URL"
                    value={item.url}
                    onChange={(url) => update({ url })}
                    hint="Leave blank and the Verify link is hidden."
                  />
                </>
              )}
            </Repeater>
          )}

          {section === "Loader" && (
            <Repeater
              label="Boot lines"
              addLabel="Add line"
              items={data.bootLines}
              empty={{ text: "", tail: "" }}
              onChange={(bootLines) => patch({ bootLines })}
              title={(item) => item.text}
            >
              {(item, update) => (
                <div className="a-grid">
                  <Text label="Line" value={item.text} onChange={(text) => update({ text })} />
                  <Text
                    label="Right-hand value"
                    value={item.tail}
                    onChange={(tail) => update({ tail })}
                  />
                </div>
              )}
            </Repeater>
          )}
        </div>

        <footer className="a-foot">
          Changes are written to your working tree. Commit and push to publish them.
        </footer>
      </main>
    </div>
  );
};

export default AdminApp;
