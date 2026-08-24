import { useMemo, useRef, useState } from "react";
import {
  Music2,
  Utensils,
  Sparkles,
  MapPin,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "./components/LanguageContext";
import {
  HighlightGrid,
  HighlightLightbox,
  type GridItem,
  type OpenHighlight,
} from "./components/HighlightGrid";
import { stateGuides } from "./data/exploreContent";

type CultureState = "India" | "Rajasthan" | "Assam" | "Tripura";

const REGIONS: CultureState[] = ["India", "Rajasthan", "Assam", "Tripura"];

const THEME: Record<CultureState, { accent: string; soft: string; title: string; intro: string }> = {
  India: {
    accent: "#c95b25",
    soft: "#f5dfc5",
    title: "India’s Cultural Tapestry",
    intro:
      "Traditions, food, festivals, art and stories — gathered from every region we currently guide.",
  },
  Rajasthan: {
    accent: "#c95b25",
    soft: "#f5dfc5",
    title: "The Land of Kings",
    intro:
      "Royal forts, desert artistry, colourful textiles and the warmest hospitality in the country.",
  },
  Assam: {
    accent: "#55783b",
    soft: "#dfead4",
    title: "The Land of Tea & Rivers",
    intro:
      "Bihu, tea gardens, river islands and a heritage shaped by the Brahmaputra.",
  },
  Tripura: {
    accent: "#76508b",
    soft: "#e8dcef",
    title: "The Jewel of the Northeast",
    intro:
      "Royal palaces, rock-cut hills, bamboo craft and the living heritage of many communities.",
  },
};

/** The four galleries on this page, in the order they're rendered. */
const SECTIONS = [
  {
    id: "places",
    key: "places",
    icon: MapPin,
    label: "Must-Visit Places",
    copy: "Forts, temples, islands and parks worth building a trip around.",
    eyebrow: "Where to go",
  },
  {
    id: "culture",
    key: "culture",
    icon: Music2,
    label: "Culture & Arts",
    copy: "Dance, music, weaving, pottery and painting that still shape daily life.",
    eyebrow: "Living traditions",
  },
  {
    id: "traditions",
    key: "traditions",
    icon: Sparkles,
    label: "Festivals & Traditions",
    copy: "The fairs, festivals and customs that mark the year.",
    eyebrow: "Through the year",
  },
  {
    id: "food",
    key: "food",
    icon: Utensils,
    label: "Food & Cuisine",
    copy: "Signature plates, street food and the sweets worth queuing for.",
    eyebrow: "What to eat",
  },
] as const;

const GUIDED_STATES = ["Rajasthan", "Assam", "Tripura"] as const;

export default function CulturePage() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<CultureState>("India");
  const [lightbox, setLightbox] = useState<OpenHighlight | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const theme = THEME[selected];

  // For a single state the gallery is that state's own list. For India it's a
  // round-robin across every guided state, so no one region dominates the page
  // and each card can still find its own image folder via `state`.
  const gallery = useMemo(() => {
    const build = (key: (typeof SECTIONS)[number]["key"]): GridItem[] => {
      if (selected !== "India") return stateGuides[selected]?.[key] ?? [];
      const perState = GUIDED_STATES.map((name) =>
        (stateGuides[name]?.[key] ?? []).slice(0, 3).map((item) => ({ ...item, state: name })),
      );
      const merged: GridItem[] = [];
      for (let i = 0; i < 3; i++) {
        for (const list of perState) if (list[i]) merged.push(list[i]);
      }
      return merged;
    };
    return {
      places: build("places"),
      culture: build("culture"),
      traditions: build("traditions"),
      food: build("food"),
    };
  }, [selected]);

  const scrollTo = (id: string) =>
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="content">
      <section className="culture-page">
        <div className="culture-hero">
          <span className="eyebrow">BHARAT CONNECT • {t("CULTURE")}</span>
          <h1>{t("Explore India’s Culture")}</h1>
          <p>
            {t("Discover traditions, food, festivals, stories, arts and languages — one region at a time.")}
          </p>
        </div>

        <div className="region-pills">
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setSelected(region)}
              className={selected === region ? "active" : undefined}
              style={
                selected === region
                  ? { background: theme.accent, borderColor: theme.accent }
                  : undefined
              }
            >
              {t(region)}
            </button>
          ))}
        </div>

        <div
          className="culture-band"
          style={{ background: `linear-gradient(135deg, ${theme.soft}, #fffaf2 65%)` }}
        >
          <div className="eyebrow" style={{ color: theme.accent }}>
            <Sparkles size={15} />
            {selected === "India"
              ? t("A JOURNEY THROUGH INDIA")
              : `${t(selected.toUpperCase())} • ${t("CULTURAL GUIDE")}`}
          </div>
          <h2>{selected === "India" ? t(theme.title) : `${t(selected)} — ${t(theme.title)}`}</h2>
          <p>{t(theme.intro)}</p>
        </div>

        <div className="culture-index">
          {SECTIONS.map(({ id, key, icon: Icon, label, copy }) => (
            <button key={id} onClick={() => scrollTo(id)}>
              <span className="index-icon" style={{ background: theme.soft, color: theme.accent }}>
                <Icon size={20} strokeWidth={1.5} />
              </span>
              <span className="index-body">
                <strong>
                  {t(label)}
                  <em>{gallery[key].length}</em>
                </strong>
                <small>{t(copy)}</small>
              </span>
              <ChevronRight size={17} color={theme.accent} />
            </button>
          ))}
        </div>

        {SECTIONS.map(({ id, key, label, eyebrow }) => (
          <div
            key={id}
            className="culture-section"
            ref={(node) => {
              sectionRefs.current[id] = node;
            }}
          >
            <HighlightGrid
              items={gallery[key]}
              state={selected === "India" ? "Rajasthan" : selected}
              eyebrow={t(eyebrow)}
              heading={
                selected === "India"
                  ? `${t(label)} ${t("across India")}`
                  : `${t(label)} ${t("in")} ${t(selected)}`
              }
              onOpen={setLightbox}
            />
          </div>
        ))}

        <div className="culture-footer">
          <div>
            <div className="eyebrow" style={{ color: theme.accent }}>
              <MapPin size={16} /> {t("Want the full guide?")}
            </div>
            <p>
              {t("Open a state from Explore to meet its AI guide, plan a trip and see the full gallery.")}
            </p>
          </div>
          <button
            onClick={() => setSelected(selected === "India" ? "Rajasthan" : "India")}
            style={{ background: theme.accent, borderColor: theme.accent }}
          >
            {selected === "India" ? t("Start with Rajasthan") : t("See all of India")}
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {lightbox && <HighlightLightbox item={lightbox} onClose={() => setLightbox(null)} />}
    </main>
  );
}
