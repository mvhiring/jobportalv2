const express = require("express");
const dotenv = require("dotenv");
const routes = require("./src/routes");
const db = require("./src/models");
const cors = require('cors')
dotenv.config();

const app = express();

app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:8080",
  "https://jobportalv2.onrender.com"
];

app.use(cors());

app.use("/api", routes);


db.sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("DB connection error:", err));

db.sequelize
  .sync({ alter: false })
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Sync error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
