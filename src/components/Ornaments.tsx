/**
 * Hand-drawn decorative SVG: the gold corner mandalas that frame every page,
 * and the small cultural icons used by the hero stat row.
 *
 * The corner motif is generated rather than hand-plotted — petals, dots and
 * rings are laid out around the origin with rotate() transforms, and the
 * viewBox clips everything to the +x/+y quadrant, which is what turns a full
 * mandala into a corner ornament.
 */

const GOLD = "#c8891f";

/** A leaf/lens shape running outward from radius `a` to radius `b`. */
function petal(a: number, b: number, w: number) {
  const mid = (a + b) / 2;
  return `M${a} 0 Q${mid} ${w} ${b} 0 Q${mid} ${-w} ${a} 0`;
}

function spread(count: number, from = 0, to = 90) {
  return Array.from({ length: count }, (_, i) =>
    count === 1 ? from : from + ((to - from) * i) / (count - 1),
  );
}

export function CornerMandala({ size = 132 }: { size?: number }) {
  return (
    <svg
      className="corner-mandala"
      width={size}
      height={size}
      viewBox="0 0 116 116"
      fill="none"
      aria-hidden="true"
    >
      <g stroke={GOLD} strokeWidth="1.1" strokeLinecap="round">
        {/* Core rosette */}
        <circle cx="0" cy="0" r="9" fill={GOLD} fillOpacity=".5" stroke="none" />
        <circle cx="0" cy="0" r="15" />
        {spread(6).map((angle) => (
          <path
            key={`in-${angle}`}
            d={petal(15, 33, 8)}
            transform={`rotate(${angle})`}
            fill={GOLD}
            fillOpacity=".22"
          />
        ))}
        <circle cx="0" cy="0" r="38" />
        <circle cx="0" cy="0" r="41.5" strokeOpacity=".55" />

        {/* Outer petal crown */}
        {spread(7).map((angle) => (
          <path key={`mid-${angle}`} d={petal(42, 70, 10.5)} transform={`rotate(${angle})`} />
        ))}
        {spread(6, 7.5, 82.5).map((angle) => (
          <circle key={`dot-${angle}`} cx="56" cy="0" r="2.2" fill={GOLD} stroke="none" transform={`rotate(${angle})`} />
        ))}

        {/* Scalloped rim */}
        <circle cx="0" cy="0" r="74" strokeOpacity=".7" />
        {spread(9).map((angle) => (
          <path key={`tip-${angle}`} d={petal(74, 88, 5.5)} transform={`rotate(${angle})`} strokeOpacity=".8" />
        ))}
        <circle cx="0" cy="0" r="92" strokeOpacity=".45" />

        {/* Fine dotted halo */}
        {spread(11, 4, 86).map((angle) => (
          <circle key={`halo-${angle}`} cx="98" cy="0" r="1.5" fill={GOLD} stroke="none" fillOpacity=".75" transform={`rotate(${angle})`} />
        ))}
      </g>
    </svg>
  );
}

/** A small four-point diamond, used at the midpoint of each frame edge. */
export function FrameDiamond({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 0 L13 7 L20 10 L13 13 L10 20 L7 13 L0 10 L7 7 Z" fill={GOLD} fillOpacity=".85" />
      <circle cx="10" cy="10" r="1.6" fill="#fff" />
    </svg>
  );
}

/**
 * The full-page ornamental frame: four corner mandalas joined by hairline
 * double rules with a diamond at each edge's midpoint. Purely decorative —
 * fixed, non-interactive, and hidden on narrow screens where it would crowd
 * the content.
 */
