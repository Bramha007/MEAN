require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = [
    {
        username: "Kyle",
        title: "Post 1",
    },
    {
        username: "Jim",
        title: "Post 2",
    },
];

app.get("/posts", authenticateToken, (req, res) => {
    console.log(req.user);
    res.json(posts.filter((post) => post.username === req.user.name));
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log("authHeader", authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    console.log("token", token);
    if (token === null) {
        console.log("inside if");
        return res.status(401);
    } else {
        console.log("inside else");
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            else {
                req.user = user;
                return next();
            }
        });
    }
}

app.post("/login", (req, res) => {
    const useranme = req.body.useranme;
    const user = { name: useranme };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
});

app.listen(3000);
