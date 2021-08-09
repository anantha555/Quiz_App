const finalScore = document.querySelector('#finalScore');
const finalStatus = document.querySelector('#finalStatus');
const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');

const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 10;

let finalStatusString = '';

finalStatusString = mostRecentScore !== 0 ? 'This is Amazing !!!' : 'Better luck next time !';
finalStatus.innerText = finalStatusString
finalScore.innerHTML = `${mostRecentScore*10}  `;

username.addEventListener('keyup', () => {
    let btnEnable = username.value.length < 3;
    saveScoreBtn.disabled = btnEnable;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('./rankingPage.html');
};