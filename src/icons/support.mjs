import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

const n = (v) => +v.toFixed(2);
// ticket with semicircle notches at mid height
const tk = (x, y, w, h, r = 'b', an) => {
  const v = n(h / 2 - 3.8);
  return P(`M${x + 2} ${y}h${w - 4}a2 2 0 0 1 2 2v${v}a1.8 1.8 0 0 0 0 3.6v${v}a2 2 0 0 1-2 2h-${w - 4}a2 2 0 0 1-2-2v-${v}a1.8 1.8 0 0 0 0-3.6v-${v}a2 2 0 0 1 2-2Z`, r, an);
};
// small ticket top-left, leaving room for a status badge bottom-right
const smallTk = () => [tk(2.5, 4, 15, 11), P('M6 8h5M6 11h3')];
const badge = (an, ...els) => G(an, C(18, 17, 4.2, 'a'), ...els);
// chat bubble, tail bottom-right
const bubbleR = 'M5 3.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-1.5V20l-4-3.5H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z';
// left half of a 5-point star
const halfStar = (cx, cy, ro, ri) => {
  let d = '';
  for (let i = 5; i <= 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? ri : ro;
    d += (i === 5 ? 'M' : 'L') + n(cx + r * Math.cos(a)) + ' ' + n(cy + r * Math.sin(a));
  }
  return d + 'Z';
};
// annular band of a ring (angles in degrees, 0 = up)
const band = (cx, cy, ro, ri, a0, a1) => {
  const p = (a, r) => { const t = ((a - 90) * Math.PI) / 180; return `${n(cx + r * Math.cos(t))} ${n(cy + r * Math.sin(t))}`; };
  return `M${p(a0, ro)}A${ro} ${ro} 0 0 1 ${p(a1, ro)}L${p(a1, ri)}A${ri} ${ri} 0 0 0 ${p(a0, ri)}Z`;
};
// two circular arrows chasing each other
const cycle = () => G('spin', X(12, 12, 8.5), P(arc(12, 12, 7.5, 20, 160)), P('M16.55 19.98 14.57 19.05 15.5 17.07'), P(arc(12, 12, 7.5, 200, 340)), P('M7.45 4.02 9.43 4.95 8.5 6.93'));

