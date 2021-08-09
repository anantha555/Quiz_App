const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
let topCard = document.querySelector('#top');
let bottomCard = document.querySelector('#bottom');

let bottomCardString = ''

for (let i = 0; i < highScores.length; i++) {

    if (i === 0) {
        topCard.children[1].children[1].innerText = highScores[i].name
        topCard.children[1].children[2].innerText = highScores[i].score * 10 + ' Points'
    }
    if (i === 1) {
        topCard.children[0].children[1].innerText = highScores[i].name
        topCard.children[0].children[2].innerText = highScores[i].score * 10 + ' Points'
    }
    if (i === 2) {
        topCard.children[2].children[1].innerText = highScores[i].name
        topCard.children[2].children[2].innerText = highScores[i].score * 10 + ' Points'
    }
    if (i > 2) {
        bottomCardString += `
        <div class="bottom-card">
            <div class="rank-nbr">${i+1}</div>
            <div class="name">${highScores[i].name}</div>
            <div class="score">${highScores[i].score*10} Points</div>
        </div>
        `;
    }

}

bottomCard.innerHTML = bottomCardString;