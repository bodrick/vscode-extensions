const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    settings: {
        'configuration-type': 'legacy'
    },
    extends: ['./rules/best-practices', './rules/errors', './rules/node', './rules/style', './rules/variables', './rules/prettier'].map((element) => require.resolve(element)),
    env: {
        browser: true,
        node: true,
        amd: true
    },
    rules: {
        'comma-dangle': ['error', 'never'],
        'prefer-numeric-literals': 'off',
        'no-restricted-properties': [
            'error',
            {
                object: 'arguments',
                property: 'callee',
                message: 'arguments.callee is deprecated'
            },
            {
                property: '__defineGetter__',
                message: 'Please use Object.defineProperty instead.'
            },
            {
                property: '__defineSetter__',
                message: 'Please use Object.defineProperty instead.'
            }
        ],
        'no-var': 'off',
        'prefer-object-spread': 'off',
        'vars-on-top': ['off'],
        'func-names': ['off'],
        'no-cond-assign': ['error', 'except-parens'],
        strict: ['error', 'safe']
    }
});
