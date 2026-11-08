import { useEffect, useRef, useState, type FormEvent } from 'react'
import { DOMAIN_KEYS, siteConfig, type DomainKey } from '../config'
import { DOMAINS } from '../ideas'

interface Props {
  presetDomain: DomainKey | ''
}

interface Values {
  name: string
  email: string
  phone: string
  college: string
  department: string
  year: string
  domain: string
  teamStatus: string
  teamName: string
  confirm: boolean
}

type Errors = Partial<Record<keyof Values, string>>

const empty: Values = {
  name: '', email: '', phone: '', college: '', department: '',
  year: '', domain: '', teamStatus: '', teamName: '', confirm: false,
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Enter your full name.'
  if (!v.email.trim()) e.email = 'Enter your email address.'
  else if (!EMAIL.test(v.email.trim())) e.email = 'Enter a valid email, like name@example.com.'
  const digits = v.phone.replace(/[\s-]/g, '').replace(/^(\+91|0)/, '')
  if (!digits) e.phone = 'Enter your mobile number.'
  else if (!/^[6-9]\d{9}$/.test(digits)) e.phone = 'Enter a 10-digit Indian mobile number.'
  if (!v.college.trim()) e.college = 'Enter your college name.'
  if (!v.department.trim()) e.department = 'Enter your department or course.'
  if (!v.year) e.year = 'Select your year of study.'
  if (!v.teamStatus) e.teamStatus = 'Tell us whether you have a team.'
  if (!v.confirm) e.confirm = 'Tick the box to confirm your details.'
  return e
}

const ORDER: (keyof Values)[] = ['name', 'email', 'phone', 'college', 'department', 'year', 'teamStatus', 'confirm']

