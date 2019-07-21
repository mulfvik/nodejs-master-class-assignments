/**
 * Handlers for request methods
*/

// Dependencies
const usersHandler = require('./usersHandler');
const tokensHandler = require('./tokensHandler');
const menusHandler = require('./menusHandler');
const cartHandler = require('./cartHandler');
const orderHandler = require('./orderHandler');

// Handlers container
const handlers = {};

// Users methods
handlers.users = (data, callback) => {
  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    // Call the users handler
    usersHandler[data.method](data, callback);
  } else {
    callback(405);
  }
}

// Tokens methods
handlers.tokens = (data, callback) => {
  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    // Call the tokens handler
    tokensHandler[data.method](data, callback);
  } else {
    callback(405);
  }
}

// Menus methods
handlers.menus = (data, callback) => {
  const acceptableMethods = ['get'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    // Call the menus handler
    menusHandler[data.method](data, callback);
  } else {
    callback(405);
  }
}

// Cart methods
handlers.cart = (data, callback) => {
  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    // Call the cart handler
    cartHandler[data.method](data, callback);
  } else {
    callback(405);
  }
}

// Order methods
handlers.order = (data, callback) => {
  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    // Call the order handler
    orderHandler[data.method](data, callback);
  } else {
    callback(405);
  }
}

// Not found handler
handlers.notFound = (data, callback) => callback(404);

// Export all handlers
module.exports = handlers;
