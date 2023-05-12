const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

const USERS = [];

app.get("/users", (req, res) => {
    return res.json(USERS);
});

app.post("/users", async (req, res) => {
    const { name, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hassedPassword = await bcrypt.hash(password, salt);
        console.log(salt, hassedPassword);
        USERS.push({ name, password: hassedPassword });
        return res.status(201).send();
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong" });
    }
});

app.post("/login", async (req, res) => {
    const user = USERS.find((user) => req.body.name);
    if (!user) return res.status(400).json({ error: "No User Found" });
    try {
        if (await bcrypt.compare(req.body.password, user.password))
            return res.send("success");
        else return res.send("Not allowed");
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(5000);
