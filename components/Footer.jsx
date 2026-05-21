export default function Footer() {
  return (
    <footer className="border-t mt-16" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-lg text-sm flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)' }}>🗓</div>
            <span className="font-black text-sm">MintWatch</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--t3)' }}>Track upcoming NFT mints across all chains</p>
        </div>
        <p className="text-[10px]" style={{ color: 'var(--t4)' }}>
          Not financial advice · Always DYOR before minting
        </p>
      </div>
    </footer>
  )
}
