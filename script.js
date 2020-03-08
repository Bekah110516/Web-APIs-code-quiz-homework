/*
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
*/

//VARIABLES//
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var scoreDiv = document.getElementById("scoreContainer");
var initials = document.getElementById("initialsField")
var submitButton = document.getElementById("submitButton")
var scoreBoard = document.getElementById("scoreBoard")
var scoreItem = document.getElementsByClassName("scoreItem")
//  quiz questions
var questions = [
    {
        question: "1. What does DOM stand for?",
        choiceA: "A) Domain Object Model",
        choiceB: "B) Dominant Object Manipulation",
        choiceC: "C) Don't Order Meatloaf",
        correct: "A"
    }, {
        question: "2. In JavaScript, what is an 'action' performed on an object called?",
        choiceA: "A) A variable",
        choiceB: "B) A property",
        choiceC: "C) A method",
        correct: "C"
    },

    {
        question: "3. What does the 'i' stand for in a for loop?",
        choiceA: "A) integer",
        choiceB: "B) index",
        choiceC: "C) indicate",
        correct: "B"
    },

    {
        question: "4. How do you separate objects in an arrray?",
        choiceA: "A) with a colon.... : ",
        choiceB: "B) with a period.... . ",
        choiceC: "C) with a comma... , ",
        correct: "C"
    },
    {
        question: "5. What are variables used for in JavaScript Programs?",
        choiceA: "A) storing numbers, dates, or other values",
        choiceB: "B) Varying randomly",
        choiceC: "C) Causing high-school algebra flashbacks",
        correct: "A",
    }
];

//more variables 
var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 60; //60s
var questionTime = 60; // 60s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;
var TIMER;
var score = 0

//FUNCTIONS//
// renders quiz questions
function renderQuestion() {
    var q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// starts quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    //renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// renders 60 second countdown for duration of quiz 
function renderCounter() {
    if (count >= 0) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count--;
    }

    else {
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        }

        else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checks if answer is correct
function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // if answer is correct
        score++;
    }
    //count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();

    }
}
// renders quiz score
function scoreRender() {
    scoreDiv.style.display = "block";
    scoreBoard.style.display = "block";
    // calculates the user's score as a percentage
    var scorePerCent = Math.round(100 * score / questions.length);

    scoreDiv.innerHTML += "<p> You scored " + scorePerCent + "%! </p>";

}

//****NEEDS TO LOG USER'S INITIALS ON CLICK OF SUBMIT BUTTON BUT NOT FUNCTIONING CORRECTLY****

function submitInitials() {
    var initials = document.getElementById('initialsField').value;
    console.log(initials);
};
var area = document.querySelector('#scoreContainer');
area.addEventListener('click', function (event) {
    if (event.target.id === "submitButton") {
        console.log(event.target);
        submitInitials();
    }
});


 //****WOULD THEN NEED A FUNCTION THAT APPENDS SCORE AND INITIALS TO THE SCOREBOARD li's*/