const express = require("express");
const path = require("path");
const { getAppRoot, getGitObjectType } = require("../utils/utils");
const { getRepoBranches } = require("../git/helpers/branch");
const { getFs } = require("../git/helpers/lstree");
const { createBreadcrumbs } = require("../controllers/breadcrumbs");

const router = express.Router();
const getRepoDir = repo => path.join(getAppRoot(), process.env.REPOS_DIR, repo);

router.get("/:repo/:branchHash/:commitHash/:treeHash?", async (req, res) => {
  const {
    repo, commitHash, branchHash, treeHash,
  } = req.params;
  const repoDir = getRepoDir(repo);
  const repoBranches = await getRepoBranches(repoDir);
  const branchName = repoBranches.find(b => b.getHash() === branchHash).getBranchName();
  const files = await getFs(repoDir, treeHash || commitHash);
  const breadcrumbs = await createBreadcrumbs(files[0], repo, branchHash, commitHash);
  breadcrumbs[breadcrumbs.length - 1].last = true;
  res.render("files", {
    repo,
    branchName,
    branchHash,
    commitHash,
    files: files.map(f => f.getFullInfo()),
    breadcrumbs,
  });
});

module.exports = router;
