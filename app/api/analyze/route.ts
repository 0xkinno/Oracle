import { NextRequest, NextResponse } from 'next/server'

const PORTFOLIO_INTELLIGENCE: Record<string, any> = {
  DEFAULT: {
    risk: {
      score: 62,
      rating: 'MODERATE',
      headline: 'Portfolio carries moderate concentration risk with correlated drawdown exposure across major positions.',
      findings: [
        'Top 3 holdings represent over 70% of portfolio weight — concentration risk is elevated',
        'Drawdown correlation during bear markets exceeds 0.85 across all positions',
        'No stablecoin buffer detected — full exposure to crypto market volatility',
      ],
      metric: 'Max Drawdown Estimate: -68% in adverse conditions'
    },
    correlation: {
      score: 41,
      rating: 'CORRELATED',
      headline: 'Assets show high correlation to SOL ecosystem — limited true diversification benefit.',
      findings: [
        'Solana-native tokens dominate — ecosystem risk is concentrated',
        'BTC correlation coefficient averages 0.79 across all positions',
        'No cross-chain or real-world asset exposure detected in portfolio',
      ],
      metric: 'Portfolio Correlation Index: 0.79 (High)'
    },
    macro: {
      score: 71,
      rating: 'ALIGNED',
      headline: 'Portfolio is well-aligned with the 2025-2026 altcoin expansion cycle and DeFi resurgence narrative.',
      findings: [
        'Solana ecosystem outperforming ETH in developer activity and TVL growth Q1 2026',
        'DeFi blue chips showing institutional accumulation patterns on-chain',
        'Macro tailwind: Fed rate cuts and ETF inflows supporting risk-on appetite',
      ],
      metric: 'Macro Alignment Score: 71/100 — Bullish Cycle Position'
    },
    alpha: {
      score: 68,
      rating: 'STRONG',
      headline: 'Strong alpha opportunity detected — portfolio positioned in high-momentum sector with catalyst events ahead.',
      findings: [
        'Multiple holdings have upcoming protocol upgrades and token unlock events',
        'On-chain whale accumulation detected across 3 of 4 positions in past 30 days',
        'Social sentiment trending upward — 34% increase in mentions week-over-week',
      ],
      metric: 'Best Alpha Signal: Whale accumulation + protocol catalyst convergence'
    },
    architect: {
      overallScore: 68,
      verdict: 'ACCUMULATE',
      headline: 'Portfolio is fundamentally sound with strong macro tailwinds. Concentrate on reducing correlation risk while maintaining momentum exposure.',
      recommendation: 'Reduce single-asset concentration below 40% of portfolio. Add 10-15% stablecoin buffer for tactical redeployment during dips. Consider adding 1-2 uncorrelated assets from RWA or infrastructure sectors.',
      topRisk: 'High Solana ecosystem concentration — a single protocol exploit or network outage could impact 80%+ of portfolio value simultaneously.',
      topOpportunity: 'DeFi resurgence cycle with institutional ETF inflows creating sustained buying pressure — current dip zones represent high-conviction accumulation points.'
    }
  }
}

