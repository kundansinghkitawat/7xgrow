const fs = require('fs');

let html = fs.readFileSync('seo.html', 'utf8');

// 1. Meta / Head
html = html.replace('<title>Search Engine Optimization Services | 7xGrow</title>', 
`<title>{{PAGE_TITLE}}</title>
<meta name="description" content="{{META_DESCRIPTION}}">
<meta name="keywords" content="{{META_KEYWORDS}}">`);

// 2. Schema LD+JSON
html = html.replace('"serviceType": "Advanced SEO"', '"serviceType": "{{SERVICE_TYPE}}"');
html = html.replace(
  '"description": "Advanced data-driven SEO services using the CLARITY framework for predictable growth."',
  '"description": "{{SERVICE_SCHEMA_DESC}}"'
);

// 3. Hero Section
const heroBadgeSearch = /<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-border-dark\/30 border border-white\/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">\s*<span class="w-2 h-2 rounded-full bg-primary animate-pulse"><\/span>\s*Advanced SEO Hub\s*<\/div>/;
html = html.replace(heroBadgeSearch, 
`<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-border-dark/30 border border-white/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
{{HERO_BADGE}}
</div>`);

const heroHeadingSearch = /<h1 class="text-white text-5xl md:text-7xl font-black leading-\[1\.1\] tracking-tight mb-6 font-display">\s*Data-Driven SEO for <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-purple">Predictable Growth<\/span>\s*<\/h1>/;
html = html.replace(heroHeadingSearch,
`<h1 class="text-white text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-6 font-display">
{{HERO_TITLE}} <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-purple">{{HERO_GRADIENT_TITLE}}</span>
</h1>`);

const heroDescSearch = /<p class="text-text-dim text-lg md:text-xl font-normal leading-relaxed max-w-xl mb-8">[\s\S]*?<\/p>/;
html = html.replace(heroDescSearch, `<p class="text-text-dim text-lg md:text-xl font-normal leading-relaxed max-w-xl mb-8">{{HERO_DESC}}</p>`);

const heroCtasSearch = /<div class="flex flex-col sm:flex-row gap-4">\s*<button class="px-8 py-4 glass-btn text-white font-bold rounded-xl text-lg">[\s\S]*?<\/button>\s*<button class="px-8 py-4 bg-white\/5 border border-white\/10 text-white font-bold rounded-xl text-lg hover:bg-white\/10 transition-all">[\s\S]*?<\/button>\s*<\/div>/;
html = html.replace(heroCtasSearch, 
`<div class="flex flex-col sm:flex-row gap-4">
<a href="{{HERO_CTA1_LINK}}" class="px-8 py-4 glass-btn text-white font-bold rounded-xl text-lg inline-flex items-center justify-center">{{HERO_CTA1_TEXT}}</a>
<a href="{{HERO_CTA2_LINK}}" class="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-lg hover:bg-white/10 transition-all inline-flex items-center justify-center">{{HERO_CTA2_TEXT}}</a>
</div>`);

const heroFormSearch = /<h3 class="text-2xl font-bold text-white mb-6">Get a Custom SEO Roadmap<\/h3>/;
html = html.replace(heroFormSearch, '<h3 class="text-2xl font-bold text-white mb-6">{{HERO_FORM_TITLE}}</h3>');

const heroFormBtnSearch = /<button class="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-\[0_10px_30px_rgba\(99,102,241,0\.3\)\]" type="submit">Analyze My Website<\/button>/;
html = html.replace(heroFormBtnSearch, '<button class="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-[0_10px_30px_rgba(99,102,241,0.3)]" type="submit">{{HERO_FORM_BTN}}</button>');

const heroFormNoteSearch = /<p class="text-text-dim text-xs mt-6 text-center">Privacy Guaranteed\. 100% Free SEO Consultation\.\s*<\/p>/;
html = html.replace(heroFormNoteSearch, '<p class="text-text-dim text-xs mt-6 text-center">{{HERO_FORM_NOTE}}</p>');

