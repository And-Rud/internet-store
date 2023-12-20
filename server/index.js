const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const sequelize = require("./db");
const fileUpload = require("express-fileupload");
const models = require("./models/models");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/", router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    //ця функ звіряє стан БД із схемою данних описаною нами
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server is starting on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
