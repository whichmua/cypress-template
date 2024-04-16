const { defineConfig } = require('cypress');

module.exports = defineConfig({
  env: {
    TAGS: 'not @ignore',
  },
  chromeWebSecurity: false,
  watchForFileChanges: false,
  viewportHeight: 720,
  viewportWidth: 1280,
  videoUploadOnPasses: false,
  defaultCommandTimeout: 5000,
  e2e: {
    baseUrl: 'https://www.feefo.com/',
    setupNodeEvents (on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    excludeSpecPattern: ['*.feature', '*.md'],
    specPattern: 'cypress/integration/**/*.spec.js',
  },
});