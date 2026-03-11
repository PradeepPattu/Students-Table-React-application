import { useState, useRef, useEffect } from 'react'
import { validateStudent, hasErrors } from '../utils/validate.js'
import { css } from '../styles/css.js'

const FIELDS = [
  { key: 'name',  label: 'Full Name',  type: 'text',   placeholder: 'e.g. Arjun Sharma' },
  { key: 'email', label: 'Email',      type: 'email',  placeholder: 'student@college.edu' },
  { key: 'age',   label: 'Age',        type: 'number', placeholder: '21', min: 10, max: 100 },
]

export default function StudentForm({ initial, onSubmit, onCancel, title, loading }) {
  const [form, setForm]       = useState(initial || { name: '', email: '', age: '' })
  const [errors, setErrors]   = useState({})
  const [touched, setTouched] = useState({})
  const firstRef = useRef()

  useEffect(() => { firstRef.current?.focus() }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    const next = { ...form, [name]: value }
    setForm(next)
    if (touched[name]) {
      const errs = validateStudent(next)
      setErrors((prev) => ({ ...prev, [name]: errs[name] }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
    const errs = validateStudent(form)
    setErrors((prev) => ({ ...prev, [name]: errs[name] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validateStudent(form)
    if (hasErrors(errs)) {
      setErrors(errs)
      setTouched({ name: true, email: true, age: true })
      return
    }
    onSubmit({ name: form.name.trim(), email: form.email.trim(), age: Number(form.age) })
  }

  return (
    <div>
      <div style={css.modalHeader}>
        <div>
          <h2 style={css.modalTitle}>{title}</h2>
          <p style={css.modalSubtitle}>All fields are required</p>
        </div>
        <button style={css.iconBtn} onClick={onCancel} aria-label="Close">✕</button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {FIELDS.map(({ key, label, type, placeholder, min, max }, i) => {
          const isErr = errors[key] && touched[key]
          return (
            <div key={key} style={css.formGroup}>
              <label style={css.label} htmlFor={`field-${key}`}>{label}</label>
              <input
                ref={i === 0 ? firstRef : null}
                id={`field-${key}`}
                name={key}
                type={type}
                value={form[key]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                min={min}
                max={max}
                disabled={loading}
                aria-invalid={!!isErr}
                aria-describedby={isErr ? `err-${key}` : undefined}
                style={{ ...css.input, ...(isErr ? css.inputErr : {}) }}
              />
              {isErr && (
                <span id={`err-${key}`} style={css.errorMsg} role="alert">
                  ⚠ {errors[key]}
                </span>
              )}
            </div>
          )
        })}

        <div style={css.formFooter}>
          <button type="button" style={css.btnGhost} onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button type="submit" style={css.btnPrimary} disabled={loading}>
            {loading ? <span style={css.spinner} /> : null}
            {loading ? 'Saving…' : title === 'Add Student' ? 'Add Student' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
