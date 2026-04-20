// -------------------- game Logic --------------------
// The gameLogic object handles the rules and state of the game.
// It does not interact with the HTML document or CSS styles.

import { NUMBER_OF_DOMINOES } from "./index.js";

// Domino object constructor used in gameLogic object.
class Domino {
    constructor(left, right) {
        this.left = left;
        this.right = right;
        this.isDouble = (left === right);
        this.totalPips = left + right;
    }
}

export class GameLogic {
    constructor() {
        this.dominoes = [];
        this.firstPick = -1;   // index of the first domino picked, -1 if none yet
        this.secondPick = -1;  // index of the second domino picked, -1 if none yet
        this.cleared = 0;      // number of dominos cleared so far
        this.turns = 0;        // number of turns taken so far
    }

    // Fills the dominoes array with a fixed curated set of 15 dominos:
    //   3 doubles (removed instantly) + 6 non-double pairs that each sum to 12.
    fillDominoes() {
        this.dominoes = [];
        this.dominoes.push(new Domino(6, 6));
        this.dominoes.push(new Domino(5, 5));
        this.dominoes.push(new Domino(4, 4));

        const pairs = [
            [6, 0], [0, 6],
            [5, 1], [1, 5],
            [4, 2], [2, 4],
            [3, 3], [3, 3],
            [2, 4], [4, 2], 
            [1, 5], [5, 1]
        ];

        for (const [left, right] of pairs) {
            this.dominoes.push(new Domino(left, right));
        }
    }

    shuffleDominoes() {
        for (let i = 0; i < NUMBER_OF_DOMINOES; i++) {
            let rndIndex = Math.trunc(Math.random() * NUMBER_OF_DOMINOES);
            let temp = this.dominoes[i];
            this.dominoes[i] = this.dominoes[rndIndex];
            this.dominoes[rndIndex] = temp;
        }
    }

    // Records a player's domino pick.
    pickDomino(index) {
        if (this.firstPick === -1) {
            this.firstPick = index;
        } else {
            this.secondPick = index;
        }
    }

    // Resets the picks for the next turn.
    resetPicks() {
        this.firstPick = -1;
        this.secondPick = -1;
    }

    // Returns true when the two picked non-double dominos sum to exactly 12 pips.
    isMatch() {
        let domino1 = this.dominoes[this.firstPick];
        let domino2 = this.dominoes[this.secondPick];
        return domino1.totalPips + domino2.totalPips === 12;
    }
}

// 4-12-2026
// Code Written by Jaxzon Emmons
//ai only used for explaining how some sections of code already written in the file worked/what they did


