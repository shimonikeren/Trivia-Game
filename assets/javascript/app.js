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
	// ["Dijon mustand originated in the city of Dijon, located in what country?", "England", "France", "USA", "Japan", "B"],
	// ["<i>Granny Smith</i> is a popular type of which fruit?", "Pear", "Orange", "Apple", "Grape", "C"],
	// ["What common kitchen item is made up of sodium and chlorine atoms?", "Pepper", "Vinegar", "Olive Oil", "Salt", "D"],
	// ["Roquefort is a French blue cheese made from the milk of what animal?", "Sheep", "Goat", "Pig", "Cow", "A"],
	// ["What is the colloquial term for a rotating tray often often placed on a table to aid in distributing food?", "Tired Susana", "Lazy Susan", "Lazy Jane", "Spinning Sally", "B"],
	// ["Traditionally, the term <i>caviar</i> refers to the salt-cured roe of which fish?", "Sturgeon", "Trout", "Salmon", "Halibut", "A"],
	// ["What is the main ingredient in thousand island dressing?", "Olive Oil", "Vinegar", "Mayonaise", "Relish", "C"],
	["In which country did cheddar cheese originate?", "England", "France", "USA", "Japan", "A"],
	["Sriracha is type of hot sauce named after a city located in what country?", "France", "Canada", "Thailand", "Japan", "C"],
	["Champagne is a sparkling wine made from grapes grown in the Champagne region of which country?", "France", "Canada", "Thailand", "Japan", "A"]
];

// =================Document Ready=================

$('document').ready(function () {


// =================Hidden elements to be rendered when called =================

	$("#wrongImg").hide(); //hidden image to fade in when wrong answer chosen 
	$("#correctImg").hide(); //hidden image to fase in when correct chosen 
	$("#timeImg").hide(); //hidden image to fade in when time runs out  
	$(".hiddenFinalCard").hide();
	
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
  		$("#timeImg").fadeOut(1000);
		$("#unanswered").text("Unanswered Questions: " + unanswered++);
		clearInterval(timerInterval);
		pos++; //renders next question in questions array
		renderQuestions();
		reset();
	}
	
	function reset() { //resets timer
		clearInterval(timerInterval);
		number = 11;
		runTimer();
	}


	var resultCard = $(".resultCard");
	var hiddenFinalCard = $(".hiddenFinalCard");

	function restartGame(){ //restarts game when restart button clicked after game is over
		$("#restart").on("click", function(){
			clearInterval(timerInterval);
			reset(); //resets time 
			$("#timer").fadeIn(500); //bring back timer 
			$(".hiddenFinalCard").replaceWith(resultCard); //bring back original resultCard
			$(".resultCard").fadeIn(1000);
			$("#wrongImg").hide();  //rehide images
			$("#correctImg").hide(); 
			$("#timeImg").hide();
			correct = 0; //reset answers 
			$("#correctAnswers").text("Correct Answers:"); //display blank answers
			incorrect = 0;
			$("#incorrectAnswers").text("Incorrect Answers:");
			unanswered = 0;
			$("#unanswered").text("Unanswered Questions: ");
			renderQuestions(); 
			checkAnswers();
		});
	}


	function renderQuestions() { //function to renderQuestion from questions array 
		if (pos >=questions.length) { //run this line once last question is answered 
			$("#finalResult").html("You got " + correct + " questions correct out of " + questions.length + " questions.");
			$(".resultCard").replaceWith(hiddenFinalCard);
			$(".hiddenFinalCard").fadeIn(1000);
			pos = 0;
			correct = 0;
			clearInterval(timerInterval);//stops timer 
			$("#timer").hide();//hides timer div
			$(".buttonchoice").off("click");//turns off on click events
			restartGame();
			return false; //this exits the function 
		}
		question = questions[pos][0];  //the next few lines are grabbing questions and answers from the questions array
		chA = questions[pos][1];
		chB = questions[pos][2];
		chC = questions[pos][3];
		chD = questions[pos][4];
		answer = questions[pos][5];
		$("#questionSpot").html(question);
		$("#choiceA").html(chA); //assign answer choices to buttons
		$("#choiceB").html(chB);
		$("#choiceC").html(chC);
		$("#choiceD").html(chD);
	}

	function checkAnswers() {
		$('.buttonchoice').on('click', function () {
			var chosen = $(this).attr('value');
			if (chosen == questions[pos][5]){ //compare chosen answer to assigned answer 
				$("#correctImg").fadeIn(500);
  				$("#correctImg").fadeOut(1000);
				correct++;
				$("#correctAnswers").text("Correct Answers: " + correct);
				reset();
			} 
			else if (chosen !== questions[pos][5]){
				$("#wrongImg").fadeIn(500);
  				$("#wrongImg").fadeOut(1000);
				incorrect++;
				$("#incorrectAnswers").text("Incorrect Answers: " + incorrect);
				reset();
			}
			else {}
			pos++; //next question
			renderQuestions();
		});
	}

//=================onclick events=================

	$(".start").on("click", function(){
		runTimer();
		$(".start").hide();
		// functions here to run upon start button click 
		renderQuestions();
		checkAnswers();
	});

}); //document ready ends here

		
