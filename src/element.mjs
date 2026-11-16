// <bridle-icon name="wallet" variant="color" animated size="32" hue="200"></bridle-icon>
import { byName } from './index.mjs';
import { renderSvg } from './render.mjs';

let n = 0;
class BridleIconElement extends HTMLElement {
  static observedAttributes = ['name', 'variant', 'animated', 'size', 'hue', 'palette', 'stroke', 'corner'];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    const icon = byName[this.getAttribute('name')];
    if (!icon) { this.innerHTML = ''; return; }
    const hue = this.getAttribute('hue');
    const size = this.getAttribute('size');
    this.style.display ||= 'inline-flex';
    this.style.lineHeight ||= '0';
    this.innerHTML = renderSvg(icon, {
      variant: this.getAttribute('variant') || 'line',
      animated: this.hasAttribute('animated'),
      size: size ? +size : undefined,
      palette: hue != null ? +hue : this.getAttribute('palette') || undefined,
      strokeWidth: this.hasAttribute('stroke') ? +this.getAttribute('stroke') : undefined,
      corner: this.getAttribute('corner') || undefined,
      uid: `bri-el-${(n++).toString(36)}`,
    });
  }
}
if (!customElements.get('bridle-icon')) customElements.define('bridle-icon', BridleIconElement);
export { BridleIconElement };
