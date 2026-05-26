'use client'

import RadarChart from './RadarChart'

interface AgentData {
  score: number
  rating: string
  headline: string
  findings: string[]
  metric: string
}

interface ArchitectData {
  overallScore: number
  verdict: string
  headline: string
  recommendation: string
  topRisk: string
  topOpportunity: string
}

interface Props {
  assets: string[]
  agents: {
    risk: AgentData
    correlation: AgentData
    macro: AgentData
    alpha: AgentData
    architect: ArchitectData
  }
}

const VERDICT_CONFIG: Record<string, { color: string; bg: string; border: string; label: string }> = {
  RESTRUCTURE:  { color: '#FF4444', bg: 'rgba(255,68,68,0.08)',   border: 'rgba(255,68,68,0.25)',   label: 'RESTRUCTURE' },
  REDUCE_RISK:  { color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.25)',  label: 'REDUCE RISK' },
  HOLD:         { color: '#F5A623', bg: 'rgba(245,166,35,0.08)',  border: 'rgba(245,166,35,0.25)',  label: 'HOLD' },
  ACCUMULATE:   { color: '#00E5A0', bg: 'rgba(0,229,160,0.08)',   border: 'rgba(0,229,160,0.25)',   label: 'ACCUMULATE' },
  STRONG_BUY:   { color: '#00E5A0', bg: 'rgba(0,229,160,0.10)',   border: 'rgba(0,229,160,0.35)',   label: 'STRONG BUY' },
}

const AGENT_CONFIG = [
  { key: 'risk',        label: 'Risk Sentinel',      color: '#FF4444', icon: '⬡', desc: 'Concentration & Drawdown Risk' },
  { key: 'correlation', label: 'Correlation Engine',  color: '#F59E0B', icon: '◈', desc: 'Asset Correlation Analysis' },
  { key: 'macro',       label: 'Macro Lens',          color: '#4D9EFF', icon: '◎', desc: 'Market Cycle Alignment' },
  { key: 'alpha',       label: 'Alpha Detector',      color: '#9B6DFF', icon: '◉', desc: 'Hidden Opportunity Signals' },
]

