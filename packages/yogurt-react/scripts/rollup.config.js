import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolve } from 'path';

import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import url from '@rollup/plugin-url';
import { glob } from 'glob';
import esbuild from 'rollup-plugin-esbuild';
import ignoreImport from 'rollup-plugin-ignore-import';
import multiInput from 'rollup-plugin-multi-input';
import postcss from 'rollup-plugin-postcss';
import staticImport from 'rollup-plugin-static-import';
import styles from 'rollup-plugin-styles';

import pkg from '../package.json' assert { type: 'json' };

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

const name = 'yogurt-react';

const banner = `/**
 * ${name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author.name}
 * @license ${pkg.license}
 */
`;

const externalDeps = Object.keys(pkg.dependencies).concat(
  Object.keys(pkg.peerDependencies),
);

const files = [
  'src/**/*.ts',
  'src/**/*.tsx',
  'src/**/*.jsx',
  '!src/**/*.d.ts',
  '!src/**/*.test.ts',
  '!src/**/*.spec.ts',
];

const getPlugins = ({ prod = false, cssCodeSplit = true } = {}) => {
  const basicPlugins = [
    nodeResolve(),
    commonjs(),
    // js 转换
    esbuild({
      include: /\.[jt]sx?$/,
      target: 'esnext',
      minify: false,
      jsx: 'transform',
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      tsconfig: resolve(__dirname, '../tsconfig.build.json'),
    }),
    // es5 转换
    babel({
      babelHelpers: 'runtime',
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    }),
    json(),
    url(),
  ];

  if (cssCodeSplit) {
    basicPlugins.push(
      staticImport.default({
        include: ['src/**/style/css.js'],
      }),
      ignoreImport({
        include: ['src/*/style/*', 'src/*/*/style/*'],
        body: 'import "./style/css.js";',
      }),
    );
  } else {
    basicPlugins.push(
      postcss({
        extract: `${prod ? `${name}.min` : name}.css`,
        minimize: prod,
        sourceMap: !prod,
        extensions: ['.scss', '.css'],
      }),
    );
  }

  if (prod) {
    // 代码压缩
    basicPlugins.push(terser());
  }

  return basicPlugins;
};

const scssConfig = {
  input: await glob(['src/**/style/index.js']),
  plugins: [styles({ mode: 'extract' })],
  output: {
    banner,
    dir: '_es/',
    preserveModules: true,
    preserveModuleRoot: 'src',
    sourcemap: false,
    assetFileNames: '[name].css',
  },
};

const esConfig = {
  input: files,
  external: externalDeps,
  // 保留 style/css.js
  treeshake: false,
  plugins: [multiInput(), getPlugins({ cssCodeSplit: true })],
  output: {
    banner,
    dir: '_es/',
    format: 'esm',
    sourcemap: false,
    chunkFileNames: '_chunks/[name]-[hash].js',
  },
};

export default [scssConfig, esConfig];
