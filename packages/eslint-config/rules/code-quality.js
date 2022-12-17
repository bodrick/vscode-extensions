const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    plugins: ['unicorn', 'sonarjs'],
    extends: ['plugin:unicorn/recommended', 'plugin:sonarjs/recommended'],
    rules: {
        'sonarjs/cognitive-complexity': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'unicorn/switch-case-braces': ['error', 'avoid'],
        // Disable for now
        'unicorn/prefer-node-protocol': 'off'
    }
});
