import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

// ---- local geometry helpers (exact arcs instead of hand-typed ones) ----
const f = (v) => +v.toFixed(2);
const TAU = Math.PI * 2;
const ang = (c, p) => Math.atan2(p[1] - c[1], p[0] - c[0]);
const cw = (a0, a1) => (((a1 - a0) % TAU) + TAU) % TAU;
const pt = (p) => `${f(p[0])} ${f(p[1])}`;
function meet(a, b, upper = true) {
  const [x1, y1, r1] = a, [x2, y2, r2] = b, dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy);
  const l = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, r1 * r1 - l * l));
  const mx = x1 + (l * dx) / d, my = y1 + (l * dy) / d;
  const p = [mx + (h * dy) / d, my - (h * dx) / d], q = [mx - (h * dy) / d, my + (h * dx) / d];
  return upper ? (p[1] < q[1] ? p : q) : [p, q];
}
// cloud from circles listed left to right; first and last sit on the flat base
function cloud(cs) {
  let cur = [cs[0][0], cs[0][1] + cs[0][2]], d = `M${pt(cur)}`;
  cs.forEach((c, i) => {
    const end = i < cs.length - 1 ? meet(c, cs[i + 1]) : [c[0], c[1] + c[2]];
    const s = cw(ang(c, cur), ang(c, end));
    d += `A${c[2]} ${c[2]} 0 ${s > Math.PI ? 1 : 0} 1 ${pt(end)}`;
    cur = end;
  });
  return d + 'Z';
}
// arc on circle c (x,y,r) from p to q that passes the side containing point v
function arcVia(c, p, q, v) {
  const a0 = ang(c, p), s = cw(a0, ang(c, q)), inCw = cw(a0, ang(c, v)) < s;
  const ext = inCw ? s : TAU - s;
  return `A${c[2]} ${c[2]} 0 ${ext > Math.PI ? 1 : 0} ${inCw ? 1 : 0} ${pt(q)}`;
}
// crescent: disc A minus disc B
function crescent(ax, ay, ar, bx, by, br) {
  const A = [ax, ay, ar], B = [bx, by, br], [p, q] = meet(A, B, false);
  const dx = bx - ax, dy = by - ay, d = Math.hypot(dx, dy);
  const far = [ax - (ar * dx) / d, ay - (ar * dy) / d], near = [bx - (br * dx) / d, by - (br * dy) / d];
  return `M${pt(p)}${arcVia(A, p, q, far)}${arcVia(B, q, p, near)}Z`;
}
// teardrop with its round end centred on cx,cy
function tear(cx, cy, r, k = 2.1) {
  const s = Math.sqrt(1 - 1 / (k * k)), c = 1 / k;
  return `M${cx} ${f(cy - k * r)}L${f(cx + r * s)} ${f(cy - r * c)}A${r} ${r} 0 1 1 ${f(cx - r * s)} ${f(cy - r * c)}Z`;
}
// radial line segments
function rays(cx, cy, r0, r1, n, rot = 0, only) {
  let d = '';
  for (let i = 0; i < n; i++) {
    if (only && !only.includes(i)) continue;
    const a = rot + (i * TAU) / n - Math.PI / 2, c = Math.cos(a), s = Math.sin(a);
    d += `M${f(cx + r0 * c)} ${f(cy + r0 * s)}L${f(cx + r1 * c)} ${f(cy + r1 * s)}`;
  }
  return d;
}
const flake = (cx, cy, r) => rays(cx, cy, -r, r, 3, Math.PI / 2);
// flame: base centre (cx, by), width w, height h
function flame(cx, by, w, h) {
  const X_ = (x) => f(cx + x * w), Y_ = (y) => f(by + y * h);
  return `M${X_(0)} ${Y_(0)}C${X_(-0.55)} ${Y_(0)} ${X_(-0.62)} ${Y_(-0.32)} ${X_(-0.5)} ${Y_(-0.5)}C${X_(-0.38)} ${Y_(-0.7)} ${X_(-0.08)} ${Y_(-0.76)} ${X_(0.02)} ${Y_(-1)}C${X_(0.2)} ${Y_(-0.76)} ${X_(0.5)} ${Y_(-0.62)} ${X_(0.54)} ${Y_(-0.4)}C${X_(0.6)} ${Y_(-0.18)} ${X_(0.42)} ${Y_(0)} ${X_(0)} ${Y_(0)}Z`;
}
// horizontal wave line
function wave(x0, x1, y, amp, len) {
  let d = `M${x0} ${y}`;
  for (let x = x0, up = true; x < x1 - 0.01; x += len / 2, up = !up) {
    const seg = Math.min(len / 2, x1 - x);
    d += `q${f(seg / 2)} ${up ? -amp : amp} ${f(seg)} 0`;
  }
  return d;
}

