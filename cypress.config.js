const { defineConfig } = require("cypress");
const express = require("express");

let server;

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com', // ✅ Set base URL here
   setupNodeEvents(on, config) {
      on("task", {
        startMockServer() {
          const app = express();

          // This endpoint simulates your 405 response
          app.delete("/api/verifyLogin", (req, res) => {
            res.status(405).send("This request method is not supported.");
          });

          server = app.listen(3001, () => {
            console.log("Mock server running on http://localhost:3001");
          });

          return null;
        },
        stopMockServer() {
          if (server) server.close();
          return null;
        }
      });

      return config;
    },
  },
});
