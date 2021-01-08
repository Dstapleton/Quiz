// TODO: Create an array with five question objects
    var questions = [
        {question:"Commonly used data Do Not Include",
         A:"1.strings",
         B:"2.booleans",
         C:"3.alerts",
         D:"4.numbers",
         answer:"C"},
        {question:"bow", A:"one", B:"Mew", C:"care", D:"four", answer:"D"},
        {question:"poow", A:"one", B:"two", C:"happy", D:"four", answer:"B"},
        {question:"soow", A:"one", B:"Hope", C:"three", D:"More", answer:"A"}
    ];

// TODO: Create a variable to keep track of the score
    var score = [
        {first:"name",highScore:"score"},
        {second:"name", highScore:"score"},
        {third:"name", highScore:"score"}
    ];
    
    //personal variables
    var body = document.body;

   var increment = "";
    var decrement= "";
     var count = 0;

    var decrementScore = function (){
        var quizBoard = document.getElementById("quizScore");
            count -= 25;
            quizBoard.textContent = count;
        }
    var incrementScore = function (){
        var quizBoard = document.getElementById("quizScore");
            count += 25;
            quizBoard.textContent = count;
    }
    var createButtons = (id) => {
        var buttonVal = ['A','B','C','D'];
        var questionEl =questions.question;
        questionEl = Object.value(questionEl)
        for (var i = 0; i < buttonVal.length; i++){
            var button = document.createElement("button");
            button.style.width = "100px";
            button.style.height = "100px";
            button.innerText = i;
            button.id = id;
            button.value = buttonVal[i];
            button.className = "btn";
            body.appendChild(button);
            console.log(questionEl);
        }
    }
    
    

// TODO: Iterate over the questions array and display each question in a confirmation box
    for (var i = 0; i <= questions.length -1; i ++){
        var conformationBox = document.createElement("div");
        conformationBox.id = i;
        conformationBox.textContent = questions[i].question;
        console.log(conformationBox.textContent);
        body.appendChild(conformationBox);
        createButtons(i);
    } 
    //score board
    var scoreBoard = document.createElement("div");
    scoreBoard.id = "quizScore"
    scoreBoard.textContent = "0";
    body.appendChild(scoreBoard)
    
   


// TODO: Check the user's answer against the correct answer
    
    //if the button clicked mactches the correct answer
    //then its correct otherwise its wrong
   var checkAnswer = function(event){
        var tarGet = event.target;
        var questionNumb = tarGet.id;
        tarGet.disabled = "true";
        if(tarGet.value === questions[questionNumb].answer){
           
            correctAnswer();
           incrementScore()
        }
        else{
            wrongAnswer();
           decrementScore();
        }
   }

// TODO: Alert the user if they are correct or wrong. Increment the score accordingly
   var wrongAnswer = function (){
        console.log("Answer was incorrect");
   };

   var correctAnswer = function () {
       console.log("correct answer");
   }
// TODO: At the end of the game, alert the user with the final score
var options = document.querySelectorAll('.btn');
for(var i = 0; i < options.length; i++){
    options[i].addEventListener("click", checkAnswer);
}