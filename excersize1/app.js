var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("Hi there, welcome!");
});

app.get("/speak/:animal", function(req, res){
	var animal = req.params.animal;
	var sound = "";
	
	if ( animal === "pig") {
		sound = "oink";
	}
	
	if ( animal === "cat") {
		sound = "meow";
	}
	
	if ( animal === "dog") {
		sound = "woof";
	}
	
	if ( animal === "mouse") {
		sound = "squeek";
	}
	
	res.send("The " + animal + " does " + sound);
});

app.get("/repeat/:message/:times", function(req, res){
	var message = req.params.message;
	var times = Number(req.params.times);
	var result = "";
	
		
	for (var i = 0; i < times; i++) {
  	 	result += message;
	}
		
	res.send(result);
	
});

app.get("*", function(req, res){
	res.send("Sorry...Page under construction!");
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("server started");
});
