// compare looks: node scripts/cmp.mjs name,name out.png  -> columns: line 1.5, line 2, duo 2, solid, duotone 2, colour 2
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { byName, renderSvg } from '../src/index.mjs';
const { Resvg } = createRequire(process.env.HOME + '/bisect/tools/resvg/package.json')('@resvg/resvg-js');
const [names, out] = process.argv.slice(2);
const cols = [['line', 1.5], ['line', 2], ['duo', 2], ['solid', 2], ['duotone', 2], ['color', 2]];
const W = 84;
const list = names.split(',');
const cells = list.map((n, r) => cols.map(([v, sw], c) => renderSvg(byName[n], { variant: v, strokeWidth: sw, size: 56, uid: `u${r}${c}`, title: false }).replace('<svg ', `<svg x="${c * W + 14}" y="${r * W + 14}" `)).join('')).join('');
writeFileSync(out, new Resvg(`<svg xmlns="http://www.w3.org/2000/svg" width="${cols.length * W}" height="${list.length * W}" color="#111"><rect width="100%" height="100%" fill="#fff"/>${cells}</svg>`).render().asPng());
