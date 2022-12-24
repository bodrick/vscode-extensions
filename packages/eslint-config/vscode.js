const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    settings: {
        'configuration-type': 'vscode'
    },
    extends: [
        './rules/best-practices',
        './rules/errors',
        './rules/node',
        './rules/style',
        './rules/variables',
        './rules/es6',
        './rules/imports',
        './rules/strict',
        './rules/typescript',
        './rules/code-quality.js',
        './rules/security.js',
        './rules/prettier',
        './base-overrides.js'
    ].map((element) => require.resolve(element)),
    parser: require.resolve('@typescript-eslint/parser'),
    rules: {
        'unicorn/prevent-abbreviations': [
            'error',
            {
                replacements: {
                    dir: {
                        direction: false
                    },
                    e: {
                        event: false
                    },
                    cmd: {
                        command: true
                    },
                    errCb: {
                        handleError: true
                    }
                }
            }
        ]
    }
});
