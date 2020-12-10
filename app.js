require("dotenv").config();
const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/index");
const app = express();

app.use(cors());
app.use("/", indexRouter);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is litening on PORT: ${server.address().port}`);
});
