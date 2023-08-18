const Review = require("../models/review");
const Cabin = require('../models/cabin');

module.exports.createReview = async (req, res) => {
    const cabin = await Cabin.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    cabin.reviews.push(review);
    await review.save();
    await cabin.save();
    req.flash("success", "Successfully published review");
    res.redirect(`/cabins/${cabin._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Cabin.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash("success", "Successfully deleted review");
    res.redirect(`/cabins/${id}`);
}