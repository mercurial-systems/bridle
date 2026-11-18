import { Component, createRef, memo, useEffect, useRef, useState, type ReactNode } from 'react';
import { renderSvg } from 'bridle';
import { ICONS, GROUPS, STYLE_LIST, PRESET_SWATCHES, download, downloadPng, match, type Icon, type Look, type Variant } from '@/lib/bridle';
import { GITHUB, SITE, LiveSvg, fmt } from '@/lib/icon';
import { useVisible } from '@/lib/visible';

const N = ICONS.length;
const IDX = new Map<string, number>(ICONS.map((ic, i) => [ic.name, i]));
const BG = '#ECE8DF', INK = '#16140F', ACC = '#FF4A1C';
const INKS = { ink: INK, acc: ACC, blue: '#2B3BFF', green: '#0A7F52' } as const;
type InkId = keyof typeof INKS;
const PALS = [undefined, 'sunset', 'ocean', 'mint', 'grape'] as const;
const PAL_BG = ['conic-gradient(#7c5cff,#e94fb3,#ff8a3d,#2fbf71,#2aa7f0,#7c5cff)', ...PALS.slice(1).map((id) => { const c = PRESET_SWATCHES.find((p) => p.id === id)!.colors; return `linear-gradient(135deg,${c[0]},${c[1]})`; })];
const MONO = '"GeistPixel",ui-monospace,monospace';
const EX = IDX.has('wallet') ? 'wallet' : ICONS[0].name;
const AI_PROMPT = `Use Bridle icons in this project. Read ${SITE}/llms.txt for the install steps, the API and every icon name, then pick the icons that fit.`;
const PATHS = { set: '/', index: '/icons', docs: '/docs', license: '/license' } as const;
type View = keyof typeof PATHS;
// the field walks the set in a fixed shuffled order so neighbours come from different collections
const ORDER = ICONS.map((_, i) => (i * 1223) % N);
const L = (a: number, b: number, k: number) => a + (b - a) * k;

function fromLoc(): { view: View; sel: number | null } {
  const p = location.pathname;
  const view: View = p.startsWith('/icons') ? 'index' : p.startsWith('/docs') || p.startsWith('/use') ? 'docs' : p.startsWith('/license') ? 'license' : 'set';
  return { view, sel: IDX.get(new URLSearchParams(location.search).get('icon') || '') ?? null };
}

type S = { q: string; sel: number | null; view: View; cut: Variant; weight: number; corner: 'round' | 'square'; size: number; color: InkId; pal: number; motion: boolean; tab: string; fw: string; cat: string; copied: string; W: number; H: number; settled: boolean };
type Ent = { cv?: HTMLCanvasElement; key: string; want?: string; a: number; t: number };
type Pt = { k: number; x: number; y: number; s: number };

/* ------------------------------------------------------------ index pieces */
const Tile = memo(function Tile({ icon, k, look, onOpen }: { icon: Icon; k: number; look: Partial<Look>; onOpen: (k: number, el: HTMLElement) => void }) {
  const [h, setH] = useState(false);
  return (
    <button className="tile" aria-label={icon.name} onClick={(e) => onOpen(k, e.currentTarget)} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <LiveSvg icon={icon} look={look} size={31} hover={h} /><span>{icon.name}</span>
    </button>
  );
});

// a collection only builds its tiles once it scrolls near the screen
function Sect({ title, n, children }: { title: string; n: number; children: () => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const vis = useVisible(ref);
  const [seen, setSeen] = useState(false);
  useEffect(() => { if (vis) setSeen(true); }, [vis]);
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, borderBottom: '1px solid var(--ink)', paddingBottom: 8 }}>
        <h2 className="disp" style={{ fontSize: 36, lineHeight: 1 }}>{title}</h2>
        <span className="lab mute">{String(n).padStart(2, '0')}</span>
      </div>
      {seen ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(92px,1fr))' }}>{children()}</div> : <div style={{ height: Math.ceil(n / 8) * 96 }} />}
    </div>
  );
}

/* ------------------------------------------------------------------- app */
export default class App extends Component<object, S> {
  state: S = { q: '', ...fromLoc(), cut: 'line', weight: 2, corner: 'round', size: 30, color: 'ink', pal: 0, motion: false, tab: 'svg', fw: 'react', cat: 'all', copied: '', W: 1200, H: 800, settled: false };
  cvRef = createRef<HTMLCanvasElement>(); inRef = createRef<HTMLInputElement>(); dockRef = createRef<HTMLDivElement>(); idxRef = createRef<HTMLInputElement>(); liveRef = createRef<HTMLDivElement>();
  ctx: CanvasRenderingContext2D | null = null;
  fly = ICONS.map(() => ({ x: 0, y: 0, s: 0, a: 0, on: false }));
  cam = { x: 40, y: 20 }; vel = { x: 0, y: 0 }; mouse = { x: -9999, y: -9999 };
  pos: Record<number, Pt> = {}; slots: { k: number; x: number; y: number; r: number }[] = [];
  dim = 1; clr = 1; lensK = 0; W = 1200; H = 800; dpr = 1; raf = 0; fno = 0; still = 0;
  hover: (Pt & { i: number; j: number }) | null = null; origin: Pt | null = null; drag: { x: number; y: number; m: number } | null = null;
  rs = 0; rsS = 0; rmax = 0; liveK = -1;
  bm = new Map<number, Ent>(); flight = 0; lk = ''; res = 48;
  big: { k: number; cv: HTMLCanvasElement } | null = null; bigKey = '';
  ac = new AbortController(); ro?: ResizeObserver; ct = 0;
  _mq?: string; _m: number[] = []; _idx: number[] = []; _lookKey = ''; _look: Partial<Look> = {};

