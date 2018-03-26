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
    console.log("Creating commit. Timestamp = ", timeStamp);
    this.time = moment(timeStamp);
    console.log("Commit this.time = ", this.time.format());
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
      hash: this.hash,
      type: this.type,
      time: this.time,
      subject: this.subject,
      body: this.body,
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

  getFullInfo() {
    return {
      hash: this.hash,
      type: this.type,
      parentName: this.parentName,
      parent: this.parent,
      objType: this.objType,
      name: this.name,
      dir: this.dir,
      children: this.children,
    };
  }
}

module.exports = {
  GitObject,
  GitTree,
  Branch,
  Commit,
};
