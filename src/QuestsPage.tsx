import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Compass,
  Flame,
  Heart,
  Languages,
  MapPin,
  Puzzle,
  RotateCcw,
  Star,
  Timer,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { useLanguage } from "./components/LanguageContext";
import { PanelCorners } from "./components/Ornaments";
import { drawRound, matchPairs, PACKS, type Question } from "./data/quiz";
import {
  BADGES,
  levelFor,
  recordQuiz,
  useProgress,
  type ProgressState,
} from "./lib/progress";

const SECONDS_PER_QUESTION = 20;
const ROUND_LENGTH = 8;

type Quest = {
  id: string;
  label: string;
  detail: string;
  icon: typeof MapPin;
  goal: number;
  value: (s: ProgressState) => number;
};

const QUESTS: Quest[] = [
  { id: "explore", label: "Explore 5 states", detail: "Open a state guide and meet its AI companion", icon: MapPin, goal: 5, value: (s) => s.visited.length },
  { id: "phrases", label: "Learn 15 phrases", detail: "Collect greetings from the Languages page", icon: Languages, goal: 15, value: (s) => s.greetings.length },
  { id: "quiz", label: "Finish 5 quizzes", detail: "Any pack counts — mix them up", icon: Trophy, goal: 5, value: (s) => s.quizzes.length },
  { id: "saves", label: "Save 8 favourites", detail: "Bookmark places, dishes and traditions", icon: Heart, goal: 8, value: (s) => s.bookmarks.length },
  { id: "streak", label: "Keep a 7-day streak", detail: "Come back each day for something new", icon: Flame, goal: 7, value: (s) => s.streak },
  { id: "points", label: "Reach 500 points", detail: "Everything you do adds culture points", icon: Star, goal: 500, value: (s) => s.points },
];

/* ------------------------------------------------------------- quiz runner */

