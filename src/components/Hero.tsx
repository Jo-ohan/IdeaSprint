import { useState } from 'react'
import { siteConfig, SPRINT_HOURS } from '../config'
import { useNow } from '../hooks'

type Phase = 'tba' | 'upcoming' | 'live' | 'ended'

const HOUR = 3_600_000
const DEMO_OFFSET = 2 * 24 * HOUR + 3 * HOUR + 14 * 60_000 // demo only

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

function formatStart(ms: number) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(ms))
}

export default function Hero() {
  const configured = siteConfig.startsAt ? Date.parse(siteConfig.startsAt) : NaN
  const [demoStart, setDemoStart] = useState<number | null>(null)
  const start = demoStart ?? configured
  const hasDate = Number.isFinite(start)
  const now = useNow(hasDate)
  const isDemo = demoStart !== null

  let phase: Phase = 'tba'
  if (hasDate) {
    if (now < start) phase = 'upcoming'
    else if (now < start + SPRINT_HOURS * HOUR) phase = 'live'
    else phase = 'ended'
  }

  const target = phase === 'live' ? start + SPRINT_HOURS * HOUR : start
  const t = split(target - now)
  const elapsed = phase === 'live' ? Math.floor((now - start) / HOUR) : phase === 'ended' ? SPRINT_HOURS : 0

  const barLabel =
    phase === 'live'
      ? `${elapsed} of ${SPRINT_HOURS} hours elapsed`
      : phase === 'ended'
        ? 'All 24 hours complete'
        : 'A 24-hour sprint, one bar for each hour'

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <p className="hero__presenter">{siteConfig.event.organiser} presents</p>
        <h1 id="hero-title" className="hero__title">
          <span>Idea</span>
          <span>Sprint</span>
          <span className="hero__year">2026</span>
        </h1>

        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__lede">
              A 24-hour student ideathon. Choose a real problem, form a team and build an idea worth pitching before the clock runs out.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#register">Register for Idea Sprint</a>
              <a className="btn btn--ghost" href="#schedule">See the schedule</a>
            </div>
          </div>

          <div className="clock" data-phase={phase}>
            {phase === 'tba' && (
              <>
                <p className="clock__title">Event date to be announced</p>
                <p className="clock__note">
                  The countdown starts as soon as IEDC BOOTCAMP CEC confirms the date. Nothing here is a guess.
                </p>
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setDemoStart(Date.now() + DEMO_OFFSET)}
                >
                  Preview how the countdown will look
                </button>
              </>
            )}

            {(phase === 'upcoming' || phase === 'live') && (
              <>
                <p className="clock__title">{phase === 'live' ? 'The sprint is live. Time left' : 'Sprint starts in'}</p>
                <div className="clock__digits" role="timer" aria-label="Countdown">
                  {(
                    [
                      ['Days', t.days],
                      ['Hours', t.hours],
                      ['Min', t.minutes],
                      ['Sec', t.seconds],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label}>
                      <span className="clock__num">{pad(value)}</span>
                      <span className="clock__unit">{label}</span>
                    </div>
                  ))}
                </div>
                {isDemo && (
                  <p className="clock__note clock__note--demo">
                    Demo preview with a made-up date. This is not the real event date.{' '}
                    <button type="button" className="link-button" onClick={() => setDemoStart(null)}>
                      Exit preview
                    </button>
                  </p>
                )}
              </>
            )}

            {phase === 'ended' && <p className="clock__title">This sprint has ended. Thank you for building.</p>}
          </div>
          <dl className="facts">
            <div>
              <dt>Format</dt>
              <dd>24 hours, in teams</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{hasDate && !isDemo ? formatStart(start) : 'To be confirmed'}</dd>
            </div>
            <div>
              <dt>Venue</dt>
              <dd>{siteConfig.venue ?? 'To be confirmed'}</dd>
            </div>
          </dl>
        </div>

        <div className="hours" role="img" aria-label={barLabel}>
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
