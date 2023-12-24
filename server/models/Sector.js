const mongoose = require("mongoose");

const sectorSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  label: { type: String, required: true },
  parent: { type: Number },
  agree: { type: Boolean, default: false },
});

const Sector = mongoose.model("Sector", sectorSchema);

module.exports = Sector;
