const mongoose = require("mongoose");
const connectToDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to Mongo DB");
    })
    .catch((err) => console.log(err));
};
module.exports = connectToDB;