// 4. Why 7xGrow / Stats Section
const statsBadgeSearch = /<div class="inline-flex items-center gap-3 text-primary font-semibold tracking-wider text-sm uppercase mb-4">\s*<span class="w-2 h-2 rounded-full bg-primary animate-pulse"><\/span>WHY 7XGROW\s*<\/div>/;
html = html.replace(statsBadgeSearch, 
`<div class="inline-flex items-center gap-3 text-primary font-semibold tracking-wider text-sm uppercase mb-4">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>{{STATS_BADGE}}
</div>`);

const statsHeadingSearch = /<h2 class="text-4xl md:text-5xl font-black text-white leading-tight mb-8">\s*Your Strategic Partner for <br\/>\s*<span class="text-primary">SEO Dominance in India<\/span>\s*<\/h2>/;
html = html.replace(statsHeadingSearch,
`<h2 class="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
{{STATS_TITLE}} <br/><span class="text-primary">{{STATS_GRADIENT_TITLE}}</span>
</h2>`);

const statsDescSearch = /<div class="space-y-6 text-text-dim text-lg leading-relaxed">\s*<p>In a market of 1\.4 billion people[\s\S]*?<\/p>\s*<\/div>/;
html = html.replace(statsDescSearch,
`<div class="space-y-6 text-text-dim text-lg leading-relaxed">
<p>{{STATS_DESC}}</p>
</div>`);

const statsBulletsSearch = /<div class="mt-10 flex flex-col gap-4">\s*<div class="flex items-center gap-4 text-white">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div class="grid grid-cols-2 gap-6">/;
html = html.replace(statsBulletsSearch,
`<div class="mt-10 flex flex-col gap-4">
{{STATS_BULLETS_HTML}}
</div>
</div>
<div class="grid grid-cols-2 gap-6">`);

const statsGridSearch = /<div class="grid grid-cols-2 gap-6">\s*<div class="p-8 rounded-2xl bg-white\/5[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/;
html = html.replace(statsGridSearch,
`<div class="grid grid-cols-2 gap-6">
{{STATS_GRID_HTML}}
</div>
</div>
</section>`);

// 5. Subservices Section
const subservicesHeadingSearch = /<h2 class="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white leading-\[1\.15\] tracking-tight mb-6">\s*10\+ Years of Driving Significant Growth through <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-purple to-indigo-400">Data-Backed SEO<\/span>\s*<\/h2>/;
html = html.replace(subservicesHeadingSearch,
`<h2 class="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white leading-[1.15] tracking-tight mb-6">
{{SUBSERVICES_HEADING}} <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-purple to-indigo-400">{{SUBSERVICES_GRADIENT_HEADING}}</span>
</h2>`);

const subservicesAccordionSearch = /<div class="service-accordion space-y-0">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>\s*<section class="py-24 bg-gradient-to-br/;
html = html.replace(subservicesAccordionSearch,
`<div class="service-accordion space-y-0">
{{SUBSERVICES_ACCORDION_HTML}}
</div>
</div>
</section>
<section class="py-24 bg-gradient-to-br`);

// 6. Tools Section
const toolsSectionSearch = /<section class="py-24 border-y border-border-dark\/30 overflow-hidden">\s*<div class="max-w-7xl mx-auto px-6 mb-16 text-center">[\s\S]*?<\/div>\s*<\/section>\s*<section class="py-32 bg-gradient-to-b from-\[#0d161d\] via-\[#0f2642\]/;
html = html.replace(toolsSectionSearch,
`<section class="py-24 border-y border-border-dark/30 overflow-hidden">
<div class="max-w-7xl mx-auto px-6 mb-16 text-center">
<div class="inline-flex items-center gap-3 text-primary font-semibold tracking-wider text-sm uppercase mb-4">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>{{TOOLS_BADGE}}
</div>
<h2 class="text-4xl md:text-5xl font-black text-white mb-6">{{TOOLS_TITLE}}</h2>
<p class="text-text-dim text-lg">{{TOOLS_DESC}}</p>
</div>
<div class="flex flex-col gap-8 w-full">
{{TOOLS_ROW1_HTML}}
{{TOOLS_ROW2_HTML}}
</div>
</section>
<section class="py-32 bg-gradient-to-b from-[#0d161d] via-[#0f2642]`);

