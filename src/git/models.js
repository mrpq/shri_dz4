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

export class Branch extends GitObject {
  constructor(hash, name, isDefault) {
    super(hash, "branch");
    this.name = name;
    this.isDefault = isDefault;
  }

  getBranchName() {
    return this.name;
  }
}

export class Commit extends GitObject {
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
export class GitTree extends GitObject {
  constructor(hash, parent = null, objType, name, children = null) {
    super(hash, "tree");
    this.parent = parent;
    this.objType = objType;
    this.name = name;
    this.children = children;
  }

  getParent() {
    return this.parent;
  }

  getObjType() {
    return this.objType;
  }

  getName() {
    return this.name;
  }

  getChildren() {
    return this.children;
  }
}

export default GitObject;
