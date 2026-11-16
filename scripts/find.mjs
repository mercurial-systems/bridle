#!/usr/bin/env node
// Search Bridle by name and tags:  node scripts/find.mjs wallet send   -> name  [category]  tags
import { ICONS } from '../src/index.mjs';

const words = process.argv.slice(2).map((w) => w.toLowerCase());
if (!words.length) { console.error('usage: find.mjs <word> [word...]   (all words must match name or tags)'); process.exit(2); }
const hits = ICONS.filter((i) => {
  const hay = `${i.name} ${i.tags || ''}`.toLowerCase();
  return words.every((w) => hay.includes(w));
});
for (const i of hits.slice(0, 80)) console.log(`${i.name.padEnd(34)} [${i.cat}]  ${i.tags || ''}`);
if (hits.length > 80) console.log(`… ${hits.length - 80} more`);
if (!hits.length) console.log('no match');
