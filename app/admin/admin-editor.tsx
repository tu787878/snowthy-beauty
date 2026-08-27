"use client";

import { FormEvent, useEffect, useState } from "react";
import { colorPresets, defaultSiteContent, normalizeSiteContent, type SiteContent } from "@/lib/site-content";

export default function AdminEditor({ initiallyAuthenticated }: { initiallyAuthenticated: boolean }) {
  const [authenticated, setAuthenticated] = useState(initiallyAuthenticated);
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!authenticated) return;
    fetch("/api/site-content", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Inhalte konnten nicht geladen werden.");
        setContent(normalizeSiteContent(await response.json()));
      })
      .catch((error) => setMessage(error.message));
  }, [authenticated]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: data.get("username"), password: data.get("password") }),
    });
    const result = await response.json() as { error?: string };
    setBusy(false);
    if (!response.ok) return setMessage(result.error || "Anmeldung fehlgeschlagen.");
    setAuthenticated(true);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/site-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    const result = await response.json() as SiteContent & { error?: string };
    setBusy(false);
    if (response.status === 401) {
      setAuthenticated(false);
      return setMessage("Deine Sitzung ist abgelaufen. Bitte erneut anmelden.");
    }
    if (!response.ok) return setMessage(result.error || "Speichern fehlgeschlagen.");
    setContent(normalizeSiteContent(result));
    setMessage("Gespeichert. Die Änderungen sind jetzt auf der Website sichtbar.");
  }

  function field(key: keyof SiteContent, value: string) {
    setContent((current) => ({ ...current, [key]: value }));
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setMessage("");
  }

  if (!authenticated) {
    return <main className="admin-shell admin-login">
      <form className="admin-card" onSubmit={login}>
        <img src="/snowthy-logo.png" alt="Snowthy Beauty" />
        <p className="admin-kicker">Geschützter Bereich</p>
        <h1>Website bearbeiten</h1>
        <label>Benutzername<input name="username" autoComplete="username" required /></label>
        <label>Passwort<input name="password" type="password" autoComplete="current-password" required /></label>
        <button className="admin-primary" disabled={busy}>{busy ? "Anmelden …" : "Anmelden"}</button>
        {message && <p className="admin-message admin-error" role="alert">{message}</p>}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/">← Zur Website</a>
      </form>
    </main>;
  }

  const textFields: Array<[keyof SiteContent, string]> = [
    ["heroEyebrow", "Kleine Zeile"], ["heroTitle", "Hauptüberschrift"], ["heroAccent", "Schriftzug"], ["heroLead", "Unterzeile"],
    ["introEyebrow", "Kleine Zeile"], ["introTitle", "Überschrift"], ["introAccent", "Schriftzug"],
    ["servicesEyebrow", "Kleine Zeile"], ["servicesTitle", "Überschrift"], ["servicesAccent", "Schriftzug"],
    ["studioEyebrow", "Kleine Zeile"], ["studioTitle", "Überschrift"], ["studioAccent", "Schriftzug"],
    ["bookingEyebrow", "Kleine Zeile"], ["bookingTitle", "Überschrift"], ["bookingAccent", "Schriftzug"],
  ];
  const groups = [
    ["Startbereich", textFields.slice(0, 4)], ["Willkommen", textFields.slice(4, 7)], ["Leistungen", textFields.slice(7, 10)],
    ["Studio", textFields.slice(10, 13)], ["Termin", textFields.slice(13, 16)],
  ] as const;

  return <main className="admin-shell">
    <header className="admin-header">
      <div><p className="admin-kicker">Snowthy Beauty</p><h1>Website bearbeiten</h1></div>
      <div><a className="admin-secondary" href="/" target="_blank">Website ansehen ↗</a><button className="admin-secondary" onClick={logout}>Abmelden</button></div>
    </header>
    <form className="admin-editor" onSubmit={save}>
      <section className="admin-card admin-color">
        <div className="palette-panel-heading"><p className="admin-kicker">Design</p><span>Farbwelt auswählen</span><p>Wähle eine Farbwelt oder erstelle automatisch eine passende Palette aus deiner Lieblingsfarbe.</p></div>
        <div className="admin-palette-list" role="radiogroup" aria-label="Farbwelt auswählen">
          <label className={`custom-color${content.colorTheme === "custom" ? " is-active" : ""}`}>
            <span className="custom-color-preview" style={{ background: content.primaryColor }}>
              <input type="color" value={content.primaryColor} onChange={(event) => setContent((current) => ({ ...current, colorTheme: "custom", primaryColor: event.target.value.toUpperCase() }))} aria-label="Eigene Primärfarbe auswählen" />
            </span>
            <span><strong>Eigene Primärfarbe</strong><small>Palette wird automatisch erzeugt</small></span>
            <code>{content.primaryColor}</code>
          </label>
          {colorPresets.map((preset) => <button
            type="button"
            role="radio"
            aria-checked={content.colorTheme === preset.id}
            className={`palette-option${content.colorTheme === preset.id ? " is-active" : ""}`}
            key={preset.name}
            onClick={() => setContent((current) => ({ ...current, colorTheme: preset.id, primaryColor: preset.primary }))}
          >
            <span className="palette-swatches" aria-hidden="true">{preset.colors.map((color) => <i key={color} style={{ background: color }} />)}</span>
            <span><strong>{preset.name}</strong><small>{preset.note}</small></span>
            <em aria-hidden="true">{content.colorTheme === preset.id ? "✓" : ""}</em>
          </button>)}
        </div>
      </section>
      {groups.map(([title, fields]) => <section className="admin-card" key={title}>
        <p className="admin-kicker">Seitentext</p><h2>{title}</h2>
        <div className="admin-grid">{fields.map(([key, label]) => <label key={key}>{label}<input value={String(content[key])} onChange={(event) => field(key, event.target.value)} /></label>)}</div>
        {title === "Willkommen" && content.introParagraphs.map((paragraph, index) => <label key={index}>Absatz {index + 1}<textarea rows={4} value={paragraph} onChange={(event) => setContent((current) => ({ ...current, introParagraphs: current.introParagraphs.map((item, itemIndex) => itemIndex === index ? event.target.value : item) }))} /></label>)}
        {title === "Studio" && <label>Beschreibung<textarea rows={5} value={content.studioText} onChange={(event) => field("studioText", event.target.value)} /></label>}
        {title === "Termin" && <>
          <label>Beschreibung<textarea rows={4} value={content.bookingText} onChange={(event) => field("bookingText", event.target.value)} /></label>
          <div className="admin-grid"><label>Planity-Buchungslink<input type="url" value={content.bookingUrl} onChange={(event) => field("bookingUrl", event.target.value)} /></label><label>Adresse<input value={content.address} onChange={(event) => field("address", event.target.value)} /></label></div>
          <h3 className="admin-subheading">Öffnungszeiten</h3>
          <div className="admin-hours">{content.openingHours.map((entry, index) => <div key={index}><label>Tag<input value={entry.day} onChange={(event) => setContent((current) => ({ ...current, openingHours: current.openingHours.map((item, itemIndex) => itemIndex === index ? { ...item, day: event.target.value } : item) }))} /></label><label>Zeit oder „Geschlossen“<input value={entry.hours} onChange={(event) => setContent((current) => ({ ...current, openingHours: current.openingHours.map((item, itemIndex) => itemIndex === index ? { ...item, hours: event.target.value } : item) }))} /></label></div>)}</div>
        </>}
      </section>)}
      <section className="admin-card">
        <p className="admin-kicker">Angebot</p><h2>Leistungen</h2>
        {content.services.map((service, index) => <fieldset key={index}><legend>{String(index + 1).padStart(2, "0")}</legend><label>Titel<input value={service.title} onChange={(event) => setContent((current) => ({ ...current, services: current.services.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item) }))} /></label><label>Beschreibung<textarea rows={3} value={service.text} onChange={(event) => setContent((current) => ({ ...current, services: current.services.map((item, itemIndex) => itemIndex === index ? { ...item, text: event.target.value } : item) }))} /></label></fieldset>)}
      </section>
      <div className="admin-savebar"><p className={message.includes("Gespeichert") ? "admin-message" : "admin-message admin-error"}>{message}</p><button className="admin-primary" disabled={busy}>{busy ? "Speichern …" : "Änderungen speichern"}</button></div>
    </form>
  </main>;
}
