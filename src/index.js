const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

// middleware
/* app.use((req, res, next) => {
  res.status(503).send("Service is under mantainance");
}); */

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

/* const bcrypt = require("bcryptjs");

const hashPassword = async () => {
  const password = "1234";
  // const hash = await bcrypt.hash(password, 8);

  const hash = bcrypt.compare(
    "1234",
    "$2a$08$4DeOP2QDTcJ4UYqpQ08nSuksjsIZ02IwkrI6l2vRxQdODSW.08HQ6"
  );

  return hash;
}; 

hashPassword().then((password) => {
  console.log(password);
});

*/

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/* const jwt = require("jsonwebtoken");

const generateToken = () => {
  const token = jwt.sign({ _id: "abc" }, "iamnewtothiscourse");

  console.log(jwt.verify(token, "iamnewtothiscourse"));
};

generateToken(); */

// const Task = require("./models/task");
// const User = require("./models/user");

// const refs = async () => {
//   /* const task = await Task.findById("5fb4f3d2d530b71dc4f3e653");
//   await task.populate("owner").execPopulate();
//   console.log(task.owner); */

//   const user = await User.findById("5fb4f2a006da7318b09f37b8");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// refs();

// //uploading a pic with multer middleware
// const multer = require("multer");

// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(png|jpg)$/))
//       return cb(new Error("File format is not allowed"));

//     cb(undefined, true);
//   },
// });

// app.post(
//   "/avatar",
//   upload.single("upload"),
//   async (req, res) => {
//     try {
//       res.send();
//     } catch (e) {
//       res.status(500).send(e);
//     }
//   },
//   (error, req, res, next) => {
//     res.status(400).send({error: error.message});
//   }
// );
