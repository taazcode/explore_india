/**
 * Avatar artwork, keyed by the AvatarKey stored on the profile.
 *
 * Lives apart from ProfilePage so the header can read it without importing a
 * page component (and so both files stay Fast-Refresh friendly).
 */
import type { AvatarKey } from "./progress";
import rajasthanGuide from "../assets/guides/rajasthan-hero.jpg";
import assamGuide from "../assets/guides/assam-portrait.jpg";
import tripuraGuide from "../assets/guides/tripura-portrait.jpg";
import keralaGuide from "../assets/guides/kerala-card.jpg";
import punjabGuide from "../assets/guides/punjab-card.jpg";

export const avatarImage: Partial<Record<AvatarKey, string>> = {
  rajasthan: rajasthanGuide,
  assam: assamGuide,
  tripura: tripuraGuide,
  kerala: keralaGuide,
  punjab: punjabGuide,
};

/** The pickable avatars, in the order the profile editor shows them. */
export const AVATARS: { key: AvatarKey; label: string; image?: string }[] = (
  [
    { key: "mandala", label: "Mandala" },
    { key: "rajasthan", label: "Aarav" },
    { key: "assam", label: "Maya" },
    { key: "tripura", label: "Bikash" },
    { key: "kerala", label: "Kerala" },
    { key: "punjab", label: "Punjab" },
  ] satisfies { key: AvatarKey; label: string }[]
).map((entry) => ({ ...entry, image: avatarImage[entry.key] }));
