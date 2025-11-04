const mongoose = require("mongoose");

const url =
  "mongodb+srv://pavanUser:Prince@p7201@cluster0.drsmnvx.mongodb.net/?appName=Cluster0";
module.exports.connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.log("Error: ", err));
};
