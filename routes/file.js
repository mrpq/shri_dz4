const express = require("express");
const path = require("path");
const { getAppRoot } = require("../utils/utils");
// const { getFullFs } = require("../git/helpers/lstree");
const { getFileContent } = require("../git/helpers/catfile");
const { getRepoBranches } = require("../git/helpers/branch");
const { GitTree } = require("../git/models");
const { createBreadcrumbs } = require("../controllers/breadcrumbs");

const router = express.Router();

const getRepoDir = repo => path.join(getAppRoot(), process.env.REPOS_DIR, repo);

router.get("/:repo/:branchHash/:commitHash/:fileHash/:fileName", async (req, res, next) => {
  const {
    repo, branchHash, commitHash, fileHash, fileName,
  } = req.params;
  const repoDir = getRepoDir(repo);
  const repoBranches = await getRepoBranches(repoDir);
  const branchName = repoBranches.find(b => b.getHash() === branchHash).getBranchName();
  const fileObject = new GitTree(fileHash, "blob", fileName);
  const content = await getFileContent(repoDir, fileHash);
  const breadcrumbs = await createBreadcrumbs(fileObject, repo, branchHash, commitHash);
  breadcrumbs.push(fileObject);
  breadcrumbs[breadcrumbs.length - 1].last = true;
  // console.log(breadcrumbs);
  res.render("file", {
    repo,
    content,
    branchName,
    branchHash,
    commitHash,
    breadcrumbs,
  });

  // getRepoBranches(repoDir).then((branches) => {
  //   getFileContent(repoDir, fileHash).then((content) => {
  //   });
  // });
});

module.exports = router;
