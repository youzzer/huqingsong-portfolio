const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('/Users/xuyouzeecho/.workbuddy/binaries/node/workspace/node_modules/puppeteer-core');
const root = path.join(__dirname, 'dist');
const out = path.join(__dirname, 'verification-refinement');
fs.mkdirSync(out, {recursive:true});
const types = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.pdf':'application/pdf'};
const server = http.createServer((req,res) => {
  let file = path.join(root, decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(root,'index.html');
  res.setHeader('Content-Type',types[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
const pause = ms => new Promise(r => setTimeout(r,ms));
(async()=>{
 let browser;
 const results=[]; const errors=[];
 try {
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const base=`http://127.0.0.1:${server.address().port}`;
  browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
  const p=await browser.newPage();
  p.on('pageerror',e=>errors.push(String(e)));
  p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  const check=(name,ok,detail)=>{results.push({name,ok,detail}); if(!ok) console.error('FAIL',name,detail)};
  const state=()=>p.evaluate(()=>({url:location.hash.split('?')[1] ? '?' + location.hash.split('?')[1] : location.search, count:document.querySelector('[aria-live="polite"]')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)}));
  for(const [w,h] of [[1440,900],[390,844]]){
   await p.setViewport({width:w,height:h});
   await p.goto(base,{waitUntil:'networkidle0'}); await pause(1800);
   const hero=await p.evaluate(()=>{
    const title=document.querySelector('h1'); const buttons=[...document.querySelectorAll('a')].filter(a=>['查看精选案例 ↓','在线浏览作品集 →','联系方式'].includes(a.textContent.trim()));
    const box=document.querySelector('button[aria-label="重新开盒"]'); const r=box?.getBoundingClientRect();
    return {title:title?.textContent, overflow:document.documentElement.scrollWidth>innerWidth,overlap:buttons.some(b=>{const q=b.getBoundingClientRect();return r&&q.left<r.right&&q.right>r.left&&q.top<r.bottom&&q.bottom>r.top}),broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).length};
   });
   check(`hero-${w}`,hero.title==='胡庆松'&&!hero.overflow&&!hero.overlap&&!hero.broken,hero);
   await p.screenshot({path:path.join(out,`home-${w}.png`)});
   if(w===1440){await p.click('button[aria-label="重新开盒"]');await pause(1600);check('replay-visible',await p.evaluate(()=>[...document.querySelectorAll('[class*="heroCover"]')].every(e=>Number(getComputedStyle(e).opacity)>.4)));}
   await p.goto(base+'/#/portfolio?p=23',{waitUntil:'networkidle0'});await pause(700);
   let s=await state();check(`deep-link-${w}`,s.url==='?p=23'&&s.count==='23 / 50'&&!s.overflow,s);
   await p.screenshot({path:path.join(out,`portfolio-${w}.png`)});
   if(w===390){
    await p.evaluate(()=>[...document.querySelectorAll('button')].find(b=>b.textContent==='单页').click());await pause(300);
    check('mobile-next-visible',await p.$eval('button[aria-label="下一页"]',e=>{const r=e.getBoundingClientRect();return r.width>0&&r.top<innerHeight}));
   }
   await p.click('button[aria-label="下一页"]');await pause(350);s=await state();check(`next-${w}`,s.url==='?p=24'&&s.count==='24 / 50',s);
   await p.goBack();await pause(400);s=await state();check(`back-${w}`,s.url==='?p=23'&&s.count==='23 / 50',s);
   await p.goForward();await pause(400);s=await state();check(`forward-${w}`,s.url==='?p=24'&&s.count==='24 / 50',s);
   await p.evaluate(()=>[...document.querySelectorAll('button')].find(b=>b.textContent==='连续').click());await pause(500);s=await state();check(`mode-no-drift-${w}`,s.url==='?p=24'&&s.count==='24 / 50',s);
   await p.evaluate(()=>{const e=document.querySelector('[data-page="25"]');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-80)});await pause(500);s=await state();check(`scroll-anchor-${w}`,s.url==='?p=25'&&s.count==='25 / 50',s);
   await p.reload({waitUntil:'networkidle0'});await pause(600);s=await state();check(`refresh-${w}`,s.url==='?p=25'&&s.count==='25 / 50',s);
  }
  for(const val of ['NaN','Infinity','1.5','-1','0','51','1e1']){
   await p.goto(base+'/#/portfolio?p='+val,{waitUntil:'networkidle0'});await pause(200);const s=await state();check(`invalid-${val}`,s.url==='?p=1'&&s.count==='1 / 50',s);
  }
  await p.setViewport({width:1440,height:900});
  await p.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  await p.goto(base,{waitUntil:'networkidle0'});await pause(500);
  await p.click('button[aria-label="重新开盒"]');
  check('reduced-motion',await p.evaluate(()=>[...document.querySelectorAll('[class*="heroCover"]')].every(e=>Number(getComputedStyle(e).opacity)>.4)&&![...document.querySelectorAll('svg motion,svg ellipse')].some(e=>e.style.transformOrigin==='160px 150px')));
  await p.screenshot({path:path.join(out,'reduced-motion.png')});
  await p.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]); await pause(200);
  await p.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]); await pause(200);
  await p.click('button[aria-label="重新开盒"]');
  check('live-reduced-no-flash',await p.evaluate(()=>![...document.querySelectorAll('svg ellipse')].some(e=>e.style.transformOrigin==='160px 150px')));
  await p.goto(base+'/#/weibo',{waitUntil:'networkidle0'});await pause(400);
  const card=await p.$('button[class*="caseCard"]');
  if(card){await card.click();await pause(350);const text=await p.$eval('dialog',e=>e.textContent);check('metric-caliber-visible',text.includes('口径待核'),text.slice(0,500));await p.keyboard.press('Escape');}
  check('browser-errors',errors.length===0,errors);
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({results,errors},null,2));
  console.log(JSON.stringify({results,errors},null,2));
  if(results.some(r=>!r.ok))process.exitCode=1;
 } catch(e){console.error(e);process.exitCode=1} finally {if(browser)await browser.close();await new Promise(r=>server.close(r));}
})();
