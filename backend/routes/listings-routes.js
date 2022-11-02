const express = require("express");
const { check } = require("express-validator");

const listingsControllers = require("../controllers/listings-controller");
// middleware inputs here

const router = express.Router;

router.get("/:lid", listingsControllers.getListing);
router.get("/listings/:uid", listingsControllers.getUserListings);

// TODO: user needs to be authorized past this point
router.post("/", listingsControllers.createListing);
router.patch("/:lid", listingsControllers.updateListing);
router.delete("/:lid", listingsControllers.deleteListing);

module.exports = router;
