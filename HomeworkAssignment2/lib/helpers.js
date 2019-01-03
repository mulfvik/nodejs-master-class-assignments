/**
 * Helpers for tasks
 * @module helpers
 */

// Dependencies
const crypto = require('crypto');
const config = require('./config');

// Helpers container
const helpers = {};

// Creates a SHA256 hash
helpers.hash = str => {
  if (typeof (str) == 'string' && str.length > 0) {
    const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
}

// Parse a json string to an object in all cases without throwing
helpers.parseJsonToObject = str => {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
}

// Create a string of random alphanumeric characters of a given length
helpers.createRandomString = strLength => {
  strLength = typeof (strLength) == 'number' && strLength > 0 ? strLength : false;
  if (strLength) {
    // Define all the possible characters that could go into a string
    const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Start the final string
    let str = '';

    for (i = 1; i <= strLength; i++) {
      // Get a random charactert from the possibleCharacters string
      const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));

      // Append this character to the string
      str += randomCharacter;
    }
    // Return the final string
    return str;
  } else {
    return false;
  }
}

// Check if users email is valid
helpers.validateEmail = email => {
  if (email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  } else {
    return false;
  }
}

// Export helpers object
module.exports = helpers;