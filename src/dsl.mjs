// Bridle icon DSL. Every icon is drawn once on a 24×24 grid (live area 2–22, 1.5 stroke) as a list of
// primitives. Each primitive has a ROLE that every style reads differently:
//   b  body    – closed shape: outlined (line), filled (solid), gradient (color), raised white (iso)
//   a  accent  – closed shape in the accent colour
//   d  detail  – open stroke: ink on top of bodies, cut-outs in solid
//   f  dot     – small filled mark
//   h  shine   – highlight stroke, only drawn in colour and iso
// `an` is an animation name from render.mjs (optionally "name:delay", e.g. "blink:.4").

const n = (v) => +v.toFixed(2);

export const R = (x, y, w, h, rx = 0, r = 'b', an) => ({ t: 'rect', x, y, w, h, rx, r, an });
export const C = (cx, cy, rad, r = 'b', an) => ({ t: 'circle', cx, cy, rad, r, an });
export const E = (cx, cy, rx, ry, r = 'b', an) => ({ t: 'ellipse', cx, cy, rx, ry, r, an });
// closed paths (ending in Z) default to bodies, open ones to details
export const P = (d, r, an) => ({ t: 'path', d, r: r || (/z\s*$/i.test(d) ? 'b' : 'd'), an });
export const G = (an, ...els) => ({ t: 'g', an, els });
export const I = (name, tags, els, cat) => ({ name, tags: tags.split(' ').filter(Boolean), els, cat });

// ---- procedural shapes (exact geometry beats hand-typed arcs) ----
const pt = (cx, cy, r, a) => [n(cx + r * Math.cos(a)), n(cy + r * Math.sin(a))];
export function gear(cx, cy, ro, ri, teeth) {
  const step = (Math.PI * 2) / teeth, w = step * 0.22;
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a = i * step - Math.PI / 2;
    const p = [pt(cx, cy, ri, a - step / 2 + w), pt(cx, cy, ro, a - w), pt(cx, cy, ro, a + w), pt(cx, cy, ri, a + step / 2 - w)];
    d += (i ? 'L' : 'M') + p[0] + `L${p[1]}L${p[2]}L${p[3]}`;
  }
  return d.replace(/,/g, ' ') + 'Z';
}
export function star(cx, cy, ro, ri, pts = 5, rot = -Math.PI / 2) {
  let d = '';
  for (let i = 0; i < pts * 2; i++) d += (i ? 'L' : 'M') + pt(cx, cy, i % 2 ? ri : ro, rot + (i * Math.PI) / pts).join(' ');
  return d + 'Z';
}
export function poly(cx, cy, r, sides, rot = -Math.PI / 2) {
  let d = '';
  for (let i = 0; i < sides; i++) d += (i ? 'L' : 'M') + pt(cx, cy, r, rot + (i * 2 * Math.PI) / sides).join(' ');
  return d + 'Z';
}
// sparkle: four-point star with concave sides
export function spark(cx, cy, r) {
  const k = r * 0.28;
  return `M${cx} ${cy - r}Q${cx + k} ${cy - k} ${cx + r} ${cy}Q${cx + k} ${cy + k} ${cx} ${cy + r}Q${cx - k} ${cy + k} ${cx - r} ${cy}Q${cx - k} ${cy - k} ${cx} ${cy - r}Z`;
}
// arc segment path (angles in degrees, 0 = up, clockwise)
export function arc(cx, cy, r, a0, a1) {
  const p = (a) => pt(cx, cy, r, ((a - 90) * Math.PI) / 180).join(' ');
  return `M${p(a0)}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p(a1)}`;
}
// pie wedge
export function wedge(cx, cy, r, a0, a1) {
  return `M${cx} ${cy}L${arc(cx, cy, r, a0, a1).slice(1)}Z`;
}
// flat isometric cube: [top, left, right] faces centred on cx,cy with edge s
export function cube(cx, cy, s, roles = ['a', 'b', 'b'], an) {
  const w = n(s * 0.866), h = n(s / 2);
  const top = `M${cx} ${n(cy - s)}L${n(cx + w)} ${n(cy - h)}L${cx} ${cy}L${n(cx - w)} ${n(cy - h)}Z`;
  const left = `M${n(cx - w)} ${n(cy - h)}L${cx} ${cy}L${cx} ${n(cy + s)}L${n(cx - w)} ${n(cy + h)}Z`;
  const right = `M${n(cx + w)} ${n(cy - h)}L${cx} ${cy}L${cx} ${n(cy + s)}L${n(cx + w)} ${n(cy + h)}Z`;
  return G(an, P(left, roles[1]), P(right, roles[2]), P(top, roles[0]));
}
// coin seen face-on with a rim
export const coin = (cx, cy, r, role = 'a', an) => G(an, C(cx, cy, r, role), C(cx, cy, n(r * 0.66), 'd'));
// a payment card body
export const card = (x, y, w, h, role = 'b') => R(x, y, w, h, 2.2, role);
// invisible pivot: gives a rotating group a bounding box centred on (cx, cy)
export const X = (cx, cy, rad) => C(cx, cy, rad, 'x');
