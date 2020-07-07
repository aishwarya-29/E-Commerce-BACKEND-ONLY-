var express             =           require("express"),
    app                 =           express(),
    bodyParser          =           require("body-parser"),
    request             =           require("request"),
    mongoose            =           require("mongoose"),
    methodOverride      =           require("method-override"),
    passport            =           require("passport"),
    LocalStrategy       =           require("passport-local"),
    config              =           require('./config'),
    storage             =           require('./storage');

// -------------------------------------------------- MODELS ----------------------------------------------------
var User                =           require("./models/user"),
    Seller              =           require("./models/seller"),
    Product             =           require("./models/product"),
    Cart                =           require("./models/cart");


// -------------------------------------------------- ROUTES ----------------------------------------------------
var indexRoutes         =           require("./routes/index"),
    userRoutes          =           require("./routes/user"),
    sellerRoutes        =           require("./routes/seller"),
    productRoutes       =           require("./routes/product"),
    categoryRoutes      =           require("./routes/category"),
    cartRoutes          =           require("./routes/cart");

app.use(indexRoutes);
app.use("/user", userRoutes);
app.use("/seller", sellerRoutes);
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/cart", cartRoutes);

// -------------------------------------------------- CONNECTION ------------------------------------------------

var mongoURI = config.mongoURI;
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
    secret: config.secretKey,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use('user-local', new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use('seller-local', new LocalStrategy(Seller.authenticate()));
passport.serializeUser(Seller.serializeUser());
passport.deserializeUser(Seller.deserializeUser());



// ------------------------------------------------ PORT ----------------------------------------------------------

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});

module.exports = app;