'use client'
import { useMemo } from 'react'
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
  const year  = today.getFullYear()
  const month = today.getMonth()

  const daysInMonth  = getDaysInMonth(year, month)
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

  return (
    <div className="card p-5" aria-label="Mint calendar">
      <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--t1)' }}>
        {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </h2>

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
          if (!day) return <div key={`empty-${i}`} />

          const mintsOnDay = mintsByDay[day] ?? []
          const isToday    = day === today.getDate()
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
