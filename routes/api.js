const express = require("express");
const router = express.Router();

const { index, getUser, create, upsert, destroy } = require("../controllers/userController");
const { validateLogin } = require("../controllers/loginController");

router.get("/", index);
router.get("/:id", getUser);
router.post("/", create);
router.post("/login", validateLogin);
router.put("/:id", upsert);
router.delete("/", destroy);

module.exports = router;