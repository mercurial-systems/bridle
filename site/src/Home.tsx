import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { TextAnimate } from '@/components/ui/text-animate';
import { TextureButton } from '@/components/ui/texture-button';
import { RollingNumber } from '@/components/ui/rolling-number';
import { HaloSegmented } from '@/components/ui/halo-segmented';
import { HaloSwitch } from '@/components/ui/halo-switch';
import { CopyButton } from '@/components/ui/copy-button';
import { cn } from '@/lib/utils';
import { useVisible } from '@/lib/visible';
import { GROUPS, ICONS, PRESET_SWATCHES, type Icon, type Look, type Variant } from '@/lib/bridle';
import { GITHUB, SHOW_VARIANTS, TOTAL, Svg, LiveSvg, byName, fmt, pick } from '@/lib/icon';

const INSTALL = 'npm i github:mercurial-systems/bridle';
const rise = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } };

/* ---------------------------------------------------------------- hero: floating 3D icons with pointer parallax */
// [icon, left %, top %, size px, depth (parallax px), float seconds, hide on small screens]
const FLOATERS: [string, number, number, number, number, number, boolean][] = [
  ['vault', 3, 12, 190, 36, 5.2, false], ['credit-card', 15, 44, 130, 18, 6.1, true], ['crypto-wallet', 1, 60, 165, 28, 4.6, true],
  ['rocket', 21, 6, 100, 12, 5.6, true], ['coins', 13, 78, 112, 14, 6.4, false], ['block', 29, 82, 84, 8, 5.0, true],
  ['bank', 82, 8, 180, 34, 5.4, false], ['nft', 72, 40, 120, 16, 6.2, true], ['shield-check', 86, 54, 158, 26, 4.8, true],
  ['chart-bar', 68, 5, 96, 10, 5.8, true], ['token', 77, 80, 116, 15, 6.0, false], ['sparkles', 62, 84, 82, 8, 5.1, true],
];

function Hero({ go }: { go: (p: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const visible = useVisible(ref);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', String(((e.clientX - r.left) / r.width - 0.5) * 2));
        el.style.setProperty('--my', String(((e.clientY - r.top) / r.height - 0.5) * 2));
      });
    };
    el.addEventListener('pointermove', move);
    return () => { el.removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section ref={ref} className={cn('relative overflow-hidden border-b', !visible && 'paused')}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-[8%] size-[520px] rounded-full bg-[#c9b8ff] opacity-40 blur-[110px]" />
        <div className="absolute top-10 right-[6%] size-[460px] rounded-full bg-[#b9f3d0] opacity-45 blur-[110px]" />
        <div className="absolute -bottom-52 left-[38%] size-[520px] rounded-full bg-[#ffd3b4] opacity-40 blur-[120px]" />
        <div className="dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      </div>
      <div aria-hidden className="absolute inset-0">
        {FLOATERS.map(([n, x, y, size, depth, dur, hideSm], i) => byName[n] && (
          <div key={n} className={cn('absolute transition-transform duration-500 ease-out will-change-transform', hideSm && 'hidden md:block')}
            style={{ left: `${x}%`, top: `${y}%`, transform: `translate3d(calc(var(--mx, 0) * ${-depth}px), calc(var(--my, 0) * ${-depth}px), 0)` }}>
            <motion.div initial={{ opacity: 0, scale: 0.6, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.07, type: 'spring', bounce: 0.4, duration: 0.9 }}>
              <div className="max-md:origin-top-left max-md:scale-[.45] max-md:opacity-70"><div className="hero-float" style={{ animationDuration: `${dur}s`, animationDelay: `${-i * 0.7}s` }}>
                <Svg icon={byName[n]} look={{ variant: 'iso' }} size={size} className="drop-shadow-[0_24px_24px_rgba(20,24,18,.10)]" />
              </div></div>
            </motion.div>
          </div>
        ))}
      </div>
      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <motion.a href={GITHUB} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border bg-white/70 py-1 pr-3 pl-1 text-sm text-ink/70 shadow-sm backdrop-blur hover:text-ink">
          <span className="rounded-full bg-lime px-2 py-0.5 text-xs font-semibold text-ink">New</span>
          {fmt(TOTAL)} icons, all hand-drawn. Free and MIT <ArrowUpRight className="size-3.5" />
        </motion.a>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 text-[52px] leading-[0.98] font-semibold tracking-[-0.03em] sm:text-7xl lg:text-[104px]">
          Icons in every <span className="spectrum">dimension.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="mt-7 max-w-2xl text-lg text-ink/65 sm:text-xl">
          One drawing becomes line, solid, colour and layered isometric 3D, still or in motion. Built for SaaS, finance and crypto products.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.6 }} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button onClick={() => go('/icons')} className="group inline-flex items-center gap-2 rounded-2xl border border-lime-deep/30 bg-lime px-6 py-3.5 text-base font-semibold text-ink shadow-[inset_0_-3px_0_rgba(0,0,0,.08),0_10px_30px_-10px_rgba(79,154,23,.6)] transition hover:-translate-y-0.5 hover:brightness-95">
            Explore {fmt(TOTAL)} icons <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </button>
          <div className="w-52"><TextureButton variant="minimal" onClick={() => (location.href = '/bridle-svg.zip')}><Download className="mr-2 size-4" />Download all SVGs</TextureButton></div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 flex items-center gap-1 rounded-xl border bg-white/70 py-1 pr-1 pl-4 font-mono text-[13px] text-ink/70 backdrop-blur">
          <span className="text-lime-deep">$</span>&nbsp;{INSTALL} <CopyButton value={INSTALL} />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- marquee wall */
