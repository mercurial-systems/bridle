import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

// point on a circle (0deg = up, clockwise)
const pp = (cx, cy, r, a) => {
  const t = ((a - 90) * Math.PI) / 180;
  return [+(cx + r * Math.cos(t)).toFixed(2), +(cy + r * Math.sin(t)).toFixed(2)];
};
// closed ring segment between radii r0 < r1
const band = (cx, cy, r0, r1, a0, a1) =>
  `M${pp(cx, cy, r1, a0)}A${r1} ${r1} 0 0 1 ${pp(cx, cy, r1, a1)}L${pp(cx, cy, r0, a1)}A${r0} ${r0} 0 0 0 ${pp(cx, cy, r0, a0)}Z`.replace(/,/g, ' ');
// arrowhead at the clockwise end of an arc
const head = (cx, cy, r, a, s = 2) => {
  const [ex, ey] = pp(cx, cy, r, a), t = (a * Math.PI) / 180;
  const tx = Math.cos(t), ty = Math.sin(t), nx = Math.sin(t), ny = -Math.cos(t);
  const f = (v) => +v.toFixed(2);
  return `M${f(ex - s * tx + s * nx)} ${f(ey - s * ty + s * ny)}L${ex} ${ey}L${f(ex - s * tx - s * nx)} ${f(ey - s * ty - s * ny)}`;
};
const bolt = (x, y) => `M${x + 1} ${y}l-3.5 5h2.5l-1 4 3.5-5H${x}Z`;

