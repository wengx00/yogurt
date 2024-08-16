import { useMemo } from 'react';

import useConfig from './useConfig';

// 水波纹效果
export default function useRipple(el: HTMLElement) {
  const { classPrefix: prefix } = useConfig();

  const rippleContainer = useMemo(() => {
    const rippleContainer = document.createElement('div');
    rippleContainer.className = `${prefix}_ripple-container`;

    return rippleContainer;
  }, [prefix]);

  console.log(el, rippleContainer);
}
