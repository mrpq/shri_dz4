const url = require("url");
const { assert } = require("chai");

describe("Главная страница", () => {
  it("Проверяет, что список репозиторев на главной не пуст", function () {
    return this.browser
      .url("/")
      .isExisting(".repos__link")
      .then((result) => {
        assert.isOk(result, "Количество репозиториев должно быть больше 0");
      });
  });

  it("Проверяет корректность ссылки на список веток репозитория", function () {
    return this.browser
      .url("/")
      .getAttribute(".repos__link", "href")
      .then((href) => {
        const substr = "/branches/demo";
        const result = href.includes(substr);
        assert.isOk(result, "Ссылка должна содержать подстроку");
      });
  });

  it("Клик по ссылке с репозиторием переходит в страницу списка веток репозитория", function () {
    return this.browser
      .url("/")
      .click(".repos__link")
      .getUrl()
      .then((browserUrl) => {
        const { path } = url.parse(browserUrl);
        const result = path.startsWith("/branches/");
        assert.isOk(result);
      });
  });
});

describe("Страница репозитория", () => {
  it("Проверяет, что для выбранного репозитория отображаются все ветки", function () {
    return this.browser
      .url("/branches/demo")
      .getText(".branch__link")
      .then((branchNames) => {
        const expectedNames = ["branch", "master"];
        assert.deepEqual(branchNames, expectedNames);
      });
  });

  it("Проверяет, что дефолтная ветка имеет отметку", function () {
    return this.browser
      .url("/branches/demo")
      .selectorExecute(".branch", (branchElems) => {
        const defaultBranchName = "master";
        const defaultBranchMarkSel = ".branch__default-mark";
        const defaultBranchElem = branchElems.find(e => e.innerText.includes(defaultBranchName));
        const hasMark = !!defaultBranchElem.querySelector(defaultBranchMarkSel);
        return hasMark;
      })
      .then((result) => {
        assert.isOk(result);
      });
  });

  it("Проверяет, что у недефолтной ветки отметка отутствует", function () {
    return this.browser
      .url("/branches/demo")
      .selectorExecute(".branch", (branchElems) => {
        const branchName = "branch";
        const branchMarkSel = ".branch__default-mark";
        const branchElem = branchElems.find(e => e.innerText.includes(branchName));
        const hasMark = !!branchElem.querySelector(branchMarkSel);
        return hasMark;
      })
      .then((result) => {
        assert.isNotOk(result);
      });
  });

  it("Клик по ссылке ветки переходит в страницу списка камитов", function () {
    return this.browser
      .url("/branches/demo")
      .click(".branch__link")
      .getUrl()
      .then((browserUrl) => {
        const { path } = url.parse(browserUrl);
        const result = path.startsWith("/commits/");
        assert.isOk(result);
      });
  });
});

describe("Страница списка камитов", () => {
  it("Проверяет, что список камитов для ветки не пуст", function () {
    return this.browser
      .url("/commits/demo/fea70a9")
      .isExisting(".commit")
      .then((result) => {
        assert.isOk(result);
      });
  });

  it("Проверяет корректность списка камитов", function () {
    return this.browser
      .url("/commits/demo/fea70a9")
      .getText(".commit__link")
      .then((commits) => {
        const expectedCommits = [
          "fea70a95269df10e1e13a54a5d8e06e69b00f6fe",
          "d70971fed78af81cc97d0c2ed535e8efc6fb3691",
          "f54cf47873d6f6e03b43e79992fbad087765a57b",
          "0c992dd8fc58a07b71d7cc2e6954de970150bcdb",
          "5da83fbd7b7081c52f13dcabe377c5a89f322514",
          "0fb665b819513eea4c7444203344a36e9cd61f75",
          "c5f013dbb147c09f61157627ff3228269696e965",
        ];
        // assert.equal(commits.length, expectedCommits.length);
        const check = commits.every(c => expectedCommits.includes(c));
        assert.isOk(check);
      });
  });

  it("Клик по ссылке камита переходит в страницу списка файлов", function () {
    return this.browser
      .url("/commits/demo/fea70a9")
      .click(".commit__link")
      .getUrl()
      .then((browserUrl) => {
        const { path } = url.parse(browserUrl);
        const result = path.startsWith("/files/");
        assert.isOk(result);
      });
  });
});

describe("Страница списка файлов", () => {
  it("Проверяет, что список файлов для камита не пуст", function () {
    return this.browser
      .url("/files/demo/fea70a9/fea70a95269df10e1e13a54a5d8e06e69b00f6fe")
      .isExisting(".files__item")
      .then((result) => {
        assert.isOk(result);
      });
  });

  it("Проверяет корректность списка файлов", function () {
    return this.browser
      .url("/files/demo/fea70a9/fea70a95269df10e1e13a54a5d8e06e69b00f6fe")
      .getText(".file__hash")
      .then((files) => {
        const expectedFiles = [
          "3c3629e647f5ddf82548912e337bea9826b434af",
          "6769dd60bdf536a83c9353272157893043e9f7d0",
          "7f7d7636a22b9c391dcaed83da70648a92b609ce",
          "d4baa3a6b5fde726701d1632b896b29722509f68",
          "5a14c6c0be6635c616ad9aa0abedb40b493e6a21",
        ];
        assert.equal(files.length, expectedFiles.length);
        const check = files.every(f => expectedFiles.includes(f));
        assert.isOk(check);
      });
  });

  it("Клик по директории приводит к переходу в эту директорию", function () {
    const dirHash = "7f7d7636a22b9c391dcaed83da70648a92b609ce";
    const isUrlOk = (browserUrl) => {
      const { path } = url.parse(browserUrl);
      return path.startsWith("/files/") && path.endsWith(`/${dirHash}`);
    };
    return this.browser
      .url("/files/demo/fea70a9/fea70a95269df10e1e13a54a5d8e06e69b00f6fe")
      .click(`a[href*="${dirHash}"`)
      .getUrl()
      .then((url) => {
        const result = isUrlOk(url);
        assert.isOk(result);
      });
  });

  it("Клик по файлу приводит к переходу переходу на страницу просмотра содержимого файла", function () {
    const fileHash = "3c3629e647f5ddf82548912e337bea9826b434af";
    const fileName = ".gitignore";
    const isUrlOk = (browserUrl) => {
      const { path } = url.parse(browserUrl);
      return path.startsWith("/file/") && path.endsWith(`/${fileHash}/${fileName}`);
    };
    return this.browser
      .url("/files/demo/fea70a9/fea70a95269df10e1e13a54a5d8e06e69b00f6fe")
      .click(`a[href*="${fileHash}"`)
      .getUrl()
      .then((url) => {
        const result = isUrlOk(url);
        assert.isOk(result);
      });
  });
});

describe("Страница файла", () => {
  it("На странице файла отображается содержимое файла", function () {
    const fileLink =
      "/file/demo/fea70a9/fea70a95269df10e1e13a54a5d8e06e69b00f6fe/3c3629e647f5ddf82548912e337bea9826b434af/.gitignore";
    const expectedContent = "node_modules";
    this.browser
      .url(fileLink)
      .getText(".file")
      .then((content) => {
        assert.equal(content, expectedContent);
      });
  });
});