export default function PortfolioReport({ assets, agents }: Props) {
  const architect = agents?.architect
  const vc = VERDICT_CONFIG[architect?.verdict] || VERDICT_CONFIG['HOLD']

  const scores = {
    risk: agents?.risk?.score ?? 0,
    correlation: agents?.correlation?.score ?? 0,
    macro: agents?.macro?.score ?? 0,
    alpha: agents?.alpha?.score ?? 0,
    overall: architect?.overallScore ?? 0,
  }

  return (
    <div className="space-y-4 fade-up">

      {/* Assets analyzed */}
      <div className="rounded-2xl px-5 py-4" style={{ background: 'rgba(13,17,23,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="text-[9px] tracking-widest mb-3" style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
          PORTFOLIO ANALYZED
        </div>
        <div className="flex flex-wrap gap-2">
          {assets.map(a => (
            <span key={a} className="px-3 py-1 rounded-full text-[11px] font-medium"
              style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', color: 'var(--gold)', fontFamily: 'JetBrains Mono, monospace' }}>
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* Verdict + Score */}
      <div className="rounded-2xl p-6" style={{ background: vc.bg, border: '1px solid ' + vc.border }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: vc.color }} />
          <span className="text-[10px] font-bold tracking-widest" style={{ color: vc.color, fontFamily: 'JetBrains Mono, monospace' }}>
            {vc.label}
          </span>
          <span className="text-[10px] tracking-widest" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'JetBrains Mono, monospace' }}>
            — COMMITTEE RULING
          </span>
        </div>

        <div className="flex items-end gap-2 mb-1">
          <span className="text-5xl font-bold" style={{ color: vc.color, fontFamily: 'JetBrains Mono, monospace' }}>
            {architect?.overallScore ?? '—'}
          </span>
          <span className="text-xl mb-1 opacity-40" style={{ color: vc.color, fontFamily: 'JetBrains Mono, monospace' }}>/100</span>
        </div>
        <div className="text-[9px] tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'JetBrains Mono, monospace' }}>
          PORTFOLIO HEALTH SCORE
        </div>

        {/* Score bar */}
        <div className="w-full h-1.5 rounded-full mb-5" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="h-1.5 rounded-full transition-all duration-1000"
            style={{ width: (architect?.overallScore ?? 0) + '%', background: 'linear-gradient(90deg, ' + vc.color + '60, ' + vc.color + ')' }} />
        </div>

        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text)', fontFamily: 'DM Sans, sans-serif' }}>
          {architect?.headline}
        </p>

        {/* Recommendation */}
        <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(0,0,0,0.25)' }}>
          <div className="text-[9px] tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono, monospace' }}>
            REBALANCING RECOMMENDATION
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'DM Sans, sans-serif' }}>
            {architect?.recommendation}
          </p>
        </div>

        {/* Top risk + opportunity */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl p-3" style={{ background: 'rgba(255,68,68,0.06)', border: '1px solid rgba(255,68,68,0.15)' }}>
            <div className="text-[9px] tracking-widest mb-1.5" style={{ color: '#FF4444', fontFamily: 'JetBrains Mono, monospace' }}>
              TOP RISK
            </div>
            <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'DM Sans, sans-serif' }}>
              {architect?.topRisk}
            </p>
          </div>
          <div className="rounded-xl p-3" style={{ background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.15)' }}>
            <div className="text-[9px] tracking-widest mb-1.5" style={{ color: '#00E5A0', fontFamily: 'JetBrains Mono, monospace' }}>
              TOP OPPORTUNITY
            </div>
            <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'DM Sans, sans-serif' }}>
              {architect?.topOpportunity}
            </p>
          </div>
        </div>
      </div>

      {/* Radar chart */}
      <div className="rounded-2xl p-6 flex flex-col items-center" style={{ background: 'rgba(13,17,23,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="text-[9px] tracking-widest mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
          PORTFOLIO INTELLIGENCE RADAR
        </div>
        <RadarChart scores={scores} />
      </div>

      {/* 4 Agent breakdown cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {AGENT_CONFIG.map(card => {
          const data = agents[card.key as keyof typeof agents] as AgentData
          if (!data) return null
          return (
            <div key={card.key} className="rounded-2xl p-5"
              style={{ background: 'rgba(13,17,23,0.9)', border: '1px solid ' + card.color + '20' }}>

              {/* Agent header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                    style={{ background: card.color + '15', border: '1px solid ' + card.color + '30', color: card.color }}>
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold" style={{ color: 'var(--text)', fontFamily: 'DM Sans, sans-serif' }}>
                      {card.label}
                    </div>
                    <div className="text-[9px] tracking-widest" style={{ color: card.color, fontFamily: 'JetBrains Mono, monospace' }}>
                      {data.rating}
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold" style={{ color: card.color, fontFamily: 'JetBrains Mono, monospace' }}>
                  {data.score}
                </div>
              </div>

              {/* Score bar */}
              <div className="h-1 rounded-full overflow-hidden mb-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-1 rounded-full" style={{ width: data.score + '%', background: 'linear-gradient(90deg, ' + card.color + '60, ' + card.color + ')' }} />
              </div>

              {/* Headline */}
              <p className="text-[11px] mb-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
                {data.headline}
              </p>

              {/* Findings */}
              <div className="space-y-1.5 mb-3">
                {data.findings?.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: card.color }} />
                    <span className="text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'JetBrains Mono, monospace' }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              {/* Key metric */}
              <div className="pt-2 text-[9px] tracking-widest" style={{ borderTop: '1px solid ' + card.color + '15', color: card.color, fontFamily: 'JetBrains Mono, monospace' }}>
                {data.metric}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 pb-4">
        <span className="text-[9px] tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
          NOT FINANCIAL ADVICE — ORACLE V2.1
        </span>
        <a href="https://swarms.world" target="_blank" rel="noopener noreferrer"
          className="text-[9px] tracking-widest transition-colors"
          style={{ color: 'rgba(245,166,35,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
          POWERED BY SWARMS →
        </a>
      </div>
    </div>
  )
}