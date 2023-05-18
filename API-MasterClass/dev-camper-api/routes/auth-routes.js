const express = require("express");
const {
    register,
    login,
    getMe,
    forgotPassword,
    resetPassword,
    updateDetails,
    updatePassword,
} = require("../route-controller/auth-controller");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/forgotpasword").post(forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);

module.exports = router;
