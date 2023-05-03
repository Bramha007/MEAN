const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  url: { type: "string", required: true },
  short_url: { type: "Number" },
});

module.exports = mongoose.model("Url", urlSchema);
