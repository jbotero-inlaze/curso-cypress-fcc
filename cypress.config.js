const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // config base url for all e2e tests
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
