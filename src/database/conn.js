const mongoose = require("mongoose");

const connectionDatabase = async () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((err) => console.log(err));
};

module.exports = connectionDatabase;