export default [
  I('support-ticket', 'ticket case request helpdesk issue', [tk(3, 5.5, 18, 13), P('M15 8v8', 'a', 'dash'), P('M7 10h4.5M7 14h3')]),
  I('ticket-queue', 'backlog tickets stack waiting cases', [P('M7 3.5h10', 'd', 'blink:.6'), P('M5 6.5h14', 'd', 'blink:.3'), G('slide-d', tk(3, 9.5, 18, 11), P('M15 12v6', 'a'))]),
  I('ticket-priority', 'urgent high priority ticket triage', [tk(3, 5, 18, 14), G('slide-u', P('M8.5 12l3.5-3.5 3.5 3.5', 'a'), P('M8.5 16l3.5-3.5 3.5 3.5'))]),
  I('ticket-assign', 'assign agent owner ticket route', [...smallTk(), badge('pulse', C(18, 15.6, 1.3, 'd'), P('M15.8 19.6a2.2 2.2 0 0 1 4.4 0'))]),
  I('ticket-escalation', 'escalate tier level up stairs', [P('M3 20.5v-5h4.5v-5H12v-5h9v15Z'), G('diag', P('M3 10 8 5', 'a'), P('M4.5 5H8v3.5', 'a'))]),
  I('sla-timer', 'sla deadline stopwatch response target', [C(12, 13.5, 7.8), P('M10 2.5h4M12 2.5v3.2M18.2 6.6l1.3-1.3'), P(wedge(12, 13.5, 5.2, 0, 110), 'a', 'breathe'), G('spin', X(12, 13.5, 5), P('M12 13.5V9.2')), C(12, 13.5, 1.1, 'f')]),
  I('first-response', 'reply fast response time chat speed', [G('slide-r', P('M9 4h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-5l-4 3.5V15H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z'), P('M12.5 8 14 6.8v5.7')), P('M2.5 7.5H5M3.5 11H5', 'a', 'slide-l')]),
  I('ticket-resolved', 'solved done closed ticket success', [...smallTk(), badge('pop', P('M16.2 17l1.3 1.3 2.4-2.6', 'd', 'draw'))]),
  I('ticket-reopened', 'reopen ticket again regression', [...smallTk(), badge(undefined, G('spin', X(18, 17, 2.4), P(arc(18, 17, 2.3, 40, 320)), P('M16.41 16.54 16.52 15.24 15.22 15.13')))]),
  I('merge-tickets', 'merge combine duplicate tickets join', [R(3, 3, 7, 5, 1.5), R(14, 3, 7, 5, 1.5), P('M6.5 8v1.5a4 4 0 0 0 4 4H12M17.5 8v1.5a4 4 0 0 1-4 4H12M12 13.5V16', 'd', 'draw'), R(7, 16, 10, 5, 1.5, 'a', 'pop')]),
  I('help-desk', 'service bell reception helpdesk front desk', [P('M4.5 17a7.5 7.5 0 0 1 15 0Z'), P('M8 14a4 4 0 0 1 2.5-3.2', 'h'), G('slide-d', P('M12 9.5V8'), C(12, 6.5, 1.6, 'a')), R(2.5, 17, 19, 3.5, 1.75)]),
  I('live-chat-widget', 'chat launcher widget website messenger', [R(2.5, 3, 17, 13.5, 2.5), P('M2.5 7h17'), P('M6 10.5h7.5M6 13h4.5'), G('pop', C(18, 17.5, 4, 'a'), P('M16.3 17.5h.01M18 17.5h.01M19.7 17.5h.01'))]),
  I('support-bot', 'chatbot bot assistant automation virtual agent', [P('M12 6.5V4.8'), C(12, 3.6, 1.2, 'a', 'blink'), R(4.5, 6.5, 15, 12, 3.5), P('M2.8 11v3.5M21.2 11v3.5'), C(9.3, 11.5, 1.3, 'f'), C(14.7, 11.5, 1.3, 'f', 'blink:.4'), P('M9.5 15h5', 'a')]),
  I('canned-reply', 'saved reply template response snippet', [P(bubbleR), G('slide-l', P('M10 7 7.5 9.5 10 12', 'a'), P('M7.5 9.5h5.5a3 3 0 0 1 3 3v.5', 'a'))]),
  I('reply-macro', 'macro automation quick action shortcut reply', [P(bubbleR), P('M13.2 6 9 11.3h3.3l-1.3 4.2 4.5-5.6h-3.3Z', 'a', 'pulse')]),
  I('knowledge-base', 'docs book kb self service library', [P('M12 6.5C9.5 5 6.5 4.5 3 5v13.5c3.5-.5 6.5 0 9 1.5Z'), P('M12 6.5c2.5-1.5 5.5-2 9-1.5v13.5c-3.5-.5-6.5 0-9 1.5Z'), P('M6 9.5c1.5 0 2.5.3 3.5.8M6 12.5c1.5 0 2.5.3 3.5.8'), P(spark(16.5, 11.5, 2.6), 'a', 'pulse')]),
  I('help-article', 'article doc question how to guide', [P('M7 2.5h7.5L19 7v12.5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2Z'), P('M14.5 2.5V7H19'), P('M10 11.2a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.3v.4', 'a', 'draw'), C(12, 17.6, 1, 'f', 'blink')]),
  I('faq-bubbles', 'faq questions answers help common', [P('M5 2.5h9a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-3.5 3v-3H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z'), P('M8 5.7a1.5 1.5 0 1 1 2.1 1.4c-.4.2-.6.5-.6.9M9.5 9.7h.01'), G('float', P('M12 13.5h7a2 2 0 0 1 2 2v2.5a2 2 0 0 1-2 2h-1v1.8l-2.5-1.8H12a2 2 0 0 1-2-2v-2.5a2 2 0 0 1 2-2Z', 'a'), P('M13 16.8h5'))]),
  I('tutorial-video', 'video tutorial walkthrough lesson play', [R(2.5, 3.5, 19, 13.5, 2.5), P('M10.3 7v6.5l5-3.25Z', 'a', 'pulse'), P('M3 20.5h18'), P('M3 20.5h6.5', 'a', 'grow-x'), C(9.5, 20.5, 1.4, 'f')]),
  I('onboarding-checklist', 'onboarding setup steps checklist getting started', [R(4.5, 4, 15, 17.5, 2.5), R(9, 2.5, 6, 3.5, 1.2, 'a'), P('M7.8 10.5l1.2 1.2 2.2-2.4', 'd', 'draw'), P('M13.5 10.7h3'), P('M7.8 16l1.2 1.2 2.2-2.4', 'd', 'draw:.5'), P('M13.5 16.2h3')]),
  I('product-tour', 'tour walkthrough spotlight guide feature', [R(2.5, 3, 19, 15, 2.5), P('M2.5 7h19'), C(9, 12.2, 2.4, 'a'), C(9, 12.2, 3.8, 'd', 'ping'), P('M14.5 10.5h4M14.5 13.5h2.5'), P('M9 21h.01M12 21h.01M15 21h.01')]),
  I('tooltip-hint', 'tooltip hint popover tip cursor', [G('float', P('M5 3h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5l-2 2.5L10 12H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z'), P('M7 7.5h10')), P('M10.5 15.8 16.5 18l-2.8 1.1-1.1 2.6Z', 'a', 'diag-in')]),
  I('status-page', 'status page systems operational health services', [R(3, 3.5, 18, 17, 2.5), C(7.2, 8.5, 1.3, 'a', 'blink'), P('M10.5 8.5h6.5'), C(7.2, 12, 1.3, 'f'), P('M10.5 12h6.5'), C(7.2, 15.5, 1.3, 'f'), P('M10.5 15.5h4.5')]),
  I('incident-siren', 'incident alarm emergency siren major issue', [P('M12 2.5v2M4 6l1.5 1.5M20 6l-1.5 1.5', 'a', 'blink'), P('M6.5 17.5V13a5.5 5.5 0 0 1 11 0v4.5Z'), P('M9.5 13a2.5 2.5 0 0 1 2.5-2.5'), R(4, 17.5, 16, 3.5, 1.5)]),
  I('service-outage', 'outage downtime cloud failure offline', [P('M7.5 16.5a4.5 4.5 0 0 1-.6-8.96A5.5 5.5 0 0 1 17.4 8a4.25 4.25 0 0 1-.4 8.5Z'), P('M12.5 13.5 10.5 17h3l-2 4.5', 'a', 'blink')]),
  I('maintenance-window', 'maintenance scheduled window upkeep service', [R(2.5, 4, 19, 16, 2.5), P('M2.5 8h19'), G('spin', P(gear(12, 14, 4.3, 3.2, 6), 'a')), C(12, 14, 1.4, 'd')]),
  I('service-uptime', 'uptime availability monitoring history reliability', [R(2.5, 5, 19, 14, 2.5), P('M6.5 9v6M9.25 9v6M12 9v6M17.5 9v6'), P('M14.75 9v6', 'a', 'blink')]),
  I('csat-scale', 'csat satisfaction faces scale rating', [C(5.5, 7.5, 3.3), P('M4 8.8a1.6 1.6 0 0 1 3 0'), C(18.5, 7.5, 3.3), P('M17 8.3h3'), G('pop', C(12, 16, 4.5, 'a'), P('M10.2 16.2a1.9 1.9 0 0 0 3.6 0'))]),
  I('csat-smile', 'happy smiley satisfaction customer delight', [C(12, 12, 9), C(8.8, 9.8, 1.2, 'f'), C(15.2, 9.8, 1.2, 'f', 'blink'), P('M7.8 13.8a4.6 4.6 0 0 0 8.4 0', 'a', 'draw')]),
  I('nps-gauge', 'nps net promoter score gauge meter', [P('M3 17a9 9 0 0 1 18 0Z'), P(arc(12, 17, 6.3, 30, 90), 'a'), G('seesaw', X(12, 17, 5), P('M12 17 9.5 12')), C(12, 17, 1.6, 'f'), P('M8 20.5h8')]),
  I('rating-stars', 'stars rating review score quality', [P(star(12, 9, 5.8, 2.6), 'a', 'pop'), P(star(5.5, 16.5, 3.4, 1.5)), P(star(18.5, 16.5, 3.4, 1.5))]),
  I('rating-half', 'half star rating partial score review', [P(star(12, 12.5, 9.5, 4.2)), P(halfStar(12, 12.5, 9.5, 4.2), 'a', 'breathe')]),
  I('helpful-rating', 'thumbs up helpful like approve feedback', [G('slide-u', R(3, 10.5, 3.5, 10, 1.2, 'a'), P('M8 10.5l3.6-6.6a1.8 1.8 0 0 1 2.9 1.8L13.6 9h5.2a2 2 0 0 1 2 2.4l-1.3 7a2 2 0 0 1-2 1.6H8Z'))]),
  I('feedback-form', 'feedback form submit survey input', [R(4, 2.5, 16, 19, 2.5), P('M7.5 7h9M7.5 10.5h9M7.5 14h5'), R(7.5, 16.5, 6, 2.5, 1.25, 'a', 'pop')]),
  I('feature-request', 'feature request idea suggestion wish', [P('M12 2.8a6.2 6.2 0 0 0-3.6 11.2c.5.4.8 1 .8 1.6v.9h5.6v-.9c0-.6.3-1.2.8-1.6A6.2 6.2 0 0 0 12 2.8Z'), P('M9.5 19h5M10.5 21.5h3'), G('pulse', P('M12 6.5v5M9.5 9h5', 'a'))]),
  I('bug-report', 'bug defect issue report qa', [G('shake', P('M7 11.5H3.5M7 15.5H3M7.5 19 5 21M17 11.5h3.5M17 15.5h4M16.5 19l2.5 2')), E(12, 15, 5, 6), P('M12 10.5v10'), C(12, 7.2, 2.6, 'a'), P('M10 4.8 8.5 3M14 4.8 15.5 3')]),
  I('roadmap-vote', 'roadmap vote feature upvote prioritise', [R(5, 3, 14, 18, 3), G('slide-u', P('M8.5 10 12 6.5l3.5 3.5M12 6.5v6', 'a')), P('M8.5 16h7M8.5 18.5h4')]),
  I('upvote', 'upvote arrow up vote community like', [G('slide-u', P('M11.2 3.9a1.1 1.1 0 0 1 1.6 0l7.4 8a.7.7 0 0 1-.5 1.1H4.3a.7.7 0 0 1-.5-1.1Z'), R(8.5, 13, 7, 8, 1.2, 'a'))]),
  I('product-changelog', 'changelog versions updates history log', [R(4.5, 3, 15, 18, 2.5), P('M9 7v10'), C(9, 7, 1.4, 'a', 'pop'), C(9, 12, 1.2, 'f'), C(9, 17, 1.2, 'f'), P('M12 7h4.5M12 12h4.5M12 17h3')]),
  I('release-notes', 'release notes whats new update announcement', [R(3, 3, 13.5, 18, 2.5), P('M6.5 10h7M6.5 13.5h7M6.5 17h4'), P(spark(17.5, 6.5, 4.2), 'a', 'pulse')]),
  I('community-forum', 'forum community thread discussion replies', [C(5, 6, 2.2, 'a', 'pop'), P('M9.5 5h11M9.5 8h7'), P('M5 8.6V12a1 1 0 0 0 1 1h1.6M5 13v5a1 1 0 0 0 1 1h1.6'), C(10, 13, 2), P('M14 12h6.5M14 14.5h4.5'), C(10, 19, 2), P('M14 18h6.5M14 20.5h4', 'd', 'blink')]),
  I('customer-profile', 'customer profile contact record crm card', [R(2.5, 4.5, 19, 15, 2.5), C(8.5, 10.3, 2.2, 'a', 'pop'), P('M5 16.5a3.5 3.5 0 0 1 7 0'), P('M14.5 10h4M14.5 13.5h4M14.5 16.5h2.5')]),
  I('customer-health', 'customer health heartbeat vitals account status', [G('beat', P('M12 20.5C8 18 3 14 3 8.9a4.4 4.4 0 0 1 9-1.5 4.4 4.4 0 0 1 9 1.5C21 14 16 18 12 20.5Z')), P('M3.5 12.5H8l1.5-3 2.5 6 1.5-3h7', 'a', 'draw')]),
  I('health-score', 'health score ring progress account rating', [C(12, 12, 9), P(arc(12, 12, 5.8, 0, 250), 'a', 'draw'), C(12, 12, 1.5, 'f', 'pulse')]),
  I('churn-risk', 'churn risk leaving customer exit cancel', [C(8.5, 7.5, 3.3), P('M2.5 19.5a6 6 0 0 1 12 0Z'), G('slide-r', P('M15 13.5h6M18.5 11l2.5 2.5-2.5 2.5', 'a'))]),
  I('renewal-cycle', 'renewal renew subscription contract cycle', [cycle(), C(12, 12, 3, 'a', 'pulse')]),
  I('upsell', 'upsell upgrade expansion revenue tier', [R(3, 14, 5, 7, 1.5), R(9.5, 10, 5, 11, 1.5), G('grow', R(16, 4.5, 5, 16.5, 1.5, 'a'), P('M18.5 7.5v3M17 9h3'))]),
  I('account-manager', 'account manager csm owner relationship', [C(12, 7, 3.6), P('M4.5 21a7.5 7.5 0 0 1 15 0Z'), P('M12 13.6l1.4 1.6-1.4 4.6-1.4-4.6Z', 'a', 'swing')]),
  I('call-centre', 'call center agent headset phone support', [C(12, 9.8, 3.6), P('M5 21.5a7 7 0 0 1 14 0Z'), P('M6 10.5a6 6 0 0 1 12 0'), R(4.8, 9.5, 2.6, 4, 1.2, 'a'), R(16.6, 9.5, 2.6, 4, 1.2, 'a'), P('M17.9 13.5v.5a2 2 0 0 1-2 2H14'), C(13.6, 16, 0.9, 'f', 'blink')]),
  I('ivr-menu', 'ivr phone menu keypad dial options', [R(5, 2.5, 14, 19, 3), C(9, 7, 1.1, 'f'), C(12, 7, 1.1, 'f'), C(15, 7, 1.1, 'f'), C(9, 10.5, 1.1, 'f'), C(12, 10.5, 1.1, 'f'), C(15, 10.5, 1.3, 'a', 'blink'), C(9, 14, 1.1, 'f'), C(12, 14, 1.1, 'f'), C(15, 14, 1.1, 'f'), P('M10 18h4')]),
  I('callback-request', 'callback call back phone request incoming', [P('M5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 3 5.5a2 2 0 0 1 2-2Z'), G('diag-in', P('M15 9l5.5-5.5M15 4.5V9h4.5', 'a'))]),
  I('voicemail-transcript', 'voicemail transcript message audio text', [C(7.5, 8, 3.2), C(16.5, 8, 3.2), P('M7.5 11.2h9', 'a'), P('M4 15h16'), P('M4 18.5h11', 'd', 'grow-x')]),
  I('translation-support', 'translate language localisation multilingual', [P('M4.5 3h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4l-3 2.5V13h-1a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z'), P('M6.5 11l2-5.5 2 5.5M7.2 9.2h2.6'), G('float', P('M11.5 10.5h8a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v2l-3-2h-4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z', 'a'), P('M13 14h6M13 16.5h4'))]),
  I('universal-access', 'accessibility a11y inclusive disability access', [C(12, 12, 9.2), C(12, 7, 1.5, 'a', 'pulse'), P('M7.5 9.8h9M12 10v4l-2.5 4.5M12 14l2.5 4.5')]),
  I('satisfaction-trend', 'satisfaction trend csat chart improving', [P('M3 3.5v17h17.5'), P('M6.5 16l3.5-3.5 3 2 3.5-4', 'd', 'draw'), G('pop', C(18.5, 8, 2.8, 'a'), P('M17.4 8.4a1.2 1.2 0 0 0 2.2 0'))]),
  I('survey-results', 'survey results responses report bars', [R(4.5, 4, 15, 17.5, 2.5), R(9, 2.5, 6, 3.5, 1.2, 'b'), P('M8 10h8', 'd', 'grow-x'), P('M8 13.5h5', 'a', 'grow-x:.3'), P('M8 17h6.5', 'd', 'grow-x:.6')]),
  I('review-bubble', 'review customer comment rating star', [P(bubbleR), P(star(12, 10, 4, 1.8), 'a', 'pop')]),
  I('quote-testimonial', 'testimonial quote customer story praise', [P('M4.5 11.5c0-3 1.8-5 4.5-5.5v2.3c-1.2.4-2 1.5-2 3.2h3v5.5H4.5Z'), G('float', P('M14 11.5c0-3 1.8-5 4.5-5.5v2.3c-1.2.4-2 1.5-2 3.2h3v5.5H14Z', 'a'))]),
  I('agent-online', 'agent available online status presence', [C(10, 8, 3.8), P('M3 20.5a7 7 0 0 1 14 0Z'), C(18.5, 16.5, 3, 'a', 'pulse')]),
  I('agent-away', 'agent away idle break status presence', [C(10, 8, 3.8), P('M3 20.5a7 7 0 0 1 14 0Z'), G('pulse', C(18, 16.5, 3.8, 'a'), P('M18 14.6v2l1.4 1'))]),
  I('response-time', 'response time hourglass waiting sla', [P('M7 3h10c0 4.5-3.5 6.5-3.5 9s3.5 4.5 3.5 9H7c0-4.5 3.5-6.5 3.5-9S7 7.5 7 3Z'), P('M5 3h14M5 21h14'), P('M9.2 6.5h5.6c-.6 1.5-1.8 2.5-2.8 3-1-.5-2.2-1.5-2.8-3Z', 'a', 'sink'), P('M8.8 19.5h6.4c-.6-1.6-2-2.6-3.2-3.1-1.2.5-2.6 1.5-3.2 3.1Z', 'a', 'breathe')]),
  I('ticket-pending', 'pending waiting ticket on hold', [...smallTk(), badge('pulse', P('M16.3 17h.01', 'd', 'blink'), P('M18 17h.01', 'd', 'blink:.25'), P('M19.7 17h.01', 'd', 'blink:.5'))]),
  I('ticket-closed', 'closed ticket rejected cancelled archived', [...smallTk(), badge('pop', P('M16.6 15.6l2.8 2.8M19.4 15.6l-2.8 2.8'))]),
  I('ticket-triage', 'triage routing sort route distribute', [C(4.5, 12, 2.3), P('M6.8 12h2.2M9 12l4.5-6h3.5M9 12h8M9 12l4.5 6h3.5', 'd', 'dash'), C(19.5, 6, 2), C(19.5, 12, 2, 'a', 'pulse'), C(19.5, 18, 2)]),
  I('omnichannel', 'omnichannel channels hub unified inbox', [P('M9.6 9.6 6.6 6.6M14.4 9.6l3-3M9.6 14.4l-3 3M14.4 14.4l3 3', 'd', 'dash'), C(5, 5, 2.4), C(19, 5, 2.4), C(5, 19, 2.4), C(19, 19, 2.4), C(12, 12, 3.2, 'a', 'pulse')]),
  I('support-lifebuoy', 'lifebuoy help rescue support centre', [G('spin-slow', C(12, 12, 9), P(band(12, 12, 9, 4, 30, 60), 'a'), P(band(12, 12, 9, 4, 120, 150), 'a'), P(band(12, 12, 9, 4, 210, 240), 'a'), P(band(12, 12, 9, 4, 300, 330), 'a'), C(12, 12, 4, 'd'))]),
  I('business-hours', 'opening hours support hours schedule availability', [C(12, 12, 9), P(arc(12, 12, 6.3, -90, 150), 'a', 'draw'), P('M12 12V8M12 12l2.5 1.5'), C(12, 12, 1.1, 'f')]),
  I('contact-support', 'contact us email help question', [R(2.5, 4, 15, 11, 2.2), P('M3 5.5l7 5 7-5'), badge('pulse', P('M16.8 15.6a1.3 1.3 0 1 1 1.8 1.2c-.4.2-.6.4-.6.9M18 19.3h.01'))]),
  I('bot-handoff', 'handoff bot to human escalate live agent', [P('M6.75 5.5V3.5'), R(2.5, 5.5, 8.5, 7.5, 2.2), C(5, 9.2, 0.9, 'f'), C(8.5, 9.2, 0.9, 'f', 'blink'), C(18, 7.5, 2.5), P('M14 16a4 4 0 0 1 8 0Z'), G('slide-r', P('M5 19.5h12M14.8 17.3l2.2 2.2-2.2 2.2', 'a'))]),
  I('internal-note', 'internal note private comment sticky', [P('M5 3.5h14a1.5 1.5 0 0 1 1.5 1.5v9.5l-6 6H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5Z'), P('M7 8h10M7 11.5h7', 'd', 'grow-x'), P('M20.5 14.5H16a1.5 1.5 0 0 0-1.5 1.5v4.5Z', 'a', 'breathe')]),
  I('vip-customer', 'vip premium customer priority crown', [G('float', P('M8 7.5 7.5 3.3l2.6 1.8L12 2.5l1.9 2.6 2.6-1.8L16 7.5Z', 'a')), C(12, 11, 3), P('M5.5 21.5a6.5 6.5 0 0 1 13 0Z')]),
  I('customer-success', 'customer success growth adoption outcome', [C(8.5, 7.5, 3.3), P('M2.5 19.5a6 6 0 0 1 12 0Z'), G('diag', P('M15 14l6-6M17 8h4v4', 'a'))]),
  I('customer-retention', 'retention magnet keep loyalty stickiness', [G('float', P('M5 3.5h4v8a3 3 0 0 0 6 0v-8h4v8a7 7 0 0 1-14 0Z'), R(5, 3.5, 4, 3, 0, 'a'), R(15, 3.5, 4, 3, 0, 'a'))]),
  I('chat-transcript', 'transcript conversation log history export', [R(4, 2.5, 16, 19, 2.5), R(7, 6, 7.5, 3.5, 1.5, 'a', 'pop'), P('M10 12.8h7M7 16.5h6')]),
  I('feedback-loop', 'feedback loop iterate listen improve', [cycle(), P('M9.5 9.5h5a1 1 0 0 1 1 1v2.5a1 1 0 0 1-1 1h-2l-2 1.5v-1.5h-1a1 1 0 0 1-1-1v-2.5a1 1 0 0 1 1-1Z', 'a', 'pop')]),
  I('top-contributor', 'contributor badge medal community champion', [P('M9 14l-1.5 7 2.5-1.2 2 1.7M15 14l1.5 7-2.5-1.2-2 1.7'), C(12, 9, 6), P(star(12, 9, 3.2, 1.4), 'a', 'pulse')]),
  I('accepted-answer', 'accepted answer solution solved reply', [P(bubbleR), P('M8.5 10l2.5 2.5 4.5-5', 'a', 'draw')]),
  I('user-guide', 'manual guide handbook documentation book', [P('M5 4.5a2 2 0 0 1 2-2h12v15H7a2 2 0 0 0-2 2Z'), P('M5 19.5a2 2 0 0 0 2 2h12v-4'), P('M13.5 2.5h4v7l-2-1.5-2 1.5Z', 'a', 'sink')]),
  I('closed-captions', 'captions subtitles cc accessibility video', [R(2.5, 5, 19, 14, 2.5), P(arc(8.8, 12, 2.6, 135, 405)), P(arc(15.4, 12, 2.6, 135, 405), 'a', 'blink')]),
  I('high-contrast', 'contrast accessibility display theme vision', [C(12, 12, 9), P('M12 3a9 9 0 0 1 0 18Z', 'a', 'flip')]),
];
