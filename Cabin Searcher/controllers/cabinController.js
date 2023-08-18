const Cabin = require('../models/cabin');

module.exports.index = async (req, res) => {
    const cabins = await Cabin.find({});
    res.render('cabins/index', { cabins });
}

module.exports.renderNewForm = async (req, res) => {
    res.render('cabins/new');
}

module.exports.createCabin = async (req, res, next) => {
    const cabin = new Cabin(req.body.cabin);
    cabin.author = req.user._id;
    await cabin.save();
    req.flash("success", "Successfully made a new Cabin");
    res.redirect(`/cabins/${cabin._id}`);
}

module.exports.showCabin = async (req, res) => {
    const cabin = await Cabin.findById(req.params.id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("author");
    if (!cabin) {
        req.flash("error", "Cabin not found");
        return res.redirect("/cabins");
    }
    res.render('cabins/show', { cabin });
}

module.exports.renderEditForm = async (req, res) => {
    const cabin = await Cabin.findById(req.params.id);
    if (!cabin) {
        req.flash("error", "Cabin not found");
        return res.redirect("/cabins");
    }
    res.render('cabins/edit', { cabin });
}

module.exports.editCabin = async (req, res) => {
    const { id } = req.params;
    const cabin = await Cabin.findByIdAndUpdate(id, { ...req.body.cabin });
    req.flash("success", "Successfully updated cabin");
    res.redirect(`/cabins/${cabin._id}`);
}

module.exports.deleteCabin = async (req, res) => {
    const { id } = req.params;
    await Cabin.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted cabin");
    res.redirect(`/cabins`);
}