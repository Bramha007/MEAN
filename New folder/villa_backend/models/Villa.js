const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const villaSchema = new Schema({
    thumbnail: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    facilities: { type: String, required: true },
});

module.exports = mongoose.model("Villa", villaSchema);
