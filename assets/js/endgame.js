const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGHSCORES = 10

finalScore.innerText = mostRecentScore

/* saveScoreBtn disabled until it recieves an upkey event. */
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

/* Prevent the default action of the event */
saveHighScore = e => {
    e.preventDefault()

/* Creating an object to include score and name elements. */
    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

/* Sorting the high scores results in ascending order. */
    highScores.sort((a,b) => {
        return a.score - b.score
    })
    
/*Removes end array element. */
    highScores.splice(10)

/*Convert a JavaScript object into a string. */
    localStorage.setItem('highScores',  JSON.stringify(highScores))
    window.location.assign('endgame.html')
}

