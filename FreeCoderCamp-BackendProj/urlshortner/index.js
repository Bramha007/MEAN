require("dotenv").config();
const express = require("express");
const cors = require("cors");
const URL = require("url").URL;
const mongoose = require("mongoose");
const dns = require("dns");
const urlparser = require("url")
const Url = require("./model/url-models");

const app = express();

// Basic Configuration
const port = process.env.PORT || 5000;

const checkUrlValidity = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.zqifihp.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
    res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
    res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", async function (req, res, next) {
    const url = req.body.url;
    const dnslookup = dns.lookup(
        urlparser.parse(url).hostname,
        async (err, address) => {
            if (!address) {
                return res.json({ error: "invalid url" });
            } else {
                let shortUrlNumber = await Url.countDocuments();
                
                const urlExists = await Url.findOne({ url: url });
                if (urlExists) {
                    return res.json({
                        original_url: urlExists.url,
                        short_url: urlExists.short_url,
                    });
                }

                const createUrl = new Url({
                    url,
                    short_url: Number(shortUrlNumber + 1),
                });
                try {
                    await createUrl.save();
                } catch (err) {
                    return res.json({ error: "invalid url" });
                }

                return res.status(201).json({
                    original_url: url,
                    short_url: Number(shortUrlNumber + 1),
                });
            }
        }
    );
});

app.get("/api/shorturl/:id", async (req, res, next) => {
    const shortUrl = req.params.id;
    let urlExists;
    try {
        urlExists = await Url.findOne({ short_url: shortUrl });
    } catch (err) {
        return res.json({ error: "invalid url" });
    }
    if (urlExists) {
        return res.redirect(urlExists.url);
    }
});

mongoose
    .connect(url)
    .then(() => {
        app.listen(port, function () {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(process.env.MONGODB_USERNAME);
        console.log(err);
    });
