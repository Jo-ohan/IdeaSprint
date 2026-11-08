import { useEffect, useRef, useState } from 'react'
import { getEventStart, HOUR, siteConfig, SPRINT_HOURS } from '../config'
import { useNow } from '../hooks'
import HeroIllustration from './HeroIllustration'

type Phase = 'upcoming' | 'live' | 'ended'

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Flip digit: subtle upward transition when value changes */
function ClockDigit({ value, label }: { value: number; label: string }) {
  const formatted = pad(value)
  const prevRef = useRef(formatted)
  const [flipping, setFlipping] = useState(false)
  const flipKey = useRef(0)

  useEffect(() => {
    if (prevRef.current !== formatted) {
      prevRef.current = formatted
      flipKey.current += 1
      setFlipping(true)
      const id = window.setTimeout(() => setFlipping(false), 280)
      return () => window.clearTimeout(id)
    }
  }, [formatted])

  return (
    <div className="clock__cell">
      <span
        className={`clock__num${flipping ? ' clock__num--flip' : ''}`}
        key={flipKey.current}
        aria-live="off"
      >
        {formatted}
      </span>
      <span className="clock__unit">{label}</span>
    </div>
  )
}

export default function Hero() {
  const start = getEventStart()
  const now = useNow(true)

  let phase: Phase = 'upcoming'
  if (now < start) phase = 'upcoming'
  else if (now < start + SPRINT_HOURS * HOUR) phase = 'live'
  else phase = 'ended'

  const target = phase === 'live' ? start + SPRINT_HOURS * HOUR : start
  const t = split(target - now)
  const elapsed = phase === 'live' ? Math.floor((now - start) / HOUR) : phase === 'ended' ? SPRINT_HOURS : 0

  const barLabel =
    phase === 'live'
      ? `${elapsed} of ${SPRINT_HOURS} hours elapsed`
      : phase === 'ended'
        ? 'All 24 hours complete'
        : 'A 24-hour sprint, one bar for each hour'

  const countdownHeading =
    phase === 'live'
      ? 'SPRINT IS LIVE — TIME LEFT'
      : phase === 'ended'
        ? 'SPRINT HAS ENDED'
        : 'SPRINT STARTS IN'

  return (
    <section id="top" className="hero hero--animate grid-texture" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero__header-row">
          <p className="hero__presenter hero__anim hero__anim--1">
            {siteConfig.event.organiser} presents
          </p>
          <div className="hero__illustration-box hero__anim hero__anim--1">
            <HeroIllustration />
          </div>
        </div>

        <h1 id="hero-title" className="hero__title hero__anim hero__anim--2">
          <span>Idea</span>
          <span>Sprint</span>
          <span className="hero__year">2026</span>
        </h1>

        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__lede hero__anim hero__anim--3">
              A 24-hour student ideathon. Choose a real problem, form a team and build an idea worth pitching before the clock runs out.
            </p>
            <div className="hero__actions hero__anim hero__anim--4">
              <a className="btn btn--primary" href="#register">Register for Idea Sprint ↗</a>
              <a className="btn btn--ghost" href="#schedule">See the schedule</a>
            </div>

            {/* Hand-drawn directional arrow connecting CTA to supporting note */}
            <div className="hero__doodle hero__anim hero__anim--4" aria-hidden="true">
              <svg className="hero__doodle-arrow" width="56" height="32" viewBox="0 0 56 32" fill="none">
                <path
                  d="M6,8 C18,24 34,26 48,14"
                  stroke="var(--blue)"
                  strokeWidth="2.2"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                />
                <path
                  d="M40,14 L48,14 L46,22"
                  stroke="var(--blue)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hero__doodle-text">24 hours · build &amp; pitch</span>
            </div>
          </div>

          <div className="clock hero__anim hero__anim--5" data-phase={phase} aria-label="Event countdown">
            <h2 className="clock__title">{countdownHeading}</h2>
            <div className="clock__digits" role="timer" aria-label="Countdown">
              <ClockDigit value={t.days} label="Days" />
              <ClockDigit value={t.hours} label="Hours" />
              <ClockDigit value={t.minutes} label="Minutes" />
              <ClockDigit value={t.seconds} label="Seconds" />
            </div>
          </div>

          <dl className="facts hero__anim hero__anim--6">
            <div>
              <dt>Duration</dt>
              <dd>24 hours</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>Saturday, 21 November 2026 — 9:00 AM IST</dd>
            </div>
            <div>
              <dt>Venue</dt>
              <dd>{siteConfig.venue ?? 'To be confirmed'}</dd>
            </div>
          </dl>
        </div>

        <div className="hours hero__anim hero__anim--7" role="img" aria-label={barLabel}>
          <div className="hours__label">THE 24-HOUR SPRINT</div>
          <div className="hours__bars" aria-hidden="true">
            {Array.from({ length: SPRINT_HOURS }, (_, i) => (
              <span
                key={i}
                style={{ ['--i' as string]: i }}
                data-state={i < elapsed ? 'done' : i === elapsed && phase === 'live' ? 'now' : 'idle'}
              />
            ))}
          </div>
          <div className="hours__scale" aria-hidden="true">
            <span>Hour 1</span>
            <span>Hour 12</span>
            <span>Hour 24</span>
          </div>
        </div>
      </div>
    </section>
  )
}
