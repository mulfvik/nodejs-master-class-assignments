/**
 * Users handler
 * 
 */

// Dependencies
const _data = require('../lib/data');
const helpers = require('../lib/helpers');
const tokensHandler = require('./tokensHandler');
// User handlers container
const _users = {};

/**
 * @apiVersion 1.0.0
 * @apiName CreateUser
 * @apiGroup Users
 * @api {post} /users Create user
 * @apiParam name Required
 * @apiParam streetAdress Required
 * @apiParam email Required
 * @apiParam password Required
 * @apiParamExample {json} Request body example
 *     {
 *       "name": "John Doe",
 *       "streetAddress": "Street 7",
 *       "email": "john.doe@email.com",
 *       "password": "password"
 *     }
 * @apiSuccessExample Success
 *     200 OK
 * @apiSuccessExample Response body example
 *     {}
 * 
 */

_users.post = (data, callback) => {
  // Check that all required fields are filled out
  const name = typeof (data.payload.name) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
  const streetAddress = typeof (data.payload.streetAddress) === 'string' && data.payload.streetAddress.trim().length > 0 ? data.payload.streetAddress : false;
  const email = helpers.validateEmail(data.payload.email) ? data.payload.email.trim() : false;
  const password = typeof (data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  if (email) {
    if (name && streetAddress && password) {
      // Check that the user does not exist
      _data.read('users', email, (err, data) => {
        if (err) {
          // Hash the password
          const hashedPassword = helpers.hash(password);
          // Creating the user object
          if (hashedPassword) {
            const userObject = {
              'name': name,
              'streetAddress': streetAddress,
              'email': email,
              'hashedPassword': hashedPassword
            }
            // Storing the user
            _data.create('users', email, userObject, (err) => {
              if (!err) {
                callback(200);
              } else {
                callback(500, { 'Error': 'Could not create the new user' });
              }
            })
          } else {
            callback(500, { 'Error': 'Could not hash the user\'s password.' });
          }
        } else {
          callback(400, { 'Error': 'A user with that email address already exists' });
        }
      })
    } else {
      callback(400, { 'Error': 'Missing required fields' });
    }
  } else {
    callback(400, { 'Error': 'Email address is not valid' })
  }
}

/**
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup Users
 * @api {get} /users?email Get user
 * @apiHeader token Active token required
 * @apiHeaderExample Header example
 *     {
 *       token: gid1btk4b0qg3wyqyivg
 *     }
 * @apiParam email Required
 * @apiParamExample Request example
 *     /users?email=john.doe@email.com
 * @apiSuccessExample Success
 *     200 OK
 * @apiSuccessExample Response body example
 *     {
 *       "name": "John Doe",
 *       "streetAddress": "Street 7",
 *       "email": "john.doe@email.com"
 *     }
 * 
 */

_users.get = (data, callback) => {
  // Check that email address is valid
  const email = helpers.validateEmail(data.queryStringObject.email) ? data.queryStringObject.email : false;
  if (email) {
    // Get token from headers
    const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the email address
    tokensHandler.verifyToken(token, email, (tokenIsValid) => {
      if (tokenIsValid) {
        // Lookup the user
        _data.read('users', email, (err, data) => {
          if (!err && data) {
            // Remove the hashed password from the user object before returning it to the requester
            delete data.hashedPassword;
            callback(200, data);
          } else {
            callback(404);
          }
        })
      } else {
        callback(403, { "Error": "Missing required token in header, or token is invalid." });
      }
    })
  } else {
    callback(400, { 'Error': 'Missing required field' });
  }
}

/**
 * @apiVersion 1.0.0
 * @apiName UpdateUser
 * @apiGroup Users
 * @api {put} /users Update user
 * @apiHeader token Active token required
 * @apiHeaderExample Header example
 *     {
 *       token: gid1btk4b0qg3wyqyivg
 *     }
 * @apiParam email Required
 * @apiParam name Optional
 * @apiParam streetAdress Optional
 * @apiParam password Optional
 * @apiParamExample {json} Request body example (at least one optional must be specified)
 *     {
 *       "email": "john.doe@email.com",
 *       "name": "new name",
 *       "streetAddress": "new street adress",
 *       "password": "new password"
 *     }
 * @apiSuccessExample Success
 *     200 OK
 */

_users.put = (data, callback) => {
  // Check for the required field
  const email = helpers.validateEmail(data.payload.email) ? data.payload.email.trim() : false;
  // Check for the optonal fields
  const name = typeof (data.payload.name) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
  const streetAddress = typeof (data.payload.streetAddress) === 'string' && data.payload.streetAddress.trim().length > 0 ? data.payload.streetAddress : false;
  const password = typeof (data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  // Error if the email is invalid
  if (email) {
    // Error if nothing is sent to update
    if (name || streetAddress || password) {
      // Get token from headers
      const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the email address
      tokensHandler.verifyToken(token, email, (tokenIsValid) => {
        if (tokenIsValid) {
          // Look up user
          _data.read('users', email, (err, userData) => {
            if (!err && data) {
              // Update the fields necessary
              if (name) {
                userData.name = name;
              }
              if (streetAddress) {
                userData.streetAddress = streetAddress;
              }
              if (password) {
                userData.hashedPassword = helpers.hash(password);
              }
              // Store the updates
              _data.update('users', email, userData, (err) => {
                if (!err) {
                  callback(200);
                } else {
                  callback(500, { 'Error': 'Could not update the user' });
                }
              })
            } else {
              callback(400, { 'Error': 'The specified user does not exist' });
            }
          })
        } else {
          callback(403, { "Error": "Missing required token in header, or token is invalid." });
        }
      })
    } else {
      callback(400, { 'Error': 'Missing fields to update' });
    }
  } else {
    callback(400, { 'Error': 'Missing required field' });
  }
}

/**
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup Users
 * @api {delete} /users?email Delete user
 * @apiHeader token Active token required
 * @apiHeaderExample Header example
 *     {
 *       token: gid1btk4b0qg3wyqyivg
 *     }
 * 
 * @apiParam email Users unique ID.
 * @apiParamExample Request example
 *     /users?email=john.doe@email.com
 * @apiSuccessExample Success
 *     200 OK
 * @apiSuccessExample Response body example
 *     {}
 *
 */

_users.delete = (data, callback) => {
  // Check that email address is valid
  const email = helpers.validateEmail(data.queryStringObject.email) ? data.queryStringObject.email : false;
  if (email) {
    // Get token from headers
    const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the email address
    tokensHandler.verifyToken(token, email, (tokenIsValid) => {
      if (tokenIsValid) {
        // Lookup the user
        _data.read('users', email, (err, userData) => {
          if (!err && userData) {
            // Delete the user's data
            _data.delete('users', email, (err) => {
              if (!err) {
                callback(200);
              } else {
                callback(500, { 'Error': 'Could not delete the specified user' });
              }
            })
          } else {
            callback(400, { 'Error': 'Could not find the specified user.' });
          }
        })
      } else {
        callback(403, { "Error": "Missing required token in header, or token is invalid." });
      }
    })
  } else {
    callback(400, { 'Error': 'Missing required field' });
  }
}

// Export _users object
module.exports = _users;
