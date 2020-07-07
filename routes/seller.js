// ------------------------------------------------------------------------------------------------------------------
//                                              SELLER ROUTES
// ------------------------------------------------------------------------------------------------------------------

var express         =       require("express"),
    router          =       express.Router(),
    passport        =       require("passport"),
    storage         =       require('../storage'),
    methodOverride  =       require("method-override"),
    Seller          =       require('../models/seller'),
    authenticate    =       require("../authenticate");

router.use(methodOverride("_method"));

router.post("/login", passport.authenticate("seller-local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function (req, res) {});

router.post("/signup", function (req, res) {
    var newSeller = new Seller({
        email: req.body.email
    });
    Seller.register(newSeller, req.body.password, function (err, seller) {
        if (err) {
            return res.status(404).json({
                err: "Cannot add new seller"
            });
        }
        passport.authenticate("seller-local")(req, res, function () {
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