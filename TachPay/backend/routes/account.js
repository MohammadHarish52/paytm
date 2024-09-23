const express = require("express");
const { Account } = require("../db");
const router = express.Router();
const authMiddleware = require("../middleware");
const { default: mongoose } = require("mongoose");

// Get balance route
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    // Find the account of the authenticated user
    const account = await Account.findOne({ user: req.userId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Respond with the user's balance
    res.json({ balance: account.balance });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Transfer route
router.post("/transfer", authMiddleware, async (req, res) => {
  const { to, amount } = req.body;

  // Start a session for the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch the sender's account within the session
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    // Check if the sender has enough balance
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Fetch the recipient's account
    const toAccount = await Account.findOne({ userId: to }).session(session);

    // Validate if the recipient exists
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid recipient account" });
    }

    // Deduct amount from sender's account
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    // Add amount to recipient's account
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction if all is successful
    await session.commitTransaction();

    // Respond with success
    res.json({ message: "Transfer successful" });
  } catch (err) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    res.status(500).json({ message: "Internal server error" });
  } finally {
    // End the session
    session.endSession();
  }
});

module.exports = router;
