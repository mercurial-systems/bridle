import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

// arrowhead at angle a (deg, 0 = up, clockwise) on a clockwise arc of radius r around (cx, cy)
const head = (cx, cy, r, a, L = 2.8) => {
  const t = (a * Math.PI) / 180, s = Math.sin(t), c = Math.cos(t), f = (v) => +v.toFixed(2);
  const px = cx + r * s, py = cy - r * c;
  return `M${f(px - L * c + L * s)} ${f(py - L * s - L * c)}L${f(px)} ${f(py)}L${f(px - L * c - L * s)} ${f(py - L * s + L * c)}`;
};

export default [
  // ---- arrows ----
  I('arrow-up', 'up north increase direction navigate', [G('slide-u', P('M12 20V5'), P('M6 11l6-6 6 6', 'a'))]),
  I('arrow-down', 'down south decrease direction navigate', [G('slide-d', P('M12 4v15'), P('M6 13l6 6 6-6', 'a'))]),
  I('arrow-left', 'left west back previous direction', [G('slide-l', P('M20 12H5'), P('M11 6l-6 6 6 6', 'a'))]),
  I('arrow-right', 'right east next forward direction', [G('slide-r', P('M4 12h15'), P('M13 6l6 6-6 6', 'a'))]),
  I('arrow-up-right', 'diagonal northeast outbound trend arrow', [G('diag', P('M6 18 17.5 6.5'), P('M9 6h9v9', 'a'))]),
  I('arrow-down-right', 'diagonal southeast inbound arrow', [G('diag-in', P('M6 6l11.5 11.5'), P('M18 9v9H9', 'a'))]),
  I('arrow-turn', 'curved turn route corner redirect arrow', [P('M5 20v-6a5 5 0 0 1 5-5h9'), G('slide-r', P('M15 5l4 4-4 4', 'a'))]),
  I('undo', 'back revert history step arrow', [P('M4 9h10.5a5.5 5.5 0 0 1 0 11H11'), G('slide-l', P('M9 4 4 9l5 5', 'a'))]),
  I('redo', 'forward repeat history step arrow', [P('M20 9H9.5a5.5 5.5 0 0 0 0 11H13'), G('slide-r', P('M15 4l5 5-5 5', 'a'))]),
  I('expand', 'enlarge maximize grow arrows outward', [G('pulse', P('M20 4l-6 6M4 20l6-6'), P('M14 4h6v6M10 20H4v-6', 'a'))]),
  I('collapse', 'shrink minimize reduce arrows inward', [G('pop', P('M20 4l-6 6M4 20l6-6'), P('M14 5v5h5M5 14h5v5', 'a'))]),
  I('move', 'drag reposition pan four way arrows', [P('M12 4v16M4 12h16'), P('M9 6l3-3 3 3M9 18l3 3 3-3M6 9l-3 3 3 3M18 9l3 3-3 3', 'a', 'pulse'), C(12, 12, 2.2)]),
  I('swap-vertical', 'reorder exchange up down arrows', [G('slide-u', P('M8 19.5V5'), P('M4 9l4-4 4 4', 'a')), G('slide-d', P('M16 4.5V19'), P('M12 15l4 4 4-4'))]),
  I('swap-horizontal', 'switch exchange left right arrows', [G('slide-r', P('M4.5 8H19'), P('M15 4l4 4-4 4', 'a')), G('slide-l', P('M19.5 16H5'), P('M9 12l-4 4 4 4'))]),
  // ---- chevrons ----
  I('chevron-up', 'caret up collapse open menu', [C(12, 12, 9), P('M8 13.5l4-4 4 4', 'a', 'slide-u')]),
  I('chevron-down', 'caret down expand dropdown menu', [C(12, 12, 9), P('M8 10.5l4 4 4-4', 'a', 'slide-d')]),
  I('chevron-left', 'caret back previous page', [C(12, 12, 9), P('M13.5 8l-4 4 4 4', 'a', 'slide-l')]),
  I('chevron-right', 'caret next forward page', [C(12, 12, 9), P('M10.5 8l4 4-4 4', 'a', 'slide-r')]),
  I('chevrons-right', 'fast forward skip double caret next', [G('slide-r', P('M5 6l6 6-6 6'), P('M12 6l6 6-6 6', 'a'))]),
  // ---- menus & actions ----
  I('menu', 'hamburger navigation drawer lines', [P('M4 6h16M4 12h16'), P('M4 18h10', 'a', 'grow-x')]),
  I('more-horizontal', 'ellipsis options overflow dots', [C(5, 12, 1.9, 'b', 'pop'), C(12, 12, 1.9, 'a', 'pop:.2'), C(19, 12, 1.9, 'b', 'pop:.4')]),
  I('more-vertical', 'kebab options overflow dots', [C(12, 5, 1.9, 'b', 'pop'), C(12, 12, 1.9, 'a', 'pop:.2'), C(12, 19, 1.9, 'b', 'pop:.4')]),
  I('close', 'x dismiss exit cancel', [C(12, 12, 9), G('pop', P('M8.5 8.5l7 7'), P('M15.5 8.5l-7 7', 'a'))]),
  I('plus', 'add new create more', [R(3.5, 3.5, 17, 17, 4), G('pulse', P('M12 8v8', 'a'), P('M8 12h8', 'a'))]),
  I('minus', 'subtract less remove reduce', [R(3.5, 3.5, 17, 17, 4), P('M8 12h8', 'a', 'squash')]),
  I('trash', 'delete bin discard remove', [G('tilt', P('M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6M3.5 6h17', 'a')), P('M5.5 8.5h13l-1 11a2 2 0 0 1-2 1.8h-7a2 2 0 0 1-2-1.8Z'), P('M10 12v5.5M14 12v5.5')]),
  // ---- layout ----
  I('grid-view', 'tiles gallery layout cards', [R(3, 3, 8, 8, 2), R(13, 3, 8, 8, 2, 'a', 'pop'), R(3, 13, 8, 8, 2), R(13, 13, 8, 8, 2)]),
  I('list-view', 'rows list layout items', [R(3, 4, 4, 4, 1.2, 'a', 'pop'), R(3, 10, 4, 4, 1.2), R(3, 16, 4, 4, 1.2), P('M10 6h11M10 12h11M10 18h11')]),
  I('sidebar', 'panel drawer navigation layout left', [R(3, 4, 18, 16, 2.5), R(5.5, 6.5, 4, 11, 1, 'a', 'grow-x'), P('M13 9h5M13 12h3')]),
  I('layout-columns', 'columns board three pane layout', [R(2.5, 4, 5, 16, 1.8), R(9.5, 4, 5, 16, 1.8, 'a', 'grow'), R(16.5, 4, 5, 16, 1.8)]),
  I('layout-split', 'header split panes layout blocks', [R(3, 3, 18, 7, 2, 'a', 'pop'), R(3, 12, 8, 9, 2), R(13, 12, 8, 9, 2)]),
  I('tabs', 'tabbed browser pages switch', [P('M3 19V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z'), R(12.5, 3.5, 7, 3, 1.2, 'a', 'pop')]),
  I('modal', 'dialog popup window overlay', [R(2.5, 4, 19, 16, 2.5), G('float', R(6.5, 8, 11, 8, 2, 'a'), P('M9 12h6'))]),
  I('panel-bottom', 'drawer sheet footer layout', [R(3, 4, 18, 16, 2.5), R(5.5, 13, 13, 4.5, 1, 'a', 'grow')]),
  I('picture-in-picture', 'pip floating video window overlay', [R(2.5, 4, 19, 16, 2.5), R(12, 12, 7, 5.5, 1.2, 'a', 'pop')]),
  I('fullscreen', 'maximize full view corners enlarge', [P('M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4'), R(8, 8, 8, 8, 1.8, 'a', 'pulse')]),
  I('exit-fullscreen', 'minimize restore shrink corners', [P('M9 4v4a1 1 0 0 1-1 1H4M15 4v4a1 1 0 0 0 1 1h4M20 15h-4a1 1 0 0 0-1 1v4M4 15h4a1 1 0 0 1 1 1v4'), R(10, 10, 4, 4, 1, 'a', 'pop')]),
  I('zoom-in', 'magnify enlarge plus scale', [C(10.5, 10.5, 6.8), P('M15.5 15.5 20.5 20.5'), G('pulse', P('M10.5 8v5M8 10.5h5', 'a'))]),
  I('zoom-out', 'shrink reduce minus scale', [C(10.5, 10.5, 6.8), P('M15.5 15.5 20.5 20.5'), P('M8 10.5h5', 'a', 'squash')]),
  // ---- sort, filter, controls ----
  I('sort-ascending', 'order a to z low high increasing', [G('slide-u', P('M7 20V4.5'), P('M3.5 8 7 4.5 10.5 8', 'a')), P('M13 8h4M13 13h6M13 18h8')]),
  I('sort-descending', 'order z to a high low decreasing', [G('slide-d', P('M7 4v15.5'), P('M3.5 16 7 19.5l3.5-3.5', 'a')), P('M13 6h8M13 11h6M13 16h4')]),
  I('filter-lines', 'refine narrow results funnel lines', [P('M4 6.5h16M7 12h10'), P('M10 17.5h4', 'a', 'squash')]),
  I('range-slider', 'range min max slider control', [P('M3 10h18'), P('M8 10h8', 'a'), C(8, 10, 2.5, 'b', 'slide-l'), C(16, 10, 2.5, 'b', 'slide-r'), P('M4 16v2M8 16v2M12 16v2M16 16v2M20 16v2')]),
  I('toggle-off', 'switch off disabled setting flag', [R(2.5, 7, 19, 10, 5), C(7.5, 12, 3.2, 'a', 'slide-r')]),
  I('checkbox', 'tick select agree option', [R(3.5, 3.5, 17, 17, 4, 'a'), P('M8 12.3l2.8 2.8L16 9.5', 'd', 'draw')]),
  I('radio', 'option choice select single', [C(12, 12, 9), C(12, 12, 4, 'a', 'pop')]),
  I('drag-handle', 'grip reorder grab dots', [G('float', C(9, 6, 1.6), C(15, 6, 1.6), C(9, 12, 1.6, 'a'), C(15, 12, 1.6, 'a'), C(9, 18, 1.6), C(15, 18, 1.6))]),
  I('pagination', 'carousel dots pages slides', [C(5, 12, 1.8), R(9, 10.2, 6, 3.6, 1.8, 'a', 'grow-x'), C(19, 12, 1.8)]),
  I('mouse-scroll', 'scroll wheel mouse down page', [R(6.5, 3, 11, 18, 5.5), P('M12 7v3', 'a', 'slide-d')]),
  // ---- saving & reactions ----
  I('pin', 'pushpin stick fix attach', [G('sink', R(7.5, 2.8, 9, 2.8, 1.4, 'a'), P('M9.8 5.6h4.4l.9 4.8 3.4 3.4v1.7H5.5v-1.7l3.4-3.4Z'), P('M12 15.5v6'))]),
  I('bookmark', 'save favourite read later mark', [P('M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4.5L6 21Z'), P(spark(12, 9.8, 3.2), 'a', 'pulse')]),
  I('like', 'heart love favourite react', [P('M12 20.5S3.5 15.5 3.5 9.3A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 8.5 2c0 6.2-8.5 11.2-8.5 11.2Z', 'a', 'beat'), P('M6.5 9a2 2 0 0 1 1.6-1.6', 'h')]),
  I('thumbs-up', 'approve upvote good agree', [G('tilt', R(3, 10, 4, 10, 1.5, 'a'), P('M9 10l3.5-6.5a2 2 0 0 1 2.8 1.3L14.5 9H19a2 2 0 0 1 2 2.3l-1.2 7A2 2 0 0 1 17.8 20H9Z'))]),
  I('thumbs-down', 'disapprove downvote bad dislike', [G('sink', R(3, 4, 4, 10, 1.5, 'a'), P('M9 14l3.5 6.5a2 2 0 0 0 2.8-1.3L14.5 15H19a2 2 0 0 0 2-2.3l-1.2-7A2 2 0 0 0 17.8 4H9Z'))]),
  I('report', 'flag abuse moderation complaint', [P('M5 21V3.5'), G('wave', P('M5 4h13.5l-3 4.5 3 4.5H5Z', 'a'), P('M10.5 6v2.6'), C(10.5, 11, 0.9, 'f'))]),
  // ---- status ----
  I('help', 'question support faq unknown', [C(12, 12, 9), P('M9.3 9.6a2.8 2.8 0 1 1 3.9 2.6c-.8.4-1.2 1-1.2 1.8v.4'), C(12, 17, 1.2, 'a', 'pulse')]),
  I('info', 'information details about notice', [C(12, 12, 9), P('M12 11v6'), C(12, 7.8, 1.3, 'a', 'blink')]),
  I('warning', 'caution triangle attention risk', [P('M10.3 4a2 2 0 0 1 3.4 0l7.6 13A2 2 0 0 1 19.6 20H4.4a2 2 0 0 1-1.7-3Z'), P('M12 9v4.5'), C(12, 16.6, 1.2, 'a', 'blink')]),
  I('error', 'stop octagon failure problem', [P(poly(12, 12, 9.6, 8, -Math.PI / 2 + Math.PI / 8)), G('shake', P('M9 9l6 6'), P('M15 9l-6 6', 'a'))]),
  I('success', 'done complete approved tick ok', [C(12, 12, 9), P('M8 12.3l2.8 2.8L16 9.5', 'a', 'draw')]),
  I('loading', 'spinner progress busy wait', [G('spin-fast', X(12, 12, 9.5), C(12.00, 4.50, 2.2, 'a'), C(17.30, 6.70, 2.03), C(19.50, 12.00, 1.86), C(17.30, 17.30, 1.69), C(12.00, 19.50, 1.52), C(6.70, 17.30, 1.35), C(4.50, 12.00, 1.18), C(6.70, 6.70, 1.01))]),
  I('refresh', 'reload update sync repeat circle', [G('spin', X(12, 12, 9), P(arc(12, 12, 8, 30, 160)), P(head(12, 12, 8, 160)), P(arc(12, 12, 8, 210, 340), 'a'), P(head(12, 12, 8, 340), 'a'))]),
  // ---- pointers & input ----
  I('cursor', 'pointer arrow mouse select', [G('diag-in', P('M6 3.5v15l4-3.8 2.8 6 2.6-1.2-2.8-5.9H18Z', 'a'))]),
  I('hand-pointer', 'tap click touch finger press', [C(10.5, 4.8, 2.2, 'a', 'ping'), P('M9 12V5.5a1.5 1.5 0 0 1 3 0V11l5.2.9a2.5 2.5 0 0 1 2 2.8L18.5 19a2.5 2.5 0 0 1-2.5 2H11a2.5 2.5 0 0 1-2-1l-3.6-4.5a1.4 1.4 0 0 1 2-2Z')]),
  I('keyboard', 'type input keys shortcut', [R(2.5, 6, 19, 12, 2.5), C(6, 9.4, 0.9, 'f'), C(9, 9.4, 0.9, 'f'), C(12, 9.4, 0.9, 'f'), C(15, 9.4, 0.9, 'f'), C(18, 9.4, 0.9, 'f'), C(7.5, 12.2, 0.9, 'f'), C(10.5, 12.2, 0.9, 'f'), C(13.5, 12.2, 0.9, 'f'), C(16.5, 12.2, 0.9, 'f'), P('M8.5 15h7', 'a', 'blink')]),
  I('command-key', 'shortcut hotkey modifier keycap', [R(3, 3, 18, 18, 4.5), P('M10.5 10.5H8.5A2 2 0 1 1 10.5 8.5V15.5A2 2 0 1 1 8.5 13.5H15.5A2 2 0 1 1 13.5 15.5V8.5A2 2 0 1 1 15.5 10.5Z', 'a', 'pulse')]),
  I('external-open', 'new tab open outside launch', [P('M10.5 4.5h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-4'), G('diag', P('M11.5 12.5 19.5 4.5'), P('M14 4h6v6', 'a'))]),
  I('log-in', 'sign in enter access door', [P('M14 3.5h4a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-4'), G('slide-r', P('M3.5 12H14'), P('M10 8l4 4-4 4', 'a'))]),
  I('log-out', 'sign out exit leave door', [P('M10 3.5H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h4'), G('slide-r', P('M9 12h11'), P('M16.5 8l4 4-4 4', 'a'))]),
  I('power', 'on off shutdown standby', [P(arc(12, 13, 8, 35, 325)), P('M12 3v8', 'a', 'pulse')]),
  // ---- tools & appearance ----
  I('compass', 'explore discover navigate direction', [C(12, 12, 9), G('seesaw', X(12, 12, 6), P('M16 8l-2.6 5.4L8 16l2.6-5.4Z', 'a')), C(12, 12, 1, 'f')]),
  I('magic-wand', 'auto enhance magic generate ai', [P('M3.5 18.5 13 9l2 2-9.5 9.5Z'), P('M13 9l1.5-1.5 2 2L15 11Z', 'a'), P(spark(18, 5.5, 2.8), 'a', 'pulse'), P(spark(9, 5, 1.6), 'b', 'blink'), P(spark(19.5, 13.5, 1.6), 'b', 'blink:.5')]),
  I('palette', 'colors theme design paint', [P('M12 3a9 9 0 0 0 0 18c1.4 0 2-1 2-2 0-1.5-1.5-2-1.5-3.3 0-1 .8-1.7 1.8-1.7H17a4 4 0 0 0 4-4C21 6.3 17 3 12 3Z'), C(7.5, 11.5, 1.4, 'a', 'pop'), C(9, 7.3, 1.1, 'f'), C(13.8, 6.6, 1.1, 'f'), C(17.3, 9.6, 1.1, 'f')]),
  I('brush', 'paint draw art stroke design', [G('wiggle', P('M19.3 3.4a1.2 1.2 0 0 1 1.3 1.3L13.4 13 11 10.6Z'), P('M10 11.5l2.5 2.5c0 3-2.5 5.5-6.5 5.5H3.5c1.5-1 1.5-2.5 1.5-3.5 0-2.5 2.5-4.5 5-4.5Z', 'a'))]),
  I('crop', 'trim cut resize image frame', [P('M7 3v12a2 2 0 0 0 2 2h12'), P('M3 7h12a2 2 0 0 1 2 2v12', 'a', 'pop')]),
  I('color-picker', 'eyedropper sample color pick', [P('M13 8.5l2.5 2.5-7.8 7.8-3 .7-.5.5-1-1 .5-.5.7-3Z'), P('M14.6 4.6a2.6 2.6 0 0 1 3.7 3.7L16.9 9.7l1 1-1.6 1.6-5.6-5.6 1.6-1.6 1 1Z', 'a', 'tilt')]),
  I('eye-off', 'hide hidden invisible private', [P('M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z'), C(12, 12, 3.5, 'a'), P('M4 4l16 16', 'd', 'draw')]),
  I('theme-light', 'sun light mode day bright', [C(12, 12, 4.2, 'a', 'pulse'), G('spin-slow', X(12, 12, 9.5), P('M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4'))]),
  I('theme-dark', 'moon dark mode night', [P('M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z', 'a', 'swing'), P(spark(17, 6, 2.2), 'b', 'blink')]),
  I('notification-off', 'mute bell silent do not disturb', [P('M12 3a6 6 0 0 0-6 6v4l-1.8 3.2a.6.6 0 0 0 .5.9h14.6a.6.6 0 0 0 .5-.9L18 13V9a6 6 0 0 0-6-6Z'), P('M9.8 20.2a2.3 2.3 0 0 0 4.4 0'), P('M3.5 3.5l17 17', 'a', 'draw')]),
];
