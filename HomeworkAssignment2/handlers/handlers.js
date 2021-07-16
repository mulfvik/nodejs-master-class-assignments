/**
 * Handlers for request methods
*/

// Dependencies
const usersHandler = require('./usersHandler');
const tokensHandler = require('./tokensHandler');
const menusHandler = require('./menusHandler');
const menuItemsHandler = require('./menuItemsHandler');
const cartsHandler = require('./cartsHandler');
const ordersHandler = require('./ordersHandler');

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
};

// Tokens methods
handlers.tokens = (data, callback) => {
  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    // Call the tokens handler
    tokensHandler[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Menus methods
handlers.menus = (data, callback) => {
  const acceptableMethods = ['get'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    // Call the menus handler
    menusHandler[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Menu items methods
handlers.menuItems = (data, callback) => {
  const acceptableMethods = ['get'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    // Call the menuItems handler
    menuItemsHandler[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Cart methods
handlers.carts = (data, callback) => {
  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    // Call the cart handler
    cartsHandler[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Order methods
handlers.orders = (data, callback) => {
  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    // Call the order handler
    ordersHandler[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Not found handler
handlers.notFound = (data, callback) => callback(404);

// Export all handlers
module.exports = handlers;
