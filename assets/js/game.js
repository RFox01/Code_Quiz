/* Targetting the id tags*/
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timerText = document.querySelector('#timer');
const TIMER =75;
const PENALTY = 10;

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timeRemaining = 75;


/* Quiz Array - Objects contain the question, the multiple choice option and answer.*/
let questions = [
    {
        question: 'What does CSS stand for?',
        choice1: 'Computer Styling Sheet',
        choice2: 'Color Selection Sheet',
        choice3: 'Cascading Style Sheet',
        choice4: 'Central Sorting Sheet',
        answer: 3,
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<link>',
        choice2: '<script>',
        choice3: '<javascript>',
        choice4: '<scripting>',
        answer: 2,
    },
    {
        question: 'How can you add a comment in HTML?',
        choice1: '//This is the comment',
        choice2: '<!--This is the comment-->',
        choice3: '"This is the comment"',
        choice4: '!This is the comment!',
        answer: 2,
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        choice1: 'The <body> section',
        choice2: 'The <footer> section',
        choice3: 'The <div> section',
        choice4: 'Any of the above',
        answer: 1,
    }
];

const SCORE_COUNT = 100;
const MAX_QUESTIONS = 4;

/* function startGame setting questionCounter and score to 0. Using the availableQuestion to get all the values from the questions then calls for the getNewQuestions and startTimer functions. */
const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
    startTimer();
};

/* When questionshave all been answered it ends the game*/
const getNewQuestions = () => {

    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        
        return window.location.assign('endgame.html');
    }
/* Tracking the answered questions, corresponding it with the remaining questions as a percentage */
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

/* Random order for the questions and keep track of which question is available*/
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

/* This function deducts the penalty value from the timer and renders an updated time*/
const minusTime = () => {
    timeRemaining -= PENALTY;
    renderTime();
}

/* */

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        const correctAnswer = selectedAnswer == currentQuestion.answer;
        let classToApply = correctAnswer ? 'correct' : 'incorrect'

        if(correctAnswer) {
            incrementScore(SCORE_COUNT)
        } else {
            minusTime();
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()

        }, 1000)

    })
})

/**
 * IncrementScore is a function that takes a number as an argument and adds it to the score variable,
 * then updates the scoreText element with the new score.
 */
const incrementScore = num => {
    score += num
    scoreText.innerText = score
    console.log(score)
}

/**
 * The renderTime function is a constant that takes no parameters and returns the innerText of the
 * timerText variable, which is the timeRemaining variable.
 */
const renderTime = () => {
    timerText.innerText = timeRemaining;
}

/* TIMER set to countdown from 75secs. Calls endGame function when it timesout (0).*/
const startTimer = () => {
    timeRemaining = TIMER;
    renderTime()
    setInterval(() => {
        console.log(timeRemaining)
        timeRemaining--
        renderTime()
        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000)
}

startGame()