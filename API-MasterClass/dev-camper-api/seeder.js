const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();

const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");
const User = require("./models/User");

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
});

const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const courses = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

// Imports into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        await User.create(users);
        console.log("DATA IMPORTED".green.inverse);
        process.exit();
    } catch (error) {
        console.error(error);
    }
};

// Delete data from the DB
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();
        console.log("DATA DESTROYED".red.inverse);
        process.exit();
    } catch (error) {
        console.error(error);
    }
};

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}
