import { createContext, useContext, useEffect, useState, type ReactNode, type RefObject } from 'react'
import { motion } from 'framer-motion'

// This installed motion version snapshots the preference; subscribe explicitly.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}
import styles from './Portfolio.module.css'
import type { CaseItem, Material } from './cases'

export const pdf = (n: string) => `${import.meta.env.BASE_URL}files/${encodeURIComponent(n)}.pdf`

// 舞台尺寸（ResizeObserver）：爆开动效按实际像素计算飞行距离
export function useStageSize(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ w: 0, h: 0, originX: 0, originY: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const stage = el.getBoundingClientRect()
      const svg = el.querySelector<SVGSVGElement>('svg[data-box-art]')
      const box = svg?.getBoundingClientRect()
      setSize({ w: stage.width, h: stage.height,
        originX: box ? box.left - stage.left + box.width * .5 : stage.width * .5,
        originY: box ? box.top - stage.top + box.height * .5 : stage.height * .5 })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return size
}

// ——— 案例弹层上下文（实现见 components/CaseModal.tsx） ———
export const DialogCtx = createContext<(id: string) => void>(() => {})
export const useCaseDialog = () => useContext(DialogCtx)

// ——— 指标分组与口径（规则只读原文标签，不新增数据） ———
const COMMERCIAL_RE = /收入|招商|商机|落袋|售卖|变现|报价|金额|GMV/
const CALIBER_RE = /[（(](方案预估|方案目标|预估|目标|实际|口径待核)[）)]/
export type Metric = { value: string; label: string; caliber: string }
export function parseMetrics(item: CaseItem) {
  const commercial: Metric[] = []
  const general: Metric[] = []
  for (const [value, raw] of item.metrics) {
    const m = raw.match(CALIBER_RE)
    const metric: Metric = {
      value,
      label: raw.replace(CALIBER_RE, ''),
      caliber: m ? (m[1] === '预估' ? '方案预估' : m[1] === '目标' ? '方案目标' : m[1]) : '口径待核',
    }
    ;(COMMERCIAL_RE.test(raw) ? commercial : general).push(metric)
  }
  return { commercial, general }
}

// ——— 素材 Tab 归并到五类（按原 Tab 名关键词，不虚构材料） ———
const CATEGORY_ORDER = ['产品原型', '产品页', '传播启宣', '结案复盘', '商业招商'] as const
function categoryOf(tab: string): (typeof CATEGORY_ORDER)[number] {
  if (/原型|DEMO|demo|PRD|需求/.test(tab)) return '产品原型'
  if (/结案|复盘|月报|周报|Review|review|战报/.test(tab)) return '结案复盘'
  if (/招商|通案|方案|手册/.test(tab)) return '商业招商'
  if (/专题页|页面|产品|上线|H5/.test(tab)) return '产品页'
  return '传播启宣'
}
export type MaterialGroup = { category: string; count: number; images: string[] }
export function groupMaterials(materials: Material[]): MaterialGroup[] {
  const map = new Map<string, string[]>()
  for (const m of materials) {
    const cat = categoryOf(m.tab)
    map.set(cat, [...(map.get(cat) || []), ...m.images])
  }
  return CATEGORY_ORDER.filter(c => map.has(c)).map(c => ({ category: c, count: map.get(c)!.length, images: map.get(c)! }))
}

// ——— 区块标题 ———
export function SectionHeader({ label, first, italic, description }: { label: string; first: string; italic: string; description?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={styles.sectionHeader} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: .8, ease: [.25, .1, .25, 1] }}>
    <p className={styles.eyebrow}>{label}</p>
    <h2>{first} <em>{italic}</em></h2>
    {description && <p className={styles.sectionDescription}>{description}</p>}
  </motion.div>
}

// ——— 案例卡片（16/10 封面，无图渐变兜底） ———
export function CaseCard({ item, className }: { item: CaseItem; className?: string }) {
  const open = useCaseDialog()
  const reduced = useReducedMotion()
  return <motion.button className={`${styles.caseCard} ${className || ''}`} onClick={() => open(item.id)} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .45 }}>
    <span className={styles.caseCover}>
      {item.cover
        ? <img src={item.cover} alt="" loading="lazy" decoding="async" className={item.long ? styles.coverTop : ''} />
        : <span className={styles.coverFallback}>{item.line}</span>}
    </span>
    <span className={styles.caseBody}>
      <span className={styles.caseLine}>{item.line}</span>
      <span className={styles.caseTitle}>{item.title}</span>
      {item.description && <span className={styles.caseDesc}>{item.description}</span>}
      <span className={styles.caseOpen}>查看 <b aria-hidden="true">↗</b></span>
    </span>
  </motion.button>
}

// ——— 页面切换淡入 ———
export function PageFade({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  return <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : .35 }}>{children}</motion.div>
}
