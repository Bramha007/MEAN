const express = require("express");
const Course = require("../models/Course");
const {
    getAllCourses,
    getSingleCourses,
    createNewCourse,
    updateCourse,
    deleteCourse,
} = require("../route-controller/course-controller");
const { advancedResults } = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(
        advancedResults(Course, {
            path: "bootcamp",
            select: "name description",
        }),
        getAllCourses
    )
    .post(protect, authorize("publisher", "admin"), createNewCourse);

router
    .route("/:id")
    .get(getSingleCourses)
    .put(protect, authorize("publisher", "admin"), updateCourse)
    .delete(protect, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
