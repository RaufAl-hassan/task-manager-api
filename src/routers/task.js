const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send();
  }
  /* task
    .save()
    .then((task) => {
      res.status(201).send(task);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
    */
});

router.get("/tasks", auth, async (req, res) => {
  try {
    // const tasks = await Task.find({});
    // const user = await User.findById(req.user._id);

    const match = {};
    const sort = {};

    if (req.query.completed) match.completed = req.query.completed === "true";

    if (req.query.sortBy) {
      const queryParts = req.query.sortBy.split("_");

      sort[queryParts[0]] = queryParts[1] === "desc" ? -1 : 1;
    }

    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();

    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }

  /* Task.find({})
    .then((tasks) => res.send(tasks))
    .catch(() => res.status(500).send()); */
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;

    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) return res.status(404).send();

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }

  /*  Task.findById(_id)
    .then((task) => res.send(task))
    .catch((error) => {
      if (error.kind === "ObjectId") return res.status(404).send();

      res.status(500).send();
    }); */
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ["description", "completed"];

  const isAllowed = updates.every((update) => allowed.includes(update));

  if (!isAllowed) return res.status(400).send({ error: "Invalid request" });

  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidator: true,
    // });

    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return res.status(404).send();

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return res.status(404).send();

    await task.remove();

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
