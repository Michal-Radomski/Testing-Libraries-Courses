import { defineConfig } from "cypress";

export default defineConfig({
  // video:true,
  // screenshotOnRunFailure:true,
  // videosFolder:"./",
  // screenshotsFolder: "./",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
