import { useEffect, useRef, useState } from 'react'

/** Returns Date.now() refreshed every second while `active`. */
export function useNow(active: boolean): number {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!active) return
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [active])
  return now
}

/**
 * Bidirectional scroll-reveal hook.
 * Responds dynamically to both downward and upward scrolling:
 * - Entering viewport: smoothly reveals (inView = true).
 * - Leaving viewport below (on scroll up): smoothly dismisses downward (inView = false).
 * - Re-entering when scrolling back: reveals again cleanly without layout shift.
 */
export function useInView<T extends Element>(
  options: IntersectionObserverInit = { threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Initial check on mount
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
      } else {
        // When element exits through the bottom of the viewport (user scrolled up past it),
        // dismiss it downwards so it can re-animate when user scrolls back down.
        if (entry.boundingClientRect.top > 0) {
          setInView(false)
        }
      }
    }, options)

    observer.observe(el)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, inView]
}

/**
 * Returns the scroll progress ratio (0–1) for the whole page.
 * Uses a passive scroll listener, cleaned up on unmount.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const max = scrollHeight - clientHeight
      setProgress(max > 0 ? scrollTop / max : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return progress
}

/**
 * Returns the id of the section whose top is closest to the viewport top.
 * Updates only on scroll and on initial mount.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')
  useEffect(() => {
    if (ids.length === 0) return
    const update = () => {
      const offset = 80 // header height + a little breathing room
      let best = ids[0]
      let bestDist = Infinity
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top - offset
        // Prefer sections that have scrolled past the offset line
        const dist = Math.abs(top)
        if (top <= 0 && dist < bestDist) {
          bestDist = dist
          best = id
        }
      }
      setActive(best)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(',')])
  return active
}
