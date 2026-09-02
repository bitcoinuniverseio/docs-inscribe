// Minimal static server for dist/, mounted at the site's base path.
// Used by the accessibility audit so it does not depend on the dev toolchain
// starting within a fixed window on a loaded machine.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const BASE = '/docs-inscribe';
const PORT = Number(process.env.PORT ?? 4323);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.wasm': 'application/wasm',
  '.pf_meta': 'application/octet-stream',
  '.pf_fragment': 'application/octet-stream',
  '.pf_index': 'application/octet-stream',
};

async function resolveFile(pathname) {
  let p = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  if (p === '' || p === '/') p = '/index.html';
  let file = join(root, decodeURIComponent(p));
  try {
    const s = await stat(file);
    if (s.isDirectory()) file = join(file, 'index.html');
    return file;
  } catch {
    for (const candidate of [`${file}.html`, join(file, 'index.html')]) {
      try {
        await stat(candidate);
        return candidate;
      } catch {
        /* keep looking */
      }
    }
    return null;
  }
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  const file = await resolveFile(pathname);
  if (!file) {
    const notFound = join(root, '404.html');
    try {
      res.writeHead(404, { 'content-type': TYPES['.html'] });
      res.end(await readFile(notFound));
    } catch {
      res.writeHead(404).end('not found');
    }
    return;
  }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
  res.end(await readFile(file));
}).listen(PORT, () => {
  process.stdout.write(`serving dist at http://localhost:${PORT}${BASE}/\n`);
});
