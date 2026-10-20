import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../Portfolio.module.css'
import { pageImg, RESUME_PAGES } from '../pdfpages'
import { pdf, PageFade } from '../shared'

const pages = Array.from({ length: RESUME_PAGES }, (_, i) => i + 1)

export default function ResumePage() {
  const [zoom, setZoom] = useState(1)
  const [current, setCurrent] = useState(1)
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => { document.title = '胡庆松 · 简历' }, [])
  useEffect(() => {
    const root = listRef.current
    if (!root) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setCurrent(Number((e.target as HTMLElement).dataset.page)) })
    }, { root: null, threshold: .6 })
    root.querySelectorAll('[data-page]').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [zoom])

  return <PageFade><main className={styles.viewer}>
    <div className={styles.viewerBar}>
      <Link to="/" className={styles.viewerBack}>← 返回</Link>
      <span className={styles.viewerTitle}>胡庆松 · 简历</span>
      <div className={styles.viewerTools}>
        <span className={styles.viewerPage}>{current} / {RESUME_PAGES}</span>
        <button className={styles.viewerBtn} onClick={() => setZoom(z => Math.max(.6, +(z - .2).toFixed(1)))} aria-label="缩小">−</button>
        <button className={styles.viewerBtn} onClick={() => setZoom(z => Math.min(1.6, +(z + .2).toFixed(1)))} aria-label="放大">＋</button>
        <a className={styles.viewerDl} href={pdf('胡庆松-简历')} target="_blank" rel="noreferrer">下载 PDF</a>
      </div>
    </div>
    <div className={styles.viewerBody} ref={listRef}>
      {pages.map(n => <div key={n} data-page={n} className={styles.resumePage} style={{ width: `min(${880 * zoom}px, 92vw)` }}>
        {!loaded[n] && <div className={styles.skeleton} />}
        <img src={pageImg('resume', n)} alt={`简历第 ${n} 页`} loading="lazy" onLoad={() => setLoaded(s => ({ ...s, [n]: true }))} style={{ opacity: loaded[n] ? 1 : 0 }} />
      </div>)}
    </div>
    <nav className={styles.pageDots} aria-label="页码">
      {pages.map(n => <button key={n} className={`${styles.dot} ${current === n ? styles.dotActive : ''}`} aria-label={`第 ${n} 页`} onClick={() => listRef.current?.querySelector(`[data-page="${n}"]`)?.scrollIntoView({ behavior: 'smooth' })} />)}
    </nav>
  </main></PageFade>
}
