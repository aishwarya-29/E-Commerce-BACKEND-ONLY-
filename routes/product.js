// ------------------------------------------------------------------------------------------------------------------
//                                              PRODUCT ROUTES
// ------------------------------------------------------------------------------------------------------------------

var express         =       require("express"),
    router          =       express.Router(),
    passport        =       require("passport"),
    storage         =       require('../storage'),
    methodOverride  =       require("method-override"),
    Product         =       require('../models/product'),
    authenticate    =       require("../authenticate");

router.use(methodOverride("_method"));

router.get("/", function(req, res){
    Product.find({}, function(err, products){
        if(err) {
            return res.status(404).json({
                err: "CANNOT FIND PRODUCTS"
            });
        } else {
            return res.json(products);
        }
    });
});

router.get("/:id", function(req,res){
    Product.findById(req.params.id, function(err, product){
         if (err) {
             return res.status(404).json({
                 err: "CANNOT FIND PRODUCT WITH SPECIFIED ID"
             });
         } else {
             return res.json(product);
         }
    });
});

router.post("/", storage.single('file') ,function(req,res){
    Product.create({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        seller: {
            id: req.seller._id,
            email: req.seller.email
        },
        imageID: req.file._id,
        stock: req.body.stock
    }, function(err, newProduct) {
        if (err) {
            return res.status(404).json({
                err: "CANNOT ADD NEW PRODUCT"
            });
        } else {
            res.redirect("/product");
        }
    });
});

router.put("/:id", authenticate.isLoggedIn, function(req,res){
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            return res.status(404).json({
                err: "Cannot find Product with specified ID"
            });
        } else {
            if(product.seller.id == req.seller._id) {
                Product.findByIdAndUpdate(req.params.id, req.body, function(err, updatedProduct){
                    if (err) {
                        return res.status(404).json({
                            err: "Cannot update Product with specified ID"
                        });
                    } else {
                        res.redirect("/product/"+req.params.id);
                    }
                });
            } else {
                return res.status(404).json({
                    err: "You are not authorised to do this"
                });
            }
        }
    });
});

router.delete("/:id", authenticate.isLoggedIn, function(req,res){
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            return res.status(404).json({
                err: "Cannot find Product with specified ID"
            });
        } else {
            if (product.seller.id == req.seller._id) {
                Product.findByIdAndDelete(req.params.id, req.body, function (err, deletedProduct) {
                    if (err) {
                        return res.status(404).json({
                            err: "Cannot delete Product with specified ID"
                        });
                    } else {
                        res.redirect("/product");
                    }
                });
            } else {
                return res.status(404).json({
                    err: "You are not authorised to do this"
                });
            }
        }
    });
});

module.exports = router;