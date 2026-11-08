import { useInView } from '../hooks'

export default function ClosingCTA() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 })

  return (
    <section
      ref={ref}
      className={`closing-cta reveal-block${inView ? ' revealed' : ''}`}
      aria-label="Closing call to action"
    >
      <div className="wrap">
        <a
          href="#register"
          className="closing-cta__link"
          aria-label="Got an idea? Let's build it. Register for Idea Sprint 2026"
        >
          <div className="closing-cta__intro-row">
            <p className="closing-cta__intro">Got an idea?</p>
            <svg
              className="closing-cta__hand-arrow"
              width="60"
              height="30"
              viewBox="0 0 60 30"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4,18 C20,6 38,8 52,18"
                stroke="var(--blue)"
                strokeWidth="2.2"
                strokeDasharray="4 3"
                strokeLinecap="round"
              />
              <path
                d="M44,18 L52,18 L48,10"
                stroke="var(--blue)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="closing-cta__action">
            <h2 className="closing-cta__heading">LET&apos;S BUILD IT.</h2>
            <span className="closing-cta__arrow-wrap" aria-hidden="true">
              <svg
                className="closing-cta__arrow"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </div>
        </a>
      </div>
    </section>
  )
}

