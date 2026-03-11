import { useEffect, useState } from 'react'

const TYPES = {
  success: { bg: '#ecfdf5', color: '#065f46', border: '#a7f3d0', icon: '✓' },
  error:   { bg: '#fef2f2', color: '#7f1d1d', border: '#fecaca', icon: '✕' },
  info:    { bg: '#eff6ff', color: '#1e3a8a', border: '#bfdbfe', icon: 'ℹ' },
}

export default function Toast({ toasts }) {
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24,
      display: 'flex', flexDirection: 'column', gap: 10,
      zIndex: 9999, pointerEvents: 'none',
    }}>
      {toasts.map((t) => <ToastItem key={t.id} toast={t} />)}
    </div>
  )
}

function ToastItem({ toast }) {
  const [visible, setVisible] = useState(false)
  const style = TYPES[toast.type] || TYPES.success

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  return (
    <div style={{
      background: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`,
      borderRadius: 12,
      padding: '12px 20px',
      fontSize: 14,
      fontWeight: 600,
      fontFamily: "'Sora', sans-serif",
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      pointerEvents: 'all',
      transform: visible ? 'translateX(0)' : 'translateX(120%)',
      opacity: visible ? 1 : 0,
      transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      minWidth: 260,
      maxWidth: 380,
    }}>
      <span style={{
        width: 24, height: 24, borderRadius: '50%',
        background: style.color, color: style.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 700, flexShrink: 0,
      }}>
        {style.icon}
      </span>
      {toast.message}
    </div>
  )
}
