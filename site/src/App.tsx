import { memo, startTransition, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, Download, GitBranch, Image as ImageIcon, Box, Search, X } from 'lucide-react';
import { HaloSegmented } from '@/components/ui/halo-segmented';
import { HaloSwitch } from '@/components/ui/halo-switch';
import { CopyButton } from '@/components/ui/copy-button';
import { CodeBlock } from '@/components/ui/code-block';
import { DirectionAwareTabs } from '@/components/ui/direction-aware-tabs';
import { cn } from '@/lib/utils';
import { useVisible } from '@/lib/visible';
import { GITHUB, MONO, SITE, SHOW_VARIANTS, TOTAL, byName, fmt, Svg, LiveSvg } from '@/lib/icon';
import { CATEGORIES, GROUPS, groupOf, ICONS, PRESET_SWATCHES, STYLE_LIST, download, downloadPng, fileSvg, match, type Icon, type Look, type Variant } from '@/lib/bridle';
import { Hero, Why } from './Home';

/* ---------------------------------------------------------------- routing (no router) */
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
    if (p.startsWith('/icons')) requestAnimationFrame(() => document.getElementById('library')?.scrollIntoView());
    else scrollTo(0, 0);
  }, []);
  return [path, go] as const;
}

function Nav({ go, path }: { go: (p: string) => void; path: string }) {
  const link = (p: string, label: string) => (
    <a href={p} onClick={(e) => { e.preventDefault(); go(p); }} className={cn('rounded-lg px-3 py-1.5 text-[15px] text-ink/65 hover:text-ink', path === p && 'font-medium text-ink')}>{label}</a>
  );
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1500px] items-center justify-between px-4 sm:px-6">
        <a href="/" onClick={(e) => { e.preventDefault(); go('/'); }} className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <Svg icon={byName['sparkles']} look={{ variant: 'color', palette: 'mint' }} size={24} /> bridle
        </a>
        <nav className="flex items-center gap-0.5">
          {link('/icons', 'Icons')}
          {link('/why', 'Why Bridle')}
          {link('/use', 'Docs')}
          <a href={GITHUB} className="hidden rounded-lg px-3 py-1.5 text-[15px] text-ink/65 hover:text-ink sm:block">GitHub</a>
          <a href="/bridle-svg.zip" className="ml-2 hidden rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-white hover:bg-ink/85 sm:block">Download</a>
        </nav>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- library */
type View = { size: number; ink: string };
const Tile = memo(function Tile({ icon, look, size, onOpen }: { icon: Icon; look: Look; size: number; onOpen: (i: Icon) => void }) {
  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(fileSvg(icon, look)).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1200); });
  };
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="tile group relative">
      <button onClick={() => onOpen(icon)} className="flex w-full flex-col items-center gap-3 rounded-2xl px-2 pt-7 pb-4 transition-colors hover:bg-tile">
        <LiveSvg icon={icon} look={look} hover={hover} size={size} className="transition-transform duration-200 group-hover:scale-110" />
        <span className="max-w-full truncate text-[12.5px] text-[#141812]/45 group-hover:text-[#141812]/80">{icon.name}</span>
      </button>
      <button onClick={copy} aria-label={`Copy ${icon.name} SVG`} title="Copy SVG"
        className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-lg bg-white text-[#141812]/60 opacity-0 shadow-sm ring-1 ring-black/5 transition group-hover:opacity-100 hover:text-[#141812] focus-visible:opacity-100">
        {copied ? <Check className="size-3.5 text-lime-deep" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  );
});

