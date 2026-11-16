import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

// top-view aircraft, nose up at scale 1 (span 17.2, length 18); rotated by `deg` clockwise about (cx, cy)
const PL = [[0, -9], [1.4, -7.6], [1.5, -2.6], [8.6, 1.6], [8.6, 3.4], [1.5, 1.4], [1.2, 5.8], [3.4, 7.6], [3.4, 9], [0, 8.2],
  [-3.4, 9], [-3.4, 7.6], [-1.2, 5.8], [-1.5, 1.4], [-8.6, 3.4], [-8.6, 1.6], [-1.5, -2.6], [-1.4, -7.6]];
const plane = (cx, cy, s = 1, deg = 0) => {
  const a = (deg * Math.PI) / 180, c = Math.cos(a), si = Math.sin(a), f = (v) => +v.toFixed(2);
  return PL.map(([x, y], i) => `${i ? 'L' : 'M'}${f(cx + s * (x * c - y * si))} ${f(cy + s * (x * si + y * c))}`).join('') + 'Z';
};
// paper ticket with side notches
const ticket = (y0 = 6, y1 = 18) => P(`M4 ${y0}h16a2 2 0 0 1 2 2v${(y1 - y0) / 2 - 4}a2 2 0 0 0 0 4v${(y1 - y0) / 2 - 4}a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-${(y1 - y0) / 2 - 4}a2 2 0 0 0 0-4V${y0 + 2}a2 2 0 0 1 2-2Z`);
// suitcase on the upper-left, room for a badge bottom-right
const bag = () => [R(3, 7, 14, 11, 2), P('M7.5 7V5h5v2'), P('M3 11.5h14')];
// small plane on the upper-left, room for a badge bottom-right
const flight = () => P(plane(9.5, 9.5, 0.62, 45));
// receipt with a torn bottom
const receipt = (x0, x1, y0, y1, r) => P(`M${x0} ${y0}h${x1 - x0}V${y1}l-1.5-1-1.5 1-1.5-1-1.5 1-1.5-1-1.5 1Z`, r);

