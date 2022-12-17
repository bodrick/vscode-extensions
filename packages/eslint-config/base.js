const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    extends: [
        './rules/best-practices',
        './rules/errors',
        './rules/node',
        './rules/style',
        './rules/variables',
        './rules/es6',
        './rules/imports',
        './rules/strict',
        './rules/code-quality.js',
        './rules/security.js',
        './rules/prettier',
        './base-overrides.js'
    ].map((element) => require.resolve(element)),
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    }
});
