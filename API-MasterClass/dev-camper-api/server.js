const express = require("express");
const path = require("path");
const morgan = require("morgan");
const colors = require("colors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const dbConnect = require("./db");
const errorHandler = require("./middleware/error");
// const { logger } = require("./middleware/logger"); // custome middleware

dbConnect(); //connect to database

const bootcampRoutes = require("./routes/bootcamp-routes");
const courseRoutes = require("./routes/course-routes");
const authRoutes = require("./routes/auth-routes");

const app = express();
if (process.env.NODE_ENV === "development") app.use(morgan("dev")); // dev login middleware

//Body parser
app.use(express.json());
// app.use(logger); //custom logger middleware
app.use(fileUpload());
// Cookie Parse
app.use(cookieParser());

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/bootcamps", bootcampRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/auth/", authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server up and running in ${process.env.NODE_ENV} on port ${PORT}`
            .yellow.bold
    )
);

//Handle Uhandled promise
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error : ${err.message}`.red);
    server.close(() => {
        process.exit(1);
    });
});
