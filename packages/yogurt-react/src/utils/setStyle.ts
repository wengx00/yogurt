import React from 'react';

export default function setStyle(
  el: HTMLElement,
  styles: React.CSSProperties & Record<string, string | number>,
) {
  Object.entries(styles).forEach(([key, value]) => {
    // eslint-disable-next-line no-param-reassign
    el.style[key as any] = typeof value === 'string' ? value : String(value);
  });
}
