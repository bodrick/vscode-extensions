const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    reportUnusedDisableDirectives: true,
    rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: ['*.{js,mjs}', 'scripts/**'] }],
        'import/no-unresolved': ['error', { caseSensitive: false }],
        'no-console': ['error', { allow: ['warn', 'error'] }],
        radix: ['error', 'as-needed'],
        'no-invalid-this': 'off',
        'no-param-reassign': ['error', { props: false }],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        // https://basarat.gitbook.io/typescript/main-1/defaultisbad
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error'
    }
});
