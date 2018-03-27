const { parseGitLstreeOutput } = require("../lstree");

const fs = require("fs");

const getLsTreeTextLines = () => {
  const file = `${process.cwd()}/git/helpers/__tests__/git_lstree_output.txt`;
  const data = fs.readFileSync(file, "utf8");
  return data;
};

const findFilesByDir = (files, dir) => files.filter(f => f.getDir() === dir);

const findFileByName = (files, name) => files.find(f => f.getName() === name);

describe("Тестирует parseGitLstreeOutput()", () => {
  it("Корневой каталог содержит правильный список файлов", () => {
    const lines = getLsTreeTextLines();
    const files = parseGitLstreeOutput(lines);
    const rootDirFiles = findFilesByDir(files, ".");
    const expectedFileList = [".gitignore", "anotherfile.txt", "dir1", "dir2", "somefile.txt"];
    const allFilesPresent = rootDirFiles.every(f => expectedFileList.includes(f.getName()));
    expect(allFilesPresent).toBe(true);
  });

  it("Вложенная директория содержит правильный список файлов", () => {
    const lines = getLsTreeTextLines();
    const files = parseGitLstreeOutput(lines);
    const dirFiles = findFilesByDir(files, "dir1");
    const expectedFileList = ["dir1_file.txt", "innerdir"];
    const allFilesPresent = dirFiles.every(f => expectedFileList.includes(f.getName()));
    expect(allFilesPresent).toBe(true);
  });

  it("У корневого файла правильный родитель", () => {
    const lines = getLsTreeTextLines();
    const files = parseGitLstreeOutput(lines);
    const childFile = findFileByName(files, ".gitignore");
    const expectedParent = null;
    expect(childFile.getParent()).toEqual(expectedParent);
  });

  it("У вложенного файла правильный родитель", () => {
    const lines = getLsTreeTextLines();
    const files = parseGitLstreeOutput(lines);
    const childFile = findFileByName(files, "inner.txt");
    const actualParent = childFile.getParent();
    const expectedParent = findFileByName(files, "innerdir");
    expect(actualParent).toEqual(expectedParent);
  });
});
