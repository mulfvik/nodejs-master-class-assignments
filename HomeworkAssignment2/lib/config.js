/**
 * Module for configuration of enviroments
 */

// Environments container
const environments = {};

// Staging (default) environment
environments.staging = {
  'httpPort': 3000,
  'httpsPort': 3001,
  'envName': 'staging',
  'hashingSecret': 'quiteSecret',
  'stripe': {
    'accountSID': ''
  },
  'mailgun': {
    'key': '',
    'domain': '',
    'from': 'Pizza delivery <mailgun@sandboxc9f9cd3e2c5148d8afe23b39e3a1f13a.mailgun.org>'
  }
}

// Production environment
environments.production = {
  'httpPort': 5000,
  'httpsPort': 5001,
  'envName': 'production',
  'hashingSecret': 'superSecret',
  'stripe': {
    'accountSID': ''
  },
  'mailgun': {
    'key': '',
    'domain': '',
    'from': ''
  }
}

// Check which enviroment is passed from command-line argument
const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check if the enviroment exists, else default to staging
const environmentToExport = typeof (environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

// Export environments object
module.exports = environmentToExport;
