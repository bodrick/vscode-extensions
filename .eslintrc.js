/* eslint-disable import/no-extraneous-dependencies, unicorn/prefer-module */
require('@rushstack/eslint-patch/modern-module-resolution');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
    root: true,
    overrides: [
        {
            files: ['*.js', '*.mjs'],
            extends: ['@bodrick/eslint-config']
        },
        {
            files: ['*.ts'],
            extends: ['@bodrick/eslint-config/typescript'],
            parserOptions: {
                project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json', './extensions/*/tsconfig.json'],
                tsconfigRootDir: __dirname
            },
            rules: {
                // 'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
                'import/no-extraneous-dependencies': 'off',
                'no-console': 'off'
            }
        }
    ]
};
