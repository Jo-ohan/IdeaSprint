import { useRef, useState } from 'react'
import { DOMAIN_KEYS, type DomainKey } from '../config'
import { DOMAINS, generateSpark, type Spark } from '../ideas'

type Choice = DomainKey | 'any'

interface Props {
  onUse: (domain: DomainKey) => void
}

export default function IdeaSpark({ onUse }: Props) {
  const [choice, setChoice] = useState<Choice>('healthcare')
  const [spark, setSpark] = useState<Spark | null>(null)
  const [count, setCount] = useState(0)
  const [copied, setCopied] = useState<'idle' | 'done' | 'failed'>('idle')
  const timer = useRef<number | undefined>(undefined)

  const run = (c: Choice = choice) => {
    const domain: DomainKey = c === 'any' ? DOMAIN_KEYS[Math.floor(Math.random() * DOMAIN_KEYS.length)] : c
    setSpark((prev) => generateSpark(domain, prev))
    setCount((n) => n + 1)
    setCopied('idle')
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
        <div className="spark__side">
          <h2 id="spark-title" className="h2">Idea Spark</h2>
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

          <button type="button" className="btn btn--light" onClick={() => run()}>
            {spark ? 'Spark another idea' : 'Generate a problem'}
          </button>
        </div>

        <div className="spark__out">
          <div className="prompt" aria-live="polite" aria-atomic="true">
            {spark ? (
              <>
                <p className="prompt__meta">{DOMAINS[spark.domain].label} prompt</p>
                <p key={count} className="prompt__text">{spark.text}</p>
              </>
            ) : (
              <p className="prompt__empty">Your problem statement appears here. Choose a domain and press generate.</p>
            )}
          </div>
          {spark && (
            <div className="prompt__actions">
              <button type="button" className="btn btn--outline-light" onClick={copy}>
                {copied === 'done' ? 'Copied' : copied === 'failed' ? 'Copy failed, select the text instead' : 'Copy prompt'}
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
