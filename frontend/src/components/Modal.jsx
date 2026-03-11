import { useEffect } from 'react'
import { css } from '../styles/css.js'

export default function Modal({ children, onClose, size = 'md' }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const widths = { sm: 380, md: 460, lg: 560 }

  return (
    <div style={css.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div
        style={{ ...css.modal, maxWidth: widths[size] }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
