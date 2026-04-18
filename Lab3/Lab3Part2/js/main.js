import Game from './Game.js';

const game = new Game();
game.startNewGame(["Player 1", "Player 2"]);

const status = document.getElementById("status");
const diceDisplay = document.getElementById("dice");
const rollBtn = document.getElementById("rollBtn");
const FinishTurnBtn = document.getElementById("FinishTurnBtn"); // ✅ matches HTML


function updateUI() {
    const player = game.getCurrentPlayer();

    status.textContent =
        `${player.name}'s turn | Rolls left: ${game.rollsLeft}`;

    const diceValues = game.diceSet.dice.map(d => d.value);
    diceDisplay.textContent = "Dice: " + diceValues.join(", ");
}


rollBtn.onclick = () => {
    if (game.isGameOver) return;

    game.rollDice();
    updateUI();

    if (game.isTurnOver()) {
        status.textContent += " | Turn over!";
    }
};

FinishTurnBtn.onclick = () => {
    if (!game.isTurnOver()) {
        alert("You must roll at least three times before finishing your turn");
        return;
    }

    game.endTurn();

    if (game.isGameOver) {
        const winner = game.getWinner();
        status.textContent =
            `Winner: ${winner.name} with score ${winner.score}`;
    } else {
        updateUI();
    }
};

updateUI();


//written by Jaxzon Emmons 
//4-17-2026
//ai only used to explain some concepts from original code