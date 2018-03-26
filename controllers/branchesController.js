const { getRepoBranches } = require("../git/helpers/branch");
const { createBreadcrumbs } = require("../controllers/breadcrumbs");
const { getRepoDir } = require("../utils/utils");

const getBranchesData = async (repo) => {
  const repoDir = getRepoDir(repo);
  let branches = await getRepoBranches(repoDir);
  const breadcrumbs = await createBreadcrumbs(repo);
  branches = branches.map(b => ({
    name: b.getBranchName(),
    link: `/commits/${repo}/${b.getHash()}`,
    hash: b.getHash(),
    isDefault: b.isDefault,
  }));
  return {
    branches,
    breadcrumbs: breadcrumbs.getBreadcumbs(),
  };
};

module.exports = {
  getBranchesData,
};
