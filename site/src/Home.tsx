import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { TextAnimate } from '@/components/ui/text-animate';
import { RollingNumber } from '@/components/ui/rolling-number';
import { HaloSegmented } from '@/components/ui/halo-segmented';
import { HaloSwitch } from '@/components/ui/halo-switch';
import { CopyButton } from '@/components/ui/copy-button';
import { cn } from '@/lib/utils';
import { useVisible } from '@/lib/visible';
import { GROUPS, ICONS, PRESET_SWATCHES, type Icon, type Look, type Variant } from '@/lib/bridle';
import { SHOW_VARIANTS, TOTAL, Svg, LiveSvg, byName, fmt, pick } from '@/lib/icon';


// a colour icon on a soft white tile: the hero, collections and closing panel all use it
function Chip({ icon, size, animated, className }: { icon: Icon; size: number; animated?: boolean; className?: string }) {
  return (
    <div className={cn('flex items-center justify-center rounded-[28%] border border-white/80 bg-white/85 shadow-[0_18px_40px_-18px_rgba(20,24,18,.28),inset_0_1px_0_#fff] backdrop-blur', className)} style={{ width: size, height: size }}>
      {animated ? <LiveSvg icon={icon} look={{ variant: 'color', animated: true }} size={Math.round(size * 0.5)} /> : <Svg icon={icon} look={{ variant: 'color' }} size={Math.round(size * 0.5)} />}
    </div>
  );
}
const rise = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } };

/* ---------------------------------------------------------------- hero: wordmark + scattered icons you can poke */
// [icon, left %, top %, size px, colour, rotation deg, parallax px, hide on small screens]
const SCATTER: [string, number, number, number, string, number, number, boolean][] = [
  ['key', 9, 12, 44, '#5b8def', -12, 14, false], ['token', 4, 34, 40, '#f2777a', 8, 22, true], ['credit-card', 15, 40, 46, '#3cc47c', -6, 10, true],
  ['vault', 5, 66, 58, '#a070f0', 6, 26, false], ['candles', 17, 78, 50, '#f4a52e', -10, 16, true], ['invoice', 28, 84, 46, '#f2777a', 8, 8, true],
  ['swap', 36, 10, 40, '#ef6fb0', 14, 8, true], ['bell', 70, 8, 44, '#f4a52e', 12, 10, false], ['link', 89, 22, 52, '#ef6fb0', -14, 24, true],
  ['crypto-wallet', 95, 10, 44, '#a070f0', 6, 18, true], ['book', 90, 48, 48, '#f4a52e', 8, 20, true], ['rocket', 82, 70, 60, '#5b8def', 14, 28, false],
  ['bank', 70, 84, 50, '#3cc47c', -8, 12, true], ['chart-bar', 96, 76, 46, '#22b8cf', -6, 16, true], ['shield-check', 56, 88, 42, '#a070f0', 10, 8, true],
  ['coins', 44, 82, 44, '#22b8cf', -8, 10, false],
];
const AI_PROMPT = 'Use Bridle icons in this project. Read https://bridle.verity.dev/llms.txt for the install steps, the API and every icon name, then pick the icons that fit.';

function Poke({ icon, size, color, onOpen }: { icon: Icon; size: number; color: string; onOpen: (i: Icon) => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={() => onOpen(icon)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} aria-label={icon.name} title={icon.name}
      className="block transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:scale-125 active:scale-95" style={{ color }}>
      <LiveSvg icon={icon} look={{ variant: 'duo', strokeWidth: 2 }} hover={hover} size={size} />
    </button>
  );
}

