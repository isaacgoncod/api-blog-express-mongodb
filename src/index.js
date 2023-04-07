const express = require("express");
const connectDatabase = require("./database/conn");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");

const authRoute = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");
const postsRoute = require("./routes/posts.routes");
const categoriesRoute = require("./routes/categories.routes");

dotenv.config();

connectDatabase();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "me.jpg");
  },
});

const upload = multer({storate: storage})
app.post("/upload", upload.single("file"), (req, res)=>{
  res.status(200).json("File has been uploaded")
})

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/posts", postsRoute);
app.use("/categories", categoriesRoute);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
