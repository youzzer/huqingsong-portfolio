import type { CaseItem } from './cases'

// Artwork identity is independent of the old, page-level case identity.
// Only the pictured project is shown; portfolio compilation pages stay in /portfolio.
export const projectIdByArtwork: Record<string, string> = {
  'featured-dy-welcome.webp': 'bd-welcome', 'featured-dy-health.webp': 'bd-health',
  'featured-dy-superplay.webp': 'bd-superplay', 'featured-dy-cannes.webp': 'bd-cannes',
  'featured-dy-fushanhai.webp': 'bd-fushanhai', 'featured-wb-chinajoy.webp': 'chinajoy-manual-2026',
  'featured-wb-annual.webp': 'game-esports-annual-2026', 'featured-wb-acg.webp': 'waw-2026',
  'featured-wb-summer.webp': 'summer-plan-2026', 'featured-wb-jrnight.webp': 'jrnight-plan',
  'featured-wb-kpl.webp': 'kpl-manual-2025', 'featured-wb-s15.webp': 's15-manual-2025',
  'cover-cny.webp': 'cny-2026', 'cover-summer.webp': 'summer-2026',
  'cover-hs4x.webp': 'hsr-42', 'cover-hs44.webp': 'hsr-44', 'cover-hs47.webp': 'hsr-47', 'cover-wzkq.webp': 'wangzhe-wxq',
  'cover-hpjy.webp': 'ciji-night', 'cover-wz55.webp': 'wzry-55', 'cover-wzwsj.webp': 'wz-world',
  'cover-sjz.webp': 'delta-force',   'cover-kpl.webp': 'kpl-2025',
  'cover-esports-h2.webp': 'esports-h2',
  'featured-dy-kfc.webp': 'kfc-sun', 'featured-dy-lululemon.webp': 'lululemon',
  'featured-dy-deyou.webp': 'deyou', 'featured-dy-lamer.webp': 'lamer',
  'featured-dy-shuhua.webp': 'shuhua', 'featured-dy-roborock.webp': 'roborock',
  'cover-waw-review-2025.webp': 'waw-review-2025',
  'cover-jrnight-case-2025.webp': 'jrnight-case-2025',
  'cover-esports-talent-real.webp': 'esports-talent-manual',
  'cover-acg-talent.webp': 'acg-talent-manual',
}

