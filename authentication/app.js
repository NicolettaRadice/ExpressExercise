var express					=	require("express"),
	mongoose				=	require("mongoose"),
	passport				=	require("passport"),
	bodyParser				=	require("body-parser"),
	User					=	require("./models/user"),
	LocalStrategy 			=	require("passport-local"),
	passportLocalMongoose	=	require("passport-local-mongoose");
	

mongoose.connect("mongodb://localhost/auth_demo", { useNewUrlParser: true });

var app = express();	
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded ({extended : true}));

app.use(require("express-session")({
	secret: "its a secret",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//////************ROUTES************///////

app.get("/" , (req, res) => {
	res.render("home");
});

app.get("/secret", isLoggedIn, (req, res) => {
	res.render("secret");
});

//////************AUTH ROUTES************///////

//register

app.get("/register", (req, res) =>{
	res.render("register");
});

app.post("/register", (req, res) =>{
	User.register(new User({username: req.body.username}), req.body.password,(err,user) => {
		if(err){
			console.log(err);
			return res.render("register");
		} else {
			passport.authenticate("local")(req, res,() => {
				res.render("secret");
			});
		}
	});
});

//log in

app.get("/login", (req, res) =>{
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) =>{
});

//log out
app.get("/logout", (req, res) =>{
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}  
		res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, () => {
	console.log("************** SERVER STARTED **************");
});