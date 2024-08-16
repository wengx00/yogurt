import { BasePropsWithChildren, MouseEventHandler, YNode } from '../types/base';
import { BaseSize } from '../types/enum';

export type ButtonShape = 'round' | 'square' | 'circle';

export type ButtonProps = {
  prefix?: YNode;
  suffix?: YNode;
  shape?: ButtonShape;
  size?: BaseSize;

  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export interface YButtonProps extends BasePropsWithChildren<ButtonProps> {}
