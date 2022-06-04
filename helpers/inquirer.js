const inquirer = require("inquirer");
require("colors");

const questions = [
  {
    type: "list",
    name: "option",
    message: "What would you like to do?",
    choices: [
      {
        value: 1,
        name: `${"1)".green} create task`,
      },
      {
        value: 2,
        name: `${"2)".green} list tasks`,
      },
      {
        value: 3,
        name: `${"3)".green} list completed tasks`,
      },
      {
        value: 4,
        name: `${"4)".green} list pending tasks`,
      },
      {
        value: 5,
        name: `${"5)".green} completing task(s)`,
      },
      {
        value: 6,
        name: `${"6)".green} delete task`,
      },
      {
        value: 0,
        name: `${"0)".green} exit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  const title = "Select an option";

  console.clear();
  console.log("======================".green);
  console.log(`   ${title}`.green);
  console.log("======================".green);

  const { option } = await inquirer.prompt(questions);
  return option;
};

const inquirerPause = async () => {
  console.log("\n");
  await inquirer.prompt([
    {
      type: "input",
      name: "enter",
      message: `press ${"ENTER".green} to continue`,
    },
  ]);
};

const readInput = async () => {
  const { task } = await inquirer.prompt([
    {
      type: "input",
      name: "task",
      message: "enter task description:",
      validate(value) {
        if (value.length === 0) {
          return "Please enter a value";
        }
        return true;
      },
    },
  ]);

  return task;
};

const taskMenu = async (tasks = []) => {
  if (!tasks.length) {
    console.log("there are no tasks to delete".red);
    return null;
  }

  const choices = tasks.map((task, index) => ({
    value: task.id,
    name: `${String(index + 1).green}: ${task.description} :: ${
      task.finishDate ? task.finishDate.green : "pending".red
    }`,
  }));

  const { option } = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "select tare to delete!",
    choices,
  });

  return option;
};

const confirmDeletion = async () => {
  const { option } = await inquirer.prompt([
    {
      type: "input", //type confirm
      name: "option",
      message: "you want to delete the task yes/no? ",
      validate(value) {
        if (value.length === 0) {
          return "please enter a value";
        }

        if (!["yes", "no"].includes(value)) {
          return "you must enter yes/no";
        }

        return true;
      },
    },
  ]);

  return option === "yes" ? true : false;
};

module.exports = {
  inquirerMenu,
  inquirerPause,
  readInput,
  taskMenu,
  confirmDeletion,
};
