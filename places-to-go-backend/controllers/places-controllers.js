const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");

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

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;

    const place = DUMMY_PLACES.find((p) => p.id === placeId);

    if (!place) {
        throw new Error("Count not find the place for the given id", 404);
    }

    res.status(200).json({
        message: "sucessful",
        data: place,
    });
};

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const places = DUMMY_PLACES.filter((u) => u.creator === userId);
    if (places.length === 0 || !places) {
        return next(
            new HttpError("Count not find places for the given user-id", 404)
        );
    }
    res.status(200).json({
        message: "sucessful",
        data: places,
    });
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
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

    const createdPlace = {
        id: uuid.v4(),
        title,
        description,
        location: coordinates,
        address,
        creator,
    };

    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({ message: "successful", data: createdPlace });
};

const patchPlace = (req, res, next) => {
    const id = req.params.pid;
    const patchBody = req.body;
    DUMMY_PLACES.forEach((p) => {
        if (p.id === id) {
            p = { ...p, ...patchBody };
            console.log(p);
            return res.status(200).json({ message: "successful", data: p });
        }
    });
    return next(
        new HttpError("No place was found for the given place-id", 404)
    );
};

const deletePlace = (req, res, next) => {
    const id = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== id);
    console.log(DUMMY_PLACES.length);
    return res.status(204).json({ message: "success" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.patchPlace = patchPlace;
exports.deletePlace = deletePlace;
