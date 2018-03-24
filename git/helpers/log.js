const { Commit } = require("../models");
const { promisifiedExec } = require("../../utils/utils");
// import { Commit } from "../models";
// git log  --format=format:%H___%an___%cI___%s

const execGitLog = (hash = "") => promisifiedExec();

const createLogEntryFromTextLine = (line) => {
  const [hash, author, time, subject] = line.split("___");
  return new Commit(hash, author, time, subject);
};

const parseGitLogOutput = (data) => {
  const lines = data.split("\n");
  const logEntries = lines.map(createLogEntryFromTextLine);
  return logEntries;
};

const getBranchLog = (repoDir, hash) => {
  const p = promisifiedExec(`git log ${hash} --format=format:%H___%an___%cI___%s`)(repoDir);
  return p.then((streams) => {
    const data = streams.stdout;
    return parseGitLogOutput(data);
  });
};

module.exports = {
  parseGitLogOutput,
  getBranchLog,
};
