const express = require("express");
const path = require("path");
const { getAppRoot } = require("../utils/utils");
const { getRepoBranches } = require("../git/helpers/branch");
const { getBranchLog } = require("../git/helpers/log");

const router = express.Router();

const getRepoDir = repo => path.join(getAppRoot(), process.env.REPOS_DIR, repo);

/* GET home page. */
router.get("/:repo/:hash", (req, res, next) => {
  const { repo, hash } = req.params;
  const repoDir = getRepoDir(repo);
  getBranchLog(repoDir, hash).then((logEntries) => {
    res.render("commits", { repo, branch: hash, commits: logEntries.map(e => e.getFullInfo()) });
  });
});

module.exports = router;
