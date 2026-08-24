/**
 * One shared, persisted store for everything the traveller earns or saves:
 * culture points, states visited, greetings learned, quiz history, badges and
 * bookmarks. Home, Profile, Quests and Languages all read the same object, so
 * a point earned in a quiz shows up on the profile ring immediately.
 *
 * Deliberately dependency-free: a tiny external store + useSyncExternalStore,
 * mirrored into localStorage on every write.
 */
import { useSyncExternalStore } from "react";

export type AvatarKey =
  | "rajasthan"
  | "assam"
  | "tripura"
  | "kerala"
  | "punjab"
  | "mandala";

export type Profile = {
  name: string;
  avatar: AvatarKey;
  homeState: string;
  tagline: string;
  joined: string;
};

export type QuizResult = {
  /** Quiz pack id, e.g. "rajasthan" or "mixed". */
  pack: string;
  score: number;
  total: number;
  /** ISO timestamp. */
  at: string;
};

export type Bookmark = {
  id: string;
  title: string;
  meta: string;
  kind: "place" | "food" | "culture" | "tradition" | "phrase";
};

export type ProgressState = {
  profile: Profile;
  points: number;
  visited: string[];
  greetings: string[];
  quizzes: QuizResult[];
  badges: string[];
  bookmarks: Bookmark[];
  /** Consecutive days with at least one activity. */
  streak: number;
  lastActive: string;
};

const KEY = "bharat-progress:v1";

const EMPTY: ProgressState = {
  profile: {
    name: "Traveller",
    avatar: "mandala",
    homeState: "",
    tagline: "Collecting stories, one state at a time.",
    joined: new Date().toISOString(),
  },
  points: 0,
  visited: [],
  greetings: [],
  quizzes: [],
  badges: [],
  bookmarks: [],
  streak: 0,
  lastActive: "",
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

/** Earlier builds stored only a bare point total under `bharat-points`. */
function migrateLegacy(base: ProgressState): ProgressState {
  try {
    const legacy = Number(localStorage.getItem("bharat-points") || 0);
    if (legacy > 0) return { ...base, points: legacy };
  } catch {
    /* ignore */
  }
  return base;
}

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return migrateLegacy(EMPTY);
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      ...EMPTY,
      ...parsed,
      profile: { ...EMPTY.profile, ...(parsed.profile ?? {}) },
      visited: parsed.visited ?? [],
      greetings: parsed.greetings ?? [],
      quizzes: parsed.quizzes ?? [],
      badges: parsed.badges ?? [],
      bookmarks: parsed.bookmarks ?? [],
    };
  } catch {
    return EMPTY;
  }
}

let state: ProgressState = load();
const listeners = new Set<() => void>();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — in-memory state still serves the session */
  }
}

function set(next: ProgressState) {
  state = next;
  persist();
  listeners.forEach((listener) => listener());
}

export function subscribeProgress(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getProgress() {
  return state;
}

export function useProgress() {
  return useSyncExternalStore(subscribeProgress, getProgress, getProgress);
}

/* ---------------------------------------------------------------- actions */

/** Every scoring action funnels through here so the day-streak stays honest. */
export function addPoints(amount: number) {
  const day = today();
  let streak = state.streak;
  if (state.lastActive !== day) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    streak = state.lastActive === yesterday ? state.streak + 1 : 1;
  }
  set({ ...state, points: state.points + amount, streak, lastActive: day });
}

export function visitState(name: string) {
  if (state.visited.includes(name)) {
    addPoints(2);
    return;
  }
  set({ ...state, visited: [...state.visited, name] });
  addPoints(10);
  refreshBadges();
}

export function learnGreeting(id: string) {
  if (state.greetings.includes(id)) return;
  set({ ...state, greetings: [...state.greetings, id] });
  addPoints(5);
  refreshBadges();
}

