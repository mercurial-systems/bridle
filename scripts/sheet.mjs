// Contact sheet for eyeballing every icon in every style: node scripts/sheet.mjs out.html [category]
import { writeFileSync } from 'node:fs';
import { ICONS, renderSvg } from '../src/index.mjs';
const [out = 'sheet.html', cat] = process.argv.slice(2);
let list = cat ? ICONS.filter((i) => i.cat === cat) : ICONS;
if (process.env.ONLY) list = list.filter((i) => process.env.ONLY.split(',').includes(i.name));
const V = [['line', 0], ['solid', 0], ['color', 0], ['color', 1]];
let rows = list.map((i) => `<tr><td>${i.name}</td>${V.map(([v, a]) => `<td>${renderSvg(i, { variant: v, animated: !!a, size: +(process.env.FLAT || 40) })}</td>`).join('')}</tr>`).join('');
writeFileSync(out, `<!doctype html><meta charset=utf-8><style>body{background:#0b0b10;color:#ddd;font:12px system-ui}td{padding:4px 10px}td:nth-child(2),td:nth-child(3){color:#fff}tr:nth-child(odd){background:#13131b}</style><table>${rows}</table>`);
console.log(list.length, 'icons ->', out);
