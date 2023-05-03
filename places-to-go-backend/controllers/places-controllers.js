const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/places");

let DUMMY_PLACES = [
    {
        id: "p1",
        title: "Empire State Building U1",
        description: "One of the most famous sky scrapers in the world!",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
        address: "20 W 34th St, New York, NY 10001",
        location: {
            lat: 40.7484405,
            lng: -73.9878584,
        },
        creator: "u1",
    },
    {
        id: "p2",
        title: "Empire State Building U2",
        description: "One of the most famous sky scrapers in the world!",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
        address: "20 W 34th St, New York, NY 10001",
        location: {
            lat: 40.7484405,
            lng: -73.9878584,
        },
        creator: "u2",
    },
    {
        id: "p3",
        title: "Empire State Building 2 U2",
        description: "One of the most famous sky scrapers in the world!",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
        address: "20 W 34th St, New York, NY 10001",
        location: {
            lat: 40.7484405,
            lng: -73.9878584,
        },
        creator: "u2",
    },
];

const handleUnProcessedRequest = (errMsg, code) => {
    const error = new HttpError(errMsg, code);
    return error;
};

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        return next(
            handleUnProcessedRequest(
                "Something went wrong, Could not prcoess your request at this time",
                500
            )
        );
    }
    if (!place) {
        const error = new HttpError(
            "Could not find the place for the given place-id",
            404
        );
        return next(error);
    }

    return res.status(200).json({
        message: "sucessful",
        data: place.toObject({ getters: true }),
    });
};

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let places;
    try {
        places = await Place.find({ creator: userId });
    } catch (err) {
        return next(
            handleUnProcessedRequest(
                "Something went wrong, Could not prcoess your request at this time",
                500
            )
        );
    }
    if (places.length === 0 || !places) {
        return next(
            new HttpError("Count not find places for the given user-id", 404)
        );
    }
    return res.status(200).json({
        message: "sucessful",
        data: places.map((place) => place.toObject({ getters: true })),
    });
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed please check your data", 422)
        );
    }

    const { title, description, address, creator } = req.body;
    let coordinates;

    try {
        coordinates = await getCoordsForAddress(address);
    } catch (err) {
        return next(err);
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
        creator,
    });

    try {
        await createdPlace.save();
        res.status(201).json({
            message: "successful",
            data: createdPlace.toObject({ getters: true }),
        });
    } catch (err) {
        const error = new HttpError(
            "Creating palce failed, Please try again",
            500
        );
        return next(error);
    }
};

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed please check your data", 422)
        );
    }
    const placeId = req.params.pid;
    const updateBody = req.body;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        return next(
            handleUnProcessedRequest(
                "Something went wrong, Could not prcoess your request at this time",
                500
            )
        );
    }

    place.title = updateBody.title;
    place.description = updateBody.description;
    console.log(place);
    try {
        await place.save();
    } catch (error) {
        return next(
            handleUnProcessedRequest(
                "Something went wrong, Could not update the place at this time",
                500
            )
        );
    }
    return res.status(200).json({
        message: "successful",
        data: place.toObject({ getters: true }),
    });
};

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;
    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        return next(
            handleUnProcessedRequest(
                "Something went wrong, Could not prcoess your request at this time",
                500
            )
        );
    }
    try {
        await place.remove();
    } catch (err) {
        return next(new HttpError("Cannot remove the place", 500));
    }
    return res.status(200).json({ message: "success" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
