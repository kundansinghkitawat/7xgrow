/**
 * 7xGrow Service Pages Generator / Static Exporter
 * Uses service-renderer.js to generate static .html files if needed for static hosting
 */

const fs = require('fs');
const path = require('path');
const { renderServicePage, getAllServicesData } = require('./service-renderer');

function buildAllServices() {
  const services = getAllServicesData();
  const keys = Object.keys(services);

  if (!keys.length) {
    console.error('No services found in services-data.json!');
    return;
  }

  console.log(`Starting build for ${keys.length} service pages...`);

  for (const key of keys) {
    const output = renderServicePage(key);
    if (!output) {
      console.warn(`Skipping ${key}: failed to render.`);
      continue;
    }

    const filename = services[key].filename || `${key}.html`;
    const targetFile = path.join(__dirname, filename);
    fs.writeFileSync(targetFile, output, 'utf8');
    console.log(`✓ Generated: ${filename} (${output.length.toLocaleString()} bytes)`);
  }

  console.log('✓ All service pages compiled successfully!');
}

if (require.main === module) {
  buildAllServices();
}

module.exports = { buildAllServices };
