export const css = {
  // ── Layout ─────────────────────────────────────────────────────────────────
  page: {
    fontFamily: "'Sora', sans-serif",
    minHeight: '100vh',
    background: 'linear-gradient(145deg, #f0f0ff 0%, #fafafa 55%, #f0f9ff 100%)',
    padding: '36px 28px',
    maxWidth: 1140,
    margin: '0 auto',
  },

  // ── Header ─────────────────────────────────────────────────────────────────
  pageHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 32,
    flexWrap: 'wrap', gap: 16,
  },
  heading: {
    fontSize: 30, fontWeight: 700,
    color: '#0f0f23', letterSpacing: '-0.6px', lineHeight: 1.1,
  },
  subheading: { fontSize: 14, color: '#6b7280', marginTop: 6, fontWeight: 400 },
  headerRight: { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' },

  // ── Stats ──────────────────────────────────────────────────────────────────
  statCard: {
    background: '#fff', border: '1px solid #e5e7eb',
    borderRadius: 12, padding: '10px 20px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    minWidth: 70,
  },
  statNum: { fontSize: 24, fontWeight: 700, color: '#0f0f23', lineHeight: 1 },
  statLabel: {
    fontSize: 10, color: '#9ca3af', fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.6px', marginTop: 3,
  },

  // ── Toolbar ────────────────────────────────────────────────────────────────
  toolbar: {
    display: 'flex', gap: 12, marginBottom: 20,
    alignItems: 'center', flexWrap: 'wrap',
  },
  searchWrap: {
    flex: 1, position: 'relative', minWidth: 220,
    display: 'flex', alignItems: 'center',
  },
  searchIcon: { position: 'absolute', left: 13, fontSize: 14, pointerEvents: 'none', color: '#9ca3af' },
  searchInput: {
    width: '100%', padding: '11px 36px 11px 38px',
    border: '1.5px solid #e5e7eb', borderRadius: 11,
    fontSize: 14, fontFamily: "'Sora', sans-serif",
    background: '#fff', outline: 'none',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    color: '#111827',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  clearBtn: {
    position: 'absolute', right: 10,
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#9ca3af', fontSize: 13, padding: 4,
    borderRadius: 6, lineHeight: 1,
  },
  toolbarRight: { display: 'flex', gap: 10 },
  btnExport: {
    padding: '10px 18px', background: '#fff',
    border: '1.5px solid #e5e7eb', borderRadius: 10,
    fontSize: 13, fontWeight: 500, cursor: 'pointer',
    color: '#374151', fontFamily: "'Sora', sans-serif",
    display: 'flex', alignItems: 'center', gap: 7,
    transition: 'all 0.15s', whiteSpace: 'nowrap',
  },
  btnAdd: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none', borderRadius: 10,
    fontSize: 13, fontWeight: 600, cursor: 'pointer',
    color: '#fff', fontFamily: "'Sora', sans-serif",
    boxShadow: '0 2px 10px rgba(99,102,241,0.38)',
    display: 'flex', alignItems: 'center', gap: 7,
    transition: 'all 0.15s', whiteSpace: 'nowrap',
  },

  // ── Table ──────────────────────────────────────────────────────────────────
  tableWrap: {
    background: '#fff', borderRadius: 16,
    border: '1px solid #e5e7eb', overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  theadRow: { background: 'linear-gradient(135deg,#fafafa,#f3f4f6)' },
  th: {
    padding: '14px 20px', textAlign: 'left',
    fontSize: 11, fontWeight: 700, color: '#6b7280',
    textTransform: 'uppercase', letterSpacing: '0.7px',
    borderBottom: '1px solid #e5e7eb',
    whiteSpace: 'nowrap',
  },
  thSortable: { cursor: 'pointer', userSelect: 'none' },
  tr: { borderBottom: '1px solid #f3f4f6', transition: 'background 0.13s' },
  td: {
    padding: '14px 20px', fontSize: 14,
    color: '#374151', verticalAlign: 'middle',
  },

  // ── Cell content ───────────────────────────────────────────────────────────
  nameCell: { display: 'flex', alignItems: 'center', gap: 12 },
  avatar: {
    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 13, fontWeight: 700, color: '#fff',
  },
  nameText: { fontWeight: 600, color: '#111827' },
  emailText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13, color: '#4b5563',
  },
  agePill: {
    display: 'inline-block',
    background: '#f3f4f6', border: '1px solid #e5e7eb',
    borderRadius: 7, padding: '3px 12px',
    fontSize: 13, fontWeight: 600, color: '#374151',
  },
  actionGroup: { display: 'flex', gap: 8 },
  btnEdit: {
    padding: '6px 14px',
    background: '#eef2ff', border: '1px solid #c7d2fe',
    borderRadius: 8, fontSize: 12, fontWeight: 600,
    color: '#6366f1', cursor: 'pointer',
    fontFamily: "'Sora', sans-serif", transition: 'all 0.13s',
    display: 'flex', alignItems: 'center', gap: 5,
  },
  btnDeleteRow: {
    padding: '6px 14px',
    background: '#fef2f2', border: '1px solid #fecaca',
    borderRadius: 8, fontSize: 12, fontWeight: 600,
    color: '#ef4444', cursor: 'pointer',
    fontFamily: "'Sora', sans-serif", transition: 'all 0.13s',
    display: 'flex', alignItems: 'center', gap: 5,
  },

  // ── Empty / Error ──────────────────────────────────────────────────────────
  emptyCell: { padding: '64px 24px', textAlign: 'center' },
  emptyIcon: { fontSize: 44, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 6 },
  emptyText: { fontSize: 13, color: '#9ca3af' },
  errorBanner: {
    background: '#fef2f2', border: '1px solid #fecaca',
    borderRadius: 12, padding: '14px 20px', marginBottom: 20,
    fontSize: 14, color: '#dc2626', fontWeight: 500,
    display: 'flex', alignItems: 'center', gap: 10,
  },

  // ── Skeleton ───────────────────────────────────────────────────────────────
  skeletonCell: { padding: '14px 20px' },
  skeletonBar: {
    height: 14, borderRadius: 7,
    background: 'linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)',
    backgroundSize: '400% 100%',
    animation: 'shimmer 1.5s ease infinite',
  },

  // ── Pagination ─────────────────────────────────────────────────────────────
  pagination: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 18, flexWrap: 'wrap', gap: 12,
  },
  pageInfo: { fontSize: 13, color: '#9ca3af', fontWeight: 500 },
  pageGroup: { display: 'flex', gap: 6 },
  pageBtn: {
    padding: '7px 14px',
    background: '#fff', border: '1.5px solid #e5e7eb',
    borderRadius: 9, fontSize: 13, cursor: 'pointer',
    fontFamily: "'Sora', sans-serif", color: '#374151',
    fontWeight: 500, transition: 'all 0.13s',
  },
  pageBtnActive: {
    background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
    border: '1.5px solid #6366f1', color: '#fff',
    boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
  },

  // ── Modal ──────────────────────────────────────────────────────────────────
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(10,10,30,0.55)',
    backdropFilter: 'blur(5px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: 20,
    animation: 'fadeIn 0.2s ease',
  },
  modal: {
    background: '#fff', borderRadius: 18,
    padding: '30px 32px', width: '100%',
    boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
    animation: 'slideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)',
  },
  modalHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 26,
  },
  modalTitle: { fontSize: 19, fontWeight: 700, color: '#0f0f23' },
  modalSubtitle: { fontSize: 12, color: '#9ca3af', marginTop: 3 },
  iconBtn: {
    background: '#f3f4f6', border: 'none',
    borderRadius: 8, width: 32, height: 32,
    cursor: 'pointer', fontSize: 14, color: '#6b7280',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },

  // ── Form ───────────────────────────────────────────────────────────────────
  formGroup: { marginBottom: 20 },
  label: {
    display: 'block', fontSize: 11, fontWeight: 700,
    color: '#374151', marginBottom: 7,
    textTransform: 'uppercase', letterSpacing: '0.5px',
  },
  input: {
    width: '100%', padding: '11px 14px',
    border: '1.5px solid #e5e7eb', borderRadius: 10,
    fontSize: 14, fontFamily: "'Sora', sans-serif",
    color: '#111827', outline: 'none',
    background: '#fafafa', transition: 'border-color 0.18s, box-shadow 0.18s',
  },
  inputErr: { borderColor: '#f87171', background: '#fff5f5' },
  errorMsg: {
    display: 'block', fontSize: 12, color: '#ef4444',
    marginTop: 6, fontWeight: 500,
  },
  formFooter: {
    display: 'flex', gap: 12,
    justifyContent: 'flex-end', marginTop: 28,
  },
  btnPrimary: {
    padding: '11px 24px',
    background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
    border: 'none', borderRadius: 10,
    color: '#fff', fontSize: 14, fontWeight: 600,
    cursor: 'pointer', fontFamily: "'Sora', sans-serif",
    boxShadow: '0 2px 10px rgba(99,102,241,0.38)',
    display: 'flex', alignItems: 'center', gap: 8,
    transition: 'opacity 0.15s',
  },
  btnGhost: {
    padding: '11px 24px', background: '#fff',
    border: '1.5px solid #e5e7eb', borderRadius: 10,
    color: '#374151', fontSize: 14, fontWeight: 500,
    cursor: 'pointer', fontFamily: "'Sora', sans-serif",
    transition: 'all 0.15s',
  },
  btnDanger: {
    padding: '11px 24px',
    background: 'linear-gradient(135deg,#ef4444,#dc2626)',
    border: 'none', borderRadius: 10,
    color: '#fff', fontSize: 14, fontWeight: 600,
    cursor: 'pointer', fontFamily: "'Sora', sans-serif",
    boxShadow: '0 2px 10px rgba(239,68,68,0.38)',
    display: 'flex', alignItems: 'center', gap: 8,
    transition: 'opacity 0.15s',
  },

  // ── Delete modal ───────────────────────────────────────────────────────────
  deleteIcon: { fontSize: 52, marginBottom: 16 },
  deleteMsg: { fontSize: 16, color: '#374151', fontWeight: 500, marginBottom: 8 },
  deleteNote: { fontSize: 13, color: '#9ca3af' },

  // ── Spinner ────────────────────────────────────────────────────────────────
  spinner: {
    display: 'inline-block', width: 14, height: 14,
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff', borderRadius: '50%',
    animation: 'spin 0.6s linear infinite',
  },
}
