const express = require("express");
const { getAllProductStatic, getAllProducts } = require("../controllers/product");

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductStatic);
module.exports = router;
