const express = require("express");
const path = require("path");
const { getAppRoot, getGitObjectType } = require("../utils/utils");
const { getRepoBranches } = require("../git/helpers/branch");
const { getFs, getFullFs } = require("../git/helpers/lstree");

const router = express.Router();
const getRepoDir = repo => path.join(getAppRoot(), process.env.REPOS_DIR, repo);

const getCurrDirFiles = (allFiles, currHash) => {
  let files;
  files = allFiles.filter(f => f.getDir() === ".");
  // console.log(files);
  return files;
};

router.get("/:repo/:branchHash/:commitHash", async (req, res, next) => {
  const { repo, commitHash, branchHash } = req.params;
  const repoDir = getRepoDir(repo);
  const repoBranches = await getRepoBranches(repoDir);
  const branchName = repoBranches.find(b => b.getHash() === branchHash).getBranchName();
  const files = await getFs(repoDir, commitHash);
  const allFiles = await getFullFs(repoDir, branchHash);
  const sample = allFiles.find(f => f.getHash() === files[0].getHash());
  const parent = sample.getParent() || null;
  res.render("files", {
    repo,
    branchName,
    branchHash,
    commitHash,
    files: files.map(f => f.getFullInfo()),
    parent,
  });
});

module.exports = router;
