import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

const n = (v) => +v.toFixed(2);
const pt = (cx, cy, r, deg) => [n(cx + r * Math.sin((deg * Math.PI) / 180)), n(cy - r * Math.cos((deg * Math.PI) / 180))];
// closed ring segment between radii ro and ri (degrees, 0 = up, clockwise)
const ring = (cx, cy, ro, ri, a0, a1) => {
  const big = a1 - a0 > 180 ? 1 : 0;
  const [x0, y0] = pt(cx, cy, ro, a0), [x1, y1] = pt(cx, cy, ro, a1), [x2, y2] = pt(cx, cy, ri, a1), [x3, y3] = pt(cx, cy, ri, a0);
  return `M${x0} ${y0}A${ro} ${ro} 0 ${big} 1 ${x1} ${y1}L${x2} ${y2}A${ri} ${ri} 0 ${big} 0 ${x3} ${y3}Z`;
};
// glyph coin: a face-on coin with a typographic currency mark
const coinOf = (glyph) => [G('flip', C(12, 12, 9, 'a'), P(glyph)), P(arc(12, 12, 7, 220, 300), 'h')];
// document top-left with a status badge bottom-right
const docS = () => [P('M6 2.5h7l4 4v6.8c-2.7.5-4.6 2.8-4.6 5.5 0 .6.1 1.2.3 1.7H6a2 2 0 0 1-2-2v-14a2 2 0 0 1 2-2Z'), P('M13 2.5v4h4'), P('M7 9h5M7 12h4')];
const badge = (an, ...els) => G(an, C(18, 17, 4.2, 'a'), ...els);
const doc = 'M7 2.5h7.5L19.5 7.5v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2Z';
const receipt = 'M5 2.5h14v18.5l-2.33-1.4-2.33 1.4-2.34-1.4-2.33 1.4-2.34-1.4L5 21Z';
const smallReceipt = 'M4 2.5h11v10.8c-1.6 1-2.6 2.7-2.6 4.7l-.2.1-1.84-1.1-1.83 1.1-1.83-1.1-1.84 1.1L4 17Z';
const calendar = () => [R(3, 4.5, 18, 16.5, 2.5), P('M3 9.5h18'), P('M8 2.5v4M16 2.5v4')];
const sign = (...els) => G('swing', C(12, 3.5, 1, 'f'), P('M11.3 4.2 6 8.5M12.7 4.2 18 8.5'), R(3, 8.5, 18, 10.5, 2.4), ...els);

