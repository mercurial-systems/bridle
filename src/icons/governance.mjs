import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

// Governance & DAOs: every icon its own metaphor, no shared base drawing.
const n = (v) => +v.toFixed(2);
const pt = (cx, cy, r, a) => [n(cx + r * Math.sin((a * Math.PI) / 180)), n(cy - r * Math.cos((a * Math.PI) / 180))];
const shield = 'M12 2.8 19.5 5.5v6c0 4.7-3.2 8.4-7.5 9.9-4.3-1.5-7.5-5.2-7.5-9.9v-6Z';
// annular sector, angles in degrees (0 = up, clockwise)
const sector = (cx, cy, r1, r2, a0, a1) => {
  const [a, b] = pt(cx, cy, r2, a0), [c, d] = pt(cx, cy, r2, a1), [e, f] = pt(cx, cy, r1, a1), [g, h] = pt(cx, cy, r1, a0);
  return `M${a} ${b}A${r2} ${r2} 0 0 1 ${c} ${d}L${e} ${f}A${r1} ${r1} 0 0 0 ${g} ${h}Z`;
};
// almond leaf from a base point along angle `a` (degrees, 0 = up)
const leaf = (x, y, a, len = 3.4, w = 1.5) => {
  const r = (a * Math.PI) / 180, dx = Math.sin(r), dy = -Math.cos(r);
  const t = [n(x + dx * len), n(y + dy * len)], m = [x + (dx * len) / 2, y + (dy * len) / 2];
  const c1 = [n(m[0] - dy * w), n(m[1] + dx * w)], c2 = [n(m[0] + dy * w), n(m[1] - dx * w)];
  return `M${x} ${y}Q${c1} ${t}Q${c2} ${x} ${y}Z`.replace(/,/g, ' ');
};
const laurel = () => {
  const out = [];
  for (const a of [212, 240, 268, 296]) {
    const [x, y] = pt(12, 11, 8, a);
    out.push(P(leaf(x, y, a + 60)), P(leaf(...pt(12, 11, 8, 360 - a), 360 - a - 60)));
  }
  return out;
};
const hemicycle = () => {
  const out = [];
  [[9, 7], [5.5, 5]].forEach(([r, k]) => {
    for (let i = 0; i < k; i++) {
      const [x, y] = pt(12, 17.5, r, -90 + (180 * i) / (k - 1));
      if (!(r === 5.5 && i === 2)) out.push(C(x, y, 1.3));
    }
  });
  return out;
};