  /* ---- look ---- */
  col() { return INKS[this.state.color]; }
  // the dock reads 1 to 2.5, but the stroke actually drawn tops out at 1.4 (founder: nothing bolder than that)
  sw() { return +(this.state.weight * (1.4 / 2.5)).toFixed(2); }
  styleKey() { const s = this.state; return `${s.cut}|${s.weight}|${s.corner}|${s.cut === 'color' ? s.pal : s.color}`; }
  look(): Partial<Look> {
    const s = this.state, key = this.styleKey() + s.motion;
    if (key !== this._lookKey) { this._lookKey = key; this._look = { variant: s.cut, strokeWidth: this.sw(), corner: s.corner, palette: PALS[s.pal], animated: s.motion }; }
    return this._look;
  }
  svg(k: number, px: number, animated = false, uid = `f${k}`) {
    return renderSvg(ICONS[k], { ...this.look(), animated, size: px, title: false, uid }).replace('<svg ', `<svg color="${this.col()}" style="--bri-knockout:${BG}" `);
  }
  fileSvg(k: number) {
    const s = renderSvg(ICONS[k], { ...this.look(), uid: `bri-${ICONS[k].name}` });
    return this.state.cut !== 'color' && this.state.color !== 'ink' ? s.replace('<svg ', `<svg color="${this.col()}" `) : s;
  }

