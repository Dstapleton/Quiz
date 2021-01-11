

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
highScoreDiv.className = "hdisplay viewscore";
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
gdisplayh2.innerHTML = "Coding Quiz Challenge";
generalDisplay.appendChild(gdisplayh2);

// display text
var pdisplay = document.createElement("p");
pdisplay.id = "intro";
pdisplay.innerHTML = "Try to answer the folling code-related questions within the time limit.Keep in mind that the incorect answer will penalize your score/time by ten seconds";
generalDisplay.appendChild(pdisplay);

// quiz display
var quizDisplay = document.createElement("div");
quizDisplay.className = "quizDisplay";
section1.appendChild(quizDisplay);

// quiz button
var quizButton = document.createElement("button");
quizButton.id = "sbtn";
quizButton.className = "quizBtn";
quizButton.innerText = "Start Quiz";
quizDisplay.appendChild(quizButton);

// --- footer section

// display element
var answerDisplay = document.createElement("div");
answerDisplay.className = "answerdisplay";
footer.appendChild(answerDisplay);

// display text wrong or right using active
var answerTxt = document.createElement("h2");
answerTxt.id = "ansTxt";
answerTxt.innerHTML = " ";
answerDisplay.appendChild(answerTxt);

// questions
var questions = [
    {question:"Commonly used data types DO NOT Include:",
        A:"1.strings",
        B:"2.booleans",
        C:"3.alerts",
        D:"4.numbers",
        answer:"C"},
    {question:"String values must be enclosed within __ when being used:",
        A:"1.commas",
        B:"2.curly brackets",
        C:"3.quotations",
        D:"4.parenthesis",
        answer:"C"},
    {question:"The condition in an if / else stament is enclosed with __.",
        A:"1.quotes",
        B:"2.curly brackets",
        C:"3.parenthesis",
        D:"4.squar brackets",
        answer:"C"},
    {question:"Arrays in JavaScript can be used to store __.",
        A:"1.numbers and strings",
        B:"2.other arrays",
        C:"3.booleans",
        D:"4.all of the above",
        answer:"D"},
    {question:"A very useful tool, used during development, debuging, and for printing content to the debuger is?",
         A:"1.JavaScript",
         B:"2.terminal/bash",
         C:"3.for loop",
         D:"4.consle.log",
         answer:"D"}
];

// score tracker
var score = {name:"John",highScore:120};

//question options
var currentPLayer = "";
var questionKey = ['A','B','C','D'];
var x = "";
var z = 0;
var quizEnd = false;
var playerScore = 0;

