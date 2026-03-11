import { css } from '../styles/css.js'

export default function DeleteConfirm({ student, onConfirm, onCancel, loading }) {
  return (
    <div>
      <div style={css.modalHeader}>
        <h2 style={{ ...css.modalTitle, color: '#dc2626' }}>Delete Student</h2>
        <button style={css.iconBtn} onClick={onCancel} aria-label="Close">✕</button>
      </div>

      <div style={{ textAlign: 'center', padding: '8px 0 24px' }}>
        <div style={css.deleteIcon}>🗑️</div>
        <p style={css.deleteMsg}>
          Remove <strong style={{ color: '#0f0f23' }}>{student.name}</strong> from records?
        </p>
        <p style={css.deleteNote}>This action is permanent and cannot be undone.</p>

        <div style={{ ...css.formFooter, justifyContent: 'center', marginTop: 28 }}>
          <button style={css.btnGhost} onClick={onCancel} disabled={loading}>Cancel</button>
          <button style={css.btnDanger} onClick={onConfirm} disabled={loading}>
            {loading ? <span style={css.spinner} /> : null}
            {loading ? 'Deleting…' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
