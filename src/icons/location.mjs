import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

const f = (v) => +v.toFixed(2);
// teardrop map pin: round head centred on (x,y) with radius r, tip below
const pinD = (x, y, r) => {
  const t = f(y + r * 1.85);
  return `M${x} ${t}C${f(x - r * 0.5)} ${f(t - r * 0.75)} ${f(x - r)} ${f(y + r * 0.7)} ${f(x - r)} ${y}A${r} ${r} 0 0 1 ${f(x + r)} ${y}C${f(x + r)} ${f(y + r * 0.7)} ${f(x + r * 0.5)} ${f(t - r * 0.75)} ${x} ${t}Z`;
};
const pin = (x, y, r, role = 'b', an) => P(pinD(x, y, r), role, an);
// arc (0 = up, clockwise) ending in an arrowhead
const aArc = (cx, cy, r, a0, a1, h = 1.8) => {
  const t = ((a1 - 90) * Math.PI) / 180, x = cx + r * Math.cos(t), y = cy + r * Math.sin(t);
  const tx = -Math.sin(t), ty = Math.cos(t), nx = Math.cos(t), ny = Math.sin(t);
  return arc(cx, cy, r, a0, a1) + `M${f(x - h * tx + h * nx)} ${f(y - h * ty + h * ny)}L${f(x)} ${f(y)}L${f(x - h * tx - h * nx)} ${f(y - h * ty - h * ny)}`;
};
const diamond = 'M10.6 3.4a2 2 0 0 1 2.8 0l7.2 7.2a2 2 0 0 1 0 2.8l-7.2 7.2a2 2 0 0 1-2.8 0l-7.2-7.2a2 2 0 0 1 0-2.8Z';
const foldMap = 'M3 6.5 8.5 4.5l7 2 5.5-2v13l-5.5 2-7-2-5.5 2Z';
const globe = (cx, cy, r) => [C(cx, cy, r), E(cx, cy, f(r * 0.42), r, 'd'), P(`M${f(cx - r)} ${cy}h${f(2 * r)}`)];

