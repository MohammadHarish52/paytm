const express = require("express");
const { Account } = require("../db");
const router = express.Router();
const authMiddleware = require("../middleware");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    user: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", async (req, res) => {
  const { to, amount } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();
});

const account = await Account.findOne({ userId: req.userId }).session(session);

if (!account || account.balance < amount) {
  await session.abortTransaction();
  res.status(400).json({
    message: "insuffiecient balance",
  });
}

const toAccount = await Account.findOne({ userId: to }).session(session);

if (!toAccount) {
  await session.abortTransaction();
  res.status(400).json({
    message: "incorrect account",
  });
}

await Account.updateOne(
  { userId: req.userId },
  {
    $inc: {
      balance: -amount,
    },
  }
);
await Account.updateOne(
  { userId: to },
  {
    $inc: {
      balance: amount,
    },
  }
);

await session.commitTransaction();

res.json({
  message: "transfer succesful",
});
module.exports = router;
