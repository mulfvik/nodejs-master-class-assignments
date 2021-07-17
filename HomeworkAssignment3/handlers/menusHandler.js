/**
 * Menus handler
 * 
 */

// Dependencies
const _data = require('../lib/data');

// Menus handler container
const _menu = {};

/**
 * @apiVersion 1.0.0
 * @apiName GetMenu
 * @apiGroup Menu
 * @api {get} /menus Get menu
 * @apiParam menu Required
 * @apiParamExample {json} Request body example
 *     {
 *       "menu": "pizza"
 *     }
 * @apiSuccessExample Success
 *     200 OK
 * 
 */
_menu.get = (data, callback) => {
  // Check that email address and menu are valid
  const menu = typeof (data.payload.menu) === 'string' ? data.payload.menu : false;
  if (menu) {
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
    callback(400, { 'Error': 'Missing required fields' });
  }
};

// Export _menus object
module.exports = _menu;
