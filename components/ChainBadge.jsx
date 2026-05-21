import { CHAINS } from '@/lib/mints'

export default function ChainBadge({ chain, size = 'sm' }) {
  const meta = CHAINS[chain] ?? { label: chain, color: '#6b7280', icon: '⬡' }
  const px   = size === 'xs' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10px]'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-bold ${px}`}
      style={{ background: `${meta.color}18`, color: meta.color, border: `1px solid ${meta.color}35` }}
    >
      <span>{meta.icon}</span>
      {meta.label}
    </span>
  )
}
