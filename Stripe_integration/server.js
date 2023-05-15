if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const publicKey = process.env.STRIPE_PUBLISHABLE_KEY;
const secretKey = process.env.STRIPE_SECRET_KEY;

const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/store", function (req, res) {
    fs.readFile("items.json", function (err, data) {
        if (err) return res.status(500).end();
        res.render("store.ejs", {
            items: JSON.parse(data),
            stripePublicKey: publicKey,
        });
    });
});

app.listen(5000);
