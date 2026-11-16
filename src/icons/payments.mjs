import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

// shared shapes
const shield = 'M12 2.8 19.5 5.5v6c0 4.7-3.2 8.4-7.5 9.9-4.3-1.5-7.5-5.2-7.5-9.9v-6Z';
const doc = 'M7 3h7.5L19.5 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z';
const sdoc = 'M5 2.5h7.5L17 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4.5a2 2 0 0 1 2-2Z';
const sdocEls = () => [P(sdoc), P('M12.5 2.5V7H17'), P('M6 9.5h4M6 12.5h5')];
// card on the upper-left, room for a badge bottom-right (same layout as cards.mjs)
const small = () => [card(2.5, 4, 17, 12), P('M2.5 8h17'), P('M5.5 12.5h4')];
const phone = () => R(5, 2.5, 14, 19, 2.5);

export default [
  // ---- rails and processing ----
  I('payment-gateway', 'gateway processor checkout route acquiring', [R(9.5, 3, 5, 18, 2), P('M12 6v2.5M12 15.5V18'), G('slide-r', card(2.5, 8.5, 9, 7, 'a'), P('M2.5 11h9')), P('M17 12h4M19 10l2 2-2 2')]),
  I('payment-url', 'pay link url share checkout online', [card(2.5, 3.5, 17, 11), P('M2.5 7h17M5.5 11h4'), G('tilt', P('M14.5 20.5h-1a2.5 2.5 0 0 1 0-5h1M17.5 15.5h1a2.5 2.5 0 0 1 0 5h-1', 'a'), P('M14 18h4'))]),
  I('pay-button', 'pay now button cta click checkout', [R(2.5, 5, 19, 10, 5), P('M7 10h6'), C(16.5, 10, 1.2, 'f'), P('M13 12.5l7 2.6-3 1.2-1.2 3Z', 'a', 'pop')]),
  I('invoice-share', 'invoice send share bill link', [...sdocEls(), G('pulse', C(18, 17, 4.2, 'a'), P('M16.3 18.7l3.2-3.2M17 15.3h2.7V18'))]),
  I('bill-split', 'split bill share receipt divide', [G('slide-l', P('M3 4h7.5v16l-1.9-1.3-1.9 1.3-1.9-1.3L3 20Z'), P('M5.3 8.5h3M5.3 12h3')), G('slide-r', P('M13.5 4H21v16l-1.9-1.3-1.9 1.3-1.9-1.3-1.8 1.3Z', 'a'), P('M15.8 8.5h3M15.8 12h3'))]),
  I('request-money', 'request ask money bubble pay me', [P('M5 3.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z'), G('pulse', C(12, 10, 3.6, 'a'), P('M12 8.3v3.4'))]),
  I('payout-batch', 'payouts bulk batch mass payment', [R(2.5, 3, 6, 18, 2), ...[5.5, 12, 18.5].flatMap((y, i) => [C(5.5, y, 1.3, 'a'), G(`slide-r${i ? ':.' + i * 3 : ''}`, P(`M11 ${y}h9M17.5 ${y - 2.5}l2.5 2.5-2.5 2.5`))])]),
  I('settlement', 'settle clearing funds merge final', [C(3.5, 5.5, 1.3, 'f'), C(3.5, 18.5, 1.3, 'f'), P('M3.5 5.5c4 0 4 6.5 8 6.5M3.5 18.5c4 0 4-6.5 8-6.5', 'd', 'dash'), R(11, 6, 10.5, 12, 2.8, 'a'), P('M13.5 12.2l2.2 2.2 3.6-4', 'd', 'draw')]),
  I('reconciliation', 'reconcile match ledger books compare', [R(2.5, 3, 8, 12, 1.8), R(13.5, 3, 8, 12, 1.8), P('M5 7h3M5 10.5h3M16 7h3M16 10.5h3'), G('pop', C(12, 17.5, 3.8, 'a'), P('M10.3 17.6l1.2 1.2 2.3-2.5'))]),
  I('chargeback', 'chargeback reversal card return dispute', [card(2.5, 10, 15, 10), P('M2.5 13.5h15M5.5 17h3'), G('slide-l', P('M20.5 15V9a4 4 0 0 0-4-4H9', 'a'), P('M11.5 2.5 9 5l2.5 2.5', 'a'))]),
  I('payment-dispute', 'dispute claim contest card issue', [...small(), G('shake', C(18, 17, 4.2, 'a'), P('M18 14.6v2.8'), C(18, 19.3, 0.9, 'f'))]),
  I('fraud-score', 'fraud risk score gauge security', [P(shield), P(arc(12, 13.5, 4.5, -70, 70)), G('wiggle', X(12, 13.5, 3.5), P('M12 13.5l2.3-2.6', 'a')), C(12, 13.5, 1, 'f')]),
  I('payment-risk', 'risk assessment grid heatmap compliance', [R(3, 3, 18, 18, 2.5), P('M9 3v18M15 3v18M3 9h18M3 15h18'), R(15.75, 3.75, 4.5, 4.5, 1, 'a', 'blink')]),
  I('three-d-secure', '3ds secure authentication card verify', [card(2.5, 4, 16, 11), P('M2.5 7.5h16M5.5 11.5h4'), G('pulse', P('M17 10.5l4.5 1.7v3.3c0 2.8-1.9 4.8-4.5 5.7-2.6-.9-4.5-2.9-4.5-5.7v-3.3Z', 'a'), P('M15.2 15.6l1.3 1.3 2.4-2.6'))]),
  I('card-token', 'tokenised card token pci network', [card(2.5, 5, 19, 14), P('M2.5 9h19'), ...[5.5, 8, 10.5].map((x) => C(x, 14.5, 0.9, 'f')), P(poly(17, 14.5, 3, 6), 'a', 'pulse')]),
  I('card-vault', 'card vault storage secure safe', [G('sink', card(7, 2.5, 10, 7, 'a'), P('M9.5 5h3')), R(3.5, 8, 17, 13, 2.5), P('M8 10.5h8'), C(12, 15.5, 2.8, 'd'), C(12, 15.5, 0.9, 'f'), P('M17.5 14v3')]),
  I('phone-wallet', 'mobile wallet phone cards digital', [phone(), R(7.5, 5.5, 9, 5.5, 1.2, 'd'), G('float', R(7.5, 8.5, 9, 5.5, 1.2, 'a'), P('M7.5 10.5h9')), P('M10.5 18.5h3')]),
  I('watch-pay', 'wearable smartwatch tap contactless', [P('M6.5 6.5V3h6v3.5M6.5 17.5V21h6v-3.5'), R(4.5, 6.5, 10, 11, 2.8), C(9.5, 12, 2.4, 'a', 'pulse'), P('M16.8 10a3 3 0 0 1 0 4', 'd', 'blink'), P('M19.3 8a6 6 0 0 1 0 8', 'd', 'blink:.3')]),
  I('qr-merchant-stand', 'qr stand counter merchant scan pay', [P('M6.5 3h11A1.5 1.5 0 0 1 19 4.5V18H5V4.5A1.5 1.5 0 0 1 6.5 3Z'), R(7.5, 5.5, 3.5, 3.5, 0.8, 'd'), R(13, 5.5, 3.5, 3.5, 0.8, 'd'), R(7.5, 11, 3.5, 3.5, 0.8, 'd'), C(14.75, 12.75, 1, 'f'), P('M5.5 8.3h13', 'a', 'scan'), R(3, 18, 18, 3, 1.2)]),
  I('payment-soundbox', 'soundbox speaker merchant voice alert', [R(3, 5, 12.5, 15, 2.8), P('M6.5 8.3h5.5'), C(9.25, 13.5, 3.2, 'a', 'beat'), C(9.25, 13.5, 1, 'f'), P('M17.5 11a3 3 0 0 1 0 5', 'd', 'blink'), P('M19.5 9a5.5 5.5 0 0 1 0 9', 'd', 'blink:.3')]),
  I('mobile-money', 'mobile money phone coin m-pesa', [R(3, 2.5, 10.5, 19, 2.5), P('M6.5 6h3.5M7 18.5h2.5'), G('float', C(17, 14, 4.5, 'a'), P('M17 12v4'))]),
  I('remittance', 'remittance send home family abroad', [P('M3 12 9.5 6.5 16 12v8.5H3Z'), P('M8 20.5V16h3v4.5'), G('drop', C(18.5, 6, 2.8, 'a'), P('M18.5 4.8v2.4'))]),
  I('cross-border', 'international border payment global', [C(6, 12, 3.5), P('M6 10.5v3'), P('M12.5 3v2.5M12.5 8v2M12.5 14v2M12.5 18.5V21'), G('slide-r', P('M10.5 12h10M18 9.5l2.5 2.5-2.5 2.5', 'a'))]),
  I('fx-convert', 'fx currency conversion exchange forex', [G('float', C(8.5, 8.5, 5), P('M8.5 6.5v4')), G('flip', C(15.5, 15.5, 5, 'a'), P('M13.5 15.5h4')), P('M15 3.5h1.5A3.5 3.5 0 0 1 20 7v2.5M18.3 7.8 20 9.5l1.7-1.7'), P('M9 20.5H7.5A3.5 3.5 0 0 1 4 17v-2.5M2.3 16.2 4 14.5l1.7 1.7')]),
  I('instant-transfer', 'instant real-time fast payment rtp', [P('M2.5 9h3M2 12h2.5M2.5 15h3', 'd', 'blink'), G('slide-r', C(14, 12, 7.5), P('M15 7.5l-3.5 5.5h3l-1 4 3.5-5.5h-3Z', 'a'))]),
  // ---- schedules and agreements ----
  I('scheduled-payment', 'scheduled future date planned pay', [R(2.5, 4, 15.5, 14.5, 2.5), P('M2.5 8.5h15.5M6.5 2.5v3M14 2.5v3'), C(6.5, 12, 0.9, 'f'), C(10, 12, 0.9, 'f'), C(6.5, 15, 0.9, 'f'), G('pulse', C(18, 17, 4.2, 'a'), P('M18 15v4'))]),
  I('standing-order', 'standing order repeat regular transfer', [...sdocEls(), C(18, 17, 4.2, 'a'), G('spin', X(18, 17, 2.6), P(arc(18, 17, 2.4, 30, 160)), P(arc(18, 17, 2.4, 210, 340)))]),
  I('direct-debit', 'direct debit pull bank collection', [card(2.5, 11, 11.5, 9), P('M2.5 14.2h11.5M5 17.5h3'), P('M14.5 8.5 18 5.5l3.5 3Z', 'a'), P('M16.2 10v3M19.8 10v3M15 14.5h6'), G('slide-r', P('M5.5 9V7.5a2 2 0 0 1 2-2H11'), P('M9.5 3.5l2 2-2 2'))]),
  I('payment-mandate', 'mandate authorisation signed agreement', [P(doc), P('M14.5 3v5h5M8 9h4M8 12h7'), P('M8 17c1-1.6 2-1.6 2.4 0s1.4 1 2.2-.4 1.4-.8 2.4.2', 'a', 'draw')]),
  I('bnpl-instalments', 'buy now pay later instalments split four', [P(wedge(13.13, 10.87, 8, 0, 90), 'a', 'pop'), P(wedge(13.13, 13.13, 8, 90, 180), 'a', 'pop:.5'), P(wedge(10.87, 13.13, 8, 180, 270)), P(wedge(10.87, 10.87, 8, 270, 360))]),
  I('layaway', 'layaway hold reserve bag progress', [P('M5 8h14l-1.2 12.5H6.2Z'), P('M9 8V6.5a3 3 0 0 1 6 0V8'), R(8, 13.5, 8, 2.6, 1.3, 'd'), R(8, 13.5, 5, 2.6, 1.3, 'a', 'grow-x')]),
  I('pay-later', 'pay later deferred bnpl hourglass', [...small(), G('tilt', C(18, 17, 4.2, 'a'), P('M16.4 14.6h3.2l-3.2 4.8h3.2Z', 'd'))]),
  I('autopay', 'autopay automatic toggle switch billing', [R(2.5, 7, 19, 10, 5), G('toggle', C(16.5, 12, 3.3, 'a'), P('M16.5 10.6v2.8'))]),
  I('billing-cycle', 'billing cycle period renew monthly', [G('spin-slow', X(12, 12, 9.3), P(arc(12, 12, 8.5, 40, 320)), P('M4.34 5.3 6.53 5.49 6.34 7.68')), R(8, 8.5, 8, 7.5, 1.5, 'a'), P('M8 11h8')]),
  // ---- giving, tipping, funding ----
  I('tip-payment', 'tip gratuity jar coins service', [G('drop', C(12, 4, 2.5, 'a'), P('M12 3v2')), R(4.5, 8, 15, 3, 1.4), P('M5.5 11h13v7.5a2.5 2.5 0 0 1-2.5 2.5H8a2.5 2.5 0 0 1-2.5-2.5Z'), P('M9.5 15.5h5')]),
  I('donation', 'donate charity give hand heart', [P('M12 11.5S7 8.5 7 5.3A2.5 2.5 0 0 1 12 4.3a2.5 2.5 0 0 1 5 1C17 8.5 12 11.5 12 11.5Z', 'a', 'beat'), R(2.5, 13.5, 3.5, 7, 1), P('M6 14.5h3.2c.9 0 1.6.3 2.2.9h2.4a1.6 1.6 0 0 1 0 3.2h-3.3'), P('M6 19.5l6 1.5 7.6-3.6a1.6 1.6 0 0 0-1.3-2.9l-4.2 1.6')]),
  I('crowdfunding', 'crowdfund backers pledge community raise', [G('float', C(12, 6, 3.5, 'a'), P('M12 4.5v3')), C(5.5, 14.5, 2), C(12, 14.5, 2), C(18.5, 14.5, 2), P('M2.5 21a3 3 0 0 1 6 0M9 21a3 3 0 0 1 6 0M15.5 21a3 3 0 0 1 6 0')]),
  // ---- pricing and billing ----
  I('plan-tiers', 'subscription tiers plans levels pricing', [R(3, 16, 18, 3.5, 1.2), R(5.5, 10, 13, 3.5, 1.2), R(8, 4, 8, 3.5, 1.2, 'a', 'pop')]),
  I('pricing-table', 'pricing plans compare columns saas', [R(2.5, 7, 5, 12, 1.5), R(16.5, 7, 5, 12, 1.5), P('M4 11h2M4 14.5h2M18 11h2M18 14.5h2'), G('float', R(9.5, 3.5, 5, 17, 1.5, 'a'), P('M11 8h2M11 11.5h2M11 15h2'))]),
  I('usage-meter', 'usage based billing metered consumption', [P('M3 15.5a9 9 0 0 1 18 0Z'), P('M6.3 11.5l1.2.7M12 8v1.4M17.7 11.5l-1.2.7'), G('seesaw', X(12, 15.5, 6), P('M12 15.5l3.5-3.8', 'a')), C(12, 15.5, 1.3, 'f'), P('M5 19.5h14')]),
  I('top-up', 'top up reload add funds balance', [R(2.5, 7, 16, 10, 2.5), R(18.5, 10, 2.5, 4, 1), R(5, 9.5, 6, 5, 1, 'a', 'grow-x'), P('M14 10v4M12 12h4')]),
  I('prepaid-credits', 'credits coins prepaid balance usage', [E(10, 17, 6.5, 2.5), E(10, 13, 6.5, 2.5), E(10, 9, 6.5, 2.5, 'a'), P(spark(18.5, 5, 2.5), 'a', 'pulse')]),
  I('prepaid-card', 'prepaid card balance loaded stored value', [card(2.5, 5, 19, 14), P('M2.5 9h19'), R(5.5, 13, 13, 2.6, 1.3, 'd'), R(5.5, 13, 8, 2.6, 1.3, 'a', 'grow-x')]),
  I('gift-card-balance', 'gift card voucher balance present', [card(2.5, 5, 19, 14), P('M8.5 5v14M2.5 11h19'), G('pulse', P('M8.5 11C7 8 4.5 8.3 5 10.2c.3 1 1.8 1 3.5.8Z', 'a'), P('M8.5 11c1.5-3 4-2.7 3.5-.8-.3 1-1.8 1-3.5.8Z', 'a')), P('M14 15.5h4.5')]),
  I('cashback-badge', 'cashback reward seal money back offer', [P(star(12, 12, 9.5, 8, 14), 'a', 'pulse'), P('M8.5 10.5h5a2.5 2.5 0 0 1 0 5H11'), P('M11 8l-2.5 2.5L11 13')]),
  I('cashback-card', 'cashback card percent reward rebate', [...small(), G('pulse', C(18, 17, 4.2, 'a'), P('M16.3 18.7l3.4-3.4'), C(16.4, 15.4, 0.8, 'f'), C(19.6, 18.6, 0.8, 'f'))]),
  I('loyalty-points', 'loyalty points rewards star program', [C(12, 12, 9), P(star(12, 12, 5, 2.2), 'a', 'pulse'), P(arc(12, 12, 6.8, 200, 250), 'h')]),
  I('membership-card', 'membership member card vip club', [card(2.5, 5, 19, 14), P(star(8, 12, 3.3, 1.4), 'a', 'pulse'), P('M13 10.5h5.5M13 14h4')]),
  // ---- the four-party model ----
  I('merchant-account', 'merchant account store seller payments', [R(3.5, 8, 12, 10, 1.2), P('M2.5 8.5l1.4-4.5h11.2l1.4 4.5Z', 'a'), P('M7.5 18v-4h3v4'), G('pulse', C(18, 17, 4.2), R(15.6, 15.4, 4.8, 3.4, 0.7, 'd'))]),
  I('acquirer', 'acquirer acquiring bank merchant terminal', [R(2.5, 6, 7.5, 13, 1.8), R(4, 7.8, 4.5, 3, 0.6, 'd'), C(4.6, 14, 0.8, 'f'), C(7.9, 14, 0.8, 'f'), C(4.6, 16.6, 0.8, 'f'), C(7.9, 16.6, 0.8, 'f'), G('slide-r', P('M11 12.5h2.5M12 10.5l2 2-2 2', 'a')), P('M15 9.5 18.25 7l3.25 2.5Z'), P('M16.5 11v4M20 11v4M15 16.5h6.5')]),
  I('card-issuer', 'issuer issuing bank card provider', [P('M2.5 8 7.5 4l5 4Z', 'a'), P('M4.5 9.5v3M7.5 9.5v3M10.5 9.5v3M2.5 14h9'), G('float', card(12, 13.5, 9.5, 7), P('M12 16h9.5'))]),
  I('card-network', 'card scheme network rails interlinked', [C(9, 9.5, 5.5, 'd'), C(15, 9.5, 5.5, 'd'), C(12, 15, 5.5, 'd'), C(12, 11.5, 1.8, 'a', 'pulse')]),
  I('interchange-fee', 'interchange fee percent scheme cost', [G('slide-r', P('M3 7h15M15 4l3 3-3 3')), G('slide-l', P('M21 17H6M9 14l-3 3 3 3')), P('M10 13.5l4-3', 'a'), C(10.2, 10.3, 0.9, 'f'), C(13.8, 13.7, 0.9, 'f')]),
  I('payment-routing', 'routing smart orchestration processors', [C(5, 12, 2.8, 'a', 'pulse'), P('M7.8 12H16M7.3 10.4l9.2-5M7.3 13.6l9.2 5', 'd', 'dash'), C(18.5, 5, 2.3), C(18.5, 12, 2.3), C(18.5, 19, 2.3)]),
  I('payment-api', 'payments api developer integration sdk', [P('M7 4H6a2 2 0 0 0-2 2v3.5L2.5 12 4 14.5V18a2 2 0 0 0 2 2h1'), P('M17 4h1a2 2 0 0 1 2 2v3.5l1.5 2.5-1.5 2.5V18a2 2 0 0 1-2 2h-1'), G('pulse', C(12, 12, 4, 'a'), P('M12 10.2v3.6'))]),
  // ---- status ----
  I('payment-success', 'payment successful paid complete done', [phone(), G('pop', C(12, 10.5, 4.2, 'a'), P('M10.1 10.6l1.3 1.3 2.6-2.8', 'd', 'draw')), P('M9 17.5h6')]),
  I('payment-pending', 'payment pending processing waiting', [phone(), C(12, 10.5, 4.2, 'a'), G('spin', X(12, 10.5, 2.6), P('M12 10.5V8.2')), P('M12 10.5h1.8'), P('M9 17.5h6')]),
  I('payment-failed', 'payment failed error declined unsuccessful', [phone(), G('shake', C(12, 10.5, 4.2, 'a'), P('M10.4 8.9l3.2 3.2M13.6 8.9l-3.2 3.2')), P('M9 17.5h6')]),
  I('refund-flow', 'refund flow return customer merchant', [C(4.7, 12, 2.4), C(19.3, 12, 2.4), G('slide-r', P('M8 9.2c2.5-2.4 5.5-2.4 8 0M14 6.9l2 2.3-2.6.8')), G('slide-l', P('M16 14.8c-2.5 2.4-5.5 2.4-8 0M10 17.1l-2-2.3 2.6-.8', 'a'))]),
  I('receipt-email', 'email receipt confirmation inbox', [G('slide-u', P('M7 13V4h10v9Z', 'a'), P('M9.5 7h5M9.5 9.5h3')), R(3, 10, 18, 11, 2), P('M3.5 11.5l8.5 5.5 8.5-5.5')]),
  I('payment-reminder', 'reminder due notice bell payment', [G('ring', P('M10 3.5a5 5 0 0 0-5 5v3.5l-1.5 2.5h13L15 12V8.5a5 5 0 0 0-5-5Z'), P('M8.3 17.3a1.8 1.8 0 0 0 3.4 0')), G('pulse', C(18, 17, 4, 'a'), P('M18 15.2v3.6'))]),
  // ---- bank side ----
  I('payout-to-bank', 'payout withdraw bank settlement funds', [G('drop', C(12, 4.5, 2.6, 'a'), P('M12 3.4v2.2')), P('M3.5 12.5 12 8.5l8.5 4Z'), P('M6 14v4M10 14v4M14 14v4M18 14v4'), R(3.5, 19, 17, 2, 0.8)]),
  I('open-banking', 'open banking connect api account link', [P('M2.5 9 7.5 5.5l5 3.5Z'), P('M4.5 10.5v4.5M7.5 10.5v4.5M10.5 10.5v4.5M2.5 17h10'), G('slide-l', P('M13 11h2.5M13 15h2.5'), R(15.5, 8.5, 6, 9, 2, 'a'))]),
  I('micro-deposits', 'micro deposits verify account small amounts', [G('drop', C(8.5, 5, 2, 'a')), G('drop:.6', C(15.5, 5, 2, 'a')), card(2.5, 10, 19, 10), P('M2.5 13.5h19M5.5 17h4')]),
  I('account-number', 'iban account number routing bank details', [card(2.5, 5, 19, 14), R(5.5, 8, 4, 3, 0.8, 'a'), P('M14 9.5h4.5'), P('M5.5 14.5h2.5M10.5 14.5h2.5M15.5 14.5h2.5', 'd', 'draw')]),
  I('balance-transfer', 'balance transfer move card credit', [card(2.5, 3, 12.5, 8.5), P('M2.5 6h12.5'), G('float', card(9, 12.5, 12.5, 8.5, 'a'), P('M9 15.5h12.5')), G('slide-d', P('M16.5 5h1.5a2 2 0 0 1 2 2v3'), P('M18.3 8.8 20 10.5l1.7-1.7'))]),
  I('kyc-scan', 'kyc identity verification scan onboarding', [P('M3 7.5v-3A1.5 1.5 0 0 1 4.5 3h3M16.5 3h3A1.5 1.5 0 0 1 21 4.5v3M21 16.5v3a1.5 1.5 0 0 1-1.5 1.5h-3M7.5 21h-3A1.5 1.5 0 0 1 3 19.5v-3'), R(6, 7, 12, 10, 1.8), C(9.5, 11.2, 1.6, 'a'), P('M7.3 15a2.2 2.2 0 0 1 4.4 0M13.5 10.5h2.5M13.5 13.5h2'), P('M4.5 12h15', 'a', 'scan')]),
  // ---- devices and checkout ----
  I('pos-receipt', 'pos terminal receipt print sale', [G('slide-u', P('M7.5 10V3.5h9V10Z', 'a'), P('M10 6h4')), R(4, 8.5, 16, 12.5, 2.5), P('M7.5 11.5h9'), ...[8.5, 12, 15.5].flatMap((x) => [C(x, 15, 0.9, 'f'), C(x, 18, 0.9, 'f')])]),
  I('mobile-card-reader', 'card reader dongle mobile pos', [R(3, 2.5, 9.5, 19, 2.5), P('M6.5 18.5h2.5'), G('slide-d', R(14.8, 5.5, 5.4, 8, 1.2)), R(12.5, 13, 9, 8, 2, 'a'), P('M14.5 15.3h5')]),
  I('tap-on-phone', 'tap on phone softpos accept card', [R(12, 2.5, 9.5, 19, 2.5), P('M15.5 18.5h2.5'), P('M15.3 10a2.5 2.5 0 0 1 0 4', 'd', 'blink'), P('M17.3 8.5a4.8 4.8 0 0 1 0 7', 'd', 'blink:.3'), G('slide-r', P('M2.5 8.5l6.8-1.8 2.4 9-6.8 1.8Z', 'a'))]),
  I('pos-register', 'till register cash drawer retail', [R(11, 3, 8, 5, 1, 'a', 'breathe'), P('M15 8v3'), P('M4.5 11h15l1.5 10h-18Z'), C(8, 14, 0.9, 'f'), C(11, 14, 0.9, 'f'), C(14, 14, 0.9, 'f'), P('M4 17.5h16')]),
  I('payment-methods', 'payment methods options card cash', [card(2.5, 4, 15, 10.5), P('M2.5 7.5h15M5.5 11h3'), G('float', C(15.5, 15.5, 5.5, 'a'), C(15.5, 15.5, 3.4, 'd'))]),
  I('p2p-payment', 'peer to peer send friend pay', [C(5.5, 8, 2.5), P('M2 16a3.5 3.5 0 0 1 7 0Z'), C(18.5, 8, 2.5), P('M15 16a3.5 3.5 0 0 1 7 0Z'), G('slide-r', P('M9.5 8h5M13 6.5l1.5 1.5-1.5 1.5')), G('pulse', C(12, 18, 2.8, 'a'), P('M12 17v2'))]),
  I('split-payment', 'split payment divide fork share', [C(5.5, 12, 3.3, 'a', 'pulse'), P('M9 12h2.5c2.5 0 3.5-5 7.5-5M11.5 12c2.5 0 3.5 5 7.5 5'), G('slide-r', P('M17 4.8 19.2 7 17 9.2M17 14.8l2.2 2.2-2.2 2.2'))]),
  // ---- invoices, cards, fx ----
  I('invoice-due', 'invoice due overdue pay by date', [...sdocEls(), C(18, 17, 4.2, 'a'), G('spin', X(18, 17, 2.4), P('M18 17v-2.2')), P('M18 17h1.6')]),
  I('invoice-settled', 'invoice paid stamp settled bill', [P(doc), P('M14.5 3v5h5M8 8.5h4M8 11.5h6'), G('pop', P('M8.5 14.5l9-2.4 1.2 4.4-9 2.4Z', 'a'), P('M11 16.2l4.6-1.2'))]),
  I('multi-currency', 'multi currency coins forex accounts', [C(7.5, 8.5, 4.5), P('M7.5 7v3'), C(16.5, 8.5, 4.5), P('M15 8.5h3'), G('float', C(12, 16, 4.5, 'a'), C(12, 16, 1.5, 'd'))]),
  I('exchange-rate', 'exchange rate fx chart quote', [R(3, 4, 18, 16, 2.5), P('M6.5 8h4'), P('M6.5 15.5l3.5-3.5 3 2 4.5-5', 'a', 'draw'), P('M15 9h2.5v2.5', 'a')]),
  I('spending-limit', 'spending limit cap control card', [card(2.5, 3.5, 19, 12), P('M2.5 7h19M5.5 11.5h4'), P('M3.5 19.5h17'), C(15, 19.5, 2.2, 'a', 'slide-l')]),
  I('corporate-card', 'corporate card business expense company', [...small(), G('pulse', C(18, 17, 4.2, 'a'), R(15.8, 16, 4.4, 3.2, 0.6, 'd'), P('M17 16v-.9h2v.9'))]),
];
