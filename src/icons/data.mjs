import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

// ---- shared shapes for this category ----
const r2 = (v) => +v.toFixed(2);
// full page with folded corner (x 5..19, y 3..21) and a smaller one that leaves room for a bottom-right badge
const page = () => [P('M7 3h6.5L19 8.5V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z'), P('M13.5 3v4a1.5 1.5 0 0 0 1.5 1.5h4')];
const spage = () => [P('M6 3h5.5L16 7.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z'), P('M11.5 3v3a1.5 1.5 0 0 0 1.5 1.5h3')];
const folder = () => P('M3 7a2 2 0 0 1 2-2h4.2l2 2.2H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z');
// database cylinder: [body, rim of the top]
const cyl = (x, y, w, h, role = 'b') => {
  const rx = r2(w / 2), ry = r2(w * 0.2);
  return [P(`M${x} ${r2(y + ry)}a${rx} ${ry} 0 0 1 ${w} 0v${r2(h - 2 * ry)}a${rx} ${ry} 0 0 1 ${-w} 0Z`, role), P(`M${x} ${r2(y + ry)}a${rx} ${ry} 0 0 0 ${w} 0`)];
};
// circular arrow (clockwise from a0 to a1, degrees, 0 = up); head at the end, or at the start when rev
const pt = (cx, cy, r, a) => { const t = ((a - 90) * Math.PI) / 180; return [cx + r * Math.cos(t), cy + r * Math.sin(t)]; };
const carrow = (cx, cy, r, a0, a1, role = 'a', rev = false, hs = 1.7) => {
  const at = rev ? a0 : a1, [x, y] = pt(cx, cy, r, at);
  const t = ((at - 90) * Math.PI) / 180, s = rev ? -1 : 1;
  const dx = -Math.sin(t) * s, dy = Math.cos(t) * s; // travel direction
  const bx = x - dx * hs, by = y - dy * hs, px = -dy * hs * 0.9, py = dx * hs * 0.9;
  return [P(arc(cx, cy, r, a0, a1), role), P(`M${r2(bx + px)} ${r2(by + py)}L${r2(x)} ${r2(y)}L${r2(bx - px)} ${r2(by - py)}`, role)];
};
const corners = 'M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3';
const shield = 'M12 2.8l7.5 2.7v5.8c0 4.6-3.1 8.4-7.5 9.9-4.4-1.5-7.5-5.3-7.5-9.9V5.5Z';
const cloud = 'M7 19a4 4 0 0 1-.8-7.9A6 6 0 0 1 17.7 9.6 4.7 4.7 0 0 1 17 19Z';
const bin = 'M6 8h12l-1 11.1a2 2 0 0 1-2 1.9H9a2 2 0 0 1-2-1.9Z';

