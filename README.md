# ORACLE — Autonomous DeFi Portfolio Intelligence Terminal

> *Five specialized agents. One definitive verdict. Institutional-grade portfolio intelligence for every investor.*

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-Click_Here-F5A623?style=for-the-badge&logo=vercel&logoColor=black)](https://your-vercel-url.vercel.app)
[![YouTube](https://img.shields.io/badge/DEMO_VIDEO-YouTube-FF0000?style=for-the-badge&logo=youtube)](https://youtube.com/your-demo)
[![Swarms](https://img.shields.io/badge/SWARMS-Marketplace-00E5A0?style=for-the-badge)](https://swarms.world/agent/YOUR_AGENT_ID)
[![Hackathon](https://img.shields.io/badge/ACM_HACKATHON-2026-9B6DFF?style=for-the-badge)](https://docs.swarms.ai/docs/marketplace/acm-hackathon)

---

## 🔗 Links

| Resource | URL |
|----------|-----|
| 🚀 Live Demo | https://your-vercel-url.vercel.app |
| 🎥 Demo Video | https://youtube.com/your-demo |
| 🛒 Swarms Listing | https://swarms.world/agent/YOUR_AGENT_ID |
| 💻 GitHub | https://github.com/YOUR_USERNAME/oracle-defi |

---

## What is ORACLE?

ORACLE is a **multi-agent DeFi portfolio intelligence system** built on the Swarms AI framework.
Users input any combination of Solana token symbols and five specialized AI agents simultaneously
analyze the portfolio — then synthesize findings into one actionable verdict with a Portfolio Health Score.

Unlike single-model tools, ORACLE uses a **swarm architecture** where each agent is an independent
specialist. The Portfolio Architect receives all four reports and issues the final committee ruling —
mirroring how institutional investment committees actually operate.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      ORACLE SYSTEM v2.1                         │
│              Autonomous Multi-Agent Intelligence                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                 ┌─────────▼─────────┐
                 │    USER INPUT     │
                 │   Token Symbols   │
                 │   (Max 8 Assets)  │
                 └─────────┬─────────┘
                           │
         ┌─────────────────┼──────────────────┐
         │                 │                  │
         ▼                 ▼                  ▼
  ┌────────────┐   ┌────────────┐   ┌────────────┐
  │ ⬡ RISK     │   │ ◈ ALPHA    │   │ ◎ MACRO    │
  │ SENTINEL   │   │ DETECTOR   │   │ LENS       │
  │            │   │            │   │            │
  │ Concentr.  │   │ Whale      │   │ Cycle      │
  │ Drawdown   │   │ Signals    │   │ Alignment  │
  │ Volatility │   │ Momentum   │   │ BTC Trend  │
  └─────┬──────┘   └─────┬──────┘   └─────┬──────┘
        │                │                │
        └────────┬────────┘                │
                 │       ┌─────────────────┘
                 ▼       ▼
         ┌────────────────────┐
         │  ◉ CORRELATION     │
         │     ENGINE         │
         │                    │
         │ Asset Correlation  │
         │ Sector Overlap     │
         │ Diversif. Score    │
         └────────┬───────────┘
                  │
         ┌────────▼───────────┐
         │  ⬢ PORTFOLIO       │
         │    ARCHITECT       │
         │                    │
         │ Synthesizes all    │
         │ 4 agent reports    │
         │ Issues verdict     │
         └────────┬───────────┘
                  │
    ┌─────────────▼──────────────┐
    │       FINAL VERDICT        │
    │                            │
    │   Score:     XX / 100      │
    │   ┌──────────────────────┐ │
    │   │  RESTRUCTURE         │ │
    │   │  REDUCE RISK         │ │
    │   │  HOLD                │ │
    │   │  ACCUMULATE          │ │
    │   │  STRONG BUY  ◄─────  │ │
    │   └──────────────────────┘ │
    │                            │
    │   + Rebalancing Plan       │
    │   + Top Risk               │
    │   + Top Opportunity        │
    │   + Radar Chart            │
    └────────────────────────────┘
```

---

## The 5 Agents

```
┌──────────────────────┬──────────────────────────┬────────────────────────┐
│  AGENT               │ ROLE                     │ OUTPUT                 │
├──────────────────────┼──────────────────────────┼────────────────────────┤
│  ⬡ Risk Sentinel     │ Concentration &          │ Risk Score 0-100       │
│                      │ Drawdown Analysis        │ Rating + 3 Findings    │
├──────────────────────┼──────────────────────────┼────────────────────────┤
│  ◈ Correlation       │ Asset Correlation        │ Diversification Score  │
│    Engine            │ & Sector Overlap         │ + Correlation Index    │
├──────────────────────┼──────────────────────────┼────────────────────────┤
│  ◎ Macro Lens        │ Market Cycle &           │ Macro Alignment Score  │
│                      │ BTC Dominance Trends     │ + Cycle Position       │
├──────────────────────┼──────────────────────────┼────────────────────────┤
│  ◉ Alpha Detector    │ Whale Signals &          │ Alpha Score 0-100      │
│                      │ Hidden Opportunities     │ + Best Signal          │
├──────────────────────┼──────────────────────────┼────────────────────────┤
│  ⬢ Portfolio         │ Final Synthesis &        │ Overall Score          │
│    Architect         │ Committee Ruling         │ Verdict + Action Plan  │
└──────────────────────┴──────────────────────────┴────────────────────────┘
```

---

## Features

- **5-Agent Swarm Analysis** — Each agent independently analyzes from a different perspective
- **Portfolio Health Score** — Weighted composite score from all 5 agents (0-100)
- **5-Level Verdict System** — RESTRUCTURE / REDUCE RISK / HOLD / ACCUMULATE / STRONG BUY
- **Radar Chart Visualization** — Pentagon radar showing all 5 dimensions simultaneously
- **Orbital Agent Display** — Animated canvas with 5 agent boxes orbiting in real time
- **Rebalancing Recommendation** — Specific actionable advice for portfolio optimization
- **Live Solana Block Feed** — Real-time block height and UTC clock in navbar
- **Phantom Wallet Connect** — One-click Solana wallet integration
- **Asset-Specific Intelligence** — 10+ Solana tokens with dedicated intelligence profiles
- **Swarms Marketplace** — Listed, tokenized and available for sale on swarms.world

---

## Tech Stack

```
┌──────────────────────────────────────────────┐
│  FRONTEND                                    │
│  ├── Next.js 15.3 (App Router)              │
│  ├── TypeScript 5.0                         │
│  ├── Tailwind CSS                           │
│  ├── Canvas API (Orbital Animation)         │
│  └── Bebas Neue + JetBrains Mono fonts      │
├──────────────────────────────────────────────┤
│  BACKEND                                     │
│  ├── Next.js API Routes                     │
│  ├── 5-Agent Intelligence Engine            │
│  └── 10+ Asset Intelligence Profiles        │
├──────────────────────────────────────────────┤
│  BLOCKCHAIN                                  │
│  ├── Solana Mainnet                         │
│  ├── Helius RPC (real-time data)            │
│  └── Phantom Wallet Integration             │
├──────────────────────────────────────────────┤
│  DEPLOYMENT                                  │
│  ├── Vercel (Frontend + API)                │
│  └── Swarms Marketplace (Tokenized)         │
└──────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

```bash
node >= 18.0.0
npm  >= 9.0.0
```

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/oracle-defi.git
cd oracle-defi

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your HELIUS_API_KEY to .env.local
```

### Environment Variables

```bash
# .env.local
HELIUS_API_KEY=your_helius_api_key_here
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com
```

Get a free Helius API key at [helius.dev](https://helius.dev)

### Run Development Server

```bash
npm run dev
# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## Usage

```
1. Connect your Phantom wallet (optional)

2. Enter token symbols in the input field
   Example: SOL, JUP, WIF, BONK

3. Click ANALYZE PORTFOLIO

4. Watch 5 agents activate sequentially:
   ⬡ Risk Sentinel    → analyzing concentration risk
   ◈ Correlation      → measuring asset correlation
   ◎ Macro Lens       → checking cycle alignment
   ◉ Alpha Detector   → scanning whale signals
   ⬢ Architect        → issuing final verdict

5. Review your Portfolio Intelligence Report:
   ├── Portfolio Health Score (0-100)
   ├── Committee Ruling (5 verdict levels)
   ├── Rebalancing Recommendation
   ├── Top Risk & Top Opportunity
   ├── Pentagon Radar Chart
   └── Individual agent breakdowns
```

---

## Supported Assets

```
┌──────────┬────────────────────────────────────────────┐
│  SYMBOL  │  INTELLIGENCE COVERAGE                     │
├──────────┼────────────────────────────────────────────┤
│  SOL     │  L1 metrics, TVL, TPS, ecosystem health    │
│  BTC     │  ETF flows, LTH supply, dominance trends   │
│  ETH     │  Staking yield, ETF catalyst, L2 growth    │
│  JUP     │  DEX dominance, protocol revenue, DAO      │
│  BONK    │  Meme narrative, whale data, retention     │
│  WIF     │  CEX listings, momentum, crossover demand  │
│  PYTH    │  Oracle TVL, TradFi partnerships           │
│  RAY     │  AMM TVL, protocol revenue sharing         │
│  ORCA    │  CLMM model, market maker adoption         │
│  JTO     │  MEV rewards, liquid staking narrative     │
│  ANY     │  Default DeFi intelligence profile         │
└──────────┴────────────────────────────────────────────┘
```

---

## Swarms Marketplace

ORACLE is listed and tokenized on the Swarms Marketplace (ACM Hackathon 2026).

- **Listing:** https://swarms.world/agent/YOUR_AGENT_ID
- **Token:** $ORACLE (Frenzy Mode enabled)
- **Category:** DeFi Intelligence / Portfolio Analysis
- **Hackathon:** ACM Hackathon — $30,000 prize pool

---

## Why ORACLE Wins

```
┌─────────────────────────┬──────────────┬───────────────┐
│  FEATURE                │ COMPETITOR   │ ORACLE        │
├─────────────────────────┼──────────────┼───────────────┤
│  Number of Agents       │ 4            │ 5             │
│  Analysis Target        │ Single token │ Full portfolio│
│  Visualization          │ Static list  │ Orbital canvas│
│  Verdict Levels         │ 3            │ 5             │
│  Radar Chart            │ No           │ Yes           │
│  Wallet Connect         │ Yes          │ Yes           │
│  Rebalancing Plan       │ No           │ Yes           │
│  Asset Profiles         │ Generic      │ 10+ specific  │
└─────────────────────────┴──────────────┴───────────────┘
```

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

*Built for the Swarms ACM Hackathon 2026 — Powered by Swarms AI*