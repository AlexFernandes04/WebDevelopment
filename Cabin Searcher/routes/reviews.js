const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateReview, verifyReviewAuthor } = require("../middleware");

const reviewController = require("../controllers/reviewController")

router.post('/', isLoggedIn, validateReview, catchAsync(reviewController.createReview))

router.delete("/:reviewId", isLoggedIn, verifyReviewAuthor, catchAsync(reviewController.deleteReview))

module.exports = router;