export default [
  I('map-pin', 'location marker place pin spot', [G('float', pin(12, 9.5, 6.5), C(12, 9.5, 2.4, 'd'))]),
  I('map-pin-dot', 'location marker place dot here', [pin(12, 9.5, 6.5), C(12, 9.5, 2.6, 'a', 'pulse')]),
  I('map-pin-drop', 'drop pin place marker add location', [E(12, 20.5, 4.5, 1.4, 'a', 'pulse'), G('drop', pin(12, 8, 5.6), C(12, 8, 2, 'd'))]),
  I('pin-cluster', 'markers group many locations cluster', [pin(5.5, 5.8, 3), pin(18.5, 5.8, 3), pin(12, 11.5, 4.3, 'a', 'pop'), C(12, 11.5, 1.5, 'd')]),
  I('map-pin-off', 'location disabled hidden no pin off', [pin(12, 9.5, 6.5), C(12, 9.5, 2.3, 'd'), P('M3.5 3.5l17 17', 'a', 'draw')]),
  I('current-location', 'crosshair gps locate me position', [C(12, 12, 7), P('M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3'), C(12, 12, 3, 'a', 'pulse')]),
  I('compass-rose', 'compass direction cardinal north navigation', [C(12, 12, 9.2), G('wiggle', P(star(12, 12, 7.6, 2, 4), 'a')), C(12, 12, 1, 'f')]),
  I('north-arrow', 'north orientation map direction bearing', [P('M9.5 8V3l5 5V3'), P('M12 10.5l5 10.5-5-2.8-5 2.8Z', 'a', 'slide-u')]),
  I('navigation-arrow', 'navigate pointer heading direction gps', [G('diag', P('M20.5 3.5 13.5 20.5l-2.3-7.7L3.5 10.5Z', 'a'), P('M11.2 12.8l3.6-3.6', 'h'))]),
  I('turn-left', 'directions road sign left turn', [P(diamond), P('M14.5 17v-3.5a2 2 0 0 0-2-2H8.5', 'a', 'slide-l'), P('M10.5 9.5l-2 2 2 2', 'a', 'slide-l')]),
  I('turn-right', 'directions road sign right turn', [P(diamond), P('M9.5 17v-3.5a2 2 0 0 1 2-2h4', 'a', 'slide-r'), P('M13.5 9.5l2 2-2 2', 'a', 'slide-r')]),
  I('u-turn', 'return back reverse road sign', [R(3, 3, 18, 18, 4), G('slide-d', P('M9 17.5v-6.5a3 3 0 0 1 6 0v4.5', 'a'), P('M12.5 13 15 15.5 17.5 13', 'a'))]),
  I('roundabout', 'circle junction traffic road sign', [C(12, 12, 9), G('spin-slow', X(12, 12, 6), P(aArc(12, 12, 5, 20, 95), 'a'), P(aArc(12, 12, 5, 140, 215), 'a'), P(aArc(12, 12, 5, 260, 335), 'a'))]),
  I('route-points', 'route a to b path journey directions', [C(6, 18, 2.6), P('M6 15.4V11a3 3 0 0 1 3-3h3', 'd', 'dash'), pin(17, 7.5, 4, 'a', 'float'), C(17, 7.5, 1.4, 'd')]),
  I('waypoint', 'stop via route leg path node', [P('M6.4 15.6 10.2 10.4M14 10.2l3.6 3.6', 'd', 'dash'), C(5, 17.5, 2.2), C(12, 8, 3, 'a', 'pulse'), C(19, 15.5, 2.2)]),
  I('distance-ruler', 'measure distance length scale ruler', [P('M4 7.5h16', 'a', 'grow-x'), P('M6.5 5 4 7.5 6.5 10M17.5 5 20 7.5 17.5 10', 'a'), R(3, 13.5, 18, 6.5, 1.5), P('M6.5 13.5v2.5M10 13.5V15M13.5 13.5v2.5M17 13.5V15')]),
  I('area-measure', 'polygon area plot land size measure', [P('M4.5 8 11 4l8.5 4.5-2 11-11 .5Z'), C(4.5, 8, 1.6, 'a', 'pop'), C(11, 4, 1.6, 'a', 'pop:.2'), C(19.5, 8.5, 1.6, 'a', 'pop:.4'), C(17.5, 19.5, 1.6, 'a', 'pop:.6'), C(6.5, 20, 1.6, 'a', 'pop:.8')]),
  I('geofence', 'boundary perimeter fence zone alert area', [C(12, 12, 9, 'd', 'dash'), pin(12, 9.8, 4, 'a', 'float'), C(12, 9.8, 1.3, 'd')]),
  I('radius-circle', 'radius range distance circle around', [C(12, 12, 9), P('M12 12 18.4 5.6', 'a', 'draw'), C(12, 12, 1.5, 'f'), C(18.4, 5.6, 1.2, 'f')]),
  I('heatmap-region', 'heatmap density hotspot intensity area', [P('M5 6.5c3-3 9-3.5 13-1s3 9-.5 12.5-10 3.5-13.5 0S2 9.5 5 6.5Z'), E(12, 12, 5.2, 4, 'a', 'breathe'), C(12, 12, 1.5, 'f', 'pulse')]),
  I('choropleth-map', 'regions shaded map statistics territory', [R(3, 4, 18, 16, 2.5), P('M3 13h6l2 2.5V20M9 4v9'), P('M11.5 6h7.5v7.5h-5.5l-2-2.5Z', 'a', 'breathe')]),
  I('world-map', 'world continents global international map', [R(2.5, 5, 19, 14, 2.5), P('M5.5 8.5h4l1 2-1.5 2.5h-2L5.5 11Z', 'a', 'breathe'), P('M13 8h4.5l1.5 2-2 1.5h-2.5Z', 'a', 'breathe:.4'), P('M14 13.5h3l.5 2.5-2 1-1.5-1.5Z', 'a', 'breathe:.8')]),
  I('hemispheres', 'hemisphere east west earth globes', [C(6.8, 12, 4.6), E(6.8, 12, 2, 4.6, 'd'), G('float', C(17.2, 12, 4.6, 'a'), E(17.2, 12, 2, 4.6, 'd'))]),
  I('grid-globe', 'globe wireframe meridian latitude earth', [C(12, 12, 9), E(12, 12, 4.5, 9, 'd', 'squash'), P('M12 3v18'), P('M4 8q8 3 16 0M4 16q8-3 16 0')]),
  I('globe-pin', 'global location world place marker', [...globe(10, 13, 7.5), pin(17.5, 6.2, 3.6, 'a', 'drop'), C(17.5, 6.2, 1.2, 'd')]),
  I('globe-network', 'global network connected worldwide nodes', [P('M5.6 5.6l2.2 2.2M18.4 5.6l-2.2 2.2M12 18.5v1.5', 'd', 'dash'), ...globe(12, 12, 6.2), C(4.5, 4.5, 2, 'a', 'pulse'), C(19.5, 4.5, 2, 'a', 'pulse:.4'), C(12, 21, 1.6, 'a', 'pulse:.8')]),
  I('flag-pole', 'flag country nation pole territory', [R(3.5, 19.5, 5, 2, 1), P('M6 19.5V3'), P('M6 4h11l-2.5 3.5L17 11H6Z', 'a', 'wave')]),
  I('city-skyline', 'city skyline urban buildings downtown', [R(3, 11, 5, 10, 1), R(9.5, 3.5, 5, 17.5, 1, 'a'), R(16, 7.5, 5, 13.5, 1), C(5.5, 14, 0.9, 'f', 'blink'), C(18.5, 11, 0.9, 'f', 'blink:.5'), C(18.5, 15, 0.9, 'f', 'blink:1'), P('M12 7v2M12 12v2')]),
  I('store-locator', 'store finder shop location nearby retail', [P('M3 11.5 4.5 8h9l1.5 3.5Z'), R(4, 11.5, 10, 9.5, 1), P('M7.5 21v-4h3v4'), pin(18, 7.5, 3.8, 'a', 'float'), C(18, 7.5, 1.3, 'd')]),
  I('branch-finder', 'branch office locate find bank nearby', [P('M2.5 8.5 8.5 4.5l6 4Z'), P('M4.5 10.5v5M8.5 10.5v5M12.5 10.5v5M2.5 17.5h8'), C(17.5, 17, 4.3, 'a', 'pulse'), C(17.5, 17, 1.6, 'd'), P('M17.5 13.5v1.6M17.5 18.9v1.6M14 17h1.6M19.4 17H21')]),
  I('office-locations', 'offices sites locations map company', [P(foldMap), P('M8.5 4.5v13M15.5 6.5v13'), C(5.8, 11, 1.5, 'a', 'pop'), C(12, 14, 1.5, 'a', 'pop:.3'), C(18.3, 9.5, 1.5, 'a', 'pop:.6')]),
  I('delivery-zone', 'delivery area zone coverage shipping region', [P(poly(12, 12, 9.5, 6)), P('M8 13.5 12 9.8l4 3.7V17H8Z', 'a', 'pop'), P('M11 17v-2h2v2')]),
  I('service-area', 'service area region coverage operating zone', [E(12, 17, 9.5, 4), E(12, 17, 5, 2, 'd'), pin(12, 7.8, 4.6, 'a', 'float'), C(12, 7.8, 1.5, 'd')]),
  I('coverage-map', 'coverage reach signal map availability', [P(foldMap), C(12, 12, 4.5, 'a', 'breathe'), C(12, 12, 1.3, 'f', 'pulse')]),
  I('satellite-view', 'satellite aerial imagery orbit view', [G('float', R(2.5, 9.5, 5.5, 5, 1, 'a'), R(16, 9.5, 5.5, 5, 1, 'a'), P('M5.25 9.5v5M18.75 9.5v5'), P('M8 12h1.5M14.5 12H16'), R(9.5, 9, 5, 6, 1.2), P('M12 15v2'), P('M9 19.5a4 4 0 0 1 6 0'))]),
  I('map-layers', 'map layers overlay stack view', [P('M3 15.5l9 4.5 9-4.5', 'd', 'sink'), P('M12 6.5 21 11l-9 4.5L3 11Z'), pin(12, 7, 3.2, 'a', 'drop'), C(12, 7, 1.1, 'd')]),
  I('terrain', 'terrain mountain topography relief outdoor', [P('M2.5 20 9 8.5l4 6.5 2.5-3.5 6 8.5Z'), P('M7.3 11.5l1.4.9 1-.9 1.1.9'), C(17.5, 6, 2.4, 'a', 'pulse')]),
  I('street-view', 'street view person walk explore ground', [E(12, 19.5, 8.5, 2.5, 'a'), G('float', C(12, 5.5, 2.5), P('M9.2 9.5h5.6a1.2 1.2 0 0 1 1.2 1.2V15h-2l-.5 5h-3l-.5-5H8v-4.3a1.2 1.2 0 0 1 1.2-1.2Z'))]),
  I('transit-map', 'transit metro subway lines stations', [P('M4 17h5l6-9h5', 'a'), P('M7 4v5.5l9 9V20'), C(4, 17, 1.9), C(20, 8, 1.9), C(7, 4, 1.9), C(16, 20, 1.9), C(12, 12.5, 2.4, 'b', 'pop')]),
  I('parking-sign', 'parking lot car park sign p', [G('pop', R(3, 3, 18, 18, 4, 'a'), P('M9.5 17V7h3.5a3 3 0 0 1 0 6H9.5'))]),
  I('traffic-light', 'traffic signal stop go light', [R(7.5, 2.5, 9, 19, 4), C(12, 7, 2, 'a', 'blink'), C(12, 12, 2, 'd'), C(12, 17, 2, 'd')]),
  I('road', 'road street highway lane route', [P('M9.2 3h5.6l4.7 18h-15Z'), G('slide-d', P('M12 5v2M12 10v2.5M12 15.5V18', 'a'))]),
  I('bridge-road', 'bridge crossing suspension river road', [P('M2.5 9c2.2 0 3.3-3 4.5-3s2.5 7 5 7 3.8-7 5-7 2.3 3 4.5 3', 'a'), P('M7 6v8M17 6v8'), R(2.5, 14, 19, 2.5, 1), G('wave', P('M4 20q2-1.2 4 0t4 0 4 0 4 0'))]),
  I('tunnel', 'tunnel underpass mountain road through', [P('M2.5 21 9 5h6l6.5 16Z'), P('M8 21v-5a4 4 0 0 1 8 0v5Z', 'a', 'breathe')]),
  I('highway-shield', 'highway interstate route marker road shield', [G('pop', P('M5 4.5c2.3.8 4.7.8 7-.5 2.3 1.3 4.7 1.3 7 .5 1.3 2.5 1.8 5 1.2 7.5-.8 4-3.8 7-8.2 9-4.4-2-7.4-5-8.2-9-.6-2.5-.1-5 1.2-7.5Z'), P('M4.3 9h15.4'), P('M10 12.5v4.5M14 12.5v4.5', 'a'))]),
  I('coordinates', 'coordinates lat long position xy point', [P('M4 3.5V20h16.5'), P('M4 9h10.5V20', 'd', 'dash'), C(14.5, 9, 3, 'a', 'pulse')]),
  I('gps-signal', 'gps signal satellite fix positioning', [pin(9, 11, 5.2), C(9, 11, 1.8, 'd'), P('M15 3.5a6 6 0 0 1 5.5 5.5', 'a', 'blink'), P('M15 6.8a2.8 2.8 0 0 1 2.2 2.2', 'a', 'blink:.4')]),
  I('location-sharing', 'share location send position live', [pin(9.5, 8.5, 5.6), C(9.5, 8.5, 1.9, 'd'), C(17.5, 17, 4.3, 'a'), G('diag', P('M15.8 18.7l3.4-3.4M16.6 15.3h2.6v2.6'))]),
  I('check-in-point', 'check in arrive visit verified place', [pin(12, 9.5, 6.5, 'a'), P('M9.3 9.6l1.9 1.9 3.6-3.8', 'd', 'draw')]),
  I('nearby-radar', 'nearby radar scan around proximity', [C(12, 12, 9), C(12, 12, 5, 'd'), G('spin', X(12, 12, 8), P(wedge(12, 12, 8, 0, 55), 'a')), C(12, 12, 1.2, 'f'), C(7.5, 15.5, 1, 'f', 'blink')]),
  I('lat-long-grid', 'latitude longitude grid graticule cell', [R(3, 3, 18, 18, 3), P('M3 9h18M3 15h18M9 3v18M15 3v18'), R(10.5, 10.5, 3, 3, 0.8, 'a', 'pop')]),
  I('time-zone-map', 'time zone utc offset global hours', [...globe(10, 10.5, 7.5), C(17.5, 17, 4.3, 'a'), G('spin', X(17.5, 17, 2.5), P('M17.5 17v-2.3', 'd')), P('M17.5 17h1.7')]),
  I('address-book-pin', 'address book contacts locations directory', [R(4, 3, 13, 18, 2), P('M17 7h2.5M17 11h2.5M17 15h2.5'), pin(10.5, 9.5, 3.4, 'a', 'float'), C(10.5, 9.5, 1.1, 'd')]),
  I('postal-code', 'postal code zip postcode mail address', [R(2.5, 5, 15, 11, 2), P('M3 6.2l7.25 5 7.25-5'), pin(18, 14, 3.8, 'a', 'drop'), C(18, 14, 1.3, 'd')]),
  I('region-selector', 'select region choose area territory', [P('M3.5 3.5h17v17h-17v-17', 'd', 'dash'), P('M8 9.5 12 7l4.5 2.5-1 5.5-4 2.5-3.5-3Z', 'a', 'pop')]),
  I('locale-globe', 'language locale translate international text', [...globe(9.5, 9.5, 7), R(13, 13, 8.5, 8.5, 2, 'a'), P('M15 19.5l2.25-5 2.25 5M15.8 18h2.9', 'd', 'draw')]),
  I('regional-currency', 'currency region fx local money global', [...globe(9.5, 9.5, 7), G('flip', C(17.5, 17, 4.3, 'a'), C(17.5, 17, 2.4, 'd'))]),
  I('data-residency', 'data residency sovereignty server region compliance', [R(4, 14, 16, 7, 2), P('M12 17.5h4.5'), C(8, 17.5, 1, 'f', 'blink'), pin(12, 6.5, 4.2, 'a', 'float'), C(12, 6.5, 1.4, 'd')]),
  I('edge-location', 'edge pop cdn point of presence network', [P('M10.3 19.5H6.5M13.7 19.5h3.8', 'd', 'dash'), C(4.5, 19.5, 2), C(19.5, 19.5, 2), pin(12, 8.5, 5.8, 'a', 'pulse'), C(12, 8.5, 2, 'd')]),
  I('map-folded', 'map paper atlas folded guide', [G('squash', P(foldMap), P('M8.5 4.5l7 2v13l-7-2Z', 'a'))]),
  I('pin-home', 'home address residence location pin', [pin(12, 9.5, 6.5), P('M9.2 10.3 12 7.8l2.8 2.5v3H9.2Z', 'a', 'pop')]),
  I('favorite-place', 'favourite saved place starred location', [pin(12, 9.5, 6.5), P(star(12, 9.5, 3.6, 1.6), 'a', 'pop')]),
  I('signpost', 'signpost directions wayfinding guide crossroads', [P('M12 2.5v19'), P('M5 4.5h11l2.5 2.5L16 9.5H5Z', 'a', 'slide-r'), P('M19 12H8l-2.5 2.5L8 17h11Z', 'b', 'slide-l')]),
  I('directions-straight', 'straight ahead continue road sign', [P(diamond), G('slide-u', P('M12 16.5V8', 'a'), P('M9.5 10.5 12 8l2.5 2.5', 'a'))]),
  I('road-fork', 'fork split junction choice route', [P('M12 21.5V14L6 6.5M6 10V6.5h3.5'), G('diag', P('M12 14l6-7.5M14.5 6.5H18V10', 'a'))]),
  I('merge-lane', 'merge lanes join traffic road', [P('M7 21v-4.5l5-5'), P('M17 21v-4.5l-5-5V3.5', 'a', 'slide-u'), P('M9 6.5l3-3 3 3', 'a', 'slide-u')]),
  I('mile-marker', 'milestone marker distance post kilometre', [R(7, 3, 10, 12, 2.5), P('M10 7.5h4', 'a', 'blink'), P('M10 11h4'), P('M12 15v6.5M8 21.5h8')]),
  I('elevation-profile', 'elevation altitude profile climb gradient', [P('M2.5 20.5V15l4-5 3.5 3 5-7.5 6.5 9.5v5.5Z'), C(15, 5.5, 1.8, 'a', 'pulse')]),
  I('contour-lines', 'contour topographic topo elevation lines', [P('M4.5 7c3.5-4 11-4.5 14.5-.5s1.5 12-3.5 13.5-12 0-12.5-5S1 11 4.5 7Z'), P('M8 9.5c2-2 6.5-2.3 8.2.2s0 6.8-3.2 7.3-6-1-6.3-3.5S6.5 11 8 9.5Z', 'd'), C(12, 12.5, 1.8, 'a', 'pulse')]),
  I('intersection', 'crossroads junction intersection streets', [P('M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z'), P('M12 4.5v2M12 17.5v2M4.5 12h2M17.5 12h2'), C(12, 12, 1.6, 'a', 'blink')]),
  I('one-way-sign', 'one way direction traffic sign', [R(2.5, 7.5, 19, 9, 2), G('slide-r', P('M6 12h11', 'a'), P('M14 9l3 3-3 3', 'a'))]),
  I('indoor-map', 'indoor floor plan venue building map', [R(3, 3, 18, 18, 2.5), P('M12 3v7M3 12h5M12 14v7M16 12h5'), C(16.5, 7.5, 1.8, 'a', 'pulse')]),
  I('map-legend', 'legend key symbols map guide', [R(3.5, 3.5, 17, 17, 2.5), R(6.5, 7, 3, 3, 0.8, 'a', 'pop'), C(8, 12, 1.2, 'f'), P('M6.8 16.5 8 14.5l1.2 2Z'), P('M12 8.5h5.5M12 12h5.5M12 15.5h5.5')]),
  I('scale-bar', 'scale bar map distance ratio units', [P('M3 13.5h18M3 10v3.5M7.5 11.5v2M12 10v3.5M16.5 11.5v2M21 10v3.5'), R(3, 16.5, 9, 3.5, 1.2, 'a', 'grow-x')]),
  I('territory-flag', 'territory region claim market area', [P('M4 9c2-4 8-5 12-3s5.5 8 2.5 11.5-10 3.5-13 .5S2.5 12 4 9Z'), P('M10 15.5V7'), P('M10 7.2h5l-1.3 1.8 1.3 1.8h-5Z', 'a', 'wave')]),
  I('hq-pin', 'headquarters hq main office location', [pin(12, 9.5, 6.5, 'a'), P('M9.8 6.8v5.4M14.2 6.8v5.4M9.8 9.5h4.4', 'd', 'draw')]),
  I('eta-pin', 'eta arrival time estimate location', [pin(9.5, 8.5, 5.6), C(9.5, 8.5, 1.9, 'd'), C(17.5, 17, 4.3, 'a'), G('spin', X(17.5, 17, 2.5), P('M17.5 17v-2.3', 'd')), P('M17.5 17h1.7')]),
  I('saved-places', 'saved bookmarked places locations list', [P('M6 3.5h12a1 1 0 0 1 1 1V21l-7-4.5L5 21V4.5a1 1 0 0 1 1-1Z'), pin(12, 8.5, 2.6, 'a', 'pop')]),
  I('pins-distance', 'distance between two points pins span', [pin(6, 6.5, 3.3), pin(18, 6.5, 3.3), P('M4 18.5h16', 'a', 'grow-x'), P('M4 16.5v4M20 16.5v4', 'a')]),
  I('landmark', 'landmark monument obelisk attraction point of interest', [P('M10.5 5 12 2.5 13.5 5l1 13h-5Z'), R(6, 18, 12, 3.5, 1, 'a', 'pop')]),
];
