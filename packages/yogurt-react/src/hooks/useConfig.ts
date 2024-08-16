import { useContext } from 'react';

import { ConfigContext } from '../config';

export default function useConfig() {
  return useContext(ConfigContext).globalConfig;
}
