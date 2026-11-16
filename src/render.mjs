// Bridle renderer: one icon definition -> line | solid | color | iso SVG, static or animated.
// Pure string output, no DOM, no dependencies: runs in Node (build), browsers (site) and React.

// name: [keyframes, timing, transform-origin]
const ANIMS = {
  spin: ['to{transform:rotate(360deg)}', '6s linear infinite', 'center'],
  'spin-fast': ['to{transform:rotate(360deg)}', '2.4s linear infinite', 'center', 'spin'],
  'spin-rev': ['to{transform:rotate(-360deg)}', '6s linear infinite', 'center'],
  pulse: ['0%,100%{transform:scale(1)}50%{transform:scale(1.14)}', '2s ease-in-out infinite', 'center'],
  beat: ['0%,40%,100%{transform:scale(1)}15%{transform:scale(1.18)}28%{transform:scale(1.06)}', '1.6s ease-out infinite', 'center'],
  float: ['0%,100%{transform:translateY(0)}50%{transform:translateY(-1.6px)}', '3s ease-in-out infinite', 'center'],
  sink: ['0%,100%{transform:translateY(0)}50%{transform:translateY(1.6px)}', '3s ease-in-out infinite', 'center'],
  draw: ['0%{stroke-dashoffset:1}45%,80%{stroke-dashoffset:0}100%{stroke-dashoffset:-1}', '3s ease-in-out infinite', 'center'],
  blink: ['0%,100%{opacity:1}50%{opacity:.15}', '1.6s ease-in-out infinite', 'center'],
  swing: ['0%,100%{transform:rotate(-10deg)}50%{transform:rotate(10deg)}', '2.4s ease-in-out infinite', 'top'],
  ring: ['0%,60%,100%{transform:rotate(0)}10%{transform:rotate(16deg)}20%{transform:rotate(-14deg)}30%{transform:rotate(10deg)}40%{transform:rotate(-6deg)}50%{transform:rotate(3deg)}', '2.6s ease-in-out infinite', 'top'],
  'slide-r': ['0%,100%{transform:translateX(0)}50%{transform:translateX(2px)}', '1.8s ease-in-out infinite', 'center'],
  'slide-l': ['0%,100%{transform:translateX(0)}50%{transform:translateX(-2px)}', '1.8s ease-in-out infinite', 'center'],
  'slide-u': ['0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}', '1.8s ease-in-out infinite', 'center'],
  'slide-d': ['0%,100%{transform:translateY(0)}50%{transform:translateY(2px)}', '1.8s ease-in-out infinite', 'center'],
  ping: ['0%{transform:scale(.6);opacity:1}80%,100%{transform:scale(1.5);opacity:0}', '2s cubic-bezier(0,0,.2,1) infinite', 'center'],
  wiggle: ['0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}', '.9s ease-in-out infinite', 'center'],
  grow: ['0%,100%{transform:scaleY(.45)}50%{transform:scaleY(1)}', '2.2s ease-in-out infinite', 'bottom'],
  dash: ['to{stroke-dashoffset:-6}', '1s linear infinite', 'center'],
  drop: ['0%{transform:translateY(-4px);opacity:0}30%,70%{transform:translateY(0);opacity:1}100%{transform:translateY(2px);opacity:0}', '2.4s ease-in-out infinite', 'center'],
  rise: ['0%{transform:translateY(3px);opacity:0}30%,70%{transform:translateY(0);opacity:1}100%{transform:translateY(-3px);opacity:0}', '2.4s ease-in-out infinite', 'center'],
  flip: ['0%,100%{transform:scaleX(1)}50%{transform:scaleX(-1)}', '3s ease-in-out infinite', 'center'],
  shake: ['0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-.8px)}40%,80%{transform:translateX(.8px)}', '.8s ease-in-out infinite', 'center'],
  pop: ['0%,100%{transform:scale(1)}50%{transform:scale(.82)}', '2s ease-in-out infinite', 'center'],
  tilt: ['0%,100%{transform:rotate(0)}50%{transform:rotate(-12deg)}', '2.4s ease-in-out infinite', 'center'],
  breathe: ['0%,100%{opacity:1}50%{opacity:.55}', '3s ease-in-out infinite', 'center'],
  'spin-slow': ['to{transform:rotate(360deg)}', '14s linear infinite', 'center', 'spin'],
  toggle: ['0%,35%,100%{transform:translateX(0)}50%,85%{transform:translateX(-9px)}', '3s ease-in-out infinite', 'center'],
  squash: ['0%,100%{transform:scaleX(1)}50%{transform:scaleX(.25)}', '3s ease-in-out infinite', 'center'],
  wave: ['0%,100%{transform:skewY(0)}50%{transform:skewY(-7deg)}', '1.8s ease-in-out infinite', 'left'],
  scan: ['0%,100%{transform:translateY(-4px)}50%{transform:translateY(4px)}', '2.4s ease-in-out infinite', 'center'],
  diag: ['0%,100%{transform:translate(0,0)}50%{transform:translate(1.6px,-1.6px)}', '1.8s ease-in-out infinite', 'center'],
  'diag-in': ['0%,100%{transform:translate(0,0)}50%{transform:translate(1.6px,1.6px)}', '1.8s ease-in-out infinite', 'center'],
  seesaw: ['0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}', '3s ease-in-out infinite', 'center'],
  'grow-x': ['0%,100%{transform:scaleX(.55)}50%{transform:scaleX(1)}', '2.2s ease-in-out infinite', 'left'],
  wink: ['0%,88%,100%{transform:scaleY(1)}94%{transform:scaleY(.08)}', '3.6s ease-in-out infinite', 'center'],
  flicker: ['0%,100%{transform:scale(1,1) skewX(0)}25%{transform:scale(1.04,.94) skewX(2deg)}50%{transform:scale(.97,1.07) skewX(-2deg)}75%{transform:scale(1.02,.97) skewX(1deg)}', '1.2s ease-in-out infinite', 'bottom'],
};
// iso-only motion for the whole tile
const HOVER = ['0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}', '3.4s ease-in-out infinite'];

