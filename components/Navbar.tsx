'use client'

import { useState, useEffect } from 'react'
import { Activity, Cpu, Globe, ChevronRight } from 'lucide-react'

export default function Navbar() {
  const [time, setTime] = useState('')
  const [blockHeight, setBlockHeight] = useState(285432190)
  const [wallet, setWallet] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toUTCString().split(' ')[4] + ' UTC')
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight(prev => prev + Math.floor(Math.random() * 3))
    }, 400)
    return () => clearInterval(interval)
  }, [])

  const connectWallet = async () => {
    try {
      setConnecting(true)
      const win = window as any
      if (!win.solana || !win.solana.isPhantom) {
        window.open('https://phantom.app/', '_blank')
        return
      }
      const response = await win.solana.connect()
      const address = response.publicKey.toString()
      setWallet(address)
    } catch (e) {
      console.error('Wallet connect failed', e)
    } finally {
      setConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      const win = window as any
      if (win.solana) await win.solana.disconnect()
      setWallet(null)
    } catch (e) {}
  }

  const shortAddress = (addr: string) => addr.slice(0, 4) + '...' + addr.slice(-4)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
      style={{ background: 'rgba(5, 8, 16, 0.85)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded border border-amber-500/40 flex items-center justify-center"
              style={{ background: 'rgba(245,158,11,0.1)' }}>
              <Cpu size={14} className="text-amber-400" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 pulse-green" />
          </div>
          <div>
            <div className="font-display text-xl text-white tracking-widest leading-none"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}>ORACLE</div>
            <div className="text-[9px] text-slate-500 tracking-widest uppercase leading-none mt-0.5"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              DeFi Intelligence Terminal
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-green" />
            <span className="text-[10px] text-slate-400 tracking-widest"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}>LIVE</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <Globe size={10} className="text-slate-500" />
            <span className="text-[10px] text-slate-400"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}>SOL BLOCK</span>
            <span className="text-[10px] text-amber-400"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}>#{blockHeight.toLocaleString()}</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <Activity size={10} className="text-slate-500" />
            <span className="text-[10px] text-slate-400"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}>{time}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {wallet ? (
            <button
              onClick={disconnectWallet}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-medium tracking-widest transition-all hover:opacity-80"
              style={{
                background: 'rgba(0,229,160,0.08)',
                border: '1px solid rgba(0,229,160,0.25)',
                color: '#00E5A0',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00E5A0' }} />
              {shortAddress(wallet)}
            </button>
          ) : (
            <button
              onClick={connectWallet}
              disabled={connecting}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-medium tracking-widest transition-all hover:opacity-80 disabled:opacity-50"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              {connecting ? 'CONNECTING...' : 'CONNECT WALLET'}
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/5 text-[10px] text-slate-400"
            style={{ background: 'rgba(255,255,255,0.02)', fontFamily: 'JetBrains Mono, monospace' }}>
            <span className="text-amber-400">5</span>
            <span>AGENTS</span>
          </div>

          <a href="https://swarms.world/launch?type=prompt&model=tokenized&frenzy=true"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded text-[11px] font-medium transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#050810', fontFamily: 'JetBrains Mono, monospace' }}>
            SWARMS <ChevronRight size={10} />
          </a>
        </div>

      </div>
    </nav>
  )
}