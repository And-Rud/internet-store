const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const sequelize = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server is starting on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
