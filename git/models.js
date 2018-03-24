const moment = require("moment");

class GitObject {
  constructor(hash, type = undefined) {
    this.hash = hash;
    this.type = type;
  }

  getHash() {
    return this.hash;
  }

  getType() {
    return this.type;
  }
}

class Branch extends GitObject {
  constructor(hash, name, isDefault) {
    super(hash, "branch");
    this.name = name;
    this.isDefault = isDefault;
  }

  isDefault() {
    return this.isDefault;
  }

  getBranchName() {
    return this.name;
  }

  getFullInfo() {
    return {
      hash: this.hash,
      type: this.type,
      name: this.name,
      isDefault: this.isDefault,
    };
  }
}

class Commit extends GitObject {
  constructor(hash, author, timeStamp, subject, body = "") {
    super(hash, "commit");
    this.author = author;
    this.time = moment(timeStamp);
    this.subject = subject;
    this.body = body;
  }

  getAuthor() {
    return this.author;
  }

  getTime() {
    return this.time;
  }

  getSubject() {
    return this.subject;
  }

  getBody() {
    return this.body;
  }

  getFullInfo() {
    return {
      hash: this.getHash(),
      type: this.getType(),
      time: this.getTime(),
      subject: this.getSubject(),
      body: this.getBody(),
    };
  }
}
class GitTree extends GitObject {
  constructor(
    hash,
    objType,
    name,
    dir,
    parentName,
    parent = null,
    children = objType === "tree" ? [] : null,
  ) {
    super(hash, "tree");
    this.parentName = parentName;
    this.parent = parent;
    this.objType = objType;
    this.name = name;
    this.dir = dir;
    this.children = children;
  }

  getParent() {
    return this.parent;
  }

  getParentName() {
    return this.parentName;
  }

  getObjType() {
    return this.objType;
  }

  getName() {
    return this.name;
  }

  getDir() {
    return this.dir;
  }

  getChildren() {
    return this.children;
  }

  setChildren(children) {
    this.children = children;
  }

  setParent(parent) {
    this.parent = parent;
  }
}

module.exports = {
  GitObject,
  GitTree,
  Branch,
  Commit,
};