  /* ---- bitmaps: every glyph is rasterised once per look, then the field only blits ---- */
  raster(svg: string, px: number, done: (cv: HTMLCanvasElement | null) => void) {
    const img = new Image();
    img.onload = () => { const cv = document.createElement('canvas'); cv.width = cv.height = px; cv.getContext('2d')!.drawImage(img, 0, 0, px, px); done(cv); };
    img.onerror = () => done(null);
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  request(k: number) {
    if (this.flight >= 24) return;
    let e = this.bm.get(k); if (!e) this.bm.set(k, (e = { key: '', a: 0, t: this.fno }));
    const lk = this.lk, ent = e; ent.want = lk; this.flight++;
    this.raster(this.svg(k, this.res), this.res, (cv) => { this.flight--; if (ent.want !== lk) return; ent.want = undefined; ent.key = lk; if (cv) ent.cv = cv; });
  }
  needBig(k: number, B: number) {
    const key = `${k}|${this.styleKey()}|${Math.round(B)}`; if (key === this.bigKey) return; this.bigKey = key;
    const px = Math.round(B * this.dpr);
    this.raster(this.svg(k, px, false, 'big'), px, (cv) => { if (cv && this.bigKey === key) this.big = { k, cv }; });
  }
  draw(k: number, x: number, y: number, size: number, alpha: number) {
    let e = this.bm.get(k);
    if (!e || (e.key !== this.lk && e.want !== this.lk)) { this.request(k); e = this.bm.get(k); }
    if (!e) return; e.t = this.fno;
    const src = this.big && this.big.k === k && size > 90 ? this.big.cv : e.cv;
    if (!src) return; e.a = Math.min(1, e.a + .08);
    this.ctx!.globalAlpha = alpha * e.a; this.ctx!.drawImage(src, x - size / 2, y - size / 2, size, size);
  }

  geo() {
    const W = this.W, H = this.H, hf = Math.max(44, Math.min(W * .09, 128));
    const dock = (this.dockRef.current ? this.dockRef.current.offsetHeight : 60) + 36, wide = W >= 900;
    const B = wide ? Math.min(H * .46, W * .34) : Math.min(W * .46, H * .24);
    const cx = wide ? W * .28 : W / 2, cy = wide ? Math.max(100 + B / 2, (H - dock) * .5 - 16) : 102 + B / 2;
    const rampY = cy + B / 2 + 66;
    return { hf, heroY: Math.max(190, H * .27), hw: Math.min(W * .44, 540), hh: hf * .5 + 52, dock, wide, B, cx, cy, rampY, ramp: wide && rampY + 56 < H - dock };
  }
  matches() {
    const q = this.state.q.trim().toLowerCase(); if (this._mq === q) return this._m;
    const a: number[] = [], b: number[] = [];
    ICONS.forEach((ic, k) => { if (ic.name.startsWith(q)) a.push(k); else if (match(ic, q)) b.push(k); });
    this._mq = q; this._m = a.concat(b); return this._m;
  }
  slotAt(x: number, y: number) { for (const s of this.slots) if (Math.abs(x - s.x) < s.r && Math.abs(y - s.y) < s.r) return s.k; return null; }

  construction(g: ReturnType<App['geo']>, A: number) {
    const ctx = this.ctx!, st = this.state, B = g.B, u = B / 24, x0 = g.cx - B / 2, y0 = g.cy - B / 2;
    ctx.save(); ctx.strokeStyle = INK; ctx.fillStyle = INK; ctx.lineWidth = 1;
    for (let n = 0; n <= 24; n++) {
      ctx.globalAlpha = A * (n % 4 === 0 ? .16 : .06); ctx.beginPath();
      ctx.moveTo(x0 + n * u, y0); ctx.lineTo(x0 + n * u, y0 + B); ctx.moveTo(x0, y0 + n * u); ctx.lineTo(x0 + B, y0 + n * u); ctx.stroke();
    }
    ctx.globalAlpha = A * .12; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + B, y0 + B); ctx.moveTo(x0 + B, y0); ctx.lineTo(x0, y0 + B); ctx.stroke();
    ctx.globalAlpha = A * .5; ctx.strokeRect(x0, y0, B, B);
    ctx.strokeStyle = ACC; ctx.globalAlpha = A * .8; ctx.setLineDash([4, 4]); ctx.strokeRect(x0 + 2 * u, y0 + 2 * u, 20 * u, 20 * u);
    ctx.beginPath(); ctx.arc(g.cx, g.cy, 10 * u, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.globalAlpha = A * .75; ctx.font = `400 11px ${MONO}`; ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left'; ctx.fillText('24 × 24 GRID', x0, y0 - 10); ctx.fillText('WEIGHT ' + st.weight.toFixed(2), x0, y0 + B + 20);
    ctx.textAlign = 'right'; ctx.fillText('LIVE AREA 20', x0 + B, y0 - 10); ctx.fillText(st.cut.toUpperCase() + ' · ' + st.corner.toUpperCase(), x0 + B, y0 + B + 20);
    ctx.restore();
    if (g.ramp) {
      let x = g.cx - 126;
      for (const s of [16, 20, 24, 32, 48]) {
        this.draw(st.sel!, x + s / 2, g.rampY, s, A);
        ctx.globalAlpha = A * .75; ctx.fillStyle = INK; ctx.font = `400 11px ${MONO}`; ctx.textAlign = 'center'; ctx.fillText(String(s), x + s / 2, g.rampY + 42);
        x += s + 28;
      }
    }
  }

  frame = () => {
    this.raf = requestAnimationFrame(this.frame);
    const cv = this.cvRef.current, ctx = this.ctx; if (!cv || !ctx) return;
    const st = this.state, W = this.W, H = this.H;
    const mode = st.sel != null ? 'spec' : st.view !== 'set' ? 'sheet' : st.q.trim() ? 'search' : 'field';
    // under a sheet the field is frozen, so the blurred backdrop is painted once instead of every frame
    this.still = mode === 'sheet' ? this.still + 1 : 0; if (this.still > 90) return;
    this.fno++;
    const size = st.size, S = Math.round(size * 2.5), mx = this.mouse.x, my = this.mouse.y, g = this.geo();
    this.res = Math.round(Math.max(size * 1.6, 44) * this.dpr); this.lk = this.styleKey() + '|' + this.res;
    if (this.fno % 300 === 0) for (const [k, e] of this.bm) if (e.t < this.fno - 600) this.bm.delete(k);
    if (!this.drag) {
      this.cam.x += this.vel.x; this.cam.y += this.vel.y; this.vel.x *= .93; this.vel.y *= .93;
      if (mode === 'field' && !matchMedia('(prefers-reduced-motion: reduce)').matches) { this.cam.x += .28; this.cam.y += .09; }
    }
    this.dim = L(this.dim, mode === 'field' ? 1 : mode === 'search' ? .1 : .05, .12);
    this.clr = L(this.clr, mode === 'field' ? 1 : 0, .12);
    const lensOn = mode === 'field' && mx > -999 && !this.drag;
    this.lensK = L(this.lensK, lensOn ? 1 : 0, .14);
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    const i0 = Math.floor(this.cam.x / S) - 1, i1 = Math.floor((this.cam.x + W) / S) + 1, j0 = Math.floor(this.cam.y / S) - 1, j1 = Math.floor((this.cam.y + H) / S) + 1;
    const ax = W / 2, ay = H * .62, best: Record<number, number> = {}; this.pos = {};
    const was = this.hover; let hov: App['hover'] = null, hd = S * S * .36, live: Pt | null = null;
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
      let px = i * S - this.cam.x + S / 2, py = j * S - this.cam.y + S / 2; const k = ORDER[((i + j * 211) % N + N) % N];
      const da = (px - ax) * (px - ax) + (py - ay) * (py - ay);
      if (best[k] === undefined || da < best[k]) { best[k] = da; this.pos[k] = { k, x: px, y: py, s: size }; }
      const dx = px - mx, dy = py - my, d2 = dx * dx + dy * dy, gz = this.lensK * Math.exp(-d2 / 33800);
      const qx = Math.max(Math.abs(px - W / 2) - g.hw, 0), qy = Math.max(Math.abs(py - g.heroY) - g.hh, 0), m = Math.min(1, Math.hypot(qx, qy) / 80);
      const al = (.3 + .7 * gz) * this.dim * (1 - this.clr * (1 - m * m));
      if (mode === 'field' && d2 < hd && m > .5 && py < H - g.dock - size) { hd = d2; hov = { k, x: px, y: py, s: size, i, j }; }
      if (al < .012) continue;
      const hx = px, hy = py; px += dx * .3 * gz; py += dy * .3 * gz;
      // with Motion on, the glyph under the pointer is handed to a live SVG so it can play
      if (st.motion && lensOn && was && was.i === i && was.j === j && Math.abs(hx - was.x) < S) { live = { k, x: px, y: py, s: size * (1 + 1.25 * gz) }; continue; }
      this.draw(k, px, py, size * (1 + 1.25 * gz), al);
    }
    this.hover = hov;
    const lv = this.liveRef.current;
    if (lv) {
      if (live) {
        if (this.liveK !== live.k) { this.liveK = live.k; lv.innerHTML = this.svg(live.k, 100, true, 'live'); }
        lv.style.display = 'block'; lv.style.transform = `translate(${live.x - 50}px,${live.y - 50}px) scale(${live.s / 100})`;
      } else if (this.liveK !== -1) { this.liveK = -1; lv.style.display = 'none'; lv.innerHTML = ''; }
    }
    if (hov && this.lensK > .05 && lensOn) {
      ctx.globalAlpha = this.lensK; ctx.fillStyle = INK; ctx.font = `400 12px ${MONO}`; ctx.textAlign = 'center';
      ctx.fillText(ICONS[hov.k].name, hov.x, hov.y + size * 1.13 + 20);
    }
    this.slots = []; const targets: Record<number, { x: number; y: number; s: number; f?: number }> = {};
    if (mode === 'search') {
      const ms = this.matches(), sl = W < 700 ? 84 : 108, cols = Math.max(2, Math.min(ms.length, Math.floor(Math.min(W - 32, 1080) / sl)));
      const top = g.heroY + g.hh + 6, bot = H - g.dock, n = ms.length, x0 = W / 2 - Math.min(n, cols) * sl / 2 + sl / 2;
      this.rmax = Math.max(0, Math.ceil(n / cols) * sl - (bot - top)); this.rs = Math.max(0, Math.min(this.rmax, this.rs)); this.rsS = L(this.rsS, this.rs, .25);
      for (let a = 0; a < n; a++) {
        const x = x0 + (a % cols) * sl, y = top + sl * .42 + Math.floor(a / cols) * sl - this.rsS;
        if (y < top - sl || y > bot + sl) continue;
        const fade = Math.max(0, Math.min(1, (y - top + 4) / 24, (bot - 8 - y) / 34));
        targets[ms[a]] = { x, y, s: W < 700 ? 30 : 38, f: fade }; if (fade > .4) this.slots.push({ k: ms[a], x, y, r: sl / 2 });
      }
      if (this.rmax > 0) { const th = bot - top - 16, kh = Math.max(24, th * (bot - top) / (this.rmax + bot - top)); ctx.globalAlpha = .18; ctx.fillStyle = INK; ctx.fillRect(W - 10, top + 8, 2, th); ctx.globalAlpha = .9; ctx.fillRect(W - 10, top + 8 + (th - kh) * this.rsS / this.rmax, 2, kh); }
    }
    if (mode === 'spec') {
      const k = st.sel!, f = this.fly[k]; targets[k] = { x: g.cx, y: g.cy, s: g.B }; this.needBig(k, g.B);
      this.construction(g, f.a * Math.pow(Math.min(1, f.s / g.B), 3));
      const settled = Math.abs(f.s - g.B) < 1.5 && Math.abs(f.x - g.cx) < 1.5;
      if (settled !== st.settled) this.setState({ settled });
    }
    for (let k = 0; k < N; k++) {
      const f = this.fly[k], T = targets[k];
      if (T) {
        if (!f.on && f.a < .03) { const o = this.origin && this.origin.k === k ? this.origin : this.pos[k]; if (o) { f.x = o.x; f.y = o.y; f.s = o.s; } else { f.x = T.x; f.y = T.y; f.s = T.s * .5; } }
        f.on = true; f.x = L(f.x, T.x, .17); f.y = L(f.y, T.y, .17); f.s = L(f.s, T.s, .17); f.a = L(f.a, T.f ?? 1, .25);
      } else { f.on = false; if (f.a) f.a = f.a < .012 ? 0 : L(f.a, 0, .28); }
      if (f.a < .012) continue;
      if (!(mode === 'spec' && st.motion && st.settled && k === st.sel)) this.draw(k, f.x, f.y, f.s, f.a);
      if (mode === 'search' && T) { ctx.globalAlpha = f.a * .8; ctx.fillStyle = INK; ctx.font = `400 11px ${MONO}`; ctx.textAlign = 'center'; ctx.fillText(ICONS[k].name, f.x, f.y + f.s / 2 + 20, (W < 700 ? 84 : 108) - 8); }
    }
    if (mode === 'spec') this.origin = null;
    cv.style.cursor = this.drag ? 'grabbing' : mode === 'spec' ? 'ew-resize' : (hov && lensOn) || this.slotAt(mx, my) != null ? 'pointer' : 'grab';
  };

