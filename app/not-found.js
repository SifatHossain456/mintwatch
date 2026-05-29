import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 1rem',
      background: 'var(--bg-0)',
    }}>
      <div style={{ fontSize: '5rem', fontWeight: 900, color: '#6366f1', marginBottom: '1rem', lineHeight: 1 }}>
        404
      </div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--t1)' }}>
        Mint not found
      </h1>
      <p style={{ marginBottom: '2rem', maxWidth: '24rem', fontSize: '0.875rem', color: 'var(--t3)', lineHeight: 1.7 }}>
        This mint doesn&apos;t exist or has already passed. Browse upcoming mints instead.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Link href="/" style={{
          padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: 600, fontSize: '0.875rem',
          background: '#6366f1', color: '#fff', textDecoration: 'none',
        }}>
          Browse Mints
        </Link>
        <Link href="/add" style={{
          padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: 600, fontSize: '0.875rem',
          border: '1px solid var(--border)', color: 'var(--t3)', textDecoration: 'none',
        }}>
          Add a Mint
        </Link>
      </div>
    </div>
  )
}
