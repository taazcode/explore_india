import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BookMarked,
  Check,
  Compass,
  Flame,
  Languages,
  MapPin,
  Pencil,
  Star,
  Trash2,
  Trophy,
  Volume2,
  X,
} from "lucide-react";
import { useLanguage } from "./components/LanguageContext";
import { PanelCorners } from "./components/Ornaments";
import { drawPath, stateCodes } from "@/data/indiaPaths";
import { stateCodeToName } from "@/data/stateCodes";
import { activeStates } from "@/data/states";
import { allStates } from "./data/allStates";
import { languages, phrasesOf } from "./data/phrases";
import { packsById } from "./data/quiz";
import { describeVoice, GUIDE_VOICES, speak } from "./lib/tts";
import { AVATARS, avatarImage } from "./lib/avatars";
import {
  BADGES,
  levelFor,
  resetProgress,
  toggleBookmark,
  updateProfile,
  useProgress,
} from "./lib/progress";

/** A mandala face for travellers who'd rather not pick a guide portrait. */
function MandalaAvatar({ size = 96 }: { size?: number }) {
  const petals = Array.from({ length: 12 });
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="mandala-avatar" aria-hidden="true">
      <circle cx="50" cy="50" r="49" fill="#fff3e2" />
      {petals.map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="19"
          rx="6"
          ry="15"
          fill={["#e8632c", "#f0a13c", "#c94f2a", "#f2b83f"][i % 4]}
          opacity=".9"
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="16" fill="#fffaf1" />
      <circle cx="50" cy="50" r="16" fill="none" stroke="#c94f2a" strokeWidth="2" />
      <circle cx="50" cy="50" r="6" fill="#c94f2a" />
    </svg>
  );
}

/**
 * The traveller's passport map: every state they've opened is filled in, the
 * rest stay pale. Visited states are clickable and reopen their guide.
 */
function PassportMap({
  visited,
  onOpen,
}: {
  visited: string[];
  onOpen: (name: string) => void;
}) {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div className="passport-map">
      <svg viewBox="-114 -50.4 611.9 695.7" role="img" aria-label="States you have explored">
        {stateCodes.map((code) => {
          const name = stateCodeToName[code] || code;
          const seen = visited.includes(name);
          return (
            <path
              key={code}
              d={drawPath[code]}
              className={`passport-state ${seen ? "seen" : ""} ${hover === code ? "hovered" : ""}`}
              onMouseEnter={() => setHover(code)}
              onMouseLeave={() => setHover(null)}
              onClick={() => seen && onOpen(name)}
              tabIndex={seen ? 0 : -1}
              onKeyDown={(event) => event.key === "Enter" && seen && onOpen(name)}
            >
              <title>{name}</title>
            </path>
          );
        })}
      </svg>
      {hover && <span className="passport-tip">{stateCodeToName[hover] || hover}</span>}
    </div>
  );
}

