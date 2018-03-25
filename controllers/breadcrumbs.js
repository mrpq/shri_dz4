const path = require("path");
const { getAppRoot } = require("../utils/utils");
const { Commit } = require("../git/models");

const { getFullFs } = require("../git/helpers/lstree");

const getRepoDir = repo => path.join(getAppRoot(), process.env.REPOS_DIR, repo);

const createObjParentTree = async (obj, repo, commitHash) => {
  const repoDir = getRepoDir(repo);
  const allFiles = await getFullFs(repoDir, commitHash);
  const getParents = (obj, acc) => {
    const parent = obj.getParent();
    if (parent === null) {
      return acc;
    }
    return getParents(parent, [parent, ...acc]);
  };
  const parentTree = [];
  const root = new Commit(commitHash, "", "", "");
  parentTree.push(root);
  const _obj = allFiles.find(f => f.getHash() === obj.getHash());
  const parents = getParents(_obj, []);
  return parentTree.concat(parents);
};

const createBreadcrumbs = async (obj, repo, branchHash, commitHash) => {
  const createName = node => (node.getType() === "commit" ? "/" : node.getName());
  const createLink = (node) => {
    let link;
    const nodeType = node.getType();
    switch (true) {
    case node.getType() === "commit":
    case node.getObjType() === "tree":
      link = `/files/${repo}/${branchHash}/${commitHash}/${node.getHash()}`;
      break;
    default:
      link = "dasda";
    }
    return link;
  };

  const parentTree = await createObjParentTree(obj, repo, commitHash);

  const breadcrumbs = [];
  for (let i = 0; i < parentTree.length; i += 1) {
    const node = parentTree[i];
    // const last = i === parentTree.length - 1;
    const name = createName(node);
    const link = createLink(node);
    breadcrumbs.push({
      // last,
      name,
      link,
    });
  }
  return breadcrumbs;
};

module.exports = {
  createBreadcrumbs,
};
