const prequizDiv = document.getElementById("pre-quiz-div");
const startQuizBtn = document.getElementById("start-quiz-btn");
const quizDiv = document.getElementById("quiz-div");
const highScoresMenuBtn = document.getElementById("highscores-btn");
const choicesDiv = document.getElementById("choices-div");


const choiceBtn = [document.getElementById("choiceA-btn"), 
                    document.getElementById("choiceB-btn"),
                    document.getElementById("choiceC-btn"),
                    document.getElementById("choiceD-btn")];


const choiceBtns = document.getElementsByClassName("choice-btns");

const feedbackDivs = document.getElementsByClassName("feedback");
const rightAnswerDiv = document.getElementById("right-answer-div");
const wrongAnswerDiv = document.getElementById("wrong-answer-div");
const rightAnswerText = document.getElementById("right-answer");
const wrongAnswerText = document.getElementById("wrong-answer");

const questionText = document.getElementById("question-h2");
const timerText = document.getElementById("timer-text");

const postquizDiv = document.getElementById("postquiz-div");
const postquizScore = document.getElementById("postquiz-score");
const postquizMaxscore = document.getElementById("postquiz-maxscore");
const postquizInitials = document.getElementById("postquiz-initials");
const postquizBtn = document.getElementById("postquiz-btn");

const highscoreDiv = document.getElementById("highscore-div");
const highscoreList = document.getElementById("highscore-list");
const clearScoresBtn = document.getElementById("clear-scores-btn");
const backToStartBtn = document.getElementById("back-to-start-btn");

let ticker={}; // interval object for quiz timer
let fbTicker={}; // timeout object for feedback messages
let docTicker={}; // timeout object to avoid accidental double-answering

let timer = 0;
let currentScore=0;
let currentQuestion = 0;
const maxScore = questions.length;
let appMode = 0; //appMode: 0=prequiz, 1=quiz, 2=postquiz, 3=highscores

for(let i = 0 ; i < choiceBtn.length ; i++){
    choiceBtn[i].addEventListener("click", function() {
            choiceClick(i);
        }, false);
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    appMode = 1;
    prequizDiv.style.display = "none";
    quizDiv.style.display = "inline-block";
    choicesDiv.style.display = "flex";
    highScoresMenuBtn.hidden = true;

    timer = 15 * questions.length;
    showTimer();
    updateTimer();

    ticker = setInterval(countdown,1000);
    
    displayQuestion();
    highScoresMenuBtn.hidden = true;
}

function nextQuestion() {
    currentQuestion++;
    if(currentQuestion<questions.length){
        displayQuestion();
    } else {
        endQuiz();
    }
}

function showFeedback(correct) {
    hideFeedback();
    if(correct){
        rightAnswerDiv.style.display = "inline-flex";
        rightAnswerText.textContent = `Correct! \nCurrent score: ${currentScore}/${currentQuestion+1}`;
    } else {
        wrongAnswerDiv.style.display = "inline-flex";
        wrongAnswerText.textContent = `Incorrect! \nCurrent score: ${currentScore}/${currentQuestion+1}`
    }
    fbTicker = setTimeout(hideFeedback,500);
}
function hideFeedback() {
    rightAnswerDiv.style.display = "none";
    wrongAnswerDiv.style.display = "none";
}

function displayQuestion() {
    questionText.textContent = `${currentQuestion+1}. ${questions[currentQuestion].prompt}`;
    for(let i = 0 ; i < choiceBtn.length ; i++){
        choiceBtn[i].value = `${String.fromCharCode(65+i)}. ${questions[currentQuestion].choices[i]}`;
    }
}

function choiceClick(response) {
    if(appMode === 1){
        if(timer > 0){
            if(response === questions[currentQuestion].answer){
                currentScore++;
                showFeedback(true);
            } else {
                timer-=15;
                updateTimer();
                showFeedback(false);
            }
        }
    }
    nextQuestion();
}

