import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

// shared silhouettes
const BUB = 'M6 4h12a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-6l-4.5 3.5V17H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z';
const RB = 'M12 3.5c4.7 0 8.5 3.4 8.5 7.6s-3.8 7.6-8.5 7.6c-1.1 0-2.1-.2-3.1-.5L4.5 20.5l1.2-4.1C4.3 15 3.5 13.1 3.5 11.1c0-4.2 3.8-7.6 8.5-7.6Z';
const HS = 'M5.6 3.5h2.6a1 1 0 0 1 .95.68l1.1 3.3a1 1 0 0 1-.3 1.07L8.3 10.1a11 11 0 0 0 5.6 5.6l1.55-1.65a1 1 0 0 1 1.07-.3l3.3 1.1a1 1 0 0 1 .68.95v2.6a2 2 0 0 1-2.1 2A17 17 0 0 1 3.6 5.6a2 2 0 0 1 2-2.1Z';
const SPK = 'M3.5 9.5h3l5-4.2v13.4l-5-4.2h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z';
const BELL = 'M12 3.5a5.8 5.8 0 0 0-5.8 5.8v3.6L4.5 16v.7h15V16l-1.7-3.1V9.3A5.8 5.8 0 0 0 12 3.5Z';
const TRAY = 'M2.5 14h5.5a4 4 0 0 0 8 0h5.5v4a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 18Z';
const env = () => [R(2.5, 4, 17, 12, 2), P('M3.5 5.5l7 5.2 7-5.2')];
const mic = (role, an) => [R(8.5, 2.5, 7, 12, 3.5, role, an), P('M5.5 11a6.5 6.5 0 0 0 13 0'), P('M12 17.5v3.5M8.5 21h7')];

