/* eslint sort-keys: "error" */
module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['prettier'],
  root: true,
  rules: {
    'no-unused-vars': 'off',

    /**
     * Eslint config
     */

    // eslint-disable-next-line sort-keys
    'camelcase': 'warn',
    'consistent-this': 'warn',
    'line-comment-position': 'warn',
    'no-inline-comments': 'warn',
    'no-useless-constructor': 'warn',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',

    /* Automatically fixable */
    // eslint-disable-next-line sort-keys
    'arrow-body-style': 'warn',
    'eqeqeq': 'warn',
    'lines-between-class-members': 'warn',
    'no-lonely-if': 'warn',
    'no-useless-computed-key': 'warn',
    'no-useless-rename': 'warn',
    'no-var': 'warn',
    'object-shorthand': 'warn',
    'operator-assignment': 'warn',
    'padding-line-between-statements': ['warn'],
    'prefer-arrow-callback': 'warn',
    'prefer-const': 'warn',
    'prefer-numeric-literals': 'warn',
    'prefer-object-spread': 'warn',
    'prefer-template': 'warn',
    'sort-imports': ['warn', { ignoreDeclarationSort: true }],
    'spaced-comment': 'warn',

    /**
     * Prettier config
     */

    // eslint-disable-next-line sort-keys
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'avoid',
        jsxBracketSameLine: false,
        printWidth: 100,
        quoteProps: 'consistent',
        semi: false,
        singleQuote: true,
        trailingComma: 'none',
        useTabs: false
      }
    ]
  }
}
