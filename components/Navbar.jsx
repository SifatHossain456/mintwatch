import Link from 'next/link'

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{ background: 'rgba(5,3,15,.92)', borderColor: 'var(--border)' }}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="MintWatch home">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-base font-black"
            style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)', boxShadow: '0 0 14px rgba(139,92,246,.4)' }}
          >
            🗓
          </div>
          <div className="hidden sm:block">
            <span className="font-black text-sm tracking-tight" style={{ color: 'var(--t1)' }}>MintWatch</span>
            <span className="text-[10px] ml-2 uppercase tracking-widest" style={{ color: 'var(--t3)' }}>NFT Calendar</span>
          </div>
        </Link>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/add"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)', color: 'white' }}
          >
            <span>+</span> Submit Mint
          </Link>
        </div>
      </nav>
    </header>
  )
}
