import { useRef, useState } from 'react'
import { DOMAIN_KEYS, type DomainKey } from '../config'
import { DOMAINS, generateSpark, type Spark } from '../ideas'
import { useInView } from '../hooks'

type Choice = DomainKey | 'any'

interface Props {
  onUse: (domain: DomainKey) => void
}

export default function IdeaSpark({ onUse }: Props) {
  const [choice, setChoice] = useState<Choice>('healthcare')
  const [spark, setSpark] = useState<Spark | null>(null)
  const [count, setCount] = useState(0)
  const [copied, setCopied] = useState<'idle' | 'done' | 'failed'>('idle')
  const [generating, setGenerating] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const genTimer = useRef<number | undefined>(undefined)

  const [headRef, headInView] = useInView<HTMLDivElement>({ threshold: 0.15 })
  const [sideRef, sideInView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [outRef, outInView] = useInView<HTMLDivElement>({ threshold: 0.05 })

  const run = (c: Choice = choice) => {
    const domain: DomainKey = c === 'any' ? DOMAIN_KEYS[Math.floor(Math.random() * DOMAIN_KEYS.length)] : c
    setGenerating(true)
    setCopied('idle')
    // Brief generating state for feedback — 180ms, then reveal
    window.clearTimeout(genTimer.current)
    genTimer.current = window.setTimeout(() => {
      setSpark((prev) => generateSpark(domain, prev))
      setCount((n) => n + 1)
      setGenerating(false)
    }, 180)
  }

  const copy = async () => {
    if (!spark) return
    try {
      await navigator.clipboard.writeText(spark.text)
      setCopied('done')
    } catch {
      setCopied('failed')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied('idle'), 2500)
  }

  return (
    <section id="spark" className="section section--blue" aria-labelledby="spark-title">
      <div className="wrap spark">
        <div
          ref={sideRef}
          className={`spark__side reveal-block${sideInView ? ' revealed' : ''}`}
        >
          <div ref={headRef}>
            <h2
              id="spark-title"
              className={`h2 reveal-block${headInView ? ' revealed' : ''}`}
            >
              Idea Spark
            </h2>
          </div>
          <p className="section__intro">
            Stuck for a starting point? Pick a domain and get a problem to think about. These are creative prompts for practice, not official Idea Sprint challenges.
          </p>

          <fieldset className="chips">
            <legend>Choose a domain</legend>
            {[...DOMAIN_KEYS, 'any' as const].map((key) => (
              <label key={key} className="chip">
                <input
                  type="radio"
                  name="domain"
                  value={key}
                  checked={choice === key}
                  onChange={() => {
                    setChoice(key)
                    if (spark) run(key)
                  }}
                />
                <span>{key === 'any' ? 'Surprise me' : DOMAINS[key].label}</span>
              </label>
            ))}
          </fieldset>

          <div className="spark__action-row">
            <button
              type="button"
              className={`btn btn--outline-light${generating ? ' --generating' : ''}`}
              onClick={() => run()}
              disabled={generating}
            >
              {generating ? 'Generating…' : spark ? 'Spark another idea' : 'Generate a problem'}
            </button>
            <div className="spark__doodle" aria-hidden="true">
              <svg className="spark__doodle-arrow" width="56" height="32" viewBox="0 0 56 32" fill="none">
                <path
                  d="M6,8 C18,24 34,26 48,14"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                  strokeLinecap="round"
                />
                <path
                  d="M40,14 L48,14 L46,22"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="spark__doodle-text">instant creative prompt</span>
            </div>
          </div>
        </div>

        <div
          ref={outRef}
          className={`spark__out reveal-block${outInView ? ' revealed' : ''}`}
          style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
        >
          <div
            className={`prompt${generating ? ' prompt--generating' : ''}`}
            aria-live="polite"
            aria-atomic="true"
          >
            {spark && !generating ? (
              <>
                <div className="prompt__meta-wrap">
                  <p className="prompt__meta">{DOMAINS[spark.domain].label} prompt</p>
                  <span className="prompt__badge-spark" key={count} aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12,2 C12,2 14,7 19,9 C14,11 12,16 12,16 C12,16 10,11 5,9 C10,7 12,2 12,2 Z"
                        fill="var(--amber)"
                      />
                      <circle cx="18" cy="4" r="1.5" fill="#fff" />
                      <circle cx="5" cy="15" r="1.2" fill="#fff" />
                    </svg>
                  </span>
                </div>
                <p key={count} className="prompt__text">{spark.text}</p>
              </>
            ) : generating ? (
              <p className="prompt__empty prompt__empty--generating" aria-hidden="true">
                <span className="gen-dots"><span /><span /><span /></span>
              </p>
            ) : (
              <p className="prompt__empty">Your problem statement appears here. Choose a domain and press generate.</p>
            )}
          </div>
          {spark && !generating && (
            <div className="prompt__actions">
              <button type="button" className="btn btn--outline-light" onClick={copy}>
                {copied === 'done' ? 'Copied ✓' : copied === 'failed' ? 'Copy failed — select the text instead' : 'Copy prompt'}
              </button>
              <a className="btn btn--outline-light" href="#register" onClick={() => onUse(spark.domain)}>
                Register with this domain
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
