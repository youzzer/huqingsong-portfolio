// 案例数据：标题、描述、指标、链接均摘自《胡庆松-作品集_终极版》与《简历_终极版》原文，未作改写。
// long=true 表示竖版长图：卡片只做头图节选，详情内完整滚动阅读。

export type Material = { tab: string; images: string[] }
export type CaseLink = { name: string; url: string }
export type CaseItem = {
  id: string
  title: string
  org: '微博' | '字节跳动' | '天猫健康（实习）' | '朗知传媒（实习）'
  line: '游戏项目' | '电竞赛事' | '平台IP' | 'AI提效' | '文娱IP' | '互动IP' | '媒介商业化' | '达人执行' | '内容运营'
  industry: string
  status: string
  deliverables: string[]
  description: string
  metrics: [string, string][]
  cover: string
  long: boolean
  materials: Material[]
  links: CaseLink[]
  featured?: boolean
  pending?: boolean
}

const B = import.meta.env.BASE_URL
const f = (p: string) => `${B}img/f-${p}.webp`
const c = (p: string) => `${B}img/c-${p}.webp`

import { normalizeProjects } from './siteProjects'

export const legacyCases: CaseItem[] = [
  // ————— 微博 · 平台IP —————
  {
    id: 'chinajoy-2026', title: '2026 ChinaJoy × 高通骁龙 · 招商方案与专题页全案落地', org: '微博', line: '平台IP', industry: '游戏', status: '已结案',
    deliverables: ['招商方案', '活动专题页', '集卡专题页', '结案PR长图'],
    description: '搭建活动专题页与骁龙专属集卡专题页，以云逛展动线地图串联参展游戏 IP，配套做任务集卡抽奖；线下落地 E4 馆展台，联动厂商与红人四日站台。',
    metrics: [['12.2 亿+', '双IP话题新增阅读量'], ['40 个', '主榜及ACG榜在榜热搜'], ['133%', '项目招商非标收入完成率'], ['6679 万', '视频播放量'], ['上万人次', '展台四日打卡']],
    cover: c('p10'), long: false, featured: true,
    materials: [{ tab: '招商方案', images: [f('p10')] }, { tab: '专题页与结案', images: [f('p11')] }],
    links: [{ name: '2026ChinaJoy 招商方案（飞书）', url: 'https://my.feishu.cn/file/KLHyb5PiPos2YFxkcdrcbumKnFd' }, { name: '搭建&玩法&结案长图（飞书）', url: 'https://my.feishu.cn/drive/folder/PqYtfhP9DlDJQHdppKycyJnynie?from=from_copylink' }],
  },
  {
    id: 'cny-2026', title: '2026 CNY「马上游福」互动集卡 × 战报PR', org: '微博', line: '平台IP', industry: '游戏', status: '已结案',
    deliverables: ['互动集卡玩法', '新春共创集卡玩法PR', '结案PR'],
    description: '联动 40+ 游戏 IP，配套超话许愿池红包雨、游戏红人送福官与厂商拜年团，并与苹果 App Store 联合总冠名做全链路曝光。',
    metrics: [['10 亿+', '#马上游福# 话题阅读'], ['133 个', '主榜热搜'], ['334.5 万', '人次参与集卡'], ['40+', '联动游戏IP'], ['685 万', '新春礼包总价值']],
    cover: c('p06'), long: true, featured: true,
    materials: [{ tab: '战报与PR', images: [f('p06')] }],
    links: [{ name: '马上游福 PR 与结案材料（飞书）', url: 'https://my.feishu.cn/drive/folder/En8ef3VnNlj7DXd5a0CcowrGn9c?from=from_copylink' }],
  },
  {
    id: 'summer-plan-2026', title: '2026 暑期「夏日游趣狂欢季」招商方案', org: '微博', line: '平台IP', industry: '游戏', status: '招商方案',
    deliverables: ['招商方案', '活动启宣PR'],
    description: '以「游趣地图」串联各厂商主题游乐园，搭建暑期游乐场主会场与分会场，规划同人绘画/同人文/游戏专题/AI创作四赛道内容征集，配套超话焕新大赛。',
    metrics: [['70%+', '预估游戏大盘DAU增幅（方案预估）'], ['1000 万+', '预估视频有效播放量（方案预估）'], ['100+', '预估游戏领域视频创作者（方案预估）']],
    cover: c('p07'), long: false,
    materials: [{ tab: '招商方案', images: [f('p07')] }],
    links: [{ name: '夏日游趣狂欢季招商方案（飞书）', url: 'https://my.feishu.cn/file/LOwlba2Bco6m5Jxx75QciqcCnRb?from=from_copylink' }],
  },
  {
    id: 'summer-2026', title: '2026 暑期「夏日游趣狂欢季」游乐场玩法 × 战报PR', org: '微博', line: '平台IP', industry: '游戏', status: '已结案',
    deliverables: ['暑期游乐场主会场玩法PR', '结案PR'],
    description: '联动 46+ 厂商、百万级现金与礼包奖励，以「游趣地图」串联各厂商主题游乐园，运营四赛道内容征集，配套超话焕新大赛。',
    metrics: [['7.3 亿+', '累计阅读'], ['524 万', '活动有效参与人次'], ['639.4 万+', '有效互动'], ['+20%', '项目非标收入 YoY']],
    cover: c('p08'), long: true,
    materials: [{ tab: '战报与PR', images: [f('p08')] }],
    links: [{ name: '暑期活动 PR 与结案材料（飞书）', url: 'https://my.feishu.cn/drive/folder/Z3aRf0N6vlAvDfdTbKqcoaJvnSh?from=from_copylink' }],
  },
  {
    id: 'acg-annual-2026', title: '2026 微博 ACG 年度招商通案 & S级综合项目 WAW', org: '微博', line: '平台IP', industry: '游戏 / 动漫', status: '招商通案',
    deliverables: ['动漫年度招商通案', '游戏电竞年度招商通案', 'WAW 漫展项目方案'],
    description: '动漫侧：6500 万动漫强兴趣用户、200+ 版权池、2 万+ 动漫大V；游戏电竞侧：依托 3 亿+ 二次元兴趣用户、666 个游戏 IP 与 1.33 亿电竞人群。WAW 定位北方规模最大标杆漫展，设四大主题馆，联动 150+ 参展 IP、100+ 次元嘉宾、700+ coser。',
    metrics: [['6.8 万人次', '首届 WAW 3 天入场'], ['24.5 亿', 'WAW 话题阅读'], ['87 个', 'WAW 主榜热搜'], ['2.9 亿', 'WAW 视频播放']],
    cover: c('p09'), long: false,
    materials: [{ tab: '通案与方案', images: [f('p09')] }],
    links: [{ name: '2026 微博动漫年度招商通案（飞书）', url: 'https://my.feishu.cn/file/GCSnbhzlYo25N4x0mFpcfmHXnie' }, { name: '2026 微博游戏电竞年度招商通案（飞书）', url: 'https://my.feishu.cn/file/FZrGb6maaoNzOlxqEwTcjHCvn9g?from=from_copylink' }, { name: '2026 微博游戏动漫展 WAW（飞书）', url: 'https://my.feishu.cn/file/HDHybUHOYowbEZxtiTMclda5nXc?from=from_copylink' }],
  },
  // ————— 微博 · 游戏项目 —————
  {
    id: 'hsr-42', title: '《崩坏：星穹铁道》4.2 版更 · H5 demo 设计与上线搭建执行', org: '微博', line: '游戏项目', industry: '游戏', status: '已上线',
    deliverables: ['H5 原型 DEMO', '活动专题页', '内容征集专题页', '集卡专题页'],
    description: '4.2 版更暨三周年，应客户主诉强化超话核心用户阵地；将「三周年庆生」的传播诉求转化为多 icon 模块化专题页需求，产出 H5 原型，跟进搭建上线。',
    metrics: [],
    cover: c('p12'), long: false,
    materials: [{ tab: '原型与页面', images: [f('p12')] }],
    links: [{ name: '4.2 版更 H5 材料（飞书）', url: 'https://my.feishu.cn/drive/folder/HdXJfPBEilMshKdIRLRcv333nAb?from=from_copylink' }],
  },
  {
    id: 'hsr-44', title: '《崩坏：星穹铁道》4.4 版更 · H5 原型与最终上线样式', org: '微博', line: '游戏项目', industry: '游戏', status: '已上线',
    deliverables: ['H5 原型 DEMO', '活动专题页', '内容征集专题页'],
    description: '4.4 版更以玩家共创玩法为主，承接玩法拆解与原型设计，对接端上产品推进搭建与上线验收。',
    metrics: [],
    cover: c('p13'), long: false,
    materials: [{ tab: '原型与上线样式', images: [f('p13')] }],
    links: [{ name: '4.4 版更 H5 材料（飞书）', url: 'https://my.feishu.cn/drive/folder/Qit8f4q58lZ9zmdXSsUcvKPynzg?from=from_copylink' }],
  },
  {
    id: 'hsr-47', title: '《崩坏：星穹铁道》4.7 版更 · H5 原型与产品需求文档', org: '微博', line: '游戏项目', industry: '游戏', status: '原型与需求阶段',
    deliverables: ['活动 H5 DEMO 示意', '产品需求文档（PRD）'],
    description: '根据客户 4.7 版本「游玩欢愉酒馆」需求，将活动拆为 1 个主会场专题页 + 8 个角色二级专题页 + 4 个三级模块；各模块相互联结、统一校验，三级模块完成后经专属话题词判定，回主会场点亮对应角色 icon，串成一条酒馆动线，与产品侧对齐点亮校验、彩蛋展现等并推进排期。',
    metrics: [],
    cover: c('p14'), long: false,
    materials: [{ tab: '原型与PRD', images: [f('p14')] }],
    links: [{ name: '4.7 版更原型与需求文档（飞书）', url: 'https://my.feishu.cn/file/ANr0bjhCooDER5xRnAacPdncnId?from=from_copylink' }],
  },
  {
    id: 'wangzhe-wxq', title: '《王者万象棋》公测 · 玩法PR + 活动专题页搭建', org: '微博', line: '游戏项目', industry: '游戏', status: '已上线',
    deliverables: ['活动玩法PR', '活动专题页'],
    description: '《王者万象棋》公测节点，产出上线 PR 并搭建活动专题页，聚合优质内容；设置视频、内容排行榜与创作者激励配套做任务抽奖，扩大首发声量。',
    metrics: [],
    cover: c('p15'), long: true,
    materials: [{ tab: 'PR与专题页', images: [f('p15')] }],
    links: [{ name: '王者万象棋公测材料（飞书）', url: 'https://my.feishu.cn/drive/folder/UqSHfS1WelBjRddx0qtctn1fnBg?from=from_copylink' }],
  },
  {
    id: 'ciji-night', title: '《和平精英》刺激之夜 · 皮肤返场大秀专题', org: '微博', line: '游戏项目', industry: '游戏', status: '已上线',
    deliverables: ['皮肤返场大秀活动专题页'],
    description: '以门票抽奖、内容征集、投票互动与结果公示串起整场返场秀，配套瓜分激励、榜单激励、AI 创作激励与微博地铁宝库券等多档玩法，叠加任务、空投补给站持续拉动参与。',
    metrics: [['+118%', '刺激之夜非标收入 YoY']],
    cover: c('p16'), long: true,
    materials: [{ tab: '专题页', images: [f('p16')] }],
    links: [{ name: '刺激之夜专题页材料（飞书）', url: 'https://my.feishu.cn/drive/folder/DmphfM4uSldboIdKjPrcch7Cnld?from=from_copylink' }],
  },
  {
    id: 'wzry-55', title: '《王者荣耀》五五开黑节 ·「魔丸灵珠测试」玩法PR + 活动专题页', org: '微博', line: '游戏项目', industry: '游戏', status: '已上线',
    deliverables: ['魔丸灵珠玩法PR', '互动专题页'],
    description: '以「你是峡谷魔丸还是灵珠？」测试选题驱动玩家答题、生成阵营海报与称号，并串联点亮开黑地图、大V空降、超话签到、纪念卡册等玩法，以开黑基金/皮肤奖励与抽奖拉新促活。',
    metrics: [['+40%', '五五开黑节非标收入 YoY']],
    cover: c('p17'), long: true,
    materials: [{ tab: 'PR与专题页', images: [f('p17')] }],
    links: [{ name: '五五开黑节材料（飞书）', url: 'https://my.feishu.cn/drive/folder/BB4RfmdtYlBvNldk9fTcLGmunuh?from=from_copylink' }],
  },
  {
    id: 'wz-world', title: '《王者荣耀世界》公测 · 玩法PR + 活动专题页 + 内容征集页', org: '微博', line: '游戏项目', industry: '游戏', status: '已上线',
    deliverables: ['公测玩法PR', '活动专题页', '「世界大赏」内容征集页'],
    description: '公测节点主导专题页搭建与微博玩法PR宣推；活动专题页含超话签到、做任务、抽奖、内容排行榜，「世界大赏」内容征集页分档创作激励，引导玩家带话题发博、投稿二创，沉淀公测 UGC。',
    metrics: [],
    cover: c('p18'), long: true,
    materials: [{ tab: 'PR与专题页', images: [f('p18')] }],
    links: [{ name: '王者荣耀世界公测材料（飞书）', url: 'https://my.feishu.cn/drive/folder/TC4YfgcRwlqVpbdqKcNcQzBrndP?from=from_copylink' }],
  },
  {
    id: 'delta-force', title: '《三角洲行动》四大节点活动专题页', org: '微博', line: '游戏项目', industry: '游戏', status: '已上线',
    deliverables: ['春节专题页', '猛攻节专题页', '暑期专题页', '二周年专题页'],
    description: '春节「新春接着红」以新春红榜、内容榜与集卡抽奖承接红人内容；猛攻节以话题共创、星球答题、干员角色测试做玩家共创；暑期以内容专栏、同人征集与热点直击承接版本热度；二周年以新友攻略、精选时刻征集、话题互动与每日任务抽奖延续周年声量。',
    metrics: [],
    cover: c('p19'), long: true,
    materials: [{ tab: '四节点专题页', images: [f('p19')] }],
    links: [{ name: '三角洲行动专题页材料（飞书）', url: 'https://my.feishu.cn/drive/folder/OfsJf1nmUl524Ddy75Hc0QqTnJg?from=from_copylink' }],
  },
  // ————— 微博 · 电竞赛事 —————
  {
    id: 'kpl-2025', title: '2025 KPL 年度总决赛 · 四品牌合作案例PR', org: '微博', line: '电竞赛事', industry: '电竞', status: '已结案',
    deliverables: ['品牌战报PR（iQOO / 华莱士 / 深蓝汽车 / 九号电动）', 'KPL 年总战报'],
    description: 'iQOO 决赛热点全程伴随+发现页频道定制；华莱士绑定 S 级主话题+惊喜盲盒承接观赛；深蓝汽车定制助威话题+双战队应援；九号电动签约 AG & 狼队做「九号德比」冠军见证官。',
    metrics: [['80 个', '8h 主榜热搜（上榜数）'], ['123 h', '主榜累计在榜时长'], ['+55%', '2025 KPL 年总非标收入 YoY'], ['3.55 亿', 'iQOO 热点伴随总曝光量']],
    cover: c('p23'), long: true,
    materials: [{ tab: '结案与战报', images: [f('p23')] }],
    links: [{ name: 'KPL 年总品牌结案材料（飞书）', url: 'https://my.feishu.cn/drive/folder/GqACftFxSlfZ8GdmQnDcF3vGnvh?from=from_copylink' }],
  },
  {
    id: 'jrnight-2025', title: '2025 微博竞燃之夜 · 三品牌合作案例', org: '微博', line: '电竞赛事', industry: '电竞', status: '已结案',
    deliverables: ['品牌合作PR（iQOO 总冠名 / 天猫双11 / 小鹏汽车）'],
    description: 'iQOO 总冠名全周期绑定红毯/直播/话题；天猫双11 沿引流期—引爆期—收割期节奏卡点，红包互动登榜；小鹏 X9 出任红毯指定接驳车、P7 现场同框。',
    metrics: [['42.9 亿', '话题累计阅读'], ['40 h+', '主榜热搜在榜时长'], ['第 2 位', '上榜最高位次'], ['30 个', 'iQOO 主榜热搜']],
    cover: c('p24'), long: true,
    materials: [{ tab: '结案材料', images: [f('p24')] }],
    links: [{ name: '竞燃之夜品牌合作材料（飞书）', url: 'https://my.feishu.cn/drive/folder/Wg4DfgTmvlVaOOdgxwDcu8r4n9c?from=from_copylink' }],
  },
  {
    id: 'esports-h2', title: '2025 微博电竞 H2 招商通案', org: '微博', line: '电竞赛事', industry: '电竞', status: '招商通案',
    deliverables: ['电竞 H2 招商通案'],
    description: '聚焦赛事 IP & 红人商业化、平台级 IP 商业化，拆解 KPL、PEL、IVL 等赛事流量规律与受众差异，设计「赛事主赞+决赛高光+战队/选手助威」分层招商包，覆盖全域流量入口与线下权益。',
    metrics: [['1.33 亿', '微博电竞年轻用户']],
    cover: c('p20'), long: false,
    materials: [{ tab: '招商通案', images: [f('p20')] }],
    links: [{ name: '2025 微博电竞 H2 招商通案（飞书）', url: 'https://my.feishu.cn/file/AJZ4bMkLmoyZ7axZMZZcXAiAnJX?from=from_copylink' }],
  },
  {
    id: 'esports-s', title: '电竞 S 级赛事招商方案 · KPL 年总 & 英雄联盟 S15', org: '微博', line: '电竞赛事', industry: '电竞', status: '招商方案',
    deliverables: ['KPL 年总微博招商通案', '英雄联盟 S15 微博招商方案'],
    description: 'KPL 年总：以主话题长线运营、战队/选手加油榜等互动产品搭建赛期社交主场，设计「赛事主赞/决赛各1席+战队/选手助威N席」分层招商包，覆盖鸟巢线下权益。S15：以「1+N」热点伴随+多元话题锁定全程赛事流量，设计六类资源包。',
    metrics: [['15 亿', 'KPL 年总主话题预估阅读（方案预估）'], ['700+', 'S15 预计热搜（方案预估）'], ['900 亿+', 'S15 预计话题阅读（方案预估）']],
    cover: c('p21'), long: false,
    materials: [{ tab: '招商方案', images: [f('p21')] }],
    links: [{ name: 'KPL 年总招商通案（飞书）', url: 'https://my.feishu.cn/file/F3fdbI4oUokwwjxlCz9cD3uFnEg?from=from_copylink' }, { name: '英雄联盟 S15 招商方案（飞书）', url: 'https://my.feishu.cn/file/Jpt1bIqpfo19rZxgYZ4ckROInif?from=from_copylink' }],
  },
  {
    id: 'jrnight-plan', title: '2025 竞燃之夜盛典招商方案 & 微博电竞营销案例集', org: '微博', line: '电竞赛事', industry: '电竞', status: '招商方案',
    deliverables: ['竞燃之夜招商方案', '2025 微博电竞营销案例集'],
    description: '竞燃之夜为国内首个「体育+电竞」跨界盛典，已延续 3 届、话题阅读超 100 亿，聚体育冠军、电竞选手与文娱艺人 200+ 同台。案例集依托「热搜+超话+赛事互动」闭环沉淀营销方法论。',
    metrics: [['100 亿+', '竞燃之夜历届话题阅读'], ['120+', '本届目标热搜（方案目标）'], ['18 亿+', '本届目标新增话题阅读（方案目标）']],
    cover: c('p22'), long: false,
    materials: [{ tab: '方案与案例集', images: [f('p22')] }],
    links: [{ name: '2025 竞燃之夜招商方案（飞书）', url: 'https://my.feishu.cn/file/D29LbrpnMoqQwKxgtJdcjGNInse?from=from_copylink' }, { name: '2025 微博电竞营销案例集（飞书）', url: 'https://my.feishu.cn/file/CdcZbAHS1odCSExJ61hcuu9KnQe?from=from_copylink' }],
  },
  {
    id: 'acg-influencer', title: '达人营销 ·《电竞选手经纪手册》&《微博达人营销新解 · ACG 篇》', org: '微博', line: '电竞赛事', industry: '电竞 / 动漫', status: '营销工具书',
    deliverables: ['电竞选手经纪手册', 'ACG 达人营销新解'],
    description: '手册覆盖 5 大赛事 33 名选手（S 级 16 人、A 级 17 人），标准化选手站内生态与人群画像，供品牌按预算和行业直接选人。ACG 篇按 3 个生态板块、13 个垂直细分类型梳理达人矩阵，跑通四级合作模式，已服务 7 大行业。',
    metrics: [['33 名', '手册覆盖电竞选手'], ['100%', 'S/A 类项目通发率'], ['7 大', '已服务行业']],
    cover: c('p25'), long: false,
    materials: [{ tab: '手册与新解', images: [f('p25')] }],
    links: [{ name: '电竞选手经纪手册（飞书）', url: 'https://my.feishu.cn/file/O3kybagmJoMIJCxgTrKc9m7InzY?from=from_copylink' }, { name: '微博达人营销新解 · ACG 篇（飞书）', url: 'https://my.feishu.cn/file/FZfXbH5ZWo736nx4kB7cvWnrnEg?from=from_copylink' }],
  },
  // ————— 微博 · AI提效 —————
  {
    id: 'ai-agent', title: '运营 AI Agent 搭建 · Prompt 工程 + MCP/Skill 编排', org: '微博', line: 'AI提效', industry: '内部工具', status: '内部应用',
    deliverables: ['运营 Agent（行业研究 / 方案生成 / 数据复盘等 4 个高频场景）'],
    description: '基于公司内部 AI 工具搭建运营 Agent（Prompt 工程 + MCP/Skill 编排），覆盖行业研究、方案生成、数据复盘等 4 个高频场景，成果向 VP 汇报并获创新奖金。',
    metrics: [['+47%', '流程交付效率提升'], ['4 个', '覆盖高频场景']],
    cover: '', long: false, pending: true,
    materials: [],
    links: [],
  },
  // ————— 字节跳动 · 文娱IP —————
  {
    id: 'bd-ip-poc', title: '文娱 IP 招商运营 · 2025 Q1 POC', org: '字节跳动', line: '文娱IP', industry: '影视综', status: '已结案',
    deliverables: ['招商 IP 运营', '经营分析与方法论沉淀'],
    description: '2025 年 Q1 任文娱 IP POC，构建文娱需求图谱并精准匹配抖音商业化资源；统筹 7 个招商 IP 运营，针对母婴、美妆、游戏行业及抖音平台活动策划 5 个新招商 IP。',
    metrics: [['98 单', 'Q1 协助业务上游完成项目'], ['9875.25 万', 'Q1 实收（目标 1 亿，完成率 98.75%）'], ['48.75%', 'Q1 商机落袋率（对接&触达商机 201 个）'], ['34 个', '资源包项目交付，无客诉']],
    cover: c('p26'), long: false,
    materials: [{ tab: 'Q1 复盘', images: [f('p26')] }],
    links: [],
  },
  {
    id: 'bd-vertical-ip', title: '垂类 IP 孵化招商手册 · 母婴 / 美妆 / 游戏', org: '字节跳动', line: '文娱IP', industry: '影视综', status: '招商手册',
    deliverables: ['《欢迎来到我的人生》招商手册', '《了不起的皮肤科医生》招商手册', '「抖音文娱超玩计划」招商手册'],
    description: '母婴侧孵化抖音首档新手妈妈观察纪实微综《欢迎来到我的人生》；美妆侧《了不起的皮肤科医生》吸引玉泽、珀莱雅等 KA；游戏侧「抖音超玩计划」首次打通抖音文娱+游戏+搜索三大运营资源。',
    metrics: [],
    cover: c('p27'), long: false,
    materials: [{ tab: '招商手册', images: [f('p27')] }],
    links: [{ name: '《欢迎来到我的人生》招商手册（飞书）', url: 'https://bytedance.larkoffice.com/docx/K27WdgZiHoaP12xd5PkcI2ZrnSb' }, { name: '《了不起的皮肤科医生》招商手册（飞书）', url: 'https://bytedance.larkoffice.com/docx/ApuedWGlqovxphxH77gc0TZynmh' }, { name: '「抖音文娱超玩计划」招商手册（飞书）', url: 'https://my.feishu.cn/docx/QgbddI82Ko7HaGx3r2McgHlBnCl' }],
  },
  {
    id: 'bd-cannes', title: '第 78 届戛纳国际电影节 × 抖音 &「赴山海」专项招商', org: '字节跳动', line: '文娱IP', industry: '影视综', status: '招商手册',
    deliverables: ['戛纳 × 抖音招商手册', '「赴山海」剧集衍生歌会招商手册'],
    description: '戛纳专项：抖音作为官方短视频独家合作平台进行深度合作与品牌露出。「赴山海」：武侠 IP+顶流+黑科技，打造沉浸式烟花秀+全民互动。同期联合孵化「抖音×金鸡×戛纳」招商与 2025 抖音电影奇遇夜等 S 级项目。',
    metrics: [['100 亿+', '2025 抖音电影奇遇夜项目总曝光']],
    cover: c('p28'), long: false, featured: true,
    materials: [{ tab: '招商手册', images: [f('p28')] }],
    links: [{ name: '戛纳 × 抖音招商手册（飞书）', url: 'https://di3mq5an2ih.feishu.cn/docx/C6rRdu8ODopKzmxXdsacsndBnqd' }, { name: '「赴山海」专项招商手册（飞书）', url: 'https://my.feishu.cn/docx/AumbdKqkLobLcExzXURcABubnHh?from=from_copylink' }],
  },
  {
    id: 'bd-starfilm', title: '「美好星影 100+」招商手册 & 抖音影视综合作导航', org: '字节跳动', line: '文娱IP', industry: '影视综', status: '招商手册',
    deliverables: ['美好星影 100+ 招商手册（25H1 通用版）', '抖音影视综合作导航'],
    description: '美好星影 100+ 联动达人二创及平台资源，将首播流量转化为二次传播声量；影视综合作导航为泛文娱行业客户提供定制化资源及热点营销服务，支持电影、剧集、综艺全链路推广。',
    metrics: [],
    cover: c('p29'), long: false,
    materials: [{ tab: '招商手册', images: [f('p29')] }],
    links: [{ name: '抖音影视综合作导航（飞书）', url: 'https://bytedance.larkoffice.com/docx/VTIhdyQpLoAMoLxe7EQcZlacn3d' }, { name: '美好星影招商手册（飞书）', url: 'https://my.feishu.cn/docx/BKBFdhVgIol30LxAtGacXjQ6nKf' }],
  },
  // ————— 字节跳动 · 互动IP —————
  {
    id: 'bd-interactive', title: '互动产品招商 · 商机拓维与执行交付', org: '字节跳动', line: '互动IP', industry: '多行业', status: '已结案',
    deliverables: ['2025 天猫 618 创新内容互动规划', '幸运咖 × 王俊凯传播方案', '蚂蚁保 × 刘亦菲传播方案'],
    description: '负责挑战赛、AIGC 贴纸、众测任务、小飞盒等互动营销产品招商，覆盖大众/本地/生态/懂车帝 4 大业务；协同媒介、产运团队执行交付，T+3 输出结案报告。以 2025 天猫 618 策划案为例：融合 AIGC 互动、热点共创及星选任务。',
    metrics: [['70+', '服务品牌（覆盖 4 大业务）'], ['+40%', '招商收入季度环比'], ['67%', '商机落袋率'], ['40+', '互动 IP 项目执行，100% 按时交付']],
    cover: c('p30'), long: false,
    materials: [{ tab: '规划与方案', images: [f('p30')] }],
    links: [{ name: '2025 天猫 618 创新内容互动规划（飞书）', url: 'https://my.feishu.cn/slides/FyZwsPpnylsR9hdndRWcJY9rnib' }, { name: '幸运咖 × 王俊凯传播方案（飞书）', url: 'https://my.feishu.cn/docx/VyTod7elmo9w76x9xoXceW5VnKc?from=from_copylink' }, { name: '蚂蚁保 × 刘亦菲传播方案（飞书）', url: 'https://my.feishu.cn/docx/IhhrdEGYvoGLldx8QS4cXpUynmg?from=from_copylink' }],
  },
  {
    id: 'kfc-sun', title: '肯德基 × 孙颖莎 热点传播结案', org: '字节跳动', line: '互动IP', industry: '餐饮', status: '已结案',
    deliverables: ['热点传播结案 OP'],
    description: '孙颖莎带动 UGC 裂变，#泼天好运一拍就来# 登抖音双榜 TOP1/4；8 位达人覆盖 2597 万+ 粉丝，互动页曝光较竞品 +103%。',
    metrics: [['11.3 亿', '双话题曝光'], ['2630 万+', '话题互动'], ['243 小时', '双榜霸榜时长'], ['9.9 万次', '贴纸使用（行业 TOP）']],
    cover: c('p31'), long: false,
    materials: [{ tab: '结案 OP', images: [f('p31')] }],
    links: [{ name: '肯德基 × 孙颖莎结案 OP（飞书）', url: 'https://my.feishu.cn/docx/RrisdnVJ2o2SAKxn5yLcEvqZnEK' }],
  },
  {
    id: 'lululemon', title: 'lululemon × 美好星影 100+ 结案 OP', org: '字节跳动', line: '互动IP', industry: '服饰', status: '已结案',
    deliverables: ['结案 OP'],
    description: '原生达人种草、冲榜达人引爆，现金激励+低门槛全民任务沉淀海量 UGC，跨圈层传播。',
    metrics: [['1.9 亿+', '总曝光'], ['TOP 5', '挑战榜最高位次（16 分钟冲榜 TOP40）'], ['22 小时+', '霸榜时长'], ['4 万+', '全民任务参与']],
    cover: c('p32'), long: false,
    materials: [{ tab: '结案 OP', images: [f('p32')] }],
    links: [{ name: 'lululemon 结案 OP（飞书）', url: 'https://my.feishu.cn/docx/PI7zdpYNYoP0Hxxo6rKcSpBBnvb?from=from_copylink' }],
  },
  {
    id: 'deyou', title: '德祐 × 美好星影 100+ 结案 OP（联名《庆余年 2》）', org: '字节跳动', line: '互动IP', industry: '母婴日化', status: '已结案',
    deliverables: ['结案 OP'],
    description: '联名《庆余年 2》发起全民任务，实现剧粉与品牌深度共鸣；品牌直播间观看量超日均 8 倍。',
    metrics: [['3.9 亿+', '话题曝光'], ['TOP 1', '抖音种草榜'], ['3.5 万+', '任务投稿'], ['372.4 万+', '总互动']],
    cover: c('p33'), long: false,
    materials: [{ tab: '结案 OP', images: [f('p33')] }],
    links: [{ name: '德祐结案 OP（飞书）', url: 'https://my.feishu.cn/docx/FiuhddCKhoWyPxx2uBncPaXTnnc?from=from_copylink' }],
  },
  {
    id: 'lamer', title: '海蓝之谜 × 美好星影 结案 OP', org: '字节跳动', line: '互动IP', industry: '美妆', status: '已结案',
    deliverables: ['结案 OP'],
    description: '现金+小飞盒+众测组合激励；10 位头部达人（8 美妆+2 剧情）投放，营销号话题登娱乐榜。',
    metrics: [['11 亿+', '双话题曝光'], ['4760 万+', '话题互动'], ['9055 万+', '现金任务播放'], ['3.6 万+', '小飞盒参与']],
    cover: c('p34'), long: false,
    materials: [{ tab: '结案 OP', images: [f('p34')] }],
    links: [{ name: '海蓝之谜结案 OP（飞书）', url: 'https://di3mq5an2ih.feishu.cn/docx/EvBvd9hi0oqdmAxH67ychUKRnBc' }],
  },
  {
    id: 'shuhua', title: '舒化 × 美好星影 100+ 结案 OP', org: '字节跳动', line: '互动IP', industry: '食品饮料', status: '已结案',
    deliverables: ['结案 OP'],
    description: '发起 #小小心意轻松拿捏# 挑战赛，聚焦代际送礼场景，达人创作+趣味贴纸打透「0 乳糖」送长辈卖点。',
    metrics: [['8.87 亿+', '话题曝光'], ['20 万+', '任务投稿'], ['645 万+', '15 位 KOL 播放'], ['3595 万+', '贴纸曝光']],
    cover: c('p35'), long: false,
    materials: [{ tab: '结案 OP', images: [f('p35')] }],
    links: [{ name: '舒化结案 OP（飞书）', url: 'https://di3mq5an2ih.feishu.cn/docx/FvGidFPWQoAuQYx8oobcnXCmn1f' }],
  },
  {
    id: 'roborock', title: '石头科技 × 美好星影 100+ 结案 OP', org: '字节跳动', line: '互动IP', industry: '3C家电', status: '已结案',
    deliverables: ['结案 OP'],
    description: '发起 #上场即冠军# 贴纸挑战赛，借黄雅琼中秋热点联动达人软性植入产品，贴纸及任务参与量超预期。',
    metrics: [['6.2 亿+', '话题曝光'], ['TOP 34', '娱乐榜']],
    cover: c('p36'), long: false,
    materials: [{ tab: '结案 OP', images: [f('p36')] }],
    links: [{ name: '石头科技结案 OP（飞书）', url: 'https://my.feishu.cn/file/KwDpbl1i5oV0rJxCKvXc2iW0noc' }],
  },
  // ————— 实习 · 天猫健康 · 媒介商业化 —————
  {
    id: 'tmall-618', title: '天猫健康 618 · 全域流量运营与西湖天幕 3D 裸眼', org: '天猫健康（实习）', line: '媒介商业化', industry: '大健康', status: '已结案',
    deliverables: ['618 全域媒介策略', '西湖天幕 3D 裸眼项目'],
    description: '统筹 19 个大健康品牌，创新「DSP 开机+线下 3D 天幕+微博语义广告+知乎品效广告」组合策略；5.20–6.18 期间打造为期 14 天的杭州西湖线下 3D 裸眼大屏，促成现象级营销事件。',
    metrics: [['1.04 亿', '618 全域曝光量'], ['1400 万', '西湖天幕单日曝光'], ['19 个', '联动大健康品牌'], ['50 万+', '品牌联名搜索峰值']],
    cover: c('p39'), long: false, featured: true,
    materials: [{ tab: '618 总览', images: [f('p39')] }],
    links: [],
  },
  {
    id: 'tmall-zhihu', title: '天猫健康 · 知乎投放 case', org: '天猫健康（实习）', line: '媒介商业化', industry: '大健康', status: '已结案',
    deliverables: ['知乎种草执行表', '种草项目结案报告'],
    description: '组合热榜提问、PU 深度测评、商业话题，大咖提问自然冲榜 Top19，激发万粉 PU 自发传播，精准覆盖 25-40 岁女性。',
    metrics: [['1200 万+', '触达用户（曝光超目标 117%）'], ['¥0.48', '知+ CPC（CTR 2.26%）'], ['114%', '硬广点击超预期'], ['¥10.77', 'CPM 成本']],
    cover: c('p40'), long: false,
    materials: [{ tab: '执行与结案', images: [f('p40')] }],
    links: [{ name: '知乎 & 天猫健康 5 月种草执行表（飞书）', url: 'https://my.feishu.cn/sheets/MblHsLdOPhyEvvtq4YecjwAKnfg?from=from_copylink' }, { name: '天猫健康 5 月种草项目结案报告（飞书）', url: 'https://my.feishu.cn/file/Hgk8b5uyWosGO0xkv2wcgm8QnYd?from=from_copylink' }],
  },
  {
    id: 'tmall-weibo', title: '天猫健康 · 微博投放开机 + 语义橱窗 case', org: '天猫健康（实习）', line: '媒介商业化', industry: '大健康', status: '已结案',
    deliverables: ['微博开机广告投放', '语义橱窗投放'],
    description: '优化【健康】长尾词搜索，热点伴随锁定备孕/减脂需求，捕获长尾流量。',
    metrics: [['5600 万+', '全域曝光（开机 1655 万+，语义橱窗单日 3937 万）'], ['50 万+', '联名搜索峰值'], ['+22%', 'CVR 提升'], ['-18%', 'CPM 下降']],
    cover: c('p41'), long: true,
    materials: [{ tab: '投放材料', images: [f('p41')] }],
    links: [],
  },
  {
    id: 'tmall-dsp', title: '天猫健康 · 5.20 DSP 全域开机 case', org: '天猫健康（实习）', line: '媒介商业化', industry: '大健康', status: '已结案',
    deliverables: ['DSP 全域开机投放'],
    description: '创新动态竞价策略结合健康场景语义定向，验证「低成本 × 高转化」品效协同策略。',
    metrics: [['1656.89 万', '实际曝光（达成率 129%）'], ['37.3 万', '点击（达成率 153%）'], ['¥15.5', 'CPM（较预估降 22.5%）'], ['3.57%', 'CTR']],
    cover: c('p42'), long: false,
    materials: [{ tab: '投放材料', images: [f('p42')] }],
    links: [],
  },
  {
    id: 'tmall-ops', title: '天猫健康 · 商家运营与需求挖掘', org: '天猫健康（实习）', line: '媒介商业化', industry: '大健康', status: '日常运营',
    deliverables: ['商家运营', '《天猫脱毛仪人群白皮书》（参与制作）'],
    description: '深耕医疗器械、药品保健、成人计生等品类，挖掘 30+ 健康品牌（三诺/鱼跃/Swisse 等）合作需求；参与《天猫脱毛仪人群白皮书》制作，围绕 Z 世代女性（62%）短视频偏好（完播率 58%），为 Ulike/觅光等脱毛仪品牌提供人群触达策略。',
    metrics: [['30+', '挖掘合作需求品牌']],
    cover: c('p38'), long: false,
    materials: [{ tab: '运营材料', images: [f('p38')] }],
    links: [{ name: '《天猫脱毛仪人群白皮书》报道（199it）', url: 'https://www.199it.com/archives/1695238.html' }],
  },
  // ————— 实习 · 朗知传媒 —————
  {
    id: 'smart-kol', title: 'smart 汽车 · 达人投放执行（6 场跨城市 Campaign）', org: '朗知传媒（实习）', line: '达人执行', industry: '汽车', status: '已结案',
    deliverables: ['达人投放 SOP', '跨城市 Campaign 执行'],
    description: '策划并执行苏州/重庆/北京等 6 场跨城市 Campaign，联动 @梅尼耶、@陶白白 等 30+ 头部 KOL；建立达人筛选 SOP，优化「List 提报→下 PO 单→Brief 制作→现场执行→内容审核→效果复盘」全流程。',
    metrics: [['¥19.3', '活动 CPM 低至'], ['108%–131%', '曝光达成率'], ['779 万', '重庆活动总曝光量'], ['+40%', '爆文率提升']],
    cover: c('p43'), long: false,
    materials: [{ tab: '执行材料', images: [f('p43')] }],
    links: [],
  },
  {
    id: 'smart-cases', title: 'smart #3 25 周年小红书 & #1 铂金版抖音达人合作结案', org: '朗知传媒（实习）', line: '达人执行', industry: '汽车', status: '已结案',
    deliverables: ['小红书达人合作结案', '抖音 KOL 合作结案报告'],
    description: '#3 星空纪念版：联动 15+ 跨领域 KOL，全域阅读量超预期 102%。#1 铂金版：分层达人策略以科技+轻奢内容精准塑造「新奢」标签。',
    metrics: [['4053 万', '#1 铂金版抖音播放量（KPI 108%）'], ['113%', '#1 铂金版互动达成'], ['102%', '#3 小红书全域阅读超预期']],
    cover: c('p44'), long: false,
    materials: [{ tab: '结案报告', images: [f('p44')] }],
    links: [{ name: 'smart #3 25 周年小红书达人合作（飞书）', url: 'https://di3mq5an2ih.feishu.cn/file/FFwtbYahSovvK3xcJgIcoif1ngh' }, { name: 'smart #1 铂金版抖音 KOL 结案报告（飞书）', url: 'https://di3mq5an2ih.feishu.cn/file/NG5ib9dKVoR7gBx9upkcRIB6nhh' }],
  },
  {
    id: 'smart-campaign', title: 'smart 2024 CNY & 妇女节 Campaign Review', org: '朗知传媒（实习）', line: '达人执行', industry: '汽车', status: '已结案',
    deliverables: ['CNY Campaign Review', "Women's Day Campaign Review"],
    description: 'CNY：明星与达人矩阵驱动 #TheMeThe1 主题活动，以用户共创实现高曝光强互动。妇女节：跨界联动星座财经达人（@陶白白、@小Lin说）打造「运势 VS 局势」话题，验证「热点 × 达人 × 用户参与」传播模型。',
    metrics: [],
    cover: c('p45'), long: false,
    materials: [{ tab: 'Campaign Review', images: [f('p45')] }],
    links: [{ name: 'smart CNY Campaign Review（飞书）', url: 'https://my.feishu.cn/file/EMRIbbHmfoQ0F6xykjLcR1GZnnV?from=from_copylink' }, { name: "smart Women's Day Campaign Review（飞书）", url: 'https://my.feishu.cn/file/MFSNb9lqeohHsoxS3sZcdjodn4f?from=from_copylink' }],
  },
  {
    id: 'smart-content', title: 'smart 小红书内容运营 · 传播规划与「发现春日灵感地图」', org: '朗知传媒（实习）', line: '内容运营', industry: '汽车', status: '已结案',
    deliverables: ['季度/月度传播规划', '「发现春日灵感地图」联名执行'],
    description: '月产 28 篇高质量笔记，制定官号季度传播规划；smart 联名小红书「发现春日灵感地图」覆盖京沪蓉深四城，渗透宠物、运动、时尚圈层。',
    metrics: [['7000 万+', '春日灵感地图曝光'], ['4000+', '优质笔记'], ['124%–165%', '官号 1-2 月互动量完成率'], ['28 篇', '月均高质量笔记产出']],
    cover: c('p47'), long: false,
    materials: [{ tab: '规划与执行', images: [f('p47'), f('p46')] }],
    links: [{ name: 'smart × 小红书「发现春日灵感地图」（飞书）', url: 'https://my.feishu.cn/file/JNORbGOSsos97IxhzDCcgHQHnzg?from=from_copylink' }, { name: '小红书 4 月短视频及中视频规划（飞书）', url: 'https://my.feishu.cn/file/UJuzbpeBYohSsBxfcbXcwGQfnvc?from=from_copylink' }],
  },
  {
    id: 'smart-data', title: 'smart 小红书月报与平台监测周报', org: '朗知传媒（实习）', line: '内容运营', industry: '汽车', status: '已结案',
    deliverables: ['3 月月报', '平台监测周报'],
    description: '以 MBTI 热点+春节场景化内容撬动用户共鸣；建立舆情监测机制，3.25–3.31 周非负面声量占比 99.7%，「试驾体验」「女性购车」话题引爆互动。',
    metrics: [['3165', '3 月单月涨粉'], ['14%', '月涨粉率（同期奔驰/宝马约 2%）'], ['91%', '评论回复率'], ['99.7%', '周非负面声量占比']],
    cover: c('p48'), long: false,
    materials: [{ tab: '月报与周报', images: [f('p48')] }],
    links: [{ name: 'smart 小红书 3 月月报（飞书）', url: 'https://my.feishu.cn/file/NYk4bVsQEoEeVextRXncQWY0nlh' }],
  },
  {
    id: 'smart-plans', title: 'smart 小红书季度/月度传播规划', org: '朗知传媒（实习）', line: '内容运营', industry: '汽车', status: '已结案',
    deliverables: ['1月传播规划', '2月传播规划', '4月传播规划', 'Q2传播规划'],
    description: '制定官号季度/月度传播规划：1 月借「脆皮打工人」话题强化「新春智能」心智；2 月春节场景联动奈雪联名；4 月结合拼贴诗/薄荷曼波潮流与北京车展；Q2 聚焦「新奢都市」整合车展与 520 联名。',
    metrics: [],
    cover: '', long: false,
    materials: [],
    links: [
      { name: 'smart 小红书 2024年1月传播规划（飞书）', url: 'https://my.feishu.cn/file/R6CtbTiR8oj4k2xFOXRcrYcbnvg' },
      { name: 'smart 小红书 2024年2月传播规划（飞书）', url: 'https://my.feishu.cn/file/UXI4b2Ulqofcucxd3uRctSSMnbc' },
      { name: 'smart 小红书 2024年4月传播规划（飞书）', url: 'https://my.feishu.cn/file/LOlubh4KAon6CIxgzOQc26QAnw9' },
      { name: '2024 Q2 smart 小红书传播规划（飞书）', url: 'https://my.feishu.cn/file/SeQGbGS79o410txtryPckG0Pn6e' },
    ],
  },
]

export const cases: CaseItem[] = normalizeProjects(legacyCases)

export const ORGS = ['微博', '字节跳动', '天猫健康（实习）', '朗知传媒（实习）'] as const
export const LINES: Record<string, string[]> = {
  '微博': ['游戏项目', '电竞赛事', '平台IP', 'AI提效'],
  '字节跳动': ['文娱IP', '互动IP'],
  '天猫健康（实习）': ['媒介商业化'],
  '朗知传媒（实习）': ['达人执行', '内容运营'],
}
export const INDUSTRIES = [...new Set(cases.map(c => c.industry))]
