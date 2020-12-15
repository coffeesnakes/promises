/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructor = require('./promiseConstructor');
var promisification = require('./promisification');
var writeFileASync = Promise.promisify(fs.writeFile);


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
//  use pluckFirstLine funct and pass in readfilepath
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
//use .then to pass in githubprofile func
.then((userName) => {
  return promisification.getGitHubProfileAsync(userName);
})

.then ((profileData) => {
  return writeFileASync(writeFilePath, JSON.stringify(profileData), 'utf8')
})

.catch((err) => {
  console.log('failed to run func', err)
})
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
