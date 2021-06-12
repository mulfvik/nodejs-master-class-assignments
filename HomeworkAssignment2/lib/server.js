/**
 * Module for server related tasks
 */

// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');
const handlers = require('../handlers/handlers');
const helpers = require('./helpers');
const path = require('path');

// Server container
const server = {};

// Instantiate the http server
server.httpServer = http.createServer((req, res) => server.unifiedServer(req, res));

// Instantiate the https server
server.httpsServerOptions = {
  'key': fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
  'cert': fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
};
server.httpsServer = https.createServer((req, res) => server.unifiedServer(req, res));

// Server logic for both the servers
server.unifiedServer = (req, res) => {

  // Get the url and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path of the url
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP method
  const method = req.method.toLowerCase();

  // Get headers as an object
  const headers = req.headers;

  // Get the payload, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', data => buffer += decoder.write(data));

  req.on('end', () => {
    buffer += decoder.end();

    // Choose the handler this request should go to, if none is found use the "not found" handler
    const chosenHandler = typeof (server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

    // Construct the data object to send to the handler
    const data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': helpers.parseJsonToObject(buffer)
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, (statusCode, payload) => {

      // Use the statusCode called back by the handler, or default to 200
      statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

      // Use the payload called back by the handler, or default to an empty object
      payload = typeof (payload) == 'object' ? payload : {};

      // Convert the payload to a string
      const payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log out the status of the response, in green if 200 else in red
      if (statusCode == 200) {
        console.log('\x1b[32m%s\x1b[0m', method.toUpperCase() + ' /' + trimmedPath + ' ' + statusCode);
      } else {
        console.log('\x1b[31m%s\x1b[0m', method.toUpperCase() + ' /' + trimmedPath + ' ' + statusCode);
      }
    });
  });
};

// Request routs
server.router = {
  'users': handlers.users,
  'tokens': handlers.tokens,
  'menus': handlers.menus,
  'menuItems': handlers.menuItems,
  'cart': handlers.cart
};

// Initialize the servers
server.init = () => {

  // Start the HTTP server
  server.httpServer.listen(config.httpPort, () => {
    console.log('\x1b[36m%s\x1b[0m', 'The HTTP server is running on port ' + config.httpPort);
  });

  // Start the HTTPS server
  server.httpsServer.listen(config.httpsPort, () => {
    console.log('\x1b[35m%s\x1b[0m', 'The HTTPS server is running on port ' + config.httpsPort);
  });
};

// Export server object
module.exports = server;
