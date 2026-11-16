// Contact sheet PNG for reviewing drawings (box 1 only; needs @resvg/resvg-js in ~/bisect/tools/resvg):
//   node scripts/png.mjs <category|name,name,...> out.png [cols]
// Rows: icon name, line, solid, colour, iso. Rendered static at 2x.
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { ICONS, renderSvg } from '../src/index.mjs';
const { Resvg } = createRequire(process.env.HOME + '/bisect/tools/resvg/package.json')('@resvg/resvg-js');
const [sel, out = 'sheet.png', colsArg] = process.argv.slice(2);
const list = ICONS.filter((i) => i.cat === sel || sel.split(',').includes(i.name));
const cols = +colsArg || 6, W = 300, H = 104;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const cell = (i, k) => {
  const x = (k % cols) * W, y = Math.floor(k / cols) * H;
  const inner = (v, size, dx, dy) => renderSvg(i, { variant: v, size, uid: `${v}${k}`, title: false }).replace('<svg ', `<svg x="${x + dx}" y="${y + dy}" `);
  return `<rect x="${x + 2}" y="${y + 2}" width="${W - 4}" height="${H - 4}" rx="10" fill="#f6f6f4"/>` +
    `<text x="${x + 10}" y="${y + 16}" font-family="DejaVu Sans" font-size="11" fill="#333">${esc(i.name)}</text>` +
    `<g color="#111">${inner('line', 48, 8, 26)}${inner('solid', 48, 64, 26)}</g>${inner('color', 48, 120, 26)}${inner('iso', 96, 186, 4)}`;
};
const rows = Math.ceil(list.length / cols);
const sheet = `<svg xmlns="http://www.w3.org/2000/svg" width="${cols * W}" height="${rows * H}"><rect width="100%" height="100%" fill="#fff"/>${list.map(cell).join('')}</svg>`;
writeFileSync(out, new Resvg(sheet, { fitTo: { mode: 'zoom', value: 1.4 }, font: { loadSystemFonts: true } }).render().asPng());
console.log(`${list.length} icons -> ${out}`);
