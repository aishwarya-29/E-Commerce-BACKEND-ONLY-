var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var sellerSchema = mongoose.Schema({
    email: String,
    password: String
});

sellerSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Seller", sellerSchema);