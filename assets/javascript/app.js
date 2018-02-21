//things I still need to consider: 
//stop letting timer go below zero
//rendering questions, increment pos variable ---WHERE TO PUT pos ++ ????
//fade in/out the timer text
//
// =================Declare Global vars and arrays =================
correct = 0;
incorrect = 0;
unanswered = 1;
var timerInterval;
var number = 11;
var pos = 0,
	test, question, choice, choices, chA, chB, chC, chD, correct = 0;
var questions = [
	//multidimensional array: each formatted as follows: [question, chA(choiceA), chB, chC, chD, answer]
	["where is dijon from?", "England", "France", "USA", "Japan", "B"],
	["what is yummiest?", "Chocolate", "Celery", "cucumber", "corn", "A"],
	["Does pizza have cheese?", "no", "never", "nope", "yes", "D"],
	["where is PIZZA from?", "England", "ITALY", "USA", "Japan", "B"]
];

// =================Document Ready=================

$('document').ready(function () {


// =================Hidden elements to be rendered when caleld =================
	$("#timeEnd").hide(); //hidden image to fade in when time runs out 
	$("#restart").hide(); //hidden restart button, to appear when game over
	$("#wrongImg").hide(); //hidden image 
	$("#correctImg").hide(); //hidden image 
	$("#timeImg").hide(); //hidden image 
	$(".hiddenCard").hide();
	
// =================Declare Functions =================

	function runTimer() { //function to run a timer, decrease by 1 second 
		timerInterval = setInterval(decrement, 1000);
	}

	function decrement() { //function for seconds decreasing by 1  
		number--;
		$("#timer").html(number + " Seconds");
		if (number === 0) {
			timesUp();
		}
	}

	function timesUp() { //function checks when time is up, then run this function 
  		$("#timeImg").fadeIn(500);
  		$("#timeImg").fadeOut(2000);
		$("#unanswered").text("Unanswered Questions: " + unanswered++);
		clearInterval(timerInterval);
		pos++; //next question
		renderQuestions();
		reset();
	}
	
	function reset() { //resets timer
		clearInterval(timerInterval);
		number = 11;
		runTimer();
	}

	function renderQuestions() { //function to renderQuestion from questions array 
		if (pos >=questions.length) { //run this line once last question is answered 
			$("#finalResult").html("You got " + correct + " out of " + questions.length);
			$(".resultCard").replaceWith($(".hiddenCard"));
			$(".hiddenCard").fadeIn(100);
			$("#restart").fadeIn(500);
			pos = 0;
			correct = 0;
			return false; //this stops questions from rendering once last question hit
			$("#timer").hide();
		}
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

	function checkAnswers() {
		$('.buttonchoice').on('click', function () {
			var chosen = $(this).attr('value');
			if (chosen == questions[pos][5]){
				$("#correctImg").fadeIn(500);
  				$("#correctImg").fadeOut(2000);
				correct++;
				$("#correctAnswers").text("Correct Answers: " + correct);
				reset();
			} 
			else if (chosen !== questions[pos][5]){
				$("#wrongImg").fadeIn(500);
  				$("#wrongImg").fadeOut(2000);
				incorrect++;
				$("#incorrectAnswers").text("Incorrect Answers: " + incorrect);
				reset();
			}
			else {}
			pos++;
			renderQuestions();
		});
	}

//=================Functions to run when start button clicked=================

	$(".start").on("click", function(){
		runTimer();
		$(".start").hide();
		//call functions here to run upon start button click 
		renderQuestions();
		checkAnswers();
	});
	//call functions here that should run independently 

}); //document ready ends here

