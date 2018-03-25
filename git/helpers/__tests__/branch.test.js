// import { parseGitBranchOutput, Branch } from "../git/branch.js";
import { parseGitBranchOutput } from "../branch";
import { Branch } from "../../models";
// const parseGitBranchOutput = require("../branch");

const fs = require("fs");

// const repoDir = "./testrepo";

const createBranches = () => {
  const file = `${process.cwd()}/git/helpers/__tests__/git_branch_output.txt`;
  const data = fs.readFileSync(file, "utf8");
  const branches = parseGitBranchOutput(data);
  return branches;
};

describe("Тестирует parseGitBranchOutput", () => {
  it("Возвращает массив", () => {
    // подготовка
    const branches = createBranches();
    const actual = Array.isArray(branches);
    const expected = true;
    // проверка
    expect(actual).toBe(expected);
  });

  it("Возвращает массив значений типа <Branch>", () => {
    const branches = createBranches();
    const actual = branches.every(b => b instanceof Branch);
    const expected = true;
    expect(actual).toBe(true);
  });

  it("Возвращаемый результат содержит все ветки", () => {
    const branches = createBranches();
    const actualBranchNames = branches.map(b => b.getBranchName());
    const expectedBranchNames = ["branch", "master"];
    const containAllBranches = actualBranchNames.every(b => expectedBranchNames.indexOf(b) >= 0);
    // Проверка
    expect(containAllBranches).toBe(true);
  });
});