export const ANIM_NAMES = Object.keys(ANIMS);

// ---- palettes ----
const hsl = (h, s, l, a) => `hsl(${((h % 360) + 360) % 360} ${s}% ${l}%${a == null ? '' : ` / ${a}`})`;
export function paletteFromHue(h, ah = h + 150) {
  return { l: hsl(h, 100, 88), m: hsl(h, 92, 64), d: hsl(h, 70, 30), dd: hsl(h, 65, 20), a: hsl(ah, 100, 62), ad: hsl(ah, 85, 34), al: hsl(ah, 100, 80), s: hsl(h, 85, 56), as: hsl(ah, 90, 48), k: hsl(h, 80, 46) };
}
export const CATEGORY_HUES = {
  saas: [262, 322], business: [22, 200], corporate: [186, 10], finance: [152, 44], banking: [222, 42], cards: [332, 268], crypto: [268, 178],
  interface: [240, 330], communication: [200, 28], devices: [212, 160], commerce: [12, 190], markets: [168, 38], defi: [288, 172], people: [32, 250], data: [196, 280], chain: [250, 160], trading: [275, 135],
  wallets: [265, 190], tokens: [280, 45], explorer: [235, 170], governance: [295, 150], lending: [160, 30], treasury: [140, 260], tax: [175, 330], everyday: [215, 40], manufacturing: [20, 210], hospitality: [8, 170], education: [45, 250], events: [330, 200], mobility: [195, 20], media: [320, 180], cloud: [205, 285], weather: [195, 45], social: [340, 210],
  marketing: [300, 40], ai: [258, 190], travel: [196, 24], property: [30, 205], legal: [225, 45], support: [170, 330], payments: [145, 265], wealth: [46, 215], gaming: [310, 165], esg: [130, 48], productivity: [218, 350], location: [350, 200],
};
export const PRESETS = {
  spectrum: null, // per-category
  sunset: [16, 330], ocean: [205, 168], mint: [158, 280], grape: [282, 48], lava: [0, 40], gold: [42, 210], ice: [192, 230],
};
export function resolvePalette(icon, palette) {
  if (palette && typeof palette === 'object' && !Array.isArray(palette)) return palette;
  const pair = Array.isArray(palette) ? palette : typeof palette === 'number' ? [palette, palette + 150] : PRESETS[palette] || CATEGORY_HUES[icon.cat] || [262, 322];
  return paletteFromHue(pair[0], pair[1]);
}

