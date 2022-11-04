const { validationResult } = require("express-validator");

const fs = require("fs");
const HttpError = require("../models/http-error");
const Listing = require("../models/listing");
const { default: mongoose } = require("mongoose");
const listing = require("../models/listing");

// Given a valid listingId, queries the backend and returns
// an object with the properties of that listing
const getListingById = async (req, res, next) => {
  const listingId = req.params.lid;
  let listing;
  try {
    listing = await Listing.findById(listingId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find a listing", 500)
    );
  }

  if (!listing) {
    return next(
      new HttpError(
        "Could not find a listing for the provided listing id.",
        404
      )
    );
  }
  res.json({ listing: listing.toObject({ getters: true }) });
};

// Given a valid userId, queries the backend and returns
// an object with the properties of that listing
const getListingsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId).populate("listings");
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find a listing", 500)
    );
  }
  if (!user) {
    return next(
      new HttpError("Could not find listings for the provided user id.", 404)
    );
  }
  res.json({
    listings: user.listings.map((listing) =>
      listing.toObject({ getters: true })
    ),
  });
};

// TODO: Some API call to load them all? Or at least next 20 listings or something

// Creates new listing
const createListing = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs. Please check the entered data", 422)
    );
  }
  const { title, description, price, image, uid } = req.body;

  const newListing = new Listing({
    title,
    description,
    price,
    image: image, // req.file.path,
    creator: uid, // req.userData.userId,
  });
  console.log(newListing);

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError(
        "Something went wrong while creating the listing, could not find a user",
        500
      )
    );
  }
  if (!user) {
    return next(new HttpError("Could not find user for the provided id", 404));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newListing.save({ session });
    user.places.push(newListing);
    await user.save({ session });
    session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Issue while creating listing, please try again",
      500
    );
    return next(error);
  }

  res.status(201).json({ listing: newListing });
};
const updateListing = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs. Please check the entered data", 422)
    );
  }

  const listingId = req.params.lid;
  try {
    listing = await Listing.findById(listingId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find a listing", 500)
    );
  }

  if (listing.creator.toString() !== req.userData.uid) {
    return next(
      new HttpError(
        "You do not have the access rights to change this listing",
        403
      )
    );
  }

  const { title, description, price, image } = req.body;
  listing.title = title;
  listing.description = description;
  listing.price = price;
  listing.imgae = image;

  try {
    await listing.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update the listing", 500)
    );
  }

  res.json({ listing: listing.toObject({ getters: true }) });
};
const deleteListing = async (req, res, next) => {
  const listingId = req.params.lid;
  let listing;
  try {
    listing = await Listing.findById(listingId).populate("creator");
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find the listing", 500)
    );
  }

  if (!listing) {
    return next(
      new HttpError(
        "Could not find the listing given the provided listing Id",
        404
      )
    );
  }

  if (listing.creator.id !== req.userData.uid) {
    return next(
      new HttpError(
        "You do not have the access rights to change this listing",
        403
      )
    );
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await listing.remove({ session });
    listing.creator.listings.pull(listing);
    await listing.creator.save({ session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, coud not delete the listing.",
      500
    );
    return next(error);
  }
  // fs.unlink(imagePath, (err) => {
  //   console.log(err);
  // });
  res.status(200).json({ message: "Deleted place." });
};

exports.getListingById = getListingById;
exports.getListingsByUserId = getListingsByUserId;

exports.createListing = createListing;
exports.updateListing = updateListing;
exports.deleteListing = deleteListing;
