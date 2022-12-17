const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    plugins: ['no-secrets', 'no-unsanitized'],
    rules: {
        'no-secrets/no-secrets': 'error',
        'no-unsanitized/method': 'error',
        'no-unsanitized/property': 'error'
    }
});
