// ------------------------------------------------------------------------------------------------------------------
//                                              CART ROUTES
// ------------------------------------------------------------------------------------------------------------------

var express         =       require("express"),
    router          =       express.Router(),
    passport        =       require("passport"),
    storage         =       require('../storage'),
    methodOverride  =       require("method-override"),
    Product         =       require('../models/product'),
    User            =       require("../models/user"),
    Cart            =       require("../models/cart"),
    authenticate    =       require("../authenticate");

router.use(methodOverride("_method"));

router.get("/", authenticate.isLoggedIn , function(req,res){
    Cart.findOne({user: req.user._id}, function(err, cart){
        if (err) {
            return res.status(404).json({
                err: "Cannot find cart"
            });
        } else {
            if(cart)
                return res.json(cart);
            else {
                return res.status(404).json({
                            err: "No items in cart"
                });
            }
        }
    });
});

router.post("/", authenticate.isLoggedIn, function(req,res){
    Cart.findOne({user: req.user._id}, function(err, cart){
        if (err) {
            return res.status(404).json({
                err: "Cannot add product to cart"
            });
        } else {
            var newProductID = req.body.productID;
            cart.product.push(newProductID);
            cart.save();
            res.redirect("/cart");
        }
    });
});

router.delete("/", authenticate.isLoggedIn, function(req,res){
    Cart.findOne({
        user: req.user._id
    }, function (err, cart) {
        if (err) {
            return res.status(404).json({
                err: "Cannot delete product from cart"
            });
        } else {
            var ProductID = req.body.productID;
            var index = cart.product.indexOf(ProductID);
            if (index > -1) {
                cart.product.splice(index, 1);
            }
            cart.save();
            res.redirect("/cart");
        }
    });
});

module.exports = router;