const express = require("express");
const { check } = require("express-validator");

const {
    getAllUsers,
    signup,
    login,
} = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", getAllUsers);
router.post(
    "/login",
    [check("email").isEmail(), check("password").isLength({ min: 4 })],
    login
);
router.post(
    "/sign-up",
    [
        check("email").isEmail(),
        check("password").isLength({ min: 4 }),
        check("name").not().isEmpty(),
    ],
    signup
);

module.exports = router;
