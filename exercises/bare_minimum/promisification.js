/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */

var fs = require("fs");
var request = require("request");
var crypto = require("crypto");
var Promise = require("bluebird");

// (1) Asyncronous HTTP request
var getGitHubProfile = function (user, callback) {
  var options = {
    url: "https://api.github.com/users/" + user,
    headers: { "User-Agent": "request" },
    json: true, // will JSON.parse(body) for us
  };

  request.get(options, function (err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(
        new Error("Failed to get GitHub profile: " + body.message),
        null
      );
    } else {
      callback(null, body);
    }
  });
};

var getGitHubProfileAsync = Promise.promisify(getGitHubProfile);

// (2) Asyncronous token generation
var generateRandomToken = function (callback) {
  crypto.randomBytes(20, function (err, buffer) {
    if (err) {
      return callback(err, null);
    }
    callback(null, buffer.toString("hex"));
  });
};

var generateRandomTokenAsync = Promise.promisify(generateRandomToken);

// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function (filePath, callback) {
  fs.readFile(filePath, "utf8", function (err, file) {
    if (err) {
      return callback(err);
    }

    var funnyFile = file
      .split("\n")
      .map(function (line) {
        return line + " lol";
      })
      .join("\n");

    callback(funnyFile);
  });
};

// This function violates rule (2) of the node style callback pattern,
// therefore we have to reimplement it using the `new Promise` constructor
var readFileAndMakeItFunnyAsync = function (filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, "utf8", function (err, file) {
      if (err) {
        return reject(err);
      }

      var funnyFile = file
        .split("\n")
        .map(function (line) {
          return line + " lol";
        })
        .join("\n");

      resolve(funnyFile);
    });
  });
};

// Alternatively, we could use our previously written function
// and do some error checking on the only argument passed to the callback
readFileAndMakeItFunnyAsync = function (filePath) {
  return new Promise(function (resolve, reject) {
    readFileAndMakeItFunny(filePath, function (errorOrFile) {
      if (errorOrFile instanceof Error) {
        reject(errorOrFile);
      } else {
        resolve(errorOrFile);
      }
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync,
};
