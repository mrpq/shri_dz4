const path = require("path");
const { GitTree } = require("../models");

const { promisifiedExec } = require("../../utils/utils.js");

const createNode = (line) => {
  const [objType, hash, fullpath] = line.split(/\s+/).slice(1);
  const dir = path.dirname(fullpath);
  const name = path.basename(fullpath);
  const parentName = dir === "." ? null : path.basename(dir);
  return new GitTree(hash, objType, name, dir, parentName);
};

const parseGitLstreeOutput = (data) => {
  const findNodeChildren = (node, allNodes) => {
    const children = allNodes.filter(n => n.getParentName() === node.getName());
    return children;
  };
  const findNodeParent = (node, allNodes) => {
    const parent = allNodes.find(n => n.getName() === node.getParentName());
    return parent || null;
  };
  const lines = data.substr(0, data.length - 1).split("\n");
  const nodes = lines.map(createNode);
  nodes.forEach((node) => {
    const objType = node.getObjType();
    if (objType === "tree") {
      const children = findNodeChildren(node, nodes);
      node.setChildren(children);
    }
    const nodeParent = findNodeParent(node, nodes);
    node.setParent(nodeParent);
  });
  return nodes;
};

const getFs = async (repoDir, hash) => {
  const streams = await promisifiedExec(`git ls-tree ${hash}`)(repoDir);
  return parseGitLstreeOutput(streams.stdout);
};

const getFullFs = async (repoDir, branchHash) => {
  const streams = await promisifiedExec(`git ls-tree -t -r ${branchHash}`)(repoDir);
  return parseGitLstreeOutput(streams.stdout);
};

module.exports = {
  parseGitLstreeOutput,
  getFs,
  getFullFs,
};
