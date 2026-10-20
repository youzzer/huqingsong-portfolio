import { useReducedMotion } from '../shared'
import { motion, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import styles from '../Portfolio.module.css'

// 纯 SVG 立体盲盒插画（viewBox 0 0 320 300，画面宽 285px）
// 盒口中心在 SVG (160, 150)，由 useStageSize 测量舞台内实际坐标。
export const BOX_W = 285

// 14 颗尘埃粒子（固定参数，避免每次渲染跳动）
const DUST = Array.from({ length: 14 }, (_, i) => ({
  left: 60 + ((i * 37) % 200),
  bottom: 122 + ((i * 13) % 30),
  size: 1.6 + (i % 3) * 0.7,
  dur: 3.4 + (i % 7) * 0.36,
  delay: i * 0.42,
}))

export default function BoxArt({ open, burstId = 0 }: { open: boolean; burstId?: number }) {
  const reduced = useReducedMotion()
  return <svg data-box-art viewBox="0 0 320 300" width={BOX_W} className={styles.boxArt} aria-hidden="true">
    <defs>
      {/* 外层体积光：盒口能量外溢 */}
      <radialGradient id="boxGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#9db4ff" stopOpacity=".55" />
        <stop offset="45%" stopColor="#7ea0ff" stopOpacity=".18" />
        <stop offset="100%" stopColor="#7ea0ff" stopOpacity="0" />
      </radialGradient>
      {/* 盒口中心强光 */}
      <radialGradient id="mouthCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#eaf0ff" stopOpacity=".75" />
        <stop offset="30%" stopColor="#bcd0ff" stopOpacity=".35" />
        <stop offset="100%" stopColor="#8aa8ff" stopOpacity="0" />
      </radialGradient>
      {/* 盖子：顶亮、根暗、金属蓝 */}
      <linearGradient id="lidInner" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4a6ab5" />
        <stop offset="36%" stopColor="#354b85" />
        <stop offset="72%" stopColor="#23315c" />
        <stop offset="100%" stopColor="#162140" />
      </linearGradient>
      {/* 箱体正面：缎面金属质感 */}
      <linearGradient id="boxFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8da0d8" />
        <stop offset="22%" stopColor="#5d6fb0" />
        <stop offset="55%" stopColor="#2e3c74" />
        <stop offset="85%" stopColor="#11182e" />
        <stop offset="100%" stopColor="#050811" />
      </linearGradient>
      {/* 转角压暗 */}
      <linearGradient id="cornerShade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#010308" stopOpacity=".85" />
        <stop offset="42%" stopColor="#010308" stopOpacity="0" />
        <stop offset="100%" stopColor="#010308" stopOpacity=".85" />
      </linearGradient>
      {/* 内腔：幽蓝深渊 */}
      <radialGradient id="cavity" cx="50%" cy="35%" r="78%">
        <stop offset="0%" stopColor="#000103" />
        <stop offset="40%" stopColor="#040817" />
        <stop offset="80%" stopColor="#0f1a42" />
        <stop offset="100%" stopColor="#1c2a5a" />
      </radialGradient>
      {/* 盒口环：后暗前亮 */}
      <linearGradient id="rimRing" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5c6fa3" />
        <stop offset="42%" stopColor="#26355a" />
        <stop offset="100%" stopColor="#8aa0d8" />
      </linearGradient>
      {/* 前唇高光 */}
      <linearGradient id="lipGlint" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#4a5e8f" stopOpacity="0" />
        <stop offset="50%" stopColor="#cfe0ff" stopOpacity=".7" />
        <stop offset="100%" stopColor="#4a5e8f" stopOpacity="0" />
      </linearGradient>
      {/* 光柱 */}
      <linearGradient id="beam" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#7ea0ff" stopOpacity=".55" />
        <stop offset="100%" stopColor="#7ea0ff" stopOpacity="0" />
      </linearGradient>
      {/* 顶部环境光溢 */}
      <radialGradient id="topHalo" cx="50%" cy="100%" r="90%">
        <stop offset="0%" stopColor="#8aa8ff" stopOpacity=".22" />
        <stop offset="100%" stopColor="#8aa8ff" stopOpacity="0" />
      </radialGradient>
      <filter id="blur5"><feGaussianBlur stdDeviation="5" /></filter>
      <filter id="blur2"><feGaussianBlur stdDeviation="2" /></filter>
    </defs>

    {/* 顶部环境光溢 */}
    <ellipse cx="160" cy="170" rx="150" ry="90" fill="url(#topHalo)" opacity=".8" filter="url(#blur5)" />
    {/* 盒体外溢光 */}
    <ellipse cx="160" cy="148" rx="152" ry="56" fill="url(#boxGlow)" filter="url(#blur5)" className={styles.boxGlow} />
    <ellipse cx="160" cy="148" rx="96" ry="42" fill="url(#mouthCore)" opacity=".85" filter="url(#blur2)" />

    {/* 光柱 */}
    <rect x="118" y="6" width="84" height="140" fill="url(#beam)" className={styles.boxBeam} />

    {/* 盖子 */}
    <motion.g
      className={styles.boxLid}
      animate={{ rotate: !reduced && open ? -9 : -3.5 }}
      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 15 }}
      key={`lid-${burstId}`}
    >
      <path d="M52 118 L268 118 L256 36 Q160 24 64 36 Z" fill="url(#lidInner)" />
      <path d="M52 118 L268 118 L262 100 Q160 88 58 100 Z" fill="#7e9ae8" opacity=".35" filter="url(#blur2)" />
      <path d="M64 36 Q160 24 256 36" fill="none" stroke="#b6c6f4" strokeOpacity=".7" strokeWidth="1.6" />
      <path d="M52 118 L268 118 L268 126 Q160 140 52 126 Z" fill="#05080f" opacity=".65" filter="url(#blur2)" />
      <path d="M52 118 L64 36" stroke="#8ea3e0" strokeOpacity=".35" strokeWidth="1.2" />
      <path d="M268 118 L256 36" stroke="#8ea3e0" strokeOpacity=".35" strokeWidth="1.2" />
    </motion.g>

    {/* 箱体 */}
    <path d="M44 150 L276 150 L276 250 Q276 262 264 262 L56 262 Q44 262 44 250 Z" fill="url(#boxFront)" />
    <path d="M44 150 L276 150 L276 250 Q276 262 264 262 L56 262 Q44 262 44 250 Z" fill="url(#cornerShade)" />
    <path d="M48 154 L88 154 L88 258 L48 258 Z" fill="#ffffff" opacity=".04" filter="url(#blur2)" />
    <path d="M268 154 L276 154 L276 256 L268 256 Z" fill="#ffffff" opacity=".06" />
    <path d="M50 248 Q160 262 270 248 L270 256 Q160 270 50 256 Z" fill="#4a68ce" opacity=".2" filter="url(#blur2)" />
    <path d="M50 152 L270 152 L270 176 Q160 192 50 176 Z" fill="#7e9ae8" opacity=".12" filter="url(#blur2)" />
    <line x1="160" y1="166" x2="160" y2="256" stroke="#0a0f1e" strokeOpacity=".45" strokeWidth="1" />

    {/* 内腔 + 盒口环 */}
    <rect x="50" y="122" width="220" height="56" rx="26" fill="url(#cavity)" />
    <path d="M62 132 Q160 116 258 132 Q160 124 62 132 Z" fill="#7ea0ff" opacity=".14" filter="url(#blur2)" />
    <path d="M64 168 Q160 180 256 168 Q160 176 64 168 Z" fill="#4a68ce" opacity=".12" filter="url(#blur2)" />
    <rect x="44" y="116" width="232" height="64" rx="28" fill="none" stroke="url(#rimRing)" strokeWidth="3.2" />

    {/* 前唇高光 */}
    <path d="M86 176 Q160 190 234 176" fill="none" stroke="url(#lipGlint)" strokeWidth="1.8" />

    {/* 左右侧光 */}
    <path d="M46 132 L46 150" stroke="#9db1e8" strokeOpacity=".35" strokeWidth="1.4" />
    <path d="M274 132 L274 150" stroke="#9db1e8" strokeOpacity=".35" strokeWidth="1.4" />
    <rect x="41" y="113" width="238" height="70" rx="31" stroke="#8ea3e8" strokeOpacity=".16" strokeWidth="1" fill="none" />

    {/* 刻字 */}
    <text x="160" y="222" textAnchor="middle" fontSize="9" letterSpacing="3.2" fill="#c8d6fc" fillOpacity=".75" style={{ fontFamily: 'Inter, sans-serif' }}>FULL PORTFOLIO</text>

    {/* 尘埃粒子 */}
    {DUST.map((d, i) => <circle key={i} cx={d.left} cy={300 - d.bottom} r={d.size} fill="#aebdf0" className={styles.boxDust} style={{ animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }} />)}

    {/* 点击爆开闪光环 */}
    {!reduced && burstId > 0 && <motion.ellipse
      key={`burst-${burstId}`}
      cx="160" cy="150" rx="122" ry="29"
      fill="none" stroke="#aebdf0" strokeWidth="2"
      initial={{ scale: 0.84, opacity: 0.9 }}
      animate={{ scale: 1.5, scaleY: 2.0, opacity: 0 }}
      transition={{ duration: 0.95, ease: 'easeOut' }}
      style={{ transformOrigin: '160px 150px' }}
    />}
  </svg>
}

