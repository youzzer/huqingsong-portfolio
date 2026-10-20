import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import styles from '../Portfolio.module.css'
import { cases } from '../cases'

// ——— 导航数据（计数来自真实案例数据，不写死） ———
type DropItem = { label: string; to: string; count?: number; anchor?: string }
type NavItem = { label: string; to: string; exact?: boolean; dropdown?: DropItem[] }

const countBy = (fn: (c: (typeof cases)[number]) => boolean) => cases.filter(fn).length

const NAV: NavItem[] = [
  {
    label: '首页', to: '/', exact: true,
    dropdown: [
      { label: '精选案例', to: '/', anchor: 'work' },
      { label: '经历速览', to: '/', anchor: 'experience' },
      { label: '教育背景', to: '/', anchor: 'education' },
      { label: '联系方式', to: '/', anchor: 'contact' },
    ],
  },
  {
    label: '微博', to: '/weibo',
    dropdown: ['微博游戏', '微博电竞', 'AI提效'].map(l => ({
      label: l === 'AI提效' ? 'AI 提效' : l, to: `/weibo?g=${encodeURIComponent(l)}`,
      count: countBy(c => c.org === '微博' && (l === '微博游戏' ? (c.line === '游戏项目' || c.line === '平台IP') : c.line === (l === '微博电竞' ? '电竞赛事' : 'AI提效'))),
    })),
  },
  {
    label: '字节跳动', to: '/bytedance',
    dropdown: ['文娱IP', '互动IP'].map(l => ({
      label: l, to: `/bytedance?g=${encodeURIComponent(l)}`,
      count: countBy(c => c.org === '字节跳动' && c.line === l),
    })),
  },
  {
    label: '实习', to: '/internships',
    dropdown: [
      { label: '阿里健康', to: `/internships?g=${encodeURIComponent('阿里健康')}`, count: countBy(c => c.org === '天猫健康（实习）') },
      { label: '朗知传媒', to: `/internships?g=${encodeURIComponent('朗知传媒')}`, count: countBy(c => c.org === '朗知传媒（实习）') },
    ],
  },
  { label: '简历', to: '/resume' },
  { label: '作品集', to: '/portfolio' },
]

// ——— 桌面下拉项（hover 意图 + 桥接 + 键盘） ———
function NavDrop({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const openT = useRef<ReturnType<typeof setTimeout>>(undefined)
  const closeT = useRef<ReturnType<typeof setTimeout>>(undefined)
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const active = item.exact ? pathname === item.to : pathname.startsWith(item.to)
  const currentG = new URLSearchParams(search).get('g')

  const enter = () => { clearTimeout(closeT.current); openT.current = setTimeout(() => setOpen(true), 80) }
  const leave = () => { clearTimeout(openT.current); closeT.current = setTimeout(() => setOpen(false), 160) }
  useEffect(() => () => { clearTimeout(openT.current); clearTimeout(closeT.current) }, [])

  const goAnchor = (anchor: string) => {
    setOpen(false)
    const scroll = () => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
    if (pathname !== '/') { navigate('/'); setTimeout(scroll, 150) } else scroll()
  }

  const onTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || (e.key === 'ArrowDown' && item.dropdown)) {
      e.preventDefault(); setOpen(true)
      setTimeout(() => wrap.current?.querySelector<HTMLElement>(`.${styles.dropItem}`)?.focus(), 30)
    }
    if (e.key === 'Escape' && open) { setOpen(false); wrap.current?.querySelector<HTMLElement>(`.${styles.navItem}`)?.focus() }
  }
  const onItemKey = (e: React.KeyboardEvent, i: number) => {
    const items = [...(wrap.current?.querySelectorAll<HTMLElement>(`.${styles.dropItem}`) || [])]
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length]?.focus() }
    if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length]?.focus() }
    if (e.key === 'Escape') { setOpen(false); wrap.current?.querySelector<HTMLElement>(`.${styles.navItem}`)?.focus() }
  }

  return <div ref={wrap} className={styles.navItemWrap} onMouseEnter={enter} onMouseLeave={leave}>
    <Link
      to={item.to}
      className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
      aria-expanded={item.dropdown ? open : undefined}
      aria-haspopup={item.dropdown ? 'true' : undefined}
      onFocus={() => item.dropdown && setOpen(true)}
      onKeyDown={onTriggerKey}
    >{item.label}</Link>
    {item.dropdown && open && <div className={styles.dropdown} role="menu">
      {item.dropdown.map((d, i) => {
        const g = new URLSearchParams(d.to.split('?')[1] || '').get('g')
        const itemActive = g ? pathname === item.to && currentG === g : false
        return d.anchor
          ? <button key={d.label} role="menuitem" className={styles.dropItem} onClick={() => goAnchor(d.anchor!)} onKeyDown={e => onItemKey(e, i)}>
              <span className={styles.dropBar} />{d.label}
            </button>
          : <Link key={d.label} role="menuitem" to={d.to} className={`${styles.dropItem} ${itemActive ? styles.dropItemActive : ''}`} onClick={() => setOpen(false)} onKeyDown={e => onItemKey(e, i)}>
              <span className={styles.dropBar} />{d.label}{d.count != null && <span className={styles.dropCount}>{d.count}</span>}
            </Link>
      })}
    </div>}
  </div>
}

