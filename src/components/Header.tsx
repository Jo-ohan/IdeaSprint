import { useEffect, useState } from 'react'
import logo from '../assets/iedc-logo.png'

const links = [
  { href: '#schedule', label: 'Schedule' },
  { href: '#spark', label: 'Idea Spark' },
  { href: '#register', label: 'Register' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="site-header__inner">
        <a href="#top" className="site-header__brand" aria-label="IEDC BOOTCAMP CEC, back to top">
          <img src={logo} width={560} height={333} alt="IEDC Bootcamp, College of Engineering Chengannur" />
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="site-nav" className="site-nav" data-open={open} aria-label="Primary">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
