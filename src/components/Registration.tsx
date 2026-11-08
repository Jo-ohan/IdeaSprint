import { useEffect, useRef, useState, type FormEvent } from 'react'
import { DOMAIN_KEYS, siteConfig, type DomainKey } from '../config'
import { DOMAINS } from '../ideas'
import { useInView } from '../hooks'

interface Props {
  presetDomain: DomainKey | ''
}

interface Values {
  name: string
  gender: string
  phone: string
  email: string
  college: string
  branch: string
  year: string
  domain: string
  teamStatus: string
  teamName: string
  teamSize: string
  member2Name: string
  member3Name: string
  confirm: boolean
}

type Errors = Partial<Record<keyof Values, string>>

const empty: Values = {
  name: '',
  gender: '',
  phone: '',
  email: '',
  college: '',
  branch: '',
  year: '',
  domain: '',
  teamStatus: '',
  teamName: '',
  teamSize: '',
  member2Name: '',
  member3Name: '',
  confirm: false,
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Enter your full name.'
  if (!v.gender) e.gender = 'Select your gender.'

  const digits = v.phone.replace(/[\s-]/g, '').replace(/^(\+91|0)/, '')
  if (!digits) e.phone = 'Enter your phone number.'
  else if (!/^[6-9]\d{9}$/.test(digits)) e.phone = 'Enter a valid 10-digit mobile number.'

  if (!v.email.trim()) e.email = 'Enter your email address.'
  else if (!EMAIL.test(v.email.trim())) e.email = 'Enter a valid email, like you@example.com.'

  if (!v.college.trim()) e.college = 'Enter your college name.'
  if (!v.branch) e.branch = 'Select your branch.'
  if (!v.year) e.year = 'Select your year of study.'
  if (!v.teamStatus) e.teamStatus = 'Select whether you have a team.'

  if (v.teamStatus === 'team') {
    if (!v.teamName.trim()) e.teamName = 'Enter your team name.'
    if (!v.teamSize) e.teamSize = 'Select your team size.'
    if ((v.teamSize === '3' || v.teamSize === '4') && !v.member2Name.trim()) {
      e.member2Name = 'Enter teammate 2 name.'
    }
    if (v.teamSize === '4' && !v.member3Name.trim()) {
      e.member3Name = 'Enter teammate 3 name.'
    }
  }

  if (!v.confirm) e.confirm = 'Please confirm that your details are correct.'
  return e
}

const ORDER: (keyof Values)[] = [
  'name',
  'gender',
  'phone',
  'email',
  'college',
  'branch',
  'year',
  'teamStatus',
  'teamName',
  'teamSize',
  'member2Name',
  'member3Name',
  'confirm',
]

