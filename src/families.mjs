// Status variants: a base icon shrunk into the top-left with an animated badge bottom-right, e.g. wallet-check.
// Generated, so every variant stays in step with its base drawing.
import { C, P, R, G, S, X, I, star, gear, arc } from './dsl.mjs';

const cx = 17.8, cy = 17.8;
const B = (an, ...glyph) => G(an, C(cx, cy, 4.2, 'a'), ...glyph);
export const BADGES = {
  add: ['plus new create', B('pop', P('M17.8 15.9v3.8M15.9 17.8h3.8'))],
  remove: ['minus delete subtract', B('pop', P('M15.9 17.8h3.8'))],
  check: ['done verified approved success', B(null, P('M16 17.9l1.2 1.2 2.4-2.6', 'd', 'draw'))],
  cancel: ['close rejected error x', B('shake', P('M16.5 16.5l2.6 2.6M19.1 16.5l-2.6 2.6'))],
  lock: ['locked secure private', B('pop', P('M16.8 17.1v-.7a1 1 0 0 1 2 0v.7'), R(16.2, 17.1, 3.2, 2.5, 0.6, 'f'))],
  clock: ['pending scheduled time waiting', B(null, P('M17.8 17.8v-1.8'), G('spin', X(cx, cy, 1.9), P('M17.8 17.8h1.4')))],
  star: ['favourite featured starred', B('beat', P(star(cx, 17.95, 2.4, 1.05), 'f'))],
  alert: ['warning attention issue', B('shake', P('M17.8 15.8v2.3'), C(17.8, 19.7, 0.55, 'f'))],
  search: ['find lookup scan', B('pop', C(17.5, 17.5, 1.4, 'd'), P('M18.5 18.5l1.2 1.2'))],
  settings: ['configure manage preferences', B(null, G('spin', P(gear(cx, cy, 2.5, 1.8, 6), 'd')))],
  edit: ['modify update write', B('wiggle', P('M16.1 19.5l.3-1.2 2.5-2.5 1 1-2.5 2.5Z', 'd'))],
  download: ['save export receive', B(null, G('slide-d', P('M17.8 15.7v3.9M16.3 18.2l1.5 1.5 1.5-1.5')))],
  upload: ['send import publish', B(null, G('slide-u', P('M17.8 19.9v-3.9M16.3 17.4l1.5-1.5 1.5 1.5')))],
  sync: ['refresh update reload', B(null, G('spin', X(cx, cy, 2.3), P(arc(cx, cy, 2.1, 40, 300)), P('M15.8 16.3l.2 1.3 1.3-.3')))],
  heart: ['love like saved', B('beat', P('M17.8 20.1s-2.4-1.4-2.4-3a1.2 1.2 0 0 1 2.4-.6 1.2 1.2 0 0 1 2.4.6c0 1.6-2.4 3-2.4 3Z', 'f'))],
  link: ['connect attach url', B('tilt', P('M17 18.6l1.6-1.6M16.4 17.7l-.5.5a1.2 1.2 0 0 0 1.7 1.7l.5-.5M19.2 17.9l.5-.5a1.2 1.2 0 0 0-1.7-1.7l-.5.5'))],
  user: ['owner assignee person account', B('pop', C(cx, 16.8, 1, 'd'), P('M16 19.8a1.8 1.8 0 0 1 3.6 0'))],
  shield: ['protected insured safe', B('pop', P('M17.8 15.5l2 .8v1.6c0 1.3-.9 2.2-2 2.6-1.1-.4-2-1.3-2-2.6v-1.6Z', 'd'))],
  bolt: ['instant fast power', B('blink', P('M18.3 15.4l-1.9 2.7h1.8l-.6 2.4 2-2.8h-1.8Z', 'f'))],
  eye: ['view watch visible preview', B('wink', P('M15.6 17.8s.9-1.5 2.2-1.5 2.2 1.5 2.2 1.5-.9 1.5-2.2 1.5-2.2-1.5-2.2-1.5Z', 'd'), C(cx, cy, 0.6, 'f'))],
};

export const BASES = [
  'wallet', 'crypto-wallet', 'bank', 'invoice', 'receipt', 'document', 'contract', 'folder', 'calendar', 'user', 'users',
  'building', 'briefcase', 'cart', 'store', 'package', 'truck', 'mail', 'chat', 'database', 'server', 'cloud', 'key',
  'coins', 'banknote', 'credit-card', 'vault', 'piggy-bank', 'money-bag', 'chart-bar', 'chart-line', 'chart-pie',
  'analytics', 'dashboard', 'block', 'token', 'nft', 'smart-contract', 'hardware-wallet', 'address', 'transaction', 'node',
  'validator', 'gas', 'stablecoin', 'statement', 'account', 'mortgage', 'ledger', 'tax', 'home', 'task', 'clipboard',
  'id-badge', 'laptop', 'phone', 'certificate', 'archive', 'book', 'tag', 'gold', 'savings-jar', 'cheque', 'atm',
  'pos-terminal', 'seed-phrase', 'api',
];

// strip a base's animations so only the badge moves (keeps variants calm and cheap)
const still = (els) => els.map((e) => (e.t === 'g' ? { ...e, an: undefined, els: still(e.els) } : { ...e, an: undefined }));

export function families(byName) {
  const out = [];
  for (const base of BASES) {
    const b = byName[base];
    if (!b) continue;
    for (const [k, [tags, badge]] of Object.entries(BADGES)) {
      const name = `${base}-${k}`;
      if (byName[name]) continue;
      out.push({ ...I(name, `${b.tags.join(' ')} ${tags}`, [S(0.78, 0.6, 0.6, ...still(b.els)), badge]), cat: b.cat, base, badge: k });
    }
  }
  return out;
}
