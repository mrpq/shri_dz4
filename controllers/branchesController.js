const { getRepoBranches } = require("../git/helpers/branch");
const { createBreadcrumbs } = require("../controllers/breadcrumbs");
const { getRepoDir } = require("../utils/utils");

class BranchesController {
  _getRepoDir(repo) {
    return getRepoDir(repo);
  }

  async _getRepoBranches(repoDir) {
    return getRepoBranches(repoDir);
  }

  async _createBreadcrumbs(repo) {
    return createBreadcrumbs(repo);
  }

  async getBranchesData(repo) {
    const repoDir = this._getRepoDir(repo);
    let branches = await this._getRepoBranches(repoDir);
    const breadcrumbs = await this._createBreadcrumbs(repo);
    branches = branches.map(b => ({
      name: b.getBranchName(),
      link: `/commits/${repo}/${b.getHash()}`,
      hash: b.getHash(),
      isDefault: b.isDefault,
    }));
    return {
      branches,
      breadcrumbs: breadcrumbs.getBreadcumbs(),
    };
  }
}

const branchesController = new BranchesController();

module.exports = {
  branchesController,
};
