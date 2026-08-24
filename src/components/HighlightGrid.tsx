import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Heart, Sparkles, X } from "lucide-react";
import { exploreImage, type Highlight } from "../data/exploreContent";
import { useLanguage } from "./LanguageContext";
import { toggleBookmark, useProgress, type Bookmark } from "../lib/progress";

/** Maps a gallery section onto the bookmark kinds the profile groups by. */
function bookmarkKind(tag: string): Bookmark["kind"] {
  const value = tag.toLowerCase();
  if (/food|dish|sweet|curry|thali|snack/.test(value)) return "food";
  if (/festival|fair|ritual|puja|mela|tradition/.test(value)) return "tradition";
  if (/dance|music|craft|weav|art|paint|puppet/.test(value)) return "culture";
  return "place";
}

/** The save-to-collection heart shown on every highlight. */
function FavouriteButton({
  item,
  state,
  compact = false,
}: {
  item: GridItem;
  state: string;
  compact?: boolean;
}) {
  const { t } = useLanguage();
  const progress = useProgress();
  const id = `${item.state ?? state}-${item.key}`;
  const saved = progress.bookmarks.some((entry) => entry.id === id);
  return (
    <button
      type="button"
      className={`fav-btn ${saved ? "on" : ""} ${compact ? "compact" : ""}`}
      aria-pressed={saved}
      aria-label={saved ? t("Remove from your collection") : t("Save to your collection")}
      title={saved ? t("Saved") : t("Save")}
      onClick={(event) => {
        event.stopPropagation();
        toggleBookmark({
          id,
          title: item.name,
          meta: `${item.state ?? state} · ${item.meta}`,
          kind: bookmarkKind(item.tag),
        });
      }}
    >
      <Heart size={compact ? 15 : 14} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}

/** A highlight plus, on the all-India gallery, which state it was drawn from. */
export type GridItem = Highlight & { state?: string };
export type OpenHighlight = GridItem & { image?: string };

/**
 * A responsive photo grid, shared by the state experience tabs and the Culture
 * page. Every image sits in a fixed 4:3 box with object-fit: cover, so a card
 * can never stretch its row or spill outside its column, whatever shape the
 * source photo happened to be.
 */
export function HighlightGrid({
  items,
  state,
  eyebrow,
  heading,
  onOpen,
  id,
}: {
  items?: GridItem[];
  state: string;
  eyebrow: string;
  heading: string;
  onOpen: (item: OpenHighlight) => void;
  id?: string;
}) {
  const { t } = useLanguage();

  if (!items?.length) {
    return (
      <div className="grid-empty" id={id}>
        <Sparkles size={22} />
        <strong>{t("Being written right now")}</strong>
        <p>{t("This guide is still being researched. Choose another section in the meantime.")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid-head" id={id}>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{heading}</h2>
      </div>
      <div className="highlight-grid">
        {items.map((item) => {
          const image = exploreImage(item.state ?? state, item.key);
          return (
            // A wrapper rather than a bare button: the heart is itself a
            // button, and buttons cannot legally nest.
            <div className="highlight-card" key={`${item.state ?? state}-${item.key}`}>
              <button
                type="button"
                className="highlight-open"
                onClick={() => onOpen({ ...item, image })}
              >
                <figure>
                  {image ? (
                    <img src={image} alt={t(item.name)} loading="lazy" decoding="async" />
                  ) : (
                    <span className="img-fallback">
                      <Sparkles size={20} />
                    </span>
                  )}
                  <em className="card-tag">{t(item.tag)}</em>
                </figure>
                <div className="highlight-body">
                  <h3>{t(item.name)}</h3>
                  <small>
                    {item.state ? `${t(item.state)} · ` : ""}
                    {t(item.meta)}
                  </small>
                  <p>{t(item.blurb)}</p>
                </div>
              </button>
              <FavouriteButton item={item} state={state} />
            </div>
          );
        })}
      </div>
    </>
  );
}

/** Full-size view of one highlight, opened by clicking any card. */
export function HighlightLightbox({
  item,
  onClose,
}: {
  item: OpenHighlight;
  onClose: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div className="lightbox-backdrop" onClick={onClose} role="presentation">
      <div
        className="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={t(item.name)}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="lightbox-close" onClick={onClose} aria-label={t("Close")}>
          <X size={18} />
        </button>
        <FavouriteButton item={item} state={item.state ?? ""} compact />
        {item.image && <img src={item.image} alt={t(item.name)} />}
        <div className="lightbox-body">
          <span className="eyebrow">
            {item.state ? `${t(item.state)} · ` : ""}
            {t(item.tag)}
          </span>
          <h2>{t(item.name)}</h2>
          <small>{t(item.meta)}</small>
          <p>{t(item.blurb)}</p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