// ——— 带交互的盲盒：指针倾斜 + 悬停开盖 + 点击爆开（Hero 与精选区共用） ———
// 注意：不使用 preserve-3d 祖先 + overflow:hidden 组合，也不在 3D 容器里用 mix-blend-mode（规格书工程坑 1/2）
export function BlindBox({ burstId, onBurst, float = true }: { burstId: number; onBurst: () => void; float?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null)
  const [hover, setHover] = useState(false)
  const reduced = useReducedMotion()
  const rx = useSpring(0, { stiffness: 110, damping: 16 })
  const ry = useSpring(0, { stiffness: 110, damping: 16 })
  const onMove = (e: React.PointerEvent) => {
    if (reduced) return
    const r = ref.current!.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 16)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10)
  }
  const leave = () => { rx.set(0); ry.set(0); setHover(false) }
  return <button
    ref={ref}
    type="button"
    aria-label="重新开盒"
    className={styles.boxWrap}
    onPointerMove={onMove}
    onPointerLeave={leave}
    onPointerEnter={() => setHover(true)}
    onClick={onBurst}
  >
    <motion.div className={styles.boxTilt} style={reduced ? {} : { rotateX: rx, rotateY: ry }} animate={{ scale: !reduced && hover ? 1.025 : 1 }} transition={{ duration: reduced ? 0 : .3 }}>
      <div className={float && !reduced ? styles.boxFloat : undefined}>
        <BoxArt open={hover} burstId={burstId} />
      </div>
    </motion.div>
    <div className={styles.boxShadow} aria-hidden="true" />
    <span className={`${styles.boxHint} ${hover ? styles.boxHintShow : ''}`}>点一下重新开盒 ↻</span>
  </button>
}
