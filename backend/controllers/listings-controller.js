const { validationResult } = require("express-validator");

const fs = require("fs");
const Listings = require("../models/listing");
const { default: mongoose } = require("mongoose");

const getListing = async (req, res, next) => {};
const getUserListings = async (req, res, next) => {};

const createListing = async (req, res, next) => {};
const updateListing = async (req, res, next) => {};
const deleteListing = async (req, res, next) => {};

exports.getListing = getListing;
exports.getUserListings = getUserListings;

exports.createListing = createListing;
exports.updateListing = updateListing;
exports.deleteListing = deleteListing;
