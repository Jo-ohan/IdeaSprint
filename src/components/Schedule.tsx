import { getEventStart, siteConfig } from '../config'
import { useInView } from '../hooks'

function formatScheduleDay(startMs: number, dayIndex: number): string {
  const d = new Date(startMs + dayIndex * 24 * 3600 * 1000)
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Asia/Kolkata',
  }).format(d)
}

function RailItem({ item, index }: { item: typeof siteConfig.schedule.days[0]['items'][0]; index: number }) {
  const [ref, inView] = useInView<HTMLLIElement>({ threshold: 0.1, rootMargin: '0px 0px -32px 0px' })
  return (
    <li
      ref={ref}
      className={`rail__item reveal-item${inView ? ' revealed' : ''}`}
      style={{ '--reveal-delay': `${index * 80}ms` } as React.CSSProperties}
    >
      <p className="rail__time">{item.time ?? 'Time to be confirmed'}</p>
      <h4 className="rail__title">{item.title}</h4>
      <p className="rail__detail">{item.detail}</p>
    </li>
  )
}

export default function Schedule() {
  const { days } = siteConfig.schedule
  const [headRef, headInView] = useInView<HTMLDivElement>({ threshold: 0.15 })
  const eventStart = getEventStart()

  return (
    <section id="schedule" className="section" aria-labelledby="schedule-title">
      <div className="wrap">
        <div
          ref={headRef}
          className={`section__head reveal-block${headInView ? ' revealed' : ''}`}
        >
          <div className="section__head-title-wrap">
            <h2 id="schedule-title" className="h2">Two days, one 24-hour clock</h2>
            <svg
              className="schedule__flow-arrow"
              width="44"
              height="36"
              viewBox="0 0 44 36"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6,10 C18,8 30,16 34,26"
                stroke="var(--blue)"
                strokeWidth="2.5"
                strokeDasharray="4 3"
                strokeLinecap="round"
              />
              <path
                d="M26,24 L34,26 L36,18"
                stroke="var(--blue)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="section__intro">
            The sprint starts on Day 1 and ends on Day 2. Follow the rail from first check-in to the final pitch.
          </p>
        </div>

        <div className="days">
          {days.map((day, dayIndex) => (
            <article key={day.label} className="day" aria-label={day.label}>
              <header className="day__head">
                <h3 className="day__name">{day.label}</h3>
                <p className="day__date">{day.date ?? formatScheduleDay(eventStart, dayIndex)}</p>
              </header>
              <ol className="rail">
                {day.items.map((item, i) => (
                  <RailItem key={item.title} item={item} index={i} />
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
