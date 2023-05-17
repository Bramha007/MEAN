const path = require("path");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Register User
// @route     GET /api/v1/auth/register
// @access    Public

module.exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await User.create({ email, password, role, name });

    sendTokenResponse(user, 200, res);
});

// @desc      Login User
// @route     GET /api/v1/auth/login
// @access    Public
module.exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    //validate email and password
    if (!email || !password) {
        return next(new ErrorResponse(`Please enter email and password`, 400));
    }

    //check for user
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
        return next(new ErrorResponse(`Invalid Credentials`, 401));
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse(`Invalid Credentials`, 401));
    }

    sendTokenResponse(user, 200, res);
});

//Get Token from the model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    //Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
    };

    res.status(statusCode)
        .cookie("token", token, options)
        .json({ success: true, token });
};

// @desc      Get current logged in User
// @route     GET /api/v1/auth/me
// @access    Private
module.exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user,
    });
});
