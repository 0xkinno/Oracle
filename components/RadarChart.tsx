'use client'

interface Props {
  scores: {
    risk: number
    correlation: number
    macro: number
    alpha: number
    overall: number
  }
}

const LABELS = ['RISK', 'CORRELATION', 'MACRO', 'ALPHA', 'OVERALL']

export default function RadarChart({ scores }: Props) {
  const values = [
    scores.risk,
    scores.correlation,
    scores.macro,
    scores.alpha,
    scores.overall,
  ]

  const cx = 140
  const cy = 140
  const r = 100
  const sides = 5

  function getPoint(index: number, radius: number) {
    const angle = (index / sides) * Math.PI * 2 - Math.PI / 2
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    }
  }

  // Grid rings
  const rings = [20, 40, 60, 80, 100]

  // Data polygon
  const dataPoints = values.map((v, i) => getPoint(i, (v / 100) * r))
  const dataPath = dataPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ') + ' Z'

  // Axis lines
  const axes = Array.from({ length: sides }, (_, i) => getPoint(i, r))

  // Label positions
  const labelPoints = Array.from({ length: sides }, (_, i) => getPoint(i, r + 22))

  return (
    <svg width="280" height="280" viewBox="0 0 280 280">
      {/* Grid rings */}
      {rings.map(ring => {
        const pts = Array.from({ length: sides }, (_, i) =>
          getPoint(i, (ring / 100) * r)
        )
        const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
        return (
          <path
            key={ring}
            d={path}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        )
      })}

      {/* Axis lines */}
      {axes.map((pt, i) => (
        <line
          key={i}
          x1={cx} y1={cy}
          x2={pt.x} y2={pt.y}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      ))}

      {/* Data polygon */}
      <path
        d={dataPath}
        fill="rgba(245,166,35,0.12)"
        stroke="rgba(245,166,35,0.7)"
        strokeWidth="2"
      />

      {/* Data points */}
      {dataPoints.map((pt, i) => (
        <circle
          key={i}
          cx={pt.x} cy={pt.y}
          r="4"
          fill="#F5A623"
          stroke="rgba(245,166,35,0.3)"
          strokeWidth="6"
        />
      ))}

      {/* Labels */}
      {labelPoints.map((pt, i) => (
        <text
          key={i}
          x={pt.x} y={pt.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize="8"
          fontFamily="JetBrains Mono, monospace"
        >
          {LABELS[i]}
        </text>
      ))}

      {/* Score values */}
      {dataPoints.map((pt, i) => (
        <text
          key={`v${i}`}
          x={pt.x}
          y={pt.y - 10}
          textAnchor="middle"
          fill="#F5A623"
          fontSize="8"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="bold"
        >
          {values[i]}
        </text>
      ))}
    </svg>
  )
}