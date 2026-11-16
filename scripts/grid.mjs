// Review grid: node scripts/grid.mjs out.html variant [animated] [size] [category]
import { writeFileSync } from 'node:fs';
import { ICONS, renderSvg } from '../src/index.mjs';
const [out, variant = 'color', anim = '0', size = '40', cat] = process.argv.slice(2);
const list = cat ? ICONS.filter((i) => i.cat === cat) : ICONS;
const cells = list.map((i) => `<div><span>${renderSvg(i, { variant, animated: anim === '1', size: +size })}</span><b>${i.name}</b></div>`).join('');
writeFileSync(out, `<!doctype html><meta charset=utf-8><style>body{margin:6px;background:${process.env.BG || '#0b0b10'};color:${process.env.FG || '#fff'};font:7px system-ui;display:flex;flex-wrap:wrap;gap:2px}div{width:${+size + 16}px;display:flex;flex-direction:column;align-items:center}b{font-weight:400;opacity:.6;white-space:nowrap;overflow:hidden;max-width:100%}</style>${cells}`);
