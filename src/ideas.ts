import type { DomainKey } from './config'

interface Scenario {
  who: string
  goal: string
}
interface Domain {
  label: string
  scenarios: Scenario[]
  twists: string[]
}

/** Creative prompts only. These are NOT official Idea Sprint challenges. */
export const DOMAINS: Record<DomainKey, Domain> = {
  healthcare: {
    label: 'Healthcare',
    scenarios: [
      { who: 'patients in remote villages', goal: 'reach a doctor without a long journey' },
      { who: 'elderly people living alone', goal: 'take the right medicines at the right time' },
      { who: 'nurses on night shifts', goal: 'hand over patient notes without errors' },
      { who: 'first-time mothers', goal: 'get trustworthy advice between clinic visits' },
      { who: 'community health workers', goal: 'spot early warning signs using only a basic phone' },
    ],
    twists: [
      'the internet is unreliable',
      'it has to cost almost nothing to run',
      'many users are not comfortable reading English',
      'the user has never used a smartphone app before',
    ],
  },
  education: {
    label: 'Education',
    scenarios: [
      { who: 'students preparing for exams without tuition', goal: 'find out exactly which topics they are weak in' },
      { who: 'teachers with sixty students in one class', goal: 'notice who is quietly falling behind' },
      { who: 'first-generation college students', goal: 'find mentors and internships' },
      { who: 'school children in low-bandwidth areas', goal: 'keep learning when school is closed' },
      { who: 'final-year engineering students', goal: 'build projects that employers can actually see' },
    ],
    twists: [
      'one phone is shared by the whole household',
      'teachers have no time to learn a new tool',
      'it must keep working offline for days',
      'it has to motivate learners without marks or rewards',
    ],
  },
  agriculture: {
    label: 'Agriculture',
    scenarios: [
      { who: 'smallholder farmers', goal: 'decide when to sow and harvest as the weather shifts' },
      { who: 'coconut and spice growers', goal: 'sell directly without losing most of the margin to middlemen' },
      { who: 'farm workers', goal: 'stay safe from heat and pesticide exposure' },
      { who: 'vegetable sellers', goal: 'cut spoilage between the farm and the market' },
      { who: 'paddy farmers in flood-prone areas', goal: 'recover quickly after a flood' },
    ],
    twists: [
      'users prefer speaking to typing',
      'there is no signal in the fields',
      'it must earn trust from people who have seen many failed schemes',
      'everything has to run on solar power',
    ],
  },
  sustainability: {
    label: 'Sustainability',
    scenarios: [
      { who: 'ordinary households', goal: 'cut food and plastic waste without extra effort' },
      { who: 'campus hostels', goal: 'reduce their energy and water use' },
      { who: 'small neighbourhood shops', goal: 'switch to reusable packaging' },
      { who: 'coastal communities', goal: 'keep beaches and backwaters clean' },
      { who: 'residents of a single street', goal: 'turn their waste into something of value' },
    ],
    twists: [
      'people will only change habits if it saves them money',
      'no new hardware can be installed',
      'progress has to be visible within one week',
      'most users live in rented homes',
    ],
  },
  technology: {
    label: 'Technology',
    scenarios: [
      { who: 'small business owners', goal: 'go digital without hiring a developer' },
      { who: 'people with visual impairments', goal: 'use everyday apps independently' },
      { who: 'students', goal: 'spot misinformation before they share it' },
      { who: 'local government offices', goal: 'track citizen requests openly' },
      { who: 'first-time internet users', goal: 'stay safe from online scams' },
    ],
    twists: [
      'it has to work with a keyboard and a screen reader',
      'all data must stay on the user’s own device',
      'it must run on a five-year-old phone',
      'a stranger should understand it in under a minute',
    ],
  },
}

export interface Spark {
  domain: DomainKey
  text: string
}

function pick<T>(list: T[], avoid?: T): T {
  if (list.length === 1) return list[0]
  let item = list[Math.floor(Math.random() * list.length)]
  while (item === avoid) item = list[Math.floor(Math.random() * list.length)]
  return item
}

export function generateSpark(domain: DomainKey, previous?: Spark | null): Spark {
  const d = DOMAINS[domain]
  const scenario = pick(d.scenarios)
  const twist = pick(d.twists)
  const text = `How might we help ${scenario.who} ${scenario.goal}, even when ${twist}?`
  if (previous && previous.text === text) return generateSpark(domain, previous)
  return { domain, text }
}
