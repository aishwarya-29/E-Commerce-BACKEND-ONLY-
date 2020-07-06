var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    request = require("request"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    LocalStrategy = require("passport-local");

// -------------------------------------------------- MODELS ----------------------------------------------------
var User = require("./models/user");
// -------------------------------------------------- ROUTES ----------------------------------------------------

// -------------------------------------------------- CONNECTION ------------------------------------------------

var mongoURI = "mongodb+srv://aishu:aishu@cluster0.x7p9v.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(err);
    });
var conn = mongoose.connection;

// ------------------------------------------------- SET ENVIRONMENT ----------------------------------------------
app.set("view engine", "ejs");
var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret: "E commerce Website BACKEND",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




// ------------------------------------------------ PORT ----------------------------------------------------------

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});