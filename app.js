require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index");
const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

require("./db/init");

app.use("/", indexRouter);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is litening on PORT: ${server.address().port}`);
});
