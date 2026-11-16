import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

// full-size document with a folded corner
const doc = 'M7 3h7.5L19.5 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z';
const full = (lines) => [P(doc), P('M14.5 3v5h5'), ...(lines ? [P(lines)] : [])];
// smaller document top-left, leaving room for a badge bottom-right
const sdoc = (lines = 'M6 9.5h4.5M6 12.5h6') => [P('M5 2.5h6.5l4 4v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z'), P('M11.5 2.5v4h4'), P(lines)];
const badge = (an, ...els) => G(an, C(17.5, 17, 4.2, 'a'), ...els);
// archive box
const box = [R(3, 4, 18, 4.5, 1.5), P('M4.5 8.5h15V19a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2Z')];
const person = (cx, top, w) => [C(cx, top + 3.2, 3.2), P(`M${cx - w} 21a${w} ${w} 0 0 1 ${2 * w} 0Z`)];
const env = [R(2.5, 4.5, 15, 11, 2), P('M2.5 6.5l7.5 5 7.5-5')];

export default [
  // ---- policies & IP ----
  I('nda', 'non disclosure agreement confidential secret contract', [...sdoc(), badge('pulse', P('M16.3 16.4v-1a1.2 1.2 0 0 1 2.4 0v1'), R(15.3, 16.4, 4.4, 3.2, 0.8, 'd'))]),
  I('terms-of-service', 'tos terms conditions agreement rules', [...full(), C(8.8, 10.5, 0.9, 'f'), P('M11.3 10.5h4.5'), C(8.8, 14, 0.9, 'f'), P('M11.3 14h4.5'), C(8.8, 17.5, 0.9, 'f'), P('M11.3 17.5h3.5', 'a', 'draw')]),
  I('privacy-policy', 'privacy gdpr personal data notice', [...sdoc(), badge('pulse', G('blink', P('M15 16.3c1.4 1.6 3.6 1.6 5 0M16 17.9l-.5.8M17.5 18.3v.9M19 17.9l.5.8')))]),
  I('cookie-policy', 'cookies consent tracking banner gdpr', [...sdoc(), G('wiggle', C(17.5, 17, 4.2, 'a'), C(16, 15.8, 0.8, 'f'), C(18.9, 16, 0.7, 'f'), C(17.3, 18.7, 0.8, 'f'))]),
  I('license-certificate', 'license permit certificate accreditation authorised', [R(2.5, 4, 19, 13, 2), P('M6 8h8M6 11h5'), P('M14.5 15.3l-1 5.2 2.7-1.4 2.7 1.4-1-5.2Z'), G('pulse', C(16.2, 12.5, 3.2, 'a'), C(16.2, 12.5, 1.4, 'd'))]),
  I('trademark', 'brand mark registered ip protection', [P('M3 11.5V5a2 2 0 0 1 2-2h6.5l9 9a2 2 0 0 1 0 2.8l-6.7 6.7a2 2 0 0 1-2.8 0Z'), C(7.5, 7.5, 1.3, 'd'), P(spark(13.2, 13.2, 3.6), 'a', 'pulse')]),
  I('patent', 'invention idea ip filing innovation', [...sdoc(), G('pulse', C(17.5, 15.8, 3.5, 'a'), R(16, 18.8, 3, 2.4, 0.8, 'a')), P('M16.5 15.9l1 1 1-1')]),
  I('copyright', 'rights ip author ownership protected', [C(12, 12, 9), P(arc(12, 12, 4, 135, 405), 'a', 'draw')]),
  I('intellectual-property', 'ip idea invention bulb asset', [P('M12 2.5a6.5 6.5 0 0 0-4 11.6c.6.5 1 1.2 1 2V17h6v-.9c0-.8.4-1.5 1-2A6.5 6.5 0 0 0 12 2.5Z'), P('M9.5 19.5h5M10.5 21.5h3'), C(12, 9, 2.6, 'a', 'pulse')]),
  I('license-key', 'license activation serial key entitlement', [P('M12.5 12H21M18 12v3M21 12v2.5'), G('tilt', C(8, 12, 4.8, 'a'), C(8, 12, 1.6, 'd'))]),

  // ---- courts & disputes ----
  I('courthouse', 'court building justice law tribunal', [P('M3 9 12 3.5 21 9Z', 'a', 'breathe'), P('M6 11.5v5.5M10 11.5v5.5M14 11.5v5.5M18 11.5v5.5'), R(3, 18.5, 18, 2.5, 1)]),
  I('judge', 'justice magistrate court bench robe', [...person(12, 3.5, 7.5), P('M10.8 14.2h2.4v4.3l-1.2-1-1.2 1Z', 'a', 'pulse')]),
  I('jury', 'jurors panel court trial peers', [G('pop', C(6, 8, 2.3)), G('pop:.3', C(12, 7, 2.3, 'a')), G('pop:.6', C(18, 8, 2.3)), R(3, 12.5, 18, 8.5, 2), P('M3 16h18')]),
  I('lawsuit', 'litigation sue claim court case', [...sdoc(), badge(undefined, G('tilt', P('M15.3 16.2l2-2 1.8 1.8-2 2Z'), P('M17.2 17.1l2.3 2.3')))]),
  I('scales-of-justice', 'balance justice law fairness equality', [P('M12 4v16M8 20.5h8'), G('seesaw', X(12, 7, 9), P('M4.5 7h15'), P('M5.5 7l-2.5 6M5.5 7l2.5 6M18.5 7l-2.5 6M18.5 7l2.5 6'), P('M2.5 13a3 3 0 0 0 6 0Z', 'a'), P('M15.5 13a3 3 0 0 0 6 0Z', 'a')), C(12, 4, 1.3, 'f')]),
  I('arbitration', 'arbiter dispute resolution adr neutral', [P('M10.3 7.8l-3.2 7.4M13.7 7.8l3.2 7.4'), P('M8.8 17.5h6.4', 'd', 'dash'), C(5.5, 17.5, 2.8), C(18.5, 17.5, 2.8), C(12, 5.5, 2.8, 'a', 'pulse')]),
  I('mediation', 'mediate negotiate talk resolve dialogue', [P('M3 5.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7.5L4.5 14v-2.7A2 2 0 0 1 3 9.5Z'), G('blink', C(6.5, 7.5, 0.8, 'f'), C(9.5, 7.5, 0.8, 'f')), P('M21 12.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4.5l3 2.5v-2.7a2 2 0 0 0 1.5-1.8Z', 'a', 'float')]),
  I('dispute', 'conflict disagreement claim argument chargeback', [P('M2.5 6a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-3L4 14v-2.2A2 2 0 0 1 2.5 10Z'), P('M21.5 13a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h3l2.5 2v-2.2a2 2 0 0 0 1.5-1.8Z'), P('M18 2.5l-3 4h2.5L16 10l3.5-4.5H17Z', 'a', 'blink')]),
  I('court-date', 'hearing calendar trial schedule docket', [R(3, 4.5, 18, 16.5, 2.5), P('M8 3v3M16 3v3M3 9.5h18'), C(7.5, 13.5, 0.9, 'f'), C(10.8, 13.5, 0.9, 'f'), C(7.5, 17, 0.9, 'f'), C(10.8, 17, 0.9, 'f'), R(13.5, 12.5, 4.5, 5.5, 1, 'a', 'pulse')]),
  I('filing-deadline', 'hourglass limitation time due statute', [P('M6 3h12M6 21h12'), P('M7.5 3v2.5c0 2.5 4.5 4 4.5 6.5s-4.5 4-4.5 6.5V21h9v-2.5c0-2.5-4.5-4-4.5-6.5s4.5-4 4.5-6.5V3Z'), P('M9.6 7h4.8c-.6 1.3-2.4 2-2.4 3-.1-1-1.8-1.7-2.4-3Z', 'a', 'sink'), P('M9 19.5c.5-1.8 2-2.5 3-2.5s2.5.7 3 2.5Z', 'a', 'grow')]),
  I('appeal', 'appeal review higher court challenge', [...sdoc(), badge('slide-u', P('M17.5 19.2v-4.4M15.7 16.6l1.8-1.8 1.8 1.8'))]),
  I('injunction', 'stop order halt restraining court', [P(poly(12, 12, 9, 8, -Math.PI / 2 + Math.PI / 8)), R(7, 10.5, 10, 3, 1.5, 'a', 'pulse')]),
  I('testimony', 'testify statement witness speak deposition', [...person(8, 5.5, 5.5), P('M13 4.5a2 2 0 0 1 2-2h4.5a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H17l-2.5 2v-2.1a2 2 0 0 1-1.5-1.9Z', 'a', 'pulse')]),
  I('witness', 'observer testify attest present see', [...person(9, 4.3, 6.5), badge('pulse', P('M15 17c1.4-1.8 3.6-1.8 5 0-1.4 1.8-3.6 1.8-5 0Z'), C(17.5, 17, 0.8, 'f', 'blink'))]),
  I('subpoena', 'summons order court notice demand', [...sdoc(), badge('shake', P('M17.5 14.6v2.8'), C(17.5, 19.4, 0.7, 'f'))]),
  I('cease-desist', 'cease desist letter stop demand notice', [...env, badge('shake', P('M16 15.5l3 3M19 15.5l-3 3'))]),
  I('jurisdiction', 'region venue territory governing law map', [P('M3 6.5l6-2.5 6 2.5 6-2.5V17.5l-6 2.5-6-2.5-6 2.5Z'), P('M9 4v13.5M15 6.5V20'), P('M12 6.5c-2 0-3.5 1.5-3.5 3.4 0 2.4 3.5 5.4 3.5 5.4s3.5-3 3.5-5.4c0-1.9-1.5-3.4-3.5-3.4Z', 'a', 'float'), C(12, 9.9, 1, 'd')]),
  I('precedent', 'case law books library prior ruling', [R(4, 16.5, 16, 4, 1.5), R(5.5, 12, 13, 4, 1.5, 'a', 'float'), R(4.5, 7.5, 15, 4, 1.5), P('M7 16.5v4M15.5 12v4M8.5 7.5v4')]),

  // ---- documents & drafting ----
  I('law-book', 'statute code legislation reference volume', [R(5, 2.5, 14, 19, 2), P('M8.5 2.5v19M11.5 13h4.5M11.5 16h3'), P('M12.5 2.5v6.5l1.75-1.4 1.75 1.4V2.5Z', 'a', 'sink')]),
  I('statute', 'scroll act law decree legislation', [R(6, 6, 12, 12), P('M9 9.5h6M9 12h6M9 14.5h4', 'd', 'draw'), R(4, 3, 16, 3.5, 1.75, 'a'), R(4, 17.5, 16, 3.5, 1.75, 'a')]),
  I('clause', 'section provision paragraph term highlight', [...full('M8.5 8h4M8.5 17h7'), R(7.5, 11, 9, 3.2, 1, 'a', 'breathe')]),
  I('amendment', 'amend revise change contract edit', [...full('M8.5 9h5M8.5 12.5h7M8.5 16h3'), P('M13 20.5l.6-2.6 6.4-6.4 2 2-6.4 6.4Z', 'a', 'wiggle')]),
  I('redline', 'markup strike revision tracked changes', [...full('M8.5 9h7M8.5 16.5h5M8.5 12.5h7'), P('M7.5 13.6l9-2.2', 'a', 'draw')]),
  I('e-signature', 'esign sign digital tablet docusign', [R(4, 2.5, 16, 19, 2.5), P('M7 13c1.5 0 2-5 3.5-5s.5 5 2 5 1.2-2 2.4-2 1 1 2 1', 'a', 'draw'), P('M7 16h10'), C(12, 19, 0.8, 'f')]),
  I('countersign', 'cosign second signature dual approve', [P('M3 8.5c1.5 0 2-4 3.5-4s.5 4 2 4 1-2 2-2'), P('M3 11.5h9'), P('M12 16.5c1.5 0 2-4 3.5-4s.5 4 2 4 1-2 2-2', 'a', 'draw'), P('M12 19.5h9')]),
  I('notary-seal', 'notarize seal official certify embossed', [P('M8.5 13.5 6.8 20.5l2.8-1.2 1.8 1.7 1-5.2Z'), P('M15.5 13.5l1.7 7-2.8-1.2-1.8 1.7-1-5.2Z'), G('pulse', P(star(12, 9.5, 7, 6, 12), 'a'), C(12, 9.5, 3.6, 'd'))]),
  I('sworn-statement', 'attest certify declaration sworn confirm', [...full('M8.5 8.5h5M8.5 11.5h7'), P('M13.2 17.5l-1 3.8 2.3-1 2.3 1-1-3.8Z'), C(14.5, 16, 2.8, 'a', 'pulse')]),
  I('power-of-attorney', 'poa proxy delegate authority representative', [...sdoc(), badge('pulse', C(17.5, 15.6, 1.3, 'd'), P('M15.2 19.6a2.3 2.3 0 0 1 4.6 0'))]),
  I('last-will', 'will testament estate inheritance sealed', [...env, P('M6.5 19.5l2-4.5M10.5 19.5l-1.5-4'), C(17.5, 17, 4.2, 'a', 'pulse'), C(17.5, 17, 2, 'd')]),
  I('legal-notice', 'notice posted announcement bulletin pinned', [R(4.5, 4.5, 15, 16.5, 2), P('M8 10h8M8 13.5h8M8 17h5'), C(12, 4.5, 2, 'a', 'beat')]),
  I('contract-review', 'review inspect due diligence read', [...sdoc(), G('diag', C(16, 15.5, 3.8, 'a'), C(16, 15.5, 2, 'd'), P('M18.8 18.3l2.7 2.7'))]),
  I('consent-form', 'consent opt in agree checkbox gdpr', [...full('M8.5 8.5h5M8.5 11.5h7M14 16h2.5'), R(8, 14, 4, 4, 1, 'a'), P('M9 16l.8.8 1.4-1.5', 'd', 'draw')]),
  I('dpa-agreement', 'data processing agreement processor gdpr', [...sdoc(), badge('pulse', P('M15.3 15.6c0 .7 1 1.2 2.2 1.2s2.2-.5 2.2-1.2M15.3 15.6c0-.7 1-1.2 2.2-1.2s2.2.5 2.2 1.2v2.8c0 .7-1 1.2-2.2 1.2s-2.2-.5-2.2-1.2Z'))]),
  I('erasure-request', 'right to be forgotten delete data gdpr', [...sdoc(), P('M12.5 19.5l6-6a1.4 1.4 0 0 1 2 0l1 1a1.4 1.4 0 0 1 0 2L16 21h-2Z', 'a', 'wiggle')]),
  I('data-subject-request', 'dsar access request personal data gdpr', [...person(8, 6, 5.5), R(14, 2.5, 7.5, 9, 1.5), P('M16 5.5h3.5M16 8h2'), P('M17.75 13.5v5M15.75 16.5l2 2 2-2', 'a', 'slide-d')]),

  // ---- corporate governance ----
  I('company-registry', 'registry register companies house filing records', [R(4, 2.5, 16, 19, 2), P('M4 12h16'), R(9.5, 6, 5, 2, 1, 'a'), G('slide-r', R(9.5, 15.5, 5, 2, 1, 'a'))]),
  I('incorporation', 'incorporate new company formation startup', [P('M2.5 21h19'), R(4.5, 7.5, 11, 13.5, 1.5), P('M8 11h1M11.5 11h1M8 14.5h1M11.5 14.5h1M9 21v-3h2.5v3'), P(spark(18.5, 5.5, 3.5), 'a', 'pulse')]),
  I('shareholder-register', 'cap table shareholders equity owners', [R(3, 3, 13.5, 17, 2), C(6.3, 7.5, 1, 'f'), P('M9 7.5h4.5'), C(6.3, 11.5, 1, 'f'), P('M9 11.5h4.5'), C(6.3, 15.5, 1, 'f'), P('M9 15.5h2'), badge('pop', P(wedge(17.5, 17, 2.6, 0, 120)))]),
  I('board-resolution', 'resolution motion vote approved board', [...sdoc(), badge('pulse', P('M15.6 17l1.3 1.3 2.6-2.8', 'd', 'draw'))]),
  I('meeting-minutes', 'minutes notes record board meeting', [R(4.5, 4, 15, 17.5, 2.5), P('M8.5 2.5v3M12 2.5v3M15.5 2.5v3M8 10.5h8M8 14h8M8 17.5h5'), C(15.8, 17.5, 1.1, 'a', 'blink')]),
  I('bylaws', 'articles charter constitution governance rules', [R(4, 2.5, 13.5, 19, 2), P('M4 7H2.5M4 12H2.5M4 17H2.5M8 8h6M8 11.5h6M8 15h4'), R(16, 5, 4.5, 4, 1.2, 'a', 'slide-r'), R(16, 10.5, 4.5, 4, 1.2)]),
  I('legal-entity', 'entity company structure subsidiary corporation', [cube(12, 12, 9, ['a', 'b', 'b'], 'float')]),
  I('beneficial-owner', 'ubo ownership structure control parent', [C(12, 5, 2.5, 'a', 'pulse'), P('M12 7.5v3M6 13.5v-3h12v3'), R(3, 13.5, 6, 6, 1.5), R(15, 13.5, 6, 6, 1.5)]),
  I('counsel', 'lawyer attorney advisor legal counsel', [...person(9, 3.5, 6.5), G('float', P('M15.5 14.5v-1.2h4v1.2'), R(13, 14.5, 9, 6.5, 1.5, 'a'))]),

  // ---- compliance & risk ----
  I('kyc-identity', 'kyc know your customer identity verify id', [R(2.5, 5, 19, 14, 2.5), C(8.5, 10.5, 2), P('M5.5 16a3 3 0 0 1 6 0M14 10h4.5M14 13.5h3'), P('M4 12h16', 'a', 'scan')]),
  I('kyb-business', 'kyb know your business company verify', [G('pulse', P('M3 7V4.5A1.5 1.5 0 0 1 4.5 3H7M17 3h2.5A1.5 1.5 0 0 1 21 4.5V7M21 17v2.5a1.5 1.5 0 0 1-1.5 1.5H17M7 21H4.5A1.5 1.5 0 0 1 3 19.5V17')), P('M7.5 18V9.5L12 7l4.5 2.5V18Z', 'a'), P('M10 11.5h1M13 11.5h1M10 14.5h1M13 14.5h1')]),
  I('aml-screening', 'aml anti money laundering screen monitor', [C(10, 10, 7), P('M15 15l5.5 5.5'), G('flip', C(10, 10, 3.8, 'a'), P('M10 8v4'))]),
  I('sanctions-screening', 'sanctions ofac embargo list screening', [C(10.5, 10.5, 8), P('M2.5 10.5h16M10.5 2.5c-2.6 2.6-2.6 13.4 0 16M10.5 2.5c2.6 2.6 2.6 13.4 0 16'), badge('pulse', C(17.5, 17, 2.4, 'd'), P('M15.8 18.7l3.4-3.4'))]),
  I('pep-screening', 'pep politically exposed person screening risk', [...person(10, 6.3, 6.5), P('M6.8 5.5 7.3 2.4l1.6 1.4L10 2l1.1 1.8 1.6-1.4.5 3.1Z', 'a', 'float')]),
  I('regulator', 'authority watchdog oversight supervisor agency', [P('M3 8 10 4l7 4Z'), P('M5.5 10v7M10 10v7M14.5 10v7'), R(3, 18.5, 14, 2.5, 1), badge('pulse', P('M15 17c1.4-1.8 3.6-1.8 5 0-1.4 1.8-3.6 1.8-5 0Z'), C(17.5, 17, 0.8, 'f', 'blink'))]),
  I('compliance-checklist', 'compliance checklist controls requirements', [R(4.5, 4, 15, 17.5, 2.5), R(8.5, 2.5, 7, 3.5, 1.2, 'a'), P('M7.5 11l1 1 2-2', 'd', 'draw'), P('M7.5 16l1 1 2-2', 'd', 'draw:.5'), P('M13 11h3.5M13 16h3.5')]),
  I('risk-register', 'risk log register issues severity', [R(3, 3.5, 18, 17, 2.5), P('M7 9h7M7 12.5h7M7 16h7'), C(17, 9, 1.2, 'a', 'blink'), C(17, 12.5, 1.2, 'f'), C(17, 16, 1.2, 'f')]),
  I('risk-matrix', 'heat map likelihood impact risk grid', [R(3, 3, 18, 18, 2.5), P('M9 3v18M15 3v18M3 9h18M3 15h18'), R(16.2, 4.2, 3.6, 3.6, 0.8, 'a', 'pulse'), C(12, 12, 1, 'f')]),
  I('control-test', 'control testing audit sox lab', [P('M10 3h4v6.2l5.3 9.4A1.6 1.6 0 0 1 17.9 21H6.1a1.6 1.6 0 0 1-1.4-2.4L10 9.2Z'), P('M7.4 15h9.2l2.6 4.6c.1.5-.3 1.4-1.3 1.4H6.1c-1 0-1.4-.9-1.3-1.4Z', 'a', 'breathe'), P('M8.5 3h7'), C(11.5, 11.5, 0.8, 'f', 'rise')]),
  I('incident-report', 'incident breach report issue event', [...sdoc(), G('pulse', P('M17.5 12.5l4.5 8h-9Z', 'a'), P('M17.5 15.3v2'), C(17.5, 18.9, 0.6, 'f'))]),
  I('whistleblower', 'whistle speak up report misconduct hotline', [R(8.5, 9, 12.5, 4.5, 1.5), C(8.5, 14.5, 5.5), C(8.5, 14.5, 2, 'a', 'pulse'), P('M13 4l1 2M17 3.5V6M20.5 4.5l-1 1.8', 'd', 'blink')]),
  I('anonymous-report', 'anonymous incognito hotline confidential tip', [P('M3 10.5h18'), P('M7 10.5l1.8-6a1 1 0 0 1 1-.7h4.4a1 1 0 0 1 1 .7l1.8 6Z'), C(7.5, 16, 3, 'a', 'breathe'), C(16.5, 16, 3, 'a', 'breathe'), P('M10.5 16c1-.8 2-.8 3 0')]),
  I('ethics', 'moral compass integrity values conduct', [C(12, 12, 9), P('M12 3v1.5M21 12h-1.5M12 21v-1.5M3 12h1.5'), G('seesaw', X(12, 12, 9), P('M12 5l2.2 7H9.8Z', 'a'), P('M12 19l2.2-7H9.8Z')), C(12, 12, 1, 'f')]),
  I('conflict-of-interest', 'conflict interest overlap disclosure related', [C(9, 12, 6), C(15, 12, 6), P('M12 6.8a6 6 0 0 1 0 10.4 6 6 0 0 1 0-10.4Z', 'a', 'pulse')]),
  I('anti-bribery', 'bribery corruption abc fcpa prohibited', [G('shake', C(12, 12, 5, 'a'), P('M12 9.5v5')), C(12, 12, 8.5, 'd'), P('M6 6l12 12')]),
  I('certification', 'certified iso accredited award compliance', [G('swing', P('M7 2.5h4l2.5 6.5h-4Z'), P('M17 2.5h-4l-2.5 6.5h4Z'), C(12, 14.5, 6, 'a'), P(star(12, 14.5, 3, 1.4), 'd'))]),
  I('compliance-log', 'audit log history trail events record', [P('M7 4v16'), R(10.5, 3.5, 10.5, 3, 1.5), R(10.5, 10.5, 8, 3, 1.5), R(10.5, 17.5, 9.5, 3, 1.5), C(7, 5, 1.5, 'a', 'pulse'), C(7, 12, 1.5, 'f'), C(7, 19, 1.5, 'f')]),
  I('regulatory-update', 'regulation change new rule update bulletin', [...sdoc(), badge('pulse', P(spark(17.5, 17, 2.5), 'd'))]),
  I('data-retention', 'retention policy schedule archive keep', [...box, P('M10 12.5h4l-2 2.5 2 2.5h-4l2-2.5Z', 'a', 'flip')]),
  I('legal-hold', 'litigation hold preserve freeze records', [...box, P('M10 12h4'), badge('pulse', P('M16.3 15.3v3.4M18.7 15.3v3.4'))]),
  I('evidence-bag', 'evidence exhibit forensic sealed proof', [P('M5 6h14v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z'), R(4, 3, 16, 3, 1, 'a', 'breathe'), P('M8.5 11h7M8.5 14h7M8.5 17h4')]),
  I('case-file', 'case folder matter dossier file', [P('M3 6.5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z'), P('M3 9.5h18'), R(13, 13, 5, 3, 1, 'a', 'pulse')]),

  // ---- authorities & money ----
  I('penalty-fine', 'fine penalty ticket sanction charge', [P('M3 5.5h18V10a2 2 0 0 0 0 4v4.5H3V14a2 2 0 0 0 0-4Z'), P('M7.5 8v8', 'd', 'dash'), C(14, 12, 3, 'a', 'flip')]),
  I('tax-authority', 'tax office revenue agency government irs', [P('M3 8 10 4l7 4Z'), P('M5.5 10v7M10 10v7M14.5 10v7'), R(3, 18.5, 14, 2.5, 1), badge('pulse', P('M16 18.5l3-3'), C(16.3, 15.6, 0.6, 'f'), C(18.7, 18.4, 0.6, 'f'))]),
  I('legal-filing', 'file submit filing court registry tray', [P('M3 13h4.5l1.5 2.5h6l1.5-2.5H21v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z'), G('drop', R(7.5, 3, 9, 8.5, 1.5, 'a'), P('M9.8 6h4.4M9.8 8.5h3'))]),
];
