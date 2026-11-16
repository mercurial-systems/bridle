import type { HTMLAttributes, ReactElement } from 'react';
import type { IconName, RenderOptions } from './index';
export interface BridleIconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'title'>, Omit<RenderOptions, 'uid'> { name: IconName }
export function BridleIcon(props: BridleIconProps): ReactElement;
export default BridleIcon;