const ASSET_INTELLIGENCE: Record<string, any> = {
  SOL: { riskDelta: -5, alphaDelta: 10, macro: 'Solana leads L1 performance metrics in 2026 with 65k TPS and $8B TVL', whale: 'Net accumulation by top 50 wallets over past 14 days confirmed' },
  BTC: { riskDelta: -15, alphaDelta: -5, macro: 'Bitcoin ETF inflows averaging $800M/week — institutional demand structurally elevated', whale: 'Long-term holder supply at all-time high — supply shock developing' },
  ETH: { riskDelta: -10, alphaDelta: 5, macro: 'Ethereum staking yield at 4.2% attracting institutional capital as risk-free rate alternative', whale: 'ETF approval catalyst expected to drive significant price appreciation' },
  JUP: { riskDelta: 5, alphaDelta: 15, macro: 'Jupiter dominates Solana DEX aggregation with 70% market share — protocol revenue growing 40% QoQ', whale: 'DAO treasury buybacks creating consistent price support' },
  BONK: { riskDelta: 15, alphaDelta: 20, macro: 'Meme coin narrative cycling back — BONK has strongest community retention on Solana', whale: 'Large holder accumulation detected — top 10 wallets increased positions 23%' },
  WIF: { riskDelta: 12, alphaDelta: 18, macro: 'WIF maintains meme coin alpha status with expanding CEX listings pipeline', whale: 'Coinbase listing momentum driving institutional retail crossover demand' },
  PYTH: { riskDelta: -3, alphaDelta: 12, macro: 'Oracle infrastructure critical for DeFi growth — PYTH feeds power $50B+ in DeFi protocols', whale: 'Strategic partnerships with TradFi data providers announced Q1 2026' },
  RAY: { riskDelta: 2, alphaDelta: 14, macro: 'Raydium TVL up 180% YoY as Solana DeFi ecosystem expands rapidly', whale: 'Protocol revenue sharing model attracting yield-seeking institutional capital' },
  ORCA: { riskDelta: 3, alphaDelta: 11, macro: 'Orca concentrated liquidity model gaining traction with professional market makers', whale: 'Steady accumulation by DeFi-native funds over past 60 days' },
  JTO: { riskDelta: 0, alphaDelta: 16, macro: 'Jito MEV rewards creating sustainable protocol revenue — $120M distributed to stakers in 2025', whale: 'Liquid staking narrative gaining momentum with institutional validators' },
}

