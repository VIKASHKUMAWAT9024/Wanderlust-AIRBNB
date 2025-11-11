const express = require('express');
const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer=require('multer');
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});


const { render } = require('ejs');

// ✅ Async Error Handler
function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

router 
 .route("/")
  .get( wrapAsync(listingController.index))
 .post(
  isLoggedIn,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync (listingController.createListing)
);





//  New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
 .get(wrapAsync(listingController.showListing))
 .put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updatelisting)
)
 .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroylisting));


//  Edit Route
router.get( "/:id/edit",isLoggedIn ,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;
