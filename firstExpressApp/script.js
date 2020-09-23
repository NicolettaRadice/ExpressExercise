var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("Hi there!");
});

app.get("/bye", function(req, res){
	res.send("Goodbye!");
});

app.get("/dog", function(req, res){
	console.log("someone made a request");
	res.send("Miao!");
});

app.get("*", function(req, res){
	console.log("someone made a request");
	res.send("ur a star!");
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("server started");
});


