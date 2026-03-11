import { useState, useMemo } from 'react'
import { useStudents } from './hooks/useStudents.js'
import { useToast } from './hooks/useToast.js'
import { exportToCSV } from './utils/exportCsv.js'
import Modal from './components/Modal.jsx'
import StudentForm from './components/StudentForm.jsx'
import DeleteConfirm from './components/DeleteConfirm.jsx'
import Toast from './components/Toast.jsx'
import { css } from './styles/css.js'

const PER_PAGE = 8

function avatarGradient(name) {
  const gradients = [
    'linear-gradient(135deg,#6366f1,#8b5cf6)',
    'linear-gradient(135deg,#0ea5e9,#06b6d4)',
    'linear-gradient(135deg,#f59e0b,#f97316)',
    'linear-gradient(135deg,#10b981,#059669)',
    'linear-gradient(135deg,#ec4899,#f43f5e)',
    'linear-gradient(135deg,#14b8a6,#0ea5e9)',
  ]
  return gradients[(name?.charCodeAt(0) ?? 0) % gradients.length]
}

function initials(name) {
  return (name ?? '?').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

function SortIcon({ active, dir }) {
  if (!active) return <span style={{ opacity: 0.25, marginLeft: 4 }}>↕</span>
  return <span style={{ color: '#6366f1', marginLeft: 4 }}>{dir === 'asc' ? '↑' : '↓'}</span>
}

function SkeletonRows({ n = 6 }) {
  return Array.from({ length: n }).map((_, i) => (
    <tr key={i} style={css.tr}>
      {[40, 65, 55, 25, 30].map((w, j) => (
        <td key={j} style={css.skeletonCell}>
          <div style={{ ...css.skeletonBar, width: `${w + (i * 7) % 20}%` }} />
        </td>
      ))}
    </tr>
  ))
}

export default function App() {
  const { students, loading, error, actionLoading, create, update, remove } = useStudents()
  const { toasts, push } = useToast()

  const [modal, setModal]           = useState(null)   // null | 'add' | 'edit' | 'delete'
  const [active, setActive]         = useState(null)
  const [search, setSearch]         = useState('')
  const [sortKey, setSortKey]       = useState('name')
  const [sortDir, setSortDir]       = useState('asc')
  const [page, setPage]             = useState(1)

  const openEdit   = (s) => { setActive(s); setModal('edit') }
  const openDelete = (s) => { setActive(s); setModal('delete') }
  const closeModal = ()  => { setModal(null); setActive(null) }

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return students
      .filter((s) => [s.name, s.email, String(s.age)].some((v) => v.toLowerCase().includes(q)))
      .sort((a, b) => {
        const va = String(a[sortKey]).toLowerCase()
        const vb = String(b[sortKey]).toLowerCase()
        return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va)
      })
  }, [students, search, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // ── CRUD handlers ──────────────────────────────────────────────────────────
  const handleAdd = async (data) => {
    const res = await create(data)
    if (res.ok) { push(`${data.name} added successfully!`); closeModal(); setPage(1) }
    else push(res.error, 'error')
  }

  const handleEdit = async (data) => {
    const res = await update(active.id, data)
    if (res.ok) { push(`${data.name} updated.`); closeModal() }
    else push(res.error, 'error')
  }

  const handleDelete = async () => {
    const name = active.name
    const res = await remove(active.id)
    if (res.ok) { push(`${name} removed.`, 'error'); closeModal() }
    else push(res.error, 'error')
  }

  const COLS = [
    { key: 'name',  label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'age',   label: 'Age' },
    { key: null,    label: 'Actions' },
  ]

  return (
    <div style={css.page}>

      {/* ── Global styles ─────────────────────────────────────────────────── */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 100% 0 }
          100% { background-position: -100% 0 }
        }
        @keyframes fadeIn {
          from { opacity: 0 } to { opacity: 1 }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.96) }
          to   { opacity: 1; transform: translateY(0) scale(1) }
        }
        @keyframes spin {
          to { transform: rotate(360deg) }
        }
        @keyframes rowIn {
          from { opacity: 0; transform: translateX(-8px) }
          to   { opacity: 1; transform: translateX(0) }
        }
        input:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.12) !important; }
        button:disabled { opacity: 0.55; cursor: not-allowed !important; }
        tr.student-row:hover td { background: #f8f7ff !important; }
      `}</style>

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <div style={css.pageHeader}>
        <div>
          <h1 style={css.heading}>Student Records</h1>
          <p style={css.subheading}>Full-stack CRUD · React + NestJS + PostgreSQL</p>
        </div>
        <div style={css.headerRight}>
          <div style={css.statCard}>
            <span style={css.statNum}>{students.length}</span>
            <span style={css.statLabel}>Total</span>
          </div>
          {search && filtered.length !== students.length && (
            <div style={{ ...css.statCard, background: '#eef2ff', borderColor: '#c7d2fe' }}>
              <span style={{ ...css.statNum, color: '#6366f1' }}>{filtered.length}</span>
              <span style={css.statLabel}>Filtered</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Error Banner ──────────────────────────────────────────────────── */}
      {error && (
        <div style={css.errorBanner}>
          ⚠ {error}
          <button
            style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', fontWeight: 700 }}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}

      {/* ── Toolbar ───────────────────────────────────────────────────────── */}
      <div style={css.toolbar}>
        <div style={css.searchWrap}>
          <span style={css.searchIcon}>⌕</span>
          <input
            style={css.searchInput}
            placeholder="Search name, email or age…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            aria-label="Search students"
          />
          {search && (
            <button style={css.clearBtn} onClick={() => { setSearch(''); setPage(1) }} aria-label="Clear search">✕</button>
          )}
        </div>
        <div style={css.toolbarRight}>
          <button
            style={css.btnExport}
            onClick={() => exportToCSV(filtered)}
            disabled={filtered.length === 0 || loading}
            title={`Export ${filtered.length} record(s) to CSV`}
          >
            ⬇ Export CSV
          </button>
          <button style={css.btnAdd} onClick={() => setModal('add')}>
            + Add Student
          </button>
        </div>
      </div>

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <div style={css.tableWrap}>
        <table style={css.table}>
          <thead>
            <tr style={css.theadRow}>
              {COLS.map(({ key, label }) => (
                <th
                  key={label}
                  style={{ ...css.th, ...(key ? css.thSortable : {}) }}
                  onClick={() => key && handleSort(key)}
                  aria-sort={key && sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                >
                  {label}
                  {key && <SortIcon active={sortKey === key} dir={sortDir} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <SkeletonRows n={6} />
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={4} style={css.emptyCell}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={css.emptyIcon}>{search ? '🔍' : '📭'}</div>
                    <p style={css.emptyTitle}>{search ? 'No results found' : 'No students yet'}</p>
                    <p style={css.emptyText}>
                      {search ? 'Try a different search term.' : 'Click "Add Student" to get started.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((s, idx) => (
                <tr
                  key={s.id}
                  style={{ ...css.tr, animation: `rowIn 0.25s ease ${idx * 30}ms both` }}
                  className="student-row"
                >
                  <td style={css.td}>
                    <div style={css.nameCell}>
                      <div style={{ ...css.avatar, background: avatarGradient(s.name) }}>
                        {initials(s.name)}
                      </div>
                      <span style={css.nameText}>{s.name}</span>
                    </div>
                  </td>
                  <td style={css.td}>
                    <span style={css.emailText}>{s.email}</span>
                  </td>
                  <td style={css.td}>
                    <span style={css.agePill}>{s.age}</span>
                  </td>
                  <td style={css.td}>
                    <div style={css.actionGroup}>
                      <button style={css.btnEdit} onClick={() => openEdit(s)}>✏ Edit</button>
                      <button style={css.btnDeleteRow} onClick={() => openDelete(s)}>🗑 Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ────────────────────────────────────────────────────── */}
      {!loading && filtered.length > PER_PAGE && (
        <div style={css.pagination}>
          <span style={css.pageInfo}>
            Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
          </span>
          <div style={css.pageGroup}>
            <button style={css.pageBtn} disabled={page === 1} onClick={() => setPage(page - 1)}>← Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                style={{ ...css.pageBtn, ...(p === page ? css.pageBtnActive : {}) }}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button style={css.pageBtn} disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next →</button>
          </div>
        </div>
      )}

      {/* ── Modals ────────────────────────────────────────────────────────── */}
      {modal === 'add' && (
        <Modal onClose={closeModal}>
          <StudentForm title="Add Student" onSubmit={handleAdd} onCancel={closeModal} loading={actionLoading} />
        </Modal>
      )}
      {modal === 'edit' && active && (
        <Modal onClose={closeModal}>
          <StudentForm
            title="Edit Student"
            initial={{ name: active.name, email: active.email, age: String(active.age) }}
            onSubmit={handleEdit}
            onCancel={closeModal}
            loading={actionLoading}
          />
        </Modal>
      )}
      {modal === 'delete' && active && (
        <Modal onClose={closeModal} size="sm">
          <DeleteConfirm student={active} onConfirm={handleDelete} onCancel={closeModal} loading={actionLoading} />
        </Modal>
      )}

      {/* ── Toasts ────────────────────────────────────────────────────────── */}
      <Toast toasts={toasts} />
    </div>
  )
}
