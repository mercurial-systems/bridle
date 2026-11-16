import { R, C, E, P, G, I, X, star, arc, wedge } from '../dsl.mjs';

// ---- local geometry helpers (all original) ----
const n = (v) => +v.toFixed(2);
// polar point, 0deg = up, clockwise
const pt = (cx, cy, r, a) => `${n(cx + r * Math.sin((a * Math.PI) / 180))} ${n(cy - r * Math.cos((a * Math.PI) / 180))}`;
// leaf from base (x,y) to tip (x+s, y-s)
const leafD = (x, y, s) => `M${x} ${y}C${x} ${n(y - s * 0.55)} ${n(x + s * 0.45)} ${n(y - s)} ${n(x + s)} ${n(y - s)}C${n(x + s)} ${n(y - s * 0.45)} ${n(x + s * 0.55)} ${y} ${x} ${y}Z`;
const vein = (x, y, s) => P(`M${x} ${y}L${n(x + s * 0.62)} ${n(y - s * 0.62)}`, 'd');
const leaf = (x, y, s, r = 'a', an) => G(an, P(leafD(x, y, s), r), vein(x, y, s));
const leafLine = (x, y, s) => [P(leafD(x, y, s), 'd'), vein(x, y, s)];
// cloud in a 24 box, offset + scale
const cloudD = (ox, oy, s) => {
  const m = (x, y) => `${n(ox + x * s)} ${n(oy + y * s)}`, r = (v) => n(v * s);
  return `M${m(7, 18)}A${r(4)} ${r(4)} 0 0 1 ${m(6.4, 10.05)}A${r(6)} ${r(6)} 0 0 1 ${m(17.6, 9)}A${r(4.5)} ${r(4.5)} 0 0 1 ${m(17, 18)}Z`;
};
// water drop, tip at (cx, top), width w (height 1.5w)
const dropD = (cx, top, w) => `M${cx} ${top}c${n(w * 0.35)} ${n(w * 0.45)} ${n(w / 2)} ${n(w * 0.75)} ${n(w / 2)} ${w}a${n(w / 2)} ${n(w / 2)} 0 0 1-${w} 0c0-${n(w * 0.25)} ${n(w * 0.15)}-${n(w * 0.55)} ${n(w / 2)}-${w}Z`;
// arc with an arrow head at its end
const arcArrow = (cx, cy, r, a0, a1, h = 2) => {
  const d = ((h * 1.1) / r) * (180 / Math.PI);
  return `${arc(cx, cy, r, a0, a1)}M${pt(cx, cy, r + h * 0.85, a1 - d)}L${pt(cx, cy, r, a1)}L${pt(cx, cy, r - h * 0.85, a1 - d)}`;
};
const lineArrow = (x1, y1, x2, y2, h = 2.2) => {
  const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, bx = x2 - ux * h, by = y2 - uy * h, k = h * 0.8;
  return `M${x1} ${y1}L${x2} ${y2}M${n(bx - uy * k)} ${n(by + ux * k)}L${x2} ${y2}L${n(bx + uy * k)} ${n(by - ux * k)}`;
};
const ringSeg = (cx, cy, ro, ri, a0, a1) => `M${pt(cx, cy, ro, a0)}A${ro} ${ro} 0 0 1 ${pt(cx, cy, ro, a1)}L${pt(cx, cy, ri, a1)}A${ri} ${ri} 0 0 0 ${pt(cx, cy, ri, a0)}Z`;
const blade = (cx, cy, len, a) => `M${cx} ${cy}Q${pt(cx, cy, len * 0.42, a + 26)} ${pt(cx, cy, len, a)}Q${pt(cx, cy, len * 0.42, a - 26)} ${cx} ${cy}Z`;
// palm-up hand along the bottom, room above for a held object
const hand = () => [R(2.5, 14, 3, 7.5, 1), P('M5.5 15H8l3.7-1.4a2.6 2.6 0 0 1 1.8 0l2.4.9a1.35 1.35 0 0 1-.1 2.5L19.4 15a1.5 1.5 0 0 1 1.7 2.4L16.4 21H5.5Z'), P('M11.5 17h4.2')];
// numbered badge bottom-right (scope 1/2/3)
const NUM = { 1: 'M16.8 15.1l1.2-1v4.6', 2: 'M16 15.3a1.5 1.5 0 0 1 3 .1c0 1.1-3 2.2-3 3.3h3.1', 3: 'M16.1 14.3h2.8l-1.6 1.8a1.6 1.6 0 1 1-1.3 2.4' };
const scope = (k) => G('pop', C(17.5, 16.5, 4.3, 'a'), P(NUM[k], 'd'));
const factory = 'M3 20.5V11.5l4.5 3v-3l4.5 3V5h3.5v15.5Z';
const waves = (y, r = 'a', an = 'wave') => P(`M2.5 ${y}c1.6-1.3 3.2-1.3 4.8 0s3.2 1.3 4.8 0 3.2-1.3 4.8 0 3.2 1.3 4.6 0`, r, an);
const bin = 'M5.5 9h13l-1.3 11a1.5 1.5 0 0 1-1.5 1.3H8.3a1.5 1.5 0 0 1-1.5-1.3Z';

