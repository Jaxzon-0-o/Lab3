import DiceSet from './DiceSet.js';
import Player from './Player.js';

export default class Game {
    constructor() {
        this.players = [];
        this.currentPlayerIndex = 0;
        this.diceSet = new DiceSet();
        this.rollsLeft = 3;
        this.isGameOver = false;
    }

    startNewGame(playerNames) {
        this.players = playerNames.map(name => new Player(name));
        this.currentPlayerIndex = 0;
        this.rollsLeft = 3;
        this.isGameOver = false;
        this.diceSet.reset();
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    rollDice() {
        if (this.rollsLeft <= 0) return;

        this.diceSet.rollAll();
        this.diceSet.holdHighest(); // required rule

        this.rollsLeft--;
    }

    isTurnOver() {
        return this.rollsLeft === 0 || this.diceSet.allHeld();
    }

    endTurn() {
        const player = this.getCurrentPlayer();
        player.setScore(this.diceSet.getScore());

        this.currentPlayerIndex++;

        if (this.currentPlayerIndex >= this.players.length) {
            this.isGameOver = true;
        } else {
            this.rollsLeft = 3;
            this.diceSet.reset();
        }
    }

    getWinner() {
        let winner = this.players[0];

        for (const player of this.players) {
            if (player.score > winner.score) {
                winner = player;
            }
        }

        const winSound = new Audio('YouWin.mp3');
        winSound.play();

        return winner;
    }
}


//written by Jaxzon Emmons 
//4-20-2026
//ai only used to explain some concepts from original code