const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    rules: {
        // babel inserts `'use strict';` for us
        strict: ['error', 'never']
    }
});
