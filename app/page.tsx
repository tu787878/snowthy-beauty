"use client";

import { FormEvent, useEffect, useState } from "react";

const services = [
  { number: "01", title: "Maniküre & Naturnagelverstärkung", text: "Schöne, gepflegte Hände sind deine Visitenkarte. Mit einer professionellen Maniküre und einer Naturnagelverstärkung sorge ich für gesunde, stabile und natürlich schöne Nägel." },
  { number: "02", title: "Gelmodellage", text: "Ob brüchige Nägel, Nagelbeißer oder der Wunsch nach perfekt geformten Nägeln – eine Gelmodellage verleiht deinen Händen ein dauerhaft gepflegtes Aussehen." },
  { number: "03", title: "Pediküre", text: "Gepflegte Füße gehören zu einem rundum gepflegten Erscheinungsbild. Genieße eine wohltuende Fußpflege und wähle auf Wunsch einen langanhaltenden Farblack mit CND Shellac." },
  { number: "04", title: "Wimpernverlängerung", text: "Ein ausdrucksstarker Blick – jeden Tag. Mit einer professionellen Wimpernverlängerung erhältst du volle, lange und perfekt geschwungene Wimpern." },
  { number: "05", title: "Wimpernlifting", text: "Du bevorzugst einen natürlichen Look? Ein Wimpernlifting hebt und formt deine eigenen Wimpern und sorgt für einen offenen, strahlenden Blick – ganz ohne künstliche Wimpern." },
];

const values = [
  ["Sorgfalt", "Jede Behandlung wird mit Ruhe, Präzision und viel Liebe zum Detail ausgeführt."],
  ["Qualität", "Hochwertige Produkte und saubere Arbeit bilden die Basis für schöne Ergebnisse."],
  ["Wohlgefühl", "Deine Auszeit soll sich vom ersten Moment an besonders und entspannt anfühlen."],
];

const palettes = [
  { id: "interior", name: "Interior Blush", note: "Farben aus dem Referenzfoto", colors: ["#E9E3DF", "#9A918C", "#B38F88", "#444348"] },
  { id: "luxe", name: "Black Gold Rose", note: "Schwarz, Weiß, Gold & Rosa", colors: ["#FAFAF7", "#C8A35D", "#D8A7B1", "#111111"] },
  { id: "champagne", name: "Champagne Nude", note: "Warm, elegant & natürlich", colors: ["#F5EFE8", "#A79382", "#D7B9A3", "#4A3C35"] },
  { id: "berry", name: "Berry Rose", note: "Feminin, modern & ausdrucksstark", colors: ["#F7EAEE", "#A87483", "#C79AA8", "#4A2834"] },
  { id: "sage", name: "Sage Spa", note: "Ruhig, clean & entspannend", colors: ["#F1F0EA", "#9BA58F", "#D7B5AA", "#3C4B43"] },
] as const;

type PaletteId = (typeof palettes)[number]["id"];

