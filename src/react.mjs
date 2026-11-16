// <BridleIcon name="wallet" variant="color" animated size={32} />
import { createElement, useId, useMemo } from 'react';
import { byName } from './index.mjs';
import { renderSvg } from './render.mjs';

export function BridleIcon({ name, variant = 'line', animated = false, size, palette, strokeWidth, corner, title, style, ...rest }) {
  const uid = 'b' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const icon = byName[name];
  const html = useMemo(
    () => (icon ? renderSvg(icon, { variant, animated, size, palette, strokeWidth, corner, title, uid }) : ''),
    [icon, variant, animated, size, typeof palette === 'object' ? JSON.stringify(palette) : palette, strokeWidth, corner, title, uid],
  );
  return createElement('span', { ...rest, style: { display: 'inline-flex', lineHeight: 0, ...style }, dangerouslySetInnerHTML: { __html: html } });
}
export default BridleIcon;
