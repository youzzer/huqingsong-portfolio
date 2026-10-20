import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import styles from '../Portfolio.module.css'
import { cases, legacyCases, type CaseItem } from '../cases'
import TextEmphasis from './TextEmphasis'
import { DialogCtx, parseMetrics, groupMaterials, type Metric } from '../shared'

function MetricCard({ m, primary }: { m: Metric; primary?: boolean }) {
  return <div className={`${styles.metricCard} ${primary ? styles.metricPrimary : ''}`}>
    <em>{m.value}</em>
    <span>{m.label}{m.caliber !== '实际' && <i className={styles.caliber}>{m.caliber}</i>}</span>
  </div>
}

function CaseDialog({ item, onClose }: { item: CaseItem; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [tab, setTab] = useState(0)
  const groups = useMemo(() => groupMaterials(item.materials), [item])
  const { commercial, general } = useMemo(() => parseMetrics(item), [item])
  useEffect(() => {
    const dialog = ref.current
    const focused = document.activeElement as HTMLElement | null
    dialog?.showModal()
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setTab(0)
    return () => { dialog?.close(); document.body.style.overflow = old; focused?.focus() }
  }, [item])
  const current = groups[tab]
  return <dialog ref={ref} className={styles.dialog} onCancel={onClose} onClick={e => { if (e.target === ref.current) onClose() }} aria-labelledby="case-title">
    <motion.article className={styles.dialogPanel} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }}>
      <header className={styles.dialogHead}>
        <div>
          <p className={styles.dialogTag}>{item.org} · {item.line} · {item.status}</p>
          <h2 id="case-title">{item.title}</h2>
        </div>
        <button autoFocus className={styles.dialogClose} onClick={onClose} aria-label="关闭详情">×</button>
      </header>
      <div className={styles.dialogScroll}>
        <div className={styles.chips}>{item.deliverables.map(d => <span key={d} className={styles.chip}>{d}</span>)}</div>
        <p className={styles.dialogDesc}><TextEmphasis text={item.description} /></p>
        {(commercial.length > 0 || general.length > 0) && <div className={styles.metricZone}>
          {commercial.length > 0 && <div><p className={styles.metricGroupLabel}>商业招商收入</p><div className={styles.metricGrid}>{commercial.map(m => <MetricCard key={m.label} m={m} primary />)}</div></div>}
          {general.length > 0 && <div><p className={styles.metricGroupLabel}>传播参与交付</p><div className={styles.metricGrid}>{general.map(m => <MetricCard key={m.label} m={m} />)}</div></div>}
        </div>}
        {groups.length > 1 && <div className={styles.tabs} role="tablist">{groups.map((g, i) => <button key={g.category} role="tab" aria-selected={tab === i} className={tab === i ? styles.tabActive : ''} onClick={() => setTab(i)}>{g.category}<span className={styles.tabCount}>{g.count}</span></button>)}</div>}
        {current && <div className={styles.dialogGallery}>{current.images.map(g => <img key={g} src={g} alt={`${item.title} · ${current.category}`} loading="lazy" className={item.long ? styles.imgLong : styles.imgFit} />)}</div>}
        {groups.length === 0 && <div className={styles.emptyBox}>{item.links.length ? '请通过下方链接查看项目材料。' : '暂无可展示的项目素材。'}</div>}
        {item.links.length > 0 && <div className={styles.linkBlock}><p className={styles.linkTitle}>完整材料</p>{item.links.map(l => <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className={styles.docLink}>{l.name} <span aria-hidden="true">↗</span></a>)}<p className={styles.linkNote}>【可在线浏览】均为飞书文档形式（PDF 文件 / 长图战报 / PR），访问权限已全部开放，点击新标签查看。</p></div>}
      </div>
    </motion.article>
  </dialog>
}

export function CaseDialogProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useSearchParams()
  const openId = params.get('case')
  const openCase = (id: string) => setParams(prev => { const p = new URLSearchParams(prev); p.set('case', id); return p })
  const close = () => setParams(prev => { const p = new URLSearchParams(prev); p.delete('case'); return p })
  const openItem = cases.find(c => c.id === openId) || legacyCases.find(c => c.id === openId) || null
  return <DialogCtx.Provider value={openCase}>{children}{openItem && <CaseDialog item={openItem} onClose={close} />}</DialogCtx.Provider>
}
