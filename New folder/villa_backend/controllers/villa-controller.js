const Villa = require("../models/Villa");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

const DUMMY_VILLA = [
    {
        id: uuidv4(),
        thumbnail:
            "https://i.pinimg.com/originals/95/27/f6/9527f654acce9836b0b439cc039bba72.jpg",
        location: "Mumbai",
        price: 25600,
        capacity: 5,
        facilities: "Bedroom, AC, Toilets",
    },
    {
        id: uuidv4(),
        thumbnail:
            "https://i.pinimg.com/originals/95/27/f6/9527f654acce9836b0b439cc039bba72.jpg",
        location: "Pune",
        price: 2550,
        capacity: 2,
        facilities: "Bedroom, AC, Toilets, Swimming Pool",
    },
    {
        id: uuidv4(),
        thumbnail:
            "https://i.pinimg.com/originals/95/27/f6/9527f654acce9836b0b439cc039bba72.jpg",
        location: "Chennai",
        price: 5600,
        capacity: 3,
        facilities: "Bedroom, WiFi, Toilets",
    },
];

const getVillas = async (req, res, next) => {
    return res.json({ message: "successful", villas: DUMMY_VILLA });
};

const createVilla = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    const { price, capacity } = req.body;
    if (typeof capacity != "number" || typeof price != "number") {
        return res
            .status(400)
            .json({ message: "Price or/and Capacity can be Numeric only " });
    }
    console.log(body);
    const newVilla = {
        id: uuidv4(),
        ...body,
    };
    return res.status(201).json(newVilla);
};

exports.getVillas = getVillas;
exports.createVilla = createVilla;
