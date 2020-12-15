/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  // declare and return new Promise(function(resolve, reject) {})
  return new Promise((resolve, reject) => {
    // fs.readFile with filepath, callback with err, content
    fs.readFile(filePath, 'utf8', (err, content) => {
      // if there is err, reject, else resolve with first line
      err ? reject(err) : resolve(content.split('\n')[0]);
    });
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  // Declare and return new promise function with res, rej
  return new Promise((resolve, reject) => {
    // Use request to get access to url and callback with err, res
    request(url, (err, res) => {
      // If err, reject with err, else, resolve with status code
      err ? reject(err) : resolve(res.statusCode);
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
