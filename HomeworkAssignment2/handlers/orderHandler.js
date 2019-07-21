/**
 * Handler for managing orders
 *
 */

// Dependencies
const _data = require('../lib/data');
const helpers = require('../lib/helpers');
const tokensHandler = require('./tokensHandler');

// Order handlers container
const _order = {};

// // TODO Ta bort detta, endast för att testa
// helpers.stripePayment(2000, 'sek', 'tok_visa', 'test charge', function (response) {
//   console.log(response);
// });

// // TODO Ta bort detta, endast för att testa
// helpers.mailgun('ulfvik.mikael@gmail.com', 'test mailgun', 'test mailgun message', function (response) {
//   console.log(response);
// });







// Export the _order object
module.exports = _order;
