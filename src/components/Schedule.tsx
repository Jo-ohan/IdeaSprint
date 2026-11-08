import { siteConfig } from '../config'

export default function Schedule() {
  const { days, confirmed } = siteConfig.schedule
  return (
    <section id="schedule" className="section" aria-labelledby="schedule-title">
      <div className="wrap">
        <div className="section__head">
          <h2 id="schedule-title" className="h2">Two days, one 24-hour clock</h2>
          <p className="section__intro">
            The sprint starts on Day 1 and ends on Day 2. Follow the rail from first check-in to the final pitch.
          </p>
        </div>

        {!confirmed && (
          <p className="notice" role="note">
            <strong>Draft outline.</strong> Session names show the usual shape of a 24-hour ideathon. Dates and timings are not confirmed yet and will appear here once announced.
          </p>
        )}

        <div className="days">
          {days.map((day) => (
            <article key={day.label} className="day" aria-label={day.label}>
              <header className="day__head">
                <h3 className="day__name">{day.label}</h3>
                <p className="day__date">{day.date ?? 'Date to be confirmed'}</p>
              </header>
              <ol className="rail">
                {day.items.map((item) => (
                  <li key={item.title} className="rail__item">
                    <p className="rail__time">{item.time ?? 'Time to be confirmed'}</p>
                    <h4 className="rail__title">{item.title}</h4>
                    <p className="rail__detail">{item.detail}</p>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
