import { useState, useEffect, useCallback } from 'react'
import { studentsApi } from '../services/api.js'

export function useStudents() {
  const [students, setStudents]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [actionLoading, setAL]    = useState(false)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await studentsApi.getAll()
      setStudents(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const create = async (data) => {
    setAL(true)
    try {
      const created = await studentsApi.create(data)
      setStudents((prev) => [created, ...prev])
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message }
    } finally {
      setAL(false)
    }
  }

  const update = async (id, data) => {
    setAL(true)
    try {
      const updated = await studentsApi.update(id, data)
      setStudents((prev) => prev.map((s) => (s.id === id ? updated : s)))
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message }
    } finally {
      setAL(false)
    }
  }

  const remove = async (id) => {
    setAL(true)
    try {
      await studentsApi.remove(id)
      setStudents((prev) => prev.filter((s) => s.id !== id))
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message }
    } finally {
      setAL(false)
    }
  }

  return { students, loading, error, actionLoading, create, update, remove, refetch: fetchAll }
}