export default [
  // ---- fleet operations ----
  I('fleet-dashboard', 'fleet tracking overview live map vehicles', [R(3, 4, 18, 16, 2.5), P('M3 8.5h18'), C(6, 6.25, 0.8, 'f'), C(8.6, 6.25, 0.8, 'f'), P('M6.5 16.5c2.5-4 4.5 1 6.5-3s3-2.5 4.5-2.5', 'd', 'draw'), C(6.5, 16.5, 1.4, 'a', 'blink'), C(13, 13.5, 1.4, 'a', 'blink:.4'), C(17.5, 11, 1.4, 'a', 'blink:.8')]),
  I('fleet-yard', 'vehicle list fleet lot parked cars top', [R(3.5, 4, 4.5, 16, 2), P('M4.4 8.5h2.7M4.4 15.5h2.7'), G('slide-u', R(9.75, 4, 4.5, 16, 2, 'a'), P('M10.65 8.5h2.7M10.65 15.5h2.7')), R(16, 4, 4.5, 16, 2), P('M16.9 8.5h2.7M16.9 15.5h2.7')]),
  I('telematics-tracker', 'gps puck obd dongle telematics device', [P('M5 12h14l-1.4 7.4a1.5 1.5 0 0 1-1.5 1.1H7.9a1.5 1.5 0 0 1-1.5-1.1Z'), C(9, 15, 0.9, 'f'), C(12, 15, 0.9, 'f'), C(15, 15, 0.9, 'f'), C(10.5, 17.8, 0.9, 'f'), C(13.5, 17.8, 0.9, 'f'), C(12, 6.5, 1.9, 'a', 'pulse'), P(arc(12, 6.5, 4.4, -55, 55), 'd', 'blink')]),
  I('driver-profile', 'driver chauffeur operator person steering', [C(12, 6.5, 3.5), G('seesaw', C(12, 16, 5.5), P('M6.5 16h3.9M13.6 16h3.9M12 17.6v3.9'), C(12, 16, 1.7, 'a'))]),
  I('driver-score', 'safety rating driver score behaviour', [C(12, 12, 9), P(arc(12, 12, 6.2, -130, 130), 'd', 'draw'), P(star(12, 12.3, 3.4, 1.5), 'a', 'pop')]),
  I('harsh-braking', 'brake disc caliper hard stop event', [G('shake', C(10, 11.5, 7), C(10, 11.5, 2, 'd'), ...[0, 60, 120, 180, 240, 300].map((a) => C(...pp(10, 11.5, 4.4, a), 0.8, 'f')), P(band(10, 11.5, 7.9, 10.3, 15, 75), 'a')), P('M3 21h6M12 21h8.5', 'd', 'slide-l')]),
  I('speeding-alert', 'speedometer speed limit overspeed gauge', [P('M3 16.5a9 9 0 0 1 18 0v1.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18Z'), P(band(12, 16.5, 5.6, 7.6, 40, 80), 'a', 'blink'), P('M6.6 12.6l1 .6M12 8.9v1.3', 'd'), G('seesaw', X(12, 16.5, 5), P('M12 16.5l3.6-3.6')), C(12, 16.5, 1.3, 'f')]),
  I('fuel-card', 'fleet fuel card payment petrol diesel', [card(2.5, 5, 19, 14), P('M2.5 9.5h19'), P('M6 14h5M6 16.5h3'), P('M16.5 11c-1.6 2-2.6 3.4-2.6 4.6a2.6 2.6 0 0 0 5.2 0c0-1.2-1-2.6-2.6-4.6Z', 'a', 'drop')]),
  I('fuel-level', 'tank fuel gauge level petrol remaining', [R(4.5, 3, 10, 18, 3), R(6.75, 11, 5.5, 7.75, 1.5, 'a', 'grow'), P('M17 5.5h3.5M17 9.5h2M17 13.5h3.5M17 17.5h2', 'd')]),
  I('tire-pressure', 'tpms tyre pressure warning low', [P('M7 4.5C4.6 6.5 3.5 9.3 3.5 12.3c0 3.4 1.4 6 3.3 7.7h10.4c1.9-1.7 3.3-4.3 3.3-7.7 0-3-1.1-5.8-3.5-7.8'), P('M7 20v1.6M10.3 20v1.6M13.7 20v1.6M17 20v1.6'), P('M12 7.5v6', 'a', 'blink'), C(12, 16.6, 1.2, 'a', 'blink')]),
  I('oil-change', 'oil can lubricant service engine', [R(8, 7.5, 3, 2.5, 0.6), P('M5 10h8.5l2.5 2.8 4.5-2.3v1.2L16 17.5H6a1 1 0 0 1-1-1Z'), P('M5 11.5H3.8a1.2 1.2 0 0 0-1.2 1.2v.6c0 1 .8 1.7 1.7 1.7H5'), P('M20.3 14.5c-.8 1-1.2 1.7-1.2 2.3a1.2 1.2 0 0 0 2.4 0c0-.6-.4-1.3-1.2-2.3Z', 'a', 'drop')]),
  I('service-due', 'maintenance wrench bolt repair service', [G('tilt', P('M14.4 3a5 5 0 0 0-5 6.7l-6 6a1.9 1.9 0 0 0 2.7 2.7l6-6a5 5 0 0 0 6.6-5.3l-2.8 2.8-2.6-.6-.6-2.6Z')), P(poly(18, 18, 3.3, 6), 'a', 'spin'), C(18, 18, 1.1, 'd')]),
  I('inspection-sticker', 'mot inspection roadworthy sticker passed', [P(star(12, 12, 9.4, 8.2, 16)), C(12, 12, 5.8, 'd'), P('M9.3 12.2l1.9 1.9 3.6-3.8', 'a', 'draw')]),
  I('vehicle-registration', 'registration logbook title document car', [P('M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z'), P('M7.5 11V9.5l1.2-2.6a1 1 0 0 1 .9-.6h4.8a1 1 0 0 1 .9.6l1.2 2.6V11Z', 'a', 'slide-r'), P('M7.5 15h9M7.5 18h5.5')]),
  I('license-plate', 'number plate registration plate tag', [G('float', R(2.5, 7, 19, 10, 2), R(4.2, 8.7, 3, 6.6, 1, 'a'), P('M10 10.5v3M12.3 10.5l1.4 3M16 10.5v3M18.4 10.5v3'))]),
  I('odometer', 'mileage distance counter kilometres miles', [C(12, 12, 9), P('M6.6 9.5l1.1.6M12 5.6v1.3M17.4 9.5l-1.1.6'), G('seesaw', X(12, 12, 5), P('M12 12l-3-3')), C(12, 12, 1.2, 'f'), R(7, 14.5, 10, 4, 1, 'a'), P('M10.3 14.5v4M13.7 14.5v4')]),
  I('trip-log', 'logbook journey record mileage diary', [R(5.5, 3, 14, 18, 2.5), P('M3.5 7h3.5M3.5 12h3.5M3.5 17h3.5'), C(10, 7.5, 1.1, 'f'), P('M10 7.5c4.5 0 4.5 4 1 5.3s-1 4 4 3.7', 'a', 'draw'), C(15, 16.5, 1.3, 'f')]),
  I('route-optimization', 'optimal path shortest route planner', [P('M6.3 16.7C3.5 11 13.5 14 9.5 8.5S17 2.5 17.8 6', 'd', 'dash'), P('M6.5 16.5 17.5 7.5', 'a', 'draw'), C(5.5, 17.5, 2.2), C(18.5, 6.5, 2.2, 'b', 'pulse')]),
  I('dispatch-radio', 'dispatch walkie talkie radio two way', [P('M9.5 7V2.5'), R(6.5, 7, 10, 14, 2.5), P('M9.5 11h4M9.5 13.5h4'), C(11.5, 17.3, 1.5, 'a', 'pulse'), P('M19 7.5a3 3 0 0 1 0 4.5M21 6a5.5 5.5 0 0 1 0 7.5', 'd', 'blink')]),
  I('pickup-dropoff', 'pickup drop off pins rideshare stops', [P('M6 4a3.2 3.2 0 0 0-3.2 3.2C2.8 9.5 6 12 6 12s3.2-2.5 3.2-4.8A3.2 3.2 0 0 0 6 4Z'), C(6, 7.2, 1, 'f'), P('M6 14.5c0 4 5 4 7.5 1.5', 'd', 'dash'), G('float', P('M17.5 8a3.8 3.8 0 0 0-3.8 3.8c0 2.8 3.8 5.7 3.8 5.7s3.8-2.9 3.8-5.7A3.8 3.8 0 0 0 17.5 8Z', 'a'), C(17.5, 11.8, 1.2, 'f'))]),
  I('ride-request', 'request ride app hail phone matching', [R(6, 2.5, 12, 19, 2.5), C(12, 10.5, 3.8, 'd', 'ping'), C(12, 10.5, 1.8, 'a'), P('M10.5 18.5h3')]),
  I('surge-pricing', 'surge demand multiplier peak fare', [P('M5.5 20l6.5-5 6.5 5'), P('M5.5 14.5l6.5-5 6.5 5'), P('M5.5 9 12 4l6.5 5', 'a', 'rise')]),
  I('carpool', 'carpool shared ride passengers commute', [R(4.5, 17.5, 3, 4, 1.2), R(16.5, 17.5, 3, 4, 1.2), P('M3 18.5v-4.3l2.2-5.6A2.5 2.5 0 0 1 7.5 7h9a2.5 2.5 0 0 1 2.3 1.6l2.2 5.6v4.3Z'), C(8.5, 11, 1.4, 'a', 'pop'), C(12, 10.6, 1.4, 'a', 'pop:.3'), C(15.5, 11, 1.4, 'a', 'pop:.6'), P('M5.5 14h13'), C(6.5, 16.4, 0.9, 'f'), C(17.5, 16.4, 0.9, 'f')]),
  I('car-sharing', 'car share handover pool vehicle access', [G('slide-r', P('M6 4.5h11l-2-2')), G('slide-l', P('M18 8.5H7l2 2')), P('M2.5 19v-3.3l2.3-3.9a1.5 1.5 0 0 1 1.3-.8h11.8a1.5 1.5 0 0 1 1.3.8l2.3 3.9V19Z'), P('M5 15.5h14'), C(7, 19.5, 1.9, 'a'), C(17, 19.5, 1.9, 'a')]),
  I('keyless-entry', 'keyless unlock door proximity smart entry', [P('M3 20V10l5.5-6H15a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2Z'), P('M5.5 10.5 9 6.5h5.5v4Z', 'd'), R(10, 13.5, 4.5, 1.8, 0.9, 'a', 'pulse'), P('M19 10.5a3 3 0 0 1 0 4.5M20.5 8.5a5.5 5.5 0 0 1 0 8.5', 'd', 'blink')]),
  I('scooter-dock', 'scooter dock station micromobility charging bay', [P('M3 5.5 12 3l9 2.5'), R(4.5, 8, 3.5, 10.5, 1.5), R(10.25, 8, 3.5, 10.5, 1.5), R(16, 8, 3.5, 10.5, 1.5, 'a', 'blink'), C(6.25, 10.5, 0.8, 'f'), C(12, 10.5, 0.8, 'f'), R(2.5, 18.5, 19, 2.5, 1.25)]),
  I('bike-lane', 'cycle lane bicycle path cycling infrastructure', [P('M3.5 21 8 3M20.5 21 16 3'), G('slide-u', P('M12 4.5v5.5M10 6.5 12 4.5l2 2')), C(8.9, 17, 2.1), C(15.1, 17, 2.1), P('M8.9 17l2.3-4h2.6l1.3 4M11.2 13l-.8-1.4', 'a')]),
  // ---- vehicles ----
  I('motorcycle', 'motorbike bike rider two wheeler', [G('slide-r', C(5.5, 16, 3.5), C(18.5, 16, 3.5), C(5.5, 16, 1, 'f'), C(18.5, 16, 1, 'f'), P('M5.5 16 9 11.5h7l2.5 4.5'), P('M8 11.5 10 8.5h5l1.5 3Z', 'a'), P('M16.5 11.5 15 6.5h3'))]),
  I('pickup-truck', 'pickup truck ute bed utility', [G('slide-r', P('M2.5 16v-4h8V7.5A1.5 1.5 0 0 1 12 6h4.3a1.5 1.5 0 0 1 1.3.8L20 11a2 2 0 0 1 1.5 1.9V16Z'), P('M12.5 11V8h3.3l1.6 3Z', 'd'), P('M2.5 12V10.5', 'a'), C(6.5, 17, 2.2, 'a'), C(17, 17, 2.2, 'a'))]),
  I('semi-truck', 'semi tractor trailer lorry haulage hgv', [G('slide-r', R(2.5, 5, 12, 10.5, 1.2), P('M5 8.5h7M5 12h7'), P('M17 7.5V4'), P('M15.5 15.5V8.5a1 1 0 0 1 1-1h2.4a1 1 0 0 1 .9.6l1.7 4v3.4Z', 'a'), C(5.5, 17.5, 1.8), C(9.5, 17.5, 1.8), C(18.5, 17.5, 1.8))]),
  I('refrigerated-truck', 'reefer cold chain refrigerated truck frozen', [R(15.2, 5, 2.6, 3.5, 0.8), R(2.5, 6, 12.5, 10, 1.5), G('spin-slow', X(8.75, 11, 3.2), P('M8.75 8v6M6.15 9.5l5.2 3M6.15 12.5l5.2-3', 'a')), P('M15 16v-5.5h3.5l2.5 3V16Z'), C(6.5, 17.5, 1.8), C(17.5, 17.5, 1.8)]),
  I('tow-truck', 'tow truck recovery breakdown wrecker', [P('M2.5 16v-5.5A1.5 1.5 0 0 1 4 9h3.5l2 3.5H13V16Z'), C(5, 7.2, 1, 'a', 'blink'), P('M13 12.5l5-7'), G('swing', P('M18 5.5v5'), P('M18 10.5a1.6 1.6 0 1 0 1.6 1.6', 'a')), C(5.5, 17, 2), C(11, 17, 2)]),
  I('ambulance', 'ambulance emergency medical paramedic', [R(6.5, 2.5, 3.5, 2, 1, 'a', 'blink'), P('M2.5 16.5V6a1.5 1.5 0 0 1 1.5-1.5h10v4h3.6a1.5 1.5 0 0 1 1.1.5l2.9 3.3a1.5 1.5 0 0 1 .4 1v3.2Z'), P('M15.5 10h2l1.8 2.2h-3.8Z', 'd'), P('M8.25 7.5v5.5M5.5 10.25h5.5', 'a'), C(6.5, 17.5, 2), C(17, 17.5, 2)]),
  I('fire-engine', 'fire truck engine ladder rescue firefighters', [G('slide-u', P('M3 4.5h10.5M3 7.5h10.5M5.5 4.5v3M8.25 4.5v3M11 4.5v3', 'a')), P('M2.5 16.5V10h12V7.5h3a1.5 1.5 0 0 1 1.3.8l2 3.5a2 2 0 0 1 .2.9v3.8Z'), P('M15.8 9.3h1.6l1.4 2.5h-3Z', 'd'), C(6, 17.5, 2), C(17, 17.5, 2)]),
  I('patrol-car', 'police patrol law enforcement emergency car', [R(4.5, 17.5, 3, 4, 1.2), R(16.5, 17.5, 3, 4, 1.2), R(8.3, 3.5, 3.5, 2.6, 1, 'a', 'blink'), R(12.2, 3.5, 3.5, 2.6, 1, 'b', 'blink:.8'), P('M3.5 18.5v-4.6l2-5A2 2 0 0 1 7.3 7.5h9.4a2 2 0 0 1 1.8 1.4l2 5v4.6Z'), P('M5.8 13h12.4'), C(7, 15.8, 1, 'f'), C(17, 15.8, 1, 'f'), P('M10.2 16h3.6')]),
  I('minibus', 'minibus shuttle van people carrier', [G('slide-r', P('M2.5 16.5V8a3 3 0 0 1 3-3h11.5a2 2 0 0 1 1.8 1.1l2.2 4.6v5.8Z'), P('M5 8.5h2.8v3H5ZM10 8.5h2.8v3H10Z', 'd'), P('M15 8.5h3l1.5 3H15Z', 'a'), C(6.5, 17, 2), C(17, 17, 2))]),
  I('electric-bus', 'electric bus e-bus zero emission transit', [P('M2.5 16.5V6.5A1.5 1.5 0 0 1 4 5h14.5A3 3 0 0 1 21.5 8v8.5Z'), P('M19 7.5v4.5M5 8.5h4'), P(bolt(12.5, 7), 'a', 'blink'), C(6.5, 17, 2), C(17, 17, 2), P('M8 5 10 2.5h5', 'd')]),
  I('tram', 'tram streetcar light rail trolley', [P('M3 2.5h18'), P('M9 6 12 3l3 3'), G('sink', R(5, 6, 14, 13, 3), R(7.2, 8.2, 9.6, 4.8, 1, 'a'), C(8.3, 16, 1, 'f'), C(15.7, 16, 1, 'f')), P('M7.5 19.5 5.5 21.5M16.5 19.5l2 2')]),
  I('cable-car', 'gondola cable car aerial tramway ski lift', [P('M2.5 7 21.5 3'), G('swing', P('M12 5v4'), R(6, 9, 12, 11, 2.5), R(8, 11.5, 8, 4, 1, 'a'))]),
  I('autonomous-car', 'self driving autonomous robotaxi driverless', [R(8, 3.5, 8, 17, 3), P('M9.5 8.5h5M9.5 15.5h5'), C(12, 12, 1.6, 'a', 'ping'), P(arc(12, 12, 6.8, 235, 305), 'd', 'blink'), P(arc(12, 12, 6.8, 55, 125), 'd', 'blink'), P(arc(12, 12, 9.3, 240, 300), 'd', 'blink:.4'), P(arc(12, 12, 9.3, 60, 120), 'd', 'blink:.4')]),
  I('lidar-sensor', 'lidar laser sensor scan point cloud', [P('M7 9v7.5a5 2 0 0 0 10 0V9'), E(12, 9, 5, 2, 'a', 'pulse'), P('M7 12.5a5 2 0 0 0 10 0'), P('M2.5 12.5h2.5M19 12.5h2.5M3 8l2.2 1.4M21 8l-2.2 1.4M3 17l2.2-1.4M21 17l-2.2-1.4', 'd', 'blink')]),
  // ---- electric ----
  I('ev-battery-health', 'battery pack state of health ev cells', [R(5, 4.5, 3, 2.5, 0.6), R(16, 4.5, 3, 2.5, 0.6), R(2.5, 7, 19, 12, 2.5), P('M5 13h3l1.5-3 2.5 6 1.5-3h5.5', 'a', 'draw')]),
  I('regen-braking', 'regenerative braking energy recovery wheel', [C(12, 13.5, 6), P('M12.8 10.6 10.4 14h1.9l-.7 2.9 2.5-3.5h-1.9Z', 'a', 'blink'), G('spin-slow', X(12, 13.5, 8.8), P(arc(12, 13.5, 8.8, -105, 105)), P(head(12, 13.5, 8.8, 105)))]),
  I('charging-curve', 'charge curve kw session rate graph', [P('M4 3.5V20h16.5'), P('M5.5 18C8 10 11 7.5 19.5 6.5', 'a', 'draw'), P(bolt(17, 10.5))]),
  I('charge-connectors', 'plug types connector ccs type two socket', [C(7, 9.5, 4.3, 'a'), C(5.6, 8.3, 0.8, 'f'), C(8.4, 8.3, 0.8, 'f'), C(7, 11, 0.8, 'f'), P('M7 13.8V21'), C(17, 8, 3.5), C(15.8, 7.2, 0.8, 'f'), C(18.2, 7.2, 0.8, 'f'), R(14, 12.5, 6, 4, 2), C(15.8, 14.5, 0.8, 'f'), C(18.2, 14.5, 0.8, 'f'), P('M17 16.5V21', 'd', 'slide-d')]),
  I('home-wallbox', 'wallbox home charger garage ev charging', [R(3.5, 3, 10, 13, 2.5), C(8.5, 7.5, 1.6, 'a', 'blink'), P('M6.5 11.5h4'), P('M8.5 16v2a2.5 2.5 0 0 0 5 0v-1a2.5 2.5 0 0 1 5 0v-3'), R(16, 8.5, 5, 5.5, 1.5)]),
  I('range-estimate', 'range anxiety distance remaining reach', [C(12, 12, 9, 'd'), C(12, 12, 5.8, 'd', 'ping'), R(9, 10, 5.5, 4, 1, 'a'), P('M14.5 11.3v1.4')]),
  I('battery-swap', 'battery swap exchange station replace', [R(4.5, 5.5, 2, 1.5, 0.5), R(3, 7, 5, 12, 1.5), R(17.5, 5.5, 2, 1.5, 0.5), R(16, 7, 5, 12, 1.5, 'a'), G('slide-r', P('M10 10.5h4l-1.5-1.5')), G('slide-l', P('M14 15h-4l1.5 1.5'))]),
  I('hydrogen-pump', 'hydrogen fuel cell h2 refuel station', [R(3.5, 3.5, 9.5, 17.5, 2), R(5.5, 5.5, 5.5, 4, 1, 'd'), G('float', C(6.7, 15, 1.6, 'a'), C(10.2, 15, 1.6, 'a')), P('M13 9h2.5a1.5 1.5 0 0 1 1.5 1.5V17a1.5 1.5 0 0 0 3 0V8l-2-2.5')]),
  // ---- roads and urban ----
  I('toll-transponder', 'toll tag transponder windshield etc pass', [P('M3 19 5.5 7a2 2 0 0 1 2-1.5h9a2 2 0 0 1 2 1.5L21 19Z'), R(9.5, 7.5, 5, 3.5, 1, 'a'), P(arc(12, 9.5, 4, 120, 240), 'd', 'blink'), P(arc(12, 9.5, 6.8, 130, 230), 'd', 'blink:.4')]),
  I('congestion-zone', 'congestion charge zone low emission city', [C(12, 12, 9, 'd', 'dash'), P('M6.5 14.5v-2.2l1.4-2.8a1 1 0 0 1 .9-.6h6.4a1 1 0 0 1 .9.6l1.4 2.8v2.2Z', 'a'), C(9.2, 14.8, 1.1, 'f'), C(14.8, 14.8, 1.1, 'f')]),
  I('parking-sensor', 'park assist reverse sensor proximity', [R(2.5, 6, 11, 12, 3), P('M10.5 8.5v7'), P(arc(13.5, 12, 3.2, 50, 130), 'a', 'blink'), P(arc(13.5, 12, 5.8, 55, 125), 'd', 'blink:.4'), P('M21.5 4v16')]),
  I('parking-finder', 'find parking space bay spot available', [P('M3 20.5v-6M9 20.5v-6M15 20.5v-6M21 20.5v-6M3 20.5h18'), G('drop', P('M12 2.5A3.6 3.6 0 0 0 8.4 6.1c0 2.6 3.6 5.6 3.6 5.6s3.6-3 3.6-5.6A3.6 3.6 0 0 0 12 2.5Z', 'a'), C(12, 6.1, 1.1, 'f'))]),
  I('valet-ticket', 'valet parking claim ticket stub', [G('swing', P('M7 7 12 3l5 4v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2Z'), C(12, 6.8, 1.2, 'd'), R(9.5, 10.5, 5, 3.5, 1, 'a'), P('M9.5 17h5'))]),
  I('garage-door', 'garage door roller shutter opener', [P('M3 21V9.5L12 3l9 6.5V21'), G('slide-u', R(6.5, 11, 11, 10, 1, 'a'), P('M6.5 14.3h11M6.5 17.6h11'))]),
  I('car-wash', 'car wash clean valet detailing', [P('M7 3.5c-.8 1-1.2 1.7-1.2 2.3a1.2 1.2 0 0 0 2.4 0c0-.6-.4-1.3-1.2-2.3Z', 'a', 'drop'), P('M12 2.5c-.8 1-1.2 1.7-1.2 2.3a1.2 1.2 0 0 0 2.4 0c0-.6-.4-1.3-1.2-2.3Z', 'a', 'drop:.5'), P('M17 3.5c-.8 1-1.2 1.7-1.2 2.3a1.2 1.2 0 0 0 2.4 0c0-.6-.4-1.3-1.2-2.3Z', 'a', 'drop:1'), P('M2.5 18.5v-3.3l2.3-4.4a1.5 1.5 0 0 1 1.3-.8h11.8a1.5 1.5 0 0 1 1.3.8l2.3 4.4v3.3Z'), P('M5 14.5h14'), R(4.5, 18.5, 3, 2.5, 1), R(16.5, 18.5, 3, 2.5, 1)]),
  I('blind-spot', 'blind spot monitoring lane change warning', [R(3.5, 3.5, 7.5, 17, 3), P('M5 8.5h4.5M5 15.5h4.5'), P('M13 9.5 20.5 14v6.5H13Z', 'a', 'blink')]),
  I('dashcam', 'dash camera recording incident video', [P('M12 2.5v4'), R(4.5, 6.5, 15, 10.5, 3), C(12, 11.75, 3.3, 'a'), C(12, 11.75, 1.2, 'd'), C(17, 9, 0.9, 'f', 'blink'), P('M8 20.5h8')]),
  I('warning-triangle', 'roadside assistance breakdown hazard triangle', [P('M7.5 18.5 5.5 21.5M16.5 18.5l2 3'), P('M10.3 4.5a2 2 0 0 1 3.4 0l7 12.2a1.5 1.5 0 0 1-1.3 2.3H4.6a1.5 1.5 0 0 1-1.3-2.3Z'), P('M12 9.2l3.8 6.3H8.2Z', 'a', 'blink')]),
  I('jumper-cables', 'jump start booster cables flat battery', [R(4, 4.5, 5, 6.5, 1.8), P('M5 4.5V2.5M8 4.5V2.5'), R(15, 4.5, 5, 6.5, 1.8), P('M16 4.5V2.5M19 4.5V2.5'), P('M6.5 11v3c0 4 2.7 6.5 5.5 6.5s5.5-2.5 5.5-6.5v-3'), P(spark(12, 7.5, 2.6), 'a', 'blink')]),
  I('spare-tire', 'spare tyre wheel tread puncture', [G('float', P(gear(12, 12, 9.5, 8, 20)), C(12, 12, 5, 'd'), C(12, 12, 2.2, 'a'), ...[0, 72, 144, 216, 288].map((a) => C(...pp(12, 12, 3.6, a), 0.6, 'f')))]),
  I('car-key-fob', 'car key fob remote smart key', [R(8.5, 2.5, 3, 7, 1), G('tilt', R(5, 8, 10, 13, 3.5), C(10, 12.5, 1.3, 'a'), P('M8.5 16.5h3')), P('M17 9a3 3 0 0 1 2.5 2.5M17 5.5a6.5 6.5 0 0 1 4.5 4.5', 'd', 'blink')]),
  // ---- cockpit and parts ----
  I('steering-wheel', 'steering wheel drive control cockpit', [G('seesaw', C(12, 12, 9), C(12, 12.8, 2.8, 'a'), P('M3.6 11.2c2.8.6 4.6.9 5.6 1.3M20.4 11.2c-2.8.6-4.6.9-5.6 1.3M12 15.6V21'))]),
  I('gear-shift', 'gear stick shifter transmission manual', [R(3.5, 14, 17, 7, 2.5), P('M8 16v3M16 16v3M8 17.5h8'), G('tilt', P('M12 14V8.5'), E(12, 6, 3.5, 3, 'a'))]),
  I('check-engine', 'engine warning light malfunction diagnostics', [P('M7.5 5h6M10.5 5v3'), P('M6 8h9l2.5 2.5H20v6h-2.5L15 19H8l-2-2H3.5v-6H6Z', 'a', 'blink')]),
  I('headlights', 'headlamp beam lights high low beam', [P('M9 5.5C5.5 5.5 3 8.4 3 12s2.5 6.5 6 6.5c1.5 0 2-3 2-6.5S10.5 5.5 9 5.5Z', 'a'), P('M14 7.5l7 1.5M14 11l7 1.5M14 14.5l7 1.5M14 18l7 1.5', 'd', 'blink')]),
  I('windshield-wiper', 'wiper windscreen rain washer', [P('M2.5 19C4.5 8 19.5 8 21.5 19Z'), C(8, 14.5, 0.8, 'f'), C(15.5, 12.5, 0.8, 'f'), G('seesaw', X(12, 18.5, 8), P('M12 18.5 6.5 11.5', 'a')), C(12, 18.5, 1.1, 'f')]),
  I('child-car-seat', 'child seat booster baby isofix harness', [P('M6 3.5h3.5a2 2 0 0 1 2 2V12h5.5a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z'), P('M7.5 7.5 11.5 15.5h3', 'd'), G('float', C(15.5, 7, 2.4, 'a'))]),
  I('roof-rack', 'roof box rack luggage carrier', [G('float', R(6, 3, 10, 3.5, 1.75, 'a')), P('M7.5 6.5v2M14.5 6.5v2'), P('M2.5 17v-3.6l2.4-4.1A1.5 1.5 0 0 1 6.2 8.5h9.6a1.5 1.5 0 0 1 1.3.8l2.3 3.9a2 2 0 0 1 2.1 2V17Z'), C(7, 17.5, 2), C(17, 17.5, 2)]),
  I('trailer-hitch', 'tow hitch ball mount towbar coupling', [R(2.5, 5, 9, 9.5, 2), R(11.5, 10, 6, 3, 1), P('M16.5 10V8.5'), C(16.5, 6.2, 2.4, 'a'), G('swing', P('M8 14.5c0 3.5 2.5 5.5 6 5.5'))]),
  I('van-loading', 'van load cargo rear doors loading bay', [R(6, 4.5, 12, 15.5, 2), P('M6 4.5 3 6v12.5L6 20M18 4.5 21 6v12.5L18 20'), R(9, 12, 6, 5.5, 1, 'a', 'slide-u'), P('M8.5 17.5h7')]),
  I('traffic-cone', 'cone roadworks hazard barrier', [P('M10.2 4h3.6l4.4 14H5.8Z'), P('M8.7 8.8h6.6l1 3.2H7.7Z', 'a', 'blink'), R(3.5, 18, 17, 3, 1.5)]),
  I('traffic-signal', 'signal stop go junction intersection', [R(8, 2.5, 8, 19, 3), C(12, 7, 1.8, 'd'), C(12, 12, 1.8, 'd'), C(12, 17, 1.9, 'a', 'blink'), P('M8 5H5.5l2.5 3M16 5h2.5L16 8M8 10H5.5l2.5 3M16 10h2.5L16 13')]),
  I('seatbelt', 'seat belt buckle safety restraint', [G('slide-r', P('M2.5 10h4M2.5 14h4'), P('M6.5 8.5h4v2h2.5v3H10.5v2h-4Z')), R(13.5, 7.5, 8, 9, 2), R(17.5, 10, 2, 4, 1, 'a')]),
  I('hail-ride', 'hail wave flag down taxi raise hand', [G('wiggle', P('M8.5 20.5c-1.5-1.5-3.5-4.5-4.5-6.3a1.4 1.4 0 0 1 2.3-1.5L8.5 15V6a1.4 1.4 0 0 1 2.8 0v5V4.5a1.4 1.4 0 0 1 2.8 0V11V6a1.4 1.4 0 0 1 2.8 0v5.5V9a1.4 1.4 0 0 1 2.8 0v6c0 3-2.5 5.5-6 5.5Z')), P('M2.5 7.5l2.2 1.3M3.5 3.5l2 2', 'a', 'blink')]),
  I('tachograph', 'tachograph driving hours rest log chart disc', [C(12, 12, 9), G('spin-slow', X(12, 12, 7.2), P(arc(12, 12, 6, 0, 85)), P(arc(12, 12, 7.2, 95, 165)), P(arc(12, 12, 5.4, 175, 290)), P(arc(12, 12, 7, 300, 350))), C(12, 12, 2.8, 'a')]),
  I('car-lift', 'vehicle lift hoist ramp workshop garage', [R(2.5, 3, 2.5, 18, 1), R(19, 3, 2.5, 18, 1), G('slide-u', P('M6.5 10.5V8.3l1.4-2.7a1 1 0 0 1 .9-.6h6.4a1 1 0 0 1 .9.6l1.4 2.7v2.2Z', 'a'), C(9, 11, 1.3, 'f'), C(15, 11, 1.3, 'f'), P('M5 13.5h14'))]),
  I('cargo-bike', 'cargo bike courier last mile e-bike', [C(5, 17, 3), C(19, 17, 3), P('M5 17l3.5-6.5h4M8.5 10.5 7.5 7.5H5.5M12.5 15H16l3 2'), R(11, 8.5, 8, 6.5, 1.5, 'a', 'float')]),
  I('camper-van', 'camper campervan motorhome rv road trip', [P('M5.5 6 7 3h8l1.5 3Z', 'a', 'slide-u'), P('M2.5 16.5V9a3 3 0 0 1 3-3h10a2 2 0 0 1 1.8 1.1L19 10.5h.5a2 2 0 0 1 2 2v4Z'), R(5, 8.5, 4.5, 3, 1, 'd'), P('M12 8.5v8'), C(7, 17, 2), C(17, 17, 2)]),
  I('jerry-can', 'jerry can fuel canister reserve petrol', [P('M6 8 9.5 3.5h8.5a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5H7.5A1.5 1.5 0 0 1 6 20Z'), P('M12 6.3h4.5'), P('M9.3 11l7 6.5M16.3 11l-7 6.5'), G('float', P('M6 8 3.5 5.5l1.3-1.3 2.4 2.3', 'a'))]),
];