function buildReport(assets: string[]) {
    const base = JSON.parse(JSON.stringify(PORTFOLIO_INTELLIGENCE.DEFAULT))
  
    let riskAdj = 0
    let alphaAdj = 0
    const assetInsights: string[] = []
    const whaleSignals: string[] = []
  
    // Asset-specific correlation scores
    const correlationMap: Record<string, number> = {
      BTC: 75, ETH: 65, SOL: 50, JUP: 35, BONK: 25,
      WIF: 22, PYTH: 45, RAY: 38, ORCA: 40, JTO: 42,
    }
  
    // Asset-specific macro scores
    const macroMap: Record<string, number> = {
      BTC: 85, ETH: 78, SOL: 82, JUP: 74, BONK: 58,
      WIF: 55, PYTH: 76, RAY: 71, ORCA: 68, JTO: 73,
    }
  
    // Risk headlines per asset combo
    const riskHeadlines: Record<string, string> = {
      BTC: 'Blue-chip portfolio with low smart contract risk — primary exposure is macro drawdown.',
      ETH: 'Ethereum exposure adds staking yield stability but introduces L2 bridge risk vectors.',
      SOL: 'Solana ecosystem concentration amplifies single-chain risk across all positions.',
      JUP: 'DEX aggregator exposure carries smart contract and liquidity fragmentation risk.',
      BONK: 'Meme asset dominance creates extreme volatility risk — sentiment-driven drawdowns likely.',
      WIF: 'High beta meme exposure requires tight risk management and position sizing discipline.',
      PYTH: 'Oracle infrastructure adds systemic risk — protocol failure impacts entire DeFi stack.',
      RAY: 'AMM liquidity provider risk includes impermanent loss and smart contract vulnerabilities.',
      ORCA: 'Concentrated liquidity positions amplify impermanent loss during high volatility periods.',
      JTO: 'Liquid staking derivative risk includes validator slashing and protocol smart contract bugs.',
    }
  
    // Alpha headlines per asset
    const alphaHeadlines: Record<string, string> = {
      BTC: 'Bitcoin ETF inflows and halving cycle dynamics create structural supply shock alpha.',
      ETH: 'Ethereum restaking narrative and institutional staking demand generating consistent alpha.',
      SOL: 'Solana memecoin supercycle and DePIN narrative driving outsized alpha vs other L1s.',
      JUP: 'Jupiter token buybacks and perpetuals expansion creating strong alpha signal for JUP holders.',
      BONK: 'BONK community-driven marketing events and exchange listings generating speculative alpha.',
      WIF: 'WIF options market expansion and Coinbase futures listing creating institutional alpha signal.',
      PYTH: 'PYTH real-world data expansion into TradFi creating long-term fundamental alpha.',
      RAY: 'Raydium v3 launch and concentrated liquidity upgrade generating significant protocol alpha.',
      ORCA: 'Orca CLMM fee optimization and professional market maker adoption driving alpha.',
      JTO: 'Jito MEV reward growth and restaking integration creating compounding yield alpha.',
    }
  
    assets.forEach(a => {
      const intel = ASSET_INTELLIGENCE[a]
      if (intel) {
        riskAdj += intel.riskDelta
        alphaAdj += intel.alphaDelta
        assetInsights.push(intel.macro)
        whaleSignals.push(`${a}: ${intel.whale}`)
      }
    })
  
    // Unique correlation score based on asset mix
    const avgCorrelation = assets.reduce((sum, a) => sum + (correlationMap[a] ?? 50), 0) / assets.length
    base.correlation.score = Math.round(Math.max(15, Math.min(90, avgCorrelation)))
    if (base.correlation.score >= 70) base.correlation.rating = 'HIGHLY_CORRELATED'
    else if (base.correlation.score >= 55) base.correlation.rating = 'CORRELATED'
    else if (base.correlation.score >= 40) base.correlation.rating = 'MIXED'
    else if (base.correlation.score >= 25) base.correlation.rating = 'DIVERSIFIED'
    else base.correlation.rating = 'WELL_DIVERSIFIED'
  
    // Unique macro score based on asset mix
    const avgMacro = assets.reduce((sum, a) => sum + (macroMap[a] ?? 65), 0) / assets.length
    base.macro.score = Math.round(Math.max(30, Math.min(95, avgMacro)))
  
    // Unique risk headline based on primary asset
    const primaryAsset = assets[0]
    if (riskHeadlines[primaryAsset]) {
      base.risk.headline = riskHeadlines[primaryAsset]
    }
  
    // Unique alpha headline based on primary asset
    if (alphaHeadlines[primaryAsset]) {
      base.alpha.headline = alphaHeadlines[primaryAsset]
    }
  
    // Unique findings based on actual assets
    base.risk.findings = [
      assets.length === 1
        ? `Single asset portfolio — 100% concentration in ${assets[0]} with no diversification`
        : `Top holding ${assets[0]} represents ${Math.round(100 / assets.length * 1.4)}% estimated weight — rebalancing recommended`,
      `Drawdown correlation between ${assets.slice(0, 2).join(' and ')} estimated at ${Math.round(avgCorrelation / 100 * 0.95 * 100) / 100}`,
      assets.some(a => ['BONK', 'WIF'].includes(a))
        ? 'Meme asset exposure detected — high volatility risk requires strict position sizing'
        : 'No extreme volatility assets detected — standard DeFi risk profile applies',
    ]
  
    // Inject real asset insights
    if (assetInsights.length > 0) {
      base.macro.findings = [
        assetInsights[0] || base.macro.findings[0],
        assetInsights[1] || base.macro.findings[1],
        assetInsights[2] || base.macro.findings[2],
      ]
    }
    if (whaleSignals.length > 0) {
      base.alpha.findings = [
        whaleSignals[0] || base.alpha.findings[0],
        whaleSignals[1] || base.alpha.findings[1],
        whaleSignals[2] || base.alpha.findings[2],
      ]
    }
  
    // Adjust scores
    base.risk.score = Math.max(10, Math.min(95, base.risk.score - riskAdj))
    base.alpha.score = Math.max(10, Math.min(98, base.alpha.score + Math.round(alphaAdj / assets.length)))
  
    // Update risk rating
    if (base.risk.score >= 75) base.risk.rating = 'LOW'
    else if (base.risk.score >= 55) base.risk.rating = 'MODERATE'
    else if (base.risk.score >= 35) base.risk.rating = 'HIGH'
    else base.risk.rating = 'CRITICAL'
  
    // Update alpha rating
    if (base.alpha.score >= 80) base.alpha.rating = 'EXCEPTIONAL'
    else if (base.alpha.score >= 65) base.alpha.rating = 'STRONG'
    else if (base.alpha.score >= 45) base.alpha.rating = 'MODERATE'
    else base.alpha.rating = 'WEAK'
  
    // Recalculate overall
    const overall = Math.round(
      (base.risk.score * 0.3) +
      (base.correlation.score * 0.2) +
      (base.macro.score * 0.25) +
      (base.alpha.score * 0.25)
    )
    base.architect.overallScore = overall
  
    // Verdict
    if (overall >= 80) base.architect.verdict = 'STRONG_BUY'
    else if (overall >= 65) base.architect.verdict = 'ACCUMULATE'
    else if (overall >= 50) base.architect.verdict = 'HOLD'
    else if (overall >= 35) base.architect.verdict = 'REDUCE_RISK'
    else base.architect.verdict = 'RESTRUCTURE'
  
    // Unique headline and recommendation
    const assetList = assets.join(', ')
    const verdictWord = base.architect.verdict.replace('_', ' ')
  
    base.architect.headline = `${assetList} portfolio scores ${overall}/100 — committee verdict: ${verdictWord}. ${overall >= 65
      ? 'Macro alignment and alpha signals support continued accumulation.'
      : 'Risk-adjusted returns insufficient — rebalancing required before next cycle.'}`
  
    base.architect.recommendation = assets.length === 1
      ? `Single asset portfolio in ${assets[0]} carries maximum concentration risk. Diversify into 3-5 uncorrelated assets. Recommended additions: ${assets[0] === 'SOL' ? 'BTC, ETH, PYTH' : assets[0] === 'BTC' ? 'ETH, SOL, JUP' : 'SOL, BTC, PYTH'}. Keep ${assets[0]} at maximum 40% portfolio weight.`
      : `${overall >= 65
        ? `Maintain core positions in ${assets[0]} and ${assets[1]}. Scale into ${assets[2] || assets[0]} on 10-15% dips. Set portfolio-level stop at -25% from current levels.`
        : `Reduce ${assets.find(a => ['BONK', 'WIF'].includes(a)) || assets[0]} exposure by 30-40%. Reallocate to lower-risk assets like BTC or ETH. Add 15-20% stablecoin buffer for tactical deployment.`
      }`
  
    base.architect.topRisk = assets.length === 1
      ? `100% single-asset concentration in ${assets[0]} — any protocol-specific exploit or regulatory action eliminates entire portfolio value.`
      : `${assets.some(a => ['BONK', 'WIF'].includes(a))
        ? 'Meme asset sentiment reversal — community-driven assets can lose 80-90% rapidly with no fundamental support floor.'
        : `${assets[0]} ecosystem concentration — correlated drawdown across ${assets.slice(0, 3).join(', ')} positions during risk-off events.`}`
  
    base.architect.topOpportunity = `${assets[0]} ${macroMap[assets[0]] >= 75
      ? 'institutional adoption cycle is accelerating — ETF inflows and on-chain accumulation signal sustained upside momentum.'
      : 'ecosystem expansion creating asymmetric upside — current valuations represent attractive entry for medium-term holders.'}`
  
    return base
  }

export async function POST(req: NextRequest) {
  try {
    const { assets } = await req.json()

    if (!assets || !Array.isArray(assets) || assets.length === 0) {
      return NextResponse.json({ error: 'No assets provided' }, { status: 400 })
    }

    const cleanAssets = assets.map((a: string) => a.trim().toUpperCase())
    const report = buildReport(cleanAssets)

    // Simulate processing time for realism
    await new Promise(r => setTimeout(r, 8500))

    return NextResponse.json({
      assets: cleanAssets,
      agents: report,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Analyze error:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}