  /* ---- pointer, wheel, keys ---- */
  setMouse(e: PointerEvent) { const r = this.cvRef.current!.getBoundingClientRect(); this.mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; }
  down = (e: PointerEvent) => { this.setMouse(e); this.drag = { x: e.clientX, y: e.clientY, m: 0 }; this.vel = { x: 0, y: 0 }; try { (e.target as Element).setPointerCapture(e.pointerId); } catch { /* not capturable */ } };
  move = (e: PointerEvent) => {
    this.setMouse(e); if (!this.drag) return;
    const dx = e.clientX - this.drag.x, dy = e.clientY - this.drag.y; this.drag.x = e.clientX; this.drag.y = e.clientY; this.drag.m += Math.abs(dx) + Math.abs(dy);
    const st = this.state;
    if (st.sel != null) { if (this.drag.m > 4) this.setState((s) => ({ weight: Math.max(1, Math.min(2.5, +(s.weight + dx * .006).toFixed(2))) })); }
    else if (st.view === 'set' && st.q.trim()) { this.rs -= dy; this.rsS = Math.max(0, Math.min(this.rmax, this.rs)); }
    else if (st.view === 'set') { this.cam.x -= dx; this.cam.y -= dy; this.vel = { x: -dx, y: -dy }; }
  };
  up = (e: PointerEvent) => {
    const d = this.drag; this.drag = null; const touch = e.pointerType === 'touch';
    if (d && d.m <= 5) {
      const st = this.state, s = this.slotAt(this.mouse.x, this.mouse.y);
      if (st.sel != null) this.setState({ sel: null });
      else if (s != null) this.open(s);
      else if (this.hover) { this.origin = { k: this.hover.k, x: this.hover.x, y: this.hover.y, s: st.size * (touch ? 1 : 2) }; this.open(this.hover.k); }
    }
    if (touch) this.mouse = { x: -9999, y: -9999 };
  };
  leave = () => { if (!this.drag) this.mouse = { x: -9999, y: -9999 }; };
  wheel = (e: WheelEvent) => {
    const st = this.state; if (st.sel != null || st.view !== 'set') return;
    e.preventDefault(); if (st.q.trim()) this.rs += e.deltaY; else { this.cam.x += e.deltaX; this.cam.y += e.deltaY; }
  };
  resize = () => {
    const cv = this.cvRef.current; if (!cv) return; const r = cv.getBoundingClientRect(); if (!r.width) return;
    this.W = r.width; this.H = r.height; this.dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = Math.round(r.width * this.dpr); cv.height = Math.round(r.height * this.dpr); this.ctx = cv.getContext('2d'); this.still = 0;
    if (this.state.W !== r.width || this.state.H !== r.height) this.setState({ W: r.width, H: r.height });
  };
  key = (e: KeyboardEvent) => {
    const st = this.state, inp = st.view === 'index' ? this.idxRef.current : this.inRef.current;
    if (e.key === 'Escape') { if (st.sel != null) this.setState({ sel: null }); else if (st.view === 'index' && st.q) this.setState({ q: '' }); else if (st.view !== 'set') this.setState({ view: 'set' }); else if (st.q) this.setState({ q: '' }); return; }
    if (st.sel != null) { if (e.key === 'ArrowRight') this.step(1); if (e.key === 'ArrowLeft') this.step(-1); return; }
    if ((st.view === 'set' || st.view === 'index') && inp && document.activeElement !== inp && !e.metaKey && !e.ctrlKey && !e.altKey && e.key.length === 1 && e.key !== ' ') inp.focus({ preventScroll: true });
  };
  open(k: number) { this.inRef.current?.blur(); this.setState({ sel: k, settled: false }); }
  openTile = (k: number, el: HTMLElement) => { const r = el.getBoundingClientRect(); this.origin = { k, x: r.left + r.width / 2, y: r.top + 38, s: 31 }; this.open(k); };
  step(d: number) {
    const st = this.state, list = st.view === 'index' && this._idx.length ? this._idx : st.q.trim() && this.matches().length ? this.matches() : null;
    const i = list ? Math.max(0, list.indexOf(st.sel!)) : st.sel!, n = list ? list.length : N, j = (i + d + n) % n;
    this.setState({ sel: list ? list[j] : j, settled: false });
  }
  copy(text: string, key: string) { navigator.clipboard?.writeText(text).catch(() => {}); this.setState({ copied: key }); clearTimeout(this.ct); this.ct = window.setTimeout(() => this.setState({ copied: '' }), 1400); }

