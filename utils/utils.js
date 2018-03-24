const cp = require("child_process");
const path = require("path");
const fs = require("fs");

const promisifiedExec = command => dir =>
  new Promise((resolve, reject) => {
    const p = cp.exec(command, { cwd: dir }, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      resolve({ stdout, stderr });
    });
  });

const promisifiedReadDir = dir =>
  new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });

const getAppRoot = () => path.dirname(require.main.filename);

module.exports = {
  promisifiedExec,
  promisifiedReadDir,
  getAppRoot,
};
