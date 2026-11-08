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
 * Tracks the section currently occupying the viewport's activation line.
 * Updates during smooth scrolling, normal scrolling and window resizing.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    if (ids.length === 0) return

    let animationFrame = 0

    const update = () => {
      cancelAnimationFrame(animationFrame)

      animationFrame = requestAnimationFrame(() => {
        const header = document.querySelector('.site-header')
        const headerHeight = header?.getBoundingClientRect().height ?? 80
        const activationLine = Math.max(headerHeight + 28, 100)

        let current = ids[0]

        for (const id of ids) {
          const element = document.getElementById(id)
          if (!element) continue

          if (element.getBoundingClientRect().top <= activationLine) {
            current = id
          } else {
            break
          }
        }

        setActive(current)
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids.join(',')])

  return active
}

