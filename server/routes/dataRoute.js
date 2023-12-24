const express = require("express");
const {
  dataEntry,
  getSectorsData,
  getParentSectors,
  saveNewSector,
} = require("../controllers/dataController");
const router = express.Router();

router.get("/seed", dataEntry);
router.get("/sectors", getSectorsData);
router.get("/parentSectors", getParentSectors);
router.post("/saveNewSector", saveNewSector);

module.exports = router;
