const express = require("express");
const path = require("path");
const { getAppRoot, promisifiedReadDir } = require("../utils/utils");
const { createBreadcrumbs } = require("../controllers/breadcrumbs");

const router = express.Router();

const getReposList = () => promisifiedReadDir(path.join(getAppRoot(), process.env.REPOS_DIR));
/* GET home page. */
router.get("/", async (req, res) => {
  const repos = await getReposList();
  const breadcrumbs = await createBreadcrumbs();
  res.render("index", {
    title: "Express",
    repos: repos.map(r => ({ name: r })),
    breadcrumbs: breadcrumbs.getBreadcumbs(),
  });
});

module.exports = router;
