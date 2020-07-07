// ------------------------------------------------------------------------------------------------------------------
//                                              CATEGORY ROUTES
// ------------------------------------------------------------------------------------------------------------------

var express         =       require("express"),
    router          =       express.Router(),
    passport        =       require("passport"),
    storage         =       require('../storage'),
    methodOverride  =       require("method-override"),
    Product         =       require('../models/product'),
    authenticate    =       require("../authenticate");

router.use(methodOverride("_method"));

const categories = [];
Product.find({}, function (err, products){
    if(err){
        console.log(err);
    } else {
        if(products) {
            products.forEach(function(product){
                if(product.category in categories) {
                    ;
                } else {
                    categories.push(product.category);
                }
            });
        }
    }
});

router.get("/", function(req,res){
    if(categories) {
        return res.send(categories);
    } else {
        return res.status(404).json({
            err: "Cannot find categories"
        });
    }
});

router.get("/:name", function(req,res){
    Product.find({category: req.params.name}, function(err, products){
        if (err) {
            return res.status(404).json({
                err: "Cannot find Product with specified category"
            });
        } else {
            return res.json(products);
        }
    });
});

module.exports = router;