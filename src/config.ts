/**
 * SINGLE SOURCE OF TRUTH FOR EVENT DETAILS.
 * Anything set to `null` is unconfirmed and the site shows a clear
 * "to be confirmed" state instead of inventing a value.
 * Fill these in once the organisers confirm them.
 */

export const DOMAIN_KEYS = ['healthcare', 'education', 'agriculture', 'sustainability', 'technology'] as const
export type DomainKey = (typeof DOMAIN_KEYS)[number]

export interface ScheduleItem {
  /** e.g. "09:00 AM". null = not confirmed. */
  time: string | null
  title: string
  detail: string
}

export interface ScheduleDay {
  label: string
  /** e.g. "Saturday, 5 December". null = not confirmed. */
  date: string | null
  items: ScheduleItem[]
}

export const siteConfig = {
  event: {
    name: 'IEDC Idea Sprint 2026',
    format: '24-hour student ideathon',
    organiser: 'IEDC BOOTCAMP CEC',
    institution: 'College of Engineering Chengannur',
  },

  /**
   * Event start as an ISO 8601 string WITH timezone offset.
   * November 21, 2026 at 9:00 AM IST.
   * The sprint lasts 24 hours from this moment until November 22, 2026 at 9:00 AM IST.
   */
  startsAt: '2026-11-21T09:00:00+05:30' as string | null,

  venue: 'SPDK Room, Fifth Floor, College of Engineering Chengannur' as string | null,

  /** Official registration link. If set, the form shows a real link to it. */
  registrationUrl: null as string | null,

  contact: {
    email: null as string | null,
    phone: null as string | null,
  },

  /** Set `url` to a real address to enable a link. */
  socials: [
    { label: 'Instagram', url: 'https://www.instagram.com/iedcbootcampcec' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/iedc-bootcamp-cec' },
  ],

  /**
   * 24-hour ideathon flow for November 21–22, 2026.
   */
  schedule: {
    confirmed: true,
    days: [
      {
        label: 'Day 1',
        date: 'Saturday, 21 November 2026',
        items: [
          { time: '09:00 AM', title: 'Check-in & the 24-hour clock starts', detail: 'Teams arrive at the SPDK Room, collect badges, and the build begins.' },
          { time: '10:00 AM', title: 'Opening session & rules briefing', detail: 'Welcome address, ideathon rules, judging criteria and deliverables.' },
          { time: '11:00 AM', title: 'Theme & problem domain briefing', detail: 'Challenge tracks and problem statements introduced to all participants.' },
          { time: '04:00 PM', title: 'Mentor review round 1', detail: 'Domain mentors circulate to review direction, technical viability and scope.' },
          { time: '10:00 PM', title: 'Midnight milestone check', detail: 'Progress check-in and midnight sprint through the build night.' },
        ],
      },
      {
        label: 'Day 2',
        date: 'Sunday, 22 November 2026',
        items: [
          { time: '07:30 AM', title: 'Final build push', detail: 'Teams polish presentation decks, value propositions and pitch readiness.' },
          { time: '09:00 AM', title: 'Submission freeze (24-hour clock stops)', detail: 'The 24-hour build concludes. All pitches and decks are locked.' },
          { time: '10:00 AM', title: 'Pitch rounds', detail: 'Each team pitches to the judging panel followed by jury Q&A.' },
          { time: '12:30 PM', title: 'Results & valedictory ceremony', detail: 'Winners announced, awards presented and sprint wraps up.' },
        ],
      },
    ] as ScheduleDay[],
  },
}

export const SPRINT_HOURS = 24
export const HOUR = 3_600_000
export const DEMO_OFFSET = 2 * 24 * HOUR + 3 * HOUR + 14 * 60_000

/**
 * Established demonstration event start timestamp, fixed on app load
 * so countdown and schedule stay perfectly in sync throughout the session.
 */
export const DEFAULT_DEMO_START = Date.now() + DEMO_OFFSET

export function getEventStart(): number {
  return siteConfig.startsAt ? Date.parse(siteConfig.startsAt) : DEFAULT_DEMO_START
}

