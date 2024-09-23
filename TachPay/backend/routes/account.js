const express = require("express");
const { Account } = require("../db");
const router = express.Router();

router.get("/balance", async (req, res) => {
  const { to, amount } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  });

  if (account.balance < amount) {
    res.status(400).json({
      message: "insufficient balance",
    });
  }
  const toAccount = await Account.findOne({
    userId: to,
  });
  if (!toAccount) {
    res.status(400).json({
      message: "incorrect account",
    });
  }
  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  );
  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  );

  res.json({
    message: "transfer successful",
  });
});

module.exports = router;

router.post("/transfer", async (req, res) => {});
