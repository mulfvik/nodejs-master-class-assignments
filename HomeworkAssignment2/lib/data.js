/**
 * Library for storing and editing data
 */

// Dependencies
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');

// Library container
const lib = {};

lib.baseDir = path.join(__dirname, '/../.data/');

// Writes data to file
lib.create = (dir, file, data, callback) => {

  // Open file
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {

      // Convert data to string
      const stringData = JSON.stringify(data);

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData, (err) => {
        if (!err) {
          fs.close(fileDescriptor, (err) => {
            if (!err) {
              callback(false);
            } else {
              callback('Error closing the file');
            }
          })
        } else {
          callback('Error writing to file');
        }
      })
    } else {
      callback('Could not create new file, it may already exist');
    }
  })
}

// Read data from file
lib.read = (dir, file, callback) => {
  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', (err, data) => {
    if (!err && data) {
      const parsedData = helpers.parseJsonToObject(data);
      callback(false, parsedData);
    } else {
      callback(err, data);
    }
  })
}

// Update data in file
lib.update = (dir, file, data, callback) => {

  // Open the file for writing 
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {

      // Convert data to string
      const stringData = JSON.stringify(data);

      // Truncate the file
      fs.ftruncate(fileDescriptor, (err) => {
        if (!err) {

          // Write to the file and close it
          fs.writeFile(fileDescriptor, stringData, (err) => {
            if (!err) {
              fs.close(fileDescriptor, (err) => {
                if (!err) {
                  callback(false);
                } else {
                  callback('Error closing the file');
                }
              })
            } else {
              callback('Error writing to existing file');
            }
          })
        } else {
          callback('Error truncating the file');
        }
      })
    } else {
      callback('Could not update file, it may not exist yet');
    }
  })
}

// Deleting file
lib.delete = (dir, file, callback) => {

  // Unlink method
  fs.unlink(lib.baseDir + dir + '/' + file + '.json', (err) => {
    if (!err) {
      callback(false);
    } else {
      callback('Error deleting the file');
    }
  })
}

// Export lib object
module.exports = lib;