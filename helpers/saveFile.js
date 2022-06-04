const fs = require("fs");
const Task = require("../models/task");

const directory = "db";
const file = `./${directory}/data.json`;

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

const saveFile = (data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data));
  } catch (err) {
    throw err;
  }
};

const readBD = () => {
  if (!fs.existsSync(file)) return [];

  const data = fs.readFileSync(file, { encoding: "utf-8" });

  let transformData = [];

  if (data) {
    const parseData = JSON.parse(data);

    transformData = parseData.map(
      (data) =>
        new Task({
          description: data.description,
          id: data.id,
          finishDate: data.finishDate,
        })
    );
  }

  return transformData;
};

module.exports = { saveFile, readBD };
