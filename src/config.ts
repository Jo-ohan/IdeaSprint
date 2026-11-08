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
   * Event start as an ISO 8601 string WITH timezone offset,
   * e.g. '2026-12-05T09:00:00+05:30'. Leave null until confirmed.
   * The sprint lasts 24 hours from this moment.
   */
  startsAt: null as string | null,

  venue: null as string | null,

  /** Official registration link. If set, the form shows a real link to it. */
  registrationUrl: null as string | null,

  contact: {
    email: null as string | null,
    phone: null as string | null,
  },

  /** Set `url` to a real address to enable a link. */
  socials: [
    { label: 'Instagram', url: null as string | null },
    { label: 'LinkedIn', url: null as string | null },
    { label: 'GitHub', url: null as string | null },
    { label: 'Website', url: null as string | null },
  ],

  /**
   * Draft outline of a typical 24-hour ideathon flow.
   * Session names are placeholders and ALL timings are unconfirmed.
   * Set `confirmed: true` once the organisers approve the schedule.
   */
  schedule: {
    confirmed: false,
    days: [
      {
        label: 'Day 1',
        date: null,
        items: [
          { time: null, title: 'Check-in and desk setup', detail: 'Teams arrive, collect passes and find their tables.' },
          { time: null, title: 'Opening session', detail: 'Welcome, format, rules and how judging works.' },
          { time: null, title: 'Theme briefing', detail: 'Domains and problem areas are introduced to all teams.' },
          { time: null, title: 'Team formation', detail: 'Solo participants meet teammates and settle on a problem.' },
          { time: null, title: 'The 24-hour clock starts', detail: 'Build begins. Mentors circulate through the night.' },
        ],
      },
      {
        label: 'Day 2',
        date: null,
        items: [
          { time: null, title: 'Final build push', detail: 'Teams tighten the idea and prepare the pitch.' },
          { time: null, title: 'Submission freeze', detail: 'The 24-hour clock stops. Pitch materials are locked.' },
          { time: null, title: 'Pitch rounds', detail: 'Each team presents to the judges and answers questions.' },
          { time: null, title: 'Results and closing', detail: 'Winners are announced and the sprint wraps up.' },
        ],
      },
    ] as ScheduleDay[],
  },
}

export const SPRINT_HOURS = 24
