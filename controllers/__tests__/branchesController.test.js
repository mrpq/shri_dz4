const { Branch } = require("../../git/models");
const { branchesController } = require("../branchesController");
const { Breadcrumbs } = require("../breadcrumbs");

const _getRepoDirStub = repo => repo;

const _getRepoBranchesStub = () => [
  new Branch("hash1", "branch1", true),
  new Branch("hash2", "branch2", false),
];

const _createBreadcrumbsStub = (repo) => {
  const breadcrumbs = new Breadcrumbs();
  breadcrumbs.addBreadcrumb("Home", "/");
  breadcrumbs.addBreadcrumb(`Repo: ${repo}`, `/${repo}`);
  return breadcrumbs;
};

branchesController._getRepoDir = _getRepoDirStub;
branchesController._getRepoBranches = _getRepoBranchesStub;
branchesController._createBreadcrumbs = _createBreadcrumbsStub;

describe("Тестирует branchesController.getBranchesData", () => {
  it("Возвращаемый результат содержит необходимые поля", async () => {
    const repo = "demo";
    const data = await branchesController.getBranchesData(repo);
    expect(data).toHaveProperty("branches");
    expect(data).toHaveProperty("breadcrumbs");
  });

  it("У результата в поле branches верные данные", async () => {
    // Предполагая, что branchesController форимрует данные
    // списка для веток:
    // [ new Branch("hash1", "branch1", true),
    // new Branch("hash2", "branch2", true) ]
    const repo = "demo";
    const isBranchDataOk = (actual, sample) => {
      const nameOk = actual.name === sample.name;
      const hashOk = actual.hash === sample.hash;
      const isDefaultOk = actual.isDefault === sample.isDefault;
      const linkOk = actual.link === `/commits/${repo}/${sample.hash}`;
      return nameOk && hashOk && isDefaultOk && linkOk;
    };
    const branchesOk = (branches) => {
      const samples = [
        { hash: "hash1", name: "branch1", isDefault: true },
        { hash: "hash2", name: "branch2", isDefault: false },
      ];
      return branches.every((b, i) => isBranchDataOk(b, samples[i]));
    };
    const data = await branchesController.getBranchesData(repo);
    expect(branchesOk(data.branches)).toBe(true);
  });
});
