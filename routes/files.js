const express = require("express");

const { getFilesData } = require("../controllers/filesController");

const router = express.Router();

router.get("/:repo/:branchHash/:commitHash/:treeHash?", async (req, res) => {
  const {
    repo, commitHash, branchHash, treeHash,
  } = req.params;
  const data = await getFilesData(repo, branchHash, commitHash, treeHash);
  res.render("files", data);
});

module.exports = router;
