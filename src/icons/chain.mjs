import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

// How a high-throughput rollup actually runs: sequencing, settlement, data availability, proofs and the ops around them.
// Abstract glyphs only, no chain or token marks.
const doc = 'M6 3h8l4.5 4.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z';
const docLines = P('M14 3v4.5h4.5M7.5 10.5h5M7.5 14h3');
const badge = (an, ...els) => G(an, C(17.5, 17, 4.2, 'a'), ...els);
const shield = 'M12 2.8 19.5 5.5v6c0 4.7-3.2 8.4-7.5 9.9-4.3-1.5-7.5-5.2-7.5-9.9v-6Z';
const cyl = (cx, top, h, w, role = 'b') => [
  P(`M${cx - w} ${top}v${h}c0 1.3 ${w * 0.45} 2.3 ${w} 2.3s${w}-1 ${w}-2.3V${top}Z`, role),
  E(cx, top, w, 2.3, role === 'a' ? 'a' : 'b'),
  P(`M${cx - w} ${top + h / 2}c0 1.3 ${w * 0.45} 2.3 ${w} 2.3s${w}-1 ${w}-2.3`),
];
const lock = (x, y) => [P(`M${x + 2} ${y}v-2.2a2.5 2.5 0 0 1 5 0V${y}`), R(x, y, 9, 7.5, 1.8)];