export function Hero({ go, onOpen }: { go: (p: string) => void; onOpen: (i: Icon) => void }) {
  const ref = useRef<HTMLElement>(null);
  const visible = useVisible(ref);
  const [copied, setCopied] = useState(false);
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
  const copyPrompt = () => navigator.clipboard?.writeText(AI_PROMPT).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  return (
    <section ref={ref} className={cn('relative overflow-hidden', !visible && 'paused')}>
      <div aria-hidden className="dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_72%)]" />
      <div className="absolute inset-0">
        {SCATTER.map(([n, x, y, size, color, rot, depth, hideSm], i) => byName[n] && (
          <div key={n} className={cn('absolute transition-transform duration-500 ease-out will-change-transform', hideSm && 'hidden md:block')}
            style={{ left: `${x}%`, top: `${y}%`, transform: `translate3d(calc(var(--mx, 0) * ${-depth}px), calc(var(--my, 0) * ${-depth}px), 0)` }}>
            <motion.div initial={{ opacity: 0, scale: 0.3, rotate: rot - 30 }} animate={{ opacity: 1, scale: 1, rotate: rot }} transition={{ delay: 0.15 + i * 0.045, type: 'spring', bounce: 0.55, duration: 0.9 }}>
              <div className="hero-float max-md:scale-75" style={{ animationDuration: `${5 + (i % 4) * 0.6}s`, animationDelay: `${-i * 0.6}s` }}>
                <Poke icon={byName[n]} size={size} color={color} onOpen={onOpen} />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      <div className="pointer-events-none relative mx-auto flex min-h-[min(68svh,640px)] max-w-5xl flex-col items-center justify-center px-4 pt-10 pb-14 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-[27vw] leading-[0.82] font-bold tracking-[-0.06em] sm:text-[190px] lg:text-[230px]">
          bridle
          <span className="hero-spin absolute -top-[14%] -right-[13%] text-[#7c5cff] max-sm:-right-[6%]"><Svg icon={byName['sparkles']} look={{ variant: 'solid' }} size={64} className="max-sm:scale-50" /></span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="mt-7 text-lg text-ink/55 sm:text-[22px]">
          {fmt(TOTAL)} icons in 5 styles. Every one of them moves. Poke one.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.6 }} className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-2.5">
          <button onClick={copyPrompt} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-white transition hover:-translate-y-0.5 hover:bg-ink/90">
            <span className="text-[#a78bfa]">✳</span> {copied ? 'Prompt copied. Paste it to your agent' : 'Use with your AI agent'}
          </button>
          <button onClick={() => go('/why')} className="inline-flex items-center gap-1.5 rounded-full bg-tile px-5 py-3 text-[15px] font-medium text-ink/75 transition hover:text-ink">Why Bridle <ArrowRight className="size-4" /></button>
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
    <div ref={ref} className={cn('marquee-wrap space-y-3 overflow-hidden pt-16 pb-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]', !visible && 'paused')}>
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
  const [look, setLook] = useState<Look>({ variant: 'color', animated: true, palette: 'spectrum', strokeWidth: 1.5 });
  const [touched, setTouched] = useState(false);
  const set = (p: Partial<Look>) => { setTouched(true); setLook((l) => ({ ...l, ...p })); };
  // until someone touches a control, tour the four styles
  useEffect(() => {
    if (touched || !visible) return;
    const order: Variant[] = ['line', 'duo', 'solid', 'duotone', 'color'];
    const t = setInterval(() => setLook((l) => ({ ...l, variant: order[(order.indexOf(l.variant) + 1) % 5] })), 2200);
    return () => clearInterval(t);
  }, [touched, visible]);
  const mono = look.variant !== 'color';
  const pal = !mono && look.palette !== 'spectrum' ? ` palette="${look.palette}"` : '';
  const code = `<BridleIcon name="${icon.name}" variant="${look.variant}"${look.animated ? ' animated' : ''}${pal} />`;
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6">
      <motion.div {...rise} className="mx-auto max-w-3xl text-center">
        <TextAnimate text="One drawing. Every style." type="rollIn" className="m-0 p-0 pb-0 text-4xl font-semibold tracking-tight text-ink sm:text-6xl dark:text-ink" />
        <p className="mt-4 text-lg text-ink/60">Every icon is a single set of shapes with roles. The renderer turns them into strokes, fills or gradients, so the styles never drift apart. Try it.</p>
      </motion.div>
      <motion.div {...rise} ref={ref} className="mt-12 grid overflow-hidden rounded-[32px] border bg-white shadow-[0_40px_120px_-50px_rgba(20,24,18,.35)] lg:grid-cols-[1.25fr_1fr]">
        <div className={cn('dots relative flex min-h-[420px] items-center justify-center bg-band text-ink [--bri-knockout:#f7f8f5]', !visible && 'paused')}>
          <AnimatePresence mode="popLayout">
            <motion.div key={`${icon.name}-${look.variant}`} initial={{ opacity: 0, scale: 0.7, filter: 'blur(12px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: 1.15, filter: 'blur(12px)' }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              <Svg icon={icon} look={look} size={220} />
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
            <p className="text-2xl font-semibold">Any palette</p>
            <p className="mt-1 text-ink/60">Eight presets or any hue you pick.</p>
            <div className="mt-6 grid grid-cols-4 gap-2">
              {PRESET_SWATCHES.map((p) => <div key={p.id} className="flex aspect-square items-center justify-center rounded-2xl bg-white/80"><Svg icon={byName['vault']} look={{ variant: 'color', palette: p.id as Look['palette'] }} size={34} /></div>)}
            </div>
          </Cell>
          <Cell className="md:col-span-2">
            <p className="text-6xl font-semibold tracking-tight tabular-nums"><RollingNumber value={TOTAL} /></p>
            <p className="mt-1 text-ink/60">unique drawings. No filler, no badge copies.</p>
            <p className="mt-6 text-4xl font-semibold tracking-tight tabular-nums text-ink/35"><RollingNumber value={TOTAL * 10} /></p>
            <p className="mt-1 text-ink/60">ready-made SVGs across 10 styles.</p>
          </Cell>
          <Cell className="bg-ink text-white md:col-span-2">
            <p className="text-2xl font-semibold">Crypto-native</p>
            <p className="mt-1 text-white/60">Sequencers, fraud proofs, perps, liquidity bins. Drawn by people who run a chain.</p>
            <div className="mt-6 grid grid-cols-3 gap-2">{chainIcons.map((i) => <div key={i.name} className="flex aspect-square items-center justify-center rounded-2xl bg-white/[.06] ring-1 ring-white/10"><Svg icon={i} look={{ variant: 'color' }} size={36} /></div>)}</div>
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
            <div className="my-6 flex justify-between">
              {g.cats.slice(0, 5).map((c, k) => (
                <div key={c.id} className="transition duration-300 group-hover:-translate-y-2" style={{ transitionDelay: `${k * 40}ms` }}>
                  <Chip icon={c.icons[0]} size={72} />
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
        <div className="relative mt-12 flex justify-center">
          {row.map((i, k) => <div key={i.name} className={cn('hero-float px-2 pb-12', k > 3 && 'hidden sm:block', k > 5 && 'sm:hidden lg:block')} style={{ animationDelay: `${-k * 0.6}s` }}><Chip icon={i} size={96} animated /></div>)}
        </div>
      </motion.div>
    </section>
  );
}

export function Why({ go, usage }: { go: (p: string) => void; usage: ReactNode }) {
  const noop = () => go('/icons');
  return (
    <main>
      <Marquee onOpen={noop} />
      <Playground />
      <Bento />
      <Collections go={go} />
      {usage}
      <Closing go={go} />
    </main>
  );
}
