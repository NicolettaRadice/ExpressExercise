var express 	= 	require ("express"),
	app			=	express(),
	flash		=	require("connect-flash"),
	bodyParser	=	require ("body-parser"),
	mongoose 	=	require("mongoose"),
	Campground 	=	require("./models/campground"),
	seedDB		=	require("./seeds"),
	Comment		=	require("./models/comment"),
	passport	=	require("passport"),
	User		=	require("./models/user"),
	LocalStrategy	=	require("passport-local"),
	methodOverride 	=   require("method-override");

//requiring routes
var commentRoutes		= require("./routes/comments"),
	campgroundsRoutes 	= require("./routes/campgrounds"),
	indexRoutes			= require("./routes/index");



mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//seedDB();

app.use(flash());

//PASSPORT CONFIG

app.use(require("express-session")({
	secret: "Google is cute",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundsRoutes);




app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Server started.");
});