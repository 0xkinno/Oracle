'use client'

import { useEffect, useRef } from 'react'

interface Props {
  isAnalyzing: boolean
  completedAgents: string[]
  overallScore?: number
}

const AGENTS = [
  { id: 'risk',        label: 'RISK SENTINEL',     sublabel: 'Contract Risk',    color: '#FF4444', icon: '⬡' },
  { id: 'correlation', label: 'CORRELATION',        sublabel: 'Diversification',  color: '#F59E0B', icon: '◈' },
  { id: 'macro',       label: 'MACRO LENS',         sublabel: 'Cycle Alignment',  color: '#4D9EFF', icon: '◎' },
  { id: 'alpha',       label: 'ALPHA DETECTOR',     sublabel: 'Opportunities',    color: '#9B6DFF', icon: '◉' },
  { id: 'architect',   label: 'ARCHITECT',          sublabel: 'Final Verdict',    color: '#00E5A0', icon: '⬢' },
]

export default function TurbineDisplay({ isAnalyzing, completedAgents, overallScore }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const animRef = useRef<number>(0)
  const speedRef = useRef(0.004)

  useEffect(() => {
    speedRef.current = isAnalyzing ? 0.014 : 0.004
  }, [isAnalyzing])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = 440
    const H = 440
    canvas.width = W
    canvas.height = H
    const cx = W / 2
    const cy = H / 2
    const orbitR = 155
    const boxW = 80
    const boxH = 52
    const boxR = 7

    function roundRect(x: number, y: number, w: number, h: number, r: number) {
      if (!ctx) return
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.lineTo(x + w - r, y)
      ctx.quadraticCurveTo(x + w, y, x + w, y + r)
      ctx.lineTo(x + w, y + h - r)
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      ctx.lineTo(x + r, y + h)
      ctx.quadraticCurveTo(x, y + h, x, y + h - r)
      ctx.lineTo(x, y + r)
      ctx.quadraticCurveTo(x, y, x + r, y)
      ctx.closePath()
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      const t = frameRef.current

      // Outer dashed orbit ring
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, orbitR, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 1
      ctx.setLineDash([3, 10])
      ctx.stroke()
      ctx.setLineDash([])
      ctx.restore()

      // Inner decorative ring
      ctx.beginPath()
      ctx.arc(cx, cy, 55, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(245,166,35,0.08)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw each agent box
      AGENTS.forEach((agent, i) => {
        const angle = (i / 5) * Math.PI * 2 + t
        const ax = cx + orbitR * Math.cos(angle)
        const ay = cy + orbitR * Math.sin(angle)
        const isComplete = completedAgents.includes(agent.id)
        const bx = ax - boxW / 2
        const by = ay - boxH / 2

        // Glow behind box
        if (isComplete) {
          const grd = ctx.createRadialGradient(ax, ay, 0, ax, ay, 60)
          grd.addColorStop(0, agent.color + '22')
          grd.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(ax, ay, 60, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()
        }

        // Connector line from center
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(ax, ay)
        ctx.strokeStyle = isComplete ? agent.color + '18' : 'rgba(255,255,255,0.03)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Box fill
        roundRect(bx, by, boxW, boxH, boxR)
        ctx.fillStyle = isComplete
          ? agent.color + '14'
          : 'rgba(13,17,23,0.85)'
        ctx.fill()

        // Box border
        roundRect(bx, by, boxW, boxH, boxR)
        ctx.strokeStyle = isComplete ? agent.color : 'rgba(255,255,255,0.1)'
        ctx.lineWidth = isComplete ? 1.5 : 1
        if (isComplete) {
          ctx.shadowColor = agent.color
          ctx.shadowBlur = 10
        }
        ctx.stroke()
        ctx.shadowBlur = 0

        // Top accent line on box
        if (isComplete) {
          ctx.beginPath()
          ctx.moveTo(bx + boxR, by)
          ctx.lineTo(bx + boxW - boxR, by)
          ctx.strokeStyle = agent.color
          ctx.lineWidth = 2
          ctx.stroke()
        }

        // Icon
        ctx.font = '16px monospace'
        ctx.fillStyle = isComplete ? agent.color : 'rgba(255,255,255,0.25)'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(agent.icon, ax, ay - 9)

        // Agent label
        ctx.font = 'bold 8px JetBrains Mono, monospace'
        ctx.fillStyle = isComplete ? agent.color : 'rgba(255,255,255,0.3)'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(agent.label, ax, ay + 4)

        // Sub label
        ctx.font = '7px JetBrains Mono, monospace'
        ctx.fillStyle = isComplete ? agent.color + 'AA' : 'rgba(255,255,255,0.15)'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(agent.sublabel, ax, ay + 14)

        // Status dot top-right of box
        ctx.beginPath()
        ctx.arc(bx + boxW - 7, by + 7, 3, 0, Math.PI * 2)
        ctx.fillStyle = isComplete ? agent.color : isAnalyzing ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'
        ctx.fill()
      })

      // Center hub glow
      const hubGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 48)
      hubGrad.addColorStop(0, 'rgba(245,166,35,0.2)')
      hubGrad.addColorStop(0.5, 'rgba(245,166,35,0.06)')
      hubGrad.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(cx, cy, 48, 0, Math.PI * 2)
      ctx.fillStyle = hubGrad
      ctx.fill()

      // Center hub box
      const hubSize = 44
      roundRect(cx - hubSize / 2, cy - hubSize / 2, hubSize, hubSize, 8)
      ctx.fillStyle = 'rgba(13,17,23,0.95)'
      ctx.fill()
      roundRect(cx - hubSize / 2, cy - hubSize / 2, hubSize, hubSize, 8)
      ctx.strokeStyle = 'rgba(245,166,35,0.4)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Center score
      if (overallScore !== undefined) {
        ctx.font = 'bold 18px JetBrains Mono, monospace'
        ctx.fillStyle = 'rgba(245,166,35,0.95)'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(String(overallScore), cx, cy - 4)
        ctx.font = '6.5px JetBrains Mono, monospace'
        ctx.fillStyle = 'rgba(245,166,35,0.45)'
        ctx.textBaseline = 'middle'
        ctx.fillText('/100', cx, cy + 10)
      } else {
        ctx.font = '16px monospace'
        ctx.fillStyle = 'rgba(245,166,35,0.65)'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('◎', cx, cy)
      }

      // Status below center
      ctx.font = '7px JetBrains Mono, monospace'
      ctx.fillStyle = isAnalyzing
        ? 'rgba(245,166,35,0.7)'
        : completedAgents.length === 5
        ? 'rgba(0,229,160,0.7)'
        : 'rgba(255,255,255,0.15)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText(
        isAnalyzing ? 'PROCESSING...' : completedAgents.length === 5 ? 'COMPLETE' : 'AWAITING INPUT',
        cx, cy + 58
      )

      frameRef.current += speedRef.current
      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [completedAgents, overallScore, isAnalyzing])

  return (
    <div className="flex justify-center items-center">
      <canvas
        ref={canvasRef}
        style={{ width: 440, height: 440, maxWidth: '100%' }}
      />
    </div>
  )
}