export default [
  // ---- reporting & scores ----
  I('esg-score', 'esg rating gauge score sustainability index', [P('M3 16.5a9 9 0 0 1 18 0Z'), P(`${arc(12, 16.5, 6, -78, -34)}${arc(12, 16.5, 6, -22, 22)}${arc(12, 16.5, 6, 34, 78)}`, 'd'), G('tilt', X(12, 16.5, 6.5), P('M12 16.5l3.6-4.6', 'a')), C(12, 16.5, 1.6, 'a')]),
  I('sustainability-report', 'esg report csr document disclosure annual', [R(4, 2.5, 13, 18, 2), P('M7.5 7h6.5M7.5 10.5h4.5'), G('pop', C(17.5, 17, 4.3, 'a'), ...leafLine(15.5, 19, 4))]),
  I('carbon-footprint', 'co2 emissions footprint impact carbon', [E(11, 15.5, 4.6, 6), P('M9.2 13.5c.5 2 .5 3.5 0 5', 'd'), C(6.6, 6.8, 1.8, 'a', 'pop'), C(10.4, 4.6, 1.7, 'a', 'pop:.15'), C(14.4, 5.2, 1.6, 'a', 'pop:.3'), C(17.4, 8, 1.4, 'a', 'pop:.45')]),
  I('co2-cloud', 'carbon dioxide emissions gas cloud pollution', [G('float', P(cloudD(0, 1, 1)), P(arc(8.3, 14, 1.9, 135, 405), 'd'), C(12.7, 14, 1.9, 'd'), P('M15.8 14.6a.9.9 0 0 1 1.7.3c0 .6-1.7 1.3-1.7 2h1.8', 'a'))]),
  I('emissions-scope-1', 'scope 1 direct emissions factory ghg protocol', [P(factory), P('M6 17.5h1.5M10.5 17.5h1.5'), scope(1)]),
  I('emissions-scope-2', 'scope 2 indirect energy electricity emissions', [P('M11.5 3 4.5 13H10L9 21l7.5-10.5H11Z'), scope(2)]),
  I('emissions-scope-3', 'scope 3 value chain supplier emissions', [P('M9.5 3.5l6 3.5v7l-6 3.5-6-3.5V7Z'), P('M3.5 7l6 3.5 6-3.5M9.5 10.5v7'), scope(3)]),
  I('carbon-credit', 'carbon credit offset certificate ticket voucher', [P('M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2.5a2.5 2.5 0 0 0 0 5V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2.5a2.5 2.5 0 0 0 0-5Z'), leaf(8.5, 15.5, 7, 'a', 'pop')]),
  I('carbon-offset', 'offset balance neutralise emissions compensate', [P('M12 13.5l3.5 6.5h-7Z'), G('seesaw', X(12, 12.5, 9.5), P('M3 12.5h18'), P('M5.2 11.5a2 2 0 0 1 .1-4 3 3 0 0 1 5.6.4 1.8 1.8 0 0 1 0 3.6Z'), leaf(14.5, 11.5, 6, 'a'))]),
  I('net-zero', 'net zero target decarbonise pathway 2050', [R(3, 4, 18, 16, 2.5), P('M6 8c3 0 5 8.5 9.5 8.5H18', 'a', 'draw'), C(18, 16.5, 1.6, 'a', 'pulse')]),
  I('green-bond', 'green bond sustainable finance certificate debt', [R(3, 3.5, 18, 14, 2), P('M6.5 8h8M6.5 11.5h5'), P('M14.6 18 13.8 21.5l2.2-1 2.2 1-.8-3.5', 'd'), G('pop', C(16, 15, 3.6, 'a'), ...leafLine(14.4, 16.7, 3.3))]),
  I('impact-investing', 'impact investing sprout coin growth sustainable', [C(12, 15.5, 5.5), C(12, 15.5, 3.6, 'd'), G('grow', P('M12 6.5c0-2.4 1.8-3.8 4.8-3.8 0 2.8-1.8 3.8-4.8 3.8Z', 'a'), P('M12 7.5c0-2-1.5-3.2-3.8-3.2 0 2.2 1.5 3.2 3.8 3.2Z', 'a'), P('M12 10V6', 'd'))]),

  // ---- energy ----
  I('solar-array', 'solar pv panel renewable energy photovoltaic', [P('M5.5 8.5h13L21 17H3Z'), P('M10 8.5 9.2 17M14 8.5l.8 8.5M4.3 12.75h15.4'), P('M12 17v3.5M8.5 20.5h7'), C(19.2, 4.2, 2, 'a', 'pulse')]),
  I('wind-turbine', 'wind turbine renewable energy windmill power', [P('M11.2 21l.5-11h.6l.5 11Z'), P('M7.5 21h9'), G('spin-slow', X(12, 9.5, 6.5), P(blade(12, 9.5, 6.5, 0)), P(blade(12, 9.5, 6.5, 120)), P(blade(12, 9.5, 6.5, 240))), C(12, 9.5, 1.5, 'a')]),
  I('hydro-dam', 'hydro dam hydroelectric water power renewable', [P('M3 8.5c1-.8 2-.8 3 0s2 .8 3 0V20H3Z', 'a', 'breathe'), P('M9 4.5h4l4 15.5H9Z'), P('M10 10h4.5M10 15h5.8'), P('M18 16.5c1.5 0 2.5 1.2 3 3', 'a', 'dash')]),
  I('battery-storage', 'battery storage energy bess charge capacity', [R(6, 4.5, 12, 17, 2.5), P('M10 2.5h4'), R(8.5, 12.5, 7, 6.5, 1.2, 'a', 'grow'), P('M12.6 6.6l-1.6 2.2h2.2l-1.6 2.2')]),
  I('power-grid', 'grid pylon transmission electricity utility', [P('M10.8 3h2.4L18 21h-3l-3-11-3 11H6Z'), P('M5 7h14M7 11h10'), P('M5 7v1.5M19 7v1.5'), C(5, 9.3, 1, 'a', 'blink'), C(19, 9.3, 1, 'a', 'blink:.4')]),
  I('ev-car', 'electric vehicle ev car fleet zero emission', [P('M3 17v-3.5l2-4.3A2 2 0 0 1 6.8 8h8.4a2 2 0 0 1 1.8 1.2l1.9 4.3h1.1a1 1 0 0 1 1 1V17Z'), P('M12.6 9.6 10.9 12.5h2.3l-1.6 2.6', 'a', 'blink'), C(7.5, 17.5, 2.2), C(16.5, 17.5, 2.2)]),
  I('ev-charge-point', 'ev charger charging station plug electric', [R(4, 3, 10, 18, 2), P('M7 6.5h4'), P('M14 9h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0v-7l-1.5-2'), P('M9.6 10.5 7.5 14.5h2.6l-1 3.5', 'a', 'blink'), P('M2.5 21h13')]),
  I('energy-efficiency', 'efficiency rating label energy class consumption', [P('M4 6h7', 'a', 'grow-x'), P('M4 10.5h10', 'd', 'grow-x:.2'), P('M4 15h13', 'd', 'grow-x:.4'), P('M4 19.5h16', 'd', 'grow-x:.6'), P('M14 6l2.8-2.8H21v5.6h-4.2Z', 'b', 'slide-l')]),
  I('led-bulb', 'led lighting bulb efficient lamp energy', [P('M12 2.5a6.5 6.5 0 0 1 3.8 11.8c-.5.4-.8 1-.8 1.6V17H9v-1.1c0-.6-.3-1.2-.8-1.6A6.5 6.5 0 0 1 12 2.5Z'), R(10.2, 6.8, 3.6, 3.6, 0.8, 'a', 'blink'), P('M11 10.4V14M13 10.4V14'), P('M9.5 19.5h5M10.5 21.5h3')]),
  I('smart-meter', 'smart meter energy monitor usage utility', [R(4, 3, 16, 18, 3), R(7, 6.5, 10, 5.5, 1.2, 'a'), P('M9 9.25h1.4M11.6 9.25H13M14.2 9.25h.8', 'd', 'blink'), C(8.5, 16.5, 1.2, 'f'), P('M15 14.5l-1.5 2h2l-1.5 2')]),
  I('solar-energy', 'sun solar energy renewable daylight', [G('spin-slow', X(12, 12, 9.5), P('M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3 7 7M17 17l1.7 1.7M5.3 18.7 7 17M17 7l1.7-1.7')), C(12, 12, 4.5, 'a', 'pulse')]),
  I('wave-power', 'wave tidal marine energy buoy ocean renewable', [P('M12 7V4'), C(12, 3.3, 1.1, 'a', 'blink'), P('M8 15l1.5-8h5L16 15Z'), waves(15.5), waves(19.5, 'd', 'wave')]),
  I('geothermal', 'geothermal heat earth energy ground', [R(3, 13, 18, 8, 2), P('M5 17.5c2-1 4 1 6 0s4-1 6 0 1.5.6 2 .5'), G('slide-u', P(lineArrow(9, 15.5, 9, 4.5), 'a'), P(lineArrow(15, 15.5, 15, 4.5), 'a'))]),
  I('biofuel', 'biofuel biomass renewable fuel drop', [P(dropD(12, 3, 12)), leaf(9, 17.5, 6, 'a', 'pop')]),
  I('clean-power', 'renewable electricity plug green power', [P('M10 3.5V8M14 3.5V8'), P('M6.5 8h11v3a5.5 5.5 0 0 1-11 0Z'), P('M12 16.5V21'), leaf(13.5, 21, 6.5, 'a', 'wiggle')]),
  I('energy-mix', 'energy mix share renewables pie portfolio', [C(12, 12, 8.5), P(wedge(12, 12, 8.5, 0, 120), 'a', 'pop'), P('M12 12V3.5M12 12l7.36 4.25M12 12 4.64 16.25')]),
  I('heat-pump', 'heat pump hvac heating cooling efficient', [R(3, 5, 18, 13, 2.5), C(9, 11.5, 4.2, 'd'), G('spin', X(9, 11.5, 3.6), P(blade(9, 11.5, 3.4, 0), 'a'), P(blade(9, 11.5, 3.4, 120), 'a'), P(blade(9, 11.5, 3.4, 240), 'a')), P('M15.5 9h2.5M15.5 11.5h2.5M15.5 14h2.5'), P('M6 18v2.5M18 18v2.5')]),

  // ---- emissions ----
  I('emissions-down', 'reduce emissions decrease co2 cut decarbonise', [P(cloudD(2.4, 0, 0.8)), G('slide-d', P('M12 10v10', 'a'), P('M8.5 16.5 12 20l3.5-3.5', 'a'))]),
  I('carbon-capture', 'carbon capture storage ccs sequestration', [P(cloudD(4, 0, 0.67)), P('M3 15h18'), R(5, 17, 14, 4, 2), G('slide-d', P(lineArrow(12, 10, 12, 15.5), 'a'))]),
  I('factory-emissions', 'factory pollution smokestack ghg industry', [P('M3 20.5V12l5 3v-3l5 3V7h3.5v6H21v7.5Z'), P('M6 17.5h1.5M10.5 17.5h1.5M16.5 17.5h1.5'), C(15.8, 4.3, 1.7, 'a', 'rise'), C(19.4, 3.6, 1.2, 'a', 'rise:.5')]),

  // ---- water, waste, circularity ----
  I('water-saving', 'water saving tap faucet conservation drop', [P('M3 6h9.5a4 4 0 0 1 4 4v1.5H13V10a.5.5 0 0 0-.5-.5H3Z'), P('M8 6V3.5M6 3.5h4'), P('M14.75 14c1.2 1.6 2.2 2.8 2.2 4a2.2 2.2 0 0 1-4.4 0c0-1.2 1-2.4 2.2-4Z', 'a', 'drop')]),
  I('water-usage', 'water usage consumption drop level footprint', [P(dropD(12, 3, 12)), P('M7 15.5c1.6 1 3.2 1 5 0s3.4-1 5 0', 'a', 'wave'), P('M9.5 8.5a3 3 0 0 0-1.3 2', 'h')]),
  I('rainwater-harvest', 'rainwater harvesting collection barrel rain', [P(cloudD(3.6, -1, 0.7)), P('M9.5 12.5l-.8 1.8M12.7 12.5l-.8 1.8', 'a', 'blink'), R(7, 15.5, 10, 6, 1.5), P('M7 18.5h10')]),
  I('recycling', 'recycle recycling arrows loop waste', [P(lineArrow(13.4, 6.4, 18.4, 15), 'd', 'draw'), P(lineArrow(17.2, 18.2, 7.2, 18.2), 'd', 'draw:.3'), P(lineArrow(5.4, 15.8, 10.4, 7.2), 'd', 'draw:.6'), leaf(9.9, 15, 4.4, 'a', 'pop')]),
  I('circular-economy', 'circular economy loop reuse lifecycle cradle', [G('spin-slow', X(12, 12, 9.5), P(arcArrow(12, 12, 8, 15, 105)), P(arcArrow(12, 12, 8, 135, 225)), P(arcArrow(12, 12, 8, 255, 345))), leaf(9.4, 14.6, 5.2, 'a', 'pop')]),
  I('compost', 'compost organic waste bin soil food', [G('wiggle', leaf(11, 6.5, 4.5, 'a')), R(4, 6.5, 16, 2.5, 1.2), P(bin), P('M8 14.5c1.3-1 2.7 1 4 0s2.7-1 4 0')]),
  I('zero-waste', 'zero waste landfill bin reduce', [P('M10 4.5V3h4v1.5'), R(4, 4.5, 16, 2.5, 1.2), P('M5.5 7h13l-1.2 13a1.5 1.5 0 0 1-1.5 1.3H8.2A1.5 1.5 0 0 1 6.7 20Z'), P('M12 10.5a2.4 3.2 0 0 1 0 6.4a2.4 3.2 0 0 1 0-6.4', 'a', 'pulse')]),
  I('e-waste', 'e-waste electronics recycling device phone', [R(6.5, 2.5, 11, 19, 2.5), P('M11 5h2'), G('spin-slow', X(12, 12.5, 4.5), P(arcArrow(12, 12.5, 3.4, 20, 160, 1.6), 'a'), P(arcArrow(12, 12.5, 3.4, 200, 340, 1.6), 'a'))]),
  I('eco-packaging', 'eco packaging sustainable box parcel shipping', [R(3, 10, 18, 11, 2), P('M6 17h4'), G('grow', P('M12 7c0-2.3 1.8-3.8 4.6-3.8 0 2.7-1.8 3.8-4.6 3.8Z', 'a'), P('M12 8c0-1.9-1.4-3-3.6-3 0 2 1.4 3 3.6 3Z', 'a'), P('M12 10V6.5', 'd'))]),
  I('reusable-bottle', 'reusable bottle refill single use plastic', [P('M10 2.5h4v3l1.8 2.4c.5.6.7 1.3.7 2v9.6a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2V9.9c0-.7.2-1.4.7-2L10 5.5Z'), R(7.5, 11, 9, 6, 1, 'a', 'pop'), ...leafLine(10.2, 15.6, 3.4)]),
  I('plastic-free', 'plastic free bag ban ocean single use', [P('M5 8h14l-1 12.5H6Z'), P('M9 8V6a3 3 0 0 1 6 0v2'), P('M4 4.5 20 20.5', 'a', 'draw')]),
  I('ocean-plastic', 'ocean plastic pollution marine bottle sea', [G('float', P('M10.2 4h3.6v2l1.5 2v7.5a1.5 1.5 0 0 1-1.5 1.5h-3.6a1.5 1.5 0 0 1-1.5-1.5V8l1.5-2Z')), waves(15.5), waves(19.5, 'd')]),

  // ---- nature & climate ----
  I('biodiversity', 'biodiversity nature species ecosystem habitat', [P(leafD(3.5, 20.5, 15)), vein(3.5, 20.5, 15), P('M8 15.5V12.5M11.5 12V9'), G('float', C(17, 17, 2.8, 'a'), P('M17 14.2v5.6'))]),
  I('tree-planting', 'tree planting sapling reforestation seedling', [P('M3.5 20.5c2-2.5 5-3.5 8.5-3.5s6.5 1 8.5 3.5Z'), G('grow', P('M12 12.5c0-2.5-1.9-4-5-4 0 2.9 1.9 4 5 4Z'), P('M12 11c0-3 2.3-4.8 6-4.8 0 3.5-2.3 4.8-6 4.8Z', 'a'), P('M12 17V9.5', 'd'))]),
  I('forest', 'forest trees woodland nature conservation', [P('M8 3.5l4.5 7H10l3 6H3l3-6H3.5Z'), P('M8 16.5v4'), G('wiggle', C(16.5, 10, 4.3, 'a')), P('M16.5 14.3v6.2'), P('M2.5 20.5h19')]),
  I('air-quality', 'air quality wind pollution aqi clean air', [P('M3 8.5h10a2.5 2.5 0 1 0-2.5-2.5'), P('M3 12.5h14.5a2.5 2.5 0 1 1-2.5 2.5', 'a', 'draw'), P('M3 16.5h6'), C(18, 5, 1.1, 'f', 'blink'), C(20.5, 9, 1, 'f', 'blink:.5')]),
  I('temperature-rise', 'global warming temperature rise heat climate', [P('M9 4.5a2.5 2.5 0 0 1 5 0v9.3a4 4 0 1 1-5 0Z'), C(11.5, 17, 2, 'a'), P('M11.5 15V8', 'a', 'grow'), G('slide-u', P(lineArrow(18.5, 11, 18.5, 4)))]),
  I('climate-risk', 'climate risk exposure warning planet tcfd', [C(10.5, 10.5, 7.5), P('M3 10.5h15M10.5 3c-2.5 2-2.5 13 0 15M10.5 3c2.5 2 2.5 13 0 15'), G('pulse', P('M17 11.5l5 9H12Z', 'a'), P('M17 14.8v2.4'), C(17, 19, 0.85, 'f'))]),
  I('flood-risk', 'flood risk water property climate hazard', [P('M4 11.5 12 4.5l8 7V19H4Z'), P('M10.5 19v-3.5h3V19'), waves(16), waves(20, 'd')]),
  I('wildfire-risk', 'wildfire fire risk forest hazard climate', [P('M6.5 8l3.5 6H8l2.5 4.5h-8L5 14H3Z'), P('M6.5 18.5V21'), P('M14 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-3.8 2.5-5 .3 1.6 1 2.5 2 3 .5-2.5-.5-5 .5-8Z', 'a', 'flicker'), P('M14 19.5a2 2 0 0 1-2-2c0-1 1-2 2-3 1 1 2 2 2 3a2 2 0 0 1-2 2')]),
  I('storm-risk', 'storm extreme weather lightning climate hazard', [P(cloudD(0, -2, 1)), P('M13 13.5 10.5 17.5h3l-2 4', 'a', 'blink')]),

  // ---- social ----
  I('diversity', 'diversity people inclusion workforce representation', [C(6, 9.5, 2.2), P('M2.5 19a3.5 3.5 0 0 1 7 0Z'), C(18, 9.5, 2.2), P('M14.5 19a3.5 3.5 0 0 1 7 0Z'), G('pop', C(12, 7.5, 2.7, 'a'), P('M7.5 19.5a4.5 4.5 0 0 1 9 0Z', 'a'))]),
  I('inclusion', 'inclusion belonging welcome circle people', [C(12, 12, 9, 'd', 'spin-slow'), C(12, 9.5, 2.4, 'a', 'pop'), P('M7.5 17a4.5 4.5 0 0 1 9 0Z')]),
  I('pay-equity', 'pay equity equal pay gap wage fairness', [C(7, 6.5, 2.2), C(17, 6.5, 2.2), R(4, 10.5, 6, 10, 1.5, 'b', 'grow'), R(14, 10.5, 6, 10, 1.5, 'b', 'grow'), P('M11 14h2M11 17h2', 'a')]),
  I('accessibility', 'accessibility disability wheelchair inclusive access', [C(10.5, 4.5, 1.9, 'a', 'pop'), P('M10.5 8v5.5h5l2 4.5h2.5M10.5 10.5h4'), P(arc(10, 15.5, 5.5, 45, 315))]),
  I('community-investment', 'community investment giving social impact donation', [...hand(), G('float', C(12.5, 7.5, 3.8, 'a'), C(12.5, 7.5, 2.2, 'd'))]),
  I('volunteering', 'volunteer charity care giving community', [...hand(), P('M12.5 11.5c-3.2-2-5-3.7-5-6a2.6 2.6 0 0 1 5-1 2.6 2.6 0 0 1 5 1c0 2.3-1.8 4-5 6Z', 'a', 'beat')]),
  I('ethical-sourcing', 'ethical sourcing responsible supply procurement', [...hand(), leaf(9.5, 11.5, 6.5, 'a', 'float')]),
  I('human-rights', 'human rights dignity protection people social', [C(12, 7.5, 2.6, 'a', 'pop'), P('M7.5 19.5a4.5 4.5 0 0 1 9 0Z'), P('M4.5 8.5c-1.8 4.5-.5 9.5 3.5 12M19.5 8.5c1.8 4.5.5 9.5-3.5 12')]),
  I('health-safety', 'health safety ehs hard hat workplace osha', [P('M4 15.5a8 8 0 0 1 16 0Z'), R(2.5, 15.5, 19, 3.2, 1.6), P('M11 7.6h2v2.4h2.4v2H13v2.4h-2V12H8.6v-2H11Z', 'a', 'pulse')]),
  I('employee-wellbeing', 'wellbeing wellness employee mental health care', [C(9, 7, 3), P('M3 20a6 6 0 0 1 12 0Z'), P('M17.5 18c-2.6-1.6-4-3-4-4.8a2 2 0 0 1 4-.8 2 2 0 0 1 4 .8c0 1.8-1.4 3.2-4 4.8Z', 'a', 'beat')]),
  I('stakeholder-engagement', 'stakeholder engagement dialogue consultation community', [C(7, 11.5, 2.5), P('M2.5 21a4.5 4.5 0 0 1 9 0Z'), C(17, 11.5, 2.5), P('M12.5 21a4.5 4.5 0 0 1 9 0Z'), P('M9.5 2.5h5a1.5 1.5 0 0 1 1.5 1.5v2a1.5 1.5 0 0 1-1.5 1.5h-1.5L12 9l-1-1.5H9.5A1.5 1.5 0 0 1 8 6V4a1.5 1.5 0 0 1 1.5-1.5Z', 'a', 'pop')]),
  I('fair-trade', 'fair trade balance equitable producer generic', [P('M12 4.5V19'), P('M8 21h8l-1-2H9Z'), G('seesaw', X(12, 8, 9.5), P('M4.5 6.5h15'), P('M5.5 6.5 2.8 13.5M5.5 6.5l2.7 7M18.5 6.5l-2.7 7M18.5 6.5l2.7 7'), P('M2.5 13.5h6a3 3 0 0 1-6 0Z'), P('M15.5 13.5h6a3 3 0 0 1-6 0Z', 'a')), C(12, 4.5, 1.4, 'a')]),
  I('bike-commute', 'bike bicycle commute cycling green travel', [G('slide-r', C(6, 15.5, 3.8, 'd'), C(18, 15.5, 3.8, 'd'), P('M6 15.5 9.5 9.5 11.5 15.5 6 15.5M9.5 9.5H16L11.5 15.5M16 9.5l2 6', 'a'), P('M8 8.5h3M15 7.5l1-.5h1.5'))]),
  I('remote-work-eco', 'remote work hybrid home commute emissions', [P('M3.5 11 12 4l8.5 7v9.5h-17Z'), P('M8 17v-4.5h8V17M6.5 17h11'), leaf(15.5, 8.5, 5.5, 'a', 'wiggle')]),

  // ---- governance ----
  I('governance-board', 'board governance directors oversight boardroom', [C(7, 7, 2), C(17, 7, 2), C(12, 6, 2.2, 'a', 'pop'), R(4, 11, 16, 5, 2.5), P('M7 16v4.5M17 16v4.5')]),
  I('esg-pillars', 'esg pillars environmental social governance framework', [P('M3 8 12 3.5 21 8Z'), R(5, 10, 3, 8, 1), R(10.5, 10, 3, 8, 1, 'a', 'grow'), R(16, 10, 3, 8, 1), P('M3 20.5h18')]),
  I('esg-whistleblower', 'whistleblower whistle speak up report misconduct', [P('M8.5 9h11a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6.2A5 5 0 1 1 8.5 9Z'), C(8.5, 14, 1.8, 'd'), P('M15 6l1-2.2M18.5 7.5l2-1.8', 'a', 'blink')]),
  I('ethics-hotline', 'ethics hotline concern report compliance speak up', [P('M5 3.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z'), P('M12 7v6.5M10 13.5h4'), G('seesaw', X(12, 8.5, 6), P('M7.5 7.5h9'), P('M6 11a1.5 1.5 0 0 0 3 0M15 11a1.5 1.5 0 0 0 3 0', 'a'))]),
  I('audit-assurance', 'audit assurance verification review esg data', [R(4, 3, 12, 16, 2), P('M7 7h6M7 10.5h4'), G('pulse', C(16, 15.5, 3.8, 'a'), P('M14.5 15.5l1 1 2-2', 'd', 'draw')), P('M18.8 18.3 21 20.5')]),
  I('materiality-matrix', 'materiality matrix assessment priority issues', [R(3, 3, 18, 18, 2.5), P('M12 3v18M3 12h18'), R(13.5, 4.5, 6, 6, 1.2, 'a', 'pop'), C(7, 16.5, 1.1, 'f'), C(9, 14.5, 1.1, 'f'), C(16, 16, 1.1, 'f'), C(7.5, 8, 1.1, 'f')]),
  I('goal-wheel', 'goals targets development wheel progress generic', [G('spin-slow', X(12, 12, 9), ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => P(ringSeg(12, 12, 9, 5.8, i * 45 + 4, i * 45 + 41), i === 0 ? 'a' : 'b'))), C(12, 12, 2.4, 'a', 'pulse')]),
  I('green-target', 'sustainability goal target objective kpi', [C(11, 13, 8), C(11, 13, 4.5, 'd'), C(11, 13, 1.5, 'f'), G('diag-in', P('M11 13l7.5-7.5'), leaf(16.5, 7.5, 5, 'a'))]),
  I('eco-certified', 'certified eco label certification seal standard', [P('M8 15.5 6.8 21l2.6-1 1.6 2 .8-4.8Z'), P('M16 15.5l1.2 5.5-2.6-1-1.6 2-.8-4.8Z'), P(star(12, 9.5, 7.5, 6.4, 14)), G('pop', C(12, 9.5, 4.3, 'a'), ...leafLine(10.2, 11.3, 3.6))]),
  I('supply-transparency', 'supply chain transparency traceability visibility', [P('M3 19h18', 'd', 'dash'), C(4, 19, 1.2, 'f'), C(12, 19, 1.2, 'f'), C(20, 19, 1.2, 'f'), G('float', C(11, 9.5, 5.5), P('M15 13.5l3 3'), C(11, 9.5, 2, 'a', 'pulse'))]),
  I('local-sourcing', 'local sourcing nearby supplier map pin', [P('M12 21.5c-4-4.5-7-8-7-11.5a7 7 0 0 1 14 0c0 3.5-3 7-7 11.5Z'), leaf(9, 13, 6, 'a', 'pop')]),

  // ---- built environment ----
  I('green-building', 'green building leed sustainable office real estate', [R(4, 7, 10, 14, 1.5), P('M7.5 10.5h1M10.5 10.5h1M7.5 14h1M10.5 14h1M8 21v-3h2v3'), leaf(13, 10, 8, 'a', 'wiggle')]),
  I('green-datacenter', 'data centre efficiency pue server green computing', [R(3, 3.5, 14, 6.5, 2), R(3, 12, 14, 6.5, 2), P('M10 6.75h4M10 15.25h2.5'), C(6.5, 6.75, 1.1, 'f', 'blink'), C(6.5, 15.25, 1.1, 'f', 'blink:.6'), G('pop', C(18, 17, 4.2, 'a'), ...leafLine(16, 19, 4))]),
];
