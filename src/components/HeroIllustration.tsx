import { useEffect, useState } from 'react'

const STAGES = [
  { id: 'idea', label: 'Idea', subhead: 'Phase 01', note: 'Spark a challenge' },
  { id: 'build', label: 'Build', subhead: 'Phase 02', note: '24h prototype' },
  { id: 'launch', label: 'Launch', subhead: 'Phase 03', note: 'Deploy solution' },
  { id: 'pitch', label: 'Pitch', subhead: 'Phase 04', note: 'Jury presentation' },
] as const

export default function HeroIllustration() {
  const [stageIndex, setStageIndex] = useState(0)
  const current = STAGES[stageIndex]

  // Periodic automatic cycle every 4.2 seconds
  useEffect(() => {
    const timer = window.setInterval(() => {
      setStageIndex((prev) => (prev + 1) % STAGES.length)
    }, 4200)
    return () => window.clearInterval(timer)
  }, [])

  const nextStage = () => {
    setStageIndex((prev) => (prev + 1) % STAGES.length)
  }

  return (
    <div
      className="hero-badge"
      role="region"
      aria-label="Ideathon progression stage animation"
      onClick={nextStage}
      title="Click to cycle stages: Idea → Build → Launch → Pitch"
    >
      <div className="hero-badge__header">
        <span className="hero-badge__tag">{current.subhead}</span>
        <div className="hero-badge__dots" aria-hidden="true">
          {STAGES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              className={`hero-badge__dot${idx === stageIndex ? ' hero-badge__dot--active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setStageIndex(idx)
              }}
              aria-label={`Jump to ${s.label} stage`}
            />
          ))}
        </div>
      </div>

      <div className="hero-badge__canvas" key={current.id}>
        {current.id === 'idea' && <IdeaIllustration />}
        {current.id === 'build' && <BuildIllustration />}
        {current.id === 'launch' && <LaunchIllustration />}
        {current.id === 'pitch' && <PitchIllustration />}
      </div>

      <div className="hero-badge__footer">
        <span className="hero-badge__name">{current.label}</span>
        <span className="hero-badge__note">{current.note}</span>
      </div>
    </div>
  )
}

/* ── 01. IDEA (Pulsing Lightbulb) ── */
function IdeaIllustration() {
  return (
    <svg
      className="stage-art stage-art--idea"
      viewBox="0 0 80 80"
      width="72"
      height="72"
      fill="none"
      aria-hidden="true"
    >
      {/* Radiating sunburst rays */}
      <g className="art-rays" stroke="var(--amber)" strokeWidth="2.5" strokeLinecap="round">
        <line x1="40" y1="2" x2="40" y2="8" />
        <line x1="16" y1="12" x2="20" y2="16" />
        <line x1="64" y1="12" x2="60" y2="16" />
        <line x1="6" y1="28" x2="12" y2="28" />
        <line x1="74" y1="28" x2="68" y2="28" />
        <line x1="16" y1="44" x2="21" y2="41" />
        <line x1="64" y1="44" x2="59" y2="41" />
      </g>

      {/* Decorative spark stars */}
      <path
        d="M12,18 L14,21 L17,21 L14,23 L15,26 L12,24 L9,26 L10,23 L7,21 L10,21 Z"
        fill="var(--amber)"
        className="art-spark art-spark--1"
      />
      <path
        d="M66,22 L67.5,24.5 L70,24.5 L67.5,26 L68.5,29 L66,27 L63.5,29 L64.5,26 L62,24.5 L64.5,24.5 Z"
        fill="var(--blue)"
        className="art-spark art-spark--2"
      />

      {/* Bulb body */}
      <path
        d="M26,38 C22,34 20,29 20,24 C20,12.95 28.95,4 40,4 C51.05,4 60,12.95 60,24 C60,29 58,34 54,38 C51.5,41.5 50,46 50,50 L30,50 C30,46 28.5,41.5 26,38 Z"
        fill="#fff9e6"
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Glowing filament */}
      <path
        d="M34,32 L37,20 L43,20 L46,32"
        stroke="var(--amber)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="art-filament"
      />

      {/* Metal screw base */}
      <rect x="31" y="50" width="18" height="4" fill="var(--mist)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="33" y="54" width="14" height="4" fill="var(--mist)" stroke="var(--ink)" strokeWidth="2" />
      <path d="M36,58 L44,58 C44,61 42,63 40,63 C38,63 36,61 36,58 Z" fill="var(--ink)" />
    </svg>
  )
}

/* ── 02. BUILD (Rotating Technical Gears) ── */
function BuildIllustration() {
  return (
    <svg
      className="stage-art stage-art--build"
      viewBox="0 0 80 80"
      width="72"
      height="72"
      fill="none"
      aria-hidden="true"
    >
      {/* Blueprint grid ticks */}
      <g stroke="rgba(0, 95, 158, 0.25)" strokeWidth="1" strokeDasharray="2 2">
        <line x1="8" y1="40" x2="72" y2="40" />
        <line x1="40" y1="8" x2="40" y2="72" />
      </g>

      {/* Main Primary Gear (IEDC Blue) - rotates CW */}
      <g className="art-gear art-gear--cw" transform-origin="32 46">
        <circle cx="32" cy="46" r="18" fill="var(--paper)" stroke="var(--blue)" strokeWidth="3" />
        {/* Teeth */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <rect
            key={deg}
            x="30"
            y="25"
            width="4"
            height="6"
            rx="1"
            fill="var(--blue)"
            transform={`rotate(${deg} 32 46)`}
          />
        ))}
        {/* Center hub */}
        <circle cx="32" cy="46" r="6" fill="var(--mist)" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="32" cy="46" r="2.5" fill="var(--blue)" />
      </g>

      {/* Secondary Gear (Black) - meshed, rotates CCW */}
      <g className="art-gear art-gear--ccw" transform-origin="56 26">
        <circle cx="56" cy="26" r="12" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
        {/* Teeth */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <rect
            key={deg}
            x="54.5"
            y="11.5"
            width="3"
            height="5"
            rx="1"
            fill="var(--ink)"
            transform={`rotate(${deg} 56 26)`}
          />
        ))}
        {/* Center hub */}
        <circle cx="56" cy="26" r="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
      </g>
    </svg>
  )
}

/* ── 03. LAUNCH (Ascending Rocket) ── */
function LaunchIllustration() {
  return (
    <svg
      className="stage-art stage-art--launch"
      viewBox="0 0 80 80"
      width="72"
      height="72"
      fill="none"
      aria-hidden="true"
    >
      {/* Motion trail lines */}
      <g stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.65">
        <line x1="18" y1="62" x2="28" y2="52" />
        <line x1="26" y1="70" x2="36" y2="60" />
        <line x1="12" y1="52" x2="20" y2="44" />
      </g>

      {/* Soaring Rocket Group (angled 45deg) */}
      <g className="art-rocket" transform="translate(42 34) rotate(45) translate(-40 -34)">
        {/* Exhaust Flame */}
        <path
          d="M36,52 Q40,68 40,66 Q40,68 44,52 Z"
          fill="var(--amber)"
          className="art-flame"
        />
        <path
          d="M38,52 Q40,62 40,60 Q40,62 42,52 Z"
          fill="#ff5722"
          className="art-flame art-flame--inner"
        />

        {/* Fins */}
        <path d="M30,42 L24,52 L32,50 Z" fill="var(--ink)" />
        <path d="M50,42 L56,52 L48,50 Z" fill="var(--ink)" />

        {/* Fuselage body */}
        <path
          d="M40,12 C48,22 49,38 48,50 L32,50 C31,38 32,22 40,12 Z"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Nose cone */}
        <path
          d="M40,12 C44,18 46,24 46,26 L34,26 C34,24 36,18 40,12 Z"
          fill="var(--blue)"
        />

        {/* Porthole */}
        <circle cx="40" cy="34" r="5" fill="var(--mist)" stroke="var(--ink)" strokeWidth="2" />
        <path d="M38,32 A3,3 0 0 1 42,32" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Cloud puffs at launch pad */}
      <circle cx="16" cy="66" r="5" fill="var(--mist)" />
      <circle cx="22" cy="70" r="4" fill="var(--mist)" />
    </svg>
  )
}

/* ── 04. PITCH ── */
function PitchIllustration() {
  return (
    <svg
      className="stage-art stage-art--pitch"
      viewBox="0 0 80 80"
      width="72"
      height="72"
      fill="none"
      aria-hidden="true"
    >
      <g className="art-stamp" transform="translate(40 40) rotate(-7) translate(-40 -40)">
        {/* Outer stamp frame */}
        <rect
          x="8"
          y="18"
          width="64"
          height="44"
          rx="3"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="3"
        />
        {/* Inner dashed stamp line */}
        <rect
          x="12"
          y="22"
          width="56"
          height="36"
          rx="2"
          stroke="var(--blue)"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />

        {/* Stamp text & checkmark */}
        <text
          x="40"
          y="34"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight="900"
          fontSize="7.5"
          letterSpacing="0.08em"
          fill="var(--ink)"
        >
          IEDC CEC
        </text>

        <g transform="translate(18 38)">
          {/* Checkmark circle */}
          <circle cx="7" cy="8" r="6" fill="var(--blue)" />
          <path
            d="M4.5,8 L6.5,10 L10,6"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Bold text */}
          <text
            x="17"
            y="11"
            fontFamily="var(--font-display)"
            fontWeight="900"
            fontSize="8.5"
            letterSpacing="0.04em"
            fill="var(--ink)"
          >
            PITCH
          </text>
        </g>
      </g>
    </svg>
  )
}
