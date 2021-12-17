const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//Update
router.put("/:id", async (req, res) => {
  //compare users id and update if match
  if (req.body.userId === req.params.id) {
    //if there is password, hash it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, //take everything inside the body
        },
        { new: true }
      ); // send the updated user
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can make changes only to your account");
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    //delete user and all corresponding posts
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can make changes only to your account");
  }
});

//Get User
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {password, ...others} = user._doc
    res.status(200).json(others)
  } catch (error) {
    res.status(500).json("error");
  }
});

module.exports = router;
