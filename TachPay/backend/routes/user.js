const express = require("express");

const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User } = require("../db");

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signinBody = zod.object({
  username: zod.string().email(),

  password: zod.string(),
});

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    res.status(411).send({
      message: "Email already taken/incorrect inputs",
    });
  }
  const { username, firstName, lastName, password } = req.body;

  const existingUser = await User.findOne({
    username: username,
  });
  if (existingUser) {
    res.status(411).send({
      message: "Email already taken/incorrect inputs",
    });
  }

  const user = await User.create({
    username: username,
    firstName: firstName,
    lastName: lastName,
    password: password,
  });

  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created Succesfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while loggin in",
    });
  }
  const { username, password } = req.body;
  const user = await User.findOne({
    username: username,
    password: password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res,
      json({
        token: token,
      });
    return;
  }

  res.status(411).json({
    message: "Error while loggin in",
  });
});

module.exports = router;
