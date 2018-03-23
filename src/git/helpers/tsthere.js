const cp = require("child_process");

const promisifiedExec = command => dir =>
  new Promise((resolve, reject) => {
    const p = cp.exec(command, { cwd: dir }, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      resolve({ stdout, stderr });
    });
  });

promisifiedExec("git ls-tree -r -t HEAD")(".").then((streams) => {
  console.log(streams.stdout);
  console.log("-----");
});
