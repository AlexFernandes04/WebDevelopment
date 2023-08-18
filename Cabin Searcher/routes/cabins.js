const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateData, verifyAuthor } = require("../middleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const cabinController = require("../controllers/cabinController");

router.route("/")
    .get(catchAsync(cabinController.index))
    // .post(isLoggedIn, validateData, catchAsync(cabinController.createCabin))
    .post(upload.array("image"), (req, res) => {
        console.log(req.body, req.files);
        res.send("file(s) sent")
    })


router.get('/new', isLoggedIn, catchAsync(cabinController.renderNewForm));

router.route("/:id")
    .get(catchAsync(cabinController.showCabin))
    .put(isLoggedIn, verifyAuthor, validateData, catchAsync(cabinController.editCabin))
    .delete(isLoggedIn, verifyAuthor, catchAsync(cabinController.deleteCabin))

router.get('/:id/edit', isLoggedIn, verifyAuthor, catchAsync(cabinController.renderEditForm));

module.exports = router;