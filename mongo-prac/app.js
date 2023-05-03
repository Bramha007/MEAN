const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoPractice = require("./mongo");
const mongoosePractice = require("./mongoose");

const app = express();
app.use(morgan("dev"));

app.use(bodyParser.json());

// app.route("/products")
//     .post(mongoPractice.createProduct)
//     .get(mongoPractice.getProducts);

app.route("/products")
    .post(mongoosePractice.createProduct)
    .get(mongoosePractice.getProducts);

app.listen(3000);
