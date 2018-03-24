const express = require("express");
const path = require("path");
const { getAppRoot } = require("../utils/utils");
const { getFileContent } = require("../git/helpers/catfile");
const { getRepoBranches } = require("../git/helpers/branch");

const router = express.Router();

const getRepoDir = repo => path.join(getAppRoot(), process.env.REPOS_DIR, repo);

router.get("/:repo/:branchHash/:commitHash/:fileHash", (req, res, next) => {
  const {
    repo, branchHash, commitHash, fileHash,
  } = req.params;
  const repoDir = getRepoDir(repo);
  getRepoBranches(repoDir).then((branches) => {
    const branchName = branches.find(b => b.getHash() === branchHash).getBranchName();
    getFileContent(repoDir, fileHash).then((content) => {
      res.render("file", {
        repo,
        content,
        branchName,
        branchHash,
        commitHash,
      });
    });
  });
});

module.exports = router;
