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

//Selected elements
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var scoreDiv = document.getElementById("scoreContainer");
var initialsInput = document.getElementById("initialsHere")
var submitButton = document.getElementById("button-addon2")

//  quiz questions
var questions = [
    {
        question: "What does DOM stand for?",
        choiceA: "A) Domain Object Model",
        choiceB: "B) Dominant Object Manipulation",
        choiceC: "C) Don't Order Meatloaf",
        correct: "A"
    }, {
        question: "In JavaScript, what is an 'action' performed on an object called?",
        choiceA: "A) A variable",
        choiceB: "B) A property",
        choiceC: "C) A method",
        correct: "C"
    }, 

    {
        question: "What does the 'i' stand for in a for loop?",
        choiceA: "A) integer",
        choiceB: "B) index",
        choiceC: "C) indicate",
        correct: "B"
    }
];

// create some variables
var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
var questionTime = 10; // 10s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;
var TIMER;
var score = 0;

// render a question
function renderQuestion(){
    var q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    //renderProgress();
    //renderCounter();
    startTimer()
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// counter render
/*function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}*/

// checkAnswer
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
        
    }
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    var scorePerCent = Math.round(100 * score/questions.length);

    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
   submitInitials()
}


submitButton.addEventListener("click",submitInitials)

function submitInitials (){
   console.log (initialsInput.value); 
}
// 5 minute timer 
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            timer = duration;
        }   if (timer == 0)
        alert("Time's Up!");
    }, 1000);
}
window.onload = function () {
    var fiveMinutes = 60 * 5;
       counter.display = "block";
    startTimer(fiveMinutes, display);
};