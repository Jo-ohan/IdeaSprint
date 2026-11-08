interface TickerItem {
  text: string
  symbol: '✦' | '◆'
}

const ITEMS: TickerItem[] = [
  { text: '24 HOURS. ONE IDEA. BUILD SOMETHING REAL.', symbol: '✦' },
  { text: 'IDEATE', symbol: '◆' },
  { text: 'PROTOTYPE', symbol: '✦' },
  { text: 'PITCH', symbol: '◆' },
  { text: 'NOVEMBER 21, 2026', symbol: '✦' },
  { text: 'MAKER\'S SPACE', symbol: '◆' },
  { text: 'EXPERIMENT · VALIDATE · BUILD · REPEAT', symbol: '✦' },
  { text: 'COLLEGE OF ENGINEERING CHENGANNUR', symbol: '◆' },
]

export default function Marquee() {
  return (
    <div
      className="marquee"
      role="region"
      aria-label="Announcement ticker"
    >
      <div className="marquee__track" aria-hidden="true">
        {/* Render 2 identical groups to form a mathematically seamless -50% infinite loop */}
        <div className="marquee__group">
          {ITEMS.map((item, idx) => (
            <span key={`g1-${idx}`} className="marquee__item">
              <span className="marquee__text">{item.text}</span>
              <span className="marquee__symbol">{item.symbol}</span>
            </span>
          ))}
        </div>
        <div className="marquee__group">
          {ITEMS.map((item, idx) => (
            <span key={`g2-${idx}`} className="marquee__item">
              <span className="marquee__text">{item.text}</span>
              <span className="marquee__symbol">{item.symbol}</span>
            </span>
          ))}
        </div>
      </div>
      {/* Screen-reader accessible alternative */}
      <span className="sr-only">
        IEDC Idea Sprint 2026: 24 Hours. One Idea. Build something real. Ideate, Prototype, Pitch. Saturday, November 21, 2026 at Maker's Space, College of Engineering Chengannur.
      </span>
    </div>
  )
}

