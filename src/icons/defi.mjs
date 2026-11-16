import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

// DeFi & Web3 operations: protocol mechanics, chain infrastructure, security and on-chain identity. Mark-free glyphs only.
const shield = 'M12 2.8 19.5 5.5v6c0 4.7-3.2 8.4-7.5 9.9-4.3-1.5-7.5-5.2-7.5-9.9v-6Z';
const doc = 'M7 3h7.5L19.5 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z';
const corners = 'M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3';
// clockwise loop arrow around (12,12) with its head at the top-left
const loop = (an) => G(an, X(12, 12, 9), P(arc(12, 12, 8, 45, 315)), P('M3.5 6.3h2.8v2.8'));
const check = (x, y) => P(`M${x - 1.8} ${y}l1.2 1.2 2.4-2.6`, 'd', 'draw');
const cyl = (cx, top, h, w = 6) => [
  P(`M${cx - w} ${top}v${h}c0 1.4 2.7 2.5 ${w} 2.5s${w}-1.1 ${w}-2.5V${top}Z`),
  E(cx, top, w, 2.5),
  P(`M${cx - w} ${top + h / 2}c0 1.4 2.7 2.5 ${w} 2.5s${w}-1.1 ${w}-2.5`),
];

export default [
  // ---- protocol mechanics ----
  I('yield-vault', 'vault strategy defi earn automated', [R(3, 3.5, 18, 15, 2.5), P('M6.5 21v-2.5M17.5 21v-2.5'), P('M6.5 14.5l3.5-3.5 2.5 2 4.5-4.5', 'a', 'draw'), P('M14.5 8.5H17V11')]),
  I('auto-compound', 'compound reinvest yield loop growth', [loop('spin-slow'), C(12, 12, 4, 'a', 'pulse'), P('M12 10.3v3.4M10.3 12h3.4')]),
  I('lp-range', 'concentrated liquidity range position ticks', [R(4, 14, 2.5, 6.5, 0.8), R(9.25, 9, 2.5, 11.5, 0.8, 'a', 'grow'), R(12.75, 6.5, 2.5, 14, 0.8, 'a', 'grow:.3'), R(18, 13, 2.5, 7.5, 0.8), P('M8 3.5v17M17 3.5v17', 'd', 'dash')]),
  I('impermanent-loss', 'il divergence lp loss hodl', [P('M3 18.5 21 5.5'), P('M3 18.5C10 16 15 14.5 21 13.5', 'a', 'draw'), P('M18.5 8v4', 'd', 'blink')]),
  I('flash-loan', 'flash borrow repay atomic instant', [loop('spin'), C(12, 12, 5), P('M12.8 8.5 10.3 12.5h2.2l-.8 3.2 2.5-4.2h-2.2Z', 'a', 'pulse')]),
  I('collateral-ratio', 'ltv ratio collateral debt coverage', [R(3, 4, 7, 16.5, 2, 'a', 'grow'), R(14, 12.5, 7, 8, 2), C(12, 10, 1, 'f'), C(12, 14.5, 1, 'f')]),
  I('health-factor', 'position health risk safety margin', [C(12, 12, 9), P('M5.5 12.5h3l1.5-3.5 3 7 1.5-3.5h4', 'a', 'draw')]),
  I('rate-model', 'interest rate curve utilization kink', [P('M4 3v17h17'), P('M6 18 14 15.5 20 5', 'a', 'draw'), C(14, 15.5, 1.8, 'b', 'pulse')]),
  I('depeg', 'stablecoin peg break deviation risk', [P('M3 7.5h18', 'd', 'dash'), G('sink', C(12, 14.5, 6, 'a'), P('M9.5 13.5h5M9.5 16h5'))]),
  I('wrap-token', 'wrapped token convert bridge representation', [R(3, 3, 18, 18, 5), C(12, 12, 5.2, 'a', 'pop'), C(12, 12, 2.6, 'd')]),
  I('unwrap-token', 'unwrap native redeem convert', [R(3, 3, 18, 18, 5, 'd', 'dash'), G('float', C(12, 12, 5.2, 'a'), C(12, 12, 2.6, 'd'))]),
  I('token-allowance', 'allowance spending cap approve limit', [C(8, 8, 5, 'a'), C(8, 8, 2.5, 'd'), R(3, 16, 18, 4, 2), R(3, 16, 11, 4, 2, 'a', 'grow-x')]),
  I('approve-spender', 'approve token contract permission spend', [C(7.5, 12, 4.5, 'a'), C(7.5, 12, 2.2, 'd'), G('slide-r', P('M12.5 12h2.5M13.8 10.5l1.5 1.5-1.5 1.5')), R(16.5, 5.5, 5, 13, 1.5), P('M18.5 9h1M18.5 12h1M18.5 15h1')]),
  I('revoke-approval', 'revoke allowance permission cancel token', [C(10, 10, 7), C(10, 10, 4.2, 'd'), G('pulse', C(17.5, 17, 4.2, 'a'), P('M15.3 19.2l4.4-4.4'))]),
  I('permit', 'signature gasless approval offchain message', [P('M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2.5a2.5 2.5 0 0 0 0 5V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2.5a2.5 2.5 0 0 0 0-5Z'), P('M6.5 14c1.5 0 2-4 3.5-4s.5 4 2 4 1.5-2 3-2 1 1.5 2.5 1.5', 'a', 'draw')]),
  I('tx-nonce', 'nonce counter sequence transaction order', [R(3, 5, 13, 14, 2.5), P('M8.5 8.5 7.3 15.5M12 8.5l-1.2 7M6 10.5h7.5M5.5 13.5h7.5'), P('M19 19V7M16.8 9.2 19 7l2.2 2.2', 'a', 'slide-u')]),
  I('gas-gauge', 'gas tracker fee meter gwei', [P(arc(12, 14, 8.5, -100, 100)), P('M12 7v1.5M6.5 9.5l1 1M17.5 9.5l-1 1'), G('seesaw', X(12, 14, 6), P('M12 14l3.8-4.2', 'a')), C(12, 14, 1.8), P('M7 20h10')]),
  I('priority-tip', 'priority fee tip faster inclusion', [C(12, 12, 8.5, 'a'), G('slide-u', P('M8.5 13l3.5-3.5 3.5 3.5M8.5 17l3.5-3.5 3.5 3.5'))]),
  I('block-reward', 'reward subsidy miner validator issuance', [cube(9.5, 14.5, 6, ['a', 'b', 'b']), C(18, 5.5, 3, 'a', 'drop'), C(18, 5.5, 1.4, 'd', 'drop')]),
  I('halving', 'halving issuance cut supply schedule', [P('M11 3.5a8.5 8.5 0 0 0 0 17Z', 'a'), P('M13 3.5a8.5 8.5 0 0 1 0 17Z', 'b', 'sink')]),
  I('hash-difficulty', 'difficulty adjustment target work', [P('M3 20.5h18V8h-5.5v4.5H10v4H3Z'), P('M5.5 13V4M3.5 6l2-2 2 2', 'a', 'slide-u')]),
  I('hashrate', 'hash power speed mining throughput', [P('M2.5 9.5h3M2.5 14.5h3', 'd', 'blink'), G('slide-r', P('M12 4.5 10.5 19.5M17.5 4.5 16 19.5M8.5 9.5h12M8 14.5h12', 'a'))]),
  I('mining-pool', 'pool miners shared work rewards', [P('M6.4 6.8 9.8 11M12 6.2v4.3M17.6 6.8 14.2 11', 'd', 'dash'), C(5, 5, 2), C(12, 4, 2), C(19, 5, 2), cube(12, 17, 4.5, ['a', 'b', 'b'], 'pulse')]),
  I('mining-rig', 'asic rig hardware miner fan', [R(3, 4.5, 18, 15, 2.5), C(9.5, 12, 4.5, 'a'), G('spin-fast', X(9.5, 12, 3.6), P('M9.5 9.2v5.6M6.7 12h5.6')), P('M16 8.5v7M18.5 8.5v7')]),

  // ---- infrastructure ----
  I('light-client', 'light node mobile verify headers', [R(6, 2.5, 12, 19, 3), cube(12, 11, 3.6, ['a', 'b', 'b'], 'float'), P('M10.5 18.5h3')]),
  I('full-node', 'full node storage chain data sync', [...cyl(9.5, 5, 12, 6.5), P(poly(17.5, 17, 4, 6), 'a', 'pulse')]),
  I('archive-node', 'archive history state storage node', [R(4.5, 9, 15, 11.5, 2), P('M10 13h4'), R(3, 4, 18, 5, 1.5, 'a', 'float')]),
  I('rpc-load', 'rpc load capacity requests usage', [R(3, 3.5, 18, 6.5, 2), C(6.5, 6.75, 1, 'f', 'blink'), P('M10 6.75h7'), R(3, 13, 18, 7, 2), R(5.5, 15.5, 8, 2, 1, 'a', 'grow-x')]),
  I('block-indexer', 'indexer index blocks database events', [cube(6, 12, 4, ['a', 'b', 'b'], 'float'), R(13, 4, 8, 16, 2), P('M15.5 8h3M15.5 12h3M15.5 16h3', 'd', 'draw')]),
  I('graph-query', 'graphql subgraph query api data', [P('M7 3.5c-1.8 0-2 1.3-2 3s-.3 4.5-2 5.5c1.7 1 2 3.8 2 5.5s.2 3 2 3M17 3.5c1.8 0 2 1.3 2 3s.3 4.5 2 5.5c-1.7 1-2 3.8-2 5.5s-.2 3-2 3'), P('M11.3 9.6 10.2 13.4M12.7 9.6l1.1 3.8M11.2 15h1.6', 'd', 'dash'), C(12, 8, 1.6, 'a', 'pulse'), C(9.5, 15, 1.6), C(14.5, 15, 1.6)]),
  I('price-feed', 'oracle broadcast price data stream', [P('M12 11.2 8.5 21M12 11.2l3.5 9.8M9.6 18h4.8'), C(12, 9, 2.2, 'a', 'pulse'), P('M8.5 5.5a5 5 0 0 0 0 7M15.5 5.5a5 5 0 0 1 0 7', 'd', 'blink'), P('M5.7 3.5a8 8 0 0 0 0 11M18.3 3.5a8 8 0 0 1 0 11', 'd', 'blink:.4')]),
  I('price-deviation', 'deviation band outlier oracle threshold', [P('M3 7.5h18M3 16.5h18', 'd', 'dash'), P('M3 12.5l4-1 3 2 3-8 3 6.5 5-1', 'a', 'draw'), C(13, 5.5, 1.2, 'f', 'blink')]),

  // ---- execution and mev ----
  I('sandwich-attack', 'mev sandwich front back run squeeze', [R(3, 3.5, 18, 4.5, 2.25, 'a', 'slide-d'), R(5.5, 10, 13, 4, 2), R(3, 16, 18, 4.5, 2.25, 'a', 'slide-u')]),
  I('frontrun-guard', 'mev protection front running guard', [P(shield), G('slide-r', P('M7.5 12h4.5M9.8 9.6l2.4 2.4-2.4 2.4')), P('M15 8.5v7', 'a')]),
  I('private-mempool', 'private relay hidden orders protect', [R(3, 4, 18, 16, 3, 'd', 'dash'), P('M10.5 9V8a1.5 1.5 0 0 1 3 0v1'), R(9.5, 9, 5, 3.5, 1), C(8, 16, 1.6, 'a', 'rise'), C(12, 15, 1.6, 'a', 'rise:.6'), C(16, 16, 1.6, 'a', 'rise:1.2')]),
  I('intent', 'intent order request declare outcome', [P('M5 3.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4.5 4v-4H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z'), P('M7.5 10h8M13 7.5l2.5 2.5-2.5 2.5', 'a', 'slide-r')]),
  I('intent-solver', 'solver fill route optimize execute', [G('spin-slow', X(12, 12, 9.5), P(gear(12, 12, 9.5, 7.5, 8))), P(spark(12, 12, 4.2), 'a', 'pulse')]),

  // ---- accounts and keys ----
  I('smart-account', 'account abstraction smart wallet programmable', [P('M5.5 5.5 15 3l1 2.5'), R(3, 5.5, 18, 14.5, 2.5), P('M9 10l-2.5 2.75L9 15.5', 'a', 'slide-l'), P('M15 10l2.5 2.75L15 15.5', 'a', 'slide-r'), C(12, 12.75, 1, 'f', 'blink')]),
  I('session-key', 'session key temporary expiring signer', [G('tilt', C(7.5, 14, 4.5), C(7.5, 14, 1.5, 'd'), P('M12 14h8M17.5 14v3M20 14v2.5')), C(17.5, 6.5, 3.8, 'a', 'pulse'), P('M17.5 4.7v1.9l1.3.9')]),
  I('passkey', 'passkey biometric fingerprint wallet login', [P('M5.5 16.5c-.5-1.4-.8-2.9-.8-4.5a7.3 7.3 0 0 1 14.6 0c0 1.8-.2 3.4-.6 5'), P('M8.7 19.5c-.6-2.2-.9-4.6-.9-7.5a4.2 4.2 0 0 1 8.4 0c0 3.2-.4 5.8-1.2 8.5'), P('M12 12c0 3.4-.3 6.4-1 9', 'a', 'draw')]),
  I('social-recovery', 'recovery guardians friends restore wallet', [P('M6.6 6.6 9.3 9.3M17.4 6.6l-2.7 2.7M12 15.8v2', 'd', 'dash'), C(5, 5, 2.1), C(19, 5, 2.1), C(12, 19.8, 2.1), C(12, 12, 3.6, 'a', 'pulse'), P('M12 11v2.2')]),
  I('guardian', 'guardian trusted protector recovery signer', [P(shield), C(12, 9.8, 2.4, 'a', 'pulse'), P('M8.2 16.5a3.8 3.8 0 0 1 7.6 0')]),
  I('timelock', 'delay timelock queued governance wait', [P('M5 3.5h8c0 4-3 5.5-3 8.5s3 4.5 3 8.5H5c0-4 3-5.5 3-8.5S5 7.5 5 3.5Z'), P('M3.5 3.5h11M3.5 20.5h11'), P('M6.8 19h4.4L9 16.4Z', 'a', 'breathe'), P('M16 14v-1.5a2 2 0 0 1 4 0V14'), R(14.5, 14, 7, 6.5, 1.5, 'a', 'pulse')]),
  I('upgrade-proxy', 'upgradeable proxy implementation contract', [R(2.5, 9.5, 6, 6, 1.5), P('M9 12.5h2.5', 'd', 'dash'), cube(16.5, 13, 5, ['a', 'b', 'b']), P('M16.5 6.2V2.8M14.8 4.5l1.7-1.7 1.7 1.7', 'a', 'blink')]),

  // ---- security ----
  I('audit-report', 'security audit report review findings', [P(doc), P('M14 3v5h5.5M8.5 11.5h6M8.5 15h3'), C(17.5, 17.5, 4.2, 'a', 'pulse'), check(17.5, 17.5)]),
  I('bug-bounty', 'bounty reward vulnerability whitehat', [C(10, 6.5, 2), E(10, 14, 4.5, 6), P('M10 9.5v9M5.5 12.5H3M5.5 16.5 3 18M14.5 12.5H17M14.5 16.5 17 18'), C(18.5, 6, 3, 'a', 'float'), C(18.5, 6, 1.3, 'd', 'float')]),
  I('exploit', 'exploit hack breach vulnerability incident', [P(poly(10, 12, 8, 6)), P('M10 4.5 8.5 9l3 2.5-2 4 1.5 4'), G('shake', P('M17.5 12.5 22 20.5H13Z', 'a'), P('M17.5 15.3v2'), C(17.5, 19, 0.5, 'f'))]),
  I('rug-pull', 'rug pull scam exit liquidity warning', [cube(8.5, 8.5, 4.2, ['a', 'b', 'b'], 'tilt'), G('slide-r', R(2.5, 14, 12, 4.5, 1), P('M4.5 18.5V21M8.5 18.5V21M12.5 18.5V21')), P('M17 16.25h4M19.25 14.5 21 16.25l-1.75 1.75')]),
  I('honeypot', 'honeypot trap scam token cannot sell', [P('M7.5 6.5h9v1.5c2.3 1.4 3.5 3.6 3.5 6.5 0 4-3 6.5-8 6.5s-8-2.5-8-6.5c0-2.9 1.2-5.1 3.5-6.5Z'), R(6.5, 3.5, 11, 3, 1.2), C(12, 14.5, 3, 'a', 'sink')]),
  I('phishing-hook', 'phishing scam fake link drainer', [G('swing', P('M8.5 2.5v10a3 3 0 0 1-6 0V11l2 2', 'a')), R(11, 12, 10.5, 8, 1.5), P('M11 13l5.25 3.5L21.5 13')]),

  // ---- payments and wallet ops ----
  I('address-book', 'contacts saved addresses recipients', [R(5, 2.5, 15, 19, 2.5), P('M3 7h4M3 12h4M3 17h4'), C(12.5, 9.5, 2.5, 'a', 'pulse'), P('M8.5 16.5a4 4 0 0 1 8 0')]),
  I('name-service', 'domain name readable address handle', [P('M3 9a2 2 0 0 1 2-2h11l5 5-5 5H5a2 2 0 0 1-2-2Z'), C(7, 12, 1.3, 'a', 'pulse'), P('M10 12h5', 'd', 'draw')]),
  I('receive-qr', 'receive deposit qr scan address', [R(3, 3, 7, 7, 1.5), R(3, 14, 7, 7, 1.5), R(14, 3, 7, 7, 1.5), C(6.5, 6.5, 1, 'f'), C(6.5, 17.5, 1, 'f'), C(17.5, 6.5, 1, 'f'), G('slide-d', P('M17.5 12.5v6M15 16l2.5 2.5L20 16', 'a'))]),
  I('send-token', 'send transfer token outgoing pay', [C(9.5, 14.5, 6.5, 'a'), C(9.5, 14.5, 4, 'd'), G('diag', P('M15 9l5.5-5.5M15.5 3.5h5v5'))]),
  I('batch-transfer', 'batch multisend bulk payout distribute', [C(4.5, 12, 2.5, 'a', 'pulse'), P('M7 12h3.5M10.5 12c3 0 3-6 6.5-6M10.5 12c3 0 3 6 6.5 6M10.5 12H17', 'd', 'dash'), C(19.5, 6, 2), C(19.5, 12, 2), C(19.5, 18, 2)]),
  I('claim-tokens', 'claim distribution allocation receive', [P('M3 12h5a4 4 0 0 0 8 0h5v6.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5Z'), C(12, 6.5, 3.2, 'a', 'drop')]),
  I('vesting-schedule', 'vesting cliff schedule release tokens', [P('M3 20.5h18'), P('M4 17.5h4v-4h4v-4h4V5.5h4', 'a', 'draw'), C(8, 17.5, 1, 'f'), C(12, 13.5, 1, 'f'), C(16, 9.5, 1, 'f')]),
  I('token-unlock', 'unlock release unvest supply event', [P('M6 11V7.5a3 3 0 0 1 6 0', 'd', 'swing'), R(3, 11, 12, 10, 2.5), C(9, 16, 1.3, 'f'), C(18, 7, 3.2, 'a', 'rise')]),
  I('token-supply', 'supply circulating total distribution', [C(12, 12, 9), P(wedge(12, 12, 9, 0, 250), 'a', 'pop'), C(12, 12, 3.5, 'd')]),
  I('burn-rate', 'burn rate deflation supply decrease', [P('M3 4.5l5 5 3.5-3 4.5 4.5', 'd', 'draw'), P('M13 11h3V8'), P('M17 21a3.5 3.5 0 0 1-3.5-3.5c0-2 1.5-3 2.2-4.8.8.9 1.3 1.3 1.6 2.4.5-.9.8-1.5.8-2.6 1.6 1.2 2.4 3 2.4 5A3.5 3.5 0 0 1 17 21Z', 'a', 'flicker')]),
  I('dao-treasury', 'treasury reserves dao funds chest', [R(3, 10, 18, 10.5, 2), P('M3 14h18'), P('M3 10a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z', 'a', 'float'), R(10, 11.5, 4, 5, 1.2)]),

  // ---- scaling and consensus ----
  I('multichain', 'multichain networks ecosystems many chains', [P(poly(7.5, 7.5, 3.8, 6), 'b', 'pulse'), P(poly(16.5, 7.5, 3.8, 6), 'b', 'pulse:.4'), P(poly(12, 16, 3.8, 6), 'a', 'pulse:.8')]),
  I('validity-proof', 'validity proof verified rollup seal', [P('M8.5 14 7 21l5-2.2 5 2.2-1.5-7Z'), C(12, 9.5, 6.5, 'a'), P('M9.3 9.5l1.8 1.8 3.6-3.6', 'd', 'draw')]),
  I('fraud-proof', 'fraud proof challenge dispute optimistic', [cube(8.5, 15, 5, ['a', 'b', 'b']), P('M15.5 21V3.5'), P('M15.5 4h5.5l-1.5 2.5L21 9h-5.5Z', 'a', 'wave')]),
  I('data-availability', 'da sampling chunks availability layer', [R(3, 3, 4.5, 4.5, 1.2), R(9.75, 3, 4.5, 4.5, 1.2, 'a', 'blink'), R(16.5, 3, 4.5, 4.5, 1.2), R(3, 9.75, 4.5, 4.5, 1.2), R(9.75, 9.75, 4.5, 4.5, 1.2), R(16.5, 9.75, 4.5, 4.5, 1.2, 'a', 'blink:.5'), R(3, 16.5, 4.5, 4.5, 1.2, 'a', 'blink:1'), R(9.75, 16.5, 4.5, 4.5, 1.2), R(16.5, 16.5, 4.5, 4.5, 1.2)]),
  I('data-blob', 'blob data payload calldata rollup', [P('M12 3c4 0 8 2.5 8 7 0 3-1.5 4-1.5 6 0 3-3 5-6.5 5S4 19 4 15.5c0-2 1-3 1-5.5C5 6 8 3 12 3Z'), C(12, 12, 2.6, 'a', 'pulse'), C(8.5, 9, 0.9, 'f', 'blink'), C(15.5, 16.5, 0.9, 'f', 'blink:.5')]),
  I('tx-queue', 'sequencer queue ordering pending batch', [R(2.5, 9.5, 3.5, 5, 1, 'b', 'slide-r'), R(7.5, 9.5, 3.5, 5, 1, 'b', 'slide-r:.3'), P('M14.5 5h5a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5h-5'), R(14, 9, 4, 6, 1, 'a', 'pulse')]),
  I('finality', 'finalized irreversible confirmed block', [cube(10, 11, 6, ['b', 'b', 'b']), C(17.5, 17, 4.2, 'a', 'pulse'), check(17.5, 17)]),
  I('reorg', 'reorganization reorg orphan chain switch', [R(3, 5, 4.5, 4.5, 1.2), P('M7.5 7.25h2.25M14.25 7.25h2.25M14.25 16.75h2.25'), R(9.75, 5, 4.5, 4.5, 1.2, 'a', 'blink'), R(16.5, 5, 4.5, 4.5, 1.2, 'a', 'blink:.3'), P('M5.25 9.5v5.25a2 2 0 0 0 2 2h2.5', 'd', 'draw'), R(9.75, 14.5, 4.5, 4.5, 1.2), R(16.5, 14.5, 4.5, 4.5, 1.2)]),
  I('chain-fork', 'fork split upgrade branch chain', [R(2.5, 9.75, 4.5, 4.5, 1.2), P('M7 12h2.5c3 0 3-6 6.5-6M9.5 12c3 0 3 6 6.5 6', 'd', 'draw'), R(16, 3.75, 4.5, 4.5, 1.2, 'a', 'pulse'), R(16, 15.75, 4.5, 4.5, 1.2)]),

  // ---- governance ----
  I('snapshot-vote', 'snapshot offchain vote poll capture', [P(corners, 'd', 'blink'), C(12, 12, 5, 'a'), P('M9.8 12l1.5 1.5 3-3.2', 'd', 'draw')]),
  I('vote-delegation', 'delegate votes voting power representative', [R(2.5, 8, 7.5, 9, 1.5, 'a'), P('M4.5 12.5l1.5 1.5 2.5-3'), G('slide-r', P('M11.5 12.5h2.5M13 10.8l1.7 1.7-1.7 1.7')), C(18.5, 9, 2.5), P('M15 18a3.5 3.5 0 0 1 7 0')]),
  I('quorum', 'quorum threshold seats majority votes', [C(4, 17, 1.6, 'a', 'pop'), C(5.07, 13, 1.6, 'a', 'pop:.2'), C(8, 10.07, 1.6, 'a', 'pop:.4'), C(12, 9, 1.6, 'a', 'pop:.6'), C(16, 10.07, 1.6, 'a', 'pop:.8'), C(18.93, 13, 1.6), C(20, 17, 1.6), P('M3 20.5h18'), P('M14.5 4v3', 'd', 'blink')]),

  // ---- nfts and identity ----
  I('nft-mint', 'mint nft create collectible new', [P(poly(11, 13, 8, 6)), P('M11 10v6M8 13h6'), P(spark(19, 5, 2.6), 'a', 'pulse')]),
  I('nft-royalty', 'royalties creator earnings resale', [P(poly(12, 12, 9.5, 6)), P('M7 15V9l2.5 2.5L12 8l2.5 3.5L17 9v6Z', 'a', 'pulse')]),
  I('nft-floor-price', 'floor price lowest listing collection', [G('float', P(poly(12, 9.5, 6.5, 6)), C(12, 9.5, 1.4, 'f')), P('M3 20h18', 'a')]),
  I('fractional-nft', 'fractional shares split ownership pieces', [R(3, 3, 8, 8, 2), R(3, 13, 8, 8, 2), R(13, 13, 8, 8, 2), G('diag', R(13.5, 2.5, 8, 8, 2, 'a'), P(poly(17.5, 6.5, 2.3, 6), 'd'))]),
  I('soulbound-badge', 'soulbound non transferable badge achievement', [P('M9 7.8 6.5 3M15 7.8 17.5 3'), C(12, 14, 7), P(star(12, 14, 3.8, 1.6), 'a', 'pulse')]),
  I('onchain-id', 'identity did profile credential decentralized', [R(2.5, 5, 19, 14, 2.5), P(poly(8, 12, 3.2, 6), 'a', 'pulse'), P('M13 10h5M13 14h3.5', 'd', 'draw')]),
  I('attestation', 'attest credential claim verified statement', [P(doc), P('M14 3v5h5.5M8.5 11.5h6M8.5 15h3'), P(star(17.5, 17.5, 4.4, 3.6, 10), 'a', 'pulse'), C(17.5, 17.5, 1.5, 'd')]),
];