export default function Registration({ presetDomain }: Props) {
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)

  const [headRef, headInView] = useInView<HTMLDivElement>({ threshold: 0.15 })
  const [formSectionRef, formSectionInView] = useInView<HTMLDivElement>({ threshold: 0.05 })

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
    // Brief submitting state for tactile feedback
    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      setDone(true)
    }, 320)
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
    const domainLabel =
      values.domain && values.domain in DOMAINS
        ? DOMAINS[values.domain as DomainKey].label
        : 'No preference'
    return (
      <section id="register" className="section grid-texture" aria-labelledby="register-title">
        <div className="wrap form-wrap">
          <div className="success success--animate" role="status">
            <h2 id="register-title" className="h2" ref={doneRef} tabIndex={-1}>
              Demo complete. Nothing was sent.
            </h2>
            <p>
              Your details passed validation in this browser only. They were not sent to IEDC BOOTCAMP CEC, and they were not saved anywhere. This form is a frontend demo, so you are not registered yet.
            </p>
            <dl className="summary">
              <div><dt>Name</dt><dd>{values.name}</dd></div>
              <div><dt>Gender</dt><dd>{values.gender}</dd></div>
              <div><dt>Phone</dt><dd>{values.phone}</dd></div>
              <div><dt>Email</dt><dd>{values.email}</dd></div>
              <div><dt>College</dt><dd>{values.college}</dd></div>
              <div><dt>Branch</dt><dd>{values.branch}</dd></div>
              <div><dt>Year</dt><dd>{values.year}</dd></div>
              <div>
                <dt>Team</dt>
                <dd>
                  {values.teamStatus === 'team'
                    ? `${values.teamName} (${values.teamSize} members)`
                    : 'Looking for teammates (solo)'}
                </dd>
              </div>
              {values.teamStatus === 'team' && values.member2Name && (
                <div><dt>Teammate 2</dt><dd>{values.member2Name}</dd></div>
              )}
              {values.teamStatus === 'team' && values.member3Name && (
                <div><dt>Teammate 3</dt><dd>{values.member3Name}</dd></div>
              )}
              <div><dt>Domain</dt><dd>{domainLabel}</dd></div>
            </dl>
            <div className="hero__actions">
              {siteConfig.registrationUrl ? (
                <a className="btn btn--primary" href={siteConfig.registrationUrl} rel="noopener">
                  Open the official registration form ↗
                </a>
              ) : (
                <p className="field__hint">The official registration link has not been announced yet.</p>
              )}
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  setDone(false)
                  setSubmitted(false)
                  setValues(empty)
                  setErrors({})
                }}
              >
                Start over
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="register" className="section grid-texture" aria-labelledby="register-title">
      <div className="wrap form-wrap">
        <div
          ref={headRef}
          className={`section__head reveal-block${headInView ? ' revealed' : ''}`}
        >
          <h2 id="register-title" className="h2">Register your interest</h2>
          <p className="section__intro">
            Fields marked with * are required. This frontend demo validates your answers locally — submissions are not collected or stored.
          </p>
        </div>

        <div
          ref={formSectionRef}
          className={`reveal-block${formSectionInView ? ' revealed' : ''}`}
          style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
        >
          <div className="form-card">
            <div className="form__notice">All fields are required.</div>

            {submitted && errorCount > 0 && (
              <p className="error-summary" role="alert">
                {errorCount === 1 ? '1 field needs attention.' : `${errorCount} fields need attention.`}
              </p>
            )}

            <form ref={formRef} onSubmit={onSubmit} noValidate className="form">
              {/* Name: Full-width text input */}
              <div className="field">
                <label htmlFor="name">NAME *</label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={values.name}
                  onChange={(e) => set('name', e.target.value)}
                  {...field('name')}
                />
                {msg('name')}
              </div>

              {/* Gender: Full-width dropdown */}
              <div className="field">
                <label htmlFor="gender">GENDER *</label>
                <select
                  id="gender"
                  value={values.gender}
                  onChange={(e) => set('gender', e.target.value)}
                  {...field('gender')}
                >
                  <option value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                {msg('gender')}
              </div>

              {/* Phone Number and Email: Side-by-side inputs on desktop, stacked on mobile */}
              <div className="form__row form__row--2col">
                <div className="field">
                  <label htmlFor="phone">PHONE NUMBER *</label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Your phone number"
                    value={values.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    {...field('phone')}
                  />
                  {msg('phone')}
                </div>
                <div className="field">
                  <label htmlFor="email">EMAIL *</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={(e) => set('email', e.target.value)}
                    {...field('email')}
                  />
                  {msg('email')}
                </div>
              </div>

              {/* College: Full-width input */}
              <div className="field">
                <label htmlFor="college">COLLEGE *</label>
                <input
                  id="college"
                  type="text"
                  autoComplete="organization"
                  placeholder="College of Engineering Chengannur"
                  value={values.college}
                  onChange={(e) => set('college', e.target.value)}
                  {...field('college')}
                />
                {msg('college')}
              </div>

              {/* Branch: Full-width dropdown */}
              <div className="field">
                <label htmlFor="branch">BRANCH *</label>
                <select
                  id="branch"
                  value={values.branch}
                  onChange={(e) => set('branch', e.target.value)}
                  {...field('branch')}
                >
                  <option value="">Select your branch</option>
                  <option value="Computer Science & Engineering">Computer Science &amp; Engineering</option>
                  <option value="Electronics & Communication Engineering">Electronics &amp; Communication Engineering</option>
                  <option value="Electrical & Electronics Engineering">Electrical &amp; Electronics Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Applied Electronics & Instrumentation">Applied Electronics &amp; Instrumentation</option>
                  <option value="Other Department / Branch">Other Department / Branch</option>
                </select>
                {msg('branch')}
              </div>

              {/* Year & Domain preference: side-by-side on desktop */}
              <div className="form__row form__row--2col">
                <div className="field">
                  <label htmlFor="year">YEAR OF STUDY *</label>
                  <select
                    id="year"
                    value={values.year}
                    onChange={(e) => set('year', e.target.value)}
                    {...field('year')}
                  >
                    <option value="">Select year</option>
                    <option value="1st year">1st year</option>
                    <option value="2nd year">2nd year</option>
                    <option value="3rd year">3rd year</option>
                    <option value="4th year">4th year</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                  {msg('year')}
                </div>
                <div className="field">
                  <label htmlFor="domain">DOMAIN PREFERENCE</label>
                  <select
                    id="domain"
                    name="domain"
                    value={values.domain}
                    onChange={(e) => set('domain', e.target.value)}
                  >
                    <option value="">No preference yet</option>
                    {DOMAIN_KEYS.map((k) => (
                      <option key={k} value={k}>{DOMAINS[k].label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Team Registration */}
              <fieldset
                className="field field--group"
                aria-describedby={err('teamStatus') ? 'teamStatus-error' : undefined}
              >
                <legend>TEAM REGISTRATION *</legend>
                <div className="choice-group">
                  <label className="choice">
                    <input
                      type="radio"
                      name="teamStatus"
                      value="team"
                      checked={values.teamStatus === 'team'}
                      onChange={() => set('teamStatus', 'team')}
                      aria-invalid={err('teamStatus') ? true : undefined}
                    />
                    <span>I already have a team</span>
                  </label>
                  <label className="choice">
                    <input
                      type="radio"
                      name="teamStatus"
                      value="solo"
                      checked={values.teamStatus === 'solo'}
                      onChange={() => set('teamStatus', 'solo')}
                      aria-invalid={err('teamStatus') ? true : undefined}
                    />
                    <span>I am looking for teammates (solo)</span>
                  </label>
                </div>
                {msg('teamStatus')}
              </fieldset>

              {/* Conditional team fields */}
              {values.teamStatus === 'team' && (
                <div className="field--reveal">
                  <div className="form__row form__row--2col">
                    <div className="field">
                      <label htmlFor="teamName">TEAM NAME *</label>
                      <input
                        id="teamName"
                        type="text"
                        placeholder="Enter your team name"
                        value={values.teamName}
                        onChange={(e) => set('teamName', e.target.value)}
                        {...field('teamName')}
                      />
                      {msg('teamName')}
                    </div>
                    <div className="field">
                      <label htmlFor="teamSize">TEAM SIZE *</label>
                      <select
                        id="teamSize"
                        value={values.teamSize}
                        onChange={(e) => set('teamSize', e.target.value)}
                        {...field('teamSize')}
                      >
                        <option value="">Select team size</option>
                        <option value="2">2 members</option>
                        <option value="3">3 members</option>
                        <option value="4">4 members</option>
                      </select>
                      {msg('teamSize')}
                    </div>
                  </div>

                  {(values.teamSize === '3' || values.teamSize === '4') && (
                    <div className="form__row form__row--2col">
                      <div className="field">
                        <label htmlFor="member2Name">TEAMMATE 2 NAME *</label>
                        <input
                          id="member2Name"
                          type="text"
                          placeholder="Teammate 2 full name"
                          value={values.member2Name}
                          onChange={(e) => set('member2Name', e.target.value)}
                          {...field('member2Name')}
                        />
                        {msg('member2Name')}
                      </div>
                      {values.teamSize === '4' ? (
                        <div className="field">
                          <label htmlFor="member3Name">TEAMMATE 3 NAME *</label>
                          <input
                            id="member3Name"
                            type="text"
                            placeholder="Teammate 3 full name"
                            value={values.member3Name}
                            onChange={(e) => set('member3Name', e.target.value)}
                            {...field('member3Name')}
                          />
                          {msg('member3Name')}
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              )}

              {/* Confirmation Checkbox */}
              <div className="field">
                <label className="choice">
                  <input
                    type="checkbox"
                    checked={values.confirm}
                    onChange={(e) => set('confirm', e.target.checked)}
                    {...field('confirm')}
                  />
                  <span>I confirm these details are correct. *</span>
                </label>
                {msg('confirm')}
              </div>

              {/* Full-width Physical Submit Button */}
              <button
                type="submit"
                className={`form__submit-btn${submitting ? ' form__submit-btn--submitting' : ''}`}
                disabled={submitting}
              >
                <span className="form__submit-label">
                  {submitting ? 'CHECKING DETAILS…' : 'SUBMIT'}
                </span>
                <svg
                  className="form__submit-arrow"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>

              <p className="form__disclaimer">
                Frontend demo only — registrations are verified locally and are not submitted to a database.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
