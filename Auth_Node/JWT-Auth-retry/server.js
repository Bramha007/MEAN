require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const app = express();

app.post("/login", function (req, res) {
    res.json();
});

app.listen(5000, () => {
    console.log("listening on 5000");
});
