import { R, C, P, G, I, X, arc, spark, card } from '../dsl.mjs';

// a card on the upper-left, leaving room for a status badge bottom-right
const small = () => [card(2.5, 4, 17, 12), P('M2.5 8h17'), P('M5.5 12.5h4')];
const badge = (...els) => G('pulse', C(18, 17, 4.2, 'a'), ...els);

export default [
  I('credit-card', 'payment card visa mastercard debit plastic', [G('float', card(2.5, 5, 19, 14), R(2.5, 8.2, 19, 2.6, 0, 'f'), P('M6 14.5h5'), P('M15 14.5h3', 'a'))]),
  I('debit-card', 'chip card bank card contactless', [card(2.5, 5, 19, 14), R(5.5, 9, 4.5, 3.5, 1, 'a'), P('M15 9.5a3 3 0 0 1 0 4', 'd', 'blink'), P('M17 8.5a5 5 0 0 1 0 6', 'd', 'blink:.3'), P('M5.5 15.5h3M10 15.5h3')]),
  I('contactless', 'tap wave nfc card pay', [card(2, 7, 13, 10), R(4.5, 10, 3.5, 2.8, 0.8, 'a'), P('M17.5 9a4 4 0 0 1 0 6', 'd', 'blink'), P('M20.3 6.8a7.5 7.5 0 0 1 0 10.4', 'd', 'blink:.3')]),
  I('card-add', 'new card add payment method', [...small(), badge(P('M18 15.2v3.6M16.2 17h3.6'))]),
  I('card-lock', 'secure card locked blocked', [...small(), G('pulse', P('M16 14v-1.5a2 2 0 0 1 4 0V14'), R(14, 14, 8, 7, 1.8, 'a'))]),
  I('card-freeze', 'freeze snowflake pause card ice', [...small(), C(18, 17, 4.4, 'a'), G('spin', P('M18 14.2v5.6M15.6 15.6l4.8 2.8M15.6 18.4l4.8-2.8'))]),
  I('card-check', 'verified approved card success', [...small(), C(18, 17, 4.2, 'a'), P('M16.2 17l1.2 1.2 2.4-2.6', 'd', 'draw')]),
  I('card-declined', 'failed rejected card error', [...small(), G('shake', C(18, 17, 4.2, 'a'), P('M16.5 15.5l3 3M19.5 15.5l-3 3'))]),
  I('cards', 'wallet multiple cards stack collection', [card(6, 3, 15, 10, 'a'), G('float', card(3, 9, 15, 11), P('M3 12.5h15M6 16.5h4'))]),
  I('virtual-card', 'digital card online disposable', [R(2.5, 5, 19, 14, 2.4, 'd', 'dash'), R(5.5, 9, 4.5, 3.5, 1, 'b'), P('M5.5 15.5h6'), P(spark(17, 12, 3), 'a', 'pulse')]),
  I('card-swipe', 'swipe reader magstripe pay', [P('M2 9.5h2.5M2 12.5h2.5M3 15.5h1.5', 'd', 'blink'), G('slide-r', card(6, 5, 15, 11), R(6, 8, 15, 2.4, 0, 'f'), P('M9 13h4', 'a'))]),
  I('card-insert', 'chip insert terminal reader', [G('slide-d', R(7, 3, 10, 13, 1.5, 'a'), R(9.3, 5.5, 3.5, 2.8, 0.6)), R(3, 13, 18, 8, 2), P('M6 13h12M8 17h3')]),
  I('recurring-payment', 'subscription renew autopay billing', [...small(), C(18, 17, 4.2, 'a'), G('spin', X(18, 17, 2.4), P(arc(18, 17, 2.3, 40, 320)), P('M16.2 15.3l.3-1.1 1.1.3'))]),
  I('card-cvv', 'security code back of card', [card(2.5, 5, 19, 14), R(2.5, 8.2, 19, 2.6, 0, 'f'), R(13, 12.5, 6, 3, 0.8, 'a', 'blink'), P('M5.5 14h5')]),
  I('refund', 'return money back chargeback', [...small(), C(18, 17, 4.2, 'a'), G('slide-l', P('M16.6 15.3l-1.4 1.4 1.4 1.4M15.2 16.7h3a1.5 1.5 0 0 1 0 3h-1'))]),
  I('checkout', 'pay now purchase basket order', [R(3, 7, 18, 13, 2.5), P('M8 7V5.5a4 4 0 0 1 8 0V7'), C(12, 13.5, 3.2, 'a', 'pop'), P('M10.6 13.5l1 1 1.9-2', 'd', 'draw')]),
];
