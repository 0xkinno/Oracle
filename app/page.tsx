'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import TurbineDisplay from '@/components/TurbineDisplay'
import PortfolioReport from '@/components/PortfolioReport'

const EXAMPLE_PORTFOLIOS = [
  ['SOL', 'JUP', 'BONK'],
  ['BTC', 'ETH', 'SOL', 'WIF'],
  ['JTO', 'PYTH', 'RAY', 'ORCA'],
  ['SOL', 'JUP', 'WIF', 'BONK', 'PYTH'],
]

const STATS = [
  { label: 'AGENTS', value: '5 ACTIVE' },
  { label: 'ANALYSIS MODE', value: 'PORTFOLIO' },
  { label: 'NETWORK', value: 'SOLANA' },
  { label: 'AI ENGINE', value: 'GEMINI' },
  { label: 'VERDICT TYPES', value: '5 LEVELS' },
  { label: 'DATA', value: 'REAL-TIME' },
]

export default function Home() {
  const [input, setInput] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [completedAgents, setCompletedAgents] = useState<string[]>([])
  const [report, setReport] = useState<any>(null)
  const [error, setError] = useState('')
  const [analysisCount, setAnalysisCount] = useState(0)

  const parseAssets = (raw: string): string[] => {
    return raw
      .split(/[\s,]+/)
      .map(a => a.replace('$', '').trim().toUpperCase())
      .filter(a => a.length > 0)
  }

  const runAnalysis = async () => {
    const assets = parseAssets(input)
    if (assets.length === 0) return
    if (assets.length > 8) {
      setError('Maximum 8 assets at once.')
      return
    }

    setIsAnalyzing(true)
    setReport(null)
    setError('')
    setCompletedAgents([])

    // Simulate agent completion timing
    const agentOrder = ['risk', 'correlation', 'macro', 'alpha', 'architect']
    const delays = [1800, 3200, 4800, 6400, 8000]

    agentOrder.forEach((agent, i) => {
      setTimeout(() => {
        setCompletedAgents(prev => [...prev, agent])
      }, delays[i])
    })

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assets }),
      })

      if (!res.ok) throw new Error('Analysis failed')
        const data = await res.json()
      console.log('API RESPONSE:', JSON.stringify(data, null, 2))
      setReport(data)
      setAnalysisCount(c => c + 1)
    } catch (e) {
      setError('Analysis failed. Check your API key or try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleExample = (portfolio: string[]) => {
    setInput(portfolio.join(', '))
  }

  const reset = () => {
    setReport(null)
    setCompletedAgents([])
    setInput('')
    setError('')
  }

  return (
    <div className="min-h-screen grid-bg relative">
      <Navbar />

      {/* Ticker */}
      <div
        className="fixed top-14 left-0 right-0 z-40 overflow-hidden border-b"
        style={{
          background: 'rgba(7,8,15,0.92)',
          borderColor: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="ticker-inner flex items-center gap-0 py-1.5 w-max">
          {[...STATS, ...STATS].map((s, i) => (
            <div key={i} className="flex items-center gap-3 px-6">
              <span className="text-[9px] tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                {s.label}
              </span>
              <span className="text-[9px] font-medium tracking-widest" style={{ color: 'var(--gold)', fontFamily: 'JetBrains Mono, monospace' }}>
                {s.value}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.08)' }}>|</span>
            </div>
          ))}
        </div>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-24">

        {/* Hero */}
        <div className="text-center mb-12 fade-up">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[9px] tracking-widest uppercase"
            style={{
              background: 'rgba(245,166,35,0.06)',
              border: '1px solid rgba(245,166,35,0.15)',
              color: 'var(--gold)',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full pulse-gold" style={{ background: 'var(--gold)' }} />
            Portfolio Risk Intelligence — 5 Agent Swarm
          </div>

          <h1
            className="text-[72px] sm:text-[100px] lg:text-[130px] leading-none font-bold mb-4 glow-gold"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em', color: 'white' }}
          >
            ORACLE
          </h1>

          <p
            className="text-lg sm:text-xl mb-2 italic"
            style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'DM Serif Display, serif' }}
          >
            Institutional-grade portfolio intelligence for every investor.
          </p>
          <p
            className="text-[10px] tracking-widest uppercase"
            style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
          >
            Enter your holdings → 5 agents analyze → get your portfolio health score
          </p>

          {analysisCount > 0 && (
            <div className="mt-3 text-[9px] tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
              {analysisCount} PORTFOLIO{analysisCount > 1 ? 'S' : ''} ANALYZED THIS SESSION
            </div>
          )}
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left — Turbine always visible */}
          <div className="flex flex-col items-center">
            <TurbineDisplay
              isAnalyzing={isAnalyzing}
              completedAgents={completedAgents}
              overallScore={report?.agents?.architect?.overallScore}
            />

            {/* Agent status list */}
            <div className="w-full max-w-sm mt-4 space-y-2">
              {[
                { id: 'risk',        label: 'Risk Sentinel',     color: '#EF4444' },
                { id: 'correlation', label: 'Correlation Engine', color: '#F59E0B' },
                { id: 'macro',       label: 'Macro Lens',         color: '#3B82F6' },
                { id: 'alpha',       label: 'Alpha Detector',     color: '#8B5CF6' },
                { id: 'architect',   label: 'Portfolio Architect', color: '#10B981' },
              ].map(agent => {
                const done = completedAgents.includes(agent.id)
                const active = isAnalyzing && !done && completedAgents.length === ['risk','correlation','macro','alpha','architect'].indexOf(agent.id)
                return (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between px-4 py-2 rounded-xl"
                    style={{
                      background: done ? `${agent.color}08` : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${done ? agent.color + '25' : 'rgba(255,255,255,0.05)'}`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: done ? agent.color : isAnalyzing ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
                        }}
                      />
                      <span
                        className="text-[11px]"
                        style={{
                          color: done ? 'var(--text)' : 'var(--text-dim)',
                          fontFamily: 'DM Sans, sans-serif',
                        }}
                      >
                        {agent.label}
                      </span>
                    </div>
                    <span
                      className="text-[9px] tracking-widest"
                      style={{
                        color: done ? agent.color : 'var(--text-muted)',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}
                    >
                      {done ? 'COMPLETE' : isAnalyzing ? 'QUEUED' : 'READY'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right — Input or Report */}
          <div>
            {!report ? (
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(13,17,23,0.8)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="text-[10px] tracking-widest uppercase mb-2"
                  style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Portfolio Assets
                </div>
                <p
                  className="text-[12px] mb-4"
                  style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'DM Sans, sans-serif' }}
                >
                  Enter token symbols separated by commas or spaces. Max 8 assets.
                </p>

                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="SOL, JUP, WIF, BONK, PYTH..."
                  rows={3}
                  disabled={isAnalyzing}
                  className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none mb-4"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text)',
                    fontFamily: 'JetBrains Mono, monospace',
                    caretColor: 'var(--gold)',
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      runAnalysis()
                    }
                  }}
                />

                {/* Example portfolios */}
                <div className="mb-4">
                  <div
                    className="text-[9px] tracking-widest mb-2"
                    style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    EXAMPLE PORTFOLIOS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLE_PORTFOLIOS.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => handleExample(p)}
                        disabled={isAnalyzing}
                        className="px-3 py-1 rounded-full text-[10px] transition-all"
                        style={{
                          background: 'rgba(245,166,35,0.06)',
                          border: '1px solid rgba(245,166,35,0.15)',
                          color: 'var(--gold)',
                          fontFamily: 'JetBrains Mono, monospace',
                          cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {p.join(' · ')}
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <div
                    className="mb-4 px-4 py-2 rounded-xl text-[11px]"
                    style={{
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      color: '#EF4444',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  onClick={runAnalysis}
                  disabled={isAnalyzing || !input.trim()}
                  className="w-full py-3 rounded-xl font-bold text-sm tracking-widest transition-all"
                  style={{
                    background: isAnalyzing || !input.trim()
                      ? 'rgba(255,255,255,0.05)'
                      : 'var(--gold)',
                    color: isAnalyzing || !input.trim()
                      ? 'rgba(255,255,255,0.2)'
                      : '#000',
                    fontFamily: 'JetBrains Mono, monospace',
                    cursor: isAnalyzing || !input.trim() ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isAnalyzing
                    ? `ANALYZING ${parseAssets(input).length} ASSETS...`
                    : 'ANALYZE PORTFOLIO →'}
                </button>

                {/* Feature list */}
                <div className="mt-6 space-y-2">
                  {[
                    '5 specialized agents analyze in parallel',
                    'Portfolio concentration & correlation risk',
                    'Macro cycle alignment score',
                    'Hidden alpha opportunity detection',
                    'Rebalancing recommendation',
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full" style={{ background: 'var(--gold)' }} />
                      <span
                        className="text-[11px]"
                        style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'DM Sans, sans-serif' }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="text-[10px] tracking-widest"
                    style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    PORTFOLIO INTELLIGENCE REPORT
                  </div>
                  <button
                    onClick={reset}
                    className="px-3 py-1 rounded-full text-[10px] transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: 'JetBrains Mono, monospace',
                      cursor: 'pointer',
                    }}
                  >
                    ← NEW ANALYSIS
                  </button>
                </div>
                <PortfolioReport assets={report.assets} agents={report.agents} />
              </div>
            )}
          </div>
        </div>
      </main>

      <div
        className="fixed bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.3), transparent)' }}
      />
    </div>
  )
}