const PAGE = 150;
function Library({ look, setLook, view, setView, onOpen }: { look: Look; setLook: (l: Look) => void; view: View; setView: (v: View) => void; onOpen: (i: Icon) => void }) {
  const params = new URLSearchParams(location.search);
  const [q, setQ] = useState(params.get('q') || '');
  const [group, setGroup] = useState(() => { const g = params.get('g') || (params.get('c') && groupOf(params.get('c')!)?.id); return GROUPS.some((x) => x.id === g) ? g! : 'all'; });
  const [cat, setCat] = useState<string | null>(() => (CATEGORIES.some((c) => c.id === params.get('c')) ? params.get('c') : null));
  const [limit, setLimit] = useState(PAGE);
  const pickGroup = (g: string) => { setGroup(g); setCat(null); };
  const activeGroup = GROUPS.find((g) => g.id === group);
  const dq = useDeferredValue(q);
  const list = useMemo(() => {
    const ids = cat ? new Set([cat]) : activeGroup ? new Set(activeGroup.cats.map((c) => c.id)) : null;
    return ICONS.filter((i) => (!ids || ids.has(i.cat)) && match(i, dq));
  }, [cat, activeGroup, dq]);
  const sentinel = useRef<HTMLDivElement>(null);
  const more = useVisible(sentinel);
  useEffect(() => { if (more && limit < list.length) startTransition(() => setLimit((l) => l + PAGE)); }, [more, limit, list.length]);
  useEffect(() => setLimit(PAGE), [group, cat, dq, look.variant]);
  useEffect(() => {
    const u = new URL(location.href);
    if (group === 'all') u.searchParams.delete('g'); else u.searchParams.set('g', group);
    if (!cat) u.searchParams.delete('c'); else u.searchParams.set('c', cat);
    if (dq) u.searchParams.set('q', dq); else u.searchParams.delete('q');
    history.replaceState(null, '', u);
  }, [group, cat, dq]);
  // "/" focuses search
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || /input|textarea/i.test((e.target as HTMLElement).tagName)) return;
      e.preventDefault();
      input.current?.focus();
    };
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, []);
  const mono = MONO(look.variant);
  const set = (p: Partial<Look>) => setLook({ ...look, ...p });
  const sub = activeGroup?.cats.find((c) => c.id === cat);

  return (
    <section id="library" className="scroll-mt-14">
      <div className="sticky top-14 z-30 border-y bg-white/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-2.5 px-4 py-2.5 sm:px-6">
          <label className="flex h-11 min-w-[220px] flex-1 items-center gap-2.5 rounded-xl bg-tile px-3.5 focus-within:ring-2 focus-within:ring-ink/15">
            <Search className="size-[18px] text-ink/45" />
            <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${fmt(TOTAL)} icons`} className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-ink/40" aria-label="Search icons" />
            {q ? <button onClick={() => setQ('')} className="rounded-md p-1 text-ink/50 hover:bg-white" aria-label="Clear search"><X className="size-4" /></button>
              : <kbd className="rounded-md bg-white px-1.5 py-0.5 font-mono text-xs text-ink/45 shadow-sm">/</kbd>}
          </label>
          <HaloSegmented translucent={false} items={SHOW_VARIANTS} value={look.variant} onValueChange={(v) => set({ variant: v as Variant })} />
          <label className="flex h-11 items-center gap-3 rounded-xl bg-tile px-3.5 text-sm text-ink/55">
            Size <input type="range" min={20} max={64} step={2} value={view.size} onChange={(e) => setView({ ...view, size: +e.target.value })} className="w-24 accent-[#141812]" aria-label="Icon size" />
            <span className="w-5 text-right tabular-nums text-ink/70">{view.size}</span>
          </label>
          <label className="flex h-11 items-center gap-3 rounded-xl bg-tile px-3.5 text-sm text-ink/55">
            Stroke <input type="range" min={1} max={2.5} step={0.25} value={look.strokeWidth} onChange={(e) => set({ strokeWidth: +e.target.value })} className="w-16 accent-[#141812]" aria-label="Stroke width" />
            <span className="w-7 text-right tabular-nums text-ink/70">{look.strokeWidth}</span>
          </label>
          {mono ? (
            <label className="flex size-11 cursor-pointer items-center justify-center rounded-xl bg-tile" title="Icon colour">
              <span className="size-5 rounded-full ring-1 ring-black/10" style={{ background: view.ink }} />
              <input type="color" value={view.ink} onChange={(e) => setView({ ...view, ink: e.target.value })} className="sr-only" aria-label="Icon colour" />
            </label>
          ) : (
            <div className="flex h-11 items-center gap-1.5 rounded-xl bg-tile px-3">
              {PRESET_SWATCHES.map((p) => (
                <button key={p.id} title={p.label} aria-label={`${p.label} palette`} onClick={() => set({ palette: p.id as Look['palette'] })}
                  className={cn('size-5 rounded-full ring-offset-1 ring-offset-tile transition hover:scale-110', look.palette === p.id && 'ring-2 ring-ink')}
                  style={{ background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})` }} />
              ))}
            </div>
          )}
          <label className="flex h-11 items-center gap-2 rounded-xl bg-tile px-3.5 text-sm text-ink/55">Motion <HaloSwitch translucent={false} size="sm" checked={look.animated} onCheckedChange={(c) => set({ animated: c })} aria-label="Animate all visible icons" /></label>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1500px] gap-6 px-4 py-6 sm:px-6">
        <aside className="sticky top-32 hidden h-[calc(100vh-9rem)] w-56 shrink-0 overflow-y-auto pr-1 lg:block">
          <button onClick={() => pickGroup('all')} className={cn('flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[15px]', group === 'all' ? 'bg-tile font-medium' : 'text-ink/60 hover:bg-band')}>
            <span>All</span><span className="text-xs text-ink/40 tabular-nums">{fmt(TOTAL)}</span>
          </button>
          {GROUPS.map((g) => {
            const open = g.id === group;
            return (
              <div key={g.id} className="mt-0.5">
                <button onClick={() => pickGroup(g.id)} className={cn('flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[15px]', open && !cat ? 'bg-tile font-medium' : open ? 'font-medium' : 'text-ink/60 hover:bg-band')}>
                  <span>{g.label}</span><span className="text-xs text-ink/40 tabular-nums">{fmt(g.cats.reduce((n, c) => n + c.icons.length, 0))}</span>
                </button>
                {open && (
                  <div className="mt-0.5 ml-3 border-l pl-2">
                    {g.cats.map((c) => (
                      <button key={c.id} onClick={() => setCat(c.id === cat ? null : c.id)} className={cn('flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm', cat === c.id ? 'bg-tile font-medium text-ink' : 'text-ink/55 hover:bg-band hover:text-ink')}>
                        <span className="truncate">{c.short}</span><span className="text-[11px] text-ink/35 tabular-nums">{c.icons.length}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </aside>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:hidden">
            {[{ id: 'all', label: 'All' }, ...GROUPS].map((g) => (
              <button key={g.id} onClick={() => pickGroup(g.id)} className={cn('shrink-0 rounded-full px-3.5 py-1.5 text-sm', group === g.id ? 'bg-ink text-white' : 'bg-tile')}>{g.label}</button>
            ))}
          </div>
          {activeGroup && (
            <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] lg:hidden">
              {activeGroup.cats.map((c) => (
                <button key={c.id} onClick={() => setCat(c.id === cat ? null : c.id)} className={cn('shrink-0 rounded-full px-3 py-1 text-[13px]', cat === c.id ? 'bg-lime font-medium' : 'bg-band text-ink/65')}>{c.short}</button>
              ))}
            </div>
          )}
          <p className="px-2 pb-2 text-sm text-ink/45">
            {fmt(list.length)} {activeGroup ? <>{activeGroup.label}{sub && <> / {sub.short}</>} </> : null}icons{dq && <> for “{dq}”</>}
          </p>
          <div className="grid" style={{ color: mono ? view.ink : undefined, gridTemplateColumns: `repeat(auto-fill, minmax(${Math.max(104, view.size + 60)}px, 1fr))` }}>
            {list.slice(0, limit).map((i) => <Tile key={i.name} icon={i} look={look} size={view.size} onOpen={onOpen} />)}
          </div>
          {limit < list.length && <div ref={sentinel} className="py-10 text-center text-sm text-ink/40">Loading more…</div>}
          {!list.length && <p className="py-24 text-center text-ink/55">No icons match “{q}”. Try a broader word like “card”, “chart” or “token”.</p>}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- detail */
function Detail({ icon, look, ink, onClose, setLook }: { icon: Icon; look: Look; ink: string; onClose: () => void; setLook: (l: Look) => void }) {
  const file = fileSvg(icon, look);
  const sid = look.animated ? `${look.variant}-animated` : look.variant;
  const hostedDir = look.animated && look.variant === 'color' ? 'color-animated' : look.variant;
  const mono = MONO(look.variant);
  const pal = !mono && typeof look.palette === 'string' && look.palette !== 'spectrum' ? ` palette="${look.palette}"` : '';
  const sw = look.strokeWidth !== 2 ? ` strokeWidth={${look.strokeWidth}}` : '';
  const jsx = `<BridleIcon name="${icon.name}"${look.variant !== 'line' ? ` variant="${look.variant}"` : ''}${look.animated ? ' animated' : ''}${pal}${sw} />`;
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <motion.div className="fixed inset-0 z-50 flex justify-end bg-ink/25" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.aside role="dialog" aria-label={`${icon.name} icon`} onClick={(e) => e.stopPropagation()}
        initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 40, opacity: 0 }} transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }}
        className="h-full w-full max-w-xl overflow-y-auto bg-white p-5 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-wide text-ink/45 uppercase">{groupOf(icon.cat).label} · {groupOf(icon.cat).cats.find((c) => c.id === icon.cat)?.short}</p>
            <h3 className="mt-1 text-3xl font-semibold tracking-tight">{icon.name}</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">{icon.tags.slice(0, 10).map((t) => <span key={t} className="rounded-md bg-tile px-2 py-0.5 text-xs text-ink/60">{t}</span>)}</div>
          </div>
          <button onClick={onClose} className="rounded-full bg-tile p-2 text-ink/60 hover:text-ink" aria-label="Close"><X className="size-4" /></button>
        </div>
        <div className="dots mt-6 flex h-72 items-center justify-center rounded-3xl bg-band [--bri-knockout:#f7f8f5]" style={{ color: ink }}>
          <Svg icon={icon} look={{ ...look, animated: true }} size={150} />
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {STYLE_LIST.map((s) => (
            <button key={s.id} onClick={() => setLook({ ...look, variant: s.id })} title={s.hint}
              className={cn('flex flex-col items-center gap-1.5 rounded-2xl p-3 transition hover:bg-band', s.id === look.variant ? 'bg-tile ring-1 ring-ink/15 [--bri-knockout:#f4f4f1]' : '')}>
              <span style={{ color: ink }}><Svg icon={icon} look={{ ...look, variant: s.id, animated: false }} size={28} /></span>
              <span className="text-[11px] text-ink/55">{s.label}</span>
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button onClick={() => download(`${icon.name}-${sid}.svg`, new Blob([file], { type: 'image/svg+xml' }))} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink/85"><Download className="size-4" />SVG</button>
          <button onClick={() => downloadPng(icon, look)} className="inline-flex items-center gap-2 rounded-full bg-tile px-5 py-2.5 text-sm font-medium hover:bg-[#e9eae4]"><ImageIcon className="size-4" />PNG</button>
          <div className="flex items-center gap-1 rounded-full bg-tile pr-1 pl-4 text-sm text-ink/70"><Copy className="size-3.5" /> SVG <CopyButton value={file} /></div>
          <div className="flex items-center gap-1 rounded-full bg-tile pr-1 pl-4 text-sm text-ink/70"><Box className="size-3.5" /> JSX <CopyButton value={jsx} /></div>
          <label className="ml-auto flex items-center gap-2 text-sm text-ink/60">Motion <HaloSwitch translucent={false} size="sm" checked={look.animated} onCheckedChange={(c) => setLook({ ...look, animated: c })} aria-label="Motion" /></label>
        </div>
        <div className="mt-6">
          <CodeBlock tabs={[
            { label: 'React', language: 'tsx', code: `import { BridleIcon } from 'bridle-icons/react';\n\n${jsx}` },
            { label: 'Web component', language: 'html', code: `<script type="module" src="${SITE}/bridle.js"></script>\n\n<bridle-icon name="${icon.name}" variant="${look.variant}"${look.animated ? ' animated' : ''}></bridle-icon>` },
            { label: 'URL', language: 'html', code: `<img src="${SITE}/svg/${hostedDir}/${icon.name}.svg" width="24" alt="${icon.name.replace(/-/g, ' ')}" />` },
            { label: 'SVG', language: 'xml', code: file },
          ]} />
        </div>
      </motion.aside>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- docs */
export function Usage() {
  const tabs = [
    { id: 0, label: 'React', content: <CodeBlock code={`npm i github:mercurial-systems/bridle\n\nimport { BridleIcon } from 'bridle-icons/react';\n\n<BridleIcon name="crypto-wallet" />                  // line, inherits text colour\n<BridleIcon name="bank" variant="duo" />\n<BridleIcon name="invoice" variant="duotone" strokeWidth={1.5} />\n<BridleIcon name="credit-card" variant="color" animated palette="ocean" />`} language="tsx" /> },
    { id: 1, label: 'Web component', content: <CodeBlock code={`<script type="module" src="${SITE}/bridle.js"></script>\n\n<bridle-icon name="bank"></bridle-icon>\n<bridle-icon name="vault" variant="duotone"></bridle-icon>\n<bridle-icon name="swap" variant="color" animated size="48" hue="180"></bridle-icon>`} language="html" /> },
    { id: 2, label: 'Plain SVG', content: <CodeBlock code={`<img src="${SITE}/svg/duo/rocket.svg" width="32" alt="rocket" />\n<svg width="24" height="24"><use href="${SITE}/bridle-line.svg#wallet" /></svg>\n\n${SITE}/bridle-svg.zip   // every icon, every style\n${SITE}/icons.json       // names, tags, collections\n${SITE}/llms.txt         // hand this to your AI agent`} language="html" /> },
    { id: 3, label: 'JavaScript', content: <CodeBlock code={`import { svg, ICONS } from 'bridle-icons';\n\nel.innerHTML = svg('invoice', { variant: 'duo' });\nconst coin = svg('token', { variant: 'color', animated: true, palette: [42, 210] });\nconsole.log(ICONS.length); // ${TOTAL}`} language="js" /> },
  ];
  return (
    <section className="mx-auto grid max-w-[1400px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <h2 className="text-4xl font-semibold tracking-tight">Build the way <span className="text-ink/35">you need.</span></h2>
        <p className="mt-3 text-lg text-ink/60">React, a framework-free web component, static files, sprites and a zero-dependency renderer. Same names everywhere.</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            ['24 px grid, 2 px stroke', 'Bold, friendly strokes with round caps. Mono styles inherit your text colour.'],
            ['One drawing, five styles', 'Body, accent and detail roles drive every style, so they never drift apart.'],
            ['Motion that stays smooth', 'Transform and opacity keyframes only, paused offscreen, honours reduced-motion.'],
            ['Mark-free crypto', 'Abstract glyphs only: no chain or token logos, safe to ship anywhere.'],
          ].map(([t, d]) => (
            <li key={t} className="rounded-2xl bg-band p-5"><p className="font-semibold">{t}</p><p className="mt-1 text-sm text-ink/60">{d}</p></li>
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
      <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-4 py-10 text-sm text-ink/60 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Svg icon={byName['sparkles']} look={{ variant: 'color', palette: 'mint' }} size={30} />
          <div><p className="font-semibold text-ink">bridle</p><p>A public good from Verity. Icons and code under the MIT licence.</p></div>
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
  const [look, setLook] = useState<Look>(() => {
    const p = new URLSearchParams(location.search);
    const v = p.get('s') as Variant | null;
    return { variant: v && STYLE_LIST.some((s) => s.id === v) ? v : 'line', animated: p.get('m') === '1', palette: 'spectrum', strokeWidth: 2 };
  });
  const [view, setView] = useState<View>({ size: 36, ink: '#141812' });
  const [open, setOpen] = useState<Icon | null>(() => byName[new URLSearchParams(location.search).get('icon') || ''] || null);
  const home = path === '/' || path.startsWith('/icons');
  useEffect(() => {
    const u = new URL(location.href);
    if (open) u.searchParams.set('icon', open.name); else u.searchParams.delete('icon');
    if (home) {
      if (look.variant === 'line') u.searchParams.delete('s'); else u.searchParams.set('s', look.variant);
      if (look.animated) u.searchParams.set('m', '1'); else u.searchParams.delete('m');
    }
    history.replaceState(null, '', u);
  }, [open, look.variant, look.animated, home]);
  useEffect(() => { if (location.pathname.startsWith('/icons')) document.getElementById('library')?.scrollIntoView(); }, []);
  const onOpen = useCallback((i: Icon) => setOpen(i), []);
  return (
    <div className="min-h-screen">
      <Nav go={go} path={path} />
      {home ? <><Hero go={go} onOpen={onOpen} /><Library look={look} setLook={setLook} view={view} setView={setView} onOpen={onOpen} /></>
        : path.startsWith('/use') ? <Usage /> : <Why go={go} usage={<Usage />} />}
      <Footer />
      <AnimatePresence>{open && <Detail key={open.name} icon={open} look={look} ink={view.ink} setLook={setLook} onClose={() => setOpen(null)} />}</AnimatePresence>
    </div>
  );
}
