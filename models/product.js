var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    seller: {
        id: {
            type: mongoose.Schema.Types.ObjectID,
            ref: "Seller"
        },

        email: String
    },
    imageID: String,
    stock: Number
});

module.exports = mongoose.model("Product", productSchema);