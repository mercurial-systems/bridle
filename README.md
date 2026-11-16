# Bridle

Next-gen open icons for SaaS, business, finance, banking, payments and crypto.
3,317 original, individually designed icons in 4 collections (Crypto, Finance, Business, Product & Tech) and 46 subcategories, each drawn once on a 24 px grid and rendered in five styles, each static or animated:

| style | file folder | notes |
| --- | --- | --- |
| Line | `line` | bold 2 px stroke, round caps, inherits `currentColor` |
| Duo | `duo` | line with bodies toned back so accents and details lead |
| Solid | `solid` | filled silhouettes with knocked-out details, `currentColor` |
| Duotone | `duotone` | tinted bodies, solid accents, ink details, `currentColor` |
| Colour | `color` | gradient bodies and accents, per-category palettes |
| … each with motion | `<style>-animated` | CSS keyframes inside the SVG, honours `prefers-reduced-motion` |

Browse, customise and download at **https://bridle.verity.dev**.

Collections and subcategories are listed in `GROUPS` (`src/index.mjs`) and in `icons.json`.

Hosted as files: line, duo, solid, duotone, color and color-animated (Cloudflare Pages caps a deploy at 20,000 files). The zip has all ten folders. `llms.txt` describes the whole API for AI coding agents.

## Use

**Files.** Every icon in every style is a static file:

```html
<img src="https://bridle.verity.dev/svg/color-animated/rocket.svg" width="32" alt="rocket" />
<svg width="24" height="24"><use href="https://bridle.verity.dev/bridle-line.svg#wallet" /></svg>
```

Everything at once: `https://bridle.verity.dev/bridle-svg.zip`; the manifest is `icons.json`.

**React.**

```bash
npm i github:mercurial-systems/bridle
```

```tsx
import { BridleIcon } from 'bridle-icons/react';

<BridleIcon name="crypto-wallet" />                         // line
<BridleIcon name="credit-card" variant="color" animated />
<BridleIcon name="vault" variant="color" palette="ocean" size={48} />
<BridleIcon name="swap" variant="color" palette={200} />     // any hue
```

**Web component (no build step).**

```html
<script type="module" src="https://bridle.verity.dev/bridle.js"></script>
<bridle-icon name="block" variant="color" animated hue="180"></bridle-icon>
```

**Plain JavaScript.**

```js
import { svg } from 'bridle-icons';
el.innerHTML = svg('invoice', { variant: 'solid', strokeWidth: 2 });
```

Duotone and animated solid paint details that sit on a solid shape with the CSS variable `--bri-knockout` (default `#fff`): set it to your background.

Options: `variant` (`line` `duo` `solid` `duotone` `color`), `animated`, `size`, `strokeWidth`, `title`, and `palette`:
a preset (`spectrum` `sunset` `ocean` `mint` `grape` `lava` `gold` `ice`), a hue `0–360`, a `[hue, accentHue]` pair or a full palette object.

## How it works

Performance: animations use transform and opacity keyframes only and never run inside a `<mask>`; colour decides
detail colours from bounding boxes instead of masks, and the website only animates icons that are on screen.

Each icon in `src/icons/*.mjs` is a short list of primitives with a **role**: `b` body, `a` accent, `d` detail, `f` dot,
`h` shine. `src/render.mjs` reads the roles: line strokes everything (later shapes knock a gap out of strokes behind them),
solid fills bodies and cuts details out, colour paints gradients. Motion is an `an` name on any primitive or group. One drawing, five consistent styles, no hand-maintained copies.

```bash
npm run check   # every icon renders in every style, ids resolve, names are unique
npm run build   # writes site/public: SVG files, sprites, icons.json, bridle.js, bridle-svg.zip
```

The website (`site/`) is Vite + React + Tailwind with [cult/ui](https://www.cult-ui.com) components.

## Licence and originality

MIT. Every icon is original work drawn for Bridle. The crypto section uses abstract glyphs only, with no chain or token
logos, so the whole set is safe to use anywhere, commercial or not.
