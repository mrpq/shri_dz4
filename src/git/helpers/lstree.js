import { GitTree } from "../models";

const path = require("path");

const createNode = (line) => {
  const [objType, hash, fullpath] = line.split(/\s+/).slice(1);
  const dir = path.dirname(fullpath);
  const name = path.basename(fullpath);
  const parentName = dir === "." ? null : path.basename(dir);
  return new GitTree(hash, objType, name, dir, parentName);
};

const setNodeChildren = (node, allNodes) => {
  const setNodeParent = (node, parent) => {
    node.setParent(parent);
  };
  node.setChildren(children);
};

export const parseGitLstreeOutput = (data) => {
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

const a = 2;

export default a;

// export const getNodeChildren = (data, node) => {};
