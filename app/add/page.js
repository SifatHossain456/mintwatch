'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CHAINS } from '@/lib/mints'

export default function AddMintPage() {
  const router  = useRouter()
  const [form, setForm] = useState({
    name: '', chain: 'ethereum', price: '', currency: 'ETH',
    supply: '', mintDate: '', endDate: '', type: 'public',
    website: '', twitter: '', discord: '', description: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = e => {
    e.preventDefault()
    // Save to localStorage as "community submission"
    const submissions = JSON.parse(localStorage.getItem('mintwatch-submissions') ?? '[]')
    submissions.push({ ...form, id: `custom-${Date.now()}`, submittedAt: new Date().toISOString() })
    localStorage.setItem('mintwatch-submissions', JSON.stringify(submissions))
    setSubmitted(true)
  }

  if (submitted) return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-4 fade-up">
      <div className="text-5xl">🎉</div>
      <h1 className="text-2xl font-black" style={{ color: 'var(--t1)' }}>Submitted!</h1>
      <p className="text-sm" style={{ color: 'var(--t2)' }}>
        Your mint has been saved. It will appear after review.
      </p>
      <button onClick={() => router.push('/')}
        className="px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 mt-4"
        style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)', color: 'white' }}>
        Back to Calendar
      </button>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6 fade-up">
      <header>
        <h1 className="text-2xl font-black" style={{ color: 'var(--t1)' }}>Submit a Mint</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--t2)' }}>
          Add an upcoming NFT mint to the calendar.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5" noValidate>
        <Field label="Collection Name *" required>
          <input value={form.name} onChange={e => set('name', e.target.value)}
            placeholder="e.g. Bored Ape Yacht Club" required className="input-field" />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Chain *">
            <select value={form.chain} onChange={e => set('chain', e.target.value)} className="input-field" required>
              {Object.entries(CHAINS).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Type *">
            <select value={form.type} onChange={e => set('type', e.target.value)} className="input-field" required>
              <option value="public">Public</option>
              <option value="whitelist">Whitelist Only</option>
              <option value="free">Free Mint</option>
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Mint Price *">
            <input value={form.price} onChange={e => set('price', e.target.value)}
              placeholder="0.08 or FREE" required className="input-field" />
          </Field>
          <Field label="Supply *">
            <input type="number" value={form.supply} onChange={e => set('supply', e.target.value)}
              placeholder="10000" required className="input-field" />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Mint Start (UTC) *">
            <input type="datetime-local" value={form.mintDate} onChange={e => set('mintDate', e.target.value)}
              required className="input-field" />
          </Field>
          <Field label="Mint End (UTC) *">
            <input type="datetime-local" value={form.endDate} onChange={e => set('endDate', e.target.value)}
              required className="input-field" />
          </Field>
        </div>

        <Field label="Description">
          <textarea value={form.description} onChange={e => set('description', e.target.value)}
            placeholder="Short description of the collection…" rows={3} className="input-field resize-none" />
        </Field>

        <Field label="Website URL">
          <input type="url" value={form.website} onChange={e => set('website', e.target.value)}
            placeholder="https://…" className="input-field" />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Twitter URL">
            <input type="url" value={form.twitter} onChange={e => set('twitter', e.target.value)}
              placeholder="https://twitter.com/…" className="input-field" />
          </Field>
          <Field label="Discord URL">
            <input type="url" value={form.discord} onChange={e => set('discord', e.target.value)}
              placeholder="https://discord.gg/…" className="input-field" />
          </Field>
        </div>

        <button type="submit"
          className="w-full py-3 rounded-xl text-sm font-black transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)', color: 'white' }}>
          Submit Mint →
        </button>
      </form>

      <style>{`
        .input-field {
          width: 100%; padding: 10px 14px; border-radius: 12px;
          background: var(--bg-raised); border: 1px solid var(--border);
          color: var(--t1); font-size: 13px; outline: none; transition: border-color .2s;
        }
        .input-field:focus { border-color: var(--purple); }
        .input-field option { background: var(--bg-card); }
      `}</style>
    </div>
  )
}

function Field({ label, children, required }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] uppercase tracking-widest font-bold block" style={{ color: 'var(--t3)' }}>
        {label}
      </label>
      {children}
    </div>
  )
}
