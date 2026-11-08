import cecLogo from '../assets/Cec.png'
import iedcLogo from '../assets/iedc.png'
import ksumLogo from '../assets/Kerala.png'
import { siteConfig } from '../config'
import { useInView } from '../hooks'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function Footer() {
  const { event, socials } = siteConfig
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.08 })

  const instagram = socials.find((s) => s.label.toLowerCase() === 'instagram')
  const linkedin = socials.find((s) => s.label.toLowerCase() === 'linkedin')

  return (
    <footer
      ref={ref}
      className={`footer footer--dark reveal-block${inView ? ' revealed' : ''}`}
      id="footer"
    >
      <div className="wrap">
        <div className="footer__grid">
          {/* Left Column: Organisation Identity */}
          <div className="footer__col footer__col--brand">
            <h2 className="footer__name">{event.organiser}</h2>
            <p className="footer__inst">{event.institution}</p>
            <p className="footer__tagline">EXPERIMENT. VALIDATE. BUILD. REPEAT.</p>
          </div>

          {/* Centre Column: Intentionally blank to preserve balanced 3-column composition */}
          <div className="footer__col footer__col--empty" aria-hidden="true" />

          {/* Right Column: Social Media (Only Instagram & LinkedIn) */}
          <div className="footer__col footer__col--social">
            <p className="footer__subhead">CONNECT</p>
            <ul className="footer__social-list">
              <li>
                <a
                  className="footer__link"
                  href={instagram?.url ?? 'https://www.instagram.com/iedcbootcampcec'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram (opens in a new tab)"
                >
                  <InstagramIcon className="footer__icon" />
                  <span className="footer__link-text">Instagram</span>
                </a>
              </li>
              <li>
                <a
                  className="footer__link"
                  href={linkedin?.url ?? 'https://www.linkedin.com/company/iedc-bootcamp-cec'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn (opens in a new tab)"
                >
                  <LinkedinIcon className="footer__icon" />
                  <span className="footer__link-text">LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Institutional Logo Strip */}
        <div className="footer__logos-strip">
          <p className="sr-only">Institutional Affiliation</p>
          <div className="footer__logos">
            <div className="footer__logo-card" title="IEDC BOOTCAMP CEC">
              <img
                src={iedcLogo}
                alt="IEDC BOOTCAMP CEC"
                width={560}
                height={333}
                className="footer__logo-img"
              />
            </div>
            <div className="footer__logo-card" title="Kerala Startup Mission">
              <img
                src={ksumLogo}
                alt="Kerala Startup Mission"
                className="footer__logo-img"
              />
            </div>
            <div className="footer__logo-card" title="College of Engineering Chengannur">
              <img
                src={cecLogo}
                alt="College of Engineering Chengannur"
                className="footer__logo-img"
              />
            </div>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="footer__base">
          <p>© 2026 {event.organiser}</p>
        </div>
      </div>
    </footer>
  )
}
