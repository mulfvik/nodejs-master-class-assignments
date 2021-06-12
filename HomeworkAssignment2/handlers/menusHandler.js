/**
 * Menus handler
 * 
 */

// Dependencies
const _data = require('../lib/data');
const helpers = require('../lib/helpers');
const tokensHandler = require('./tokensHandler');

// Menus handler container
const _menu = {};

// Menus - GET
// Required data: menu, token, email
// Optional data: none
_menu.get = (data, callback) => {
  // Check that email address and menu are valid
  const menu = typeof (data.payload.menu) === 'string' ? data.payload.menu : false;
  const email = helpers.validateEmail(data.queryStringObject.email) ? data.queryStringObject.email : false;
  if (menu && email) {
    const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the email address
    tokensHandler.verifyToken(token, email, (tokenIsValid) => {
      if (tokenIsValid) {
        // Find menu
        _data.read('menus', menu, (err, data) => {
          if (!err && data) {
            // Return menu
            callback(200, data);
          } else {
            callback(400, { 'Error': 'Could not get the menu' });
          }
        });
      } else {
        callback(403, { "Error": "Missing required token in header, or token is invalid." });
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required fields' });
  }
};

// Export _menus object
module.exports = _menu;