// 7. Process Section
const processSectionSearch = /<section class="py-32 bg-gradient-to-b from-\[#0d161d\] via-\[#0f2642\] to-\[#0d161d\] relative overflow-hidden" id="process">[\s\S]*?<\/section>\s*<section class="py-24" id="faq">/;
html = html.replace(processSectionSearch,
`<section class="py-32 bg-gradient-to-b from-[#0d161d] via-[#0f2642] to-[#0d161d] relative overflow-hidden" id="process">
<div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: radial-gradient(var(--primary) 1px, transparent 1px); background-size: 40px 40px;"></div>
<div class="max-w-7xl mx-auto px-6 relative z-10">
<div class="text-center mb-32">
<div class="inline-flex items-center gap-3 text-primary font-semibold tracking-wider text-sm uppercase mb-4">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>{{PROCESS_BADGE}}
</div>
<h2 class="text-5xl md:text-6xl font-black text-white mb-6">{{PROCESS_TITLE}}</h2>
<p class="text-text-dim text-lg max-w-2xl mx-auto font-light">{{PROCESS_DESC}}</p>
</div>
<div class="relative grid grid-cols-1 md:grid-cols-4 gap-8">
{{PROCESS_STEPS_HTML}}
</div>
</div>
</section>
<section class="py-24" id="faq">`);

// 8. FAQ Section
const faqsSearch = /<section class="py-24" id="faq">\s*<div class="max-w-3xl mx-auto px-6">[\s\S]*?<div class="space-y-4">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
html = html.replace(faqsSearch,
`<section class="py-24" id="faq">
<div class="max-w-3xl mx-auto px-6">
<div class="inline-flex items-center gap-3 text-primary font-semibold tracking-wider text-sm uppercase mb-4">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>FAQ
</div>
<h2 class="text-3xl md:text-5xl font-bold text-white mb-16 text-center">Frequently Asked Questions</h2>
<div class="space-y-4">
{{FAQS_HTML}}
</div>
</div>
</section>`);

// 9. CTA Section
const ctaSearch = /<section class="py-32 px-6 relative bg-gradient-to-br from-\[#0d161d\] via-\[#05090e\] to-\[#0d161d\] border-t border-border-dark\/30">[\s\S]*?<\/section>\s*<section class="py-24 bg-\[#080f15\] overflow-hidden" id="blog">/;
html = html.replace(ctaSearch,
`<section class="py-32 px-6 relative bg-gradient-to-br from-[#0d161d] via-[#05090e] to-[#0d161d] border-t border-border-dark/30">
<div class="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
<div class="max-w-5xl mx-auto text-center relative z-10">
<div class="mb-10 inline-flex items-center justify-center size-20 bg-primary/10 rounded-full border border-primary/20">
<span class="material-symbols-outlined text-primary text-4xl">trending_up</span>
</div>
<h2 class="text-4xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
{{CTA_TITLE}} <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">{{CTA_GRADIENT_TITLE}}</span>
</h2>
<p class="text-text-dim text-xl mb-12 max-w-2xl mx-auto">{{CTA_DESC}}</p>
<div class="flex flex-col sm:flex-row gap-6 justify-center">
<button class="px-12 py-5 glass-btn text-white font-black rounded-xl text-xl" onclick="var p = document.getElementById('popupOverlay'); if(p) p.classList.add('show');">{{CTA_BTN1}}</button>
<a href="contact us.html" class="px-12 py-5 bg-white/5 border border-white/10 text-white font-black rounded-xl hover:bg-white/10 transition-all text-xl inline-flex items-center justify-center">{{CTA_BTN2}}</a>
</div>
</div>
</section>
<section class="py-24 bg-[#080f15] overflow-hidden" id="blog">`);

fs.writeFileSync('service-template.html', html, 'utf8');
console.log('service-template.html created successfully! Length:', html.length);
