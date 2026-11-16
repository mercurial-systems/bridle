import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Download, GitBranch as Github, Sparkles, X, Box, Copy, Image as ImageIcon, Moon, Sun } from 'lucide-react';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { TextAnimate } from '@/components/ui/text-animate';
import { TextureButton } from '@/components/ui/texture-button';
import { RollingNumber } from '@/components/ui/rolling-number';
import { GradientAnimation } from '@/components/ui/bg-animated-gradient';
import { HaloSearchInput } from '@/components/ui/halo-search';
import { HaloSegmented } from '@/components/ui/halo-segmented';
import { HaloSwitch } from '@/components/ui/halo-switch';
import { ColorPicker } from '@/components/ui/color-picker';
import { CopyButton } from '@/components/ui/copy-button';
import { CodeBlock } from '@/components/ui/code-block';
import { DirectionAwareTabs } from '@/components/ui/direction-aware-tabs';
import { TextureCard, TextureCardContent, TextureCardHeader, TextureCardTitle, TextureCardDescription } from '@/components/ui/texture-card';
import { cn } from '@/lib/utils';
import { CATEGORIES, ICONS, PRESET_SWATCHES, STYLE_LIST, download, downloadPng, fileSvg, hexToHue, match, styleId, svgFor, type Icon, type Look, type Variant } from '@/lib/bridle';

const GITHUB = 'https://github.com/mercurial-systems/bridle';
const SITE = 'https://bridle.verity.dev';
const byName = Object.fromEntries(ICONS.map((i) => [i.name, i]));

function Svg({ icon, look, size, className }: { icon: Icon; look: Partial<Look>; size: number; className?: string }) {
  const html = useMemo(() => svgFor(icon, look, size), [icon, look, size]);
  return <span className={cn('inline-flex leading-[0]', className)} dangerouslySetInnerHTML={{ __html: html }} />;
}

/* ------------------------------------------------------------------ hero */
const HERO_ICONS = ['crypto-wallet', 'credit-card', 'analytics', 'bank', 'swap', 'rocket', 'vault', 'block', 'shield-check', 'chart-bar', 'nft', 'coins'];
const GRADIENTS = [
  { centerX: 20, centerY: 20, stops: [{ color: 'rgba(139,92,246,.55)', position: 0 }, { color: 'rgba(7,7,12,0)', position: 55 }] },
  { centerX: 80, centerY: 30, stops: [{ color: 'rgba(236,72,153,.45)', position: 0 }, { color: 'rgba(7,7,12,0)', position: 55 }] },
  { centerX: 60, centerY: 80, stops: [{ color: 'rgba(20,184,166,.45)', position: 0 }, { color: 'rgba(7,7,12,0)', position: 55 }] },
  { centerX: 30, centerY: 70, stops: [{ color: 'rgba(251,146,60,.4)', position: 0 }, { color: 'rgba(7,7,12,0)', position: 55 }] },
];

