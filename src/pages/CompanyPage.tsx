import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import styles from '../Portfolio.module.css'
import { companies, type Company } from '../resume'
import { cases, type CaseItem } from '../cases'
import { CaseCard, PageFade, SectionHeader } from '../shared'
import TextEmphasis from '../components/TextEmphasis'

// 筛选项：微博/字节按业务线，实习按机构（阿里健康=天猫健康）

// 招商手册 ↔ 结案 PR 配对：左招商、右结案，避免同一项目两张卡割裂展示
const PAIRS: Record<string, string[]> = {
  'summer-plan-2026': ['summer-2026'],
  'chinajoy-manual-2026': ['chinajoy-2026'],
  'jrnight-plan': ['jrnight-case-2025'],
  'kpl-manual-2025': ['kpl-2025'],
}
const PAIR_RIGHTS = new Set(Object.values(PAIRS).flat())
// 严格 2 列排序：按用户指定的阅读顺序（招商↔结案相邻），未指定的接在后面
const ORDER: Record<string, string[]> = {
  '微博游戏': [
    'chinajoy-manual-2026', 'chinajoy-2026',
    'summer-plan-2026', 'summer-2026',
    'waw-2026', 'waw-review-2025',
    'game-esports-annual-2026', 'cny-2026',
    'hsr-42', 'hsr-44',
    'hsr-47', 'wzry-55',
    'wangzhe-wxq', 'wz-world',
    'ciji-night', 'delta-force',
  ],
  '微博电竞': [
    'kpl-manual-2025', 'kpl-2025',
    'jrnight-plan', 'jrnight-case-2025',
    'jrnight-2025',
    'esports-h2', 's15-manual-2025',
    'esports-talent-manual', 'acg-talent-manual',
  ],
  '文娱IP': [
    'bd-welcome', 'bd-superplay',
    'bd-cannes', 'bd-fushanhai',
    'bd-entertainment-navigation',
  ],
  '互动IP': [
    'bd-interactive', 'tmall-interactive-618',
    'luckycup-karry', 'ant-liuyifei',
    'lamer', 'shuhua',
    'kfc-sun', 'roborock',
    'lululemon', 'deyou',
  ],
}



// 全局隐藏：用户明确不要的卡片（不论分组/筛选，含「全部」视图）
const HIDE_CASES = new Set(['bd-ip-poc', 'bd-starfilm-manual', 'luckycup-karry', 'ant-liuyifei', 'bd-dermatologist', 'bd-movie-night', 'anime-annual-2026', 'smart-kol'])

type Group = { label: string; match: (c: CaseItem) => boolean }
const GROUPS: Record<string, Group[]> = {
  weibo: [
    { label: '微博游戏', match: (c: CaseItem) => c.org === '微博' && (c.line === '游戏项目' || c.line === '平台IP') },
    { label: '微博电竞', match: (c: CaseItem) => c.org === '微博' && c.line === '电竞赛事' },
    { label: 'AI提效', match: (c: CaseItem) => c.org === '微博' && c.line === 'AI提效' },
  ],
  bytedance: ['文娱IP', '互动IP'].map(l => ({ label: l, match: (c: CaseItem) => c.org === '字节跳动' && c.line === l && !HIDE_CASES.has(c.id) })),
  internship: [
    { label: '阿里健康', match: (c: CaseItem) => c.org === '天猫健康（实习）' },
    { label: '朗知·达人执行', match: (c: CaseItem) => c.org === '朗知传媒（实习）' && c.line === '达人执行' },
    { label: '朗知·内容运营', match: (c: CaseItem) => c.org === '朗知传媒（实习）' && c.line === '内容运营' },
    { label: '朗知传媒', match: (c: CaseItem) => c.org === '朗知传媒（实习）' },
  ],
}

