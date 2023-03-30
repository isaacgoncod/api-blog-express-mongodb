const express = require("express");
const connectDatabase = require("./database/conn");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");

dotenv.config();

connectDatabase();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use("/auth", authRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
