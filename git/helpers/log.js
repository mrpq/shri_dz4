const { Commit } = require("../models");
const { promisifiedExec } = require("../../utils/utils");

const createLogEntryFromTextLine = (line) => {
  const [hash, author, time, subject] = line.split("___");
  return new Commit(hash, author, time, subject);
};

const parseGitLogOutput = (data) => {
  const lines = data.split("\n");
  const logEntries = lines.map(createLogEntryFromTextLine);
  return logEntries;
};

const getCommitLog = async (repoDir, hash) => {
  const command = `git log ${hash} --format=format:%H___%an___%cI___%s`;
  const streams = await promisifiedExec(command)(repoDir);
  return parseGitLogOutput(streams.stdout);
};

module.exports = {
  parseGitLogOutput,
  getCommitLog,
};
