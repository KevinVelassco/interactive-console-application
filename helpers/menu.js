require("colors");

const menu = () => {
  return new Promise((resolve, reject) => {
    console.clear();
    const title = "Select an option";

    console.log("======================".green);
    console.log(`   ${title}`.green);
    console.log("======================".green);

    console.log(`${"1.".green} create task`);
    console.log(`${"2.".green} list tasks`);
    console.log(`${"3.".green} list completed tasks`);
    console.log(`${"4.".green} list pending tasks`);
    console.log(`${"5.".green} completing task(s)`);
    console.log(`${"6.".green} delete task`);
    console.log(`${"0.".green} exit\n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Select an option: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nselect ${"ENTER".green} to continue\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  menu,
  pause,
};
