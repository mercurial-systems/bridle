// compare iso looks: node scripts/isoproto.mjs name,name out.png
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { byName, renderSvg } from '../src/index.mjs';
const { Resvg } = createRequire(process.env.HOME + '/bisect/tools/resvg/package.json')('@resvg/resvg-js');
const [names, out] = process.argv.slice(2);
const list = names.split(',');
const W = 110, kinds = [undefined];
const cols = 8;
const cells = list.map((n, r) => kinds.map((k, c) => renderSvg(byName[n], { variant: 'iso', iso: k, size: 104, uid: `${r}${c}`, title: false }).replace('<svg ', `<svg x="${(r % cols) * W + 3}" y="${Math.floor(r / cols) * W + 3}" `)).join('')).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cols * W}" height="${Math.ceil(list.length / cols) * W}"><rect width="100%" height="100%" fill="#f6f6f3"/>${cells}</svg>`;
writeFileSync(out, new Resvg(svg).render().asPng());
