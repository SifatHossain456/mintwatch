import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: { default: 'MintWatch — NFT Mint Calendar', template: '%s — MintWatch' },
  description: 'Track upcoming NFT mints across Ethereum, Base, Polygon, Arbitrum and more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
