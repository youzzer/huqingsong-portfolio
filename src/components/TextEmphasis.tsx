import type { ReactNode } from 'react'
import styles from './TextEmphasis.module.css'

// Editorial exact phrases only: no number regex, markup parsing, or rewritten copy.
export const proseEmphasis = [
  '游戏商业化', '游戏电竞商业', '电竞业务侧', '电竞商业', '电竞赛事', '互动产品侧', '整合营销', '分层合作权益', '互动产品招商', '影视综宣发',
  '平台级 IP 孵化', '跨资源整合', '全域媒介策略', '企业视频内容',
  '《天猫脱毛仪人群白皮书》', '全域投放与成本优化', '投放 SOP',
  '项目视频拍摄与剪辑', '主题传播活动', '定制 H5', '收入目标达成率超 120%',
  '非标收入 YoY +40%、+118%', '非标收入 YoY +55%', '前置售卖率超 60%',
  '招商目标达成率 133%', '流程交付效率提升 47%', '运营 Agent',
  '商机落袋率 67%', '招商收入季度环比 +40%', '100% 按时交付',
  '「内容+产品」双驱动', '非标收入同比 +20%', '《欢迎来到我的人生》',
  '1.04 亿次曝光', '达人投放 SOP', '活动 CPM 低至 19.3 元', '80+ 支',
  '活动专题页', '云逛展动线地图', '全链路曝光', '四赛道内容征集',
  '超话核心用户阵地', 'H5 原型', '原型设计', '上线验收', '角色二级专题页',
  '创作者激励', '内容征集', '测试选题', '公测 UGC', '玩家共创',
  '频道定制', '定制助威话题', '总冠名', '分层招商包', '六类资源包',
  '营销方法论', '四级合作模式', '精准匹配', '三大运营资源', '品牌露出',
  '二次传播声量', 'T+3 输出结案报告', 'UGC 裂变', '跨圈层传播',
  '全民任务', '组合激励', '达人创作', '贴纸挑战赛', '组合策略',
  '深度测评', '长尾流量', '「低成本 × 高转化」', '人群触达策略',
  '达人筛选 SOP', '分层达人策略', '用户共创', '季度传播规划', '舆情监测机制',
] as const

export default function TextEmphasis({ text, phrases = proseEmphasis, ranges, limit = 3 }: {
  text: string; phrases?: readonly string[]; ranges?: readonly { start: number; end: number }[]; limit?: number
}) {
  const matches = (ranges ? ranges.filter(({ start, end }) => Number.isInteger(start) && Number.isInteger(end) && start >= 0 && end > start && end <= text.length) : phrases.filter(Boolean).flatMap(phrase => {
    const start = text.indexOf(phrase)
    return start < 0 ? [] : [{ start, end: start + phrase.length }]
  })).sort((a, b) => a.start - b.start || b.end - a.end)
  const nodes: ReactNode[] = []
  let cursor = 0
  let count = 0
  for (const { start, end } of matches) {
    if (start < cursor || count >= limit) continue
    nodes.push(text.slice(cursor, start), <strong className={styles.emphasis} key={start}>{text.slice(start, end)}</strong>)
    cursor = end
    count++
  }
  nodes.push(text.slice(cursor))
  return <>{nodes}</>
}
