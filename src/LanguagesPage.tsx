import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeftRight,
  BookOpen,
  Check,
  Layers,
  Loader2,
  RotateCcw,
  Search,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import { useLanguage } from "./components/LanguageContext";
import { PanelCorners } from "./components/Ornaments";
import {
  hasVoiceFor,
  languages,
  phrasesOf,
  speakPhrase,
  SLOT_LABELS,
  type LanguageEntry,
  type Phrase,
} from "./data/phrases";
import { learnGreeting, useProgress } from "./lib/progress";

type Mode = "phrasebook" | "flashcards" | "listen";

const MODES: { id: Mode; label: string; icon: typeof BookOpen; blurb: string }[] = [
  { id: "phrasebook", label: "Phrasebook", icon: BookOpen, blurb: "Read, hear and collect every phrase." },
  { id: "flashcards", label: "Flashcards", icon: Layers, blurb: "Flip a card, test yourself, keep score." },
  { id: "listen", label: "Listen & Guess", icon: Volume2, blurb: "Hear a phrase, pick what it means." },
];

/** Script sampler shown at the top — the same greeting in every script. */
function ScriptStrip({ onPick }: { onPick: (id: string) => void }) {
  return (
    <div className="script-strip">
      {languages.map((entry) => (
        <button
          key={entry.id}
          className="script-chip"
          style={{ "--chip-accent": entry.accent } as React.CSSProperties}
          onClick={() => onPick(entry.id)}
          title={`${entry.name} — ${entry.script}`}
        >
          <em>{entry.phrases.hello[0]}</em>
          <small>{entry.name}</small>
        </button>
      ))}
    </div>
  );
}

