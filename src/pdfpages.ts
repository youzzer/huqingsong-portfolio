// PDF 在线浏览的页面图片（由原始 PDF 渲染生成，未改动原件）
export const RESUME_PAGES = 2
export const PORTFOLIO_PAGES = 50
export const pageImg = (kind: 'resume' | 'portfolio', n: number) =>
  kind === 'resume'
    ? `${import.meta.env.BASE_URL}pdfpages/resume/${n}.jpg`
    : `${import.meta.env.BASE_URL}deck/p${String(n).padStart(2, '0')}.jpg`
