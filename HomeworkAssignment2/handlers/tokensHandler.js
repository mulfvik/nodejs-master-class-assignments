/**
 * Tokens handler
 * 
 */

// Dependencies
const _data = require('../lib/data');
const helpers = require('../lib/helpers');
// Tokens handler container
_tokens = {};


/**
 * @apiVersion 1.0.0
 * @apiName CreateToken
 * @apiGroup Tokens
 * @api {post} /tokens Create token
 * @apiParam email Required
 * @apiParam password Required
 * @apiParamExample {json} Request body example
 *     {
 *       "email": "john.doe@email.com",
 *       "password": "password"
 *     }
 * @apiSuccessExample Success
 *     200 OK
 * @apiSuccessExample Response body example
 *     {
 *       "email": "john.doe@email.com",
 *       "id": "gid1btk4b0qg3wyqyivg",
 *       "expires": 1554639663830
 *     }
 *
 */

_tokens.post = (data, callback) => {
  const email = helpers.validateEmail(data.payload.email) ? data.payload.email : false;
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
          const expires = Date.now() + 100000 * 60 * 60;
          const tokenObject = {
            'email': email,
            'id': tokenId,
            'expires': expires
          };
          // Store the token
          _data.create('tokens', tokenId, tokenObject, (err) => {
            if (!err) {
              callback(200, tokenObject);
            } else {
              callback(500, { 'Error': 'Could not create new token' });
            }
          });
        } else {
          callback(400, { 'Error': 'Password did not match the specified users stored password' });
        }
      } else {
        callback(400, { 'Error': 'Could not find the specified user' });
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required field(s)' });
  }
};


/**
 * @apiVersion 1.0.0
 * @apiName GetToken
 * @apiGroup Tokens
 * @api {get} /tokens?id Get token
 * @apiParamExample Request example:
 *     /tokens?id=1234567890
 * @apiSuccessExample Success
 *     200 OK
 * @apiSuccessExample Response body example
 *     {
 *       "email": "john.doe@email.com",
 *       "id": "gid1btk4b0qg3wyqyivg",
 *       "expires": 1554639663830
 *     }
 * 
 */

_tokens.get = (data, callback) => {
  // Check if the id is valid
  const id = typeof (data.queryStringObject.id) === 'string' && data.queryStringObject.id.trim().length === 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // Look up the token
    _data.read('tokens', id, (err, tokenData) => {
      if (!err && tokenData) {
        callback(200, tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required field' });
  }
};

/**
 * @apiVersion 1.0.0
 * @apiName UpdateToken
 * @apiGroup Tokens
 * @api {put} /tokens Update token
 * @apiParam id Required
 * @apiParam {boolean} extend Required
 * @apiParamExample {json} Request body example
 *     {
 *       "id": "gid1btk4b0qg3wyqyivg",
 *       "extend": true
 *     }
 * @apiSuccessExample Success
 *     200 OK
 * @apiSuccessExample Success body
 *     {}
 * 
 */

_tokens.put = (data, callback) => {
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
          });
        } else {
          callback(400, { "Error": "The token has already expired, and cannot be extended." });
        }
      } else {
        callback(400, { 'Error': 'Specified user does not exist.' });
      }
    });
  } else {
    callback(400, { "Error": "Missing required field(s) or field(s) are invalid." });
  }
};

/**
 * @apiVersion 1.0.0
 * @apiName DeleteToken
 * @apiGroup Tokens
 * @api {delete} /tokens?id Delete token
 * @apiParamExample Request example
 *     /tokens?id=gid1btk4b0qg3wyqyivg
 * @apiSuccessExample Success
 *     200 OK
 * @apiSuccessExample Response body example
 *     {}
 *
 */

_tokens.delete = (data, callback) => {
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
        });
      } else {
        callback(400, { 'Error': 'Could not find the specified token.' });
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required field' });
  }
};

// Verify if a given token id is currently valid for a given user
_tokens.verifyToken = (id, email, callback) => {
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
  });
};

// Export _tokens object
module.exports = _tokens;
