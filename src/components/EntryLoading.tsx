import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from '../shared'
import './EntryLoading.css'

const EntryReady = createContext(true)
export const useEntryReady = () => useContext(EntryReady)

// An entrance animation, not network/data progress. Never gates document routes.
export default function EntryLoading({ children }: { children: ReactNode }) {
  const { pathname, search } = useLocation()
  const reduced = useReducedMotion()
  const [pending, setPending] = useState(() => pathname === '/' && !search && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [progress, setProgress] = useState(0)
  const active = pending && pathname === '/' && !search && !reduced
  useEffect(() => {
    if (!active) { setPending(false); return }
    const start = performance.now()
    const finish = () => setPending(false)
    const tick = () => setProgress(Math.min(100, Math.floor((performance.now() - start) / 8.8)))
    const interval = window.setInterval(tick, 16)
    const timeout = window.setTimeout(finish, 1000)
    // Finish on hiding too: a throttled tab cannot retain an entrance overlay.
    const visibility = () => { if (document.hidden || performance.now() - start >= 1000) finish() }
    document.addEventListener('visibilitychange', visibility)
    visibility()
    return () => { clearInterval(interval); clearTimeout(timeout); document.removeEventListener('visibilitychange', visibility) }
  }, [active])
  return <EntryReady.Provider value={!active}>
    <div ref={node => { if (node) { if (active) node.setAttribute('inert', ''); else node.removeAttribute('inert') } }}>{children}</div>
    {active && <div className="entry-loading" role="status" aria-label="首页入场动画">
      <div className="entry-loading-words"><span>内容营销</span><span>商业化运营</span></div>
      <div className="entry-loading-progress" aria-hidden="true"><span>{String(progress).padStart(3, '0')}</span><div><i style={{ transform: `scaleX(${progress / 100})` }} /></div></div>
      <button type="button" onClick={() => setPending(false)}>跳过</button>
    </div>}
  </EntryReady.Provider>
}
