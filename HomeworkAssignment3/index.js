/**
 * Primary module for the application
 * 
 */

// Dependencies
const server = require('./lib/server');

// Application container
const app = {};

// Initialize the app
app.init = () => {

  // Start the server
  server.init();
};

// Execute app
app.init();

// Export app object
module.exports = app;
