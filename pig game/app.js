/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //Random 
        var dice = Math.floor(Math.random() * 6) + 1;
        //display result
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';
        //update round score if not 1
        if (dice !== 1) {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player
            nextPlayer();
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //add current score to player's global score
        scores[activePlayer] += roundScore;


        //update ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    //global score set to 0 since 1 appears
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //panel of active player changed to the other
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //dice removed from the interface
    document.querySelector('.dice').style.display = "none";

}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player-1';
    document.getElementById('name-1').textContent = 'Player-2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
// document.querySelector('.dice').style.display = 'none';