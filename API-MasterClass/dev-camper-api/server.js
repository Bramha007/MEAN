const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server up and running in ${process.env.NODE_ENV} on port ${PORT}`
    )
);
