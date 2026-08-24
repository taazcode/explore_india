import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BusFront,
  CalendarDays,
  CircleHelp,
  Compass,
  Crown,
  ExternalLink,
  Heart,
  Home,
  Languages,
  Loader2,
  Luggage,
  Map,
  MapPin,
  Menu,
  Music2,
  Navigation,
  Pause,
  Plane,
  Play,
  Search,
  Sparkles,
  Star,
  TrainFront,
  Trophy,
  User,
  Utensils,
  WalletCards,
  X,
} from "lucide-react";
import { drawPath, stateCodes } from "@/data/indiaPaths";
import { activeStates, type StateInfo } from "@/data/states";
import {
  estimateBudget,
  formatRupees,
  stateGuides,
} from "@/data/exploreContent";
import { LanguageProvider, useLanguage } from "./components/LanguageContext";
import {
  HighlightGrid,
  HighlightLightbox,
  type OpenHighlight,
} from "./components/HighlightGrid";
import { stateCodeToName } from "@/data/stateCodes";
import CulturePage from "./CulturePage";
import AboutPage from './AboutPage';
import LanguagesPage from "./LanguagesPage";
import QuestsPage from "./QuestsPage";
import ProfilePage from "./ProfilePage";
import LanguageSelector from "./components/LanguageSelector";
import {
  IconFort,
  IconGateway,
  IconMandalaStat,
  IconScript,
  PageFrame,
  PanelCorners,
} from "./components/Ornaments";
import { Analytics } from "@vercel/analytics/react";
import { askGuide, type GroqMessage } from "./lib/groq";
import { allStates, searchStates, type StateEntry } from "./data/allStates";
import { GUIDE_VOICES, speak, stopSpeech } from "./lib/tts";
import { useProgress, visitState } from "./lib/progress";
import { avatarImage } from "./lib/avatars";
import keralaGuideCard from "./assets/guides/kerala-card.jpg";
import punjabGuideCard from "./assets/guides/punjab-card.jpg";
import rajasthanHeroGuide from "./assets/guides/rajasthan-hero.jpg";
import rajasthanHeroScene from "./assets/guides/rajasthan-hero-scene.jpg";
import assamGuidePortrait from "./assets/guides/assam-portrait.jpg";
import tripuraGuidePortrait from "./assets/guides/tripura-portrait.jpg";
import rajasthanFortThumb from "./assets/landscapes/rajasthan-fort-thumb.jpg";
import assamTeaGarden from "./assets/landscapes/assam-tea-garden.jpg";
import tripuraThumb from "./assets/landscapes/tripura-thumb.jpg";
import cultureDanceDrums from "./assets/culture/dance-drums.jpg";
import cultureDanceFort from "./assets/culture/dance-fort.jpg";
import cultureFestivalDiyas from "./assets/culture/festival-diyas.jpg";
import cultureFoodThali from "./assets/culture/food-thali.jpg";
import cultureTajMahal from "./assets/culture/taj-mahal.jpg";
import cultureScript from "./assets/culture/script-manuscript.jpg";

type View = 'home' | 'explore' | 'culture' | 'languages' | 'quests' | 'about' | 'profile';
// `raw` messages (live guide replies) are already in the traveller's chosen
// language, generated directly by the model — running them through the
// English-sourced live-translate cache again would garble them, so only
// English-sourced text (preset prompts, the offline fallback) gets t()'d.
type ChatMessage = { from: "guide" | "you"; text: string; raw?: boolean };

const cultureCards = [
  {
    title: "Culture & Traditions",
    copy: "Discover art, dance, music and traditions of every state.",
    icon: Music2,
    tone: "sand",
    image: cultureDanceDrums,
  },
  {
    title: "Taste of India",
    copy: "Explore traditional dishes and local delicacies from every corner.",
    icon: Utensils,
    tone: "peach",
    image: cultureFoodThali,
  },
  {
    title: "Must-Visit Places",
    copy: "Explore iconic destinations and hidden gems across India.",
    icon: MapPin,
    tone: "sage",
    image: cultureTajMahal,
  },
  {
    title: "Festivals & Fairs",
    copy: "Experience the vibrant festivals and fairs of India.",
    icon: Sparkles,
    tone: "rose",
    image: cultureFestivalDiyas,
  },
  {
    title: "Stories & Folklore",
    copy: "Listen to fascinating stories, legends and folklore.",
    icon: BookOpen,
    tone: "gold",
    image: cultureDanceFort,
  },
  {
    title: "Local Languages",
    copy: "Learn greetings and common words in local languages.",
    image: cultureScript,
    icon: Languages,
    tone: "blue",
  },
];

const MAP_PALETTE = [
  "#f3c9a0", "#c9dfc5", "#f0d1dd", "#cfe0ef", "#e8d5f0",
  "#f6e2a8", "#c8e6e0", "#f0c9c9", "#d9e3b8", "#f3dab8",
];
function colorForCode(code: string) {
  let hash = 0;
  for (let i = 0; i < code.length; i++) hash = (hash * 31 + code.charCodeAt(i)) >>> 0;
  return MAP_PALETTE[hash % MAP_PALETTE.length];
}

function CompassRose({ size = 46 }: { size?: number }) {
  return (
    <svg className="compass-rose" width={size} height={size} viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="27" stroke="var(--terracotta)" strokeWidth="1" opacity=".45" />
      <circle cx="30" cy="30" r="19" stroke="var(--terracotta)" strokeWidth="1" opacity=".3" />
      <path d="M30 5 L34 28 L30 30 L26 28 Z" fill="var(--terracotta)" />
      <path d="M30 55 L26 32 L30 30 L34 32 Z" fill="#e2b786" />
      <path d="M5 30 L28 26 L30 30 L28 34 Z" fill="#e2b786" />
      <path d="M55 30 L32 34 L30 30 L32 26 Z" fill="#e2b786" />
      <circle cx="30" cy="30" r="3" fill="var(--terracotta)" />
    </svg>
  );
}

