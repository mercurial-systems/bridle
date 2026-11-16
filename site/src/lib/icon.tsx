import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useVisible } from '@/lib/visible';
import { ICONS, STYLE_LIST, svgFor, type Icon, type Look, type Variant } from '@/lib/bridle';

export const GITHUB = 'https://github.com/mercurial-systems/bridle';
export const SITE = 'https://bridle.verity.dev';
export const byName: Record<string, Icon> = Object.fromEntries(ICONS.map((i) => [i.name, i]));
export const TOTAL = ICONS.length;
export const fmt = (n: number) => n.toLocaleString('en-US');
export const pick = (names: string[]) => names.map((n) => byName[n]).filter(Boolean);
export const SHOW_VARIANTS: { value: Variant; label: string }[] = STYLE_LIST.map((x) => ({ value: x.id, label: x.label }));
export const MONO = (v?: Variant) => v !== 'color';

/* ---------------------------------------------------------------- one icon */
export function Svg({ icon, look, size, className }: { icon: Icon; look: Partial<Look>; size: number; className?: string }) {
  const html = useMemo(() => svgFor(icon, look, size), [icon, look.variant, look.animated, look.palette, look.strokeWidth, size]);
  return <span className={cn('inline-flex leading-[0]', className)} dangerouslySetInnerHTML={{ __html: html }} />;
}

// Renders on first sight (cached), then only pauses/resumes via a class while scrolling: no re-render, no re-parse.
// Without Motion, an icon animates only while hovered.
const cache = new Map<string, string>();
function cachedSvg(icon: Icon, look: Partial<Look>, size: number) {
  const key = `${icon.name}|${look.variant}|${look.animated ? 1 : 0}|${look.palette}|${look.strokeWidth}|${look.corner}|${size}`;
  let s = cache.get(key);
  if (!s) {
    s = svgFor(icon, look, size, `c${cache.size.toString(36)}`);
    if (cache.size > 4000) cache.clear();
    cache.set(key, s);
  }
  return s;
}
export function LiveSvg({ icon, look, size, className, hover }: { icon: Icon; look: Partial<Look>; size: number; className?: string; hover?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useVisible(ref);
  const [seen, setSeen] = useState(false);
  useEffect(() => { if (visible) setSeen(true); }, [visible]);
  const animated = !!look.animated || !!hover;
  const html = seen ? cachedSvg(icon, { ...look, animated }, size) : '';
  return <span ref={ref} style={{ minWidth: size, minHeight: size }} className={cn('inline-flex leading-[0]', !visible && 'paused', className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
