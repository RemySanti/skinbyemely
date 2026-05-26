/**
 * Generates path-based SVG logos (no web fonts required at runtime).
 * Fonts: Bodoni Moda 700 (SKIN) + Pinyon Script (by Emely)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import opentype from 'opentype.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const FONTS_DIR = path.join(__dirname, 'fonts');
const OUT_DIR = path.join(ROOT, 'public');

const FONT_URLS = {
  bodoni:
    'https://fonts.gstatic.com/s/bodonimoda/v28/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oandwIA.ttf',
  pinyon:
    'https://fonts.gstatic.com/s/pinyonscript/v24/6xKpdSJbL9-e9LuoeQiDRQR8aOI.ttf',
};

async function downloadFont(name, url) {
  const dest = path.join(FONTS_DIR, `${name}.ttf`);
  if (!fs.existsSync(FONTS_DIR)) fs.mkdirSync(FONTS_DIR, { recursive: true });
  if (!fs.existsSync(dest)) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to download ${name}: ${res.status}`);
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  }
  const buffer = fs.readFileSync(dest);
  return opentype.parse(buffer);
}

function pathData(font, text, x, y, size, options = {}) {
  const p = font.getPath(text, x, y, size, options);
  return p.toPathData(2);
}

function buildLogo({ skinFill, scriptFill, id, bodoniFont, pinyonFont }) {
  const skinSize = 64;
  const scriptSize = 30;
  const skinText = 'SKIN';
  const scriptText = 'by Emely';

  // Layout tuned to match live SiteLogo proportions
  const skinX = 8;
  const skinY = 58;
  const scriptX = 92;
  const scriptY = 78;

  const skinPath = pathData(bodoniFont, skinText, skinX, skinY, skinSize, {
    features: { liga: true },
  });
  const scriptPath = pathData(pinyonFont, scriptText, scriptX, scriptY, scriptSize);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248 88" fill="none" role="img" aria-labelledby="${id}-title">
  <title id="${id}-title">Skin by Emely</title>
  <path fill="${skinFill}" d="${skinPath}"/>
  <path fill="${scriptFill}" d="${scriptPath}"/>
</svg>
`;
}

async function main() {
  const bodoni = await downloadFont('bodoni', FONT_URLS.bodoni);
  const pinyon = await downloadFont('pinyon', FONT_URLS.pinyon);

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const header = buildLogo({
    id: 'logo-header',
    skinFill: '#171717',
    scriptFill: '#737373',
    bodoniFont: bodoni,
    pinyonFont: pinyon,
  });
  const footer = buildLogo({
    id: 'logo-footer',
    skinFill: '#d4bb8f',
    scriptFill: 'rgba(250, 248, 245, 0.8)',
    bodoniFont: bodoni,
    pinyonFont: pinyon,
  });

  fs.writeFileSync(path.join(OUT_DIR, 'logo.svg'), header);
  fs.writeFileSync(path.join(OUT_DIR, 'logo-footer.svg'), footer);

  console.log('Wrote public/logo.svg and public/logo-footer.svg');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
