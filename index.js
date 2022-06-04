require("colors");
//const { menu, pause } = require("./helpers/menu");
const {
  inquirerMenu,
  inquirerPause,
  readInput,
} = require("./helpers/inquirer");
const { saveFile, readBD } = require("./helpers/saveFile");
const Tasks = require("./models/tasks");

const main = async () => {
  let option = "";
  const tasks = new Tasks();

  const tasksBD = readBD();
  console.log(tasksBD);

  if (tasksBD.length) {
    tasks.listArr = tasksBD;
  }

  do {
    //option = await menu();
    //if (option !== "0") await pause();

    option = await inquirerMenu();

    switch (option) {
      case 1:
        const task = await readInput();
        tasks.create(task);
        break;
      case 2:
        //console.log(tasks._list);
        //console.log(tasks.listArr);
        console.log(tasks.fullListing);
        break;
    }

    try {
      saveFile(tasks.listArr);
    } catch (err) {
      console.log("The file or directory db/data.json does not exist".red);
    }

    if (option !== 0) await inquirerPause();
  } while (option !== 0);
};

main();
