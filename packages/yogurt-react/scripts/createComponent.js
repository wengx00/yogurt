import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  toUpperCamelCase,
  toLowerCamelCase,
  toDashCase,
} from '@yogurt-ui/common-utils';
import pkg from 'fs-extra';
import inquirer from 'inquirer';

const { ensureDir, exists, writeFile } = pkg;

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

inquirer
  .prompt([
    {
      type: 'input',
      name: 'componentName',
      message: 'Component name:',
    },
  ])
  .then(async ({ componentName }) => {
    const upperCamelCase = toUpperCamelCase(componentName);
    const lowerCamelCase = toLowerCamelCase(componentName);
    const dashCase = toDashCase(componentName);
    if (await exists(resolve(__dirname, '../src', dashCase))) {
      console.log(`Component "${componentName}" already exists.`);
      process.exit(1);
    }

    // 创建文件夹
    await ensureDir(resolve(__dirname, '../src', dashCase, 'style'));
    // 创建 TSX
    await writeFile(
      resolve(__dirname, '../src', dashCase, `${upperCamelCase}.tsx`),
      `import classNames from 'classnames';

import { Y${upperCamelCase}Props } from './type';
import { useConfig } from '../hooks';

export default function ${upperCamelCase}(props: Y${upperCamelCase}Props) {
  const { className, style = {} } = props;

  const { classPrefix } = useConfig();

  return (
    <div
      style={style}
      className={classNames(className, [\`$\{classPrefix}_${lowerCamelCase}\`])}
    >
    </div>
  );
}
`,
      'utf-8',
    );
    // 创建 index.ts
    await writeFile(
      resolve(__dirname, '../src', dashCase, 'index.ts'),
      `import './style/index.js';

export { default as ${upperCamelCase} } from './${upperCamelCase}';

export * from './type';
`,
      'utf-8',
    );
    // 创建 type.ts
    await writeFile(
      resolve(__dirname, '../src', dashCase, 'type.ts'),
      `import { BasePropsWithChildren } from '../types/base';

export type ${upperCamelCase}Props = {};

export interface Y${upperCamelCase}Props extends BasePropsWithChildren<${upperCamelCase}Props> {}
`,
      'utf-8',
    );
    // 创建 style/index.js
    await writeFile(
      resolve(__dirname, '../src', dashCase, 'style/index.js'),
      `import './style.scss';
`,
      'utf-8',
    );
    // 创建 style/css.js
    await writeFile(
      resolve(__dirname, '../src', dashCase, 'style/css.js'),
      `import './index.css';
`,
      'utf-8',
    );
    // 创建 style/style.scss
    await writeFile(
      resolve(__dirname, '../src', dashCase, 'style/style.scss'),
      `@import '~@yogurt-ui/common-styles/components/${dashCase}.scss';
`,
      'utf-8',
    );

    console.log('✅ 创建成功');
    console.log('🔗 组件地址：', resolve(__dirname, '../src', dashCase));
    console.log(
      `🔗 组件样式：@yogurt-ui/common-styles/components/${dashCase}.scss`,
    );
  });
