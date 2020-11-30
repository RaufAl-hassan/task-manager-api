require("../src/db/mongoose");
const User = require("../src/models/user");
/* 
User.findByIdAndUpdate("5f9a9dd6d07c1a1370b07fc7", { age: 1 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then((result) => console.log(result)); */

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age: 1 });

  return count;
};

updateAgeAndCount("5f9a9dd6d07c1a1370b07fc7", 1)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => console.log(e));