export default function Registration({ presetDomain }: Props) {
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (presetDomain) setValues((v) => ({ ...v, domain: presetDomain }))
  }, [presetDomain])

  useEffect(() => {
    if (done) doneRef.current?.focus()
  }, [done])

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value }
    setValues(next)
    if (submitted) setErrors(validate(next))
  }

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setSubmitted(true)
    const first = ORDER.find((k) => errs[k])
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setDone(true)
  }

  const errorCount = Object.keys(errors).length
  const err = (k: keyof Values) => errors[k]
  const field = (k: keyof Values) => ({
    name: k,
    'aria-invalid': err(k) ? true : undefined,
    'aria-describedby': err(k) ? `${k}-error` : undefined,
  })
  const msg = (k: keyof Values) =>
    err(k) ? <p id={`${k}-error`} className="field__error">{err(k)}</p> : null

  if (done) {
    const domainLabel = values.domain && values.domain in DOMAINS ? DOMAINS[values.domain as DomainKey].label : 'No preference'
    return (
      <section id="register" className="section" aria-labelledby="register-title">
        <div className="wrap form-wrap">
          <div className="success" role="status">
            <h2 id="register-title" className="h2" ref={doneRef} tabIndex={-1}>Demo complete. Nothing was sent.</h2>
            <p>
              Your details passed validation in this browser only. They were not sent to IEDC BOOTCAMP CEC, and they were not saved anywhere. This form is a frontend demo, so you are not registered yet.
            </p>
            <dl className="summary">
              <div><dt>Name</dt><dd>{values.name}</dd></div>
              <div><dt>Email</dt><dd>{values.email}</dd></div>
              <div><dt>College</dt><dd>{values.college}</dd></div>
              <div><dt>Domain interest</dt><dd>{domainLabel}</dd></div>
            </dl>
            <div className="hero__actions">
              {siteConfig.registrationUrl ? (
                <a className="btn btn--primary" href={siteConfig.registrationUrl} rel="noopener">Open the official registration form</a>
              ) : (
                <p className="field__hint">The official registration link has not been announced yet.</p>
              )}
              <button type="button" className="btn btn--ghost" onClick={() => { setDone(false); setSubmitted(false); setValues(empty); setErrors({}) }}>
                Start over
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="register" className="section" aria-labelledby="register-title">
      <div className="wrap form-wrap">
        <div className="section__head">
          <h2 id="register-title" className="h2">Register your interest</h2>
          <p className="section__intro">Fields marked with * are required.</p>
        </div>
        <p className="notice" role="note">
          <strong>Frontend demo.</strong> This form checks your answers but does not send or store them. Real registration opens when the organisers share an official link.
        </p>

        {submitted && errorCount > 0 && (
          <p className="error-summary" role="alert">
            {errorCount === 1 ? '1 field needs attention.' : `${errorCount} fields need attention.`}
          </p>
        )}

        <form ref={formRef} onSubmit={onSubmit} noValidate className="form">
          <div className="field">
            <label htmlFor="name">Full name *</label>
            <input id="name" type="text" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} {...field('name')} />
            {msg('name')}
          </div>

          <div className="field">
            <label htmlFor="email">Email address *</label>
            <input id="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={(e) => set('email', e.target.value)} {...field('email')} />
            {msg('email')}
          </div>

          <div className="field">
            <label htmlFor="phone">Mobile number *</label>
            <input id="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="10 digits" value={values.phone} onChange={(e) => set('phone', e.target.value)} {...field('phone')} />
            {msg('phone')}
          </div>

          <div className="field">
            <label htmlFor="college">College *</label>
            <input id="college" type="text" autoComplete="organization" value={values.college} onChange={(e) => set('college', e.target.value)} {...field('college')} />
            {msg('college')}
          </div>

          <div className="form__row">
            <div className="field">
              <label htmlFor="department">Department or course *</label>
              <input id="department" type="text" value={values.department} onChange={(e) => set('department', e.target.value)} {...field('department')} />
              {msg('department')}
            </div>
            <div className="field">
              <label htmlFor="year">Year of study *</label>
              <select id="year" value={values.year} onChange={(e) => set('year', e.target.value)} {...field('year')}>
                <option value="">Select year</option>
                <option>1st year</option>
                <option>2nd year</option>
                <option>3rd year</option>
                <option>4th year</option>
                <option>Postgraduate</option>
                <option>Other</option>
              </select>
              {msg('year')}
            </div>
          </div>

          <div className="field">
            <label htmlFor="domain">Domain you are most drawn to</label>
            <select id="domain" name="domain" value={values.domain} onChange={(e) => set('domain', e.target.value)}>
              <option value="">No preference yet</option>
              {DOMAIN_KEYS.map((k) => (
                <option key={k} value={k}>{DOMAINS[k].label}</option>
              ))}
            </select>
          </div>

          <fieldset className="field field--group" aria-describedby={err('teamStatus') ? 'teamStatus-error' : undefined}>
            <legend>Team status *</legend>
            <label className="choice">
              <input type="radio" name="teamStatus" value="team" checked={values.teamStatus === 'team'} onChange={() => set('teamStatus', 'team')} aria-invalid={err('teamStatus') ? true : undefined} />
              <span>I already have a team</span>
            </label>
            <label className="choice">
              <input type="radio" name="teamStatus" value="solo" checked={values.teamStatus === 'solo'} onChange={() => set('teamStatus', 'solo')} aria-invalid={err('teamStatus') ? true : undefined} />
              <span>I am looking for teammates</span>
            </label>
            {msg('teamStatus')}
          </fieldset>

          {values.teamStatus === 'team' && (
            <div className="field">
              <label htmlFor="teamName">Team name</label>
              <input id="teamName" type="text" value={values.teamName} onChange={(e) => set('teamName', e.target.value)} />
            </div>
          )}

          <div className="field">
            <label className="choice">
              <input type="checkbox" checked={values.confirm} onChange={(e) => set('confirm', e.target.checked)} {...field('confirm')} />
              <span>I confirm these details are correct. *</span>
            </label>
            {msg('confirm')}
          </div>

          <button type="submit" className="btn btn--primary form__submit">Check my details</button>
        </form>
      </div>
    </section>
  )
}
