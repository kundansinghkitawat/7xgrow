/**
 * 7xGrow Dynamic Service Renderer
 * Powers Dynamic Server-Side Rendering (SSR) & Static Builds
 * Single Template (service-template.html) + Backend Data (services-data.json)
 */

const fs = require('fs');
const path = require('path');

const TEMPLATE_PATH = path.join(__dirname, 'service-template.html');
const DATA_PATH = path.join(__dirname, 'services-data.json');

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderToolsRow(toolsList, animClass) {
  if (!toolsList || !toolsList.length) return '';
  const cards = toolsList.map(t => `
<div class="arsenal-card">
<div class="flex items-center gap-4">
<div class="size-12 flex items-center justify-center ${t.bg || 'bg-primary/20'} ${t.color || 'text-primary'} rounded-xl">
<span class="material-symbols-outlined text-[28px]">${t.icon || 'star'}</span>
</div>
<span class="text-white text-2xl font-bold tracking-tight">${escapeHtml(t.name)}</span>
</div>
</div>`).join('\n');

  return `<div class="slider-container slider-edge-fade slider-row">
<div class="slider-track ${animClass} py-2">
<div class="marquee-content">
${cards}
</div>
<div class="marquee-content">
${cards}
</div>
</div>
</div>`;
}

function getAllServicesData() {
  if (!fs.existsSync(DATA_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  } catch (err) {
    console.error('Error reading services-data.json:', err);
    return {};
  }
}

function getServiceData(slug) {
  if (!slug) return null;
  const services = getAllServicesData();
  const clean = slug
    .replace(/\.html$/i, '')
    .replace(/^\/service(s)?\//i, '')
    .replace(/^\//, '')
    .trim()
    .toLowerCase();

  if (services[clean]) {
    return { key: clean, data: services[clean] };
  }

  // Lookup by filename or matching key
  for (const [key, item] of Object.entries(services)) {
    if (key.toLowerCase() === clean) {
      return { key, data: item };
    }
    if (item.filename && item.filename.replace(/\.html$/i, '').toLowerCase() === clean) {
      return { key, data: item };
    }
  }

  return null;
}

function renderServicePage(slug) {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('service-template.html not found!');
    return null;
  }

  const result = getServiceData(slug);
  if (!result) return null;

  const { key, data } = result;
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  let output = template;

  // Ensure <base href="/"> exists so assets (CSS, images, fonts) resolve properly on /service/:slug URLs
  if (!output.includes('<base href=')) {
    output = output.replace(/<head[^>]*>/i, '$&\n<base href="/">');
  }

  // 1. Meta / SEO
  output = output.replace(/\{\{PAGE_TITLE\}\}/g, escapeHtml(data.meta?.title || '7xGrow Digital Agency'));
  output = output.replace(/\{\{META_DESCRIPTION\}\}/g, escapeHtml(data.meta?.description || ''));
  output = output.replace(/\{\{META_KEYWORDS\}\}/g, escapeHtml(data.meta?.keywords || ''));
  output = output.replace(/\{\{SERVICE_TYPE\}\}/g, escapeHtml(data.hero?.badge || key));
  output = output.replace(/\{\{SERVICE_SCHEMA_DESC\}\}/g, escapeHtml(data.meta?.description || ''));

  // 2. Hero Section
  output = output.replace(/\{\{HERO_BADGE\}\}/g, escapeHtml(data.hero?.badge || 'Service Hub'));
  output = output.replace(/\{\{HERO_TITLE\}\}/g, escapeHtml(data.hero?.title || ''));
  output = output.replace(/\{\{HERO_GRADIENT_TITLE\}\}/g, escapeHtml(data.hero?.gradientTitle || ''));
  output = output.replace(/\{\{HERO_DESC\}\}/g, escapeHtml(data.hero?.desc || ''));
  output = output.replace(/\{\{HERO_CTA1_TEXT\}\}/g, escapeHtml(data.hero?.cta1Text || 'Claim Free Audit'));
  output = output.replace(/\{\{HERO_CTA1_LINK\}\}/g, escapeHtml(data.hero?.cta1Link || '#roadmapForm'));
  output = output.replace(/\{\{HERO_CTA2_TEXT\}\}/g, escapeHtml(data.hero?.cta2Text || 'Case Studies'));
  output = output.replace(/\{\{HERO_CTA2_LINK\}\}/g, escapeHtml(data.hero?.cta2Link || '#case-studies'));
  output = output.replace(/\{\{HERO_FORM_TITLE\}\}/g, escapeHtml(data.hero?.formTitle || 'Get a Custom Growth Roadmap'));
  output = output.replace(/\{\{HERO_FORM_BTN\}\}/g, escapeHtml(data.hero?.formBtn || 'Analyze My Business'));
  output = output.replace(/\{\{HERO_FORM_NOTE\}\}/g, escapeHtml(data.hero?.formNote || 'Privacy Guaranteed. 100% Free Consultation.'));

  // 3. Stats Section
  output = output.replace(/\{\{STATS_BADGE\}\}/g, escapeHtml(data.statsSection?.badge || 'WHY 7XGROW'));
  output = output.replace(/\{\{STATS_TITLE\}\}/g, escapeHtml(data.statsSection?.title || ''));
  output = output.replace(/\{\{STATS_GRADIENT_TITLE\}\}/g, escapeHtml(data.statsSection?.gradientTitle || ''));
  output = output.replace(/\{\{STATS_DESC\}\}/g, escapeHtml(data.statsSection?.desc || ''));

  const bulletsHtml = (data.statsSection?.bullets || []).map(b => `
<div class="flex items-center gap-4 text-white">
<span class="material-symbols-outlined text-primary font-bold">check_circle</span>
<span class="font-medium">${escapeHtml(b)}</span>
</div>`).join('\n');
  output = output.replace(/\{\{STATS_BULLETS_HTML\}\}/g, bulletsHtml);

  const statsHtml = (data.statsSection?.stats || []).map(s => `
<div class="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
<div class="text-4xl font-black text-white mb-2 stat-glow">${escapeHtml(s.num)}</div>
<div class="text-text-dim text-sm uppercase font-bold tracking-wider">${escapeHtml(s.label)}</div>
</div>`).join('\n');
  output = output.replace(/\{\{STATS_GRID_HTML\}\}/g, statsHtml);

  // 4. Subservices Accordion
  output = output.replace(/\{\{SUBSERVICES_HEADING\}\}/g, escapeHtml(data.subServices?.heading || 'Driving Growth through'));
  output = output.replace(/\{\{SUBSERVICES_GRADIENT_HEADING\}\}/g, escapeHtml(data.subServices?.gradientHeading || 'Specialized Services'));

  const accordionHtml = (data.subServices?.items || []).map((item, idx) => `
<details class="group border-b border-white/10 py-6 cursor-pointer" name="solutions"${idx === 0 ? ' open=""' : ''}>
<summary class="flex justify-between items-center text-3xl md:text-4xl font-bold text-white list-none group-open:text-primary transition-colors" onclick="window.location.href='${item.link}'" style="cursor:pointer;">
${escapeHtml(item.title)}
<span class="material-symbols-outlined text-white/30 group-open:text-primary expand-icon transition-transform duration-300">expand_more</span>
</summary>
<div class="mt-6 space-y-6">
<p class="text-text-dim text-lg leading-relaxed max-w-xl">
${escapeHtml(item.desc)}
</p>
<a class="inline-block text-center vibrant-learn-more px-8 py-3 rounded-full text-white font-bold text-sm hover:scale-105 transition-transform" href="${item.link}">Learn More</a>
</div>
</details>`).join('\n');
  output = output.replace(/\{\{SUBSERVICES_ACCORDION_HTML\}\}/g, accordionHtml);

  // 5. Tools & Tech
  output = output.replace(/\{\{TOOLS_BADGE\}\}/g, escapeHtml(data.tools?.badge || 'Tools & Tech'));
  output = output.replace(/\{\{TOOLS_TITLE\}\}/g, escapeHtml(data.tools?.title || 'Our Technology Arsenal'));
  output = output.replace(/\{\{TOOLS_DESC\}\}/g, escapeHtml(data.tools?.desc || 'Enterprise-grade tools for competitive advantage.'));
  output = output.replace(/\{\{TOOLS_ROW1_HTML\}\}/g, renderToolsRow(data.tools?.row1, 'animate-marquee-left'));
  output = output.replace(/\{\{TOOLS_ROW2_HTML\}\}/g, renderToolsRow(data.tools?.row2, 'animate-marquee-right'));

  // 6. Process Stepper
  output = output.replace(/\{\{PROCESS_BADGE\}\}/g, escapeHtml(data.process?.badge || 'Our Process'));
  output = output.replace(/\{\{PROCESS_TITLE\}\}/g, escapeHtml(data.process?.title || 'Growth Command Center'));
  output = output.replace(/\{\{PROCESS_DESC\}\}/g, escapeHtml(data.process?.desc || 'The central processing unit of your organic expansion.'));

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
<div class="process-number-circle text-white">${step.num}</div>
<div class="process-body-glass">
<h4 class="text-lg font-black text-white mb-8 text-center uppercase tracking-widest leading-tight">${escapeHtml(step.name || step.title)}</h4>
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

  output = output.replace(/\{\{PROCESS_STEPS_HTML\}\}/g, processConnectorSvg + '\n' + stepsCards);

  // 7. FAQs
  const faqsHtml = (data.faqs || []).map((faq, idx) => `
<details class="group bg-card-dark border border-border-dark rounded-xl p-6 cursor-pointer" name="faq"${idx === 0 ? ' open=""' : ''}>
<summary class="flex justify-between items-center text-white font-bold text-lg list-none">
${escapeHtml(faq.q)}
<span class="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-text-dim mt-4 leading-relaxed">${escapeHtml(faq.a)}</p>
</details>`).join('\n');
  output = output.replace(/\{\{FAQS_HTML\}\}/g, faqsHtml);

  // 8. CTA Section
  output = output.replace(/\{\{CTA_TITLE\}\}/g, escapeHtml(data.cta?.title || 'Ready to Scale?'));
  output = output.replace(/\{\{CTA_GRADIENT_TITLE\}\}/g, escapeHtml(data.cta?.gradientTitle || 'Dominate Your Market'));
  output = output.replace(/\{\{CTA_DESC\}\}/g, escapeHtml(data.cta?.desc || 'Get a complimentary audit and a custom growth roadmap today.'));
  output = output.replace(/\{\{CTA_BTN1\}\}/g, escapeHtml(data.cta?.btn1 || 'Request Free Audit'));
  output = output.replace(/\{\{CTA_BTN2\}\}/g, escapeHtml(data.cta?.btn2 || 'Contact Expert'));

  return output;
}

module.exports = {
  renderServicePage,
  getServiceData,
  getAllServicesData,
  escapeHtml
};

