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
    return this.browser.url("/branches/demo");
    // .getBr
  });
});
