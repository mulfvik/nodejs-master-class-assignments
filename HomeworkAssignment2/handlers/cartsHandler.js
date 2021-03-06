/**
 * Cart handler
 * 
 */

// Dependencies
const _data = require('../lib/data');
const helpers = require('../lib/helpers');
const tokensHandler = require('./tokensHandler');

// Cart handlers container
const _carts = {};

/**
 * @apiVersion 1.0.0
 * @apiName CreateCart
 * @apiGroup Carts
 * @api {post} /carts Create cart
 * @apiParam menuItems Required
 * @apiHeader token Active token required
 * @apiHeaderExample Header example
 *     token: gid1btk4b0qg3wyqyivg
 * @apiParamExample {json} Request body example
 * {
 *     "menuItems": [
 *         {
 *             "id": 1,
 *             "name": "Margarita",
 *             "price": 92
 *         },
 *         {
 *             "id": 2,
 *             "name": "Calzone",
 *             "price": 109
 *         }
 *     ]
 * }
 * @apiSuccessExample Success
 *     200 OK
 * @apiSuccessExample Response body example
 * {
 *     "id": "ui04nlivf96zbajkvaxz",
 *     "email": "john.doe@email.com",
 *     "menuItems": [
 *         {
 *             "id": 1,
 *             "name": "Margarita",
 *             "toppings": "",
 *             "price": 92
 *         },
 *         {
 *             "id": 2,
 *             "name": "Calzone",
 *             "toppings": "Ham",
 *             "price": 109
 *         }
 *     ]
 * }
 * 
 */

