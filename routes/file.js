const express = require("express");

const { getFileData } = require("../controllers/fileController");

const router = express.Router();

router.get("/:repo/:branchHash/:commitHash/:fileHash/:fileName", async (req, res) => {
  const {
    repo, branchHash, commitHash, fileHash, fileName,
  } = req.params;
  const data = await getFileData(repo, branchHash, commitHash, fileHash, fileName);
  res.render("file", data);
});

module.exports = router;
