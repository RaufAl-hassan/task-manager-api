require("../src/db/mongoose");
const { findByIdAndDelete } = require("../src/models/task");
const Task = require("../src/models/task");

/* 
Task.findByIdAndDelete("5f9a9402f3023f19f84cf41e")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
*/

const deleteTaskAndCount = async (id, completed) => {
  const task = await Task.findByIdAndDelete(id);
  const countUncompletedTask = await Task.countDocuments({ completed });

  return countUncompletedTask;
};

deleteTaskAndCount("5f9be9ba5bf9e629b80d7041", false)
  .then((count) => console.log(count))
  .catch((e) => console.log(e));
