import * as path from 'path';

import { pluginPreview } from '@rspress/plugin-preview';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'YogurtUI',
  description: '开箱即用的React组件库',
  icon: '/rspress-icon.png',
  plugins: [pluginPreview()],
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/wengx00/yogurt',
      },
    ],
  },
});
