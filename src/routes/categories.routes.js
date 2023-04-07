const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categories.controller");

router.post("/create", categoriesController.createCat);
router.get("/", categoriesController.readCat);

module.exports = router;
