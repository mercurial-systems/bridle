import { R, C, E, P, G, I, X, gear, star, poly, spark, arc, wedge, cube, card } from '../dsl.mjs';

// AI & Automation: one sparkle language (concave four-point star) marks "generated / intelligent" across the set.
const bubble = 'M6 4h12a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-6l-4.5 3.5V17H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z';
const doc = 'M6.5 3h7.5l5 5v11a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z';
const corners = 'M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3';
// small robot head for the badge icons (top-left), badge at bottom-right
const botHead = () => [P('M9.5 5V3'), C(9.5, 2.9, 0.9, 'f', 'blink'), R(3, 5, 13, 10, 3), C(7, 10, 1.1, 'f', 'wink'), C(12, 10, 1.1, 'f', 'wink')];
const badge = (an) => C(18, 17, 4.2, 'a', an);

export default [
  // ---- agents & assistants ----
  I('ai-agent', 'agent bot autonomous assistant robot', [P('M12 8V6.2'), P(spark(12, 4.2, 2.2), 'a', 'pulse'), R(4.5, 8, 15, 11.5, 3.5), P('M3 12.5v3M21 12.5v3'), C(9.5, 13, 1.3, 'f', 'wink'), C(14.5, 13, 1.3, 'f', 'wink'), P('M10 16.5h4')]),
  I('assistant-chat', 'ai chat assistant conversation copilot', [P(bubble), P(spark(12, 10.5, 3.6), 'a', 'pulse')]),
  I('chatbot-bubble', 'bot chat support conversation automated', [P(bubble), R(7, 7.5, 10, 6, 3, 'a'), C(10, 10.5, 1, 'f', 'wink'), C(14, 10.5, 1, 'f', 'wink')]),
  I('ai-robot', 'robot android machine humanoid bot', [C(12, 3.2, 1.2, 'a', 'blink'), P('M12 4.4V6'), R(6.5, 6, 11, 7, 2.5), C(10, 9.5, 1.1, 'f', 'wink'), C(14, 9.5, 1.1, 'f', 'wink'), R(7.5, 14.5, 9, 6.5, 2), P('M4.5 16v3M19.5 16v3'), P('M10.5 17.5h3', 'a')]),
  I('robot-arm', 'industrial automation manipulator factory arm', [R(3, 18, 9, 3, 1.5), G('seesaw', X(7.5, 13, 11.5), P('M7.5 18v-5l6-5.5 4.5 3.5'), C(7.5, 13, 2), C(13.5, 7.5, 2.2, 'a'), P('M18 11l2.5-.5M18 11l.5 2.5', 'd', 'wiggle'))]),
  I('multi-agent', 'agents swarm team orchestration crew', [P('M9.5 7h5M7.5 10l3 4M16.5 10l-3 4', 'd', 'dash'), R(2.5, 4, 7, 6, 2), C(5, 7, 0.8, 'f'), C(7, 7, 0.8, 'f'), R(14.5, 4, 7, 6, 2), C(17, 7, 0.8, 'f'), C(19, 7, 0.8, 'f'), R(8.5, 14, 7, 6, 2, 'a', 'pop'), C(11, 17, 0.8, 'f'), C(13, 17, 0.8, 'f')]),
  I('agent-handoff', 'handoff delegate transfer agent route', [R(2.5, 8, 7, 8, 2), C(5, 11.5, 0.9, 'f'), C(7, 11.5, 0.9, 'f'), G('slide-r', P('M10.8 12h2.4M12 10.5l1.5 1.5-1.5 1.5')), R(14.5, 8, 7, 8, 2, 'a'), C(17, 11.5, 0.9, 'f', 'wink'), C(19, 11.5, 0.9, 'f', 'wink')]),
  I('scheduler-bot', 'scheduled automation cron bot timer', [...botHead(), badge('pulse'), G('spin', X(18, 17, 2.4), P('M18 17v-2.2')), P('M18 17h1.6')]),
  I('integration-bot', 'connector bot sync automation zap', [...botHead(), badge(), G('slide-r', P('M15.6 15.8h4.2l-1.3-1.3')), G('slide-l', P('M20.4 18.2h-4.2l1.3 1.3'))]),
  I('voice-assistant', 'voice speak listen assistant waves', [P(arc(12, 12, 8.5, 45, 135), 'd', 'blink'), P(arc(12, 12, 8.5, 225, 315), 'd', 'blink'), P(spark(12, 12, 5.5), 'a', 'pulse')]),
  I('copilot-pair', 'pair programming copilot human ai together', [C(7.5, 8, 3), P('M2.5 20a5 5 0 0 1 10 0Z'), R(13.5, 4.8, 7, 6.2, 2, 'a', 'float'), C(15.8, 7.9, 0.8, 'f'), C(18.2, 7.9, 0.8, 'f'), P('M11.5 20a5 5 0 0 1 10 0Z')]),
  I('ai-avatar', 'persona digital human profile generated', [C(10, 8, 4), P('M3 20.5a7 7 0 0 1 14 0Z'), P(spark(18.5, 5.5, 3), 'a', 'pulse')]),
  I('human-in-the-loop', 'review approval oversight human loop', [G('spin-slow', X(12, 12, 9), P(arc(12, 12, 9, 25, 155)), P(arc(12, 12, 9, 205, 335)), C(15.8, 3.8, 1, 'f'), C(8.2, 20.2, 1, 'f')), C(12, 9.5, 2.6), P('M7.5 16.5a4.5 4.5 0 0 1 9 0Z', 'a')]),

  // ---- prompts & generation ----
  I('ai-prompt', 'prompt input instruction ask query', [R(2.5, 7.5, 19, 9, 4.5), P('M6.5 12h6'), P('M15 9.8v4.4', 'a', 'blink')]),
  I('prompt-library', 'prompts templates saved collection', [P('M7 5.5V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-.5'), R(4, 6.5, 13, 14.5, 2.5), P(spark(10.5, 13.8, 3.6), 'a', 'pulse')]),
  I('ai-completion', 'autocomplete continue text suggestion', [R(3, 4, 18, 16, 2.5), P('M7 9h10M7 13h5'), P('M14 13h3M7 17h6', 'a', 'draw')]),
  I('ai-writer', 'write generate copy pen draft', [P('M15.5 4.5l4 4L9 19l-5 1 1-5Z'), P('M13.5 6.5l4 4'), P(spark(6, 6, 3), 'a', 'pulse')]),
  I('ai-document', 'generated doc file report ai', [P(doc), P('M14 3v5h5'), P(spark(11.5, 14, 3.6), 'a', 'pulse')]),
  I('ai-summary', 'summarise summarize tldr condense digest', [P('M4 4.5h16M4 8.5h16'), P('M9.5 11.5l2.5 2.5 2.5-2.5', 'd', 'slide-d'), R(4, 16.5, 16, 4, 2, 'a', 'grow-x')]),
  I('ai-translate', 'translate language localize multilingual', [R(2.5, 2.5, 11, 9, 2.5), P('M5.5 9.5l2.5-5 2.5 5M6.5 8h3'), R(10.5, 12.5, 11, 9, 2.5, 'a', 'float'), P('M13.5 15.5h5M13.5 18.5h3.5')]),
  I('image-generation', 'text to image generate picture art', [R(3, 4, 18, 16, 2.5), P('M3.5 17.5l5-5 4 4 2.5-2.5 5.5 5'), P(spark(15.5, 9.5, 3.2), 'a', 'pulse')]),
  I('video-generation', 'text to video generate clip film', [R(2.5, 6, 13, 12, 2.5), P('M15.5 10.5l5-3v9l-5-3Z'), P(spark(9, 12, 3.6), 'a', 'pulse')]),
  I('ai-music', 'generate song audio compose note', [P('M9 17V5l10-2v12'), C(6.5, 17, 2.5), C(16.5, 15, 2.5, 'a', 'beat'), P(spark(4.6, 5, 2.2), 'b', 'blink')]),
  I('code-assistant', 'coding copilot developer generate code', [P('M7.5 6 3 12l4.5 6', 'd', 'slide-l'), P('M16.5 6l4.5 6-4.5 6', 'd', 'slide-r'), P(spark(12, 12, 4.2), 'a', 'pulse')]),
  I('speech-to-text', 'transcribe dictation voice to text', [R(4.5, 3, 6, 10, 3), P('M3 10a4.5 4.5 0 0 0 9 0M7.5 14.5V18M5 18h5'), P('M14.5 7h6.5M14.5 11h6.5M14.5 15h4', 'a', 'draw')]),
  I('text-to-speech', 'read aloud voice synthesis tts', [P('M3 8h6M3 12h6M3 16h3.5'), P('M11.5 9.5h2l3-3v11l-3-3h-2Z'), P(arc(17, 12, 2.5, 30, 150), 'a', 'blink'), P(arc(17, 12, 5, 35, 145), 'a', 'blink:.4')]),

  // ---- models & training ----
  I('ai-model', 'model weights foundation llm network', [cube(12, 12.5, 8, ['a', 'b', 'b'], 'float'), P(spark(19.5, 4.5, 2), 'b', 'blink')]),
  I('model-card', 'model info spec documentation card', [R(3, 4, 18, 16, 2.5), P(poly(8.5, 10, 3, 6), 'a', 'pop'), P('M13.5 8.5h4M13.5 11.5h3M6.5 16h11')]),
  I('fine-tune', 'tune adjust train customise sliders', [P('M6 4v16M12 4v16M18 4v16'), C(6, 14, 2.2), C(12, 8, 2.2, 'a', 'slide-u'), C(18, 15, 2.2, 'b', 'slide-d')]),
  I('training-run', 'train loss curve epochs learning', [R(3, 4, 18, 16, 2.5), P('M6.5 8c1.5 5 4 8 11 8.5', 'a', 'draw'), C(6.5, 8, 1, 'f'), C(17.5, 16.5, 1, 'f', 'blink')]),
  I('ai-dataset', 'dataset data samples corpus records', [R(3, 3, 18, 18, 3), C(8, 8, 1.1, 'f'), C(12, 8, 1.1, 'f'), C(16, 8, 1.1, 'f'), C(8, 12, 1.1, 'f'), C(12, 12, 1.1, 'f'), C(16, 12, 1.1, 'f', 'blink'), C(8, 16, 1.1, 'f'), C(12, 16, 1.1, 'f', 'blink:.6'), C(16, 16, 1.1, 'f')]),
  I('data-labeling', 'label annotate tag ground truth', [P('M3 5.5V11l9.5 9.5a1.5 1.5 0 0 0 2 0l6-6a1.5 1.5 0 0 0 0-2L11 3H5.5A2.5 2.5 0 0 0 3 5.5Z'), C(7.5, 7.5, 1.6, 'a', 'pulse'), P('M10.5 14l2 2 3.5-3.5', 'd', 'draw')]),
  I('bounding-box', 'detection annotate object box vision', [P('M3 10V8.5A1.5 1.5 0 0 1 4.5 7H7M17 7h2.5A1.5 1.5 0 0 1 21 8.5V10M21 18v1.5a1.5 1.5 0 0 1-1.5 1.5H17M7 21H4.5A1.5 1.5 0 0 1 3 19.5V18'), R(3, 2.5, 8, 3.5, 1.2, 'a', 'pop'), C(12, 14, 3.5, 'b', 'float')]),
  I('model-eval', 'evaluation evals test score grade', [R(4, 4.5, 16, 16.5, 2.5), R(8.5, 3, 7, 3, 1.2, 'a'), P('M7.5 11l1.5 1.5 2.5-2.5', 'a', 'draw'), P('M14 11.5h3'), P('M7.5 16.5l1.5 1.5 2.5-2.5', 'a', 'draw:.4'), P('M14 17h3')]),
  I('ai-benchmark', 'benchmark leaderboard rank compare podium', [P(spark(12, 4.5, 2.5), 'a', 'pulse'), R(3, 13, 6, 8, 1.5), R(9, 8.5, 6, 12.5, 1.5, 'a', 'grow'), R(15, 11, 6, 10, 1.5)]),
  I('model-quantize', 'quantize compress smaller optimize', [R(2.5, 5, 11, 14, 2.5), C(5.8, 8.5, 0.9, 'f'), C(10.2, 8.5, 0.9, 'f'), C(5.8, 12, 0.9, 'f'), C(10.2, 12, 0.9, 'f'), C(5.8, 15.5, 0.9, 'f'), C(10.2, 15.5, 0.9, 'f'), P('M15.3 10l2 2-2 2', 'd', 'slide-r'), R(18.5, 10, 3, 4, 1, 'a', 'pop')]),
  I('model-deploy', 'deploy ship serve release model', [P('M12 6.5V2.8M10 4.6l2-2 2 2', 'a', 'slide-u'), cube(12, 14, 6.2, ['a', 'b', 'b'])]),
  I('model-version', 'version branch checkpoint lineage', [P('M7 7v10M7 15c0-4 10-2.5 10-6.5'), C(7, 5, 2), C(7, 19, 2), P(poly(17, 6.5, 2.8, 6), 'a', 'pulse')]),

  // ---- architecture ----
  I('neural-network', 'neural net layers deep learning nodes', [P('M5 8 12 5M5 8l7 7M5 8l7 11M5 16l7-11M5 16l7-1M5 16l7 3M12 5l7 7M12 12l7 0M12 19l7-7', 'd'), C(5, 8, 1.8), C(5, 16, 1.8), C(12, 5, 1.8), C(12, 12, 1.8), C(12, 19, 1.8), C(19, 12, 2.3, 'a', 'pulse')]),
  I('transformer', 'transformer layers stack blocks architecture', [R(5, 3, 14, 4, 1.5), P('M12 7v3M12 14v3', 'd', 'blink'), R(5, 10, 14, 4, 1.5, 'a', 'pulse'), R(5, 17, 14, 4, 1.5)]),
  I('ai-attention', 'attention heads weights focus query', [P('M12 8.5 5 16M12 8.5 10 16M12 8.5 19 16'), P('M12 8.5 14.5 16', 'a', 'draw'), C(12, 6, 2.5, 'a', 'pulse'), R(3, 16, 4, 4, 1), R(8, 16, 4, 4, 1), R(13, 16, 4, 4, 1, 'a'), R(17.5, 16, 4, 4, 1)]),
  I('token-count', 'tokens usage count meter length', [R(3, 4.5, 5, 5, 1.5), R(9.5, 4.5, 5, 5, 1.5), R(16, 4.5, 5, 5, 1.5, 'a', 'pop'), R(3, 13.5, 18, 5, 2.5), R(3, 13.5, 11, 5, 2.5, 'a', 'grow-x')]),
  I('tokenizer', 'tokenize split text pieces chunks', [R(2.5, 8, 19, 8, 2.5), P('M8 8v8', 'a', 'blink'), P('M12.5 8v8', 'a', 'blink:.3'), P('M17 8v8', 'a', 'blink:.6')]),
  I('context-window', 'context length window memory tokens', [R(2.5, 8, 19, 8, 2.5), C(5.5, 12, 1, 'f'), C(9.5, 12, 1, 'f'), C(14.5, 12, 1, 'f'), C(18.5, 12, 1, 'f'), G('slide-r', P('M9 5.5H7.5v13H9M15 5.5h1.5v13H15', 'a'))]),
  I('embedding', 'embedding vector space semantic coordinates', [P('M4 3v17h17'), C(10, 11, 1.2, 'f'), C(13, 15, 1.2, 'f'), C(18, 12.5, 1.2, 'f'), P('M4 20 15 8', 'a', 'draw'), C(16, 7, 2, 'a', 'pulse')]),
  I('latent-space', 'latent space orbit representation cluster', [G('spin-slow', X(12, 12, 9.5), E(12, 12, 9.5, 3.8, 'd'), E(12, 12, 3.8, 9.5, 'd'), C(21.5, 12, 1, 'f'), C(12, 2.5, 1, 'f')), C(12, 12, 2.6, 'a', 'pulse')]),
  I('vector-database', 'vector store index similarity search db', [P('M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6Z'), E(12, 6, 7, 3, 'a'), G('diag', P('M8.5 17.5 15 11M12 11h3v3'))]),
  I('ai-retrieval', 'rag retrieval search documents context', [R(3, 3, 12, 16, 2.5), P('M6.5 7.5h5M6.5 11h3'), C(15.5, 15, 4, 'a', 'pulse'), P('M18.5 18l2.5 2.5')]),
  I('knowledge-graph', 'graph entities relations ontology links', [P('M6.5 7.3 9.8 10M17.5 7.3 14.2 10M6.5 16.7l3.3-2.7M17.5 16.7 14.2 14', 'd', 'dash'), C(5, 6, 2), C(19, 6, 2), C(5, 18, 2), C(19, 18, 2), C(12, 12, 3, 'a', 'pulse')]),
  I('brain-circuit', 'brain intelligence circuit mind cognition', [P('M12 4.5a3 3 0 0 0-5.5 1.2A3.5 3.5 0 0 0 4 10a3.5 3.5 0 0 0 1 5.5 3.5 3.5 0 0 0 4 4 3 3 0 0 0 3-1Z'), P('M12 7.5h3l2 2M12 12h5M12 16.5h3l2-2'), C(18.5, 10.5, 1.4, 'a', 'blink'), C(18.5, 13.5, 1.4, 'a', 'blink:.5'), P('M9 9.5a2 2 0 0 0-2 2', 'h')]),
  I('reasoning-chain', 'chain of thought steps reasoning think', [P('M6 15v-3h3M12 9V6h3', 'd', 'dash'), R(3, 15, 6, 6, 2), R(9, 9, 6, 6, 2), R(15, 3, 6, 6, 2, 'a', 'pop')]),
  I('agent-memory', 'memory recall store remember ram', [R(2.5, 5, 19, 11, 2), R(5, 7.5, 4, 6, 1, 'a', 'breathe'), R(10, 7.5, 4, 6, 1), R(15, 7.5, 4, 6, 1), P('M5.5 16v3M9 16v3M12.5 16v3M16 16v3M19 16v3')]),
  I('agent-tools', 'tools toolkit capabilities functions agent', [P('M14 3.2a5 5 0 0 0-4.6 6.6l-6 6a2 2 0 0 0 2.8 2.8l6-6a5 5 0 0 0 6.6-4.6l-2.6 2.6-2.8-.4-.4-2.8Z', 'b', 'tilt'), P(spark(18.5, 17.5, 3.2), 'a', 'pulse')]),
  I('tool-call', 'function call invoke tool api agent', [P('M8 4a3 3 0 0 0-3 3v3l-2 2 2 2v3a3 3 0 0 0 3 3'), G('spin', P(gear(15.5, 12, 5.5, 4, 6), 'a')), C(15.5, 12, 1.7, 'd')]),

  // ---- automation ----
  I('automation-flow', 'workflow automation pipeline steps nodes', [P('M10 6.5h4a3 3 0 0 1 3 3V10M14 17.5h-4a3 3 0 0 1-3-3V14', 'd', 'dash'), R(3, 4, 7, 5, 1.5), R(13.5, 10, 7.5, 4.5, 1.5, 'a', 'pop'), R(3, 15, 7, 5, 1.5)]),
  I('automation-trigger', 'trigger event start automation instant', [C(12, 12, 9), P('M13.2 5.5 7.8 13h4l-1 5.5 5.4-7.5h-4Z', 'a', 'pop')]),
  I('agent-loop', 'loop iterate cycle agent repeat', [G('spin-slow', X(12, 12, 8.5), P(arc(12, 12, 8.5, 20, 160)), P(arc(12, 12, 8.5, 200, 340)), C(14.9, 4, 1.1, 'f'), C(9.1, 20, 1.1, 'f')), P(spark(12, 12, 4.2), 'a', 'pulse')]),
  I('ai-guardrails', 'guardrails limits policy boundaries safe', [R(3, 6, 18, 5, 2), P('M6.5 11v9M17.5 11v9'), P(spark(12, 16, 3.2), 'a', 'float')]),
  I('safety-filter', 'moderation filter content safety block', [P('M3 4h14l-5.5 6.5V17l-3 2v-8.5Z'), P('M17.5 12.5l3.5 1.3v2.7c0 2.2-1.5 3.9-3.5 4.6-2-.7-3.5-2.4-3.5-4.6v-2.7Z', 'a', 'pulse')]),
  I('hallucination', 'warning wrong confabulation unreliable error', [P('M10.3 4.5a2 2 0 0 1 3.4 0l7.5 13a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3Z'), P(spark(12, 14.3, 3.4), 'a', 'wiggle')]),
  I('temperature-dial', 'temperature creativity randomness knob setting', [P(arc(12, 13, 8, -120, 120)), G('seesaw', X(12, 13, 6), P('M12 13l3.5-4.5', 'a')), C(12, 13, 2.2), C(5.1, 17, 0.9, 'f'), C(18.9, 17, 0.9, 'f', 'blink')]),

  // ---- perception & analysis ----
  I('ocr-scan', 'ocr text recognition scan extract', [P(corners), P('M8 9h8M8 12h8M8 15h5'), P('M5 12h14', 'a', 'scan')]),
  I('computer-vision', 'vision see detect image recognition', [P('M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z'), G('wink', C(12, 12, 3.5, 'a'), C(12, 12, 1.2, 'f'))]),
  I('face-recognition', 'face id biometric detect identify', [P(corners), C(12, 10, 3.2), P('M6.5 18a5.5 5.5 0 0 1 11 0'), P('M5 12h14', 'a', 'scan')]),
  I('ai-classify', 'classify categorise sort label buckets', [P('M12 7.5v3M6 13v-2.5h12V13'), C(12, 5, 2.5, 'a', 'pulse'), R(3, 13, 6, 7, 1.5), C(6, 16.5, 1.2, 'f'), R(15, 13, 6, 7, 1.5), P('M16.8 18 18 15.5l1.2 2.5Z', 'f')]),
  I('sentiment-analysis', 'sentiment emotion mood opinion tone', [C(11, 13, 8), C(8, 11, 1.1, 'f'), C(14, 11, 1.1, 'f'), P('M7.5 15a4 4 0 0 0 7 0', 'd', 'draw'), P(spark(19, 5, 2.8), 'a', 'pulse')]),
  I('ai-recommendation', 'recommend suggest for you picks personalised', [P('M9 6V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1'), R(3, 7, 13, 14, 2.5), P(star(9.5, 14, 3.8, 1.7), 'a', 'pop')]),
  I('ai-forecast', 'forecast predict projection future trend', [P('M3 3v18h18'), P('M6 16l3.5-3.5 3 2 2-2'), P('M14.5 12.5 19 7', 'a', 'draw'), P(spark(19, 7, 2.2), 'a', 'pulse')]),
  I('anomaly-detection', 'anomaly outlier spike detect monitor', [P('M3 15h5l1.5-2 1.5 2h1.5l2-9 2 9h2l1.5-1.5 1 1.5H21'), C(14, 6, 1.8, 'a', 'ping'), C(14, 6, 1.2, 'f')]),
  I('ai-lookup', 'ai search smart find semantic query', [C(10.5, 10.5, 7), P(spark(10.5, 10.5, 3.6), 'a', 'pulse'), P('M15.6 15.6l5 5')]),

  // ---- compute & ops ----
  I('ai-gpu', 'gpu graphics card accelerator compute', [R(2.5, 5, 19, 11, 2), G('spin-fast', X(9, 10.5, 3.6), C(9, 10.5, 3.6, 'a'), P('M9 10.5 9.9 7.4M9 10.5l2.4 2.1M9 10.5l-3.2.7')), P('M15 8v5M18 8v5'), P('M6 16v3M9 16v3M12 16v3M15 16v3')]),
  I('gpu-cluster', 'cluster compute nodes datacenter training', [P('M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4', 'd', 'dash'), R(3, 3, 7, 7, 1.5), R(14, 3, 7, 7, 1.5), R(3, 14, 7, 7, 1.5), R(14, 14, 7, 7, 1.5, 'a', 'pulse')]),
  I('inference-server', 'inference serving endpoint host model', [R(3, 3, 14, 7.5, 2), R(3, 13, 11, 7.5, 2), C(6.5, 6.75, 1, 'f', 'blink'), P('M10 6.75h4'), C(6.5, 16.75, 1, 'f', 'blink:.6'), badge('pulse'), P(spark(18, 17, 2.4), 'd')]),
  I('api-usage-meter', 'usage quota meter rate limit consumption', [P('M3 16a9 9 0 0 1 18 0v1.5A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5Z'), G('seesaw', X(12, 16, 5), P('M12 16l3.5-4.5', 'a')), C(12, 16, 1.1, 'f'), P('M6.5 13.5l1 .6M12 9.5v1.2M17.5 13.5l-1 .6')]),

  // ---- sparkle family ----
  I('sparkle-single', 'sparkle magic ai shine new', [P(spark(12, 12, 9.5), 'a', 'pulse'), C(19.5, 4.5, 1, 'f', 'blink')]),
  I('sparkle-burst', 'sparkle burst magic glow highlight', [P('M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6', 'd', 'breathe'), P(spark(12, 12, 5.5), 'a', 'pulse')]),
  I('sparkle-circle', 'ai button magic badge circle', [C(12, 12, 9), P(spark(12, 12, 5.2), 'a', 'pulse')]),
  I('sparkle-square', 'ai app tile magic square', [R(3, 3, 18, 18, 4.5), P(spark(12, 12, 5.2), 'a', 'pulse')]),
  I('ai-magic-wand', 'magic wand auto enhance generate', [P('M3.6 18.4 13.4 8.6a1.4 1.4 0 0 1 2 2L5.6 20.4a1.4 1.4 0 0 1-2-2Z'), P('M11.5 10.5l2 2'), P(spark(17.5, 6.5, 3.8), 'a', 'pulse'), P(spark(8, 4.5, 1.6), 'b', 'blink'), P(spark(19.5, 14.5, 1.4), 'b', 'blink:.5')]),
  I('ai-cursor', 'ai pointer smart click select', [P('M4.5 4.5 19 10l-6 2.2-2.4 6.1Z'), P(spark(17.5, 17.5, 3.5), 'a', 'pulse')]),
];