export default [
  // ---------------- markets ----------------
  I('bull-market', 'bull horns rally uptrend market rise', [P('M8.5 9.5h7l-.9 8a2.6 2.6 0 0 1-5.2 0Z'), G('slide-u', P('M9 11C5.5 11.4 3 8.5 3.5 4.5c1.2 2 2.8 3 5.5 3.2Z', 'a'), P('M15 11c3.5.4 6-2.5 5.5-6.5-1.2 2-2.8 3-5.5 3.2Z', 'a')), C(10.8, 16.8, 0.8, 'f'), C(13.2, 16.8, 0.8, 'f')]),
  I('bear-market', 'bear claws selloff downtrend market fall', [G('slide-d', P('M4.5 3.5Q9.5 8.5 9 20 8 11.5 3.3 4.8Z'), P('M9.5 3.5Q14.5 8.5 14 20 13 11.5 8.3 4.8Z', 'a'), P('M14.5 3.5Q19.5 8.5 19 20 18 11.5 13.3 4.8Z'))]),
  I('stock-ticker', 'ticker tape quotes symbol price feed', [R(2.5, 6.5, 19, 11, 2.5), P('M5 13.5 7 10.5l2 3Z', 'a', 'blink'), G('slide-l', P('M11.5 10.5h6.5M11.5 13.5h4')), P('M5 20.5h2M10 20.5h4M17 20.5h2', 'd', 'blink:.4')]),
  I('market-open', 'trading hours session open sign live', [sign(C(7.5, 13.75, 1.7, 'a', 'pulse'), P('M11 12.25h6.5M11 15.25h4.5'))]),
  I('market-closed', 'trading hours session closed sign after-hours', [C(12, 3.5, 1, 'f'), P('M11.3 4.2 6 8.5M12.7 4.2 18 8.5'), R(3, 8.5, 18, 10.5, 2.4), P('M8.6 11.4a2.5 2.5 0 1 0 1.6 4.5 2.1 2.1 0 0 1-1.6-4.5Z', 'a', 'breathe'), P('M12.5 13.75h5')]),
  I('ipo-bell', 'ipo listing bell opening debut public offering', [G('ring', C(11, 4.6, 1.1, 'f'), P('M6 16v-4.3a5 5 0 0 1 10 0V16l1.4 2H4.6Z'), C(11, 19.6, 1.2, 'f')), P(spark(19, 6, 2.6), 'a', 'pulse'), P('M3 21.5h16')]),
  I('bond-certificate', 'bond certificate fixed income debt security coupon', [R(2.5, 4, 19, 13, 2.2), P('M6 8h9M6 11h6'), P('M14.5 17.5 13.5 21.5l2.5-1.3 2.5 1.3-1-4Z', 'a'), G('pulse', C(16, 15, 3, 'a'), C(16, 15, 1.3, 'f'))]),
  I('etf-basket', 'etf fund basket index bundle holdings', [R(7.2, 6, 2.6, 6, 0.6, 'b', 'grow'), R(10.7, 3, 2.6, 9, 0.6, 'a', 'grow:.3'), R(14.2, 5, 2.6, 7, 0.6, 'b', 'grow:.6'), P('M3 10.5h18l-2 9a2 2 0 0 1-2 1.5H7a2 2 0 0 1-2-1.5Z'), P('M8.5 13.5v4.5M12 13.5v4.5M15.5 13.5v4.5')]),
  I('market-index', 'index benchmark composite average market', [P('M3.5 3.5v17h17'), P('M7 16l3-2.5 2.5 1.5 3-4 3 1.5'), P('M7 12l3-3 2.5 1.5 3-4.5 3 1', 'a', 'draw'), C(18.5, 7, 1.3, 'f', 'pulse')]),
  I('call-option', 'call option derivative payoff upside strike', [R(3, 3, 18, 18, 3), P('M6 14h12'), P('M6 16.5h6.5l5.5-8', 'a', 'draw'), P('M15 8.5h3v3', 'a'), C(12.5, 16.5, 1, 'f')]),
  I('put-option', 'put option derivative payoff downside hedge', [R(3, 3, 18, 18, 3), P('M6 14h12'), P('M6 8.5l5.5 8H18', 'a', 'draw'), P('M6 11.5v-3h3', 'a'), C(11.5, 16.5, 1, 'f')]),
  I('futures-contract', 'futures forward contract delivery derivative expiry', [...docS(), badge('slide-r', P('M15.8 17h4.2M18.5 15.3l1.7 1.7-1.7 1.7'))]),
  I('forex-pair', 'forex fx currency pair conversion trading', [G('slide-r', C(5.5, 7.5, 3, 'a'), P('M10.5 7.5h10M18 5l2.5 2.5L18 10')), G('slide-l', C(18.5, 16.5, 3), P('M13.5 16.5h-10M6 14l-2.5 2.5L6 19'))]),
  I('oil-barrel', 'oil barrel commodity crude energy drum', [P('M6.5 3.5h11c.9 2.8 1.3 5.6 1.3 8.5s-.4 5.7-1.3 8.5h-11c-.9-2.8-1.3-5.6-1.3-8.5s.4-5.7 1.3-8.5Z'), P('M5.4 7.5h13.2M5.4 16.5h13.2'), P('M12 9c1.4 1.7 2.2 2.9 2.2 3.8a2.2 2.2 0 0 1-4.4 0c0-.9.8-2.1 2.2-3.8Z', 'a', 'pulse')]),
  I('real-estate', 'property real estate house appreciation reit', [P('M3.5 11 12 4l8.5 7v8.5A1.5 1.5 0 0 1 19 21H5a1.5 1.5 0 0 1-1.5-1.5Z'), P('M7 17.5l3-3 2.5 2 4-4.5', 'a', 'draw'), P('M14 12h2.5v2.5', 'a')]),
  I('watchlist', 'watchlist favorites tracked symbols list follow', [R(3, 4, 13.5, 17, 2.5), P('M6 9.5h6M6 13h6M6 16.5h4'), P('M14.5 2.5h6.5v10l-3.25-2.3-3.25 2.3Z', 'a', 'slide-d')]),
  I('price-level', 'price level threshold trigger target crossing', [R(3, 3, 18, 18, 3), P('M5.5 10h2M9.5 10h2M13.5 10h2M17.5 10h1'), P('M6 17l3.5-3 2.5 2L18 7.5', 'a', 'draw'), C(15.7, 10, 1.3, 'f', 'pulse')]),
  I('portfolio-rebalance', 'rebalance portfolio weights adjust allocation', [R(4, 8, 6, 13, 1.5, 'b', 'grow'), R(14, 12, 6, 9, 1.5, 'a', 'grow:.6'), G('slide-r', P('M7 4.5h10M15 2.5l2 2-2 2'))]),
  I('risk-meter', 'risk meter exposure gauge danger level', [P('M3 17a9 9 0 0 1 18 0Z'), P(ring(12, 17, 9, 5.8, 48, 90), 'a', 'blink'), G('seesaw', X(12, 17, 7), P('M12 17l4.5-5')), C(12, 17, 1.4, 'f'), P('M3 20.5h18')]),
  I('volatility', 'volatility vix swings turbulence variance', [R(2.5, 4, 19, 16, 3), P('M5 12Q6 10.5 7 12T9 12Q10.2 9.5 11.5 12T14 12Q15.3 6 16.5 12T19 12', 'a', 'wave')]),
  I('dividend-calendar', 'dividend payout date schedule ex-date income', [...calendar(), G('flip', C(12, 15.25, 3.2, 'a'), P('M12 13.6v3.3'))]),
  I('broker', 'broker trader agent dealer brokerage', [C(9, 7, 3.2), P('M3 20.5c0-3.6 2.7-6 6-6s6 2.4 6 6Z'), badge('pulse', P('M16.8 18.8v-4.6M15.6 15.4l1.2-1.2 1.2 1.2M19.2 14.2v4.6M18 17.6l1.2 1.2 1.2-1.2'))]),
  I('stock-exchange', 'exchange bourse trading floor building nyse', [P('M3 8.5 12 3.5l9 5Z', 'a'), R(3.5, 8.5, 17, 2, 0.5), R(5, 12, 2.6, 6.5, 0.6, 'b', 'grow'), R(9.1, 12, 2.6, 6.5, 0.6, 'b', 'grow:.25'), R(13.2, 12, 2.6, 6.5, 0.6, 'b', 'grow:.5'), R(17.3, 12, 2.6, 6.5, 0.6, 'b', 'grow:.75'), R(2.5, 19.5, 19, 2, 0.8)]),
  I('market-spread', 'spread bid ask quote liquidity gap', [R(3, 4, 12, 5.5, 1.5, 'a'), R(3, 14.5, 12, 5.5, 1.5), G('pulse', P('M19 8.5v7M17.3 10.2 19 8.5l1.7 1.7M17.3 13.8 19 15.5l1.7-1.7'))]),

  // ---------------- charts ----------------
  I('area-chart', 'area chart filled trend volume series', [P('M3.5 3.5v17h17'), P('M6.5 19.5V14l4-4 3.5 3 4.5-6 1.5 1.5v11Z', 'b', 'grow'), P('M6.5 14l4-4 3.5 3 4.5-6 1.5 1.5', 'a', 'draw')]),
  I('scatter-plot', 'scatter plot correlation points distribution', [P('M3.5 3.5v17h17'), C(7.5, 16, 1.3, 'f'), C(10, 12, 1.3, 'f'), C(12.5, 14.5, 1.3, 'f'), C(15, 9.5, 1.3, 'f'), C(8, 8, 1.3, 'f'), C(17.5, 13, 1.3, 'f'), C(18, 6.5, 1.9, 'a', 'pulse')]),
  I('heatmap', 'heatmap grid matrix intensity density', [
    R(3, 3, 5, 5, 1.2, 'a', 'breathe'), R(9.5, 3, 5, 5, 1.2), R(16, 3, 5, 5, 1.2),
    R(3, 9.5, 5, 5, 1.2), R(9.5, 9.5, 5, 5, 1.2, 'a', 'breathe:.6'), R(16, 9.5, 5, 5, 1.2),
    R(3, 16, 5, 5, 1.2), R(9.5, 16, 5, 5, 1.2), R(16, 16, 5, 5, 1.2, 'a', 'breathe:1.2')]),
  I('waterfall-chart', 'waterfall bridge chart variance walk', [R(3, 11, 3.4, 9, 0.8), R(7.3, 6, 3.4, 5, 0.8, 'a', 'grow'), R(11.6, 6, 3.4, 4, 0.8, 'b', 'grow:.4'), R(15.9, 10, 3.4, 10, 0.8, 'a'), P('M3 21.5h17')]),
  I('gauge-chart', 'gauge dial speedometer meter performance', [P(arc(12, 12, 8.5, -135, 135)), P(arc(12, 12, 8.5, -135, 50), 'a', 'draw'), R(8.5, 16.5, 7, 4, 1.5), P('M10.5 18.5h3'), G('seesaw', X(12, 12, 6), P('M12 12l3.5-4')), C(12, 12, 1.5, 'f')]),
  I('radar-chart', 'radar spider chart web comparison metrics', [P(poly(12, 12, 9.5, 6)), P('M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5'), P('M12 6.5l5.2 2.8-1.3 5.5-3.9 2.7-4.4-4.2.9-3.6Z', 'a', 'pulse')]),
  I('funnel-chart', 'funnel chart conversion stages pipeline drop-off', [R(3, 3.5, 18, 4.5, 1.5), R(5.5, 9.75, 13, 4.5, 1.5), R(8.5, 16, 7, 4.5, 1.5, 'a', 'pulse')]),
  I('histogram', 'histogram distribution frequency bins bell', [R(3.5, 16, 2.8, 4, 0.6, 'b', 'grow'), R(6.9, 11, 2.8, 9, 0.6, 'b', 'grow:.2'), R(10.3, 5, 2.8, 15, 0.6, 'a', 'grow:.4'), R(13.7, 10, 2.8, 10, 0.6, 'b', 'grow:.6'), R(17.1, 15, 2.8, 5, 0.6, 'b', 'grow:.8'), P('M2.5 21.5h19')]),
  I('multi-line-chart', 'multi line chart series compare trends', [R(2.5, 3.5, 19, 17, 3), P('M5.5 16.5l3-2 3 1 3-2.5 4 1.5'), P('M5.5 10l3 1.5 3-3.5 3 1.5 4-2.5'), P('M5.5 14l3-3.5 3 2.5 3-5.5 4 2.5', 'a', 'draw')]),
  I('bubble-chart', 'bubble chart size weight cluster plot', [C(8, 14.5, 5), C(16, 7.5, 3.8, 'a', 'pulse'), C(17.5, 17, 2.3, 'b', 'float'), C(5.5, 5.5, 1.4, 'f')]),
  I('treemap', 'treemap blocks hierarchy proportion area', [R(3, 3, 10, 11, 2, 'a', 'breathe'), R(3, 15.5, 10, 5.5, 2), R(14.5, 3, 6.5, 7.5, 2), R(14.5, 12, 6.5, 9, 2)]),
  I('sparkline', 'sparkline mini trend inline chart micro', [R(2.5, 6, 19, 12, 6), P('M5.5 13.5l2-1.5 2 1.5 2.5-4 2 5 2.5-6 2 3', 'a', 'draw'), C(18.5, 11.5, 1.1, 'f', 'pulse')]),
  I('candle-bullish', 'candle bullish green up ohlc rally', [P('M10 3v4M10 17v4'), R(6, 7, 8, 10, 1.5, 'a', 'grow'), G('slide-u', P('M18.5 11V4M16.3 6.2 18.5 4l2.2 2.2'))]),
  I('candle-bearish', 'candle bearish red down ohlc selloff', [P('M10 3v4M10 17v4'), R(6, 7, 8, 10, 1.5, 'b', 'grow'), G('slide-d', P('M18.5 13v7M16.3 17.8l2.2 2.2 2.2-2.2', 'a'))]),
  I('depth-chart', 'depth chart order book bids asks liquidity', [P('M3 20V8h3v3h3v3h2.5v6Z', 'b', 'grow'), P('M12.5 20v-6H15v-3h3V8h3v12Z', 'a', 'grow:.5'), P('M2.5 21.5h19')]),
  I('pie-split', 'pie split exploded share segments breakdown', [P(wedge(13.1, 11.35, 7.8, 0, 120), 'a', 'diag'), P(wedge(12, 13.3, 7.8, 120, 240)), P(wedge(10.9, 11.35, 7.8, 240, 360))]),
  I('donut-progress', 'donut progress completion ring percent goal', [P(ring(12, 12, 9, 5.5, 255, 360)), P(ring(12, 12, 9, 5.5, 0, 250), 'a', 'breathe'), C(12, 12, 1.2, 'f')]),
  I('kpi-tile', 'kpi tile metric scorecard number stat', [R(3, 4, 18, 16, 3), P('M6.5 8.5h5'), R(6.5, 12, 7.5, 4, 2, 'a'), G('slide-u', P('M17.5 17v-5M15.7 13.8l1.8-1.8 1.8 1.8'))]),
  I('target-vs-actual', 'target actual plan variance benchmark goal', [R(5, 10, 4.5, 10, 1, 'b', 'grow'), R(14.5, 7, 4.5, 13, 1, 'a', 'grow:.4'), P('M3.5 6.5h7.5M13 10h7.5'), P('M2.5 21.5h19')]),
  I('stacked-bar', 'stacked bar chart segments composition columns', [
    G('grow', R(4, 13, 4, 7.5, 1), R(4, 8.5, 4, 3.3, 1, 'a')),
    G('grow:.3', R(10, 10, 4, 10.5, 1), R(10, 3.5, 4, 5.3, 1, 'a')),
    G('grow:.6', R(16, 15, 4, 5.5, 1), R(16, 10.5, 4, 3.3, 1, 'a'))]),
  I('bar-chart-horizontal', 'horizontal bar chart ranking rows compare', [P('M3 3v18'), R(5, 4, 12, 4, 1.2, 'b', 'grow-x'), R(5, 10, 16, 4, 1.2, 'a', 'grow-x:.3'), R(5, 16, 8, 4, 1.2, 'b', 'grow-x:.6')]),
  I('moving-average', 'moving average sma ema smoothing trend', [P('M6 8v2M6 17v2M12 5.5v2M12 15.5v2M18 4v2M18 13v2'), R(4.3, 10, 3.4, 7, 0.9), R(10.3, 7.5, 3.4, 8, 0.9), R(16.3, 6, 3.4, 7, 0.9), P('M3 18.5c4 0 6-4 9.5-6s5.5-4.5 8.5-5', 'a', 'draw')]),

  // ---------------- accounting ----------------
  I('balance-sheet', 'balance sheet assets liabilities equity statement', [R(3.5, 3, 17, 18, 2.5), P('M3.5 7.5h17M12 10v9'), P('M6 11h3.5M6 14h3.5M14.5 11h3.5M14.5 14h3.5'), P('M6 17.5h3.5M14.5 17.5h3.5', 'a', 'draw')]),
  I('profit-loss', 'profit loss p&l income statement earnings', [P(doc), P('M14.5 2.5v5h5'), P('M7.5 11h3M9 9.5v3M13 11h3'), P('M7.5 15h3M13 15h3'), R(7.5, 17.5, 9, 1.8, 0.9, 'a', 'grow-x')]),
  I('cash-book', 'cash book cashbook accounts register money', [R(4, 3, 15.5, 18, 2), P('M7.5 3v18'), G('flip', C(13.5, 11, 3.6, 'a'), P('M13.5 9.4v3.2')), P('M10.5 17h6')]),
  I('expense-report', 'expense report spending cost claim outflow', [P(receipt), P('M8 7h8M8 10.5h5'), G('slide-d', P('M15 12v4.5M13 14.8l2 2 2-2', 'a'))]),
  I('reimbursement', 'reimbursement refund expense claim payback', [P(smallReceipt), P('M6.5 6.5h6M6.5 10h4'), badge('slide-l', P('M20 17.5h-4M17.6 15.8l-1.7 1.7 1.7 1.7'))]),
  I('payroll', 'payroll salary wages staff pay run', [G('float', R(2.5, 5.5, 19, 13, 2.5), C(12, 10.5, 2.2, 'a'), P('M8.2 16.2a3.8 3.8 0 0 1 7.6 0', 'a'), C(5.5, 12, 0.9, 'f'), C(18.5, 12, 0.9, 'f'))]),
  I('accounts-payable', 'accounts payable bills owed outgoing ap', [...docS(), badge('diag', P('M16.3 18.7l3.2-3.2M17 15.5h2.5V18'))]),
  I('accounts-receivable', 'accounts receivable incoming owed to us ar', [...docS(), badge('pulse', P('M19.7 15.3l-3.2 3.2M16.5 16v2.5H19'))]),
  I('audit-ledger', 'audit review inspect ledger examine books', [R(3, 3, 13, 17, 2), P('M6 7.5h7M6 11h4.5'), G('wiggle', C(15.5, 15, 4, 'a'), P('M18.5 18l3 3'), P('M13.8 13.8a2 2 0 0 1 1.8-.8', 'h'))]),
  I('journal-entry', 'journal entry posting bookkeeping record debit credit', [R(3, 3, 13, 18, 2), P('M6.5 3v18'), P('M9 8h4.5M9 11.5h3'), G('wiggle', P('M19.5 7.5l2 2-8 8-2.8.8.8-2.8Z', 'a'))]),
  I('depreciation', 'depreciation asset value decline write-down curve', [R(4, 8, 4, 12, 1), R(10, 11.5, 4, 8.5, 1), R(16, 14.5, 4, 5.5, 1), P('M3 4c4.5.3 9.5 3 18 7', 'a', 'draw'), P('M2.5 21.5h19')]),
  I('budget-pie', 'budget plan allocation limit spend categories', [C(12, 12, 7), P(wedge(12, 12, 7, 0, 110), 'a', 'pop'), G('spin-slow', ...[0, 45, 90, 135, 180, 225, 270, 315].map((a) => P(arc(12, 12, 9.6, a + 8, a + 30))))]),
  I('forecast', 'forecast projection prediction outlook estimate', [P('M13 11 21 4.5V15Z', 'b', 'breathe'), P('M3 18l4-3 3 1.5L13 11', 'a', 'draw'), P('M15 10l1.3-.7M18 8.5l1.3-.7'), C(13, 11, 1.3, 'f'), P('M2.5 21.5h19')]),
  I('invoice-paid', 'invoice paid settled stamp cleared bill', [P(doc), P('M14.5 2.5v5h5'), P('M8 9.5h4M8 12.5h3'), G('pop', P('M9.5 15.3 18.6 13l1.3 5.3-9.1 2.3Z', 'a'), P('M12.4 17.6l1.4 1.1 2.6-2.8', 'd', 'draw'))]),
  I('tax-return', 'tax return filing refund irs annual form', [...docS(), badge('pulse', P('M16.4 18.6l3.2-3.2'), C(16.6, 15.6, 0.7, 'f'), C(19.4, 18.4, 0.7, 'f'))]),
  I('fiscal-year', 'fiscal year financial calendar annual period', [...calendar(), G('spin', X(12, 15.25, 3.8), P(arc(12, 15.25, 3.2, 30, 300), 'a'), P('M10.6 12.4 9.2 12.2l.3-1.4', 'a'))]),
  I('cost-center', 'cost center department allocation unit org', [G('flip', C(12, 6, 3.5, 'a'), P('M12 4.5v3')), P('M12 9.5v2.5M5.5 12h13M5.5 12v3M12 12v3M18.5 12v3'), R(3, 15, 5, 5, 1.5), R(9.5, 15, 5, 5, 1.5), R(16, 15, 5, 5, 1.5)]),
  I('vat-receipt', 'vat sales tax gst receipt levy', [P(smallReceipt), P('M6.5 6.5h6M6.5 10h4'), badge('pulse', P('M16.4 18.6l3.2-3.2'), C(16.6, 15.6, 0.7, 'f'), C(19.4, 18.4, 0.7, 'f'))]),
  I('payslip', 'payslip pay stub salary slip earnings statement', [R(4, 2.5, 16, 19, 2.5), C(9, 7.5, 2, 'a', 'pulse'), P('M6 12.5a3 3 0 0 1 6 0'), P('M14 6.5h3M14 9.5h3'), P('M7 15.5h10M7 18.5h6', 'd', 'draw')]),
  I('trial-balance', 'trial balance debits credits equal reconcile', [R(3.5, 6, 6.5, 14, 1.5, 'b', 'grow'), R(14, 6, 6.5, 14, 1.5, 'a', 'grow'), P('M11 11h2M11 14h2', 'd', 'blink'), P('M2.5 21.5h19')]),
  I('petty-cash', 'petty cash box float till small expenses', [R(6, 4, 12, 7, 1.2, 'a', 'slide-u'), R(3, 9, 18, 11.5, 2.2), P('M3 13h18'), P('M10 16.5h4')]),
  I('break-even', 'break even point cost revenue crossover profit', [P('M3 3v18h18'), P('M11.84 12.75 20 6v9Z', 'b', 'breathe'), P('M5.5 11l14.5 4'), P('M5.5 18 20 6', 'a', 'draw'), C(11.84, 12.75, 1.6, 'f', 'pulse')]),
  I('register-till', 'cash register till checkout sales drawer', [R(12.5, 3, 7.5, 4.5, 1.2, 'a', 'blink'), P('M16.25 7.5v2'), P('M5 9.5h15l1.5 7h-18Z'), C(8, 13, 0.9, 'f'), C(11, 13, 0.9, 'f'), C(14, 13, 0.9, 'f'), G('slide-d', R(2.5, 16.5, 19, 4.5, 1.5), P('M10 18.75h4'))]),
  I('earnings-report', 'earnings report quarterly results eps statement', [P(doc), P('M14.5 2.5v5h5'), P('M8 7h3.5'), P('M8.5 18v-3.5M15.5 18v-5'), R(10.8, 10.5, 2.4, 7.5, 0.6, 'a', 'grow')]),

  // ---------------- currencies ----------------
  I('coin-euro', 'euro eur currency coin europe money', coinOf('M15.6 8.6A4.4 4.4 0 1 0 15.6 15.4M7.5 10.8h5.5M7.5 13.2h5.5')),
  I('coin-pound', 'pound sterling gbp currency coin uk', coinOf('M15 9.2a2.8 2.8 0 0 0-5.4.9v3.6c0 1.4-.6 2.3-1.6 3h7.6M8.6 12.6h4.8')),
  I('coin-yen', 'yen yuan jpy cny currency coin', coinOf('M8.6 7l3.4 5 3.4-5M12 12v5M9.2 12.6h5.6M9.2 15.1h5.6')),
  I('coin-rupee', 'rupee inr currency coin india', coinOf('M8.6 7.4h6.8M8.6 10.2h6.8M10 7.4c2.4 0 3.7 1.1 3.7 2.8S12.4 13 10 13H9.2l5 4.6')),
  I('coin-franc', 'franc chf currency coin swiss', coinOf('M10.2 17V7.5h5.2M10.2 11.7h4.3M8.4 14.6h4.8')),
  I('coin-won', 'won krw currency coin korea', coinOf('M7.6 8l1.9 8.5 2.5-6.6 2.5 6.6L16.4 8M7.2 11.6h9.6')),
  I('coin-lira', 'lira try currency coin turkey', coinOf('M10.4 6.8v10.4c3 0 5.4-2 5.4-4.8M8.4 11.6l5-2M8.4 14.3l5-2')),
  I('coin-ruble', 'ruble rub currency coin russia', coinOf('M10.2 17V7.4h3a2.5 2.5 0 0 1 0 5H8.4M8.4 14.8h5')),
  I('coin-naira', 'naira ngn currency coin nigeria', coinOf('M9.2 17V7.4l5.6 9.6V7.4M7.4 10.8h9.2M7.4 13.4h9.2')),
  I('currency-basket', 'currencies multi currency basket fx reserves', [C(15.5, 9, 5.5), P('M13.5 7.5h4M13.5 10.5h4'), G('float', C(9, 15, 5.8, 'a'), C(9, 15, 3.6, 'd'))]),
];
