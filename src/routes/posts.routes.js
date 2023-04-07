const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");

router.post("/create", postController.createPost);
router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.get("/:id", postController.getPost);
router.get("/", postController.getAllPost);

module.exports = router;
