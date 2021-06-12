
/**
 * Menu items handler
 * 
 */

// Dependencies
const _data = require('../lib/data');

// MenuItems handler container
_menuItems = {};

/**
 * @apiVersion 1.0.0
 * @apiName GetMenuItem
 * @apiGroup Menu
 * @api {get} /menus Get menu item
 * @apiParam id Required
 * @apiParam menu Required

 * @apiParamExample {json} Request body example
 *     {
 *       "menu": "pizza"
 *     }
 * @apiSuccessExample Success
 *     200 OK
 * 
 */
_menuItems.get = (data, callback) => {
  const menu = typeof (data.payload.menu) === 'string' ? data.payload.menu : false;
  const id = typeof (data.queryStringObject.id) === 'string' ? data.queryStringObject.id : false;
  if (menu && id) {
    _data.read('menus', menu, (err, data) => {
      if (!err && data) {
        const item = data.filter(item => item.id == id);
        const itemObj = item[0];
        if (item.length == 1) {
          callback(200, itemObj);
        } else {
          callback(400, { 'Error': 'Could not get menu item.' });
        }
      } else {
        callback(400, { 'Error': 'Could not get the menu' });
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required fields.' });
  }
};

// Export _menus object
module.exports = _menuItems;