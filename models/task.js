const { v4: uuid } = require("uuid");

class Task {
  constructor({ description, id = uuid(), finishDate = null }) {
    this.id = id;
    this.description = description;
    this.finishDate = finishDate;
  }
}

module.exports = Task;
