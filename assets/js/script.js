let startBtn = document.querySelector("#start-quiz");
let questionContainer = document.querySelector(".text-container");

let question = document.createElement("h1");

let optionOne = document.createElement("h2");
optionOne.classList.add("button");
optionOne.setAttribute("data-iscorrect", 0);

let optionTwo = document.createElement("h2");
optionTwo.classList.add("button");
optionTwo.setAttribute("data-iscorrect", 0);

let optionThree = document.createElement("h2");
optionThree.classList.add("button");
optionThree.setAttribute("data-iscorrect", 0);

let optionFour = document.createElement("h2");
optionFour.classList.add("button");
optionFour.setAttribute("data-iscorrect", 0);

let correctAnswers = 0;
let curQuestion = 0;

let resultContainer = document.createElement("div");
questionContainer.appendChild(resultContainer);
let result = document.createElement("h4");

let restartBtn = document.createElement("button");
restartBtn.classList.add("button");
restartBtn.innerHTML="Restart";

let finalResult = document.createElement("h3");


var timer;
var seconds = 0;
let displayTimer = document.createElement("h5");

let q1 = {
    questionText: "What are the four pillars of Object Oriented Programing?",
    answer: 1,
    optionA: "Encapsulation, Inheritance, Abstraction, Polymorphism",
    optionB: "Functions, Encapsulation, Variables, Beans",
    optionC: "Variables, VsCode, Objects, Polymorphism",
    optionD: "Aspects, Inheritance, Singleton, Containers"
}

let q2 = {
    questionText: "The Condition in an if / else statement is enclosed with _____",
    answer: 2,
    optionA: "Quotes",
    optionB: "Curly Brackets",
    optionC: "Parenthesis",
    optionD: "Square Brackets"
}

let q3 = {
    questionText: "A useful tool used during development and debugging for printing content to the debugger is:",
    answer: 4,
    optionA: "Javascript",
    optionB: "Terminal/bash",
    optionC: "For Loops",
    optionD: "console.log"
}

let questionBank = [q1, q2, q3];

var viewScore = function () {
    finalResult.textContent = "You got " + correctAnswers + " out of " + questionBank.length + " questions correct";
    questionContainer.appendChild(finalResult);
}

var resetPage = function () {
    question.remove();
    optionFour.remove();
    optionOne.remove();
    optionTwo.remove();
    optionThree.remove();
    result.remove();
    displayTimer.remove();
    seconds = 0;
    curQuestion=0;
    clearInterval(timer);

    questionContainer.appendChild(restartBtn);

    viewScore();
}
var selectAnswer = function(event) {

    result.classList.add("result-prompt");
    resultContainer.appendChild(result);

    if (event.target.getAttribute("data-iscorrect") == 1 && curQuestion < questionBank.length) {
        result.textContent = "Correct!";
        correctAnswers++;
        event.target.setAttribute("data-iscorrect", 0);
        renderQuestion(questionBank[curQuestion]);

    } else if (curQuestion < questionBank.length) {
        result.textContent = "Incorrect!";
        renderQuestion(questionBank[curQuestion]);

    }
    
    else  {

        if (event.target.getAttribute("data-iscorrect") == 1) {
            correctAnswers++;
        }

        console.log("Reset");
        resetPage();
    }
}

var renderQuestion = function(questionObj) {
    question.textContent = questionObj.questionText;
    questionContainer.appendChild(question);
    let resetOptions = [optionOne, optionTwo, optionThree, optionFour];
    curQuestion++;
    for (let i = 0; i < resetOptions.length; i++) {
        resetOptions[i].setAttribute("data-iscorrect", 0);
    }

    if (questionObj.answer == 1) {
        optionOne.setAttribute("data-iscorrect", 1);
    } else if (questionObj.answer == 2) {
        optionTwo.setAttribute("data-iscorrect", 1);
    } else if (questionObj.answer == 3) {
        optionThree.setAttribute("data-iscorrect", 1);
    } else if (questionObj.answer == 4) {
        optionFour.setAttribute("data-iscorrect", 1);
    }
    
    optionOne.textContent = questionObj.optionA;
    optionTwo.textContent = questionObj.optionB;
    optionThree.textContent = questionObj.optionC;
    optionFour.textContent = questionObj.optionD;

    optionOne.addEventListener("click", selectAnswer);
    optionTwo.addEventListener("click", selectAnswer);
    optionThree.addEventListener("click", selectAnswer);
    optionFour.addEventListener("click", selectAnswer);

    questionContainer.appendChild(optionOne);
    questionContainer.appendChild(optionTwo);
    questionContainer.appendChild(optionThree);
    questionContainer.appendChild(optionFour);
}

var startHandler = function (event) {
    event.preventDefault();

    //Clear the screen
    let title = document.querySelector(".title");
    let subheadings = document.querySelector(".subheadings");

    title.remove();
    subheadings.remove()
    startBtn.remove();

    //render Questions
    questionContainer.appendChild(displayTimer);
    timer = setInterval(function () {
        seconds++;
        displayTimer.textContent = seconds;
    }, 1000);

    renderQuestion(questionBank[curQuestion]);

}

var loadHomePage = function () {
    finalResult.remove();
    restartBtn.remove();

    let title = document.createElement("h1");
    title.innerHTML = "Coding Quiz Challenge";
    title.classList = "title";

    let subheadings = document.createElement("p");
    subheadings.classList = "subheadings";
    subheadings.innerHTML = "Try to answer the following code-related questions within the time limie. <br/> Keep in mind that incorrect answers will penalize your score/time by ten seconds You have 30 seconds to complete this quiz"

    questionContainer.appendChild(title);
    questionContainer.appendChild(subheadings);
    questionContainer.appendChild(startBtn);

}

startBtn.addEventListener("click", startHandler);
restartBtn.addEventListener("click", loadHomePage);