const express = require("express");
const path = require("path");
const { getAppRoot } = require("../utils/utils");
const { getRepoBranches } = require("../git/helpers/branch");
const { createBreadcrumbs } = require("../controllers/breadcrumbs");

const router = express.Router();

const getRepoDir = repo => path.join(getAppRoot(), process.env.REPOS_DIR, repo);

/* GET home page. */
router.get("/:repo", async (req, res) => {
  const { repo } = req.params;
  const repoDir = getRepoDir(req.params.repo);
  const branches = await getRepoBranches(repoDir);
  const breadcrumbs = await createBreadcrumbs(repo);
  res.render("branches", {
    repo,
    breadcrumbs: breadcrumbs.getBreadcumbs(),
    branches: branches.map(b => b.getFullInfo()),
  });
});

module.exports = router;