  componentDidMount() {
    this.ac = new AbortController(); const o = { signal: this.ac.signal }, cv = this.cvRef.current!;
    this.resize();
    cv.addEventListener('pointerdown', this.down, o); cv.addEventListener('pointermove', this.move, o); cv.addEventListener('pointerup', this.up, o); cv.addEventListener('pointercancel', this.up, o); cv.addEventListener('pointerleave', this.leave, o);
    cv.addEventListener('wheel', this.wheel, { passive: false, signal: this.ac.signal });
    addEventListener('resize', this.resize, o); addEventListener('keydown', this.key, o);
    addEventListener('popstate', () => this.setState(fromLoc()), o);
    this.ro = new ResizeObserver(this.resize); this.ro.observe(cv);
    this.raf = requestAnimationFrame(this.frame);
  }
  componentDidUpdate(_: object, prev: S) {
    const st = this.state; this.still = 0;
    if (prev.view === st.view && prev.sel === st.sel) return;
    const url = PATHS[st.view] + (st.sel != null ? `?icon=${ICONS[st.sel].name}` : '');
    if (url !== location.pathname + location.search) history[prev.view !== st.view ? 'pushState' : 'replaceState'](null, '', url);
  }
  componentWillUnmount() { cancelAnimationFrame(this.raf); this.ac.abort(); this.ro?.disconnect(); }

  /* ---- copy shown in the specimen and the docs ---- */
  attrs(kind: 'react' | 'html') {
    const st = this.state, a: string[] = [], r = kind === 'react';
    if (st.cut !== 'line') a.push(`variant="${st.cut}"`);
    if (this.sw() !== 1.12) a.push(r ? `strokeWidth={${this.sw()}}` : `stroke="${this.sw()}"`);
    if (st.corner !== 'round') a.push(`corner="square"`);
    if (st.cut === 'color' && PALS[st.pal]) a.push(`palette="${PALS[st.pal]}"`);
    if (st.cut !== 'color' && st.color !== 'ink') a.push(r ? `style={{ color: '${this.col()}' }}` : `style="color:${this.col()}"`);
    if (st.motion) a.push('animated');
    return a.length ? ' ' + a.join(' ') : '';
  }
  docs() {
    const st = this.state, house = `variant="${st.cut}"`, sc = '<' + 'script', se = '<' + '/script>';
    const steps: Record<string, string[]> = {
      react: ['npm i github:mercurial-systems/bridle', `import { BridleIcon } from 'bridle-icons/react';\n\n<BridleIcon name="${EX}" />`, `const Icon = (props) => (\n  <BridleIcon ${house} strokeWidth={${this.sw()}} corner="${st.corner}" {...props} />\n);\n\n<Icon name="${EX}" />`, `<BridleIcon name="${EX}" animated />`, `<BridleIcon name="${EX}" title="Open wallet" />`],
      html: [`${sc} type="module" src="${SITE}/bridle.js">${se}`, `<bridle-icon name="${EX}"></bridle-icon>`, `<bridle-icon name="${EX}" ${house} stroke="${this.sw()}" corner="${st.corner}"></bridle-icon>`, `<bridle-icon name="${EX}" animated></bridle-icon>`, `<button aria-label="Open wallet">\n  <bridle-icon name="${EX}"></bridle-icon>\n</button>`],
      files: [`${SITE}/bridle-svg.zip`, `<img src="${SITE}/svg/line/${EX}.svg" width="24" alt="" />`, `<img src="${SITE}/svg/${st.cut}/${EX}.svg" width="24" alt="" />`, `<img src="${SITE}/svg/color-animated/${EX}.svg" width="48" alt="" />`, `<img src="${SITE}/svg/line/${EX}.svg" width="24" alt="Open wallet" />`],
      js: ['npm i github:mercurial-systems/bridle', `import { svg } from 'bridle-icons';\n\nel.innerHTML = svg('${EX}');`, `const house = { variant: '${st.cut}', strokeWidth: ${this.sw()}, corner: '${st.corner}' };\n\nel.innerHTML = svg('${EX}', house);`, `svg('${EX}', { animated: true });`, `svg('${EX}', { title: 'Open wallet' });`],
    };
    const meta = [
      ['Install', st.fw === 'html' ? 'One script tag, no build step.' : st.fw === 'files' ? 'Every glyph in every cut, as plain files. Or link them straight from this site.' : 'One package with no dependencies. The renderer draws each glyph on demand.'],
      ['Place a glyph', 'Every glyph goes by its name. Line glyphs take the colour of the text around them.'],
      ['Set the house style once', st.fw === 'files' ? 'Files ship in each cut at the default weight. For other weights, use the renderer.' : 'This block mirrors the dock. Restyle the set there, copy the result here.'],
      ['Animate', 'Every glyph has its own motion, built from transform and opacity only. It honours reduced motion.'],
      ['Label it', 'A glyph carries its own name as its title. Give it yours when the glyph is the only content of a control.'],
    ];
    return meta.map(([title, note], i) => ({ n: String(i + 1).padStart(2, '0'), title, note, code: steps[st.fw][i] }));
  }

