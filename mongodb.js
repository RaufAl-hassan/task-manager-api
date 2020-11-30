const { MongoClient, ObjectID } = require("mongodb");

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    const db = client.db(databaseName);

    /* db.collection("tasks").insertMany(
      [
        { description: "Go to the gym", completed: false },
        { description: "Go to the bank", completed: false },
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert documents into database");
        }

        console.log(result.ops);
      }
    ); */

    /* db.collection("tasks").findOne(
      { _id: new ObjectID("5f950ff75bd1342798dd41cd") },
      (error, task) => {
        console.log(task);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tasks) => {
        console.log(tasks);
      }); */

    /* db.collection("users")
      .updateOne(
        {
          _id: new ObjectID("5f950bf078aa9c0f5cdae0b0"),
        },
        {
          $set: {
            name: "kelvin S",
          },
          $inc: {
            age: 1,
          },
        }
      )
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      }); */

    /* db.collection("tasks")
      .updateMany(
        { completed: false },
        {
          $set: {
            completed: true,
          },
        }
      )
      .then((data) => console.log(data))
      .catch((error) => console.log(error)); */

    /* db.collection("users")
      .deleteMany({ age: 21 })
      .then((result) => console.log(result))
      .catch((error) => console.log(error)); */

    db.collection("tasks")
      .deleteOne({
        description: "Buy grossaries",
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }
);