export default [
  // ---- proposal lifecycle ----
  I('proposal-draft', 'draft write proposal pencil idea', [R(3.5, 3, 12, 17, 2), P('M7 7.5h5M7 11h3.5'), P('M7 15c1-1.2 2-1.2 3 0', 'd', 'draw'),
    G('wiggle', P('M10 19l1.44-3.56 7-7 2.12 2.12-7 7Z', 'a'))]),
  I('discussion-thread', 'forum thread replies discussion debate', [R(3, 3, 15, 7, 2.5), P('M6.5 6.5h8'), P('M6 10v6h4'),
    R(10, 13, 11, 6.5, 2.5, 'a', 'rise'), P('M13 16.25h5')]),
  I('temperature-check', 'temp check sentiment signal poll', [R(9.5, 3, 5, 13, 2.5), C(12, 17.5, 3.5, 'a', 'pulse'), P('M12 15V8.5', 'd', 'grow'),
    P('M17 6h2.5M17 9.5h2.5M17 13h2.5')]),
  I('onchain-proposal', 'onchain proposal submit block record', [R(3, 2.5, 10, 12.5, 2), P('M6 6.5h4M6 9.5h4'), P('M13 9.5h2.5v2.5', 'd', 'dash'),
    cube(16, 15.5, 5.2, ['a', 'b', 'b'], 'float')]),
  I('voting-period', 'voting open window countdown clock', [C(12, 12, 9), P(wedge(12, 12, 6.5, 0, 130), 'a', 'breathe'),
    G('spin', X(12, 12, 6.5), P('M12 12V6.5')), C(12, 12, 1.2, 'f')]),
  I('voting-closed', 'voting closed ended locked ballot box', [P('M5 9.5l1.5-4.5h11L19 9.5'), R(3.5, 9.5, 17, 11, 2), P('M8.5 9.5h7'),
    G('shake', P('M10 14.5v-1.5a2 2 0 0 1 4 0v1.5'), R(9, 14.5, 6, 4.5, 1.2, 'a'))]),
  I('proposal-passed', 'passed approved result majority win', [P('M3 20.5h18'), R(5, 13, 4.5, 7.5, 1), R(13.5, 6, 4.5, 14.5, 1, 'a', 'grow'),
    P('M3 10h18', 'd', 'dash'), P('M4.5 6.2l1.4 1.4 2.8-2.9', 'd', 'draw')]),
  I('proposal-defeated', 'defeated rejected failed lost fallen', [P('M3 21h18'), P('M5 21c0-1.7 1.3-3 3-3s3 1.3 3 3Z'), P('M8 18 16 6.5'), P('M16 6.5l4.6 3.2-2.3 3.3-4.6-3.2Z', 'a', 'wave'), C(16.3, 6, 1.2, 'f')]),
  I('proposal-queued', 'queued pending timelock waiting line', [R(3, 3, 11, 8, 1.5), R(6.5, 7.5, 11, 8, 1.5), G('diag-in', R(10, 12, 11, 8, 1.5, 'a'), P('M13 16h5'))]),
  I('proposal-executed', 'executed enacted trigger run detonate', [G('slide-d', P('M12 6.5V12'), R(6.5, 3.5, 11, 3, 1.5, 'a')), R(3.5, 12, 17, 8.5, 2),
    P('M12.8 13.8l-2 2.6h3l-2 2.6')]),
  I('proposal-vetoed', 'vetoed blocked denied overruled', [R(3.5, 2.5, 12, 16, 2), P('M6.5 6.5h6M6.5 10h4'), C(16, 16, 5, 'a', 'pop'), P('M12.5 19.5l7-7')]),
  I('proposal-cancelled', 'cancelled withdrawn discarded bin', [R(8, 2.5, 8, 9, 1.2, 'a', 'sink'), P('M10 5.5h4'),
    P('M5.5 10h13l-1.2 10.5a1.5 1.5 0 0 1-1.5 1.3H8.2a1.5 1.5 0 0 1-1.5-1.3Z'), P('M3.5 10h17M10 13.5v5M14 13.5v5')]),

  // ---- vote types ----
  I('vote-for', 'yes for yea support up', [R(5, 4, 14, 17, 2.5), G('slide-u', P('M12 17V8.5M8 12.5l4-4 4 4', 'a'))]),
  I('vote-against', 'no against nay reject', [G('shake', P('M12 2.5 21.5 12 12 21.5 2.5 12Z', 'a'), P('M9.5 9.5l5 5M14.5 9.5l-5 5'))]),
  I('vote-abstain', 'abstain empty chair absent neutral', [R(6, 3, 12, 8.5, 2), R(4.5, 12, 15, 3.5, 1.5, 'a', 'breathe'), P('M6.5 15.5V21M17.5 15.5V21')]),
  I('ranked-choice', 'ranked choice preference order ballot', [C(5, 5, 2, 'a', 'pop'), C(5, 12, 2), C(5, 19, 2),
    G('grow-x', R(9, 3.5, 12, 3, 1.5, 'a'), R(9, 10.5, 8.5, 3, 1.5), R(9, 17.5, 5, 3, 1.5))]),
  I('quadratic-voting', 'quadratic voting square cost credits', [R(3.5, 3.5, 17, 17, 2), P('M9.2 3.5v17M14.8 3.5v17M3.5 9.2h17M3.5 14.8h17'),
    R(3.5, 14.8, 5.7, 5.7, 1.5, 'a', 'pulse'), P('M3.5 9.2h11.3V20.5', 'a')]),
  I('conviction-voting', 'conviction time weighted accumulate curve', [P('M3 20h18'), P('M3 4v16'), P('M4.5 20C10 20 12 9 21 8V20Z', 'a', 'breathe'), C(21, 4.5, 1, 'f', 'blink')]),
  I('optimistic-approval', 'optimistic pass unless challenged window', [C(12, 12, 9.5, 'd', 'dash'), P('M6.5 12.5l4 4L18 8.5', 'a', 'draw')]),
  I('token-weighted-vote', 'token weighted stake scale balance', [P('M12 4v16M7 20.5h10'), C(12, 4, 1.3, 'f'),
    G('seesaw', P('M4 7.5h16M5 7.5 2.8 12M5 7.5 7.2 12M19 7.5 16.8 12M19 7.5 21.2 12'), P('M2.5 12h5a2.5 2.5 0 0 1-5 0Z'), P('M16.5 12h5a2.5 2.5 0 0 1-5 0Z'), C(5, 9.8, 1.8, 'a'))]),
  I('one-person-one-vote', 'one person one vote equal democracy', [C(7, 7.5, 3), P('M2.5 19.5a4.5 4.5 0 0 1 9 0Z'), P('M13 11h2.5M13 14h2.5'),
    R(17, 6, 4.5, 13, 1.5, 'a', 'pop')]),
  I('veto-power', 'veto stop block halt power', [P(poly(12, 12, 9.5, 8, -Math.PI / 2 + Math.PI / 8), 'a', 'pulse'), P('M7.5 12h9')]),

  // ---- delegation ----
  I('delegate-profile', 'delegate profile representative card', [R(3, 4, 18, 16, 2.5), C(8.5, 10, 2.5, 'a'), P('M5 17.5a3.5 3.5 0 0 1 7 0'),
    G('grow', P('M14.5 16.5v-2M17 16.5v-4.5M19.5 16.5V9.5'))]),
  I('delegate-leaderboard', 'top delegates ranking voting power', [G('grow', R(3, 10, 4.5, 10.5, 1.2, 'a'), R(9.75, 13, 4.5, 7.5, 1.2), R(16.5, 16, 4.5, 4.5, 1.2)),
    C(5.25, 6.5, 2), C(12, 9.5, 2), C(18.75, 12.5, 2)]),
  I('voting-power-meter', 'voting power weight level charge', [R(7, 3, 10, 18, 2.5), R(9, 11, 6, 8, 1, 'a', 'grow'), P('M9 7h6')]),
  I('self-delegate', 'self delegation own vote loop', [C(12, 10, 2.8), P('M7 18.5a5 5 0 0 1 10 0'),
    G('spin-slow', X(12, 12, 9.5), P(arc(12, 12, 9.5, 30, 330), 'a'), P('M6.32 6.16 7.25 3.77 4.72 3.38', 'a'))]),
  I('undelegate', 'undelegate revoke unlink break', [R(2, 9, 8.5, 6, 3), P('M5 12h2.5'), G('slide-r', R(13.5, 9, 8.5, 6, 3, 'a'), P('M16.5 12h2.5')),
    P('M12 7V4.5M9.8 7.2l-1-1.5M14.2 7.2l1-1.5M12 17v2.5', 'd', 'blink')]),

  // ---- councils & roles ----
  I('security-council', 'security council guardians emergency', [P(shield), P('M12 8.5 8.8 14h6.4L12 8.5'), C(12, 8.5, 1.7, 'a', 'pulse'),
    C(8.8, 14, 1.7, 'a', 'pulse:.4'), C(15.2, 14, 1.7, 'a', 'pulse:.8')]),
  I('signer-ring', 'multisig signers threshold ring keys', [C(12, 4, 2, 'a', 'pop'), C(19.61, 9.53, 2, 'a', 'pop:.3'),
    C(4.39, 9.53, 2, 'a', 'pop:.6'), C(16.7, 18.47, 2), C(7.3, 18.47, 2), P('M12 9.5l2.8 3.6-2.8 4-2.8-4Z'), P('M12 13v4')]),
  I('steward', 'steward caretaker shepherd crook', [P('M9 21V7.5a4 4 0 0 1 8 0V9'), G('swing', P('M9 15c-3.6 0-5.4-2.6-5.4-5.6 3 0 5.4 2.2 5.4 5.6Z', 'a')),
    P('M9 18.5c2.8 0 4.4-2 4.4-4.4-2.4 0-4.4 1.6-4.4 4.4Z')]),
  I('working-group', 'working group team roundtable squad', [R(10, 2.5, 4, 3, 1.2), R(10, 18.5, 4, 3, 1.2), R(2.5, 10, 3, 4, 1.2), R(18.5, 10, 3, 4, 1.2),
    C(12, 12, 5, 'a', 'pulse'), P('M10 12h4')]),
  I('committee-table', 'committee panel board members table', [P('M3 12a3 3 0 0 1 6 0M15 12a3 3 0 0 1 6 0'), C(6, 7.5, 2.2), C(18, 7.5, 2.2),
    G('float', C(12, 6, 2.4, 'a')), R(2.5, 12, 19, 3.5, 1.5), P('M5 15.5v5M19 15.5v5')]),
  I('elected-seat', 'elected seat parliament hemicycle council', [...hemicycle(), C(12, 12, 2, 'a', 'pop'), P('M3 20.5h18')]),
  I('term-limit', 'term limit tenure expiry duration', [P('M3.5 7v10M20.5 7v10'), R(5.5, 10.5, 13, 3, 1.5), R(5.5, 10.5, 8, 3, 1.5, 'a', 'grow-x'),
    P('M20.5 7h-3l1 1.5-1 1.5h3', 'd', 'blink')]),

  // ---- treasury ops ----
  I('grant', 'grant funding seed ecosystem growth', [C(12, 16.5, 4.5, 'a'), C(12, 16.5, 2.5, 'd'),
    G('grow', P('M12 12V6.5'), P('M12 8c0-2.6 2-4.2 5-4.2 0 2.6-2 4.2-5 4.2Z'), P('M12 9.5c0-2-1.6-3.3-4-3.3 0 2 1.6 3.3 4 3.3Z'))]),
  I('grant-milestone', 'milestone grant tranche roadmap progress', [P('M4 20c4 0 4-5 8-5s4-5 8-5', 'd', 'dash'), C(4, 20, 1.3, 'f'), C(12, 15, 1.8),
    P('M20 10V3'), P('M20 3.5h-5l1.5 2-1.5 2h5Z', 'a', 'wave')]),
  I('bounty-board', 'bounty board tasks rewards jobs', [R(3, 3, 18, 14, 2), P('M7 17v4M17 17v4'), P('M5.5 6h5v4.5h-5Z'), P('M6.5 8.2h3'),
    G('swing', R(13, 6.5, 5.5, 8, 1, 'a'), C(15.75, 10.5, 1.5, 'd')), C(15.75, 6.5, 1, 'f')]),
  I('retro-funding', 'retroactive funding reward past impact', [C(14, 12.5, 6, 'a'), C(14, 12.5, 3.5, 'd'),
    G('spin-rev', X(12, 12, 9.5), P(arc(12, 12, 9.5, 200, 340)), P('M7.38 18.84 8.75 20.93 6.36 21.66'))]),
  I('budget-request', 'budget request spend ask clipboard', [R(4.5, 4, 15, 17, 2.5), R(8.5, 2.5, 7, 3.5, 1.2), P('M8 10h8M8 13.5h4'),
    C(15, 17, 2.4, 'a', 'pop')]),
  I('payment-stream', 'stream payments continuous flow vesting', [G('slide-r', C(7, 8.5, 2.6, 'a'), C(14, 8.5, 2.6)),
    P('M2.5 15c2.4-2 4.8 2 7.2 0s4.8-2 7.2 0 3.3 1.3 4.6 0M2.5 19c2.4-2 4.8 2 7.2 0s4.8-2 7.2 0 3.3 1.3 4.6 0')]),
  I('payroll-stream', 'payroll stream contributor salary drip', [P('M2.5 13c1.5-1.6 3-1.6 4.5 0s3 1.6 4.5 0', 'a', 'dash'), C(17, 8, 3),
    P('M12 20.5a5 5 0 0 1 10 0Z')]),
  I('treasury-diversification', 'diversify treasury assets basket allocation', [G('float', C(7.5, 8, 2.6, 'a'), P('M12 3.5 15 9H9Z'), R(15.5, 5.5, 4, 4, .8)),
    P('M3 11h18l-2 9.5H5Z'), P('M8.5 11l1 9.5M15.5 11l-1 9.5')]),

  // ---- law & process ----
  I('constitution', 'constitution founding law book rules', [R(4.5, 3, 14, 18, 2), P('M7.5 3v18M11 14h5'), P('M12.5 3v6.5l1.75-1.4 1.75 1.4V3Z', 'a', 'sink')]),
  I('charter-scroll', 'charter scroll mandate founding document', [P('M5.5 6.5h13v13.5h-13Z'), R(3.5, 3, 17, 3.5, 1.75), P('M8 10h8M8 13h4.5'),
    P('M14 19l-.8 2.8M16 19l.8 2.8'), C(15, 16.5, 2.8, 'a', 'pulse')]),
  I('code-of-conduct', 'code of conduct community rules respect', [C(12, 3.5, 1, 'f'),
    G('swing', P('M12 3.5 5.5 9M12 3.5 18.5 9'), R(3, 9, 18, 11, 2.5), P('M12 18s-3.4-2.1-3.4-4.3a1.7 1.7 0 0 1 3.4-.4 1.7 1.7 0 0 1 3.4.4c0 2.2-3.4 4.3-3.4 4.3Z', 'a'))]),
  I('juror-lottery', 'jurors random draw arbitration dispute court', [G('tilt', R(10.5, 3, 10, 10, 2.5, 'a'), C(13.5, 6, 0.9, 'f'), C(17.5, 10, 0.9, 'f')),
    R(3.5, 9, 11, 11, 2.5), C(6.5, 12, 0.9, 'f'), C(9, 14.5, 0.9, 'f'), C(11.5, 17, 0.9, 'f'), C(11.5, 12, 0.9, 'f'), C(6.5, 17, 0.9, 'f')]),
  I('appeal-round', 'appeal escalate higher court round', [P('M3 20.5h5v-5h5v-5h5v-5h3v15Z'), P('M4 12l6-6M10 6H6.5M10 6v3.5', 'a', 'diag')]),
  I('emergency-pause', 'emergency pause circuit breaker halt vote', [P('M12 2.5v2M4.5 5.5l1.4 1.4M19.5 5.5l-1.4 1.4', 'd', 'blink'),
    C(12, 13, 6.5, 'a', 'beat'), P('M10 10.5v5M14 10.5v5'), P('M4.5 21h15')]),
  I('parameter-change', 'parameter change adjust value stepper', [R(2.5, 7.5, 19, 9, 4.5), P('M5.5 12h2.5M16 12h2.5M17.25 10.75v2.5'), P('M9.5 7.5v9M14.5 7.5v9'),
    R(10.5, 9.5, 3, 5, 1, 'a', 'pop')]),
  I('fee-switch', 'fee switch protocol revenue toggle', [R(2.5, 7, 19, 10, 5), G('toggle', C(16, 12, 3.6, 'a'), C(16, 12, 1.8, 'd'))]),
  I('upgrade-vote', 'upgrade vote protocol version improve', [cube(12, 15, 6, ['a', 'b', 'b']), G('slide-u', P('M8.5 6.5 12 3l3.5 3.5M9.5 9 12 6.5 14.5 9'))]),
  I('governance-attack-shield', 'governance attack defense protect takeover', [G('shake', P(shield), P(poly(12, 11.5, 3.5, 6), 'a')),
    P('M22 2 18.5 5.5M18.5 3v2.5H21')]),
  I('vote-buying', 'bribery vote buying warning market abstract', [R(3, 3, 8.5, 11, 1.5), P('M5.5 8.5l1.5 1.5 2.5-2.7'), G('shake', C(16.5, 15.5, 4.2, 'a'), C(16.5, 15.5, 2, 'd')),
    P('M14 4.5h3.5a2 2 0 0 1 2 2V9M18 7.8l1.5 1.5L21 7.8M10 19.5H6.5a2 2 0 0 1-2-2V17M3 18.3l1.5-1.5L6 18.3')]),
  I('voter-turnout', 'turnout voters showed up count', [C(6, 6, 2, 'a', 'pop'), C(12, 6, 2, 'a', 'pop:.15'), C(18, 6, 2, 'a', 'pop:.3'), C(6, 12, 2, 'a', 'pop:.45'),
    C(12, 12, 2, 'a', 'pop:.6'), C(18, 12, 2, 'a', 'pop:.75'), C(6, 18, 2, 'd'), C(12, 18, 2, 'd'), C(18, 18, 2, 'd')]),
  I('participation-rate', 'participation rate percent engaged voters', [C(12, 12, 9, 'd'), P(arc(12, 12, 9, 0, 250), 'a', 'draw'), C(12, 10, 2.4), P('M8.5 16.5a3.5 3.5 0 0 1 7 0')]),
  I('governance-calendar', 'governance calendar schedule vote dates', [R(3, 4.5, 18, 16, 2.5), P('M8 2.5v4M16 2.5v4M3 9.5h18'), C(7.5, 13.5, 0.9, 'f'), C(11, 13.5, 0.9, 'f'),
    C(7.5, 17, 0.9, 'f'), C(11, 17, 0.9, 'f'), P(poly(16, 15.25, 3, 6), 'a', 'spin')]),
  I('town-hall-call', 'town hall community call video meeting', [R(2.5, 3.5, 19, 13.5, 2), C(12, 8.5, 2.4, 'a'), P('M8 15a4 4 0 0 1 8 0'),
    P('M17 7.5a3 3 0 0 1 0 4', 'd', 'blink'), P('M12 17v3.5M8 20.5h8')]),
  I('forum-moderation', 'forum moderation community safety moderator', [P('M5.5 3h9a3 3 0 0 1 3 3v4.5a3 3 0 0 1-3 3H10l-4 3.5v-3.5h-.5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z'),
    P('M6.5 7h7M6.5 10h4'), G('pulse', P('M17 11.5l4.5 1.6v3.4c0 2.8-1.9 4.9-4.5 5.8-2.6-.9-4.5-3-4.5-5.8v-3.4Z', 'a'), P('M15.2 16.6l1.3 1.3 2.4-2.5'))]),
  I('reputation-points', 'reputation points karma laurel merit', [P(arc(12, 11, 8, 200, 300)), P(arc(12, 11, 8, 60, 160)), ...laurel(),
    P(star(12, 11, 4, 1.8), 'a', 'pulse'), P('M9 20.5h6')]),
  I('guild-medallion', 'guild collective craft members medallion', [P('M8.5 15.5 6.5 21.5l3-1 1.5 1.5 1-5Z', 'a'), P('M15.5 15.5l2 6-3-1-1.5 1.5-1-5Z', 'a'),
    C(12, 10, 7.5), G('spin-slow', X(12, 10, 3.5), P(poly(12, 10, 3.5, 6), 'd'))]),
  I('sub-dao', 'subdao child pod nested organisation', [P(poly(12, 6.5, 4, 6), 'a', 'pulse'), P('M10 10l-2.2 3.4M14 10l2.2 3.4'), P(poly(6.5, 16.5, 3.4, 6)), P(poly(17.5, 16.5, 3.4, 6))]),
  I('dao-merger', 'dao merger combine join unite', [C(8.5, 12, 5.5, 'b', 'slide-r'), C(15.5, 12, 5.5, 'a', 'slide-l')]),
  I('dao-fork', 'fork dao split secede schism', [G('slide-l', P('M10.8 4 3.87 8v8l6.93 4-1-3.5 2-4.5-2-4.5Z')), G('slide-r', P('M13.2 4l6.93 4v8l-6.93 4-1-3.5 2-4.5-2-4.5Z', 'a'))]),
  I('rage-quit', 'rage quit exit redeem leave', [R(3, 2.5, 11, 19, 1.5), P('M3 2.5l6 2.5v16l-6 .5Z', 'a'), G('slide-r', P('M11 12h10M18 9l3 3-3 3'))]),

  // ---- mechanics ----
  I('vote-escrow-lock', 'vote escrow ve lock boost', [P('M8 10V7a4 4 0 0 1 8 0v3'), R(4.5, 10, 15, 11, 2.5), C(12, 15.5, 3, 'a', 'pulse'), C(12, 15.5, 1.3, 'd')]),
  I('proposal-threshold', 'proposal threshold minimum hurdle requirement', [P('M3 21h18M5.5 21v-9.5M18.5 21v-9.5'), R(3.5, 10, 17, 2.5, 1.25, 'a'), C(12, 5.5, 2.6, 'b', 'float')]),
  I('vote-receipt', 'vote receipt proof confirmation', [P('M5 3h14v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5Z'), P('M8 7h8M8 10.5h5'),
    C(14.5, 14.5, 2.6, 'a'), P('M13.3 14.5l.9.9 1.6-1.7', 'd', 'draw')]),
  I('secret-ballot', 'secret private ballot sealed envelope', [R(3, 6, 18, 13, 2), P('M3.5 7l8.5 6.5L20.5 7'), C(12, 13.5, 2.8, 'a', 'pulse')]),
  I('vote-tally', 'tally count votes marks', [R(2.5, 3, 19, 18, 2.5), P('M6 6.5v11M9.5 6.5v11M13 6.5v11M16.5 6.5v11'), P('M4.5 15.5l14-7', 'a', 'draw')]),
  I('supermajority', 'supermajority two thirds threshold', [P(sector(12, 16.5, 4.8, 9.5, -90, -33), 'a', 'pop'), P(sector(12, 16.5, 4.8, 9.5, -27, 27), 'a', 'pop:.3'),
    P(sector(12, 16.5, 4.8, 9.5, 33, 90)), P('M3 20h18')]),
  I('liquid-democracy', 'liquid democracy transitive delegation chain', [C(4.5, 15, 2.3), C(12, 15, 2.3), C(19.5, 15, 2.3, 'a', 'pulse'),
    P('M5 11.5C6.5 7.5 10.5 7.5 11.5 11.5M12.5 11.5C14 7.5 18 7.5 19 11.5', 'd', 'dash')]),
  I('split-delegation', 'split delegation partial multiple delegates', [C(5.5, 12, 3, 'a'), P('M9 12h8M9 11c3-5 5-5 8-5M9 13c3 5 5 5 8 5', 'd', 'dash'),
    C(19, 6, 2), C(19, 12, 2), C(19, 18, 2)]),
  I('proposal-watchlist', 'watch proposals monitor binoculars', [G('tilt', R(4.5, 5, 5, 7, 1.5), R(14.5, 5, 5, 7, 1.5), R(9.5, 9, 5, 4, 1.5),
    C(7, 15, 4.5), C(17, 15, 4.5), C(7, 15, 2, 'd'), C(17, 15, 2.2, 'a'))]),
  I('gasless-vote', 'gasless vote offchain signature light', [G('float', P('M20 3.5c-7 0-12.5 4.5-13 13l3-1c5-1.5 9.5-6 10-12Z', 'a'), P('M4 21.5 14 9'), P('M9.5 14.5h3'))]),
  I('dao-capitol', 'dao capitol seat of governance dome', [P('M12 5V2.5'), C(12, 2.5, 0.9, 'f', 'blink'), P('M6 11a6 6 0 0 1 12 0Z', 'a', 'pulse'), R(4, 11, 16, 2, 0.8),
    P('M7 13v6M10.3 13v6M13.7 13v6M17 13v6'), R(3, 19, 18, 2.5, 1)]),
  I('seat-rotation', 'seat rotation rotating council roles', [G('spin-slow', X(12, 12, 7.5), P(arc(12, 12, 7.5, 25, 95)), P(arc(12, 12, 7.5, 145, 215)), P(arc(12, 12, 7.5, 265, 335))),
    C(12, 4.5, 2.5, 'a'), C(18.5, 15.75, 2.5), C(5.5, 15.75, 2.5)]),
  I('voting-booth', 'voting booth private polling station', [R(3, 2.5, 18, 3, 1.5), P('M4 5.5V21M20 5.5V21'), P('M5 5.5h7v15c-2.3-1-4.7-1-7 0Z', 'a', 'wave'),
    P('M14 5.5h5v15h-2.5c-.5-4-1.5-8-2.5-15Z')]),
  I('debate-podium', 'debate podium speech lectern address', [P('M7 9.5h10l-1.5 11h-7Z'), R(4.5, 7.5, 15, 2.5, 1, 'a'), C(12, 14.5, 1.8, 'd'), P('M6 20.5h12'),
    P('M10 7.5c0-2 1-3.5 3-3.5'), C(14.3, 4, 1.3, 'f'), P('M17 2.5a2.5 2.5 0 0 1 0 3.5', 'd', 'blink')]),
  I('signaling-flags', 'signal vote offchain sentiment semaphore', [P('M5 21 13 3M19 21 11 3'), P('M13 3l6.4 2.84-2.3 5.12-6.4-2.84Z', 'a', 'wave'),
    P('M11 3 4.6 5.84l2.3 5.12 6.4-2.84Z', 'b', 'wave:.4')]),
  I('contested-vote', 'contested close race tug of war split', [P('M5 12h14'), R(2.5, 8, 3.5, 8, 1.75), R(18, 8, 3.5, 8, 1.75), G('slide-l', C(12, 12, 3.2, 'a')), P('M12 3v3.5M12 17.5V21', 'd', 'dash')]),
];
