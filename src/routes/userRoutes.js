const express = require("express");
const controller = require("../controllers/userController");

const router = express.Router();

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);

module.exports = router;
