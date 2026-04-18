/*  Overview
    Double Trouble is a domino-clearing game with 15 dominos.
    Players can click one "Double" domino (both halves equal, e.g. [4|4]) to
    remove it instantly, OR click two standard dominos whose total pip count
    adds up to 12. Non-matching pairs are shown for 2 seconds then flipped back.
    The game ends when all 15 dominos are cleared from the board.
*/

import { GameLogic } from "./gamelogic.js";
import { UI } from "./ui.js";

// -------------------- Constants --------------------
export const NUMBER_OF_DOMINOES = 15;

// -------------------- Main Flow --------------------

const gameLogic = new GameLogic();
const ui = new UI();

// Initializes the page after it's loaded.
function init() {
    ui.cacheDominoElements();
    gameLogic.fillDominoes();
    gameLogic.shuffleDominoes();
    ui.updateScore(gameLogic.cleared, gameLogic.turns, 0);
    ui.enableAllDominoes(handleClick);
    ui.showAllBacks();
}

// This function is called when the user clicks on a domino.
// It coordinates between the ui showing the domino and game logic tracking the pick.
function handleClick() {
    const CHECK_DELAY_MS = 3000;
    let index = Number(this.id);
    const isFirstPick = gameLogic.firstPick === -1;

    gameLogic.pickDomino(index);

    if (gameLogic.dominoes[index].isDouble && isFirstPick) {
        ui.showDominoFace(index, gameLogic.dominoes[index]);
        ui.disableAllDominoes();
        ui.updateScore(gameLogic.cleared, gameLogic.turns, gameLogic.dominoes[index].totalPips);

        setTimeout(() => {
            gameLogic.turns++;
            gameLogic.cleared++;
            ui.removeDomino(index);
            ui.updateScore(gameLogic.cleared, gameLogic.turns, 0);
            gameLogic.resetPicks();

            if (gameLogic.cleared === NUMBER_OF_DOMINOES) {
                ui.showWin(gameLogic.turns);
            } else {
                ui.enableAllDominoes(handleClick, true);
            }
        }, CHECK_DELAY_MS);
    } else {
        ui.showDominoFace(index, gameLogic.dominoes[index]);
        ui.disableDomino(index);

        let sum = gameLogic.dominoes[gameLogic.firstPick].totalPips;
        if (gameLogic.secondPick !== -1) {
            sum += gameLogic.dominoes[gameLogic.secondPick].totalPips;
        }
        ui.updateScore(gameLogic.cleared, gameLogic.turns, sum);

        if (gameLogic.secondPick !== -1) {
            ui.disableAllDominoes();
            setTimeout(completeTurn, CHECK_DELAY_MS);
        } else {
            ui.highlightDomino(index);
        }
    }
}

// Checks the 2 non-double dominos that have been picked for a sum-to-12 match.
function completeTurn() {
    gameLogic.turns++;

    if (gameLogic.isMatch()) {
        gameLogic.cleared += 2;
        ui.removeDomino(gameLogic.firstPick);
        ui.removeDomino(gameLogic.secondPick);
    } else {
        ui.showDominoBack(gameLogic.firstPick);
        ui.showDominoBack(gameLogic.secondPick);
    }

    ui.updateScore(gameLogic.cleared, gameLogic.turns, 0);
    gameLogic.resetPicks();

    if (gameLogic.cleared >= NUMBER_OF_DOMINOES - 1) {
        ui.showWin(gameLogic.turns);
    } else {
        ui.enableAllDominoes(handleClick, true);
    }
}

window.onload = init;

// 4-12-2026
// Code Written by Jaxzon Emmons
//ai only used for explaining how some sections of code already written in the file worked/what they did