export function normalizeProjects(legacy: CaseItem[]): CaseItem[] {
  const byId = new Map(legacy.map(p => [p.id, p]))
  const source = (id: string) => byId.get(id)!
  const img = (file: string) => `${import.meta.env.BASE_URL}img/${file}`
  const make = (base: string, id: string, title: string, description: string, deliverables: string[], linkIndices: number[], cover?: string, metrics: CaseItem['metrics'] = []): CaseItem => ({
    ...source(base), id, title, description, deliverables, metrics, long: false,
    cover: cover ? img(cover) : '',
    materials: cover ? [{ tab: cover.startsWith('featured-wb') ? '手册封面' : '项目素材', images: [img(cover)] }] : [],
    links: linkIndices.map(i => source(base).links[i]),
  })
  const cj = source('chinajoy-2026')
  const split: CaseItem[] = [
    // ChinaJoy 拆两张：招商方案在左、结案落地在右（2 列网格按 ORDER 顺序填充）
    {
      ...cj, id: 'chinajoy-manual-2026', title: '2026 ChinaJoy × 高通骁龙 · 招商方案', status: '招商方案',
      deliverables: ['招商方案'],
      description: '面向游戏厂商的 2026 ChinaJoy 招商方案：以「云逛展」动线地图串联参展游戏 IP，规划专题页、集卡互动、E4 馆展台与红人站台等分层合作权益。',
      metrics: [], cover: img('featured-wb-chinajoy.webp'), long: false,
      materials: [{ tab: '招商方案', images: [img('f-p10.webp')] }],
      links: [cj.links[0]],
    },
    {
      ...cj, id: 'chinajoy-2026', title: '2026 ChinaJoy × 高通骁龙 · 结案与专题页落地',
      deliverables: ['活动专题页', '集卡专题页', '结案PR长图'],
      cover: img('crops/cj-review.webp'), long: false,
      materials: [{ tab: '专题页与结案', images: [img('f-p11.webp')] }],
      links: [cj.links[1]],
    },
    make('bd-cannes', 'bd-cannes', '第78届戛纳国际电影节 × 抖音 招商手册', '抖音作为官方短视频独家合作平台进行深度合作与品牌露出。', ['戛纳 × 抖音招商手册'], [0], 'featured-dy-cannes.webp'),
    make('bd-cannes', 'bd-fushanhai', '「赴山海」剧集衍生歌会招商手册', '武侠 IP+顶流+黑科技，打造沉浸式烟花秀+全民互动。', ['「赴山海」剧集衍生歌会招商手册'], [1], 'featured-dy-fushanhai.webp'),
    make('bd-vertical-ip', 'bd-welcome', '《欢迎来到我的人生》招商手册', '母婴侧孵化抖音首档新手妈妈观察纪实微综《欢迎来到我的人生》。', ['《欢迎来到我的人生》招商手册'], [0], 'featured-dy-welcome.webp'),
    // Cover says 健康成分实验室, not 了不起的皮肤科医生. No proven matching link or results.
    make('bd-vertical-ip', 'bd-health', '健康成分实验室 · 招商方案', '健康成分实验室溯源季 · S级健康行业营销招商方案。', ['健康成分实验室招商方案'], [], 'featured-dy-health.webp'),
    make('bd-vertical-ip', 'bd-superplay', '抖音文娱超玩计划 · 招商手册', '游戏侧「抖音超玩计划」首次打通抖音文娱+游戏+搜索三大运营资源。', ['「抖音文娱超玩计划」招商手册'], [2], 'featured-dy-superplay.webp'),
    make('bd-vertical-ip', 'bd-dermatologist', '《了不起的皮肤科医生》招商手册', '美妆侧《了不起的皮肤科医生》吸引玉泽、珀莱雅等 KA。', ['《了不起的皮肤科医生》招商手册'], [1]),
    make('acg-annual-2026', 'game-esports-annual-2026', '2026微博游戏电竞年度招商通案', '游戏电竞侧：依托 3 亿+ 二次元兴趣用户、666 个游戏 IP 与 1.33 亿电竞人群。', ['游戏电竞年度招商通案'], [1], 'featured-wb-annual.webp'),
    make('acg-annual-2026', 'anime-annual-2026', '2026微博动漫年度招商通案', '动漫侧：6500 万动漫强兴趣用户、200+ 版权池、2 万+ 动漫大V。', ['动漫年度招商通案'], [0]),
    make('acg-annual-2026', 'waw-2026', '2026微博游戏动漫展 WAW · 招商方案', 'WAW 定位北方规模最大标杆漫展，设四大主题馆，联动 150+ 参展 IP、100+ 次元嘉宾、700+ coser。', ['WAW 漫展项目方案'], [2], 'featured-wb-acg.webp', source('acg-annual-2026').metrics.map(([v,l]) => [v, l.includes('首届') ? l : `首届 ${l}`])),
    {
      ...source('acg-annual-2026'), id: 'waw-review-2025', title: '2025微博游戏动漫展 WAW · 结案战报', status: '已结案',
      deliverables: ['结案战报'],
      description: '首届 WAW 3 天 6.8 万人次入场，话题阅读 24.5 亿，主榜热搜 87 个，视频播放 2.9 亿。',
      metrics: source('acg-annual-2026').metrics, cover: img('cover-waw-review-2025.webp'), long: false,
      materials: [{ tab: '结案报告', images: [img('f-p49.webp')] }],
      links: [source('acg-annual-2026').links[2]],
    },
    make('esports-s', 'kpl-manual-2025', '2025年KPL年度总决赛 · 微博营销通案', '以主话题长线运营、战队/选手加油榜等互动产品搭建赛期社交主场，设计「赛事主赞/决赛各1席+战队/选手助威N席」分层招商包，覆盖鸟巢线下权益。', ['KPL 年总微博招商通案'], [0], 'featured-wb-kpl.webp', [source('esports-s').metrics[0]]),
    make('esports-s', 's15-manual-2025', '2025英雄联盟全球总决赛 · 微博招商方案', '以「1+N」热点伴随+多元话题锁定全程赛事流量，设计六类资源包。', ['英雄联盟 S15 微博招商方案'], [1], 'featured-wb-s15.webp', source('esports-s').metrics.slice(1)),
    make('jrnight-plan', 'jrnight-plan', '2025竞燃之夜盛典招商方案', '竞燃之夜为国内首个「体育+电竞」跨界盛典，已延续 3 届、话题阅读超 100 亿，聚体育冠军、电竞选手与文娱艺人 200+ 同台。', ['竞燃之夜招商方案'], [0], 'featured-wb-jrnight.webp', source('jrnight-plan').metrics),
    {
      ...source('jrnight-2025'), id: 'jrnight-case-2025', title: '2025微博竞燃之夜 · 项目结案', status: '已结案',
      deliverables: ['项目结案'],
      description: '竞燃之夜项目整体结案：覆盖传播数据、热搜表现、红毯/直播/话题运营及商业化权益兑现。',
      metrics: source('jrnight-2025').metrics, cover: img('cover-jrnight-case-2025.webp'), long: false,
      materials: [{ tab: '结案报告', images: [img('f-p50.webp')] }],
      links: [source('jrnight-2025').links[0]],
    },
    {
      ...source('jrnight-2025'), id: 'jrnight-2025', title: '2025微博竞燃之夜 · 三品牌合作PR', status: '已结案',
      deliverables: ['品牌合作PR（iQOO / 天猫双11 / 小鹏汽车）'],
      description: 'iQOO 总冠名全周期绑定红毯/直播/话题；天猫双11 沿引流期—引爆期—收割期节奏卡点，红包互动登榜；小鹏 X9 出任红毯指定接驳车、P7 现场同框。',
      metrics: source('jrnight-2025').metrics, cover: img('cover-jrnight-brands-real.webp'), long: false,
      materials: [{ tab: '三品牌合作 PR', images: [img('cover-jrnight-brands-real.webp')] }],
      links: [source('jrnight-2025').links[0]],
    },
    make('bd-starfilm', 'bd-starfilm-manual', '「美好星影100+」招商手册', '美好星影 100+ 联动达人二创及平台资源，将首播流量转化为二次传播声量。', ['美好星影 100+ 招商手册（25H1 通用版）'], [1]),
    make('bd-starfilm', 'bd-entertainment-navigation', '抖音影视综合作导航', '影视综合作导航为泛文娱行业客户提供定制化资源及热点营销服务，支持电影、剧集、综艺全链路推广。', ['抖音影视综合作导航'], [0]),
    make('acg-influencer', 'esports-talent-manual', '电竞选手经纪手册', '手册覆盖 5 大赛事 33 名选手（S 级 16 人、A 级 17 人），标准化选手站内生态与人群画像，供品牌按预算和行业直接选人。', ['电竞选手经纪手册'], [0]),  make('acg-influencer', 'acg-talent-manual', '微博达人营销新解 · ACG篇', 'ACG 篇按 3 个生态板块、13 个垂直细分类型梳理达人矩阵，跑通四级合作模式，已服务 7 大行业。', ['ACG 达人营销新解'], [1]),
  ]
  split.push(
    // 抖音文娱 S 级项目：与「代表项目」对齐补全，此前只有数据、没有独立卡片
    {
      ...source('bd-cannes'), id: 'bd-movie-night', title: '2025 抖音电影奇遇夜 · S 级项目联合孵化', status: '已结案',
      deliverables: ['S 级项目联合孵化'],
      description: '联合孵化的 S 级文娱项目，项目总曝光 100 亿+。',
      metrics: [['100 亿+', '项目总曝光']],
      cover: img('cover-movie-night.webp'), long: false,
      materials: [{ tab: '项目封面', images: [img('cover-movie-night.webp')] }],
      links: [],
    },
    make('bd-interactive', 'tmall-interactive-618', '2025天猫618创新内容互动规划', '融合 AIGC 互动、热点共创及星选任务。', ['2025 天猫 618 创新内容互动规划'], [0]),
    make('bd-interactive', 'luckycup-karry', '幸运咖 × 王俊凯传播方案', '幸运咖 × 王俊凯传播方案。', ['幸运咖 × 王俊凯传播方案'], [1]),
    make('bd-interactive', 'ant-liuyifei', '蚂蚁保 × 刘亦菲传播方案', '蚂蚁保 × 刘亦菲传播方案。', ['蚂蚁保 × 刘亦菲传播方案'], [2]),
    // ————— 朗知传媒 · 达人执行（按作品集 p44/45 排序：#1 抖音结案 → #3 小红书结案 → CNY → Women's Day） —————
    make('smart-cases', 'smart-1-platinum', 'smart #1 铂金版上市抖音KOL达人合作结案', '分层达人策略助力抖音传播 #1 铂金版，以科技+轻奢内容达成 4053 万播放量，超额完成 KPI（播放 108%/互动 113%），精准塑造「新奢」标签并驱动购车转化。', ['抖音 KOL 合作结案报告'], [1], undefined, source('smart-cases').metrics.slice(0, 2)),
    make('smart-cases', 'smart-3-anniversary', 'smart #3 25周年星空纪念版重庆小红书达人合作结案', '全域阅读量超预期 102%，互动达成 104%（7335+），联动 15+ 跨领域 KOL（如 @眠羊Fooy 单篇互动 2386）。', ['小红书达人合作结案'], [0], undefined, [source('smart-cases').metrics[2]]),
    make('smart-campaign', 'smart-cny', 'smart 2024 CNY Campaign Review', '明星与达人矩阵驱动 #TheMeThe1 主题活动，以用户共创实现高曝光强互动。', ['CNY Campaign Review'], [0]),
    make('smart-campaign', 'smart-womens-day', 'smart 2024 Women’s Day Campaign Review', '跨界联动星座财经达人（@陶白白、@小Lin说）打造「运势 VS 局势」话题，验证「热点 × 达人 × 用户参与」传播模型。', ['Women’s Day Campaign Review'], [1]),
    // ————— 朗知传媒 · 内容运营（4 张月度/Q2 传播规划） —————
    make('smart-plans', 'smart-plan-jan', 'smart 小红书 2024年1月传播规划', '1 月借节日及「脆皮打工人」话题，创意短视频播放 200 万+，CPM¥8.2，线索转化率 14%，强化 smart「新春智能」心智。', ['1月传播规划'], [0]),
    make('smart-plans', 'smart-plan-feb', 'smart 小红书 2024年2月传播规划', '2 月借春节冬日出行，结合「短剧逃离」「班味」话题，做 MBTI 强攻略、emoji 挑战、情侣短视频，联动奈雪联名+抽奖，强化智能生活化形象。', ['2月传播规划'], [1]),
    make('smart-plans', 'smart-plan-apr', 'smart 小红书 2024年4月传播规划', '借春季热点，结合「拼贴诗」「薄荷曼波」潮流，做愚人节反差等互动，联动时髦精 IP 与北京车展，融入地球日环保理念，强化产品生活化与用户共创。', ['4月传播规划'], [2]),
    make('smart-plans', 'smart-plan-q2', 'smart 小红书 2024年Q2传播规划', 'Q2 聚焦「新奢都市」调性，整合车展、520 联名、双车焕新及概念车亮相，联动时尚芭莎×CROCS 跨界与节点营销，强化高端形象，驱动销量转化与用户蓄能。', ['Q2传播规划'], [3]),
    // 内容运营：发现春日灵感地图（保留原详情素材页）
    {
      ...source('smart-content'), id: 'smart-content', title: 'smart × 小红书「发现春日灵感地图」',
      description: 'smart 联名小红书「发现春日灵感地图」，覆盖京沪蓉深四城，渗透宠物、运动、时尚圈层，联动平台、达人与线下活动，强化「都市新奢生活」标签，斩获 7000 万+ 曝光、4000+ 优质笔记，引爆社交声量与用户共创。',
      links: [source('smart-content').links[0]],
    },
    // 内容运营：4 月短视频及中视频规划（飞书 PDF 原件）
    {
      ...source('smart-content'), id: 'smart-video-plan', title: 'smart 小红书 4 月短视频及中视频规划',
      deliverables: ['4月短视频及中视频规划'],
      description: '4 月视频聚焦 #3 与 #1 车型：#3 以场景化短片凸显时尚、空间、智能；#1 凭「P人救星」中视频传递全场景密友功能，精准触达职场潮男与效率党，深化「新奢智能」标签。',
      metrics: [], cover: img('crops/smart-video-plan.webp'), long: false,
      materials: [{ tab: '视频规划', images: [img('crops/smart-video-plan.webp')] }],
      links: [{ name: 'smart 小红书 4 月视频规划（飞书）', url: 'https://my.feishu.cn/file/N3p6bFG8WoYdIyxlqvkciE4LnPg' }],
    },
    // 内容运营：3 月月报与平台监测周报拆两卡（各自真实封面）
    {
      ...source('smart-data'), id: 'smart-monthly', title: 'smart 小红书 3 月月报',
      deliverables: ['3 月月报'],
      description: '以 MBTI 热点+春节场景化内容撬动用户共鸣，单月涨粉 3165，涨粉率领跑竞品（奔驰/宝马仅 2%），结合高回复机制（评论回复率 91%）及情感化运营策略，强化品牌「新春社交」标签，为后续蓄能奠定基础。',
      metrics: source('smart-data').metrics.slice(0, 3),
      cover: img('c-p48.webp'), long: false,
      materials: [{ tab: '月报', images: [img('f-p48.webp')] }],
      links: [source('smart-data').links[0]],
    },
    {
      ...source('smart-data'), id: 'smart-weekly', title: 'smart 小红书平台监测周报',
      deliverables: ['平台监测周报'],
      description: '3.25–3.31 数据周报：非负面声量占比 99.7% 创新高，负面率仅 0.3%；「试驾体验」「女性购车」话题引爆互动（单篇最高 3622），日均声量超 MINI，以场景化内容+高转化话题稳居细分市场头部。',
      metrics: [['99.7%', '周非负面声量占比'], ['3622', '单篇最高互动'], ['0.3%', '周负面率']],
      cover: img('crops/smart-weekly.webp'), long: false,
      materials: [{ tab: '周报', images: [img('crops/smart-weekly.webp')] }],
      links: [{ name: 'smart 小红书平台监测周报 3.25–3.31（飞书）', url: 'https://my.feishu.cn/file/FLO5bqKclo3sRqxIESCceOEHnrh' }],
    },
  )
  const replaced = new Set(['chinajoy-2026', 'bd-cannes', 'bd-vertical-ip', 'acg-annual-2026', 'esports-s', 'jrnight-plan', 'jrnight-2025', 'bd-starfilm', 'acg-influencer', 'bd-interactive', 'smart-cases', 'smart-campaign', 'smart-plans', 'smart-content', 'smart-data'])
  const projects = [...legacy.filter(p => !replaced.has(p.id)).map(p => ({ ...p })), ...split]
  // 拆分项目里没有独立封面的，补同一素材页的真实截图，避免灰色占位卡
  // 注：anime-annual / esports-casebook 无真实封面，esports-talent 改用 deck 裁切（见 cropCovers），不再错配
  const extraCovers: Record<string, string> = {
    'acg-talent-manual': 'c-p25.webp',
  }
  const realCovers: Record<string, string> = {
    'esports-talent-manual': 'cover-esports-talent-real.webp',
  }
  for (const [id, file] of Object.entries(realCovers)) {
    const p = projects.find(p => p.id === id)
    if (p) {
      p.cover = img(file)
      if (p.id === 'esports-talent-manual') p.materials = [{ tab: '手册内容', images: [img('f-p51.webp')] }]
    }
  }
  for (const [id, file] of Object.entries(extraCovers)) {
    const p = projects.find(p => p.id === id)
    if (p && !p.cover) {
      p.cover = img(file)
      if (!p.materials.length) p.materials = [{ tab: '项目素材', images: [img(file)] }]
    }
  }
  // 横屏/专题封面：仅替换卡片封面，保留原素材页完整滚动阅读
  const coverOnly: Record<string, string> = {
    'cny-2026': 'cover-cny.webp',
    'summer-2026': 'cover-summer.webp',
    'hsr-42': 'cover-hs4x.webp',
    'hsr-44': 'cover-hs44.webp',
    'hsr-47': 'cover-hs47.webp',
    'wangzhe-wxq': 'cover-wzkq.webp',
    'ciji-night': 'cover-hpjy.webp',
    'wzry-55': 'cover-wz55.webp',
    'wz-world': 'cover-wzwsj.webp',
    'delta-force': 'cover-sjz.webp',
    'kpl-2025': 'cover-kpl.webp',
    'esports-h2': 'cover-esports-h2.webp',
    'tmall-618': 'cover-ali618.webp',
  }
  for (const [id, file] of Object.entries(coverOnly)) {
    const p = projects.find(p => p.id === id)
    if (p) p.cover = img(file)
  }
  // One artwork per active project. Never inherit a mixed portfolio-page material.
  const keepMaterials = new Set(['chinajoy-manual-2026'])
  for (const [artwork, id] of Object.entries(projectIdByArtwork)) {
    const p = projects.find(p => p.id === id)!
    p.cover = img(artwork)
    // cover-*.webp 是横屏卡片封面，仅替换封面，保留原素材页；其余 artwork 替换封面+素材
    if (!artwork.startsWith('cover-') && !keepMaterials.has(id)) {
      p.materials = [{ tab: artwork.startsWith('featured-wb') ? '手册封面' : '项目素材', images: [img(artwork)] }]
    }
    if (artwork === 'featured-wb-summer.webp') p.deliverables = ['招商方案']
  }
  // 封面二次覆盖：无真实封面/重复/损坏的项目改为 fallback 渐变（裁切封面见 cropCovers）
  const coverOverride: Record<string, string> = {
    // tmall-weibo 原图 c-p41 为竖版长图（416×900），裁切后三台手机铺深色底板横版（wb-kaishi）保证完整不裁切
    'tmall-weibo': img('crops/wb-kaishi.webp'),
  }
  for (const [id, cover] of Object.entries(coverOverride)) {
    const p = projects.find(p => p.id === id)
    if (p) p.cover = cover
  }
  // 拆分案例没有独立封面的，继承同源案例封面，避免空白占位
  const inheritCovers: Record<string, string> = {
    'bd-dermatologist': 'cover-dermatologist.webp',
    'bd-starfilm-manual': 'cover-starfilm.webp',
    'bd-entertainment-navigation': 'c-p29.webp',
    'tmall-interactive-618': 'c-p30.webp',
    'luckycup-karry': 'cover-luckycup-karry.webp',
    'ant-liuyifei': 'cover-ant-liuyifei.webp',
    'smart-3-anniversary': 'c-p44.webp',
    'smart-1-platinum': 'c-p44.webp',
    'smart-cny': 'c-p45.webp',
    'smart-womens-day': 'c-p45.webp',
  }
  for (const [id, file] of Object.entries(inheritCovers)) {
    const p = projects.find(p => p.id === id)
    if (p && !p.cover) p.cover = img(file)
  }
  // 最终封面：从真实素材裁切的横版 16:10（替代竖版长图/错配图，封面裁切不改变详情页的完整长图素材）
  const cropCovers: Record<string, string> = {
    'chinajoy-2026': 'crops/cj-review.webp',
    'cny-2026': 'crops/cny-review.webp',
    'summer-2026': 'crops/summer-review.webp',
    'hsr-42': 'crops/hs42-review.webp',
    'hsr-44': 'crops/hs44-review.webp',
    'wangzhe-wxq': 'crops/wzkq-review.webp',
    'wzry-55': 'crops/wz55-review.webp',
    'wz-world': 'crops/wzwsj-review.webp',
    'ciji-night': 'crops/hpjy-review.webp',
    'delta-force': 'crops/sjz-review.webp',
    'kpl-2025': 'crops/kpl-review.webp',
    // 实习案例封面修复：源 PDF（1019Final）p38/39/40/42 的真实内容裁切，
    // 替换原先错配的 cover-ali618（双手机截图）与黑底笔刷图（f-p40/f-p42 是旧源文件的分节装饰页）
    'tmall-618': 'f-p39.webp',
    'tmall-zhihu': 'crops/zhihu-review.webp',
    'tmall-dsp': 'crops/dsp-review.webp',
    'tmall-ops': 'crops/ops-review.webp',
    // smart Women's Day 封面：用 smart-other 报告 p1 真实封面，替换原错配的 c-p45（与 CNY 重复）
    'smart-womens-day': 'crops/womens-day-cover.webp',
    // smart 两张结案卡封面去重：小红书卡用结案 PDF 完整首页（底部补白保住全标题），
    // 抖音卡用其结案表格内嵌的 smart #1（HC11）25 周年产品说明页；
    // 替换原先两卡共用的 c-p44（重复且左侧裁字）
    'smart-3-anniversary': 'crops/smart-3-xhs.webp',
    'smart-1-platinum': 'crops/smart-1-douyin.webp',
    // 内容运营 4 张传播规划封面：各月规划 PDF（飞书原件）p1，底部补白 16:10
    'smart-plan-jan': 'crops/smart-plan-jan.webp',
    'smart-plan-feb': 'crops/smart-plan-feb.webp',
    'smart-plan-apr': 'crops/smart-plan-apr.webp',
    'smart-plan-q2': 'crops/smart-plan-q2.webp',
  }
  for (const [id, file] of Object.entries(cropCovers)) {
    const p = projects.find(p => p.id === id)
    if (p) {
      p.cover = img(file)
      p.long = false
      if (!p.materials.length) p.materials = [{ tab: '项目素材', images: [img(file)] }]
    }
  }
  // 实习案例详情修复：f-p40/f-p42 在旧源文件里是黑底笔刷装饰页，换成 1019Final 的真实整页
  const detailFix: Record<string, { tab: string; file: string }> = {
    'tmall-zhihu': { tab: '执行与结案', file: 'crops/zhihu-full.webp' },
    'tmall-dsp': { tab: '投放材料', file: 'crops/dsp-full.webp' },
  }
  for (const [id, d] of Object.entries(detailFix)) {
    const p = projects.find(p => p.id === id)
    if (p) p.materials = [{ tab: d.tab, images: [img(d.file)] }]
  }
  return projects
}
