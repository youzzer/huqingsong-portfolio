# 胡庆松 · 个人作品集（v2 星系 · 立体盲盒版）

React 18 + TypeScript + Vite + Framer Motion，HashRouter（静态托管免服务端回退），Tailwind 走 CDN，组件样式用 CSS Modules。无 Three.js / Spline，立体感由 SVG + CSS perspective + framer 弹簧完成。

## 运行

```sh
npm install --legacy-peer-deps
npx tsc --noEmit   # 构建前先跑类型检查（vite build 不查类型）
npm run build      # 产物在 dist/
npm run preview    # 预览产物
```

## 结构

- `src/components/CosmicBackground.tsx` 星系背景（程序化底图 + 推近 + 星辰 LCG + 流星）
- `src/components/BoxArt.tsx` 纯 SVG 立体盲盒 + BlindBox 交互包装（指针倾斜 / 悬停开盖 / 点击爆开）
- `src/components/BlindBoxHero.tsx` 首页 Hero（左 3 右 3 漂浮封面 + 中央文字 + 底部盒子）
- `src/components/CaseBoxSection.tsx` 精选案例（盒子 + 13 张封面炸开，IO 触发 + 2s 兜底）
- `src/components/Navbar.tsx` 悬浮胶囊导航（下拉 + 移动端抽屉）
- `src/components/CaseModal.tsx` 案例弹层（指标口径三角标：实际/方案目标/方案预估；素材五类 Tab）
- `src/pages/` Home / CompanyPage / ResumePage / PortfolioPage
- `public/bg/nebula.webp` 星系底图（numpy+PIL 程序化生成，60KB）
- `public/deck/p01…p50.jpg` 作品集 50 页内页（1440 宽 q78）
- `public/img/*.webp` 案例素材（q80）

## 深链

- `/portfolio?p=N` 直达作品集第 N 页，翻页时 URL 同步（replace）
- `?case=<id>` 案例详情弹层
- 公司页筛选 `?g=` 写入 URL，刷新保持

## 内容口径

- 所有标题、描述、指标摘自两份 PDF 原文；指标区分 实际 / 方案目标 / 方案预估（后两者琥珀色角标）
- 原始 PDF 未改动；飞书链接为 PDF 内嵌真实地址，内部域名可能仅内部可访问

## 素材缺口

- 实习「博世」导航项暂无收录案例（原始材料未含），筛选命中走空态
- 「运营 AI Agent 搭建」无图，卡片用业务关键词 + 渐变兜底
