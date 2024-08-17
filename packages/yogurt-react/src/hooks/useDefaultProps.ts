import { useMemo } from 'react';

export default function useDefaultProps<T extends Record<string, any>>(
  defaultProps: Partial<T>,
  props: T,
) {
  const mixinProps = useMemo(() => {
    return {
      ...defaultProps,
      ...(props || {}),
    };
  }, [props, defaultProps]);

  return mixinProps;
}