function PaisleyMotif() {
  return (
    <svg className="paisley-motif" width="120" height="120" viewBox="0 0 120 120" fill="none">
      <path
        d="M60 15c22 0 38 16 38 36 0 16-10 22-10 34 0 10 8 12 8 20 0 12-14 20-30 20-24 0-42-19-42-44 0-14 8-24 8-34 0-18 12-32 28-32Z"
        fill="var(--terracotta)"
        opacity=".14"
      />
      <path
        d="M60 30c15 0 26 11 26 25 0 11-7 15-7 24 0 7 6 8 6 14 0 8-10 13-20 13-16 0-28-13-28-30 0-10 5-16 5-23 0-13 9-23 18-23Z"
        fill="var(--terracotta)"
        opacity=".22"
      />
      <circle cx="60" cy="47" r="10" fill="var(--terracotta)" opacity=".3" />
    </svg>
  );
}

const quickPrompts = [
  { label: "Best places", icon: MapPin, prompt: "Where should I go?" },
  {
    label: "Best time",
    icon: CalendarDays,
    prompt: "When is the best time to visit?",
  },
  { label: "How to reach", icon: Navigation, prompt: "How should I travel?" },
  {
    label: "Travel cost",
    icon: WalletCards,
    prompt: "How much money should I carry?",
  },
  { label: "Hotels", icon: Home, prompt: "Where should I stay?" },
  { label: "Food", icon: Utensils, prompt: "What food should I try?" },
  {
    label: "Local transport",
    icon: BusFront,
    prompt: "What is local transport like?",
  },
  {
    label: "Plan my trip",
    icon: Compass,
    prompt: "Can you make me a trip plan?",
  },
];

const GUIDE_PORTRAITS: Record<string, string> = {
  Rajasthan: rajasthanHeroGuide,
  Assam: assamGuidePortrait,
  Tripura: tripuraGuidePortrait,
};

// No Tripura landscape photo was supplied — those states fall back to a
// plain accent-colored thumbnail rather than showing a mismatched photo.
const STATE_THUMBS: Record<string, string> = {
  Rajasthan: rajasthanFortThumb,
  Assam: assamTeaGarden,
  Tripura: tripuraThumb,
};

// Guides for states without a working AI companion yet — shown alongside the
// real guides so the carousel feels as rich as the target design; clicking
// one already falls through to the existing "coming soon" modal since
// they're not in `activeStates`.
const previewGuides = [
  { name: "Kerala", image: keralaGuideCard },
  { name: "Punjab", image: punjabGuideCard },
];

function GuideArt({
  state,
  large = false,
}: {
  state: StateInfo;
  large?: boolean;
}) {
  const portrait = GUIDE_PORTRAITS[state.name];
  return (
    <div
      className={`guide-art ${large ? "guide-art-large" : ""}`}
      style={{ "--guide-accent": state.accent } as React.CSSProperties}
    >
      {portrait && <img src={portrait} alt={state.guide} />}
    </div>
  );
}

function MandalaLogo({ size = 26 }: { size?: number }) {
  const petals = Array.from({ length: 8 });
  const colors = ["#e8632c", "#f0a13c", "#c94f2a", "#f2b83f"];
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" className="mandala-logo">
      {petals.map((_, i) => (
        <ellipse
          key={i}
          cx="30"
          cy="14"
          rx="6.5"
          ry="13"
          fill={colors[i % colors.length]}
          transform={`rotate(${i * 45} 30 30)`}
        />
      ))}
      <circle cx="30" cy="30" r="8" fill="#fff3e1" />
      <circle cx="30" cy="30" r="8" fill="none" stroke="#c94f2a" strokeWidth="1.4" />
      <circle cx="30" cy="30" r="3" fill="#c94f2a" />
    </svg>
  );
}

function Header({
  view,
  setView,
  onMenu,
}: {
  view: View;
  setView: (view: View) => void;
  onMenu: () => void;
}) {
  const { t } = useLanguage();
  const progress = useProgress();
  const profileImage = avatarImage[progress.profile.avatar];
  return (
    <header className="topbar">
      <button className="mobile-menu" onClick={onMenu}>
        <Menu size={20} />
      </button>
      <button className="brand" onClick={() => setView("home")}>
        <span className="brand-mark">
          <MandalaLogo />
        </span>
        <span>
          <strong>Bharat Connect</strong>
          <small>{t("Explore India. Connect with Culture.")}</small>
        </span>
      </button>
      <nav>
        <button
          className={view === "home" ? "active" : ""}
          onClick={() => setView("home")}
        >
          {t("Home")}
        </button>
        <button
          className={view === "explore" ? "active" : ""}
          onClick={() => setView("explore")}
        >
          {t("Explore")}
        </button>
        <button
          className={view === "culture" ? "active" : ""}
          onClick={() => setView("culture")}
        >
          {t("Culture")}
        </button>
        <button
          className={view === "languages" ? "active" : ""}
          onClick={() => setView("languages")}
        >
          {t("Languages")}
        </button>
        <button
          className={view === "quests" ? "active" : ""}
          onClick={() => setView("quests")}
        >
          {t("Quests")}
        </button>
        <button
          className={view === 'about' ? 'active' : ''}
          onClick={() => setView('about')}
        >
          {t("About Us")}
        </button>
      </nav>
        <LanguageSelector />
      <button
        className={`profile-dot ${view === "profile" ? "active" : ""}`}
        onClick={() => setView("profile")}
        aria-label={t("Profile")}
        title={t("Profile")}
      >
        {profileImage ? <img src={profileImage} alt="" loading="lazy" /> : <User size={17} />}
      </button>
    </header>
  );
}

function SideNav({
  view,
  setView,
}: {
  view: View;
  setView: (view: View) => void;
}) {
  const { t } = useLanguage();
  const items = [
    { label: t("Home"), icon: Home, view: "home" as View },
    { label: t("Explore"), icon: Map, view: "explore" as View },
    { label: t("Culture"), icon: Crown, view: "culture" as View },
    { label: t("Languages"), icon: Languages, view: "languages" as View },
    { label: t("Quests"), icon: Trophy, view: "quests" as View },
    { label: t("Profile"), icon: Heart, view: "profile" as View },
    { label: t("About"), icon: CircleHelp, view: "about" as View },
  ];
  return (
    <aside className="side-nav">
      {items.map(({ label, icon: Icon, view: itemView }) => (
        <button
          key={label}
          className={view === itemView ? "active" : ""}
          onClick={() => setView(itemView)}
        >
          <Icon size={18} />
          <span>{label}</span>
        </button>
      ))}
    </aside>
  );
}

