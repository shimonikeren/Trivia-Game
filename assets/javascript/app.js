correct = 0;
incorrect = 0;
unanswered = 1;
var timerInterval;
var number =10;
var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, chD, correct=0;
var questions = [
	//each of the following arrays are formatted as follows: [question, choice1, choice2, ch3, ch4, answer]
	["where is dijon from?", "England", "France", "USA", "Japan", "B"],
	["what is yummiest?", "Chocolate", "Celery", "cucumber", "corn", "A"],
	["Does pizza have cheese?", "no", "never", "nope", "yes", "D"]
];

$('document').ready(function(){


$(".start").on("click", start)
function start (){
	function runTimer() {
  		timerInterval = setInterval(decrement, 1000);
	}	
		function decrement() {
	  	number--;
	  	$("#timer").html("<h2>" + number + "</h2>");

		  	if (number === 0) {
			$("#timeEnd").html("Timer: You ran out of time! Try Again!").css('color', 'red');
			$("#unanswered").text("Unanswered Questions: " + unanswered++);
			clearInterval(timerInterval);
			}
	}
	runTimer();

function reset (){
	clearInterval(timerInterval);
	number = 10;
	start();
}

function renderQuestions(){
	test = $("#test");
	// $("#questionSpot").text("Question" + (pos+1) + "of" + questions.length);
	question = questions[pos][0];
	chA = questions[pos][1];
	chB = questions[pos][2];
	chC = questions[pos][3];
	chD = questions[pos][4];
	answer = questions[pos][5];
	$("#questionSpot").html(question);
	$("#choiceA").html(chA);
	$("#choiceB").html(chB);
	$("#choiceC").html(chC);
	$("#choiceD").html(chD);
}


function checkAnswers(){
	$('.buttonchoice').on('click', function() {
  	var chosen = $(this).attr('value');
	  	if (chosen == questions[pos][5]) {
	  		correct++;
	  		$("#correctAnswers").text("Correct Answers: " + correct);
	  		reset();
	  		//go to next question//renderQuestions(); ?????
	  	}
	  	else if (number === 0) {
			$("#timeEnd").html("Timer: You ran out of time! Try Again!").css('color', 'red');
			$("#unanswered").text("Unanswered Questions: " + unanswered++);
			clearInterval(timerInterval);
			reset();
			}
	  	else{
	  		incorrect++;
	  		console.log("incorrect answers: " + incorrect);
	  		$("#incorrectAnswers").text("Incorrect Answers: " + incorrect);
	  		reset();
			//renderQuestions(); ?????
	  	}

});
}


//need to figutr out how to loop through all questions 
//THEN when all questions have been asked and answered, make the final screen in result box


renderQuestions();
checkAnswers();

}

});