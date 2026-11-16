// Bridle: the registry plus the renderer.
import saas from './icons/saas.mjs';
import business from './icons/business.mjs';
import corporate from './icons/corporate.mjs';
import finance from './icons/finance.mjs';
import banking from './icons/banking.mjs';
import cards from './icons/cards.mjs';
import crypto from './icons/crypto.mjs';
import iface from './icons/interface.mjs';
import communication from './icons/communication.mjs';
import devices from './icons/devices.mjs';
import commerce from './icons/commerce.mjs';
import markets from './icons/markets.mjs';
import defi from './icons/defi.mjs';
import people from './icons/people.mjs';
import data from './icons/data.mjs';
import marketingIcons from './icons/marketing.mjs';
import aiIcons from './icons/ai.mjs';
import travelIcons from './icons/travel.mjs';
import propertyIcons from './icons/property.mjs';
import legalIcons from './icons/legal.mjs';
import supportIcons from './icons/support.mjs';
import paymentsIcons from './icons/payments.mjs';
import wealthIcons from './icons/wealth.mjs';
import gamingIcons from './icons/gaming.mjs';
import esgIcons from './icons/esg.mjs';
import productivityIcons from './icons/productivity.mjs';
import locationIcons from './icons/location.mjs';
import chainIcons from './icons/chain.mjs';
import tradingIcons from './icons/trading.mjs';
import { renderSvg } from './render.mjs';
import { families } from './families.mjs';

export const CATEGORIES = [
  { id: 'saas', label: 'SaaS & Product', icons: saas },
  { id: 'business', label: 'Business & Operations', icons: business },
  { id: 'corporate', label: 'Corporate & Work', icons: corporate },
  { id: 'finance', label: 'Finance', icons: finance },
  { id: 'banking', label: 'Banking', icons: banking },
  { id: 'cards', label: 'Cards & Payments', icons: cards },
  { id: 'crypto', label: 'Crypto & Web3', icons: crypto },
  { id: 'chain', label: 'Chain Infrastructure', icons: chainIcons },
  { id: 'trading', label: 'Onchain Trading', icons: tradingIcons },
  { id: 'interface', label: 'Interface & Navigation', icons: iface },
  { id: 'communication', label: 'Communication & Media', icons: communication },
  { id: 'devices', label: 'Devices & Development', icons: devices },
  { id: 'commerce', label: 'Commerce & Logistics', icons: commerce },
  { id: 'markets', label: 'Markets & Accounting', icons: markets },
  { id: 'defi', label: 'DeFi & Web3 Ops', icons: defi },
  { id: 'people', label: 'People & Workplace', icons: people },
  { id: 'data', label: 'Files, Data & Security', icons: data },
  { id: 'marketing', label: 'Marketing & Growth', icons: marketingIcons },
  { id: 'ai', label: 'AI & Automation', icons: aiIcons },
  { id: 'travel', label: 'Travel & Expenses', icons: travelIcons },
  { id: 'property', label: 'Property & Facilities', icons: propertyIcons },
  { id: 'legal', label: 'Legal & Compliance', icons: legalIcons },
  { id: 'support', label: 'Customer Support', icons: supportIcons },
  { id: 'payments', label: 'Payments & Fintech', icons: paymentsIcons },
  { id: 'wealth', label: 'Wealth & Insurance', icons: wealthIcons },
  { id: 'gaming', label: 'NFTs, Gaming & Metaverse', icons: gamingIcons },
  { id: 'esg', label: 'Sustainability & ESG', icons: esgIcons },
  { id: 'productivity', label: 'Productivity & Editing', icons: productivityIcons },
  { id: 'location', label: 'Maps & Location', icons: locationIcons },
];
const drawn = CATEGORIES.flatMap((c) => c.icons.map((i) => ((i.cat = c.id), i)));
const drawnByName = Object.fromEntries(drawn.map((i) => [i.name, i]));
// generated status variants join their base's category, right after the drawn icons
for (const v of families(drawnByName)) CATEGORIES.find((c) => c.id === v.cat).icons.push(v);
export const ICONS = CATEGORIES.flatMap((c) => c.icons);
export const byName = Object.fromEntries(ICONS.map((i) => [i.name, i]));

/** svg('wallet', { variant: 'color', animated: true, size: 32 }) */
export function svg(name, opt) {
  const icon = byName[name];
  if (!icon) throw new Error(`bridle: unknown icon "${name}"`);
  return renderSvg(icon, opt);
}
export { renderSvg, paletteFromHue, PRESETS, CATEGORY_HUES, VARIANTS, ANIM_NAMES } from './render.mjs';
