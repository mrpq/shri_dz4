const express = require("express");
const { getCommitsData } = require("../controllers/commitsController");

const router = express.Router();

/* GET home page. */
router.get("/:repo/:branchHash", async (req, res) => {
  const { repo, branchHash } = req.params;
  const data = await getCommitsData(repo, branchHash);
  res.render("commits", data);
});

module.exports = router;
