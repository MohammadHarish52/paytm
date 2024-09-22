const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index.js");

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log("App is listening on Port 3000");
});
