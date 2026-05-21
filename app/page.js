'use client'
import { useState, useMemo } from 'react'
import { MINTS, CHAINS, getMintStatus } from '@/lib/mints'
import MintCard     from '@/components/MintCard'
import MintCalendar from '@/components/MintCalendar'

const ALL_CHAINS = ['all', ...Object.keys(CHAINS)]
const ALL_TYPES  = ['all', 'public', 'whitelist', 'free']
const ALL_STATUS = ['all', 'live', 'upcoming', 'ended']

export default function HomePage() {
  const [chain,        setChain]        = useState('all')
  const [type,         setType]         = useState('all')
  const [status,       setStatus]       = useState('upcoming')
  const [selectedDate, setSelectedDate] = useState(null)
  const [view,         setView]         = useState('grid')   // 'grid' | 'list'

  const filtered = useMemo(() => {
    return MINTS.filter(m => {
      if (chain  !== 'all' && m.chain !== chain)              return false
      if (type   !== 'all' && m.type  !== type)               return false
      if (status !== 'all' && getMintStatus(m) !== status)    return false
      if (selectedDate) {
        const d = new Date(m.mintDate).getDate()
        if (d !== selectedDate) return false
      }
      return true
    }).sort((a, b) => new Date(a.mintDate) - new Date(b.mintDate))
  }, [chain, type, status, selectedDate])

  const featured = MINTS.filter(m => m.featured && getMintStatus(m) !== 'ended')
  const liveMints = MINTS.filter(m => getMintStatus(m) === 'live')
  const upcomingCount = MINTS.filter(m => getMintStatus(m) === 'upcoming').length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 fade-up">

      {/* Hero */}
      <section aria-label="Hero" className="text-center space-y-4 py-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(139,92,246,.12)', color: 'var(--purple)', border: '1px solid rgba(139,92,246,.3)' }}>
          🗓 NFT Mint Calendar
        </div>
        <h1 className="text-4xl sm:text-5xl font-black leading-tight" style={{ color: 'var(--t1)' }}>
          Never Miss a{' '}
          <span style={{ background: 'linear-gradient(90deg,#8b5cf6,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Mint
          </span>
        </h1>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--t2)' }}>
          Track upcoming NFT drops across all chains. Live countdowns, whitelist alerts, and chain filters.
        </p>

        {/* Quick stats */}
        <dl className="flex flex-wrap items-center justify-center gap-6 pt-2">
          {[
            { label: 'Live Now',  value: liveMints.length,   color: 'var(--green)'  },
            { label: 'Upcoming',  value: upcomingCount,      color: 'var(--purple)' },
            { label: 'Chains',    value: Object.keys(CHAINS).length, color: 'var(--cyan)' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <dt className="text-[9px] uppercase tracking-widest" style={{ color: 'var(--t3)' }}>{s.label}</dt>
              <dd className="text-2xl font-black mono" style={{ color: s.color }}>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Live now banner */}
      {liveMints.length > 0 && (
        <section aria-label="Live mints" className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.25)' }}>
          <span className="w-2.5 h-2.5 rounded-full shrink-0 live-dot" style={{ background: 'var(--green)' }} />
          <span className="text-sm font-bold" style={{ color: 'var(--green)' }}>
            {liveMints.length} mint{liveMints.length > 1 ? 's' : ''} live right now:
          </span>
          <span className="text-sm" style={{ color: 'var(--t2)' }}>
            {liveMints.map(m => m.name).join(' · ')}
          </span>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Sidebar */}
        <aside className="space-y-4 lg:col-span-1" aria-label="Filters and calendar">
          {/* Calendar */}
          <MintCalendar mints={MINTS} selectedDate={selectedDate} onSelectDate={setSelectedDate} />

          {/* Filters */}
          <div className="card p-4 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--t3)' }}>Filters</h2>

            {/* Status */}
            <fieldset>
              <legend className="text-[9px] uppercase tracking-widest mb-2 block" style={{ color: 'var(--t4)' }}>Status</legend>
              <div className="flex flex-wrap gap-1.5">
                {ALL_STATUS.map(s => (
                  <button key={s} onClick={() => setStatus(s)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold capitalize transition-all"
                    style={{ background: status === s ? 'var(--purple)' : 'var(--bg-raised)', color: status === s ? 'white' : 'var(--t2)', border: '1px solid ' + (status === s ? 'var(--purple)' : 'var(--border)') }}>
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Chain */}
            <fieldset>
              <legend className="text-[9px] uppercase tracking-widest mb-2 block" style={{ color: 'var(--t4)' }}>Chain</legend>
              <div className="flex flex-wrap gap-1.5">
                {ALL_CHAINS.map(c => (
                  <button key={c} onClick={() => setChain(c)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold capitalize transition-all"
                    style={{ background: chain === c ? 'var(--purple)' : 'var(--bg-raised)', color: chain === c ? 'white' : 'var(--t2)', border: '1px solid ' + (chain === c ? 'var(--purple)' : 'var(--border)') }}>
                    {c === 'all' ? 'All' : CHAINS[c]?.label ?? c}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Type */}
            <fieldset>
              <legend className="text-[9px] uppercase tracking-widest mb-2 block" style={{ color: 'var(--t4)' }}>Type</legend>
              <div className="flex flex-wrap gap-1.5">
                {ALL_TYPES.map(t => (
                  <button key={t} onClick={() => setType(t)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold capitalize transition-all"
                    style={{ background: type === t ? 'var(--purple)' : 'var(--bg-raised)', color: type === t ? 'white' : 'var(--t2)', border: '1px solid ' + (type === t ? 'var(--purple)' : 'var(--border)') }}>
                    {t === 'all' ? 'All' : t === 'whitelist' ? 'WL Only' : t}
                  </button>
                ))}
              </div>
            </fieldset>

            {(chain !== 'all' || type !== 'all' || status !== 'upcoming' || selectedDate) && (
              <button onClick={() => { setChain('all'); setType('all'); setStatus('upcoming'); setSelectedDate(null) }}
                className="text-[10px] w-full py-1.5 rounded-lg transition-colors"
                style={{ color: 'var(--t3)', background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* Main grid */}
        <section className="lg:col-span-3" aria-label="Mint listings">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm" style={{ color: 'var(--t2)' }}>
              <span className="font-bold" style={{ color: 'var(--t1)' }}>{filtered.length}</span> mints
              {selectedDate && <span> on the {selectedDate}th</span>}
            </p>
            <div className="flex gap-1" role="group" aria-label="View toggle">
              {[{ v:'grid', icon:'⊞' }, { v:'list', icon:'☰' }].map(({ v, icon }) => (
                <button key={v} onClick={() => setView(v)} aria-pressed={view === v}
                  className="w-8 h-8 rounded-lg text-sm font-bold transition-all flex items-center justify-center"
                  style={{ background: view === v ? 'var(--purple)' : 'var(--bg-raised)', color: view === v ? 'white' : 'var(--t2)', border: '1px solid ' + (view === v ? 'var(--purple)' : 'var(--border)') }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="card p-16 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-bold" style={{ color: 'var(--t1)' }}>No mints found</p>
              <p className="text-sm mt-1" style={{ color: 'var(--t3)' }}>Try adjusting your filters</p>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((mint, i) => (
                <div key={mint.id} style={{ animationDelay: `${i * 40}ms` }} className="fade-up">
                  <MintCard mint={mint} featured={mint.featured} />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map(mint => <ListRow key={mint.id} mint={mint} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function ListRow({ mint }) {
  const status = getMintStatus(mint)
  const statusColor = status === 'live' ? 'var(--green)' : status === 'ended' ? 'var(--t4)' : 'var(--purple)'

  return (
    <a href={`/mint/${mint.id}`}
      className="card flex items-center gap-4 px-4 py-3 hover:-translate-y-0.5 transition-transform"
      style={{ display: 'flex', textDecoration: 'none' }}
    >
      <img src={mint.image} alt={mint.name} width={40} height={40} className="rounded-xl shrink-0 object-cover" loading="lazy" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate" style={{ color: 'var(--t1)' }}>{mint.name}</p>
        <p className="text-[10px]" style={{ color: 'var(--t3)' }}>{new Date(mint.mintDate).toLocaleDateString('en-US', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })}</p>
      </div>
      <span className="text-xs font-black mono shrink-0" style={{ color: status === 'live' ? 'var(--green)' : 'var(--t1)' }}>
        {mint.price === 'FREE' ? 'FREE' : `${mint.price} ${mint.currency}`}
      </span>
      <span className={`badge shrink-0 ${status === 'live' ? 'badge-live' : status === 'ended' ? 'badge-ended' : 'badge-upcoming'}`}>
        {status}
      </span>
    </a>
  )
}
