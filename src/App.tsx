import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import styles from './Portfolio.module.css'
import { companies } from './resume'
import Navbar from './components/Navbar'
import { CaseDialogProvider } from './components/CaseModal'
import Home from './pages/Home'
import EntryLoading from './components/EntryLoading'
import CompanyPage from './pages/CompanyPage'
import ResumePage from './pages/ResumePage'
import PortfolioPage from './pages/PortfolioPage'

function Footer() {
  return <footer className={styles.footer}>
    <div className={styles.footerBar}>
      <span>© 2026 胡庆松 · 求职作品集</span>
      <span>案例已脱敏 · 仅供求职使用</span>
    </div>
  </footer>
}

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => { if (pathname !== '/portfolio') window.scrollTo(0, 0) }, [pathname])
  const viewerPage = pathname === '/resume' || pathname === '/portfolio'
  return <EntryLoading><CaseDialogProvider>
    {!viewerPage && <Navbar />}
    <Routes>
      <Route path="/" element={<Home />} />
      {companies.map(c => <Route key={c.key} path={c.path} element={<CompanyPage company={c} />} />)}
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="*" element={<Home />} />
    </Routes>
    <Footer />
  </CaseDialogProvider></EntryLoading>
}
