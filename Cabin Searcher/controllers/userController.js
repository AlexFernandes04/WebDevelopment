const User = require("../models/user");

module.exports.renderRegisterForm = (req, res) => {
    res.render("users/register");
}

module.exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const addedUser = await User.register(newUser, password);
        req.login(addedUser, err => {
            if (err) return next(err);
            req.flash("success", `Welcome ${newUser.username} to Cabin Searcher!`);
            const toRedirect = req.session.returnTo || "/cabins";
            delete req.session.returnTo;
            res.redirect(toRedirect);
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("register");
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
}

module.exports.loginRedirect = (req, res) => {
    req.flash("success", "Welcome back!");
    const toRedirect = req.session.returnTo || "/cabins";
    delete req.session.returnTo;
    res.redirect(toRedirect);
}

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', "Logged out");
        res.redirect('/cabins');
    });
}