export default [
  // ---- sky & cloud ----
  I('sunny', 'sun clear sky sunshine bright day', [G('spin-slow', X(12, 12, 10), P(star(12, 12, 9.8, 6.6, 8))), C(12, 12, 4.4, 'a', 'pulse')]),
  I('partly-cloudy-day', 'partly cloudy sun cloud forecast fair', [G('spin-slow', X(15.5, 8.5, 6.3), P(rays(15.5, 8.5, 4.9, 6.3, 8))), C(15.5, 8.5, 3.2, 'a', 'pulse'), G('float', P(cloud([[6.5, 16, 3.5], [11, 13, 4.8], [17, 16.3, 3.2]])))]),
  I('partly-cloudy-night', 'night cloud moon clear evening forecast', [P(crescent(15.5, 8, 5.2, 18.6, 5.6, 4.3), 'a', 'tilt'), P(spark(6, 5.5, 2.2), 'b', 'blink'), G('float', P(cloud([[6, 16.5, 3], [10.5, 13.5, 4.5], [16, 16, 3.5]])))]),
  I('overcast', 'overcast clouds grey sky dull cloudy', [G('slide-r', P(cloud([[12, 9.5, 2.8], [16, 6.8, 4], [19.2, 9.8, 2.5]]))), G('slide-l', P(cloud([[6.5, 16, 3.5], [11.5, 12.5, 5], [17, 15.5, 4]])))]),
  I('light-rain', 'rain light drops shower wet', [P(cloud([[7, 11.5, 3.5], [12.5, 8.5, 4.8], [17, 11, 4]])), P(tear(8.5, 19.5, 1.2), 'a', 'drop'), P(tear(12.5, 18.5, 1.2), 'a', 'drop:.5'), P(tear(16.5, 19.5, 1.2), 'a', 'drop:1')]),
  I('heavy-rain', 'downpour heavy rain storm deluge', [P(cloud([[6.5, 10, 3.5], [12, 6.5, 4.8], [17.5, 9.5, 4]])), P('M7.5 15.5 6 19.5', 'a', 'drop'), P('M11.5 15.5 9.5 21', 'a', 'drop:.3'), P('M15.5 15.5 14 19.5', 'a', 'drop:.6'), P('M19.5 15.5 17.5 21', 'a', 'drop:.9')]),
  I('drizzle', 'drizzle spit light rain misty drops', [P(cloud([[6, 12, 3], [10.5, 9, 4.2], [15.5, 8.5, 4], [19, 12, 3]])), C(7, 18, 0.9, 'f', 'blink'), C(11, 18, 0.9, 'f', 'blink:.4'), C(15, 18, 0.9, 'f', 'blink:.8'), C(19, 18, 0.9, 'f', 'blink:1.2'), C(9, 21, 0.9, 'f', 'blink:.6'), C(13, 21, 0.9, 'f', 'blink:1'), C(17, 21, 0.9, 'f', 'blink:.2')]),
  I('sun-showers', 'sun shower rain sunshine mixed weather', [G('spin-slow', X(16.5, 7, 5.6), P(rays(16.5, 7, 4.3, 5.6, 8))), C(16.5, 7, 2.8, 'a', 'pulse'), P(cloud([[5.5, 12.5, 2.8], [9.5, 9.5, 4.2], [14.5, 12, 3.3]])), P('M6.5 17.5 5.5 20M10.5 17.5 9.5 20M14.5 17.5 13.5 20', 'd', 'drop')]),
  I('thunderstorm', 'thunder storm lightning rain severe', [P(cloud([[6.5, 11, 3.5], [12, 7.5, 5], [17.5, 10.5, 4]])), P('M12.8 13.5 9.6 18h3l-1.4 4 4.9-6h-3l1.4-2.5Z', 'a', 'blink'), P('M6.5 16.5 5.5 19M18.5 16.5l-1 2.5', 'd', 'drop')]),
  I('lightning-strike', 'lightning bolt strike thunder ground impact', [P('M14 2.5 6.5 13H11l-2.2 7.5L17.5 9.5H13l2.5-7Z', 'a', 'blink'), P('M2.5 21.5h4.5M11 21.5h10.5'), P('M4.5 17.5l1.8 1.3M14.5 17.5l-1.6 1.6', 'd', 'blink:.4')]),
  I('snow', 'snow snowfall winter flakes cold', [P(cloud([[7, 11.5, 3.5], [12, 8, 4.8], [17, 11, 4]])), P(flake(8, 18.5, 1.6), 'a', 'drop'), P(flake(12.5, 20, 1.6), 'a', 'drop:.6'), P(flake(17, 18.5, 1.6), 'a', 'drop:1.2')]),
  I('heavy-snow', 'blizzard heavy snow drift snowstorm winter', [G('spin-slow', X(11, 9.5, 3), P(flake(11, 9.5, 3), 'a')), P(flake(5.5, 4.5, 1.6), 'd', 'drop'), P(flake(18, 5, 1.8), 'd', 'drop:.7'), C(5, 12, 0.9, 'f', 'blink'), C(17.5, 12, 0.9, 'f', 'blink:.5'), P('M2.5 21.5c2.5-3 5.5-4.5 9.5-4.5s7 1.5 9.5 4.5Z')]),
  I('sleet', 'sleet ice pellets rain snow mix', [P(cloud([[7, 11, 3], [11.5, 7.5, 4.8], [17, 10, 4]])), P(tear(7.5, 19, 1.2), 'a', 'drop'), P(flake(12.5, 18.5, 1.7), 'd', 'drop:.5'), P(tear(17.5, 19, 1.2), 'a', 'drop:1')]),
  I('hail', 'hail hailstones ice balls storm', [P(cloud([[6, 11, 3], [10.5, 7.5, 4.5], [15.5, 7, 4.2], [19, 11, 3]])), C(7.5, 18, 1.6, 'a', 'drop'), C(12, 20, 1.6, 'a', 'drop:.4'), C(16.5, 17.5, 1.6, 'a', 'drop:.8')]),
  I('freezing-rain', 'freezing rain ice glaze drop frozen', [P(tear(12, 15, 6.2, 2)), G('spin-slow', X(12, 15, 3.2), P(flake(12, 15, 3.2), 'a'))]),
  I('fog', 'fog low visibility murk grey', [R(3, 4.5, 12, 2.4, 1.2, 'b', 'slide-r'), R(7, 9, 14, 2.4, 1.2, 'a', 'slide-l'), R(3, 13.5, 15, 2.4, 1.2, 'b', 'slide-r'), R(9, 18, 10, 2.4, 1.2, 'b', 'slide-l')]),
  I('mist', 'mist hills haze morning damp', [P('M2.5 19 8.5 8.5l4 6 2.5-3.5 6.5 8Z'), P('M3.5 13h7M13 13h3', 'd', 'slide-r'), P('M6 16h12', 'a', 'slide-l'), P('M2.5 21.5h19', 'd', 'slide-r')]),
  I('haze', 'haze hazy sun dim smog', [P(rays(12, 11.5, 7, 8.5, 8, 0, [0, 1, 6, 7]) + 'M3 11.5h1.5M19.5 11.5H21', 'd', 'blink'), C(12, 11.5, 5, 'a'), P('M3 14h18', 'd', 'slide-l'), P('M5 17.5h14', 'd', 'slide-r'), P('M8 21h8', 'd', 'slide-l')]),
  I('smoke', 'smoke chimney emissions pollution puffs', [C(8.5, 10.5, 1.8, 'b', 'rise'), C(12, 7, 2.5, 'b', 'rise:.4'), C(17.3, 5.2, 2.9, 'b', 'rise:.8'), R(5, 14, 6, 7.5, 1, 'a'), P('M5 17h6')]),
  I('dust-storm', 'dust storm sandstorm haboob wind', [P(cloud([[5.5, 16, 3.5], [10.5, 13, 4.5], [16, 14.5, 4], [19.5, 17, 2.5]]), 'a'), P('M2.5 21.5h19'), P('M13 4.5h6M15.5 8h5', 'd', 'slide-r'), C(5, 6, 0.9, 'f', 'slide-r'), C(8.5, 9, 0.9, 'f', 'slide-r:.4')]),
  I('tornado', 'tornado twister funnel cyclone', [P('M3 4h18', 'd', 'slide-l'), P('M5.5 8h13', 'd', 'slide-r'), P('M8 12h10', 'a', 'slide-l'), P('M9.5 16h6', 'd', 'slide-r'), P('M11 20h2.5', 'd', 'slide-l')]),
  I('hurricane', 'hurricane typhoon cyclone storm spiral eye', [G('spin', X(12, 12, 9.5), C(12, 12, 5), P('M12 7C9 5 6 3.5 3 4M12 17c3 2 6 3.5 9 3'), C(12, 12, 2, 'a'))]),
  I('windsock', 'wind windsock direction airport breeze', [P('M4.5 21.5V3'), G('wave', P('M5 4.5l14.5 2.2v4.6L5 13.5Z'), P('M9.5 5.2l4.8.7v6.2l-4.8.7Z', 'a')), P('M2.5 21.5h4.5')]),
  I('strong-wind', 'gale strong wind gusts tree bending storm', [P('M10 21.5c0-3.5.5-6.5 2.5-9', 'd'), G('seesaw', P(cloud([[11.5, 10.5, 2.5], [15.2, 7.2, 4], [19.2, 10, 3]]))), P('M2.5 8.5h5M2.5 12.5h6.5M3 16.5h4.5', 'a', 'slide-r')]),
  I('breeze-leaf', 'breeze leaf drift wind gentle autumn', [P('M2.5 15h9c2.5 0 4 1.8 3.4 3.7-.6 1.8-3.5 1.8-3.4 0', 'd', 'draw'), P('M2.5 19h5', 'd', 'slide-r'), G('float', P('M12 11c0-4 2.8-6.6 8-7-.4 5-3.2 7.4-8 7Z', 'a'), P('M12 11l4.5-4.5'))]),
  I('rainbow', 'rainbow arc spectrum after rain colours', [P('M2.5 18.5a9.5 9.5 0 0 1 19 0h-4a5.5 5.5 0 0 0-11 0Z', 'a'), P('M4.5 18.5a7.5 7.5 0 0 1 15 0', 'd', 'draw'), G('float', P(cloud([[14.7, 18.8, 2], [17.8, 16.6, 3], [20, 19.3, 1.5]])))]),
  I('sunrise', 'sunrise dawn morning horizon rising sun', [P(rays(12, 16, 7.5, 9, 8, 0, [0, 1, 2, 6, 7]), 'd', 'blink'), P('M6 16a6 6 0 0 1 12 0Z', 'a', 'rise'), P('M2.5 16h19'), P('M9.5 21l2.5-2.5 2.5 2.5', 'd', 'slide-u')]),
  I('sunset', 'sunset dusk evening sea horizon sun', [P('M6.5 14a5.5 5.5 0 0 1 11 0Z', 'a', 'sink'), P(wave(2.5, 21.5, 14, 0.9, 4.75), 'd', 'wave'), P('M8.5 17.5h7', 'd', 'slide-l'), P('M10.5 20.5h3', 'd', 'slide-r'), P('M4 5.5l1.5 1 1.5-1M8.5 3.5l1.2.8 1.2-.8', 'd', 'float')]),
  I('moonrise', 'moonrise moon night hills rising evening', [P(crescent(13.5, 10, 5, 16.5, 8, 4.2), 'a', 'rise'), P(spark(5.5, 6, 2), 'b', 'blink'), C(19.5, 4.5, 0.9, 'f', 'blink:.6'), P('M2.5 21.5v-2c2-3 4-4.5 6.5-4.5s4.5 2 6.5 2 4.5-1.5 6-3v7.5Z')]),
  // ---- moon phases ----
  I('new-moon', 'new moon dark phase lunar cycle', [C(12, 12, 8.5, 'b', 'breathe'), C(9, 9.5, 1.8, 'd'), C(15, 14.5, 2.4, 'd'), C(9.5, 16, 1, 'f')]),
  I('crescent-moon', 'crescent moon waxing phase lunar sliver', [C(12, 12, 8.5), P('M12 3.5a8.5 8.5 0 0 1 0 17a5 8.5 0 0 0 0-17Z', 'a', 'breathe')]),
  I('half-moon', 'half moon first quarter phase lunar', [C(12, 12, 8.5), P('M12 3.5a8.5 8.5 0 0 1 0 17Z', 'a', 'breathe')]),
  I('gibbous-moon', 'gibbous moon waxing phase lunar bright', [C(12, 12, 8.5), P('M12 3.5a8.5 8.5 0 0 1 0 17a4.5 8.5 0 0 1 0-17Z', 'a', 'breathe')]),
  I('full-moon', 'full moon lunar night bright craters', [C(12, 12, 8.5, 'a', 'pulse'), C(9, 9, 2, 'd'), C(15.5, 13, 2.6, 'd'), C(9.5, 16, 1, 'f'), P('M7 6.5a7 7 0 0 1 3-1.5', 'h')]),
  // ---- night sky ----
  I('starry-sky', 'constellation stars night sky astronomy', [P('M3.5 7 8 5.5l3.5 2.5 3 2 .5 4.5 5 1 .5-5-5.5-.5', 'd', 'dash'), C(3.5, 7, 1, 'f', 'blink'), C(8, 5.5, 1, 'f', 'blink:.3'), C(11.5, 8, 1, 'f', 'blink:.6'), C(15, 14.5, 1, 'f', 'blink:.9'), C(20, 15.5, 1, 'f', 'blink:1.2'), C(20.5, 10.5, 1, 'f', 'blink:1.5'), P(spark(6.5, 17, 3.2), 'a', 'pulse')]),
  I('aurora', 'aurora northern lights borealis sky night', [G('wave', P('M3 6.5c3-2.5 6 1 9-1s6-2 9 0v5c-3-2-6 0-9 1.5s-6-1-9 1.5Z', 'a'), P('M7.5 6.2v5.6M12 5.5v6.5M16.5 4.8v6.2', 'd', 'blink')), P('M2.5 21.5 7 16l3 3 4.5-5.5 7 8Z'), C(4, 3.5, 0.8, 'f', 'blink:.5')]),
  I('meteor', 'meteor shooting star comet space falling', [G('diag-in', P('M14.4 14.4 4 4M17.5 12.5l-5.5-5.5M12.5 17.5 7 12', 'd'), C(16.5, 16.5, 3.2, 'a')), C(20, 5, 0.9, 'f', 'blink'), C(5, 19.5, 0.9, 'f', 'blink:.6')]),
  I('eclipse', 'eclipse solar corona sun moon astronomy', [G('spin-slow', X(12, 12, 9.6), P(rays(12, 12, 8, 9.6, 12))), C(12, 12, 6.4, 'a'), C(13, 11, 5, 'b', 'slide-l')]),
  // ---- temperature ----
  I('thermometer-hot', 'hot temperature heat thermometer high', [P('M6 12.5V5a3 3 0 0 1 6 0v7.5a4 4 0 1 1-6 0Z'), C(9, 15.2, 2.2, 'a'), P('M9 13.5V6', 'a', 'grow'), P('M16.5 15c-1-1.5 1-2.5 0-4s1-2.5 0-4M20.5 15c-1-1.5 1-2.5 0-4s1-2.5 0-4', 'd', 'rise')]),
  I('thermometer-cold', 'cold temperature freezing thermometer low', [G('spin-slow', X(7.5, 8.5, 4.6), P(flake(7.5, 8.5, 4.6), 'd')), P('M13 12.5V5a3 3 0 0 1 6 0v7.5a4 4 0 1 1-6 0Z'), C(16, 15.2, 2.2, 'a', 'pulse'), P('M16 13v-1.5', 'a')]),
  I('heat-wave', 'heatwave heat wave hot shimmer scorching', [G('spin-slow', X(12, 7.5, 5.5), P(rays(12, 7.5, 4.2, 5.5, 8))), C(12, 7.5, 2.9, 'a', 'pulse'), P(wave(3, 21, 15.5, 1, 4.5), 'd', 'wave'), P(wave(5, 19, 19.5, 1, 4.5), 'd', 'wave')]),
  I('frost', 'frost frozen window ice crystals fern', [R(3, 3, 18, 18, 3), P('M4.5 19.5c2.5-2.5 4.5-6 5-10M6.5 16.5l-2-.6M6.5 16.5l.6-2.2M8.6 12.7 6.5 12M8.6 12.7l.8-2', 'd', 'draw'), G('spin-slow', X(15.5, 8.5, 3), P(flake(15.5, 8.5, 3), 'a'))]),
  I('snowflake', 'snowflake winter crystal frozen detailed', [G('spin-slow', X(12, 12, 9.5), P(rays(12, 12, 2.6, 9.3, 6) + [0, 1, 2, 3, 4, 5].map((i) => {
    const a = (i * TAU) / 6 - Math.PI / 2, bx = 12 + 6 * Math.cos(a), by = 12 + 6 * Math.sin(a);
    return [-1, 1].map((s) => `M${f(bx)} ${f(by)}L${f(bx + 2.6 * Math.cos(a + s * 0.8))} ${f(by + 2.6 * Math.sin(a + s * 0.8))}`).join('');
  }).join('')), P(poly(12, 12, 2.6, 6), 'a'))]),
  I('ice-crystal', 'ice crystal hexagon frozen prism', [P(poly(12, 12, 9.5, 6)), P(rays(12, 12, 4.6, 9.5, 6)), P(poly(12, 12, 4.6, 6), 'a', 'pulse')]),
  // ---- measurement ----
  I('humidity', 'humidity percent moisture drop relative', [G('sink', P(tear(12, 15, 6, 2)), P('M9.5 18 14.5 12', 'a'), C(9.6, 12.8, 1, 'f'), C(14.4, 17.2, 1, 'f'))]),
  I('barometer', 'barometer pressure gauge dial forecast', [C(12, 12, 9), P(arc(12, 12, 6.3, -120, 120), 'd'), P(rays(12, 12, 6.3, 7.5, 12, 0, [0, 2, 10]), 'd'), G('seesaw', X(12, 12, 6), P('M12 12 15.3 8', 'a')), C(12, 12, 1.4, 'f'), P('M9.5 17.5h5')]),
  I('uv-index', 'uv index ultraviolet sun exposure level', [G('spin-slow', X(7.5, 7.5, 5.2), P(rays(7.5, 7.5, 4, 5.2, 8))), C(7.5, 7.5, 2.6, 'a', 'pulse'), R(10, 16, 2, 5, 1, 'b', 'grow'), R(14, 12.5, 2, 8.5, 1, 'b', 'grow:.3'), R(18, 9, 2, 12, 1, 'b', 'grow:.6')]),
  I('pollen', 'pollen allergy spores hay fever grain', [P(star(11.5, 12.5, 7, 5.4, 14), 'a', 'pulse'), C(9.5, 11, 1, 'f'), C(13.5, 14.5, 1, 'f'), C(4, 4.5, 1.3, 'b', 'float'), C(20, 19.5, 1.3, 'b', 'float:.6'), C(19.5, 4.5, 0.9, 'f', 'blink')]),
  I('rain-umbrella', 'umbrella rain protection wet shelter', [P('M6 3 5 5.5M11 2.5l-1 2.5M15 2.5 14 5M19.5 3l-1 2.5', 'd', 'drop'), G('seesaw', P('M5 15a7 7 0 0 1 14 0c-1.2-.9-2.3-.9-3.5 0-1.2-.9-2.3-.9-3.5 0-1.2-.9-2.3-.9-3.5 0-1.2-.9-2.3-.9-3.5 0Z', 'a'), P('M12 15v4.5a1.5 1.5 0 0 1-3 0'))]),
  I('raincoat', 'raincoat coat hood waterproof wet weather', [P('M8 7.5a4 4 0 0 1 8 0l3.5 2 1.5 9h-3.5l-.5-4V21H7v-6.5l-.5 4H3l1.5-9Z', 'a'), P('M9.6 7.5a2.4 2.4 0 0 1 4.8 0'), P('M12 10.5V21'), P(tear(20, 5, 1.1), 'b', 'drop'), P(tear(4.5, 4, 1.1), 'b', 'drop:.6')]),
  I('weather-station', 'weather station anemometer instruments sensors', [G('flip', P('M5 5.5h14'), P('M3 5.5a2 2 0 0 0 4 0Z', 'a'), P('M17 5.5a2 2 0 0 0 4 0Z', 'a')), P('M12 5.5V21'), R(8.5, 11, 7, 5, 1), P('M10 13.5h4'), P('M8.5 21.5h7')]),
  I('weather-radar', 'doppler radar precipitation sweep weather', [C(12, 12, 9), G('spin', X(12, 12, 8.2), P(wedge(12, 12, 8.2, 0, 55), 'a')), C(12, 12, 4.8, 'd'), C(8, 15.5, 1.5, 'f', 'blink'), C(16, 8.2, 1.1, 'f', 'blink:.6'), C(15.5, 16.5, 0.9, 'f', 'blink:1.2')]),
  I('cloud-imagery', 'satellite image cloud swirl imagery storm view', [P('M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3', 'd'), C(12, 12, 6.2), G('spin-slow', X(12, 12, 5), P('M12.5 12a.8.8 0 0 0-1.3-.6 1.6 1.6 0 0 0 .6 2.6 2.6 2.6 0 0 0 3.2-2.4 3.6 3.6 0 0 0-4-3.6 4.4 4.4 0 0 0-3.6 4.6', 'a'))]),
  I('severe-weather', 'severe weather warning alert storm hazard', [P('M10.3 4.5a2 2 0 0 1 3.4 0l7.6 13a2 2 0 0 1-1.7 3H4.4a2 2 0 0 1-1.7-3Z'), P('M12.8 8.5 9.8 13.5h3l-1.3 4.5 3.8-6h-3l1.2-3.5Z', 'a', 'blink')]),
  I('rain-gauge', 'rain gauge rainfall measure millimetres cylinder', [P('M6 3h12l-3.5 4.5h-5Z'), R(8.5, 7.5, 7, 14, 1.5), R(8.5, 14, 7, 7.5, 1.5, 'a', 'grow'), P('M8.5 10.5h2.5M8.5 13h1.5M8.5 15.5h2.5M8.5 18h1.5', 'd')]),
  I('wind-vane', 'wind vane weathervane direction compass rooftop', [G('seesaw', X(12, 7, 9), P('M4.5 7h13'), P('M2.5 4.5h3l2 2.5-2 2.5h-3l2-2.5Z'), P('M17 4.5 21.5 7 17 9.5Z', 'a')), C(12, 7, 1.3, 'f'), P('M12 8.5V21M7 15h10M9.5 21.5h5'), C(6.5, 15, 1, 'f'), C(17.5, 15, 1, 'f')]),
  // ---- hazards ----
  I('flood-level', 'flood water level rising inundation gauge', [P('M4 13V9.5l3.5-3 3.5 3V13Z'), R(15.5, 3, 4, 18, 1.2), P('M16.2 6h2M16.2 9h2M16.2 12h2', 'd'), P('M2.5 15c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0 1-.8 1.5-.8v6.8a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1Z', 'a', 'slide-u')]),
  I('drought', 'drought dry cracked earth arid heat', [G('spin-slow', X(12, 8, 5.6), P(rays(12, 8, 4.3, 5.6, 8))), C(12, 8, 3, 'a', 'pulse'), P('M2.5 16h19v4.5a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1Z'), P('M6 21.5l1.5-2.5-1-3M12.5 16l1 2.5-1.5 3M17.5 16l-1 2.5 2 1', 'd', 'draw')]),
  I('wildfire-front', 'wildfire bushfire hill flames burning front', [P('M2.5 21.5c3-4 6-5.5 9.5-5.5s6.5 1.5 9.5 5.5Z'), P(flame(12, 16, 8, 13), 'a', 'flicker'), P(flame(6, 18.5, 4.5, 7), 'a', 'flicker:.4'), P(flame(18, 18, 4.5, 7.5), 'a', 'flicker:.8')]),
  I('volcano', 'volcano eruption lava magma mountain', [P(cloud([[9.8, 6.5, 1.8], [12, 5, 2.4], [14.2, 6.5, 1.8]]), 'b', 'rise'), P('M2.5 21.5 9 10.5h6l6.5 11Z'), P('M10.2 10.5h3.6l-.8 3 1 3-1.8-1.4-1.4 2.4-.2-3.5Z', 'a', 'pulse'), C(5.5, 5, 0.9, 'f', 'rise:.5'), C(18.5, 5, 0.9, 'f', 'rise:1')]),
  I('earthquake', 'earthquake seismograph tremor quake seismic', [P('M2.5 11h4l1.5-4 2 8.5 2-11 2 10.5 1.5-5.5 1 1.5h5', 'a', 'draw'), G('shake', P('M2.5 18h9l-1 1.5 1.5 2H2.5Z')), G('shake', P('M13.5 18h8v3.5h-9l1-1.8Z'))]),
  I('tsunami', 'tsunami tidal wave surge ocean breaking', [G('slide-r', P('M2.5 20.5C5 20 7 17 8.5 13 10.5 7.5 13.5 4.5 17 4.5c2.5 0 4.5 1.5 4.5 3.5 0 1.8-1.5 3-3.2 3-1.5 0-2.3-1-2.1-2.2-2.2.7-3.4 3.7-3.2 6.7.2 3 2.5 5 8.5 5Z', 'a'), P('M10.5 15c.5-3 2-5.5 4-6.5', 'd')), P('M2.5 21.5h19', 'd')]),
  // ---- landscape ----
  I('mountain-peak', 'mountain peak summit flag climb snowcap', [P('M2.5 20.5 9.5 7l3.5 6 2.5-3.5 6 10.5Z'), P('M7.4 11l1.3.8 1.2-1 1.3 1 .8-.6', 'd'), P('M9.5 7V2.8', 'd'), P('M9.8 2.8h4l-1 1.3 1 1.3h-4Z', 'a', 'wave')]),
  I('valley-river', 'valley river canyon stream landscape', [P('M2.5 5c2.5 3 4.5 7.5 6 12l1 4.5H2.5Z'), P('M21.5 5c-2.5 3-4.5 7.5-6 12l-1 4.5h7Z'), P('M12 9c-1.3 2.5 1.3 4 0 6.5s-2.2 3.5-2.2 6h4.4c0-2.5 1.2-3.5 1.4-5.5S12 11.5 12 9Z', 'a', 'breathe'), C(12, 4.5, 1.6, 'f', 'pulse')]),
  I('desert-dunes', 'desert dunes sand arid sahara', [C(17.5, 6.5, 2.6, 'a', 'pulse'), P('M2.5 15c4-4 8-5 12-3s5 2 7 1v8.5h-19Z'), P('M2.5 21.5c3-4 7-5 11-4s6 3 8 4Z', 'b', 'slide-l'), P('M6 14.5c2 1 3 2.5 3.5 4', 'd')]),
  I('ocean-waves', 'ocean sea waves surf water marine', [P(wave(2.5, 21.5, 7, 1.2, 6.33), 'd', 'slide-r'), P(wave(2.5, 21.5, 12, 1.2, 6.33), 'a', 'slide-l'), P(wave(2.5, 21.5, 17, 1.2, 6.33), 'd', 'slide-r')]),
  I('beach-palm', 'beach palm tree tropical sand coast', [P('M2.5 21.5c2.5-2.5 6-3.5 9.5-3.5s7 1 9.5 3.5Z'), P('M10.5 18.5c0-5 1-9 3.5-11.5', 'd'), G('swing', P('M14 7C11.5 3.8 7.2 3.5 4.5 6.3 7.8 5.6 11 6 14 7Z', 'b'), P('M14 7c.8-3.4 4-5.2 7.5-4.3C18.6 3.6 16 5 14 7Z', 'b'), P('M14 7c3.4-.5 6.5 1.3 7.5 4.8C19.5 9.7 17 8 14 7Z', 'a'), P('M14 7c-2.6.7-4.6 3-4.8 6 1.3-2.4 3-4.3 4.8-6Z', 'b')), C(12.8, 8.8, 0.9, 'f')]),
  I('island', 'island tropical aerial atoll sea', [P('M5 13c-1-4 2-7.5 7-8 4.5-.5 8 2 8 6 0 4.5-3.5 8-8 8-3.5 0-6-2.5-7-6Z'), G('spin-slow', X(12.8, 11.5, 4), P(star(12.8, 11.5, 4, 1.4, 6), 'a')), P('M3 19.5c1.5 1 3 1 4.5 0M16.5 21c1.2.8 2.5.8 3.7 0M2.5 7c1 .7 2 .7 3 0', 'd', 'slide-r')]),
  I('lake', 'lake pond reeds cattails water', [E(10, 16.5, 7.5, 4.5, 'a'), P('M8 15.5h5M9.5 18.5h3.5', 'd', 'slide-r'), G('swing', P('M18.5 21.5v-9'), R(17.6, 6.5, 1.8, 5, 0.9)), G('swing', P('M21 21.5v-5.5'), R(20.1, 11, 1.8, 4, 0.9))]),
  I('waterfall', 'waterfall cascade falls cliff river', [P('M2.5 4h11v4.5H2.5Z'), P('M5.5 9v8M8.5 9v9.5M11.5 9v8', 'a', 'dash'), E(9, 20, 6.5, 1.6), C(16.5, 17.5, 0.9, 'f', 'blink'), C(18.5, 14.5, 0.9, 'f', 'blink:.6'), P('M17 4.5h4.5', 'd')]),
  I('pine-trees', 'pine trees conifer evergreen woods', [P('M5.5 11l2.4 4H6.7l1.7 3.5H2.6l1.7-3.5H3.1Z'), P('M18.5 8l2.6 4.5h-1.3l1.7 6h-6l1.7-6h-1.3Z'), G('seesaw', P('M12 2.5l4.5 6.5h-2.3l3.8 6.5H6l3.8-6.5H7.5Z', 'a')), P('M5.5 18.5v3M12 15.5v6M18.5 18.5v3', 'd')]),
  I('leaf', 'leaf foliage nature green plant', [G('seesaw', P('M4.5 19.5C4 11 9 4.5 19.5 4.5 19.5 14 13.5 20 4.5 19.5Z', 'a'), P('M4.5 19.5 15 9M9 15l-.5-3.5M9 15l3.5.5M12.5 11.5 12 8.5M12.5 11.5l3 .5', 'd')), P('M4.5 19.5l-2 2', 'd')]),
  I('autumn-leaves', 'autumn fall leaves maple falling season', [G('swing', P(star(8.5, 8.5, 5.5, 2.6, 5), 'a'), P('M8.5 8.5v6')), G('float:.5', P('M13 20c0-4.2 3-7.2 7.5-7.5 0 4.2-3 7.2-7.5 7.5Z'), P('M13 20l5-5'))]),
  I('flower-bloom', 'flower bloom blossom spring petals garden', [G('spin-slow', X(12, 8.5, 6), ...[0, 1, 2, 3, 4].map((i) => {
    const a = -Math.PI / 2 + (i * TAU) / 5;
    return C(f(12 + 3.6 * Math.cos(a)), f(8.5 + 3.6 * Math.sin(a)), 2.4);
  })), C(12, 8.5, 2, 'a', 'pop'), P('M12 14v7.5'), P('M12 18.5c0-2.5 2-4 5-4 0 2.5-2 4-5 4Z')]),
  I('cactus', 'cactus desert succulent saguaro plant', [P('M10 21V15.5H7.75A2.25 2.25 0 0 1 5.5 13.25V9.25a1.25 1.25 0 0 1 2.5 0V13H10V5a2 2 0 0 1 4 0v7h2V8.25a1.25 1.25 0 0 1 2.5 0V12.25A2.25 2.25 0 0 1 16.25 14.5H14V21Z'), P('M12 6.5v12', 'd'), C(17.25, 6.5, 1.4, 'a', 'pop'), P('M3 21.5h18')]),
  I('mushroom', 'mushroom fungi toadstool forest', [P('M3 13a9 8 0 0 1 18 0c0 .8-.6 1.3-1.4 1.3H4.4C3.6 14.3 3 13.8 3 13Z', 'a'), C(8, 9.5, 1.2, 'f', 'pop'), C(13, 7.2, 1.4, 'f', 'pop:.4'), C(16.8, 10.6, 1, 'f', 'pop:.8'), P('M9.5 14.3h5l.8 5.2a1.6 1.6 0 0 1-1.6 1.9h-3.4a1.6 1.6 0 0 1-1.6-1.9Z')]),
  I('sprouting-seed', 'seed sprout germinate shoot growth roots', [E(12, 16, 4.5, 3.2), P('M8.5 15.5c2 1 5 1 7 0', 'd'), P('M10.5 19 9.5 21.5M13.5 19l1 2.5', 'd'), G('grow', P('M12 12.8c0-3.2 1-5.4 3-6.6', 'd'), P('M15 6.2c0-2 1.5-3.5 4-3.5 0 2.5-1.5 3.5-4 3.5Z', 'a'), P('M12.6 9.5c-1-1.5-3-2-5-1.5 1 1.5 3 2 5 1.5Z'))]),
  I('tree-rings', 'tree rings stump wood growth age cross section', [C(12, 12, 9), E(12.4, 11.6, 6.2, 5.8, 'd'), E(12.7, 11.3, 3.6, 3.3, 'd'), C(13, 11, 1.2, 'a', 'pulse'), P('M4 15.5l3.5-1.2', 'd')]),
  // ---- winter ----
  I('icicles', 'icicles ice eaves frozen dripping winter', [R(2.5, 3.5, 19, 3, 1.5), P('M4.5 6.5h3L6 15Z'), P('M9.5 6.5h3L11 17.5Z'), P('M14.5 6.5H17l-1.25 6.5Z'), P('M18.5 6.5H21l-1.25 9Z'), P(tear(11, 20.5, 1, 1.9), 'a', 'drop')]),
  I('snowman', 'snowman winter snow holiday frosty', [C(12, 16.5, 5), C(12, 8, 3.6), C(10.8, 7.5, 0.7, 'f'), C(13.2, 7.5, 0.7, 'f'), R(8.5, 10.6, 7, 1.9, 0.95, 'a'), G('wiggle', P('M7.5 14.5 4 12M16.5 14.5 20 12')), C(12, 15, 0.8, 'f'), C(12, 18, 0.8, 'f')]),
];
