const { parseGitLogOutput } = require("../log");
const { Commit } = require("../../models");

const fs = require("fs");
const moment = require("moment");

const createLogEntries = () => {
  const file = `${process.cwd()}/git/helpers/__tests__/git_log_output.txt`;
  const data = fs.readFileSync(file, "utf8");
  const logEntries = parseGitLogOutput(data);
  return logEntries;
};

describe("Тестирует parseGitLogOutput", () => {
  it("Возвращает массив", () => {
    // подготовка
    const logEnries = createLogEntries();
    const actual = Array.isArray(logEnries);
    const expected = true;
    // проверка
    expect(actual).toBe(expected);
  });

  it("Возвращает массив объектов типа <Commit>", () => {
    const logEnries = createLogEntries();
    const actual = logEnries.every(e => e instanceof Commit);
    const expected = true;
    // проверка
    expect(actual).toBe(expected);
  });

  it("Проверяект корректность значений отдельно взятого log entry", () => {
    const logEnries = createLogEntries();
    const entry = logEnries[0];
    const actual = entry.getFullInfo();
    const expected = {
      hash: "e9258cf45b628468136dbae4f74497d4d7c0f867",
      type: "commit",
      time: moment("2018-03-23T15:58:44+03:00"),
      subject: "Установит moment.js",
    };
    // проверка
    expect(actual.hash).toBe(expected.hash);
    expect(actual.type).toBe(expected.type);
    expect(actual.time.isSame(expected.time)).toBe(true);
    expect(actual.subject).toBe(expected.subject);
  });
});