// ---- element -> svg ----
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
function attrs(o) {
  let s = '';
  for (const k in o) if (o[k] != null && o[k] !== false) s += ` ${k}="${o[k]}"`;
  return s;
}
function animStyle(an, used, isDraw) {
  if (!an) return null;
  const [name, delay] = an.split(':');
  const A = ANIMS[name];
  if (!A) return null;
  const kf = A[3] || name;
  used.add(name);
  let s = `transform-box:fill-box;transform-origin:${A[2]};animation:bri-${kf} ${A[1]}${delay ? `;animation-delay:${delay}s` : ''}`;
  if (isDraw) s += ';stroke-dasharray:1 1';
  if (name === 'dash') s += ';stroke-dasharray:2 2';
  return s;
}
function shape(e, a) {
  switch (e.t) {
    case 'rect': return `<rect${attrs({ x: e.x, y: e.y, width: e.w, height: e.h, rx: e.rx || null })}${attrs(a)}/>`;
    case 'circle': return `<circle${attrs({ cx: e.cx, cy: e.cy, r: e.rad })}${attrs(a)}/>`;
    case 'ellipse': return `<ellipse${attrs({ cx: e.cx, cy: e.cy, rx: e.rx, ry: e.ry })}${attrs(a)}/>`;
    default: return `<path d="${e.d}"${attrs(a)}/>`;
  }
}
// paint(role) -> attribute object or null (skip). ctx: { anim: bool, used: Set }
function draw(els, paint, ctx) {
  let out = '';
  for (const e of els) {
    if (e.t === 'g') {
      const inner = draw(e.els, paint, ctx);
      if (!inner) continue;
      const st = ctx.anim ? animStyle(e.an, ctx.used) : null;
      let g = st ? `<g style="${st}">${inner}</g>` : inner;
      // scaled group: transform on an outer g (CSS animation transforms would override it), stroke kept at full weight
      if (e.tf) g = `<g transform="translate(${e.tf[1]} ${e.tf[2]}) scale(${e.tf[0]})" stroke-width="${+(ctx.sw / e.tf[0]).toFixed(3)}">${g}</g>`;
      out += g;
      continue;
    }
    // an open accent path is an accent-coloured stroke (role A), never a filled shape
    const role = e.t === 'path' && e.r === 'a' && !/z\s*$/i.test(e.d) ? 'A' : e.r;
    const a = role === 'x' ? { fill: 'none', stroke: 'none' } : paint(role, e);
    if (!a) continue;
    const isDraw = ctx.anim && e.an && e.an.startsWith('draw');
    const st = ctx.anim ? animStyle(e.an, ctx.used, isDraw) : null;
    out += shape(e, { ...a, pathLength: isDraw ? 1 : null, style: st });
  }
  return out;
}
function styleBlock(used, extra = '') {
  if (!used.size && !extra) return '';
  let css = '';
  const seen = new Set();
  for (const name of used) {
    const A = ANIMS[name], kf = A[3] || name;
    if (seen.has(kf)) continue;
    seen.add(kf);
    css += `@keyframes bri-${kf}{${A[0]}}`;
  }
  return `<style>${css}${extra}@media (prefers-reduced-motion:reduce){*{animation:none!important}}</style>`;
}


