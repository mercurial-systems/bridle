import { R, C, E, P, G, I, X, S, gear, star, poly, arc, cube } from '../dsl.mjs';

const r2 = (v) => +v.toFixed(2);
const at = (cx, cy, r, a) => [r2(cx + r * Math.sin((a * Math.PI) / 180)), r2(cy - r * Math.cos((a * Math.PI) / 180))];
// clockwise arc a0→a1 (deg, 0 = up) with an arrowhead at the end (or the start when back = true)
function arcArrow(cx, cy, r, a0, a1, back = false, h = 2.2) {
  const a = back ? a0 : a1, rad = (a * Math.PI) / 180, s = back ? -1 : 1;
  const tip = at(cx, cy, r, a), dir = [Math.cos(rad) * s, Math.sin(rad) * s];
  const wing = (k) => {
    const c = Math.cos(k), sn = Math.sin(k), bx = -dir[0], by = -dir[1];
    return [r2(tip[0] + h * (bx * c - by * sn)), r2(tip[1] + h * (bx * sn + by * c))];
  };
  return `${arc(cx, cy, r, a0, a1)}M${wing(0.75).join(' ')}L${tip.join(' ')}L${wing(-0.75).join(' ')}`;
}
// laurel branch: stem arc plus leaf strokes leaning toward the tip
function laurel(cx, cy, r, angles, lean) {
  return angles.map((a) => {
    const p = at(cx, cy, r, a), q = at(cx, cy, r + 2.3, a + lean);
    return `M${p.join(' ')}L${q.join(' ')}`;
  }).join('');
}
const CLOUD = 'M7 19a4 4 0 0 1-.8-7.9A6 6 0 0 1 17.7 9.6 4.7 4.7 0 0 1 17 19Z';

