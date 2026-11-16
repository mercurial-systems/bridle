import { memo, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Download, GitBranch, Search, X, Copy, Image as ImageIcon, Box } from 'lucide-react';
import { TextAnimate } from '@/components/ui/text-animate';
import { TextureButton } from '@/components/ui/texture-button';
import { RollingNumber } from '@/components/ui/rolling-number';
import { HaloSegmented } from '@/components/ui/halo-segmented';
import { HaloSwitch } from '@/components/ui/halo-switch';
import { ColorPicker } from '@/components/ui/color-picker';
import { CopyButton } from '@/components/ui/copy-button';
import { CodeBlock } from '@/components/ui/code-block';
import { DirectionAwareTabs } from '@/components/ui/direction-aware-tabs';
import { cn } from '@/lib/utils';
import { useVisible } from '@/lib/visible';
import { CATEGORIES, ICONS, PRESET_SWATCHES, STYLE_LIST, download, downloadPng, fileSvg, hexToHue, match, styleId, svgFor, type Icon, type Look, type Variant } from '@/lib/bridle';

const GITHUB = 'https://github.com/mercurial-systems/bridle';
const SITE = 'https://bridle.verity.dev';
const byName: Record<string, Icon> = Object.fromEntries(ICONS.map((i) => [i.name, i]));
const TOTAL = ICONS.length;
const NEW = TOTAL - 220;
const fmt = (n: number) => n.toLocaleString('en-US');

/* ---------------------------------------------------------------- routing (two pages, no router) */
function usePath() {
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    const f = () => setPath(location.pathname);
    addEventListener('popstate', f);
    return () => removeEventListener('popstate', f);
  }, []);
  const go = useCallback((p: string) => {
    history.pushState(null, '', p);
    setPath(p.split('?')[0]);
    scrollTo(0, 0);
  }, []);
  return [path, go] as const;
}

/* ---------------------------------------------------------------- one icon */
function Svg({ icon, look, size, className }: { icon: Icon; look: Partial<Look>; size: number; className?: string }) {
  const html = useMemo(() => svgFor(icon, look, size), [icon, look.variant, look.animated, look.palette, look.strokeWidth, size]);
  return <span className={cn('inline-flex leading-[0]', className)} dangerouslySetInnerHTML={{ __html: html }} />;
}

