// 经历详情：全部摘自简历原文，仅做断句精简。
export type ExpBlock = { name: string; period?: string; desc: string; linkTo?: string }
export type Company = {
  key: string; path: string; name: string; en: string; role: string; period: string
  summary: string; blocks: ExpBlock[]; caseOrgs: string[]
}

export const companies: Company[] = [
  {
    key: 'weibo', path: '/weibo', name: '微博', en: 'WEIBO', role: 'ACG事业部 · 商业运营', period: '2025.07 — 至今',
    summary: '以游戏电竞商业为核心。电竞业务侧负责 KPL、PEL、IVL 等赛事招商，推动 2025 KPL 年度总决赛非标收入同比增长 55%、前置售卖率超 60%；承接竞燃之夜等平台级活动商业化。2026 年起转入游戏 IP 商业化，覆盖二次元、FPS、MOBA 等品类，新游方向统筹《明日方舟：终末地》《王者荣耀世界》《王者万象棋》等重点项目，收入目标达成率超 120%；存量项目通过长线节点运营促进客户复投，鸣潮 8 个月连续投放 7 个节点、崩铁覆盖 5 个版更节点，王者五五开黑节、和平精英刺激之夜非标收入分别同比增长 40%、118%。',
    caseOrgs: ['微博'],
    blocks: [
      { name: '游戏IP商业化', desc: '对接厂商社区、市场等团队，围绕产品生命周期输出整合营销方案。新游侧统筹《明日方舟：终末地》《王者荣耀世界》《王者万象棋》等重点项目，推动收入目标达成率超 120%；老游侧推动鸣潮 8 个月连续投放 7 个节点、崩铁覆盖 5 个版更节点；在王者荣耀五五开黑节、和平精英刺激之夜等大节点推动定制 H5 互动产品及深度内容方案交付，分别实现非标收入 YoY +40%、+118%。' },
      { name: '赛事与红人商业化', desc: '负责 KPL、PEL、IVL 等赛事招商，结合赛事流量规律与用户圈层，设计「主赞+决赛高光+战队/选手助威」分层合作方案，打通线上全域流量与线下场馆权益，推动 2025 KPL 年度总决赛非标收入 YoY +55%、前置售卖率超 60%；依托星粉生态输出《电竞选手经纪手册》，搭建「赛事—选手—粉丝—品牌」商业化链路，实现 S/A 类项目通发率 100%。' },
      { name: '平台IP招商与内容营销', desc: '围绕微博竞燃之夜、微博次元大赏、CNY、暑期活动、ChinaJoy、WAW 漫展等平台级 IP，统筹线上热搜、超话、专题页、直播及线下展台、红毯、粉丝合拍区等互动场景，兼顾站内生态运营与品牌招商变现；累计推进 10+ 个 KA 及跨界合作项目，落地高通骁龙、天猫、iQOO 等案例，2026 ChinaJoy 招商目标达成率 133%。' },
      { name: 'AI产品创新与业务提效', desc: '基于公司内部 AI 工具搭建运营 Agent（Prompt 工程+MCP/Skill 编排），覆盖行业研究、方案生成、数据复盘等 4 个高频场景，流程交付效率提升 47%，成果向 VP 汇报并获创新奖金；横向支持产品侧，拆解复用小红书互动小工具玩法，为崩铁 4.2/4.4/4.7 版更交付定制 H5 及内容方案 3 个。' },
    ],
  },
  {
    key: 'bytedance', path: '/bytedance', name: '字节跳动', en: 'BYTEDANCE', role: '品牌中心 · 招商资源运营', period: '2024.08 — 2025.05',
    summary: '先后负责互动产品招商与文娱 IP 商业化。互动产品方向服务 70+ 品牌、交付 40+ 项目并全部按时交付，招商收入季度环比增长 40%；文娱方向整合抖音主端资源，孵化《欢迎来到我的人生》《了不起的皮肤科医生》等垂类 IP，推动「美好星影 100+」双驱动升级，游戏侧「抖音文娱超玩计划」打通文娱+游戏+搜索三大运营资源，并联合孵化「抖音×金鸡×戛纳」与 2025 抖音电影奇遇夜等 S 级项目，端上资源非标收入同比增长 20%。',
    caseOrgs: ['字节跳动'],
    blocks: [
      { name: '互动产品招商', period: '2024.08 — 2024.12', desc: '负责挑战赛、AIGC 贴纸、众测任务、小飞盒等互动营销产品招商，覆盖大众/本地/生态/懂车帝 4 大业务及影视娱乐、美妆数码、食饮日化、汽车等行业，服务 70+ 品牌，商机落袋率 67%，招商收入季度环比 +40%；执行 40+ 互动 IP 项目，协同媒介、产运团队 100% 按时交付，T+3 输出结案报告，沉淀亿级流量案例。' },
      { name: '影视综文娱IP', period: '2024.12 — 2025.05', desc: '面向品牌客户（MP）与内容方（CP）双客群，围绕综艺/剧集/电影/纪录片/短剧/动漫等 IP，搭建「文娱推广+宣发豁免+品牌二传+星影冲榜+短剧 IP 衍生」五位一体方案，推动「美好星影」IP 升级为「内容+产品」双驱动；月均触达品牌客户 90+，端上资源变现非标收入同比 +20%，商机月落地率、转化率分别提升 30%、10%。孵化《欢迎来到我的人生》（抖音首档母婴纪实微综）、《了不起的皮肤科医生》等垂类 IP，联合孵化「抖音×金鸡×戛纳」招商与 2025 抖音电影奇遇夜等 S 级项目。' },
    ],
  },
  {
    key: 'internship', path: '/internships', name: '实习经历', en: 'INTERNSHIPS', role: '天猫健康 · 朗知传媒 · 博世中国', period: '2023.07 — 2024.07',
    summary: '从全域媒介策略到达人投放执行，再到企业视频内容，完成运营、商务、内容三线能力打底。',
    caseOrgs: ['天猫健康（实习）', '朗知传媒（实习）'],
    blocks: [
      { name: '天猫健康（阿里健康）· 媒介实习生', period: '2024.03 — 2024.07', desc: '商家精细化运营：精耕医疗器械、药品保健、成人计生品类，挖掘 30+ 品牌（三诺/鱼跃/Swisse 等）需求，参与《天猫脱毛仪人群白皮书》制作。全域流量运营：618 统筹 1.04 亿次曝光、联动 19 个大健康品牌，创新「DSP 开机+线下 3D 天幕+微博语义广告+知乎品效广告」媒介策略，落地杭州西湖裸眼 3D（单日曝光 1400 万）等项目。' },
      { name: '朗知传媒 · AE 实习生', period: '2023.12 — 2024.03', desc: '负责 smart 汽车小红书平台投放项目，参与 6 场跨城市 campaign 的达人投放执行与官方账号 @smart生活志 日常运营；联动 @梅尼耶 等 30+ 头部 KOL，搭建达人投放 SOP，规范从名单提报至效果复盘的全周期管理；月产 28 篇高质量笔记，活动 CPM 低至 19.3 元、曝光达成率 108%–131%。' },
      { name: '博世中国 · 视频拍摄剪辑实习生', period: '2023.07 — 2023.12', desc: '主导完成 80+ 支 2-5 分钟项目视频的拍摄与剪辑，熟练运用 PR/AU 工具；策划执行 7 大主题传播活动（含志愿日、家庭节等），制作 12 支覆盖员工关怀、重大接待、人物专访场景的企业文化视频，同步推进 10+ 篇 PR 稿。' },
    ],
  },
]

