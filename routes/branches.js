const express = require("express");
const { branchesController } = require("../controllers/branchesController");

const router = express.Router();

/* GET home page. */
router.get("/:repo", async (req, res) => {
  const { repo } = req.params;
  const data = await branchesController.getBranchesData(repo);
  // const data = await getBranchesData(repo);
  res.render("branches", data);
});

module.exports = router;
