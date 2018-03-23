import { Commit } from "../models";

// import { Commit } from "../models";
// git log  --format=format:%H___%an___%cI___%s

const createLogEntryFromTextLine = (line) => {
  const [hash, author, time, subject] = line.split("___");
  return new Commit(hash, author, time, subject);
};

export const parseGitLogOutput = (data) => {
  const lines = data.split("\n");
  const logEntries = lines.map(createLogEntryFromTextLine);
  return logEntries;
};
// export default parseGitLogOutput;
