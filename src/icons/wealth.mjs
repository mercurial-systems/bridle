import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

// full-height document (x 4.5..18.5) and its fold
const doc = 'M6.5 2.5H14l4.5 4.5v12.5a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2Z';
const fold = 'M14 2.5V7h4.5';
// small document top-left, leaving room for a badge bottom-right
const sdoc = 'M5 2.5h7l3.5 3.5v9.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Z';
const cdoc = () => [P(sdoc), P('M12 2.5V6h3.5'), P('M6 9h4.5M6 12.5h3')];
const badge = (an, ...els) => G(an, C(18, 17, 4.2, 'a'), ...els);
// large shield and the small insurance shield badge (bottom-right)
const shield = 'M12 2.5 19.5 5.5V11c0 4.8-3.2 8.6-7.5 10.5C7.7 19.6 4.5 15.8 4.5 11V5.5Z';
const mini = (cx, cy) => `M${cx} ${cy - 4.5}l3.8 1.5v2.8c0 2.4-1.6 4.3-3.8 5.2-2.2-.9-3.8-2.8-3.8-5.2v-2.8Z`;
const ins = (an = 'pulse') => G(an, P(mini(17.5, 16.5), 'a'), P('M15.7 16.7l1.3 1.3 2.4-2.6'));
// umbrella canopy y 3..11.5
const canopy = 'M3 11.5a9 8.5 0 0 1 18 0c-1.5-1-3-1-4.5 0-1.5-1-3-1-4.5 0-1.5-1-3-1-4.5 0-1.5-1-3-1-4.5 0Z';
// savings-goal ring: track + progress arc, glyph inside r ~5.5
const goal = (...els) => [C(12, 12, 9, 'd'), P(arc(12, 12, 9, 0, 250), 'a', 'draw'), ...els];
const heart = (cx, cy, s = 1) => `M${cx} ${cy + 4.5 * s}l${-3.8 * s} ${-3.7 * s}a${2.5 * s} ${2.5 * s} 0 0 1 ${3.8 * s} ${-3.2 * s} ${2.5 * s} ${2.5 * s} 0 0 1 ${3.8 * s} ${3.2 * s}Z`;

