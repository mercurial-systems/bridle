import { R, C, P, G, I, X, arc } from '../dsl.mjs';

const shield = 'M12 2.8 19.5 5.5v6c0 4.7-3.2 8.4-7.5 9.9-4.3-1.5-7.5-5.2-7.5-9.9v-6Z';
const doc = 'M7 3h7.5L19.5 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z';

export default [
  I('bank', 'institution building branch columns finance', [P('M3 9.5 12 4l9 5.5Z', 'a'), C(12, 7.4, 1, 'f', 'blink'), P('M5.5 11v6M9.8 11v6M14.2 11v6M18.5 11v6'), R(3, 18, 18, 2.5, 1)]),
  I('atm', 'cash machine withdraw dispenser', [G('slide-d', R(8, 10, 8, 7.5, 1, 'a'), C(12, 13.8, 1.4, 'd')), R(3, 3, 18, 8, 2), P('M6 8h12'), C(17.5, 5.5, 0.9, 'f', 'blink')]),
  I('cheque', 'check payment paper order', [R(2.5, 6, 19, 12, 2), P('M6 10h6'), P('M6 14.5c1-1.5 1.8-1.5 2.2 0s1.3 1 2-.3 1.6-1 2.3.3', 'd', 'draw'), P('M15 14.5h4'), R(15, 8.5, 4, 3, 0.6, 'a')]),
  I('transfer', 'send move money arrows wire', [G('slide-r', P('M4 8h15M15.5 4.5 19 8l-3.5 3.5')), G('slide-l', P('M20 16H5M8.5 12.5 5 16l3.5 3.5', 'a'))]),
  I('send-money', 'pay outgoing transfer payout', [C(9, 14, 6, 'a'), P('M9 11.5v5M6.5 14h5'), G('diag', P('M15 4.5h5v5M20 4.5l-6 6'))]),
  I('receive-money', 'incoming deposit get paid', [C(15, 10, 6, 'a'), P('M15 7.5v5M12.5 10h5'), G('diag-in', P('M3.5 15v5h5M3.5 20l6-6'))]),
  I('qr-pay', 'scan code payment mobile', [R(3, 3, 7, 7, 1.5), R(14, 3, 7, 7, 1.5), R(3, 14, 7, 7, 1.5), R(5.5, 5.5, 2, 2, 0.4, 'f'), R(16.5, 5.5, 2, 2, 0.4, 'f'), R(5.5, 16.5, 2, 2, 0.4, 'f'), P('M14 14h3v3M17 21h4v-4M14 21v-3'), P('M2 12h20', 'a', 'scan')]),
  I('tap-to-pay', 'nfc phone contactless mobile wallet', [R(4, 2.5, 10, 19, 2.5), P('M8 18.5h2'), C(9, 10, 2.6, 'a'), P('M7.9 10l.8.8 1.5-1.6'), P('M16.5 9a4.5 4.5 0 0 1 0 6', 'd', 'blink'), P('M19.3 6.8a8 8 0 0 1 0 10.4', 'd', 'blink:.3')]),
  I('pos-terminal', 'card reader point of sale checkout', [R(5, 2.5, 14, 19, 2.5), R(7.5, 5, 9, 5, 1, 'a', 'breathe'), ...[9, 12, 15].flatMap((x) => [C(x, 13.5, 0.95, 'f'), C(x, 16.8, 0.95, 'f')])]),
  I('statement', 'account history report balance', [P(doc), P('M14 3v5h5.5M8 9h4'), P('M8 16.5l2.5-2.5 2 1.5 3.5-4', 'a', 'draw')]),
  I('mortgage', 'home loan house property rate', [P('M5.5 9.3 12 4l6.5 5.3V20h-13Z'), P('M9.5 17l5-5'), C(10, 12.5, 1.1, 'a', 'pulse'), C(14, 16.5, 1.1, 'a', 'pulse:.5'), P('M3 11 12 3.5 21 11')]),
  I('fraud-alert', 'warning risk suspicious security breach', [G('shake', P(shield, 'a'), P('M12 8v5'), C(12, 16.2, 1.1, 'f'))]),
  I('pin-code', 'password passcode security keypad', [R(3, 6, 18, 12, 2.5), C(7, 12, 1.3, 'a', 'blink'), C(10.3, 12, 1.3, 'a', 'blink:.2'), C(13.7, 12, 1.3, 'a', 'blink:.4'), C(17, 12, 1.3, 'a', 'blink:.6')]),
  I('cashback', 'reward refund return money back', [C(12, 12, 5, 'a', 'pulse'), P('M12 10v4'), G('spin', X(12, 12, 9.4), P(arc(12, 12, 9, 40, 330)), P('M6.4 6.7 7.5 4.2 4.8 3.9'))]),
  I('deposit', 'pay in save add funds', [G('drop', C(12, 7, 3.5, 'a'), P('M12 5.5v3')), R(3, 13, 18, 8, 2.5), P('M8 13h8')]),
  I('withdraw', 'take out cash funds', [G('rise', C(12, 7, 3.5, 'a'), P('M10.5 7h3')), R(3, 13, 18, 8, 2.5), P('M8 13h8')]),
  I('wire', 'international swift global transfer', [C(10, 12, 7.5), P('M2.5 12h15M10 4.5c2 2 2.5 4.8 2.5 7.5s-.5 5.5-2.5 7.5M10 4.5C8 6.5 7.5 9.2 7.5 12s.5 5.5 2.5 7.5'), G('slide-r', P('M15 17h6.5M19 14.5l2.5 2.5-2.5 2.5', 'a'))]),
  I('account', 'profile bank account holder customer', [R(3, 5, 18, 14, 2.5), C(8.5, 11, 2.2, 'a'), P('M5.5 16.5a3 3 0 0 1 6 0M14 10h4M14 13.5h3', 'd', 'draw')]),
];
