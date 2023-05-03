const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

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

const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError(
            "Invalid inputs passed please check your data",
            422
        );
    }
    const { email, password } = req.body;

    let exsistingUser;
    try {
        exsistingUser = await User.findOne({ email: email });
    } catch (error) {
        return next(HttpError("Login failed. Please try again later", 500));
    }
    if (!exsistingUser || exsistingUser.password !== password)
        return next(
            new HttpError("Invalid credentitals. Enter valid credentials", 401)
        );
    return res.status(200).json({ exsistingUser });
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed please check your data", 422)
        );
    }

    const { name, email, password, places } = req.body;
    let exsistingUser;
    try {
        exsistingUser = await User.findOne({ email: email });
    } catch (error) {
        return next(HttpError("Sign up failed. Please try again later", 500));
    }
    if (exsistingUser)
        return next(
            new HttpError(
                "User with this email already exsists. Please login instead of sign-up",
                422
            )
        );
    const createNewUser = new User({
        name,
        email,
        image: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?w=2000",
        password,
        places,
    });
    try {
        await createNewUser.save();
        res.status(201).json({
            message: "successful",
            data: createNewUser.toObject({ getters: true }),
        });
    } catch (err) {
        return next(
            new HttpError("Creating user failed, Please try again", 500)
        );
    }
};

exports.getAllUsers = getAllUsers;
exports.login = login;
exports.signup = signup;