// Home uses five employers independently. Existing companies/routes above remain unchanged.
// Source: public/files/胡庆松-简历.pdf, pypdf extraction, pages 1–2.
// Excerpts below retain the original wording; PDF line breaks/spaces are normalized.
// Periods are resume employment periods unless the resume explicitly names a project year.
export const resumeSourceNotes = {
  weibo: { page: 1, excerpt: '2025.07-至今 微博-运营-ACG事业部-商业运营', detail: '历经电竞、游戏商业化业务，现以游戏商业化为核心，延伸覆盖动漫商业化。' },
  gameWork: { page: 1, excerpt: '全面负责二次元、FPS、MOBA等品类商业化，对接厂商社区、市场等团队，围绕产品生命周期输出整合营销方案。' },
  esportsWork: { page: 1, excerpt: '负责KPL、PEL、IVL等赛事招商，结合赛事流量规律与用户圈层，设计“主赞+决赛高光+战队/选手助威”分层合作方案，打通线上全域流量与线下场馆权益' },
  platformWork: { page: 1, excerpt: '围绕微博竞燃之夜、微博次元大赏、CNY、暑期活动、ChinaJoy、WAW漫展等平台级IP，统筹线上热搜、超话、专题页、直播及线下展台、红毯、粉丝合拍区等互动场景，兼顾站内生态运营与品牌招商变现' },
  healthCost: { page: 2, excerpt: '精准覆盖目标人群并压控成本。' },
  newGames: { page: 1, excerpt: '新游侧统筹《明日方舟：终末地》《王者荣耀世界》《王者万象棋》等重点项目，推动收入目标达成率超120%' },
  repeatGames: { page: 1, excerpt: '2026年推动鸣潮8个月连续投放7个节点，崩铁覆盖5个版更节点' },
  gameEvents: { page: 1, excerpt: '在王者荣耀五五开黑节、和平精英刺激之夜等大节点，推动定制H5互动产品及深度内容方案交付，分别实现非标收入YoY+40%、+118%。' },
  esports: { page: 1, excerpt: '推动2025KPL年度总决赛非标收入YoY+55%、前置售卖率超60%' },
  creators: { page: 1, excerpt: '依托星粉生态输出《电竞选手经纪手册》，搭建“赛事—选手—粉丝—品牌”商业化链路，实现S/A类项目通发率100%。' },
  platform: { page: 1, excerpt: '累计推进10+个KA及跨界合作项目，落地高通骁龙、天猫、iQOO等案例，2026ChinaJoy招商目标达成率133%' },
  bytedance: { page: 1, excerpt: '2024.08-2025.05 中国商业产品与技术-品牌中心-招商资源运营', detail: '先后负责互动产品招商、影视综宣发两段业务，沉淀平台级IP孵化、跨资源整合方法论。' },
  entertainment: { page: 1, excerpt: '联动运营/商业化/渠道三方协同，月均触达品牌客户90+，端上资源变现非标收入同比+20%，商机月落地率、转化率分别提升30%、10%。' },
  vertical: { page: 1, excerpt: '母婴侧孵化《欢迎来到我的人生》并售出抖音首档母婴纪实微综，美妆侧《了不起的皮肤科医生》吸引玉泽、珀莱雅等KA，方法论复用于《中国颜色2》', detail: '游戏侧打通抖音文娱+游戏+搜索资源推出"抖音超玩计划"，大事件侧联合孵化"抖音×金鸡×戛纳"招商、"2025抖音电影奇遇夜"（曝光100亿+）等S级项目' },
  entertainmentWork: { page: 1, excerpt: '面向品牌客户（MP）与内容方（CP）双客群，围绕综艺/剧集/电影/纪录片/短剧/动漫等IP，搭建"文娱推广+宣发豁免+品牌二传+星影冲榜+短剧IP衍生"五位一体方案，推动"美好星影"IP升级为"内容+产品"双驱动' },
  interactiveWork: { page: 2, excerpt: '负责挑战赛、AIGC贴纸、众测任务、小飞盒等互动营销产品招商，覆盖大众/本地/生态/懂车帝4大业务及影视娱乐、美妆数码、食饮日化、汽车等行业' },
  healthWork: { page: 2, excerpt: '拓宽小红书/微博/B站/OTA渠道，参与《天猫脱毛仪人群白皮书》制作' },
  roborockProject: { page: 1, excerpt: '挑战赛上线后用户参与度高，贴纸使用人数最高超5.8万', document: '石头科技×美好生活100+复盘.PDF' },
  interactive: { page: 2, excerpt: '服务70+品牌，商机落袋率67%，招商收入季度环比+40%；执行40+互动IP项目，协同媒介、产运团队100%按时交付，T+3输出结案报告' },
  ali: { page: 2, excerpt: '2024.03-2024.07 天猫健康-营销中心-媒介实习生', detail: '精耕医疗器械、药品保健、成人计生品类，挖掘30+品牌（三诺/鱼跃/Swisse等）需求' },
  health618: { page: 2, excerpt: '618统筹1.04亿次曝光，联动19个大健康品牌，创新“DSP开机+线下3D天幕+微博语义广告+知乎品效广告”媒介策略' },
  healthMedia: { page: 2, excerpt: '落地杭州西湖裸眼3D（单日曝光1400万）、知乎专题（1200万+曝光，CPC0.48元）、微博长尾（5600万+曝光）、DSP开机（10+APP，曝光达成129%）项目' },
  longwise: { page: 2, excerpt: '2023.12-2024.03 北京事业部-AE实习生', detail: '负责smart汽车小红书平台投放项目，参与6场跨城市campaign的达人投放执行与官方账号@smart生活志日常运营' },
  smartKol: { page: 2, excerpt: '联动@梅尼耶等30+头部KOL精准触达目标人群，搭建达人投放SOP，规范从名单提报至效果复盘的全周期管理。' },
  smartContent: { page: 2, excerpt: '月产28篇高质量笔记，同时协助制定官号季度传播规划，建立舆情监测及用户运营机制' },
  smartResults: { page: 2, excerpt: '实现活动CPM低至19.3元，曝光达成率108%-131%，重庆活动总曝光量达779万' },
  bosch: { page: 2, excerpt: '博世中国 2023.07-2023.12 电动工具事业部-视频拍摄剪辑实习生' },
  boschVideo: { page: 2, excerpt: '主导完成80+支2-5分钟项目视频的拍摄与剪辑，熟练运用PR/AU工具，策划执行7大主题传播活动（含志愿日、家庭节等），制作12支覆盖员工关怀、重大接待、人物专访场景的企业文化视频，同步推进10+篇PR稿。' },
} as const

