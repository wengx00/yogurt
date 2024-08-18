import classNames from 'classnames';
import { useMemo } from 'react';

import defaultProps from './defaultProps';
import { YStackProps } from './type';
import { useConfig, useDefaultProps } from '../hooks';

export default function Stack(props: YStackProps) {
  const {
    align: alignItems,
    justify: justifyContent,
    direction: flexDirection,
    className,
    style,
    space,
    children,
    ...rest
  } = useDefaultProps(defaultProps, props);

  const { classPrefix } = useConfig();

  const gap = useMemo(() => {
    if (typeof space === 'number') {
      return `${space}px`;
    }
    return space;
  }, [space]);

  return (
    <div
      {...rest}
      style={{
        alignItems,
        justifyContent,
        gap,
        flexDirection,
        ...style,
      }}
      className={classNames(className, [`${classPrefix}_stack`])}
    >
      {children}
    </div>
  );
}
