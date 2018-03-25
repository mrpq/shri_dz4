const { Branch } = require("../models");

const { promisifiedExec } = require("../../utils/utils.js");

const createBranchFromTextLine = (line) => {
  const hasLeadingAsterisk = l => l[0] === "*";
  const splitLine = line.split(/\s+/, 4);
  if (hasLeadingAsterisk(line)) {
    const [, name, shortHash, ...rest] = splitLine;
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

const getRepoBranches = async (dir) => {
  const streams = await promisifiedExec("git branch -v")(dir);
  return parseGitBranchOutput(streams.stdout);
};

module.exports = {
  parseGitBranchOutput,
  getRepoBranches,
};
