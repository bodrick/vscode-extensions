const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    extends: ['./base.js'],
    rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/test/**'] }],
        'func-names': 'off',
        'unicorn/prefer-module': 'off',
        'no-secrets/no-secrets': 'off',
        'sonarjs/no-duplicate-string': 'off'
    }
});