// Animates only while on screen, and (unless Motion is on) only while hovered.
function LiveSvg({ icon, look, size, className, hover }: { icon: Icon; look: Partial<Look>; size: number; className?: string; hover?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useVisible(ref);
  const animated = visible && (!!look.animated || !!hover);
  const html = useMemo(() => svgFor(icon, { ...look, animated }, size), [icon, look.variant, look.palette, look.strokeWidth, animated, size]);
  return <span ref={ref} className={cn('inline-flex leading-[0]', className)} dangerouslySetInnerHTML={{ __html: html }} />;
}

/* ---------------------------------------------------------------- nav */
function Nav({ go, path }: { go: (p: string) => void; path: string }) {
  const link = (p: string, label: string) => (
    <a href={p} onClick={(e) => { e.preventDefault(); go(p); }} className={cn('rounded-lg px-3 py-1.5 text-[15px] text-ink/70 hover:text-ink', path === p && 'font-medium text-ink')}>{label}</a>
  );
  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6">
        <a href="/" onClick={(e) => { e.preventDefault(); go('/'); }} className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <Svg icon={byName['sparkles']} look={{ variant: 'color', palette: 'mint' }} size={26} /> Bridle
        </a>
        <nav className="flex items-center gap-1">
          <button onClick={() => go('/icons')} className="mr-1 hidden rounded-lg p-2 text-ink/60 hover:bg-tile sm:block" aria-label="Search icons"><Search className="size-[18px]" /></button>
          {link('/icons', 'Icons')}
          {link('/use', 'Docs')}
          <a href={GITHUB} className="hidden rounded-lg px-3 py-1.5 text-[15px] text-ink/70 hover:text-ink sm:block">GitHub</a>
          <a href="/bridle-svg.zip" className="ml-2 hidden rounded-lg border bg-band px-3.5 py-1.5 text-sm font-medium hover:bg-tile sm:block">Download</a>
        </nav>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- home */
const MOCK = [['dashboard', 'Overview'], ['crypto-wallet', 'Wallet'], ['swap', 'Swap'], ['credit-card', 'Cards'], ['chart-line', 'Markets'], ['shield-check', 'Security'], ['settings', 'Settings']];
const SHOW_VARIANTS: { value: Variant; label: string }[] = [
  { value: 'line', label: 'Line' }, { value: 'solid', label: 'Solid' }, { value: 'color', label: 'Colour' }, { value: 'iso', label: 'Isometric' },
];

function HeroMock() {
  const [variant, setVariant] = useState<Variant>('color');
  const [active, setActive] = useState(1);
  const iso = variant === 'iso';
  return (
    <div>
      <div className="dots relative overflow-hidden rounded-2xl border bg-[#f2f3ef] p-6 sm:p-8">
        <div className="mx-auto w-full max-w-[340px] rounded-2xl border bg-white p-3 shadow-[0_20px_50px_-20px_rgba(20,24,18,.25)]">
          <div className="flex items-center gap-3 px-2 pb-3">
            <Svg icon={byName['user']} look={{ variant: 'color', palette: 'sunset' }} size={34} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Treasury</p>
              <p className="truncate text-xs text-muted-foreground">3 accounts · 12 assets</p>
            </div>
            <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold text-white">PRO</span>
          </div>
          {iso ? (
            <div className="grid grid-cols-3 gap-1 border-t pt-3">
              {MOCK.slice(0, 6).map(([n, l]) => (
                <div key={n} className="flex flex-col items-center"><LiveSvg icon={byName[n]} look={{ variant: 'iso', animated: true }} size={78} /><span className="-mt-1 text-[11px] text-muted-foreground">{l}</span></div>
              ))}
            </div>
          ) : (
            <ul className="border-t pt-2">
              {MOCK.map(([n, l], i) => (
                <li key={n}>
                  <button onMouseEnter={() => setActive(i)} className={cn('flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm', i === active ? 'bg-tile font-medium' : 'text-ink/75')}>
                    <span className="text-ink"><LiveSvg icon={byName[n]} look={{ variant }} hover={i === active} size={20} /></span>
                    {l}
                    {i === 2 && <span className="ml-auto rounded-md bg-lime px-1.5 text-[10px] font-semibold">NEW</span>}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {SHOW_VARIANTS.map((v) => (
          <button key={v.value} onClick={() => setVariant(v.value)} className={cn('rounded-full border px-3.5 py-1.5 text-sm transition', v.value === variant ? 'border-ink/20 bg-white font-medium shadow-sm' : 'bg-band text-ink/65 hover:bg-tile')}>{v.label}</button>
        ))}
      </div>
    </div>
  );
}

const CARD_ICONS = ['home', 'analytics', 'wallet', 'invoice', 'bank', 'block'];
const STYLE_CARDS: { variant: Variant; title: string; sub: string; bg: string }[] = [
  { variant: 'line', title: 'Line', sub: '1.5 stroke', bg: '#f3f1ec' },
  { variant: 'solid', title: 'Solid', sub: 'Knock-out details', bg: '#eef3f8' },
  { variant: 'color', title: 'Colour', sub: 'Gradient duotone', bg: '#f8eeee' },
  { variant: 'iso', title: 'Isometric', sub: 'Extruded 3D', bg: '#f1effa' },
];

function StyleCard({ c }: { c: (typeof STYLE_CARDS)[number] }) {
  const [hover, setHover] = useState(false);
  const iso = c.variant === 'iso';
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="rounded-2xl p-6 text-center" style={{ background: c.bg }}>
      <div className={cn('mx-auto grid w-fit grid-cols-3 text-ink', iso ? 'gap-0' : 'gap-5')}>
        {CARD_ICONS.map((n) => <LiveSvg key={n} icon={byName[n]} look={{ variant: c.variant }} hover={hover} size={iso ? 64 : 30} />)}
      </div>
      <p className="mt-6 text-xl font-semibold">{c.title}</p>
      <p className="text-ink/55">{c.sub}</p>
    </div>
  );
}

function Home({ go }: { go: (p: string) => void }) {
  return (
    <main>
      <section className="border-b bg-gradient-to-b from-[#fafaf8] to-white">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:py-24">
          <div>
            <h1 className="text-[42px] leading-[1.05] font-semibold tracking-tight sm:text-6xl">
              Next-gen icons <span className="text-ink/35">that make money look good.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink/70 sm:text-xl">
              {fmt(TOTAL)} original icons for SaaS, finance, banking and crypto. Line, solid, colour and isometric 3D, still or in motion. Free and MIT licensed.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={() => go('/icons')} className="inline-flex items-center gap-2 rounded-xl border border-lime-deep/30 bg-lime px-5 py-3 text-[15px] font-semibold text-ink shadow-[inset_0_-2px_0_rgba(0,0,0,.08)] hover:brightness-95">
                Explore {fmt(TOTAL)} icons <ArrowRight className="size-4" />
              </button>
              <div className="w-48"><TextureButton variant="minimal" onClick={() => (location.href = '/bridle-svg.zip')}><Download className="mr-2 size-4" />All SVGs (.zip)</TextureButton></div>
            </div>
            <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {[[TOTAL, 'icons'], [8, 'styles'], [CATEGORIES.length, 'categories'], [TOTAL * 8, 'SVG files']].map(([n, l]) => (
                <div key={l}><dt className="text-3xl font-semibold tabular-nums"><RollingNumber value={n as number} /></dt><dd className="text-sm text-ink/55">{l}</dd></div>
              ))}
            </dl>
          </div>
          <HeroMock />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{STYLE_CARDS.map((c) => <StyleCard key={c.variant} c={c} />)}</div>
        <p className="mt-5 text-center text-sm text-ink/50">Hover a card to play its motion. Every style also ships as an animated SVG.</p>
      </section>

      <section className="border-y bg-band">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6">
          <TextAnimate text="Built for every product." type="rollIn" className="m-0 p-0 pb-0 text-center text-4xl font-semibold tracking-tight text-ink sm:text-5xl dark:text-ink" />
          <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-ink/60">From dashboards and invoices to validators, perps and prediction markets. {fmt(NEW)} new icons in this release.</p>
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => go(`/icons?c=${c.id}`)} className="group flex items-center gap-3 rounded-xl border bg-white p-3 text-left hover:border-ink/20">
                <Svg icon={c.icons[0]} look={{ variant: 'color' }} size={28} />
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{c.label}</span><span className="text-xs text-ink/50">{fmt(c.icons.length)} icons</span></span>
                <ArrowRight className="size-4 text-ink/30 transition group-hover:translate-x-0.5 group-hover:text-ink" />
              </button>
            ))}
          </div>
        </div>
      </section>
      <Usage />
    </main>
  );
}

/* ---------------------------------------------------------------- library */
const Tile = memo(function Tile({ icon, look, onOpen, size }: { icon: Icon; look: Look; onOpen: (i: Icon) => void; size: number }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={() => onOpen(icon)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} title={icon.name}
      className={cn('tile group relative flex aspect-square items-center justify-center rounded-lg bg-tile text-ink transition-colors hover:bg-[#e9eae4]', look.variant === 'iso' && 'rounded-xl')}>
      <LiveSvg icon={icon} look={look} hover={hover} size={size} />
      <span className="pointer-events-none absolute inset-x-1 bottom-1 truncate text-center text-[10px] text-ink/55 opacity-0 transition group-hover:opacity-100">{icon.name}</span>
    </button>
  );
});

const PAGE = 240;
function Library({ look, setLook, onOpen }: { look: Look; setLook: (l: Look) => void; onOpen: (i: Icon) => void }) {
  const params = new URLSearchParams(location.search);
  const [q, setQ] = useState(params.get('q') || '');
  const [cat, setCat] = useState(params.get('c') || 'all');
  const [limit, setLimit] = useState(PAGE);
  const [custom, setCustom] = useState('#22c55e');
  const armed = useRef(false); // the colour picker reports its colour on mount; only react once touched
  const dq = useDeferredValue(q);
  const list = useMemo(() => ICONS.filter((i) => (cat === 'all' || i.cat === cat) && match(i, dq)), [cat, dq]);
  const shown = list.slice(0, limit);
  const sentinel = useRef<HTMLDivElement>(null);
  const more = useVisible(sentinel);
  useEffect(() => { if (more && limit < list.length) setLimit((l) => l + PAGE); }, [more, limit, list.length]);
  useEffect(() => setLimit(PAGE), [cat, dq, look.variant]);
  useEffect(() => {
    const u = new URL(location.href);
    if (cat === 'all') u.searchParams.delete('c'); else u.searchParams.set('c', cat);
    if (dq) u.searchParams.set('q', dq); else u.searchParams.delete('q');
    history.replaceState(null, '', u);
  }, [cat, dq]);
  const mono = look.variant === 'line' || look.variant === 'solid';
  const iso = look.variant === 'iso';
  const set = (p: Partial<Look>) => setLook({ ...look, ...p });
  const catLabel = cat === 'all' ? 'All icons' : CATEGORIES.find((c) => c.id === cat)?.label;

  return (
    <main>
      <section className="border-b bg-gradient-to-b from-band to-[#f3f4f0]">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <label className="flex items-center gap-3 rounded-xl border border-ink/15 bg-white px-4 py-3.5 shadow-sm focus-within:border-lime-deep/60 focus-within:ring-4 focus-within:ring-lime/40">
            <Search className="size-5 text-lime-deep" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${fmt(TOTAL)} icons…`} className="min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-ink/40" aria-label="Search icons" />
            {q && <button onClick={() => setQ('')} className="rounded-md p-1 text-ink/50 hover:bg-tile" aria-label="Clear search"><X className="size-4" /></button>}
          </label>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2"><span className="text-sm font-semibold">Styles:</span>
              <HaloSegmented translucent={false} items={SHOW_VARIANTS} value={look.variant} onValueChange={(v) => set({ variant: v as Variant })} />
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold">Motion <HaloSwitch translucent={false} checked={look.animated} onCheckedChange={(c) => set({ animated: c })} aria-label="Animate all visible icons" /></label>
            {mono ? (
              <div className="flex items-center gap-2"><span className="text-sm font-semibold">Stroke:</span>
                <HaloSegmented translucent={false} items={[1, 1.5, 2].map((n) => ({ value: String(n), label: String(n) }))} value={String(look.strokeWidth)} onValueChange={(v) => set({ strokeWidth: +v })} />
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-1.5"><span className="mr-1 text-sm font-semibold">Palette:</span>
                {PRESET_SWATCHES.map((p) => (
                  <button key={p.id} title={p.label} aria-label={`${p.label} palette`} onClick={() => set({ palette: p.id as Look['palette'] })}
                    className={cn('size-6 rounded-full ring-offset-2 transition hover:scale-110', look.palette === p.id && 'ring-2 ring-ink')}
                    style={{ background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})` }} />
                ))}
                <span onPointerDown={() => (armed.current = true)} onKeyDown={() => (armed.current = true)} className={cn('ml-1 rounded-full', typeof look.palette === 'number' && 'ring-2 ring-ink ring-offset-2')}>
                  <ColorPicker color={custom} onChange={(c) => { if (!armed.current || c === custom) return; setCustom(c); set({ palette: hexToHue(c) }); }} />
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1400px] gap-8 px-4 py-8 sm:px-6">
        <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-60 shrink-0 overflow-y-auto pr-2 lg:block">
          <p className="mb-2 text-sm font-semibold">Categories</p>
          {[{ id: 'all', label: 'All icons', n: TOTAL }, ...CATEGORIES.map((c) => ({ id: c.id, label: c.label, n: c.icons.length }))].map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} className={cn('flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-[14px]', cat === c.id ? 'bg-tile font-medium' : 'text-ink/70 hover:bg-band')}>
              <span className="truncate">{c.label}</span><span className="text-xs text-ink/45 tabular-nums">{fmt(c.n)}</span>
            </button>
          ))}
        </aside>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:hidden">
            {[{ id: 'all', label: 'All' }, ...CATEGORIES].map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)} className={cn('shrink-0 rounded-full border px-3 py-1 text-sm', cat === c.id ? 'border-ink bg-ink text-white' : 'bg-white')}>{c.label}</button>
            ))}
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-semibold">{catLabel}</h2>
            <p className="text-sm text-ink/50">{fmt(list.length)} icons{dq && ` for “${dq}”`}</p>
          </div>
          <p className="mt-1 mb-5 text-sm text-ink/55">Click any icon to copy it as SVG, React or a URL, or download a PNG.</p>
          <div className={cn('grid gap-2', iso ? 'grid-cols-[repeat(auto-fill,minmax(104px,1fr))]' : 'grid-cols-[repeat(auto-fill,minmax(68px,1fr))]')}>
            {shown.map((i) => <Tile key={i.name} icon={i} look={look} onOpen={onOpen} size={iso ? 88 : 28} />)}
          </div>
          {limit < list.length && <div ref={sentinel} className="py-10 text-center text-sm text-ink/45">Loading more…</div>}
          {!list.length && <p className="py-24 text-center text-ink/55">No icons match “{q}”. Try a broader word like “card”, “chart” or “token”.</p>}
        </div>
      </div>
    </main>
  );
}

