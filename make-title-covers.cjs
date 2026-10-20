const fs = require('fs')
const path = require('path')
const pp = require('/Users/xuyouzeecho/.workbuddy/binaries/node/workspace/node_modules/puppeteer-core')

const covers = [
  {
    file: 'cover-movie-night.png',
    kicker: 'DOUYIN ENTERTAINMENT · S-LEVEL',
    overline: '2025 抖音',
    title: '电影奇遇夜',
    line: 'S 级项目联合孵化 · 项目总曝光 100 亿+',
    accent: '#5b8cff',
    base: '#080b14',
    glow: 'rgba(43,79,158,.55)',
    marks: 'film',
  },
  {
    file: 'cover-dermatologist.png',
    kicker: 'DOUYIN · BEAUTY VERTICAL IP',
    overline: '美妆垂类纪录片',
    title: '了不起的皮肤科医生',
    line: '玉泽、珀莱雅等 KA 合作 · 招商手册',
    accent: '#63d3b4',
    base: '#07100e',
    glow: 'rgba(32,110,92,.5)',
    marks: 'grid',
  },
]

const html = c => `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1600px;height:1000px;overflow:hidden}
  body{background:${c.base};font-family:'PingFang SC','Helvetica Neue',sans-serif;color:#fff;position:relative}
  .glow{position:absolute;inset:0;background:
    radial-gradient(900px 620px at 78% 22%, ${c.glow}, transparent 62%),
    radial-gradient(700px 500px at 8% 96%, rgba(255,255,255,.05), transparent 60%);}
  .vignette{position:absolute;inset:0;background:radial-gradient(120% 100% at 50% 50%, transparent 45%, rgba(0,0,0,.55) 100%)}
  .marks{position:absolute;inset:0;opacity:.5}
  .frame{position:absolute;left:96px;right:96px;top:88px;bottom:88px;display:flex;flex-direction:column;justify-content:space-between}
  .kicker{font-size:15px;letter-spacing:.34em;color:rgba(255,255,255,.48);font-weight:500;padding-left:2px}
  .mid{padding-bottom:8px}
  .overline{font-size:34px;color:${c.accent};letter-spacing:.12em;font-weight:400;margin-bottom:18px}
  .title{font-family:'Songti SC','Noto Serif SC',serif;font-size:${c.title.length > 7 ? 104 : 138}px;line-height:1.08;letter-spacing:.03em;font-weight:600;text-shadow:0 8px 60px rgba(0,0,0,.6)}
  .foot{display:flex;align-items:center;gap:20px}
  .foot i{display:block;width:56px;height:1px;background:${c.accent};opacity:.8}
  .foot span{font-size:22px;letter-spacing:.04em;color:rgba(255,255,255,.72)}
</style></head><body>
  <div class="glow"></div>
  <div class="marks">${c.marks === 'film' ? filmMarks : gridMarks}</div>
  <div class="vignette"></div>
  <div class="frame">
    <div class="kicker">${c.kicker}</div>
    <div class="mid"><div class="overline">${c.overline}</div><div class="title">${c.title}</div></div>
    <div class="foot"><i></i><span>${c.line}</span></div>
  </div>
</body></html>`

const filmMarks = `
  <svg width="1600" height="1000" viewBox="0 0 1600 1000" fill="none">
    <g opacity=".5">
      ${Array.from({ length: 11 }, (_, i) => `<rect x="34" y="${40 + i * 88}" width="18" height="52" rx="9" fill="rgba(255,255,255,.10)"/>`).join('')}
      ${Array.from({ length: 11 }, (_, i) => `<rect x="1548" y="${40 + i * 88}" width="18" height="52" rx="9" fill="rgba(255,255,255,.10)"/>`).join('')}
    </g>
    <circle cx="1250" cy="330" r="260" stroke="rgba(255,255,255,.07)" stroke-width="1"/>
    <circle cx="1250" cy="330" r="380" stroke="rgba(255,255,255,.05)" stroke-width="1"/>
    <circle cx="1250" cy="330" r="500" stroke="rgba(255,255,255,.035)" stroke-width="1"/>
  </svg>`

const gridMarks = `
  <svg width="1600" height="1000" viewBox="0 0 1600 1000" fill="none">
    <g opacity=".55" stroke="rgba(255,255,255,.055)" stroke-width="1">
      ${Array.from({ length: 9 }, (_, i) => `<line x1="${980 + i * 70}" y1="0" x2="${980 + i * 70}" y2="1000"/>`).join('')}
      ${Array.from({ length: 9 }, (_, i) => `<line x1="900" y1="${120 + i * 80}" x2="1600" y2="${120 + i * 80}"/>`).join('')}
    </g>
    <circle cx="1280" cy="520" r="330" stroke="rgba(99,211,180,.12)" stroke-width="1"/>
  </svg>`

;(async () => {
  const b = await pp.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, pipe: true, args: ['--no-sandbox', '--font-render-hinting=none'] })
  const p = await b.newPage()
  await p.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 })
  for (const c of covers) {
    await p.setContent(html(c), { waitUntil: 'load' })
    await new Promise(r => setTimeout(r, 350))
    await p.screenshot({ path: path.join(process.cwd(), 'public/img', c.file) })
    console.log('rendered', c.file)
  }
  await b.close()
})()
