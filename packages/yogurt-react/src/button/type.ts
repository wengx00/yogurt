import { BasePropsWithChildren, MouseEventHandler, YNode } from '../types/base';
import { BaseShape, BaseSize, BaseVariant } from '../types/enum';

export type ButtonProps = {
  prefix?: YNode;
  suffix?: YNode;
  shape?: BaseShape;
  size?: BaseSize;
  variant?: BaseVariant;

  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export interface YButtonProps extends BasePropsWithChildren<ButtonProps> {}
