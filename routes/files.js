const express = require("express");
const path = require("path");
const { getAppRoot } = require("../utils/utils");

const { getFs } = require("../git/helpers/lstree");

const router = express.Router();
const getRepoDir = repo => path.join(getAppRoot(), process.env.REPOS_DIR, repo);

router.get("/:repo/:branch/:hash", (req, res, next) => {
  const { repo, hash, branch } = req.params;
  const repoDir = getRepoDir(repo);
  getFs(repoDir, hash).then((files) => {
    res.render("files", { repo, branch, files: files.map(f => f.getFullInfo()) });
  });
});

module.exports = router;
