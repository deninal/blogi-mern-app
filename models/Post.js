const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    fullname: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    userPic: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
