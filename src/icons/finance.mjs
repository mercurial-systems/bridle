import { R, C, E, P, G, I, X, arc, wedge } from '../dsl.mjs';

const dollar = 'M14.5 9c-.4-1-1.4-1.6-2.5-1.6-1.5 0-2.6.8-2.6 2 0 2.8 5.2 1.6 5.2 4.4 0 1.2-1.1 2.1-2.6 2.1-1.2 0-2.2-.6-2.6-1.6M12 6v1.4M12 16.3V18';
const doc = 'M7 3h7.5L19.5 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z';
const stack = (cx, top, h, w = 6) => [
  P(`M${cx - w} ${top}v${h}c0 1.4 2.7 2.5 ${w} 2.5s${w}-1.1 ${w}-2.5V${top}Z`),
  E(cx, top, w, 2.5),
  P(`M${cx - w} ${top + h / 2}c0 1.4 2.7 2.5 ${w} 2.5s${w}-1.1 ${w}-2.5`),
];

export default [
  I('coins', 'money cash savings currency stack', [...stack(9, 11, 6.5), G('flip', C(16, 8, 5, 'a'), C(16, 8, 3.2, 'd'))]),
  I('banknote', 'cash bill money payment', [G('float', R(2.5, 6, 19, 12, 2), C(12, 12, 2.8, 'a'), C(6, 12, 0.9, 'f'), C(18, 12, 0.9, 'f'), P('M4.5 8h2M17.5 16h2', 'h'))]),
  I('currency', 'dollar money coin price usd', [G('flip', C(12, 12, 9, 'a'), P(dollar))]),
  I('percent', 'rate interest discount ratio apr', [C(12, 12, 9), P('M8.5 15.5l7-7'), C(9, 9, 1.5, 'a', 'pulse'), C(15, 15, 1.5, 'a', 'pulse:.5')]),
  I('calculator', 'accounting math compute numbers', [R(5, 2.5, 14, 19, 2.5), R(7.5, 5, 9, 4, 1, 'a', 'breathe'), ...[8.8, 12, 15.2].flatMap((x, i) => [C(x, 12.5, 0.95, 'f'), C(x, 15.5, 0.95, 'f'), C(x, 18.5, 0.95, 'f', i === 2 ? 'blink' : undefined)])]),
  I('piggy-bank', 'savings save deposit money box', [C(11.8, 3.6, 2, 'a', 'drop'), E(11, 13.5, 7.5, 5.8), R(17.5, 11.5, 3.5, 4, 1.5), P('M6.5 8.8l1-3 2.6 2.4Z'), P('M7 18.5V21M14.5 18.5V21M10 9.5h3.5'), C(14.5, 11.5, 0.8, 'f')]),
  I('vault', 'safe security storage reserve locker', [R(3, 3.5, 18, 16, 2.5), C(12, 11.5, 4.6, 'a'), G('spin', P('M12 7.3v1.8M12 13.9v1.8M7.8 11.5h1.8M14.4 11.5h1.8')), C(12, 11.5, 1.3, 'f'), P('M6.5 19.5V21M17.5 19.5V21')]),
  I('wallet', 'purse money funds balance', [R(6, 3, 10, 6, 1, 'a', 'slide-u'), R(3.5, 7.5, 17, 12.5, 2.5), R(14.5, 11.5, 7, 4.5, 1.5, 'a'), C(17, 13.75, 0.9, 'f')]),
  I('candles', 'candlestick chart trading market ohlc', [P('M7 3.5V7M7 15v5.5M12 6v4M12 16v4M17 2.5V5M17 13v3.5'), R(5.5, 7, 3, 8, 0.8, 'b', 'grow'), R(10.5, 10, 3, 6, 0.8, 'a', 'grow:.4'), R(15.5, 5, 3, 8, 0.8, 'b', 'grow:.8')]),
  I('allocation', 'portfolio donut split diversify', [C(12, 12, 8.5), P(wedge(12, 12, 8.5, 0, 120), 'a', 'pop'), C(12, 12, 3.5, 'd')]),
  I('stock-up', 'market gain bull rise trading', [R(3, 3, 18, 18, 3), P('M7 15l3.5-3.5 2.5 2.5L17 9', 'd', 'draw'), P('M13.5 9H17v3.5', 'a')]),
  I('stock-down', 'market loss bear fall trading', [R(3, 3, 18, 18, 3), P('M7 9l3.5 3.5 2.5-2.5L17 15', 'd', 'draw'), P('M13.5 15H17v-3.5', 'a')]),
  I('exchange', 'currency convert fx forex swap', [P('M15 4h2a3 3 0 0 1 3 3v1.5M18.5 7l1.5 1.5L21.5 7M9 20H7a3 3 0 0 1-3-3v-1.5M5.5 17 4 15.5 2.5 17'), G('spin', C(8, 8, 4.5, 'a'), C(16, 16, 4.5))]),
  I('savings-jar', 'budget jar save fund goal', [P('M6.5 7h11v11a3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3Z'), R(7.5, 3.5, 9, 3.5, 1, 'a'), C(12, 14.5, 2.4, 'a', 'rise'), P('M9 18h6')]),
  I('tax', 'document percent fiscal return irs', [P(doc), P('M14 3v5h5.5'), P('M9 17l6-6'), C(9.5, 11.5, 1.2, 'a', 'pulse'), C(14.5, 16.5, 1.2, 'a', 'pulse:.5')]),
  I('interest', 'rate growth earn apy compound', [C(10, 14, 6.5, 'a'), P('M7.7 16.3l4.6-4.6'), C(8.2, 12.2, 0.9, 'f'), C(11.8, 15.8, 0.9, 'f'), G('slide-u', P('M18 10V3M15.5 5.5 18 3l2.5 2.5'))]),
  I('loan', 'lend credit borrow hand coin', [P('M2.5 13.5h3.2l3.5 2h4.3a1.5 1.5 0 0 1 0 3H10M13.5 18.5h3l3.6-2.8a1.5 1.5 0 0 1 2 2.2L17.5 21.5H9l-3-1.5H2.5'), G('float', C(14, 7.5, 4, 'a'), P('M14 5.6v3.8'))]),
  I('insurance', 'umbrella protection cover risk', [G('swing', P('M3 12.5a9 9 0 0 1 18 0c-1.2-1-3.3-1-4.5 0-1.2-1-3.3-1-4.5 0-1.2-1-3.3-1-4.5 0-1.2-1-3.3-1-4.5 0Z', 'a'), P('M12 12.5V19a2 2 0 0 1-4 0'))]),
  I('gold', 'bars bullion reserve commodity precious', [P('M3 20l1.5-5h6l1.5 5Z', 'a'), P('M12 20l1.5-5h6l1.5 5Z', 'a'), G('float', P('M7.5 13.5 9 8.5h6l1.5 5Z', 'a'), P('M10 10.5h3', 'h'))]),
  I('money-bag', 'fund capital wealth sack treasury', [P('M8.5 3.5h7l-2 3h-3Z'), P('M10.5 6.5h3c3.5 2 6.5 6 6.5 9.5a4.5 4.5 0 0 1-4.5 4.5h-7.5A4.5 4.5 0 0 1 4 16c0-3.5 3-7.5 6.5-9.5Z', 'a', 'pop'), P('M9.5 6.5h5'), P('M14 12c-.3-.7-1-1.1-1.9-1.1-1.1 0-1.9.6-1.9 1.4 0 2 3.9 1.2 3.9 3.2 0 .8-.8 1.5-2 1.5-.9 0-1.6-.4-1.9-1.1M12 9.8v1.1M12 16.9V18')]),
  I('cash-flow', 'cycle circulation revenue recurring', [C(12, 12, 3.5, 'a', 'pulse'), G('spin', X(12, 12, 9), P(arc(12, 12, 8, 30, 160)), P('M17.3 20.3 14.7 19.5l1.6-2.2'), P(arc(12, 12, 8, 210, 340)), P('M7.7 6.7 9.3 4.5 6.7 3.7'))]),
  I('credit-score', 'gauge rating meter health', [P('M3.5 16a8.5 8.5 0 0 1 17 0Z'), P(arc(12, 16, 6, -70, -20), 'a'), G('seesaw', X(12, 16, 6.5), P('M12 16l3.5-4.5')), C(12, 16, 1.4, 'f'), P('M4 19.5h16')]),
  I('investment', 'grow plant fund return seed', [P('M12 21v-7M7 21h10'), P('M12 14c0-3-2-5-6-5 0 3 2 5 6 5Z'), P('M12 12c0-3 2-5 6-5 0 3-2 5-6 5Z'), C(12, 5, 2.5, 'a', 'float')]),
  I('ledger', 'accounting books records journal', [R(4, 3, 16, 18, 2), P('M9 3v18M12 8h5M12 11.5h5M12 15h3', 'd', 'draw'), R(5.5, 6, 2, 2, 0.5, 'a')]),
  I('dividend', 'payout share profit distribution', [P(wedge(10, 12, 7.5, 60, 360)), P(wedge(12, 10.5, 7.5, 0, 60), 'a', 'diag'), C(19, 18, 2.5, 'a', 'drop')]),
];
