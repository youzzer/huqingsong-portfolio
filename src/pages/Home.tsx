import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../Portfolio.module.css'
import home from './Home.module.css'
import { homeExperience, resumeCoreData } from '../resume'
import { SectionHeader } from '../shared'
import BlindBoxHero from '../components/BlindBoxHero'
import CaseBoxSection from '../components/CaseBoxSection'
import TextEmphasis from '../components/TextEmphasis'

function CoreData() {
  return <section id="core-data" className={`${styles.section} ${home.dataSection}`}><div className={styles.container}>
    <SectionHeader label="CORE DATA" first="核心" italic="数据" />
    <div className={home.companyDataList}>
      {resumeCoreData.map(company => <article className={home.companyData} key={company.company}>
        <header className={home.dataCompanyHeading}>
          <h3>{company.company}<span>{company.en}</span></h3>
          <span className={home.dataPeriod}>{company.period}</span>
        </header>
        <div className={home.dataHierarchy}>
          {[{ label: '整体交付', rows: company.rows }, { label: '代表项目', rows: company.projects }].map(section => <section className={home.dataLevel} key={section.label} aria-label={`${company.company} · ${section.label}`}>
            <h4>{section.label}</h4>
            <dl className={home.definitionList}>
              {section.rows.map(row => <div className={home.definitionRow} key={row.scope} data-sources={row.sources.join(',')}>
                <dt>{row.scope}<span>{row.period}</span></dt>
                <dd><TextEmphasis text={row.result} phrases={row.emphasis} /></dd>
              </div>)}
            </dl>
          </section>)}
        </div>
      </article>)}
    </div>
  </div></section>
}

function Experience() {
  const primary = homeExperience.filter(c => c.primary)
  const interns = homeExperience.filter(c => !c.primary)
  return <section id="experience" className={`${styles.section} ${home.experienceSection}`}><div className={styles.container}>
    <SectionHeader label="EXPERIENCE" first="工作与" italic="经历" />
    <div className={home.experienceList}>
      {primary.map((company, index) => <article key={company.key} className={`${home.experienceRow} ${home.primaryExperience}`}>
        <span className={home.experienceIndex}>{String(index + 1).padStart(2, '0')}</span>
        <div className={home.experienceBody}>
          <header className={home.experienceHeading}>
            <h3>{company.name}<span>{company.en}</span></h3>
            <span className={home.experiencePeriod}>{company.period}</span>
          </header>
          <div className={home.experienceRole}>{company.role}</div>
          <p className={home.experienceSummary}><TextEmphasis text={company.summary} limit={6} /></p>
          {company.path && <Link className={home.experienceLink} to={company.path}>查看工作项目 <span aria-hidden="true">↗</span></Link>}
        </div>
      </article>)}

      {/* 实习归到一个大类，与正式经历视觉区分 */}
      <article className={`${home.experienceRow} ${home.internExperience}`}>
        <span className={home.experienceIndex}>实习</span>
        <div className={home.experienceBody}>
          <header className={home.experienceHeading}>
            <h3>实习经历<span>INTERNSHIPS</span></h3>
            <span className={home.experiencePeriod}>2023.07 — 2024.07</span>
          </header>
          <div className={home.internList}>
            {interns.map(company => <div key={company.key} className={home.internItem}>
              <div className={home.internHeading}>
                <strong>{company.name}</strong>
                <span className={home.internRole}>{company.role}</span>
                <span className={home.internPeriod}>{company.period}</span>
              </div>
              <p className={home.internSummary}><TextEmphasis text={company.summary} limit={6} /></p>
            </div>)}
          </div>
          <Link className={home.experienceLink} to="/internships">查看实习项目 <span aria-hidden="true">↗</span></Link>
        </div>
      </article>
    </div>
  </div></section>
}

