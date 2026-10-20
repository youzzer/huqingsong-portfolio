import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { selectFeaturedCases } from '../config/featuredCases'
import { SectionHeader, useCaseDialog, useReducedMotion } from '../shared'
import styles from '../Portfolio.module.css'
import './CaseCarousel.css'

export default function CaseBoxSection() {
  const open = useCaseDialog()
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLVideoElement>(null)
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
  // 3D 渲染盲盒视频：跟轮播同频，可见+轮播中才播放；暂停/离屏/减弱动效时停在 poster 帧
  useEffect(() => {
    const video = boxRef.current
    if (!video || reduced) return
    if (cycling || opening) void video.play().catch(() => {})
    else video.pause()
  }, [cycling, opening, reduced])
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
          <video ref={boxRef} className="case-sculpture"
            src={`${import.meta.env.BASE_URL}bg/box-loop.mp4`}
            poster={`${import.meta.env.BASE_URL}bg/box-poster.jpg`}
            muted loop playsInline preload="auto" disablePictureInPicture aria-hidden="true" />
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