/* ---------------------------------------------------------------- detail */
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
    <motion.div className="fixed inset-0 z-50 flex justify-end bg-ink/25" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.aside role="dialog" aria-label={`${icon.name} icon`} onClick={(e) => e.stopPropagation()}
        initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 40, opacity: 0 }} transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }}
        className="h-full w-full max-w-xl overflow-y-auto border-l bg-white p-5 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-wide text-ink/45 uppercase">{CATEGORIES.find((c) => c.id === icon.cat)?.label}</p>
            <h3 className="mt-1 font-mono text-2xl font-semibold">{icon.name}</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">{icon.tags.slice(0, 10).map((t) => <span key={t} className="rounded-md bg-tile px-2 py-0.5 text-xs text-ink/60">{t}</span>)}</div>
          </div>
          <button onClick={onClose} className="rounded-lg border p-2 text-ink/60 hover:bg-tile" aria-label="Close"><X className="size-4" /></button>
        </div>
        <div className="dots mt-6 flex h-72 items-center justify-center rounded-2xl border bg-band text-ink">
          <Svg icon={icon} look={{ ...look, animated: true }} size={look.variant === 'iso' ? 240 : 140} />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {STYLE_LIST.map((s) => (
            <button key={s.id} onClick={() => setLook({ ...look, variant: s.variant, animated: s.animated })} title={s.label}
              className={cn('flex flex-col items-center gap-1 rounded-xl border p-2 text-ink transition hover:bg-band', s.id === sid && 'border-lime-deep/50 bg-lime/25')}>
              <Svg icon={icon} look={{ ...look, variant: s.variant, animated: false }} size={s.variant === 'iso' ? 50 : 26} />
              <span className="text-[10px] text-ink/55">{s.label}</span>
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={() => download(`${icon.name}-${sid}.svg`, new Blob([file], { type: 'image/svg+xml' }))} className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-ink/85"><Download className="size-4" />SVG</button>
          <button onClick={() => downloadPng(icon, look)} className="inline-flex items-center gap-2 rounded-xl border bg-band px-4 py-2.5 text-sm font-medium hover:bg-tile"><ImageIcon className="size-4" />PNG 512</button>
          <div className="flex items-center gap-1 rounded-xl border px-3 text-sm text-ink/70"><Copy className="size-3.5" /> SVG <CopyButton value={file} /></div>
          <div className="flex items-center gap-1 rounded-xl border px-3 text-sm text-ink/70"><Box className="size-3.5" /> JSX <CopyButton value={jsx} /></div>
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

/* ---------------------------------------------------------------- docs */
function Usage() {
  const tabs = [
    { id: 0, label: 'React', content: <CodeBlock code={`npm i github:mercurial-systems/bridle\n\nimport { BridleIcon } from 'bridle-icons/react';\n\n<BridleIcon name="crypto-wallet" />                      // line, inherits text colour\n<BridleIcon name="credit-card" variant="color" animated />\n<BridleIcon name="vault" variant="iso" palette="ocean" size={96} />\n<BridleIcon name="wallet-check" variant="solid" />       // status variants`} language="tsx" /> },
    { id: 1, label: 'Web component', content: <CodeBlock code={`<script type="module" src="${SITE}/bridle.js"></script>\n\n<bridle-icon name="bank"></bridle-icon>\n<bridle-icon name="swap" variant="color" animated></bridle-icon>\n<bridle-icon name="block" variant="iso" animated size="96" hue="180"></bridle-icon>`} language="html" /> },
    { id: 2, label: 'Plain SVG', content: <CodeBlock code={`<img src="${SITE}/svg/color-animated/rocket.svg" width="32" alt="rocket" />\n<svg width="24" height="24"><use href="${SITE}/bridle-line.svg#wallet" /></svg>\n\n${SITE}/bridle-svg.zip   // every icon, every style\n${SITE}/icons.json       // names, tags, categories`} language="html" /> },
    { id: 3, label: 'JavaScript', content: <CodeBlock code={`import { svg, ICONS } from 'bridle-icons';\n\nel.innerHTML = svg('invoice', { variant: 'solid', strokeWidth: 2 });\nconst coin = svg('token', { variant: 'iso', animated: true, palette: [42, 210] });\nconsole.log(ICONS.length); // ${TOTAL}`} language="js" /> },
  ];
  return (
    <section className="mx-auto grid max-w-[1400px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <h2 className="text-4xl font-semibold tracking-tight">Build the way <span className="text-ink/35">you need.</span></h2>
        <p className="mt-3 text-lg text-ink/60">React, a framework-free web component, static files, sprites and a zero-dependency renderer. Same names everywhere.</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            ['24 px grid', '2 px safe area, 1.5 stroke, round caps. Line and solid inherit your text colour.'],
            ['One drawing, eight styles', 'Body, accent and detail roles drive every style, so they never drift apart.'],
            ['Motion that stays smooth', 'Transform and opacity keyframes only, no animated masks, paused offscreen, honours reduced-motion.'],
            ['Mark-free crypto', 'Abstract glyphs only: no chain or token logos, safe to ship anywhere.'],
          ].map(([t, d]) => (
            <li key={t} className="rounded-2xl border bg-band p-5"><p className="font-semibold">{t}</p><p className="mt-1 text-sm text-ink/60">{d}</p></li>
          ))}
        </ul>
      </div>
      <div className="min-w-0"><DirectionAwareTabs tabs={tabs} className="mx-auto" /></div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-band">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-10 text-sm text-ink/60 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Svg icon={byName['sparkles']} look={{ variant: 'color', palette: 'mint' }} size={30} />
          <div><p className="font-semibold text-ink">Bridle</p><p>A public good from Verity. Icons and code under the MIT licence.</p></div>
        </div>
        <div className="flex flex-col gap-1 md:text-right">
          <a href={GITHUB} className="inline-flex items-center gap-1.5 text-ink/80 hover:text-ink md:justify-end"><GitBranch className="size-4" />mercurial-systems/bridle</a>
          <p className="text-xs text-ink/45">Verity has not announced a token. Any airdrop or presale offer is a scam.</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [path, go] = usePath();
  const [look, setLook] = useState<Look>({ variant: 'line', animated: false, palette: 'spectrum', strokeWidth: 1.5 });
  const [open, setOpen] = useState<Icon | null>(() => byName[new URLSearchParams(location.search).get('icon') || ''] || null);
  useEffect(() => {
    const u = new URL(location.href);
    if (open) u.searchParams.set('icon', open.name); else u.searchParams.delete('icon');
    history.replaceState(null, '', u);
  }, [open]);
  const onOpen = useCallback((i: Icon) => setOpen(i), []);
  return (
    <div className="min-h-screen">
      <Nav go={go} path={path} />
      {path.startsWith('/icons') ? <Library look={look} setLook={setLook} onOpen={onOpen} /> : path.startsWith('/use') ? <Usage /> : <Home go={go} />}
      <Footer />
      <AnimatePresence>{open && <Detail key={open.name} icon={open} look={look} setLook={setLook} onClose={() => setOpen(null)} />}</AnimatePresence>
    </div>
  );
}
