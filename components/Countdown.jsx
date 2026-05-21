'use client'
import { useState, useEffect } from 'react'
import { msToCountdown, pad } from '@/lib/format'

function Unit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="text-xl font-black mono tabnum leading-none"
        style={{ color: 'var(--t1)', minWidth: 32, textAlign: 'center' }}
      >
        {pad(value)}
      </span>
      <span className="text-[8px] uppercase tracking-widest mt-0.5" style={{ color: 'var(--t3)' }}>
        {label}
      </span>
    </div>
  )
}

function Sep() {
  return <span className="text-lg font-black pb-3" style={{ color: 'var(--t4)' }}>:</span>
}

export default function Countdown({ targetDate, onExpire }) {
  const [cd, setCd] = useState(() => msToCountdown(new Date(targetDate) - Date.now()))

  useEffect(() => {
    const tick = () => {
      const ms = new Date(targetDate) - Date.now()
      if (ms <= 0) { setCd({ d:0, h:0, m:0, s:0 }); onExpire?.(); return }
      setCd(msToCountdown(ms))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate, onExpire])

  if (cd.d === 0 && cd.h === 0 && cd.m === 0 && cd.s === 0) return null

  return (
    <div className="flex items-end gap-1.5" aria-label="Countdown timer" role="timer">
      {cd.d > 0 && <><Unit value={cd.d} label="days" /><Sep /></>}
      <Unit value={cd.h} label="hrs" /><Sep />
      <Unit value={cd.m} label="min" /><Sep />
      <Unit value={cd.s} label="sec" />
    </div>
  )
}
