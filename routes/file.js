const express = require("express");
const path = require("path");
const { getAppRoot } = require("../utils/utils");
const { getFileContent } = require("../git/helpers/catfile");

const router = express.Router();

const getRepoDir = repo => path.join(getAppRoot(), process.env.REPOS_DIR, repo);

router.get("/:repo/:hash", (req, res, next) => {
  const { repo, hash } = req.params;
  const repoDir = getRepoDir(repo);
  getFileContent(repoDir, hash).then((content) => {
    res.render("file", { content });
  });
});

module.exports = router;
