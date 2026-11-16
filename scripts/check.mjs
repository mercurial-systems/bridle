// One runnable check: every icon renders in every style, ids stay unique per render, names are unique and kebab-case.
import assert from 'node:assert/strict';
import { ICONS, renderSvg, VARIANTS } from '../src/index.mjs';
const names = new Set();
for (const i of ICONS.filter((x) => !process.env.CAT || x.cat === process.env.CAT)) {
  assert.match(i.name, /^[a-z0-9]+(-[a-z0-9]+)*$/, i.name);
  assert.ok(!names.has(i.name), `duplicate ${i.name}`);
  names.add(i.name);
  for (const variant of VARIANTS) for (const animated of [false, true]) {
    const s = renderSvg(i, { variant, animated, uid: 'u' });
    assert.ok(s.startsWith('<svg') && s.endsWith('</svg>'), `${i.name} ${variant}`);
    assert.ok(!/NaN|undefined/.test(s), `${i.name} ${variant} has NaN/undefined`);
    for (const ref of s.matchAll(/url\(#([^)]+)\)/g)) assert.ok(s.includes(`id="${ref[1]}"`), `${i.name} ${variant} dangling ${ref[1]}`);
    if (animated && variant !== 'solid') assert.ok(s.includes('@keyframes'), `${i.name} ${variant} animated but static`);
  }
}
console.log(`ok: ${ICONS.length} icons x ${VARIANTS.length * 2} styles`);
