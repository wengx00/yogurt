import classNames from 'classnames';
import React, { forwardRef } from 'react';

import defaultProps from './defaultProps';
import { YButtonProps } from './type';
import {
  useConfig,
  useDefaultProps,
  useDomRefCallback,
  useRipple,
} from '../hooks';

function ButtonRenderer(
  props: YButtonProps,
  ref: React.RefObject<HTMLButtonElement>,
) {
  const {
    className,
    style,
    children,
    prefixSlot,
    suffixSlot,
    variant,
    shape,
    theme,
    size,
    ...rest
  } = useDefaultProps(defaultProps, props);
  const { classPrefix } = useConfig();

  const [domRef, setDomRef] = useDomRefCallback();

  useRipple(ref?.current || domRef);

  return (
    <button
      {...rest}
      ref={ref || setDomRef}
      style={style}
      className={classNames(className, [
        `${classPrefix}_button`,
        `${classPrefix}_button_variant_${variant}`,
        `${classPrefix}_button_shape_${shape}`,
        `${classPrefix}_button_theme_${theme}`,
        `${classPrefix}_button_size_${size}`,
      ])}
    >
      {prefixSlot}
      {children && (
        <span className={`${classPrefix}_button__text`}>{children}</span>
      )}
      {suffixSlot}
    </button>
  );
}

const Button = forwardRef<HTMLButtonElement, YButtonProps>(
  ButtonRenderer as any,
);

Button.displayName = 'Button';

export default Button;
