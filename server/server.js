const express = require("express");
const apiRouter = require("./routes");
// const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.listen(process.env.PORT || "3001", () => {
  console.log(`Server is running b: ${process.env.PORT || "3001"}`);
});
