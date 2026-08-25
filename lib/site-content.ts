export type EditableService = {
  title: string;
  text: string;
};

export type SiteContent = {
  colorTheme: string;
  primaryColor: string;
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroLead: string;
  introEyebrow: string;
  introTitle: string;
  introAccent: string;
  introParagraphs: string[];
  servicesEyebrow: string;
  servicesTitle: string;
  servicesAccent: string;
  services: EditableService[];
  studioEyebrow: string;
  studioTitle: string;
  studioAccent: string;
  studioText: string;
  bookingEyebrow: string;
  bookingTitle: string;
  bookingAccent: string;
  bookingText: string;
};

export const colorPresets = [
  { id: "interior", name: "Interior Blush", note: "Farben aus dem Referenzfoto", primary: "#B38F88", colors: ["#E9E3DF", "#9A918C", "#B38F88", "#444348"] },
  { id: "luxe", name: "Black Gold Rose", note: "Schwarz, Weiß, Gold & Rosa", primary: "#D8A7B1", colors: ["#FAFAF7", "#C8A35D", "#D8A7B1", "#111111"] },
  { id: "champagne", name: "Champagne Nude", note: "Warm, elegant & natürlich", primary: "#D7B9A3", colors: ["#F5EFE8", "#A79382", "#D7B9A3", "#4A3C35"] },
  { id: "berry", name: "Berry Rose", note: "Feminin, modern & ausdrucksstark", primary: "#C79AA8", colors: ["#F7EAEE", "#A87483", "#C79AA8", "#4A2834"] },
  { id: "sage", name: "Sage Spa", note: "Ruhig, clean & entspannend", primary: "#9BA58F", colors: ["#F1F0EA", "#9BA58F", "#D7B5AA", "#3C4B43"] },
  { id: "mocha", name: "Mocha Gloss", note: "Cremig, warm & luxuriös", primary: "#C58D7B", colors: ["#F5EDE4", "#B49A88", "#C58D7B", "#49362F"] },
  { id: "lavender", name: "Lavender Pearl", note: "Zart, elegant & besonders", primary: "#C6AFCB", colors: ["#F4F0F6", "#9B91A4", "#C6AFCB", "#403747"] },
  { id: "coral", name: "Coral Clay", note: "Frisch, freundlich & modern", primary: "#DE947E", colors: ["#FFF0EA", "#B48676", "#DE947E", "#53352E"] },
  { id: "ice", name: "Ice Blue", note: "Klar, edel & minimalistisch", primary: "#ADC8D0", colors: ["#EEF4F6", "#8399A1", "#ADC8D0", "#2D4148"] },
] as const;

export const defaultSiteContent: SiteContent = {
  colorTheme: "interior",
  primaryColor: "#B38F88",
  heroEyebrow: "Maniküre · Wimpern · Pediküre",
  heroTitle: "Deine Auszeit.",
  heroAccent: "Deine Schönheit.",
  heroLead: "Dein Ort für Schönheit, Entspannung & Selfcare",
  introEyebrow: "Willkommen bei Snowthy Beauty",
  introTitle: "Kleine Details.",
  introAccent: "Große Wirkung.",
  introParagraphs: [
    "Gönn dir eine Auszeit vom Alltag und genieße entspannte Momente in einer angenehmen Atmosphäre. Bei Snowthy Beauty dreht sich alles um gepflegte Nägel, wunderschöne Wimpern und dein persönliches Wohlbefinden.",
    "Mit viel Liebe zum Detail, hochwertigen Produkten und sorgfältiger Arbeit sorge ich dafür, dass deine Hände, Füße und Wimpern perfekt in Szene gesetzt werden. Ob natürliche Eleganz oder ein individueller Look – gemeinsam finden wir das Ergebnis, das zu dir passt.",
    "Mein Ziel ist es, dass du mein Studio mit einem Lächeln verlässt und dich rundum gepflegt und selbstbewusst fühlst. Denn manchmal sind es die kleinen Details, die den größten Unterschied machen.",
  ],
  servicesEyebrow: "Meine Leistungen",
  servicesTitle: "Schönheit, die sich",
  servicesAccent: "nach dir anfühlt.",
  services: [
    { title: "Maniküre & Naturnagelverstärkung", text: "Schöne, gepflegte Hände sind deine Visitenkarte. Mit einer professionellen Maniküre und einer Naturnagelverstärkung sorge ich für gesunde, stabile und natürlich schöne Nägel." },
    { title: "Gelmodellage", text: "Ob brüchige Nägel, Nagelbeißer oder der Wunsch nach perfekt geformten Nägeln – eine Gelmodellage verleiht deinen Händen ein dauerhaft gepflegtes Aussehen." },
    { title: "Pediküre", text: "Gepflegte Füße gehören zu einem rundum gepflegten Erscheinungsbild. Genieße eine wohltuende Fußpflege und wähle auf Wunsch einen langanhaltenden Farblack mit CND Shellac." },
    { title: "Wimpernverlängerung", text: "Ein ausdrucksstarker Blick – jeden Tag. Mit einer professionellen Wimpernverlängerung erhältst du volle, lange und perfekt geschwungene Wimpern." },
    { title: "Wimpernlifting", text: "Du bevorzugst einen natürlichen Look? Ein Wimpernlifting hebt und formt deine eigenen Wimpern und sorgt für einen offenen, strahlenden Blick – ganz ohne künstliche Wimpern." },
  ],
  studioEyebrow: "Unser Studio",
  studioTitle: "Ein Ort zum",
  studioAccent: "Ankommen.",
  studioText: "In meinem liebevoll eingerichteten Studio erwartet dich eine entspannte Atmosphäre, in der du den Alltag hinter dir lassen kannst. Hygiene, Qualität und deine Zufriedenheit stehen bei jeder Behandlung an erster Stelle. Dein Wohlbefinden liegt mir besonders am Herzen – denn jede Auszeit sollte etwas Besonderes sein.",
  bookingEyebrow: "Termin buchen",
  bookingTitle: "Zeit für dich",
  bookingAccent: "beginnt hier.",
  bookingText: "Du möchtest dir eine Auszeit gönnen? Buche deinen Wunschtermin ganz einfach und freue dich auf entspannte Momente sowie professionelle Beauty-Behandlungen.",
};

export function normalizeSiteContent(value: unknown): SiteContent {
  if (!value || typeof value !== "object") return defaultSiteContent;
  const candidate = value as Partial<SiteContent>;
  return {
    ...defaultSiteContent,
    ...candidate,
    colorTheme: candidate.colorTheme === "custom" || colorPresets.some((preset) => preset.id === candidate.colorTheme) ? candidate.colorTheme! : defaultSiteContent.colorTheme,
    primaryColor: /^#[0-9A-Fa-f]{6}$/.test(candidate.primaryColor ?? "") ? candidate.primaryColor! : defaultSiteContent.primaryColor,
    introParagraphs: Array.isArray(candidate.introParagraphs) ? candidate.introParagraphs.slice(0, 3).map(String) : defaultSiteContent.introParagraphs,
    services: Array.isArray(candidate.services) && candidate.services.length === 5
      ? candidate.services.map((service, index) => ({
          title: String(service?.title ?? defaultSiteContent.services[index].title),
          text: String(service?.text ?? defaultSiteContent.services[index].text),
        }))
      : defaultSiteContent.services,
  };
}
