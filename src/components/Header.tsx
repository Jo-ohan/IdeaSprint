import { useEffect, useMemo, useRef, useState } from 'react'
import logo from '../assets/iedc.png'
import { useActiveSection, useScrollProgress } from '../hooks'

/**
 * NAV_LINKS: only sections that actually exist in the page.
 * Home = #top (Hero), Schedule = #schedule, Idea Spark = #spark.
 * Register is kept separate as a CTA, not a nav item.
 */
const NAV_LINKS = [
  { href: '#top',      label: 'Home',       id: 'top'      },
  { href: '#schedule', label: 'Schedule',   id: 'schedule' },
  { href: '#spark',    label: 'Idea Spark', id: 'spark'    },
]

const SECTION_IDS = ['top', 'schedule', 'spark', 'register']

export default function Header() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const progress              = useScrollProgress()
  const activeSection         = useActiveSection(SECTION_IDS)
  const progressPct           = useMemo(() => `${(progress * 100).toFixed(2)}%`, [progress])
  const drawerRef             = useRef<HTMLDivElement>(null)

  /* Scrolled state — tightens header after first scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Escape closes the drawer */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  /* Close mobile nav when viewport resizes to desktop */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 56rem)')
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false) }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  /* Trap focus inside the drawer when open */
  useEffect(() => {
    if (!open) return
    const drawer = drawerRef.current
    if (!drawer) return
    const focusable = drawer.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length) focusable[0].focus()
    const last = focusable[focusable.length - 1]
    const first = focusable[0]
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    drawer.addEventListener('keydown', trap)
    return () => drawer.removeEventListener('keydown', trap)
  }, [open])

  const handleNavClick = () => setOpen(false)

  return (
    <>
      <header
        className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}
        data-open={open}
      >
        {/* Scroll progress bar — preserved from previous iteration */}
        <div
          className="scroll-progress"
          style={{ width: progressPct }}
          aria-hidden="true"
        />

        <a className="skip-link" href="#main">Skip to content</a>

        <div className="site-header__inner">

          {/* ── Brand (left) ── */}
          <a
            href="#top"
            className="site-header__brand"
            aria-label="IEDC BOOTCAMP CEC — back to top"
          >
            <img
              src={logo}
              width={560}
              height={333}
              alt="IEDC Bootcamp, College of Engineering Chengannur"
            />
          </a>

          {/* ── Centred nav container (desktop only) ── */}
          <nav
            id="site-nav-desktop"
            className="site-nav-desktop"
            aria-label="Primary navigation"
          >
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={activeSection === l.id ? 'page' : undefined}
                    className={activeSection === l.id ? 'nav-active' : ''}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Right cluster: CTA + mobile toggle ── */}
          <div className="site-header__right">
            {/* Register CTA — always visible */}
            <a
              href="#register"
              className="header-cta"
              aria-label="Register for Idea Sprint"
            >
              Register ↗
            </a>

            {/* Mobile menu toggle — hidden on desktop */}
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="site-nav-mobile"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <span className={`menu-icon${open ? ' menu-icon--open' : ''}`} aria-hidden="true">
                <span /><span /><span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer (outside the header so it's full-viewport) ── */}
      <div
        id="site-nav-mobile"
        ref={drawerRef}
        className={`mobile-drawer${open ? ' mobile-drawer--open' : ''}`}
        aria-hidden={!open}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
      >
        {/* Backdrop */}
        <div
          className="mobile-drawer__backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        {/* Panel */}
        <div className="mobile-drawer__panel">
          <div className="mobile-drawer__header">
            <span className="mobile-drawer__label">Navigation</span>
            <button
              type="button"
              className="mobile-drawer__close"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <span className={`menu-icon menu-icon--open`} aria-hidden="true">
                <span /><span /><span />
              </span>
            </button>
          </div>

          <nav aria-label="Mobile navigation">
            <ul className="mobile-drawer__links">
              {NAV_LINKS.map((l, i) => (
                <li
                  key={l.href}
                  style={{ '--drawer-i': i } as React.CSSProperties}
                >
                  <a
                    href={l.href}
                    onClick={handleNavClick}
                    aria-current={activeSection === l.id ? 'page' : undefined}
                    className={activeSection === l.id ? 'nav-active' : ''}
                  >
                    <span className="mobile-drawer__link-num">0{i + 1}</span>
                    {l.label}
                  </a>
                </li>
              ))}
              <li style={{ '--drawer-i': NAV_LINKS.length } as React.CSSProperties}>
                <a
                  href="#register"
                  onClick={handleNavClick}
                  className="mobile-drawer__cta"
                  aria-current={activeSection === 'register' ? 'page' : undefined}
                >
                  <span className="mobile-drawer__link-num">0{NAV_LINKS.length + 1}</span>
                  Register ↗
                </a>
              </li>
            </ul>
          </nav>

          <div className="mobile-drawer__footer">
            <p>IEDC BOOTCAMP CEC</p>
            <p>College of Engineering Chengannur</p>
          </div>
        </div>
      </div>
    </>
  )
}