export default function CompanyPage({ company }: { company: Company }) {
  const [params, setParams] = useSearchParams()
  const g = params.get('g') || ''
  const [query, setQuery] = useState('')
  const groups = GROUPS[company.key] || []
  const scoped = useMemo(() => cases.filter(c => company.caseOrgs.includes(c.org) && !HIDE_CASES.has(c.id)), [company])
  const activeGroup = groups.find(x => x.label === g)
  const filtered = useMemo(() => scoped.filter(c =>
    (!activeGroup || activeGroup.match(c)) &&
    (!query || (c.title + c.description + c.line + c.deliverables.join('') + c.metrics.map(m => m.join('')).join('')).toLowerCase().includes(query.toLowerCase()))
  ), [scoped, activeGroup, query])
  // 严格按 ORDER 排序，未在 ORDER 中的按原顺序接在后面
  const ordered = useMemo(() => {
    const order = (g && ORDER[g]) || []
    const map = new Map(filtered.map(c => [c.id, c]))
    const res: CaseItem[] = []
    const seen = new Set<string>()
    for (const id of order) {
      const c = map.get(id)
      if (c && !seen.has(id)) { res.push(c); seen.add(id) }
    }
    for (const c of filtered) {
      if (!seen.has(c.id)) { res.push(c); seen.add(c.id) }
    }
    return res
  }, [filtered, g])
  const index = companies.findIndex(c => c.key === company.key)
  const siblings = companies.filter(c => c.key !== company.key)

  const groupTitle: Record<string, string> = { '微博游戏': '微博', '微博电竞': '微博', 'AI提效': 'AI 提效', '文娱IP': '字节跳动', '互动IP': '字节跳动' }
  const pageTitle = groupTitle[g] || company.name
  useEffect(() => { document.title = `${pageTitle} · 胡庆松作品集` }, [pageTitle])
  const setG = (label: string) => setParams(prev => { const p = new URLSearchParams(prev); if (label) p.set('g', label); else p.delete('g'); return p }, { preventScrollReset: true })
  const clear = () => { setG(''); setQuery('') }

  return <PageFade><main className={styles.companyPage}><div className={styles.container}>
    <Link to="/" className={styles.backLink}>← 返回首页</Link>
    <header className={styles.companyHead}>
      <p className={styles.companyNum}>{String(index + 1).padStart(2, '0')} <span>{company.en}</span></p>
      <h1>{pageTitle}</h1>
      <p className={styles.companyRole}>{company.role} · {company.period}</p>
      <p className={styles.companySummary}><TextEmphasis text={company.summary} limit={6} /></p>
    </header>
    <div className={styles.expBlocks}>
      {company.blocks.map(b => <div key={b.name} className={styles.expBlock}><h4>{b.name}{b.period && <small>{b.period}</small>}</h4><p><TextEmphasis text={b.desc} limit={6} /></p></div>)}
    </div>

    <section className={styles.companyCases}>
      <SectionHeader label="CASES" first="项目" italic="案例" />
      <div className={styles.filterBar} role="search">
        <div className={styles.filterPills}>
          <button className={`${styles.pill} ${!g ? styles.pillActive : ''}`} onClick={() => setG('')}>全部</button>
          {groups.map(gr => <button key={gr.label} className={`${styles.pill} ${g === gr.label ? styles.pillActive : ''}`} aria-pressed={g === gr.label} onClick={() => setG(g === gr.label ? '' : gr.label)}>{gr.label}</button>)}
        </div>
        <input className={styles.searchInput} type="search" placeholder="搜索项目名、玩法或指标" value={query} onChange={e => setQuery(e.target.value)} aria-label="搜索案例" />
        <div className={styles.filterMeta}>
          <span>共 {filtered.length} 个案例</span>
          {(g || query) && <button className={styles.clearFilter} onClick={clear}>清除筛选 ×</button>}
        </div>
      </div>
      {filtered.length === 0
        ? <div className={styles.emptyBox}><p>没有匹配{query ? `「${query}」` : ''}的案例</p><button className={styles.btn} onClick={clear}>清除筛选，查看全部</button></div>
        : <div className={styles.caseGrid}>
          {ordered.map(c => <CaseCard key={c.id} item={c} className={c.id === 'jrnight-2025' ? styles.caseCardWide : undefined} />)}
        </div>}
    </section>

    <nav className={styles.siblingNav} aria-label="其他经历">
      {siblings.map(s => <Link key={s.key} to={s.path} className={styles.siblingCard}>
        <span>前往 {s.name}</span><b aria-hidden="true">→</b>
      </Link>)}
    </nav>
  </div></main></PageFade>
}
