const cp = require("child_process");
const path = require("path");
const fs = require("fs");

const promisifiedExec = command => dir =>
  new Promise((resolve, reject) => {
    cp.exec(command, { cwd: dir }, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }
      return resolve({ stdout, stderr });
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

const getGitObjectType = (hash, dir) => promisifiedExec(`git cat-file -t ${hash}`)(dir);

module.exports = {
  promisifiedExec,
  promisifiedReadDir,
  getAppRoot,
  getGitObjectType,
};