function Methodology() {
  const modules = [
    {
      title: '商业化方法论',
      tag: '商业向',
      summary: '以游戏 IP 商业化、赛事与平台级活动为载体，拆解流量结构、产品周期与受众圈层；在新游上线、存量节点、电竞赛事与平台 IP 四类场景中，设计主赞、决赛高光、战队助威、节点定制等分层权益组合，打通线上全域曝光与线下场馆权益；方案前置售卖，结案数据复盘，推动内容热度向非标收入转化。已在《王者荣耀世界》《鸣潮》、KPL 年度总决赛、竞燃之夜、ChinaJoy 等项目完整跑通。',
    },
    {
      title: '流量运营方法论',
      tag: '用户向',
      summary: '洞察微博流量KPI体系演变，研判平台经营方向正从图文流量分发转向视频化价值时长与创作者生态；执行侧围绕DAU与优质内容双目标，将内容布局到视频、超话、热点三大阵地，并以分层策略匹配游戏品类——大DAU品类以社交与福利体系拓展用户规模，垂直圈层品类以内容征集与角色明星化运营提升用户粘性。',
    },
    {
      title: 'AI 工具应用与提效',
      tag: '工具向',
      summary: '基于公司内部 WeiboAP 搭建商业化运营 Agent，以 Prompt 工程与 MCP/Skill 编排覆盖行业研究、方案生成、数据复盘等高频场景，流程交付效率提升 47%，成果向 VP 汇报并获创新奖金；协同产品团队为崩铁版更交付定制 H5 互动方案。',
    },
  ]
  return <section id="methodology" className={`${styles.section} ${home.methodologySection}`}><div className={styles.container}>
    <SectionHeader label="METHOD" first="工具与" italic="方法论" />
    <div className={home.methodologyGrid}>
      {modules.map(m => <article key={m.title} className={home.methodologyCard}>
        <div className={home.methodologyTag}><span>{m.tag}</span></div>
        <h3 className={home.methodologyTitle}>{m.title}</h3>
        <p className={home.methodologySummary}>{m.summary}</p>
      </article>)}
    </div>
  </div></section>
}
function Education() {
  return <section id="education" className={styles.section}><div className={styles.container}>
    <SectionHeader label="EDUCATION" first="教育" italic="背景" />
    <div className={styles.eduCard}>
      <p className={styles.eduSchool}>武汉学院 <small>2020.09 — 2024.06 · 本科 · 文学学士</small></p>
      <p className={styles.eduMajor}>艺术与传媒学院 · 网络与新媒体（隶属新闻传播学）</p>
      <p className={styles.eduDetail}>GPA 3.8 · 专业前 10% · 校级奖学金 ×3（二等 ×2、三等 ×1）</p>
      <p className={styles.eduDetail}>核心课程：品牌营销策划、广告文案策划、新媒体创意与策划、新闻采写、视听语言研究、出镜记者与现场报道</p>
    </div>
  </div></section>
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copyWechat = async () => {
    try { await navigator.clipboard.writeText('Diety02ze'); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* 剪贴板不可用时静默 */ }
  }
  return <section id="contact" className={`${styles.section} ${styles.contact}`}><div className={styles.container}>
    <p className={styles.eyebrow}>联系方式 · CONTACT</p>
    <h2 className={styles.contactTitle}>联系方式</h2>
    <div className={styles.contactButtons}>
      <a className={`${styles.btn} ${styles.btnSolid}`} href="mailto:Youzzer@163.com">📧 Youzzer@163.com <span aria-hidden="true">↗</span></a>
      <button type="button" className={styles.btn} onClick={copyWechat} title="点击复制微信号">💬 微信：Diety02ze{copied ? ' · 已复制' : ''}</button>
    </div>
    <a className={styles.contactPhone} href="tel:15321719886">📱 153 2171 9886</a>
  </div></section>
}

export default function Home() {
  return <main>
    <BlindBoxHero />
    <CaseBoxSection />
    <Experience />
    <CoreData />
    <Methodology />
    <Education />
    <Contact />
  </main>
}
