import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { selectFeaturedCases } from '../config/featuredCases'
import { SectionHeader, useCaseDialog, useReducedMotion } from '../shared'
import styles from '../Portfolio.module.css'
import './CaseCarousel.css'

export default function CaseBoxSection() {
  const uid = useId().replace(/:/g, "")
  const open = useCaseDialog()
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const swiped = useRef(false)
  const [selected, setSelected] = useState(() => selectFeaturedCases())
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [hidden, setHidden] = useState(document.hidden)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [opening, setOpening] = useState(false)
  const move = (delta: number) => setIndex(i => (i + delta + selected.length) % selected.length)
  const reopen = () => { setOpening(true); setSelected(selectFeaturedCases()); setIndex(0) }
  useEffect(() => {
    if (!opening) return
    const timer = window.setTimeout(() => setOpening(false), reduced ? 0 : 850)
    return () => window.clearTimeout(timer)
  }, [opening, reduced])
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 })
    if (ref.current) io.observe(ref.current)
    const update = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', update)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [])
  const cycling = visible && !hidden && !paused && !hovered && !focused && !reduced && !opening
  useEffect(() => {
    if (!cycling) return
    const timer = window.setInterval(() => setIndex(i => (i + 1) % selected.length), 5000)
    return () => window.clearInterval(timer)
  }, [cycling, selected.length, index])
  return <section id="work" className={`${styles.section} blindbox-section`}><div className={styles.container}>
    <SectionHeader label="" first="精选" italic="案例" />
    <div ref={ref} className={`case-carousel ${opening ? 'is-opening' : ''}`} role="region" aria-roledescription="轮播" aria-label="精选项目盲盒"
      data-active-case={selected[index].item.id} data-active-artwork={selected[index].cover} data-active-group={selected[index].group} data-cycling={cycling}
      onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); move(1) } if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1) } }}>
      <div className="case-carousel-window"
        onTouchStart={e => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY }; swiped.current = false }}
        onTouchEnd={e => { const start = touch.current; touch.current = null; if (!start) return; const t = e.changedTouches[0]; const dx = t.clientX - start.x; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(t.clientY - start.y)) { swiped.current = true; move(dx < 0 ? 1 : -1) } }}>
        <div className="blindbox-orbit" aria-hidden="true" />
        {selected.map(({ item, cover, group }, i) => {
          const offset = (i - index + selected.length) % selected.length
          const angle = offset * Math.PI * 2 / selected.length
          const depth = (Math.cos(angle) + 1) / 2
          const x = Math.sin(angle) * 40
          const y = 29 + Math.cos(angle) * 20
          const scale = .54 + depth * .46
          const position = offset > selected.length / 2 ? offset - selected.length : offset
          const style = { left: `${50 + x}%`, top: `${y}%`, transform: `translate(-50%, -50%) perspective(1000px) translateZ(${depth * 55}px) scale(${scale}) rotateY(${Math.sin(angle) * -24}deg) rotateZ(${Math.sin(angle) * -5}deg)`, zIndex: Math.round(depth * 100) + 1, '--card-opacity': .36 + depth * .64, '--mobile-offset': position, '--mobile-scale': position === 0 ? 1 : .82, '--card-transform': `translate(-50%, -50%) perspective(1000px) translateZ(${depth * 55}px) scale(${scale}) rotateY(${Math.sin(angle) * -24}deg) rotateZ(${Math.sin(angle) * -5}deg)` } as CSSProperties
          return <button key={cover} className={`selected-project ${position === 0 ? 'is-active' : ''}`} data-position={position} data-case-id={item.id} data-group={group}
            onPointerEnter={e => { if (e.pointerType === 'mouse') setHovered(true) }} onPointerLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={style} tabIndex={position === 0 ? 0 : -1}
            aria-label={`查看案例：${item.title}`} onClick={() => { if (swiped.current) { swiped.current = false; return } open(item.id) }}>
            <span className="selected-project-cover"><img src={cover} alt={`${item.title}项目作品`} draggable={false} loading="lazy" decoding="async" /></span>
            <span className="selected-project-info"><span className="selected-project-meta">{item.org} · {item.line}</span><span className="selected-project-title">{item.title}</span><span className="selected-project-open">查看案例 ↗</span></span>
          </button>
        })}
        <button className="blindbox-holder" onClick={reopen} aria-label="换一组案例" disabled={opening}>
          <svg className="case-sculpture" viewBox="0 0 330 280" fill="none" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id={`${uid}-front`} x1="65" y1="151" x2="199" y2="238" gradientUnits="userSpaceOnUse"><stop stopColor="#424c60"/><stop offset=".16" stopColor="#29364f"/><stop offset=".52" stopColor="#1c2943"/><stop offset="1" stopColor="#111822"/></linearGradient>
              <linearGradient id={`${uid}-side`} x1="217" y1="154" x2="280" y2="200" gradientUnits="userSpaceOnUse"><stop stopColor="#0b101a"/><stop offset=".6" stopColor="#151e2e"/><stop offset=".87" stopColor="#253449"/><stop offset="1" stopColor="#101722"/></linearGradient>
              <linearGradient id={`${uid}-rim`} x1="78" y1="107" x2="242" y2="170" gradientUnits="userSpaceOnUse"><stop stopColor="#707b8d"/><stop offset=".18" stopColor="#414e64"/><stop offset=".55" stopColor="#263349"/><stop offset=".77" stopColor="#59687f"/><stop offset="1" stopColor="#263347"/></linearGradient>
              <linearGradient id={`${uid}-lid`} x1="111" y1="19" x2="209" y2="132" gradientUnits="userSpaceOnUse"><stop stopColor="#434e60"/><stop offset=".22" stopColor="#283449"/><stop offset=".7" stopColor="#17233b"/><stop offset="1" stopColor="#0b1423"/></linearGradient>
              <linearGradient id={`${uid}-lining`} x1="154" y1="40" x2="186" y2="126" gradientUnits="userSpaceOnUse"><stop stopColor="#0d1420"/><stop offset=".5" stopColor="#172236"/><stop offset="1" stopColor="#263349"/></linearGradient>
              <linearGradient id={`${uid}-cavity`} x1="157" y1="127" x2="160" y2="175" gradientUnits="userSpaceOnUse"><stop stopColor="#03060b"/><stop offset="1" stopColor="#171e2a"/></linearGradient>
              <linearGradient id={`${uid}-glint`}><stop stopColor="#bac3d1" stopOpacity=".65"/><stop offset=".45" stopColor="#8baddd" stopOpacity=".15"/><stop offset="1" stopColor="#819dc9" stopOpacity="0"/></linearGradient>
              <radialGradient id={`${uid}-satin`} cx=".12" cy=".08" r=".95"><stop stopColor="#9aaac5" stopOpacity=".16"/><stop offset=".38" stopColor="#738cb2" stopOpacity=".05"/><stop offset="1" stopColor="#253551" stopOpacity="0"/></radialGradient>
              <radialGradient id={`${uid}-shadow`}><stop stopColor="#000" stopOpacity=".9"/><stop offset="1" stopColor="#000" stopOpacity="0"/></radialGradient>
            </defs>
            <ellipse cx="167" cy="239" rx="150" ry="30" fill={`url(#${uid}-shadow)`}/>
            <ellipse cx="165" cy="237" rx="112" ry="14" fill={`url(#${uid}-shadow)`}/>
            <g className="case-lid">
              <path d="M105 113 83 23Q81 15 89 14L256 42Q261 43 262 48L281 131 276 136Z" fill="#0b111b"/>
              <path d="M83 23Q81 15 89 14L256 42 250 47 88 20Z" fill={`url(#${uid}-rim)`}/>
              <path d="m250 47 6-5q5 1 6 6l19 83-5 5Z" fill="#293549"/>
              <path d="M88 21 250 48 275 135 108 112Z" fill={`url(#${uid}-lid)`}/>
              <path d="m100 33 138 24 19 64-142-23Z" fill="#090f19"/>
              <path d="m105 37 130 23 17 55-134-22Z" fill={`url(#${uid}-lining)`}/>
              <path d="m105 37 130 23 17 55" stroke="#526079" strokeOpacity=".28" strokeWidth=".55"/>
              <path d="m89 21 161 27" stroke={`url(#${uid}-glint)`} strokeWidth=".65"/>
              <path d="m115 98 142 23" stroke="#7d91ae" strokeOpacity=".16" strokeWidth=".5"/>
            </g>
            <path d="m49 154 59-42 168 24-59 47Z" fill={`url(#${uid}-rim)`}/>
            <path d="m62 153 49-33 151 22-47 33Z" fill="#03060c"/>
            <path d="m62 153 49-33 4 25-31 23Z" fill="#202b3c"/>
            <path d="m111 120 151 22-19 20-128-17Z" fill="#0b1019"/>
            <path d="m84 168 31-23 128 17-28 13Z" fill={`url(#${uid}-cavity)`}/>
            <path d="m85 167 30-21 123 17" stroke="#64748c" strokeOpacity=".12" strokeWidth=".5"/>
            <path d="m217 183 59-47 2 66q0 4-4 7l-58 40Z" fill={`url(#${uid}-side)`}/>
            <path d="m49 154 168 29-1 66L57 221q-8-1-8-9Z" fill={`url(#${uid}-front)`}/>
            <path d="m49 154 168 29-1 66L57 221q-8-1-8-9Z" fill={`url(#${uid}-satin)`}/>
            <path d="m49 154 168 29-3 4-162-29Z" fill="#677790" fillOpacity=".26"/>
            <path d="m52 158 162 29v57L58 218q-5-1-5-6" stroke={`url(#${uid}-glint)`} strokeWidth=".55"/>
            <path d="m218 184 57-45" stroke="#96abc9" strokeOpacity=".28" strokeWidth=".65"/>
            <path d="m217 187-1 57 58-39" stroke="#04080f" strokeWidth="1.5"/>
            <path d="m58 221 157 28 59-40-2 4-57 39-155-28Z" fill="#080d15"/>
            <path d="m126 190 22 4v5l-22-4Z" fill="#080e18"/>
            <path d="m126 190 22 4" stroke="#7e8ca1" strokeWidth=".55" strokeOpacity=".5"/>
          </svg>
          <span className="blindbox-action">换一组 <span aria-hidden="true">↻</span></span>
        </button>
      </div>
      <div className="case-carousel-controls">
        <button onClick={() => move(-1)} aria-label="上一张">←</button>
        <span aria-live={cycling ? 'off' : 'polite'}>{String(index + 1).padStart(2, '0')} / {String(selected.length).padStart(2, '0')}</span>
        <button onClick={() => move(1)} aria-label="下一张">→</button>
        <button className="case-carousel-pause" onClick={() => setPaused(p => !p)} aria-pressed={paused} disabled={reduced}>{reduced ? '已关闭自动轮播' : paused ? '播放轮播' : '暂停轮播'}</button>
      </div>
    </div>
  </div></section>
}
