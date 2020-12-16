/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */

// var combineFirstLineOfManyFiles = function (filePaths, writePath) {
// TODO
// let firstLinesOfFiles = [];
// let promise1 = new Promise((resolve, reject) => {
//   filePaths.forEach((filePath) => {
//     fs.readFile(filePath, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         let text = data.toString().split("\n");
//         let firstLine = text[0];
//         console.log("text: ", firstLine);
//         firstLinesOfFiles.push(resolve(text[0]));
//       }
//     });
//   });
// });
// // join each first line into a new file
// promise2 = new Promise((resolve, reject) => {
//   // writeFile()
// });

// return Promise.all(promise1, promise2).then((values) => {
//   //step 4
// });
var Promise = require("bluebird");
var pluckFirstLine = require("../bare_minimum/promiseConstructor.js")
  .pluckFirstLineFromFileAsync;
var fs = Promise.promisifyAll(require("fs"));

var combineFirstLineOfManyFiles = function (filePaths, writePath) {
  // TODO

  return Promise.all(filePaths.map(pluckFirstLine)).then(function (
    firstLineOfFiles
  ) {
    var combinedFirstLines = firstLineOfFiles.join("\n");
    return fs.writeFileAsync(writePath, combinedFirstLines);
  });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles,
};
// var combineFirstLineOfManyFiles = function (filePaths, writePath) {
//   let promises = filePaths.map((file) => {
//     return readFileAsync(file).then((data) => {
//       return data.toString().split("\n")[0];
//     });
//   });
//   return Promise.all(promises)
//     .then((lines) => {
//       let buff = Buffer.alloc(0);
//       let count = 1;
//       lines.forEach((line) => {
//         if (count < lines.length) {
//           line += "\n";
//           count++;
//         }
//         buff = Buffer.concat([buff, Buffer.from(line)]);
//       });
//       return buff;
//     })
//     .then((buffer) => {
//       return writeFileAsync(writePath, buffer);
//     });
// };

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles,
};
