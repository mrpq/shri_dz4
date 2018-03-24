const express = require("express");
const path = require("path");
const { getAppRoot } = require("../utils/utils");
const { getRepoBranches } = require("../git/helpers/branch");

const router = express.Router();

const getRepoDir = repo => path.join(getAppRoot(), process.env.REPOS_DIR, repo);

/* GET home page. */
router.get("/:repo", (req, res, next) => {
  const repoDir = getRepoDir(req.params.repo);
  getRepoBranches().then((branches) => {
    res.render("branches", { branches: branches.map(b => b.getFullInfo()) });
  });
});

module.exports = router;