function Hero() {
  const total = ICONS.length;
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 opacity-70"><GradientAnimation gradients={GRADIENTS} animationDuration={14} /></div>
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-28 pb-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-36 lg:pb-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <Sparkles className="size-3.5 text-violet-300" /> Free and open source · MIT
          </span>
          <GradientHeading size="xxl" weight="black" className="mt-5 pb-1 leading-none" variant="light">Bridle</GradientHeading>
          <TextAnimate text="Next-gen icons for business, money and crypto." type="rollIn" className="mt-3 max-w-xl p-0 pb-0 text-2xl font-semibold tracking-tight text-white md:text-3xl dark:text-white" />
          <p className="mt-4 max-w-xl text-base text-white/65">
            {total} original icons drawn once on one grid, then rendered as line, solid, colour and isometric 3D, still or in motion.
            Copy the SVG, drop in the React component, or grab the whole set.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="w-44"><TextureButton variant="accent" onClick={() => document.getElementById('icons')?.scrollIntoView()}>Browse icons</TextureButton></div>
            <div className="w-44"><TextureButton variant="secondary" onClick={() => (location.href = '/bridle-svg.zip')}><Download className="mr-2 size-4" />All SVGs (.zip)</TextureButton></div>
            <div className="w-36"><TextureButton variant="minimal" onClick={() => window.open(GITHUB, '_blank', 'noopener')}><Github className="mr-2 size-4" />GitHub</TextureButton></div>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            {[[total, 'icons'], [8, 'styles'], [total * 8, 'ready-made SVGs']].map(([n, l]) => (
              <div key={l} className="rounded-2xl border bg-white/[.03] p-3 backdrop-blur">
                <dt className="text-2xl font-bold tabular-nums text-white"><RollingNumber value={n as number} /></dt>
                <dd className="text-xs text-white/55">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative grid grid-cols-4 gap-1 sm:gap-3 [perspective:900px]">
          {HERO_ICONS.map((n, i) => (
            <motion.div key={n} initial={{ opacity: 0, y: 30, rotateX: 25 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.15 + i * 0.06, type: 'spring', bounce: 0.35 }}
              className={cn('flex justify-center', i % 2 ? 'translate-y-6' : '')}>
              <Svg icon={byName[n]} look={{ variant: 'iso', animated: true }} size={120} className="w-full max-w-[120px] drop-shadow-[0_18px_30px_rgba(0,0,0,.45)] [&_svg]:h-auto [&_svg]:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ styles showcase */
function StyleShowcase() {
  const [name, setName] = useState('crypto-wallet');
  const picks = ['crypto-wallet', 'credit-card', 'bank', 'rocket', 'swap', 'piggy-bank'];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">One drawing. <span className="spectrum-text">Eight styles.</span></h2>
          <p className="mt-2 max-w-2xl text-white/60">Every icon is a single set of shapes with roles: body, accent, detail. The renderer turns those roles into strokes, fills, gradients or a lit 3D tile, so all eight styles always match.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {picks.map((p) => (
            <button key={p} onClick={() => setName(p)} className={cn('rounded-xl border p-2 transition hover:bg-white/10', p === name && 'border-violet-400/60 bg-violet-500/10')} aria-label={p}>
              <Svg icon={byName[p]} look={{ variant: 'color' }} size={26} />
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STYLE_LIST.map((s) => (
          <TextureCard key={s.id} className="overflow-hidden">
            <div className={cn('flex h-40 items-center justify-center', s.variant === 'line' || s.variant === 'solid' ? 'text-white' : '')}>
              <Svg icon={byName[name]} look={{ variant: s.variant, animated: s.animated }} size={s.variant === 'iso' ? 128 : 72} />
            </div>
            <div className="flex items-center justify-between border-t px-4 py-2 text-xs text-white/60">
              <span>{s.label}</span>
              <span className="font-mono text-white/35">{s.id}</span>
            </div>
          </TextureCard>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ browser */
const VARIANTS: { value: Variant; label: string }[] = [
  { value: 'line', label: 'Line' }, { value: 'solid', label: 'Solid' }, { value: 'color', label: 'Colour' }, { value: 'iso', label: 'Isometric' },
];

function Browser({ onOpen, look, setLook, light, setLight }: { onOpen: (i: Icon) => void; look: Look; setLook: (l: Look) => void; light: boolean; setLight: (b: boolean) => void }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [custom, setCustom] = useState('#8b5cf6');
  const armed = useRef(false); // the picker reports its colour on mount; only react once the user touches it
  const dq = useDeferredValue(q);
  const list = useMemo(() => ICONS.filter((i) => (cat === 'all' || i.cat === cat) && match(i, dq)), [cat, dq]);
  const mono = look.variant === 'line' || look.variant === 'solid';
  const size = look.variant === 'iso' ? 84 : 34;
  const set = (p: Partial<Look>) => setLook({ ...look, ...p });

  return (
    <section id="icons" className="mx-auto max-w-7xl scroll-mt-4 px-4 pb-24 sm:px-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The library</h2>
        <p className="mt-2 text-white/60">SaaS, business operations, corporate work, finance, banking, cards and a full crypto section. Click any icon to copy or download it.</p>
      </div>

      <div className="sticky top-2 z-30 rounded-3xl border bg-[#0b0a12]/85 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="min-w-0 flex-1">
            <HaloSearchInput value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder={`Search ${ICONS.length} icons: wallet, swap, invoice…`} aria-label="Search icons" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <HaloSegmented items={VARIANTS} value={look.variant} onValueChange={(v) => set({ variant: v as Variant })} />
            <label className="flex items-center gap-2 text-sm text-white/70">
              <HaloSwitch checked={look.animated} onCheckedChange={(c) => set({ animated: c })} aria-label="Animate" /> Motion
            </label>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {mono ? (
            <>
              <span className="text-xs text-white/45">Stroke</span>
              <HaloSegmented items={[1, 1.5, 2].map((n) => ({ value: String(n), label: String(n) }))} value={String(look.strokeWidth)} onValueChange={(v) => set({ strokeWidth: +v })} />
              <button onClick={() => setLight(!light)} className="ml-1 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs text-white/70 hover:bg-white/10">
                {light ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />} {light ? 'Dark canvas' : 'Light canvas'}
              </button>
            </>
          ) : (
            <>
              <span className="text-xs text-white/45">Palette</span>
              {PRESET_SWATCHES.map((p) => (
                <button key={p.id} title={p.label} onClick={() => set({ palette: p.id as Look['palette'] })}
                  className={cn('size-7 rounded-full border-2 transition hover:scale-110', look.palette === p.id ? 'border-white' : 'border-transparent')}
                  style={{ background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})` }} aria-label={`${p.label} palette`} />
              ))}
              <div onPointerDown={() => (armed.current = true)} onKeyDown={() => (armed.current = true)} className={cn('flex items-center gap-2 rounded-full border px-2 py-0.5', typeof look.palette === 'number' && 'border-white/60')}>
                <span className="text-xs text-white/55">Custom</span>
                <ColorPicker color={custom} onChange={(c) => { if (!armed.current || c === custom) return; setCustom(c); set({ palette: hexToHue(c) }); }} />
              </div>
            </>
          )}
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {[{ id: 'all', label: 'All', n: ICONS.length }, ...CATEGORIES.map((c) => ({ id: c.id, label: c.label, n: c.icons.length }))].map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={cn('shrink-0 rounded-full border px-3 py-1.5 text-xs transition', cat === c.id ? 'border-white/70 bg-white text-black' : 'text-white/70 hover:bg-white/10')}>
              {c.label} <span className="opacity-50">{c.n}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-xs text-white/40">{list.length} icon{list.length === 1 ? '' : 's'}</p>
      <div className={cn('mt-2 grid gap-2', look.variant === 'iso' ? 'grid-cols-[repeat(auto-fill,minmax(118px,1fr))]' : 'grid-cols-[repeat(auto-fill,minmax(96px,1fr))]')}>
        {list.map((i) => (
          <button key={i.name} onClick={() => onOpen(i)}
            className={cn('icon-cell group flex flex-col items-center gap-2 rounded-2xl border px-1 pt-5 pb-3 transition hover:-translate-y-0.5 hover:border-white/25',
              light && mono ? 'bg-white text-neutral-900 hover:bg-neutral-100' : 'bg-white/[.025] text-white hover:bg-white/[.06]')}>
            <Svg icon={i} look={look} size={size} className="transition group-hover:scale-110" />
            <span className={cn('max-w-full truncate px-1 text-[11px]', light && mono ? 'text-neutral-500' : 'text-white/50')}>{i.name}</span>
          </button>
        ))}
      </div>
      {!list.length && <p className="py-20 text-center text-white/50">Nothing matches “{q}”. Try a broader word like “card”, “chart” or “token”.</p>}
    </section>
  );
}

/* ------------------------------------------------------------------ detail drawer */
function Detail({ icon, look, onClose, setLook }: { icon: Icon; look: Look; onClose: () => void; setLook: (l: Look) => void }) {
  const file = fileSvg(icon, look);
  const sid = styleId(look);
  const pal = typeof look.palette === 'number' ? ` palette={${look.palette}}` : look.palette && look.palette !== 'spectrum' ? ` palette="${look.palette}"` : '';
  const sw = (look.variant === 'line' || look.variant === 'solid') && look.strokeWidth !== 1.5 ? ` strokeWidth={${look.strokeWidth}}` : '';
  const jsx = `<BridleIcon name="${icon.name}" variant="${look.variant}"${look.animated ? ' animated' : ''}${pal}${sw} size={${look.variant === 'iso' ? 64 : 24}} />`;
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <motion.div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.aside role="dialog" aria-label={`${icon.name} icon`} onClick={(e) => e.stopPropagation()}
        initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 60, opacity: 0 }} transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
        className="h-full w-full max-w-xl overflow-y-auto border-l bg-[#0b0a12] p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40">{CATEGORIES.find((c) => c.id === icon.cat)?.label}</p>
            <h3 className="mt-1 font-mono text-2xl font-semibold">{icon.name}</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">{icon.tags.map((t) => <span key={t} className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-white/55">{t}</span>)}</div>
          </div>
          <button onClick={onClose} className="rounded-full border p-2 text-white/70 hover:bg-white/10" aria-label="Close"><X className="size-4" /></button>
        </div>

        <div className={cn('relative mt-6 flex h-72 items-center justify-center overflow-hidden rounded-3xl border', look.variant === 'line' || look.variant === 'solid' ? 'bg-white text-neutral-900' : 'bg-[radial-gradient(circle_at_50%_30%,#2a2245,#0b0a12_70%)]')}>
          <Svg icon={icon} look={look} size={look.variant === 'iso' ? 240 : 150} />
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {STYLE_LIST.map((s) => (
            <button key={s.id} onClick={() => setLook({ ...look, variant: s.variant, animated: s.animated })} title={s.label}
              className={cn('flex flex-col items-center gap-1 rounded-2xl border p-2 text-white transition hover:bg-white/10', s.id === sid && 'border-violet-400/70 bg-violet-500/10')}>
              <Svg icon={icon} look={{ ...look, variant: s.variant, animated: s.animated }} size={s.variant === 'iso' ? 54 : 30} />
              <span className="text-[10px] text-white/50">{s.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <div className="w-36"><TextureButton variant="accent" onClick={() => download(`${icon.name}-${sid}.svg`, new Blob([file], { type: 'image/svg+xml' }))}><Download className="mr-2 size-4" />SVG</TextureButton></div>
          <div className="w-36"><TextureButton variant="secondary" onClick={() => downloadPng(icon, look)}><ImageIcon className="mr-2 size-4" />PNG 512</TextureButton></div>
          <div className="flex items-center gap-1 rounded-xl border px-3 text-sm text-white/70"><Copy className="size-3.5" /> SVG <CopyButton value={file} /></div>
          <div className="flex items-center gap-1 rounded-xl border px-3 text-sm text-white/70"><Box className="size-3.5" /> JSX <CopyButton value={jsx} /></div>
        </div>

        <div className="mt-6">
          <CodeBlock tabs={[
            { label: 'React', language: 'tsx', code: `import { BridleIcon } from 'bridle-icons/react';\n\n${jsx}` },
            { label: 'Web component', language: 'html', code: `<script type="module" src="${SITE}/bridle.js"></script>\n\n<bridle-icon name="${icon.name}" variant="${look.variant}"${look.animated ? ' animated' : ''}${typeof look.palette === 'number' ? ` hue="${look.palette}"` : look.palette && look.palette !== 'spectrum' ? ` palette="${look.palette}"` : ''}></bridle-icon>` },
            { label: 'URL', language: 'html', code: `<img src="${SITE}/svg/${sid}/${icon.name}.svg" width="${look.variant === 'iso' ? 64 : 24}" alt="${icon.name.replace(/-/g, ' ')}" />` },
            { label: 'SVG', language: 'xml', code: file },
          ]} />
        </div>
      </motion.aside>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ usage + principles */
function Usage() {
  const tabs = [
    { id: 0, label: 'React', content: <CodeBlock code={`npm i github:mercurial-systems/bridle\n\nimport { BridleIcon } from 'bridle-icons/react';\n\n<BridleIcon name="crypto-wallet" />                       // line, inherits text colour\n<BridleIcon name="credit-card" variant="color" animated />\n<BridleIcon name="vault" variant="iso" palette="ocean" size={96} />\n<BridleIcon name="swap" variant="color" palette={200} />   // any hue`} language="tsx" /> },
    { id: 1, label: 'Web component', content: <CodeBlock code={`<script type="module" src="${SITE}/bridle.js"></script>\n\n<bridle-icon name="bank"></bridle-icon>\n<bridle-icon name="swap" variant="color" animated></bridle-icon>\n<bridle-icon name="block" variant="iso" animated size="96" hue="180"></bridle-icon>`} language="html" /> },
    { id: 2, label: 'Plain SVG', content: <CodeBlock code={`<!-- every icon in every style is a static file -->\n<img src="${SITE}/svg/color-animated/rocket.svg" width="32" alt="rocket" />\n\n<!-- or a sprite (line and solid inherit currentColor) -->\n<svg width="24" height="24"><use href="${SITE}/bridle-line.svg#wallet" /></svg>\n\n<!-- everything at once -->\n${SITE}/bridle-svg.zip\n${SITE}/icons.json`} language="html" /> },
    { id: 3, label: 'JavaScript', content: <CodeBlock code={`import { svg, ICONS } from 'bridle-icons';\n\nel.innerHTML = svg('invoice', { variant: 'solid', strokeWidth: 2 });\nconst coin = svg('token', { variant: 'iso', animated: true, palette: [42, 210] });\nconsole.log(ICONS.length); // ${ICONS.length}`} language="js" /> },
  ];
  return (
    <section className="border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Use it anywhere</h2>
          <p className="mt-3 text-white/60">A React component, a framework-free web component, plain files on a CDN, sprites and a zero-dependency renderer. Same names everywhere.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              ['24 px grid', '2 px safe area, 1.5 stroke, round caps and joins. Line and solid inherit your text colour.'],
              ['Roles, not paths', 'Body, accent and detail shapes drive every style, so colour and 3D never drift from line.'],
              ['Motion built in', 'CSS keyframes inside each SVG: works in <img>, needs no runtime, honours reduced-motion.'],
              ['Mark-free crypto', 'Abstract glyphs only: no chain or token logos, so every icon is safe to ship anywhere.'],
            ].map(([t, d]) => (
              <TextureCard key={t}>
                <TextureCardHeader><TextureCardTitle className="text-base">{t}</TextureCardTitle></TextureCardHeader>
                <TextureCardContent className="pt-0"><TextureCardDescription className="pl-0">{d}</TextureCardDescription></TextureCardContent>
              </TextureCard>
            ))}
          </div>
        </div>
        <div className="min-w-0"><DirectionAwareTabs tabs={tabs} className="mx-auto" /></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 text-sm text-white/55 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Svg icon={byName['sparkles']} look={{ variant: 'iso', palette: 'grape' }} size={44} />
          <div>
            <p className="font-semibold text-white">Bridle</p>
            <p>A public good from Verity. Icons and code under the MIT licence.</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 md:text-right">
          <a href={GITHUB} className="text-white/80 hover:text-white">github.com/mercurial-systems/bridle</a>
          <p className="text-xs text-white/40">Verity has not announced a token. Any airdrop or presale offer is a scam.</p>
        </div>
      </div>
    </footer>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-3 mt-3 flex max-w-7xl items-center justify-between rounded-2xl border bg-black/30 px-3 py-2 backdrop-blur-xl sm:mx-6 xl:mx-auto">
        <a href="/" className="flex items-center gap-2 font-semibold">
          <Svg icon={byName['sparkles']} look={{ variant: 'color', animated: true, palette: 'grape' }} size={26} /> Bridle
        </a>
        <nav className="flex items-center gap-1 text-sm text-white/70">
          <a href="#icons" className="rounded-lg px-3 py-1.5 hover:bg-white/10">Icons</a>
          <a href="#use" className="hidden rounded-lg px-3 py-1.5 hover:bg-white/10 sm:block">Use</a>
          <a href={GITHUB} className="rounded-lg px-3 py-1.5 hover:bg-white/10" aria-label="GitHub"><Github className="size-4" /></a>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  const [look, setLook] = useState<Look>({ variant: 'color', animated: false, palette: 'spectrum', strokeWidth: 1.5 });
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState<Icon | null>(() => byName[new URLSearchParams(location.search).get('icon') || ''] || null);
  useEffect(() => {
    const u = new URL(location.href);
    if (open) u.searchParams.set('icon', open.name); else u.searchParams.delete('icon');
    history.replaceState(null, '', u);
  }, [open]);
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <StyleShowcase />
      <Browser onOpen={setOpen} look={look} setLook={setLook} light={light} setLight={setLight} />
      <div id="use"><Usage /></div>
      <Footer />
      <AnimatePresence>{open && <Detail key={open.name} icon={open} look={look} setLook={setLook} onClose={() => setOpen(null)} />}</AnimatePresence>
    </div>
  );
}
