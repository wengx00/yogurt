import classNames from 'classnames';

import { YButtonProps } from './type';
import { useConfig } from '../hooks';

export default function Button(props: YButtonProps) {
  const { className, style = {}, children, prefix, suffix } = props;

  const { classPrefix } = useConfig();

  return (
    <button
      style={style}
      className={classNames(className, [`${classPrefix}_button`])}
    >
      {prefix}
      <span className={`${classPrefix}_button__text`}>{children}</span>
      {suffix}
    </button>
  );
}
