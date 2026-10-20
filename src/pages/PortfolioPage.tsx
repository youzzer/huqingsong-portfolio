import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useReducedMotion } from '../shared'
import styles from '../Portfolio.module.css'
import { pageImg, PORTFOLIO_PAGES } from '../pdfpages'
import { pdf } from '../shared'

const pages = Array.from({ length: PORTFOLIO_PAGES }, (_, i) => i + 1)
const isMobile = () => window.matchMedia('(max-width: 767px)').matches
export function validPage(raw: string | null) {
  if (!raw || !/^\d+$/.test(raw)) return 1
  const n = Number(raw)
  return Number.isSafeInteger(n) && n >= 1 && n <= PORTFOLIO_PAGES ? n : 1
}

export default function PortfolioPage() {
  const [params, setParams] = useSearchParams()
  const requested = validPage(params.get('p'))
  const [mode, setMode] = useState<'single' | 'scroll'>(() => isMobile() ? 'scroll' : 'single')
  const [page, setPageState] = useState(requested)
  const reduced = useReducedMotion()
  const stripRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const current = useRef(page)
  const passiveUrl = useRef<string | null>(null)
  const jumping = useRef(false)
  const writePage = useCallback((n: number, passive = false) => {
    const next = Math.min(PORTFOLIO_PAGES, Math.max(1, n))
    if (next === current.current) return
    current.current = next
    setPageState(next)
    const updated = new URLSearchParams(params)
    updated.set('p', String(next))
    passiveUrl.current = passive ? updated.toString() : null
    setParams(updated, { replace: passive })
  }, [params, setParams])

  useEffect(() => { document.title = '作品集 · 胡庆松' }, [])
  // External deep links, same-route changes, and browser history all use the URL.
  // Passive scroll writes must not jump the viewport back to a page boundary.
  useLayoutEffect(() => {
    current.current = requested
    setPageState(requested)
    const passive = passiveUrl.current === params.toString()
    passiveUrl.current = null
    if (params.get('p') !== null && params.get('p') !== String(requested)) {
      const normalized = new URLSearchParams(params)
      normalized.set('p', String(requested))
      setParams(normalized, { replace: true })
    }
    if (mode !== 'scroll' || passive) return
    jumping.current = true
    const target = scrollRef.current?.querySelector<HTMLElement>(`[data-page="${requested}"]`)
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - (barRef.current?.offsetHeight ?? 56) - 16
      window.scrollTo({ top, behavior: 'instant' })
    }
    const frame = requestAnimationFrame(() => { jumping.current = false })
    return () => { cancelAnimationFrame(frame); jumping.current = false }
  }, [params, requested, mode, setParams])

  useEffect(() => {
    if (mode !== 'single') return
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('input, textarea, select, [contenteditable="true"]') || e.altKey || e.metaKey || e.ctrlKey) return
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault()
        writePage(page + (e.key === 'ArrowLeft' ? -1 : 1))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mode, page, writePage])
  useEffect(() => {
    if (mode === 'single') stripRef.current?.querySelector(`[data-thumb="${page}"]`)?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', inline: 'center', block: 'nearest' })
  }, [page, mode, reduced])
  useEffect(() => {
    if (mode !== 'scroll') return
    let frame = 0
    const update = () => {
      frame = 0
      if (jumping.current) return
      const anchor = (barRef.current?.getBoundingClientRect().bottom ?? 56) + 24
      const images = Array.from(scrollRef.current?.querySelectorAll<HTMLElement>('[data-page]') ?? [])
      // One deterministic viewport anchor, independent of observer callback order.
      const selected = images.find(el => el.getBoundingClientRect().bottom > anchor) ?? images[images.length - 1]
      if (selected) writePage(Number(selected.dataset.page), true)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [mode, writePage])

  return <main className={styles.gallery}>
    <div className={styles.viewerBar} ref={barRef}>
      <Link to="/" className={styles.viewerBack}>← 返回</Link>
      <span className={styles.viewerTitle}>作品集 · {PORTFOLIO_PAGES} 页</span>
      <div className={styles.viewerTools}>
        <div className={styles.modeSwitch} role="tablist" aria-label="浏览模式">
          <button role="tab" aria-selected={mode === 'single'} className={mode === 'single' ? styles.modeActive : ''} onClick={() => setMode('single')}>单页</button>
          <button role="tab" aria-selected={mode === 'scroll'} className={mode === 'scroll' ? styles.modeActive : ''} onClick={() => setMode('scroll')}>连续</button>
        </div>
        <span className={styles.viewerPage} aria-live="polite">{page} / {PORTFOLIO_PAGES}</span>
        <a className={styles.viewerDl} href={pdf('胡庆松-作品集')} target="_blank" rel="noreferrer">下载 PDF</a>
      </div>
    </div>
    {mode === 'single' ? <div className={styles.singleView}>
      <button className={`${styles.galleryArrow} ${styles.arrowL}`} onClick={() => writePage(page - 1)} disabled={page <= 1} aria-label="上一页">←</button>
      <div className={styles.singlePage}><img key={page} src={pageImg('portfolio', page)} alt={`作品集第 ${page} 页`} /></div>
      <button className={`${styles.galleryArrow} ${styles.arrowR}`} onClick={() => writePage(page + 1)} disabled={page >= PORTFOLIO_PAGES} aria-label="下一页">→</button>
      <div className={styles.thumbStrip} ref={stripRef}>
        {pages.map(n => <button key={n} data-thumb={n} className={`${styles.thumb} ${page === n ? styles.thumbActive : ''}`} onClick={() => writePage(n)} aria-label={`第 ${n} 页`} aria-current={page === n ? 'page' : undefined}><img src={pageImg('portfolio', n)} alt="" loading="lazy" /></button>)}
      </div>
    </div> : <div className={styles.scrollView} ref={scrollRef}>
      {pages.map(n => <img key={n} data-page={n} src={pageImg('portfolio', n)} alt={`作品集第 ${n} 页`} loading={Math.abs(n - requested) <= 1 ? 'eager' : 'lazy'} />)}
    </div>}
  </main>
}
