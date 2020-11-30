const express = require("express");
const multer = require("multer");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

// upload pic
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)/))
      return cb(new Error("Please upload an image"));

    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    try {
      req.user.avatar = req.file.buffer;
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  },
  (error, req, res, next) => res.status(400).send({ error: error.message })
);

// delete avatar
router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// get avatar
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    console.log(user);

    if (!user || !user.avatar) throw new Error();

    res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send({
      code: 404,
    });
  }
});

// logout user
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

// logout users
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(500);
  }
});

// login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateToken();

    res.send({ user, token });
  } catch (e) {
    res.status(401).send(e);
  }
});

// signup
router.post("/users", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ["name", "email", "password", "age"];

  const isAllowed = updates.every((update) => allowed.includes(update));

  if (!isAllowed) return res.status(400).send({ error: "Invalid Field" });

  try {
    const user = new User(req.body);

    await user.save();

    const token = await user.generateToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }

  /* user
    .save()
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => res.status(400).send(error)); */
});

// get user profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
  /* try {
    const users = await User.find({});

    res.send(users);
  } catch (e) {
    res.status(500).send();
  } */

  /* User.find({})
    .then((users) => {
      if (!users) {
        return res.status(404).send();
      }

      res.send(users);
    })
    .catch(() => {
      res.status(500).send();
    }); */
});

/* router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);

    if (!user) return res.status(404).send();

    res.send(user);
  } catch (e) {
    res.status(500).send();
  } 

  //  User.findById(_id)
  //   .then((user) => {
  //     res.send(user);
  //   })
  //   .catch((error) => {
  //     if (error.kind === "ObjectId") return res.status(404).send();

  //     res.status(500).send(error);
  //   }); 
});*/

// update
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ["name", "email", "password", "age"];

  const isAllowed = updates.every((update) => allowed.includes(update));

  if (!isAllowed) return res.status(400).send({ error: "Invalid Update" });

  try {
    // const user = await User.findById(req.params.id);
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    // if (!user) return res.status(404).send();

    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete
router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.params.id);

    await req.user.remove();

    // if (!user) return res.status(404).send();

    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