export default function ProfilePage({
  onOpenState,
  onNavigate,
}: {
  onOpenState: (name: string) => void;
  onNavigate: (view: "explore" | "languages" | "quests" | "culture") => void;
}) {
  const { t } = useLanguage();
  const progress = useProgress();
  const [editing, setEditing] = useState(false);
  const [voiceLabel, setVoiceLabel] = useState<string>("");
  const [speaking, setSpeaking] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const level = levelFor(progress.points);
  const totalPhrases = languages.length * 13;

  const recentQuizzes = progress.quizzes.slice(0, 6);
  const accuracy = useMemo(() => {
    const totals = progress.quizzes.reduce(
      (sum, result) => ({ score: sum.score + result.score, total: sum.total + result.total }),
      { score: 0, total: 0 },
    );
    return totals.total ? Math.round((totals.score / totals.total) * 100) : 0;
  }, [progress.quizzes]);

  const favouriteLanguage = useMemo(() => {
    let best = { name: "", count: 0 };
    for (const entry of languages) {
      const count = phrasesOf(entry).filter((phrase) =>
        progress.greetings.includes(phrase.id),
      ).length;
      if (count > best.count) best = { name: entry.name, count };
    }
    return best;
  }, [progress.greetings]);

  const joined = useMemo(() => {
    const date = new Date(progress.profile.joined);
    return Number.isNaN(date.getTime())
      ? ""
      : date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  }, [progress.profile.joined]);

  const testVoice = async () => {
    setSpeaking(true);
    const line = `Namaste ${progress.profile.name}. Welcome back to Bharat Connect — where would you like to travel today?`;
    await speak(line, { voice: GUIDE_VOICES.default, onEnd: () => setSpeaking(false) });
    setVoiceLabel(await describeVoice());
  };

  const avatar = progress.profile.avatar;

  return (
    <main className="content profile-page">
      <section className="profile-hero panel">
        <PanelCorners />
        <div className="profile-identity">
          <div className="profile-avatar">
            {avatarImage[avatar] ? (
              <img src={avatarImage[avatar]} alt="" />
            ) : (
              <MandalaAvatar />
            )}
            <span className="profile-level-tag">{t("Lv")} {level.level}</span>
          </div>
          <div className="profile-name-block">
            {editing ? (
              <div className="profile-edit">
                <label>
                  {t("Name")}
                  <input
                    ref={nameRef}
                    defaultValue={progress.profile.name}
                    maxLength={28}
                    onChange={(event) => updateProfile({ name: event.target.value || "Traveller" })}
                  />
                </label>
                <label>
                  {t("About you")}
                  <input
                    defaultValue={progress.profile.tagline}
                    maxLength={70}
                    onChange={(event) => updateProfile({ tagline: event.target.value })}
                  />
                </label>
                <label>
                  {t("Home state")}
                  <select
                    value={progress.profile.homeState}
                    onChange={(event) => updateProfile({ homeState: event.target.value })}
                  >
                    <option value="">{t("Not set")}</option>
                    {allStates.map((entry) => (
                      <option key={entry.code} value={entry.name}>
                        {entry.name}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="avatar-picker">
                  <span>{t("Avatar")}</span>
                  <div>
                    {AVATARS.map((option) => (
                      <button
                        key={option.key}
                        className={option.key === avatar ? "active" : ""}
                        onClick={() => updateProfile({ avatar: option.key })}
                        title={option.label}
                        aria-label={option.label}
                      >
                        {option.image ? <img src={option.image} alt="" /> : <MandalaAvatar size={34} />}
                      </button>
                    ))}
                  </div>
                </div>
                <button className="primary-btn" onClick={() => setEditing(false)}>
                  <Check size={15} /> {t("Done")}
                </button>
              </div>
            ) : (
              <>
                <span className="eyebrow">{level.title}</span>
                <h1>{progress.profile.name}</h1>
                <p>{progress.profile.tagline}</p>
                <div className="profile-chips">
                  {progress.profile.homeState && (
                    <span>
                      <MapPin size={13} /> {progress.profile.homeState}
                    </span>
                  )}
                  {joined && (
                    <span>
                      <Compass size={13} /> {t("Travelling since")} {joined}
                    </span>
                  )}
                  <span>
                    <Flame size={13} /> {progress.streak} {t("day streak")}
                  </span>
                </div>
                <button className="outline-btn profile-edit-btn" onClick={() => setEditing(true)}>
                  <Pencil size={14} /> {t("Edit profile")}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="profile-level">
          <div className="level-ring big">
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
              <strong>{progress.points}</strong>
              <small>{t("points")}</small>
            </div>
          </div>
          <p className="level-caption">
            {level.ceiling - progress.points > 0
              ? `${level.ceiling - progress.points} ${t("points to level")} ${level.level + 1}`
              : t("Maximum level reached")}
          </p>
        </div>
      </section>

      <section className="profile-stats">
        {[
          { icon: MapPin, value: `${progress.visited.length}/${allStates.length}`, label: "States explored", tone: "#c2571c" },
          { icon: Languages, value: `${progress.greetings.length}/${totalPhrases}`, label: "Phrases learned", tone: "#7a4b63" },
          { icon: Trophy, value: String(progress.quizzes.length), label: "Quizzes played", tone: "#b8842a" },
          { icon: Star, value: `${accuracy}%`, label: "Quiz accuracy", tone: "#5c7f63" },
        ].map((stat) => (
          <div key={stat.label} className="profile-stat" style={{ "--chip-accent": stat.tone } as React.CSSProperties}>
            <span>
              <stat.icon size={17} />
            </span>
            <strong>{stat.value}</strong>
            <small>{t(stat.label)}</small>
          </div>
        ))}
      </section>

      <section className="profile-grid">
        <div className="panel passport">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">{t("Your passport")}</span>
              <h2>{t("Where you've been")}</h2>
            </div>
            <span className="mini-note">
              {progress.visited.length} {t("stamped")}
            </span>
          </div>
          <PassportMap visited={progress.visited} onOpen={onOpenState} />
          {progress.visited.length ? (
            <div className="passport-list">
              {progress.visited.map((name) => (
                <button key={name} onClick={() => onOpenState(name)}>
                  {name}
                  {activeStates[name] ? <ArrowRight size={12} /> : null}
                </button>
              ))}
            </div>
          ) : (
            <p className="passport-empty">
              {t("No stamps yet. Open a state guide and your map starts filling in.")}{" "}
              <button className="link-btn" onClick={() => onNavigate("explore")}>
                {t("Explore states")} <ArrowRight size={12} />
              </button>
            </p>
          )}
        </div>

        <div className="panel profile-badges">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">{t("Earned along the way")}</span>
              <h2>{t("Badges")}</h2>
            </div>
            <span className="mini-note">
              {progress.badges.length}/{BADGES.length}
            </span>
          </div>
          <div className="badge-grid compact">
            {BADGES.map((badge) => {
              const earned = progress.badges.includes(badge.id);
              return (
                <div key={badge.id} className={`badge-chip ${earned ? "earned" : ""}`} title={badge.detail}>
                  <span className="badge-face">{earned ? badge.face : "?"}</span>
                  <strong>{t(badge.label)}</strong>
                </div>
              );
            })}
          </div>
          <button className="link-btn" onClick={() => onNavigate("quests")}>
            {t("Earn more in Quests")} <ArrowRight size={12} />
          </button>
        </div>

        <div className="panel profile-saved">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">{t("Saved for later")}</span>
              <h2>{t("Your collection")}</h2>
            </div>
            <BookMarked size={19} />
          </div>
          {progress.bookmarks.length ? (
            <ul className="saved-list">
              {progress.bookmarks.map((item) => (
                <li key={item.id}>
                  <span className={`saved-kind ${item.kind}`}>{item.kind}</span>
                  <div>
                    <strong>{t(item.title)}</strong>
                    <small>{t(item.meta)}</small>
                  </div>
                  <button
                    onClick={() => toggleBookmark(item)}
                    aria-label={`${t("Remove")} ${item.title}`}
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="passport-empty">
              {t("Tap the heart on any place, dish or tradition to keep it here.")}{" "}
              <button className="link-btn" onClick={() => onNavigate("culture")}>
                {t("Browse culture")} <ArrowRight size={12} />
              </button>
            </p>
          )}
        </div>

        <div className="panel profile-activity">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">{t("Recent rounds")}</span>
              <h2>{t("Quiz history")}</h2>
            </div>
            <Trophy size={19} />
          </div>
          {recentQuizzes.length ? (
            <ul className="activity-list">
              {recentQuizzes.map((result, index) => {
                const pack = packsById[result.pack];
                const percent = result.total ? Math.round((result.score / result.total) * 100) : 0;
                return (
                  <li key={`${result.at}-${index}`}>
                    <span className="activity-face">{pack?.face ?? "\u{1F3AF}"}</span>
                    <div>
                      <strong>{pack?.label ?? result.pack}</strong>
                      <small>{new Date(result.at).toLocaleDateString()}</small>
                    </div>
                    <span className={`activity-score ${percent >= 75 ? "good" : percent >= 50 ? "ok" : "low"}`}>
                      {result.score}/{result.total}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="passport-empty">
              {t("No rounds played yet.")}{" "}
              <button className="link-btn" onClick={() => onNavigate("quests")}>
                {t("Take a quiz")} <ArrowRight size={12} />
              </button>
            </p>
          )}
          {favouriteLanguage.count > 0 && (
            <p className="activity-note">
              <Languages size={13} /> {t("Most-studied language")}: <strong>{favouriteLanguage.name}</strong> (
              {favouriteLanguage.count} {t("phrases")})
            </p>
          )}
        </div>
      </section>

      <section className="panel profile-settings">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">{t("Preferences")}</span>
            <h2>{t("Voice & data")}</h2>
          </div>
        </div>
        <div className="settings-row">
          <div>
            <strong>{t("Guide voice")}</strong>
            <small>
              {voiceLabel
                ? `${t("Now using")}: ${voiceLabel}`
                : t("Hear how your AI guide sounds on this device.")}
            </small>
          </div>
          <button className="outline-btn" onClick={testVoice} disabled={speaking}>
            <Volume2 size={15} /> {speaking ? t("Speaking…") : t("Test voice")}
          </button>
        </div>
        <div className="settings-row">
          <div>
            <strong>{t("Your progress is stored on this device")}</strong>
            <small>{t("Nothing is uploaded. Clearing it cannot be undone.")}</small>
          </div>
          {confirmReset ? (
            <div className="confirm-row">
              <button
                className="danger-btn"
                onClick={() => {
                  resetProgress();
                  setConfirmReset(false);
                }}
              >
                <Trash2 size={14} /> {t("Yes, clear it")}
              </button>
              <button className="outline-btn" onClick={() => setConfirmReset(false)}>
                {t("Cancel")}
              </button>
            </div>
          ) : (
            <button className="outline-btn" onClick={() => setConfirmReset(true)}>
              <Trash2 size={15} /> {t("Reset progress")}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
