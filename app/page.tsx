"use client";

import { FormEvent, useState } from "react";

const services = [
  { number: "01", title: "Maniküre & Naturnagelverstärkung", text: "Gesunde, stabile und natürlich schöne Nägel – mit einer sorgfältigen Maniküre und sanfter Verstärkung." },
  { number: "02", title: "Gelmodellage", text: "Perfekt geformte Nägel und ein dauerhaft gepflegter Look, individuell auf deine Wünsche abgestimmt." },
  { number: "03", title: "Pediküre", text: "Wohltuende Fußpflege für ein rundum gepflegtes Gefühl – auf Wunsch mit langanhaltendem CND Shellac." },
  { number: "04", title: "Wimpernverlängerung", text: "Volle, lange und perfekt geschwungene Wimpern für einen ausdrucksstarken Blick – jeden Tag." },
  { number: "05", title: "Wimpernlifting", text: "Ein natürlicher, offener Blick durch sanftes Formen deiner eigenen Wimpern – ganz ohne Extensions." },
];

const values = [
  ["Sorgfalt", "Jede Behandlung wird mit Ruhe, Präzision und viel Liebe zum Detail ausgeführt."],
  ["Qualität", "Hochwertige Produkte und saubere Arbeit bilden die Basis für schöne Ergebnisse."],
  ["Wohlgefühl", "Deine Auszeit soll sich vom ersten Moment an besonders und entspannt anfühlen."],
];

export default function Home() {
  const [sent, setSent] = useState(false);

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
          <p className="hero-lead">Dein Ort für Schönheit, Entspannung und Selfcare – mit sorgfältigen Behandlungen, hochwertigen Produkten und ganz viel Liebe zum Detail.</p>
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

      <section className="intro section-pad">
        <div>
          <p className="eyebrow">Willkommen bei Snowthy Beauty</p>
          <h2>Kleine Details.<br /><em>Große Wirkung.</em></h2>
        </div>
        <div className="intro-copy">
          <p>Gönn dir eine Auszeit vom Alltag und genieße entspannte Momente in einer angenehmen Atmosphäre. Bei Snowthy Beauty dreht sich alles um gepflegte Nägel, wunderschöne Wimpern und dein persönliches Wohlbefinden.</p>
          <p>Gemeinsam finden wir den Look, der zu dir passt – von natürlicher Eleganz bis zu deinem ganz individuellen Stil.</p>
          <span className="signature">Für dein schönstes Ich</span>
        </div>
      </section>

      <section className="services section-pad" id="leistungen">
        <div className="section-heading">
          <p className="eyebrow light">Meine Leistungen</p>
          <h2>Schönheit, die sich<br /><em>nach dir anfühlt.</em></h2>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <article className="service" key={service.number}>
              <span>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a href="#termin" aria-label={`${service.title} anfragen`}>↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="studio section-pad" id="studio">
        <div className="studio-art" aria-hidden="true">
          <div className="studio-frame"><span>SB</span></div>
          <p>Ruhe · Qualität · Du</p>
        </div>
        <div className="studio-copy">
          <p className="eyebrow">Unser Studio</p>
          <h2>Ein Ort zum<br /><em>Ankommen.</em></h2>
          <p>In meinem liebevoll eingerichteten Studio erwartet dich eine entspannte Atmosphäre, in der du den Alltag hinter dir lassen kannst. Hygiene, Qualität und deine Zufriedenheit stehen bei jeder Behandlung an erster Stelle.</p>
          <div className="values">
            {values.map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="prices section-pad" id="preise">
        <div>
          <p className="eyebrow">Preise & Behandlungen</p>
          <h2>Transparent.<br /><em>Persönlich. Schön.</em></h2>
        </div>
        <div className="price-note">
          <p>Jede Behandlung wird auf deine Wünsche abgestimmt. Die genaue Leistung und den Preis besprechen wir vor deinem Termin ganz transparent.</p>
          <a className="button button-outline" href="#termin">Preise anfragen</a>
        </div>
      </section>

      <section className="booking section-pad" id="termin">
        <div className="booking-copy">
          <p className="eyebrow light">Termin buchen</p>
          <h2>Zeit für dich<br /><em>beginnt hier.</em></h2>
          <p>Schick mir deine Wünsche und deinen bevorzugten Zeitraum. Ich melde mich persönlich bei dir, um deinen Termin abzustimmen.</p>
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
        <div><a href="#leistungen">Leistungen</a><a href="#studio">Studio</a><a href="#preise">Preise</a><a href="#termin">Termin</a></div>
        <p>© 2026 Snowthy Beauty<br />Maniküre · Wimpern · Pediküre</p>
      </footer>
    </main>
  );
}
