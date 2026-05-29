# MintWatch — NFT Mint Calendar

Track upcoming and live NFT mints across Ethereum, Base, Polygon, and Arbitrum. Filter by chain, date, and type. Add community mints. Never miss a drop.

## Features

- **Mint Calendar** — Monthly calendar view with mints color-coded by status (live / upcoming / ended)
- **Mint Feed** — Card grid with search, chain filter, and sort by date or price
- **Mint Detail** — Per-mint page with full description, supply, price, mint date, and direct mint link
- **Add a Mint** — Community submission form to add new mints with validation
- **Watchlist** — Save mints to a local watchlist stored in `localStorage`
- **Countdown** — Live countdown timer on upcoming mints with aria-live announcements

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 App Router |
| Styling | Tailwind CSS v4 + CSS variables |
| State | React `useMemo`, `useState`, `localStorage` |
| Data | Static JSON + user submissions |

## Getting Started

```bash
git clone https://github.com/SifatHossain456/mintwatch.git
cd mintwatch
npm install
npm run dev
```

No environment variables required.

## Project Structure

```
app/
├── page.js            # Mint feed + calendar toggle
├── mint/[id]/         # Mint detail page
└── add/               # Community submission form
components/
├── MintCard.jsx       # Mint card with countdown
├── MintCalendar.jsx   # Monthly calendar grid
└── Countdown.jsx      # Live countdown timer
```

## License

MIT
