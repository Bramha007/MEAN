const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
    {
        id: "u1",
        name: "Bramha1",
        email: "bramha1@gmail.com",
        password: "Test123",
    },
    {
        id: "u2",
        name: "Bramha2",
        email: "bramha2@gmail.com",
        password: "Test123",
    },
    {
        id: "u3",
        name: "Bramha3",
        email: "bramha3@gmail.com",
        password: "Test123",
    },
];

const getAllUsers = (req, res, next) => {
    const users = DUMMY_USERS.map((u) => ({
        id: u.id,
        name: u.name,
    }));
    res.status(200).json({ users });
};

const login = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError(
            "Invalid inputs passed please check your data",
            422
        );
    }
    const { email, password } = req.body;
    user = DUMMY_USERS.find(
        (u) => u.email === email && u.password === password
    );
    if (user) return res.status(200).json({ user });
    return next(new HttpError("incorrect useranme or/and password", 404));
};

const signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError(
            "Invalid inputs passed please check your data",
            422
        );
    }
    const { name, email, password } = req.body;

    alreadyUser = DUMMY_USERS.find((u) => u.email === email);
    if (alreadyUser) return next(new HttpError("Email is already in use"));

    DUMMY_USERS.push({ id: uuid.v4(), name, email, password });
    return res.status(201).json({ DUMMY_USERS });
};

exports.getAllUsers = getAllUsers;
exports.login = login;
exports.signup = signup;
