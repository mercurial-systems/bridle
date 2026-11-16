import { R, C, P, G, I, X } from '../dsl.mjs';

const doc = 'M7 3h7.5L19.5 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z';
const shield = 'M12 2.8 19.5 5.5v6c0 4.7-3.2 8.4-7.5 9.9-4.3-1.5-7.5-5.2-7.5-9.9v-6Z';

export default [
  I('building', 'office company headquarters corporate tower', [R(5, 3, 14, 18, 1.5), P('M9 7h1M14 7h1', 'd', 'blink'), P('M9 10.5h1M14 10.5h1', 'd', 'blink:.5'), P('M9 14h1M14 14h1', 'd', 'blink:1'), R(10, 17, 4, 4, 0.5, 'a')]),
  I('org-chart', 'hierarchy structure team reporting tree', [P('M12 8v4M6 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2', 'd', 'draw'), R(9, 3, 6, 5, 1.2, 'a', 'pop'), R(3, 16, 6, 5, 1.2), R(15, 16, 6, 5, 1.2)]),
  I('id-badge', 'employee identity pass access card', [G('swing', R(4.5, 3.5, 15, 18, 2.5), P('M10 3.5h4M8 17a4 4 0 0 1 8 0'), C(12, 10, 2.7, 'a'))]),
  I('meeting', 'team conference table people discussion', [C(6, 7, 2.3, 'b', 'float'), C(12, 5.5, 2.3, 'a', 'float:.4'), C(18, 7, 2.3, 'b', 'float:.8'), R(3, 12, 18, 4, 2), P('M6 16v4M18 16v4')]),
  I('document', 'file page paper doc report', [P(doc), P('M14 3v5h5.5'), P('M8.5 12.5h7M8.5 16h5', 'd', 'draw')]),
  I('folder', 'directory files archive project', [P('M3 7.5A2.5 2.5 0 0 1 5.5 5h3.6l2 2h7.4A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5Z'), R(6, 7.5, 12, 6, 1, 'a', 'slide-u'), P('M3 11.5A1.5 1.5 0 0 1 4.5 10h15a1.5 1.5 0 0 1 1.5 1.5v6a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5Z')]),
  I('contract', 'agreement signature legal sign document', [P(doc), P('M14 3v5h5.5M8.5 10.5h4'), P('M7.5 16.5c1.3-2 2.2-2 2.5 0s1.5 1.5 2.5-.5 1.7-1.4 2.5.5', 'a', 'draw')]),
  I('stamp', 'approve approval seal authorise', [G('slide-d', C(12, 5, 2.5), P('M10.5 7.5h3l1 4h-5Z'), R(4, 11.5, 16, 4, 1.5, 'a')), P('M5 19.5h14', 'd', 'blink')]),
  I('pen', 'write edit sign compose draft', [G('wiggle', P('M15 4.5l4.5 4.5L9 19.5l-5.5 1 1-5.5Z'), P('M4.5 15l4.5 4.5-5.5 1Z', 'a'), P('M13 6.5l4.5 4.5'))]),
  I('calendar-check', 'booked confirmed schedule appointment', [R(3, 4.5, 18, 16, 2.5), P('M3 9.5h18M8 3v3M16 3v3'), C(12, 15, 3.6, 'a'), P('M10.4 15l1.1 1.1 2.2-2.4', 'd', 'draw')]),
  I('stopwatch', 'timer deadline time tracking speed', [P('M10 2.5h4M12 2.5V6M18.5 7l1.5-1.5'), C(12, 13.5, 7.5), G('spin-fast', X(12, 13.5, 4.6), P('M12 13.5V9.2', 'a')), C(12, 13.5, 1.1, 'f')]),
  I('coffee', 'break cafe drink pause rest', [P('M8 3.5c-.8 1 .8 2 0 3M12 3.5c-.8 1 .8 2 0 3', 'd', 'rise'), P('M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16'), P('M4 9h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z'), P('M5.5 11.5h9', 'a')]),
  I('laptop', 'computer work remote device notebook', [R(5, 5, 14, 10, 1.5), P('M8 12l2.5-2.5 2 2L16 8', 'd', 'draw'), P('M2.5 18.5h19l-1.5-3.5H4Z', 'a')]),
  I('printer', 'print office paper output', [P('M7 9V4h10v5'), R(4, 9, 16, 8, 2), C(17, 12, 0.9, 'f', 'blink'), G('slide-d', R(7.5, 14, 9, 7, 0.8, 'a'), P('M9.5 17h5'))]),
  I('balance', 'legal law justice scale compliance fair', [P('M12 3.5V20M7 20h10'), G('seesaw', P('M4.5 7h15M4.5 7l-2 6M4.5 7l2 6M19.5 7l-2 6M19.5 7l2 6'), P('M2 13a2.5 2.5 0 0 0 5 0Z', 'a'), P('M17 13a2.5 2.5 0 0 0 5 0Z', 'a'))]),
  I('gavel', 'legal court ruling judge auction', [G('tilt', P('M9.6 3.4l5 5-3.6 3.6-5-5Z', 'a'), P('M12.8 10.2l7.7 7.7')), R(3, 18.5, 9, 2.5, 1)]),
  I('phone', 'call contact telephone hotline', [G('wiggle', P('M6.5 3h3l1.5 4.5-2 1.5a11 11 0 0 0 6 6l1.5-2 4.5 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5a2 2 0 0 1 2-2Z')), P('M14.5 3.5a6 6 0 0 1 6 6', 'a', 'blink'), P('M14.5 7a2.5 2.5 0 0 1 2.5 2.5', 'd', 'blink:.4')]),
  I('video-call', 'meeting conference camera remote zoom', [R(2.5, 6, 13, 12, 2.5), P('M15.5 10.5 21 7.5v9l-5.5-3Z', 'a'), C(9, 10.5, 2), P('M5.5 16a3.5 3.5 0 0 1 7 0'), C(5.5, 8.5, 0.9, 'f', 'blink')]),
  I('certificate', 'award diploma qualification credential', [R(3, 4, 18, 12, 1.5), P('M7 8h10M7 11h6'), G('beat', P('M14.8 17.5 14 21.5l2.5-1.3 2.5 1.3-.8-4', 'a'), C(16.5, 15, 3, 'a'))]),
  I('policy', 'compliance rules governance protection', [P(shield), P('M9 10h6M9 13.5h4', 'd', 'draw'), C(15.5, 13.5, 1, 'a', 'pulse')]),
  I('clipboard', 'list checklist notes audit inventory', [R(4.5, 4.5, 15, 17, 2.5), R(8.5, 2.5, 7, 4, 1.5, 'a'), P('M11 11h5M11 15h5', 'd', 'draw'), C(8.3, 11, 0.9, 'f'), C(8.3, 15, 0.9, 'f')]),
  I('archive', 'storage box records history', [R(4.5, 9, 15, 11, 1.5), P('M10 13h4'), R(3, 4, 18, 5, 1.5, 'a', 'float')]),
  I('book', 'handbook manual guide documentation knowledge', [P('M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2Z'), P('M4 20a2 2 0 0 0 2 2h13v-4'), P('M14 3v6l2-1.5 2 1.5V3Z', 'a', 'slide-d')]),
  I('hierarchy', 'structure levels network ladder', [P('M12 6.5v3M6 14.5v-2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2', 'd', 'dash'), C(12, 4.5, 2.5, 'a'), C(6, 17.5, 3), C(18, 17.5, 3)]),
  I('signature', 'sign autograph e-sign approve', [P('M3 17c2.5 0 3.5-9 6-9s1 8 3.5 8 2-4 4-4 1.5 3 4.5 3', 'a', 'draw'), P('M3 20.5h18')]),
  I('suitcase', 'travel trip business luggage', [G('float', P('M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6'), R(4, 6, 16, 14, 2.5), P('M8 6v14M16 6v14', 'a'), C(7, 21.2, 0.9, 'f'), C(17, 21.2, 0.9, 'f'))]),
];