function QuizRunner({
  packId,
  onExit,
}: {
  packId: string;
  onExit: () => void;
}) {
  const { t } = useLanguage();
  const pack = PACKS.find((entry) => entry.id === packId) ?? PACKS[0];
  const [questions, setQuestions] = useState<Question[]>(() => drawRound(packId, ROUND_LENGTH));
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [seconds, setSeconds] = useState(SECONDS_PER_QUESTION);
  const [finished, setFinished] = useState(false);

  const question = questions[index];

  const next = useCallback(() => {
    // Deliberately not inside a setIndex updater: updaters must stay pure, and
    // finishing the round is a second, separate state change.
    if (index + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setPicked(null);
    setSeconds(SECONDS_PER_QUESTION);
    setIndex(index + 1);
  }, [index, questions.length]);

  const answer = useCallback(
    (choice: number | null) => {
      if (picked !== null || finished) return;
      setPicked(choice ?? -1);
      const correct = choice === question.answer;
      if (correct) {
        setScore((value) => value + 1);
        setStreak((value) => {
          const nextStreak = value + 1;
          setBestStreak((best) => Math.max(best, nextStreak));
          return nextStreak;
        });
      } else {
        setStreak(0);
      }
      window.setTimeout(next, correct ? 1500 : 2400);
    },
    [picked, finished, question, next],
  );

  // Per-question countdown. Running out counts as a miss, which keeps the
  // pace up without ever leaving the round stuck.
  useEffect(() => {
    if (picked !== null || finished) return;
    if (seconds <= 0) {
      answer(null);
      return;
    }
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds, picked, finished, answer]);

  // Banking the result is a side effect of finishing, not of rendering the
  // results screen — guarding on `finished` keeps it to exactly one write.
  useEffect(() => {
    if (!finished) return;
    recordQuiz({ pack: pack.id, score, total: questions.length, at: new Date().toISOString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const restart = () => {
    setQuestions(drawRound(packId, ROUND_LENGTH));
    setIndex(0);
    setPicked(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setSeconds(SECONDS_PER_QUESTION);
    setFinished(false);
  };

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    const verdict =
      percent === 100
        ? "Flawless. You know your India."
        : percent >= 75
          ? "Strong round — barely a wobble."
          : percent >= 50
            ? "Solid. A few more journeys and you'll have it."
            : "Good start. Explore a state or two and try again.";
    return (
      <div className="quiz-result panel" style={{ "--chip-accent": pack.accent } as React.CSSProperties}>
        <PanelCorners />
        <span className="quiz-result-face">{pack.face}</span>
        <span className="eyebrow">{pack.label}</span>
        <div className="quiz-score-ring">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" className="ring-track" />
            <circle
              cx="60"
              cy="60"
              r="52"
              className="ring-value"
              style={{ strokeDasharray: `${(percent / 100) * 327} 327` }}
            />
          </svg>
          <div>
            <strong>
              {score}/{questions.length}
            </strong>
            <small>{percent}%</small>
          </div>
        </div>
        <h2>{t(verdict)}</h2>
        <div className="quiz-result-stats">
          <div>
            <strong>+{score * 10}</strong>
            <small>{t("Culture points")}</small>
          </div>
          <div>
            <strong>{bestStreak}</strong>
            <small>{t("Best streak")}</small>
          </div>
          <div>
            <strong>{questions.length - score}</strong>
            <small>{t("Missed")}</small>
          </div>
        </div>
        <div className="quiz-result-actions">
          <button className="primary-btn" onClick={restart}>
            <RotateCcw size={16} /> {t("Play again")}
          </button>
          <button className="outline-btn" onClick={onExit}>
            {t("Choose another pack")} <ArrowRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-runner panel" style={{ "--chip-accent": pack.accent } as React.CSSProperties}>
      <div className="quiz-top">
        <button className="quiz-exit" onClick={onExit} aria-label={t("Leave quiz")}>
          <X size={16} />
        </button>
        <div className="quiz-progress">
          <span>
            {index + 1} / {questions.length}
          </span>
          <div className="quiz-track">
            <i style={{ width: `${((index + (picked !== null ? 1 : 0)) / questions.length) * 100}%` }} />
          </div>
        </div>
        <div className={`quiz-timer ${seconds <= 5 ? "urgent" : ""}`}>
          <Timer size={14} /> {seconds}s
        </div>
      </div>

      <div className="quiz-badges">
        <span className="quiz-pack-chip">
          {pack.face} {pack.label}
        </span>
        {streak >= 2 && (
          <span className="quiz-streak">
            <Zap size={13} /> {streak} {t("in a row")}
          </span>
        )}
      </div>

      <h2 className="quiz-prompt">{t(question.prompt)}</h2>

      <div className="quiz-options">
        {question.options.map((option, optionIndex) => {
          const isAnswer = optionIndex === question.answer;
          const state =
            picked === null
              ? ""
              : isAnswer
                ? "right"
                : optionIndex === picked
                  ? "wrong"
                  : "dim";
          return (
            <button
              key={option}
              className={`quiz-option ${state}`}
              onClick={() => answer(optionIndex)}
              disabled={picked !== null}
            >
              <span className="quiz-letter">{String.fromCharCode(65 + optionIndex)}</span>
              <span className="quiz-option-text">{t(option)}</span>
              {picked !== null && isAnswer && <Check size={16} />}
              {picked === optionIndex && !isAnswer && <X size={16} />}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <p className="quiz-explain">
          <Compass size={14} /> {t(question.explain)}
        </p>
      )}
    </div>
  );
}

/* --------------------------------------------------------- match mini-game */

function MatchGame() {
  const { t } = useLanguage();
  const [pairs, setPairs] = useState(() => matchPairs(6));
  const [rights, setRights] = useState(() => [...matchPairs(0)]);
  const [pickedLeft, setPickedLeft] = useState<string | null>(null);
  const [solved, setSolved] = useState<string[]>([]);
  const [misses, setMisses] = useState(0);

  const reset = useCallback(() => {
    const next = matchPairs(6);
    setPairs(next);
    setRights([...next].sort(() => Math.random() - 0.5));
    setPickedLeft(null);
    setSolved([]);
    setMisses(0);
  }, []);

  useEffect(reset, [reset]);

  const done = solved.length === pairs.length && pairs.length > 0;

  const pickRight = (id: string) => {
    if (!pickedLeft || solved.includes(id)) return;
    if (pickedLeft === id) {
      setSolved((current) => [...current, id]);
    } else {
      setMisses((value) => value + 1);
    }
    setPickedLeft(null);
  };

  return (
    <div className="match-game panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">{t("Mini game")}</span>
          <h2>{t("Match the greeting")}</h2>
        </div>
        <button className="circle-button" onClick={reset} aria-label={t("New board")}>
          <RotateCcw size={15} />
        </button>
      </div>
      <p className="match-hint">
        {t("Tap a greeting, then tap the language it belongs to.")}{" "}
        {misses > 0 && (
          <em>
            {misses} {t("misses")}
          </em>
        )}
      </p>
      {done ? (
        <div className="match-done">
          <Puzzle size={26} />
          <strong>{t("All matched!")}</strong>
          <p>
            {t("Cleared with")} {misses} {t("misses.")}
          </p>
          <button className="primary-btn" onClick={reset}>
            <RotateCcw size={15} /> {t("New board")}
          </button>
        </div>
      ) : (
        <div className="match-board">
          <div className="match-column">
            {pairs.map((pair) => (
              <button
                key={pair.id}
                className={`match-tile ${solved.includes(pair.id) ? "solved" : ""} ${pickedLeft === pair.id ? "picked" : ""}`}
                style={{ "--chip-accent": pair.accent } as React.CSSProperties}
                onClick={() => !solved.includes(pair.id) && setPickedLeft(pair.id)}
                disabled={solved.includes(pair.id)}
              >
                <em>{pair.leftNative}</em>
                <span>{pair.left}</span>
              </button>
            ))}
          </div>
          <div className="match-column">
            {rights.map((pair) => (
              <button
                key={pair.id}
                className={`match-tile right ${solved.includes(pair.id) ? "solved" : ""}`}
                style={{ "--chip-accent": pair.accent } as React.CSSProperties}
                onClick={() => pickRight(pair.id)}
                disabled={solved.includes(pair.id)}
              >
                <span>{pair.right}</span>
                {solved.includes(pair.id) && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ page */

export default function QuestsPage() {
  const { t } = useLanguage();
  const progress = useProgress();
  const [activePack, setActivePack] = useState<string | null>(null);
  const level = levelFor(progress.points);

  const bestByPack = useMemo(() => {
    const best: Record<string, number> = {};
    for (const result of progress.quizzes) {
      const percent = result.total ? result.score / result.total : 0;
      best[result.pack] = Math.max(best[result.pack] ?? 0, percent);
    }
    return best;
  }, [progress.quizzes]);

  return (
    <main className="content quests-page">
      <section className="quest-hero panel">
        <PanelCorners />
        <div>
          <span className="eyebrow">{t("Play, learn, collect")}</span>
          <h1>
            {t("Quests &")} <em>{t("Culture Quizzes")}</em>
          </h1>
          <p>
            {t("Eight questions a round, twenty seconds each, and a streak bonus for getting them back to back. Everything you score feeds your traveller level.")}
          </p>
        </div>
        <div className="quest-hero-stats">
          <div className="level-ring">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" className="ring-track" />
              <circle
                cx="60"
                cy="60"
                r="52"
                className="ring-value"
                style={{ strokeDasharray: `${level.progress * 327} 327` }}
              />
            </svg>
            <div>
              <small>{t("Level")}</small>
              <strong>{level.level}</strong>
            </div>
          </div>
          <div className="quest-hero-figures">
            <div>
              <strong>{progress.points}</strong>
              <small>{t("Culture points")}</small>
            </div>
            <div>
              <strong>{progress.streak}</strong>
              <small>{t("Day streak")}</small>
            </div>
            <div>
              <strong>{progress.badges.length}</strong>
              <small>{t("Badges")}</small>
            </div>
          </div>
        </div>
      </section>

      {activePack ? (
        <QuizRunner packId={activePack} onExit={() => setActivePack(null)} />
      ) : (
        <>
          <section className="section-heading">
            <span className="ornament">❧</span>
            <h2>{t("Pick your quiz")}</h2>
            <span className="ornament flip">❧</span>
          </section>
          <section className="pack-grid">
            {PACKS.map((pack) => {
              const best = bestByPack[pack.id];
              return (
                <button
                  key={pack.id}
                  className="pack-card"
                  style={{ "--chip-accent": pack.accent } as React.CSSProperties}
                  onClick={() => setActivePack(pack.id)}
                >
                  <span className="pack-face">{pack.face}</span>
                  <strong>{t(pack.label)}</strong>
                  <p>{t(pack.blurb)}</p>
                  <span className="pack-foot">
                    {best !== undefined ? (
                      <em>
                        {t("Best")} {Math.round(best * 100)}%
                      </em>
                    ) : (
                      <em className="fresh">{t("New")}</em>
                    )}
                    <ArrowRight size={14} />
                  </span>
                </button>
              );
            })}
          </section>

          <section className="quests-lower">
            <div className="quest-track panel">
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">{t("Long-running")}</span>
                  <h2>{t("Your quests")}</h2>
                </div>
                <Trophy size={20} />
              </div>
              <div className="quest-list">
                {QUESTS.map((quest) => {
                  const value = Math.min(quest.value(progress), quest.goal);
                  const complete = value >= quest.goal;
                  const Icon = quest.icon;
                  return (
                    <div key={quest.id} className={`quest-item ${complete ? "complete" : ""}`}>
                      <span className="quest-icon">
                        {complete ? <Check size={15} /> : <Icon size={15} />}
                      </span>
                      <div className="quest-body">
                        <strong>{t(quest.label)}</strong>
                        <small>{t(quest.detail)}</small>
                        <span className="quest-bar">
                          <i style={{ width: `${(value / quest.goal) * 100}%` }} />
                        </span>
                      </div>
                      <span className="quest-count">
                        {value}/{quest.goal}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <MatchGame />
          </section>

          <section className="badge-wall panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">{t("Collect them all")}</span>
                <h2>{t("Badge cabinet")}</h2>
              </div>
              <span className="mini-note">
                {progress.badges.length}/{BADGES.length}
              </span>
            </div>
            <div className="badge-grid">
              {BADGES.map((badge) => {
                const earned = progress.badges.includes(badge.id);
                return (
                  <div key={badge.id} className={`badge-chip ${earned ? "earned" : ""}`}>
                    <span className="badge-face">{earned ? badge.face : "?"}</span>
                    <strong>{t(badge.label)}</strong>
                    <small>{t(badge.detail)}</small>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
