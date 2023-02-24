'use strict';

const dice = document.querySelector(`.dice`);

const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const btnNew = document.querySelector(`.btn--new`);

let currentScore, activePlayer, playing;

const resetEverything = function() {

    currentScore = 0;
    activePlayer = 0;
    playing = true;

    document.querySelector(`#score--0`).textContent = 0;
    document.querySelector(`#score--1`).textContent = 0;

    dice.classList.add(`hidden`);

    document.querySelector(`.player--0`).classList.remove(`player--winner`);
    document.querySelector(`.player--1`).classList.remove(`player--winner`);
    document.querySelector(`.player--0`).classList.add(`player--active`);
    document.querySelector(`.player--1`).classList.remove(`player--active`);
}


const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--0`).classList.toggle(`player--active`);
    document.querySelector(`.player--1`).classList.toggle(`player--active`);

};



resetEverything();

btnRoll.addEventListener(`click`, function() {
    if (playing) {
        const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
        dice.classList.remove(`hidden`);
        dice.src = (`dice-${randomDiceNumber}.png`);

        if (randomDiceNumber > 1) {
            currentScore += randomDiceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {

            switchPlayer();
            console.log(activePlayer);
        }
    }
});

btnHold.addEventListener(`click`, function() {
    if (playing) {
        console.log(activePlayer);
        document.querySelector(`#score--${activePlayer}`).textContent = Number(document.querySelector(`#score--${activePlayer}`).textContent) + currentScore;
        document.querySelector(`#current--${activePlayer}`).textContent = 0;
        currentScore = 0;


        if (document.querySelector(`#score--${activePlayer}`).textContent >= 100) {
            playing = false;
            dice.classList.add(`hidden`);
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
            document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
        } else {
            switchPlayer();
        }
    }


    btnNew.addEventListener(`click`, function() {
        resetEverything();
    })
});
