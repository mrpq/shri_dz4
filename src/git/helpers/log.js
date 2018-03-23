const { Commit } = require("../models");

// import { Commit } from "../models";
// git log  --format=format:%H___%an___%cI___%s

const createLogEntryFromTextLine = (line) => {
  const [hash, author, time, subject] = line.split("___");
  return new Commit(hash, author, time, subject);
};

const parseGitLogOutput = (data) => {
  const lines = data.split("\n");
  const logEntries = lines.map(createLogEntryFromTextLine);
  return logEntries;
};

module.exports = {
  parseGitLogOutput,
};