function BottomNav({
  view,
  setView,
}: {
  view: View;
  setView: (view: View) => void;
}) {
  const { t } = useLanguage();
  const items = [
    { label: t("Home"), icon: Home, view: "home" as View },
    { label: t("Explore"), icon: Map, view: "explore" as View },
    { label: t("Culture"), icon: Crown, view: "culture" as View },
    { label: t("Quests"), icon: Trophy, view: "quests" as View },
    { label: t("Profile"), icon: Heart, view: "profile" as View },
  ];
  return (
    <div className="bottom-nav">
      {items.map(({ label, icon: Icon, view: itemView }) => (
        <button
          key={label}
          onClick={() => setView(itemView)}
          className={view === itemView ? "active" : ""}
        >
          <Icon size={17} />
          {label}
        </button>
      ))}
    </div>
  );
}

function IndiaMap({
  onSelect,
  showCompass = false,
}: {
  onSelect: (name: string) => void;
  showCompass?: boolean;
}) {
  const { t } = useLanguage();
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div className={`map-wrap ${showCompass ? "has-compass" : ""}`}>
      {showCompass && <CompassRose size={40} />}
      <svg
        viewBox="-114 -50.4 611.9 695.7"
        role="img"
        aria-label="Interactive map of India"
      >
        {stateCodes.map((code) => {
          const name = stateCodeToName[code] || code;
          const isActive = !!activeStates[name];
          const isHovered = hover === code;
          return (
            <path
              key={code}
              id={code}
              d={drawPath[code]}
              className={`map-state ${isActive ? "active-state" : ""} ${isHovered ? "hovered" : ""}`}
              style={{ "--state-color": colorForCode(code) } as React.CSSProperties}
              onClick={() => onSelect(name)}
              onMouseEnter={() => setHover(code)}
              onMouseLeave={() => setHover(null)}
              tabIndex={0}
              onKeyDown={(event) => event.key === "Enter" && onSelect(name)}
            >
              <title>
                {name}
                {isActive ? ` — ${t("tap to explore")}` : ` — ${t("coming soon")}`}
              </title>
            </path>
          );
        })}
      </svg>
      {hover && (
        <div className="map-tooltip">
          {stateCodeToName[hover] || hover}
          {activeStates[stateCodeToName[hover]] ? " ✓" : ""}
        </div>
      )}
    </div>
  );
}

function CultureCard({
  title,
  copy,
  icon: Icon,
  tone,
  image,
  onClick,
}: {
  title: string;
  copy: string;
  icon: typeof Music2;
  tone: string;
  image: string;
  onClick: () => void;
}) {
  return (
    <button className={`culture-card ${tone}`} onClick={onClick}>
      <div className="card-art">
        <img src={image} alt="" loading="lazy" />
        <span className="card-badge">
          <Icon size={16} strokeWidth={1.8} />
        </span>
      </div>
      <strong>{title}</strong>
      <p>{copy}</p>
      <span className="card-arrow">
        <ArrowRight size={15} />
      </span>
    </button>
  );
}

/** The four hero figures, each with its own piece of cultural iconography. */
const HERO_STATS = [
  { value: "28", label: "States", Icon: IconFort },
  { value: "8+", label: "UTs", Icon: IconGateway },
  { value: "22+", label: "Languages", Icon: IconScript },
  { value: "50+", label: "Cultures", Icon: IconMandalaStat },
];

/**
 * The guide's spoken welcome. Plays through lib/tts — a hosted neural voice
 * where the key allows it, the best-ranked platform voice otherwise — and
 * shows a live progress bar while it talks.
 */
