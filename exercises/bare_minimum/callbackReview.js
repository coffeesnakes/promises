/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, content) => {
    // if there is error
    if (err) {
      // callback with err
      callback(err);
    } else { // otherwise
      // callback with err and results(first line)
      callback(err, content.split('\n')[0]);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  // Use http request with provided URL, callback with err and response
  request(url, (err, res) => {
    // If err, callback error
    if (err) {
      callback(new Error(`Invalid URI: ${err}`));
    } else {
      // Else, callback with err and status code
      callback(err, res.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
