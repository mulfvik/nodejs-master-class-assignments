/**
 * Handlers for requests
 * @module handlers
 */

// Dependencies
const _data = require('./data');
const helpers = require('./helpers');
const config = require('./config');

// Handlers container
const handlers = {};

// Users handler
handlers.users = (data, callback) => {
  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
}

// User container
handlers._users = {};

// Users - POST
// Required data: name, streetAddress, email, password
// Optional data: none
handlers._users.post = (data, callback) => {
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

// Users - GET
// Required data: email
// Optional data: none
handlers._users.get = (data, callback) => {
  // Check that email address is valid
  const email = helpers.validateEmail(data.queryStringObject.email) ? data.queryStringObject.email.trim() : false;
  if (email) {
    // Get token from headers
    const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the email address
    handlers._tokens.verifyToken(token, email, (tokenIsValid) => {
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

// Users - PUT
// Required data: email
// Optional data: name, streetAddress, password (at least one must be specified)
handlers._users.put = (data, callback) => {
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
      handlers._tokens.verifyToken(token, email, (tokenIsValid) => {
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

// Users - DELETE
// Required data: email
handlers._users.delete = (data, callback) => {
  // Check that email address is valid
  const email = helpers.validateEmail(data.queryStringObject.email) ? data.queryStringObject.email.trim() : false;
  if (email) {
    // Get token from headers
    const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the email address
    handlers._tokens.verifyToken(token, email, (tokenIsValid) => {
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

// Users tokens
handlers.tokens = (data, callback) => {
  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data, callback);
  } else {
    callback(405);
  }
}

// Tokens container
handlers._tokens = {};

// tokens - POST
// Required data: email, password
// Optional data: none
handlers._tokens.post = (data, callback) => {
  const email = helpers.validateEmail(data.payload.email) ? data.payload.email.trim() : false;
  const password = typeof (data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  if (email && password) {
    // Look up the user who matches that email address
    _data.read('users', email, (err, userData) => {
      if (!err && userData) {
        // Hash the sent password and compare it to the password in the user object
        const hashedPassword = helpers.hash(password);
        if (hashedPassword === userData.hashedPassword) {
          // If valid create new token with random name. Set expiration date 1 hour in future
          const tokenId = helpers.createRandomString(20);
          const expires = Date.now() + 1000 * 60 * 60;
          const tokenObject = {
            'email': email,
            'id': tokenId,
            'expires': expires
          };
          // Store the token
          _data.create('tokens', tokenId, tokenObject, (err) => {
            if (!err) {
              callback(200, tokenObject)
            } else {
              callback(500, { 'Error': 'Could not create new token' });
            }
          })
        } else {
          callback(400, { 'Error': 'Password did not match the specified user\'s stored password' });
        }
      } else {
        callback(400, { 'Error': 'Could not find the specified user' });
      }
    })
  } else {
    callback(400, { 'Error': 'Missing required field(s)' });
  }
}

// tokens - GET
// Required data: id
// Optinal data: none
handlers._tokens.get = (data, callback) => {
  // Check if the email address is valid
  const id = typeof (data.queryStringObject.id) === 'string' && data.queryStringObject.id.trim().length === 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // Look up the token
    _data.read('tokens', id, (err, tokenData) => {
      if (!err && tokenData) {
        callback(200, tokenData);
      } else {
        callback(404);
      }
    })
  } else {
    callback(400, { 'Error': 'Missing required field' });
  }
}

// tokens - PUT
// Required data: id, extend
// Optional data: none
handlers._tokens.put = (data, callback) => {
  const id = typeof (data.payload.id) === 'string' && data.payload.id.trim().length === 20 ? data.payload.id.trim() : false;
  const extend = typeof (data.payload.extend) === 'boolean' && data.payload.extend === true ? true : false;
  if (id && extend) {
    // Lookup the existing token
    _data.read('tokens', id, (err, tokenData) => {
      if (!err && tokenData) {
        // Check to make sure the token isn't already expired
        if (tokenData.expires > Date.now()) {
          // Set the expiration an hour from now
          tokenData.expires = Date.now() + 1000 * 60 * 60;
          // Store the new updates
          _data.update('tokens', id, tokenData, (err) => {
            if (!err) {
              callback(200);
            } else {
              callback(500, { 'Error': 'Could not update the token\'s expiration.' });
            }
          })
        } else {
          callback(400, { "Error": "The token has already expired, and cannot be extended." });
        }
      } else {
        callback(400, { 'Error': 'Specified user does not exist.' });
      }
    })
  } else {
    callback(400, { "Error": "Missing required field(s) or field(s) are invalid." });
  }
}

// Tokens - DELETE
// Required data: id
// Optional data: none
handlers._tokens.delete = (data, callback) => {
  // Check that id is valid
  const id = typeof (data.queryStringObject.id) === 'string' && data.queryStringObject.id.trim().length === 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // Lookup the token
    _data.read('tokens', id, (err, tokenData) => {
      if (!err && tokenData) {
        // Delete the token
        _data.delete('tokens', id, (err) => {
          if (!err) {
            callback(200);
          } else {
            callback(500, { 'Error': 'Could not delete the specified token' });
          }
        })
      } else {
        callback(400, { 'Error': 'Could not find the specified token.' });
      }
    })
  } else {
    callback(400, { 'Error': 'Missing required field' });
  }
}

// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = (id, email, callback) => {
  // Lookup the token
  _data.read('tokens', id, (err, tokenData) => {
    if (!err && tokenData) {
      // Check that the token is for the given user and has not expired
      if (tokenData.email == email && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  })
}

// Not found handler
handlers.notFound = (data, callback) => callback(404);

// Export handlers object
module.exports = handlers;