import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card, coin } from '../dsl.mjs';

// NFT marketplace, creator studio, games and metaverse. Abstract glyphs only: no game, console or marketplace marks.
const n = (v) => +v.toFixed(2);
// framed artwork: frame + mountain line + sun dot
const art = (x, y, s, role = 'b', an) => {
  const k = s - 4;
  return G(an, R(x, y, s, s, 2, role),
    P(`M${n(x + 2)} ${n(y + s - 2.5)}l${n(k * 0.35)} ${n(-k * 0.4)} ${n(k * 0.3)} ${n(k * 0.3)} ${n(k * 0.15)} ${n(-k * 0.15)} ${n(k * 0.2)} ${n(k * 0.25)}`),
    C(n(x + s - 3.3), n(y + 3.3), 0.9, 'f'));
};
// heart, s = half width
const heart = (cx, cy, s) => {
  const r = n(s * 0.54);
  return `M${cx} ${n(cy + s * 0.95)}L${n(cx - s * 0.85)} ${n(cy + s * 0.05)}A${r} ${r} 0 0 1 ${cx} ${n(cy - s * 0.6)}A${r} ${r} 0 0 1 ${n(cx + s * 0.85)} ${n(cy + s * 0.05)}Z`;
};
const gem = (cx, cy, s) =>
  `M${n(cx - s)} ${n(cy - s * 0.4)}L${n(cx - s * 0.5)} ${n(cy - s)}H${n(cx + s * 0.5)}L${n(cx + s)} ${n(cy - s * 0.4)}L${cx} ${n(cy + s)}Z`;
const chip = (cx, cy, r, role, an) => G(an, C(cx, cy, r, role), C(cx, cy, n(r * 0.6), 'd'),
  P(`M${cx} ${n(cy - r)}v${n(r * 0.4)}M${cx} ${n(cy + r)}v${n(-r * 0.4)}M${n(cx - r)} ${cy}h${n(r * 0.4)}M${n(cx + r)} ${cy}h${n(-r * 0.4)}`));
const pad = 'M8 6.5h8a5 5 0 0 1 4.8 3.7l.9 3.5a3 3 0 0 1-5.1 2.7L15 15H9l-1.6 1.4a3 3 0 0 1-5.1-2.7l.9-3.5A5 5 0 0 1 8 6.5Z';

