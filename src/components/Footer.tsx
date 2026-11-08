import { siteConfig } from '../config'

export default function Footer() {
  const { contact, socials, event } = siteConfig
  return (
    <footer className="footer" id="contact">
      <div className="wrap footer__grid">
        <div>
          <p className="footer__name">{event.organiser}</p>
          <p>{event.institution}</p>
          <p className="footer__small">IEDC Idea Sprint 2026 is hosted by {event.organiser}.</p>
        </div>

        <div>
          <h2 className="footer__h">Contact</h2>
          <ul className="footer__list">
            <li>
              Email:{' '}
              {contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : <span className="tbc">To be confirmed</span>}
            </li>
            <li>
              Phone:{' '}
              {contact.phone ? <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a> : <span className="tbc">To be confirmed</span>}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="footer__h">Follow IEDC BOOTCAMP CEC</h2>
          <ul className="footer__list">
            {socials.map((s) => (
              <li key={s.label}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}<span className="sr-only"> (opens in a new tab)</span></a>
                ) : (
                  <span>{s.label}: <span className="tbc">link to be confirmed</span></span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap footer__base">
        <p>© 2026 {event.organiser}. Contact and social details appear here once confirmed.</p>
      </div>
    </footer>
  )
}