export function recordQuiz(result: QuizResult) {
  set({ ...state, quizzes: [result, ...state.quizzes].slice(0, 50) });
  addPoints(result.score * 10);
  refreshBadges();
}

export function toggleBookmark(item: Bookmark) {
  const exists = state.bookmarks.some((entry) => entry.id === item.id);
  set({
    ...state,
    bookmarks: exists
      ? state.bookmarks.filter((entry) => entry.id !== item.id)
      : [item, ...state.bookmarks],
  });
  if (!exists) addPoints(3);
  refreshBadges();
}

export function updateProfile(patch: Partial<Profile>) {
  set({ ...state, profile: { ...state.profile, ...patch } });
}

export function resetProgress() {
  set({ ...EMPTY, profile: state.profile });
}

/* ----------------------------------------------------------------- badges */

export type BadgeDef = {
  id: string;
  label: string;
  detail: string;
  /** Emoji used as the badge face. */
  face: string;
  earned: (s: ProgressState) => boolean;
};

export const BADGES: BadgeDef[] = [
  { id: "first-step", label: "First Step", detail: "Open your first state guide", face: "\u{1F6A9}", earned: (s) => s.visited.length >= 1 },
  { id: "trio", label: "Trio", detail: "Explore three different states", face: "\u{1F9ED}", earned: (s) => s.visited.length >= 3 },
  { id: "pathfinder", label: "Pathfinder", detail: "Explore five states", face: "\u{1F5FA}\u{FE0F}", earned: (s) => s.visited.length >= 5 },
  { id: "greeter", label: "Greeter", detail: "Learn five phrases", face: "\u{1F64F}", earned: (s) => s.greetings.length >= 5 },
  { id: "polyglot", label: "Polyglot", detail: "Learn fifteen phrases", face: "\u{1F5E3}\u{FE0F}", earned: (s) => s.greetings.length >= 15 },
  { id: "quizzer", label: "Quiz Curious", detail: "Finish your first quiz", face: "\u{1F3AF}", earned: (s) => s.quizzes.length >= 1 },
  { id: "sharp", label: "Sharp Mind", detail: "Score a perfect quiz round", face: "\u{1F3C5}", earned: (s) => s.quizzes.some((q) => q.total > 0 && q.score === q.total) },
  { id: "scholar", label: "Culture Scholar", detail: "Finish five quizzes", face: "\u{1F393}", earned: (s) => s.quizzes.length >= 5 },
  { id: "collector", label: "Collector", detail: "Save five favourites", face: "\u{1F49B}", earned: (s) => s.bookmarks.length >= 5 },
  { id: "regular", label: "Regular", detail: "Keep a three-day streak", face: "\u{1F525}", earned: (s) => s.streak >= 3 },
  { id: "500-club", label: "500 Club", detail: "Earn 500 culture points", face: "\u{2B50}", earned: (s) => s.points >= 500 },
  { id: "legend", label: "Bharat Legend", detail: "Earn 1500 culture points", face: "\u{1F451}", earned: (s) => s.points >= 1500 },
];

/** Recomputes earned badges after any scoring action. */
export function refreshBadges() {
  const earned = BADGES.filter((badge) => badge.earned(state)).map((badge) => badge.id);
  if (earned.length !== state.badges.length) set({ ...state, badges: earned });
}

const LEVEL_TITLES = [
  "Curious Traveller",
  "Wanderer",
  "Story Seeker",
  "Culture Friend",
  "Heritage Explorer",
  "Festival Regular",
  "Atlas Keeper",
  "Bharat Legend",
];

/** Level curve: each level costs a little more than the last. */
export function levelFor(points: number) {
  const level = Math.floor(Math.sqrt(points / 60)) + 1;
  const floor = (level - 1) ** 2 * 60;
  const ceiling = level ** 2 * 60;
  return {
    level,
    floor,
    ceiling,
    progress: ceiling === floor ? 0 : (points - floor) / (ceiling - floor),
    title: LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)],
  };
}
