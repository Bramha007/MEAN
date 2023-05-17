const geocoder = require("../utils/geocoder");
const path = require("path");
const Bootcamp = require("../models/Bootcamp");
const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
module.exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
    // try {
    //     const bootcamps = await Bootcamp.find();
    //     res.status(200).json({
    //         success: true,
    //         data: bootcamps,
    //         count: bootcamps.length,
    //     });
    // } catch (err) {
    //     next(err);
    // }=

    res.status(200).json(res.advResults);
});

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
module.exports.createNewBootcamp = asyncHandler(async (req, res, next) => {
    //Add user to request body
    req.body.user = req.user.id;

    //Check for published bootcamp
    const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

    // if the user is not an admin they can only add one bootcamp
    if (publishedBootcamp && req.user.role !== "admin") {
        return next(
            new ErrorResponse(
                `The user with id ${req.user.id} has already published a bootcamp`,
                400
            )
        );
    }

    const newBootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
        success: true,
        data: newBootcamp,
    });
});

// @desc      Get single bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
module.exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const bootcamp = await Bootcamp.findById(id);
    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `Bootcamp not found with id of ${req.params.id}`,
                404
            )
        );
    }
    res.status(200).json({
        success: true,
        data: bootcamp,
    });
});

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
module.exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    let bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `Bootcamp not found with corresponding ${req.params.id}`,
                404
            )
        );
    }

    //make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to update the bootcamp`,
                401
            )
        );
    }

    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    return res.status(200).json({
        success: true,
        data: bootcamp,
    });
});

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private
module.exports.deletBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `Bootcamp not found with corresponding ${req.params.id}`,
                404
            )
        );
    }
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to delete the bootcamp`,
                401
            )
        );
    }

    await bootcamp.deleteOne();
    // await Course.deleteMany({ bootcamp: req.params.id });

    res.status(200).json({ success: true, data: {} });
});

// @desc      Get bootcamps within a radius
// @route     DELETE /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private
module.exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 6,378 km
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps,
    });
});

// @desc      upload photo for bootcam
// @route     DELETE /api/v1/bootcamps/:id/photo
// @access    Private
module.exports.uploadBootcampPhoto = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `Bootcamp not found with corresponding ${req.params.id}`,
                404
            )
        );
    }

    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to upload photo for the bootcamp`,
                401
            )
        );
    }

    const file = req.files.file;
    if (!file) {
        return next(new ErrorResponse(`Please upload the photo`, 400));
    }
    if (!file.mimetype.startsWith("image")) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }
    if (file.size > process.env.FILE_UPLOAD_MAX_SIZE) {
        return next(
            new ErrorResponse(
                `Please upload an image file less than ${process.env.FILE_UPLOAD_MAX_SIZE}`,
                400
            )
        );
    }
    //Create custom file name for the file upload
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
        if (err) {
            console.log(err);
            new ErrorResponse(`Some problem with file upload`, 500);
        }
        await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
        res.status(200).json({
            success: true,
            data: file.name,
        });
    });
});
