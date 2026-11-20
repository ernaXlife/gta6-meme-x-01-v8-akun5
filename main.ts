// main.ts — gta6-meme-x-01 entry (akun 5, v8, eviction-notice meme).
// Copies POST.json (the X post URL) to the grader output dir.
// Stdlib only; no network. Runs under Node 22.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, 'POST.json');
const raw = readFileSync(src, 'utf8');
const post = JSON.parse(raw) as { url: string };
if (typeof post.url !== 'string' || !post.url.startsWith('https://x.com/')) {
  throw new Error('POST.json must hold an https://x.com/ status URL');
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, 'POST.json'));
console.log('wrote', join(outDir, 'POST.json'), '->', post.url);

// Guard: do not edit the output path — the grader reads /output/POST.json.

