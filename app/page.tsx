"use client";

import { FormEvent, useEffect, useState } from "react";
import { defaultSiteContent, normalizeSiteContent, type SiteContent } from "@/lib/site-content";

const values = [
  ["Sorgfalt", "Jede Behandlung wird mit Ruhe, Präzision und viel Liebe zum Detail ausgeführt."],
  ["Qualität", "Hochwertige Produkte und saubere Arbeit bilden die Basis für schöne Ergebnisse."],
  ["Wohlgefühl", "Deine Auszeit soll sich vom ersten Moment an besonders und entspannt anfühlen."],
];

function hexToHsl(hex: string) {
  const value = hex.replace("#", "");
  const red = parseInt(value.slice(0, 2), 16) / 255;
  const green = parseInt(value.slice(2, 4), 16) / 255;
  const blue = parseInt(value.slice(4, 6), 16) / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;
  const delta = max - min;
  let hue = 0;

  if (delta !== 0) {
    if (max === red) hue = ((green - blue) / delta) % 6;
    else if (max === green) hue = (blue - red) / delta + 2;
    else hue = (red - green) / delta + 4;
    hue = Math.round(hue * 60);
    if (hue < 0) hue += 360;
  }

  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
  return { hue, saturation: Math.round(saturation * 100) };
}

function customPalette(primary: string) {
  const { hue, saturation } = hexToHsl(primary);
  const mutedSaturation = Math.max(8, Math.min(24, Math.round(saturation * 0.38)));
  const darkSaturation = Math.max(8, Math.min(38, Math.round(saturation * 0.72)));
  return {
    cream: `hsl(${hue} ${Math.max(8, Math.min(28, Math.round(saturation * 0.3)))}% 93%)`,
    taupe: `hsl(${hue} ${mutedSaturation}% 55%)`,
    rose: primary,
    slate: `hsl(${hue} ${darkSaturation}% 20%)`,
    paper: `hsl(${hue} ${Math.max(6, Math.min(22, Math.round(saturation * 0.22)))}% 98%)`,
  };
}

export default function Home() {
  const [sent, setSent] = useState(false);
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    fetch("/api/site-content", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((value) => { if (value) setContent(normalizeSiteContent(value)); })
      .catch(() => undefined);

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

  useEffect(() => {
    const root = document.documentElement;
    if (content.colorTheme !== "custom") {
      ["--cream", "--taupe", "--rose", "--slate", "--paper", "--ink", "--cocoa", "--gold"].forEach((property) => root.style.removeProperty(property));
      root.dataset.theme = content.colorTheme;
      return;
    }
    const generated = customPalette(content.primaryColor);
    root.dataset.theme = "custom";
    root.style.setProperty("--cream", generated.cream);
    root.style.setProperty("--taupe", generated.taupe);
    root.style.setProperty("--rose", generated.rose);
    root.style.setProperty("--slate", generated.slate);
    root.style.setProperty("--paper", generated.paper);
    root.style.setProperty("--ink", generated.slate);
    root.style.setProperty("--cocoa", generated.slate);
    root.style.setProperty("--gold", generated.rose);
  }, [content.colorTheme, content.primaryColor]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  const services = content.services.map((service, index) => ({ ...service, number: String(index + 1).padStart(2, "0") }));

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
          <p className="eyebrow">{content.heroEyebrow}</p>
          <h1>{content.heroTitle}<br /><em>{content.heroAccent}</em></h1>
          <p className="hero-lead">{content.heroLead}</p>
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
          <p className="eyebrow">{content.introEyebrow}</p>
          <h2>{content.introTitle}<br /><em>{content.introAccent}</em></h2>
        </div>
        <div className="intro-copy">
          {content.introParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          <span className="signature">Für dein schönstes Ich</span>
        </div>
      </section>

      <section className="services section-pad reveal" id="leistungen" data-reveal>
        <div className="section-heading">
          <p className="eyebrow light">{content.servicesEyebrow}</p>
          <h2>{content.servicesTitle}<br /><em>{content.servicesAccent}</em></h2>
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
          <p className="eyebrow">{content.studioEyebrow}</p>
          <h2>{content.studioTitle}<br /><em>{content.studioAccent}</em></h2>
          <p>{content.studioText}</p>
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
          <p className="eyebrow light">{content.bookingEyebrow}</p>
          <h2>{content.bookingTitle}<br /><em>{content.bookingAccent}</em></h2>
          <p>{content.bookingText}</p>
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

    </main>
  );
}
