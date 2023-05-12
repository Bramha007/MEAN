const express = require("express");
const { check } = require("express-validator");
const villaController = require("../controllers/villa-controller");

const router = express.Router();

router
    .route("/")
    .get(villaController.getVillas)
    .post(
        [
            check("thumbnail", "Villa image is required").not().isEmpty(),
            check("location", "Please provide the location").not().isEmpty(),
            check("price", "Please mention price").not().isEmpty(),
            check("capacity", "Please provide the capacity").not().isEmpty(),
            check("facilities", "Please enter the villa anemeties")
                .not()
                .isEmpty(),
        ],
        villaController.createVilla
    );

module.exports = router;
