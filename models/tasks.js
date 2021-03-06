require("colors");
const Task = require("./task");

class Tasks {
  constructor() {
    this._list = {};
  }

  create(description) {
    const task = new Task({ description });
    this._list[task.id] = task;
  }

  delete(id) {
    if (this._list[id]) delete this._list[id];
  }

  finishTasks(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];

      if (!task.finishDate) task.finishDate = new Date().toISOString();
    });

    this.listArr.forEach(({ id }) => {
      if (!ids.includes(id)) {
        this._list[id].finishDate = null;
      }
    });
  }

  get listArr() {
    const list = [];

    Object.keys(this._list).forEach((key) => {
      list.push(this._list[key]);
    });

    return list;
  }

  set listArr(arr = []) {
    const list = {};
    arr.forEach((res) => {
      list[res.id] = res;
    });
    this._list = list;
  }

  get fullListing() {
    let data = "";

    this.listArr.forEach((task, index) => {
      const idx = `${index + 1}:`.green;
      const { description, finishDate } = task;
      const status = finishDate ? "completed".green : "pending".red;

      data += `${idx} ${description} :: ${status}\n`;
    });

    return data;
  }

  fullTaskListingByStatus(taskStatus = true) {
    let data = "";

    this.listArr
      .filter((task) => (taskStatus ? task.finishDate : !task.finishDate))
      .forEach((task, index) => {
        const idx = `${index + 1}:`.green;
        const { description, finishDate } = task;
        const status = finishDate ? finishDate.green : "pending".red;

        data += `${idx} ${description} :: ${status}\n`;
      });

    return data;
  }
}

module.exports = Tasks;
