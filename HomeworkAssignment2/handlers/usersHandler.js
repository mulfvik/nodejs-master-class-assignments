/**
 * Users handlers
 */

// Dependencies
const _data = require('../lib/data');
const helpers = require('../lib/helpers');
const tokenHandlers = require('./tokensHandler');

// User handlers container
const _users = {};

/**
 * @apiName CreateUser
 * @apiGroup Users
 * @api {post} /users Create user
 * @apiParamExample {json} Request example:
 *     {
 *       "name": "John Doe",
 *       "streetAddress": "Street 7",
 *       "email": "john.doe@email.com",
 *       "password": "password"
 *     }
 * @apiSuccessExample Success response:
 *     200 OK
 *     {}
 */

// Users - POST
// Required data: name, streetAddress, email, password
// Optional data: none
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
 * @apiName GetUser
 * @apiGroup Users
 * @api {get} /users?email Get user information
 * @apiHeader token Active token required
 * @apiHeaderExample Header example:
 *     {
 *       "token": gid1btk4b0qg3wyqyivg
 *     }
 * 
 * @apiParam {String} email Users unique ID
 * @apiParamExample Request example:
 *     email=john.doe@email.com
 * 
 * @apiSuccessExample Success response:
 *     200 OK
 *     {
 *       "name": "John Doe",
 *       "streetAddress": "Street 7",
 *       "email": "john.doe@email.com"
 *     }
 */

// Users - GET
// Required data: email, token
// Optional data: none
_users.get = (data, callback) => {
  // Check that email address is valid
  const email = helpers.validateEmail(data.queryStringObject.email) ? data.queryStringObject.email.trim() : false;
  if (email) {
    // Get token from headers
    const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the email address
    tokenHandlers.verifyToken(token, email, (tokenIsValid) => {
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
 * @apiName UpdateUser
 * @apiGroup Users
 * @api {put} /users Update user information
 * @apiHeader token Active token required
 * @apiHeaderExample Header example:
 *     {
 *       "token": gid1btk4b0qg3wyqyivg
 *     }
 * 
 * @apiParam {String} email Required
 * @apiParamExample {json} Request example (at least one must be specified):
 *     {
 *       "name": "John Dolittle",
 *       "streetAddress": "Road 7",
 *       "email": "john.doe@email.com",
 *       "password": "secret"
 *     }
 * 
 * @apiSuccessExample Success response:
 *     200 OK
 *     {}
 */

// Users - PUT
// Required data: email
// Optional data: name, streetAddress, password (at least one must be specified)
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
      tokenHandlers.verifyToken(token, email, (tokenIsValid) => {
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
 * @apiName DeleteUser
 * @apiGroup Users
 * @api {delete} /users?email Delete user
 * @apiHeader token Active token required
 * @apiHeaderExample Header example:
 *     {
 *       "token": gid1btk4b0qg3wyqyivg
 *     }
 * 
 * @apiParam {String} email Users unique ID.
 * @apiParamExample Request example:
 *     email=john.doe@email.com
 * 
 * @apiSuccessExample Success response:
 *     200 OK
 *     {}
 */

// Users - DELETE
// Required data: email
_users.delete = (data, callback) => {
  // Check that email address is valid
  const email = helpers.validateEmail(data.queryStringObject.email) ? data.queryStringObject.email.trim() : false;
  if (email) {
    // Get token from headers
    const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the email address
    tokenHandlers.verifyToken(token, email, (tokenIsValid) => {
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