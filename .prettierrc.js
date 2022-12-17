module.exports = {
    endOfLine: 'auto',
    overrides: [
        {
            files: ['*.yml', '*.json'],
            options: {
                tabWidth: 2
            }
        },
        {
            files: '.editorconfig',
            options: {
                parser: 'yaml'
            }
        },
        {
            files: 'LICENSE',
            options: {
                parser: 'markdown'
            }
        }
    ],
    printWidth: 180,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'none',
    plugins: [require.resolve('prettier-plugin-package')]
};
