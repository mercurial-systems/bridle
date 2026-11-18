import { ICONS, GROUPS, CATEGORIES as ALL_CATEGORIES, renderSvg, type Icon, type RenderOptions, type Variant } from 'bridle';

export const CATEGORIES = ALL_CATEGORIES.filter((c) => c.icons.length);
export { ICONS, GROUPS };
export const groupOf = (cat: string) => GROUPS.find((g) => g.cats.some((c) => c.id === cat))!;
export type { Icon, Variant };

export type Style = { variant: Variant; animated: boolean };
export type Look = Style & { palette: RenderOptions['palette']; strokeWidth: number; corner?: 'round' | 'square' };

export const STYLE_LIST: { id: Variant; label: string; hint: string }[] = [
  { id: 'line', label: 'Line', hint: '1.12 px strokes' },
  { id: 'duo', label: 'Duo', hint: 'Bodies toned back' },
  { id: 'solid', label: 'Solid', hint: 'Filled, details cut out' },
  { id: 'duotone', label: 'Duotone', hint: 'Tinted bodies, solid accents' },
  { id: 'color', label: 'Colour', hint: 'Gradient palettes' },
];
export const styleId = (s: Style) => (s.animated ? `${s.variant}-animated` : s.variant);

export const PRESET_SWATCHES: { id: string; label: string; colors: [string, string] }[] = [
  { id: 'spectrum', label: 'Spectrum', colors: ['#a78bfa', '#34d399'] },
  { id: 'sunset', label: 'Sunset', colors: ['#fb7a4b', '#f05aa8'] },
  { id: 'ocean', label: 'Ocean', colors: ['#3fa6f0', '#2fd6c0'] },
  { id: 'mint', label: 'Mint', colors: ['#3ddc97', '#b066ff'] },
  { id: 'grape', label: 'Grape', colors: ['#b45cf6', '#fbbf24'] },
  { id: 'lava', label: 'Lava', colors: ['#f43f5e', '#fb923c'] },
  { id: 'gold', label: 'Gold', colors: ['#f5b931', '#38a5f5'] },
  { id: 'ice', label: 'Ice', colors: ['#38d0f0', '#6d7cff'] },
];

let seq = 0;
export function svgFor(icon: Icon, look: Partial<Look>, size?: number, uid?: string) {
  return renderSvg(icon, { ...look, size, uid: uid || `s${(seq++).toString(36)}` });
}
// a portable file: fixed ids so the same icon always diffs the same
export const fileSvg = (icon: Icon, look: Partial<Look>) => renderSvg(icon, { ...look, uid: `bri-${icon.name}` });

export function hexToHue(hex: string) {
  if (hex.startsWith('hsl')) return Math.round(parseFloat(hex.slice(4)) || 0);
  const m = hex.replace('#', '').match(/.{2}/g);
  if (!m) return 260;
  const [r, g, b] = m.map((x) => parseInt(x, 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  if (!d) return 0;
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return Math.round((h * 60 + 360) % 360);
}

export function download(name: string, data: Blob) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(data);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export async function downloadPng(icon: Icon, look: Partial<Look>, px = 512) {
  const svg = renderSvg(icon, { ...look, animated: false, size: px, uid: `p${icon.name}` });
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  const img = new Image();
  img.src = url;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = c.height = px;
  const ctx = c.getContext('2d')!;
  ctx.drawImage(img, 0, 0, px, px);
  URL.revokeObjectURL(url);
  c.toBlob((b) => b && download(`${icon.name}-${look.variant}.png`, b), 'image/png');
}

export function match(icon: Icon, q: string) {
  if (!q) return true;
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hay = `${icon.name} ${icon.tags.join(' ')} ${icon.cat}`;
  return words.every((w) => hay.includes(w));
}
