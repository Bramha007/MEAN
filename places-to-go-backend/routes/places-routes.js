const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controllers");

const router = express.Router();

router
    .route("/:pid")
    .get(placesControllers.getPlaceById)
    .patch(
        [
            check("title").not().isEmpty(),
            check("description").isLength({ min: 5 }),
        ],
        placesControllers.updatePlace
    )
    .delete(placesControllers.deletePlace);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router
    .route("/")
    .post(
        [
            check("title").not().isEmpty(),
            check("description").isLength({ min: 5 }),
            check("address").not().isEmpty(),
        ],
        placesControllers.createPlace
    );

module.exports = router;

// {
//     "title": "Empire State Building 2 new U2",
//     "description": "One of the most famous sky scrapers in the world!",
//     "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
//     "address": "20 W 34th St, New York, NY 10001",
//     "coordinates": {
//         "lat": 40.7484405,
//         "lng": -73.9878584
//     },
//     "creator": "u2"
// }
