const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.patch("/update/:id", userController.update);

module.exports = router;
