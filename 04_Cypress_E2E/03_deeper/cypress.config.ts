import { defineConfig } from "cypress";

export default defineConfig({
  // video:true,
  // screenshotOnRunFailure:true,
  // videosFolder:"./",
  // screenshotsFolder: "./",
  defaultCommandTimeout: 4000, // Default values
  pageLoadTimeout: 6000, // Default values
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
