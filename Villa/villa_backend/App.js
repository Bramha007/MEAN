const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const villaRoutes = require("./routes/villa-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/villa/", villaRoutes);

app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    throw error;
});

mongoose
    .connect(
        `mongodb+srv://nitishchy007:s5iFaKMOpfL02nCg@cluster0.3lkjhrk.mongodb.net/villa-db?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("Connected to the DB");
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    });
