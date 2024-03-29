const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Get all courses
// @route     GET /api/v1/courses
// @route     GET /api/v1/bootcamps/:bootcampId/courses
// @access    Public
module.exports.getAllCourses = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
        const courses = await Course.find({ bootcamp: req.params.bootcampId });
        return res
            .status(200)
            .json({ success: true, count: courses.length, data: courses });
    } else {
        res.status(200).json(res.advResults);
    }

    const courses = await query;
});

// @desc      Get all courses
// @route     GET /api/v1/courses/:id
// @access    Public
module.exports.getSingleCourses = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: "bootcamp",
        select: "name description",
    });

    if (!course) {
        return next(
            new ErrorResponse(
                `Course not found with id of ${req.params.id}`,
                404
            )
        );
    }

    res.status(200).json({
        success: true,
        data: course,
    });
});

// @desc      Post a new course
// @route     POST /api/v1/bootcamps/:bootcampId/courses/
// @access    Private
module.exports.createNewCourse = asyncHandler(async (req, res, next) => {
    const bootcampId = req.params.bootcampId;
    req.body.bootcamp = bootcampId;
    req.body.user = req.user.id;

    const bootcamp = await Bootcamp.findById(bootcampId);
    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `Bootcamp not found with id of ${req.params.id}`,
                404
            )
        );
    }
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to add a course to ${bootcamp._id}`,
                401
            )
        );
    }
    const course = await Course.create(req.body);

    res.status(201).json({
        success: true,
        data: course,
    });
});

// @desc      Update course
// @route     POST /api/v1/courses/:id
// @access    Private
module.exports.updateCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(
            new ErrorResponse(
                `No course not found with id of ${req.params.id}`,
                404
            )
        );
    }
    //Make sure user is course owner
    if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to update the course course ${course._id}`,
                401
            )
        );
    }
    const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(201).json({
        success: true,
        data: updatedCourse,
    });
});

// @desc      Delete course
// @route     DELETE /api/v1/courses/:id
// @access    Private
module.exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(
            new ErrorResponse(
                `No course not found with id of ${req.params.id}`,
                404
            )
        );
    }
    //Make sure user is course owner
    if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to delete the course course ${course._id}`,
                401
            )
        );
    }
    course.deleteOne();

    res.status(200).json({
        success: true,
        data: {},
    });
});