// ---- geometry: rough bounding boxes, used to decide which shapes occlude which in line style ----
const NUM = /[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g;
function pathBox(d) {
  const t = d.match(NUM) || [];
  let i = 0, cmd = '', x = 0, y = 0, sx = 0, sy = 0;
  const xs = [], ys = [];
  const num = () => +t[i++];
  const add = (px, py) => { xs.push(px); ys.push(py); };
  while (i < t.length) {
    if (/[a-zA-Z]/.test(t[i])) cmd = t[i++];
    const rel = cmd === cmd.toLowerCase(), C = cmd.toUpperCase();
    const bx = rel ? x : 0, by = rel ? y : 0;
    if (C === 'Z') { x = sx; y = sy; continue; }
    if (C === 'H') { x = num() + bx; add(x, y); continue; }
    if (C === 'V') { y = num() + by; add(x, y); continue; }
    const n = { M: 1, L: 1, T: 1, C: 3, S: 2, Q: 2, A: 0 }[C];
    if (C === 'A') {
      const rx = num(), ry = num(); i += 3;
      const nx = num() + bx, ny = num() + by;
      add(x, y); add(nx, ny); add((x + nx) / 2 + rx * 0.3, (y + ny) / 2 + ry * 0.3); add((x + nx) / 2 - rx * 0.3, (y + ny) / 2 - ry * 0.3);
      x = nx; y = ny; continue;
    }
    if (!n) { i++; continue; }
    for (let k = 0; k < n; k++) { const px = num() + bx, py = num() + by; add(px, py); if (k === n - 1) { x = px; y = py; } }
    if (C === 'M') { sx = x; sy = y; cmd = rel ? 'l' : 'L'; }
  }
  return xs.length ? [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)] : null;
}
const tfBox = (b, tf) => (b && tf ? [b[0] * tf[0] + tf[1], b[1] * tf[0] + tf[2], b[2] * tf[0] + tf[1], b[3] * tf[0] + tf[2]] : b);
function box(e) {
  if (e.t === 'g') return tfBox(e.els.map(box).filter(Boolean).reduce((a, b) => [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.max(a[2], b[2]), Math.max(a[3], b[3])], [99, 99, -99, -99]), e.tf);
  if (e.r === 'x') return null;
  if (e.t === 'rect') return [e.x, e.y, e.x + e.w, e.y + e.h];
  if (e.t === 'circle') return [e.cx - e.rad, e.cy - e.rad, e.cx + e.rad, e.cy + e.rad];
  if (e.t === 'ellipse') return [e.cx - e.rx, e.cy - e.ry, e.cx + e.rx, e.cy + e.ry];
  return pathBox(e.d);
}
const hasShape = (e) => (e.t === 'g' ? e.els.some(hasShape) : (e.r === 'b' || e.r === 'a') && !(e.t === 'path' && !/z\s*$/i.test(e.d)));
const inside = (a, b) => a && b && a[0] >= b[0] - 0.05 && a[1] >= b[1] - 0.05 && a[2] <= b[2] + 0.05 && a[3] <= b[3] + 0.05;
const meets = (a, b) => a && b && a[0] < b[2] + 1.5 && b[0] < a[2] + 1.5 && a[1] < b[3] + 1.5 && b[1] < a[3] + 1.5;

// Which details sit on top of a body (drawn dark) versus over empty space (drawn light)? Decided once per icon from
// bounding boxes, so colour and iso need no <mask>: masks re-rasterise every frame when anything inside them moves.
const ON_BODY = new WeakMap();
function onBody(icon) {
  let m = ON_BODY.get(icon);
  if (m) return m;
  m = new Map();
  const shapes = [], details = [];
  const walk = (els, tf) => {
    for (const e of els) {
      if (e.t === 'g') {
        const t2 = e.tf ? (tf ? [tf[0] * e.tf[0], tf[1] + e.tf[1] * tf[0], tf[2] + e.tf[2] * tf[0]] : e.tf) : tf;
        walk(e.els, t2);
        continue;
      }
      const b = tfBox(box(e), tf);
      if (!b) continue;
      const closed = !(e.t === 'path' && !/z\s*$/i.test(e.d));
      if ((e.r === 'b' || e.r === 'a') && closed) shapes.push(b);
      else if (e.r === 'd' || e.r === 'f') details.push([e, b]);
    }
  };
  walk(icon.els, null);
  const within = (a, b) => a[0] >= b[0] - 0.6 && a[1] >= b[1] - 0.6 && a[2] <= b[2] + 0.6 && a[3] <= b[3] + 0.6;
  for (const [e, b] of details) m.set(e, shapes.some((sb) => within(b, sb)));
  ON_BODY.set(icon, m);
  return m;
}

let counter = 0;
const ROUND = { 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };

/**
 * renderSvg(icon, { variant: 'line'|'solid'|'color'|'iso', animated, palette, strokeWidth, size, uid, title })
 */
