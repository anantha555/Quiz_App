const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progress_text = document.querySelector('#progress');
const scoreboard = document.querySelector('#scoreboard');
const progressText = document.getElementById("progressText");
const progressBarFull = document.getElementById("progressBarFull");

let question_index = 0;
let score = 0;
let total_score = 0;
let correct_answers = 0;
let wrong_answers = 0;

let quiz_set = [{
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: '<script>',
        userChoice: 0
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: "<script src='xxx.js'>",
        userChoice: 0
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: "alert('Hello World');",
        userChoice: 0
    },
    {
        question: 'Inside which HTML element do we put the CSS??',
        choice1: '<CSS>',
        choice2: '<style>',
        choice3: '<styles>',
        choice4: '<myStyle>',
        answer: '<style>',
        userChoice: 0
    },
    {
        question: " How do you write 'Hello World' in an console?",
        choice1: "console.log('Hello World');",
        choice2: "console('Hello World');",
        choice3: "console='Hello World';",
        choice4: "log('Hello World');",
        answer: "console.log('Hello World');",
        userChoice: 0
    },

];

function startGame() {
    question_index = -1;
    total_score = 0;
    correct_answers = 0;
    wrong_answers = 0;
    localStorage.setItem("mostRecentScore", total_score);
    loadNextQuestion()
}

function loadNextQuestion() {
    question_index++;
    document.body.style.backgroundColor = '#eef2f3';
    document.querySelector('#answer').innerText = "";
    document.querySelector('.play').classList.toggle('hide');

    progressBarFull.style.width = `${((question_index+1) / quiz_set.length) * 100}%`;
    if (question_index > quiz_set.length) {
        calcScore()
    } else {
        question.innerText = quiz_set[question_index].question;
        choices.forEach((choice, index) => {
            choice.innerText = quiz_set[question_index][`choice${index+1}`]
            choice.addEventListener('click', checkAnswer)
            progress_text.innerHTML = `<p>${question_index+1}/${quiz_set.length}</p>`;
        })
    }
}


function checkAnswer(e) {
    if (quiz_set[question_index].answer === e.target.innerText) {
        quiz_set[question_index].userChoice = 'correct'
    } else {
        quiz_set[question_index].userChoice = 'wrong'
    }
    calcScore()
}

function calcScore() {
    total_score = 0;
    correct_answers = 0;
    wrong_answers = 0;
    document.querySelector('.play').classList.toggle('hide');
    for (let i = 0; i < quiz_set.length; i++) {
        if (quiz_set[i].userChoice === 'correct') {
            document.body.style.backgroundColor = '#4caf50';
            document.querySelector('#answer').innerText = "Yay ! That's Right !";
            total_score++;
            correct_answers++;
        } else if (quiz_set[i].userChoice === 'wrong') {
            wrong_answers++;
            document.body.style.backgroundColor = '#f44336';
            document.querySelector('#answer').innerText = "Opps ! That's Worng !";
        }
    }
    scoreboard.innerHTML = `
                    <p>Current Score: <b>${total_score*10}</b> 
                    || Correct: <b>${correct_answers}</b> 
                    || Incorrect: <b>${wrong_answers}</b> 
                    </p>`;
    if (correct_answers + wrong_answers === quiz_set.length) {
        localStorage.setItem("mostRecentScore", total_score);
        setTimeout(() => {
            return window.location.assign('endPage.html');
        }, 500);
    } else {
        setTimeout(() => {
            loadNextQuestion()
        }, 500);
    }
}

startGame();