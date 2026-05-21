'use client'
import { use } from 'react'
import Link from 'next/link'
import { getMintById, CHAINS, getMintStatus } from '@/lib/mints'
import { fmtDateTime } from '@/lib/format'
import ChainBadge from '@/components/ChainBadge'
import Countdown  from '@/components/Countdown'
import { notFound } from 'next/navigation'

export default function MintPage({ params }) {
  const { id } = use(params)
  const mint   = getMintById(id)
  if (!mint) notFound()

  const status = getMintStatus(mint)
  const chain  = CHAINS[mint.chain]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 fade-up">
      <nav aria-label="Breadcrumb">
        <Link href="/" className="text-xs hover:opacity-70 transition-opacity" style={{ color: 'var(--purple)' }}>
          ← Back to Calendar
        </Link>
      </nav>

      {/* Banner + Image */}
      <div className="relative rounded-2xl overflow-hidden" style={{ height: 220, background: 'var(--bg-raised)' }}>
        <img src={mint.banner} alt="" className="w-full h-full object-cover opacity-60" aria-hidden />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg) 0%, transparent 60%)' }} />

        {/* Floating image */}
        <div className="absolute bottom-0 left-6 transform translate-y-1/2">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-4" style={{ borderColor: 'var(--bg)' }}>
            <img src={mint.image} alt={mint.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Identity */}
      <div className="pt-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black" style={{ color: 'var(--t1)' }}>{mint.name}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <ChainBadge chain={mint.chain} />
            <span className={`badge ${status === 'live' ? 'badge-live' : status === 'ended' ? 'badge-ended' : 'badge-upcoming'}`}>
              {status === 'live' && <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: 'var(--green)' }} />}
              {status}
            </span>
            <span className={`badge ${mint.type === 'whitelist' ? 'badge-wl' : mint.type === 'free' ? 'badge-free' : 'badge-public'}`}>
              {mint.type === 'whitelist' ? 'WL Only' : mint.type === 'free' ? 'Free' : 'Public'}
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-2">
          {mint.website && (
            <a href={mint.website} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-80"
              style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)', color: 'white' }}>
              Website ↗
            </a>
          )}
          {mint.discord && (
            <a href={mint.discord} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-80"
              style={{ background: 'var(--bg-raised)', color: 'var(--t2)', border: '1px solid var(--border)' }}>
              Discord ↗
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Details */}
        <div className="md:col-span-2 space-y-5">
          {/* Description */}
          <section className="card p-5" aria-label="About">
            <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--t1)' }}>About</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--t2)' }}>{mint.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {mint.tags.map(tag => (
                <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
                  style={{ background: 'rgba(139,92,246,.1)', color: 'var(--purple)', border: '1px solid rgba(139,92,246,.2)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Mint details */}
          <section className="card p-5" aria-label="Mint details">
            <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--t1)' }}>Mint Details</h2>
            <dl className="grid grid-cols-2 gap-4">
              {[
                { label: 'Price',   value: mint.price === 'FREE' ? '🎉 FREE' : `${mint.price} ${mint.currency}` },
                { label: 'Supply',  value: parseInt(mint.supply).toLocaleString() },
                { label: 'Chain',   value: chain?.label ?? mint.chain },
                { label: 'Type',    value: mint.type === 'whitelist' ? 'Whitelist Only' : mint.type === 'free' ? 'Free Mint' : 'Public' },
                { label: 'Start',   value: fmtDateTime(mint.mintDate) },
                { label: 'End',     value: fmtDateTime(mint.endDate) },
              ].map(({ label, value }) => (
                <div key={label} className="p-3 rounded-xl" style={{ background: 'var(--bg-raised)' }}>
                  <dt className="text-[9px] uppercase tracking-widest mb-1" style={{ color: 'var(--t4)' }}>{label}</dt>
                  <dd className="text-sm font-bold" style={{ color: 'var(--t1)' }}>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {/* Countdown sidebar */}
        <aside className="space-y-4">
          <div className="card p-5 flex flex-col items-center gap-4 text-center">
            {status === 'live' ? (
              <>
                <div className="w-4 h-4 rounded-full live-dot" style={{ background: 'var(--green)' }} />
                <p className="text-2xl font-black" style={{ color: 'var(--green)' }}>LIVE NOW</p>
                <p className="text-xs" style={{ color: 'var(--t3)' }}>Mint is currently active!</p>
                <a href={mint.website} target="_blank" rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl text-sm font-black text-center transition-all hover:opacity-90 pulse"
                  style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)', color: 'white', display: 'block' }}>
                  Mint Now ↗
                </a>
              </>
            ) : status === 'ended' ? (
              <>
                <p className="text-lg font-black" style={{ color: 'var(--t3)' }}>Mint Ended</p>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>This mint has concluded.</p>
              </>
            ) : (
              <>
                <p className="text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--t3)' }}>Starts in</p>
                <Countdown targetDate={mint.mintDate} />
                <a href={mint.discord} target="_blank" rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-center transition-all hover:opacity-80"
                  style={{ background: 'var(--bg-raised)', color: 'var(--t2)', border: '1px solid var(--border)', display: 'block' }}>
                  Join Discord for WL
                </a>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
