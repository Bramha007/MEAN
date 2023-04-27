const express = require("express");
const morgan = require("morgan");

const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/user-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

app.use(() => {
    const error = new HttpError("No such route found", 404);
    throw error;
}); //only request that didn't get any response

app.use((error, req, res, next) => {
    // only error handling function
    if (res.headerSent) return next(error);

    res.status(error.code || 500);
    res.json({ message: error.message || "Unknown error" });
});
// app.use("/api/user", userRoutes);
app.listen(5000);