// ——— 移动端抽屉 ———
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [acc, setAcc] = useState<string | null>(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) setAcc(null)
    return () => { document.body.style.overflow = '' }
  }, [open])
  const goAnchor = (anchor: string) => {
    onClose()
    const scroll = () => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
    if (pathname !== '/') { navigate('/'); setTimeout(scroll, 200) } else scroll()
  }
  return <AnimatePresence>{open && <motion.div className={styles.drawer} initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: .26, ease: 'easeOut' }}>
    <div className={styles.drawerHead}>
      <Link to="/" className={styles.logo} onClick={onClose} aria-label="返回首页"><span>胡庆松</span></Link>
      <button className={styles.drawerClose} onClick={onClose} aria-label="关闭菜单">×</button>
    </div>
    <nav className={styles.drawerNav} aria-label="移动端导航">
      {NAV.map(n => <div key={n.label} className={styles.drawerGroup}>
        {n.dropdown
          ? <button className={styles.drawerItem} aria-expanded={acc === n.label} onClick={() => setAcc(acc === n.label ? null : n.label)}>
              {n.label}<span className={`${styles.drawerChevron} ${acc === n.label ? styles.drawerChevronOpen : ''}`}>›</span>
            </button>
          : <Link to={n.to} className={styles.drawerItem} onClick={onClose}>{n.label}</Link>}
        {n.dropdown && acc === n.label && <div className={styles.drawerSub}>
          <Link to={n.to} className={styles.drawerSubItem} onClick={onClose}>全部</Link>
          {n.dropdown.map(d => d.anchor
            ? <button key={d.label} className={styles.drawerSubItem} onClick={() => goAnchor(d.anchor!)}>{d.label}</button>
            : <Link key={d.label} to={d.to} className={styles.drawerSubItem} onClick={onClose}>{d.label}{d.count != null && d.count > 0 && <span className={styles.dropCount}>{d.count}</span>}</Link>)}
        </div>}
      </div>)}
    </nav>
    <button className={styles.drawerCta} onClick={() => { onClose(); goAnchor('contact') }}>联系我 <span aria-hidden="true">↗</span></button>
  </motion.div>}</AnimatePresence>
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40)
    update(); window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  useEffect(() => { setDrawer(false) }, [pathname])
  // 带 query 的导航项（如 /weibo?g=游戏项目）按完整链接匹配，避免同路径多项同时高亮
  const isActive = (to: string) => {
    const [p, q] = to.split('?')
    if (!q) return pathname === p || pathname.startsWith(p + '/')
    return pathname === p && search === `?${q}`
  }
  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (pathname !== '/') { navigate('/'); setTimeout(() => el?.scrollIntoView({ behavior: 'smooth' }), 180) }
    else el?.scrollIntoView({ behavior: 'smooth' })
  }

  return <>
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`} aria-label="主导航">
      <Link className={styles.logo} to="/" aria-label="返回首页"><span>胡庆松</span></Link>
      <div className={styles.navItems}>
        {NAV.map(n => n.dropdown ? <NavDrop key={n.label} item={n} /> : (
          <div key={n.label} className={styles.navItemWrap}>
            <Link to={n.to} className={`${styles.navItem} ${isActive(n.to) ? styles.navItemActive : ''}`}>{n.label}</Link>
          </div>
        ))}
      </div>
      <button type="button" className={styles.navCta} onClick={scrollToContact}>联系我 <span aria-hidden="true">↗</span></button>
      <button className={styles.hamburger} onClick={() => setDrawer(true)} aria-label="打开菜单" aria-expanded={drawer}><i /><i /><i /></button>
    </nav>
    <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
  </>
}
