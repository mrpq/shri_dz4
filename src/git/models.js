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

export default GitObject;
