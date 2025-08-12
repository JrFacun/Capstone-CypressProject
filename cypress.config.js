const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
module.exports = defineConfig({
  
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        deleteFile(fileName) {
          const filePath = path.join(__dirname, '..', 'downloads', fileName);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted: ${filePath}`);
          }
          return null;
        }
      });
      return config;
    },
  },
});
