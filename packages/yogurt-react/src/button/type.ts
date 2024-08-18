import React from 'react';

import { BasePropsWithChildren, MouseEventHandler, YNode } from '../types/base';
import { BaseShape, BaseSize, BaseTheme, BaseVariant } from '../types/enum';

export type ButtonProps = {
  prefixSlot?: YNode;
  suffixSlot?: YNode;
  shape?: BaseShape;
  size?: BaseSize;
  variant?: BaseVariant;
  theme?: BaseTheme;

  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type YButtonProps = BasePropsWithChildren<
  ButtonProps,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;
