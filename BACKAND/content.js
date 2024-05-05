const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: String, // Define video field as String
  img: String, // Define image field as String
});

const content = new mongoose.model("content", contentSchema);

module.exports = content;
