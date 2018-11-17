// Container for all configurations
var environments = {};

// Staging (default) environment
environments.development = {
  'httpPort': 3000,
  'httpsPort': 3001,
  'envName': 'development'
};

// Production environment
environments.production = {
  'httpPort': 5000,
  'httpsPort': 5001,
  'envName': 'production'
};

// Determine which environment was passed as an command-line argument
var currentEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check if the current enviroment is one of the environments defined, if not, default to staging
var environmentToExport = typeof (environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.development;

// Export the module
module.exports = environmentToExport;