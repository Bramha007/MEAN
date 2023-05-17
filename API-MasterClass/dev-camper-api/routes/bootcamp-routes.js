const express = require("express");

const {
    getAllBootcamps,
    createNewBootcamp,
    getBootcamp,
    updateBootcamp,
    deletBootcamp,
    getBootcampsInRadius,
    uploadBootcampPhoto,
} = require("../route-controller/bootcamp-controller");
const { advancedResults } = require("../middleware/advancedResults");
const Bootcamp = require("../models/Bootcamp");
const { protect, authorize } = require("../middleware/auth");

// Include other resource routers
const courseRouter = require("./course-routes");

const router = express.Router();

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
router
    .route("/")
    .get(advancedResults(Bootcamp, "courses"), getAllBootcamps)
    .post(protect, authorize("publisher", "admin"), createNewBootcamp);
router
    .route("/:id/")
    .get(getBootcamp)
    .put(protect, authorize("publisher", "admin"), updateBootcamp)
    .delete(protect, authorize("publisher", "admin"), deletBootcamp);
router
    .route("/:id/photo")
    .put(protect, authorize("publisher", "admin"), uploadBootcampPhoto);

module.exports = router;
