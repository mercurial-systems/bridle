import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

// Explorer & Analytics: block-explorer pages, transaction states and on-chain analytics, each its own drawing.
const shield = 'M12 2.8 19.5 5.5v6c0 4.7-3.2 8.4-7.5 9.9-4.3-1.5-7.5-5.2-7.5-9.9v-6Z';
const doc = 'M7 3h7.5L19.5 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z';
// cohort triangle: row i has 4-i cells, first column is the accent
const cohort = [];
for (let i = 0; i < 4; i++) for (let j = 0; j < 4 - i; j++) cohort.push(R(3 + j * 4.75, 3 + i * 4.75, 3.5, 3.5, 0.9, j ? 'b' : 'a', j ? undefined : `breathe:${i * 0.3}`));

export default [
  // ---- transaction states ----
  I('tx-success-stamp', 'transaction success confirmed stamp approved', [G('slide-d', R(10.5, 7.5, 3, 3.5, 0.8), C(12, 5.5, 2.5), P('M5 11h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z'), P('M9.6 14l1.7 1.6 3.2-3.2')), R(5, 19, 14, 2.5, 1.25, 'a', 'blink')]),
  I('tx-failed', 'transaction failed error broken link', [G('shake', R(2.5, 9, 8, 6, 3), R(13.5, 9, 8, 6, 3)), P('M5.5 12h2M16.5 12h2'), P('M12 3.5v3M8.5 5l1.3 1.8M15.5 5l-1.3 1.8M12 20.5v-3M8.5 19l1.3-1.8M15.5 19l-1.3-1.8', 'a', 'blink')]),
  I('tx-dropped', 'transaction dropped evicted lost mempool', [R(3.5, 3, 3.5, 3.5, 1), R(8, 3, 3.5, 3.5, 1), R(2.5, 7, 10, 2.5, 1.2), P('M12.5 8.3c2 .3 3.5 1.2 4.5 2.7', 'd', 'dash'), G('drop', R(14, 12, 6, 6, 1.5, 'a')), P('M3 20.5h3M9.5 20.5h3M16 20.5h5')]),
  I('tx-replaced', 'transaction replaced speed up nonce rbf', [R(3, 3.5, 12, 8, 2), P('M5.5 7.5h7'), G('slide-r', P('M6 12.5v2a2 2 0 0 0 2 2h1M7.5 15 9 16.5 7.5 18')), R(10.5, 12.5, 10.5, 8, 2, 'a', 'pop'), P('M13 16.5h5.5')]),
  I('tx-confirming', 'confirming progress ring pending finality', [P(arc(12, 12, 8.5, 280, 360)), G('spin', X(12, 12, 8.5), P(arc(12, 12, 8.5, 0, 260), 'a')), C(8.8, 12, 1, 'f', 'blink'), C(12, 12, 1, 'f', 'blink:.3'), C(15.2, 12, 1, 'f', 'blink:.6')]),
  I('tx-reverted', 'transaction reverted bounced rollback wall', [R(17.5, 3, 4, 18, 1), P('M17.5 8h4M17.5 13h4M17.5 18h4'), P('M3 8h12'), P('M15 8c2 0 2 7 0 7H5', 'a', 'draw'), P('M7.5 12.5 5 15l2.5 2.5', 'a')]),
  I('tx-expired', 'transaction expired blockhash timeout stale', [P('M6.5 3h11M6.5 21h11'), P('M8 3.5c0 3.5 4 5 4 8.5s-4 5-4 8.5h8c0-3.5-4-5-4-8.5s4-5 4-8.5Z'), P('M4 4.5 20 19.5', 'a', 'blink')]),
  I('tx-resubmit', 'resend retry rebroadcast transaction', [P('M11.5 12.5c-3 2.5-7.5 3-7.5 5.8 0 1.7 2.2 2.5 3.8 1.2 1.8-1.5.3-4.2-2.3-3.5', 'd', 'dash'), G('diag', P('M21.5 2.5 9.5 8l4.5 1.8 1.8 4.5Z', 'a'), P('M14 9.8 21.5 2.5'))]),
  I('tx-hash-copy', 'transaction hash copy signature id', [R(8, 3, 13, 13, 2.5), R(3, 8, 13, 13, 2.5, 'a', 'pop'), P('M7.6 11v7.5M11.4 11v7.5M5.5 13h8M5.5 16.5h8')]),
  I('tx-size', 'transaction size bytes measure limit', [R(5, 4, 11, 7, 1.5, 'a', 'pulse'), P('M5 13.5h11M6.5 12.3 5 13.5l1.5 1.2M14.5 12.3l1.5 1.2-1.5 1.2'), R(2.5, 16, 19, 5, 1), P('M5.5 16v2M8.5 16v1.2M11.5 16v2M14.5 16v1.2M17.5 16v2')]),
  I('tx-counter', 'transaction count odometer total counter', [R(2.5, 6.5, 19, 11, 2), P('M8.8 6.5v11M15.2 6.5v11'), P('M5.7 10v4M18.3 10a1.3 2 0 1 1 0 4 1.3 2 0 1 1 0-4'), R(9.8, 4.5, 4.4, 15, 1.2, 'a', 'slide-u'), P('M12 10v4')]),
  I('tx-plain-english', 'decoded transaction human readable summary', [P('M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4.5 3.5V17H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z'), C(7.5, 10.5, 1.8, 'a'), G('slide-r', P('M10.5 10.5h3.5M12.3 8.8l1.7 1.7-1.7 1.7')), C(16.8, 10.5, 1.8, 'd')]),

  // ---- explorer pages ----
  I('tx-detail-page', 'transaction details page hash fields', [R(4, 2.5, 16, 19, 2.5), R(7, 5.5, 10, 3.5, 1.75, 'a'), P('M7.5 12.5h2.5M12.5 12.5h4M7.5 15.5h2.5M12.5 15.5h4M7.5 18.5h2.5M12.5 18.5h2.5', 'd', 'draw')]),
  I('instruction-list', 'instructions ordered steps execution program', [G('slide-d', P('M4.5 3v15M2.5 16l2 2.5 2-2.5', 'a')), R(8.5, 3, 12.5, 4.5, 1.5), R(8.5, 9.75, 12.5, 4.5, 1.5, 'a'), R(8.5, 16.5, 12.5, 4.5, 1.5), P('M11 5.25h5M11 18.75h7')]),
  I('inner-instructions', 'inner instructions tree nested calls', [R(3, 3, 8, 5, 1.5, 'a'), P('M6 8v10.5M6 12.5h5M6 18.5h5'), R(11, 10.25, 10, 4.5, 1.5, 'b', 'slide-r'), R(11, 16.25, 10, 4.5, 1.5, 'b', 'slide-r:.4')]),
  I('cpi-call', 'cross program invocation call program', [P(poly(7, 7.5, 4.5, 6)), C(7, 7.5, 1.2, 'f'), P(poly(17, 16.5, 4.5, 6), 'a'), P('M11.5 5.5c4 0 6.5 2 6.5 5.5', 'd', 'draw'), P('M16.2 9.5 18 11.3l1.8-1.8'), P('M13 18.5c-4 0-6.5-2-6.5-5', 'd', 'dash')]),
  I('program-logs', 'program logs messages output console', [P(poly(6.5, 7.5, 4, 6), 'a', 'pulse'), P('M13 5.5h8M13 9.5h5.5'), P('M3 15h2M7.5 15h13.5M3 19h2M7.5 19h9', 'd', 'draw')]),
  I('event-decode', 'event decode parse logs data', [R(2.5, 7, 6, 10, 1.5), C(4.5, 9.5, 0.8, 'f'), C(6.5, 9.5, 0.8, 'f'), C(4.5, 12, 0.8, 'f'), C(6.5, 12, 0.8, 'f'), C(4.5, 14.5, 0.8, 'f'), C(6.5, 14.5, 0.8, 'f'), P('M9.6 10.3l1.7 1.7-1.7 1.7', 'a', 'slide-r'), P('M16.2 6.5c-1.1 0-1.7.6-1.7 1.8v1.8c0 1.1-.4 1.9-1.2 1.9.8 0 1.2.8 1.2 1.9v1.8c0 1.2.6 1.8 1.7 1.8M18.3 6.5c1.1 0 1.7.6 1.7 1.8v1.8c0 1.1.4 1.9 1.2 1.9-.8 0-1.2.8-1.2 1.9v1.8c0 1.2-.6 1.8-1.7 1.8'), C(17.25, 12, 1.2, 'a', 'pulse')]),
  I('explorer-account-page', 'account page profile address balance', [R(3, 7, 18, 14, 2.5), C(12, 7.5, 4, 'a', 'pulse'), P('M8.5 15h7M10 18h4')]),
  I('explorer-program-page', 'program page contract executable code', [P(poly(12, 12, 9.5, 6)), P('M9 9.5 6.8 12 9 14.5M15 9.5l2.2 2.5-2.2 2.5'), P('M13 8.5 11 15.5', 'a', 'blink')]),
  I('explorer-token-page', 'token page mint info supply', [R(8, 8, 13, 13, 2.5), G('flip', C(8.5, 8.5, 5.5, 'a'), C(8.5, 8.5, 3, 'd')), P('M15.5 12.5h3M11 16h7.5M11 18.5h4.5')]),
  I('contract-tabs', 'contract read write tabs interact', [R(3.5, 4, 8, 6, 1.5), R(3, 8.5, 18, 12.5, 2), R(12.5, 3.5, 8.5, 6.5, 1.5, 'a', 'toggle'), P('M6.5 13.5h11M6.5 17h7')]),
  I('verified-source', 'verified source code contract audit match', [P(shield), P('M9.8 7.5 7.8 9.5l2 2M14.2 7.5l2 2-2 2'), P('M9.5 15l1.8 1.8 3.4-3.4', 'a', 'draw')]),
  I('idl-file', 'idl abi interface schema json file', [P(doc), P('M14.5 3v5h5'), P('M9.3 10.5c-.8 0-1.1.4-1.1 1.1v1.4c0 .6-.3 1-.9 1 .6 0 .9.4.9 1v1.4c0 .7.3 1.1 1.1 1.1', 'a'), P('M11 12h5M11 14.5h3.5M11 17h4.5', 'd', 'draw')]),
  I('contract-bytecode', 'bytecode binary compiled program bytes', [R(3, 4, 7, 2.5, 1.25), C(13, 5.25, 1.25, 'f'), R(16, 4, 5, 2.5, 1.25), C(4.25, 10.25, 1.25, 'f'), R(7, 9, 5, 2.5, 1.25, 'a', 'blink'), C(15, 10.25, 1.25, 'f'), C(19.75, 10.25, 1.25, 'f'), R(3, 14, 4, 2.5, 1.25), C(10, 15.25, 1.25, 'f'), R(13, 14, 8, 2.5, 1.25), C(4.25, 20.25, 1.25, 'f'), C(8.5, 20.25, 1.25, 'f'), R(11.5, 19, 9.5, 2.5, 1.25)]),
  I('contract-decompile', 'decompile reverse engineer unpack code', [P('M4 12 2.5 8.5H10L12 12Z'), P('M20 12l1.5-3.5H14L12 12Z'), R(4, 12, 16, 9, 1.5), P('M9 16.5h6'), P('M10 2.5 8 4.5l2 2M14 2.5l2 2-2 2', 'a', 'rise')]),
  I('contract-storage-slots', 'storage slots state layout drawer', [R(4, 3, 16, 18, 2), P('M4 9h16M4 15h16'), P('M10.5 6h3M10.5 18h3'), G('slide-r', R(7, 10.25, 14.5, 3.5, 1, 'a'), P('M12.5 12h3'))]),

  // ---- explorer tools ----
  I('explorer-search-bar', 'search bar address hash lookup query', [R(2.5, 7.5, 19, 9, 4.5), C(7, 12, 2.2, 'd'), P('M8.6 13.6 10 15'), C(12.5, 12, 0.8, 'f'), C(15, 12, 0.8, 'f'), P('M17.8 9.8v4.4', 'a', 'blink')]),
  I('explorer-label-search', 'label search tag lookup named address', [C(10, 10, 7), P('M6.5 8.2h4.7l2.2 1.8-2.2 1.8H6.5Z', 'a', 'pulse'), P('M15.2 15.2 21 21')]),
  I('reverse-lookup', 'reverse lookup name resolve address', [R(3, 4, 13, 5, 2.5), C(6, 6.5, 0.9, 'f'), P('M8.5 6.5h5'), R(3, 15, 13, 5, 2.5, 'a'), P('M6 17.5h7'), P('M16.5 6.5h1.5a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-1.5', 'd', 'draw'), P('M18 15.5l-2 2 2 2')]),
  I('chain-selector', 'chain network selector dropdown switch', [R(2.5, 3, 19, 6, 2), C(6, 6, 1.5, 'a'), P('M9 6h5'), G('slide-d', P('M16.5 5l1.5 1.5L19.5 5')), R(2.5, 11, 19, 10, 2), C(6, 14.5, 1.1, 'f'), P('M9 14.5h8'), C(6, 18, 1.1, 'f'), P('M9 18h5.5')]),
  I('testnet-switch', 'testnet mainnet toggle network flask', [R(2.5, 6.5, 19, 11, 5.5), G('toggle', C(16, 12, 3.6, 'a'), P('M15.2 10.2h1.6M15.6 10.2v1.4l-1 2a.6.6 0 0 0 .5.9h1.8a.6.6 0 0 0 .5-.9l-1-2v-1.4'))]),
  I('address-overlap', 'compare addresses overlap shared venn', [C(9, 12, 6.5), C(15, 12, 6.5), P('M12 6.23A6.5 6.5 0 0 1 12 17.77A6.5 6.5 0 0 1 12 6.23Z', 'a', 'pulse')]),
  I('export-tx-csv', 'export transactions csv table download', [R(2.5, 3.5, 13, 17, 2), P('M2.5 9h13M2.5 14.5h13M7 3.5v17'), G('slide-r', P('M11.5 12h9.5M18 9l3 3-3 3', 'a'))]),
  I('onchain-query-editor', 'query editor sql run analytics', [R(2.5, 3.5, 19, 17, 2.5), P('M2.5 8h19'), C(5.2, 5.75, 0.7, 'f'), C(7.5, 5.75, 0.7, 'f'), P('M6 11.5h7M6 15h5M6 18h3'), C(16.5, 15.5, 3, 'a', 'pulse'), P('M15.6 14v3l2.4-1.5Z', 'd')]),
  I('explorer-saved-dashboard', 'saved dashboard bookmark panels', [R(3, 3, 8, 8, 2), R(13, 3, 8, 5, 2), R(3, 13, 8, 8, 2), P('M13 10h8v11l-4-3-4 3Z', 'a', 'drop')]),
  I('onchain-alert-rule', 'alert rule threshold condition trigger', [P('M2.5 13h19', 'd', 'dash'), P('M3 19.5l3.5-3 3.5 2.5 4.5-9.5'), C(12.84, 13, 1.8), G('ring', P('M18.2 3a2.6 2.6 0 0 1 2.6 2.6V8l.9 1.2h-7l.9-1.2V5.6A2.6 2.6 0 0 1 18.2 3Z', 'a'), P('M17.4 10.8h1.6'))]),
  I('onchain-webhook', 'webhook event push notify server', [cube(6.5, 7.5, 4, ['a', 'b', 'b']), P('M11 6.5c4 0 6.5 1.5 6.5 5.5', 'd', 'dash'), P('M15.5 10l2 2 2-2'), R(12.5, 13.5, 9, 7.5, 2), P('M15 17.25h4.5')]),
  I('explorer-api-key', 'api key access token developer explorer', [P('M4.5 5.5h15A1.5 1.5 0 0 1 21 7v2.5a2.5 2.5 0 0 0 0 5V17a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17v-2.5a2.5 2.5 0 0 0 0-5V7a1.5 1.5 0 0 1 1.5-1.5Z'), P('M10 9c-.9 0-1.3.4-1.3 1.2v.6c0 .7-.4 1.2-1 1.2.6 0 1 .5 1 1.2v.6c0 .8.4 1.2 1.3 1.2M14 9c.9 0 1.3.4 1.3 1.2v.6c0 .7.4 1.2 1 1.2-.6 0-1 .5-1 1.2v.6c0 .8-.4 1.2-1.3 1.2'), C(12, 12, 1.1, 'a', 'blink')]),

  // ---- wallets and entities ----
  I('rich-list', 'rich list top holders ranking crown', [P('M2.5 9 3.2 3.8 5 5.6 6.5 3l1.5 2.6 1.8-1.8.7 5.2Z', 'a', 'float'), R(12, 4, 9.5, 4.5, 2.25, 'b', 'grow-x'), R(12, 10, 7, 4.5, 2.25), R(12, 16, 4.5, 4.5, 2.25), C(6.3, 12.25, 1.1, 'f'), C(6.3, 18.25, 1.1, 'f')]),
  I('holder-concentration', 'holder concentration distribution long tail supply', [P('M3 20.5V4c1.5 8 6 13.5 18 14.5v2Z'), P('M3 20.5V4c.6 3.2 1.7 6.2 3.3 8.7v7.8Z', 'a', 'breathe')]),
  I('whale-alert', 'whale alert big holder movement', [G('float', P('M3 13c0-3 2.7-5 6.5-5 4 0 6.5 2.5 8.5 4.5l2.5-3V16l-2.2-1c-1.8 2.3-4.8 3.5-8.8 3.5C5.5 18.5 3 16.3 3 13Z'), C(7, 12.3, 0.9, 'f')), P('M8.5 6.5V3.5M6.5 4.3 8.5 6.5l2-2.2', 'a', 'rise'), P('M3 21.2c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0', 'd', 'wave')]),
  I('large-transfer', 'large transfer heavy amount movement', [P('M2.5 12h2.5M3.5 15.5h2M2.5 19h2.5', 'd', 'slide-l'), G('slide-r', P('M11.5 9V7.5a2.5 2.5 0 0 1 5 0V9'), P('M8.5 9h11l2 11h-15Z', 'a'), P('M11 15h6M15 13l2 2-2 2'))]),
  I('smart-money', 'smart money wallet expert trader label', [C(12, 14.5, 6.5), C(12, 14.5, 4, 'd'), P('M3.5 7 12 3.5 20.5 7 12 10.5Z', 'a'), P('M18 8v4.5', 'd', 'swing')]),
  I('address-cluster', 'address cluster entity group heuristic', [P('M6.5 4h11A3.5 3.5 0 0 1 21 7.5v9a3.5 3.5 0 0 1-3.5 3.5h-11A3.5 3.5 0 0 1 3 16.5v-9A3.5 3.5 0 0 1 6.5 4', 'd', 'dash'), P('M9.5 8.5h2.3M14.5 9.9l1.9 2.3M15.9 14l-4.7 1.1M8 10.5l.8 3'), C(7.5, 8.5, 2, 'a', 'pulse'), C(13.5, 8.5, 1.7), C(17.5, 13.5, 1.7), C(9.5, 15.3, 1.7)]),
  I('entity-label', 'entity label tag named address attribution', [P(poly(7.5, 7.5, 4.5, 6)), C(7.5, 7.5, 1.3, 'f'), P('M10.3 10.6 11.6 14'), G('tilt', P('M13 12h6.5a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H13l-3-4Z', 'a'), C(13.3, 16, 0.9, 'f'))]),
  I('counterparty-map', 'counterparties map interactions graph hub', [P('M12 8V5.8M15.5 10l1.9-1.1M15.5 14l1.9 1.1M12 16v2.2M8.5 14l-1.9 1.1M8.5 10l-1.9-1.1', 'd', 'dash'), C(12, 12, 3, 'a', 'pulse'), C(12, 4, 1.8), C(18.9, 8, 1.8), C(18.9, 16, 1.8), C(12, 20, 1.8), C(5.1, 16, 1.8), C(5.1, 8, 1.8)]),
  I('wallet-age-rings', 'wallet age tree rings history old', [P('M12 3c5 0 9 3.8 9 8.8 0 5.2-4 9.2-9 9.2s-9-4.1-9-9.2C3 6.9 7 3 12 3Z'), P('M12 5.8c3.6 0 6.3 2.7 6.3 6.1 0 3.6-2.8 6.4-6.3 6.4s-6.3-2.8-6.3-6.4S8.4 5.8 12 5.8'), C(12, 12, 3, 'a', 'pulse'), P('M12 3.5l.6 2.3')]),
  I('first-seen', 'first seen first transaction origin timeline', [P('M3 19.5h18'), P('M7 19.5V4'), G('wave', P('M7 4.5h10l-2.2 3 2.2 3H7Z', 'a')), C(13, 19.5, 1.1, 'f'), C(17.5, 19.5, 1.1, 'f')]),
  I('funds-trace', 'trace funds follow money path investigate', [P('M3.5 19.5c3.5 0 3.5-6 6.5-6s3-6 5.5-6', 'd', 'dash'), C(3.5, 19.5, 1.6), C(10, 13.5, 1.6), C(17, 7, 3.6, 'a', 'pulse'), P('M19.6 9.6 21.5 11.5')]),
  I('wash-trade-loop', 'wash trading self trade loop circular', [P('M12 12c-1.7-2.5-3.5-3.8-5.7-3.8a3.8 3.8 0 0 0 0 7.6c2.2 0 4-1.3 5.7-3.8s3.5-3.8 5.7-3.8a3.8 3.8 0 0 1 0 7.6c-2.2 0-4-1.3-5.7-3.8', 'd', 'dash'), C(6.3, 12, 1.8, 'a', 'pulse'), C(17.7, 12, 1.8, 'a', 'pulse:.5')]),
  I('mixer-exposure', 'mixer exposure tumbler privacy risk', [G('spin-slow', X(12, 12, 9), P('M12 3a9 9 0 1 1-9 9 6.5 6.5 0 0 1 6.5-6.5 4.2 4.2 0 0 1 4.2 4.2 2 2 0 0 1-2 2')), C(19, 4.5, 2.4, 'a', 'drop')]),
  I('dust-attack', 'dust attack tiny deposits spam wallet', [R(3, 9, 17, 12, 2.5), R(12, 12.5, 9, 5.5, 2), C(16, 15.25, 1.3, 'a'), C(6, 3.5, 0.9, 'f', 'drop'), C(10, 5, 0.9, 'f', 'drop:.5'), C(14, 3, 0.9, 'f', 'drop:1'), C(18, 5.5, 0.9, 'f', 'drop:1.5')]),
  I('token-risk-scan', 'token scan security check honeypot', [P('M3 7V4.5A1.5 1.5 0 0 1 4.5 3H7M17 3h2.5A1.5 1.5 0 0 1 21 4.5V7M21 17v2.5a1.5 1.5 0 0 1-1.5 1.5H17M7 21H4.5A1.5 1.5 0 0 1 3 19.5V17'), C(12, 12, 6.5), C(12, 12, 3.8, 'd'), P('M4.5 12h15', 'a', 'scan')]),

  // ---- network analytics ----
  I('slot-timeline', 'slot timeline sequence current playhead', [P('M12.5 3.5h4l-2 2.5Z', 'b', 'slide-r'), R(2.5, 9, 4, 6, 1), R(7.5, 9, 4, 6, 1), R(12.5, 9, 4, 6, 1, 'a'), P('M19.5 9h2v6h-4V9h2', 'd', 'dash'), P('M2.5 19h19')]),
  I('block-space-usage', 'block space usage capacity fill limit', [R(3, 3, 18, 18, 3), P('M5.5 7.5h13', 'd', 'dash'), R(5.5, 10.5, 13, 8, 1.5, 'a', 'grow'), P('M8.5 14.5h7')]),
  I('block-propagation', 'block propagation broadcast network spread', [P(arc(12, 12, 6.5, 50, 130), 'd', 'blink'), P(arc(12, 12, 6.5, 230, 310), 'd', 'blink'), P(arc(12, 12, 9.5, 55, 125), 'd', 'blink:.4'), P(arc(12, 12, 9.5, 235, 305), 'd', 'blink:.4'), cube(12, 12.3, 3.8, ['a', 'b', 'b'], 'pulse')]),
  I('live-block-feed', 'live blocks feed stream conveyor', [G('slide-r', cube(6.5, 11.5, 2.8, ['b', 'b', 'b']), cube(13, 11.5, 2.8, ['a', 'b', 'b'])), C(19.5, 6, 1.5, 'a', 'blink'), R(2.5, 15.5, 19, 4.5, 2.25), C(5, 17.75, 0.9, 'f'), C(12, 17.75, 0.9, 'f'), C(19, 17.75, 0.9, 'f')]),
  I('validator-map', 'validator map globe nodes geography', [C(12, 12, 9), E(12, 12, 4, 9, 'd'), P('M3 12h18'), P(poly(8, 7.5, 2, 6), 'a', 'pulse'), P(poly(16.5, 10, 2, 6), 'a', 'pulse:.5'), P(poly(10, 16.5, 2, 6), 'a', 'pulse:1')]),
  I('stake-distribution', 'stake distribution validators share donut', [P(wedge(12, 12, 9, 0, 130), 'a', 'pop'), P(wedge(12, 12, 9, 138, 250)), P(wedge(12, 12, 9, 258, 352)), P(poly(12, 12, 3.6, 6), 'd')]),
  I('network-tps-chart', 'network tps throughput chart area', [P('M3 20.5V15l4.5-3.5 4 2.5 4.5-6 5 3.5v9Z'), P('M8.5 2.5 6.5 6h3l-2 3', 'a', 'blink')]),
  I('chain-growth', 'chain growth blocks size history', [cube(4.9, 17.6, 2.6, ['b', 'b', 'b']), cube(10.3, 15.4, 3.4, ['b', 'b', 'b']), cube(17.3, 10.5, 4.9, ['a', 'b', 'b'], 'float')]),
  I('active-addresses', 'active addresses daily users activity', [C(5, 5, 1.6), C(12, 5, 2.5, 'a', 'blink'), C(19, 5, 1.6), C(5, 12, 2.5, 'a', 'blink:.4'), C(12, 12, 2.5, 'a', 'blink:.8'), C(19, 12, 1.6), C(5, 19, 1.6), C(12, 19, 1.6), C(19, 19, 2.5, 'a', 'blink:1.2')]),
  I('new-users-curve', 'new users growth curve adoption', [P('M3 3v18h18'), P('M6 17.5c5.5 0 8.5-3 11-9', 'd', 'draw'), C(18.5, 5.5, 2.3, 'a', 'pop'), P('M6.5 6h4M8.5 4v4')]),
  I('activity-heat-calendar', 'activity heat calendar contributions days', [R(3, 4.5, 18, 16.5, 2.5), P('M8 2.5v4M16 2.5v4'), R(5.5, 9.5, 3.5, 3.5, 0.8, 'a', 'breathe'), C(12, 11.25, 0.9, 'f'), R(15, 9.5, 3.5, 3.5, 0.8, 'a', 'breathe:.5'), C(7.25, 16.25, 0.9, 'f'), R(10.25, 14.5, 3.5, 3.5, 0.8, 'a', 'breathe:1'), R(15, 14.5, 3.5, 3.5, 0.8, 'a', 'breathe:1.5')]),
  I('cohort-triangle', 'cohort analysis retention triangle grid', cohort),
  I('hodl-waves', 'hodl waves coin age bands supply', [P('M3 7c3-1.2 6 1.2 9 0s6-1.2 9 0V3H3Z'), P('M3 13.5c3-1.2 6 1.2 9 0s6-1.2 9 0v-4c-3-1.2-6 1.2-9 0s-6-1.2-9 0Z', 'b', 'wave'), P('M3 21v-5c3-1.2 6 1.2 9 0s6-1.2 9 0v5Z', 'a')]),
  I('cu-flame-graph', 'compute flame graph profile program cost', [R(2.5, 17.5, 19, 3.5, 1), R(2.5, 11, 11, 3.5, 1), R(16, 11, 5.5, 3.5, 1), R(4, 4.5, 7, 3.5, 1, 'a', 'grow-x')]),

  // ---- markets and money flow ----
  I('flow-sankey', 'money flow sankey funds split', [R(2.5, 3.5, 3, 17, 1.2, 'a'), P('M7 3.5C13 3.5 14 3 21.5 3V8.5C14 8.5 13 9 7 9Z', 'b', 'breathe'), P('M7 11C13 11 14 12 21.5 12V15C14 15 13 14.5 7 14.5Z', 'b', 'breathe:.4'), P('M7 16.5C13 16.5 14 18 21.5 18V21C14 21 13 20.5 7 20.5Z', 'b', 'breathe:.8')]),
  I('inflow-outflow', 'inflow outflow deposits withdrawals net', [P('M12 2.5v4.5M9.8 4.8 12 7l2.2-2.2', 'a', 'slide-d'), P('M5 8h14l-1.4 11.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8Z'), P('M7 12.5h10', 'd', 'wave'), P('M18.2 15.5h3.3M20 13.8l1.6 1.7-1.6 1.7', 'd', 'slide-r')]),
  I('exchange-netflow', 'exchange netflow deposits outflows cex', [P('M9.5 2.5v7.5M7.5 8l2 2 2-2', 'a', 'slide-d'), P('M14.5 10V3.5M12.5 5.5l2-2 2 2', 'd', 'slide-u'), P('M4 15.5 12 12l8 3.5Z'), R(5, 16.5, 14, 4.5, 1), P('M8.5 16.5V21M12 16.5V21M15.5 16.5V21')]),
  I('dex-volume-share', 'dex volume share market split swaps', [P('M4 5.5h13M14.5 3 17 5.5 14.5 8M20 11H7M9.5 8.5 7 11l2.5 2.5'), R(2.5, 15, 19, 5.5, 2), R(2.5, 15, 10, 5.5, 2, 'a', 'grow-x'), P('M16.5 15v5.5')]),
  I('onchain-volume', 'onchain volume blocks bars activity', [R(3, 17.5, 3.5, 3.5, 0.8), R(3, 13, 3.5, 3.5, 0.8), R(8, 17.5, 3.5, 3.5, 0.8), R(8, 13, 3.5, 3.5, 0.8), R(8, 8.5, 3.5, 3.5, 0.8), R(13, 17.5, 3.5, 3.5, 0.8), R(18, 17.5, 3.5, 3.5, 0.8), R(18, 13, 3.5, 3.5, 0.8), R(18, 8.5, 3.5, 3.5, 0.8), R(18, 4, 3.5, 3.5, 0.8, 'a', 'rise')]),
  I('tvl-chart', 'tvl total value locked chart vault', [P('M8 10V7a4 4 0 0 1 8 0v3'), R(4, 10, 16, 11, 2.5), P('M7 18l3-3 2.5 2 4.5-4.5', 'a', 'draw')]),
  I('protocol-revenue', 'protocol revenue earnings fees income', [P(poly(9, 9, 6, 6)), P(poly(9, 9, 2.5, 6), 'd'), R(14, 15, 7.5, 2.5, 1.25), R(13, 18.5, 8.5, 2.5, 1.25), C(17.5, 10, 2.6, 'a', 'drop')]),
  I('fee-burn-chart', 'fee burn chart destroyed supply deflation', [R(3.5, 13, 4, 7.5, 1), R(10, 10.5, 4, 10, 1), R(16.5, 14.5, 4, 6, 1), P('M12 2.5c1.8 1.8 2.6 3.3 2.6 4.5a2.6 2.6 0 0 1-5.2 0c0-1.2.6-2.1 1.3-2.8.1.8.5 1.3 1 1.5.2-1.2-.1-2.2.3-3.2Z', 'a', 'pulse')]),
  I('gas-price-history', 'gas price history fees chart gwei', [P('M3 3v18h18'), P('M6 16.5l3.5-4 3 2.5 4-5', 'd', 'draw'), P('M18.5 3c1.7 2.2 2.6 3.7 2.6 5a2.6 2.6 0 0 1-5.2 0c0-1.3.9-2.8 2.6-5Z', 'a', 'drop')]),
  I('fee-market', 'fee market supply demand price equilibrium', [P('M3 3v18h18'), P('M6.5 17.5 19 6'), P('M6.5 7.5l12.5 10'), C(12.3, 12.15, 2.3, 'a', 'pulse')]),
  I('unrealized-profit', 'unrealized profit loss wave holders', [P('M3 12c1-8.5 5-8.5 6 0Z', 'a', 'breathe'), P('M9 12c1 8.5 5 8.5 6 0Z'), P('M15 12c1-8.5 5-8.5 6 0Z', 'a', 'breathe:.6'), P('M2.5 12h19', 'd', 'dash')]),
  I('balance-history', 'balance history steps changes over time', [P('M3 3v18h18'), P('M6 17.5h3.5v-4H13v2h3V9h4', 'a', 'draw')]),
];