export function PageFrame() {
  return (
    <div className="page-frame" aria-hidden="true">
      <span className="pf-corner pf-tl"><CornerMandala /></span>
      <span className="pf-corner pf-tr"><CornerMandala /></span>
      <span className="pf-corner pf-bl"><CornerMandala /></span>
      <span className="pf-corner pf-br"><CornerMandala /></span>
      <span className="pf-rule pf-rule-top" />
      <span className="pf-rule pf-rule-bottom" />
      <span className="pf-rule pf-rule-left" />
      <span className="pf-rule pf-rule-right" />
      <span className="pf-gem pf-gem-top"><FrameDiamond /></span>
      <span className="pf-gem pf-gem-bottom"><FrameDiamond /></span>
      <span className="pf-gem pf-gem-left"><FrameDiamond /></span>
      <span className="pf-gem pf-gem-right"><FrameDiamond /></span>
    </div>
  );
}

/**
 * A lighter, in-flow version of the same motif for framing a single panel —
 * corners only, no rules.
 */
export function PanelCorners({ size = 62 }: { size?: number }) {
  return (
    <span className="panel-corners" aria-hidden="true">
      <span className="pc pc-tl"><CornerMandala size={size} /></span>
      <span className="pc pc-tr"><CornerMandala size={size} /></span>
      <span className="pc pc-bl"><CornerMandala size={size} /></span>
      <span className="pc pc-br"><CornerMandala size={size} /></span>
    </span>
  );
}

/* ------------------------------------------------- hero stat-row iconography */

export function IconFort({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M4 29V15l3-2 3 2v-3l6-4 6 4v3l3-2 3 2v14Z" fill="#e8b06a" />
      <path d="M10 29V19h5v10Z" fill="#fffdf7" />
      <path d="M12.5 19a2.5 2.5 0 0 1 2.5 2.5V19Z" fill="#fffdf7" />
      <path d="M17 29v-6h5v6Z" fill="#fffdf7" />
      <path d="M16 4c1.6 0 2.6 1.5 2.6 3.1 0 1.5-1.2 2.4-2.6 2.4s-2.6-.9-2.6-2.4C13.4 5.5 14.4 4 16 4Z" fill="#c2571c" />
      <path d="M16 1.6v3" stroke="#c2571c" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M4 15h4M24 15h4" stroke="#c2571c" strokeWidth="1.2" strokeLinecap="round" opacity=".6" />
      <path d="M7 29V21h3v8ZM22 29v-8h3v8Z" fill="#f3d7ac" />
      <circle cx="16" cy="14" r="1.6" fill="#c2571c" />
    </svg>
  );
}

export function IconGateway({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M5 29V11a11 11 0 0 1 22 0v18Z" fill="#7fb0a3" />
      <path d="M11 29V19a5 5 0 0 1 10 0v10Z" fill="#fffdf7" />
      <path d="M5 11h22" stroke="#3f7a6b" strokeWidth="1.4" />
      <path d="M8 8.5h16" stroke="#3f7a6b" strokeWidth="1.1" opacity=".6" />
      <circle cx="16" cy="5" r="2.2" fill="#f0a13c" />
      <path d="M3 29h26" stroke="#3f7a6b" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="21.5" r="1.5" fill="#7fb0a3" />
    </svg>
  );
}

export function IconScript({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="13" fill="#a58cc9" />
      <path d="M6 11h20" stroke="#fffdf7" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11 11v10c0 2.2 1.6 3.6 3.6 3.6 2 0 3.4-1.3 3.4-3.4V15" stroke="#fffdf7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 11v13" stroke="#fffdf7" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="16" r="13" stroke="#7d64a8" strokeWidth="1.4" />
    </svg>
  );
}

export function IconMandalaStat({ size = 26 }: { size?: number }) {
  const petals = Array.from({ length: 8 });
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {petals.map((_, i) => (
        <ellipse
          key={i}
          cx="16"
          cy="7.5"
          rx="3.4"
          ry="6.5"
          fill={["#e8632c", "#f0a13c", "#c94f2a", "#f2b83f"][i % 4]}
          opacity=".92"
          transform={`rotate(${i * 45} 16 16)`}
        />
      ))}
      <circle cx="16" cy="16" r="5" fill="#fff7ea" />
      <circle cx="16" cy="16" r="5" stroke="#c2571c" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="1.9" fill="#c2571c" />
    </svg>
  );
}
