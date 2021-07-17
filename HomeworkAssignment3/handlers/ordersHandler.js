/**
 * Handler for managing orders
 *
 */

// Dependencies
const _data = require('../lib/data');
const helpers = require('../lib/helpers');
const tokensHandler = require('./tokensHandler');

// Order handlers container
const _orders = {};

/**
 * @apiVersion 1.0.0
 * @apiName CreateOrder
 * @apiGroup Orders
 * @api {post} /orders Create order
 * @apiParam cartId Required
 * @apiHeader token Active token required
 * @apiHeaderExample Header example
 *     token: gid1btk4b0qg3wyqyivg
 * @apiParamExample {json} Request body example
 * {
 *   "cartId": "ui04nlivf96zbajkvaxz"
 * }
 * @apiSuccessExample Success
 *     200 OK
 * @apiSuccessExample Response body example
 *     {}
 * 
 */

_orders.post = (data, callback) => {
  // Validate input
  const cartId = typeof (data.payload.cartId) === 'string' && data.payload.cartId.trim().length > 0 ? data.payload.cartId.trim() : false;
  if (cartId) {
    // Lookup the users cart
    _data.read('carts', cartId, (err, cartData) => {
      if (!err && cartData) {
        const email = cartData.email;
        const menuItems = cartData.menuItems;
        // Get the sum of the carts items to debit
        const total = helpers.getCartTotal(menuItems);
        // Get token from headers
        const token = typeof (data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid
        tokensHandler.verifyToken(token, email, (tokenIsValid) => {
          if (tokenIsValid) {
            const orderId = helpers.createRandomString(20);
            const orderObj = {
              'id': orderId,
              email,
              cartId
            };
            // Create a new order.
            _data.create('orders', orderId, orderObj, (err) => {
              if (!err) {
                // Update user order.
                _data.read('users', email, (err, userData) => {
                  if (!err && userData) {
                    userData.orders = typeof (orders) == 'object' && orders instanceof Array ? orders : [];
                    userData.orders.push(orderId);
                    _data.update('users', email, userData, (err) => {
                      if (!err) {
                        // Get paid
                        helpers.stripePayment(total, 'sek', 'tok_se', 'test charge', (err) => {
                          if (!err) {
                            // Send email
                            const text = `Thank you for your order ${userData.name}!\nWe have charged your account ${total / 100} kr and your order is on its way!`;
                            const subject = `Your pizza order, #${orderId}`;
                            helpers.mailgun(email, subject, text, (err) => {
                              if (!err) {
                                callback(200);
                              } else {
                                callback(500, { 'Error': 'Could not send email.' });
                              }
                            });
                          } else {
                            callback(500, { 'Error': 'Could not get paid.' });
                          }
                        });
                      } else {
                        callback(500, { 'Error': 'Could not update the user\'s order.' });
                      }
                    });
                  } else {
                    callback(400, { 'Error': 'Could not find the user who created the order.' });
                  }
                });
              } else {
                callback(500, { 'Error': 'Could not create order.' });
              }
            });
          } else {
            callback(403, { 'Error': 'Missing required token in header, or token is invalid.' });
          }
        });
      } else {
        callback(400, { 'Error': 'Could not find cart.' });
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required inputs, or inputs are invalid.' });
  }
};

/**
 * @apiVersion 1.0.0
 * @apiName GetOrders
 * @apiGroup Orders
 * @api {get} /orders Get order
 * @apiParam orderId Required
 * @apiHeader token Active token required
 * @apiHeaderExample Header example
 *     token: gid1btk4b0qg3wyqyivg
 * @apiParamExample Request example
 *     /orders?id=5chf43l8zge8r0too909
 * @apiSuccessExample Success
 *     200 OK
 * @apiSuccessExample Response body example
 * {
 *     "id": "5chf43l8zge8r0too909",
 *     "email": "john.doe@email.com",
 *     "cartId": "ui04nlivf96zbajkvaxz"
 * }
 * 
 */

_orders.get = (data, callback) => {
  const id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    _data.read('orders', id, (err, orderData) => {
      if (!err && orderData) {
        // Get the token that sent the request
        const token = typeof (data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the cart
        tokensHandler.verifyToken(token, orderData.email, (tokenIsValid) => {
          if (tokenIsValid) {
            // Return order data
            callback(200, orderData);
          } else {
            callback(403, { 'Error': 'Missing required token in header or token is invalid.' });
          }
        });
      } else {
        callback(404, { 'Error': 'Could not find order' });
      }
    });
  } else callback(400, { 'Error': 'Missing required inputs' });
};


// Export the _order object
module.exports = _orders;