//-------------------------------- TIMER FUNCTIONS
function countdown() {
    timer--;
    updateTimer();
    if(timer<=0)
        endQuiz();
}
function updateTimer() {
    timerText.textContent = timer;
}
function showTimer() {
    timerText.hidden = false;
}
function hideTimer() {
    timerText.hidden = true;
}

function endQuiz() {
    clearInterval(ticker);
    clearTimeout(fbTicker);
    hideTimer();
    hideFeedback();
    quizDiv.style.display = "none";
    choicesDiv.style.display = "none";
    postquizDiv.hidden = false;
    appMode = 2;
    postquizScore.textContent = currentScore;
    postquizMaxscore.textContent = maxScore;
    
}

function submitScores() {
    const count = Math.floor(window.localStorage.length/3);
    window.localStorage.setItem(`score-${count}`,`${currentScore}`);
    window.localStorage.setItem(`max-score-${count}`,`${maxScore}`);
    window.localStorage.setItem(`initials-${count}`,`${postquizInitials.value}`);
    appMode = 3;
    viewHighscores();
}
function clearScores() {
    window.localStorage.clear();
}
function sortScores() {
    const count = Math.floor(window.localStorage.length/3);
    let scores = [];
    let maxScores = [];
    let initials = []
    for(let a = 0 ; a < count ; a++) {
        scores[a] = window.localStorage.getItem(`score-${a}`);
        maxScores[a] = window.localStorage.getItem(`max-score-${a}`);
        initials[a] = window.localStorage.getItem(`initials-${a}`);
    }
    for(let a = 0 ; a < count-1 ; a++) {
        for(let b = a ; b < count ; b++) {
            if(scores[a]/maxScores[a] < scores[b]/maxScores[b]){
                const tempScore = scores[a];
                const tempMaxScore = maxScores[a];
                const tempInitials = initials[a];
                scores[a] = scores[b];
                maxScores[a] = maxScores[b];
                initials[a] = initials[b];
                scores[b] = tempScore;
                maxScores[b] = tempMaxScore;
                initials[b] = tempInitials;
            }
        }
    }
    clearScores();
    for(let a = 0 ; a < count ; a++) {
        window.localStorage.setItem(`score-${a}`, scores[a]);
        window.localStorage.setItem(`max-score-${a}`, maxScores[a]);
        window.localStorage.setItem(`initials-${a}`, initials[a]);
    }
}

function renderHighscores() {
    const count = Math.floor(window.localStorage.length/3);
    let score = "";
    let maxScore = "";
    let initials = "";
    while(highscoreList.firstChild) {
        highscoreList.removeChild(highscoreList.firstChild);
    }
    for(let a = 0 ; a < count ; a++) {
        let liEl = document.createElement("li");
        highscoreList.appendChild(liEl);
        score = window.localStorage.getItem(`score-${a}`);
        maxScore = window.localStorage.getItem(`max-score-${a}`);
        initials = window.localStorage.getItem(`initials-${a}`);
        liEl.textContent = `${initials} : ${score}/${maxScore}`;
    }
}

function resetVars() {
    timer = 0;
    currentScore = 0;
    currentQuestion = 0;
    appMode = 0;
}

function startOver() {
    highscoreDiv.hidden = true;
    postquizDiv.hidden = true;
    quizDiv.style.display = "none";
    choicesDiv.style.display = "none";
    prequizDiv.style.display ="flex";
    highScoresMenuBtn.hidden = false;
    resetVars();
}

function viewHighscores() {
    sortScores();
    postquizDiv.hidden = true;
    quizDiv.style.display = "none";
    choicesDiv.style.display = "none";
    prequizDiv.style.display = "none";
    highscoreDiv.hidden = false;
    highScoresMenuBtn.hidden = true;
    appMode = 3;
    renderHighscores();
}

function clearScoresClick() {
    clearScores();
    renderHighscores();
}

highScoresMenuBtn.onclick = viewHighscores;

startQuizBtn.onclick = startQuiz;

backToStartBtn.onclick = startOver;

postquizBtn.onclick = submitScores;

clearScoresBtn.onclick = clearScoresClick;