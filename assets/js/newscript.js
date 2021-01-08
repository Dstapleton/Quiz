

// html document layout
var body = document.body;


// --- Quiz Layout ---//

// header element
var header = document.createElement("header");
body.appendChild(header);

// quis container
var mainContent = document.createElement("main");
body.appendChild(mainContent);

// footer element
var footer = document.createElement("footer");
body.appendChild(footer);

// --- Header Elements ---

//contain high score element
var highScoreDiv = document.createElement("div");
highScoreDiv.className = "hdisplay";
header.appendChild(highScoreDiv);

//timer div
var timerDiv = document.createElement("div");
timerDiv.className = "hdisplay";
header.appendChild(timerDiv);

// current score div
var scoreDiv = document.createElement("div");
scoreDiv.className = "hdisplay";
header.appendChild(scoreDiv);

// high score text
var highScoreH1 = document.createElement("h1");
highScoreH1.innerHTML = "View high score";
highScoreDiv.appendChild(highScoreH1);

//timer text
var timerTxt = document.createElement("h1");
timerTxt.id = "quiz__timer";
timerTxt.innerHTML = "Time:" + " " + 0;
timerDiv.appendChild(timerTxt);

// current score
var playerScore = 0;
var currentScore = document.createElement("h1");
currentScore.id = "scoreHud";
currentScore.innerHTML = "Score:" + " " + 0;
scoreDiv.appendChild(currentScore);

// --- main content ---

// first section
var section1 = document.createElement("section");
section1.className = "section";
mainContent.appendChild(section1);

// display element
var generalDisplay = document.createElement("div");
generalDisplay.className = "gdisplay";
section1.appendChild(generalDisplay);

// display text
var gdisplayh2 = document.createElement("h2");
gdisplayh2.innerHTML = "Welcome";
generalDisplay.appendChild(gdisplayh2);

// quiz display
var quizDisplay = document.createElement("div");
quizDisplay.className = "qiuzDisplay";
quizDisplay.style.width = "60vw";
quizDisplay.style.height = "20vw";
section1.appendChild(quizDisplay);

// quiz button
var quizButton = document.createElement("button");
quizButton.className = "qiuzBtn";
quizButton.innerText = "Start Quiz";
quizDisplay.appendChild(quizButton);



// questions
var questions = [
    {question:"Commonly used data Do Not Include",
     A:"1.strings",
     B:"2.booleans",
     C:"3.alerts",
     D:"4.numbers",
     answer:"C"},
    {question:"Question 2", A:"one", B:"Mew", C:"care", D:"four", answer:"D"},
    {question:"Question 3", A:"one", B:"two", C:"happy", D:"four", answer:"B"},
    {question:"Question 4", A:"one", B:"Hope", C:"three", D:"More", answer:"A"},
    {question:"Question 5", A:"one", B:"Hope", C:"three", D:"More", answer:"A"}
];

// score tracker
var score = [
    {first:"name",highScore:"score"},
    {second:"name", highScore:"score"},
    {third:"name", highScore:"score"}
];

//question options
var questionKey = ['A','B','C','D'];
var x = "";
var z = 0;
var quizEnd = false;

// create buttons with question options
var creatButtons = function (index) {
    for (var i = 0; i < questionKey.length; i++) {
        var button = document.createElement("button");
        const questionList = questions[z];
        var index = questionKey[i]
        var char = questionList[index]
        button.style.width = "100px";
        button.style.height = "100px";
        button.innerText = char;
        button.id = z;
        button.value = questionKey[i];
        button.className = "btn";
        quizDisplay.appendChild(button);
    }
    
}

// create quiz questions
var creatQuestion = function (index) {
    // if the index value not equal the number of questions prociede
    //else end quiz
    if(index !== questions.length){
        var questionIndex = questions[index].question;
        gdisplayh2.innerHTML = questionIndex;
        creatButtons(index);
    }
    else{
       endQuiz("Nice!");
    }
    
}
// quiz timer
var quizTimer = function (time, count) {
    var min = time * 10;
    var quiz__Time = document.getElementById("quiz__timer");
    quiz__Time.innerText = "Time:" + " " + time;
    // set time to minuts
   
    var scoreTimer = setInterval(function(){
        if(time === 0){
            endQuiz("Time UP");
            clearInterval(scoreTimer);
        }
        else if (!count){
            quiz__Time.innerText = "Time:" + " " + time;
            time--;
        }
        else {
            clearInterval(scoreTimer);
        }
        
    },min);
}

// set button listener
 var listener = function (event, e){
    var quizOptions = document.querySelectorAll(e);
    for(var i = 0; i < quizOptions.length; i++){
        quizOptions[i].addEventListener("click", event);
    }
 }


 // remove buttons
 var clearOptions= function (e){
    var elements = document.getElementsByClassName(e);
    var indext = elements.length;
    while (elements[indext-1] !== undefined) {
         indext--;
        elements[indext].remove();
    }
 }

// get player input
var checkAnswer = function (event) {
    var quizAnswer = event.target;
    var quizCheck = questions;
    quizAnswer.disabled = "true";
    // get the indicatesd correct answer
     if (quizCheck[z].answer === quizAnswer.value){
        window.z++;
        clearOptions("btn");
        creatQuestion(z)
        listener(checkAnswer,".btn");
        incrementPoints();
     }
     else{
         decrementPoints();
     }
}


var startQuiz = function() {
    // hide start button
    quizButton.style.visibility = "hidden";

    // alert the player that the game is about to start
    alert("The Quiz timer will begin");
    
    // generate the first question
    creatQuestion(z);
    quizTimer(60,endQuiz);
    listener(checkAnswer,".btn");
}

var endQuiz = function(elemet){
    var quiz__Time = document.getElementById("quiz__timer");
    window.endQuiz = true;
    quiz__Time.innerText = "Time:" + " " + elemet;
}

function incrementPoints(){
    window.playerScore += 25;
    var scoreHud = document.getElementById("scoreHud")
    scoreHud.innerHTML ="Score:" + playerScore;
}

function decrementPoints(){
    if (window.playerScore === 0) {

        window.playerScore = 0;
    }
    else{
        window.playerScore -= 5;
        var scoreHud = document.getElementById("scoreHud")
        scoreHud.innerHTML ="Score:" + playerScore;
    }
   
}

//for (const property in questionList){
   // console.log(`${property}: ${questionList[property]}`);
//}
//for (const key in questionList) {
   // if (Object.hasOwnProperty.call(questionList, key)) {
        //const element = questionList[key];
       // console.log(element.slice());
   // }
    
//}
//console.log( questionList);

quizButton.addEventListener("click", startQuiz);

// get buttons to check answer

