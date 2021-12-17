const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//Create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res
        .status(401)
        .json("You are not allowed to edit posts which are not yours!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted!");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You are not allowed to delete this post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json("error");
  }
});

//Get all posts
router.get("/", async (req, res) => {
  const fullname = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if(fullname){ //fetch only posts corresponding to username
        posts = await Post.find({fullname});
    } else if(catName){ //fetch posts corresponding to category
        posts = await Post.find({categories:{
            $in:[catName]
        }}) //from Post model
    } else { 
        posts = await Post.find() // otherwise fetch all posts
    }
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json("error");
  }
});

 

module.exports = router;
