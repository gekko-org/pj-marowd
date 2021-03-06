module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser:  'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: { "legacyDecorators": true },
    extraFileExtensions: ['.vue']
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:vue/base',
    'prettier/vue',
    'prettier/@typescript-eslint'
  ],
  plugins: [
    'prettier',
    '@typescript-eslint'
  ],
  // add your custom rules here
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "prettier/prettier": "error"

  },
  settings: {
    node: {
      "tryExtensions": [".ts", ".js", ".json", ".node", ".vue"]
    }
  },
}