function Marquee({ onOpen }: { onOpen: (i: Icon) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useVisible(ref);
  // a deterministic spread across every category
  const rows = useMemo(() => [0, 1, 2].map((r) => Array.from({ length: 22 }, (_, k) => ICONS[(r * 1109 + k * 151 + 37) % ICONS.length])), []);
  return (
    <div ref={ref} className={cn('marquee-wrap space-y-3 overflow-hidden py-14 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]', !visible && 'paused')}>
      {rows.map((row, r) => (
        <div key={r} className={cn('marquee flex w-max gap-3', r === 1 && 'marquee-rev')} style={{ animationDuration: `${70 + r * 14}s` }}>
          {[...row, ...row].map((icon, k) => (
            <button key={k} onClick={() => onOpen(icon)} title={icon.name} tabIndex={k >= row.length ? -1 : 0}
              className="flex size-[84px] shrink-0 items-center justify-center rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-lg">
              <Svg icon={icon} look={{ variant: 'color' }} size={40} />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- playground */
const PLAY_ICONS = ['crypto-wallet', 'rocket', 'bank', 'credit-card', 'vault', 'settings', 'bell', 'thunderstorm', 'swap', 'trophy'];
function Playground() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useVisible(ref);
  const icons = useMemo(() => pick(PLAY_ICONS), []);
  const [icon, setIcon] = useState(icons[0]);
  const [look, setLook] = useState<Look>({ variant: 'iso', animated: true, palette: 'spectrum', strokeWidth: 1.5 });
  const [touched, setTouched] = useState(false);
  const set = (p: Partial<Look>) => { setTouched(true); setLook((l) => ({ ...l, ...p })); };
  // until someone touches a control, tour the four styles
  useEffect(() => {
    if (touched || !visible) return;
    const order: Variant[] = ['line', 'solid', 'color', 'iso'];
    const t = setInterval(() => setLook((l) => ({ ...l, variant: order[(order.indexOf(l.variant) + 1) % 4] })), 2200);
    return () => clearInterval(t);
  }, [touched, visible]);
  const mono = look.variant === 'line' || look.variant === 'solid';
  const pal = !mono && look.palette !== 'spectrum' ? ` palette="${look.palette}"` : '';
  const code = `<BridleIcon name="${icon.name}" variant="${look.variant}"${look.animated ? ' animated' : ''}${pal} />`;
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6">
      <motion.div {...rise} className="mx-auto max-w-3xl text-center">
        <TextAnimate text="One drawing. Four dimensions." type="rollIn" className="m-0 p-0 pb-0 text-4xl font-semibold tracking-tight text-ink sm:text-6xl dark:text-ink" />
        <p className="mt-4 text-lg text-ink/60">Every icon is a single set of shapes with roles. The renderer turns them into strokes, fills, gradients or layered 3D glass, so the styles never drift apart. Try it.</p>
      </motion.div>
      <motion.div {...rise} ref={ref} className="mt-12 grid overflow-hidden rounded-[32px] border bg-white shadow-[0_40px_120px_-50px_rgba(20,24,18,.35)] lg:grid-cols-[1.25fr_1fr]">
        <div className={cn('dots relative flex min-h-[420px] items-center justify-center bg-band text-ink [--bri-knockout:#f7f8f5]', !visible && 'paused')}>
          <AnimatePresence mode="popLayout">
            <motion.div key={`${icon.name}-${look.variant}`} initial={{ opacity: 0, scale: 0.7, filter: 'blur(12px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: 1.15, filter: 'blur(12px)' }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              <Svg icon={icon} look={look} size={look.variant === 'iso' ? 360 : 210} />
            </motion.div>
          </AnimatePresence>
          <span className="absolute top-5 left-5 rounded-full bg-white px-3 py-1 font-mono text-xs text-ink/60 shadow-sm">{icon.name}</span>
        </div>
        <div className="flex flex-col gap-7 border-t p-6 sm:p-9 lg:border-t-0 lg:border-l">
          <div>
            <p className="mb-2.5 text-sm font-semibold">Style</p>
            <HaloSegmented translucent={false} items={SHOW_VARIANTS} value={look.variant} onValueChange={(v) => set({ variant: v as Variant })} />
          </div>
          <div>
            <p className="mb-2.5 text-sm font-semibold">Icon</p>
            <div className="flex flex-wrap gap-2">
              {icons.map((i) => (
                <button key={i.name} onClick={() => { setTouched(true); setIcon(i); }} aria-label={i.name}
                  className={cn('flex size-11 items-center justify-center rounded-xl border transition hover:bg-band', i === icon && 'border-lime-deep/50 bg-lime/30')}>
                  <Svg icon={i} look={{ variant: 'color' }} size={24} />
                </button>
              ))}
            </div>
          </div>
          <div className={cn('transition-opacity', mono && 'pointer-events-none opacity-35')}>
            <p className="mb-2.5 text-sm font-semibold">Palette</p>
            <div className="flex flex-wrap gap-2">
              {PRESET_SWATCHES.map((p) => (
                <button key={p.id} title={p.label} aria-label={`${p.label} palette`} onClick={() => set({ palette: p.id as Look['palette'] })}
                  className={cn('size-8 rounded-full ring-offset-2 transition hover:scale-110', look.palette === p.id && 'ring-2 ring-ink')}
                  style={{ background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})` }} />
              ))}
            </div>
          </div>
          <label className="flex items-center gap-3 text-sm font-semibold">
            <HaloSwitch translucent={false} checked={look.animated} onCheckedChange={(c) => set({ animated: c })} aria-label="Motion" /> Motion
          </label>
          <div className="mt-auto flex items-center gap-2 overflow-hidden rounded-2xl bg-ink py-2 pr-2 pl-4 font-mono text-[12.5px] text-white/90">
            <span className="min-w-0 flex-1 truncate">{code}</span>
            <span className="rounded-lg bg-white/10 text-white"><CopyButton value={code} /></span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------- bento */
function Cell({ className, children }: { className?: string; children: ReactNode }) {
  return <motion.div {...rise} className={cn('relative overflow-hidden rounded-[28px] border bg-white p-7', className)}>{children}</motion.div>;
}
function Bento() {
  const motionIcons = pick(['bell', 'settings', 'rocket', 'thunderstorm', 'swap', 'mail', 'clock', 'chart-bar']);
  const chainIcons = pick(['sequencer-node', 'bisection-game', 'validator', 'bridge', 'staking', 'block']);
  return (
    <section className="border-y bg-band">
      <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6">
        <motion.h2 {...rise} className="mx-auto max-w-5xl text-center text-4xl font-semibold tracking-tight sm:text-6xl">Crafted like a product, <span className="text-ink/35">not a zip file.</span></motion.h2>
        <div className="mt-12 grid gap-4 md:grid-cols-6">
          <Cell className="md:col-span-4">
            <p className="text-2xl font-semibold">Motion is built in</p>
            <p className="mt-1 max-w-md text-ink/60">Bells ring, gears turn, charts grow. Pure CSS inside each SVG, so it plays in an img tag with no runtime.</p>
            <div className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-8">
              {motionIcons.map((i) => <div key={i.name} className="flex aspect-square items-center justify-center rounded-2xl bg-band"><LiveSvg icon={i} look={{ variant: 'color', animated: true }} size={40} /></div>)}
            </div>
          </Cell>
          <Cell className="bg-gradient-to-br from-[#efeaff] to-[#e2f6ff] md:col-span-2">
            <p className="text-2xl font-semibold">Glossy 3D</p>
            <p className="mt-1 text-ink/60">Thin glass layers, floating accents.</p>
            <div className="mt-2 flex justify-center"><LiveSvg icon={byName['vault']} look={{ variant: 'iso', animated: true }} size={210} /></div>
          </Cell>
          <Cell className="md:col-span-2">
            <p className="text-6xl font-semibold tracking-tight tabular-nums"><RollingNumber value={TOTAL} /></p>
            <p className="mt-1 text-ink/60">unique drawings. No filler, no badge copies.</p>
            <p className="mt-6 text-4xl font-semibold tracking-tight tabular-nums text-ink/35"><RollingNumber value={TOTAL * 8} /></p>
            <p className="mt-1 text-ink/60">ready-made SVGs across 8 styles.</p>
          </Cell>
          <Cell className="bg-ink text-white md:col-span-2">
            <p className="text-2xl font-semibold">Crypto-native</p>
            <p className="mt-1 text-white/60">Sequencers, fraud proofs, perps, liquidity bins. Drawn by people who run a chain.</p>
            <div className="mt-5 grid grid-cols-3">{chainIcons.map((i) => <LiveSvg key={i.name} icon={i} look={{ variant: 'iso' }} size={84} />)}</div>
          </Cell>
          <Cell className="bg-lime md:col-span-2">
            <p className="text-2xl font-semibold">Free. Forever.</p>
            <p className="mt-1 text-ink/70">MIT licensed, no account, no attribution. Abstract glyphs only, so nothing carries a third-party logo.</p>
            <div className="mt-6 flex items-end justify-between">
              <span className="text-7xl font-semibold tracking-tight">MIT</span>
              <span className="text-ink"><Svg icon={byName['shield-check']} look={{ variant: 'solid' }} size={64} /></span>
            </div>
          </Cell>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- collections */
const TINT: Record<string, string> = { crypto: 'from-[#f1ebff]', finance: 'from-[#e6f8ee]', business: 'from-[#fff0e3]', product: 'from-[#e6f1ff]' };
function Collections({ go }: { go: (p: string) => void }) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6">
      <motion.h2 {...rise} className="text-center text-4xl font-semibold tracking-tight sm:text-6xl">Four collections. <span className="text-ink/35">{GROUPS.reduce((n, g) => n + g.cats.length, 0)} sets.</span></motion.h2>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {GROUPS.map((g) => (
          <motion.div {...rise} key={g.id} className={cn('group rounded-[28px] border bg-gradient-to-b to-white p-7 transition hover:shadow-[0_30px_80px_-40px_rgba(20,24,18,.35)]', TINT[g.id])}>
            <button onClick={() => go(`/icons?g=${g.id}`)} className="flex w-full items-start justify-between text-left">
              <span><span className="block text-3xl font-semibold">{g.label}</span><span className="text-ink/50">{fmt(g.cats.reduce((n, c) => n + c.icons.length, 0))} icons</span></span>
              <span className="flex size-10 items-center justify-center rounded-full border bg-white transition group-hover:bg-ink group-hover:text-white"><ArrowUpRight className="size-4" /></span>
            </button>
            <div className="my-3 flex justify-between">
              {g.cats.slice(0, 5).map((c, k) => (
                <div key={c.id} className="transition duration-300 group-hover:-translate-y-2" style={{ transitionDelay: `${k * 40}ms` }}>
                  <LiveSvg icon={c.icons[0]} look={{ variant: 'iso' }} size={104} />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.cats.map((c) => <button key={c.id} onClick={() => go(`/icons?g=${g.id}&c=${c.id}`)} className="rounded-full border bg-white px-3 py-1 text-sm text-ink/70 hover:border-ink/30 hover:text-ink">{c.short}</button>)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- closing */
function Closing({ go }: { go: (p: string) => void }) {
  const row = pick(['rocket', 'coins', 'crypto-wallet', 'trophy', 'bank', 'nft', 'vault', 'sparkles']);
  return (
    <section className="px-4 pb-24 sm:px-6">
      <motion.div {...rise} className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[40px] bg-ink px-6 pt-20 text-center text-white">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-[#7c5cff] opacity-30 blur-[140px]" />
        <h2 className="relative text-5xl font-semibold tracking-tight sm:text-7xl">Ship something <span className="spectrum">beautiful.</span></h2>
        <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/60">All {fmt(TOTAL)} icons, every style, free for any project.</p>
        <div className="relative mt-9 flex flex-wrap justify-center gap-3">
          <button onClick={() => go('/icons')} className="inline-flex items-center gap-2 rounded-2xl bg-lime px-6 py-3.5 font-semibold text-ink transition hover:-translate-y-0.5">Browse the library <ArrowRight className="size-4" /></button>
          <a href="/bridle-svg.zip" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-3.5 font-semibold transition hover:bg-white/10"><Download className="size-4" />Download .zip</a>
        </div>
        <div className="relative mt-10 -mb-6 flex justify-center">
          {row.map((i, k) => <div key={i.name} className={cn(k > 3 && 'hidden sm:block', k > 5 && 'sm:hidden lg:block')}><LiveSvg icon={i} look={{ variant: 'iso', animated: true }} size={150} /></div>)}
        </div>
      </motion.div>
    </section>
  );
}

export default function Home({ go, onOpen, usage }: { go: (p: string) => void; onOpen: (i: Icon) => void; usage: ReactNode }) {
  return (
    <main>
      <Hero go={go} />
      <Marquee onOpen={onOpen} />
      <Playground />
      <Bento />
      <Collections go={go} />
      {usage}
      <Closing go={go} />
    </main>
  );
}