function GuideVoiceCard() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "playing">("idle");
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);

  const line =
    "Khamma Ghani! I am Aarav, your guide from Rajasthan. Let me tell you about our forts and our festivals, our food, and the stories the desert still remembers. Come — let us begin.";

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => () => {
    clearTimer();
    stopSpeech();
  }, []);

  const stop = () => {
    stopSpeech();
    clearTimer();
    setStatus("idle");
    setElapsed(0);
  };

  const play = async () => {
    if (status !== "idle") {
      stop();
      return;
    }
    setStatus("loading");
    setElapsed(0);
    await speak(line, {
      voice: GUIDE_VOICES.Rajasthan,
      onEnd: () => {
        clearTimer();
        setStatus("idle");
        setElapsed(0);
      },
    });
    setStatus("playing");
    timerRef.current = window.setInterval(() => setElapsed((value) => value + 1), 1000);
  };

  const clock = `0:${String(Math.min(elapsed, 59)).padStart(2, "0")}`;

  return (
    <div className={`audio-card ${status === "playing" ? "is-playing" : ""}`}>
      <div className="audio-title">
        <span>
          <strong>{t("I'm your AI Guide from Rajasthan.")}</strong>
          <small>
            {t("Let me tell you about our culture, food, places and festivals.")}
          </small>
        </span>
      </div>
      <div className="audio-line">
        <button
          className="play"
          onClick={play}
          aria-label={status === "idle" ? t("Play greeting") : t("Stop greeting")}
        >
          {status === "loading" ? (
            <Loader2 size={13} className="spin" />
          ) : status === "playing" ? (
            <Pause size={13} fill="currentColor" />
          ) : (
            <Play size={13} fill="currentColor" />
          )}
        </button>
        <span>{status === "idle" ? "0:15" : clock}</span>
        <i />
        <div className="wave" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, index) => (
            <b key={index} style={{ animationDelay: `${index * 0.07}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero({
  onExplore,
  onChooseState,
}: {
  onExplore: () => void;
  onChooseState: (name: string) => void;
}) {
  const { t } = useLanguage();
  return (
    <section className="hero-panel">
      <PanelCorners size={78} />
      <div className="hero-copy">
        <span className="eyebrow">{t("A living atlas of India")}</span>
        <h1>
          {t("Discover India,")}
          <br />
          <em>{t("One State at a Time")}</em>
        </h1>
        <p>
          {t("Your AI cultural companion to explore India's rich heritage, languages, food, festivals, stories & more.")}
        </p>
        <div className="hero-actions">
          <button className="primary-btn" onClick={onExplore}>
            {t("Start Exploring")} <ArrowRight size={18} />
          </button>
          <button
            className="outline-btn"
            onClick={() => onChooseState("Rajasthan")}
          >
            <Sparkles size={17} /> {t("Meet Your AI Guide")}
          </button>
        </div>
        <div className="stats">
          {HERO_STATS.map(({ value, label, Icon }) => (
            <div key={label}>
              <span className="stat-icon">
                <Icon size={24} />
              </span>
              <span className="stat-figures">
                <strong>{value}</strong>
                <span>{t(label)}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-map">
        <IndiaMap onSelect={onChooseState} showCompass />
      </div>
      <div className="hero-guide">
        <div className="guide-scene">
          <img
            className="guide-scene-img"
            src={rajasthanHeroScene}
            alt={`${activeStates.Rajasthan.guide} — ${activeStates.Rajasthan.role}`}
          />
          <div className="hero-guide-card">
            <span className="bubble-tail" />
            <strong>पधारो म्हारे देश!</strong>
            <span>({t("Welcome to my land!")})</span>
          </div>
          <GuideVoiceCard />
        </div>
      </div>
    </section>
  );
}

function HomePage({
  onExplore,
  onChooseState,
}: {
  onExplore: () => void;
  onChooseState: (name: string) => void;
}) {
  const { t } = useLanguage();
  const progress = useProgress();
  const guideRowRef = useRef<HTMLDivElement>(null);
  const scrollGuides = (direction: 1 | -1) =>
    guideRowRef.current?.scrollBy({ left: direction * 200, behavior: "smooth" });

  // The four home-page trackers, read live from the shared progress store so
  // a quiz taken on the Quests page moves the bar here too.
  const journeyGoals = [
    { icon: MapPin, label: "Explore 5 States", value: progress.visited.length, goal: 5 },
    { icon: Languages, label: "Learn 10 Greetings", value: progress.greetings.length, goal: 10 },
    { icon: CircleHelp, label: "Take a Quiz", value: progress.quizzes.length, goal: 5 },
    { icon: Heart, label: "Save 15 Favourites", value: progress.bookmarks.length, goal: 15 },
  ];

  return (
    <main className="content">
      <Hero onExplore={onExplore} onChooseState={onChooseState} />
      <section className="section-heading">
        <span className="ornament">❧</span>
        <h2>{t("Explore the Essence of India")}</h2>
        <span className="ornament flip">❧</span>
      </section>
      <section className="culture-grid">
        {cultureCards.map((card) => (
          <CultureCard key={card.title} {...card} title={t(card.title)} copy={t(card.copy)} onClick={() => onExplore()} />
        ))}
      </section>
      <section className="lower-grid">
        <div className="select-state panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">{t("Begin your journey")}</span>
              <h2>{t("Select Your State")}</h2>
            </div>
            <span className="mini-note">{t("Click a state on the map")}</span>
          </div>
          <div className="state-picker">
            <IndiaMap onSelect={onChooseState} />
            <div className="state-list">
              {["Rajasthan", "Assam", "Tripura"].map((name) => (
                <button key={name} onClick={() => onChooseState(name)}>
                  <span
                    className="state-thumb"
                    style={STATE_THUMBS[name] ? undefined : { background: activeStates[name].accent }}
                  >
                    {STATE_THUMBS[name] && <img src={STATE_THUMBS[name]} alt="" loading="lazy" />}
                  </span>{" "}
                  <span>
                    <strong>{name}</strong>
                    <small>{activeStates[name].capital}</small>
                  </span>
                  <ArrowRight size={14} />
                </button>
              ))}
              <button className="all-states" onClick={onExplore}>
                {t("View All States")} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
        <div className="guides panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">{t("Every state, a new friend")}</span>
              <h2>{t("Meet Your AI Guides")}</h2>
            </div>
            <div className="carousel-arrows">
              <button className="circle-button" aria-label="Previous" onClick={() => scrollGuides(-1)}>
                <ArrowRight size={15} style={{ transform: "rotate(180deg)" }} />
              </button>
              <button className="circle-button" aria-label="Next" onClick={() => scrollGuides(1)}>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
          <div className="guide-row" ref={guideRowRef}>
            {Object.values(activeStates).map((state) => (
              <button
                key={state.name}
                className="guide-card"
                onClick={() => onChooseState(state.name)}
              >
                <GuideArt state={state} />
                <strong>{state.guide}</strong>
                <small>{state.name}</small>
              </button>
            ))}
            {previewGuides.map((guide) => (
              <button
                key={guide.name}
                className="guide-card preview"
                onClick={() => onChooseState(guide.name)}
              >
                <span className="guide-art guide-art-preview">
                  <img src={guide.image} alt={guide.name} loading="lazy" />
                </span>
                <span className="preview-tag">{t("Coming soon")}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="journey panel">
          <PaisleyMotif />
          <div className="panel-heading">
            <div>
              <span className="eyebrow">{t("Learn, explore & earn")}</span>
              <h2>{t("Continue Your Journey")}</h2>
            </div>
            <Trophy size={22} />
          </div>
          {journeyGoals.map(({ icon: GoalIcon, label, value, goal }) => (
            <div className="progress-row" key={label}>
              <div>
                <GoalIcon size={16} />
                <span>{t(label)}</span>
              </div>
              <strong>
                {Math.min(value, goal)}/{goal}
              </strong>
              <div className="progress">
                <i style={{ width: `${Math.min(100, (value / goal) * 100)}%` }} />
              </div>
            </div>
          ))}
          <div className="points">
            <Star size={17} fill="currentColor" />{" "}
            <strong>{progress.points}</strong> {t("Culture Points")}
          </div>
        </div>
      </section>
    </main>
  );
}

/** One row in the Explore search results / directory. */
function StateResultCard({
  entry,
  onSelect,
  visited,
}: {
  entry: StateEntry;
  onSelect: (name: string) => void;
  visited: boolean;
}) {
  const { t } = useLanguage();
  const live = !!activeStates[entry.name];
  return (
    <button
      className={`state-result ${live ? "live" : ""}`}
      onClick={() => onSelect(entry.name)}
    >
      <span className="state-result-code">{entry.code}</span>
      <span className="state-result-body">
        <strong>
          {entry.name}
          {visited && <em className="visited-tick" title={t("Already explored")}>✓</em>}
        </strong>
        <small>
          <MapPin size={11} /> {entry.capital} · {entry.kind} · {t(entry.region)}
        </small>
        <p>{t(entry.knownFor)}</p>
      </span>
      <span className="state-result-tag">
        {live ? (
          <em className="live-tag">
            <Sparkles size={11} /> {t("Guide ready")}
          </em>
        ) : (
          <em>{t("Coming soon")}</em>
        )}
        <ArrowRight size={15} />
      </span>
    </button>
  );
}

function ExplorePage({ onSelect }: { onSelect: (name: string) => void }) {
  const { t } = useLanguage();
  const progress = useProgress();
  const [query, setQuery] = useState("");
  // The Explore navigation opens on the guide-ready directory; visitors can
  // still switch to all 37 regions with the filter above the results.
  const [filter, setFilter] = useState<"all" | "live" | "State" | "Union Territory">("live");
  const searchRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    let list = searchStates(query);
    if (filter === "live") list = list.filter((entry) => !!activeStates[entry.name]);
    else if (filter !== "all") list = list.filter((entry) => entry.kind === filter);
    return list;
  }, [query, filter]);

  // "/" focuses the search from anywhere on the page, the way a directory
  // this long deserves.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const FILTERS = [
    { id: "all" as const, label: "All 37" },
    { id: "live" as const, label: "Guide ready" },
    { id: "State" as const, label: "States" },
    { id: "Union Territory" as const, label: "Union Territories" },
  ];

  return (
    <main className="content explore-page">
      <div className="explore-intro">
        <div>
          <span className="eyebrow">{t("Your interactive atlas")}</span>
          <h1>
            {t("Choose a state,")}
            <br />
            <em>{t("meet its culture.")}</em>
          </h1>
          <p>
            {t("Search any of India's 28 states and 9 union territories, or tap the map. Rajasthan, Assam and Tripura open a full guided journey today.")}
          </p>
        </div>
        <div className="explore-search">
          <div className="search-box">
            <Search size={17} />
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("Search a state, capital or 'backwaters'...")}
              aria-label={t("Search states")}
            />
            {query ? (
              <button className="search-clear" onClick={() => setQuery("")} aria-label={t("Clear search")}>
                <X size={14} />
              </button>
            ) : (
              <kbd>/</kbd>
            )}
          </div>
          <div className="explore-filters">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                className={filter === item.id ? "active" : ""}
                onClick={() => setFilter(item.id)}
              >
                {t(item.label)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="state-directory">
        <div className="directory-head">
          <h2>
            {results.length} {t(results.length === 1 ? "region" : "regions")}
            {query && (
              <em>
                {" "}
                {t("matching")} “{query}”
              </em>
            )}
          </h2>
          <span className="mini-note">{t("Every region is listed — tap any one to open it")}</span>
        </div>
        {results.length ? (
          <div className="state-result-grid">
            {results.map((entry) => (
              <StateResultCard
                key={entry.code}
                entry={entry}
                onSelect={onSelect}
                visited={progress.visited.includes(entry.name)}
              />
            ))}
          </div>
        ) : (
          <div className="grid-empty">
            <Search size={22} />
            <strong>{t("Nothing matched that search.")}</strong>
            <p>{t("Try a state name, a capital city, or something it's famous for.")}</p>
            <button className="outline-btn" onClick={() => setQuery("")}>
              {t("Show all regions")}
            </button>
          </div>
        )}
      </section>

      <div className="explore-layout">
        <div className="map-panel panel">
          <div className="map-panel-head">
            <div>
              <h2>{t("India, in many beautiful stories")}</h2>
              <p>{t("Tap any region to learn more")}</p>
            </div>
            <span className="legend">
              <i /> {t("Active guides")} <b />
              <span>{t("Coming soon")}</span>
            </span>
          </div>
          <div className="big-map">
            <IndiaMap onSelect={onSelect} />
          </div>
        </div>
        <div className="explore-side">
          <div className="panel active-guide-list">
            <span className="eyebrow">{t("Start here")}</span>
            <h2>{t("Guides ready to meet you")}</h2>
            {Object.values(activeStates).map((state) => (
              <button key={state.name} onClick={() => onSelect(state.name)}>
                <GuideArt state={state} />
                <span>
                  <strong>{state.name}</strong>
                  <small>{t(state.role)}</small>
                </span>
                <ArrowRight size={17} />
              </button>
            ))}
          </div>
          <div className="panel explore-note">
            <Sparkles size={21} />
            <div>
              <strong>{t("More stories are coming")}</strong>
              <p>
                {t("Every state is part of the atlas. New cultural guides are being prepared.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// The five sections of a state experience. `id` doubles as the key into the
// StateGuide object, so the count badge on each tab needs no extra lookup.
const TABS = [
  { id: "culture", label: "Culture", icon: Music2 },
  { id: "places", label: "Places", icon: MapPin },
  { id: "traditions", label: "Traditions", icon: Sparkles },
  { id: "food", label: "Food", icon: Utensils },
  { id: "plan", label: "Travel Plan", icon: Compass },
] as const;

type TabId = (typeof TABS)[number]["id"];
type Style = "Budget" | "Comfort" | "Premium";

// Travel style scales the whole budget: budget travel sits at the bottom of
// each range, premium above the top of it.
const STYLE_FACTOR: Record<Style, [number, number]> = {
  Budget: [0.65, 0.85],
  Comfort: [1, 1],
  Premium: [1.6, 2.1],
};


function StateExperience({
  state,
  onClose,
}: {
  state: StateInfo;
  onClose: () => void;
}) {
  const { t, language } = useLanguage();
  // Messages are stored in English and translated at render time (never at
  // creation time) so a reply that wasn't cached yet still picks up its
  // translation the moment the live lookup resolves, instead of being
  // frozen in whatever language was ready at the instant it was sent.
  // Live Groq replies are the exception — the model already writes them in
  // the traveller's chosen language, so they're flagged `raw` and skipped.
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      from: "guide",
      text: `${state.greeting}! I’m ${state.guide}, ${state.role}. Ask me about culture, food or planning your journey.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [days, setDays] = useState("4");
  const [travellers, setTravellers] = useState("2");
  const [style, setStyle] = useState<Style>("Comfort");
  const [planned, setPlanned] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [tab, setTab] = useState<TabId>("culture");
  const [lightbox, setLightbox] = useState<OpenHighlight | null>(null);
const chatMessagesRef = useRef<HTMLDivElement>(null);
const chatInputRef = useRef<HTMLInputElement>(null);
const [chatFocused, setChatFocused] = useState(false);
useEffect(() => {
  const chat = chatMessagesRef.current;

  if (chat) {
    chat.scrollTop = chat.scrollHeight;
  }

  if (!thinking && chatFocused) {
    setTimeout(() => {
      chatInputRef.current?.focus();
    }, 0);
  }
}, [messages, thinking, chatFocused]);
const guide = stateGuides[state.name];

  // The planner inputs are free-text, so clamp them before any arithmetic —
  // an empty field or a pasted "abc" would otherwise produce NaN everywhere.
  const dayCount = Math.min(30, Math.max(1, Number(days) || 1));
  const travellerCount = Math.min(20, Math.max(1, Number(travellers) || 1));

  const budget = useMemo(() => {
    if (!guide) return null;
    const [low, high] = STYLE_FACTOR[style];
    const scaled = Object.fromEntries(
      Object.entries(guide.plan.budget).map(([key, [min, max]]) => [
        key,
        [min * low, max * high],
      ]),
    ) as typeof guide.plan.budget;
    return estimateBudget(scaled, dayCount, travellerCount);
  }, [guide, style, dayCount, travellerCount]);

  // Stretch or trim the curated itinerary to the requested number of days:
  // a shorter trip keeps the opening days and always ends on the closing one,
  // a longer trip repeats the middle days as free exploring time.
  const itinerary = useMemo(() => {
    const base = guide?.plan.itinerary ?? [];
    if (!base.length) return [];
    if (dayCount >= base.length) {
      const extra = Array.from({ length: dayCount - base.length }, () => ({
        title: "Free day",
        detail: `Slow morning, a local market, or a day trip out of ${state.capital}.`,
      }));
      return [...base.slice(0, -1), ...extra, base[base.length - 1]];
    }
    return [...base.slice(0, dayCount - 1), base[base.length - 1]];
  }, [guide, dayCount, state.capital]);

  // Used only when the Groq call fails (no key, network issue, rate limit) —
  // keeps the guide answering something sensible instead of going silent.
  const localFallback = (prompt: string) => {
    const q = prompt.toLowerCase();
    if (q.includes("food")) return state.food;
    if (q.includes("tradition") || q.includes("culture")) return state.traditions;
    if (q.includes("greeting") || q.includes("language"))
      return `A lovely greeting to learn is “${state.greeting}”. It is a warm way to say hello and show respect.`;
    if (q.includes("time") || q.includes("month") || q.includes("season"))
      return `Best time to visit ${state.name}: ${state.bestTime}. Recommended stay: ${state.duration}.`;
    if (q.includes("cost") || q.includes("money"))
      return budget
        ? `For ${travellerCount} traveller(s) over ${dayCount} days in ${style} style, plan on about ${formatRupees(budget.total[0])}–${formatRupees(budget.total[1])} in total, or ${formatRupees(budget.perPerson[0])}–${formatRupees(budget.perPerson[1])} each. Open the Travel Plan tab for the full breakdown.`
        : `Travellers: ${travellers} · Days: ${days}. Estimated cost: ₹13,000–₹25,000 per person depending on your travel style.`;
    if (q.includes("reach") || q.includes("travel") || q.includes("transport"))
      return guide
        ? guide.plan.reach.map((option) => `${option.label}: ${option.detail}`).join(" ")
        : state.transport;
    if (q.includes("place") || q.includes("go") || q.includes("see"))
      return guide
        ? `Start with ${guide.places.slice(0, 4).map((place) => place.name).join(", ")}. They make a lovely first route through ${state.name} — the Places tab has photos and details for all ${guide.places.length}.`
        : `Start with ${state.places.join(", ")}. They make a lovely first route through ${state.name}.`;
    if (q.includes("plan"))
      return itinerary.length
        ? `Here is a ${dayCount}-day idea: ${itinerary
            .map((entry, index) => `Day ${index + 1} — ${entry.title}`)
            .join("; ")}. The Travel Plan tab lays it out in full.`
        : `Here’s a gentle ${days}-day idea: arrive in ${state.capital}, spend two days on signature sights, then add a local food and craft experience.`;
    return state.culture;
  };

  const respond = async (prompt: string, presetEnglish = false) => {
    if (thinking) return;
    const userMessage: ChatMessage = { from: "you", text: prompt, raw: !presetEnglish };
    const historyForApi: GroqMessage[] = [...messages, userMessage].map((m) => ({
      role: m.from === "guide" ? "assistant" : "user",
      content: m.text,
    }));
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setThinking(true);
    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) throw new Error("Missing VITE_GROQ_API_KEY");
      const reply = await askGuide(state, language, historyForApi, apiKey);
      setMessages((current) => [...current, { from: "guide", text: reply, raw: true }]);
    } catch {
      setMessages((current) => [...current, { from: "guide", text: localFallback(prompt) }]);
    } finally {
      setThinking(false);
    }
  };
  const submit = (event: React.FormEvent) => {
  event.preventDefault();

  if (input.trim()) {
    respond(input.trim());
  }
};
  return (
    <div className="experience-overlay">
      <div className="experience">
        <button className="close-experience" onClick={onClose}>
          <X size={19} />
        </button>
        <div
          className="experience-top"
          style={{ "--guide-accent": state.accent } as React.CSSProperties}
        >
          <div>
            <span className="eyebrow">{t("Your cultural guide")}</span>
            <h1>
              {t("Welcome to")} <em>{state.name}</em>
            </h1>
            <p>{t(state.culture)}</p>
            <div className="tag-row">
              <span>
                <MapPin size={14} /> {t("Capital:")} {state.capital}
              </span>
              <span>
                <Languages size={14} /> {t(state.languages)}
              </span>
            </div>
          </div>
          <div className="experience-guide">
            <GuideArt state={state} large />
            <div className="guide-label">
              <strong>{state.guide}</strong>
              <small>{t(state.role)}</small>
            </div>
          </div>
        </div>
        <div className="experience-body">
          <div className="experience-main">
            <div className="content-tabs" role="tablist" aria-label={t("Explore sections")}>
              {TABS.map(({ id, label, icon: TabIcon }) => (
                <button
                  key={id}
                  role="tab"
                  id={`tab-${id}`}
                  aria-selected={tab === id}
                  aria-controls={`panel-${id}`}
                  className={tab === id ? "active" : undefined}
                  onClick={() => setTab(id)}
                >
                  <TabIcon size={14} />
                  {t(label)}
                  {guide && id !== "plan" && <em>{guide[id].length}</em>}
                </button>
              ))}
            </div>

            <div
              className="tab-panel"
              role="tabpanel"
              id={`panel-${tab}`}
              aria-labelledby={`tab-${tab}`}
              key={tab}
            >
              {tab === "culture" && (
                <>
                  <div className="info-cards">
                    <article>
                      <Music2 size={19} />
                      <span>
                        <strong>{t("Culture & traditions")}</strong>
                        <p>{t(state.traditions)}</p>
                      </span>
                    </article>
                    <article>
                      <BookOpen size={19} />
                      <span>
                        <strong>{t("Stories & folklore")}</strong>
                        <p>{t(state.folklore)}</p>
                      </span>
                    </article>
                    <article>
                      <Languages size={19} />
                      <span>
                        <strong>{t("Languages spoken")}</strong>
                        <p>
                          {t(state.languages)}. {t("A warm way to say hello is")} “{state.greeting}”.
                        </p>
                      </span>
                    </article>
                  </div>
                  <HighlightGrid
                    items={guide?.culture}
                    state={state.name}
                    eyebrow={t("Living traditions")}
                    heading={`${t("Art, craft and performance in")} ${state.name}`}
                    onOpen={setLightbox}
                  />
                </>
              )}

              {tab === "places" && (
                <HighlightGrid
                  items={guide?.places}
                  state={state.name}
                  eyebrow={t("Must-visit")}
                  heading={`${t("Places to see in")} ${state.name}`}
                  onOpen={setLightbox}
                />
              )}

              {tab === "traditions" && (
                <HighlightGrid
                  items={guide?.traditions}
                  state={state.name}
                  eyebrow={t("Festivals & customs")}
                  heading={`${t("Traditions of")} ${state.name}`}
                  onOpen={setLightbox}
                />
              )}

              {tab === "food" && (
                <HighlightGrid
                  items={guide?.food}
                  state={state.name}
                  eyebrow={t("What to eat")}
                  heading={`${t("Taste of")} ${state.name}`}
                  onOpen={setLightbox}
                />
              )}

              {tab === "plan" && (
                <div className="plan-tab">
                  {guide && <p className="plan-intro">{t(guide.plan.intro)}</p>}

                  <div className="travel-sections">
                    <div className="best-time">
                      <div className="section-title">
                        <CalendarDays size={19} />
                        <div>
                          <span className="eyebrow">{t("Plan with ease")}</span>
                          <h2>{t("Best time to visit")}</h2>
                        </div>
                      </div>
                      <div className="time-grid">
                        <div>
                          <small>{t("Best months")}</small>
                          <strong>{state.bestTime}</strong>
                        </div>
                        <div>
                          <small>{t("Recommended stay")}</small>
                          <strong>{state.duration}</strong>
                        </div>
                        <div>
                          <small>{t("Weather")}</small>
                          <strong>{t(state.weather)}</strong>
                        </div>
                        <div>
                          <small>{t("Capital")}</small>
                          <strong>{state.capital}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="cost-card">
                      <div className="section-title">
                        <WalletCards size={19} />
                        <div>
                          <span className="eyebrow">{t("Estimated cost")}</span>
                          <h2>{t("Travel budget")}</h2>
                        </div>
                      </div>
                      {budget ? (
                        <>
                          {budget.lines.map((line) => (
                            <div className="cost-line" key={line.label}>
                              <span>
                                {t(line.label)}
                                <small>{t(line.note)}</small>
                              </span>
                              <strong>
                                {formatRupees(line.range[0])}–{formatRupees(line.range[1])}
                              </strong>
                            </div>
                          ))}
                          <div className="cost-total">
                            <span>{t("Total for the trip")}</span>
                            <strong>
                              {formatRupees(budget.total[0])}–{formatRupees(budget.total[1])}
                            </strong>
                          </div>
                          <div className="cost-total per-person">
                            <span>{t("Per traveller")}</span>
                            <strong>
                              {formatRupees(budget.perPerson[0])}–{formatRupees(budget.perPerson[1])}
                            </strong>
                          </div>
                        </>
                      ) : (
                        state.costs.map((cost) => (
                          <div className="cost-line" key={cost.label}>
                            <span>{t(cost.label)}</span>
                            <strong>{cost.value}</strong>
                          </div>
                        ))
                      )}
                      <small className="disclaimer">
                        {t("Estimates only, based on typical mid-range travel. Live pricing is not included.")}
                      </small>
                    </div>
                  </div>

                  <div className="planner panel">
                    <div className="section-title">
                      <Compass size={19} />
                      <div>
                        <span className="eyebrow">{t("Make it yours")}</span>
                        <h2>{t("Plan My Journey")}</h2>
                      </div>
                    </div>
                    <div className="planner-fields">
                      <label>
                        {t("Travellers")}
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={travellers}
                          onChange={(e) => setTravellers(e.target.value)}
                        />
                      </label>
                      <label>
                        {t("Days")}
                        <input
                          type="number"
                          min="1"
                          max="30"
                          value={days}
                          onChange={(e) => setDays(e.target.value)}
                        />
                      </label>
                      <label>
                        {t("Travel style")}
                        <select
                          value={style}
                          onChange={(e) => setStyle(e.target.value as Style)}
                        >
                          <option value="Comfort">{t("Comfort")}</option>
                          <option value="Budget">{t("Budget")}</option>
                          <option value="Premium">{t("Premium")}</option>
                        </select>
                      </label>
                      <button className="primary-btn" onClick={() => setPlanned(true)}>
                        {t("Create plan")} <ArrowRight size={16} />
                      </button>
                    </div>

                    {planned && itinerary.length > 0 && (
                      <div className="itinerary">
                        <strong>
                          {dayCount}-{t("day")} {state.name} {t("itinerary")}
                        </strong>
                        {itinerary.map((entry, index) => (
                          <div key={`${entry.title}-${index}`}>
                            <span>
                              {t("Day")} {index + 1}
                            </span>
                            <b>{t(entry.title)}</b>
                            <p>{t(entry.detail)}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {guide && (
                    <div className="reach-grid">
                      {guide.plan.reach.map((option) => {
                        const ReachIcon =
                          option.mode === "air"
                            ? Plane
                            : option.mode === "rail"
                              ? TrainFront
                              : BusFront;
                        return (
                          <article key={option.label}>
                            <ReachIcon size={17} />
                            <strong>{t(option.label)}</strong>
                            <p>{t(option.detail)}</p>
                          </article>
                        );
                      })}
                    </div>
                  )}

                  {guide && (
                    <div className="plan-lists">
                      <div>
                        <div className="section-title">
                          <Luggage size={18} />
                          <div>
                            <span className="eyebrow">{t("Before you go")}</span>
                            <h2>{t("What to pack")}</h2>
                          </div>
                        </div>
                        <ul>
                          {guide.plan.packing.map((item) => (
                            <li key={item}>{t(item)}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="section-title">
                          <CircleHelp size={18} />
                          <div>
                            <span className="eyebrow">{t("Travel smart")}</span>
                            <h2>{t("Good to know")}</h2>
                          </div>
                        </div>
                        <ul>
                          {guide.plan.tips.map((item) => (
                            <li key={item}>{t(item)}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="travel-links">
                    <a href="https://www.redbus.in/" target="_blank" rel="noreferrer">
                      <BusFront size={17} /> {t("Check bus options")} <ExternalLink size={13} />
                    </a>
                    <a href="https://rapido.bike/" target="_blank" rel="noreferrer">
                      <Navigation size={17} /> {t("Check local rides")} <ExternalLink size={13} />
                    </a>
                    <a href="https://www.irctc.co.in/" target="_blank" rel="noreferrer">
                      <TrainFront size={17} /> {t("Check trains")} <ExternalLink size={13} />
                    </a>
                    <a href="https://www.google.com/travel/" target="_blank" rel="noreferrer">
                      <Plane size={17} /> {t("Check flights")} <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <aside className="chat-panel">
            <div className="chat-header">
              <div className="chat-avatar">
                <GuideArt state={state} />
              </div>
              <div>
                <strong>{t("Chat with")} {state.guide}</strong>
                <small>{t("Demo cultural guide · always learning")}</small>
              </div>
              <span className="online-dot" />
            </div>
            <div className="chat-messages" ref={chatMessagesRef}>
              {messages.map((message, index) => (
                <div
                  key={`${message.text}-${index}`}
                  className={`message ${message.from}`}
                >
                  <span>{message.raw ? message.text : t(message.text)}</span>
                </div>
              ))}
              {thinking && (
                <div className="message guide thinking">
                  <span>{state.guide} …</span>
                </div>
              )}
            </div>
            <div className="quick-actions">
              {quickPrompts.map(({ label, icon: Icon, prompt }) => (
                <button key={label} disabled={thinking} onClick={() => respond(prompt, true)}>
                  <Icon size={13} />
                  {t(label)}
                </button>
              ))}
            </div>
            <form className="chat-input" onSubmit={submit}>
              <input
  ref={chatInputRef}
  value={input}
  disabled={thinking}
  onFocus={() => setChatFocused(true)}
  onBlur={() => setChatFocused(false)}
  onPointerDown={() => setChatFocused(true)}
  onChange={(e) => setInput(e.target.value)}
  placeholder={`${t("Chat with")} ${state.guide}...`}
/>
              <button aria-label={t("Send message")} disabled={thinking}>
                <ArrowRight size={17} />
              </button>
            </form>
          </aside>
        </div>
      </div>
      {lightbox && (
        <HighlightLightbox item={lightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}

function AppContent() {
  const [view, setView] = useState<View>("home");
  const [stateName, setStateName] = useState<string | null>(null);
  const [comingSoon, setComingSoon] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();
  const selectedState = useMemo(
    () => (stateName ? activeStates[stateName] : null),
    [stateName],
  );
  const comingSoonEntry = useMemo(
    () => allStates.find((entry) => entry.name === comingSoon) ?? null,
    [comingSoon],
  );
  // Opening a guide is what stamps a state into the traveller's passport, so
  // the scoring lives here rather than in each call site.
  const chooseState = (name: string) => {
    if (activeStates[name]) {
      setStateName(name);
      visitState(name);
    } else {
      setComingSoon(name);
    }
  };

  const navigate = (next: View) => {
    setView(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const NAV_ITEMS: { label: string; view: View }[] = [
    { label: t("Home"), view: "home" },
    { label: t("Explore"), view: "explore" },
    { label: t("Culture"), view: "culture" },
    { label: t("Languages"), view: "languages" },
    { label: t("Quests"), view: "quests" },
    { label: t("Profile"), view: "profile" },
    { label: t("About Us"), view: "about" },
  ];

  return (
    <div className="app-shell">
      <PageFrame />
      <Header view={view} setView={navigate} onMenu={() => setMenuOpen(!menuOpen)} />
      {menuOpen && (
        <div className="mobile-drawer">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.view}
              className={view === item.view ? "active" : ""}
              onClick={() => navigate(item.view)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
      <SideNav view={view} setView={navigate} />
      {view === "home" ? (
        <HomePage onExplore={() => navigate("explore")} onChooseState={chooseState} />
      ) : view === "explore" ? (
        <ExplorePage onSelect={chooseState} />
      ) : view === "culture" ? (
        <CulturePage />
      ) : view === "languages" ? (
        <LanguagesPage />
      ) : view === "quests" ? (
        <QuestsPage />
      ) : view === "profile" ? (
        <ProfilePage onOpenState={chooseState} onNavigate={navigate} />
      ) : (
        <AboutPage />
      )}
      {selectedState && (
        <StateExperience
          state={selectedState}
          onClose={() => setStateName(null)}
        />
      )}
      {comingSoon && (
        <div className="modal-backdrop" onClick={() => setComingSoon(null)}>
          <div
            className="coming-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button onClick={() => setComingSoon(null)}>
              <X size={17} />
            </button>
            <Sparkles size={31} />
            <span className="eyebrow">{t("A new story is on its way")}</span>
            <h2>{comingSoon}</h2>
            {comingSoonEntry ? (
              <>
                <p className="coming-known">{t(comingSoonEntry.knownFor)}</p>
                <div className="coming-facts">
                  <div>
                    <small>{t("Capital")}</small>
                    <strong>{comingSoonEntry.capital}</strong>
                  </div>
                  <div>
                    <small>{t("Region")}</small>
                    <strong>{t(comingSoonEntry.region)}</strong>
                  </div>
                  <div>
                    <small>{t("Languages")}</small>
                    <strong>{comingSoonEntry.languages}</strong>
                  </div>
                </div>
              </>
            ) : null}
            <p>
              {t("A full AI guide for this region is being written. Rajasthan, Assam and Tripura are ready to explore right now.")}
            </p>
            <div className="coming-actions">
              {["Rajasthan", "Assam", "Tripura"].map((name) => (
                <button
                  key={name}
                  className="outline-btn"
                  onClick={() => {
                    setComingSoon(null);
                    chooseState(name);
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <BottomNav view={view} setView={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
      <Analytics />
    </LanguageProvider>
  );
}
