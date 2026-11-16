// Bridle: the registry plus the renderer.
import saas from './icons/saas.mjs';
import business from './icons/business.mjs';
import corporate from './icons/corporate.mjs';
import finance from './icons/finance.mjs';
import banking from './icons/banking.mjs';
import cards from './icons/cards.mjs';
import crypto from './icons/crypto.mjs';
import { renderSvg } from './render.mjs';

export const CATEGORIES = [
  { id: 'saas', label: 'SaaS & Product', icons: saas },
  { id: 'business', label: 'Business & Operations', icons: business },
  { id: 'corporate', label: 'Corporate & Work', icons: corporate },
  { id: 'finance', label: 'Finance', icons: finance },
  { id: 'banking', label: 'Banking', icons: banking },
  { id: 'cards', label: 'Cards & Payments', icons: cards },
  { id: 'crypto', label: 'Crypto & Web3', icons: crypto },
];
export const ICONS = CATEGORIES.flatMap((c) => c.icons.map((i) => ((i.cat = c.id), i)));
export const byName = Object.fromEntries(ICONS.map((i) => [i.name, i]));

/** svg('wallet', { variant: 'color', animated: true, size: 32 }) */
export function svg(name, opt) {
  const icon = byName[name];
  if (!icon) throw new Error(`bridle: unknown icon "${name}"`);
  return renderSvg(icon, opt);
}
export { renderSvg, paletteFromHue, PRESETS, CATEGORY_HUES, VARIANTS, ANIM_NAMES } from './render.mjs';
