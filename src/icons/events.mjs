import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

const f = (v) => +v.toFixed(2);
// rotated rectangle (polygon) centred on cx,cy
const rp = (cx, cy, w, h, deg) => {
  const a = (deg * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
  return [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]]
    .map(([x, y], i) => `${i ? 'L' : 'M'}${f(cx + x * c - y * s)} ${f(cy + x * s + y * c)}`).join('') + 'Z';
};
// n radial strokes from r0 to r1 (0deg = up)
const rays = (cx, cy, r0, r1, n, off = 0) => Array.from({ length: n }, (_, i) => {
  const a = ((off + (i * 360) / n - 90) * Math.PI) / 180;
  return `M${f(cx + r0 * Math.cos(a))} ${f(cy + r0 * Math.sin(a))}L${f(cx + r1 * Math.cos(a))} ${f(cy + r1 * Math.sin(a))}`;
}).join('');
// horizontal ticket with a half-round notch in each short side
const tkt = (x, y, w, h, r = 1.5, n = 1.8) => {
  const v = h / 2 - r - n;
  return `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${v}a${n} ${n} 0 0 0 0 ${2 * n}v${v}a${r} ${r} 0 0 1-${r} ${r}h-${w - 2 * r}a${r} ${r} 0 0 1-${r}-${r}v-${v}a${n} ${n} 0 0 0 0-${2 * n}V${y + r}a${r} ${r} 0 0 1 ${r}-${r}Z`;
};
const heart = (cx, cy, s = 1) => `M${cx} ${f(cy + 3.4 * s)}s${f(-4.5 * s)}-${f(2.7 * s)}-${f(4.5 * s)}-${f(5.6 * s)}a${f(2.3 * s)} ${f(2.3 * s)} 0 0 1 ${f(4.5 * s)}-${f(1.3 * s)}a${f(2.3 * s)} ${f(2.3 * s)} 0 0 1 ${f(4.5 * s)} ${f(1.3 * s)}c0 ${f(2.9 * s)}-${f(4.5 * s)} ${f(5.6 * s)}-${f(4.5 * s)} ${f(5.6 * s)}Z`;
const mask = (cx, cy) => `M${cx - 4} ${cy - 4.5}h8v4.5a4 4.5 0 0 1-8 0Z`;
const zig = (x, y0, n, dx) => Array.from({ length: n }, (_, i) => `L${i % 2 ? x : x + dx} ${f(y0 + (i + 1) * 1.5)}`).join('');

