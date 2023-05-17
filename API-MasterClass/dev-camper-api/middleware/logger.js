//@desc logs req method and status to console
module.exports.logger = (req, res, next) => {
    console.log(
        `${req.method} ${req.protocol} ://${req.get("host")}${
            req.originalUrl
        } ${res.statusCode}`
    );
    next();
};
