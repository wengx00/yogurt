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
  const { className, style, children, prefix, suffix, variant, shape } =
    useDefaultProps(defaultProps, props);
  const { classPrefix } = useConfig();

  const [domRef, setDomRef] = useDomRefCallback();

  useRipple(ref?.current || domRef);

  return (
    <button
      ref={ref || setDomRef}
      style={style}
      className={classNames(className, [
        `${classPrefix}_button`,
        `${classPrefix}_button_${variant}`,
        `${classPrefix}_button_${shape}`,
      ])}
    >
      {prefix}
      <span className={`${classPrefix}_button__text`}>{children}</span>
      {suffix}
    </button>
  );
}

const Button = forwardRef(ButtonRenderer as any);

Button.displayName = 'Button';

export default Button;
