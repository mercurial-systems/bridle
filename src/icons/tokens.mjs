import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

// Token types and asset mechanics. Abstract glyphs only: hexagons and coins stand in for any token, never a real mark.
const hex = (cx, cy, r, role = 'b', an) => P(poly(cx, cy, r, 6), role, an);
const doc = 'M7 3h7.5L19.5 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z';
// annular sector (donut slice), angles in degrees, 0 = up, clockwise
const ann = (cx, cy, ro, ri, a0, a1) => {
  const p = (r, a) => [cx + r * Math.sin((a * Math.PI) / 180), cy - r * Math.cos((a * Math.PI) / 180)].map((v) => +v.toFixed(2)).join(' ');
  const L = a1 - a0 > 180 ? 1 : 0;
  return `M${p(ro, a0)}A${ro} ${ro} 0 ${L} 1 ${p(ro, a1)}L${p(ri, a1)}A${ri} ${ri} 0 ${L} 0 ${p(ri, a0)}Z`;
};

export default [
  // ---- token types ----
  I('fungible-token', 'fungible interchangeable identical units erc20 spl', [C(5.2, 12, 3, 'a'), C(5.2, 12, 1, 'f'), G('flip', C(12, 12, 3, 'a'), C(12, 12, 1, 'f')), C(18.8, 12, 3, 'a'), C(18.8, 12, 1, 'f'), P('M3.5 18h17', 'd', 'draw')]),
  I('semi-fungible', 'semi fungible edition series erc1155 batch', [P('M5 10v8c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-8Z'), E(12, 10, 7, 2.5), P('M5 14c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5'), hex(12, 4.6, 2.4, 'a', 'float')]),
  I('multi-token', 'multi token standard many assets one contract', [C(7.5, 7.5, 3.5, 'a', 'pop'), R(13, 4, 7, 7, 1.6), hex(7.5, 16.5, 3.9), P('M16.5 12.8 20.5 20h-8Z', 'a', 'pop:.5')]),
  I('token-pair', 'pair base quote two tokens market', [C(9, 10, 6), G('diag', C(15, 14, 6, 'a'), C(15, 14, 3.4, 'd'))]),
  I('memecoin', 'meme coin fun community smiley speculative', [G('wiggle', C(12, 12, 9.5, 'a'), C(9, 10, 1.2, 'f'), C(15, 10, 1.2, 'f'), P('M8 14c1 2 2.4 3 4 3s3-1 4-3'))]),
  I('governance-token', 'governance voting power token crown control', [P('M5 9.2 6 3.5l3.5 3L12 3l2.5 3.5 3.5-3 1 5.7Z', 'a', 'float'), hex(12, 15.5, 5.5), hex(12, 15.5, 2.6, 'd')]),
  I('utility-token', 'utility access usage power service token', [hex(12, 12, 9.5), P('M13 5.5 8.5 13H12l-1 5.5 4.5-7.5H12Z', 'a', 'blink')]),
  I('synthetic-asset', 'synthetic synth mirror tracked derivative asset', [C(14.5, 9.5, 6, 'd', 'dash'), C(9.5, 14.5, 6, 'a'), C(9.5, 14.5, 3.3, 'd')]),
  I('liquid-staked-token', 'liquid staking lst staked receipt token', [P('M12 2.5c3 4 6.5 7.5 6.5 11.5a6.5 6.5 0 0 1-13 0c0-4 3.5-7.5 6.5-11.5Z'), G('spin-slow', X(12, 14.5, 3.4), hex(12, 14.5, 3.3, 'a'))]),
  I('lp-token', 'lp liquidity provider share pool token', [P('M11 3a9 9 0 0 0 0 18Z', 'a', 'slide-l'), P('M13 3a9 9 0 0 1 0 18Z', 'b', 'slide-r'), P('M11 7.5a4.5 4.5 0 0 0 0 9M13 7.5a4.5 4.5 0 0 1 0 9')]),
  I('index-token', 'index basket bundle weighted portfolio token', [hex(12, 12, 3.6, 'a', 'pulse'), ...[0, 72, 144, 216, 288].map((a, i) => C(+(12 + 7.4 * Math.sin((a * Math.PI) / 180)).toFixed(2), +(12 - 7.4 * Math.cos((a * Math.PI) / 180)).toFixed(2), 2.3, 'b'))]),
  I('tranche-token', 'tranche senior junior risk layers structured', [R(8, 3.5, 8, 4.5, 1.6, 'a', 'float'), R(5.5, 10, 13, 4.5, 1.6), R(3, 16.5, 18, 4.5, 1.6)]),

  // ---- token-2022 style extensions ----
  I('transfer-fee', 'transfer fee tax cut slice per transfer', [P(wedge(9, 13, 6.5, 70, 360), 'a'), P(wedge(10.3, 11.2, 6.5, 0, 70), 'b', 'diag'), G('slide-r', P('M17 18.5h4M19.3 16.8 21 18.5l-1.7 1.7'))]),
  I('interest-bearing', 'interest bearing accrue apy token growing', [C(12, 12, 5, 'a'), P('M10.3 13.7l3.4-3.4'), C(10.2, 10.3, 0.7, 'f'), C(13.8, 13.7, 0.7, 'f'), P(arc(12, 12, 8.5, -150, 150), 'd', 'draw')]),
  I('confidential-amount', 'confidential private hidden amount balance masked', [C(12, 12, 8.5), C(12, 12, 5.5, 'd'), R(2.5, 9.5, 19, 5, 2.5, 'a'), C(8.5, 12, 0.9, 'f', 'blink'), C(12, 12, 0.9, 'f', 'blink:.3'), C(15.5, 12, 0.9, 'f', 'blink:.6')]),
  I('metadata-pointer', 'metadata pointer uri link token info', [R(14, 3, 7, 9, 1.6), P('M16 6.5h3M16 9h2'), P('M7 10V7.5a2 2 0 0 1 2-2h3M10.8 3.8l1.7 1.7-1.7 1.7', 'd', 'dash'), hex(7, 15.5, 4.5, 'a')]),
  I('freeze-authority', 'freeze authority frozen account halt token', [hex(12, 12, 9.5), G('spin-slow', X(12, 12, 6), P('M12 6.5v11M7.2 9.25l9.6 5.5M7.2 14.75l9.6-5.5M10.5 6.8 12 8.3l1.5-1.5M10.5 17.2 12 15.7l1.5 1.5')), C(12, 12, 1.8, 'a')]),
  I('mint-authority', 'mint authority issuer stamp create supply', [G('slide-d', C(12, 4.3, 2), R(10.6, 6.3, 2.8, 4, 0.8), R(6, 10.3, 12, 3.4, 1.2, 'a')), E(12, 18.8, 6.5, 2.3), P('M3.5 21.5h17')]),
  I('renounced-authority', 'renounced authority revoked burned key immutable', [C(7, 7, 4.2, 'a'), C(7, 7, 1.4, 'd'), P('M10 10 12.3 12.3M14.8 14.8 20.5 20.5M17.8 17.8 15.8 19.8'), P(spark(13.5, 13.5, 2.6), 'b', 'blink')]),
  I('token-extension', 'extension plugin token program feature add on', [hex(10.5, 12, 8.3), hex(10.5, 12, 3.6, 'd'), C(19, 12, 2.6, 'a', 'pulse')]),
  I('required-memo', 'memo required note transfer message', [P('M5 3.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4.5 4v-4H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z'), C(12, 10, 3.4, 'a', 'pop'), C(12, 10, 1.4, 'd')]),
  I('pausable-token', 'pause paused halt transfers token', [C(12, 12, 9), R(8.5, 8, 2.6, 8, 1, 'a', 'blink'), R(12.9, 8, 2.6, 8, 1, 'a', 'blink')]),
  I('blocked-token', 'denylist blocked banned blacklist token', [C(12, 12, 9.3), hex(12, 12, 4.3, 'a'), P('M5.4 5.4l13.2 13.2', 'd', 'draw')]),
  I('timelocked-token', 'timelock time locked release later token', [R(10.5, 2.3, 3, 2.2, 0.7), C(12, 13.5, 8), hex(12, 13.5, 2.2, 'a'), G('spin', X(12, 13.5, 5.5), P('M12 13.5V8.2'))]),

  // ---- accounts ----
  I('token-account', 'token account balance holding ata', [R(5, 2.5, 14, 19, 2.5), hex(12, 8.5, 3.3, 'a', 'flip'), P('M8.5 14.5h7M8.5 18h4')]),
  I('associated-account', 'associated derived account pda owner link', [C(6, 6.5, 3.2, 'a'), C(6, 6.5, 1.1, 'd'), P('M6 10v4a3 3 0 0 0 3 3h3M10.5 15.3 12.2 17l-1.7 1.7', 'd', 'dash'), R(13, 12.5, 8, 9, 2), hex(17, 17, 2, 'd')]),
  I('verified-token', 'verified token checked trusted legit', [hex(12, 12, 9.5, 'a'), P('M8 12.2l2.8 2.8 5.2-5.8', 'd', 'draw')]),
  I('suspicious-token', 'suspicious scam warning unverified token risk', [P('M12 2.8 21.5 19.5h-19Z'), G('shake', hex(12, 14.6, 3.2, 'a')), P('M12 7.6v2.4')]),

  // ---- supply mechanics ----
  I('rebasing-token', 'rebase elastic supply expand contract balance', [C(12, 12, 4.8, 'a', 'pulse'), C(12, 12, 2.2, 'd'), P('M7.2 7.2 3.5 3.5M3.5 6.5v-3h3M16.8 7.2l3.7-3.7M17.5 3.5h3v3M7.2 16.8l-3.7 3.7M3.5 17.5v3h3M16.8 16.8l3.7 3.7M20.5 17.5v3h-3', 'd', 'blink')]),
  I('supply-cap', 'max supply cap ceiling hard limit', [R(5, 3, 14, 3, 1), P('M6 7.5h12V19a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 6 19Z'), P('M8.5 10h7', 'd', 'dash'), R(8.5, 12.5, 7, 6.5, 1, 'a', 'grow')]),
  I('emission-curve', 'emission curve issuance schedule rewards decay', [P('M3 3v18h18'), P('M3 5.5h18', 'd', 'dash'), P('M4 20C8 10 13 8.2 19.5 8', 'd', 'draw'), C(19.5, 8, 1.7, 'a', 'pulse')]),
  I('token-allocation', 'allocation tokenomics team investors community split', [P(ann(12, 12, 9.5, 5.5, 8, 152), 'a', 'pop'), P(ann(12, 12, 9.5, 5.5, 160, 262)), P(ann(12, 12, 9.5, 5.5, 270, 352))]),
  I('cliff-unlock', 'cliff unlock vesting cliff release drop', [P('M2.5 21v-8.5l3.5-2.5 3 1.2 3.5-1.7.8 3.5-1 2.5.8 5.5Z'), C(16.8, 7.5, 2.8, 'a', 'drop'), C(18.3, 18.5, 2.5), C(18.3, 18.5, 1, 'd')]),
  I('linear-vesting', 'linear vesting gradual release stream ramp', [P('M3 20.5h18V7Z'), C(10.3, 11.3, 2.8, 'a', 'diag'), C(10.3, 11.3, 1, 'd')]),
  I('circulating-supply', 'circulating supply float total outstanding', [C(12, 12, 9, 'd', 'dash'), C(12, 12, 6, 'a', 'pulse'), C(12, 12, 3, 'd')]),
  I('fully-diluted-value', 'fdv fully diluted value total supply valuation', [P('M6 12.5V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v7.5', 'd', 'dash'), R(6, 12.5, 12, 8.5, 2, 'a', 'grow'), P('M2.5 21.5h19')]),
  I('market-cap', 'market cap capitalisation valuation price times supply', [P('M3 3v18h18'), R(6.5, 8.5, 11, 9.5, 1.5, 'a', 'pop'), C(17.5, 5, 2.2), P('M6.5 5.5h7', 'd', 'dash')]),
  I('supply-counter', 'supply counter minted total odometer count', [R(2.5, 6, 19, 12, 2.5), P('M8.5 8.5v7M13.5 8.5v7'), P('M5.5 10.5v3M11 10.5v3'), R(15.3, 9, 3.5, 6, 1, 'a', 'slide-u')]),
  I('dilution', 'dilution new supply ownership diluted shares', [P('M12 2c1.2 1.6 2 2.7 2 3.6a2 2 0 0 1-4 0c0-.9.8-2 2-3.6Z', 'a', 'drop'), P('M5 8.5h14l-1.7 12.5H6.7Z'), P('M6.3 13.5h11.4', 'd', 'slide-u')]),
  I('token-sink', 'token sink burn utility drain spend', [G('spin-slow', X(12, 13.5, 8), P(arc(12, 13.5, 8, -120, 150)), P(arc(12, 13.5, 5, 60, 330)), P(arc(12, 13.5, 2, -90, 180))), C(19, 4.5, 2.2, 'a', 'drop')]),
  I('reward-emission', 'emissions rewards distribute spray incentives', [C(12, 5, 2.5, 'a', 'float'), C(5, 9.5, 1.8, 'b', 'rise'), C(19, 9.5, 1.8, 'b', 'rise:.5'), P('M12 15.5V8.5M12 13c-1.8-2-3.8-2.8-5.5-2.8M12 13c1.8-2 3.8-2.8 5.5-2.8', 'd', 'dash'), P('M4 15.5h16c0 3-3.6 5-8 5s-8-2-8-5Z')]),
  I('token-flywheel', 'flywheel tokenomics loop value accrual cycle', [C(12, 12, 9.3), G('spin', X(12, 12, 6.5), C(12, 12, 6.5, 'd'), P('M14.5 9.5l2.5-2.5M9.5 9.5 7 7M9.5 14.5 7 17M14.5 14.5 17 17')), C(12, 12, 3, 'a')]),

  // ---- real world and backed assets ----
  I('tokenized-stock', 'tokenized stock equity share onchain rwa', [R(4, 10, 3, 6, 0.8), P('M5.5 7v3M5.5 16v3M12 4v4M12 14v4M18.5 9v3M18.5 17v3'), hex(12, 11, 3.1, 'a', 'pulse'), R(17, 12, 3, 5, 0.8)]),
  I('tokenized-treasury-bill', 'tokenized treasury bill tbill government rwa yield', [R(2.5, 6, 19, 12, 2), P('M5.5 10h5.5M5.5 13.5h3.5'), hex(16, 12, 3.4, 'a', 'flip')]),
  I('tokenized-deed', 'tokenized real estate deed property title rwa', [P(doc), P('M14 3v5h5.5'), P('M8.5 18v-4.2l3.5-3 3.5 3V18Z', 'a', 'pop')]),
  I('tokenized-gold', 'tokenized gold bar precious metal rwa', [G('float', P('M3 19 6.3 7h11.4L21 19Z', 'a'), hex(12, 13.5, 3, 'd'), P('M8 9.6h3.5', 'h'))]),
  I('tokenize-asset', 'tokenize real world asset convert onchain rwa', [cube(6.5, 11, 4.5, ['b', 'b', 'b']), G('slide-r', P('M11 12h2.6M12.4 10l2 2-2 2')), hex(18.3, 12, 3.4, 'a', 'pop')]),
  I('coin-roll', 'roll batch denomination wrapped coins', [G('tilt', P('M6 7.5h12v9H6Z'), P('M10 7.5v9M14 7.5v9'), E(6, 12, 2.4, 4.5, 'a'), P('M18 7.5a2.4 4.5 0 0 1 0 9'))]),

  // ---- stablecoins ----
  I('fiat-backed-stable', 'fiat backed stablecoin reserve bank dollar', [C(12, 6.5, 4.2, 'a', 'float'), P('M10 5.6h4M10 7.4h4'), R(4, 12, 16, 2, 1), P('M7 14v4.5M12 14v4.5M17 14v4.5'), R(3, 18.5, 18, 2.5, 1)]),
  I('overcollateralized-stable', 'crypto collateralized stablecoin overcollateral backing', [hex(7.5, 16.5, 4.2), hex(16.5, 16.5, 4.2), C(12, 6.8, 3.8, 'a', 'float'), P('M10.2 6h3.6M10.2 7.6h3.6')]),
  I('algorithmic-stable', 'algorithmic stablecoin peg mechanism supply algorithm', [G('spin-slow', X(12, 12, 9.5), P(gear(12, 12, 9.5, 7.6, 10))), C(12, 12, 4.6, 'a'), P('M10 11h4M10 13h4')]),
  I('yield-stable', 'yield bearing stablecoin savings earn dollar', [G('grow', P('M12 9.2V5'), P('M12 6c0-2 1.5-3.5 4-3.5 0 2.5-1.5 3.5-4 3.5Z')), C(12, 15, 6, 'a'), P('M9.5 14h5M9.5 16.5h5')]),
  I('peg-anchor', 'peg anchor stable hold value dollar', [C(12, 5, 2.4, 'a'), P('M12 7.4V20M8.5 11h7M4.5 14a7.5 7.5 0 0 0 15 0', 'd', 'swing'), P('M3 15.5 4.5 14 6 15.5M18 15.5l1.5-1.5 1.5 1.5')]),
  I('reserve-attestation', 'reserve attestation audit proof of reserves backing', [R(4, 13, 4, 8, 1), R(10, 11, 4, 10, 1), R(16, 14.5, 4, 6.5, 1), P('M4 16h4M10 14h4M10 17h4M16 17.5h4'), P('M7.5 6 10.5 9 16.5 3', 'a', 'draw')]),
  I('reserve-ratio', 'reserve ratio backing coverage gauge collateralization', [P('M2.5 16.5a9.5 9.5 0 0 1 19 0Z'), P('M5.5 16.5H7M17 16.5h1.5M12 9.5V11'), G('seesaw', X(12, 16.5, 7), P('M12 16.5 16 10.5', 'a')), C(12, 16.5, 1.6, 'a'), P('M2.5 20.5h19')]),
  I('mint-redeem-desk', 'mint redeem desk issue redemption counter', [C(12, 8.5, 3.5, 'a', 'pop'), R(3, 14, 18, 3, 1), P('M5 17v4M19 17v4'), G('slide-d', P('M5 4.5v6M3.5 9 5 10.5 6.5 9')), G('slide-u', P('M19 10.5v-6M17.5 6 19 4.5 20.5 6'))]),
  I('redemption-queue', 'redemption queue withdraw line waiting', [R(16.5, 3.5, 5, 17, 1.6), P('M16.5 9.5h2'), C(4.5, 12, 2, 'b', 'slide-r'), C(9, 12, 2, 'b', 'slide-r:.2'), C(13.2, 12, 2, 'a', 'slide-r:.4')]),
  I('vault-share', 'vault share erc4626 deposit receipt strategy', [R(3, 4, 18, 15, 2.5), P('M6.5 19v2M17.5 19v2M18 9.5v5'), C(10.5, 11.5, 4.2), P(wedge(10.5, 11.5, 4.2, 0, 100), 'a', 'pop')]),
  I('yield-receipt', 'yield receipt deposit claim earnings token', [P('M5 2.5h14v19l-2.3-1.5-2.3 1.5-2.4-1.5-2.4 1.5-2.3-1.5L5 21.5Z'), P('M8 6.5h8M8 9.5h5'), C(12, 15, 3.2, 'a', 'pulse'), P('M12 16.4v-2.8M10.8 14.8 12 13.6l1.2 1.2')]),
  I('dividend-token', 'dividend payout distribution holders income', [C(12, 8, 5.5, 'a'), C(12, 8, 2.8, 'd'), C(7, 17.5, 1.2, 'f', 'drop'), C(12, 19, 1.2, 'f', 'drop:.4'), C(17, 17.5, 1.2, 'f', 'drop:.8')]),

  // ---- distribution and holders ----
  I('eligibility-check', 'airdrop eligibility checker qualify filter wallet', [P('M3 4h18l-7 8v6l-4 2.5V12Z'), P('M14.8 17.5l2 2 4-4.5', 'a', 'draw')]),
  I('balance-snapshot', 'snapshot balance record holders block capture', [G('pulse', P('M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3')), P('M7 10v4.5c0 1.1 2.2 2 5 2s5-.9 5-2V10Z'), E(12, 10, 5, 2, 'a'), P('M7 12.3c0 1.1 2.2 2 5 2s5-.9 5-2')]),
  I('token-gate', 'token gating access gate holders only', [P('M4 21V10a8 8 0 0 1 16 0v11Z'), hex(12, 11.5, 3, 'a', 'pulse'), P('M12 14.5v3'), P('M2.5 21h19')]),
  I('points-to-token', 'points convert token conversion claim', [P(star(6.5, 17, 3.8, 1.7)), P('M9.8 13.2l3.2-3.2', 'd', 'dash'), C(16.5, 7.5, 4.5, 'a', 'pop'), C(16.5, 7.5, 2.2, 'd')]),
  I('holder-distribution', 'holders distribution concentration wallets top holders', [R(3.5, 9, 3, 12, 1, 'a', 'grow'), R(8.5, 13, 3, 8, 1), R(13.5, 16, 3, 5, 1), R(18.5, 18, 3, 3, 1), C(5, 6.2, 1.6), C(10, 10.2, 1.6), C(15, 13.2, 1.6), C(20, 15.2, 1.6)]),
  I('whale-holder', 'whale large holder big wallet concentration', [P('M2.5 14c0-3.3 3.2-5.5 7.5-5.5 4 0 6.8 2 8 4.6l2-3.6h1.5l-1.2 5.3 1.7 3.7H20l-2-2.2c-1.4 2.8-4.4 4.2-8.2 4.2C5.3 20.5 2.5 17.6 2.5 14Z'), C(7, 13, 0.9, 'f'), C(9, 4.5, 2.4, 'a', 'rise')]),
  I('token-registry', 'token list registry assets tracked', [hex(5.5, 6, 2.2, 'a'), hex(5.5, 12, 2.2), hex(5.5, 18, 2.2), P('M10 6h10.5M10 12h8M10 18h9.5', 'd', 'draw')]),
  I('token-migration', 'migration upgrade v2 swap old new token', [hex(6, 16.5, 3.5), P('M6 12C6.5 6.5 12 4.2 16.5 8.5', 'd', 'draw'), P('M16.9 5.3l-.4 3.2-3.2.1'), hex(17, 15.5, 4.5, 'a', 'pop')]),
  I('bridged-token', 'bridged token canonical representation cross chain', [P('M2.5 8 7.5 4h14l-5 4Z'), G('slide-d', C(12, 12, 2.6, 'a')), P('M2.5 20 7.5 16h14l-5 4Z')]),
  I('token-split', 'split redenomination divide token stock split', [C(6, 12, 3.8, 'a'), C(6, 12, 1.6, 'd'), P('M10 12h2.5l3-4.5M12.5 12l3 4.5', 'd', 'draw'), C(18, 6.5, 2.7, 'a', 'pop'), C(18, 17.5, 2.7, 'a', 'pop:.4')]),
  I('reflection-token', 'reflection redistribution holders auto rewards', [C(12, 8, 4.8, 'a', 'float'), C(12, 8, 2.2, 'd'), P('M3 14.5h18'), P('M7.5 16.8c0 2.2 2 3.7 4.5 3.7s4.5-1.5 4.5-3.7', 'd', 'dash')]),

  // ---- token info and market ----
  I('logo-upload', 'token logo upload image icon set', [C(12, 12, 9, 'd', 'dash'), P('M12 16V8.5M8.8 11.5 12 8.3l3.2 3.2', 'a', 'slide-u'), P('M8.5 16.5h7')]),
  I('token-metadata', 'metadata name symbol tag token info', [P('M3 4.5A1.5 1.5 0 0 1 4.5 3H11l10 10-8 8L3 11Z'), hex(7.8, 7.8, 2, 'a', 'pulse'), P('M11 13.5l3 3M13.5 11l2.5 2.5')]),
  I('token-standard', 'token standard spec interface blueprint', [R(3, 3, 18, 18, 2.5), C(12, 10, 6, 'd', 'dash'), hex(12, 10, 3.6, 'a'), P('M6 17.5h12M6 16.5v2M18 16.5v2')]),
  I('decimals', 'decimals precision places smallest unit', [R(2.5, 7, 5, 10, 2.5), C(10, 16, 1.4, 'a', 'blink'), R(12.5, 7, 5, 10, 2.5), R(19, 10.5, 2.6, 6.5, 1.3)]),
  I('dust', 'dust tiny balance sweep small amounts', [G('wiggle', P('M20.5 3.5 13 11'), P('M11 9.5 14.5 13 11 18.5 3 21l2-8Z'), P('M7.2 15.5 5.5 19M10 16.5l-2 3')), C(17.5, 18.5, 1.6, 'a', 'blink'), C(15, 21, 0.9, 'f'), C(20.5, 15.5, 0.9, 'f')]),
  I('pair-chart', 'pair chart ratio price token pair', [R(3, 3, 18, 18, 3), P('M6 9l4 3 3-1 5 4', 'd'), P('M6 16l4-4 3 2 5-6', 'a', 'draw')]),
  I('token-velocity', 'velocity turnover circulation speed token', [P('M2.5 8h5M3.5 12h4.5M2.5 16h5', 'd', 'blink'), G('slide-r', C(15, 12, 5.5, 'a'), C(15, 12, 2.6, 'd'))]),
  I('token-hype', 'hype heat trending momentum attention token', [R(9.5, 2.5, 5, 13, 2.5), C(12, 17.5, 4, 'a', 'pulse'), P('M12 15V7.5', 'd', 'grow'), P('M16.5 6h2M16.5 9h2M16.5 12h2')]),
  I('token-group', 'token group collection parent members hierarchy', [hex(12, 6, 3.5, 'a', 'pulse'), P('M12 9.5v2.5M6 15v-3h12v3'), hex(6, 18, 3), hex(18, 18, 3)]),
];
