import { defineConfig } from "cypress";

export default defineConfig({
  // video:true,
  // screenshotOnRunFailure:true,
  // videosFolder:"./",
  // screenshotsFolder: "./",
  defaultCommandTimeout: 4000, // Default values
  pageLoadTimeout: 6000, // Default values
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        seedDatabase(filename) {
          // Run your NodeJS code
          // e.g., edit a file here
          return filename;
        },
      });
    },
  },
});
