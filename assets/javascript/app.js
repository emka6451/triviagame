$(document).ready(function () {
var options = [
	{
		question: "Pupusas, handmade thick stuffed corn tortillas, are a traditional dish from what country?", 
		choice: ["Ethiopia", "El Salvadore", "Peru", "Guatamala"],
		answer: 1,
	 },
	 {
	 	question: "What popular soda beverage was originally developed as a mixer for whiskey?", 
		choice: ["Mountain Dew", "Sprite", "7-UP", "Coke"],
		answer: 0,
	 }, 
	 {
	 	question: "Kopi luwak is a very expensive type of what?", 
		choice: ["Spice", "Caviar", "Coffee", "Rice variety" ],
		answer: 2,
	}, 
	{
		question: "Which is not an ingredient in a Harvey Wallbanger cocktail?", 
		choice: ["Orange Juice", "Vodka", "Sour Mix", "Galliano" ],
		answer: 2,
	}, 
	{
		question: "How many items are there in a Bakers' Dozen?", 
		choice: ["12", "6", "24", "13" ],
		answer: 3,
	}, 
	{
		question: "What is the most widely eaten fish in the world?", 
		choice: ["Tilapia", "Herring", "Sardine", "Tuna" ],
		answer: 1,
	}, 
	{
		question: "Which fruit does not ripen once it has been picked?", 
		choice: ["Banana", "Lemon", "Mango", "Apple" ],
		answer: 1,
	}, 
	{
		question: "Which fruit contains the most protein per 100 calories?", 
		choice: ["Guava", "Avocado", "Banana", "Blackberries" ],
		answer: 0,
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
function decrement() {
	$("#timeleft").html("<h3>Time: " + timer + "</h3>");
	timer --;

	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! correct answer: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

function stop() {
	running = false;
	clearInterval(intervalId);
}
function displayQuestion() {
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);

		}



$(".answerchoice").on("click", function () {
	userGuess = parseInt($(this).attr("data-guessvalue"));

	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! correct answer: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over! </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})