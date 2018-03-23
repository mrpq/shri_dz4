import { parseGitLstreeOutput } from "../lstree";
import { GitTree } from "../../models";

const fs = require("fs");

const getLsTreeTextLines = () => {
  const file = `${process.cwd()}/src/git/helpers/__tests__/git_lstree_output.txt`;
  const data = fs.readFileSync(file, "utf8");
  return data;
};

const findFileByName = (files, name) => files.find(f => f.getName() === name);
const findFilesByDir = (files, dir) => files.filter(f => f.getDir() === dir);

describe("Тестирует parseGitLstreeOutput()", () => {
  it("Корневой каталог содержит правильный список файлов", () => {
    const lines = getLsTreeTextLines();
    const files = parseGitLstreeOutput(lines);
    const rootDirFiles = findFilesByDir(files, ".");
    const expectedFileList = [".gitignore", "anotherfile.txt", "dir1", "dir2", "somefile.txt"];
    const allFilesPresent = rootDirFiles.every(f => expectedFileList.includes(f.getName()));
    console.log(findFileByName(files, "innerdir"));
    expect(allFilesPresent).toBe(true);
  });
});
