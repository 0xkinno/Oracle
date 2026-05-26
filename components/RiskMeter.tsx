interface Props {
    score: number
    max: number
    color: string
    size?: 'sm' | 'md'
  }
  
  export default function RiskMeter({ score, max, color, size = 'md' }: Props) {
    const pct = Math.min(100, (score / max) * 100)
    const h = size === 'sm' ? 'h-1' : 'h-1.5'
  
    return (
      <div className={`w-full bg-white/5 rounded-full ${h} overflow-hidden`}>
        <div
          className={`${h} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}60` }}
        />
      </div>
    )
  }