export default [
  // ---------- files ----------
  I('file-pdf', 'pdf document portable print fixed layout', [...page(), P('M8 10.5h3.5'), R(7.5, 13, 9, 5.5, 1.5, 'a', 'pop'), P('M9.5 15.75h5')]),
  I('file-spreadsheet', 'sheet excel table grid cells workbook', [...page(), R(8, 11, 8, 7.5, 1, 'a', 'pop'), P('M8 13.5h8M8 16h8M11 11v7.5')]),
  I('file-presentation', 'slides deck pie chart pitch keynote', [...page(), P(arc(11.5, 14.5, 3.8, 90, 360)), P('M11.5 10.7v3.8h3.8'), P(wedge(12.3, 13.7, 3.8, 0, 90), 'a', 'pop')]),
  I('file-image', 'photo picture png jpg graphic', [...page(), C(9, 10.5, 1.6, 'a', 'pulse'), P('M5.5 18l4.5-5 3.5 4 1.8-2 3.2 3.5')]),
  I('file-video', 'movie clip mp4 film media', [...page(), P('M10 11.5v6l5-3Z', 'a', 'pulse')]),
  I('file-audio', 'sound music mp3 podcast recording', [...page(), P('M11 17.5V11l5-1.5V16'), C(9.6, 17.5, 1.6, 'a', 'beat'), C(14.6, 16, 1.6, 'a', 'beat:.3')]),
  I('file-zip', 'archive compressed zip bundle package', [...page(), P('M10.5 4.5H12M12 7h1.5M10.5 9.5H12M12 12h1.5'), R(10.5, 14, 3, 4.5, 1, 'a', 'slide-d')]),
  I('file-code', 'source script developer program code', [...page(), P('M10 12l-2.5 2.5L10 17', 'd', 'slide-l'), P('M14 12l2.5 2.5L14 17', 'd', 'slide-r'), P('M12.8 11.5l-1.6 6', 'a')]),
  I('file-csv', 'csv values rows export table data', [...page(), R(7.5, 10.5, 9, 2.6, 1.3, 'a', 'pop'), P('M8 15.5h2M11 15.5h2M14 15.5h2M8 18.5h2M11 18.5h2M14 18.5h2')]),
  I('file-text', 'document txt notes plain text page', [...page(), P('M8 11h4', 'a', 'grow-x'), P('M8 14h8M8 17h6', 'd', 'draw')]),
  I('file-new', 'create blank add new document', [...spage(), P('M7 10.5h5M7 13.5h3'), G('pulse', C(18, 17, 4.2, 'a'), P('M18 15v4M16 17h4'))]),
  I('file-duplicate', 'copy clone duplicate document', [P('M10 3h6l4 4v8.5a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z'), G('diag', P('M6 7h6l4 4v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z', 'a'), P('M12 7v2.5a1.5 1.5 0 0 0 1.5 1.5H16'))]),
  I('file-stack', 'files collection documents batch pile', [P('M7.5 3.5H16a3 3 0 0 1 3 3V17'), G('float', R(4, 6.5, 12, 14.5, 2.2), P('M7 11h6', 'a'), P('M7 14h6M7 17h4'))]),
  I('file-shared', 'share document collaborate send', [...page(), P('M10.3 14.3l3.4-1.6M10.3 15.7l3.4 1.6'), C(9, 15, 1.5, 'a', 'pulse'), C(15, 12, 1.4, 'a'), C(15, 18, 1.4, 'a')]),
  I('recent-files', 'history recent opened last time documents', [...spage(), P('M7 10.5h5M7 13.5h3'), C(18, 17, 4.2, 'a'), P('M18 17l1.4 1'), G('spin', X(18, 17, 4.2), P('M18 17v-2.3'))]),
  I('trash-bin', 'delete remove garbage discard bin', [P(bin), P('M10 11v6.5M14 11v6.5'), G('tilt', R(3.5, 5, 17, 2.4, 1.2, 'a'), P('M9.5 5V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1'))]),
  I('restore-bin', 'undelete recover restore trash bring back', [P(bin), R(3.5, 5, 17, 2.4, 1.2, 'a'), P('M9.5 5V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1'), G('slide-u', P('M12 18.5v-6'), P('M9.5 14.5l2.5-2.5 2.5 2.5'))]),
  I('file-export', 'export send out move document arrow', [...spage(), P('M7 10.5h4M7 13.5h3'), G('slide-r', P('M11.5 16h9', 'a'), P('M17.5 13l3 3-3 3', 'a'))]),
  I('file-rename', 'rename edit title cursor text', [...page(), P('M8 14.5h3.5'), P('M14 10.5v8M12.8 10.5h2.4M12.8 18.5h2.4', 'a', 'blink')]),
  I('file-signature', 'sign signed contract document esign', [...page(), P('M8 11h4'), P('M7.5 16.5c1-2.5 2-3 2.5-1.5s.5 2 1.5.5 1.5-2 2.5-1 1 1.5 2.5 1', 'a', 'draw'), P('M8 18.5h8')]),
  I('file-chart', 'report analytics dashboard stats document', [...page(), P('M9 18v-3', 'd', 'grow'), P('M12 18v-6', 'a', 'grow:.3'), P('M15 18v-4', 'd', 'grow:.6')]),
  I('report-generator', 'build report automate generate document gear', [...spage(), P('M7 10.5h5M7 13.5h3'), G('spin', P(gear(18, 17, 4.4, 3.3, 7))), C(18, 17, 1.5, 'a')]),
  I('file-qr', 'qr code scan document link', [...page(), R(7.5, 10.5, 3, 3, 0.6, 'd'), R(13.5, 10.5, 3, 3, 0.6, 'd'), R(7.5, 16, 3, 3, 0.6, 'd'), C(15, 17.5, 1, 'f'), P('M6.5 14.8h11', 'a', 'scan')]),

  // ---------- folders & storage ----------
  I('folder-open', 'open directory browse files', [P('M3 20V7a2 2 0 0 1 2-2h4.2l2 2.2H17a2 2 0 0 1 2 2V10H7.4a2 2 0 0 0-1.9 1.4Z'), P('M3 20l2.5-8.5A2 2 0 0 1 7.4 10h13a.8.8 0 0 1 .8 1l-2.3 7.6A2 2 0 0 1 17 20Z', 'a', 'sink')]),
  I('folder-shared', 'team shared directory collaborate people', [folder(), G('pulse', C(9.5, 11.8, 1.5, 'a'), C(14.5, 11.8, 1.5, 'a')), P('M6.8 17a2.7 2.7 0 0 1 5.4 0M11.8 17a2.7 2.7 0 0 1 5.4 0')]),
  I('folder-zip', 'archive compressed directory zip', [folder(), P('M12 7.2h1.5M10.5 9.5H12M12 11.5h1.5'), R(10.5, 13.5, 3, 4, 1, 'a', 'slide-d')]),
  I('folder-arrow-up', 'upload directory send publish', [folder(), G('slide-u', P('M12 17.5v-7', 'a'), P('M9 13.5l3-3 3 3', 'a'))]),
  I('folder-private', 'secure private directory keyhole protected', [folder(), C(12, 12, 1.8, 'a', 'pulse'), P('M12 14v3')]),
  I('cloud-storage', 'cloud drive hosting storage disk', [P('M7 14a3.5 3.5 0 0 1-.4-7A5.5 5.5 0 0 1 17.3 6.5 3.75 3.75 0 0 1 17 14Z'), P('M12 14v2'), R(5, 16, 14, 5, 2), P('M8 18.5h4'), C(16, 18.5, 1, 'a', 'blink')]),
  I('backup', 'backup drive copy save disk', [G('spin', X(12, 7, 4), ...carrow(12, 7, 4, 60, 330)), R(3, 13, 18, 7, 2), P('M6.5 16.5h5'), C(17, 16.5, 1, 'a', 'blink')]),
  I('restore-point', 'restore rollback undo history time', [G('spin-rev', X(12, 12, 8.5), ...carrow(12, 12, 8.5, -60, 230, 'a', true)), C(12, 12, 1.3, 'f'), P('M12 7.5V12l3 2')]),
  I('cloud-refresh', 'cloud sync refresh update reload', [P(cloud), G('spin', X(12, 14.5, 2.8), ...carrow(12, 14.5, 2.8, 20, 150, 'a', false, 1.3), ...carrow(12, 14.5, 2.8, 200, 330, 'a', false, 1.3))]),
  I('disk-storage', 'disk hdd storage platter drive', [R(3, 5, 18, 14, 2.5), G('spin', X(10, 12, 4), C(10, 12, 4, 'a'), P('M10 8.8v1.4')), C(10, 12, 1, 'd'), P('M17.5 7.5v6.5l-3.5 2'), C(17.5, 16.5, 0.9, 'f')]),
  I('solid-state-drive', 'ssd flash storage nvme drive chip', [R(3, 5, 18, 14, 2.5), R(6, 8, 5, 5, 1, 'a', 'blink'), R(13, 8, 5, 5, 1, 'a', 'blink:.6'), P('M7 15.5v1.5M9.5 15.5v1.5M12 15.5v1.5M14.5 15.5v1.5M17 15.5v1.5')]),
  I('usb-storage', 'usb stick flash thumb drive', [P('M9.5 9V4.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V9Z'), C(11.1, 6.2, 0.7, 'f'), C(12.9, 6.2, 0.7, 'f'), R(7.5, 9, 9, 12.5, 2.5), C(12, 16.5, 1.4, 'a', 'blink')]),
  I('memory-card', 'sd card storage memory camera', [P('M8 3h9a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z'), P('M9.5 5v2.5M12 5v2.5M14.5 5v2.5M17 5v2.5'), R(8, 11.5, 8, 6.5, 1.5, 'a', 'pop')]),

  // ---------- data ----------
  I('data-flow', 'flow pipeline stream nodes route', [P('M7.2 7.5c3 0 3 3.5 6.8 4.5M7.2 16.5c3 0 3-3.5 6.8-4.5', 'd', 'dash'), C(5, 7, 2.2), C(5, 17, 2.2), R(14, 8.5, 7, 7, 2, 'a', 'pulse')]),
  I('etl-pipeline', 'etl extract transform load pipeline', [...cyl(2.5, 5, 7, 14), P('M10.5 12h2', 'd', 'dash'), G('spin', P(gear(17, 12, 4.6, 3.4, 8))), C(17, 12, 1.7, 'a')]),
  I('data-lake', 'lake raw data storage big data', [C(8, 5, 1, 'f', 'drop'), C(12, 7, 1, 'f', 'drop:.5'), C(16, 5, 1, 'f', 'drop:1'), E(12, 16, 9, 4.5), P('M6.5 16c1.2-.9 2.3-.9 3.5 0s2.3.9 3.5 0 2.3-.9 3.5 0', 'a', 'wave')]),
  I('data-warehouse', 'warehouse olap storage tables building', [P('M3 9.5 12 4l9 5.5Z', 'a', 'pop'), R(4.5, 11, 15, 9.5, 1.5), P('M4.5 14.5h15M4.5 17.5h15M9.5 11v9.5M14.5 11v9.5')]),
  I('schema', 'schema model entity relation tables erd', [P('M7.5 10v4M12 6.5h5v3', 'd', 'dash'), R(3, 3, 9, 7, 1.5, 'a', 'pop'), P('M3 5.8h9'), R(13, 9.5, 8, 7, 1.5), P('M13 12.3h8'), R(3, 14, 8, 7, 1.5), P('M3 16.8h8')]),
  I('json-object', 'json object key value data structure', [P('M8 4H7.5a2 2 0 0 0-2 2v4L3.5 12l2 2v4a2 2 0 0 0 2 2H8M16 4h.5a2 2 0 0 1 2 2v4l2 2-2 2v4a2 2 0 0 1-2 2H16'), P('M9 9.5h2M9 14.5h2'), C(12.5, 9.5, 0.9, 'f'), C(12.5, 14.5, 0.9, 'f'), P('M14 9.5h1.5', 'a', 'blink'), P('M14 14.5h1.5', 'a', 'blink:.4')]),
  I('data-import', 'import ingest load database inbound', [...cyl(10, 3.5, 11, 17), G('slide-r', P('M2.5 12h9', 'a'), P('M8.5 9l3 3-3 3', 'a'))]),
  I('data-export', 'export extract database outbound dump', [...cyl(3, 3.5, 11, 17), G('slide-r', P('M12.5 12h9', 'a'), P('M18.5 9l3 3-3 3', 'a'))]),
  I('data-migration', 'migrate move database transfer copy', [...cyl(2.5, 5, 6, 14), ...cyl(15.5, 5, 6, 14), G('slide-r', P('M10 12h4.5', 'a'), P('M12.5 10l2 2-2 2', 'a'))]),
  I('version-history', 'versions timeline revisions changes log', [P('M6 6v12'), C(6, 6, 1.8, 'a', 'pulse'), C(6, 12, 1.8), C(6, 18, 1.8), P('M10 6h10M10 12h8M10 18h6')]),
  I('branch-history', 'branch fork commit git merge history', [P('M7 7v10M7 15c0-3.5 10-2.5 10-6'), C(7, 5, 2), C(7, 19, 2), C(17, 7, 2, 'a', 'pulse')]),
  I('data-snapshot', 'snapshot capture point in time backup', [G('pulse', P(corners)), ...cyl(8, 7, 8, 10, 'a')]),
  I('data-table', 'table rows columns records grid', [R(3, 4, 18, 16, 2.5), P('M3 9h18M3 14.5h18M9 9v11'), R(11, 10.8, 7.5, 2, 1, 'a', 'grow-x')]),
  I('data-query', 'query search sql lookup database', [...cyl(3, 3, 12, 15), P('M3 10.5a6 2.4 0 0 0 12 0'), G('tilt', C(16.5, 16, 3.5, 'a'), P('M19 18.5l2.5 2.5', 'a'))]),
  I('data-merge', 'merge join combine streams union', [P('M4 5c5 0 6 7 9 7h7M4 19c5 0 6-7 9-7'), C(4, 5, 1.5, 'a'), C(4, 19, 1.5, 'a'), P('M17 9l3 3-3 3', 'a', 'slide-r')]),

  // ---------- security & privacy ----------
  I('fingerprint', 'biometric touch id identity login', [P('M5 17.5c-.5-1.6-1-3.4-1-5.5a8 8 0 0 1 16 0c0 1-.1 2-.2 3M19.4 18c-.2.7-.5 1.4-.8 2'), P('M8.5 20.5c-.6-2.3-.9-4.7-.9-8.5a4.4 4.4 0 0 1 8.8 0c0 3.2-.4 6-1.2 8.5'), P('M12 12v2.5c0 2.3.3 4.3 1 6.5', 'a', 'draw')]),
  I('face-scan', 'face id recognition biometric unlock', [P(corners), C(9.5, 10, 0.9, 'f'), C(14.5, 10, 0.9, 'f'), P('M12 10v3h-1'), P('M9.5 15.5c1.4 1.2 3.6 1.2 5 0'), P('M5.5 12h13', 'a', 'scan')]),
  I('retina-scan', 'eye iris biometric scan identity', [P(corners), P('M5 12s2.5-4.5 7-4.5 7 4.5 7 4.5-2.5 4.5-7 4.5S5 12 5 12Z'), C(12, 12, 2.2, 'a', 'pulse')]),
  I('scan-id', 'id card kyc identity verify document', [R(3, 5, 18, 14, 2.5), C(8.5, 10.5, 2, 'a', 'pulse'), P('M5.5 16a3 3 0 0 1 6 0'), P('M14 10h4M14 13.5h4')]),
  I('two-factor', '2fa mfa authentication second factor verify', [R(2.5, 8.5, 9.5, 7, 2), C(5.25, 12, 0.9, 'f'), C(7.25, 12, 0.9, 'f'), C(9.25, 12, 0.9, 'f'), R(14, 3.5, 7.5, 17, 2), P('M16.5 6h2.5'), G('pulse', C(17.75, 13, 2.2, 'a'), P('M16.8 13l.7.7 1.3-1.4'))]),
  I('otp-code', 'otp one time code sms phone verification', [R(6, 2.5, 12, 19, 2.5), P('M10.5 5h3'), C(9, 10.5, 1.1, 'f', 'blink'), C(12, 10.5, 1.1, 'f', 'blink:.2'), C(15, 10.5, 1.1, 'f', 'blink:.4'), R(8.5, 14, 7, 3, 1.5, 'a', 'pop'), P('M10.5 19h3')]),
  I('password-field', 'password input secret masked login', [R(2.5, 7, 19, 10, 2.5), C(7, 12, 1.2, 'f'), C(10.5, 12, 1.2, 'f'), C(14, 12, 1.2, 'f'), P('M17.5 9.5v5', 'a', 'blink')]),
  I('password-strength', 'password strength meter strong weak', [R(2.5, 4, 19, 8, 2.5), C(7, 8, 1.1, 'f'), C(10.5, 8, 1.1, 'f'), C(14, 8, 1.1, 'f'), R(2.5, 15.5, 5, 3, 1.5, 'a'), R(9.5, 15.5, 5, 3, 1.5, 'a', 'blink'), R(16.5, 15.5, 5, 3, 1.5)]),
  I('encrypt', 'encryption cipher secure scramble protect', [P('M2.5 9h4M2.5 15h4'), C(18, 9, 0.9, 'f', 'blink'), C(20.5, 9, 0.9, 'f', 'blink:.3'), C(18, 15, 0.9, 'f', 'blink:.6'), C(20.5, 15, 0.9, 'f', 'blink:.9'), P('M9 10V8a3 3 0 0 1 6 0v2'), G('pulse', R(7.5, 10, 9, 9, 2, 'a'), P('M12 13.5v2.5'))]),
  I('decrypt', 'decryption decode unlock reveal plain text', [C(3.5, 9, 0.9, 'f'), C(6, 9, 0.9, 'f'), C(3.5, 15, 0.9, 'f'), C(6, 15, 0.9, 'f'), P('M17.5 9h4M17.5 15h4', 'd', 'draw'), G('slide-u', P('M9 10V7.5a3 3 0 0 1 5.8-1')), R(7.5, 10, 9, 9, 2, 'a'), P('M12 13.5v2.5')]),
  I('secure-site', 'ssl https tls secure website browser', [R(2.5, 4, 19, 16, 2.5), P('M2.5 8.5h19'), C(5.5, 6.25, 0.9, 'f'), C(8, 6.25, 0.9, 'f'), P('M10 14v-1.5a2 2 0 0 1 4 0V14'), R(8.5, 14, 7, 4.5, 1.2, 'a', 'pulse')]),
  I('network-firewall', 'firewall network protection wall block', [R(3, 9, 18, 11, 2), P('M3 12.7h18M3 16.3h18M9 9v3.7M15 9v3.7M12 12.7v3.6M7 16.3V20M17 16.3V20'), P('M12 2.5c1.8 1.6 3 3 3 4.6A3 3 0 0 1 12 10a3 3 0 0 1-3-2.9c0-1.1.6-1.9 1.3-2.6.2 1 .7 1.5 1.3 1.6-.3-1.4 0-2.6.4-3.6Z', 'a', 'flicker')]),
  I('vpn-tunnel', 'vpn tunnel private network secure route', [P('M3 20.5V12a9 9 0 0 1 18 0v8.5Z'), P('M7.5 20.5V13a4.5 4.5 0 0 1 9 0v7.5'), C(12, 16.5, 1.6, 'a', 'pulse')]),
  I('incognito', 'private browsing anonymous hidden spy', [P('M6.5 11l1.8-5.6A1.5 1.5 0 0 1 10.2 4.5l1.8.8 1.8-.8a1.5 1.5 0 0 1 1.9.9L17.5 11Z'), P('M3 11h18'), G('wink', C(8, 16, 2.6, 'a'), C(16, 16, 2.6, 'a')), P('M10.6 16h2.8')]),
  I('web-cookie', 'cookie tracking browser consent storage', [G('tilt', P('M12 3a9 9 0 1 0 9 9 3 3 0 0 1-3.5-3A3 3 0 0 1 14 5.5 3 3 0 0 1 12 3Z'), C(8, 9, 1.1, 'f'), C(9, 15.5, 1.1, 'f'), C(16, 17, 1, 'f'), C(13.5, 12.5, 1.4, 'a'))]),
  I('consent-toggle', 'consent opt in permission agree switch', [R(2.5, 7, 19, 10, 5), G('toggle', C(16.5, 12, 3.2, 'a'), P('M15.2 12l.9.9 1.7-1.8'))]),
  I('privacy-guard', 'privacy personal data protection rights', [P(shield), G('pulse', C(12, 10, 2.2, 'a')), P('M8.5 16.2a3.5 3.5 0 0 1 7 0')]),
  I('data-masking', 'mask anonymize obfuscate hide pii', [G('float', P('M3 9.5c3-1.5 15-1.5 18 0 0 4-2 7-5 7-2 0-2.5-2-4-2s-2 2-4 2c-3 0-5-3-5-7Z', 'a'), E(8, 11.5, 1.8, 1.1, 'd'), E(16, 11.5, 1.8, 1.1, 'd')), P('M5 20h3M10 20h4M16 20h3', 'd', 'dash')]),
  I('redact', 'redact censor black out hide confidential', [...page(), P('M8 11h4'), R(7.5, 13, 9, 2.5, 1.25, 'a', 'grow-x'), P('M8 18h6')]),
  I('audit-trail', 'audit review inspection compliance trail', [R(3.5, 4, 12.5, 17, 2), R(7, 2.8, 5.5, 3, 1), P('M6.5 10h6.5M6.5 13.5h4'), G('tilt', C(16.5, 16, 3.6, 'a'), P('M19.1 18.6l2.4 2.4', 'a'))]),
  I('threat-bug', 'virus bug threat infection malware', [G('wiggle', P('M7.5 11 4 9M7.5 15H3.5M7.5 18.5 4 20.5M16.5 11 20 9M16.5 15h4M16.5 18.5l3.5 2')), E(12, 14.5, 4.5, 6), P('M12 10.5v10'), P('M10.5 5 9 3.2M13.5 5 15 3.2'), C(12, 7, 2.3, 'a', 'pulse')]),
  I('anti-malware', 'antivirus malware protection defense bug', [P(shield), G('pulse', E(12, 12.5, 2.4, 3.2, 'a')), P('M8 10.5l1.6.8M8 14.5l1.6-.6M16 10.5l-1.6.8M16 14.5l-1.6-.6M12 9.3v6.4')]),
  I('phishing-alert', 'phishing scam fraud bait email hook', [G('swing', P('M12 2.5V7'), R(6, 7, 12, 8.5, 1.5, 'a'), P('M6.5 8l5.5 4 5.5-4'), P('M12 15.5V17a2.5 2.5 0 0 1-5 0M7 17l1.4-1.4'))]),
  I('alarm-siren', 'alarm siren alert emergency warning light', [P('M12 2.5v2M4.5 5.5l1.4 1.4M19.5 5.5l-1.4 1.4M2.5 12H4M20 12h1.5', 'd', 'blink'), P('M6.5 17v-5a5.5 5.5 0 0 1 11 0v5Z', 'a'), P('M9.5 12a2.5 2.5 0 0 1 2.5-2.5', 'h'), R(4, 17, 16, 3.5, 1.5)]),
  I('cctv-camera', 'cctv surveillance security camera monitor', [P('M10.5 12v4H4M4 13.5v5'), G('tilt', P('M3 7.5l13.5-3.6a1 1 0 0 1 1.2.7l1.1 4.1a1 1 0 0 1-.7 1.2L4.6 13.5Z'), C(15.5, 7.7, 1, 'a', 'blink'))]),
  I('door-access', 'door access entry keypad badge building', [P('M2.5 21h19'), R(4, 3, 10, 18, 1.5), C(11.5, 12, 0.9, 'f'), R(16, 8, 5, 8, 1.5, 'a', 'pulse'), P('M17.5 10.5h2M17.5 13h2')]),
  I('keycard', 'key card badge access hotel rfid', [R(3, 4, 12, 16, 2.2), P('M7.5 7h3'), R(6, 12, 4.5, 3.5, 1, 'a'), P('M17.5 9.5a4 4 0 0 1 0 5M19.8 7.5a7 7 0 0 1 0 9', 'd', 'blink')]),
  I('safe-deposit', 'safe vault deposit box secure valuables', [R(3, 4, 18, 15, 2), P('M6 19v2M18 19v2M17.5 9.5v4'), G('spin', X(11, 11.5, 3.5), C(11, 11.5, 3.5, 'a'), P('M11 8.8v1.4'))]),
  I('shredder', 'shred destroy delete paper erase data', [R(7, 3, 10, 7, 1), G('slide-d', P('M8 15v5M10.7 15v4M13.3 15v5M16 15v4')), R(3, 9, 18, 6, 2), P('M6.5 12h11', 'a', 'blink')]),
];
