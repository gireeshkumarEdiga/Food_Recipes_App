const router = require("express").Router();
const { authController } = require("../Controllers/AuthController");

router.post("/Auth",authController);
module.exports = router;