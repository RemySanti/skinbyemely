/**
 * Generates favicons, app icons and the social share image from the brand fonts.
 * Fonts: Playfair Display 700 (SKIN) + Allura (by Emely), cached in scripts/fonts.
 * Run: npm run generate:icons
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import opentype from 'opentype.js';
import { Resvg } from '@resvg/resvg-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const FONTS_DIR = path.join(__dirname, 'fonts');
const OUT_DIR = path.join(ROOT, 'public');

const FONT_URLS = {
  playfair:
    'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiukDQ.ttf',
  allura:
    'https://fonts.gstatic.com/s/allura/v23/9oRPNYsQpS4zjuAPjA.ttf',
};

const COLORS = {
  charcoal: '#2c2c2c',
  ivory: '#faf8f5',
  bronze: '#b8956a',
  bronzeLight: '#d4bb8f',
  ink: '#171717',
  stone: '#737373',
};

async function loadFont(name, url) {
  const dest = path.join(FONTS_DIR, `${name}.ttf`);
  if (!fs.existsSync(FONTS_DIR)) fs.mkdirSync(FONTS_DIR, { recursive: true });
  if (!fs.existsSync(dest)) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to download ${name}: ${res.status}`);
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  }
  return opentype.parse(fs.readFileSync(dest));
}

/**
 * Path data for text whose ink is horizontally centred on cx, baseline at y.
 * Measured from the drawn glyph bounds: opentype.js 2.0 can emit NaN points
 * when getAdvanceWidth runs before a glyph's outline has been loaded.
 */
function centredText(font, text, cx, y, size) {
  const box = font.getPath(text, 0, y, size).getBoundingBox();
  const d = font
    .getPath(text, cx - (box.x1 + box.x2) / 2, y, size)
    .toPathData({ decimalPlaces: 2, flipY: false, optimize: false });
  if (d.includes('NaN')) throw new Error(`Bad outline for "${text}"`);
  return d;
}

/** Square app icon: SKIN over "by Emely", kept inside the maskable safe zone. */
function squareIcon({ playfair, allura }) {
  const s = 512;
  const skin = centredText(playfair, 'SKIN', s / 2, 268, 150);
  const script = centredText(allura, 'by Emely', s / 2, 362, 84);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}">
  <rect width="${s}" height="${s}" fill="${COLORS.charcoal}"/>
  <path fill="${COLORS.bronzeLight}" d="${skin}"/>
  <path fill="${COLORS.ivory}" d="${script}"/>
</svg>
`;
}

/** Tiny favicon: a single "S" stays legible at 16px where the full lockup can't. */
function monogramIcon({ playfair }) {
  const s = 64;
  const mark = centredText(playfair, 'S', s / 2, 50, 58);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}">
  <rect width="${s}" height="${s}" rx="12" fill="${COLORS.charcoal}"/>
  <path fill="${COLORS.bronzeLight}" d="${mark}"/>
</svg>
`;
}

/** 1200x630 share card for texts, social posts and link previews. */
function shareImage({ playfair, allura }) {
  const w = 1200;
  const h = 630;
  const skin = centredText(playfair, 'SKIN', w / 2, 330, 230);
  const script = centredText(allura, 'by Emely', w / 2, 440, 120);
  const tagline = centredText(playfair, 'HEALTHY SKIN FIRST', w / 2, 540, 30);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${COLORS.ivory}"/>
  <rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="none" stroke="${COLORS.bronzeLight}" stroke-width="2"/>
  <path fill="${COLORS.ink}" d="${skin}"/>
  <path fill="${COLORS.stone}" d="${script}"/>
  <path fill="${COLORS.bronze}" d="${tagline}"/>
</svg>
`;
}

function renderPng(svg, width) {
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
}

/** ICO container holding PNG images (supported by every current browser and crawler). */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, data } of pngs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

async function main() {
  const fonts = {
    playfair: await loadFont('playfair', FONT_URLS.playfair),
    allura: await loadFont('allura', FONT_URLS.allura),
  };
  const write = (name, data) => fs.writeFileSync(path.join(OUT_DIR, name), data);

  const square = squareIcon(fonts);
  const monogram = monogramIcon(fonts);

  write('favicon.svg', monogram);
  write('favicon.ico', buildIco([16, 32, 48].map((size) => ({ size, data: renderPng(monogram, size) }))));
  write('favicon-48x48.png', renderPng(square, 48));
  write('favicon-96x96.png', renderPng(square, 96));
  write('apple-touch-icon.png', renderPng(square, 180));
  write('icon-192.png', renderPng(square, 192));
  write('icon-512.png', renderPng(square, 512));
  write('og-image.png', renderPng(shareImage(fonts), 1200));

  console.log('Wrote favicons, app icons and og-image.png to public/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
