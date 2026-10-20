import { useMemo } from 'react'
import styles from '../Portfolio.module.css'

// 固定种子 LCG：星辰位置/亮度每次刷新一致
function lcg(seed: number) {
  let s = seed
  return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296 }
}

const NEBULA = `${import.meta.env.BASE_URL}bg/nebula.webp`

export default function CosmicBackground() {
  const stars = useMemo(() => {
    const rand = lcg(20261018)
    return Array.from({ length: 64 }, () => ({
      left: rand() * 100, top: rand() * 100,
      size: 1 + rand() * 1.2,
      dur: 2.8 + rand() * 4.6,
      delay: rand() * 6,
      max: 0.06 + rand() * 0.77,
    }))
  }, [])
  return <div className={styles.cosmos} aria-hidden="true">
    <div className={styles.cosmosBase} />
    <img className={styles.cosmosNebula} src={NEBULA} alt="" fetchPriority="high" />
    <div className={styles.cosmosCenter} />
    {stars.map((s, i) => <i key={i} className={styles.star} style={{
      left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size,
      animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s`, ['--star-max' as string]: s.max,
    }} />)}
    {[13, 17, 21].map((d, i) => <b key={i} className={styles.meteor} style={{ animationDuration: `${d}s`, animationDelay: `${i * 4.3}s`, top: `${12 + i * 18}%` }} />)}
    <div className={styles.cosmosMobileShade} />
  </div>
}
