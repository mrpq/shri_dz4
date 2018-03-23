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

promisifiedExec("git log  --format=format:%H___%an___%cI___%s")(".").then((streams) => {
  console.log(streams.stdout);
});
