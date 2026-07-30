"use client";

import { FormEvent, useState } from "react";

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

      <section className="intro section-pad">
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

      <section className="gallery" id="galerie">
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

      <section className="studio section-pad" id="studio">
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

      <section className="prices section-pad" id="preise">
        <div>
          <p className="eyebrow">Preise & Behandlungen</p>
          <h2>Transparent.<br /><em>Persönlich. Schön.</em></h2>
        </div>
        <div className="price-note">
          <p>Transparente Preise und hochwertige Leistungen – hier findest du eine Übersicht aller Behandlungen und Preise.</p>
          <a className="button button-outline" href="#termin">Preise anfragen</a>
        </div>
      </section>

      <section className="booking section-pad" id="termin">
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
    </main>
  );
}
