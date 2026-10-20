import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useEntryReady } from './EntryLoading'
import { useReducedMotion } from '../shared'
import styles from './CenteredHero.module.css'

// Original Mux 720p fragments, localized without transcoding to avoid remote HLS/CDN failures.
const STREAM = `${import.meta.env.BASE_URL}bg/vortex-original.mp4`
const POSTER = `${import.meta.env.BASE_URL}bg/nebula.webp`

export default function BlindBoxHero() {
  const heroRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()
  const entryReady = useEntryReady()
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const shouldPlay = entryReady && !reduced && !paused && visible && !failed
  const shouldPlayRef = useRef(shouldPlay)
  shouldPlayRef.current = shouldPlay

  useEffect(() => {
    const section = heroRef.current
    if (!section) return
    let inViewport = true
    const update = () => setVisible(inViewport && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting
      update()
    })
    observer.observe(section)
    document.addEventListener('visibilitychange', update)
    update()
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    // Reduced motion keeps the static poster and avoids downloading video.
    if (!video || reduced) return
    let disposed = false
    setFailed(false)
    setReady(false)
    const fail = () => {
      if (disposed) return
      video.pause()
      setReady(false)
      setFailed(true)
    }
    const play = () => {
      if (disposed || !shouldPlayRef.current) return
      void video.play().catch(() => {
        // Autoplay may be blocked; leave an explicit user-gesture play control.
        if (!disposed) setPaused(true)
      })
    }
    const loaded = () => {
      setReady(true)
      play()
    }
    video.addEventListener('loadeddata', loaded)
    video.addEventListener('error', fail)
    video.preload = 'auto'
    video.src = STREAM
    video.load()
    return () => {
      disposed = true
      video.removeEventListener('loadeddata', loaded)
      video.removeEventListener('error', fail)
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  }, [reduced])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (shouldPlay && ready) {
      void video.play().catch(() => setPaused(true))
    } else {
      video.pause()
    }
  }, [shouldPlay, ready])

  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' })
  }

  return <section ref={heroRef} className={styles.hero} aria-labelledby="hero-title">
    <div className={styles.background} style={{ backgroundImage: `url("${POSTER}")` }} aria-hidden="true">
      <video ref={videoRef} className={`${styles.video} ${ready && !failed && !reduced ? styles.ready : ''}`}
        poster={POSTER} muted loop playsInline preload="none" tabIndex={-1}
        onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    </div>
    <div className={`${styles.shade} ${!shouldPlay ? styles.still : ''}`} aria-hidden="true" />
    <div className={`${styles.content} ${entryReady ? styles.entered : styles.waiting}`}>
      <p className={styles.eyebrow}>个人作品集 PORTFOLIO · 2026</p>
      <img className={styles.avatar} src={`${import.meta.env.BASE_URL}img/avatar.webp`} alt="胡庆松证件照" width={480} height={480} decoding="async" />
      <h1 id="hero-title" className={styles.title}>胡庆松</h1>
      <p className={styles.intention}>求职意向：运营（内容 / 商业 / 用户 / 活动 / 产品 / 策略等）</p>
      <p className={styles.description}>聚焦内容商业化，关注 ACG、影视综等泛娱乐内容生态，擅长活动与用户运营、BD 拓展及资源整合，并以产品思维与 AIGC 工具提升内容生产与营销效率，推动流量变现与商业化增长。</p>
      <div className={styles.actions}>
        <a href="#work" onClick={event => scrollTo(event, 'work')} className={`${styles.action} ${styles.primary}`}>查看作品 <span aria-hidden="true">↓</span></a>
        <Link to="/resume" className={styles.action}>查看简历 <span aria-hidden="true">↗</span></Link>
        <a href="#contact" onClick={event => scrollTo(event, 'contact')} className={styles.action}>联系我 <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <a href="#work" onClick={event => scrollTo(event, 'work')} className={styles.scroll} aria-label="向下查看作品">SCROLL</a>
    {!reduced && !failed && <button type="button" className={styles.motionControl}
      aria-label={playing ? '暂停背景动画' : '播放背景动画'} aria-pressed={paused}
      onClick={() => {
        const next = !paused
        setPaused(next)
        if (!next && visible) void videoRef.current?.play().catch(() => setPaused(true))
      }}>{playing ? '暂停动画 Ⅱ' : '播放动画 ▷'}</button>}
  </section>
}