export default [
  // ---- networking & regions ----
  I('cloud-region-map', 'region map geography cloud location', [R(3, 4, 18, 16, 2.5), P('M3 12.5c3-.6 5 1.4 8 .9s4.5-3 10-2.4M12.2 4c-1.4 3-.4 5.6 0 9.2s-1 4.6-1 6.8'), C(7.5, 8.3, 1.9, 'a', 'pulse'), C(16.5, 16.3, 1.1, 'f', 'blink')]),
  I('availability-zones', 'az zones redundancy datacenter region', [R(2.5, 4, 19, 16, 3), P('M9 4v16M15 4v16'), C(5.75, 12, 1.2, 'f', 'blink'), C(12, 12, 1.9, 'a', 'pulse'), C(18.25, 12, 1.2, 'f', 'blink:.6')]),
  I('multi-cloud', 'clouds providers multiple vendor portability', [G('float', S(0.6, 8.4, 1, P(CLOUD))), G('float:.8', S(0.62, 1.4, 8.6, P(CLOUD, 'a')))]),
  I('hybrid-cloud', 'on premise datacenter split mixed infrastructure', [P('M12 5.5h6.5a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H7a4 4 0 0 1-.8-7.9A6 6 0 0 1 12 5.5Z'), P('M12 5.5h6.5a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H12Z', 'a'), P('M14.5 10h3.5M14.5 14.5h3.5'), C(8.5, 14, 1, 'f', 'blink')]),
  I('edge-network', 'edge pop points presence latency distributed', [P('M2.5 21a9.5 9.5 0 0 1 19 0Z'), C(5, 15.5, 1.7, 'a', 'pulse'), C(12, 11.5, 1.7, 'a', 'pulse:.4'), C(19, 15.5, 1.7, 'a', 'pulse:.8'), P('M9.2 7.4a4 4 0 0 1 5.6 0M7 5a7 7 0 0 1 10 0', 'd', 'blink')]),
  I('vpc-network', 'vpc private network boundary isolated', [P('M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3'), R(6.5, 7, 5, 5, 1.3), R(12.5, 12, 5, 5, 1.3, 'a', 'pop'), P('M11.5 9.5H15V12')]),
  I('subnet-block', 'subnet cidr range network segment', [R(3, 3, 18, 18, 3), R(9.5, 9.5, 9.5, 9.5, 2), R(13.5, 13.5, 5.5, 5.5, 1.3, 'a', 'pop'), C(6.5, 6.5, 1, 'f')]),
  I('nat-gateway', 'nat translation private public egress', [R(2.5, 6, 7, 12, 2), C(6, 9, 1, 'f'), C(6, 12, 1, 'f', 'blink'), C(6, 15, 1, 'f'), G('slide-r', P('M10.5 12h2.5M11.5 10l2 2-2 2')), C(17.5, 12, 4.2, 'a'), P('M13.3 12h8.4M17.5 7.8c-1.6 1.3-1.6 7.1 0 8.4M17.5 7.8c1.6 1.3 1.6 7.1 0 8.4')]),
  I('vpn-gateway', 'vpn tunnel secure gateway site to site', [P('M4 21V11a8 8 0 0 1 16 0v10Z'), P('M10 13.5V12a2 2 0 0 1 4 0v1.5'), R(8.8, 13.5, 6.4, 5, 1.3, 'a', 'pop'), P('M2.5 21h19')]),
  I('vpc-peering', 'peering link connect networks pair', [P(poly(6.5, 12, 4.3, 6)), C(6.5, 12, 1.2, 'f'), P(poly(17.5, 12, 4.3, 6), 'a'), G('pulse', P('M10.6 10.3h2.8M10.6 13.7h2.8'))]),
  I('security-group-rules', 'security group firewall rules allow deny ports', [R(3, 4, 7, 4, 2), C(8, 6, 1.1, 'a', 'toggle'), P('M13 6h8'), R(3, 10, 7, 4, 2), C(5, 12, 1.1, 'f'), P('M13 12h6'), R(3, 16, 7, 4, 2), C(8, 18, 1.1, 'a'), P('M13 18h7')]),
  I('iam-role', 'role identity assume permission mask access', [G('float', P('M3 8c3-1.6 6-1.6 9 0 3-1.6 6-1.6 9 0 0 5.2-2 8.8-5 8.8-2 0-2.8-2.3-4-2.3s-2 2.3-4 2.3c-3 0-5-3.6-5-8.8Z'), P('M5.8 11.5c1.1-1.4 3.3-1.4 4.4 0-1.1 1.4-3.3 1.4-4.4 0Z', 'a'), P('M13.8 11.5c1.1-1.4 3.3-1.4 4.4 0-1.1 1.4-3.3 1.4-4.4 0Z', 'a'))]),
  I('policy-document', 'policy json statement permissions iam', [P('M6.5 3H14l5 5v11a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z'), P('M14 3v5h5'), P('M9 10.5c-1.2 0-1.5.6-1.5 1.5v.8c0 .5-.3.9-.9.9.6 0 .9.4.9.9v.8c0 .9.3 1.5 1.5 1.5M15 10.5c1.2 0 1.5.6 1.5 1.5v.8c0 .5.3.9.9.9-.6 0-.9.4-.9.9v.8c0 .9-.3 1.5-1.5 1.5'), P('M10.3 14l1.2 1.2 2.3-2.4', 'a', 'draw')]),
  I('secrets-manager', 'secrets password vault masked credentials', [P('M7.5 9V7.5a4.5 4.5 0 0 1 9 0V9'), R(3, 9, 18, 11, 2.5), P('M7 12.6v3.8M5.4 13.6l3.2 1.8M5.4 15.4l3.2-1.8', 'd', 'blink'), P('M12 12.6v3.8M10.4 13.6l3.2 1.8M10.4 15.4l3.2-1.8', 'a', 'blink:.3'), P('M17 12.6v3.8M15.4 13.6l3.2 1.8M15.4 15.4l3.2-1.8', 'd', 'blink:.6')]),
  I('envelope-encryption', 'kms data key wrap encryption envelope', [G('float', C(12, 5.5, 2.6, 'a'), C(12, 5.5, 0.9, 'd'), P('M12 8.1v5M12 11h1.8')), R(3, 10, 18, 11, 2.5), P('M3.5 11.5 12 17l8.5-5.5')]),
  I('cert-rotation', 'certificate tls renew rotate expiry', [P(star(12, 12, 4.8, 3.9, 12), 'a', 'pulse'), C(12, 12, 1.8, 'd'), G('spin-slow', X(12, 12, 9.2), P(arcArrow(12, 12, 8.5, 30, 150)), P(arcArrow(12, 12, 8.5, 210, 330)))]),
  // ---- storage ----
  I('object-bucket', 'bucket object storage blob s3', [P('M6 7c0-2.8 2.7-4.5 6-4.5s6 1.7 6 4.5'), P('M3.5 7h17l-1.8 12.2a2 2 0 0 1-2 1.8H7.3a2 2 0 0 1-2-1.8Z'), C(9.5, 13, 2, 'a', 'pop'), R(12.6, 11.4, 3.6, 3.6, 0.8, 'a', 'pop:.5'), P('M8 17.5h8')]),
  I('block-volume', 'block storage volume disk ebs', [G('float', cube(12, 12, 8.6, ['a', 'b', 'b'])), P('M4.55 12 12 16.3l7.45-4.3')]),
  I('nfs-share', 'file share nfs network drive mount', [R(4, 3, 16, 7, 2), P('M7 6.5h5'), C(16.5, 6.5, 1, 'f', 'blink'), P('M12 10v4M5.5 17v-1.5A1.5 1.5 0 0 1 7 14h10a1.5 1.5 0 0 1 1.5 1.5V17M12 14v3', 'd', 'dash'), R(3.5, 17, 4, 4, 1), R(10, 17, 4, 4, 1, 'a', 'pop'), R(16.5, 17, 4, 4, 1)]),
  I('snapshot-schedule', 'snapshot backup schedule camera timed', [P('M3 9a2 2 0 0 1 2-2h2.5L9 4.5h6L16.5 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z'), C(12, 13, 4.3, 'a'), P('M12 13l2 1.2'), G('spin', X(12, 13, 4.3), P('M12 13v-2.8')), C(18, 9.8, 0.9, 'f', 'blink')]),
  I('cold-archive', 'glacier cold storage archive frozen tier', [R(3, 3, 18, 10, 2), P('M9.5 7h5'), P('M5.5 13h3.2l-1.6 5.5Z', 'a', 'sink'), P('M10.4 13h3.2L12 21Z', 'a', 'sink:.4'), P('M15.3 13h3.2l-1.6 4.5Z', 'a', 'sink:.8')]),
  I('cache-purge', 'purge invalidate cdn cache clear sweep', [G('wiggle', P('M20.5 3.5 13.5 10.5'), P('M11.8 8.8l3.4 3.4-1.4 1.4c-.8 3-3.2 5.6-6.6 7.1L3.3 16.8c1.5-3.4 4.1-5.8 7.1-6.6Z', 'a'), P('M8.5 14.5l2 2')), C(4.5, 8, 1, 'f', 'blink'), C(7.5, 5, 0.9, 'f', 'blink:.4'), C(4, 12, 0.8, 'f', 'blink:.8')]),
  // ---- compute ----
  I('autoscaling-group', 'autoscaling scale out instances replicas', [R(3, 5, 4, 8, 1.5, 'b', 'pop'), R(8.5, 3, 7, 12, 2, 'a'), P('M10.5 6.5h3M10.5 9h3'), R(17, 5, 4, 8, 1.5, 'b', 'pop:.5'), G('grow-x', P('M6 19.5h12M8 17.5l-2 2 2 2M16 17.5l2 2-2 2'))]),
  I('instance-size', 'instance type size vcpu memory flavor', [R(3.5, 8.5, 12, 12, 2), R(6.5, 11.5, 6, 6, 1.3, 'a', 'pulse'), G('grow-x', P('M3.5 4.5h12M3.5 3v3M15.5 3v3')), P('M19.5 8.5v12M18 8.5h3M18 20.5h3')]),
  I('spot-instance', 'spot instance spotlight interruptible cheap capacity', [E(12, 19.5, 7.5, 2, 'a', 'pulse'), R(8, 8.5, 8, 9.5, 2), P('M10.5 11.5h3M10.5 14.5h3'), P('M6 3l2 3.5M18 3l-2 3.5M12 2.5V6', 'd', 'blink')]),
  I('lambda-trigger', 'serverless trigger event invoke function', [P('M10 2.5 4.5 10.5h4l-1.5 6 6.5-8.5H9.5Z', 'a', 'blink'), R(12, 12, 9, 9, 2.2), P('M14.5 14.5c1.2 0 1.6.6 2.1 1.6l1.9 3M16.9 17l-2.4 2.6')]),
  I('queue-consumer', 'consumer worker queue process messages', [G('slide-r', R(2.5, 9.5, 3.5, 5, 1), R(7, 9.5, 3.5, 5, 1, 'a')), G('spin', P(gear(17, 12, 4.6, 3.3, 8))), C(17, 12, 1.4, 'd')]),
  I('event-bus', 'event bus broker routing publish subscribe', [R(2.5, 10.5, 19, 3, 1.5, 'a'), P('M6 10.5V7.3M18 10.5V7.3M12 13.5v3.2'), C(6, 5.5, 1.9, 'b', 'pop'), C(18, 5.5, 1.9, 'b', 'pop:.4'), C(12, 18.5, 1.9, 'b', 'pop:.8')]),
  I('workflow-dag', 'dag orchestrator workflow steps pipeline graph', [R(2.5, 9.5, 5, 5, 1.5, 'a', 'pulse'), R(10, 3.5, 5, 5, 1.5), R(10, 15.5, 5, 5, 1.5), C(19, 12, 2.5), P('M7.5 12c1.5 0 1-6 2.5-6M7.5 12c1.5 0 1 6 2.5 6M15 6c1.7 0 1.3 4.6 2 5M15 18c1.7 0 1.3-4.6 2-5', 'd', 'draw')]),
  I('interval-trigger', 'schedule interval tick periodic metronome timer', [P('M9.3 3h5.4l4.6 16.8a1 1 0 0 1-1 1.2H5.7a1 1 0 0 1-1-1.2Z'), P('M7.3 16.5h9.4'), G('seesaw', X(12, 16.5, 11.5), P('M12 16.5l3-10'), C(14.1, 9.5, 1.6, 'a'))]),
  // ---- infrastructure as code ----
  I('infra-blueprint', 'infrastructure as code blueprint template provision', [R(3, 4, 18, 16, 2), P('M14 15h7M14 15v5'), R(6, 7, 7, 3.2, 1, 'a', 'pop'), R(6, 12, 7, 3.2, 1), C(16.5, 8.5, 0.9, 'f'), C(18.5, 8.5, 0.9, 'f'), C(16.5, 11, 0.9, 'f'), C(18.5, 11, 0.9, 'f')]),
  I('infra-plan', 'plan preview changes add modify destroy', [R(4, 3, 16, 18, 2.5), P('M6.5 8h3M8 6.5v3', 'a', 'pop'), P('M6.5 12.3c.6-.8 1.3-.8 1.5 0s.9.8 1.5 0'), P('M6.5 16h3'), P('M11.5 8h5.5M11.5 12h5.5M11.5 16h3.5')]),
  I('config-drift', 'drift detection desired actual state mismatch', [P('M6 4h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'd', 'dash'), R(8.5, 8.5, 12, 12, 2.5, 'a', 'diag-in')]),
  I('config-map', 'configuration settings map key value', [P('M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2Z'), P('M9 4v14M15 6v14'), G('spin', P(gear(12, 12, 4.4, 3.2, 7), 'a')), C(12, 12, 1.3, 'd')]),
  I('release-bundle', 'chart package release templates bundle', [G('float', R(8, 2.5, 8, 9, 1.5, 'a'), P('M10.5 5.5h3M10.5 8h3')), P('M4 10h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z'), P('M4 10 2.5 6.5H8L10 10M20 10l1.5-3.5H16L14 10'), P('M10 14h4')]),
  // ---- orchestration ----
  I('pod-group', 'pod containers group colocated scheduling', [P('M3 13c0-3 2-5 5-5h8c3 0 5 2 5 5s-2 5-5 5H8c-3 0-5-2-5-5Z'), C(8, 13, 2, 'a', 'pop'), C(12, 13, 2, 'a', 'pop:.3'), C(16, 13, 2, 'a', 'pop:.6'), P('M17 8c.2-2 1.4-3.6 3.5-4.2')]),
  I('node-pool', 'node pool workers machines group', [R(3.5, 5, 4.5, 4.5, 1, 'b', 'float'), R(9.75, 3.5, 4.5, 4.5, 1, 'a', 'float:.4'), R(16, 5, 4.5, 4.5, 1, 'b', 'float:.8'), P('M3 14v4a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4'), P('M6 15.5c1.5-1.2 3-1.2 4 0s2.5 1.2 4 0 2.5-1.2 4 0', 'd', 'wave')]),
  I('cluster-autoscale', 'cluster autoscaler nodes grow honeycomb', [P(poly(12, 12, 2.7, 6), 'a'), P(poly(17.6, 12, 2.7, 6)), P(poly(9.2, 7.15, 2.7, 6)), P(poly(9.2, 16.85, 2.7, 6)), P(poly(6.4, 12, 2.7, 6), 'b', 'pop'), P(poly(14.8, 7.15, 2.7, 6), 'b', 'pop:.4'), P(poly(14.8, 16.85, 2.7, 6), 'b', 'pop:.8')]),
  I('mesh-sidecar', 'sidecar proxy service mesh envoy attached', [G('slide-r', R(3, 5, 10, 10, 2.5), P('M13 8.5h2M13 12h2'), R(15, 7, 6, 7, 2, 'a'), C(8, 18.5, 2.2), C(18, 18.5, 2.2), P('M6 10h4'))]),
  I('ingress-route', 'ingress entry route traffic into cluster', [P(arc(13.5, 12, 8, 300, 600)), C(16, 9, 1.2, 'f'), C(16, 15, 1.2, 'f'), C(18.5, 12, 1.2, 'f'), G('slide-r', P('M2.5 12h9', 'a'), P('M8.5 9l3 3-3 3', 'a'))]),
  // ---- delivery ----
  I('canary-release', 'canary bird release gradual rollout', [G('float', P('M4.5 15.5c0-4.2 3.2-7.5 7.5-7.5.6-2.8 2.7-4.3 5-4 1.2.2 2.1.9 2.6 2l1.9.6-1.9 1c-.1 4.6-2.7 8.6-7.6 10.1L6.5 20l1.7-2.8c-2.2-.3-3.7-.9-3.7-1.7Z', 'a'), P('M9 13.2c2 1.3 4.4 1.2 6.3-.6'), C(17.5, 6.3, 0.8, 'd')), P('M3 21.5h12')]),
  I('blue-green-deploy', 'blue green deploy switch environments cutover', [R(3, 2.5, 7, 5.5, 1.5), R(14, 2.5, 7, 5.5, 1.5, 'a', 'pop'), P('M12 21v-6M12 15c0-3-5.5-3-5.5-6V8'), P('M12 15c0-3 5.5-3 5.5-6V8', 'a', 'draw'), C(12, 20, 1.5, 'f')]),
  I('deploy-rollback', 'rollback revert previous release undo', [P('M3 17h18'), C(5.5, 17, 2, 'a'), C(12, 17, 1.4, 'f'), C(18.5, 17, 1.4, 'f'), G('slide-l', P('M18.5 14c0-4.5-3-7.5-6.5-7.5S5.5 9.5 5.5 13.5M3.3 11.3l2.2 2.2 2.2-2.2'))]),
  I('rollout-percent', 'rollout percentage gradual users exposure', [C(12, 4.5, 1.2, 'a', 'pop'), C(16.4, 5.9, 1.2, 'a', 'pop:.2'), C(19.1, 9.7, 1.2, 'a', 'pop:.4'), C(19.1, 14.3, 1.2, 'f'), C(16.4, 18.1, 1.2, 'f'), C(12, 19.5, 1.2, 'f'), C(7.6, 18.1, 1.2, 'f'), C(4.9, 14.3, 1.2, 'f'), C(4.9, 9.7, 1.2, 'f'), C(7.6, 5.9, 1.2, 'f'), C(12, 10.5, 1.9), P('M8.8 15.4a3.2 3.2 0 0 1 6.4 0Z')]),
  I('gitops-sync', 'gitops reconcile sync repo cluster declarative', [P('M5 4v16'), C(5, 6, 1.6), C(5, 12, 1.6, 'a', 'pulse'), C(5, 18, 1.6), G('slide-r', P('M8.5 9.5H13M11.5 8 13 9.5 11.5 11')), G('slide-l', P('M13 14.5H8.5M10 13l-1.5 1.5L10 16')), P(poly(17.5, 12, 4, 6)), C(17.5, 12, 1.2, 'f')]),
  I('artifact-registry', 'registry artifacts packages repository shelf', [R(6, 6.5, 4.5, 5.5, 1), R(12, 8, 4.5, 4, 1, 'a', 'pop'), R(6, 15.5, 5.5, 5, 1), R(13, 14.5, 5, 6, 1), P('M3.5 21V3M20.5 21V3M3.5 12h17M3.5 20.5h17')]),
  I('image-layers', 'container image layers build cache stack', [R(8, 3, 8, 3, 1.5, 'a', 'drop'), R(6.5, 8, 11, 3, 1.5), R(5, 13, 14, 3, 1.5), R(3.5, 18, 17, 3, 1.5)]),
  I('vuln-scan', 'vulnerability scan cve image security', [R(4, 4, 16, 16, 2.5), P('M12 8.5l4.2 7.3H7.8L12 8.5'), P('M12 11v2'), C(12, 14.4, 0.6, 'f'), P('M2.5 12h19', 'a', 'scan')]),
  I('sbom-manifest', 'sbom bill of materials dependencies components', [cube(7, 7.5, 4.3, ['a', 'b', 'b']), P('M7 12v6.5M7 14.5h4M7 18.5h4'), R(11.5, 13, 9, 3, 1.5, 'b', 'pop'), R(11.5, 17, 9, 3, 1.5, 'b', 'pop:.5'), P('M13.5 6h6M13.5 9h4')]),
  // ---- reliability ----
  I('slo-objective', 'slo objective target reliability goal', [R(3, 10, 18, 5, 2.5), R(3, 10, 12.5, 5, 2.5, 'a', 'grow-x'), P('M17.5 19.5V4.5'), P('M17.5 4.5h3.5l-1 1.6 1 1.6h-3.5Z')]),
  I('error-budget-burn', 'error budget burn rate candle reliability', [P('M10.5 3c2 2.4 2.6 3.9 2.6 5a2.6 2.6 0 0 1-5.2 0c0-1.1.6-2.6 2.6-5Z', 'a', 'flicker'), P('M10.5 10.6v1'), R(7, 11.5, 7, 10, 1.5), P('M14 14.5h2.5M14 17.5h2.5M9.3 11.5v2.5')]),
  I('on-call-pager', 'on call pager page alert rotation', [G('shake', R(5, 6, 14, 12, 2.5), R(7, 8.5, 10, 4, 1, 'a'), C(9, 15.5, 1, 'f'), C(12, 15.5, 1, 'f'), C(15, 15.5, 1, 'f')), P('M2.5 9v6M21.5 9v6', 'd', 'blink')]),
  I('runbook', 'runbook playbook procedure operations guide', [P('M6 3h13v15H6.5A1.5 1.5 0 0 0 5 19.5V4a1 1 0 0 1 1-1Z'), P('M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3'), P('M10.5 7.3v6.4l5.2-3.2Z', 'a', 'pulse')]),
  I('postmortem-insight', 'postmortem retrospective lessons incident review', [P('M12 3a6 6 0 0 1 3.5 10.9V16h-7v-2.1A6 6 0 0 1 12 3Z'), P('M8.4 9.6h1.8l1-2 1.8 4 1-2h1.6', 'a', 'draw'), P('M9 18.5h6M10 21h4')]),
  I('chaos-experiment', 'chaos engineering fault injection experiment', [P('M10 3h4v5.5l5.5 9.5a2 2 0 0 1-1.7 3H6.2a2 2 0 0 1-1.7-3L10 8.5Z'), P('M8.5 3h7'), P('M12.8 11.5 10.3 15.5h2.4l-1 3.5 3-4.6h-2.4Z', 'a', 'blink')]),
  // ---- observability ----
  I('trace-spans', 'tracing spans distributed trace waterfall', [R(3, 3, 18, 3, 1.5, 'a'), R(6, 8, 10, 3, 1.5, 'b', 'grow-x'), R(9, 13, 7, 3, 1.5, 'b', 'grow-x'), R(12, 18, 8, 3, 1.5, 'b', 'grow-x'), P('M4.5 6v3.5H6M7.5 11v3.5H9M10.5 16v3.5H12')]),
  I('metrics-series', 'metrics time series graph monitoring', [P('M3 3v18h18'), P('M6 16h3v-5h3.5v3H16V7.5h4', 'a', 'draw'), P('M16 4v13', 'd', 'blink')]),
  I('log-query', 'log search query filter lines', [P('M3 5h9M3 9h5.5M3 13h5M3 17.5h7'), G('tilt', C(14.5, 11.5, 4.5), P('M17.7 14.7 21 18'), P('M12.6 11.5h3.8', 'a'))]),
  I('alert-threshold', 'alert threshold limit breach monitor', [P('M3 9h18', 'a', 'dash'), P('M3 18l4-3 3 2.5 4-10 3 6.5 4-2.5'), C(14, 7.5, 1.5, 'a', 'beat')]),
  I('latency-histogram', 'latency p99 histogram distribution tail', [P('M4 20v-5M7 20V7M10 20V5.5M13 20V10M16 20v-6M19 20v-2.5', 'd', 'grow'), P('M17.5 3.5v18', 'a'), C(17.5, 3.8, 1.3, 'a', 'pulse')]),
  I('heartbeat-check', 'heartbeat health status alive ping', [G('beat', P('M12 20s-8-4.8-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.2 12 20 12 20Z')), P('M2.5 12.5h5l1.5-3 2.5 6 2-4.5 1.2 1.5h6.8', 'a', 'draw')]),
  I('health-probe', 'health check probe stethoscope liveness readiness', [P('M6.5 3v5a4.5 4.5 0 0 0 9 0V3'), P('M11 12.5V15a4 4 0 0 0 8 0v-.3'), C(6.5, 3, 1, 'f'), C(15.5, 3, 1, 'f'), C(19, 12, 2.6, 'a', 'beat'), C(19, 12, 0.9, 'd')]),
  I('blast-radius', 'blast radius impact scope failure domain', [C(12, 12, 2.6, 'a', 'beat'), P('M12 5.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 1 1 0-13'), G('ping', P('M12 2.5a9.5 9.5 0 1 1 0 19 9.5 9.5 0 1 1 0-19'))]),
  // ---- cost & sustainability ----
  I('cost-explorer', 'cost explorer spend analysis billing', [R(3, 17, 10, 3.5, 1.75), R(4, 13, 10, 3.5, 1.75), R(3, 9, 10, 3.5, 1.75), G('tilt', C(16.5, 8, 4.2, 'a'), P('M19.5 11 21.5 13'), P('M16.5 6.2v3.6'))]),
  I('cloud-bill', 'cloud bill invoice budget spend charges', [P('M5 3h14v18l-2.3-1.5-2.3 1.5-2.4-1.5-2.4 1.5-2.3-1.5L5 21Z'), G('float', S(0.38, 7.46, 3.6, P(CLOUD, 'a'))), P('M8.5 13.5h7M8.5 16.5h4.5')]),
  I('rightsizing', 'rightsize optimize shrink resources fit', [G('pop', P('M4 4l3.5 3.5M7.5 4.5v3H4.5M20 4l-3.5 3.5M16.5 4.5v3h3M4 20l3.5-3.5M7.5 19.5v-3H4.5M20 20l-3.5-3.5M16.5 19.5v-3h3')), R(9.5, 9.5, 5, 5, 1.2, 'a', 'pulse')]),
  I('carbon-aware-region', 'carbon aware green region sustainability energy', [G('float', P('M12 21.5s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z'), P('M9 12.5c0-3 2.2-5 6-5 0 3.8-2 6-5 6-.4 0-.7 0-1-.1Z', 'a'), P('M9 13.5l3.2-3.2'))]),
  // ---- resilience ----
  I('restore-drill', 'restore drill rewind backup rehearse recovery', [R(2.5, 5, 19, 14, 2.5), G('spin-rev', X(8, 11, 2.6), P(gear(8, 11, 2.6, 1.7, 6), 'a')), G('spin-rev', X(16, 11, 2.6), P(gear(16, 11, 2.6, 1.7, 6), 'a')), P('M10.8 11h2.4'), P('M6.5 19l1.5-3h8l1.5 3')]),
  I('dr-failover', 'disaster recovery failover secondary site', [R(2.5, 11, 7, 9, 1.5), P('M4.5 13.5l3 3M7.5 13.5l-3 3'), R(14.5, 11, 7, 9, 1.5, 'a', 'pop'), G('slide-r', P('M6 8.5C6 4.5 18 4.5 18 8.5M15.8 6.6 18 8.8l2.2-2.2'))]),
  I('uptime-laurel', 'uptime nines availability award sla', [P(arc(12, 12, 7.6, 205, 340) + laurel(12, 12, 7.6, [220, 250, 280, 310], 22)), P(arc(12, 12, 7.6, 20, 155) + laurel(12, 12, 7.6, [140, 110, 80, 50], -22)), P('M8.6 12.3l2.4 2.4 4.4-4.8', 'a', 'draw')]),
  I('ephemeral-env', 'ephemeral preview environment temporary bubble', [G('float', C(11, 11, 7.8), R(8, 8.5, 6, 5, 1.2, 'a'), P(arc(11, 11, 5.6, 290, 340), 'h')), C(19.5, 19, 1.6, 'b', 'float:.5'), C(15.5, 21, 0.9, 'f', 'float:.9')]),
  I('cold-start', 'cold start latency serverless warm up boot', [P('M12 2.5v4.5M12 17v4.5M3.8 7.2l3.9 2.3M16.3 14.5l3.9 2.3M3.8 16.8l3.9-2.3M16.3 9.5l3.9-2.3'), P('M10.3 3.6 12 5.2l1.7-1.6M10.3 20.4 12 18.8l1.7 1.6'), C(12, 12, 4.4, 'a', 'pulse'), P('M10.8 10v4l3.3-2Z', 'd')]),
  // ---- api & edge services ----
  I('api-gateway-route', 'api gateway routing endpoints fan out', [P('M2.5 12h6.5'), P('M6.5 9.5 9 12l-2.5 2.5'), R(9, 4, 6, 16, 2, 'a'), P('M15 12h3.5M15 8c2 0 1.8-2.5 3.5-2.5M15 16c2 0 1.8 2.5 3.5 2.5', 'd', 'dash'), C(20, 5.5, 1.5), C(20, 12, 1.5), C(20, 18.5, 1.5)]),
  I('rate-quota', 'rate limit quota throttle faucet drip', [P('M3 7.5h9a4.5 4.5 0 0 1 4.5 4.5v1h-4.5V12H3Z'), P('M7.5 7.5V4.5M5.5 4.5h4'), P('M14.5 15.5c1 1.4 1.5 2.3 1.5 3a1.5 1.5 0 0 1-3 0c0-.7.5-1.6 1.5-3Z', 'a', 'drop'), P('M20 21H4')]),
  I('webhook-backoff', 'webhook retry backoff exponential delivery', [P('M2.5 19.5h19'), P('M3 19.5c0-3.2 2.4-3.2 2.4 0 0-6.4 4.6-6.4 4.6 0 0-12.5 8-12.5 8 0', 'd', 'draw'), C(19.6, 17, 2.4, 'a', 'pop')]),
  I('cloud-shell', 'cloud shell console terminal browser cli', [P(CLOUD), P('M9 12l2.2 1.8L9 15.6'), P('M12.8 16h3', 'a', 'blink')]),
  I('service-mesh', 'service mesh network services interconnect', [C(6, 6, 2.2), C(18, 6, 2.2), C(6, 18, 2.2), C(18, 18, 2.2), C(12, 12, 2.6, 'a', 'pulse'), P('M8.2 6h7.6M8.2 18h7.6M6 8.2v7.6M18 8.2v7.6M7.6 7.6l2.5 2.5M16.4 7.6l-2.5 2.5M7.6 16.4l2.5-2.5M16.4 16.4l-2.5-2.5', 'd', 'dash')]),
  I('dead-letter-queue', 'dead letter queue failed messages dlq', [R(2.5, 5, 15, 11, 2.5), P('M3 6.5l7 5 7-5'), C(17, 16.5, 4.6, 'a', 'shake'), P('M15.3 14.8l3.4 3.4M18.7 14.8l-3.4 3.4')]),
  I('cloud-migration', 'migration lift shift move to cloud', [R(3, 13, 8, 8, 1.5), P('M3 16h8M7 13v3'), P('M7 10.5C7 7 8.8 5.6 11 5.4', 'a', 'dash'), G('float', S(0.46, 10.8, 1.2, P(CLOUD)))]),
  I('bastion-host', 'bastion jump host hardened access tower', [P('M6 21V9.5H5V4h2.8v2h2.6V4h3.2v2h2.6V4H19v5.5h-1V21Z'), P('M10 21v-3.5a2 2 0 0 1 4 0V21Z', 'a', 'pop'), P('M12 11v2.5')]),
];