type ResumeSourceKey = keyof typeof resumeSourceNotes
export type HomeExperience = {
  key: string; name: string; en: string; role: string; period: string
  summary: string; sources: ResumeSourceKey[]; primary?: boolean; path?: string
}
export const homeExperience: HomeExperience[] = [
  {
    key: 'weibo', name: '微博', en: 'WEIBO', role: 'ACG事业部 · 商业运营', period: '2025.07 — 至今', primary: true, path: '/weibo',
    summary: '以游戏电竞商业为核心。电竞业务侧负责 KPL、PEL、IVL 等赛事招商，推动 2025 KPL 年度总决赛非标收入同比增长 55%、前置售卖率超 60%；承接竞燃之夜等平台级活动商业化。2026 年起转入游戏 IP 商业化，覆盖二次元、FPS、MOBA 等品类，新游方向统筹《明日方舟：终末地》《王者荣耀世界》《王者万象棋》等重点项目，收入目标达成率超 120%；存量项目通过长线节点运营促进客户复投，鸣潮 8 个月连续投放 7 个节点、崩铁覆盖 5 个版更节点，王者五五开黑节、和平精英刺激之夜非标收入分别同比增长 40%、118%。',
    sources: ['weibo', 'gameWork', 'esportsWork', 'platformWork', 'newGames', 'repeatGames', 'gameEvents', 'esports', 'creators', 'platform'],
  },
  {
    key: 'bytedance', name: '字节跳动', en: 'BYTEDANCE', role: '中国商业产品与技术 · 品牌中心 · 招商资源运营', period: '2024.08 — 2025.05', primary: true, path: '/bytedance',
    summary: '先后负责互动产品招商与文娱 IP 商业化。互动产品方向服务 70 余家品牌、交付 40 余个项目，全部按时交付，招商收入季度环比增长 40%；文娱方向整合抖音主端资源，母婴侧孵化《欢迎来到我的人生》，美妆侧《了不起的皮肤科医生》吸引玉泽、珀莱雅等 KA，推动「美好星影 100+」升级为「内容+产品」双驱动，游戏侧「抖音文娱超玩计划」首次打通文娱+游戏+搜索三大运营资源，并联合孵化「抖音×金鸡×戛纳」与 2025 抖音电影奇遇夜等 S 级项目，端上资源非标收入同比增长 20%。',
    sources: ['bytedance', 'interactiveWork', 'interactive', 'entertainmentWork', 'entertainment', 'vertical'],
  },
  {
    key: 'alihealth', name: '阿里健康', en: 'ALIHEALTH', role: '天猫健康 · 营销中心 · 媒介实习生', period: '2024.03 — 2024.07',
    summary: '深耕医疗器械、药品保健与成人计生品类的商家需求，参与《天猫脱毛仪人群白皮书》；围绕 618 整合 DSP、线下 3D 天幕、微博与知乎媒介资源，推进全域投放与成本优化。',
    sources: ['ali', 'healthWork', 'health618', 'healthMedia', 'healthCost'],
  },
  {
    key: 'longwise', name: '朗知传媒', en: 'LONGWISE', role: '北京事业部 · AE 实习生', period: '2023.12 — 2024.03',
    summary: '负责 smart 汽车小红书投放与 @smart生活志 日常运营，执行跨城市 Campaign 与头部达人合作；搭建从名单提报到效果复盘的投放 SOP，参与内容制作、季度传播规划与用户运营。',
    sources: ['longwise', 'smartKol', 'smartContent'],
  },
  {
    key: 'bosch', name: '博世', en: 'BOSCH', role: '博世中国 · 电动工具事业部 · 视频拍摄剪辑实习生', period: '2023.07 — 2023.12',
    summary: '主导项目视频拍摄与剪辑，策划志愿日、家庭节等主题传播活动，制作员工关怀、重大接待与人物专访视频，同步推进企业 PR 内容。',
    sources: ['bosch', 'boschVideo'],
  },
]

