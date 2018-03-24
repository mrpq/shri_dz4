const { promisifiedExec } = require("../../utils/utils");

const getFileContent = (repoDir, hash) => {
  const p = promisifiedExec(`git cat-file -p ${hash}`)(repoDir);
  return p.then(streams => streams.stdout);
};

module.exports = {
  getFileContent,
};
