const express = require("express");
const path = require("path");
const { getAppRoot } = require("../utils/utils");
const { getRepoBranches } = require("../git/helpers/branch");

const { getFs } = require("../git/helpers/lstree");

const router = express.Router();
const getRepoDir = repo => path.join(getAppRoot(), process.env.REPOS_DIR, repo);

router.get("/:repo/:branchHash/:commitHash", (req, res, next) => {
  const { repo, commitHash, branchHash } = req.params;
  const repoDir = getRepoDir(repo);
  getRepoBranches(repoDir).then((branches) => {
    const branchName = branches.find(b => b.getHash() === branchHash).getBranchName();
    getFs(repoDir, commitHash).then((files) => {
      res.render("files", {
        repo,
        branchName,
        branchHash,
        commitHash,
        files: files.map(f => f.getFullInfo()),
      });
    });
  });
});

module.exports = router;
