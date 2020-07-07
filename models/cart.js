var mongoose = require("mongoose");

var cartSchema = mongoose.Schema({
    product:[{
        id: {
            type: mongoose.Schema.Types.ObjectID,
            ref: "Product"
        }
    }],
    user: {
            type: mongoose.Schema.Types.ObjectID,
            ref: "User"
        }
});

module.exports = mongoose.model("Cart", cartSchema);