'use client'
import { useState, useMemo } from 'react'
import { getMintStatus } from '@/lib/mints'

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function MintCalendar({ mints, selectedDate, onSelectDate }) {
  const today = new Date()
  const [year,  setYear]  = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth()

  const prevMonth = () => {
    if (isCurrentMonth) return
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
    onSelectDate(null)
  }
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
    onSelectDate(null)
  }

  const daysInMonth   = getDaysInMonth(year, month)
  const firstDayOfWeek = getFirstDayOfMonth(year, month)

  const mintsByDay = useMemo(() => {
    const map = {}
    mints.forEach(mint => {
      const d = new Date(mint.mintDate)
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate()
        if (!map[day]) map[day] = []
        map[day].push(mint)
      }
    })
    return map
  }, [mints, year, month])

  const cells = []
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const monthLabel = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="card p-5" aria-label="Mint calendar">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold" style={{ color: 'var(--t1)' }}>{monthLabel}</h2>
        <div className="flex gap-1">
          <button
            onClick={prevMonth}
            disabled={isCurrentMonth}
            aria-label="Previous month"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-all"
            style={{
              background: 'var(--bg-raised)',
              color: isCurrentMonth ? 'var(--t4)' : 'var(--t2)',
              border: '1px solid var(--border)',
              cursor: isCurrentMonth ? 'not-allowed' : 'pointer',
              opacity: isCurrentMonth ? 0.4 : 1,
            }}
          >‹</button>
          <button
            onClick={nextMonth}
            aria-label="Next month"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-all hover:opacity-80"
            style={{ background: 'var(--bg-raised)', color: 'var(--t2)', border: '1px solid var(--border)' }}
          >›</button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map(d => (
          <div key={d} className="text-center text-[9px] font-bold uppercase tracking-widest py-1" style={{ color: 'var(--t4)' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} aria-hidden="true" />

          const mintsOnDay = mintsByDay[day] ?? []
          const isToday    = isCurrentMonth && day === today.getDate()
          const isSelected = selectedDate === day
          const hasMints   = mintsOnDay.length > 0

          const hasLive     = mintsOnDay.some(m => getMintStatus(m) === 'live')
          const hasUpcoming = mintsOnDay.some(m => getMintStatus(m) === 'upcoming')

          return (
            <button
              key={day}
              onClick={() => onSelectDate(isSelected ? null : day)}
              aria-label={`${day} — ${mintsOnDay.length} mint${mintsOnDay.length !== 1 ? 's' : ''}`}
              aria-pressed={isSelected}
              className="relative flex flex-col items-center py-1.5 rounded-xl transition-all"
              style={{
                background: isSelected
                  ? 'rgba(139,92,246,.25)'
                  : isToday
                    ? 'rgba(139,92,246,.1)'
                    : hasMints
                      ? 'rgba(255,255,255,.03)'
                      : 'transparent',
                border: `1px solid ${isSelected ? 'rgba(139,92,246,.6)' : isToday ? 'rgba(139,92,246,.3)' : 'transparent'}`,
                cursor: hasMints ? 'pointer' : 'default',
              }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: isToday || isSelected ? 'var(--purple)' : hasMints ? 'var(--t1)' : 'var(--t4)' }}
              >
                {day}
              </span>

              {/* Mint dots */}
              {hasMints && (
                <div className="flex gap-0.5 mt-0.5">
                  {hasLive && (
                    <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: 'var(--green)' }} />
                  )}
                  {hasUpcoming && (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--purple)' }} />
                  )}
                  {mintsOnDay.length > 1 && (
                    <span className="text-[7px] font-bold" style={{ color: 'var(--t3)' }}>+{mintsOnDay.length - 1}</span>
                  )}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <span className="flex items-center gap-1.5 text-[9px]" style={{ color: 'var(--t3)' }}>
          <span className="w-2 h-2 rounded-full live-dot" style={{ background: 'var(--green)' }} /> Live
        </span>
        <span className="flex items-center gap-1.5 text-[9px]" style={{ color: 'var(--t3)' }}>
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--purple)' }} /> Upcoming
        </span>
      </div>
    </div>
  )
}
