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
import walletsX from './icons/wallets.mjs';
import tokensX from './icons/tokens.mjs';
import explorerX from './icons/explorer.mjs';
import governanceX from './icons/governance.mjs';
import lendingX from './icons/lending.mjs';
import treasuryX from './icons/treasury.mjs';
import taxX from './icons/tax.mjs';
import everydayX from './icons/everyday.mjs';
import manufacturingX from './icons/manufacturing.mjs';
import hospitalityX from './icons/hospitality.mjs';
import educationX from './icons/education.mjs';
import eventsX from './icons/events.mjs';
import mobilityX from './icons/mobility.mjs';
import mediaX from './icons/media.mjs';
import cloudX from './icons/cloud.mjs';
import weatherX from './icons/weather.mjs';
import socialX from './icons/social.mjs';
import { renderSvg } from './render.mjs';

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
  { id: 'wallets', label: 'Wallets & Keys', icons: walletsX },
  { id: 'tokens', label: 'Tokens & Assets', icons: tokensX },
  { id: 'explorer', label: 'Explorer & Analytics', icons: explorerX },
  { id: 'governance', label: 'Governance & DAOs', icons: governanceX },
  { id: 'lending', label: 'Credit & Lending', icons: lendingX },
  { id: 'treasury', label: 'Treasury & FP&A', icons: treasuryX },
  { id: 'tax', label: 'Tax & Audit', icons: taxX },
  { id: 'everyday', label: 'Everyday Banking', icons: everydayX },
  { id: 'manufacturing', label: 'Industry & Manufacturing', icons: manufacturingX },
  { id: 'hospitality', label: 'Food & Hospitality', icons: hospitalityX },
  { id: 'education', label: 'Learning & Training', icons: educationX },
  { id: 'events', label: 'Events & Ticketing', icons: eventsX },
  { id: 'mobility', label: 'Mobility & Fleet', icons: mobilityX },
  { id: 'media', label: 'Media & Creative', icons: mediaX },
  { id: 'cloud', label: 'Cloud & DevOps', icons: cloudX },
  { id: 'weather', label: 'Weather & Nature', icons: weatherX },
  { id: 'social', label: 'Social & Community', icons: socialX },
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
for (const c of CATEGORIES) for (const i of c.icons) i.cat = c.id;
export const ICONS = CATEGORIES.flatMap((c) => c.icons);

// Four top-level groups; each category lives in exactly one, with a short label for use inside its group.
export const GROUPS = [
  { id: 'crypto', label: 'Crypto', cats: [['crypto', 'Essentials'], ['defi', 'DeFi'], ['trading', 'Trading'], ['chain', 'Infrastructure'], ['gaming', 'NFTs & Gaming'], ['wallets', 'Wallets'], ['tokens', 'Tokens'], ['explorer', 'Explorer'], ['governance', 'Governance']] },
  { id: 'finance', label: 'Finance', cats: [['finance', 'Money'], ['banking', 'Banking'], ['cards', 'Cards'], ['payments', 'Payments'], ['markets', 'Markets & Accounting'], ['wealth', 'Wealth & Insurance'], ['lending', 'Lending'], ['treasury', 'Treasury'], ['tax', 'Tax & Audit'], ['everyday', 'Everyday Banking']] },
  { id: 'business', label: 'Business', cats: [['business', 'Operations'], ['commerce', 'Commerce & Logistics'], ['corporate', 'Corporate'], ['people', 'People & HR'], ['marketing', 'Marketing'], ['support', 'Support'], ['legal', 'Legal'], ['property', 'Property'], ['travel', 'Travel'], ['esg', 'Sustainability'], ['manufacturing', 'Industry'], ['hospitality', 'Hospitality'], ['education', 'Learning'], ['events', 'Events'], ['mobility', 'Mobility']] },
  { id: 'product', label: 'Product & Tech', cats: [['saas', 'SaaS'], ['interface', 'Interface'], ['productivity', 'Productivity'], ['ai', 'AI'], ['communication', 'Communication'], ['devices', 'Devices & Dev'], ['data', 'Files & Security'], ['location', 'Maps'], ['media', 'Creative'], ['cloud', 'Cloud & DevOps'], ['weather', 'Weather'], ['social', 'Social']] },
].map((g) => ({ ...g, cats: g.cats.map(([id, short]) => ({ ...CATEGORIES.find((c) => c.id === id), short })) }));
export const byName = Object.fromEntries(ICONS.map((i) => [i.name, i]));

/** svg('wallet', { variant: 'color', animated: true, size: 32 }) */
export function svg(name, opt) {
  const icon = byName[name];
  if (!icon) throw new Error(`bridle: unknown icon "${name}"`);
  return renderSvg(icon, opt);
}
export { renderSvg, paletteFromHue, PRESETS, CATEGORY_HUES, VARIANTS, ANIM_NAMES } from './render.mjs';
