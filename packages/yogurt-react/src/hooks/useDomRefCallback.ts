import React, { useCallback, useState } from 'react';

export default function useDomRefCallback(): [
  HTMLElement | undefined,
  React.Dispatch<React.SetStateAction<HTMLElement>>,
] {
  const [ref, setRef] = useState<HTMLElement>();
  const callback = useCallback((dom: React.SetStateAction<HTMLElement>) => {
    if (dom) {
      setRef(dom as any);
    }
  }, []);

  return [ref, callback];
}
