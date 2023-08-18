const { cabinSchema, reviewSchema } = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");
const Cabin = require('./models/cabin');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in first");
        return res.redirect("/login");
    }
    next();
}

module.exports.validateData = (req, res, next) => {
    const { error } = cabinSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.verifyAuthor = async (req, res, next) => {
    const { id } = req.params;
    const cabin = await Cabin.findById(id);
    if (!cabin) {
        req.flash("error", "Cannot find that cabin");
        return res.redirect(`/cabins`);
    }

    if (!cabin.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that");
        return res.redirect(`/cabins/${id}`);
    }
    next();
}

module.exports.verifyReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that");
        return res.redirect(`/cabins/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}