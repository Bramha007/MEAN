const mongoose = require("mongoose");

const connectDb = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
    });
    console.log(
        `Mongoose Connected : ${conn.connection.host}`.cyan.underline.bold
    );
};

module.exports = connectDb;