export function renderSvg(icon, opt = {}) {
  const variant = opt.variant || 'line';
  const sw = opt.strokeWidth ?? 1.5;
  const uid = opt.uid || `bri-${icon.name}-${(++counter).toString(36)}`;
  const ctx = { anim: !!opt.animated, used: new Set(), sw };
  const size = opt.size ?? (variant === 'iso' ? 64 : 24);
  const title = opt.title === false ? '' : `<title>${esc(opt.title || icon.name.replace(/-/g, ' '))}</title>`;
  const head = (vb, extra = {}) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${size}" height="${size}"${attrs(extra)} role="img">${title}`;
  const isShape = (r) => r === 'b' || r === 'a';

  if (variant === 'line') {
    // later shapes knock a gap out of earlier strokes they overlap, unless they sit wholly inside them
    const paint = (r) => (r === 'h' ? null : r === 'f' ? { fill: 'currentColor', stroke: 'none' } : {});
    const units = icon.els, boxes = units.map(box);
    let body = '', defs = '';
    units.forEach((u, i) => {
      // Animated renders skip the knock-out masks: anything moving under a mask is recomposited every frame.
      const cut = ctx.anim ? [] : units.map((v, j) => j).filter((j) => j > i && hasShape(units[j]) && meets(boxes[i], boxes[j]) && !inside(boxes[j], boxes[i]) && !inside(boxes[i], boxes[j]));
      const inner = draw([u], paint, ctx);
      if (!cut.length || !inner) { body += inner; return; }
      const id = `${uid}k${i}`;
      const still = { ...ctx, anim: false, sw: sw + 2.2 }; // knock-outs stay static: animated mask content repaints every frame
      const knock = cut.map((j) => draw([units[j]], (r) => ((r === 'b' || r === 'a') ? { fill: '#000', stroke: '#000' } : null), still)).join('');
      defs += `<mask id="${id}" maskUnits="userSpaceOnUse" x="-2" y="-2" width="28" height="28"><rect x="-2" y="-2" width="28" height="28" fill="#fff" stroke="none"/><g stroke-width="${sw + 2.2}"${attrs(ROUND)}>${knock}</g></mask>`;
      body += `<g mask="url(#${id})">${inner}</g>`;
    });
    if (defs) body = `<defs>${defs}</defs>` + body;
    return head('0 0 24 24', { fill: 'none', stroke: 'currentColor', 'stroke-width': sw, ...ROUND }) + styleBlock(ctx.used) + body + '</svg>';
  }

  if (variant === 'solid' && ctx.anim) {
    // Mask-free motion: cut-outs are painted in a knockout colour (CSS var --bri-knockout, default white) so nothing
    // animates inside a <mask>. Static solid keeps true transparent cut-outs.
    const ko = 'var(--bri-knockout, #fff)';
    const ob = onBody(icon);
    const body = draw(icon.els, (r, e) => {
      if (r === 'b') return { fill: 'currentColor', stroke: 'currentColor' };
      if (r === 'a') return { fill: 'currentColor', stroke: ko };
      if (r === 'd' || r === 'A') return { fill: 'none', stroke: ob.get(e) || r === 'A' ? ko : 'currentColor' };
      if (r === 'f') return { fill: ob.get(e) ? ko : 'currentColor', stroke: 'none' };
      return null;
    }, ctx);
    return head('0 0 24 24', { fill: 'none', stroke: 'currentColor', 'stroke-width': sw, ...ROUND }) + styleBlock(ctx.used) + body + '</svg>';
  }

  if (variant === 'solid') {
    // mask A: shapes white, details/dots/shine cut black. mask B: inverse of shapes, so lone details stay ink.
    const sil = draw(icon.els, (r) => (r === 'b' ? { fill: '#fff', stroke: '#fff' } : r === 'a' ? { fill: '#fff', stroke: '#000' } : r === 'x' ? { fill: 'none' } : { fill: r === 'f' ? '#000' : 'none', stroke: r === 'f' ? 'none' : '#000' }), ctx);
    const inv = draw(icon.els, (r) => (isShape(r) ? { fill: '#000', stroke: '#000' } : r === 'x' ? { fill: 'none' } : null), ctx);
    const lone = draw(icon.els, (r) => (r === 'd' || r === 'A' ? { fill: 'none' } : r === 'f' ? { fill: 'currentColor', stroke: 'none' } : r === 'x' ? { fill: 'none', stroke: 'none' } : null), ctx);
    const g = { 'stroke-width': sw, ...ROUND };
    return head('0 0 24 24', { fill: 'none', stroke: 'currentColor', 'stroke-width': sw, ...ROUND }) + styleBlock(ctx.used) +
      `<defs><mask id="${uid}m" maskUnits="userSpaceOnUse" x="-2" y="-2" width="28" height="28"><g${attrs(g)}>${sil}</g></mask>` +
      `<mask id="${uid}n" maskUnits="userSpaceOnUse" x="-2" y="-2" width="28" height="28"><rect x="-2" y="-2" width="28" height="28" fill="#fff"/><g${attrs(g)}>${inv}</g></mask></defs>` +
      `<rect x="-2" y="-2" width="28" height="28" fill="currentColor" stroke="none" mask="url(#${uid}m)"/><g mask="url(#${uid}n)">${lone}</g></svg>`;
  }

  const p = resolvePalette(icon, opt.palette);

  // details sit dark on top of bodies and light where they cross empty space (see onBody)
  const ob = onBody(icon);
  // innerWidth: optional thinner stroke for details engraved on a body (iso uses chunky ribbons elsewhere)
  const split = (inner, lone, innerWidth) => draw(icon.els, (r, e) => {
    if (r !== 'd' && r !== 'f') return null;
    const on = ob.get(e), c = on ? inner : lone;
    return r === 'f' ? { fill: c, stroke: 'none' } : { fill: 'none', stroke: c, 'stroke-width': on && innerWidth ? innerWidth : null };
  }, ctx);
  const grad = (id, a, b, ex = '') => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"${ex}><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;

  if (variant === 'color') {
    const defs = `<defs>${grad(uid + 'g', p.l, p.m)}${grad(uid + 'a', p.al, p.a)}</defs>`;
    const shapes = draw(icon.els, (r) => (r === 'b' ? { fill: `url(#${uid}g)`, stroke: p.s } : r === 'a' ? { fill: `url(#${uid}a)`, stroke: p.as } : null), ctx);
    const shine = draw(icon.els, (r) => (r === 'h' ? { fill: 'none', stroke: '#fff', 'stroke-opacity': '.9' } : null), ctx);
    const body = shapes + split(p.d, p.s) + draw(icon.els, (r) => (r === 'A' ? { fill: 'none', stroke: p.as } : null), ctx) + shine;
    return head('0 0 24 24', { fill: 'none', 'stroke-width': sw, ...ROUND }) + styleBlock(ctx.used) + defs + body + '</svg>';
  }

  // ---- iso: thin layered glass plates standing in isometric space, accents floating in front; viewBox 64 ----
  {
    const up = opt.iso !== 'flat'; // default: upright extruded object; 'flat' lays it in the ground plane
    const S = 1.36, oy = 31 - 12 * 1.36;           // flat: glyph grid 0..24 maps to a 56 px diamond centred at (32, 31)
    const U = 1.3;                                  // upright: front face sheared onto the right-facing plane
    const ux = 32 - 0.866 * U * 12 - 0.5, uy = 31.5 - U * 12 - 0.5 * U * 12;
    const M = (dy = 0) => up
      ? `matrix(${0.866 * U} ${0.5 * U} 0 ${U} ${(ux + 0.866 * U * dy * 0.62).toFixed(2)} ${(uy - 0.5 * U * dy * 0.62).toFixed(2)})`
      : `matrix(${0.866 * S} ${0.5 * S} ${-0.866 * S} ${0.5 * S} 32 ${(oy + dy).toFixed(2)})`;
    const gw = Math.max(sw, 1.5) * 1.12;            // close to the flat stroke weight: fine, not chunky
    ctx.sw = gw;
    // Layered glass: each top-level unit is a thin plate. Bodies sit on the base plane; pure-accent units float in
    // front of it, so depth comes from separation and soft edges rather than from thick blocks.
    const D = 2.2, LIFT = 3.4, step = (opt.size ?? 64) >= 160 && !opt.animated ? 0.55 : 1.1;
    const G = (dy, inner) => `<g transform="${M(dy)}" stroke-width="${gw.toFixed(2)}"${attrs(ROUND)}>${inner}</g>`;
    const sideB = `url(#${uid}sb)`, sideA = `url(#${uid}sa)`;
    const has = (e, r) => (e.t === 'g' ? e.els.some((x) => has(x, r)) : e.r === r && !(r === 'a' && e.t === 'path' && !/z\s*$/i.test(e.d)));
    const sidePaint = (r, e) => (r === 'h' || ((r === 'd' || r === 'f') && ob.get(e)) ? null
      : r === 'a' ? { fill: sideA, stroke: sideA } : r === 'A' ? { fill: 'none', stroke: sideA }
      : r === 'b' ? { fill: sideB, stroke: sideB } : r === 'f' ? { fill: sideB, stroke: 'none' } : { fill: 'none', stroke: sideB });
    const topPaint = (r, e) => {
      if (r === 'b') return { fill: `url(#${uid}g)`, stroke: `url(#${uid}e)` };
      if (r === 'a') return { fill: `url(#${uid}a)`, stroke: p.al, 'stroke-width': +(gw * 0.7).toFixed(2) };
      if (r === 'A') return { fill: 'none', stroke: `url(#${uid}a)` };
      if (r === 'h') return { fill: 'none', stroke: '#fff', 'stroke-opacity': '.95' };
      const on = ob.get(e), c = on ? p.d : `url(#${uid}e)`;
      return r === 'f' ? { fill: on ? p.d : p.m, stroke: 'none' } : { fill: 'none', stroke: c, 'stroke-width': on ? +(gw * 0.82).toFixed(2) : null };
    };
    let glyph = '';
    const anyBody = icon.els.some((u) => has(u, 'b'));
    // sheen and contact shadows are invisible on small layered tiles and cost paint time in big grids
    const fine = !(opt.layer && (opt.size ?? 64) < 120);
    for (const u of icon.els) {
      const lifted = has(u, 'a') && !has(u, 'b');
      const z = lifted ? -LIFT : 0;
      // a floating accent casts a soft contact shadow onto the plate behind it
      if (fine && lifted && anyBody) glyph += G(0.35, draw([u], (r) => (r === 'a' ? { fill: p.dd, stroke: p.dd, opacity: '.16' } : null), ctx));
      const ext = draw([u], sidePaint, ctx);
      if (ext) for (let k = D; k > 0.01; k -= step) glyph += G(z + k, ext);
      glyph += G(z, draw([u], topPaint, ctx));
      // glass sheen: a diagonal white sweep across each body face
      if (fine && has(u, 'b')) glyph += G(z, draw([u], (r) => (r === 'b' ? { fill: `url(#${uid}w)`, stroke: 'none' } : null), ctx));
    }
    const shadow = up ? `<ellipse cx="33" cy="56.5" rx="19" ry="5" fill="url(#${uid}q)"/>` : `<ellipse cx="32" cy="${(31 + D + 3).toFixed(1)}" rx="27" ry="13" fill="url(#${uid}q)"/>`;
    const ah = (p.a.match(/hsl\((\d+)/) || [0, 0])[1], h = (p.m.match(/hsl\((\d+)/) || [0, 0])[1];
    // side gradients run across the object in screen space: lit left faces, shaded right faces
    const side = (id, c1, c2) => `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${up ? 0 : 24}" x2="24" y2="${up ? 24 : 0}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`;
    const defs = `<defs>` +
      `<linearGradient id="${uid}g" gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="${p.l}"/><stop offset="1" stop-color="hsl(${h} 95% 76%)"/></linearGradient>` +
      `<linearGradient id="${uid}w" gradientUnits="userSpaceOnUse" x1="3" y1="3" x2="17" y2="19"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".32" stop-color="#fff" stop-opacity=".18"/><stop offset=".33" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>` +
      `<linearGradient id="${uid}e" gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22"><stop offset="0" stop-color="hsl(${h} 95% 74%)"/><stop offset="1" stop-color="${p.s}"/></linearGradient>` +
      `<linearGradient id="${uid}a" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24"><stop offset="0" stop-color="${p.al}"/><stop offset="1" stop-color="${p.a}"/></linearGradient>` +
      side(uid + 'sb', `hsl(${h} 85% 60%)`, `hsl(${h} 72% 40%)`) + side(uid + 'sa', `hsl(${ah} 88% 54%)`, `hsl(${ah} 78% 38%)`) +
      `<radialGradient id="${uid}q"><stop offset="0" stop-color="${p.dd}" stop-opacity=".26"/><stop offset=".6" stop-color="${p.dd}" stop-opacity=".08"/><stop offset="1" stop-color="${p.dd}" stop-opacity="0"/></radialGradient></defs>`;
    // opt.layer splits the icon for compositing: 'base' = shadow, 'glyph' = object without its float, so a page can
    // float the object with a GPU transform instead of repainting the whole SVG each frame.
    if (opt.layer === 'base') return head('0 0 64 64', { fill: 'none' }) + defs + shadow + '</svg>';
    if (opt.layer === 'glyph') return head('0 0 64 64', { fill: 'none' }) + styleBlock(ctx.used) + defs + glyph + '</svg>';
    const A = ctx.anim;
    const extra = A ? `@keyframes bri-hover{${HOVER[0]}}` : '';
    return head('0 0 64 64', { fill: 'none' }) + styleBlock(ctx.used, extra) + defs + shadow + `<g${A ? ` style="animation:bri-hover ${HOVER[1]}"` : ''}>${glyph}</g></svg>`;
  }

}

export const VARIANTS = ['line', 'solid', 'color', 'iso'];