export default [
  // ---- messaging ----
  I('chat-typing', 'typing indicator message writing reply live', [R(4, 4.5, 17, 11, 5.5), C(4.5, 18.5, 1.6), C(8.5, 10, 1.2, 'a', 'slide-u'), C(12.5, 10, 1.2, 'a', 'slide-u:.2'), C(16.5, 10, 1.2, 'a', 'slide-u:.4')]),
  I('chat-group', 'group chat conversation team messages channel', [P('M11 3h8a2.5 2.5 0 0 1 2.5 2.5v5A2.5 2.5 0 0 1 19 13v2.8L16 13h-5a2.5 2.5 0 0 1-2.5-2.5v-5A2.5 2.5 0 0 1 11 3Z', 'a', 'float'), P('M5 9h8a2.5 2.5 0 0 1 2.5 2.5v5A2.5 2.5 0 0 1 13 19H9l-3.5 2.5V19H5a2.5 2.5 0 0 1-2.5-2.5v-5A2.5 2.5 0 0 1 5 9Z'), P('M6 13h6M6 16h3.5')]),
  I('chat-thread', 'thread replies conversation nested discussion', [P('M5 3h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9l-3 2.3V11H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z'), P('M6.5 7h7'), P('M6 14.5V16a2 2 0 0 0 2 2h4', 'd', 'draw'), R(12, 15, 9, 6, 2.5, 'a', 'pop')]),
  I('message-reply', 'reply respond answer back chat', [P(BUB), P('M10.5 7.5l-3 3 3 3M7.5 10.5H14a2.5 2.5 0 0 1 2.5 2.5v.5', 'a', 'slide-l')]),
  I('message-forward', 'forward share pass on chat resend', [P(BUB), P('M13.5 7.5l3 3-3 3M16.5 10.5H10a2.5 2.5 0 0 0-2.5 2.5v.5', 'a', 'slide-r')]),
  I('mention', 'at sign tag username handle notify', [C(12, 12, 3.4, 'a', 'pulse'), P('M15.4 12v1.4a2.6 2.6 0 0 0 5.2 0V12a8.6 8.6 0 1 0-3.5 6.9', 'd', 'draw')]),
  I('hashtag', 'hash topic tag channel trending pound', [R(3, 3, 18, 18, 5, 'a'), G('wiggle', P('M10.5 7l-1.5 10M15 7l-1.5 10M7.5 10h10M6.5 14h10'))]),
  I('emoji', 'smile face reaction happy emoticon', [C(12, 12, 9), C(9, 10, 1.1, 'f', 'blink'), C(15, 10, 1.1, 'f', 'blink'), P('M8 14a4.6 4.6 0 0 0 8 0', 'a', 'draw')]),
  I('sticker', 'sticker peel emoji decal reaction', [P('M6 3h12a3 3 0 0 1 3 3v8l-7 7H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z'), C(8.5, 9, 1, 'f'), C(13.5, 9, 1, 'f'), P('M8 12.5a3.6 3.6 0 0 0 5.5.5'), P('M21 14h-4.5a2.5 2.5 0 0 0-2.5 2.5V21Z', 'a', 'tilt')]),
  I('voice-note', 'voice message audio memo recording chat', [P(BUB), P('M7 9.5v2', 'd', 'grow'), P('M9.5 8v5', 'd', 'grow:.2'), P('M12 6.5v8', 'a', 'grow:.4'), P('M14.5 8v5', 'd', 'grow:.6'), P('M17 9.5v2', 'd', 'grow:.8')]),
  I('chat-help', 'question help support faq ask bubble', [P(RB), G('wiggle', P('M9.8 8.8a2.3 2.3 0 1 1 3.2 2.1c-.6.3-1 .8-1 1.4v.3', 'a'), C(12, 15, 1, 'a'))]),
  I('read-receipt', 'seen read delivered double tick message', [P(BUB), P('M6 10.5l2.2 2.2 4.6-5', 'd', 'draw'), P('M11.2 12.2l.5.5 4.6-5', 'a', 'draw:.3')]),

  // ---- calls ----
  I('call-incoming', 'phone call incoming receive ringing answer', [P(HS), P('M20 4l-5.5 5.5M14.5 5v4.5H19', 'a', 'slide-d')]),
  I('call-outgoing', 'phone call outgoing dial place call', [P(HS), P('M14.5 9.5 20 4M15.5 4H20v4.5', 'a', 'diag')]),
  I('call-missed', 'missed call phone unanswered log', [P(HS), P('M13.5 4.5l3.5 3.5 4-4M18 4h3v3', 'a', 'shake')]),
  I('phone-off', 'hang up call ended disconnected phone', [P(HS), P('M3 3l18 18', 'a', 'draw')]),
  I('voicemail', 'voicemail message tape recording phone', [C(7, 13, 3.8), C(17, 13, 3.8, 'a', 'pulse'), P('M7 16.8h10')]),
  I('conference-call', 'speakerphone meeting conference audio bridge', [P('M3 15.5c0-1.9 4-3.5 9-3.5s9 1.6 9 3.5v1.5c0 1.9-4 3.5-9 3.5s-9-1.6-9-3.5Z'), C(12, 7, 1.6, 'a', 'pulse'), P(arc(12, 7, 3.5, 45, 135), 'd', 'blink'), P(arc(12, 7, 3.5, 225, 315), 'd', 'blink'), P(arc(12, 7, 6.5, 50, 130), 'd', 'blink:.3'), P(arc(12, 7, 6.5, 230, 310), 'd', 'blink:.3')]),
  I('call-hold', 'hold call pause phone waiting', [P(HS), P('M16 4v5.5M19.5 4v5.5', 'a', 'blink')]),
  I('call-transfer', 'transfer call forward route phone', [P(HS), P('M14 5h6.5M18.5 3l2 2-2 2', 'a', 'slide-r'), P('M20.5 9.5H14M16 7.5l-2 2 2 2', 'a', 'slide-l')]),
  I('dialpad', 'keypad dial numbers phone keys', [C(7, 4.5, 1.3, 'f'), C(12, 4.5, 1.3, 'f'), C(17, 4.5, 1.3, 'f'), C(7, 9.5, 1.3, 'f'), C(12, 9.5, 1.3, 'f'), C(17, 9.5, 1.3, 'f'), C(7, 14.5, 1.3, 'f'), C(12, 14.5, 1.3, 'f'), C(17, 14.5, 1.3, 'f'), C(12, 19.5, 1.7, 'a', 'pulse')]),
  I('phone-ringing', 'ringing phone call incoming vibrate', [G('wiggle', P(HS)), P('M14 7a3 3 0 0 1 3 3', 'a', 'blink'), P('M14 3.5a6.5 6.5 0 0 1 6.5 6.5', 'a', 'blink:.3')]),

  // ---- mail ----
  I('mail-open', 'open envelope read letter email', [P('M3 10l7.8-5.6a2 2 0 0 1 2.4 0L21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z'), R(6.5, 6, 11, 9, 1, 'a', 'rise'), P('M3 11l9 5.5 9-5.5v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z')]),
  I('paper-plane', 'send message email submit dispatch', [G('diag', P('M3.5 10.5 20.5 3.5 15 20.5l-3.8-6.7Z'), P('M20.5 3.5 11.2 13.8 3.5 10.5Z', 'a'))]),
  I('inbox-full', 'inbox mail full unread messages tray', [R(7, 3, 10, 4, 1), R(5.5, 8.5, 13, 4, 1, 'a', 'drop'), P(TRAY)]),
  I('outbox', 'outbox sent mail tray outgoing', [P(TRAY), P('M2.5 14l2-5h2M21.5 14l-2-5h-2'), G('slide-u', P('M12 12V3.5', 'a'), P('M8.5 7 12 3.5 15.5 7', 'a'))]),
  I('spam', 'junk mail spam unwanted email warning', [...env(), G('shake', C(18, 17, 4.2, 'a'), P('M18 15v2.3'), C(18, 19.3, 0.8, 'f'))]),
  I('mail-draft', 'draft email compose write unsent', [...env(), G('pulse', C(18, 17, 4.2, 'a'), P('M16.2 18.8h1.2l2.7-2.7-1.2-1.2-2.7 2.7Z'))]),
  I('paperclip', 'attachment attach file clip email', [P('M15 7.5l-6.3 6.3a1.8 1.8 0 0 0 2.6 2.6l7-7a4 4 0 0 0-5.7-5.7l-7 7a6.2 6.2 0 0 0 8.8 8.8l5.6-5.6', 'a', 'tilt')]),
  I('newsletter', 'newsletter digest bulletin news subscription', [R(3, 4, 14, 16, 2), P('M17 8h2.5A1.5 1.5 0 0 1 21 9.5V18a2 2 0 0 1-4 0Z'), R(6, 7, 8, 4, 1, 'a', 'pop'), P('M6 14h8M6 17h5', 'd', 'draw')]),
  I('mass-mail', 'bulk email campaign blast many letters', [R(6, 3, 15, 11, 2, 'a'), G('float', R(3, 8, 15, 11, 2), P('M3.5 9.5l7 5 7-5', 'd', 'draw'))]),
  I('mailbox', 'mailbox post letterbox delivery flag', [P('M7 6h10a4 4 0 0 1 4 4v8H3v-8a4 4 0 0 1 4-4Z'), P('M7 6a4 4 0 0 1 4 4v8M14 18v3.5'), G('swing', P('M17 3v9'), R(17, 3, 3.5, 2.8, 0.6, 'a'))]),

  // ---- notifications ----
  I('bell-off', 'mute notifications silent do not disturb', [P(BELL), P('M10 19.5a2.2 2.2 0 0 0 4 0'), P('M3.5 3.5l17 17', 'a', 'draw')]),
  I('bell-ringing', 'notification ringing alert reminder alarm', [G('ring', P(BELL), P('M10 19.5a2.2 2.2 0 0 0 4 0')), P('M3 8.5a9 9 0 0 1 2.4-4.6', 'a', 'blink'), P('M21 8.5a9 9 0 0 0-2.4-4.6', 'a', 'blink')]),
  I('bullhorn', 'loudhailer announce shout megaphone marketing', [P('M3 9.5h4.5l9-5v14l-9-5H3Z'), P('M6 13.5 7 19h2.5l-.5-5'), E(17, 11.5, 2, 7, 'a', 'pulse'), P('M21 9v5', 'd', 'blink')]),
  I('broadcast', 'broadcast waves signal transmit live', [C(12, 12, 2.2, 'a', 'pulse'), P(arc(12, 12, 5, 45, 135), 'd', 'blink'), P(arc(12, 12, 5, 225, 315), 'd', 'blink'), P(arc(12, 12, 8.5, 50, 130), 'd', 'blink:.3'), P(arc(12, 12, 8.5, 230, 310), 'd', 'blink:.3')]),
  I('radio-tower', 'antenna tower transmitter signal radio', [P('M12 9.5 7.5 21M12 9.5l4.5 11.5M9.3 16.5h5.4'), C(12, 8, 2, 'a', 'pulse'), P(arc(12, 8, 4.5, 50, 130), 'd', 'blink'), P(arc(12, 8, 4.5, 230, 310), 'd', 'blink'), P(arc(12, 8, 7.5, 50, 130), 'd', 'blink:.3'), P(arc(12, 8, 7.5, 230, 310), 'd', 'blink:.3')]),
  I('rss-feed', 'feed subscribe syndication updates blog', [R(3, 3, 18, 18, 4.5), C(8, 16, 1.5, 'a', 'pulse'), P('M7.5 11a5.5 5.5 0 0 1 5.5 5.5', 'd', 'blink'), P('M7.5 6.5a10 10 0 0 1 10 10', 'd', 'blink:.3')]),
  I('notification-dot', 'badge unread app notification new', [R(3, 5, 16, 16, 4), P('M7 12h7M7 15.5h4'), C(18.5, 5.5, 3, 'a', 'pulse')]),
  I('satellite-dish', 'satellite dish uplink signal receiver', [P('M4.5 9.5 14.5 19.5A7.1 7.1 0 0 1 4.5 9.5Z'), P('M9.5 14.5l4-4'), C(14, 10, 1.4, 'a', 'pulse'), P(arc(14, 10, 4.5, 0, 90), 'd', 'blink'), P(arc(14, 10, 7.5, 0, 90), 'd', 'blink:.3')]),

  // ---- media ----
  I('play', 'play start media video audio resume', [C(12, 12, 9), P('M10 8.3v7.4a.6.6 0 0 0 .9.5l5.6-3.7a.6.6 0 0 0 0-1L10.9 7.8a.6.6 0 0 0-.9.5Z', 'a', 'pulse')]),
  I('pause', 'pause media hold break player', [C(12, 12, 9), G('breathe', R(8.5, 7.5, 2.5, 9, 1, 'a'), R(13, 7.5, 2.5, 9, 1, 'a'))]),
  I('stop', 'stop media end halt player', [C(12, 12, 9), R(8, 8, 8, 8, 1.8, 'a', 'pop')]),
  I('record', 'record rec capture live media', [C(12, 12, 9), C(12, 12, 4.5, 'a', 'beat')]),
  I('skip-forward', 'next track skip forward media', [G('slide-r', P('M4 6.2v11.6a1 1 0 0 0 1.6.8l8.2-5.8a1 1 0 0 0 0-1.6L5.6 5.4a1 1 0 0 0-1.6.8Z')), R(17, 5, 3, 14, 1.2, 'a')]),
  I('skip-back', 'previous track skip back media', [R(4, 5, 3, 14, 1.2, 'a'), G('slide-l', P('M20 6.2v11.6a1 1 0 0 1-1.6.8l-8.2-5.8a1 1 0 0 1 0-1.6l8.2-5.8a1 1 0 0 1 1.6.8Z'))]),
  I('shuffle', 'shuffle random mix order playlist', [P('M3 7h3.5c5 0 6 10 11 10H20'), P('M3 17h3.5c5 0 6-10 11-10H20'), G('slide-r', P('M18 4.5 20.5 7 18 9.5', 'a'), P('M18 14.5l2.5 2.5-2.5 2.5', 'a'))]),
  I('repeat', 'repeat loop replay again cycle', [P('M4 11V9.5A2.5 2.5 0 0 1 6.5 7H19'), P('M20 13v1.5a2.5 2.5 0 0 1-2.5 2.5H5'), P('M16.5 4.5 19 7l-2.5 2.5', 'a', 'slide-r'), P('M7.5 19.5 5 17l2.5-2.5', 'a', 'slide-l')]),
  I('volume-up', 'volume loud sound speaker audio', [P(SPK), P('M15 9a4 4 0 0 1 0 6', 'a', 'blink'), P('M17.8 6.3a8 8 0 0 1 0 11.4', 'a', 'blink:.3')]),
  I('volume-down', 'volume quiet low sound audio', [P(SPK), P('M15 9.5a3.5 3.5 0 0 1 0 5', 'a', 'blink')]),
  I('volume-mute', 'mute silent no sound audio off', [P(SPK), P('M15 9.5l5 5M20 9.5l-5 5', 'a', 'shake')]),
  I('microphone', 'mic voice record speak audio input', [...mic('a', 'pulse')]),
  I('mic-off', 'mute microphone muted silent voice off', [...mic('b'), P('M4 3.5l16 17', 'a', 'draw')]),
  I('listen', 'headset audio listen music support', [P('M4 15v-3a8 8 0 0 1 16 0v3'), R(3, 13.5, 5, 7.5, 2, 'a', 'pulse'), R(16, 13.5, 5, 7.5, 2, 'a', 'pulse:.3')]),
  I('speaker', 'loudspeaker audio sound hifi woofer', [R(5, 2.5, 14, 19, 3), C(12, 7, 1.5, 'f'), C(12, 15, 3.6, 'a', 'beat')]),
  I('camera', 'photo camera picture snapshot capture', [P('M4.5 7.5h2.6l1.5-2.4a1.5 1.5 0 0 1 1.3-.6h4.2a1.5 1.5 0 0 1 1.3.6l1.5 2.4h2.6a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2Z'), G('pop', C(12, 13.5, 3.8, 'a'), C(12, 13.5, 1.4, 'd')), C(18, 10.5, 0.9, 'f', 'blink')]),
  I('video-camera', 'video record camcorder film recording', [R(2.5, 6, 13, 12, 2.5), P('M15.5 10.5l4.6-2.8a.9.9 0 0 1 1.4.8v7a.9.9 0 0 1-1.4.8l-4.6-2.8Z', 'a'), C(6, 9.5, 1, 'f', 'blink')]),
  I('image', 'photo picture image landscape media', [R(3, 4, 18, 16, 2.5), C(8.5, 9, 1.8, 'a', 'pulse'), P('M3 17l5-5 4 4 3-3 6 6')]),
  I('gallery', 'photos album images collection media library', [R(6, 3, 15, 12, 2, 'a'), G('float', R(3, 7, 15, 13, 2.5), C(7.5, 11, 1.3, 'f'), P('M3.5 18l4.5-4 3 2.5 3-3 4 4'))]),
  I('film-strip', 'film movie cinema reel frames', [R(4, 2.5, 16, 19, 2), P('M8 2.5v19M16 2.5v19'), C(6, 6, 0.8, 'f'), C(6, 10, 0.8, 'f'), C(6, 14, 0.8, 'f'), C(6, 18, 0.8, 'f'), C(18, 6, 0.8, 'f'), C(18, 10, 0.8, 'f'), C(18, 14, 0.8, 'f'), C(18, 18, 0.8, 'f'), R(10, 8, 4, 8, 1, 'a', 'pop')]),
  I('clapperboard', 'clapper movie scene take production video', [R(3, 10, 18, 11, 2), P('M3 14h18'), G('tilt', R(3, 5.5, 18, 3.5, 1, 'a'), P('M8 5.5l-2 3.5M13 5.5l-2 3.5M18 5.5l-2 3.5'))]),
  I('music', 'music notes song audio melody', [G('float', P('M9 6l11-2.5v3L9 9Z', 'a'), P('M9 9v8.5M20 6.5v9'), C(6.5, 17.5, 2.5), C(17.5, 15.5, 2.5))]),
  I('playlist', 'playlist queue tracks songs list', [P('M3 6h12M3 11h12M3 16h7'), G('float', P('M19 18V8.5c1.2 0 2.5.8 2.5 2'), C(16.5, 18, 2.5, 'a'))]),
  I('podcast', 'podcast audio show episode broadcast', [C(12, 10.5, 2.2, 'a', 'pulse'), P('M9.17 14a4.5 4.5 0 1 1 5.66 0', 'd', 'blink'), P('M6.71 16.5a8 8 0 1 1 10.58 0', 'd', 'blink:.3'), P('M12 14v7')]),
  I('live-stream', 'live stream broadcast streaming on air', [R(3, 5, 18, 13, 2.5), P('M8 21h8'), C(12, 11.5, 2, 'a', 'pulse'), P(arc(12, 11.5, 4.5, 50, 130), 'd', 'blink'), P(arc(12, 11.5, 4.5, 230, 310), 'd', 'blink')]),
  I('screen-share', 'share screen present cast display', [R(3, 4, 18, 13, 2.5), P('M9 21h6M12 17v4'), G('slide-u', P('M12 14V8', 'a'), P('M9 10.5l3-3 3 3', 'a'))]),
  I('meeting-cam', 'web camera video chat meeting lens', [C(12, 10, 7), C(12, 10, 3, 'a', 'pulse'), C(16.5, 6.5, 0.8, 'f', 'blink'), P('M12 17v3.5M7.5 20.5h9')]),
  I('equalizer', 'equalizer levels audio mixer sound bars', [R(4, 11, 3, 9, 1.2, 'b', 'grow'), R(8.5, 5, 3, 15, 1.2, 'a', 'grow:.3'), R(13, 8, 3, 12, 1.2, 'b', 'grow:.6'), R(17.5, 13, 3, 7, 1.2, 'b', 'grow:.9')]),
  I('vinyl', 'record vinyl album disc music', [G('spin-slow', X(11, 13, 8.5), C(11, 13, 8.5), C(11, 13, 5.5, 'd'), C(11, 13, 2.5, 'a'), P(arc(11, 13, 7, 300, 345), 'h')), P('M20.5 3v6l-4 4.5')]),
  I('subtitles', 'captions closed captions cc transcript', [R(2.5, 5, 19, 14, 2.5), P('M6 11h5M13.5 11H18M16.5 14.5H18'), P('M6 14.5h8', 'a', 'draw')]),

  // ---- collaboration ----
  I('comment', 'comment note remark discussion feedback', [P(RB), P('M8 9.5h8'), P('M8 13h5', 'a', 'draw')]),
  I('annotation', 'annotate markup note review document', [R(3, 3, 13, 17, 2), P('M6.5 8h6M6.5 11.5h4'), P('M14 12h6a1.5 1.5 0 0 1 1.5 1.5v4A1.5 1.5 0 0 1 20 19h-2.5L15 21v-2h-1a1.5 1.5 0 0 1-1.5-1.5v-4A1.5 1.5 0 0 1 14 12Z', 'a', 'pop')]),
  I('whiteboard', 'whiteboard brainstorm sketch canvas collaborate', [R(2.5, 3.5, 19, 13, 2), P('M7 16.5 5.5 21M17 16.5l1.5 4.5'), P('M6 12c1.5-3 3-4 4-2.5s1 3.5 2.5 1.5 2.5-4 5-3', 'a', 'draw')]),
  I('feedback', 'feedback review rating opinion bubble', [P(BUB), P(star(12, 10.5, 4, 1.8), 'a', 'pop')]),
  I('poll', 'poll vote results options bars', [R(3, 4, 12, 3.5, 1.5, 'b', 'grow-x'), R(3, 10, 18, 3.5, 1.5, 'a', 'grow-x:.3'), R(3, 16, 8, 3.5, 1.5, 'b', 'grow-x:.6')]),
  I('survey', 'survey form questionnaire checklist responses', [R(3, 3.5, 4.5, 4.5, 1.2, 'a'), P('M4.2 5.8l1 1 1.6-1.8', 'd', 'draw'), R(3, 9.75, 4.5, 4.5, 1.2), R(3, 16, 4.5, 4.5, 1.2), P('M10.5 5.75h10M10.5 12h8M10.5 18.25h9')]),
  I('translate', 'translate language localize multilingual i18n', [R(2.5, 3, 11, 11, 2.5), P('M5.5 6.5h5M8 5.2v1.3M9.6 6.5c-.6 2.3-2 3.6-4 4.3'), R(10.5, 10, 11, 11, 2.5, 'a', 'pop'), P('M13.5 18.5l2.5-6 2.5 6M14.3 16.5h3.4')]),
  I('quote', 'quote citation testimonial blockquote saying', [P('M4 18v-4.5C4 9.8 5.8 7.2 9.5 6l.8 1.8C8.2 8.8 7.3 10.3 7.2 12H10v6Z'), P('M13.5 18v-4.5c0-3.7 1.8-6.3 5.5-7.5l.8 1.8c-2.1 1-3 2.5-3.1 4.2h2.8v6Z', 'a', 'pop')]),
  I('sticky-note', 'sticky note memo post it reminder', [R(3, 5, 18, 16, 1.5), P('M7 11h10M7 14.5h10M7 18h6'), R(8.5, 3, 7, 4, 0.8, 'a', 'swing')]),
  I('reactions', 'react emoji like love response', [C(10, 13.5, 7.5), C(7.5, 12, 1, 'f'), C(12.5, 12, 1, 'f'), P('M7 16a3.6 3.6 0 0 0 6 0'), P('M18 9.5c-1.8-1.2-3.5-2.6-3.5-4.3a1.75 1.75 0 0 1 3.5-.6 1.75 1.75 0 0 1 3.5.6c0 1.7-1.7 3.1-3.5 4.3Z', 'a', 'beat')]),
];
