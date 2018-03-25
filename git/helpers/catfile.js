const { promisifiedExec } = require("../../utils/utils");

const getFileContent = async (repoDir, hash) => {
  const streams = await promisifiedExec(`git cat-file -p ${hash}`)(repoDir);
  return streams.stdout;
};

module.exports = {
  getFileContent,
};
