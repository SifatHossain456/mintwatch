'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getMintStatus } from '@/lib/mints'
import { fmtDateTime, msToCountdown, pad } from '@/lib/format'
import ChainBadge from './ChainBadge'

function StatusBadge({ status }) {
  if (status === 'live') return (
    <span className="badge badge-live">
      <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: 'var(--green)' }} />
      Live
    </span>
  )
  if (status === 'ended')   return <span className="badge badge-ended">Ended</span>
  return <span className="badge badge-upcoming">Upcoming</span>
}

function TypeBadge({ type }) {
  if (type === 'whitelist') return <span className="badge badge-wl">WL Only</span>
  if (type === 'free')      return <span className="badge badge-free">Free</span>
  return <span className="badge badge-public">Public</span>
}

function MiniCountdown({ mintDate, status }) {
  const [cd, setCd] = useState({ d:0, h:0, m:0, s:0 })

  useEffect(() => {
    if (status !== 'upcoming') return
    const tick = () => setCd(msToCountdown(new Date(mintDate) - Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [mintDate, status])

  if (status !== 'upcoming') return null
  const parts = cd.d > 0
    ? `${cd.d}d ${pad(cd.h)}h ${pad(cd.m)}m`
    : `${pad(cd.h)}h ${pad(cd.m)}m ${pad(cd.s)}s`

  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
      style={{ background: 'rgba(139,92,246,.1)', border: '1px solid rgba(139,92,246,.25)' }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--purple)', flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
      <span className="text-xs mono font-bold tabnum" style={{ color: 'var(--purple)' }}>{parts}</span>
    </div>
  )
}

export default function MintCard({ mint, featured = false }) {
  const status = getMintStatus(mint)

  return (
    <article
      className={`card overflow-hidden flex flex-col transition-transform hover:-translate-y-1 ${featured ? 'pulse' : ''}`}
      aria-label={`${mint.name} NFT mint`}
    >
      {/* Image */}
      <Link href={`/mint/${mint.id}`} className="block relative">
        <div className="aspect-square overflow-hidden" style={{ background: 'var(--bg-raised)' }}>
          <img
            src={mint.image}
            alt={mint.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Overlay badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          <StatusBadge status={status} />
          {featured && (
            <span className="badge" style={{ background: 'rgba(245,158,11,.15)', color: 'var(--yellow)', border: '1px solid rgba(245,158,11,.3)' }}>
              ★ Featured
            </span>
          )}
        </div>
        <div className="absolute top-2.5 right-2.5">
          <ChainBadge chain={mint.chain} size="xs" />
        </div>
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <Link href={`/mint/${mint.id}`}>
            <h3 className="font-bold text-sm hover:text-purple-400 transition-colors" style={{ color: 'var(--t1)' }}>
              {mint.name}
            </h3>
          </Link>
          <p className="text-[11px] mt-0.5 line-clamp-2" style={{ color: 'var(--t3)' }}>
            {mint.description}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-[8px] uppercase tracking-widest" style={{ color: 'var(--t4)' }}>Price</p>
            <p className="text-sm font-black mono" style={{ color: mint.type === 'free' ? 'var(--green)' : 'var(--t1)' }}>
              {mint.price === 'FREE' ? 'FREE' : `${mint.price} ${mint.currency}`}
            </p>
          </div>
          <div>
            <p className="text-[8px] uppercase tracking-widest" style={{ color: 'var(--t4)' }}>Supply</p>
            <p className="text-sm font-black mono" style={{ color: 'var(--t1)' }}>
              {parseInt(mint.supply).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="text-[10px]" style={{ color: 'var(--t3)' }}>
          <time dateTime={mint.mintDate}>{fmtDateTime(mint.mintDate)}</time>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <TypeBadge type={mint.type} />
          <MiniCountdown mintDate={mint.mintDate} status={status} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {mint.tags.map(tag => (
            <span
              key={tag}
              className="text-[9px] px-2 py-0.5 rounded-full"
              style={{ background: 'var(--bg-raised)', color: 'var(--t3)', border: '1px solid var(--border)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