export default [
  // ---- air ----
  I('plane-takeoff', 'departure flight airplane takeoff travel', [R(3, 19.2, 9, 2.2, 1.1, 'a'), P('M15 20.3h6'), G('diag', P(plane(12.5, 10.5, 0.82, 45)))]),
  I('plane-landing', 'arrival flight airplane landing travel', [P('M3 20.3h6'), R(12, 19.2, 9, 2.2, 1.1, 'a'), G('diag-in', P(plane(11.5, 10, 0.82, 135)))]),
  I('boarding-pass', 'flight ticket gate airline seat', [ticket(), P('M15 7.5v9'), P('M17.8 10v4M19.8 10v4'), G('slide-r', P(plane(8.6, 12, 0.42, 90), 'a'))]),
  I('mobile-boarding-pass', 'e-ticket phone wallet qr flight', [R(6, 2.5, 12, 19, 2.5), P('M10.5 5h3'), G('pop', R(8.8, 8.5, 6.4, 6.4, 1.2, 'a'), P('M10.8 10.5h2.4v2.4h-2.4Z')), P('M9 18h6')]),
  I('plane-seat', 'airline seat cabin recline aisle', [R(5, 3, 5, 12, 2.2), P('M10 10.5h6'), G('pop', R(5, 13, 13, 4, 2, 'a')), P('M8 17v3.5M15 17v3.5M6 20.8h11')]),
  I('control-tower', 'airport atc tower aviation hub', [C(12, 3.6, 1.1, 'a', 'blink'), P('M12 4.8V6'), P('M5 6h14l-2.4 5H7.4Z'), P('M9 8.5h6'), P('M9.6 11h4.8l1.1 9.5H8.5Z'), P('M4 20.5h16')]),
  I('departures-board', 'flights schedule airport display gates', [R(2.5, 4, 19, 16, 2.5), P('M6 8.5h4M6 12h4M6 15.5h4'), P('M13 8.5h5', 'a', 'blink'), P('M13 12h4M13 15.5h5')]),
  I('flight-delayed', 'late flight delay waiting airline', [flight(), G('pulse', C(17, 17, 4.5, 'a'), P('M17 14.8V17l1.5 1.2'))]),
  I('flight-cancelled', 'cancelled flight grounded airline void', [flight(), G('shake', C(17, 17, 4.5, 'a'), P('M15.4 15.4l3.2 3.2M18.6 15.4l-3.2 3.2'))]),
  I('layover', 'connection stopover transfer flight wait', [P('M4 19.5C4 13 7 10 8.4 10'), P('M15.6 10c1.4 0 4.4 3 4.4 9.5'), C(4, 19.5, 1.1, 'f'), C(20, 19.5, 1.1, 'f'), G('pulse', C(12, 10, 3.6, 'a'), P('M12 8.3V10l1.2 1'))]),
  I('baggage-claim', 'carousel luggage arrivals belt suitcase', [G('slide-r', R(7, 6, 8, 9, 1.8, 'a'), P('M9.5 6V4.2h3V6')), R(2.5, 15, 19, 5, 2.5), C(6, 17.5, 0.9, 'f'), C(12, 17.5, 0.9, 'f'), C(18, 17.5, 0.9, 'f')]),
  I('carry-on', 'cabin bag roller suitcase luggage trolley', [G('slide-r', R(9.5, 2.5, 5, 2.2, 1.1, 'a'), P('M10.5 6V4.7M13.5 6V4.7'), R(6.5, 6, 11, 13, 2.5), P('M10 9.5v6M14 9.5v6'), C(9, 20.5, 1.1, 'f'), C(15, 20.5, 1.1, 'f'))]),
  I('luggage-tag', 'bag label name tag baggage', [G('swing', P('M12 8.2C12 5 14.5 3 17 3.5'), R(6, 6, 12, 15, 2.5), C(12, 9.5, 1.3, 'd'), P('M9 14h6', 'a'), P('M9 17h4'))]),
  I('luggage-trolley', 'airport cart baggage push trolley', [G('slide-r', R(8.5, 9, 6, 6.5, 1.2), R(14.5, 11, 4.5, 4.5, 1, 'a'), P('M3 4h2l2 13h12'), C(9, 19.5, 1.5), C(17, 19.5, 1.5))]),
  I('passport', 'travel document identity border id', [G('float', R(5, 2.5, 14, 19, 2), C(12, 10.5, 3.6, 'a'), P('M8.4 10.5h7.2'), E(12, 10.5, 1.5, 3.6, 'd'), P('M9 17h6'))]),
  I('visa-stamp', 'visa entry approved border passport page', [R(3.5, 3, 13, 18, 2.5), P('M6.5 7h7M6.5 10.5h4'), G('pop', C(15.5, 15.5, 5, 'a'), C(15.5, 15.5, 3.1, 'd'))]),
  I('security-check', 'airport screening scanner gate metal detector', [P('M4 21V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5V21h-3.5V7.5h-9V21Z'), C(12, 5.8, 0.9, 'f', 'blink'), P('M9.5 14h5', 'a', 'scan')]),
  // ---- stay ----
  I('hotel-bed', 'room night stay sleep accommodation', [P('M3.5 4.5V20'), P('M3.5 12H18a3 3 0 0 1 3 3v2.5H3.5Z'), P('M20.5 17.5V20'), R(6, 8.5, 5.5, 3.5, 1.6, 'a', 'float')]),
  I('hotel-building', 'hotel accommodation lodging stay building', [R(5, 3, 14, 18, 2), C(8.5, 7, 0.9, 'f', 'blink'), C(12, 7, 0.9, 'f'), C(15.5, 7, 0.9, 'f', 'blink:.6'), C(8.5, 11, 0.9, 'f'), C(12, 11, 0.9, 'f', 'blink:.3'), C(15.5, 11, 0.9, 'f'), R(10, 15.5, 4, 5.5, 1, 'a')]),
  I('key-card', 'room key hotel access tap door', [R(13.5, 3, 7.5, 18, 2.2), C(17.25, 7, 1.1, 'a', 'blink'), P('M15.5 12h3.5'), G('slide-r', R(3, 11, 10, 7, 1.6), P('M5.5 14.5h3'))]),
  I('do-not-disturb', 'door hanger privacy quiet room sleep', [G('swing', P('M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z'), C(12, 7, 2.2, 'd'), P('M10 13h4l-4 4h4', 'a'))]),
  I('room-service', 'cloche meal hotel dining order', [G('float', C(12, 7.6, 1.3, 'a'), P('M4 17a8 8 0 0 1 16 0Z'), P('M7.5 14a5 5 0 0 1 3-3.5', 'h')), P('M2.5 19.5h19')]),
  I('front-desk', 'reception bell hotel concierge service', [R(10.5, 6, 3, 1.6, 0.8, 'a', 'pop'), P('M12 7.6v1.9'), P('M5 16.5a7 7 0 0 1 14 0Z'), R(3, 17.5, 18, 2.5, 1.25), P('M4 7.5l1.5 1.5M20 7.5l-1.5 1.5', 'd', 'blink')]),
  I('hotel-check-in', 'arrive enter room check in stay', [R(12, 3, 8, 18, 2), C(14.2, 12, 0.9, 'f'), G('slide-r', P('M2.5 12h7', 'a'), P('M6.8 9.2 9.6 12l-2.8 2.8', 'a'))]),
  I('hotel-check-out', 'leave depart room check out stay', [R(4, 3, 8, 18, 2), C(9.8, 12, 0.9, 'f'), G('slide-r', P('M14.5 12h7', 'a'), P('M18.7 9.2 21.5 12l-2.8 2.8', 'a'))]),
  // ---- ground ----
  I('taxi', 'cab ride car hail transport', [R(9.5, 3.2, 5, 2.3, 0.8, 'a', 'blink'), P('M4 16.5V12l2-5a1.5 1.5 0 0 1 1.4-1h9.2a1.5 1.5 0 0 1 1.4 1l2 5v4.5Z'), P('M6 11.5h12'), C(7.5, 14, 1, 'f'), C(16.5, 14, 1, 'f'), R(5, 16.5, 3, 3.5, 1.2), R(16, 16.5, 3, 3.5, 1.2)]),
  I('car-rental', 'hire car rental key vehicle', [P('M2.5 13V9.5l1.5-4a1.2 1.2 0 0 1 1.1-.8h6.8a1.2 1.2 0 0 1 1.1.8l1.5 4V13Z'), P('M4.5 9.5h7'), C(5.2, 11.2, 0.8, 'f'), C(10.8, 11.2, 0.8, 'f'), R(3.3, 13, 2.4, 2.5, 1), R(10.3, 13, 2.4, 2.5, 1), G('pulse', C(17.5, 17.5, 4, 'a'), C(16, 17.5, 1.3, 'd'), P('M17.3 17.5h2.7M19.2 17.5v1.4'))]),
  I('train-ticket', 'rail ticket railway pass commute', [ticket(), P('M15 7.5v9'), P('M17.8 10v4M19.8 10v4'), G('slide-r', R(5.5, 8.5, 6, 7, 1.6, 'a'), P('M7 11h3'))]),
  I('train', 'rail railway intercity commute transport', [R(5, 3, 14, 14, 3.5), R(7.5, 5.5, 9, 5, 1.2, 'a'), C(8.5, 13.7, 1, 'f', 'blink'), C(15.5, 13.7, 1, 'f', 'blink'), P('M8 17l-2 4M16 17l2 4M7.2 19.5h9.6')]),
  I('city-bus', 'bus coach public transport commute', [R(4.5, 3, 15, 15, 3), R(6.5, 6, 11, 5.5, 1, 'a'), P('M4.5 8H3v3M19.5 8H21v3'), C(8, 14.5, 1, 'f', 'blink'), C(16, 14.5, 1, 'f', 'blink'), R(6, 18, 3, 2.5, 1), R(15, 18, 3, 2.5, 1)]),
  I('metro', 'subway underground tube rail transit', [P('M3 21V12a9 9 0 0 1 18 0v9'), G('pulse', R(7.5, 8.5, 9, 10.5, 2.5), R(9, 10.5, 6, 3.5, 1, 'a'), C(9.8, 16.4, 0.8, 'f'), C(14.2, 16.4, 0.8, 'f'))]),
  I('bike-share', 'bicycle cycle commute dock rental', [G('spin', C(6, 16, 3.5, 'd'), P('M6 12.5v7')), G('spin', C(18, 16, 3.5, 'd'), P('M18 12.5v7')), P('M6 16h5l4.5-6.5M6 16l3-6.5h6.5L18 16', 'a'), P('M15.5 9.5 14.9 7.5h2M7.6 8h3')]),
  I('ferry', 'boat ship crossing water transport', [G('float', R(9, 5, 3, 3.5, 0.8), R(6.5, 8.5, 11, 4.5, 1.2, 'a'), P('M9 10.7h6'), P('M3 13h18l-2.3 4.6a2 2 0 0 1-1.8 1.1H7.1a2 2 0 0 1-1.8-1.1Z')), P('M3 21.3c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1')]),
  I('e-scooter', 'scooter electric micromobility ride', [G('slide-r', P('M18 18 15.5 4.5H13'), R(6, 16, 10.5, 2.2, 1.1, 'a'), C(6, 18.5, 2.3, 'd'), C(18, 18.5, 2.3, 'd'))]),
  I('ride-share', 'rideshare pickup car pin ride hailing', [G('float', P('M12 2.5a3.5 3.5 0 0 1 3.5 3.5c0 2.6-3.5 5-3.5 5S8.5 8.6 8.5 6A3.5 3.5 0 0 1 12 2.5Z', 'a'), C(12, 6, 1.2, 'd')), P('M2.5 20v-2.5a1.4 1.4 0 0 1 1-1.3l2.6-.7 2-2.4a2 2 0 0 1 1.6-.6h4.6a2 2 0 0 1 1.6.6l2 2.4 2.6.7a1.4 1.4 0 0 1 1 1.3V20Z'), P('M9 15.2h6'), C(7, 20, 1.6), C(17, 20, 1.6)]),
  I('airport-shuttle', 'van shuttle transfer pickup minibus', [G('slide-r', P('M2.5 17V9a2 2 0 0 1 2-2h11.5l3.2 3.8 1.3.6a1.5 1.5 0 0 1 1 1.4V17Z'), R(4.5, 9, 9.5, 3, 0.8, 'a'), P('M16 9.5l2 2.5'), C(7, 17.5, 1.8), C(17, 17.5, 1.8))]),
  I('toll-gate', 'toll road barrier fee highway gate', [R(3.5, 8, 4, 13, 1.2), C(5.5, 5.2, 1.6, 'a', 'blink'), R(7.5, 10, 13.5, 3, 1.5), P('M11.5 10.3v2.4M16 10.3v2.4'), P('M2.5 21h7')]),
  I('parking-ticket', 'parking fee stub car park garage', [P('M5 4.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2V21l-2-1.3-2.3 1.3-2.2-1.3L9.3 21 7 19.7 5 21Z'), G('pulse', C(12, 9.8, 4.4, 'a'), P('M10.8 12.3V7.3h1.8a1.5 1.5 0 0 1 0 3h-1.8')), P('M8.5 16.5h7')]),
  I('ev-charging', 'electric vehicle charger station plug', [R(4, 3, 10, 18, 2), P('M6.5 6h5'), P('M10 7.8 7 13h2.6l-1 5 3.9-6.5H9.8l1.5-3.7Z', 'a', 'blink'), P('M14 8h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V8.5M20 8.5V6M19 6h2')]),
  I('fuel-expense', 'gas petrol fuel pump fill receipt', [R(4, 4, 9, 16.5, 2), R(6, 6.5, 5, 4, 1, 'a', 'blink'), P('M13 8h2a1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 0 0 3 0V9l-2-2'), P('M3 20.5h11')]),
  I('mileage', 'odometer distance drive reimbursement gauge', [P(arc(12, 13, 8.5, -120, 120)), P('M6 13h1.5M16.5 13H18M12 6.2v1.5'), G('seesaw', X(12, 13, 5), P('M12 13l3.4-3.4', 'a')), C(12, 13, 1.5, 'a'), R(8.5, 17.5, 7, 3, 1)]),
  // ---- planning & policy ----
  I('map-route', 'route directions journey path trip map', [P('M3 6.5 8.5 4l7 2.5L21 4v13.5L15.5 20l-7-2.5L3 20Z'), P('M6.5 15.5c2.5 0 3-5 5.5-5s3.5-3 5.5-3', 'a', 'dash'), C(6.5, 15.5, 1.1, 'f'), C(17.5, 7.5, 1.1, 'f')]),
  I('itinerary', 'trip plan schedule timeline agenda', [R(4, 3, 16, 18, 2.5), P('M8 8v9'), C(8, 8, 1.3, 'a', 'blink'), C(8, 12.5, 1.1, 'f'), C(8, 17, 1.1, 'f'), P('M11 8h5.5M11 12.5h4.5M11 17h5.5')]),
  I('travel-policy', 'travel rules compliance guidelines document', [R(3.5, 2.5, 13, 17, 2.2), P('M6.5 7h7M6.5 10.5h7M6.5 14h3'), G('diag', P(plane(17, 16.5, 0.5, 45), 'a'))]),
  I('travel-booking', 'reservation book trip calendar flight date', [R(3, 4.5, 18, 16, 2.5), P('M3 9.5h18M8 3v3M16 3v3'), G('diag', P(plane(12.5, 15, 0.42, 45), 'a'))]),
  I('per-diem', 'daily allowance stipend travel budget', [R(3, 4, 15, 13.5, 2.2), P('M3 8.5h15M7 2.8v2.6M14 2.8v2.6'), C(7, 12.5, 0.9, 'f'), C(10.5, 12.5, 0.9, 'f'), G('pop', C(17.5, 17, 4.2, 'a'), C(17.5, 17, 2.6, 'd'))]),
  I('trip-budget', 'travel budget spend limit suitcase cost', [...bag(), G('pop', C(17.5, 17, 4.2, 'a'), C(17.5, 17, 2.6, 'd'))]),
  I('trip-cancelled', 'cancel trip void booking refund', [...bag(), G('shake', C(17.5, 17, 4.2, 'a'), P('M16 15.5l3 3M19 15.5l-3 3'))]),
  I('packing-list', 'checklist pack prepare trip list', [R(4.5, 4, 15, 17.5, 2.2), R(9, 2.5, 6, 3, 1, 'a'), P('M7.5 10l1 1 2-2', 'd', 'draw'), P('M12.5 10h4'), P('M7.5 15l1 1 2-2', 'd', 'draw:.5'), P('M12.5 15h4')]),
  I('travel-advisory', 'warning destination risk notice pin', [P('M12 2.5a7 7 0 0 1 7 7c0 5-7 12-7 12S5 14.5 5 9.5a7 7 0 0 1 7-7Z'), G('beat', C(12, 9.5, 3.8, 'a'), P('M12 7.5v2.2'), C(12, 11.5, 0.7, 'f'))]),
  I('out-of-office', 'vacation leave holiday palm away', [P('M11.5 21c.5-4 .8-7 0-10'), G('swing', P('M11.5 11C9 7 5 7 3 9c3-.5 6 .5 8.5 2Z'), P('M11.5 11c2.5-4 6.5-4 8.5-2-3-.5-6 .5-8.5 2Z'), P('M11.5 11c-1-4 1-7 4-8-1.5 2-2.5 5-4 8Z')), P('M5 21a7 3 0 0 1 14 0Z', 'a')]),
  I('trip-insurance', 'trip cover protection policy shield', [P('M12 2.5l7.5 3v5.5c0 4.8-3.2 8.6-7.5 10.3C7.7 19.6 4.5 15.8 4.5 11V5.5Z'), P(plane(12, 11.5, 0.48, 0), 'a', 'float')]),
  I('emergency-contact', 'sos help medical contact assistance', [card(2.5, 4, 17, 12), C(7, 9, 1.8, 'd'), P('M11 8.5h5M11 11.5h3'), P('M16.5 13h3v2.5H22v3h-2.5V21h-3v-2.5H14v-3h2.5Z', 'a', 'beat')]),
  // ---- expenses ----
  I('trip-expense-report', 'expenses claim report summary chart', [R(4, 2.5, 16, 19, 2.5), P('M7.5 7h9'), P('M8.5 17v-3', 'a', 'grow'), P('M12 17v-6', 'a', 'grow:.3'), P('M15.5 17v-4.5', 'a', 'grow:.6')]),
  I('receipt-scan', 'scan receipt capture ocr expense', [P('M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2'), receipt(8, 16, 6, 18.5), P('M10 9.5h4M10 12.5h4'), P('M5.5 12h13', 'a', 'scan')]),
  I('expense-approval', 'approve claim flow manager sign off', [R(3, 4, 7, 6, 1.5), P('M5 7h3'), P('M6.5 10v4.5a2 2 0 0 0 2 2H14', 'd', 'dash'), R(14, 13.5, 7, 6, 1.5, 'a'), P('M15.8 16.5l1.3 1.3 2.3-2.6', 'd', 'draw')]),
  I('expense-payback', 'payback refund wallet expense claim', [G('slide-l', P('M15 4.5H7.5', 'a'), P('M9.6 2.4 7.5 4.5l2.1 2.1', 'a')), R(2.5, 8, 17, 12.5, 2.5), R(14.5, 11.8, 7, 5, 1.6), C(17.6, 14.3, 0.9, 'f')]),
  I('card-abroad', 'foreign card international spend fx', [card(2.5, 4, 17, 12), P('M2.5 8h17'), P('M5.5 12.5h4'), G('pulse', C(18, 17, 4.2, 'a'), P('M14.2 17h7.6'), E(18, 17, 1.8, 4.2, 'd'))]),
  I('currency-booth', 'exchange bureau forex kiosk money change', [R(4.5, 7, 15, 13.5, 1.5), R(7, 10, 10, 6, 1, 'd'), G('slide-r', P('M9 12h5.5l-1.2-1.2')), G('slide-l', P('M15 14H9.5l1.2 1.2')), P('M3 7l2-4h14l2 4Z', 'a')]),
  I('tip-jar', 'tipping gratuity tip service jar', [C(12, 3.8, 1.6, 'a', 'drop'), R(5, 6.5, 14, 2.5, 1.2), R(6, 9, 12, 12, 3), C(12, 15, 2.8, 'd')]),
  I('meal-expense', 'food meal lunch allowance plate cost', [P('M2.8 4v3.5a.7.7 0 0 0 1.4 0V4M3.5 7.5V20'), P('M20.5 20V4c-1.2 1-1.6 3-1.6 5.5h1.6'), C(12, 12, 6.5), G('pop', C(12, 12, 3, 'a'), C(12, 12, 1.6, 'd'))]),
  I('client-dinner', 'entertainment dinner cheers wine hospitality', [G('seesaw', P('M4.5 3h6v3.5a3 3 0 0 1-6 0Z'), P('M7.5 9.5V20M5 20.5h5')), G('seesaw', P('M13.5 3h6v3.5a3 3 0 0 1-6 0Z'), P('M16.5 9.5V20M14 20.5h5')), P(spark(12, 13.5, 2), 'a', 'blink')]),
  I('restaurant', 'dining fork knife eat venue', [G('tilt', P('M6 3v5a2.5 2.5 0 0 0 5 0V3M8.5 3v18')), P('M17.5 3c-2 1.5-3 4-3 8.5h3Z', 'a'), P('M17.5 11.5V21')]),
  I('coffee-to-go', 'takeaway coffee cup cafe break', [G('float', P('M9 4.5l.6-1.5h4.8l.6 1.5'), R(5.5, 4.5, 13, 2.5, 1.2), P('M6.5 7h11l-1.4 12.3a2 2 0 0 1-2 1.7H9.9a2 2 0 0 1-2-1.7Z'), P('M7.3 10.5h9.4l-.4 4H7.7Z', 'a'))]),
  I('split-bill', 'split share cost receipt divide', [G('slide-l', receipt(4, 11, 3, 21), P('M6.5 8h2.5M6.5 11.5h2.5')), G('slide-r', receipt(13, 20, 3, 21, 'a'), P('M15.5 8h2.5M15.5 11.5h2.5'))]),
  I('loyalty-miles', 'frequent flyer points rewards status', [card(2.5, 5, 19, 14), P(star(8, 12, 3.6, 1.6), 'a', 'pop'), P('M14 10h4.5M14 13.5h3')]),
  I('duty-free', 'airport shopping bag tax free retail', [P('M5.5 7.5h13l-.8 12a1.5 1.5 0 0 1-1.5 1.5H7.8a1.5 1.5 0 0 1-1.5-1.5Z'), P('M9 7.5V6a3 3 0 0 1 6 0v1.5'), P(plane(12, 14, 0.45, 0), 'a', 'float')]),
  // ---- on the road ----
  I('time-zones', 'world clock timezone local time offset', [C(8, 9, 5.5), P('M8 6.3V9l1.6 1'), C(16.5, 15.5, 5, 'a'), P('M16.5 15.5l1.6 1'), G('spin', X(16.5, 15.5, 3), P('M16.5 15.5V12.6'))]),
  I('jet-lag', 'tired night sleep timezone rest moon', [P('M13 3a8.5 8.5 0 1 0 8 11.5A7 7 0 0 1 13 3Z'), P('M15.5 5h3l-3 3.5h3', 'a', 'blink')]),
  I('trip-weather', 'forecast sun cloud destination weather', [C(9, 9, 3.6, 'a'), G('spin-slow', X(9, 9, 6.5), P('M9 2.5v1.2M2.5 9h1.2M4.4 4.4l.9.9M13.6 4.4l-.9.9')), P('M8 20a3.5 3.5 0 0 1-.5-7A5 5 0 0 1 17 11.6 4 4 0 0 1 17 20Z')]),
  I('travel-umbrella', 'rain umbrella weather cover protection', [G('swing', P('M3 12A9 9 0 0 1 21 12Q18 10 15 12Q12 10 9 12Q6 10 3 12Z', 'a'), P('M12 11.5v7a2 2 0 0 1-4 0'))]),
  I('travel-compass', 'navigate direction north explore bearing', [C(12, 12, 9), P('M12 3.8V5M12 19v1.2M3.8 12H5M19 12h1.2'), G('seesaw', P('M12 6.5l2 5.5-2 5.5-2-5.5Z', 'a'))]),
  I('globe-trip', 'international travel world flight global', [C(10.5, 13.5, 7), E(10.5, 13.5, 3, 7, 'd'), P('M3.5 13.5h14'), G('diag', P(plane(17.8, 6.2, 0.5, 45)))]),
  I('local-sim', 'esim roaming data mobile abroad', [P('M7 2.5h7l4 4v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2Z'), G('pop', R(8, 10, 8, 8, 1.5, 'a'), P('M12 10v8M8 14h8'))]),
  I('travel-adapter', 'plug power adapter socket charger', [P('M9.5 7V3M14.5 7V3'), R(6, 7, 12, 10, 2.5), P('M12.8 9 10.5 12.3h3l-1.6 3', 'a', 'blink'), P('M12 17v4.5')]),
  I('inflight-wifi', 'wifi plane internet connectivity onboard', [P(arc(12, 13.5, 9, -48, 48), 'd', 'blink:.4'), P(arc(12, 13.5, 5.5, -48, 48), 'd', 'blink'), P(plane(12, 16.5, 0.5, 0), 'b', 'float')]),
  I('lounge-access', 'airport lounge armchair premium rest', [P('M6 12.5V7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5.5Z', 'a', 'breathe'), P('M3 12.5a2 2 0 0 1 4 0V14h10v-1.5a2 2 0 0 1 4 0V18a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18Z'), P('M6 19.5V21M18 19.5V21')]),
  I('travel-backpack', 'backpack rucksack bag daypack trip', [G('float', P('M10 5V3.5h4V5'), R(5.5, 5, 13, 16, 4), P('M5.5 10.5h13'), R(8, 13, 8, 5.5, 1.5, 'a'))]),
  I('hotel-rating', 'stars review hotel quality rating', [P(star(7, 4.8, 2, 0.9), 'a', 'pop'), P(star(12, 4.8, 2, 0.9), 'a', 'pop:.3'), P(star(17, 4.8, 2, 0.9), 'a', 'pop:.6'), R(6, 9, 12, 12, 1.8), C(9.5, 13, 0.9, 'f'), C(14.5, 13, 0.9, 'f'), R(10.5, 16.5, 3, 4.5, 0.8, 'd')]),
  I('conference-pass', 'event badge lanyard summit attendee', [G('swing', P('M7 2.5l5 6 5-6'), R(6, 8.5, 12, 13, 2.2), C(12, 13, 2, 'a'), P('M9 17.5h6'))]),
];