export default [
  // ---- retirement & saving ----
  I('nest-egg', 'retirement savings egg nest future', [G('float', P('M12 3c2.4 0 4.2 3.6 4.2 6.6a4.2 4.2 0 0 1-8.4 0C7.8 6.6 9.6 3 12 3Z', 'a')), P('M3 12.5h18c-.5 4.6-4.3 8-9 8s-8.5-3.4-9-8Z'), P('M6 15.5l12 1.2M7.5 18.3l9-1')]),
  I('pension', 'retirement income elderly benefit monthly', [P('M5 3h10M5 17.5h10M6.5 3v2.5L10 10l-3.5 4.5v3M13.5 3v2.5L10 10l3.5 4.5v3'), P('M8 15.5h4', 'a'), badge('drop', C(18, 17, 2.3, 'd'))]),
  I('retirement-jar', 'retirement plan 401k jar invest growth', [P('M6.5 7.5h11v11a3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3Z'), R(7.5, 3.5, 9, 4, 1.2), P('M9 17.5l2.5-2.5 1.5 1.5 3-3.5', 'a', 'draw'), P('M14 12.5h2v2', 'a')]),
  I('retirement-sunset', 'retire golden years horizon leisure', [P('M6 17a6 6 0 0 1 12 0Z', 'a', 'sink'), P('M12 7V4.5M5 10l1.4 1.4M19 10l-1.4 1.4M2.5 17h19M7 20.5h10')]),
  I('savings-goal-home', 'house deposit goal saving progress', goal(P('M7.5 12.5 12 8.5l4.5 4v4.5h-9Z'), P('M11 17v-2.5h2V17'))),
  I('savings-goal-car', 'vehicle goal saving progress fund', goal(P('M7 15.5v-2.3l1.3-3.2h7.4l1.3 3.2v2.3Z'), C(9.2, 15.7, 1.1, 'f'), C(14.8, 15.7, 1.1, 'f'))),
  I('savings-goal-education', 'college tuition school goal fund', goal(P('M12 8l6 3-6 3-6-3Z'), P('M8.5 12.5V15c1.5 1.3 5.5 1.3 7 0v-2.5M18 11v3'))),
  I('savings-goal-travel', 'vacation trip holiday goal fund', goal(R(8, 10, 8, 7, 1.5), P('M10.5 10V8.5h3V10M10.5 12.5v2M13.5 12.5v2'))),
  I('emergency-fund', 'rainy day reserve buffer safety cash', [R(4, 9, 16, 12, 2.5), P('M9 9a3 3 0 0 1 6 0Z', 'a', 'blink'), P('M12 3.5V5M7 5l1 1M17 5l-1 1M9.5 13.5h5'), C(12, 17, 1.2, 'f')]),
  I('net-worth', 'assets liabilities wealth total balance', [R(4.5, 4, 6, 16.5, 1.5), R(4.5, 4, 6, 8, 1.5, 'a', 'grow'), R(13.5, 12, 6, 8.5, 1.5), P('M2.5 21h19')]),
  I('asset-mix', 'allocation split portfolio weights stocks bonds', [R(3, 7.5, 18, 6, 2), R(3, 7.5, 7, 6, 2, 'a', 'grow-x'), P('M10 7.5v6M15.5 7.5v6'), C(5, 18, 1, 'f'), C(13, 18, 1, 'f'), P('M7.5 18h3M15.5 18h4')]),
  I('rebalance', 'portfolio rebalancing adjust weights drift', [C(12, 12, 5), P(wedge(12, 12, 5, 0, 140), 'a'), G('spin', X(12, 12, 9), P(arc(12, 12, 8.5, 20, 160)), P('M16.2 18.2 14.9 20l2.1.6'), P(arc(12, 12, 8.5, 200, 340)), P('M7.8 5.8 9.1 4 7 3.4'))]),
  I('robo-advisor', 'automated investing algorithm bot portfolio', [R(4, 7, 16, 13, 3.5), P('M12 7V4.6M2.5 12v3M21.5 12v3'), C(12, 3.6, 1.1, 'a', 'blink'), P('M7.5 15.5l3-3 2 2 4-4', 'a', 'draw')]),
  I('financial-advisor', 'planner consultant wealth manager expert', [C(9, 7, 3.5), P('M2.5 19.5a6.5 6.5 0 0 1 13 0Z'), badge('pulse', P('M15.8 18.5l1.6-1.8 1.2 1 1.7-2.2'))]),
  I('financial-plan', 'roadmap strategy milestones planning document', [P(doc), P(fold), P('M7.5 18h2.5v-3h2.5v-3h2.5', 'd', 'draw'), C(15.5, 9, 1.5, 'a', 'pulse')]),
  I('compound-growth', 'compounding exponential interest curve returns', [P('M3.5 3.5v17h17'), P('M6 18c6 0 9.5-3 13.5-13', 'a', 'draw'), C(11.3, 16.9, 1, 'f'), C(15.5, 12.8, 1, 'f')]),
  I('inflation', 'prices rising cpi balloon cost', [G('float', E(12, 9, 6, 6.5, 'a'), P('M12 12.5V6M9.8 8.2 12 6l2.2 2.2')), P('M12 15.5c-1 2 1 3.5 0 5.5')]),
  I('purchasing-power', 'value buying shrinking basket real money', [P('M5 8h14l-1 12.5H6Z'), P('M9 8V6.5a3 3 0 0 1 6 0V8'), P('M12 11v6M9.5 14.5 12 17l2.5-2.5', 'a', 'slide-d')]),

  // ---- estate & legacy ----
  I('estate-plan', 'estate planning property heirs document', [P(doc), P(fold), P('M7.5 7.5h4'), P('M8.5 18.5v-4l3.5-3 3.5 3v4Z', 'a', 'pop')]),
  I('will-testament', 'will testament seal legacy document', [P(doc), P(fold), P('M7.5 8h5M7.5 11.5h7M7.5 15h3.5'), G('pulse', C(16.5, 17, 3.2, 'a'), C(16.5, 17, 1.4, 'd'))]),
  I('trust-fund', 'trust chest endowment legacy reserve', [P('M3.5 11V9a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v2Z'), R(3.5, 11, 17, 9.5, 2), P('M3.5 14.5h7M13.5 14.5h7'), R(10.5, 10, 3, 4.5, 1, 'a', 'pulse')]),
  I('beneficiary', 'heir recipient payee designated person', [C(15, 7.5, 3.2), P('M9 20a6 6 0 0 1 12 0Z'), P('M3 13.5h5M6 11.5l2 2-2 2', 'a', 'slide-r')]),
  I('inheritance', 'legacy heirs pass down family tree', [G('pulse', C(12, 6, 3.2, 'a'), C(12, 6, 1.5, 'd')), P('M12 9.2V12M6 15.5V12h12v3.5'), C(6, 17.8, 2.3), C(18, 17.8, 2.3)]),
  I('family-office', 'family wealth office private household', [P('M3.5 10 12 4l8.5 6v10.5h-17Z'), C(12, 12.6, 1.3, 'a', 'pulse'), P('M10 16.5a2 2 0 0 1 4 0M6.3 19a2 2 0 0 1 4 0M13.7 19a2 2 0 0 1 4 0'), C(8.3, 15.4, 1.1, 'f'), C(15.7, 15.4, 1.1, 'f')]),
  I('philanthropy', 'giving charity donation hand heart', [P(heart(12, 7), 'a', 'beat'), P('M3 14.5h3.5l3 1.8h4a1.6 1.6 0 0 1 0 3.2H10M13.5 19.5h3.3l3.4-2.7a1.5 1.5 0 0 1 1.8 2.3L17.5 21.5H9l-3-1.5H3')]),
  I('charitable-giving', 'donate charity box contribution nonprofit', [P(heart(12, 6, 0.8), 'a', 'drop'), R(4, 12, 16, 9, 2), P('M9.5 15.5h5')]),

  // ---- insurance types ----
  I('health-insurance', 'medical cover health plan hospital', [P(shield), P('M10.5 7.5h3v3h3v3h-3v3h-3v-3h-3v-3h3Z', 'a', 'beat')]),
  I('life-insurance', 'life cover family protection policy', [P(shield), P(heart(12, 7.5, 0.95), 'a', 'beat')]),
  I('car-insurance', 'auto vehicle motor cover policy', [P('M3 13v-2.5l1.8-4h8.4l1.8 4V13Z'), C(6, 13.8, 1.6), C(12, 13.8, 1.6), P('M5.5 10.5h7'), ins()]),
  I('home-insurance', 'house property homeowners cover', [P('M2.5 10.5 8.5 4.5l6 6V18h-12Z'), P('M7 18v-3.5h3V18'), ins()]),
  I('travel-insurance', 'trip luggage holiday cover', [R(3, 6, 11, 9, 2), P('M6.5 6V4h4v2M6 6v9M11 6v9'), ins()]),
  I('pet-insurance', 'animal paw vet cover', [E(8.5, 11.5, 3.5, 3), C(5, 7, 1.5), C(8.5, 5, 1.5), C(12, 7, 1.5), ins()]),
  I('liability-insurance', 'business liability commercial cover briefcase', [R(2.5, 6.5, 13, 9, 2), P('M6.5 6.5v-2h5v2M2.5 10.5h13'), ins()]),
  I('cyber-insurance', 'cyber cover breach data protection', [P(shield), G('pulse', P('M10 9 7.5 11.5 10 14M14 9l2.5 2.5L14 14', 'a'))]),
  I('crop-insurance', 'agriculture farm harvest wheat cover', [P('M8.5 8C6 8 5 6.5 5 4.5c2.5 0 3.5 1.5 3.5 3.5Z'), P('M8.5 8c2.5 0 3.5-1.5 3.5-3.5-2.5 0-3.5 1.5-3.5 3.5Z'), P('M8.5 12.5C6 12.5 5 11 5 9c2.5 0 3.5 1.5 3.5 3.5Z'), P('M8.5 12.5c2.5 0 3.5-1.5 3.5-3.5-2.5 0-3.5 1.5-3.5 3.5Z'), P('M8.5 18V8'), ins()]),
  I('weather-insurance', 'weather parametric rain storm cover', [P('M6 13a3.3 3.3 0 1 1 .8-6.5 4.3 4.3 0 0 1 8 1.6 2.5 2.5 0 0 1-.6 4.9Z'), G('drop', P('M6.5 16l-1 2M10 16l-1 2')), ins()]),
  I('flood-insurance', 'flood water house cover disaster', [P('M3 11 8.5 5.5 14 11v3H3Z'), G('wave', P('M2.5 17.5c1.3-1 2.7-1 4 0s2.7 1 4 0M2.5 20.5c1.3-1 2.7-1 4 0s2.7 1 4 0')), ins()]),
  I('fire-insurance', 'fire flame property cover hazard', [P('M8.5 3c3.5 3 5.5 5.5 5.5 9a5.5 5.5 0 0 1-11 0c0-2 1-3.5 2.5-4.5 0 1.5.8 2.5 2 2.5 0-2.5-.5-4.5 1-7Z'), ins('beat')]),

  // ---- policies & coverage ----
  I('insurance-policy', 'policy document cover terms umbrella', [P(doc), P(fold), P('M7.5 7h4'), G('float', P('M7.5 14a4.5 4 0 0 1 9 0c-.75-.5-1.5-.5-2.25 0-.75-.5-1.5-.5-2.25 0-.75-.5-1.5-.5-2.25 0-.75-.5-1.5-.5-2.25 0Z', 'a')), P('M12 14v3.5a1 1 0 0 1-2 0')]),
  I('insurance-card', 'member card id coverage plan', [card(2.5, 4, 17, 12), P('M5.5 8.5h5M5.5 12h3'), ins()]),
  I('premium-payment', 'insurance premium pay coin cover', [C(9, 9, 6.5), C(9, 9, 4, 'd'), ins('float')]),
  I('deductible', 'excess out of pocket deduct cover', [P(shield), badge('pop', P('M16.2 17h3.6'))]),
  I('umbrella-home', 'home coverage umbrella protect house', [G('float', P(canopy, 'a')), P('M7 21v-4.8l5-3.7 5 3.7V21Z'), P('M10.8 21v-2.5h2.4V21')]),
  I('umbrella-family', 'family coverage protect household people', [G('float', P(canopy, 'a')), C(7.5, 15.2, 1.7), C(16.5, 15.2, 1.7), C(12, 16.8, 1.3), P('M4.5 21a3 3 0 0 1 6 0Z'), P('M13.5 21a3 3 0 0 1 6 0Z'), P('M10.3 21a1.7 1.7 0 0 1 3.4 0Z')]),
  I('umbrella-assets', 'asset protection umbrella policy wealth', [G('float', P(canopy, 'a')), P('M7 15v4c0 1.1 2.2 2 5 2s5-.9 5-2v-4Z'), E(12, 15, 5, 2), P('M7 17c0 1.1 2.2 2 5 2s5-.9 5-2')]),
  I('coverage-gap', 'gap uncovered exposure hole risk', [P(canopy, 'a'), P('M12.5 4 11 7.5l2 1.5-1.5 2.5'), G('drop', P('M12 14v2M9 17.5v2M15 17.5v2'))]),

  // ---- claims ----
  I('claim-submit', 'file claim send insurance form', [...cdoc(), badge('slide-u', P('M18 19v-4M16.3 16.7 18 15l1.7 1.7'))]),
  I('claim-approved', 'claim accepted paid ok insurance', [...cdoc(), C(18, 17, 4.2, 'a'), P('M16.2 17.2l1.3 1.3 2.4-2.6', 'd', 'draw')]),
  I('claim-denied', 'claim rejected declined insurance', [...cdoc(), badge('shake', P('M16.5 15.5l3 3M19.5 15.5l-3 3'))]),
  I('claim-review', 'claim pending processing insurance wait', [...cdoc(), C(18, 17, 4.2, 'a'), G('spin', X(18, 17, 2.4), P('M18 17v-2.2')), P('M18 17h1.6')]),
  I('claim-payout', 'claim settlement payment insurance money', [...cdoc(), badge('float', C(18, 17, 2.3, 'd'))]),
  I('claims-adjuster', 'adjuster assessor inspector claims agent', [C(8, 7, 3.2), P('M2.5 20a5.5 5.5 0 0 1 11 0Z'), G('tilt', R(14, 8.5, 7, 12, 1.5, 'a'), P('M16 13h3M16 16h2'))]),
  I('accident-report', 'crash collision incident car report', [P('M3 17.5V14l2.2-5h9.6l2.2 5v3.5Z'), C(6.5, 18, 1.8), C(13.5, 18, 1.8), P('M6 13h8'), P(spark(18.5, 5.5, 3.5), 'a', 'shake')]),

  // ---- risk & actuarial ----
  I('risk-grid', 'risk assessment heat map likelihood impact', [R(3, 3, 18, 18, 2.5), P('M9 3v18M15 3v18M3 9h18M3 15h18'), R(16.2, 4.2, 3.6, 3.6, 1, 'a', 'pulse')]),
  I('underwriting', 'underwrite assess review policy risk', [P(doc), P(fold), P('M7.5 8h5M7.5 11h3'), G('diag', C(14.5, 15, 3.3, 'a'), P('M17 17.5l3 3'))]),
  I('actuarial-curve', 'actuary probability distribution mortality model', [P('M3 19.5c4 0 5-13 9-13s5 13 9 13Z'), P('M15.5 11v8.5', 'a', 'slide-r')]),
  I('risk-tolerance', 'risk appetite slider profile conservative aggressive', [P('M3.5 11h17M3.5 8v6M20.5 8v6'), C(14, 11, 3, 'a', 'slide-l'), P('M4 18h3M16.5 18h3M18 16.5v3')]),
  I('annuity', 'guaranteed income payments stream schedule', [P('M3 19h18M6 19v-2.5M12 19v-2.5M18 19v-2.5'), C(6, 11, 2.6, 'a', 'drop'), C(12, 11, 2.6, 'a', 'drop:.4'), C(18, 11, 2.6, 'a', 'drop:.8')]),

  // ---- credit & debt ----
  I('mortgage-calculator', 'home loan calculator repayment estimate', [R(5, 2.5, 14, 19, 2.5), P('M8.5 10.5V8L12 5.5 15.5 8v2.5Z', 'a', 'breathe'), ...[8.8, 12, 15.2].flatMap((x) => [C(x, 14.5, 0.95, 'f'), C(x, 18, 0.95, 'f')])]),
  I('line-of-credit', 'credit line limit available revolving heloc', [R(3, 9.5, 18, 5, 2.5), R(3, 9.5, 11, 5, 2.5, 'a', 'grow-x'), P('M17.5 6.5v11')]),
  I('debt-snowball', 'debt payoff snowball repay smallest first', [P('M2.5 20.5h19M3 12h3M4 9h3'), C(4.5, 18.5, 1.2, 'f'), C(8.5, 17.5, 2), C(15.5, 13.5, 6, 'a', 'pulse')]),
  I('debt-avalanche', 'debt payoff highest interest first avalanche', [P('M2.5 20.5 9.5 8l3.5 5.5 2.5-3.5 6 10.5Z'), P('M18 3v5.5M15.8 6.3 18 8.5l2.2-2.2', 'a', 'slide-d')]),
  I('credit-report', 'credit history bureau score report', [P(doc), P(fold), P('M7.5 7.5h4'), P(arc(11.5, 16, 4, -90, 90)), G('seesaw', X(11.5, 16, 4.5), P('M11.5 16l2.5-2.5', 'a')), C(11.5, 16, 1, 'f')]),
  I('credit-utilization', 'utilisation ratio card balance limit usage', [card(2.5, 3.5, 19, 12), P('M2.5 7.5h19M5.5 12h4M3 19.5h18'), P('M3 19.5h7', 'a', 'grow-x')]),

  // ---- budgeting ----
  I('budget-envelope', 'envelope budgeting cash allocate category', [R(6, 3.5, 12, 8, 1, 'a', 'slide-u'), R(3, 8.5, 18, 12.5, 2), P('M3.5 9.5 12 15l8.5-5.5')]),
  I('spending-categories', 'categories expenses breakdown budget groups', [R(3, 3, 8, 8, 2.2), R(13, 3, 8, 8, 2.2, 'a', 'pop'), R(3, 13, 8, 8, 2.2), C(17, 17, 4)]),
  I('subscription-tracker', 'subscriptions recurring bills monitor list', [R(3, 3, 14, 15, 2.5), P('M6.5 7.5h7M6.5 11h7M6.5 14.5h4'), badge('spin', P(arc(18, 17, 2.3, 30, 300)), P('M15.6 14.2l.4 1.7 1.6-.4'))]),
  I('bill-calendar', 'due dates bills schedule payments calendar', [R(3, 4.5, 18, 16.5, 2.5), P('M8 3v3M16 3v3M3 9.5h18'), C(7.5, 13, 0.9, 'f'), C(12, 13, 0.9, 'f'), C(16.5, 13, 0.9, 'f'), C(7.5, 17, 0.9, 'f'), C(12, 17, 0.9, 'f'), R(14.5, 15, 4, 4, 1, 'a', 'pulse')]),
  I('tax-shelter', 'tax advantaged account ira isa sheltered', [P('M5 10.5 12 5l7 5.5V21H5Z'), P('M2.5 11.5 12 4l9.5 7.5', 'a', 'slide-u'), P('M9.5 18.5l5-5'), C(10, 14, 1, 'f'), C(14, 18, 1, 'f')]),
  I('dollar-cost-average', 'dca regular investing periodic buy', [P('M3 10l3.5 2.5 3.5-4 3.5 3 3.5-4.5 4 3'), C(5.5, 18, 1.8, 'a', 'pop'), C(10, 18, 1.8, 'a', 'pop:.3'), C(14.5, 18, 1.8, 'a', 'pop:.6'), C(19, 18, 1.8, 'a', 'pop:.9')]),
  I('diversification', 'diversify spread mix assets variety', [R(3, 3, 8, 8, 2), C(17, 7, 4), P('M12 13l5 8H7Z', 'a', 'pop')]),
  I('money-tree', 'passive income grow wealth tree', [C(12, 9.5, 6.5), P('M12 21v-5M9 21h6'), C(9.5, 8, 1.5, 'a', 'drop'), C(14.5, 11, 1.5, 'a', 'drop:.6')]),

  // ---- private wealth ----
  I('wealth-tier', 'tiers levels premium client segment pyramid', [P('M3 21l2-5h14l2 5Z'), P('M6.5 14.5l2-5h7l2 5Z'), P('M9.5 8 12 3l2.5 5Z', 'a', 'float')]),
  I('vip-client', 'premium client vip crown high net worth', [P('M5.5 21.5a6.5 6.5 0 0 1 13 0Z'), C(12, 12, 3.5), P('M8.5 7 8 2.8l2.2 1.7L12 2l1.8 2.5L16 2.8 15.5 7Z', 'a', 'float')]),
  I('private-banking', 'private bank exclusive wealth vault client', [P('M3 9 12 3.5 21 9Z'), P('M3 20.5h18M6 11.5v6M18 11.5v6'), P('M9.5 18v-4.5a2.5 2.5 0 0 1 5 0V18Z', 'a', 'pulse')]),
  I('bullion-vault', 'gold storage precious metals safe deposit', [R(3, 3.5, 18, 16, 2.5), P('M7.5 15.5 9 11h6l1.5 4.5Z', 'a', 'float'), P('M6.5 19.5V21M17.5 19.5V21')]),
  I('precious-metals', 'gold silver gem ingot commodity', [P('M13 3h6l2.5 3-5.5 6-5.5-6Z', 'b', 'pulse'), P('M10.5 6h11M14.5 6l1.5 6 1.5-6'), P('M3 20.5 5 14h8l2 6.5Z', 'a'), P('M6.5 17h3', 'h')]),
  I('art-asset', 'art collection painting alternative asset', [R(3, 3, 18, 15, 2), P('M6 15l4-5 3 3.5 2-2 3 3.5M8 18l-1.5 3.5M16 18l1.5 3.5'), C(15.5, 7.5, 1.8, 'a', 'pulse')]),
  I('collectibles', 'collectible cards rare items alternative asset', [R(3, 5, 10, 15, 2), R(9.5, 3, 11.5, 16, 2), P(star(15.25, 11, 3.6, 1.6), 'a', 'pop')]),
  I('luxury-watch', 'watch timepiece luxury collectible asset', [P('M9 6.5l.8-4h4.4l.8 4M9 17.5l.8 4h4.4l.8-4'), C(12, 12, 6.5), C(12, 12, 4.3, 'a'), G('spin', X(12, 12, 3), P('M12 12V9.2')), P('M12 12h2', 'd'), P('M18.5 11v2')]),
];
