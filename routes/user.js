// ------------------------------------------------------------------------------------------------------------------
//                                              USER ROUTES
// ------------------------------------------------------------------------------------------------------------------

var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    storage = require('../storage'),
    methodOverride = require("method-override"),
    User = require('../models/user'),
    authenticate = require("../authenticate");

router.use(methodOverride("_method"));

router.post("/login", passport.authenticate("user-local", {
    successRedirect: "/",
    failureRedirect: "/user/login"
}), function (req, res) {});

router.post("/signup", function (req, res) {
    var newUser = new User({
        email: req.body.email
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            return res.status(404).json({
                err: "Cannot add new user"
            });
        }
        passport.authenticate("user-local")(req, res, function () {
            alert("Registered!");
            res.redirect("/");
        });
    });
});

router.get("/logout", function (req, res) {
    req.logout();
    alert("success", "Logged out!");
    res.redirect("/");
});

module.exports = router;