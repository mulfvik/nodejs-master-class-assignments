// Please create a simple "Hello World" API. Meaning:
// 1. It should be a RESTful JSON API that listens on a port of your choice. 
// 2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want. 


var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');
var helloResponse = require('./helloResponse');

// Instatiating the http server
var httpServer = http.createServer(function (req, res) {
  unifiedServer(req, res);
});

// Start the http server
httpServer.listen(config.httpPort, function () {
  console.log("The server is listening on " + config.httpPort);
})

// Instatiating the https server
var httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
};
var httpsServer = https.createServer(httpsServerOptions, function (req, res) {
  unifiedServer(req, res);
});

// Start the https server
httpsServer.listen(config.httpsPort, function () {
  console.log("The server is listening on " + config.httpsPort);
})

// Combined server logic
var unifiedServer = function (req, res) {

  var parsedUrl = url.parse(req.url, true);

  var path = parsedUrl.pathname;

  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  var queryStringObject = parsedUrl.query;

  var method = req.method.toLowerCase();

  var headers = req.headers;

  var decoder = new StringDecoder('utf-8');

  var buffer = '';

  req.on('data', function (data) {
    buffer += decoder.write(data);
  });

  req.on('end', function () {

    buffer += decoder.end();

    // Choose the handler this request should go to, if none is found use the "not found" handler
    var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct thedata object to send to the handler
    var data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, function (statusCode, payload) {

      // Use the statusCode called back by the handler, or default to 200
      statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

      // Use the payload called back by the handler, or default to empty object
      payload = typeof (payload) == 'object' ? payload : {};

      // Convert the payload to a string
      var payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
    });

  });
};

var handlers = {};

// Hello handler
handlers.hello = function (data, callback) {
  callback(200, helloResponse);
};

// Not found handler
handlers.notFound = function (data, callback) {
  callback(404);
};

// Define a request router
var router = {
  'hello': handlers.hello
};