import { useCallback, useEffect, useMemo } from 'react';

import useConfig from './useConfig';
import setStyle from '../utils/setStyle';

const duration = 300;
const noneRippleBgColor = 'rgba(0, 0, 0, 0)';
const defaultRippleColor = 'rgba(0, 0, 0, 0.2)';

// 获取水波纹颜色
const getRippleColor = (el: HTMLElement, customRippleColor?: string) => {
  if (customRippleColor) {
    return customRippleColor;
  }
  // Attribute
  if (el.dataset?.ripple) {
    return el.dataset.ripple;
  }
  // CSS Variable
  const cssVariable = getComputedStyle(el).getPropertyValue('--ripple-color');
  if (cssVariable) {
    return cssVariable;
  }
  return defaultRippleColor;
};

// 水波纹效果
export default function useRipple(
  el?: HTMLElement,
  customRippleColor?: string,
) {
  const { classPrefix: prefix } = useConfig();

  const rippleContainer = useMemo(() => {
    const rippleContainer = document.createElement('div');
    rippleContainer.className = `${prefix}_ripple__container`;

    return rippleContainer;
  }, [prefix]);

  // 添加水波纹效果
  const addRipple = useCallback(
    (e: PointerEvent) => {
      if (!el) {
        return;
      }

      const rippleColor = getRippleColor(el, customRippleColor);
      const elStyle = getComputedStyle(el);
      const borderWidth = parseInt(elStyle.borderWidth, 10) ?? 0;
      const { borderRadius } = elStyle;
      const { offsetWidth: elWidth, offsetHeight: elHeight } = el;

      const maxSize = Math.max(elWidth, elHeight);

      const x = e.offsetX;
      const y = e.offsetY;

      if (rippleContainer.parentNode === null) {
        setStyle(rippleContainer, {
          borderRadius,
          position: 'absolute',
          top: `${-1 - borderWidth}px`,
          left: `${-1 - borderWidth}px`,
          width: `${elWidth + 2}px`,
          height: `${elHeight + 2}px`,
          pointerEvents: 'none',
          overflow: 'hidden',
        });
        // 插入到当前元素
        el.appendChild(rippleContainer);
      }

      const ripple = document.createElement('div');

      ripple.className = `${prefix}_ripple__inner`;

      setStyle(ripple, {
        top: `${y}px`,
        left: `${x}px`,
        width: `${maxSize * 1.1}px`,
        height: `${maxSize * 1.1}px`,
        borderRadius: '50%',
        transition: `transform ${duration}ms linear, opacity ${duration}ms linear, background ${duration}ms linear`,
        pointerEvents: 'none',
        position: 'absolute',
        zIndex: 0,
        backgroundColor: rippleColor,
        transform: 'translateX(-50%) translateY(-50%) scale(0)',
        opacity: '0',
      });

      // 避免遮盖内部元素
      const elSet = new WeakSet();
      for (let n = el.children.length, i = 0; i < n; ++i) {
        const child = el.children[i];
        if (
          (child as HTMLElement).style.zIndex === '' &&
          child !== rippleContainer
        ) {
          (child as HTMLElement).style.zIndex = '1';
          elSet.add(child);
        }
      }

      rippleContainer.insertBefore(ripple, rippleContainer.firstChild);

      setTimeout(() => {
        setStyle(ripple, {
          transform: 'translateX(-50%) translateY(-50%) scale(2)',
          opacity: '1',
        });
      });

      // 清理事件
      const dispose = () => {
        ripple.style.backgroundColor = noneRippleBgColor;

        // 清理 zIndex，实际上似乎也没必要清理
        // for (let n = el.children.length, i = 0; i < n; ++i) {
        //   const target = el.children[i];
        //   if (elSet.has(target)) {
        //     (target as HTMLElement).style.setProperty('zIndex', '');
        //   }
        // }

        if (!el) {
          return;
        }

        el.removeEventListener('pointerup', dispose, false);
        el.removeEventListener('pointerleave', dispose, false);

        setTimeout(() => {
          ripple.remove();
          if (rippleContainer.children.length === 0) {
            rippleContainer.remove();
          }
        }, duration * 2);
      };

      el.addEventListener('pointerup', dispose, false);
      el.addEventListener('pointerleave', dispose, false);
    },
    [el, customRippleColor, rippleContainer, prefix],
  );

  useEffect(() => {
    if (!el) {
      return;
    }
    el.addEventListener('pointerdown', addRipple, false);

    return () => {
      el.removeEventListener('pointerdown', addRipple, false);
    };
  }, [addRipple, el]);
}