export default function Home() {
  const [sent, setSent] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activePalette, setActivePalette] = useState<PaletteId>("interior");

  useEffect(() => {
    const savedPalette = window.localStorage.getItem("snowthy-palette") as PaletteId | null;
    const selectedPalette = palettes.some((palette) => palette.id === savedPalette) ? savedPalette! : "interior";
    setActivePalette(selectedPalette);
    document.documentElement.dataset.theme = selectedPalette;

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function choosePalette(palette: PaletteId) {
    setActivePalette(palette);
    document.documentElement.dataset.theme = palette;
    window.localStorage.setItem("snowthy-palette", palette);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Snowthy Beauty Startseite">
          <img src="/snowthy-logo.png" alt="Snowthy Beauty" />
        </a>
        <nav aria-label="Hauptnavigation">
          <a href="#leistungen">Leistungen</a>
          <a href="#studio">Studio</a>
          <a href="#preise">Preise</a>
        </nav>
        <a className="header-cta" href="#termin">Termin buchen</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Maniküre · Wimpern · Pediküre</p>
          <h1>Deine Auszeit.<br /><em>Deine Schönheit.</em></h1>
          <p className="hero-lead">Dein Ort für Schönheit, Entspannung & Selfcare</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#termin">Wunschtermin anfragen</a>
            <a className="text-link" href="#leistungen">Leistungen entdecken <span>↘</span></a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="arch">
            <span className="spark spark-one">✦</span>
            <span className="spark spark-two">✧</span>
            <div className="polish-bottle"><i /></div>
            <div className="hand-line" />
          </div>
          <p>Schönheit beginnt mit<br />einem Moment für dich.</p>
        </div>
        <div className="hero-note"><span>Scroll</span><i /></div>
      </section>

      <section className="intro section-pad reveal" data-reveal>
        <div>
          <p className="eyebrow">Willkommen bei Snowthy Beauty</p>
          <h2>Kleine Details.<br /><em>Große Wirkung.</em></h2>
        </div>
        <div className="intro-copy">
          <p>Gönn dir eine Auszeit vom Alltag und genieße entspannte Momente in einer angenehmen Atmosphäre. Bei Snowthy Beauty dreht sich alles um gepflegte Nägel, wunderschöne Wimpern und dein persönliches Wohlbefinden.</p>
          <p>Mit viel Liebe zum Detail, hochwertigen Produkten und sorgfältiger Arbeit sorge ich dafür, dass deine Hände, Füße und Wimpern perfekt in Szene gesetzt werden. Ob natürliche Eleganz oder ein individueller Look – gemeinsam finden wir das Ergebnis, das zu dir passt.</p>
          <p>Mein Ziel ist es, dass du mein Studio mit einem Lächeln verlässt und dich rundum gepflegt und selbstbewusst fühlst. Denn manchmal sind es die kleinen Details, die den größten Unterschied machen.</p>
          <span className="signature">Für dein schönstes Ich</span>
        </div>
      </section>

      <section className="services section-pad reveal" id="leistungen" data-reveal>
        <div className="section-heading">
          <p className="eyebrow light">Meine Leistungen</p>
          <h2>Schönheit, die sich<br /><em>nach dir anfühlt.</em></h2>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <article className="service" key={service.number} style={{ "--item-index": Number(service.number) - 1 } as React.CSSProperties}>
              <span>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a href="#termin" aria-label={`${service.title} anfragen`}>↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery reveal" id="galerie" data-reveal>
        <div className="gallery-heading">
          <div>
            <p className="eyebrow">Ausgewählte Arbeiten</p>
            <h2>Mit Liebe zum<br /><em>Detail.</em></h2>
          </div>
          <p>Lass dich von meinen bisherigen Arbeiten inspirieren und entdecke die Ergebnisse verschiedener Behandlungen.</p>
        </div>
        <figure>
          <img
            src="/snowthy-gallery.png"
            alt="Ausgewählte Nagelbehandlungen bei Snowthy Beauty: Lackierung, Naturnagel-Look und Gelmodellage"
          />
        </figure>
      </section>

      <section className="studio section-pad reveal" id="studio" data-reveal>
        <div className="studio-art" aria-hidden="true">
          <div className="studio-frame"><span>SB</span></div>
          <p>Ruhe · Qualität · Du</p>
        </div>
        <div className="studio-copy">
          <p className="eyebrow">Unser Studio</p>
          <h2>Ein Ort zum<br /><em>Ankommen.</em></h2>
          <p>In meinem liebevoll eingerichteten Studio erwartet dich eine entspannte Atmosphäre, in der du den Alltag hinter dir lassen kannst. Hygiene, Qualität und deine Zufriedenheit stehen bei jeder Behandlung an erster Stelle. Dein Wohlbefinden liegt mir besonders am Herzen – denn jede Auszeit sollte etwas Besonderes sein.</p>
          <div className="values">
            {values.map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="prices section-pad reveal" id="preise" data-reveal>
        <div>
          <p className="eyebrow">Preise & Behandlungen</p>
          <h2>Transparent.<br /><em>Persönlich. Schön.</em></h2>
        </div>
        <div className="price-note">
          <p>Transparente Preise und hochwertige Leistungen – hier findest du eine Übersicht aller Behandlungen und Preise.</p>
          <a className="button button-outline" href="#termin">Preise anfragen</a>
        </div>
      </section>

      <section className="booking section-pad reveal" id="termin" data-reveal>
        <div className="booking-copy">
          <p className="eyebrow light">Termin buchen</p>
          <h2>Zeit für dich<br /><em>beginnt hier.</em></h2>
          <p>Du möchtest dir eine Auszeit gönnen? Buche deinen Wunschtermin ganz einfach und freue dich auf entspannte Momente sowie professionelle Beauty-Behandlungen.</p>
        </div>
        <form onSubmit={submit}>
          <label>Name<input name="name" autoComplete="name" required placeholder="Dein Name" /></label>
          <label>Kontakt<input name="contact" required placeholder="Telefon oder E-Mail" /></label>
          <label>Wunschbehandlung<select name="service" defaultValue=""><option value="" disabled>Bitte auswählen</option>{services.map((s) => <option key={s.number}>{s.title}</option>)}</select></label>
          <label>Nachricht<textarea name="message" rows={3} placeholder="Wann passt es dir am besten?" /></label>
          <button className="button button-gold" type="submit">Anfrage vorbereiten</button>
          {sent && <p className="form-note" role="status">Danke! Deine Anfrage ist vorbereitet. Hinterlege noch deine Kontakt-E-Mail, um das Formular live zu versenden.</p>}
        </form>
      </section>

      <footer>
        <img src="/snowthy-logo.png" alt="Snowthy Beauty" />
        <div><a href="#leistungen">Leistungen</a><a href="#studio">Studio</a><a href="#preise">Preise</a><a href="#termin">Termin</a><a href="#impressum">Impressum</a></div>
        <p>© 2026 Snowthy Beauty<br />Maniküre · Wimpern · Pediküre</p>
      </footer>
      <section className="imprint" id="impressum">
        <h2>Impressum</h2>
        <p>Hier findest du alle rechtlichen Informationen sowie meine Kontaktdaten.</p>
      </section>

      <aside className={`palette-picker${paletteOpen ? " is-open" : ""}`} aria-label="Farbwelt auswählen">
        <button
          className="palette-toggle"
          type="button"
          aria-expanded={paletteOpen}
          aria-controls="palette-options"
          onClick={() => setPaletteOpen((open) => !open)}
        >
          <span className="palette-mini" aria-hidden="true">
            {palettes.find((palette) => palette.id === activePalette)?.colors.map((color) => <i key={color} style={{ background: color }} />)}
          </span>
          Farbwelt
          <b aria-hidden="true">{paletteOpen ? "×" : "+"}</b>
        </button>
        <div className="palette-panel" id="palette-options" role="radiogroup" aria-label="Verfügbare Farbwelten">
          <div className="palette-panel-heading">
            <span>Design ausprobieren</span>
            <p>Wähle eine Farbwelt. Deine Auswahl bleibt auf diesem Gerät gespeichert.</p>
          </div>
          {palettes.map((palette) => (
            <button
              type="button"
              role="radio"
              aria-checked={activePalette === palette.id}
              className={`palette-option${activePalette === palette.id ? " is-active" : ""}`}
              key={palette.id}
              onClick={() => choosePalette(palette.id)}
            >
              <span className="palette-swatches" aria-hidden="true">
                {palette.colors.map((color) => <i key={color} style={{ background: color }} />)}
              </span>
              <span><strong>{palette.name}</strong><small>{palette.note}</small></span>
              <em>{activePalette === palette.id ? "✓" : ""}</em>
            </button>
          ))}
        </div>
      </aside>
    </main>
  );
}
