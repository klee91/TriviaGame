$(document).ready(function(){

var myInterval;
var timer = 30;
var running = false
var rightOrWrong = false;
var triviaCount = 0;
var wins = 0;
var losses = 0;
var userAnswer = [];
var quiz = $('#quiz');
var buttonAudio = document.createElement('audio');
buttonAudio.setAttribute('src', 'button-24.mp3');

//trivia object\
var trivia = [{
    question: "What is the name of the story Bilbo wrote about his adventures?",
    choices: ["The Hobbit by Bilbo Baggins", "The Silmarillion by Bilbo Baggins", "A Hobbits Tale by Bilbo Baggins", "Into the West by Bilbo Baggins"],
    correctAnswer: "A Hobbits Tale by Bilbo Baggins"
  }, {
    question: "By what name do the Elves call Gandalf?",
    choices: ["The Grey Pilgrim","Incanus","Gandalf the Grey","Mithrandir"],
    correctAnswer: "Mithrandir"
  }, {
    question: "According to the Movies, in which film does Aragorn recieve Anduil?",
    choices: ["The Fellowship of the Ring", "The Two Towers", "The Return of the King", "The Hobbit"],
    correctAnswer: "The Return of the King"
  }, {
    question: "Who becomes king of Rohan after Theoden dies on Pelennor Fields?",
    choices: ["Eowyn", "Eaoden", "Aragorn", "Eomer"],
    correctAnswer: "Eomer"
  }, {
    question: "What is the name of Aragorn's ring, the Ring of_______?",
    choices: ["Barahir", "Narya", "Nenya", "Vilya"],
    correctAnswer: "Barahir"
  }, {
    question: "What is the secret word that opens the Gates of Moria?",
    choices: ["Belok (friend)", "Danwaith (elves)", "Galad (light)", "Mellon (friend)"],
    correctAnswer: "Mellon (friend)"
  }, {
    question: "What was the name of the battering ram used in the seige of Minas Tirith?",
    choices: ["Grond", "Troll Bane", "Mallos", "Guthwine"],
    correctAnswer: "Grond"
  }, {
    question: "Who was the original Dark Lord of Middle-Earth",
    choices: ["Sauron", "Annatar", "Melkor", "Thuringwithal"],
    correctAnswer: "Melkor"
  }, {
    question: "Who was originally cast as Aragorn?",
    choices: ["Eric Bana", "Tom Cruise", "Stuart Townsend", "Johnny Depp"],
    correctAnswer: "Stuart Townsend"
  }, {
    question: "What do the Elves call the Hobbits?",
    choices: ["The Mellon", "The Periannath", "The Onodrim", "The Uruloki"],
    correctAnswer: "The Periannath"
}];

var gifs = ["assets/images/shire.gif",
"assets/images/gandalf.gif",
"assets/images/aragorn.gif",
"assets/images/giphy.gif",
"assets/images/gimli.gif",
"assets/images/sauron.gif",
"assets/images/boromir.gif",
"assets/images/frodo.gif",
"assets/images/aragorn2.gif",
"assets/images/gameover.gif"]

$("#time-left").toggle();

$('#start').on('click' , function () {
	startGame();
	$('#time-left').html("Time Remaining : " + timer);
	$(this).toggle();
});

$("button").mouseenter(function() {
	buttonAudio.play();
});

//on start click, game starts. start button toggles off, game is toggled on
function startGame() {
	displayQuestion(triviaCount);
	displayChoices(triviaCount);
	$("#time-left").toggle();
	myInterval = setInterval(countdown, 6000)
}

//timer of 30 seconds. 
function countdown() {
	$('#time-left').html("Time Remaining : " + timer);
	timer--;
	running = true;

	if (timer < 0) {
		$('#time-left').html("Time's Up!")
		running = false;
		rightOrWrong = false;
		reset();
		displayCorOrInc();
	}

	if (running === false) {
		return false;
	}
}

//displays question
function displayQuestion(index) {

    var qElement = $('<div>');
    qElement.html(trivia[index].question);
    quiz.append(qElement);
    
    return qElement;
}
  
// Creates a list of the answer choices
function displayChoices(index) {
    var choiceList = $('<ul>');
    var answers;
    for (var i = 0; i < trivia[index].choices.length; i++) {
      li = $('<li>');
      answers = $('<button>');
      answers.addClass('button-choice').attr('answer' , trivia[index].choices[i]);
      answers.html(trivia[index].choices[i]);
      li.append(answers);
      choiceList.append(li);
    }
    $('#choiceDiv').append(choiceList);
    $(".button-choice").mouseenter(function() {
	buttonAudio.play();
});
}

function displayGif() {	
	$('#gif').html("<img src=" + gifs[triviaCount] + ">")
}

//transition to next question
function nextQuestion() {
	$('#cor-or-inc').empty();
	$('#gif').empty();

	if (triviaCount == 10) {
		reset();
		
		$('#quiz').html("Correct : " + wins + "<br>" + "Incorrect : " + losses).css({"color": "white", "margin-right": "40px"});
		var restart = $('<button>');
		restart.addClass('newGame').html("Restart").appendTo('#cor-or-inc');
		restart.on('click', function() {
			$('#quiz').empty();
			triviaCount = 0;
			wins = 0;
			losses = 0;
			startGame();
			$(this).remove();
		})
	}

	displayQuestion(triviaCount);
	displayChoices(triviaCount);

	myInterval = setInterval(countdown, 1000)
	$('#time-left').html("Time Remaining : " + timer);
	$("#time-left").toggle();

}

//will keep track of wins/losses and display if user is correct or incorrect before the next question.
function displayCorOrInc() {
	quiz.empty();
	$('#choiceDiv').empty();
	$("#time-left").toggle();
	if (rightOrWrong === true) {
		$('#cor-or-inc').html("You got it!");
		displayGif();
		wins = wins + 1;
		triviaCount++;
		setTimeout(nextQuestion, 1000);
	} else if (rightOrWrong === false) {
		$('#cor-or-inc').html("Wrong, the correct answer is " + trivia[triviaCount].correctAnswer);
		displayGif();
		losses = losses +1;
		triviaCount++;
		setTimeout(nextQuestion, 1000);
	}

}

//check if clicked answer is correct or incorrect
$('body').on('click', '.button-choice', function(e) {
	var clickedOn = $(e.target);
	//push clicked on Div to userAnswer
	var answer = clickedOn.attr('answer')
	userAnswer.push(answer);
	
	if (clickedOn.attr('answer') == trivia[triviaCount].correctAnswer) {
		rightOrWrong = true;
		displayCorOrInc();
		reset();
	} else {
		rightOrWrong = false;
		displayCorOrInc();
		reset();
	}
});

//game reset function
function reset() {
	
	$('#time-left').html(" ");
	timer = 30;
	clearInterval(myInterval);
	
}



//question is appended to question div. timer starts. with every question, the answer choices related to question are appended to the 4 answer choices divs.
//answer choices are on hover effect.

//when choice clicked while timer is running, if correct, append to page 'you are correct' with win counter incremented(display for 5 seconds). 
//if incorrect, append to page 'incorrect', tally on losses counter. *timer will stop after answer selection*

//if timer runs out, it will tally losses and append to user, 'incorrect' and show correct answer. display for 5 seconds.

//at the end of the trivia, it will display a tally of the number of correct choices, and incorrect choices.
//a 'Play Again' button, which will reset and start the game over. *will NOT reload the page, only the game*

})

