const express = require("express");
const { Account } = require("../db");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");

// Get balance route
router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

// Transfer route
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const { amount, to } = req.body;

      // Validate the 'to' userId
      if (!mongoose.Types.ObjectId.isValid(to)) {
        // Throwing will abort the transaction inside withTransaction
        throw new Error("Invalid recipient userId");
      }

      // Fetch the accounts within the transaction
      const account = await Account.findOne({ userId: req.userId }).session(
        session
      );

      if (!account || account.balance < amount) {
        throw new Error("Insufficient balance");
      }

      const toAccount = await Account.findOne({ userId: to }).session(session);

      if (!toAccount) {
        throw new Error("Invalid account");
      }

      // Perform the transfer atomically within the transaction
      await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } }
      ).session(session);
      await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(
        session
      );
    });

    // If we reach here the transaction committed successfully
    return res.json({ message: "Transfer successful" });
  } catch (err) {
    // Handle expected validation errors with 400
    const msg = err && err.message ? err.message : "Transfer failed";
    if (
      msg === "Invalid recipient userId" ||
      msg === "Insufficient balance" ||
      msg === "Invalid account"
    ) {
      return res.status(400).json({ message: msg });
    }

    // For transient transaction errors the driver will attempt retries inside withTransaction,
    // but other unexpected errors may happen; log and return 500.
    console.error("Transfer error:", err);
    return res.status(500).json({ message: "Transfer failed", error: err.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;
