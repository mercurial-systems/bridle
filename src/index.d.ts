import type { IconName } from './names';
export type { IconName };
export type Variant = 'line' | 'duo' | 'solid' | 'duotone' | 'color';
export interface Palette { l: string; m: string; d: string; dd: string; a: string; ad: string; al: string; s: string; as: string; k: string }
export interface RenderOptions {
  variant?: Variant;
  animated?: boolean;
  /** category colours (default), a preset name, a hue (0-360), a [hue, accentHue] pair or a full palette */
  palette?: 'spectrum' | 'sunset' | 'ocean' | 'mint' | 'grape' | 'lava' | 'gold' | 'ice' | number | [number, number] | Palette;
  /** default 1.12; the set is drawn to look right up to 1.4 */
  strokeWidth?: number;
  /** stroke ends and joins: round (default) or square */
  corner?: 'round' | 'square';
  size?: number;
  title?: string | false;
  uid?: string;
}
export interface Icon { name: IconName; tags: string[]; cat: string; els: unknown[] }
export const ICONS: Icon[];
export const CATEGORIES: { id: string; label: string; icons: Icon[] }[];
export const GROUPS: { id: string; label: string; cats: { id: string; label: string; short: string; icons: Icon[] }[] }[];
export const byName: Record<IconName, Icon>;
export function svg(name: IconName, opt?: RenderOptions): string;
export function renderSvg(icon: Icon, opt?: RenderOptions): string;
export function paletteFromHue(h: number, ah?: number): Palette;
export const VARIANTS: Variant[];
export const ANIM_NAMES: string[];
