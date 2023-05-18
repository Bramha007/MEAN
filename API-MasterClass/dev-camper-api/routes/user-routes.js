const express = require("express");
const { advancedResults } = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");
const User = require("../models/User");

const {
    getSingleUser,
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
} = require("../route-controller/user-controller");

const router = express.Router();
router.use(protect);
router.use(authorize("admin"));
router.route("/").get(advancedResults(User), getAllUsers).post(createUser);
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