export default [
  // ---- tickets & access ----
  I('ticket-stub', 'ticket torn stub admission entry', [
    P(`M5 6h8.5${zig(13.5, 6, 8, -1)}H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z`),
    P(star(8.2, 12, 2.8, 1.2), 'a', 'pulse'),
    G('slide-r', P(`M16.5 6H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5${Array.from({ length: 8 }, (_, i) => `L${i % 2 ? 16.5 : 15.5} ${f(16.5 - i * 1.5)}`).join('')}Z`), P('M18.3 9.5v5')),
  ]),
  I('e-ticket-qr', 'mobile ticket qr code phone entry', [
    R(6, 2.5, 12, 19, 2.5), R(8.5, 6, 3, 3, 0.6, 'a'), R(12.5, 6, 3, 3, 0.6, 'a'), R(8.5, 10, 3, 3, 0.6, 'a'),
    C(14, 11.5, 0.9, 'f'), P('M8 15.5h8', 'a', 'slide-d'), P('M10.5 18.8h3'),
  ]),
  I('ticket-gate', 'turnstile entry gate access scanner', [
    R(3.5, 4, 6.5, 17, 2), R(5.25, 6.5, 3, 2.5, 0.8, 'a', 'blink'), P('M6.75 12v5'),
    G('slide-r', R(10, 11, 8.5, 2.6, 1.3)), R(19, 8, 2.5, 13, 1.25),
  ]),
  I('wristband', 'festival band entry access bracelet', [
    C(12, 10, 7.5), C(12, 10, 4.8, 'd'),
    G('swing', R(8.5, 15, 7, 6.5, 1.8, 'a'), C(12, 18.2, 0.9, 'f')),
  ]),
  I('vip-lanyard', 'vip pass backstage lanyard access', [
    P('M6 2.5 10.5 10.5M18 2.5 13.5 10.5'),
    G('swing', R(10.5, 9.5, 3, 2.5, 0.8), R(6.5, 12, 11, 9.5, 2.2), P(star(12, 16.8, 2.8, 1.2), 'a', 'pulse')),
  ]),
  I('stadium-map', 'stadium seating map arena sections bowl', [
    E(12, 12, 10, 8), P('M12 4v2.5M12 17.5V20M2 12h3M19 12h3M5 6.5l2 2M19 6.5l-2 2M5 17.5l2-2M19 17.5l-2-2'),
    R(7.5, 9, 9, 6, 1.5, 'a', 'breathe'), P('M12 9v6'),
  ]),
  I('seat-selection', 'pick seat booking chart cinema theatre', [
    P('M4 3.5q8-2 16 0'),
    R(3.5, 7, 3.5, 3, 1), R(8.5, 7, 3.5, 3, 1), R(13.5, 7, 3.5, 3, 1), R(18.5, 7, 3, 3, 1),
    R(3.5, 12, 3.5, 3, 1), R(8.5, 12, 3.5, 3, 1), R(13.5, 12, 3.5, 3, 1, 'a', 'pop'),
    R(3.5, 17, 3.5, 3, 1), R(8.5, 17, 3.5, 3, 1),
    G('slide-l', P('M16 15.5l5.5 2.2-2.4 1-1 2.4Z')),
  ]),
  I('sold-out', 'sold out full no tickets unavailable', [
    P(tkt(3, 6, 18, 12)), P('M15.5 8v1.5M15.5 11.25v1.5M15.5 14.5V16'),
    P('M3.5 15.2 18.6 5.8 20.5 8.8 5.4 18.2Z', 'a', 'pop'),
  ]),
  I('waitlist', 'waiting list queue pending sign up', [
    R(4.5, 4, 15, 17.5, 2.2), R(9, 2.5, 6, 3, 1, 'a'), P('M8 10h8M8 13.5h8'),
    C(9, 17.2, 0.9, 'f', 'blink'), C(12, 17.2, 0.9, 'f', 'blink:.25'), C(15, 17.2, 0.9, 'f', 'blink:.5'),
  ]),
  I('ticket-resale', 'resale marketplace swap sell ticket exchange', [
    G('spin-slow', X(12, 12, 9), P(arc(12, 12, 9, 300, 40)), P('M15.4 4.4l2.4.7-.3 2.5'), P(arc(12, 12, 9, 120, 220)), P('M8.6 19.6l-2.4-.7.3-2.5')),
    P(tkt(7, 8.5, 10, 7, 1.3, 1.3), 'a'),
  ]),
  I('price-tiers', 'pricing levels tiers ticket classes', [
    R(3, 16, 18, 4.5, 1.5), R(5.5, 10.5, 13, 4, 1.5), R(8, 5, 8, 4, 1.5, 'a', 'pop'),
    C(6, 18.25, 0.9, 'f'), C(8.5, 12.5, 0.9, 'f'), P(spark(12, 3, 1.2), 'b', 'blink'),
  ]),
  I('early-bird', 'early bird discount presale first', [
    G('pulse', C(6, 6.5, 2.6, 'a')), P('M6 2.2V2.5M2 6.5h.5M3.2 3.7l.3.3'),
    G('float', P('M2.5 16c3 0 4.5-1.5 5.5-3.5a5.5 5.5 0 0 1 10.3-2L21.5 11l-3 1.5c-.6 4-3.6 7-8 7-3.3 0-6-1.3-8-3.5Z'),
      C(15.8, 10.2, 0.9, 'f'), P('M9.5 14.5c1.8 1.4 4.2 1.4 6 0')),
  ]),
  I('ticket-transfer', 'send ticket gift forward friend', [
    P('M2.5 9.5h4M3.5 12h3M2.5 14.5h4', 'd', 'slide-l'),
    G('slide-r', P(tkt(8.5, 7, 13, 10), 'a'), P('M17.5 9v1.5M17.5 13.5V15')),
  ]),
  I('group-booking', 'group tickets bulk party booking', [
    P(rp(7.5, 12.5, 7, 11, -18)), P(rp(16.5, 12.5, 7, 11, 18)),
    G('pop', R(8.5, 6, 7, 12, 1.6, 'a'), P('M10 14h4')),
  ]),
  I('rsvp', 'reply attend yes no response invite', [
    R(2.5, 5, 19, 14, 2.5), P('M6.5 8.5h11'),
    C(8.2, 13.5, 3, 'a', 'pop'), P('M6.8 13.5l1 1 1.8-2', 'd', 'draw'),
    C(15.8, 13.5, 3, 'd'), P('M14.6 12.3l2.4 2.4M17 12.3l-2.4 2.4'),
  ]),
  I('invitation', 'invite card envelope event letter', [
    G('slide-u', R(6, 3, 12, 11, 1.5), P('M9 6.5h6M9 9h4')),
    P('M3 10l9 6 9-6v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z'), C(12, 16, 1.8, 'a', 'pulse'),
  ]),
  I('save-the-date', 'save date wedding calendar reminder', [
    R(3.5, 4.5, 17, 16.5, 2.5), P('M8 2.5v4M16 2.5v4M3.5 9h17'),
    P(heart(12, 13.5, 0.95), 'a', 'beat'),
  ]),
  I('event-page', 'event website landing listing register', [
    R(2.5, 3.5, 19, 17, 2.5), P('M2.5 7.5h19'), C(5, 5.5, 0.8, 'f'), C(7.5, 5.5, 0.8, 'f'),
    R(5, 10, 14, 4.5, 1.2, 'a', 'breathe'), P('M5 17.5h5M14 17.5h5'),
  ]),
  I('add-to-calendar', 'calendar add event schedule plus', [
    R(3, 5, 18, 16, 2.5), P('M8 3v4M16 3v4'),
    G('pop', C(12, 14, 4, 'a'), P('M12 12v4M10 14h4')),
  ]),
  I('event-countdown', 'flip clock countdown days remaining', [
    R(2.5, 6, 8, 12, 2), P('M2.5 12h8'), C(12, 10, 0.9, 'f', 'blink'), C(12, 14, 0.9, 'f', 'blink'),
    R(13.5, 6, 8, 12, 2, 'a'), P('M13.5 12h8'), P('M6.5 4.5v1.5M17.5 4.5V6'),
  ]),
  I('venue-map', 'venue floor plan layout you are here', [
    R(3, 3, 18, 18, 2.5), R(6, 5.5, 12, 3.5, 1.2, 'a'), P('M6.5 12h4M13.5 12h4M6.5 15h4M13.5 15h4'),
    C(12, 18.3, 1.2, 'f', 'ping'),
  ]),
  // ---- stage & programme ----
  I('stage-spotlights', 'stage spotlight concert show performance', [
    P('M5.5 5 10.5 16.5H6.5Z', 'a', 'breathe'), P('M18.5 5 13.5 16.5h4Z', 'a', 'breathe:.6'),
    C(5, 4, 1.8), C(19, 4, 1.8), R(2.5, 17, 19, 4, 1.2), P(spark(12, 12, 2), 'b', 'blink'),
  ]),
  I('mic-stand', 'microphone boom stand singer stage', [
    P('M9 15V10.5M9 15l-4.5 6M9 15l4.5 6'), P('M4.5 13 16 6'),
    C(9, 10.5, 1.2, 'f'), G('pulse', C(17.8, 5, 2.5, 'a')),
  ]),
  I('lectern', 'podium lectern speech speaker keynote', [
    P('M12 8V6.5c0-1.5 1-2.5 2.5-2.8', 'd'), C(15.8, 3.6, 1.3, 'f', 'blink'),
    P('M5 11 6 8h12l1 3Z'), P('M7 11h10l-1.4 9.5H8.4Z'), C(12, 15, 1.8, 'a', 'pulse'),
  ]),
  I('panel-discussion', 'panel speakers discussion talk table', [
    C(6, 8, 2.2), C(18, 8, 2.2), C(12, 7, 2.2, 'a', 'pulse'),
    P('M2.8 14v-.5a3.2 3.2 0 0 1 6.4 0v.5Z'), P('M14.8 14v-.5a3.2 3.2 0 0 1 6.4 0v.5Z'), P('M8.8 14v-1.5a3.2 3.2 0 0 1 6.4 0V14Z', 'a'),
    R(2.5, 14, 19, 5, 1.5), P('M5 19v2.5M19 19v2.5'),
  ]),
  I('keynote-screen', 'keynote presentation big screen speaker', [
    R(3, 3, 18, 11, 2), P('M6.5 11l3-3 2.5 2 4.5-4', 'a', 'draw'),
    C(6.5, 17, 1.8), P('M3 22v-.5a3.5 3.5 0 0 1 7 0v.5Z'), P('M9 15.5l4-1.5', 'd'), C(15, 13.5, 0.9, 'f', 'blink'),
  ]),
  I('workshop-table', 'workshop roundtable breakout session group', [
    R(10, 2.5, 4, 3, 1.2), R(10, 18.5, 4, 3, 1.2), R(2.5, 10, 3, 4, 1.2), R(18.5, 10, 3, 4, 1.2),
    C(12, 12, 5.2), R(10, 10, 4, 4, 0.8, 'a', 'pop'),
  ]),
  I('hackathon', 'hackathon coding contest laptop trophy prize', [
    R(3, 9, 11.5, 8, 1.5), P('M7.5 11.5 6 13l1.5 1.5M10 11.5l1.5 1.5-1.5 1.5'), P('M2 19.5h14'),
    G('beat', P('M15 3h6v3.5a3 3 0 0 1-6 0Z', 'a'), P('M18 9.5V12M16 12.5h4')),
  ]),
  I('networking-circle', 'networking meet people circle connections', [
    C(12, 12, 7, 'd'),
    G('spin-slow', X(12, 12, 7), ...[0, 60, 120, 180, 240, 300].map((a) => C(f(12 + 7 * Math.sin((a * Math.PI) / 180)), f(12 - 7 * Math.cos((a * Math.PI) / 180)), 2))),
    C(12, 12, 2.6, 'a', 'pulse'),
  ]),
  I('badge-printer', 'name badge print check in label', [
    G('slide-u', R(7, 2.5, 10, 8, 1.5, 'a'), P('M10.5 5h3')),
    R(3, 8, 18, 9, 2.5), P('M7 11.5h10'), P('M6 17v3.5h12V17'), C(17.5, 14, 0.9, 'f', 'blink'),
  ]),
  I('check-in-desk', 'check in reception registration desk', [
    C(12, 6.5, 2.6), P('M7 13a5 5 0 0 1 10 0Z'),
    R(2.5, 13, 19, 8, 2), P('M9 16.8l2 2 4-4', 'a', 'draw'),
  ]),
  I('crowd-capacity', 'capacity crowd limit occupancy gauge', [
    P('M3.5 15a8.5 8.5 0 0 1 17 0'), P(arc(12, 15, 8.5, 45, 90), 'a'),
    G('wiggle', X(12, 15, 6.5), P('M12 15l4.6-4.6')), C(12, 15, 1.4, 'f'),
    C(7, 20, 1, 'f'), C(12, 20, 1, 'f'), C(17, 20, 1, 'f'),
  ]),
  I('queue-line', 'queue line stanchion rope barrier waiting', [
    P('M5 9v11M19 9v11M3 20.5h4M17 20.5h4'), C(5, 7.5, 1.7), C(19, 7.5, 1.7),
    P('M6.7 8.5c3 4.5 7.6 4.5 10.6 0', 'a', 'swing'),
  ]),
  I('bag-check', 'security bag check scan screening', [
    P('M9 9V7a3 3 0 0 1 6 0v2'), P('M5 9h14l-1 11.5H6Z'), P('M2.5 14h19', 'a', 'slide-d'),
  ]),
  I('coat-check', 'coat check cloakroom hanger tag', [
    P('M10 5.5a2 2 0 1 1 2 2V9M12 9 3.6 15a.8.8 0 0 0 .5 1.5h15.8a.8.8 0 0 0 .5-1.5L12 9'),
    G('swing', P('M16 16.5V18'), R(13.5, 18, 5, 4, 1, 'a'), C(16, 20, 0.9, 'f')),
  ]),
  // ---- music & festival ----
  I('festival-tent', 'festival marquee tent fair outdoor', [
    P('M12 5V2.5'), P('M12 2.5l3 1-3 1Z', 'a', 'wave'),
    P('M2.5 19.5c2-2.5 3-6 3.5-9L12 5l6 5.5c.5 3 1.5 6.5 3.5 9Z'), P('M8.5 10 7.5 19.5M15.5 10l1 9.5'), P('M10 19.5 12 13l2 6.5Z', 'a'),
  ]),
  I('concert-guitar', 'guitar concert music band gig live', [
    P('M12.6 11.4 19.2 4.8'), P(rp(19.5, 4.5, 2.6, 4.2, 45), 'a'),
    P('M7.84 12.48A3.2 3.2 0 1 1 11.52 16.16A4.6 4.6 0 1 1 7.84 12.48Z'),
    C(8.6, 15.4, 1.4, 'd', 'pulse'), P('M5 18.4l1.6 1.6'),
  ]),
  I('dj-decks', 'dj turntables decks mix music party', [
    R(2.5, 7, 19, 11, 2.5), G('spin', C(7.5, 12.5, 3.2, 'a'), P('M7.5 12.5V9.8')),
    C(16.5, 12.5, 3.2, 'd'), C(16.5, 12.5, 0.9, 'f'), P('M20 9l-1.6 2.6'),
  ]),
  I('dance-floor', 'dance floor disco ball club party', [
    G('spin-slow', C(12, 6.3, 3.8, 'a'), P('M8.4 6.3h7.2M12 2.6v7.4')),
    P(spark(4.8, 8, 1.6), 'b', 'blink'), P(spark(19.2, 8, 1.6), 'b', 'blink:.5'),
    P('M5.5 13.5h13l3 7.5h-19Z'), P('M9.8 13.5 8.8 21M14.2 13.5l1 7.5M4 17.2h16'),
  ]),
  I('fireworks', 'fireworks burst new year celebration sky', [
    G('ping', P(rays(11, 9, 2.5, 6.5, 8)), C(11, 9, 1.2, 'a')),
    G('ping', P(rays(18, 17.5, 1.2, 3.2, 6, 30)), C(18, 17.5, 0.9, 'f')),
    P('M8 21.5c0-3 1-5 2-7', 'd', 'draw'),
  ]),
  I('confetti-cannon', 'confetti cannon shooter party launch', [
    P(rp(10, 13, 5, 11, 45)), P(rp(14.6, 8.4, 5.8, 2, 45), 'a'),
    C(6, 18.5, 2.6, 'a'), C(6, 18.5, 0.9, 'f'),
    C(15.5, 3.5, 0.9, 'f', 'rise'), C(20.5, 8.5, 0.9, 'f', 'rise:.4'), P('M18.5 3l1.6 1', 'd', 'rise:.2'), P('M20.5 12.5l1 1.4', 'd', 'rise:.6'),
  ]),
  I('balloon-arch', 'balloon arch entrance decoration party', [
    P('M3.5 20v1.5M20.5 20v1.5'),
    ...[180, 135, 90, 45, 0].map((a, i) => C(f(12 - 8.5 * Math.cos((a * Math.PI) / 180)), f(18 - 8 * Math.sin((a * Math.PI) / 180)), 2.6, i % 2 ? 'a' : 'b', i ? `float:.${i * 2}` : 'float')),
  ]),
  I('photo-booth', 'photo booth strip pictures selfie party', [
    R(6.5, 2.5, 10, 19, 1.5), P('M8.5 4.5h6v4.5h-6Z', 'd'), R(8.5, 10.5, 6, 4.5, 0.8, 'a'), P('M8.5 16.5h6V20', 'd'),
    P(spark(19.5, 5, 2.3), 'a', 'blink'),
  ]),
  I('stage-livestream', 'livestream stream event online broadcast stage', [
    R(2.5, 3.5, 19, 14, 2.5), P('M2.5 7.5c3 0 4 3 4 6M21.5 7.5c-3 0-4 3-4 6'), C(12, 11.5, 1.8, 'd'),
    R(14.5, 5.5, 4.5, 2.4, 1.2, 'a', 'blink'), P('M12 17.5V20M8 20.5h8'),
  ]),
  I('hybrid-event', 'hybrid event in person remote online attendee', [
    C(6.5, 9.5, 2.6), P('M2.5 19a4 4 0 0 1 8 0Z'),
    R(12, 5.5, 9.5, 8.5, 1.8), C(16.75, 8.8, 1.6, 'a', 'pulse'), P('M14 13.2a2.8 2.8 0 0 1 5.5 0'), P('M16.75 14v3.5M14.5 18h4.5'),
  ]),
  I('virtual-stage', 'virtual stage metaverse hologram vr event', [
    P('M3.5 15v2L12 21v-2Z'), P('M20.5 15v2L12 21v-2Z'), P('M12 11 20.5 15 12 19 3.5 15Z', 'a'),
    G('float', C(12, 5, 1.8), P('M9.5 12v-2a2.5 2.5 0 0 1 5 0v2Z')), P('M7.5 14 9 9.5M16.5 14 15 9.5', 'd', 'blink'),
  ]),
  I('qa-upvotes', 'questions q and a upvote audience ask', [
    P('M5 3.5h9a2 2 0 0 1 2 2V13a2 2 0 0 1-2 2H8.5L5 18v-3a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z'),
    P('M7.8 7.2a1.7 1.7 0 1 1 2.4 1.6c-.5.2-.7.6-.7 1.2'), C(9.5, 12.3, 0.8, 'f'),
    G('slide-u', P('M18.75 12 22 16h-2v5h-2.5v-5h-2Z', 'a')),
  ]),
  I('live-poll-results', 'live poll results vote audience pie', [
    C(12, 12, 9), G('pop', P(wedge(12, 12, 9, 0, 140), 'a')), P('M12 12V3M12 12l-7.8 4.5'),
  ]),
  I('session-tracks', 'tracks sessions streams parallel choose path', [
    P('M12 19v-4M12 15 6.3 9.3M12 15l5.7-5.7M12 15V7'), C(12, 20.3, 1.3, 'f'),
    C(5, 8, 2.2), C(19, 8, 2.2), C(12, 4.8, 2.4, 'a', 'pulse'),
  ]),
  I('sponsor-wall', 'sponsors tiers logos partners wall', [
    R(4, 3, 16, 6, 1.8, 'a', 'pop'), P(poly(12, 6, 1.6, 4), 'd'),
    R(3, 11, 8, 4.5, 1.5), R(13, 11, 8, 4.5, 1.5),
    R(3, 17.5, 5, 3.5, 1.2), R(9.5, 17.5, 5, 3.5, 1.2), R(16, 17.5, 5, 3.5, 1.2),
  ]),
  I('rollup-banner', 'roll up banner exhibitor stand display', [
    R(7, 2.5, 10, 16, 1.2), C(12, 7.5, 2.5, 'a', 'pop'), P('M9.5 12.5h5M9.5 15h3.5'), R(5.5, 18.5, 13, 2.8, 1.4),
  ]),
  I('merch-stand', 'merch t-shirt merchandise store band', [
    P('M8 4 3.5 6.5l1.6 3.8L7.5 9v11.5h9V9l2.4 1.3 1.6-3.8L16 4c-.6 1.5-2 2.4-4 2.4S8.6 5.5 8 4Z'),
    G('pulse', P(star(12, 13, 2.6, 1.1), 'a')),
  ]),
  I('catering-buffet', 'catering buffet food chafing dish meal', [
    P('M8.5 6.5c-.8-1 .8-2 0-3.5M12 6.5c-.8-1 .8-2 0-3.5M15.5 6.5c-.8-1 .8-2 0-3.5', 'a', 'rise'),
    P('M3 10h18v1.5a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z'), P('M2.5 8.5h19'), P('M6 16.5 4.5 21M18 16.5l1.5 4.5M5 19h14'),
  ]),
  I('parking-pass', 'parking pass hang tag permit car', [
    G('swing', P('M12 7.5V5.5a1.7 1.7 0 1 1 1.7 1.7'), P('M7 7.5h10a1 1 0 0 1 1 1V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V8.5a1 1 0 0 1 1-1Z'),
      P('M10 18.5v-7h2.5a2 2 0 0 1 0 4H10', 'a')),
  ]),
  I('accessible-seating', 'accessible seating wheelchair space reserved', [
    R(3, 5, 6, 8, 2), R(2.5, 12.5, 7, 3, 1.2), P('M4 15.5V20M8 15.5V20'),
    P('M15 6v5.5h4l1.5 4', 'a'), C(15, 4, 1.2, 'f'), G('spin', X(15.5, 16.5, 3.4), C(15.5, 16.5, 3.4, 'd'), C(15.5, 13.1, 0.6, 'x')),
  ]),
  I('lost-and-found', 'lost found box missing items', [
    G('float', P('M9.8 4.5a2.2 2.2 0 1 1 3 2c-.6.3-.8.7-.8 1.3', 'a'), C(12, 9.8, 0.9, 'f')),
    P('M4 12.5h16v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20.5Z'), P('M4 12.5 2.5 9.5M20 12.5l1.5-3M9 17h6'),
  ]),
  I('first-aid-tent', 'first aid medical tent help station', [
    P('M2.5 20.5 12 5l9.5 15.5Z'), P('M11 12h2v2h2v2h-2v2h-2v-2H9v-2h2Z', 'a', 'pulse'), P('M12 5V3'),
  ]),
  I('weather-contingency', 'rain plan weather backup canopy cover', [
    P('M7.5 8.5a2.8 2.8 0 0 1 .3-5.6 3.8 3.8 0 0 1 7.2.8 2.4 2.4 0 0 1 1.2 4.8Z'),
    P('M8 10.5l-.5 1.5M12 10.5l-.5 1.5M16 10.5l-.5 1.5', 'd', 'drop'),
    P('M3 16.5 12 13l9 3.5Z', 'a'), P('M5 16.5V21M19 16.5V21'),
  ]),
  I('afterparty', 'afterparty night cocktail drinks late', [
    P('M3 6h12l-6 7.5Z'), C(10.5, 8.2, 1, 'f'), P('M9 13.5v6M6 20h6'),
    G('float', P('M19 3a4 4 0 1 0 3 6.7A3.2 3.2 0 0 1 19 3Z', 'a')), C(15.5, 13.5, 0.9, 'f', 'blink'),
  ]),
  I('award-statuette', 'award statue prize ceremony winner stage', [
    P(star(12, 8, 5, 2.2), 'a', 'pulse'), P('M12 12.5v3'), R(9, 15.5, 6, 2.5, 0.8), R(3, 18.5, 18, 2.5, 1),
    P(spark(4.5, 6, 1.5), 'b', 'blink'), P(spark(19.5, 11, 1.5), 'b', 'blink:.5'),
  ]),
  I('raffle-drum', 'raffle drum lottery draw tickets prize', [
    P('M8 21 12 10l4 11M7 21h10'),
    G('spin-slow', X(12, 10, 6.5), P(poly(12, 10, 6.5, 8, -Math.PI / 8)), C(12, 10, 1.1, 'f'), R(8, 6.5, 3, 2.2, 0.5, 'a'), R(13, 12, 3, 2.2, 0.5, 'a')),
    P('M18.5 10h2v3'),
  ]),
  I('silent-auction', 'silent auction bid sheet charity bidding', [
    R(3.5, 3, 12.5, 18, 2), P('M6.5 7.5h6.5M6.5 11h6.5M6.5 14.5h4'),
    G('wiggle', P(rp(17.5, 14, 2.6, 9.5, 35), 'a'), P('M19.8 18.2 21 20.5 20.4 19.4')),
  ]),
  I('charity-gala', 'gala charity black tie formal fundraiser', [
    P('M3 7.5l7 3.3v2.4l-7 3.3Z'), P('M21 7.5l-7 3.3v2.4l7 3.3Z'), P(heart(12, 10.6, 0.62), 'a', 'beat'),
  ]),
  I('match-ticket', 'sports match game ticket stadium football', [
    P('M7.5 3h9A1.5 1.5 0 0 1 18 4.5V12a2 2 0 0 0 0 4v3.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19.5V16a2 2 0 0 0 0-4V4.5A1.5 1.5 0 0 1 7.5 3Z'),
    G('spin', C(12, 8, 2.9, 'a'), P(poly(12, 8, 1.1, 5), 'd')), P('M8.5 14h1M11.5 14h1M14.5 14h1'), P('M9.5 17.5h5'),
  ]),
  I('theatre-masks', 'theatre drama comedy tragedy masks play', [
    P(mask(8.5, 8)), P('M6 7.3l1.5.6M11 7.3l-1.5.6M6.8 12a2 2 0 0 1 3.4 0'),
    G('tilt', P(mask(15.5, 13), 'a'), C(13.8, 11.8, 0.9, 'f'), C(17.2, 11.8, 0.9, 'f'), P('M13.5 14.5a2.3 2.3 0 0 0 4 0')),
  ]),
  I('cinema-ticket', 'cinema movie film reel ticket screening', [
    G('spin-slow', C(9, 9.5, 6.5), C(9, 6.3, 1.3, 'd'), C(9, 12.7, 1.3, 'd'), C(5.8, 9.5, 1.3, 'd'), C(12.2, 9.5, 1.3, 'd')),
    P(tkt(11.5, 14, 10, 6.5, 1.3, 1.2), 'a'), P('M14.5 15.5v3.5'),
  ]),
  I('museum-exhibit', 'museum exhibit artifact vase display plinth', [
    P('M10.3 4h3.4l-.6 2c2 .7 3.4 2.4 3.4 4.4 0 2.2-1.7 3.8-4.5 4.1-2.8-.3-4.5-1.9-4.5-4.1 0-2 1.4-3.7 3.4-4.4Z', 'a'),
    R(7, 15.5, 10, 5.5, 1.2), P('M3 4l2 2M21 4l-2 2', 'd', 'blink'),
  ]),
  I('gallery-opening', 'gallery opening art painting ribbon vernissage', [
    R(4, 3, 16, 12.5, 1.5), P('M6.5 13 10 8.5l3 3.5 2-2 2.5 3'), C(15.5, 6.5, 1, 'f'),
    P('M2.5 19.5c3-1.5 6-1.5 9.5 0s6.5 1.5 9.5 0', 'a', 'wave'),
  ]),
  // ---- extras ----
  I('drum-kit', 'drums drum kit band percussion concert', [
    P('M18 6.5V21'), G('wiggle', E(18, 6, 3.4, 1.1)),
    C(9.5, 15, 6), C(9.5, 15, 2.6, 'a', 'beat'), P('M4 21.5h11'),
  ]),
  I('pa-speakers', 'pa speaker stack sound system loud concert', [
    R(6.5, 2.5, 11, 8, 2), C(10, 6.5, 1.5, 'd'), C(14, 6.5, 1.5, 'd'),
    R(5, 12, 14, 9.5, 2), C(12, 16.75, 3, 'a', 'beat'),
  ]),
  I('lighter-flame', 'lighter flame concert ballad crowd', [
    P('M10.5 3c2 2.5 3 4 3 5.5a3 3 0 0 1-6 0C7.5 7 8.5 5.5 10.5 3Z', 'a', 'wiggle'),
    C(15.5, 10.5, 1.6), R(7, 12.5, 10, 9, 2), P('M7 15.5h10'),
  ]),
  I('ferris-wheel', 'ferris wheel fair carnival amusement festival', [
    P('M12 10 7 21M12 10l5 11M5 21h14'),
    G('spin-slow', X(12, 10, 6.5), C(12, 10, 6.5), P(rays(12, 10, 0, 6.5, 6))),
    ...[0, 60, 120, 180, 240, 300].map((a, i) => C(f(12 + 6.5 * Math.sin((a * Math.PI) / 180)), f(10 - 6.5 * Math.cos((a * Math.PI) / 180)), 1.3, i % 2 ? 'f' : 'a')),
  ]),
  I('popcorn', 'popcorn snack cinema movie concession', [
    P('M6 10.5a2.2 2.2 0 0 1 1.6-3.6 2.5 2.5 0 0 1 4.4-2 2.5 2.5 0 0 1 4.4 2 2.2 2.2 0 0 1 1.6 3.6Z', 'a', 'pop'),
    P('M5.5 10.5h13l-1.7 10.5H7.2Z'), P('M10 10.5l.4 10.5M14 10.5l-.4 10.5'),
  ]),
  I('race-bib', 'race bib marathon runner number registration', [
    R(4, 5, 16, 14, 2), P('M4 9h16'), C(6.5, 7, 0.9, 'f'), C(17.5, 7, 0.9, 'f'),
    P('M8.5 11v3.3h3M10.6 11v5.5', 'a', 'draw'), P('M13 12.2a1.5 1.5 0 1 1 2.7 1L13 16.5h3', 'a', 'draw'),
  ]),
  I('finisher-medal', 'medal finisher winner race ribbon', [
    G('swing', P('M6 2.5h4.2l3 7-3 1.5Z'), P('M18 2.5h-4.2l-1.6 3.8 2.6 4.7Z'), C(12, 15.5, 5.5, 'a'), P(star(12, 15.5, 2.8, 1.2), 'd')),
  ]),
  I('wedding-rings', 'wedding rings engagement marriage ceremony', [
    C(9, 14.5, 5.5, 'd'), C(15, 13, 5.5, 'd'), P(poly(15, 5.3, 2.2, 4), 'a', 'pulse'),
  ]),
  I('birthday-cake', 'birthday cake party candles celebration', [
    P('M8 3.6c.9.9 1.1 1.7.5 2.5a.7.7 0 0 1-1 0c-.6-.8-.4-1.6.5-2.5Z', 'a', 'blink'),
    P('M12 3.6c.9.9 1.1 1.7.5 2.5a.7.7 0 0 1-1 0c-.6-.8-.4-1.6.5-2.5Z', 'a', 'blink:.3'),
    P('M16 3.6c.9.9 1.1 1.7.5 2.5a.7.7 0 0 1-1 0c-.6-.8-.4-1.6.5-2.5Z', 'a', 'blink:.6'),
    P('M8 11V8M12 11V8M16 11V8'), R(4, 11, 16, 10, 2.5), P('M4 14.5c1.3 1 2.7-1 4 0s2.7 1 4 0 2.7-1 4 0 2.7 1 4 0'),
  ]),
  I('bingo-card', 'bingo card game night numbers', [
    R(3.5, 3, 17, 18, 2.5), P('M9.2 7.5V21M14.8 7.5V21M3.5 7.5h17M3.5 12h17M3.5 16.5h17'),
    C(6.3, 9.8, 1, 'f'), C(12, 14.3, 1, 'f'), C(17.6, 18.8, 1, 'f'), C(17.6, 9.8, 1, 'f'),
    P('M6.3 9.8 17.6 18.8', 'a', 'draw'),
  ]),
  I('magic-hat', 'magic show top hat magician entertainment', [
    P('M7 6.5h10V16h3a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3h3Z'), P('M7 12.5h10'), R(7, 12.5, 10, 2.5, 0, 'a'),
    P(spark(19, 4.5, 2.4), 'a', 'blink'), P(spark(4.5, 4, 1.4), 'b', 'blink:.5'),
  ]),
  I('marquee-sign', 'marquee sign theatre lights show now playing', [
    R(3, 4, 18, 11, 2), P('M7 9.5h10', 'a'),
    ...[6, 9, 12, 15, 18].flatMap((x, i) => [C(x, 6.5, 0.9, 'f', i % 2 ? 'blink:.5' : 'blink'), C(x, 12.5, 0.9, 'f', i % 2 ? 'blink' : 'blink:.5')]),
    P('M7 15v6M17 15v6'),
  ]),
];