_carts.post = (data, callback) => {
  // Validate inputs
  const menuItems = typeof (data.payload.menuItems) == 'object' && data.payload.menuItems instanceof Array && data.payload.menuItems.length > 0 ? data.payload.menuItems : false;
  if (menuItems) {
    // Get token from headers
    const token = typeof (data.headers.token) == 'string' ? data.headers.token : false;
    // Lookup the user email by reading the token
    _data.read('tokens', token, (err, tokenData) => {
      if (!err && tokenData) {
        const email = tokenData.email;
        // Lookup the user data
        _data.read('users', email, (err, userData) => {
          if (!err && userData) {
            const userCart = typeof (userData.cart) == 'object' && userData.cart instanceof Array ? userData.cart : [];
            if (userCart.length < 1) {
              // Create random id for cart
              const cartId = helpers.createRandomString(20);
              // Create cart object including email
              const cartObj = {
                'id': cartId,
                'email': email,
                'menuItems': menuItems
              };
              // Save the object
              _data.create('carts', cartId, cartObj, (err) => {
                if (!err) {
                  // Add cart id to the user's object
                  userData.cart = userCart;
                  userData.cart.push(cartId);
                  // Save the new user data
                  _data.update('users', email, userData, (err) => {
                    if (!err) {
                      // Return the data about the new cart
                      callback(200, cartObj);
                    } else {
                      callback(500, { 'Error': 'Could not update the user with the new cart.' });
                    }
                  });
                } else {
                  callback(500, { 'Error': 'Could not create the new cart' });
                }
              });
            } else {
              callback(403, { 'Error': 'Delete or continue with current cart' });
            }
          } else {
            callback(403);
          }
        });
      } else {
        callback(403);
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required inputs, or inputs are invalid' });
  }
};

/**
 * @apiVersion 1.0.0
 * @apiName GetCart
 * @apiGroup Carts
 * @api {get} /carts Get cart
 * @apiParam cartId Required
 * @apiHeader token Active token required
 * @apiHeaderExample Header example
 *     token: gid1btk4b0qg3wyqyivg
 * @apiParamExample Request example
 *     /carts?id=uiszdaz19pch42yfqktk
 * @apiSuccessExample Success
 *     200 OK
 * @apiSuccessExample Response body example
 * {
 *     "id": "uiszdaz19pch42yfqktk",
 *     "email": "john.doe@email.com",
 *     "menuItems": [
 *         {
 *             "id": 1,
 *             "name": "Margarita",
 *             "toppings": "",
 *             "price": 92
 *         },
 *         {
 *             "id": 1,
 *             "name": "Margarita",
 *             "toppings": "",
 *             "price": 109
 *         }
 *     ]
 * }
 * 
 */

_carts.get = (data, callback) => {
  // Check that id is valid
  const id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // Lookup the cart
    _data.read('carts', id, (err, cartData) => {
      if (!err && cartData) {
        // Get the token that sent the request
        const token = typeof (data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the cart
        tokensHandler.verifyToken(token, cartData.email, (tokenIsValid) => {
          if (tokenIsValid) {
            // Return cart data
            callback(200, cartData);
          } else {
            callback(403, {'Error': 'Missing required token in header or token is invalid.'});
          }
        });
      } else {
        callback(404, {'Error': 'Could not find cart'});
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required field, or field is invalid' });
  }
};

/**
 * @apiVersion 1.0.0
 * @apiName UpdateCart
 * @apiGroup Carts
 * @api {put} /carts Update cart
 * @apiParam menuItems Required
 * @apiHeader token Active token required
 * @apiHeaderExample Header example
 *     token: gid1btk4b0qg3wyqyivg
 * @apiParamExample Request example
 *     /carts?id=uiszdaz19pch42yfqktk
 * @apiParamExample {json} Request body example
 * {
 *     "menuItems": [
 *         {
 *             "id": 1,
 *             "name": "Margarita",
 *             "price": 92
 *         },
 *         {
 *             "id": 2,
 *             "name": "Calzone",
 *             "price": 109
 *         }
 *     ]
 * }
 * @apiSuccessExample Success
 *     200 OK
 * @apiSuccessExample Response body example
 *     {}
 * 
 */
_carts.put = (data, callback) => {
  // Check for required field
  const id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  const menuItems = typeof (data.payload.menuItems) == 'object' && data.payload.menuItems instanceof Array && data.payload.menuItems.length > 0 ? data.payload.menuItems : false;
  // Check to ensure id is valid
  if (id) {
    // Check to make sure that one or more optional fields has been sent
    if (menuItems) {
      // Lookup the cart
      _data.read('carts', id, (err, cartData) => {
        if (!err && cartData) {
          // Get the token that sent the request
          const token = typeof (data.headers.token) == 'string' ? data.headers.token : false;
          // Verify that the given token is valid and belongs to the user who created the cart
          tokensHandler.verifyToken(token, cartData.email, (tokenIsValid) => {
            if (tokenIsValid) {
              // Update the cart with new cart
              if (menuItems) {
                cartData.menuItems = menuItems;
              }
              // Store the new updates
              _data.update('carts', id, cartData, (err) => {
                if (!err) {
                  callback(200);
                } else {
                  callback(500, { 'Error': 'Could not update the cart' });
                }
              });
            } else {
              callback(403);
            }
          });
        } else {
          callback(400, { 'Error': 'Cart id did not exist' });
        }
      });
    } else {
      callback(400, { 'Error': 'Missing field to update' });
    }
  } else {
    callback(400, { 'Error': 'Missing required field' });
  }
};

/**
 * @apiVersion 1.0.0
 * @apiName DeleteCart
 * @apiGroup Carts
 * @api {del} /carts Delete cart
 * @apiParam cartId Required
 * @apiHeader token Active token required
 * @apiHeaderExample Header example
 *     token: gid1btk4b0qg3wyqyivg
 * @apiParamExample Request example
 *     /carts?id=uiszdaz19pch42yfqktk
 * @apiSuccessExample Success
 *     200 OK
 * @apiSuccessExample Response body example
 *     {}
 * 
 */

_carts.delete = (data, callback) => {
  // Check that id is valid
  const id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // Lookup the cart
    _data.read('carts', id, (err, cartData) => {
      if (!err && cartData) {
        // Get the token that sent the request
        const token = typeof (data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the cart
        tokensHandler.verifyToken(token, cartData.email, (tokenIsValid) => {
          if (tokenIsValid) {
            // Delete the cart data
            _data.delete('carts', id, (err) => {
              if (!err) {
                // Lookup the user's object to get their cart
                _data.read('users', cartData.email, (err, userData) => {
                  if (!err) {
                    const userCarts = typeof (userData.cart) == 'object' && userData.cart instanceof Array ? userData.cart : [];
                    // Remove the deleted cart from users data
                    const cartPosition = userCarts.indexOf(id);
                    if (cartPosition > -1) {
                      userCarts.splice(cartPosition, 1);
                      // Re-save the user's data
                      userData.cart = userCarts;
                      _data.update('users', cartData.email, userData, (err) => {
                        if (!err) {
                          callback(200);
                        } else {
                          callback(500, { 'Error': 'Could not update the user.' });
                        }
                      });
                    } else {
                      callback(500, { "Error": "Could not find the cart on the user's object, so could not remove it." });
                    }
                  } else {
                    callback(500, { "Error": "Could not find the user who created the cart, so could not remove the cart on their user object." });
                  }
                });
              } else {
                callback(500, { "Error": "Could not delete the cart data." });
              }
            });
          } else {
            callback(403);
          }
        });
      } else {
        callback(400, { "Error": "The cart ID specified could not be found" });
      }
    });
  } else {
    callback(400, { "Error": "Missing valid id" });
  }
};

// Export the _carts object
module.exports = _carts;
