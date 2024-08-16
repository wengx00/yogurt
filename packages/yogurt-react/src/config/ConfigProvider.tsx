import { useMemo } from 'react';

import ConfigContext, { YConfig } from './ConfigContext';
import defaultConfig from './defaultConfig';
import { YNode } from '../types';

export interface YConfigProviderProps {
  children?: YNode;
  globalConfig?: Partial<YConfig>;
}

export default function ConfigProvider({ children, globalConfig = {} }: YConfigProviderProps) {
  const mergedConfig = useMemo(() => {
    return {
      globalConfig: {
        ...defaultConfig,
        ...globalConfig
      }
    };
  }, [globalConfig]);

  return <ConfigContext.Provider value={mergedConfig}>{children}</ConfigContext.Provider>;
}