export default [
  // ---- NFT marketplace + creator studio ----
  I('collection-page', 'nft collection profile banner items', [R(3, 3, 18, 18, 2.5), P('M3 9h18'), R(6, 13, 3, 5, 1), R(10.5, 13, 3, 5, 1), R(15, 13, 3, 5, 1), C(7.5, 9, 2.5, 'a', 'pop')]),
  I('creator-studio', 'canvas easel create artist editor', [P('M8 21l2-6M16 21l-2-6M12 15v6'), R(4, 3, 16, 12, 2), P('M7 12.5l3-3.5 2.5 2.5 1.5-1.5 3 2.5', 'd', 'draw'), C(15.5, 6.8, 1.4, 'a', 'pulse')]),
  I('mint-button', 'mint create nft button click', [R(2.5, 5, 17, 9, 4.5), P('M11 7v5M8.5 9.5h5'), P('M15 12l6 2.4-2.6 1-1 2.6Z', 'a', 'slide-u')]),
  I('edition-count', 'editions supply copies series multiple', [R(9, 3, 11, 13, 2), R(6, 5.5, 11, 13, 2), art(3, 8, 11), G('pop', C(18, 18, 3.6, 'a'), P('M16.8 16.8l2.4 2.4M19.2 16.8l-2.4 2.4'))]),
  I('one-of-one', 'unique 1/1 artwork single original', [R(3, 3, 18, 18, 2.5), P('M9.5 9 11.5 7.5V17M9.5 17h4'), P(spark(16.5, 8, 2.6), 'a', 'pulse')]),
  I('generative-grid', 'generative art algorithm pattern grid', [C(6, 6, 2.2), R(10, 4, 4, 4, 1), C(18, 6, 2.2, 'a', 'pulse'), R(4, 10, 4, 4, 1), C(12, 12, 2.2, 'a', 'pulse:.4'), R(16, 10, 4, 4, 1), C(6, 18, 2.2), R(10, 16, 4, 4, 1), C(18, 18, 2.2, 'a', 'pulse:.8')]),
  I('metadata-json', 'metadata json token uri attributes', [P('M7 3h7.5L19.5 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z'), P('M14.5 3v5h5Z', 'a'), P('M10 11h-.5a1 1 0 0 0-1 1v1l-1 1 1 1v1a1 1 0 0 0 1 1h.5M14 11h.5a1 1 0 0 1 1 1v1l1 1-1 1v1a1 1 0 0 1-1 1H14'), C(12, 14, 0.9, 'f', 'blink')]),
  I('nft-traits', 'traits attributes properties metadata list', [R(3, 4, 18, 16, 2.5), C(7, 8.5, 1.3, 'a', 'pop'), P('M10 8.5h7.5', 'd', 'draw'), C(7, 12, 1.3, 'a', 'pop:.3'), P('M10 12h5', 'd', 'draw:.3'), C(7, 15.5, 1.3, 'a', 'pop:.6'), P('M10 15.5h6', 'd', 'draw:.6')]),
  I('rarity-rank', 'rarity rank score tier rare', [R(3, 15, 5, 6, 1.2, 'b', 'grow'), R(9.5, 12.5, 5, 8.5, 1.2, 'b', 'grow:.3'), R(16, 10.5, 5, 10.5, 1.2, 'b', 'grow:.6'), P(gem(18.5, 6, 3.2), 'a', 'pulse')]),
  I('blind-box', 'reveal mystery box unrevealed surprise', [R(4.5, 11, 15, 10, 1.5), P('M10.2 13.8a1.9 1.9 0 1 1 2.6 1.8c-.5.2-.8.6-.8 1.1v.3'), C(12, 19, 0.9, 'f', 'blink'), G('float', R(3, 7, 18, 4, 1.5, 'a'), P('M12 7c-1-2.5-4-2.5-3.5-.5M12 7c1-2.5 4-2.5 3.5-.5'))]),
  I('nft-listing', 'list for sale price tag nft', [art(3, 3, 13), P('M12.5 16.5l3.5-3.5h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5Z', 'a', 'swing'), C(15.6, 16.5, 0.9, 'f')]),
  I('nft-delist', 'delist cancel listing unlist remove sale', [art(3, 3, 13), G('pop', C(17.5, 17.5, 4, 'a'), P('M15.3 19.7l4.4-4.4'))]),
  I('nft-offer', 'offer make bid price proposal', [P('M5 3.5h14a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2h-7l-4.5 4v-4H5a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z'), coin(12, 9.8, 3.6, 'a', 'pulse')]),
  I('collection-offer', 'collection offer floor bid any item', [R(8, 3, 13, 13, 2), art(3, 7, 13), coin(18, 18, 3.6, 'a', 'pop')]),
  I('nft-bid', 'bid auction gavel hammer place', [G('tilt', P('M10.5 3.5l6 6-3 3-6-6Z'), P('M10.5 9.5 4.5 15.5')), R(12, 18, 9, 3, 1.2, 'a')]),
  I('auction-timer', 'auction countdown hourglass ending time', [P('M6 3h12M6 21h12'), P('M7 3h10v3.5a5 5 0 0 1-2.5 4.3L13 12l1.5 1.2A5 5 0 0 1 17 17.5V21H7v-3.5a5 5 0 0 1 2.5-4.3L11 12l-1.5-1.2A5 5 0 0 1 7 6.5Z'), P('M9.5 6.5h5L12 9.5Z', 'a', 'blink'), P('M9 19.5c0-1.5 1.5-3 3-3s3 1.5 3 3Z', 'a', 'grow')]),
  I('floor-sweep', 'sweep floor buy cheapest bulk broom', [G('wiggle', P('M20 3 13.6 9.4'), P('M11.6 8.6l2.8 2.8-2.8 5.6L6 11.4Z'), P('M9.6 14.2 8.2 15.6M11.2 12.6 9.8 14')), G('slide-l', R(2.5, 16.5, 3.5, 4.5, 1, 'a'), R(7.5, 18, 3.5, 3.5, 1, 'a'))]),
  I('royalty-split', 'royalties creator fee split share percent', [P(wedge(11, 13, 8, 90, 360)), P(wedge(13, 11, 8, 0, 90), 'a', 'pulse')]),
  I('creator-earnings', 'artist revenue payout income palette', [P('M12 3a9 9 0 0 0 0 18c1.4 0 2-1 1.5-2.2-.6-1.3.3-2.8 1.8-2.8H18a3 3 0 0 0 3-3c0-5.5-4-10-9-10Z'), C(7.5, 11, 1.2, 'f'), C(9.5, 7, 1.2, 'f'), C(14, 6.5, 1.2, 'f'), coin(18.5, 18.5, 3.2, 'a', 'pop')]),
  I('verified-collection', 'verified authentic official collection badge', [art(3, 3, 13), P(star(17.5, 17.5, 4.5, 3.7, 10), 'a', 'pulse'), P('M15.8 17.5l1.2 1.2 2.2-2.4', 'd', 'draw')]),
  I('gallery-wall', 'gallery exhibition wall art display', [P('M3 20.5h18'), R(3, 6, 7, 8, 1.5), R(12, 3.5, 9, 11, 1.5, 'a', 'pop'), P('M6.5 6V4M16.5 3.5V2.5'), C(6.5, 17, 0.9, 'f'), C(16.5, 17.5, 0.9, 'f', 'blink')]),
  I('showcase-frame', 'showcase featured frame display highlight', [R(3, 3, 18, 18, 2), R(6.5, 6.5, 11, 11, 1, 'a', 'breathe'), P('M8.5 15l2.5-3 1.8 1.8 1.2-1.2 1.5 2.4')]),
  I('nft-transfer', 'send nft transfer gift move', [art(3, 5.5, 13), G('slide-r', P('M17 12h4.5M19 9.5l2.5 2.5-2.5 2.5', 'a'))]),
  I('burn-redeem', 'burn to redeem claim physical swap', [P('M6.5 20.5c-2 0-3.5-1.6-3.5-3.6 0-2.4 1.8-3.7 2.6-6 .9 1.2 1.6 1.7 2.2 2 .2-2.3 1.2-4.3 2.4-5.4.2 2.6 1.8 4.2 1.8 7.2 0 3.3-2 5.8-5.5 5.8Z', 'a', 'flicker'), P('M11.8 14h2.5M13.3 12.3l1.7 1.7-1.7 1.7', 'd', 'slide-r'), R(15.5, 12.5, 6, 8, 1.2), R(15, 10, 7, 2.8, 1), P('M18.5 12.8v7.7')]),
  I('phygital-tag', 'phygital nfc physical digital twin tag', [P('M3 12l6-6.5h10.5a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5H9Z'), C(8, 12, 1.2, 'f'), P('M13 9.5a3.5 3.5 0 0 1 0 5', 'a', 'blink'), P('M16 8a6 6 0 0 1 0 8', 'd', 'blink:.4')]),
  I('membership-pass', 'membership pass access holder club', [R(3, 5, 18, 14, 2.5), P('M10.5 7.5h3'), C(8, 11.5, 2.2, 'a', 'pulse'), P('M5 17a3 3 0 0 1 6 0M13.5 11h4.5M13.5 14.5h3')]),
  I('ticket-nft', 'ticket event admission nft entry', [P('M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4Z'), P('M15 7.5v9', 'd', 'dash'), P(poly(9, 12, 3, 6), 'a', 'pulse')]),
  I('attendance-badge', 'attendance proof event badge collectible', [P('M9 14.5 7 21l2.5-1.2 1.7 1.9.8-5.4Z'), P('M15 14.5l2 6.5-2.5-1.2-1.7 1.9-.8-5.4Z'), C(12, 9.5, 6.5), C(12, 9.5, 4, 'a'), P(spark(12, 9.5, 2.4), 'b', 'pulse')]),
  I('pfp-hex', 'pfp profile picture avatar nft hexagon', [P(poly(12, 12, 9.5, 6)), C(12, 10, 2.8, 'a', 'float'), P('M7.5 17a5 5 0 0 1 9 0')]),
  I('allowlist', 'allowlist whitelist presale spots access', [R(4, 4, 16, 17, 2.5), C(8, 10, 1, 'f'), P('M10.5 10h6'), C(8, 13.5, 1, 'f'), P('M10.5 13.5h6'), C(8, 17, 1, 'f'), P('M10.5 17h4', 'd', 'draw'), R(9, 2.5, 6, 3, 1, 'a', 'pop')]),

  // ---- games ----
  I('gamepad', 'gamepad play console joypad gaming', [P(pad), P('M8 9.2v3.6M6.2 11h3.6'), C(15.5, 10, 1.1, 'a', 'blink'), C(17.5, 12, 1.1, 'a', 'blink:.4')]),
  I('arcade-stick', 'joystick arcade retro fight stick', [R(3, 13, 18, 8, 2.5), C(14.5, 17, 1.2, 'f', 'blink'), C(17.5, 17, 1.2, 'f', 'blink:.4'), G('tilt', P('M8 13V8.5'), C(8, 6.5, 2.8, 'a'))]),
  I('handheld-console', 'handheld portable game device', [R(5, 2.5, 14, 19, 2.5), R(7.5, 5, 9, 7, 1, 'a', 'breathe'), P('M9 15v3M7.5 16.5h3'), C(15.5, 15.5, 1, 'f'), C(13.8, 17.8, 1, 'f')]),
  I('quest-scroll', 'quest mission task objective scroll', [P('M6 5a2 2 0 0 1 2-2h11a2 2 0 0 1 0 4h-1v12a2 2 0 0 1-2 2H5a2 2 0 0 1 0-4h1Z'), G('pulse', P('M12 8.5v4.5', 'a'), C(12, 16, 1.1, 'a'))]),
  I('quest-log', 'journal missions book tasks progress', [R(4, 3, 15, 18, 2), P('M7.5 3v18M10.5 12h5.5M10.5 15h4'), P('M13 3v6l1.75-1.4L16.5 9V3Z', 'a', 'slide-d')]),
  I('achievement', 'unlock badge reward accomplishment milestone', [P(star(12, 12, 9.5, 7.8, 12)), P(star(12, 12.4, 5, 2.2), 'a', 'pop')]),
  I('xp-bar', 'experience points progress level meter', [R(2.5, 9, 19, 6, 3), R(4, 10.5, 10, 3, 1.5, 'a', 'grow-x'), P('M18 10.5v3'), P(spark(18, 5.5, 2.4), 'a', 'pulse')]),
  I('level-up', 'level up rank promote upgrade chevrons', [C(12, 12, 9.5), P('M8 12l4-4 4 4', 'a', 'slide-u'), P('M8 16.5l4-4 4 4', 'd', 'slide-u:.3')]),
  I('leaderboard-podium', 'leaderboard ranking podium top winners', [R(9, 9, 6, 12, 1.2, 'a', 'grow'), R(3, 13, 6, 8, 1.2), R(15, 16, 6, 5, 1.2), P(star(12, 4.8, 2.6, 1.1), 'b', 'pulse')]),
  I('season-pass', 'season pass battle tiers rewards track', [R(3, 4, 18, 16, 2.5), P('M6 8.5h7M6 14.5h12'), C(6, 14.5, 1.4, 'a', 'pop'), C(10, 14.5, 1.4, 'a', 'pop:.3'), C(14, 14.5, 1.4, 'f'), C(18, 14.5, 1.4, 'f'), P(spark(17, 8.5, 2), 'a', 'pulse')]),
  I('loot-chest', 'loot box chest reward drop treasure', [G('float', P('M4 10V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2Z')), R(4, 10, 16, 10, 1.5), P('M8 10v10M16 10v10'), R(10.5, 8.5, 3, 4, 1, 'a', 'pulse')]),
  I('inventory-grid', 'inventory items slots bag storage', [R(3, 3, 4.6, 4.6, 1, 'a', 'pop'), R(9.7, 3, 4.6, 4.6, 1), R(16.4, 3, 4.6, 4.6, 1), R(3, 9.7, 4.6, 4.6, 1), R(9.7, 9.7, 4.6, 4.6, 1, 'a', 'pop:.4'), R(16.4, 9.7, 4.6, 4.6, 1), R(3, 16.4, 4.6, 4.6, 1), R(9.7, 16.4, 4.6, 4.6, 1), R(16.4, 16.4, 4.6, 4.6, 1, 'a', 'pop:.8')]),
  I('wearable-skin', 'skin wearable outfit cosmetic shirt', [P('M8.5 3.5 4 5.5 2.5 10l3 1.5L7 10v10.5h10V10l1.5 1.5 3-1.5L20 5.5l-4.5-2a3.5 3.5 0 0 1-7 0Z'), P(spark(12, 13.5, 3), 'a', 'pulse')]),
  I('game-avatar', 'player character avatar profile hero', [G('float', C(12, 8.5, 4.5), P('M9.5 8.5h5')), P('M4 21a8 8 0 0 1 16 0Z', 'a')]),
  I('class-mage', 'character class wizard mage hat magic', [P('M5.5 16c2.5-2 4-7 6.5-13.5 1.5 5 3.5 10.5 6.5 13.5Z'), E(12, 17.5, 9, 2.5), P(star(12, 11, 2, 0.9), 'a', 'pulse')]),
  I('class-knight', 'character class warrior knight helmet tank', [P('M5 20v-8a7 7 0 0 1 14 0v8Z'), P('M12 5V2.5M12 14v6'), R(7, 10.5, 10, 2.6, 1.3, 'a', 'blink')]),
  I('guild-banner', 'guild clan team banner crest', [P('M4 4h16'), G('wave', P('M6 4h12v15l-6-3.5L6 19Z'), P(poly(12, 10, 3, 4), 'a'))]),
  I('game-party', 'party squad team group players', [C(5.5, 10, 2.5), C(18.5, 10, 2.5), P('M2.5 19a3 3 0 0 1 6 0Z'), P('M15.5 19a3 3 0 0 1 6 0Z'), G('float', C(12, 8, 3, 'a'), P('M6.5 20.5a5.5 5.5 0 0 1 11 0Z', 'a'))]),
  I('tournament-bracket', 'tournament bracket competition matches esports', [P('M3 4h5v5H3M3 15h5v5H3M8 6.5h4v11H8M12 12h4'), C(18.5, 12, 2.6, 'a', 'pulse')]),
  I('prize-pool', 'prize pool jackpot rewards pot', [E(12, 16, 9, 4.5), P('M5 15.5c2 1.2 4.5 1.8 7 1.8s5-.6 7-1.8'), C(8.5, 7, 3, 'a', 'drop'), C(15.5, 5.5, 3, 'a', 'drop:.6')]),
  I('wager-chips', 'wager bet stake chips game', [chip(8.5, 13, 5.5, 'b'), chip(15.5, 11, 5.5, 'a', 'float')]),
  I('provably-fair', 'provably fair dice random verifiable roll', [R(3, 4, 13, 13, 2.5), C(6.5, 7.5, 1.1, 'f'), C(9.5, 10.5, 1.1, 'f'), C(12.5, 13.5, 1.1, 'f'), P(poly(17.5, 17.5, 4.2, 6), 'a', 'pulse'), P('M15.8 17.6l1.1 1.1 2-2.2', 'd', 'draw')]),
  I('spin-wheel', 'spin wheel prize lucky fortune', [G('spin', X(12, 13, 8), C(12, 13, 8), P(wedge(12, 13, 8, 0, 45), 'a'), P(wedge(12, 13, 8, 180, 225), 'a'), P('M12 5v16M4 13h16M6.3 7.3l11.4 11.4M17.7 7.3 6.3 18.7')), C(12, 13, 1.4, 'f'), P('M10.3 2.5h3.4L12 5.5Z')]),
  I('land-parcel', 'land plot parcel metaverse real estate', [P('M3 11v2.5l9 5V16Z'), P('M21 11v2.5l-9 5V16Z'), P('M12 6l9 5-9 5-9-5Z'), P('M7.5 8.5l9 5'), P('M12 2.5a2.5 2.5 0 0 1 2.5 2.5c0 2-2.5 4-2.5 4S9.5 7 9.5 5A2.5 2.5 0 0 1 12 2.5Z', 'a', 'float')]),
  I('metaverse-map', 'world map metaverse districts virtual', [P('M3 6l5.5-2 7 2.5L21 4.5v13.5l-5.5 2-7-2.5L3 19.5Z'), P('M8.5 4v13.5M15.5 6.5v13.5'), C(12, 11, 1.6, 'a', 'pulse')]),
  I('metaverse-portal', 'portal gateway teleport warp dimension', [E(12, 12, 6.5, 9), E(12, 12, 3.5, 6, 'a', 'pulse'), P(spark(19.5, 5, 1.8), 'b', 'blink'), P(spark(4.5, 18.5, 1.4), 'b', 'blink:.5')]),
  I('metaverse-headset', 'vr virtual reality goggles immersive', [P('M6 8V6.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2V8'), P('M4 8h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-4l-2-2.5h-4L8 17H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z'), R(5, 10.3, 14, 2.4, 1.2, 'a', 'blink')]),
  I('vr-room', 'virtual room space immersive 3d scene', [P('M3 21l5.5-5h7l5.5 5Z'), R(8.5, 5, 7, 11, 1), P('M3 3l5.5 2M21 3l-5.5 2'), C(12, 8.5, 1.6, 'a', 'float'), P('M10 14.5v-1.5a2 2 0 0 1 4 0v1.5', 'a')]),
  I('model-3d', '3d asset model mesh object render', [cube(12, 11.5, 6.5, ['a', 'b', 'b'], 'float'), P('M3.5 14.5c0 2.2 3.8 4 8.5 4s8.5-1.8 8.5-4', 'd', 'dash')]),
  I('crafting-anvil', 'craft forge anvil upgrade item hammer', [P('M4 11h13c0 2-1.5 3-3.5 3.5V17h2.5v3H8v-3h2.5v-2.5C7 14 4 13 4 11Z'), G('tilt', P('M12.5 5.5 16 2l2.5 2.5L15 8Z', 'a'), P('M16.8 6.2 20.5 10')), P(spark(7, 7, 1.8), 'b', 'blink')]),
  I('game-market-stall', 'marketplace stall shop vendor booth', [R(4, 14, 16, 6.5, 1.5), P('M5.5 10.8V14M18.5 10.8V14'), P('M4.5 4h15L21 8.5a2.25 2.25 0 0 1-4.5 0 2.25 2.25 0 0 1-4.5 0 2.25 2.25 0 0 1-4.5 0 2.25 2.25 0 0 1-4.5 0Z', 'a', 'breathe')]),
  I('gem-currency', 'gems premium currency diamonds in-game', [P(gem(12, 12, 8), 'a', 'pulse'), P('M4 8.8h16M8 8.8 12 20l4-11.2M9 4l3 4.8L15 4'), P(spark(19.5, 18, 1.8), 'b', 'blink')]),
  I('game-coin', 'gold coin in-game currency credits', [G('flip', C(12, 12, 9), C(12, 12, 6, 'a'), P(star(12, 12, 3.2, 1.4), 'd'))]),
  I('energy-stamina', 'energy stamina boost charge power', [C(12, 12, 9.5), P('M13 5 7.5 13h4.5l-1 6 5.5-8H12Z', 'a', 'blink')]),
  I('health-bar', 'health hp hit points life meter', [P(heart(12, 8.6, 5.4), 'a', 'beat'), R(3, 16, 18, 5, 2.5), P('M5.5 18.5h8', 'd', 'grow-x')]),
  I('rpg-armor', 'armor shield defense protection gear', [P('M4 4h16v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11Z'), P('M12 4v3.5M12 14.5V20'), P(poly(12, 11, 3.2, 4), 'a', 'pulse')]),
  I('rpg-sword', 'sword weapon attack blade combat', [P('M18.5 3H21v2.5L10 16.5 7.5 14Z'), P('M18.8 5.2 9.5 14.5'), P('M5 13.5 6.5 12l5.5 5.5-1.5 1.5Z', 'a', 'pulse'), P('M8.2 15.8 4.5 19.5'), C(4, 20, 1.2, 'f')]),
  I('magic-orb', 'magic orb crystal ball spell mana', [P('M7 21l1.5-3.5h7L17 21Z'), C(12, 10.5, 7, 'a', 'breathe'), P(spark(13, 11.5, 2.6), 'd', 'pulse'), P('M8.5 8a4 4 0 0 1 3-2.5', 'h')]),
  I('treasure-map', 'treasure map x marks spot route hunt', [R(3, 4, 18, 16, 2.5), P('M6.5 16c2-4 5 0 7-3', 'd', 'dash'), C(6.5, 16, 1, 'f'), P('M15 6l3.5 3.5M18.5 6 15 9.5', 'a', 'pulse')]),
  I('power-up', 'power up boost buff upgrade', [R(4, 4, 16, 16, 4), P('M12 17V8M8 11.5l4-4 4 4', 'a', 'slide-u'), P(spark(17, 17, 1.4), 'b', 'blink')]),
  I('respawn', 'respawn revive restart extra life', [G('spin-slow', X(12, 12, 8.5), P(arc(12, 12, 8.5, 30, 330)), P('M6.3 7.33 7.75 4.64 4.7 4.55')), P(heart(12, 12.4, 3.6), 'a', 'beat')]),
  I('game-checkpoint', 'checkpoint save progress flag stage', [P('M4.5 21h6M7.5 21V3'), G('wave', P('M7.5 4h12l-2.5 3.5L19.5 11h-12Z', 'a'), P('M11.5 4v7M15.5 4v7'))]),
  I('boss-skull', 'boss enemy battle danger skull raid', [P('M12 3a8 8 0 0 0-8 8c0 2.5 1.2 4.3 3 5.5V20h10v-3.5c1.8-1.2 3-3 3-5.5a8 8 0 0 0-8-8Z'), C(9, 11.5, 1.9, 'a', 'blink'), C(15, 11.5, 1.9, 'a', 'blink'), P('M10.5 17v3M13.5 17v3')]),
  I('health-potion', 'potion flask elixir heal consumable', [P('M9 3h6'), P('M10 3h4v5.5l4.8 7.8A3 3 0 0 1 16.2 21H7.8a3 3 0 0 1-2.6-4.7L10 8.5Z'), P('M6.4 14.5h11.2l1.5 2.4A2 2 0 0 1 17.4 20H6.6a2 2 0 0 1-1.7-3.1Z', 'a', 'breathe'), C(12, 11.5, 0.9, 'f', 'rise')]),
  I('aim-crosshair', 'aim crosshair shooter scope reticle', [C(12, 12, 7.5), P('M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4'), C(12, 12, 1.8, 'a', 'pulse')]),
  I('lives', 'lives hearts health remaining hp', [P(heart(16, 8, 3.4)), P(heart(9.5, 13.5, 5.2), 'a', 'beat'), P('M18 15.5v4M16 17.5h4')]),
  I('card-pack', 'trading cards pack booster collectible', [R(10, 3, 10, 15, 2), R(4, 6, 10, 15, 2), P(spark(9, 13.5, 3), 'a', 'pulse')]),
  I('play-to-earn', 'play to earn rewards gaming income', [P('M7 4.5h6a4 4 0 0 1 3.8 3l.7 2.8a2.3 2.3 0 0 1-3.9 2.1L12.5 11h-5l-1.1 1.4a2.3 2.3 0 0 1-3.9-2.1l.7-2.8A4 4 0 0 1 7 4.5Z'), P('M6.5 6.5v2.6M5.2 7.8h2.6'), coin(17.5, 17.5, 4, 'a', 'flip')]),
  I('gaming-headset', 'headset headphones voice chat mic', [P('M4 14v-2a8 8 0 0 1 16 0v2'), R(3, 13, 4.5, 7, 2), R(16.5, 13, 4.5, 7, 2), P('M7.5 18.5c2 1.5 3.5 2 5 2'), C(13.5, 20.5, 1.2, 'a', 'blink')]),
  I('matchmaking', 'match versus opponent pvp lobby queue', [C(5.5, 8, 2.5), P('M2.2 17a3.3 3.3 0 0 1 6.6 0Z'), C(18.5, 8, 2.5), P('M15.2 17a3.3 3.3 0 0 1 6.6 0Z'), P('M9.2 12.5h5.6', 'd', 'dash'), P(spark(12, 12.5, 3.4), 'a', 'pulse')]),
];
