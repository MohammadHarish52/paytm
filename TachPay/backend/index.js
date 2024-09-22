const express = require("express");
const rootRouter = require("./routes/index.js");

const app = express();

app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  console.log("App is listening on Port 3000");
});