// create buttons with question options
var creatButtons = function (index) {
    for (var i = 0; i < questionKey.length; i++) {
        var button = document.createElement("button");
        const questionList = questions[z];
        var index = questionKey[i]
        var char = questionList[index]
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
    else if (!quizEnd){
       endQuiz("Nice!");
    }
}
// quiz timer
var quizTimer = function (time) {
    var min = time * 10;
    var quiz__Time = document.getElementById("quiz__timer");
    quiz__Time.innerText = "Time:" + " " + time;

    // set time to minuts
    var scoreTimer = setInterval(function(){
        if(time === 0){
            endQuiz("Time UP!");
            clearInterval(scoreTimer);
        }
        else if (!quizEnd){
            quiz__Time.innerText = "Time:" + " " + time;
            time--;
        }
        else {;
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
    var quickTime = 3;
    quizAnswer.disabled = "true";
    // get the indicatesd correct answer
     if (quizCheck[z].answer === quizAnswer.value){
        //continue after 3 seconds
        window.z++;
        incrementPoints();

        // paus for 3 secounds
        var correctTimer = setInterval(function(){
            displayRightAnswer(quickTime);
            quickTime--;
            //reset quick time
            if(quickTime === 0){
                clearOptions("btn");
                creatQuestion(z)
                listener(checkAnswer,".btn");
                clearInterval(correctTimer);
                quickTime = 3;
            }
        },300);
    }else{
        displayWorngAnswer(quickTime);
        decrementPoints();
         //deductTime(1);
     }
}

// let the player know the answer was correct
var displayRightAnswer = function(timer) {
    if (timer === 1){
        answerTxt.innerText = " ";
    }
    else{
        answerTxt.innerText = "CORRECT!";
    }
}

// let the player know the answer was wrong
var displayWorngAnswer = function(timer) {
    if (timer === 1){
        answerTxt.innerText = " ";
    }
    else{
        answerTxt.innerText = "WRONG!";
    }
}

// add time to current time
var addTime = function (amount){
    var currentTime = quizTimer.time;
    currentTime += amount;
}

// dedect time from current time
var deductTime = function (amount){
    var deducttime = 2;
    var quiz__Time = document.getElementById("quiz__timer");
    deducttime += amount;
    quiz__Time.innerText = "Time: " + deducttime;
}

// quiz start-up
var startQuiz = function() {
        highScoreDiv.removeEventListener("click", highScore);
    if (localStorage.getItem("name") !== null) {
        score.name = localStorage.getItem("name");
        score.highScore = parseInt(localStorage.getItem("highScore"));
    }

    var check = document.getElementById("sbtn");
    if (check === null){
        document.getElementById("newQuiz").remove();
        document.getElementById("newQuiz").remove();
        document.getElementById("inith3").remove();
       
        window.z = 0;
        window.quizEnd = false;
        window.playerScore = 0;
        scoreHud.innerHTML ="Score:" + " " + playerScore;
        window.currentPLayer = "";
    }
    else{
        //remove intro paragraph
        pdisplay.remove();
        // hide start button
        quizButton.remove();
    }
    // alert the player that the game is about to start
    alert("The Quiz timer will begin");
    
    // generate the first question
    creatQuestion(z);
    quizTimer(120);
    listener(checkAnswer,".btn");
    //loadScore();
}

//submit high score
var submit = function () {
    var initials = document.createElement("h3");
    initials.id = "inith3";
    initials.innerText = "Enter Initials";
    quizDisplay.appendChild(initials);

    var initialsInput = document.createElement("input");
    initialsInput.id = "player";
    quizDisplay.appendChild(initialsInput);

    var initialsBtn = document.createElement("button");
    initialsBtn.id = "initSubmit";
    initialsBtn.innerText = "Submit";
    quizDisplay.appendChild(initialsBtn);
    initialsBtn.addEventListener("click",highScore);
}

var highScore = function () {
    if (document.getElementById("player") !== null) {
        var quiz__Time = document.getElementById("quiz__timer");
        var playerDisplay = document.getElementById("inith3");
        window.currentPLayer = document.getElementById("player").value;
        if (currentPLayer !== ""){
            playerDisplay.innerText = currentPLayer + " - " + playerScore;
            document.getElementById("player").remove();
            document.getElementById("initSubmit").remove();
            document.getElementById("inith3");
            pdisplay.remove();
            console.log("Button was clicked");
            quiz__Time.innerText = "Time";

            gdisplayh2.innerHTML = "High Score";

            var newQizBtn = document.createElement("button");
            newQizBtn.id = "newQuiz";
            newQizBtn.innerText = "Restart";
            newQizBtn.addEventListener("click",startQuiz);
            quizDisplay.appendChild(newQizBtn);
        
            var clearBtn = document.createElement("button");
            clearBtn.id = "newQuiz";
            clearBtn.innerText = "Clear high score";
            clearBtn.addEventListener("click",clearScore);
            quizDisplay.appendChild(clearBtn);

            // set high score
            localStorage.setItem("name", currentPLayer);
            localStorage.setItem("highScore", playerScore);

            // reset view heigh score
            highScoreDiv.addEventListener("click",highScore);
        }else {
            alert("Please enter you initials");
             
        }
       
    }
    else{

        if (localStorage.getItem("name") !== null) {
            score.name = localStorage.getItem("name");
            score.highScore = parseInt(localStorage.getItem("highScore"));
            console.log(score);
        }
        // place h3
        var initials = document.createElement("h3");
        initials.id = "inith3";
        initials.innerText = score.name + " - " + score.highScore;
        quizDisplay.appendChild(initials);

        //
        gdisplayh2.innerHTML = "High Score";

        //remove intro paragraph
        pdisplay.remove();
        // hide start button
        quizButton.remove();

        var newQizBtn = document.createElement("button");
        newQizBtn.id = "newQuiz";
        newQizBtn.innerText = "Restart";
        newQizBtn.addEventListener("click",startQuiz);
        quizDisplay.appendChild(newQizBtn);
    
        var clearBtn = document.createElement("button");
        clearBtn.id = "newQuiz";
        clearBtn.innerText = "Clear high score";
        clearBtn.addEventListener("click",clearScore);
        quizDisplay.appendChild(clearBtn);

        // reset view heigh score
        highScoreDiv.addEventListener("click",highScore);
        
    }
   
    
}
// view high score
var viewHighScore = function () {

}

// clear local storage
var clearScore = function () {
    localStorage.clear();
    var newDisplay = document.getElementById("inith3");
    window.score.name = "David";
    window.score.highScore = 120;
    newDisplay.innerText = score.name + " - " + score.highScore;
}

// end game screen
var endQuiz = function(elemet){
    var timeUP = "All done!";
    var inTime = "Congratulations!";
    var quiz__Time = document.getElementById("quiz__timer");
    // set end quiz status
    window.quizEnd = true;
    if(elemet=== "Nice!"){
        quiz__Time.innerText = elemet;
        gdisplayh2.innerHTML = inTime;
    }
    else if (elemet === "Time UP!"){
        quiz__Time.innerText = elemet;
        gdisplayh2.innerHTML = timeUP;
        clearOptions("btn");
   }
    pdisplay.innerHTML = "Your score is " + playerScore;
    generalDisplay.appendChild(pdisplay);
    submit();
}

function incrementPoints(){
    window.playerScore += 25;
    var scoreHud = document.getElementById("scoreHud")
    scoreHud.innerHTML ="Score:" + " " + playerScore;
}

function decrementPoints(){
    if (window.playerScore === 0) {

        window.playerScore = 0;
    }
    else{
        window.playerScore -= 5;
        var scoreHud = document.getElementById("scoreHud")
        scoreHud.innerHTML ="Score:" + " " + playerScore;
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
highScoreDiv.addEventListener("click",highScore);
quizButton.addEventListener("click", startQuiz);