// Ordinary definition-list content, not cross-company comparable KPIs.
// Each row maps to a named resume excerpt; no portfolio case metrics are imported.
export type ResumeDataRow = { scope: string; period: string; result: string; sources: ResumeSourceKey[]; emphasis: string[] }
export const resumeCoreData: { company: string; en: string; period: string; rows: ResumeDataRow[]; projects: ResumeDataRow[] }[] = [
  { company: '微博', en: 'WEIBO · ACG', period: '2025.07 — 至今', rows: [
    { scope: '新游商业化', period: '《明日方舟：终末地》《王者荣耀世界》《王者万象棋》', result: '重点项目非标收入达成率超 120%', sources: ['newGames'], emphasis: ['超 120%'] },
    { scope: '存量项目长线运营', period: '鸣潮 · 崩铁 · 王者荣耀 · 和平精英', result: '长线节点运营促进客户复投：鸣潮 8 个月投放 7 个节点、崩铁覆盖 5 个版更；五五开黑节 +40%、刺激之夜 +118%', sources: ['repeatGames', 'gameEvents'], emphasis: ['7 个节点', '5 个版更', '+40%', '+118%'] },
    { scope: '电竞业务与平台 IP 招商', period: 'KPL · 竞燃之夜 · ChinaJoy', result: 'KPL 年总非标收入 YoY +55%、前置售卖率超 60%；ChinaJoy 招商达成率 133%；S/A 项目通发率 100%', sources: ['esports', 'platform', 'creators'], emphasis: ['+55%', '超 60%', '133%', '100%'] },
  ], projects: [
    { scope: '和平精英 · 刺激之夜', period: '定制 H5 与深度内容交付', result: '非标收入同比 +118%', sources: ['gameEvents'], emphasis: ['+118%'] },
    { scope: '王者荣耀 · 五五开黑节', period: '定制 H5 与深度内容交付', result: '非标收入同比 +40%', sources: ['gameEvents'], emphasis: ['+40%'] },
    { scope: '2025 KPL 年度总决赛', period: '赛事招商', result: '非标收入 YoY +55%，前置售卖率超 60%', sources: ['esports'], emphasis: ['+55%', '超 60%'] },
    { scope: '2026 ChinaJoy · 平台 IP', period: '招商', result: '招商目标达成率 133%', sources: ['platform'], emphasis: ['133%'] },
    { scope: '《崩坏：星穹铁道》版更', period: '4.2 / 4.4 / 4.7 等多个版更', result: '覆盖 5 个版更节点，定制 H5 与内容方案交付', sources: ['repeatGames'], emphasis: ['5 个版更节点'] },
    { scope: '《鸣潮》长线投放', period: '8 个月连续节点', result: '连续投放 7 个节点，围绕版本与大促承接', sources: ['repeatGames'], emphasis: ['7 个节点'] },
  ] },
  { company: '字节跳动', en: 'BYTEDANCE', period: '2024.08 — 2025.05', rows: [
    { scope: '互动 IP 商业化', period: '2024.08 — 2024.12', result: '服务 70+ 品牌、执行 40+ 项目 100% 按时交付；招商收入季度环比 +40%', sources: ['interactive'], emphasis: ['70+ 品牌', '40+ 项目', '100%', '+40%'] },
    { scope: '文娱 IP 商业化', period: '2024.12 — 2025.05', result: '25Q1 协助完成 98 单、实收 9875.25 万（完成率 98.75%）；对接商机 201 个、落袋率 48.75%；端上非标收入 YoY +20%', sources: ['entertainment', 'vertical'], emphasis: ['98 单', '9875.25 万', '98.75%', '201 个', '48.75%', '+20%'] },
  ], projects: [
    { scope: '孵化 IP · 欢迎来到我的人生', period: '垂类 IP 孵化', result: '售出抖音首档母婴纪实微综', sources: ['vertical'], emphasis: ['首档'] },
    { scope: '孵化 IP · 了不起的皮肤科医生', period: '美妆垂类纪录片', result: '吸引玉泽、珀莱雅等 KA 合作', sources: ['vertical'], emphasis: [] },
    { scope: '孵化 IP · 美好星影100+', period: '文娱 IP 升级', result: '推动「内容+产品」双驱动升级', sources: ['entertainmentWork'], emphasis: [] },
    { scope: '孵化 IP · 抖音文娱超玩计划', period: '游戏侧资源整合', result: '首次打通抖音文娱+游戏+搜索三大运营资源', sources: ['vertical'], emphasis: [] },
    { scope: '孵化 IP · 第 78 届戛纳国际电影节 × 抖音', period: '官方短视频独家合作平台招商', result: '联合孵化「抖音×金鸡×戛纳」招商与品牌露出', sources: ['vertical'], emphasis: [] },
    { scope: '孵化 IP · 2025 抖音电影奇遇夜', period: 'S 级项目联合孵化', result: '项目总曝光 100 亿+', sources: ['vertical'], emphasis: ['100 亿+'] },
  ] },
]

export const education = {
  name: '教育背景', en: 'EDUCATION', role: '武汉学院 · 艺术与传媒学院 · 网络与新媒体（隶属新闻传播学）· 文学学士', period: '2020.09 — 2024.06',
  desc: 'GPA 3.8 · 专业前 10% · 校级奖学金 ×3（二等 ×2、三等 ×1）。核心课程：品牌营销策划、广告文案策划、新媒体创意与策划、新闻采写、视听语言研究、出镜记者与现场报道；技术实践：SPSS、PS、AE、PR、AU、摄影基础、影视摄影技术。',
}
