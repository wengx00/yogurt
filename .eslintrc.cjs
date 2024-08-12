module.exports = {
  parserOptions: {
    project: ['./packages/*/tsconfig.json', './app/*/tsconfig.json'],
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
  },
  env: {
    es6: true
  },
  ignorePatterns: [
    'dist',
    'node_modules',
  ]
}