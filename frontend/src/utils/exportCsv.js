export function exportToCSV(students, filename = 'students_export.csv') {
  const headers = ['ID', 'Name', 'Email', 'Age']
  const rows = students.map((s) => [s.id, `"${s.name}"`, `"${s.email}"`, s.age])
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
