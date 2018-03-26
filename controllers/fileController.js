const { getRepoDir } = require("../utils/utils");
const { getFileContent } = require("../git/helpers/catfile");
const { getRepoBranches } = require("../git/helpers/branch");
const { GitTree } = require("../git/models");
const { createBreadcrumbs } = require("../controllers/breadcrumbs");

const getFileData = async (repo, branchHash, commitHash, fileHash, fileName) => {
  const repoDir = getRepoDir(repo);
  const repoBranches = await getRepoBranches(repoDir);
  const branchName = repoBranches.find(b => b.getHash() === branchHash).getBranchName();
  const fileObject = new GitTree(fileHash, "blob", fileName);
  const content = await getFileContent(repoDir, fileHash);
  const breadcrumbs = await createBreadcrumbs(repo, branchHash, branchName, commitHash, fileObject);
  breadcrumbs.addGitObjBreadcrumb(fileObject);
  return {
    content,
    breadcrumbs: breadcrumbs.getBreadcumbs(),
  };
};

module.exports = {
  getFileData,
};