function PhraseRow({
  phrase,
  entry,
  learned,
  onLearn,
  speaking,
  onSpeak,
}: {
  phrase: Phrase;
  entry: LanguageEntry;
  learned: boolean;
  onLearn: () => void;
  speaking: boolean;
  onSpeak: () => void;
}) {
  const { t } = useLanguage();
  return (
    <li className={`phrase-row ${learned ? "learned" : ""}`}>
      <div className="phrase-meaning">
        <small>{t(phrase.english)}</small>
        <strong lang={entry.speechLang}>{phrase.native}</strong>
        <em>{phrase.roman}</em>
      </div>
      <div className="phrase-tools">
        <button
          className={`phrase-play ${speaking ? "on" : ""}`}
          onClick={onSpeak}
          aria-label={`${t("Play")} ${phrase.roman}`}
        >
          <Volume2 size={15} />
        </button>
        <button
          className={`phrase-learn ${learned ? "on" : ""}`}
          onClick={onLearn}
          aria-pressed={learned}
        >
          {learned ? <Check size={14} /> : <Sparkles size={14} />}
          <span>{learned ? t("Learned") : t("Learn")}</span>
        </button>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------- flashcards */

function Flashcards({ entry }: { entry: LanguageEntry }) {
  const { t } = useLanguage();
  const deck = useMemo(() => phrasesOf(entry), [entry]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
    setKnown([]);
  }, [entry.id]);

  const card = deck[index];
  const done = index >= deck.length;

  const advance = (markKnown: boolean) => {
    if (markKnown && card) {
      setKnown((current) => [...current, card.id]);
      learnGreeting(card.id);
    }
    setFlipped(false);
    setIndex((current) => current + 1);
  };

  if (done) {
    return (
      <div className="flash-done">
        <span className="flash-score">
          {known.length}/{deck.length}
        </span>
        <strong>{t("Deck complete!")}</strong>
        <p>{t("Every phrase you marked as known is saved to your profile.")}</p>
        <button
          className="primary-btn"
          onClick={() => {
            setIndex(0);
            setKnown([]);
            setFlipped(false);
          }}
        >
          <RotateCcw size={15} /> {t("Shuffle again")}
        </button>
      </div>
    );
  }

  return (
    <div className="flash-wrap">
      <div className="flash-meta">
        <span>
          {index + 1} / {deck.length}
        </span>
        <div className="flash-track">
          <i style={{ width: `${(index / deck.length) * 100}%` }} />
        </div>
      </div>
      <button
        className={`flash-card ${flipped ? "flipped" : ""}`}
        style={{ "--chip-accent": entry.accent } as React.CSSProperties}
        onClick={() => setFlipped((value) => !value)}
      >
        <span className="flash-face flash-front">
          <small>{t("How do you say")}</small>
          <strong>{t(SLOT_LABELS[card.slot])}</strong>
          <em>{t("in")} {entry.name}?</em>
          <span className="flash-hint">{t("Tap to reveal")}</span>
        </span>
        <span className="flash-face flash-back">
          <strong lang={entry.speechLang}>{card.native}</strong>
          <em>{card.roman}</em>
          <span
            className="flash-hint"
            onClick={(event) => {
              event.stopPropagation();
              speakPhrase(card.native, entry.speechLang);
            }}
          >
            <Volume2 size={13} /> {t("Hear it")}
          </span>
        </span>
      </button>
      <div className="flash-actions">
        <button className="outline-btn" onClick={() => advance(false)}>
          <RotateCcw size={15} /> {t("Not yet")}
        </button>
        <button className="primary-btn" onClick={() => advance(true)}>
          <Check size={16} /> {t("I know this")}
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- listen & guess */

function ListenGame({
  entry,
  voicesReady,
}: {
  entry: LanguageEntry;
  /** Flips true once the platform's async voice list has arrived. */
  voicesReady: boolean;
}) {
  const { t } = useLanguage();
  const deck = useMemo(() => phrasesOf(entry), [entry]);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const voiceReady = useMemo(
    () => voicesReady && hasVoiceFor(entry.speechLang),
    [entry.speechLang, voicesReady],
  );

  const question = useMemo(() => {
    const answer = deck[round % deck.length];
    const others = deck
      .filter((phrase) => phrase.id !== answer.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [answer, ...others].sort(() => Math.random() - 0.5);
    return { answer, options };
    // A new round means a new draw; `deck` changes only when the language does.
  }, [deck, round]);

  useEffect(() => {
    setRound(0);
    setScore(0);
    setPicked(null);
  }, [entry.id]);

  const choose = (id: string) => {
    if (picked) return;
    setPicked(id);
    if (id === question.answer.id) setScore((value) => value + 1);
    setTimeout(() => {
      setPicked(null);
      setRound((value) => value + 1);
    }, 1400);
  };

  return (
    <div className="listen-game">
      <div className="listen-head">
        <span className="eyebrow">{t("Round")} {round + 1}</span>
        <strong>
          {t("Score")}: {score}
        </strong>
      </div>
      {!voiceReady && (
        <p className="listen-note">
          {t("Your device has no")} {entry.name} {t("voice installed, so the phrase is shown instead of spoken.")}
        </p>
      )}
      <button
        className="listen-speaker"
        style={{ "--chip-accent": entry.accent } as React.CSSProperties}
        onClick={() => speakPhrase(question.answer.native, entry.speechLang)}
      >
        <Volume2 size={26} />
        <span>{voiceReady ? t("Play the phrase") : question.answer.native}</span>
      </button>
      <div className="listen-options">
        {question.options.map((option) => {
          const isAnswer = option.id === question.answer.id;
          const state = !picked ? "" : isAnswer ? "right" : option.id === picked ? "wrong" : "dim";
          return (
            <button key={option.id} className={`listen-option ${state}`} onClick={() => choose(option.id)}>
              <span>{t(SLOT_LABELS[option.slot])}</span>
              {picked && isAnswer && <Check size={15} />}
              {picked === option.id && !isAnswer && <X size={15} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ page */

export default function LanguagesPage() {
  const { t } = useLanguage();
  const progress = useProgress();
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(languages[0].id);
  const [mode, setMode] = useState<Mode>("phrasebook");
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [voicesReady, setVoicesReady] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  // Chrome loads its voice list asynchronously; re-render once it arrives so
  // the "no voice installed" notes are accurate rather than pessimistic.
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const update = () => setVoicesReady(true);
    if (window.speechSynthesis.getVoices().length) update();
    window.speechSynthesis.addEventListener("voiceschanged", update);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", update);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return languages;
    return languages.filter((entry) =>
      [entry.name, entry.native, entry.script, entry.family, entry.states.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [query]);

  const active = useMemo(
    () => languages.find((entry) => entry.id === activeId) ?? languages[0],
    [activeId],
  );
  const activePhrases = useMemo(() => phrasesOf(active), [active]);
  const learnedHere = activePhrases.filter((phrase) => progress.greetings.includes(phrase.id)).length;

  const openLanguage = (id: string) => {
    setActiveId(id);
    detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const play = (phrase: Phrase) => {
    setSpeakingId(phrase.id);
    speakPhrase(phrase.native, active.speechLang);
    window.setTimeout(() => setSpeakingId(null), 1600);
  };

  const voiceMissing = voicesReady && !hasVoiceFor(active.speechLang);

  return (
    <main className="content languages-page">
      <section className="lang-hero panel">
        <PanelCorners />
        <div className="lang-hero-copy">
          <span className="eyebrow">{t("Twenty-two official languages, one country")}</span>
          <h1>
            {t("Speak a little")} <em>{t("everywhere")}</em>
          </h1>
          <p>
            {t("Thirteen everyday phrases in twelve languages — written in their own script, transliterated, and spoken aloud. Collect the ones you learn.")}
          </p>
          <div className="lang-hero-stats">
            <div>
              <strong>{languages.length}</strong>
              <span>{t("Languages")}</span>
            </div>
            <div>
              <strong>{languages.length * 13}</strong>
              <span>{t("Phrases")}</span>
            </div>
            <div>
              <strong>{progress.greetings.length}</strong>
              <span>{t("You've learned")}</span>
            </div>
          </div>
        </div>
        <div className="lang-hero-side">
          <div className="search-box lang-search">
            <Search size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("Search a language, script or state...")}
              aria-label={t("Search languages")}
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery("")} aria-label={t("Clear")}>
                <X size={14} />
              </button>
            )}
          </div>
          <ScriptStrip onPick={openLanguage} />
        </div>
      </section>

      <section className="lang-grid">
        {filtered.map((entry) => {
          const total = 13;
          const learned = phrasesOf(entry).filter((phrase) =>
            progress.greetings.includes(phrase.id),
          ).length;
          return (
            <button
              key={entry.id}
              className={`lang-card ${entry.id === activeId ? "active" : ""}`}
              style={{ "--chip-accent": entry.accent } as React.CSSProperties}
              onClick={() => openLanguage(entry.id)}
            >
              <span className="lang-card-native" lang={entry.speechLang}>
                {entry.native}
              </span>
              <strong>{entry.name}</strong>
              <small>{entry.script}</small>
              <span className="lang-card-meta">
                {entry.family} · {entry.speakers}
              </span>
              <span className="lang-card-bar">
                <i style={{ width: `${(learned / total) * 100}%` }} />
              </span>
              <span className="lang-card-count">
                {learned}/{total} {t("learned")}
              </span>
            </button>
          );
        })}
        {!filtered.length && (
          <div className="lang-empty">
            <Sparkles size={20} />
            <strong>{t("No language matched that.")}</strong>
            <p>{t("Try a state name, a script, or part of the language's own name.")}</p>
          </div>
        )}
      </section>

      <section
        className="lang-detail panel"
        ref={detailRef}
        style={{ "--chip-accent": active.accent } as React.CSSProperties}
      >
        <header className="lang-detail-head">
          <div>
            <span className="eyebrow">{active.script} {t("script")} · {active.family}</span>
            <h2>
              <span lang={active.speechLang}>{active.native}</span> <em>{active.name}</em>
            </h2>
            <p>{active.note}</p>
            <div className="lang-tags">
              {active.states.map((state) => (
                <span key={state}>{state}</span>
              ))}
            </div>
          </div>
          <div className="lang-detail-score">
            <strong>{learnedHere}</strong>
            <small>/ {activePhrases.length} {t("learned")}</small>
          </div>
        </header>

        <div className="lang-modes">
          {MODES.map(({ id, label, icon: Icon, blurb }) => (
            <button
              key={id}
              className={mode === id ? "active" : ""}
              onClick={() => setMode(id)}
              title={t(blurb)}
            >
              <Icon size={15} /> {t(label)}
            </button>
          ))}
        </div>

        {voiceMissing && mode === "phrasebook" && (
          <p className="listen-note">
            <Loader2 size={13} /> {t("No")} {active.name}{" "}
            {t("voice is installed on this device — phrases will be read with the closest available voice.")}
          </p>
        )}

        {mode === "phrasebook" && (
          <ul className="phrase-list">
            {activePhrases.map((phrase) => (
              <PhraseRow
                key={phrase.id}
                phrase={phrase}
                entry={active}
                learned={progress.greetings.includes(phrase.id)}
                onLearn={() => learnGreeting(phrase.id)}
                speaking={speakingId === phrase.id}
                onSpeak={() => play(phrase)}
              />
            ))}
          </ul>
        )}

        {mode === "flashcards" && <Flashcards entry={active} />}
        {mode === "listen" && <ListenGame entry={active} voicesReady={voicesReady} />}
      </section>

      <section className="lang-footer panel">
        <ArrowLeftRight size={22} />
        <div>
          <strong>{t("Tip: the whole site speaks your language too")}</strong>
          <p>
            {t("Use the globe in the header to switch the interface into Hindi, Bengali, Assamese or Rajasthani — your AI guide will reply in it as well.")}
          </p>
        </div>
      </section>
    </main>
  );
}
