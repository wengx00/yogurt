import React from 'react';

import defaultConfig from './defaultConfig';

export const defaultConfigContext = {
  globalConfig: defaultConfig
};

const ConfigContext = React.createContext(defaultConfigContext);

export type YConfig = typeof defaultConfig;

export default ConfigContext;
