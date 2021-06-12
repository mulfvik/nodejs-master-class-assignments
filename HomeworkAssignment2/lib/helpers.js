/**
 * Helpers for tasks
 */

// Dependencies
const crypto = require('crypto');
const https = require('https');
const config = require('./config');
const querystring = require('querystring');

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
};

// Parse a json string to an object in all cases without throwing
helpers.parseJsonToObject = str => {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

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
};

// Check if email is valid
helpers.validateEmail = email => {
  if (email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  } else {
    return false;
  }
};

// Get paid with Stripe
helpers.stripePayment = (amount, currency, source, description, callback) => {
  // Validate parameters
  amount = typeof (amount) === 'number' && amount >= 0 && amount <= 99999999 ? amount : false;
  currency = typeof (currency) === 'string' && currency.trim().length === 3 ? currency.trim() : false;
  source = typeof (source) === 'string' ? source : false;
  description = typeof (description) === 'string' && description.trim().length > 0 && description.trim().length <= 1000 ? description.trim() : false;

  if (amount && currency && source && description) {
    // Configure the request payload
    const payload = {
      'amount': amount,
      'currency': currency,
      'source': source,
      'description': description
    };

    // Stringify the payload with querystring
    const stringPayload = querystring.stringify(payload);

    // Configure the request details
    const requestDetails = {
      'protocol': 'https:',
      'hostname': 'api.stripe.com',
      'method': 'POST',
      'path': '/v1/charges',
      'auth': config.stripe.accountSID,
      'headers': {
        'Stripe-Version': '2019-03-14',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(stringPayload)
      }
    };

    // Instantiate the request object
    const req = https.request(requestDetails, (res) => {
      // Grab the status of the sent request
      const status = res.statusCode;
      // Callback successfully if the request went through
      if (status == 200 || status == 201) {
        // TODO Ta bort detta, endast för att test
        // Read the response object 
        res.on('data', (data) => {
          const resObject = JSON.parse(data);
          callback(resObject.amount + ' ' + resObject.currency);
          //callback(false);
        });
      } else {
        callback('Status code returned was ' + status);
      }
    });

    // Bind to the error event so it doesnt get thrown
    req.on('error', (e) => {
      callback(e);
    });

    // Add the payload
    req.write(stringPayload);

    // End the request
    req.end();

  } else {
    callback('Given parameters were missing or invalid');
  }
};

// Send email with mailgun
helpers.mailgun = (to, subject, text, callback) => {
  // Validate parameters
  to = helpers.validateEmail(to) ? to : false;
  subject = typeof (subject) == 'string' && subject.trim().length > 0 ? subject.trim() : false;
  text = typeof (text) == 'string' && text.trim().length > 0 && text.trim().length <= 1000 ? text.trim() : false;

  if (to && subject && text) {
    // Configure the request payload
    const payload = {
      "from": config.mailgun.from,
      "to": to,
      "subject": subject,
      "text": text
    };

    // Stringify the payload with querystring
    const stringPayload = querystring.stringify(payload);

    // Configure the request details
    const requestDetails = {
      'protocol': 'https:',
      'hostname': 'api.mailgun.net',
      'method': 'POST',
      'path': '/v3/' + config.mailgun.domain + '/messages',
      'auth': 'api:' + config.mailgun.key,
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(stringPayload)
      }
    };

    // Instantiate the request object
    const req = https.request(requestDetails, (res) => {
      // Grab the status of the sent request
      const status = res.statusCode;
      // Callback successfully if the request went through
      if (status == 200 || status == 201) {
        callback(false);
      } else {
        callback('Status code returned was ' + status);
      }
    });

    // Bind to the error event so it doesnt get thrown
    req.on('error', (e) => {
      callback(e);
    });

    // Add the payload
    req.write(stringPayload);

    // End the request
    req.end();

  } else {
    callback('Given parameters were missing or invalid');
  }
};

// Export helpers object
module.exports = helpers;
