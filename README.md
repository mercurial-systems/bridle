# Bridle

Next-gen open icons for SaaS, business operations, corporate work, finance, banking, cards and crypto.
220 original icons, each drawn once on a 24 px grid and rendered in eight styles:

| style | file folder | notes |
| --- | --- | --- |
| Line | `line` | 1.5 stroke, round caps, inherits `currentColor` |
| Solid | `solid` | filled silhouettes with knocked-out details, `currentColor` |
| Colour | `color` | gradient bodies and accents, per-category palettes |
| Isometric 3D | `iso` | the glyph stands extruded on a lit tile (64 px viewBox) |
| … each with motion | `<style>-animated` | CSS keyframes inside the SVG, honours `prefers-reduced-motion` |

Browse, customise and download at **https://bridle.verity.dev**.

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
<BridleIcon name="vault" variant="iso" palette="ocean" size={96} />
<BridleIcon name="swap" variant="color" palette={200} />     // any hue
```

**Web component (no build step).**

```html
<script type="module" src="https://bridle.verity.dev/bridle.js"></script>
<bridle-icon name="block" variant="iso" animated hue="180"></bridle-icon>
```

**Plain JavaScript.**

```js
import { svg } from 'bridle-icons';
el.innerHTML = svg('invoice', { variant: 'solid', strokeWidth: 2 });
```

Options: `variant` (`line` `solid` `color` `iso`), `animated`, `size`, `strokeWidth`, `title`, and `palette`:
a preset (`spectrum` `sunset` `ocean` `mint` `grape` `lava` `gold` `ice`), a hue `0–360`, a `[hue, accentHue]` pair or a full palette object.

## How it works

Each icon in `src/icons/*.mjs` is a short list of primitives with a **role**: `b` body, `a` accent, `d` detail, `f` dot,
`h` shine. `src/render.mjs` reads the roles: line strokes everything (later shapes knock a gap out of strokes behind them),
solid fills bodies and cuts details out, colour paints gradients, and iso shears the glyph upright onto a tile and extrudes
it. Motion is an `an` name on any primitive or group. One drawing, eight consistent styles, no hand-maintained copies.

```bash
npm run check   # every icon renders in every style, ids resolve, names are unique
npm run build   # writes site/public: 1,760 SVGs, sprites, icons.json, bridle.js, bridle-svg.zip
```

The website (`site/`) is Vite + React + Tailwind with [cult/ui](https://www.cult-ui.com) components.

## Licence and originality

MIT. Every icon is original work drawn for Bridle. The crypto section uses abstract glyphs only, with no chain or token
logos, so the whole set is safe to use anywhere, commercial or not.
