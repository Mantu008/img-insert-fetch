const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://mantu000:mantu000@cluster0.eewb1ul.mongodb.net/youtoub"
  )
  .then(() => {
    console.log("database connected sucessfully....");
  })
  .catch((err) => {
    console.log(err);
  });
