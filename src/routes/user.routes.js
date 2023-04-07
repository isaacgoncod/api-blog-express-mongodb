const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.patch("/:id", userController.update);
router.delete("/:id", userController.deleteUserAndPost);
router.get("/:id", userController.getUser);

module.exports = router;
