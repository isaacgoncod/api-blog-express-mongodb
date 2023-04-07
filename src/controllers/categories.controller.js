const Category = require("../models/Category");

const createCat = async (req, res) => {
  try {
    const newCat = new Category(req.body);

    const savedCat = await newCat.save();

    res.status(201).json(savedCat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const readCat = async (req, res) => {
  try {
    const cats = await Category.find();

    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  createCat,
  readCat
};
