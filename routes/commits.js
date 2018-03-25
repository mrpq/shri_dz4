const express = require("express");
const path = require("path");
const { getAppRoot } = require("../utils/utils");
const { getRepoBranches } = require("../git/helpers/branch");
const { getCommitLog } = require("../git/helpers/log");

const router = express.Router();

const getRepoDir = repo => path.join(getAppRoot(), process.env.REPOS_DIR, repo);

/* GET home page. */
router.get("/:repo/:hash", async (req, res) => {
  const { repo, hash } = req.params;
  const repoDir = getRepoDir(repo);
  const branches = await getRepoBranches(repoDir);
  const branchName = branches.find(b => b.getHash() === hash).getBranchName();
  const logEntries = await getCommitLog(repoDir, hash);
  res.render("commits", {
    repo,
    branchName,
    branchHash: hash,
    commits: logEntries.map(e => e.getFullInfo()),
  });
});

module.exports = router;
