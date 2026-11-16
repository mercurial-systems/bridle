import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

// teardrop centred on cx, top at cy-2.2, bottom at cy+3.1
const drop = (cx, cy) => `M${cx} ${cy - 2.2}c1.3 1.6 1.9 2.6 1.9 3.4a1.9 1.9 0 0 1-3.8 0c0-.8.6-1.8 1.9-3.4Z`;
// head-and-shoulders bust standing on y=base
const bust = (cx, base, role = 'b', an) => G(an, C(cx, base - 5.3, 1.6, role), P(`M${cx - 2.4} ${base}v-.5a2.4 2.4 0 0 1 4.8 0v.5Z`, role));
const squiggle = (x, y) => `M${x} ${y}c.8-1.8 1.8-1.8 2.1-.3s1.1 1.2 2-.2 1.5-1.1 2 0 1.1.6 3.4-.2`;

export default [
  // ---- cash & liquidity ----
  I('cash-position', 'cash position balance today treasury where', [R(2.5, 10, 19, 10.5, 2.2), C(12, 16, 2.3, 'd'), P('M5 13h1.5M17.5 18h1.5'), G('float', P('M12 12.5c-2.3-2.7-3.5-4.5-3.5-6.2a3.5 3.5 0 0 1 7 0c0 1.7-1.2 3.5-3.5 6.2Z', 'a'), C(12, 6.3, 1, 'f'))]),
  I('cash-pooling', 'cash pooling concentration combine accounts treasury', [P('M3 13h18c0 4.4-4 8-9 8s-9-3.6-9-8Z'), P('M6.5 16.5c1.8.9 3.7.9 5.5 0s3.7-.9 5.5 0'), P(drop(6, 5), 'b', 'drop'), P(drop(12, 4.4), 'a', 'drop:.4'), P(drop(18, 5), 'b', 'drop:.8')]),
  I('sweep-account', 'sweep zero balance account broom treasury', [G('wiggle', P('M19.5 2.5 14 11'), P('M11.4 10.2 15.6 12.8 13.2 19.6 6.4 15.3Z', 'a'), P('M11.4 13.4 9.6 16.4M13.4 14.6 11.8 18')), C(3.8, 19.5, 1.1, 'f'), C(7.3, 20.6, 1, 'f')]),
  I('intercompany-loan', 'intercompany loan subsidiary entity lend group', [R(3, 11, 6, 10, 1.2), R(15, 8, 6, 13, 1.2), P('M6 14v4M18 11v7'), G('slide-r', P('M5.5 8.5C7 5 12 3.5 16.5 5', 'a'), P('M14 3.3l2.5 1.7-1.6 2.6', 'a'))]),
  I('liquidity-ladder', 'liquidity ladder tenor buckets maturity cash', [P('M3 21v-4h5.5v-4.5H14V8h7v13Z'), P('M5 19h1.5M10.5 15h1.5'), P(drop(17.5, 4.4), 'a', 'drop')]),
  I('runway-countdown', 'runway months left cash runway startup', [P('M4 21 9.5 3h5L20 21Z'), G('slide-d', P('M12 5.5v2M12 10v3M12 15.5v3.5', 'a')), P('M7 19h1.5M15.5 19H17')]),
  I('cash-burn', 'cash burn monthly spend startup net burn', [R(2.5, 9, 14, 10, 2), C(9.5, 14, 2.3, 'd'), P('M5 11.5h1.5M12.5 16.5H14'), P('M17.5 3c2.2 2.4 3 4.2 3 5.8a3 3 0 0 1-6 0c0-1.3.7-2.2 1.5-3 .1 1 .6 1.5 1.1 1.6-.2-1.5 0-2.9.4-4.4Z', 'a', 'flicker')]),
  I('cash-outlook', 'cash forecast outlook projection crystal ball', [C(12, 10, 7.5), P('M8 12.5l2.3-2 2 1.5 3.5-3.5', 'a', 'draw'), P('M7.6 7.4a5 5 0 0 1 3-2.6', 'h'), P('M6.5 21l1.5-3.5h8l1.5 3.5Z')]),
  I('liquidity-buffer', 'liquidity buffer minimum cash reserve tank', [P('M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13Z'), E(12, 5.5, 7, 2.5), P('M5 11c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v7.5c0 1.4-3.1 2.5-7 2.5s-7-1.1-7-2.5Z', 'a', 'breathe'), P('M2.5 15.5h1.5M20 15.5h1.5')]),
  I('trapped-cash', 'trapped cash restricted blocked jurisdiction cage', [P('M4 9a8 6 0 0 1 16 0v11H4Z'), G('shake', C(12, 14.5, 3.5, 'a')), P('M8 4.2V20M12 3.2V20M16 4.2V20'), P('M3 20.5h18')]),
  I('cash-repatriation', 'repatriation bring home cash foreign return', [C(18.5, 5.5, 3), P('M15.5 5.5h6'), P('M2.5 12 8 7l5.5 5v8.5h-11Z'), P('M8 20.5v-4'), G('slide-l', P('M19 9c0 4.5-1.5 7-4 7', 'a'), P('M17 13.6 14.8 16l2.4 2.2', 'a'))]),
  I('cash-cushion', 'cash cushion safety buffer reserve pillow', [P('M4 16.5c0-2.2.4-3.6 1.6-4.4 3.2.8 9.6.8 12.8 0 1.2.8 1.6 2.2 1.6 4.4s-.4 3.6-1.6 4.4c-3.2-.8-9.6-.8-12.8 0-1.2-.8-1.6-2.2-1.6-4.4Z'), G('sink', C(12, 7.5, 4.3, 'a'), C(12, 7.5, 2.4, 'd'))]),
  I('cash-visibility', 'cash visibility bank balances monitor binoculars', [R(4, 4, 5, 8, 1.5), R(15, 4, 5, 8, 1.5), P('M9 8h6'), C(7, 15.5, 4.5), C(17, 15.5, 4.5), C(7, 15.5, 2, 'a', 'pulse'), C(17, 15.5, 2, 'a', 'pulse:.4')]),
  I('cash-conversion-cycle', 'cash conversion cycle inventory receivables payables', [G('spin-slow', X(12, 12.5, 8), P(arc(12, 12.5, 8, 22, 98)), P(arc(12, 12.5, 8, 142, 218)), P(arc(12, 12.5, 8, 262, 338))), C(12, 4.5, 2.3, 'a'), C(18.93, 16.5, 2.3), C(5.07, 16.5, 2.3)]),
  I('working-capital', 'working capital operations conveyor flow', [R(2.5, 15, 19, 5, 2.5), C(5, 17.5, 1, 'f'), C(12, 17.5, 1, 'f'), C(19, 17.5, 1, 'f'), G('slide-r', C(8, 10, 3.5, 'a'), C(8, 10, 1.8, 'd')), R(13.5, 7, 6, 6, 1.2)]),
  I('payment-factory', 'payment factory centralised payments hub treasury', [P('M3 21V13l5 3v-3l5 3v-3l5 3V8h3v13Z'), P('M6.5 18.5h2M11.5 18.5h2'), C(19.5, 4.5, 2, 'a', 'rise')]),
  I('payment-netting', 'netting intercompany offset net settlement overlap', [C(8.5, 12, 6), C(15.5, 12, 6), P('M12 7.1a6 6 0 0 1 0 9.8 6 6 0 0 1 0-9.8Z', 'a', 'pulse')]),
  I('spend-tap', 'spend control cost tap outflow throttle', [P('M3 9h10a5 5 0 0 1 5 5v1h-4v-1a1 1 0 0 0-1-1H3Z'), P('M8 9V5.5M5.5 5.5h5'), C(16, 19.5, 1.8, 'a', 'drop')]),

  // ---- planning & FP&A ----
  I('scenario-branches', 'scenario planning base bull bear case', [C(4.5, 12, 2.3), P('M6.8 12H10c2 0 2.5-1 3-2.5S14.5 6 16.5 6M10 12h6.5M10 12c2 0 2.5 1 3 2.5S14.5 18 16.5 18'), C(18.5, 6, 2), C(18.5, 12, 2, 'a', 'pulse'), C(18.5, 18, 2)]),
  I('tornado-chart', 'sensitivity tornado chart drivers impact', [G('squash', R(3.5, 4, 17, 3, 1, 'a')), R(5.5, 8.5, 13, 3, 1), R(7.5, 13, 9, 3, 1), R(9.5, 17.5, 5, 3, 1), P('M12 2.5v19')]),
  I('driver-model', 'driver based model gears inputs outputs fpa', [G('spin', P(gear(8, 15.5, 5, 3.6, 8)), C(8, 15.5, 1.3, 'd')), G('spin-rev', P(gear(15.8, 7.8, 5.8, 4.3, 10), 'a'), C(15.8, 7.8, 1.6, 'd'))]),
  I('budget-variance', 'budget variance favourable unfavourable over under', [P('M2.5 12h19'), R(4, 5, 3, 7, 1, 'b', 'grow'), R(8.5, 12, 3, 4.5, 1, 'a'), R(13, 7.5, 3, 4.5, 1, 'b', 'grow:.4'), R(17.5, 12, 3, 7.5, 1, 'a')]),
  I('variance-delta', 'variance delta change difference plus minus', [P('M12 3.5 21 19.5H3Z', 'a', 'pop'), P('M12 9.5v5M9.5 12h5M9.5 16.5h5')]),
  I('rolling-forecast', 'rolling forecast reforecast months roll forward', [R(3.5, 13, 3.5, 7, 1), R(8, 13, 3.5, 7, 1), R(12.5, 13, 3.5, 7, 1), R(17, 13, 3.5, 7, 1, 'a', 'pop'), G('slide-r', P('M5 10c1.5-4 4-5.5 7-5.5s5.5 1.5 7 5.5'), P('M16.4 8.8 19 10l1-2.7'))]),
  I('headcount-plan', 'headcount plan hiring roster team fte', [bust(5.5, 11), bust(12, 11), bust(18.5, 11), bust(8.75, 20), bust(15.25, 20, 'a', 'pop')]),
  I('opex-capex', 'opex capex split spend asset expense', [cube(7, 13.5, 4.5, ['a', 'b', 'b'], 'float'), P('M14 4h6v16l-1.5-1-1.5 1-1.5-1-1.5 1Z'), P('M16 8h2M16 11.5h2')]),
  I('unit-economics', 'unit economics ltv cac payback per unit', [cube(12, 12.5, 5, ['a', 'b', 'b']), P('M3 3.5l3.5 3.5M6.5 4.5V7H4'), G('diag-in', P('M17 17.5l4 4M21 17v4.5h-4.5', 'a'))]),
  I('cohort-revenue', 'cohort revenue layers retention stacked', [P('M3 21v-8c5-1 10-5 18-9v17Z', 'a', 'grow'), P('M3 21v-5c5-.5 10-3 18-7v12Z'), P('M3 21v-2.5c5-.3 10-1.5 18-4.5v7Z')]),
  I('arr-ring', 'arr annual recurring revenue twelve months', [C(12, 12, 9), ...Array.from({ length: 12 }, (_, i) => C(+(12 + 6.6 * Math.sin((i * Math.PI) / 6)).toFixed(2), +(12 - 6.6 * Math.cos((i * Math.PI) / 6)).toFixed(2), 0.75, 'f')), P(arc(12, 12, 3.6, 0, 270), 'a', 'draw')]),
  I('mrr-growth', 'mrr monthly recurring revenue growth subscription', [P(arc(12, 13, 7.5, 40, 320)), P('M5.1 7.9 7.2 8.3l.4-2.2'), G('slide-u', P('M12 19V4.5M8.8 7.7 12 4.5l3.2 3.2', 'a'))]),
  I('leaky-bucket', 'churn leaky bucket lost revenue retention', [P('M4.5 4h15l-1.6 12.5a2 2 0 0 1-2 1.7H8.1a2 2 0 0 1-2-1.7Z'), P('M6 8h12'), C(9.5, 13.5, 0.9, 'f'), C(14.5, 13.5, 0.9, 'f'), C(9.5, 20.6, 1.1, 'a', 'drop'), C(14.5, 20.6, 1.1, 'a', 'drop:.7')]),
  I('gross-margin', 'gross margin profit share revenue cogs', [R(4.5, 3, 10, 18, 2), R(4.5, 3, 10, 6.5, 2, 'a', 'breathe'), P('M4.5 9.5h10M7 13h5M7 16.5h5'), P('M17.5 3.5h2v6h-2M19.5 6.5H21')]),
  I('ebitda-bridge', 'ebitda bridge adjustments walk reconciliation', [R(3, 4, 11, 3, 1), R(14, 8.5, 4, 3, 1, 'a', 'grow-x'), R(18, 13, 3, 3, 1, 'a'), R(3, 17.5, 18, 3, 1), P('M14 7v1.5M18 11.5V13')]),
  I('breakeven-point', 'breakeven point revenue cost crossover profit', [P('M3 3v18h18'), P('M11.5 12.9 20.5 5.4v9.2Z', 'a'), P('M4.5 19.2 20.5 5.4M4.5 11.3l16 3.5'), C(11.5, 12.9, 1.8, 'b', 'pulse')]),
  I('zero-based-budget', 'zero based budget build from zero', [E(8.75, 12, 6, 8.5), E(8.75, 12, 2.6, 5, 'd'), G('slide-u', P('M18.5 20V7M15.5 10l3-3 3 3', 'a'))]),
  I('plan-reconcile', 'top down bottom up planning reconcile meet', [R(3, 10.5, 18, 3, 1.5), G('slide-d', P('M8 3v5M5.5 5.5 8 8l2.5-2.5', 'a')), G('slide-u', P('M16 21v-5M13.5 18.5 16 16l2.5 2.5'))]),
  I('cost-allocation', 'cost allocation spread prism split departments', [P('M2.5 13 8 11.5'), P('M11 4.5l6.5 12.5h-13Z'), P('M15 11l6.5-3M15.8 13l5.7 1.5'), P('M16.5 15.5l4.5 4.5', 'a', 'draw')]),
  I('fpa-model', 'fpa model spreadsheet formula financial model', [R(3, 3, 18, 3, 1.5, 'a'), P('M7 3.8v1.4', 'd', 'blink'), R(3, 7.5, 18, 13.5, 2), P('M3 12h18M3 16.5h18M9 7.5V21M15 7.5V21')]),
  I('hurdle-rate', 'hurdle rate return threshold irr minimum', [R(4.5, 10, 15, 3, 1), P('M6 13v8M18 13v8M4 21h4M16 21h4'), P('M2.5 17C5.5 1.5 18.5 1.5 21 15.5M18.6 14.2l2.4 1.3 1-2.5', 'a', 'draw')]),
  I('npv-discount', 'npv present value discount time value money', [C(18, 10, 3.6), C(18, 10, 2, 'd'), C(11, 10, 2.7), C(5.5, 10, 1.9, 'a', 'pulse'), G('slide-l', P('M20 17H5M7.5 14.5 5 17l2.5 2.5'))]),
  I('payback-period', 'payback period return boomerang recover investment', [G('tilt', P('M4 20c1-6 3-11 7-16.5l3 1C11.5 9 10.3 12.5 10 16c3.5-1.2 7-1.2 10.5.5l-1 3C14.5 18.5 9.5 19 4 20Z', 'a')), P('M15 4a6.5 6.5 0 0 1 5.8 7M19 9.5l1.8 1.5 1.4-1.9')]),
  I('accruals', 'accruals accrue tally period earned', [R(3, 3, 18, 18, 3), P('M7.5 7.5v9M10.5 7.5v9M13.5 7.5v9M16.5 7.5v9'), P('M5.5 15 18.5 9', 'a', 'draw')]),
  I('prepaid-expense', 'prepaid expense paid ahead amortise period', [R(9, 3.5, 12.5, 15, 2), P('M9 8h12.5M12.5 2.5v2.5M18 2.5v2.5'), C(15, 11.5, 0.9, 'f'), C(18.5, 11.5, 0.9, 'f'), C(18.5, 15, 0.9, 'f'), G('pop', C(7, 15.5, 4.8, 'a'), C(7, 15.5, 2.6, 'd'))]),
  I('month-end-close', 'month end close period close books calendar', [P('M5.5 4.5h13A2.5 2.5 0 0 1 21 7v8.5L15.5 21h-10A2.5 2.5 0 0 1 3 18.5V7a2.5 2.5 0 0 1 2.5-2.5Z'), P('M8 3v3M16 3v3M3 9.5h18'), C(7.5, 13, 0.9, 'f'), C(12, 13, 0.9, 'f'), C(16.5, 13, 0.9, 'f'), C(7.5, 17, 0.9, 'f'), P('M21 15.5h-3.5a2 2 0 0 0-2 2V21Z', 'a', 'pop')]),
  I('group-consolidation', 'consolidation group entities subsidiaries combine', [R(3, 3.5, 6, 4, 1), R(3, 10, 6, 4, 1), R(3, 16.5, 6, 4, 1), P('M11 4c1.2 0 1.5.6 1.5 2v3.5c0 1.5.5 2.5 1.5 2.5-1 0-1.5 1-1.5 2.5V18c0 1.4-.3 2-1.5 2'), R(15.5, 7, 5.5, 10, 1.5, 'a', 'pop')]),
  I('aged-receivables', 'aging receivables overdue old invoices dso', [R(4, 3, 16, 18, 2), P('M7.5 9h4M7.5 13h5M7.5 17h9'), P('M15 3.5a4.5 4.5 0 0 0 4.5 4.5M17.2 3.5a2.3 2.3 0 0 0 2.3 2.3M19.5 3.5l-4 4'), G('swing', P('M16 7.5v3.5'), C(16, 12.2, 1.2, 'a'))]),

  // ---- capital, board & fundraising ----
  I('board-deck', 'board deck presentation slides meeting', [R(7, 3, 14, 10, 1.5), G('float', R(3, 7, 14, 10, 1.5), P('M6.5 14v-2M9.5 14v-4M12.5 14v-3', 'a')), P('M10 17v3.5M7 21h6')]),
  I('investor-update', 'investor update letter newsletter shareholders', [G('slide-u', R(6, 3, 12, 12, 1.5), P('M8.5 9.5l2.5-2 2 1.5 3-3', 'a')), R(3, 10, 18, 11, 2), P('M3.5 11l8.5 5.5 8.5-5.5')]),
  I('cap-table', 'cap table ownership shareholders equity table', [R(3, 4, 18, 16, 2.5), P('M3 9.4h18M3 14.6h18'), C(6.2, 6.7, 1, 'f'), C(6.2, 12, 1, 'f'), C(6.2, 17.3, 1, 'f'), R(9, 5.7, 9, 2, 1, 'a', 'grow-x'), R(9, 11, 6, 2, 1, 'a', 'grow-x:.3'), R(9, 16.3, 3.5, 2, 1, 'a', 'grow-x:.6')]),
  I('equity-dilution', 'dilution new shares ownership slice equity', [P(wedge(11, 13, 8, 70, 360)), P('M11 13l-6.9 4M11 13l3 7.4'), P(wedge(13, 11, 8, 0, 70), 'a', 'diag')]),
  I('option-pool', 'option pool esop employee equity grants', [P('M3 16.5c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0V21H3Z', 'a', 'breathe'), G('float', P('M8 14.5V6a2.5 2.5 0 0 1 5 0M15 14.5V6a2.5 2.5 0 0 1 5 0'), P('M8 9h7M8 12.5h7'))]),
  I('safe-note', 'safe note convertible future equity agreement', [R(3, 2.5, 11, 12, 2), P('M6 6.5h5M6 9.5h5'), G('slide-r', P('M8.5 14.5v3a2 2 0 0 0 2 2h2.5M11.5 17.5l1.8 2-1.8 2')), C(17.5, 16.5, 4), P(wedge(17.5, 16.5, 4, 0, 100), 'a', 'pop')]),
  I('term-sheet', 'term sheet terms deal investment agreement', [R(4.5, 2.5, 15, 19, 2), P('M7.5 7h3M13.5 7h3M7.5 10.5h3M13.5 10.5h3M7.5 14h3M13.5 14h3'), P(squiggle(7.5, 18.3), 'a', 'draw')]),
  I('valuation-range', 'valuation range low high bounds value', [P('M3.5 5v14M20.5 5v14'), P('M6 10l2 2-2 2M18 10l-2 2 2 2'), P('M9.5 9h5l2 2.5-4.5 5.5-4.5-5.5Z', 'a', 'pulse'), P('M9.5 11.5h7')]),
  I('funding-rounds', 'funding rounds seed series raise ladder', [C(5, 18, 2), C(10, 13, 2.8), C(17, 6, 4, 'a', 'pulse'), P('M6.4 16.6 8 15M12 11l2.2-2.2')]),
  I('data-room', 'data room due diligence documents virtual', [R(5, 2.5, 14, 19, 2), P('M5 15h14M10.5 5.5h3M10.5 18.5h3'), G('slide-r', R(7, 9, 14, 6, 1.5, 'a'), P('M12.5 12h3'))]),
  I('due-diligence', 'due diligence review inspect checklist audit', [R(3, 3, 13, 17, 2), P('M6 7.5h7M6 11h4'), C(15, 15, 4.5), P('M13 15l1.5 1.5 2.8-3', 'a', 'draw'), P('M18.3 18.3 21 21')]),
  I('capital-stack', 'capital stack senior debt mezzanine equity priority', [R(3, 16, 18, 4.5, 1.5), R(5.5, 10.5, 13, 4.5, 1.5), R(8, 5, 8, 4.5, 1.5, 'a', 'float')]),
  I('rating-outlook', 'credit rating outlook agency grade upgrade', [C(10, 13, 7.5), P('M7 16.5l3-7 3 7M8.2 14h3.6'), G('diag', P('M15.5 7.5l5-5M16.5 2.5h4v4', 'a'))]),

  // ---- FX, rates & risk ----
  I('fx-exposure', 'fx exposure currency risk foreign globe', [P('M12 3a9 9 0 0 1 0 18Z', 'a', 'breathe'), C(12, 12, 9), E(12, 12, 4, 9, 'd'), P('M3 12h18')]),
  I('hedge-shield', 'hedge hedging protect volatility shield risk', [P('M13 3l7 2.5v5.5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V5.5Z'), P('M2.5 12l1.2-3 1.4 6 1.2-3H17', 'a', 'draw')]),
  I('fx-forward', 'fx forward contract lock rate future', [P('M5 11V8a3.5 3.5 0 0 1 7 0v3'), R(3.5, 11, 10, 9, 2), P('M8.5 14.5v2'), G('slide-r', P('M15.5 11l3 3.5-3 3.5M18.5 11l3 3.5-3 3.5', 'a'))]),
  I('rate-swap', 'interest rate swap fixed floating exchange', [G('slide-r', P('M4 8h15M16 5l3 3-3 3')), G('slide-l', P('M20 16c-1.25-1.4-2.5-1.4-3.75 0s-2.5 1.4-3.75 0-2.5-1.4-3.75 0-2.5 1.4-3.75 0M7.5 13.5 5 16l2.5 2.5', 'a'))]),
  I('counterparty-limit', 'counterparty limit exposure cap credit bank', [C(5, 12, 2.8), C(19, 12, 2.8), P('M7.8 12h8.4'), R(10.5, 6, 3, 12, 1.5, 'a', 'pulse')]),
  I('yield-curve', 'yield curve term structure rates maturity', [P('M3.5 3v17.5H21'), P('M5.5 17C8 10 12 7.5 20 6', 'a', 'draw'), C(5.5, 17, 1, 'f'), C(9.6, 10.8, 1, 'f'), C(14.6, 7.6, 1, 'f'), C(20, 6, 1, 'f')]),
  I('bond-duration', 'duration interest rate sensitivity bond cash flows', [G('seesaw', X(14, 18.5, 11), R(4, 13.5, 2.5, 5, 0.8), R(8, 13.5, 2.5, 5, 0.8), R(12, 13.5, 2.5, 5, 0.8), R(16, 7, 3.5, 11.5, 0.8, 'a'), P('M3 18.5h18')), P('M14 18.5l2.5 3h-5Z')]),
  I('maturity-wall', 'debt maturity wall refinancing schedule', [R(3, 15, 3, 6, 0.8, 'b', 'grow'), R(7, 12, 3, 9, 0.8, 'b', 'grow:.3'), R(11.5, 4, 9.5, 17, 1, 'a'), P('M11.5 8.25h9.5M11.5 12.5h9.5M11.5 16.75h9.5M16.25 4v4.25M14 8.25v4.25M18.5 8.25v4.25M16.25 12.5v4.25M14 16.75V21M18.5 16.75V21')]),
  I('debt-amortization', 'amortization schedule repayment principal declining', [R(3.5, 6, 3.5, 15, 1, 'b', 'grow'), R(8, 9.5, 3.5, 11.5, 1, 'b', 'grow:.2'), R(12.5, 13, 3.5, 8, 1, 'b', 'grow:.4'), R(17, 16.5, 3.5, 4.5, 1, 'b', 'grow:.6'), P('M3.5 3C10 4 15 9 20.5 13', 'a', 'draw')]),
  I('revolver-facility', 'revolving credit facility revolver rcf draw repay', [P(arc(12, 12, 9, 30, 150)), P(arc(12, 12, 9, 210, 330)), G('spin-slow', X(12, 12, 7), P('M12 5v14M5 12h14', 'a')), C(12, 12, 1.5, 'f')]),
  I('covenant-test', 'covenant test threshold debt compliance headroom', [P('M9.5 15.5V5a2.5 2.5 0 0 1 5 0v10.5a4 4 0 1 1-5 0Z'), C(12, 18.5, 2.2, 'a'), G('grow', R(11.2, 9, 1.6, 9.5, 0.8, 'a')), P('M3.5 9H7M17 9h3.5', 'a', 'blink')]),

  // ---- banking, controls & governance ----
  I('bank-network', 'bank relationships network banking partners map', [P('M8 12 12 9.5l4 2.5Z'), P('M9.5 13v2.5M12 13v2.5M14.5 13v2.5M8 16.5h8'), C(4.5, 5, 2, 'a', 'pulse'), C(19.5, 5, 2), C(4.5, 19, 2), C(19.5, 19, 2), P('M6 6.5l2 2M18 6.5l-2 2M6 17.5l2-2M18 17.5l-2-2')]),
  I('open-bank-account', 'open bank account new banking setup', [P('M3 9 12 3.5 21 9Z'), P('M5.5 11v7M9 11v7M12.5 11v3.5M3 20.5h9'), C(17.5, 17.5, 4.5, 'a', 'pop'), P('M17.5 15.5v4M15.5 17.5h4')]),
  I('kyb-verify', 'kyb know your business corporate verification entity', [R(2.5, 5, 19, 14, 2.5), G('pulse', P('M5.5 16V10l3-2 3 2v6Z', 'a')), P('M8.5 13v3'), P('M14 9.5h5M14 12.5h5M14 15.5h3')]),
  I('approval-matrix', 'approval matrix authority levels delegation grid', [...[3.75, 9.75, 15.75].flatMap((y, r) => [3.75, 9.75, 15.75].map((x, c) => R(x, y, 4.5, 4.5, 1.2, c + r === 2 ? 'a' : 'b', c === 0 && r === 2 ? 'pop' : undefined)))]),
  I('dual-control', 'dual control four eyes two keys maker checker', [G('tilt', C(5.5, 5.5, 2.8), P('M7.5 7.5 19 19M15.5 15.5l1.6-1.6M17.5 17.5l1.6-1.6')), C(18.5, 5.5, 2.8, 'a'), P('M16.5 7.5 5 19M8.5 15.5l-1.6-1.6M6.5 17.5l-1.6-1.6')]),
  I('signatory-list', 'authorised signatories mandate signers list', [C(5, 6, 1.7, 'a'), P(squiggle(9, 6.5), 'd', 'draw'), C(5, 12, 1.7), P(squiggle(9, 12.5), 'd', 'draw:.3'), C(5, 18, 1.7), P(squiggle(9, 18.5), 'd', 'draw:.6')]),
  I('investment-policy', 'investment policy guidelines rules treasury', [P('M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5Z'), P('M5 19.5A1.5 1.5 0 0 0 6.5 21H19'), C(12, 10.5, 3.8, 'd'), P(wedge(12, 10.5, 3.8, 0, 110), 'a', 'pop')]),
  I('money-market-fund', 'money market fund mmf stable nav cash parking', [G('float', C(12, 7.5, 4.5, 'a'), C(12, 7.5, 2.5, 'd')), R(2.5, 14.5, 19, 5.5, 2.75), R(9, 16, 6, 2.5, 1.25, 'd'), G('shake', C(12, 17.25, 0.8, 'f'))]),
  I('tbill-ladder', 't-bill ladder treasury bills staggered maturity', [R(6, 4.5, 12, 3, 0.8), R(6, 10.5, 12, 3, 0.8), R(6, 16.5, 12, 3, 0.8, 'a', 'pulse'), P('M6 2.5v19M18 2.5v19')]),
  I('letter-of-credit', 'letter of credit trade finance guarantee seal', [R(4, 2.5, 13, 16, 2), P('M7 7h7M7 10.5h7M7 14h3'), G('pop', C(16.5, 16.5, 3.5, 'a')), P('M14.8 19.5 14 21.8M18.2 19.5l.8 2.3')]),
];
