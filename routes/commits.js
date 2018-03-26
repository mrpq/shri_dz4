const express = require("express");
const path = require("path");
const { getAppRoot } = require("../utils/utils");
const { getRepoBranches } = require("../git/helpers/branch");
const { getCommitLog } = require("../git/helpers/log");
const { createBreadcrumbs } = require("../controllers/breadcrumbs");

const router = express.Router();

const getRepoDir = repo => path.join(getAppRoot(), process.env.REPOS_DIR, repo);

/* GET home page. */
router.get("/:repo/:branchHash", async (req, res) => {
  const { repo, branchHash } = req.params;
  const repoDir = getRepoDir(repo);
  const branches = await getRepoBranches(repoDir);
  const branchName = branches.find(b => b.getHash() === branchHash).getBranchName();
  const logEntries = await getCommitLog(repoDir, branchHash);
  const breadcrumbs = await createBreadcrumbs(repo, branchHash, branchName);
  res.render("commits", {
    repo,
    branchName,
    branchHash,
    breadcrumbs: breadcrumbs.getBreadcumbs(),
    commits: logEntries.map((e) => {
      console.log("passing to template", e.getTime());
      const commit = e.getFullInfo();
      return commit;
    }),
  });
});

module.exports = router;
