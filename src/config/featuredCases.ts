import { cases } from '../cases'
import { projectIdByArtwork } from '../siteProjects'

/** Homepage only: pins lead WITHIN their material group, never the whole deck.
 * Artwork, not case status/title, determines the group. A case may own several
 * distinct originals; consumers must key cards by cover rather than item.id.
 * No internship, chapter/experience page, laptop mockup or generated artwork.
 */
// Fourteen verified landscape originals available. Do not fill the missing slot
// with vertical PR screenshots, designboards, or falsely classified manuals.
export const deckSize = 18
export const pinnedCaseIds: string[] = ['bd-cannes', 'summer-plan-2026', 'chinajoy-manual-2026']
export const featuredGroups = ['抖音招商手册', '微博招商手册', '微博案例', '抖音案例'] as const
export type FeaturedGroup = typeof featuredGroups[number]
export const featuredGroupCounts: Record<FeaturedGroup, number> = {
  抖音招商手册: 5, 微博招商手册: 9, 微博案例: 4, 抖音案例: 0,
}
const B = import.meta.env.BASE_URL

type Artwork = { caseId: string; cover: string; carouselCover?: string; group: FeaturedGroup; source: string }
// Source artwork below: embedded images or first-page manual renders as noted.
// PDF pN is one-based; xref identifies the embedded image.
// P: public/files/胡庆松-作品集.pdf. Extract ONLY the identified artwork, not its page.
// A: /Users/xuyouzeecho/WorkBuddy/2026-10-16-17-44-40/portfolio/assets/
// A PDF covers are complete first pages of actual manuals, not portfolio chapters.
// Existing PR/H5 cover crops follow portfolio/make_images.py (top 1400px).
export const artworkPool: Artwork[] = [
  { caseId: 'bd-vertical-ip', cover: 'featured-dy-welcome.webp', group: '抖音招商手册', source: 'P p27 xref575 — 欢迎来到我的人生' },
  { caseId: 'bd-vertical-ip', cover: 'featured-dy-health.webp', group: '抖音招商手册', source: 'P p27 xref568 — 健康成分实验室（按原图归类，不改案例事实）' },
  { caseId: 'bd-vertical-ip', cover: 'featured-dy-superplay.webp', group: '抖音招商手册', source: 'P p27 xref569 — 抖音文娱超玩计划' },
  { caseId: 'bd-cannes', cover: 'featured-dy-cannes.webp', group: '抖音招商手册', source: 'P p28 xref2675 — 戛纳招商手册' },
  { caseId: 'bd-cannes', cover: 'featured-dy-fushanhai.webp', group: '抖音招商手册', source: 'P p28 xref2674 — 赴山海招商手册' },
  // ChinaJoy is a manual HERE even though its case also includes execution/PR.
  { caseId: 'chinajoy-manual-2026', cover: 'featured-wb-chinajoy.webp', group: '微博招商手册', source: 'A 【通发版】2026年ChinaJoy微博游戏招商方案.PDF p1' },
  { caseId: 'acg-annual-2026', cover: 'featured-wb-annual.webp', group: '微博招商手册', source: 'A 2026微博游戏电竞年度招商通案-通发版.PDF p1' },
  { caseId: 'acg-annual-2026', cover: 'featured-wb-acg.webp', group: '微博招商手册', source: 'A 【方案0518】2026微博游戏动漫展招商方案.PDF p1' },
  { caseId: 'summer-plan-2026', cover: 'featured-wb-summer.webp', group: '微博招商手册', source: 'A 微博游戏「夏日游趣狂欢季」招商方案0630.PDF p1' },
  { caseId: 'jrnight-plan', cover: 'featured-wb-jrnight.webp', group: '微博招商手册', source: 'A 【通发版】2025竞燃之夜盛典招商方案-0911.PDF p1' },
  { caseId: 'esports-s', cover: 'featured-wb-kpl.webp', group: '微博招商手册', source: 'A 2025年KPL年度总决赛微博营销通案0829.PDF p1' },
  { caseId: 'esports-s', cover: 'featured-wb-s15.webp', group: '微博招商手册', source: 'A 2025年英雄联盟S15年度总决赛招商方案-0820.PDF p1' },
  { caseId: 'cny-2026', cover: 'cover-cny.webp', group: '微博案例', source: 'A 微博 / 平台IP / 2026 CNY「马上游福」结案 PR 首页' },
  { caseId: 'summer-2026', cover: 'cover-summer.webp', group: '微博案例', source: 'A 微博 / 平台IP / 2026 暑期「夏日游趣狂欢季」结案 PR 首页' },
  { caseId: 'esports-talent-manual', cover: 'cover-esports-talent-real.webp', group: '微博招商手册', source: 'L 飞书·电竞选手经纪手册 PDF p1' },
  { caseId: 'waw-review-2025', cover: 'cover-waw-review-2025.webp', group: '微博案例', source: 'L 飞书·2025微博游戏动漫展项目结案 PDF p1' },
  { caseId: 'jrnight-case-2025', cover: 'cover-jrnight-case-2025.webp', group: '微博案例', source: 'L 飞书·2025微博竞燃之夜项目结案 PDF p1' },
  { caseId: 'acg-talent-manual', cover: 'cover-acg-talent.webp', group: '微博招商手册', source: 'A 微博达人营销新解 · ACG 篇 手册封面' },
]

const caseById = new Map(cases.map(item => [item.id, item]))
// Fail visibly on invalid edits instead of silently shortening a group/deck.
function validateArtworkPool() {
  if (featuredGroups.reduce((sum, group) => sum + featuredGroupCounts[group], 0) !== deckSize)
    throw new Error('Featured group quotas must match deck size')
  const covers = new Set<string>()
  for (const art of artworkPool) {
    const item = caseById.get(projectIdByArtwork[art.cover])
    if (!item || !['微博', '字节跳动'].includes(item.org) || covers.has(art.cover) || !art.source)
      throw new Error(`Invalid or duplicate featured artwork: ${art.cover}`)
    if (item.org !== (art.group.startsWith('抖音') ? '字节跳动' : '微博'))
      throw new Error(`Artwork company mismatch: ${art.cover}`)
    covers.add(art.cover)
  }
  for (const group of featuredGroups) {
    if (featuredGroupCounts[group] < 0 || artworkPool.filter(art => art.group === group).length < featuredGroupCounts[group])
      throw new Error(`Insufficient original artwork: ${group}`)
  }
}
validateArtworkPool()

export function selectFeaturedCases(random: () => number = Math.random) {
  const shuffle = (items: Artwork[]) => {
    const copy = [...items]
    for (let i = copy.length - 1; i > 0; i--) {
      const value = random()
      if (!Number.isFinite(value) || value < 0 || value >= 1)
        throw new Error('Featured random must return a number in [0, 1)')
      const j = Math.floor(value * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }
  // Only shuffle/sample inside a group. Preserve configured pin order within
  // each group; distinct original materials may link to the same project.
  return featuredGroups.flatMap(group => {
    const pool = artworkPool.filter(art => art.group === group)
    const pins = pool.filter(art => pinnedCaseIds.includes(art.caseId)).sort((a, b) => pinnedCaseIds.indexOf(a.caseId) - pinnedCaseIds.indexOf(b.caseId))
    const rest = shuffle(pool.filter(art => !pinnedCaseIds.includes(art.caseId)))
    return [...pins, ...rest].slice(0, featuredGroupCounts[group]).map(art => ({
      item: caseById.get(projectIdByArtwork[art.cover])!, cover: `${B}img/${art.carouselCover || art.cover}`, group,
    }))
  })
}
