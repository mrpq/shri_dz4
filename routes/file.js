const express = require("express");
const path = require("path");
const { getAppRoot } = require("../utils/utils");
const { getFullFs } = require("../git/helpers/lstree");
const { getFileContent } = require("../git/helpers/catfile");
const { getRepoBranches } = require("../git/helpers/branch");

const router = express.Router();

const getRepoDir = repo => path.join(getAppRoot(), process.env.REPOS_DIR, repo);

router.get("/:repo/:branchHash/:commitHash/:fileHash", async (req, res, next) => {
  const {
    repo, branchHash, commitHash, fileHash,
  } = req.params;
  const repoDir = getRepoDir(repo);
  const repoBranches = await getRepoBranches(repoDir);
  const branchName = repoBranches.find(b => b.getHash() === branchHash).getBranchName();
  const content = await getFileContent(repoDir, fileHash);
  const allFiles = await getFullFs(repoDir, commitHash);
  const sample = allFiles.find(f => f.getHash() === fileHash);
  const parent = sample.getParent() || null;
  res.render("file", {
    repo,
    content,
    branchName,
    branchHash,
    commitHash,
    parent,
  });

  // getRepoBranches(repoDir).then((branches) => {
  //   getFileContent(repoDir, fileHash).then((content) => {
  //   });
  // });
});

module.exports = router;