export default [
  // ---- sequencing & blocks ----
  I('sequencer-node', 'sequencer ordering leader rollup operator', [R(3, 3, 18, 7, 2), C(6.8, 6.5, 1, 'f', 'blink'), P('M10.5 6.5h7'), P('M12 10v3'), G('slide-r', R(3.5, 15, 4.5, 5, 1.2), R(9.75, 15, 4.5, 5, 1.2), R(16, 15, 4.5, 5, 1.2, 'a'))]),
  I('tx-ordering', 'order sort transactions sequence queue', [C(5, 5, 1.8), C(7.5, 12, 1.8), C(4.5, 19, 1.8), G('slide-r', P('M10.5 12h3M12 10l2 2-2 2')), R(16, 3.5, 5, 4.5, 1.2, 'a'), R(16, 9.75, 5, 4.5, 1.2), R(16, 16, 5, 4.5, 1.2)]),
  I('slot', 'time slot tick block window interval', [R(3, 7.5, 18, 9, 2.5), P('M9 7.5v9M15 7.5v9'), R(10.5, 9.5, 3, 5, 1, 'a', 'blink')]),
  I('slot-leader', 'leader schedule producer turn rotation', [P(star(12, 7.5, 4.8, 2.1), 'a', 'pulse'), P('M12 12.8v2'), R(3, 15, 18, 6, 2), P('M9 15v6M15 15v6')]),
  I('block-producer', 'produce build block engine mint', [G('spin', P(gear(8.5, 8.5, 6, 4.3, 7)), C(8.5, 8.5, 1.9, 'd')), cube(16.5, 16, 4.3, ['a', 'b', 'b'], 'float')]),
  I('blockhash', 'recent blockhash block id digest freshness', [cube(9.5, 10.5, 6.5, ['b', 'b', 'b']), badge('pulse', P('M16.4 14.8l-.6 4.4M19 14.8l-.6 4.4M15 16.2h5M14.8 17.9h5'))]),
  I('block-height', 'height number count tip chain length', [R(3, 16.5, 11, 4, 1.2), R(3, 10.5, 11, 4, 1.2), R(3, 4.5, 11, 4, 1.2, 'a', 'drop'), P('M18 3.5v17M18 4h3M18 8h2M18 12h3M18 16h2M18 20h3')]),
  I('tx-batch', 'batch bundle transactions group', [R(8, 3, 13, 9, 2, 'b', 'float'), R(5.5, 6, 13, 9, 2, 'b', 'float:.3'), R(3, 9.5, 13, 11.5, 2), P('M6 14h7M6 17.5h4'), C(13, 17.5, 1.1, 'a', 'blink')]),
  I('batch-posting', 'post batch publish layer one submit', [R(3, 3, 18, 3.5, 1.2, 'a'), G('slide-u', P('M12 13V9M9.5 11.5 12 9l2.5 2.5')), R(4, 14.5, 16, 6.5, 2), P('M7.5 17.75h9')]),
  I('batch-compress', 'compression squeeze calldata pack bytes', [G('slide-d', P('M12 2.5v4M10 4.5l2 2 2-2')), R(3.5, 8.5, 17, 7, 2), P('M6.5 12l2-1.6 2 3.2 2-3.2 2 3.2 2-1.6', 'a'), G('slide-u', P('M12 21.5v-4M10 19.5l2-2 2 2'))]),
  I('state-root', 'root commitment state hash accounts', [R(3.5, 3, 4, 4, 1), R(10, 3, 4, 4, 1), R(16.5, 3, 4, 4, 1), P('M5.5 7 11 13.3M12 7v6M18.5 7 13 13.3', 'd', 'draw'), C(12, 17.2, 3.6, 'a', 'pulse')]),
  I('state-diff', 'diff changes delta state update', [R(3.5, 3, 17, 18, 2.5), P('M7 8h3M8.5 6.5v3M12.5 8h4.5'), P('M7 12.5h3M12.5 12.5h4.5'), R(6.5, 15.5, 11, 2.6, 1, 'a', 'blink')]),
  I('state-account', 'account data owner balance storage', [R(3, 5, 18, 14, 2.5), C(8, 10, 2.2, 'a', 'pulse'), P('M12.5 9h5M12.5 11.5h3M6.5 15h11')]),
  I('derived-address', 'pda program derived seeds address', [P(poly(6.5, 7, 3.6, 6)), P('M8.5 11.5c0 3 1.5 4.5 4.5 5', 'd', 'dash'), C(9.5, 15.5, 0.9, 'f'), P(poly(16.5, 16.5, 4.5, 6), 'a', 'pulse'), C(16.5, 16.5, 1.4, 'd')]),
  I('program-deploy', 'deploy program contract ship onchain', [R(3, 10, 11, 11, 2), P('M7 14l-1.5 1.75L7 17.5M10 14l1.5 1.75L10 17.5'), G('diag', P('M10 7.5l3-3M10.5 4.5h2.5V7')), cube(17.5, 8, 4, ['a', 'b', 'b'])]),
  I('upgrade-authority', 'upgrade authority admin program key', [R(3, 3, 13, 13, 2.5), G('slide-u', P('M9.5 12.5v-5.5M7.25 9.25 9.5 7l2.25 2.25')), badge('pulse', C(17.5, 16.2, 1.2, 'd'), P('M17.5 17.4v2'))]),
  I('program-upgrade', 'new version program upgrade buffer', [cube(8, 9.5, 5, ['b', 'b', 'b']), G('slide-u', P('M17.5 21v-9M14.5 15l3-3 3 3', 'a'), P('M14.5 19.5l3-3 3 3', 'a'))]),
  I('compute-units', 'compute units cu cost instruction chip', [R(5, 5, 14, 14, 2.5), P('M9 2.5V5M15 2.5V5M9 19v2.5M15 19v2.5M2.5 9H5M2.5 15H5M19 9h2.5M19 15h2.5'), R(8.5, 8.5, 7, 7, 1.2, 'a', 'grow')]),
  I('compute-budget', 'budget limit compute cap meter', [R(2.5, 7, 16, 10, 2.5), P('M21 10.5v3'), R(5, 9.5, 8, 5, 1, 'a', 'grow-x'), P('M15.5 9.5v5', 'd', 'blink')]),
  I('priority-lane', 'priority fast lane express ordering', [P('M3 4h18M3 20h18'), P('M3 12h18', 'd', 'dash'), G('slide-r', P('M4 8h3'), R(9, 6, 7, 4, 1.2, 'a')), R(6, 14, 7, 4, 1.2)]),
  I('versioned-tx', 'versioned transaction v1 format message', [R(3, 3, 13, 16, 2.5), P('M6.5 8h6M6.5 11.5h4'), badge('pop', P('M15.6 15.6l1.9 3.4 1.9-3.4'))]),
  I('lookup-table', 'address lookup table index compressed accounts', [R(3, 3, 18, 18, 2.5), P('M3 9h18M3 15h18M9 3v18'), C(6, 6, 1, 'f'), C(6, 12, 1, 'f'), C(6, 18, 1, 'f'), R(10.5, 10.5, 9, 3, 1, 'a', 'blink')]),
  I('signature-verify', 'signature verify precompile ed25519 curve', [P('M3 12c2 0 3-6 5-6s.5 6 2.5 6 1.5-3 3-3', 'd', 'draw'), P('M3 16h9.5'), badge('pulse', P('M15.6 17.1l1.3 1.3 2.6-2.8'))]),
  I('parallel-execution', 'parallel lanes concurrent runtime threads', [G('slide-r', P('M3 6h9M10 4l2 2-2 2')), G('slide-r:.3', P('M3 12h9M10 10l2 2-2 2')), G('slide-r:.6', P('M3 18h9M10 16l2 2-2 2')), R(16, 3, 5, 18, 2, 'a')]),
  I('serial-execution', 'serial single lane queue sequential', [P('M3 18.5h18'), G('slide-r', R(3, 9, 4.5, 6, 1.2), R(9.25, 9, 4.5, 6, 1.2)), R(15.5, 9, 5, 6, 1.2, 'a', 'pulse')]),
  I('tps-meter', 'throughput tps speed gauge capacity', [P('M4.2 17.5a8.5 8.5 0 1 1 15.6 0'), P('M12 5.5v1.5M6.3 8l1 1M17.7 8l-1 1'), G('seesaw', X(12, 15, 6), P('M12 15l4-4.5', 'a')), C(12, 15, 1.8, 'a'), P('M8 20h8')]),
  I('latency-stopwatch', 'latency p50 p99 timing response speed', [C(12, 13.5, 7.5), P('M10 2.5h4M12 2.5V6M18.2 7.3l1.3-1.3'), G('spin', X(12, 13.5, 5), P('M12 13.5V9', 'a')), C(12, 13.5, 1.2, 'f')]),
  I('mempool-shard', 'shard partition pending pool split', [P(wedge(11, 13, 8.5, 90, 360)), C(7.5, 14, 1, 'f'), C(10.5, 17.5, 1, 'f'), C(7.5, 9.5, 1, 'f'), P(wedge(13, 11, 8.5, 0, 90), 'a', 'diag')]),

  // ---- settlement & data availability ----
  I('settle-l1', 'settlement layer one commit finalize base', [G('slide-d', cube(12, 8, 4.5, ['a', 'b', 'b'])), R(3, 17.5, 18, 3.5, 1.2)]),
  I('l1-anchor', 'anchor commitment layer one checkpoint', [G('swing', C(12, 5, 2.2, 'a'), P('M12 7.2V20M8 10.5h8M4.5 13.5a7.5 7.5 0 0 0 15 0'))]),
  I('da-replica', 'replica mirror data copy redundancy', [...cyl(6.5, 6, 11, 4, 'a'), ...cyl(17.5, 6, 11, 4), P('M10.5 11.5h3', 'd', 'dash')]),
  I('erasure-coding', 'erasure shards parity reconstruct pieces', [R(3, 3, 8, 8, 1.8), R(13, 3, 8, 8, 1.8), R(3, 13, 8, 8, 1.8, 'a'), R(13, 13, 8, 8, 1.8, 'd', 'dash'), P('M7 15.5v3M5.5 17h3')]),
  I('header-chain', 'headers chain linked parent pointer', [R(2.5, 7, 5, 10, 1.2), R(9.5, 7, 5, 10, 1.2), R(16.5, 7, 5, 10, 1.2, 'a', 'blink'), P('M2.5 10h5M9.5 10h5'), P('M7.5 13.5h2M14.5 13.5h2')]),
  I('checkpoint', 'checkpoint milestone mark saved progress', [P('M3 20h18'), P('M9 20V4'), P('M9 4.5h9l-2 3 2 3H9Z', 'a', 'wave'), C(15.5, 20, 1.1, 'f'), C(19.5, 20, 1.1, 'f')]),
  I('soft-finality', 'soft finality optimistic confirmed pending', [C(12, 12, 9, 'd', 'dash'), P('M7.5 12.5l3 3 6-6.5', 'a', 'draw')]),
  I('hard-finality', 'hard finality settled irreversible final', [P(star(12, 12, 9.5, 8, 12), 'b', 'pop'), C(12, 12, 5.2, 'a'), P('M9.6 12.1l1.7 1.7 3.2-3.5', 'd', 'draw')]),
  I('confirmations', 'confirmations count depth progress blocks', [P(arc(12, 12, 8.5, 15, 105)), P(arc(12, 12, 8.5, 135, 225)), P(arc(12, 12, 8.5, 255, 345), 'a', 'blink'), P('M9.6 12.2l1.6 1.6 3.2-3.4', 'd', 'draw')]),
  I('reorg-guard', 'reorg protection fork safety depth', [P(shield), P('M12 18V7.5M12 13l-3.5-3.5'), C(12, 7.5, 1.5, 'a', 'pulse'), P('M15 8.5l1.5 1.5M16.5 8.5 15 10', 'd', 'blink')]),
  I('genesis-block', 'genesis first block origin start chain', [cube(10.5, 13.5, 7, ['a', 'b', 'b']), P(spark(19, 4.8, 2.6), 'a', 'pulse')]),
  I('genesis-hash', 'genesis hash network id identity origin', [P('M8.5 5 7 19.5M14.5 5 13 19.5M4 9.5h12M3.5 15h12'), P(spark(19.5, 5, 2.5), 'a', 'pulse')]),
  I('epoch-boundary', 'epoch boundary transition rollover period', [R(3, 7.5, 7.5, 9, 2), R(13.5, 7.5, 7.5, 9, 2), P('M12 3.5v17', 'a', 'blink'), C(6.75, 12, 1.1, 'f'), C(17.25, 12, 1.1, 'f')]),

  // ---- proofs & disputes ----
  I('bisection-game', 'bisection interval halving dispute game', [R(3, 3.5, 18, 3.5, 1.2), R(3, 10.25, 9, 3.5, 1.2), R(7.5, 17, 4.5, 3.5, 1.2, 'a', 'blink'), P('M12 2.5v19', 'd', 'dash')]),
  I('challenge-window', 'challenge period dispute window timer', [R(3, 4, 18, 16, 2.5), P('M3 8h18'), G('seesaw', P('M9.5 10.5h5l-2.5 3.25 2.5 3.25h-5l2.5-3.25Z', 'a'))]),
  I('challenger', 'challenger dispute watcher contest', [C(8.5, 7.5, 3.5), P('M2.5 20.5a6 6 0 0 1 12 0Z'), P('M18 21V4.5'), P('M18 5h3.5l-1 2 1 2H18Z', 'a', 'wave')]),
  I('verifier-node', 'verifier replay check node audit', [R(3, 3, 13, 6, 1.8), R(3, 11, 13, 6, 1.8), C(6, 6, 0.9, 'f'), C(6, 14, 0.9, 'f'), G('tilt', C(17, 16, 3.3, 'a'), P('M19.4 18.4 21.5 20.5'))]),
  I('bond-at-risk', 'bond stake collateral risk dispute deposit', [E(9, 17.5, 6, 2.5), E(9, 13.5, 6, 2.5), E(9, 9.5, 6, 2.5), G('shake', P('M17.5 11 22 19h-9Z', 'a'), P('M17.5 14v2'))]),
  I('bond-slash', 'slash bond penalty cut forfeit', [P('M10.5 3.5a8.5 8.5 0 0 0 0 17Z'), G('sink', P('M13.5 3.5a8.5 8.5 0 0 1 0 17Z', 'a')), P('M12 2v20', 'd', 'dash')]),
  I('proof-aggregation', 'aggregate proofs recursion combine batch', [C(4.5, 5, 1.8), C(4.5, 12, 1.8), C(4.5, 19, 1.8), P('M6.5 6 12 10M6.5 12h5M6.5 18 12 14', 'd', 'draw'), C(16.5, 12, 4.5, 'a', 'pulse'), P('M14.6 12.1l1.3 1.3 2.6-2.8')]),
  I('escape-hatch', 'escape hatch exit layer one withdraw force', [P('M3 20V4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5V20'), P('M3 3.5 8.5 5.5V21L3 20Z', 'a'), C(7, 12.5, 0.8, 'f'), G('slide-r', P('M14.5 12h6.5M18.5 9.5 21 12l-2.5 2.5'))]),
  I('forced-inclusion', 'forced inclusion queue censorship resistance', [G('slide-r', R(2.5, 10, 5.5, 5, 1.2, 'a'), P('M9 12.5h2.5M10.5 10.5l2 2-2 2')), cube(17, 12.5, 4.8, ['b', 'b', 'b'])]),
  I('withdrawal-proof', 'withdrawal proof claim exit inclusion', [P(doc), docLines, badge('slide-u', P('M17.5 19.2v-4.4M15.7 16.6l1.8-1.8 1.8 1.8'))]),
  I('bridge-deposit', 'deposit lock mint bridge in', [...lock(2.5, 12.5), G('slide-r', P('M13.5 16h2.5M15 14.5l1.5 1.5-1.5 1.5')), C(19, 16, 2.8, 'a', 'pop'), P(spark(19, 6, 2.4), 'b', 'blink')]),
  I('bridge-withdraw', 'withdraw burn release bridge out', [P('M6 21a3.5 3.5 0 0 1-3.5-3.5c0-2 1.5-3 2.2-4.8.8.9 1.3 1.3 1.6 2.4.5-.9.8-1.5.8-2.6 1.6 1.2 2.4 3 2.4 5A3.5 3.5 0 0 1 6 21Z', 'a', 'flicker'), G('slide-r', P('M11 16h2.5M12.5 14.5 14 16l-1.5 1.5')), P('M17 12.5V10a2.5 2.5 0 0 1 5 0', 'd', 'swing'), R(15, 12.5, 7, 7, 1.6)]),

  // ---- ops ----
  I('rpc-gateway', 'gateway rpc entry proxy endpoint api', [P('M4 21V10a8 8 0 0 1 16 0v11'), P('M2.5 21h19'), G('slide-r', P('M7.5 14.5h8M13.5 12l2.5 2.5-2.5 2.5', 'a'))]),
  I('rate-limiter', 'rate limit throttle quota requests', [P('M3 4.5 10.5 10v4L3 19.5Z', 'a'), P('M10.5 12h1.5'), C(14.3, 12, 1.5, 'b', 'blink'), C(17.8, 12, 1.5, 'b', 'blink:.4'), C(20.9, 12, 1.1, 'b', 'blink:.8')]),
  I('fill-stream', 'fill log stream events trades feed', [R(3, 3, 13, 18, 2), P('M6.5 8h6M6.5 12h6M6.5 16h4'), G('slide-r', P('M18.5 8h2.5M18.5 12h2.5M18.5 16h2.5', 'a'))]),
  I('keeper-bot', 'keeper bot automation crank liquidator', [R(4, 7, 16, 12, 3), P('M12 7V4.5'), C(12, 3.7, 1.3, 'a', 'blink'), C(9, 12, 1.4, 'f'), C(15, 12, 1.4, 'f'), P('M10 15.5h4'), P('M2.5 11v4M21.5 11v4')]),
  I('oracle-publisher', 'publisher price push feed broadcast', [P('M12 11 8.5 21M12 11l3.5 10M9.7 17.5h4.6'), C(12, 9, 2, 'a', 'pulse'), P(arc(12, 9, 5, 50, 130), 'd', 'blink'), P(arc(12, 9, 5, 230, 310), 'd', 'blink'), P(arc(12, 9, 8.5, 55, 125), 'd', 'blink:.4'), P(arc(12, 9, 8.5, 235, 305), 'd', 'blink:.4')]),
  I('randomness-beacon', 'entropy randomness vrf beacon dice', [G('tilt', R(3, 8, 13, 13, 3), C(6.5, 11.5, 1, 'f'), C(12.5, 17.5, 1, 'f'), C(9.5, 14.5, 1.4, 'a')), P(arc(16, 8, 3, 0, 90), 'd', 'blink'), P(arc(16, 8, 6, 0, 90), 'd', 'blink:.4')]),
  I('relay-hop', 'relay forward message hop transport', [C(4, 12, 2), C(20, 12, 2), P('M6 12h2.5M15.5 12H18', 'd', 'dash'), P(poly(12, 12, 4, 4), 'a', 'pulse')]),
  I('block-detail', 'block view explorer details page', [R(3, 3, 18, 18, 2.5), P('M3 7.5h18'), cube(8.5, 14.5, 3.3, ['a', 'b', 'b']), P('M13.5 11.5h4.5M13.5 14.5h4.5M13.5 17.5h3', 'd', 'draw')]),
  I('node-health', 'health heartbeat node status monitor', [R(3, 4, 18, 16, 2.5), P('M6 12.5h3l1.5-3.5 2.5 7 2-5h3', 'a', 'draw')]),
  I('uptime-bars', 'uptime availability status history bars', [P('M4.5 7.5v9M8 7.5v9M11.5 7.5v9M18.5 7.5v9'), R(14, 6.75, 2, 10.5, 1, 'a', 'blink'), P('M3 20h18')]),
  I('node-restart', 'restart node reboot recover service', [G('spin', X(12, 12, 9), P(arc(12, 12, 8, 40, 320)), P('M15.5 3.5l3.4 2.4-2.8 3')), R(9, 9.5, 6, 5, 1.2, 'a')]),
  I('state-rewind', 'rewind roll back previous block state', [G('slide-l', P('M11 6v12L3.5 12Z', 'a'), P('M20 6v12l-7.5-6Z'))]),
  I('state-snapshot', 'snapshot backup capture state image', [R(3, 7, 18, 13, 2.5), P('M8 7l1.5-3h5L16 7'), C(12, 13.5, 4, 'a', 'pulse'), C(12, 13.5, 1.5, 'd'), C(17.8, 10, 0.8, 'f')]),
  I('peer-gossip', 'gossip peers propagate p2p broadcast', [C(12, 12, 6, 'd', 'ping'), C(12, 12, 2.6, 'a'), C(12, 3.5, 1.5), C(19.4, 7.75, 1.5), C(19.4, 16.25, 1.5), C(12, 20.5, 1.5), C(4.6, 16.25, 1.5), C(4.6, 7.75, 1.5)]),
  I('faucet-drip', 'drip faucet claim testnet tokens', [P('M12 3c2.8 3.5 4.8 6 4.8 8.6a4.8 4.8 0 0 1-9.6 0C7.2 9 9.2 6.5 12 3Z', 'a', 'drop'), E(12, 19, 8, 2.3), P('M9.5 11.5a2.5 2.5 0 0 0 1.5 2.2', 'h')]),
  I('load-test', 'cluster load test stress traffic capacity', [G('slide-d', P('M5 2.5v5M3.5 6 5 7.5 6.5 6')), G('slide-d:.3', P('M12 2.5v5M10.5 6 12 7.5 13.5 6')), G('slide-d:.6', P('M19 2.5v5M17.5 6 19 7.5 20.5 6')), R(3, 11, 18, 9, 2), R(6, 14.25, 9, 2.5, 1, 'a', 'grow-x'), C(18, 15.5, 1, 'f', 'blink')]),
  // ---- more runtime detail ----
  I('one-step-proof', 'one step proof single instruction dispute', [R(2.5, 6, 7, 12, 2), P('M5 10h2M5 13.5h2'), G('slide-r', P('M10.75 12h2.5M12 10.5l1.5 1.5-1.5 1.5')), R(14.5, 6, 7, 12, 2, 'a')]),
  I('tx-receipt', 'receipt transaction result status logs', [P('M5 3h14v18l-2.3-1.5-2.4 1.5-2.3-1.5-2.3 1.5-2.4-1.5L5 21Z'), P('M8 8h8M8 11.5h5'), C(15, 15.5, 1.6, 'a', 'pulse')]),
  I('account-rent', 'rent minimum balance account deposit', [R(3, 4, 15, 12, 2.5), P('M6.5 8.5h6M6.5 12h3.5'), badge('pop', C(17.5, 17, 2.2, 'd'))]),
  I('block-time', 'block time interval cadence period', [cube(9.5, 10.5, 6.5, ['b', 'b', 'b']), C(17.5, 17, 4.2, 'a'), G('spin', X(17.5, 17, 3), P('M17.5 17v-2.4')), P('M17.5 17h1.6')]),
  I('leader-rotation', 'rotation leader schedule handover turn', [P(arc(12, 12, 7.5, 35, 145), 'd', 'dash'), P(arc(12, 12, 7.5, 215, 325), 'd', 'dash'), C(12, 4.5, 2.6, 'a', 'pulse'), C(12, 19.5, 2.6)]),
  I('da-sampling', 'availability sampling random checks light', [...[5, 9.67, 14.33, 19].flatMap((y) => [5, 9.67, 14.33, 19].map((x) => C(x, y, 0.8, 'f'))), C(9.67, 9.67, 2, 'a', 'pulse'), C(19, 14.33, 1.8, 'b', 'blink:.4'), C(5, 19, 1.8, 'b', 'blink:.8')]),
  I('node-catchup', 'catch up replay follow tip behind', [cube(5.5, 10, 3, ['b', 'b', 'b']), cube(12, 10, 3, ['b', 'b', 'b']), cube(18.5, 10, 3, ['a', 'b', 'b']), G('slide-r', P('M3 18.5h11M12 16.5l2 2-2 2'))]),
  I('l1-message', 'cross layer message outbox inbox l1 l2', [G('slide-d', R(5, 3, 14, 10, 2, 'a'), P('M5.5 4.5 12 9l6.5-4.5')), R(3, 17, 18, 3.5, 1.2)]),
  I('skipped-slot', 'skipped missed slot empty leader', [R(3, 7.5, 18, 9, 2.5), P('M9 7.5v9M15 7.5v9'), P('M10.75 14.5l2.5-5', 'a', 'blink')]),
  I('account-contention', 'contention hot account write conflict', [G('diag-in', P('M3 3l6 6M9 4.5V9H4.5')), G('diag', P('M3 21l6-6M4.5 15H9v4.5')), R(12, 7.5, 9, 9, 2, 'a', 'shake')]),
  I('tx-simulation', 'simulate dry run preview transaction', [R(3, 4, 18, 16, 2.5, 'd', 'dash'), P('M10 8.5v7l6-3.5Z', 'a', 'pulse')]),
];
