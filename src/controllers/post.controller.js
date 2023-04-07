const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const post = await Post.findById(id);

    if (post.username === username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          id,
          {
            $set: req.body,
          },
          { new: true }
        );

        res.status(202).json(updatedPost);
      } catch (err) {
        res.status(500).json({ message: err });
      }
    } else {
      res.status(401).json({ message: `You can update only your post!` });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const post = await Post.findById(id);

    if (post.username === username) {
      try {
        await Post.findByIdAndDelete(id);

        res.status(202).json({ message: "Post Deleted" });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    } else {
      res.status(401).json({ message: `You can delete only your post!` });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not Found" });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getAllPost = async (req, res) => {
  try {
    const username = req.query.user;
    const catName = req.query.cat;

    let posts;

    if (username) {
      posts = await Post.find({ username: username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPost,
};
