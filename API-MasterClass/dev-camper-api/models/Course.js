const mongoose = require("mongoose");
const Bootcamp = require("./Bootcamp");

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trime: true,
        required: [true, "Please add a course title"],
    },
    description: {
        type: String,
        required: [true, "Please add a course description"],
    },
    weeks: {
        type: Number,
        required: [true, "Please add course duration in weeks"],
    },
    tuition: {
        type: Number,
        required: [true, "Please add course tuition fees"],
    },
    minimumSkill: {
        type: String,
        required: [true, "Please add minimum skills requirements"],
        enum: ["beginner", "intermediate", "advanced"],
    },
    scholarshipAvailable: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: "Bootcamp",
        required: true,
    },
});

//static method to get average of course tutions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
    const obj = await this.aggregate([
        { $match: { bootcamp: bootcampId } },
        { $group: { _id: "$bootcamp", averageCost: { $avg: "$tuition" } } },
    ]);
    try {
        await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
            averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
        });
    } catch (error) {
        conseole.error(error);
    }
};

//Call a method called getAverageCost after the course is saved
CourseSchema.post("save", async function () {
    this.constructor.getAverageCost(this.bootcamp);
});

//Call a method called getAverageCost before the course is deleted
CourseSchema.pre("deleteOne", { document: true }, async function () {
    this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model("Course", CourseSchema);
