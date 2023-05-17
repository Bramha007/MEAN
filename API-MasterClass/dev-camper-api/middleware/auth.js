const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

module.exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    // else if(req.cookies.token){
    //     token = req.cookies.token
    // }

    // Make sure cookies exists
    if (!token) {
        return next(
            new ErrorResponse("not authorized to access this route", 401)
        );
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        return next(
            new ErrorResponse("not authorized to access this route", 401)
        );
    }
});

//Grant accss to specific roles
module.exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `User role '${req.user.role}' is not authorized to access this route`,
                    403
                )
            );
        }
        next();
    };
};
