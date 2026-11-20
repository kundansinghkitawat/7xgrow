const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { renderServicePage, getServiceData, getAllServicesData } = require('./service-renderer');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

// Connected live-reload clients
const clients = new Set();

function notifyClients() {
  for (const res of clients) {
    try {
      res.write('data: reload\n\n');
    } catch {
      clients.delete(res);
    }
  }
}

// Watch project directory for changes
let reloadTimeout = null;
fs.watch(ROOT_DIR, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  // Ignore node_modules, git, and log files
  if (filename.includes('node_modules') || filename.startsWith('.') || filename.endsWith('.log')) return;
  
  const ext = path.extname(filename).toLowerCase();
  if (filename.endsWith('services-data.json') || filename.endsWith('service-template.html')) {
    try {
      const { buildAllServices } = require('./build-services');
      buildAllServices();
    } catch (e) {
      console.error('Auto-rebuild error:', e);
    }
  }

  if (['.html', '.css', '.js', '.json'].includes(ext)) {
    clearTimeout(reloadTimeout);
    reloadTimeout = setTimeout(() => {
      console.log(`[Reload] File changed: ${filename}`);
      notifyClients();
    }, 150);
  }
});

const liveReloadScript = `
<script>
  (function() {
    const es = new EventSource('/__livereload');
    es.onmessage = function(e) {
      if (e.data === 'reload') {
        console.log('[LiveReload] Reloading page...');
        window.location.reload();
      }
    };
  })();
</script>
`;

const server = http.createServer((req, res) => {
  // Live reload endpoint
  if (req.url === '/__livereload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write('\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let decodedPath = decodeURIComponent(parsedUrl.pathname);

    // 1. Backend API Routes
    if (decodedPath === '/api/services' || decodedPath === '/api/services/') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(getAllServicesData(), null, 2));
      return;
    }
    if (decodedPath.startsWith('/api/services/')) {
      const slug = decodedPath.replace('/api/services/', '');
      const service = getServiceData(slug);
      if (service) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(service.data, null, 2));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Service not found' }));
      }
      return;
    }

    // If request has /service/ or /services/ prefix for a static asset (css, js, images, fonts), map to root
    if (decodedPath.startsWith('/service/') || decodedPath.startsWith('/services/')) {
      const sub = decodedPath.replace(/^\/service(s)?\//i, '');
      const ext = path.extname(sub).toLowerCase();
      if (ext && ext !== '.html') {
        decodedPath = '/' + sub;
      }
    }

    // 2. Dynamic Service Page Rendering (SSR)
    // Matches /service/:slug, /services/:slug, or direct /seo, /seo.html, etc.
    let potentialSlug = null;
    if (decodedPath.startsWith('/service/') || decodedPath.startsWith('/services/')) {
      potentialSlug = decodedPath.replace(/^\/service(s)?\//i, '');
    } else {
      const clean = decodedPath.replace(/^\//, '').replace(/\.html$/i, '').toLowerCase();
      if (clean && !path.extname(clean) && getServiceData(clean)) {
        potentialSlug = clean;
      }
    }

    if (potentialSlug) {
      const renderedHtml = renderServicePage(potentialSlug);
      if (renderedHtml) {
        let content = renderedHtml;
        if (content.includes('</body>')) {
          content = content.replace('</body>', `${liveReloadScript}</body>`);
        } else {
          content += liveReloadScript;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
        return;
      }
    }

    // 3. Static Files Handling
    // Map root to index.html
    if (decodedPath === '/' || decodedPath === '') {
      decodedPath = '/index.html';
    }

    let filePath = path.join(ROOT_DIR, decodedPath);

    // Check if file exists; if not, test with .html
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      if (fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
      } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
        filePath = path.join(filePath, 'index.html');
      }
    }

    // If still doesn't exist, serve 404.html if available
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      const notFoundPath = path.join(ROOT_DIR, '404.html');
      if (fs.existsSync(notFoundPath)) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        let content = fs.readFileSync(notFoundPath, 'utf8');
        content = content.replace('</body>', `${liveReloadScript}</body>`);
        res.end(content);
        return;
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    if (ext === '.html') {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('</body>')) {
        content = content.replace('</body>', `${liveReloadScript}</body>`);
      } else {
        content += liveReloadScript;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (err) {
    console.error('Server error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('500 Internal Server Error');
  }
});

let currentPort = PORT;

function startServer(portToTry) {
  server.listen(portToTry, '0.0.0.0', () => {
    const localUrl = `http://localhost:${portToTry}`;
    console.log(`===============================================`);
    console.log(`  🚀 7xGrow Dynamic SSR Server running at:`);
    console.log(`  👉 Local:   ${localUrl}`);
    console.log(`  ⚡ Dynamic Routes: /service/:slug (e.g. /service/seo, /service/google-ads)`);
    console.log(`  🔄 Live Reload is active`);
    console.log(`===============================================`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    currentPort = Number(currentPort) + 1;
    console.warn(`⚠️  Port ${currentPort - 1} is busy. Automatically switching to port ${currentPort}...`);
    setTimeout(() => {
      startServer(currentPort);
    }, 200);
  } else {
    console.error('Server error:', err);
  }
});

startServer(currentPort);
