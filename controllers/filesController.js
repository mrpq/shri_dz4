const { getRepoDir } = require("../utils/utils");
const { getRepoBranches } = require("../git/helpers/branch");
const { getFs } = require("../git/helpers/lstree");
const { createBreadcrumbs } = require("../controllers/breadcrumbs");

const getFilesData = async (repo, branchHash, commitHash, treeHash = undefined) => {
  const repoDir = getRepoDir(repo);
  const repoBranches = await getRepoBranches(repoDir);
  const branchName = repoBranches.find(b => b.getHash() === branchHash).getBranchName();
  let files = await getFs(repoDir, treeHash || commitHash);
  const breadcrumbs = await createBreadcrumbs(repo, branchHash, branchName, commitHash, files[0]);
  files = files.map((f) => {
    // oType / hash / name
    const link =
      f.getObjType() === "tree"
        ? `/files/${repo}/${branchHash}/${commitHash}/${f.getHash()}`
        : `/file/${repo}/${branchHash}/${commitHash}/${f.getHash()}/${f.getName()}`;
    return {
      objType: f.getObjType(),
      hash: f.getHash(),
      name: f.getName(),
      link,
    };
  });
  return {
    files,
    breadcrumbs: breadcrumbs.getBreadcumbs(),
  };
};

module.exports = {
  getFilesData,
};