  render() {
    const st = this.state, g = this.geo(), q = st.q.trim(), ms = q ? this.matches() : [];
    const sheet = st.sel == null && st.view !== 'set', mode = st.sel != null ? 'spec' : sheet ? 'sheet' : 'set';
    const ic = ICONS[st.sel ?? 0], look = this.look(), set = (o: Partial<S>) => () => this.setState(o as S);
    const hint = !q ? 'Type anywhere · drag to roam · click to inspect' : ms.length ? `${fmt(ms.length)} of ${fmt(N)} · scroll for more · ↵ opens ${ICONS[ms[0]].name} · esc clears` : `Nothing in the set answers to “${q}” · esc clears`;
    const codes: Record<string, string> = st.sel == null ? {} : {
      svg: this.fileSvg(st.sel),
      react: `import { BridleIcon } from 'bridle-icons/react';\n\n<BridleIcon name="${ic.name}"${this.attrs('react')} />`,
      html: `<bridle-icon name="${ic.name}"${this.attrs('html')}></bridle-icon>`,
      url: `${SITE}/svg/${st.cut}${st.motion && st.cut === 'color' ? '-animated' : ''}/${ic.name}.svg`,
    };
    const seg = (on: boolean, extra = '') => `seg${on ? ' on' : ''}${extra}`;
    const copied = (key: string, label: string) => (st.copied === key ? 'Copied' : label);

    // index: collections on the rail, their sub-sets as sections
    const hit = (i: Icon) => !q || match(i, q);
    const sects = st.view !== 'index' ? [] : GROUPS.filter((gr) => st.cat === 'all' || st.cat === gr.id).flatMap((gr) => gr.cats.map((c) => ({ id: c.id, title: c.label, items: c.icons.filter(hit) }))).filter((s) => s.items.length);
    if (st.view === 'index') this._idx = sects.flatMap((s) => s.items.map((i) => IDX.get(i.name)!));
    const catN = (id: string) => (id === 'all' ? ICONS : GROUPS.find((gr) => gr.id === id)!.cats.flatMap((c) => c.icons)).filter(hit).length;
    const token = <p className="lab mute" style={{ margin: 0, textTransform: 'none', letterSpacing: 0, lineHeight: 1.6 }}>by the makers of <a href="https://verity.dev">Verity</a> © Mercurial Systems</p>;

    return (
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: 'var(--bg)', color: 'var(--ink)' }}>
        <canvas ref={this.cvRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', touchAction: 'none', cursor: 'grab' }} />
        <div ref={this.liveRef} aria-hidden style={{ position: 'absolute', left: 0, top: 0, width: 100, height: 100, display: 'none', pointerEvents: 'none', lineHeight: 0, willChange: 'transform' }} />

        <header style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '14px 22px', zIndex: 10, pointerEvents: 'none' }}>
          <button onClick={set({ view: 'set', sel: null, q: '' })} className="disp lnk" style={{ pointerEvents: 'auto', padding: '6px 0', fontSize: 28, lineHeight: 1 }}>Bridle</button>
          <nav style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
            {(['set', 'index', 'docs', 'license'] as View[]).map((v) => (
              <button key={v} onClick={set({ view: v, sel: null })} className={`lab lnk${st.view === v && st.sel == null ? ' on' : ''}`}>{v}</button>
            ))}
            <a href={GITHUB} className="lab lnk hide-sm">GitHub</a>
          </nav>
        </header>

        <div style={{ position: 'absolute', left: 0, right: 0, top: 'max(190px,27%)', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '0 20px', zIndex: 3, pointerEvents: 'none', transition: 'opacity .35s', opacity: mode === 'set' ? 1 : 0 }}>
          <div className="lab mute" style={{ minHeight: 14, textAlign: 'center' }}>An icon set, set like type · {fmt(N)} glyphs</div>
          <input ref={this.inRef} value={st.q} onChange={(e) => { this.rs = 0; this.setState({ q: e.target.value }); }} onKeyDown={(e) => { if (e.key === 'Enter' && ms.length) this.open(ms[0]); }}
            placeholder="Find a glyph" spellCheck={false} autoComplete="off" aria-label="Search glyphs" tabIndex={mode === 'set' ? 0 : -1}
            style={{ pointerEvents: mode === 'set' ? 'auto' : 'none', width: 'min(100%,1080px)', boxSizing: 'border-box', border: 'none', outline: 'none', background: 'none', padding: 0, margin: 0, color: 'var(--ink)', caretColor: 'var(--acc)', textAlign: 'center', font: '400 clamp(36px,7.6vw,112px)/1.15 var(--disp)', letterSpacing: '-.01em' }} />
          <div className="lab mute" style={{ minHeight: 14, textAlign: 'center' }}>{hint}</div>
        </div>

        {st.sel != null && st.motion && st.settled && (
          <div key={st.sel + this.styleKey()} aria-hidden style={{ position: 'absolute', left: g.cx - g.B / 2, top: g.cy - g.B / 2, width: g.B, height: g.B, pointerEvents: 'none', lineHeight: 0, zIndex: 2 }} dangerouslySetInnerHTML={{ __html: this.svg(st.sel, g.B, true, 'spec') }} />
        )}

        {st.sel != null && (
          <section style={{ position: 'absolute', left: g.wide ? '52%' : 20, right: g.wide ? '4%' : 20, top: g.wide ? Math.round((this.H - g.dock) * .5 + 30) : Math.round(g.cy + g.B / 2 + 36), bottom: g.wide ? 'auto' : g.dock, transform: g.wide ? 'translateY(-50%)' : 'none', maxHeight: g.wide ? Math.round(this.H - g.dock - 72) : 'none', overflow: 'auto', zIndex: 4, display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.8vh,16px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <button onClick={set({ sel: null })} className="lab lnk" style={{ padding: '10px 0' }}>{st.view === 'index' ? '← Back to the index' : '← Back to the set'}</button>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => this.step(-1)} aria-label="Previous glyph" className="round">←</button>
                <button onClick={() => this.step(1)} aria-label="Next glyph" className="round">→</button>
              </div>
            </div>
            <div className="lab mute">Glyph {String(st.sel + 1).padStart(2, '0')} / {fmt(N)}</div>
            <h1 className="disp" style={{ fontSize: 'clamp(36px,min(7vw,11vh),104px)', lineHeight: .95, textTransform: 'capitalize' }}>{ic.name.replace(/-/g, ' ')}</h1>
            <div className="mute" style={{ font: '400 12px/1.5 var(--mono)' }}>{ic.tags.join(' · ')}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button onClick={() => this.copy(codes[st.tab], 'code')} className="pill fill">{copied('code', 'Copy ' + st.tab)}</button>
              <button onClick={() => download(`${ic.name}-${st.cut}.svg`, new Blob([this.fileSvg(st.sel!)], { type: 'image/svg+xml' }))} className="pill">Download .svg</button>
              <button onClick={() => downloadPng(ic, look)} className="pill">.png</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
              <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {[['SVG', 'svg'], ['React', 'react'], ['HTML', 'html'], ['URL', 'url']].map(([label, v]) => <button key={v} onClick={set({ tab: v })} className={seg(st.tab === v, ' up')}>{label}</button>)}
              </div>
              <pre className="code" style={{ padding: '12px 16px', fontSize: 12, maxHeight: 'clamp(64px,17vh,168px)' }}>{codes[st.tab]}</pre>
            </div>
            <div className="mute" style={{ font: '400 12px/1.5 var(--mono)', textWrap: 'pretty' }}>Drag the glyph sideways to scrub its weight. The dock restyles it live; the code follows.</div>
          </section>
        )}

        {sheet && st.view === 'index' && (
          <section className="sheet"><div><div style={{ maxWidth: 1180 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="lab mute">Index · {fmt(this._idx.length)} of {fmt(N)} glyphs</div>
              <input ref={this.idxRef} value={st.q} onChange={(e) => this.setState({ q: e.target.value })} placeholder="Filter the index" spellCheck={false} autoComplete="off" aria-label="Filter the index"
                style={{ width: '100%', boxSizing: 'border-box', border: 'none', borderBottom: '1px solid var(--ink)', outline: 'none', background: 'none', padding: '0 0 8px', margin: 0, color: 'var(--ink)', caretColor: 'var(--acc)', font: '400 clamp(32px,6vw,76px)/1.1 var(--disp)', letterSpacing: '-.01em' }} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px 40px', alignItems: 'flex-start' }}>
              <nav style={{ flex: g.wide ? '0 0 200px' : '1 1 100%', position: g.wide ? 'sticky' : 'static', top: 0, display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', gap: 2 }}>
                {[{ id: 'all', label: 'All' }, ...GROUPS].map((c) => { const n = catN(c.id); return (
                  <button key={c.id} onClick={set({ cat: c.id })} className={seg(st.cat === c.id)} style={{ flex: '1 1 150px', display: 'flex', justifyContent: 'space-between', gap: 12, padding: '9px 14px', fontSize: 12, opacity: n || st.cat === c.id ? 1 : .45 }}><span>{c.label}</span><span>{fmt(n)}</span></button>
                ); })}
              </nav>
              <div style={{ flex: '1 1 480px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 40, color: st.cut === 'color' ? undefined : this.col() }}>
                {sects.map((s) => (
                  <Sect key={s.id + '|' + q} title={s.title} n={s.items.length}>
                    {() => s.items.map((i) => <Tile key={i.name} icon={i} k={IDX.get(i.name)!} look={look} onOpen={this.openTile} />)}
                  </Sect>
                ))}
                {!sects.length && <p className="disp" style={{ fontSize: 36, lineHeight: 1.1, color: 'var(--ink)' }}>Nothing in the index answers to “{q}”.</p>}
              </div>
            </div>
          </div></div></section>
        )}

        {sheet && st.view === 'docs' && (
          <section className="sheet"><div><div style={{ maxWidth: 820 }}>
            <div className="lab mute">Docs · Install to props</div>
            <h1 className="disp" style={{ fontSize: 'clamp(44px,7.4vw,96px)', lineHeight: .95 }}>Install it, <em>then set it your way.</em></h1>
            <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {[['React', 'react'], ['Web component', 'html'], ['SVG files', 'files'], ['JavaScript', 'js']].map(([label, v]) => <button key={v} onClick={set({ fw: v })} className={seg(st.fw === v, ' up')}>{label}</button>)}
            </div>
            {this.docs().map((s, i) => (
              <div key={s.n} className="rule" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10, paddingTop: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
                  <h2 className="disp" style={{ fontSize: 30, lineHeight: 1.1 }}>{s.title}</h2>
                  <button onClick={() => this.copy(s.code, 'd' + i)} className="pill sm">{copied('d' + i, 'Copy')}</button>
                </div>
                <p className="body">{s.note}</p>
                <pre className="code">{s.code}</pre>
              </div>
            ))}
            <div className="rule" style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 22 }}>
              <h2 className="disp" style={{ fontSize: 30, lineHeight: 1.1, marginBottom: 8 }}>Props</h2>
              {[['name', 'glyph name, required', ''], ['variant', STYLE_LIST.map((s) => `"${s.id}"`).join(' | '), 'line'], ['strokeWidth', 'number, up to 1.4', '1.12'], ['corner', '"round" | "square"', 'round'], ['size', 'number, in px', '24'], ['palette', 'preset, hue or [hue, accent]', 'by collection'], ['animated', 'boolean', 'false'], ['title', 'string | false', 'glyph name']].map(([name, type, def]) => (
                <div key={name} style={{ display: 'grid', gridTemplateColumns: 'minmax(64px,.6fr) minmax(0,1.7fr) minmax(64px,.7fr)', gap: 12, padding: '11px 0', borderTop: '1px solid color-mix(in srgb,var(--ink) 18%,transparent)', font: '400 13px/1.4 var(--mono)' }}>
                  <span style={{ fontWeight: 500 }}>{name}</span><span className="mute">{type}</span><span>{def}</span>
                </div>
              ))}
            </div>
            <div className="rule" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10, paddingTop: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
                <h2 className="disp" style={{ fontSize: 30, lineHeight: 1.1 }}>Hand it to your agent</h2>
                <button onClick={() => this.copy(AI_PROMPT, 'ai')} className="pill sm">{copied('ai', 'Copy')}</button>
              </div>
              <p className="body">Paste this into your coding agent. The file it points to lists the whole API and every glyph name.</p>
              <pre className="code" style={{ whiteSpace: 'pre-wrap' }}>{AI_PROMPT}</pre>
            </div>
            {token}
          </div></div></section>
        )}

        {sheet && st.view === 'license' && (
          <section className="sheet"><div><div style={{ maxWidth: 940, gap: 36 }}>
            <div className="lab mute">License · Pricing</div>
            <h1 className="disp" style={{ fontSize: 'clamp(44px,7.4vw,96px)', lineHeight: .95 }}>Free to set. <em>Free to ship.</em></h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '0 48px' }}>
              <div className="rule" style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '24px 0 32px' }}>
                <div className="lab mute">Open · MIT</div>
                <div className="disp" style={{ fontSize: 96, lineHeight: .9 }}>$0</div>
                <ul className="body" style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--ink)' }}>
                  <li>Every glyph, all five cuts, any weight</li>
                  <li>Motion included, for every glyph</li>
                  <li>Commercial use, no attribution required</li>
                </ul>
                <button onClick={() => this.copy('npm i github:mercurial-systems/bridle', 'npm')} className="pill fill" style={{ alignSelf: 'flex-start', marginTop: 'auto', textTransform: 'none' }}>{copied('npm', 'npm i github:mercurial-systems/bridle')}</button>
              </div>
              <div className="rule" style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '24px 0 32px' }}>
                <div className="lab mute">The whole set · one download</div>
                <div className="disp" style={{ fontSize: 96, lineHeight: .9 }}><em>{fmt(N)}</em></div>
                <ul className="body" style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--ink)' }}>
                  <li>SVG files in every cut, still and animated</li>
                  <li>React, web component and a plain renderer</li>
                  <li>Source drawings on GitHub, yours to edit</li>
                </ul>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
                  <a href="/bridle-svg.zip" className="pill">Download .zip</a>
                  <a href={GITHUB} className="pill">GitHub</a>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                ['Can I ship Bridle in client and commercial work?', 'Yes. The set is MIT: use it in anything, modify it, bundle it. No attribution required.'],
                ['Is there a paid tier?', 'No. Every glyph, every cut and all the motion are in the open set.'],
                ['Can I restyle or redraw glyphs?', 'Yes. Cut, weight and corner are props, and the source drawings are yours to edit.'],
                ['Why are there no chain or token logos?', 'The crypto glyphs are abstract on purpose, so nothing in the set carries someone else’s mark.'],
              ].map(([fq, fa]) => (
                <div key={fq} className="rule" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 40px', padding: '22px 0' }}>
                  <h3 className="disp" style={{ flex: '1 1 260px', fontSize: 26, lineHeight: 1.1 }}>{fq}</h3>
                  <p className="body" style={{ flex: '1.4 1 320px', lineHeight: 1.55 }}>{fa}</p>
                </div>
              ))}
            </div>
            {token}
          </div></div></section>
        )}

        <div ref={this.dockRef} className="dock">
          <div>
            <span className="lab mute">Cut</span>
            <div style={{ display: 'flex', gap: 2 }}>{STYLE_LIST.map((c) => <button key={c.id} onClick={set({ cut: c.id })} className={seg(st.cut === c.id)}>{c.label}</button>)}</div>
          </div>
          <label>
            <span className="lab mute">Weight</span>
            <input type="range" min="1" max="2.5" step="0.05" value={st.weight} onChange={(e) => this.setState({ weight: +e.target.value })} style={{ width: 88 }} />
            <span style={{ width: 30, font: '500 11px/1 var(--mono)' }}>{st.weight.toFixed(2)}</span>
          </label>
          <div>
            <span className="lab mute">Corner</span>
            <div style={{ display: 'flex', gap: 2 }}>{(['round', 'square'] as const).map((c) => <button key={c} onClick={set({ corner: c })} className={seg(st.corner === c)} style={{ textTransform: 'capitalize' }}>{c}</button>)}</div>
          </div>
          <label>
            <span className="lab mute">Size</span>
            <input type="range" min="18" max="52" step="1" value={st.size} onChange={(e) => this.setState({ size: +e.target.value })} style={{ width: 72 }} />
          </label>
          <div>
            <span className="lab mute">Colour</span>
            <div style={{ display: 'flex', gap: 8 }}>
              {st.cut === 'color'
                ? PALS.map((p, i) => <button key={i} onClick={set({ pal: i })} aria-label={p || 'By collection'} title={p || 'By collection'} className={`sw${st.pal === i ? ' on' : ''}`} style={{ background: PAL_BG[i] }} />)
                : (Object.keys(INKS) as InkId[]).map((c) => <button key={c} onClick={set({ color: c })} aria-label={c} className={`sw${st.color === c ? ' on' : ''}`} style={{ background: INKS[c] }} />)}
            </div>
          </div>
          <button onClick={() => this.setState((s) => ({ motion: !s.motion }))} className={seg(st.motion)} style={{ border: '1px solid var(--ink)', padding: '7px 12px' }} aria-pressed={st.motion}>Motion</button>
        </div>
      </div>
    );
  }
}
