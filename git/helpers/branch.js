const { Branch } = require("../models");

const { promisifiedExec } = require("../../utils/utils.js");

const execGitBranchInDir = promisifiedExec("git branch -v");

const createBranchFromTextLine = (line) => {
  const hasLeadingAsterisk = l => l[0] === "*";
  const splitLine = line.split(/\s+/, 4);
  if (hasLeadingAsterisk(line)) {
    const [, name, shortHash, ...rst] = splitLine;
    return new Branch(shortHash, name, true);
  }
  const [, name, shortHash, ...rest] = splitLine;
  return new Branch(shortHash, name, false);
};

const parseGitBranchOutput = (data) => {
  const lines = data.substr(0, data.length - 1).split("\n");
  const branches = lines.map(createBranchFromTextLine);
  return branches;
};

const getRepoBranches = dir =>
  execGitBranchInDir(dir).then(streams =>
    // console.log(streams.stdout);
    parseGitBranchOutput(streams.stdout));

// export const getGitBranchesForDir = dir =>
//   execGitBranchForDir(dir).then((streams) => {
//     const parsedResult = parseGitBranchOutput(streams.stdout);
//     console.log(parsedResult);
//     return parsedResult;
//   });

module.exports = {
  parseGitBranchOutput,
  execGitBranchInDir,
  getRepoBranches,
};
