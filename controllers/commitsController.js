const { getRepoDir } = require("../utils/utils");
const { getRepoBranches } = require("../git/helpers/branch");
const { getCommitLog } = require("../git/helpers/log");
const { createBreadcrumbs } = require("../controllers/breadcrumbs");

const getCommitsData = async (repo, branchHash) => {
  const repoDir = getRepoDir(repo);
  const branches = await getRepoBranches(repoDir);
  const branch = branches.find(b => b.getHash() === branchHash);
  const branchName = branch.getBranchName();
  const logEntries = await getCommitLog(repoDir, branchHash);
  const breadcrumbs = await createBreadcrumbs(repo, branchHash, branchName);
  const commits = logEntries.map(e => ({
    hash: e.getHash(),
    time: e.getTime(),
    subject: e.getSubject(),
    link: `/files/${repo}/${branchHash}/${e.getHash()}`,
  }));
  return {
    commits,
    breadcrumbs: breadcrumbs.getBreadcumbs(),
  };
};

module.exports = {
  getCommitsData,
};
