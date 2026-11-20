/**
 * 7xGrow Deterministic SSG Compiler
 * Phase 6B Pilot Compiler for Service Child Pages
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
const TEMPLATES_DIR = path.join(SRC_DIR, 'templates');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const STAGING_DIR = path.join(ROOT_DIR, '.staging');

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function resolveComponents(templateHtml) {
  return templateHtml.replace(/\{\{>\s*([a-zA-Z0-9_\-\.]+)\s*\}\}/g, (match, componentName) => {
    const compPath = path.join(COMPONENTS_DIR, componentName);
    if (!fs.existsSync(compPath)) {
      throw new Error(`Component not found: ${componentName} at ${compPath}`);
    }
    return fs.readFileSync(compPath, 'utf8');
  });
}

function compileServiceChild(slug) {
  const dataFile = path.join(DATA_DIR, 'services-sub.json');
  if (!fs.existsSync(dataFile)) {
    throw new Error(`Data file not found: ${dataFile}`);
  }
  const allData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  const data = allData[slug];
  if (!data) {
    throw new Error(`Slug not found in services-sub.json: ${slug}`);
  }

  const templatePath = path.join(TEMPLATES_DIR, 'template-service-child.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }

  let html = fs.readFileSync(templatePath, 'utf8');

  // 1. Resolve component includes
  html = resolveComponents(html);

  // 2. Meta & Schema
  html = html.replace(/\{\{PAGE_TITLE\}\}/g, data.meta?.title || '7xGrow Digital Agency');
  
  let schemaHtml = '';
  if (data.schema) {
    schemaHtml = `<script type="application/ld+json">\n${JSON.stringify(data.schema, null, 4)}\n    </script>`;
  }
  html = html.replace(/\{\{PAGE_SCHEMA\}\}/g, schemaHtml);

  // 3. Hero
  html = html.replace(/\{\{HERO_BADGE\}\}/g, data.hero?.badge || '');
  html = html.replace(/\{\{HERO_TITLE\}\}/g, data.hero?.title || '');
  html = html.replace(/\{\{HERO_GRADIENT_TITLE\}\}/g, data.hero?.gradientTitle || '');
  html = html.replace(/\{\{HERO_DESC\}\}/g, data.hero?.desc || '');
  html = html.replace(/\{\{HERO_CTA1_TEXT\}\}/g, data.hero?.cta1Text || 'Claim Free Audit');
  html = html.replace(/\{\{HERO_CTA1_LINK\}\}/g, data.hero?.cta1Link || '#roadmapForm');
  html = html.replace(/\{\{HERO_CTA2_TEXT\}\}/g, data.hero?.cta2Text || 'Case Studies');
  html = html.replace(/\{\{HERO_CTA2_LINK\}\}/g, data.hero?.cta2Link || '#case-studies');
  html = html.replace(/\{\{HERO_FORM_TITLE\}\}/g, data.hero?.formTitle || '');
  html = html.replace(/\{\{HERO_FORM_BTN\}\}/g, data.hero?.formBtn || 'Analyze My Website');
  html = html.replace(/\{\{HERO_FORM_NOTE\}\}/g, data.hero?.formNote || '');

  // 4. Stats
  html = html.replace(/\{\{STATS_BADGE\}\}/g, data.statsSection?.badge || 'WHY 7XGROW');
  html = html.replace(/\{\{STATS_TITLE\}\}/g, data.statsSection?.title || '');
  html = html.replace(/\{\{STATS_GRADIENT_TITLE\}\}/g, data.statsSection?.gradientTitle || '');
  html = html.replace(/\{\{STATS_DESC\}\}/g, data.statsSection?.desc || '');

  const bulletsHtml = (data.statsSection?.bullets || []).map(b => `
<div class="flex items-center gap-4 text-white">
<span class="material-symbols-outlined text-primary font-bold">check_circle</span>
<span class="font-medium">${escapeHtml(b)}</span>
</div>`).join('\n');
  html = html.replace(/\{\{STATS_BULLETS_HTML\}\}/g, bulletsHtml.trim());

  const statsHtml = (data.statsSection?.stats || []).map(s => `
<div class="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
<div class="text-4xl font-black text-white mb-2 stat-glow">${escapeHtml(s.num)}</div>
<div class="text-text-dim text-sm uppercase font-bold tracking-wider">${escapeHtml(s.label)}</div>
</div>`).join('\n');
  html = html.replace(/\{\{STATS_GRID_HTML\}\}/g, statsHtml.trim());

  // 5. Accordion (Section 4)
  html = html.replace(/\{\{SUBSERVICES_HEADING\}\}/g, data.subServices?.heading || '');
  html = html.replace(/\{\{SUBSERVICES_GRADIENT_HEADING\}\}/g, data.subServices?.gradientHeading || '');

  const accordionHtml = (data.subServices?.items || []).map((item, idx) => `
<details class="group border-b border-white/10 py-6 cursor-pointer" name="solutions"${idx === 0 ? ' open=""' : ''}>
<summary class="flex justify-between items-center text-3xl md:text-4xl font-bold text-white list-none group-open:text-primary transition-colors">
${escapeHtml(item.title)}
<span class="material-symbols-outlined text-white/30 group-open:text-primary expand-icon transition-transform duration-300">expand_more</span>
</summary>
<div class="mt-6 space-y-6">
<p class="text-text-dim text-lg leading-relaxed max-w-xl">${escapeHtml(item.desc)}</p>
<button class="vibrant-learn-more px-8 py-3 rounded-full text-white font-bold text-sm hover:scale-105 transition-transform">Learn
                            More</button>
</div>
</details>`).join('\n');
  html = html.replace(/\{\{SUBSERVICES_ACCORDION_HTML\}\}/g, accordionHtml.trim());

  // 6. Process Stepper (Section 7)
  html = html.replace(/\{\{PROCESS_BADGE\}\}/g, data.process?.badge || 'Our Process');
  html = html.replace(/\{\{PROCESS_TITLE\}\}/g, data.process?.title || 'Growth Command Center');
  html = html.replace(/\{\{PROCESS_DESC\}\}/g, data.process?.desc || '');

  const processConnectorSvg = `
<div class="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none">
<svg class="process-connector-svg" style="left: 12.5%; width: 25%;" viewbox="0 0 300 120">
<path class="curved-line" d="M 50,65 C 50,-20 250,-20 250,65"></path>
<path class="connector-arrow" d="M 245,55 L 250,65 L 255,55" fill="currentColor"></path>
</svg>
<svg class="process-connector-svg" style="left: 37.5%; width: 25%;" viewbox="0 0 300 120">
<path class="curved-line" d="M 50,65 C 50,-20 250,-20 250,65"></path>
<path class="connector-arrow" d="M 245,55 L 250,65 L 255,55" fill="currentColor"></path>
</svg>
<svg class="process-connector-svg" style="left: 62.5%; width: 25%;" viewbox="0 0 300 120">
<path class="curved-line" d="M 50,65 C 50,-20 250,-20 250,65"></path>
<path class="connector-arrow" d="M 245,55 L 250,65 L 255,55" fill="currentColor"></path>
</svg>
</div>`;

  const stepsCards = (data.process?.steps || []).map(step => `
<div class="process-card">
<div class="process-number-circle text-white">${escapeHtml(step.num)}</div>
<div class="process-body-glass">
<h4 class="text-lg font-black text-white mb-8 text-center uppercase tracking-widest leading-tight">${escapeHtml(step.title)}</h4>
<div class="space-y-6">
<div>
<span class="text-[10px] text-primary font-black uppercase tracking-[0.2em] block mb-2 font-bold">Objective</span>
<p class="text-white text-sm leading-relaxed font-medium">${escapeHtml(step.objective)}</p>
</div>
<div>
<span class="text-[10px] text-primary font-black uppercase tracking-[0.2em] block mb-2 font-bold">Activities</span>
<p class="text-text-dim text-xs leading-relaxed">${escapeHtml(step.activities)}</p>
</div>
<div class="pt-4 border-t border-white/10">
<span class="text-[10px] text-primary font-black uppercase tracking-[0.2em] block mb-2 font-bold">Outcome</span>
<div class="flex items-center gap-2 text-white">
<span class="material-symbols-outlined text-primary text-sm font-bold">verified</span>
<span class="text-xs font-bold uppercase">${escapeHtml(step.outcome)}</span>
</div>
</div>
</div>
</div>
</div>`).join('\n');

  html = html.replace(/\{\{PROCESS_STEPS_HTML\}\}/g, processConnectorSvg + '\n' + stepsCards.trim());

  // 7. FAQs (Section 8)
  const faqsHtml = (data.faqs || []).map((faq, idx) => `
<details class="group bg-card-dark border border-border-dark rounded-xl p-6 cursor-pointer" name="faq"${idx === 0 ? ' open=""' : ''}>
<summary class="flex justify-between items-center text-white font-bold text-lg list-none">
${escapeHtml(faq.q)}
<span class="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-text-dim mt-4 leading-relaxed">${escapeHtml(faq.a)}</p>
</details>`).join('\n');
  html = html.replace(/\{\{FAQS_HTML\}\}/g, faqsHtml.trim());

  // Strict output guard: ONLY write inside .staging/
  const targetFilename = data.filename || `${slug}.html`;
  const targetPath = path.join(STAGING_DIR, targetFilename);

  // Guard assertions
  if (!targetPath.startsWith(STAGING_DIR)) {
    throw new Error(`Security Violation: Target path outside staging directory: ${targetPath}`);
  }
  if (targetPath.includes('/blog/') || targetPath.includes('\\blog\\')) {
    throw new Error(`Security Violation: Attempted write to WordPress directory: ${targetPath}`);
  }
  if (path.dirname(targetPath) === ROOT_DIR) {
    throw new Error(`Security Violation: Attempted write directly to project root: ${targetPath}`);
  }

  fs.mkdirSync(STAGING_DIR, { recursive: true });
  fs.writeFileSync(targetPath, html, 'utf8');

  console.log(`[Compiler] Successfully compiled ${slug} -> .staging/${targetFilename} (${html.length.toLocaleString()} bytes)`);
  return targetPath;
}

if (require.main === module) {
  compileServiceChild('technical-seo');
}

module.exports = { compileServiceChild, resolveComponents };

