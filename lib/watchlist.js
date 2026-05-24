'use client'
import { useState, useEffect, useCallback } from 'react'

const KEY = 'mintwatch_watchlist'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
}

export function useWatchlist() {
  const [ids, setIds] = useState([])

  useEffect(() => { setIds(load()) }, [])

  const toggle = useCallback((id) => {
    setIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isWatched = useCallback((id) => ids.includes(id), [ids])

  return { ids, toggle, isWatched }
}
